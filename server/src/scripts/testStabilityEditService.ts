
import path from 'path';
import fs from 'fs';
import { StabilityEditService } from '../services/StabilityEditService';

/**
 * Script de test pour le service d'édition d'images avec Stability AI
 */
async function testStabilityEditService() {
  try {
    console.log('=== Test du service d\'édition d\'images avec Stability AI ===');
    
    // Vérifier que la clé API Stability est disponible
    const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
    if (!STABILITY_API_KEY) {
      throw new Error('Clé API Stability manquante. Veuillez définir la variable d\'environnement STABILITY_API_KEY.');
    }
    
    // Chemins des images de test
    const testImagesDir = path.join(process.cwd(), 'src', 'test-images');
    const imagePath = path.join(testImagesDir, 'product.jpg');
    const backgroundPath = path.join(testImagesDir, 'background.png');
    
    // Vérifier que les images de test existent
    if (!fs.existsSync(imagePath)) {
      throw new Error(`L'image de test n'existe pas: ${imagePath}`);
    }
    
    if (!fs.existsSync(backgroundPath)) {
      throw new Error(`L'image de fond n'existe pas: ${backgroundPath}`);
    }
    
    console.log('Images de test trouvées:');
    console.log(`- Image: ${imagePath}`);
    console.log(`- Image de fond: ${backgroundPath}`);
    
    // Créer un dossier pour les résultats des tests
    const testResultsDir = path.join(process.cwd(), 'test-results');
    if (!fs.existsSync(testResultsDir)) {
      fs.mkdirSync(testResultsDir, { recursive: true });
    }
    
    // Test 1: Remove Background
    console.log('\n=== Test 1: Remove Background ===');
    console.log('Suppression de l\'arrière-plan de l\'image...');
    
    const removeBackgroundResult = await StabilityEditService.removeBackground(imagePath);
    console.log(`Résultat de la suppression d'arrière-plan: ${removeBackgroundResult}`);
    
    // Sauvegarder l'URL du résultat dans un fichier texte
    const removeBackgroundResultPath = path.join(testResultsDir, 'remove-background-result.txt');
    fs.writeFileSync(removeBackgroundResultPath, removeBackgroundResult);
    console.log(`URL du résultat sauvegardée: ${removeBackgroundResultPath}`);
    
    // Test 2: Inpaint
    console.log('\n=== Test 2: Inpaint ===');
    
    // Générer un masque simple pour le test
    console.log('Génération d\'un masque simple pour le test...');
    const maskPath = path.join(testResultsDir, 'test-mask.png');
    
    // Créer un masque blanc de 100x100 pixels au centre de l'image
    const { createCanvas } = require('canvas');
    const canvas = createCanvas(512, 512);
    const ctx = canvas.getContext('2d');
    
    // Fond noir (transparent)
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 512, 512);
    
    // Rectangle blanc au centre (zone à inpainter)
    ctx.fillStyle = 'white';
    ctx.fillRect(206, 206, 100, 100);
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(maskPath, buffer);
    console.log(`Masque généré: ${maskPath}`);
    
    console.log('Inpainting de l\'image avec le masque...');
    const inpaintResult = await StabilityEditService.inpaint(
      backgroundPath,
      maskPath,
      'a beautiful object seamlessly integrated into the scene',
      {
        negativePrompt: 'unrealistic, blurry, low quality',
        stylePreset: 'photographic',
        growMask: 10
      }
    );
    
    console.log(`Résultat de l'inpainting: ${inpaintResult}`);
    
    // Sauvegarder l'URL du résultat dans un fichier texte
    const inpaintResultPath = path.join(testResultsDir, 'inpaint-result.txt');
    fs.writeFileSync(inpaintResultPath, inpaintResult);
    console.log(`URL du résultat sauvegardée: ${inpaintResultPath}`);
    
    // Test 3: Search and Replace
    console.log('\n=== Test 3: Search and Replace ===');
    console.log('Recherche et remplacement dans l\'image...');
    
    const searchAndReplaceResult = await StabilityEditService.searchAndReplace(
      backgroundPath,
      'object',
      'a beautiful product with realistic lighting',
      {
        negativePrompt: 'unrealistic, blurry, low quality',
        stylePreset: 'photographic'
      }
    );
    
    console.log(`Résultat du search and replace: ${searchAndReplaceResult}`);
    
    // Sauvegarder l'URL du résultat dans un fichier texte
    const searchAndReplaceResultPath = path.join(testResultsDir, 'search-and-replace-result.txt');
    fs.writeFileSync(searchAndReplaceResultPath, searchAndReplaceResult);
    console.log(`URL du résultat sauvegardée: ${searchAndReplaceResultPath}`);
    
    // Note: Search and Recolor n'est pas encore implémenté dans le service StabilityEditService
    
    // Test 4: Replace Background and Relight
    console.log('\n=== Test 4: Replace Background and Relight ===');
    console.log('Remplacement de l\'arrière-plan et relighting...');
    
    try {
      // Cette méthode retourne un ID de tâche, pas directement une URL d'image
      const taskId = await StabilityEditService.replaceBackgroundAndRelight(
        imagePath,
        'a beautiful studio with soft lighting'
      );
      
      console.log(`ID de tâche pour replace background and relight: ${taskId}`);
      
      // Attendre que la tâche soit terminée
      console.log('Attente de la fin de la tâche...');
      let isCompleted = false;
      let attempts = 0;
      const maxAttempts = 30; // 5 minutes maximum (10 secondes * 30)
      
      while (!isCompleted && attempts < maxAttempts) {
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 10000)); // Attendre 10 secondes
        isCompleted = await StabilityEditService.checkBackgroundReplaceStatus(taskId);
        console.log(`Tentative ${attempts}/${maxAttempts}: ${isCompleted ? 'Terminé' : 'En cours'}`);
      }
      
      if (!isCompleted) {
        throw new Error('Délai d\'attente dépassé pour la tâche');
      }
      
      // Récupérer le résultat
      const replaceBackgroundResult = await StabilityEditService.getBackgroundReplaceResult(taskId);
      console.log(`Résultat du replace background and relight: ${replaceBackgroundResult}`);
      
      // Sauvegarder l'URL du résultat dans un fichier texte
      const replaceBackgroundResultPath = path.join(testResultsDir, 'replace-background-result.txt');
      fs.writeFileSync(replaceBackgroundResultPath, replaceBackgroundResult);
      console.log(`URL du résultat sauvegardée: ${replaceBackgroundResultPath}`);
    } catch (error) {
      console.error('Erreur lors du test Replace Background and Relight:', error);
      console.log('Ce test a échoué, mais les autres tests peuvent continuer.');
    }
    
    console.log('\n=== Tests terminés avec succès ===');
    console.log(`Tous les résultats sont disponibles dans: ${testResultsDir}`);
    
  } catch (error: any) {
    console.error('Erreur lors des tests:', error);
  }
}

// Exécuter les tests
testStabilityEditService();
