import os
import shutil
from pathlib import Path

MODELS_DIR = Path(__file__).parent / "models"
PROJECT_ROOT = Path(__file__).parent.parent.parent.parent

# Configuration des modèles
MODELS = {
    "u2net": {
        "url": "https://drive.google.com/uc?id=1ao1ovG1Qtx4b7EoskHXmi2E9rp5CHLcZ",
        "local_name": "U2NET.pth"
    },
    "midas": {
        "url": "https://github.com/isl-org/MiDaS/releases/download/v3.1/dpt_beit_large_512.pt",
        "local_name": "dpt_beit_large_512.pt"
    },
    "modnet": {
        "url": "https://drive.google.com/uc?id=1mcr7ALciuAsHCpLnrtG_eop5-EYhbCmz",
        "local_name": "modnet_photographic_portrait_matting.ckpt"
    }
}

def download_file(url, local_path):
    """Télécharge un fichier depuis une URL"""
    print(f"Téléchargement vers {local_path}...")
    try:
        if "drive.google.com" in url:
            import gdown
            gdown.download(url, str(local_path), quiet=False)
        else:
            import requests
            from tqdm import tqdm
            response = requests.get(url, stream=True)
            response.raise_for_status()
            
            total_size = int(response.headers.get('content-length', 0))
            block_size = 8192
            progress_bar = tqdm(total=total_size, unit='iB', unit_scale=True)
            
            with open(local_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=block_size):
                    progress_bar.update(len(chunk))
                    f.write(chunk)
            
            progress_bar.close()
        
        print(f"Téléchargement terminé: {local_path}")
        return True
    except Exception as e:
        print(f"Erreur lors du téléchargement vers {local_path}: {str(e)}")
        return False

def setup_models():
    """Configure tous les modèles nécessaires"""
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    
    for model_name, model_info in MODELS.items():
        local_path = MODELS_DIR / model_info["local_name"]
        if not local_path.exists():
            success = download_file(model_info["url"], local_path)
            if not success:
                print(f"Échec du téléchargement de {model_name}")

def verify_models():
    """Vérifie que tous les modèles sont présents"""
    missing_models = []
    
    for model_info in MODELS.values():
        if not (MODELS_DIR / model_info["local_name"]).exists():
            missing_models.append(model_info["local_name"])
    
    return missing_models

if __name__ == "__main__":
    print("Configuration des modèles...")
    setup_models()
