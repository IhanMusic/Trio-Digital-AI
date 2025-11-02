import cv2
import numpy as np
import json
import sys
import base64
import torch
from scipy.spatial import cKDTree
from scipy import ndimage
from pathlib import Path

# Import des modèles IA
from models.u2net import load_u2net
from models.midas import load_midas, estimate_depth as midas_estimate_depth
from models.modnet import load_modnet

# Chargement des modèles (lazy loading)
_u2net_model = None
_midas_model = None
_modnet_model = None

def get_u2net():
    global _u2net_model
    if _u2net_model is None:
        _u2net_model = load_u2net()
    return _u2net_model

def get_midas():
    global _midas_model
    if _midas_model is None:
        _midas_model = load_midas()
    return _midas_model

def get_modnet():
    global _modnet_model
    if _modnet_model is None:
        _modnet_model = load_modnet()
    return _modnet_model

def remove_background_u2net(image_path):
    """Suppression de l'arrière-plan avec U²-Net (alternative à GrabCut)"""
    img = cv2.imread(image_path)
    if img is None:
        raise Exception(f"Impossible de charger l'image: {image_path}")
    
    # Redimensionner pour U²-Net
    size = 320
    h, w = img.shape[:2]
    aspect_ratio = w / h
    if aspect_ratio > 1:
        new_w = size
        new_h = int(size / aspect_ratio)
    else:
        new_h = size
        new_w = int(size * aspect_ratio)
    
    resized = cv2.resize(img, (new_w, new_h))
    
    # Préparer l'image pour U²-Net
    tensor = torch.from_numpy(resized).float().permute(2, 0, 1)
    tensor = tensor.unsqueeze(0) / 255.0
    
    if torch.cuda.is_available():
        tensor = tensor.cuda()
    
    # Prédiction avec U²-Net
    model = get_u2net()
    with torch.no_grad():
        d0, *_ = model(tensor)
        pred = d0.squeeze()
        if torch.cuda.is_available():
            pred = pred.cpu()
        pred = pred.numpy()
    
    # Redimensionner le masque à la taille originale
    mask = cv2.resize(pred, (w, h))
    
    # Appliquer un seuil et adoucir les bords
    mask = (mask * 255).astype(np.uint8)
    mask = cv2.GaussianBlur(mask, (5, 5), 0)
    
    # Créer l'image RGBA
    rgba = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
    rgba[:, :, 3] = mask
    
    return rgba

def poisson_blend(background, foreground, mask, center):
    """Utilise cv2.seamlessClone pour une fusion naturelle"""
    clone_mode = cv2.MIXED_CLONE  # Changé à MIXED_CLONE pour une meilleure fusion
    result = cv2.seamlessClone(foreground, background, mask, center, clone_mode)
    return result

class SceneAnalyzer:
    """Analyse avancée de la scène pour une meilleure intégration"""
    
    def __init__(self, image):
        self.image = image
        self.gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        self.height, self.width = image.shape[:2]

    def detect_light_direction(self):
        """Détecte la direction principale de la lumière"""
        # Convertir en LAB pour une meilleure analyse de la luminosité
        lab = cv2.cvtColor(self.image, cv2.COLOR_BGR2LAB)
        l_channel = lab[:,:,0]
        
        # Calculer le gradient de luminosité
        gradient_x = cv2.Sobel(l_channel, cv2.CV_64F, 1, 0, ksize=5)
        gradient_y = cv2.Sobel(l_channel, cv2.CV_64F, 0, 1, ksize=5)
        
        # Calculer la direction moyenne
        angle = np.arctan2(np.mean(gradient_y), np.mean(gradient_x))
        magnitude = np.sqrt(np.mean(gradient_x**2) + np.mean(gradient_y**2))
        
        return {
            'angle': angle,
            'magnitude': magnitude,
            'direction': (np.cos(angle), np.sin(angle))
        }

    def estimate_depth(self):
        """Estime la carte de profondeur avec MiDaS"""
        try:
            model = get_midas()
            depth_map = midas_estimate_depth(model, self.image)
            return depth_map
        except Exception as e:
            print(f"Erreur MiDaS, utilisation du fallback: {str(e)}")
            # Fallback à la méthode originale si MiDaS échoue
            blur_map = cv2.Laplacian(self.gray, cv2.CV_64F).var()
            gradient_x = cv2.Sobel(self.gray, cv2.CV_64F, 1, 0, ksize=3)
            gradient_y = cv2.Sobel(self.gray, cv2.CV_64F, 0, 1, ksize=3)
            gradient_magnitude = np.sqrt(gradient_x**2 + gradient_y**2)
            depth_map = cv2.normalize(gradient_magnitude, None, 0, 1, cv2.NORM_MINMAX)
            return depth_map

    def find_optimal_placement(self):
        """Trouve le meilleur emplacement pour le produit"""
        # Créer une carte de chaleur basée sur plusieurs facteurs
        depth_map = self.estimate_depth()
        edges = cv2.Canny(self.image, 100, 200)
        
        # Éviter les bords et les zones trop complexes
        heatmap = np.zeros((self.height, self.width), dtype=np.float32)
        heatmap += cv2.GaussianBlur(edges.astype(float), (21, 21), 0)
        heatmap += cv2.GaussianBlur(depth_map, (21, 21), 0)
        
        # Normaliser
        heatmap = cv2.normalize(heatmap, None, 0, 1, cv2.NORM_MINMAX)
        
        # Trouver le point optimal (minimum dans la heatmap)
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(heatmap)
        
        return {
            'position': min_loc,
            'depth_value': depth_map[min_loc[1], min_loc[0]],
            'heatmap': heatmap
        }

class ColorManager:
    """Gestion avancée des couleurs pour une meilleure intégration"""
    
    def __init__(self, source_img, target_img):
        self.source = source_img
        self.target = target_img
        self.source_lab = cv2.cvtColor(source_img, cv2.COLOR_BGR2LAB)
        self.target_lab = cv2.cvtColor(target_img, cv2.COLOR_BGR2LAB)

    def build_color_tree(self, colors):
        """Construit un KD-tree pour la recherche rapide des couleurs les plus proches"""
        return cKDTree(np.array(colors))

    def match_histograms(self, source_channel, target_channel):
        """Adapte l'histogramme de la source à celui de la cible"""
        source_hist, source_bins = np.histogram(source_channel.flatten(), 256, [0, 256])
        target_hist, target_bins = np.histogram(target_channel.flatten(), 256, [0, 256])
        
        # Calculer les CDF
        source_cdf = source_hist.cumsum()
        target_cdf = target_hist.cumsum()
        
        source_cdf = source_cdf / source_cdf[-1]
        target_cdf = target_cdf / target_cdf[-1]
        
        # Créer la fonction de mapping
        interp_target_values = np.interp(source_cdf, target_cdf, target_bins[:-1])
        
        return interp_target_values[source_channel]

    def color_transfer(self):
        """Implémente le transfert de couleur de Reinhard"""
        # Calculer moyenne et écart-type pour chaque canal LAB
        source_mean = np.mean(self.source_lab.reshape(-1, 3), axis=0)
        source_std = np.std(self.source_lab.reshape(-1, 3), axis=0)
        target_mean = np.mean(self.target_lab.reshape(-1, 3), axis=0)
        target_std = np.std(self.target_lab.reshape(-1, 3), axis=0)
        
        # Appliquer la transformation
        result = np.copy(self.source_lab)
        for i in range(3):
            result[:,:,i] = ((result[:,:,i] - source_mean[i]) * (target_std[i] / source_std[i])) + target_mean[i]
        
        # Convertir en BGR
        result = cv2.cvtColor(result, cv2.COLOR_LAB2BGR)
        return cv2.convertScaleAbs(result)

def remove_background_grabcut(image_path):
    """Suppression d'arrière-plan avec GrabCut (fallback)"""
    # Lire l'image
    img = cv2.imread(image_path)
    if img is None:
        raise Exception(f"Impossible de charger l'image: {image_path}")
    
    # Appliquer un filtre bilatéral pour réduire le bruit tout en préservant les bords
    img_filtered = cv2.bilateralFilter(img, 9, 75, 75)
    
    # Créer le rectangle initial pour GrabCut
    mask = np.zeros(img.shape[:2], np.uint8)
    rect = (10, 10, img.shape[1]-20, img.shape[0]-20)
    
    # Initialiser les modèles
    bgdModel = np.zeros((1,65), np.float64)
    fgdModel = np.zeros((1,65), np.float64)
    
    # Appliquer GrabCut
    cv2.grabCut(img_filtered, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)
    
    # Créer le masque final
    mask2 = np.where((mask==2)|(mask==0), 0, 1).astype('uint8')
    
    # Appliquer un flou gaussien au masque pour adoucir les bords
    mask2 = cv2.GaussianBlur(mask2, (5,5), 0)
    
    # Créer l'image RGBA
    rgba = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
    rgba[:, :, 3] = mask2 * 255
    
    return rgba

def remove_background(image_path):
    """Suppression améliorée de l'arrière-plan avec U²-Net"""
    try:
        # Utiliser directement U²-Net pour de meilleurs résultats
        return remove_background_u2net(image_path)
    except Exception as e:
        # En cas d'erreur, utiliser GrabCut comme fallback
        print(f"Erreur avec U²-Net ({str(e)}), utilisation de GrabCut comme fallback...")
        return remove_background_grabcut(image_path)

def adapt_product_colors(product_img, target_img, lighting):
    """Adaptation améliorée des couleurs avec préservation des tons importants"""
    # Créer le gestionnaire de couleurs
    color_manager = ColorManager(product_img[:,:,:3], target_img)  # Utiliser seulement les canaux BGR
    
    # Appliquer le transfert de couleur
    color_matched = color_manager.color_transfer()
    
    # Ajuster la luminosité et le contraste
    lab_product = cv2.cvtColor(color_matched, cv2.COLOR_BGR2LAB)
    l_channel = lab_product[:,:,0]
    
    # Appliquer les ajustements de luminosité
    l_channel = cv2.convertScaleAbs(
        l_channel,
        alpha=lighting['contrast'],
        beta=lighting['brightness'] * 255
    )
    
    # Adapter l'histogramme du canal L
    l_channel = color_manager.match_histograms(
        l_channel,
        cv2.cvtColor(target_img, cv2.COLOR_BGR2LAB)[:,:,0]
    )
    
    lab_product[:,:,0] = l_channel
    result = cv2.cvtColor(lab_product, cv2.COLOR_LAB2BGR)
    
    # Créer une image BGRA avec le canal alpha original
    if product_img.shape[2] == 4:
        result_rgba = cv2.cvtColor(result, cv2.COLOR_BGR2BGRA)
        result_rgba[:,:,3] = product_img[:,:,3]
        return result_rgba
    return result

def apply_lighting_effects(image, lighting_info):
    """Application améliorée des effets d'éclairage"""
    result = image.copy()
    height, width = image.shape[:2]
    
    # Créer un masque pour les ombres et reflets
    shadow_mask = np.zeros((height, width), dtype=np.float32)
    highlight_mask = np.zeros((height, width), dtype=np.float32)
    
    # Appliquer les ombres
    for shadow in lighting_info['shadows']:
        center = (int(shadow['x'] * width), int(shadow['y'] * height))
        radius = int(shadow['radius'])
        temp_mask = np.zeros((height, width), dtype=np.float32)
        cv2.circle(temp_mask, center, radius, 1, -1)
        temp_mask = cv2.GaussianBlur(temp_mask, (radius*2+1, radius*2+1), radius/3)
        shadow_mask = cv2.add(shadow_mask, temp_mask)
    
    # Appliquer les reflets
    for highlight in lighting_info['highlights']:
        center = (int(highlight['x'] * width), int(highlight['y'] * height))
        radius = int(highlight['radius'])
        temp_mask = np.zeros((height, width), dtype=np.float32)
        cv2.circle(temp_mask, center, radius, 1, -1)
        temp_mask = cv2.GaussianBlur(temp_mask, (radius*2+1, radius*2+1), radius/3)
        highlight_mask = cv2.add(highlight_mask, temp_mask)
    
    # Normaliser les masques
    shadow_mask = cv2.normalize(shadow_mask, None, 0, 0.5, cv2.NORM_MINMAX)
    highlight_mask = cv2.normalize(highlight_mask, None, 0, 0.5, cv2.NORM_MINMAX)
    
    # Appliquer les effets
    result = result.astype(np.float32)
    for i in range(3):  # Appliquer seulement sur les canaux BGR
        result[:,:,i] = result[:,:,i] * (1 - shadow_mask) # Ombres
        result[:,:,i] = result[:,:,i] + (255 - result[:,:,i]) * highlight_mask # Reflets
    
    result = cv2.convertScaleAbs(result)
    
    # Préserver le canal alpha s'il existe
    if image.shape[2] == 4:
        result = cv2.cvtColor(result, cv2.COLOR_BGR2BGRA)
        result[:,:,3] = image[:,:,3]
    
    return result

def integrate_product(product_img, generated_img, style_guide):
    """Intégration améliorée du produit dans l'image générée"""
    # Analyser la scène
    scene = SceneAnalyzer(generated_img)
    light_info = scene.detect_light_direction()
    
    # Redimensionner le produit
    scale = 0.4  # Ajusté pour une meilleure taille
    product_height = int(generated_img.shape[0] * scale)
    product_width = int(product_img.shape[1] * product_height / product_img.shape[0])
    resized_product = cv2.resize(product_img, (product_width, product_height))
    
    # Adapter les couleurs
    adapted_product = adapt_product_colors(
        resized_product,
        generated_img,
        style_guide['lighting']
    )
    
    # Appliquer les effets d'éclairage
    product_with_effects = apply_lighting_effects(
        adapted_product,
        {
            'shadows': [
                {
                    'x': 0.5 + light_info['direction'][0] * 0.1,
                    'y': 0.5 + light_info['direction'][1] * 0.1,
                    'radius': int(product_height * 0.3)
                }
            ],
            'highlights': [
                {
                    'x': 0.5 - light_info['direction'][0] * 0.1,
                    'y': 0.5 - light_info['direction'][1] * 0.1,
                    'radius': int(product_height * 0.2)
                }
            ]
        }
    )
    
    # Position optimale (centré horizontalement, légèrement plus bas)
    x = (generated_img.shape[1] - product_width) // 2
    y = int(generated_img.shape[0] * 0.5) - product_height // 2
    
    # Créer un masque alpha pour le produit
    alpha = product_with_effects[:,:,3] if product_with_effects.shape[2] == 4 else np.ones((product_height, product_width), dtype=np.uint8) * 255
    
    # Appliquer un flou gaussien au masque pour des bords plus doux
    alpha = cv2.GaussianBlur(alpha, (5,5), 0)
    
    # Créer un masque pleine taille pour le produit
    mask_full = np.zeros(generated_img.shape[:2], dtype=np.uint8)
    mask_full[y:y+product_height, x:x+product_width] = alpha
    
    # Créer un canvas pour le produit
    canvas = generated_img.copy()
    
    # Fusionner le produit avec le fond en utilisant le masque alpha
    alpha_norm = alpha.astype(float) / 255
    alpha_norm = np.dstack([alpha_norm] * 3)  # Répliquer pour les 3 canaux
    
    roi = canvas[y:y+product_height, x:x+product_width]
    blended = cv2.convertScaleAbs(roi * (1 - alpha_norm) + product_with_effects[:,:,:3] * alpha_norm)
    canvas[y:y+product_height, x:x+product_width] = blended
    
    return canvas

def process_product_image(product_path, generated_path, output_path, style_guide=None):
    """Pipeline principal amélioré"""
    try:
        # Charger les images
        product = cv2.imread(product_path)
        if product is None:
            raise Exception(f"Impossible de charger l'image du produit: {product_path}")
            
        generated = cv2.imread(generated_path)
        if generated is None:
            raise Exception(f"Impossible de charger l'image générée: {generated_path}")
        
        # Pipeline de traitement
        product_no_bg = remove_background(product_path)
        if product_no_bg is None:
            raise Exception("Échec de la suppression de l'arrière-plan")
        
        # Analyser le style si non fourni
        if style_guide is None:
            style_guide = json.loads(analyze_style(generated_path))
            if not style_guide['success']:
                raise Exception("Échec de l'analyse du style")
            style_guide = style_guide['style_guide']
        else:
            style_guide = json.loads(style_guide)
        
        # Intégrer le produit dans l'image générée
        final_image = integrate_product(product_no_bg, generated, style_guide)
        
        # Sauvegarder le résultat
        cv2.imwrite(output_path, final_image)
        
        return json.dumps({
            "success": True,
            "path": output_path
        })
        
    except Exception as e:
        return json.dumps({
            "success": False,
            "error": str(e)
        })

def analyze_style(image_path):
    """Analyse améliorée du style de l'image"""
    try:
        img = cv2.imread(image_path)
        if img is None:
            raise Exception(f"Impossible de charger l'image: {image_path}")
        
        # Créer l'analyseur de scène
        scene = SceneAnalyzer(img)
        
        # Analyser l'éclairage
        light_info = scene.detect_light_direction()
        
        # Convertir en LAB pour analyse des couleurs
        lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
        
        # Analyser la luminosité
        l_channel = lab[:,:,0]
        brightness = np.mean(l_channel) / 255.0
        contrast = np.std(l_channel) / 128.0
        
        # Extraire les couleurs dominantes
        pixels = img.reshape(-1, 3)
        pixels = np.float32(pixels)
        criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)
        K = 5
        _, labels, centers = cv2.kmeans(pixels, K, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
        
        # Convertir les centres en couleurs hex
        colors = []
        for center in centers:
            b, g, r = center.astype(np.uint8)
            colors.append(f"#{r:02x}{g:02x}{b:02x}")
        
        # Analyser la profondeur
        depth_map = scene.estimate_depth()
        
        return json.dumps({
            "success": True,
            "style_guide": {
                "colors": colors,
                "lighting": {
                    "brightness": brightness,
                    "contrast": contrast,
                    "direction": {
                        "angle": float(light_info['angle']),
                        "magnitude": float(light_info['magnitude'])
                    },
                    "highlights": [],  # À remplir selon l'analyse
                    "shadows": []      # À remplir selon l'analyse
                },
                "composition": {
                    "depth": np.mean(depth_map),
                    "aspectRatio": float(img.shape[1]) / img.shape[0]
                }
            }
        })
        
    except Exception as e:
        return json.dumps({
            "success": False,
            "error": str(e)
        })

if __name__ == "__main__":
    command = sys.argv[1]
    
    if command == "process":
        product_path = sys.argv[3]  # Inversé l'ordre des arguments
        generated_path = sys.argv[2]
        output_path = sys.argv[4]
        style_guide = sys.argv[5] if len(sys.argv) > 5 else None
        print(process_product_image(product_path, generated_path, output_path, style_guide))
        
    elif command == "analyze":
        image_path = sys.argv[2]
        print(analyze_style(image_path))
