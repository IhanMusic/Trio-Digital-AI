import path from 'path';
import fs from 'fs';
import { ProductIntegrationWithStabilityService } from '../services/ProductIntegrationWithStabilityService';
import { FileStorageService } from '../services/FileStorageService';

/**
 * Script de test pour l'intégration de produits dans les posts
 * Ce script simule le processus d'intégration de produit dans une image générée
 * comme il se produirait dans le service PostGenerationService
 */
async function testProductIntegrationInPost() {
  try {
    console.log('=== Test de l\'intégration de produits dans les posts ===');
    
    // Vérifier que la clé API Stability est disponible
    const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
    if (!STABILITY_API_KEY) {
      throw new Error('Clé API Stability manquante. Veuillez définir la variable d\'environnement STABILITY_API_KEY.');
    }
    
    console.log('Clé API Stability trouvée:', { 
      prefix: STABILITY_API_KEY.substring(0, 5), 
      length: STABILITY_API_KEY.length 
    });
    
    // Chemins des images de test
    const testImagesDir = path.join(process.cwd(), 'src', 'test-images');
    const generatedImagePath = path.join(testImagesDir, 'background.png');
    const productImagePath = path.join(testImagesDir, 'product.jpg');
    
    // Vérifier que les images de test existent
    if (!fs.existsSync(generatedImagePath)) {
      throw new Error(`L'image de fond n'existe pas: ${generatedImagePath}`);
    }
    
    if (!fs.existsSync(productImagePath)) {
      throw new Error(`L'image du produit n'existe pas: ${productImagePath}`);
    }
    
    console.log('Images de test trouvées:');
    console.log(`- Image de fond: ${generatedImagePath}`);
    console.log(`- Image du produit: ${productImagePath}`);
    
    // Créer un dossier pour les résultats des tests
    const testResultsDir = path.join(process.cwd(), 'test-results');
    if (!fs.existsSync(testResultsDir)) {
      fs.mkdirSync(testResultsDir, { recursive: true });
    }
    
    // Simuler le processus d'intégration comme dans PostGenerationService
    console.log('\n=== Simulation du processus d\'intégration de produit dans un post ===');
    
    // 1. Télécharger les images vers Cloudinary pour simuler le processus complet
    console.log('Téléchargement des images vers Cloudinary...');
    
    const { url: backgroundUrl } = await FileStorageService.saveImage(
      fs.readFileSync(generatedImagePath),
      { maxWidth: 1024, maxHeight: 1024, quality: 90, format: 'png' }
    );
    
    const { url: productUrl } = await FileStorageService.saveImage(
      fs.readFileSync(productImagePath),
      { maxWidth: 1024, maxHeight: 1024, quality: 90, format: 'png' }
    );
    
    console.log(`Image de fond téléchargée: ${backgroundUrl}`);
    console.log(`Image de produit téléchargée: ${productUrl}`);
    
    // 2. Intégrer le produit dans l'image générée
    console.log('\nIntégration du produit dans l\'image générée...');
    
    const prompt = "a beautiful product seamlessly integrated into the scene, with matching lighting and perspective";
    console.log('Prompt:', prompt);
    
    const integratedImageUrl = await ProductIntegrationWithStabilityService.integrateProductAdvanced(
      productUrl,
      backgroundUrl,
      {
        method: 'inpaint',
        prompt: `${prompt}, with the product seamlessly integrated into the scene`,
        stylePreset: 'photographic'
      }
    );
    
    console.log(`\nRésultat de l'intégration: ${integratedImageUrl}`);
    
    // Sauvegarder l'URL du résultat dans un fichier texte
    const resultPath = path.join(testResultsDir, 'post-product-integration-result.txt');
    fs.writeFileSync(resultPath, integratedImageUrl);
    console.log(`URL du résultat sauvegardée: ${resultPath}`);
    
    console.log('\n=== Test terminé avec succès ===');
    
  } catch (error: any) {
    console.error('Erreur lors du test:', error);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    if (error.response) {
      console.error('Détails de la réponse:', {
        status: error.response.status,
        data: error.response.data
      });
    }
  }
}

// Exécuter le test
testProductIntegrationInPost();
