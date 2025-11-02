from PIL import Image
import sys

def test_image(image_path):
    try:
        print(f"Tentative de lecture de l'image avec PIL: {image_path}")
        img = Image.open(image_path)
        print(f"Format de l'image: {img.format}")
        print(f"Mode de l'image: {img.mode}")
        print(f"Dimensions: {img.size}")
        return True
    except Exception as e:
        print(f"Erreur lors de la lecture de l'image: {str(e)}")
        return False

if __name__ == "__main__":
    image_path = sys.argv[1]
    test_image(image_path)
