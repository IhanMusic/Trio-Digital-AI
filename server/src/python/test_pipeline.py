import cv2
import numpy as np
from pathlib import Path
from image_processor import (
    remove_background,
    SceneAnalyzer,
    integrate_product,
    analyze_style
)

def test_pipeline():
    """Test le pipeline complet de traitement d'image"""
    try:
        # Chemins des images de test
        test_dir = Path(__file__).parent.parent / "test-images"
        test_dir.mkdir(exist_ok=True)
        
        background_path = test_dir / "background.png"
        product_path = test_dir / "product.jpg"
        output_path = test_dir / "result.png"
        
        # Vérifier si les images de test existent
        if not background_path.exists() or not product_path.exists():
            print("Images de test non trouvées")
            return False
        
        print("1. Test de l'analyse de style...")
        style_result = analyze_style(str(background_path))
        if not style_result:
            print("Échec de l'analyse de style")
            return False
        print("Analyse de style réussie")
        
        print("\n2. Test de la suppression d'arrière-plan...")
        product_no_bg = remove_background(str(product_path))
        if product_no_bg is None:
            print("Échec de la suppression d'arrière-plan")
            return False
        print("Suppression d'arrière-plan réussie")
        
        print("\n3. Test de l'intégration du produit...")
        background = cv2.imread(str(background_path))
        if background is None:
            print("Impossible de charger l'image de fond")
            return False
        
        final_image = integrate_product(
            background,
            product_no_bg,
            {
                "lighting": {
                    "brightness": 1.0,
                    "contrast": 1.0
                }
            }
        )
        
        if final_image is None:
            print("Échec de l'intégration du produit")
            return False
        
        # Sauvegarder le résultat
        cv2.imwrite(str(output_path), final_image)
        print("Intégration du produit réussie")
        print(f"\nRésultat sauvegardé dans: {output_path}")
        
        return True
        
    except Exception as e:
        print(f"Erreur lors du test: {str(e)}")
        return False

if __name__ == "__main__":
    print("Test du pipeline de traitement d'image...")
    success = test_pipeline()
    print(f"\nRésultat final: {'Succès' if success else 'Échec'}")
