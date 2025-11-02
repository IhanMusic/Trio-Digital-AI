import path from 'path';
import fs from 'fs';
import { ProductIntegrationWithStabilityService } from '../services/ProductIntegrationWithStabilityService';
import { FileStorageService } from '../services/FileStorageService';
import Product, { IProduct } from '../models/Product';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

/**
 * Script de test pour l'intégration améliorée de produits
 * Ce script teste la nouvelle méthode d'intégration qui préserve mieux l'apparence du produit
 */
async function testEnhancedProductIntegration() {
  try {
    console.log('=== Test de l\'intégration améliorée de produits ===');
    
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
    
    // Télécharger les images vers Cloudinary pour simuler le processus complet
    console.log('\nTéléchargement des images vers Cloudinary...');
    
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
    
    // Créer un objet produit fictif pour le test
    // Nous utilisons une conversion de type pour éviter les erreurs TypeScript
    // car nous n'avons pas besoin de toutes les propriétés de IProduct pour le test
    const mockProduct = {
      _id: new mongoose.Types.ObjectId(),
      brandId: new mongoose.Types.ObjectId(),
      createdBy: new mongoose.Types.ObjectId(),
      name: 'Produit Test',
      description: 'Ceci est un produit de test pour l\'intégration améliorée',
      category: 'Boisson',
      colors: {
        primary: 'blanc',
        secondary: 'bleu'
      },
      uniqueSellingPoints: ['Naturel', 'Sain', 'Délicieux'],
      customerBenefits: ['Hydratation', 'Vitamines'],
      flavors: ['Original', 'Fraise'],
      scents: [],
      variants: [],
      technicalSheet: {
        ingredients: ['Eau', 'Fruits', 'Vitamines'],
        nutritionalInfo: 'Riche en vitamines',
        usage: 'À consommer frais',
        highlights: 'Sans conservateurs',
        specifications: {}
      },
      images: {
        main: productUrl,
        gallery: [],
        packaging: []
      },
      createdAt: new Date(),
      updatedAt: new Date()
    } as unknown as IProduct;
    
    // Test 1: Intégration avec la méthode standard
    console.log('\n=== Test 1: Intégration avec la méthode standard ===');
    console.log('Intégration du produit avec la méthode standard...');
    
    const standardResult = await ProductIntegrationWithStabilityService.integrateProductAdvanced(
      productUrl,
      backgroundUrl,
      {
        method: 'inpaint',
        prompt: 'a product seamlessly integrated into the scene, with matching lighting and perspective',
        stylePreset: 'photographic'
      }
    );
    
    console.log(`Résultat de l'intégration standard: ${standardResult}`);
    
    // Sauvegarder l'URL du résultat dans un fichier texte
    const standardResultPath = path.join(testResultsDir, 'product-integration-standard-result.txt');
    fs.writeFileSync(standardResultPath, standardResult);
    console.log(`URL du résultat standard sauvegardée: ${standardResultPath}`);
    
    // Test 2: Intégration avec la méthode améliorée
    console.log('\n=== Test 2: Intégration avec la méthode améliorée ===');
    console.log('Intégration du produit avec la méthode améliorée...');
    
    const enhancedResult = await ProductIntegrationWithStabilityService.integrateProductWithEnhancedInpaint(
      productUrl,
      backgroundUrl,
      mockProduct,
      {
        prompt: 'a product seamlessly integrated into the scene, with matching lighting and perspective',
        stylePreset: 'photographic',
        preserveProductAppearance: true,
        productDetailLevel: 9,
        maskShape: 'product-shape',
        position: 'center'
      }
    );
    
    console.log(`Résultat de l'intégration améliorée: ${enhancedResult}`);
    
    // Sauvegarder l'URL du résultat dans un fichier texte
    const enhancedResultPath = path.join(testResultsDir, 'product-integration-enhanced-result.txt');
    fs.writeFileSync(enhancedResultPath, enhancedResult);
    console.log(`URL du résultat amélioré sauvegardée: ${enhancedResultPath}`);
    
    // Test 3: Intégration avec différentes positions
    console.log('\n=== Test 3: Intégration avec différentes positions ===');
    
    const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    
    for (const position of positions) {
      console.log(`Intégration du produit en position ${position}...`);
      
      const positionResult = await ProductIntegrationWithStabilityService.integrateProductWithEnhancedInpaint(
        productUrl,
        backgroundUrl,
        mockProduct,
        {
          prompt: 'a product seamlessly integrated into the scene, with matching lighting and perspective',
          stylePreset: 'photographic',
          preserveProductAppearance: true,
          productDetailLevel: 9,
          maskShape: 'rectangle',
          position: position as any
        }
      );
      
      console.log(`Résultat de l'intégration en position ${position}: ${positionResult}`);
      
      // Sauvegarder l'URL du résultat dans un fichier texte
      const positionResultPath = path.join(testResultsDir, `product-integration-${position}-result.txt`);
      fs.writeFileSync(positionResultPath, positionResult);
      console.log(`URL du résultat en position ${position} sauvegardée: ${positionResultPath}`);
    }
    
    console.log('\n=== Tests terminés avec succès ===');
    console.log(`Tous les résultats sont disponibles dans: ${testResultsDir}`);
    
  } catch (error: any) {
    console.error('Erreur lors des tests:', error);
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
testEnhancedProductIntegration();
