import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from '../config/logger';
import Product, { IProduct } from '../models/Product';
import ProductAnalysisService from '../services/ProductAnalysisService';
import { ImageGenerationService } from '../services/ImageGenerationService';
import fs from 'fs';
import path from 'path';

// Charger les variables d'environnement
dotenv.config();

/**
 * Script de test pour l'analyse détaillée des produits et la génération d'images
 */
async function testProductAnalysis() {
  try {
    // Connexion à MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/social-media-manager';
    await mongoose.connect(MONGODB_URI);
    logger.info('Connexion à MongoDB établie');

    // Récupérer un produit de test
    const products = await Product.find().limit(1);
    
    if (products.length === 0) {
      logger.error('Aucun produit trouvé dans la base de données');
      
      // Créer un produit de test si aucun n'existe
      logger.info('Création d\'un produit de test...');
      const testProduct = await createTestProduct();
      await runTests(testProduct);
    } else {
      // Utiliser le premier produit trouvé
      const product = products[0];
      logger.info(`Produit de test sélectionné: ${product.name}`);
      await runTests(product);
    }

    // Déconnexion de MongoDB
    await mongoose.disconnect();
    logger.info('Déconnexion de MongoDB');
    
  } catch (error: any) {
    logger.error('Erreur lors du test:', error.message);
    process.exit(1);
  }
}

/**
 * Exécute les tests d'analyse de produit et de génération d'image
 */
async function runTests(product: IProduct) {
  try {
    // Test 1: Générer une analyse détaillée du produit
    logger.info('=== Test 1: Génération d\'une analyse détaillée du produit ===');
    const analysis = await ProductAnalysisService.generateDetailedAnalysis(product, {
      purpose: 'product',
      style: 'photorealistic',
      angle: 'front',
      lighting: 'studio'
    });
    
    logger.info('Analyse détaillée générée:');
    logger.info(analysis);
    
    // Sauvegarder l'analyse dans un fichier
    const analysisDir = path.join(process.cwd(), 'test-results');
    if (!fs.existsSync(analysisDir)) {
      fs.mkdirSync(analysisDir, { recursive: true });
    }
    
    const analysisPath = path.join(analysisDir, `product-analysis-${Date.now()}.txt`);
    fs.writeFileSync(analysisPath, analysis);
    logger.info(`Analyse sauvegardée dans: ${analysisPath}`);
    
    // Test 2: Enrichir un prompt avec l'analyse du produit
    logger.info('\n=== Test 2: Enrichissement d\'un prompt avec l\'analyse du produit ===');
    const basePrompt = `A professional product image of ${product.name} on a clean white background, with soft shadows and high-quality lighting.`;
    
    const enhancedPrompt = await ProductAnalysisService.enhancePromptWithProductAnalysis(
      basePrompt,
      product,
      {
        purpose: 'product',
        style: 'photorealistic',
        angle: 'front',
        lighting: 'studio',
        includeBackground: false
      }
    );
    
    logger.info('Prompt enrichi:');
    logger.info(enhancedPrompt);
    
    // Sauvegarder le prompt enrichi dans un fichier
    const promptPath = path.join(analysisDir, `enhanced-prompt-${Date.now()}.txt`);
    fs.writeFileSync(promptPath, enhancedPrompt);
    logger.info(`Prompt enrichi sauvegardé dans: ${promptPath}`);
    
    // Test 3: Générer une image avec l'analyse détaillée du produit
    logger.info('\n=== Test 3: Génération d\'image avec l\'analyse détaillée du produit ===');
    
    const imageResult = await ImageGenerationService.generateProductImage(
      basePrompt,
      product,
      {
        purpose: 'product',
        aspect_ratio: '1:1',
        style: 'photorealistic',
        angle: 'front',
        lighting: 'studio',
        includeBackground: false
      }
    );
    
    if (imageResult && imageResult.url) {
      logger.info('✅ Image générée avec succès');
      logger.info('URL de l\'image:', imageResult.url);
      
      if (imageResult.publicId) {
        logger.info('ID public Cloudinary:', imageResult.publicId);
      }
    } else {
      logger.error('❌ Échec de la génération d\'image');
    }
    
    logger.info('\n=== Tests terminés avec succès ===');
    
  } catch (error: any) {
    logger.error('Erreur lors des tests:', error.message);
    throw error;
  }
}

/**
 * Crée un produit de test si aucun n'existe dans la base de données
 */
async function createTestProduct(): Promise<IProduct> {
  try {
    logger.info('Création d\'un produit de test...');
    
    const testProduct = new Product({
      name: 'Bouteille d\'eau écologique',
      description: 'Bouteille d\'eau réutilisable en acier inoxydable, double paroi isolante, maintient les boissons froides pendant 24h et chaudes pendant 12h.',
      category: 'Accessoires écologiques',
      brandId: new mongoose.Types.ObjectId(), // ID fictif
      createdBy: new mongoose.Types.ObjectId(), // ID fictif
      
      colors: {
        primary: '#2E86C1',
        secondary: '#D6EAF8',
        accent: '#1ABC9C'
      },
      
      flavors: [],
      scents: [],
      variants: ['500ml', '750ml', '1L'],
      
      uniqueSellingPoints: [
        'Sans BPA ni toxines',
        'Acier inoxydable 18/8 de qualité alimentaire',
        'Double paroi isolante',
        'Design anti-fuite',
        'Durable et écologique'
      ],
      
      customerBenefits: [
        'Maintient les boissons froides pendant 24h et chaudes pendant 12h',
        'Réduit les déchets plastiques',
        'Économies à long terme par rapport aux bouteilles jetables',
        'Facile à nettoyer et à transporter'
      ],
      
      technicalSheet: {
        ingredients: ['Acier inoxydable 18/8', 'Silicone alimentaire', 'Polypropylène sans BPA'],
        usage: 'Lavable au lave-vaisselle (panier supérieur uniquement). Ne pas mettre au micro-ondes.',
        storage: 'Nettoyer et sécher complètement avant un stockage prolongé.',
        highlights: 'Technologie d\'isolation sous vide entre les deux parois en acier inoxydable.',
        specifications: {
          'Poids': '350g (modèle 750ml)',
          'Dimensions': '27cm x 7.5cm (modèle 750ml)',
          'Capacité': '750ml',
          'Matériau': 'Acier inoxydable 18/8',
          'Garantie': '5 ans'
        }
      },
      
      images: {
        main: 'https://example.com/bottle.jpg',
        gallery: [],
        packaging: []
      }
    });
    
    await testProduct.save();
    logger.info('Produit de test créé avec succès:', testProduct.name);
    
    return testProduct;
  } catch (error: any) {
    logger.error('Erreur lors de la création du produit de test:', error.message);
    throw error;
  }
}

// Exécuter le script
testProductAnalysis().catch(error => {
  logger.error('Erreur non gérée:', error);
  process.exit(1);
});
