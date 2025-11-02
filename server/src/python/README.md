# Système de Traitement d'Image AI

Ce système utilise plusieurs modèles d'IA pour le traitement avancé d'images, notamment la suppression d'arrière-plan, l'estimation de profondeur et l'intégration naturelle de produits dans des images.

## Architecture

### Modèles AI

1. **U2NET**
   - Utilisation : Segmentation générale d'objets
   - Fichier : `models/u2net.py`
   - Poids : `models/U2NET.pth`

2. **MiDaS**
   - Utilisation : Estimation de profondeur
   - Fichier : `models/midas.py`
   - Poids : `models/dpt_beit_large_512.pt`

3. **MODNet**
   - Utilisation : Matting de portraits
   - Fichier : `models/modnet.py`
   - Poids : `models/modnet_photographic_portrait_matting.ckpt`

### Pipeline de Traitement

Le pipeline principal (`image_processor.py`) intègre ces modèles dans un flux de traitement complet :

1. **Suppression d'arrière-plan**
   ```python
   result = remove_background(image_path)
   ```
   - Essaie d'abord MODNet pour les portraits
   - Utilise U2NET comme option générale
   - Fallback sur GrabCut si les deux échouent

2. **Analyse de scène**
   ```python
   analyzer = SceneAnalyzer(image)
   depth_map = analyzer.estimate_depth()
   light_info = analyzer.detect_light_direction()
   ```
   - Utilise MiDaS pour l'estimation de profondeur
   - Analyse la direction de la lumière
   - Trouve les emplacements optimaux pour l'intégration

3. **Intégration de produit**
   ```python
   result = integrate_product(background, product, style_guide)
   ```
   - Adaptation des couleurs
   - Ajustement de l'éclairage
   - Fusion naturelle avec Poisson blending

## Installation

1. Installer les dépendances :
   ```bash
   pip install -r requirements.txt
   ```

2. Télécharger les modèles :
   ```bash
   python download_models.py
   ```

## Utilisation

### Test du pipeline complet

```bash
python test_pipeline.py
```

### Utilisation dans le code

```python
from image_processor import remove_background, integrate_product, analyze_style

# Analyser le style d'une image
style_info = analyze_style("background.jpg")

# Supprimer l'arrière-plan d'un produit
product_no_bg = remove_background("product.jpg")

# Intégrer le produit dans l'image
background = cv2.imread("background.jpg")
result = integrate_product(background, product_no_bg, style_info)
```

## Gestion des erreurs

Le système inclut plusieurs niveaux de fallback :

1. Pour la suppression d'arrière-plan :
   - MODNet → U2NET → GrabCut

2. Pour l'estimation de profondeur :
   - MiDaS → méthode basée sur le gradient

## Performance

- Support du GPU via PyTorch
- Chargement paresseux des modèles
- Mise en cache des résultats intermédiaires

## Tests

Le script `test_pipeline.py` permet de tester l'ensemble du pipeline :

```bash
python test_pipeline.py
```

Il vérifie :
1. L'analyse de style
2. La suppression d'arrière-plan
3. L'intégration de produit
