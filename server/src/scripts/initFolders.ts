import fs from 'fs';
import path from 'path';

const REQUIRED_FOLDERS = [
  'public',
  'public/images',
  'temp'
];

export async function initFolders(): Promise<void> {
  console.log('Initialisation des dossiers...');
  
  try {
    // Créer les dossiers requis s'ils n'existent pas
    for (const folder of REQUIRED_FOLDERS) {
      const folderPath = path.join(process.cwd(), folder);
      
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Dossier créé: ${folderPath}`);
      }
    }

    // Nettoyer le dossier temp
    const tempPath = path.join(process.cwd(), 'temp');
    const tempFiles = fs.readdirSync(tempPath);
    
    for (const file of tempFiles) {
      const filePath = path.join(tempPath, file);
      const stats = fs.statSync(filePath);
      
      // Supprimer les fichiers de plus d'une heure
      if (stats.isFile() && Date.now() - stats.mtimeMs > 3600000) {
        fs.unlinkSync(filePath);
        console.log(`Fichier temporaire supprimé: ${filePath}`);
      }
    }

    console.log('Initialisation des dossiers terminée avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des dossiers:', error);
    throw error;
  }
}

// Si le script est exécuté directement
if (require.main === module) {
  initFolders().catch(console.error);
}
