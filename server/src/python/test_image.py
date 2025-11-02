import cv2
import sys

def test_image(image_path):
    print(f"Tentative de lecture de l'image: {image_path}")
    img = cv2.imread(image_path)
    if img is None:
        print("Échec de la lecture de l'image")
        return False
    
    print(f"Image lue avec succès. Dimensions: {img.shape}")
    return True

if __name__ == "__main__":
    image_path = sys.argv[1]
    test_image(image_path)
