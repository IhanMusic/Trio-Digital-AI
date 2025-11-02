import path from 'path';
import fs from 'fs';
import { MaskGenerationService } from '../services/MaskGenerationService';

/**
 * Script de test pour le service de génération de masques
 */
async function testMaskGenerationService() {
  try {
    console.log('=== Test du service de génération de masques ===');
    
    // Chemins des images de test
    const testImagesDir = path.join(process.cwd(), 'src', 'test-images');
    const imagePath = path.join(testImagesDir, 'background.png');
    
    // Vérifier que l'image de test existe
    if (!fs.existsSync(imagePath)) {
      throw new Error(`L'image de test n'existe pas: ${imagePath}`);
    }
    
    console.log('Image de test trouvée:', imagePath);
    
    // Créer un dossier pour les résultats des tests
    const testResultsDir = path.join(process.cwd(), 'test-results');
    if (!fs.existsSync(testResultsDir)) {
      fs.mkdirSync(testResultsDir, { recursive: true });
    }
    
    // Obtenir les informations de l'image
    console.log('Obtention des informations de l\'image...');
    const imageInfo = await MaskGenerationService.getImageInfo(imagePath);
    console.log('Informations de l\'image:', imageInfo);
    
    // Test 1: Générer un masque rectangulaire au centre
    console.log('\n=== Test 1: Masque rectangulaire au centre ===');
    const rectangleMaskUrl = await MaskGenerationService.generateMask(
      imagePath,
      {
        width: 200,
        height: 200,
        position: 'center',
        shape: 'rectangle'
      }
    );
    
    console.log('Masque rectangulaire généré:', rectangleMaskUrl);
    
    // Sauvegarder l'URL du masque dans un fichier texte
    const rectangleMaskPath = path.join(testResultsDir, 'rectangle-mask-result.txt');
    fs.writeFileSync(rectangleMaskPath, rectangleMaskUrl);
    console.log(`URL du masque sauvegardée: ${rectangleMaskPath}`);
    
    // Test 2: Générer un masque elliptique en haut à gauche
    console.log('\n=== Test 2: Masque elliptique en haut à gauche ===');
    const ellipseMaskUrl = await MaskGenerationService.generateMask(
      imagePath,
      {
        width: 150,
        height: 100,
        position: 'top-left',
        shape: 'ellipse'
      }
    );
    
    console.log('Masque elliptique généré:', ellipseMaskUrl);
    
    // Sauvegarder l'URL du masque dans un fichier texte
    const ellipseMaskPath = path.join(testResultsDir, 'ellipse-mask-result.txt');
    fs.writeFileSync(ellipseMaskPath, ellipseMaskUrl);
    console.log(`URL du masque sauvegardée: ${ellipseMaskPath}`);
    
    // Test 3: Générer un masque rectangulaire en bas à droite
    console.log('\n=== Test 3: Masque rectangulaire en bas à droite ===');
    const bottomRightMaskUrl = await MaskGenerationService.generateMask(
      imagePath,
      {
        width: 180,
        height: 120,
        position: 'bottom-right',
        shape: 'rectangle'
      }
    );
    
    console.log('Masque en bas à droite généré:', bottomRightMaskUrl);
    
    // Sauvegarder l'URL du masque dans un fichier texte
    const bottomRightMaskPath = path.join(testResultsDir, 'bottom-right-mask-result.txt');
    fs.writeFileSync(bottomRightMaskPath, bottomRightMaskUrl);
    console.log(`URL du masque sauvegardée: ${bottomRightMaskPath}`);
    
    // Test 4: Générer un masque à position aléatoire
    console.log('\n=== Test 4: Masque à position aléatoire ===');
    const randomMaskUrl = await MaskGenerationService.generateMask(
      imagePath,
      {
        width: 100,
        height: 100,
        position: 'random',
        shape: 'rectangle'
      }
    );
    
    console.log('Masque à position aléatoire généré:', randomMaskUrl);
    
    // Sauvegarder l'URL du masque dans un fichier texte
    const randomMaskPath = path.join(testResultsDir, 'random-mask-result.txt');
    fs.writeFileSync(randomMaskPath, randomMaskUrl);
    console.log(`URL du masque sauvegardée: ${randomMaskPath}`);
    
    console.log('\n=== Tests terminés avec succès ===');
    console.log(`Tous les résultats sont disponibles dans: ${testResultsDir}`);
    
  } catch (error: any) {
    console.error('Erreur lors des tests:', error);
  }
}

// Exécuter les tests
testMaskGenerationService();
