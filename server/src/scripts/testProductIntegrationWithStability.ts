import path from 'path';
import fs from 'fs';
import { ProductIntegrationWithStabilityService } from '../services/ProductIntegrationWithStabilityService';

/**
 * Script de test pour le service d'intégration de produits avec Stability AI
 */
async function testProductIntegrationWithStability() {
  try {
    console.log('=== Test du service d\'intégration de produits avec Stability AI ===');
    
    // Vérifier que la clé API Stability est disponible
    const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
    if (!STABILITY_API_KEY) {
      throw new Error('Clé API Stability manquante. Veuillez définir la variable d\'environnement STABILITY_API_KEY.');
    }
    
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
    
    // Test 1: Intégration avec Inpaint
    console.log('\n=== Test 1: Intégration avec Inpaint ===');
    console.log('Intégration du produit avec la méthode Inpaint...');
    
    const inpaintResult = await ProductIntegrationWithStabilityService.integrateProductWithInpaint(
      productImagePath,
      generatedImagePath,
      {
        prompt: 'a product seamlessly integrated into the scene, with matching lighting and perspective',
        negativePrompt: 'unrealistic integration, floating objects, mismatched lighting, poor composition',
        stylePreset: 'photographic',
        productWidth: 300,
        productHeight: 300
      }
    );
    
    console.log(`Résultat de l'intégration avec Inpaint: ${inpaintResult}`);
    
    // Sauvegarder l'URL du résultat dans un fichier texte
    const inpaintResultPath = path.join(testResultsDir, 'product-integration-inpaint-result.txt');
    fs.writeFileSync(inpaintResultPath, inpaintResult);
    console.log(`URL du résultat sauvegardée: ${inpaintResultPath}`);
    
    // Test 2: Intégration avec Search and Replace
    console.log('\n=== Test 2: Intégration avec Search and Replace ===');
    console.log('Intégration du produit avec la méthode Search and Replace...');
    
    const searchAndReplaceResult = await ProductIntegrationWithStabilityService.integrateProductWithSearchAndReplace(
      productImagePath,
      generatedImagePath,
      {
        searchPrompt: 'object',
        prompt: 'a product with realistic lighting and perspective',
        negativePrompt: 'unrealistic integration, floating objects, mismatched lighting, poor composition',
        stylePreset: 'photographic'
      }
    );
    
    console.log(`Résultat de l'intégration avec Search and Replace: ${searchAndReplaceResult}`);
    
    // Sauvegarder l'URL du résultat dans un fichier texte
    const searchAndReplaceResultPath = path.join(testResultsDir, 'product-integration-search-replace-result.txt');
    fs.writeFileSync(searchAndReplaceResultPath, searchAndReplaceResult);
    console.log(`URL du résultat sauvegardée: ${searchAndReplaceResultPath}`);
    
    // Test 3: Intégration avancée (utilisant la méthode Inpaint par défaut)
    console.log('\n=== Test 3: Intégration avancée ===');
    console.log('Intégration du produit avec la méthode avancée...');
    
    const advancedResult = await ProductIntegrationWithStabilityService.integrateProductAdvanced(
      productImagePath,
      generatedImagePath,
      {
        method: 'inpaint',
        prompt: 'a product seamlessly integrated into the scene, with matching lighting and perspective',
        negativePrompt: 'unrealistic integration, floating objects, mismatched lighting, poor composition',
        stylePreset: 'photographic'
      }
    );
    
    console.log(`Résultat de l'intégration avancée: ${advancedResult}`);
    
    // Sauvegarder l'URL du résultat dans un fichier texte
    const advancedResultPath = path.join(testResultsDir, 'product-integration-advanced-result.txt');
    fs.writeFileSync(advancedResultPath, advancedResult);
    console.log(`URL du résultat sauvegardée: ${advancedResultPath}`);
    
    console.log('\n=== Tests terminés avec succès ===');
    console.log(`Tous les résultats sont disponibles dans: ${testResultsDir}`);
    
  } catch (error: any) {
    console.error('Erreur lors des tests:', error);
  }
}

// Exécuter les tests
testProductIntegrationWithStability();
