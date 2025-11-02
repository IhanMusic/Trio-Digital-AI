import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { CloudinaryService } from '../services/CloudinaryService';
import { logger } from '../config/logger';

// Charger les variables d'environnement
dotenv.config();

async function testCloudinaryConnection() {
  try {
    logger.info('=== Test de connexion à Cloudinary ===');
    
    // Vérifier les variables d'environnement Cloudinary
    if (!process.env.CLOUDINARY_CLOUD_NAME || 
        !process.env.CLOUDINARY_API_KEY || 
        !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Variables d\'environnement Cloudinary manquantes');
    }
    
    logger.info('Variables d\'environnement Cloudinary trouvées:');
    logger.info(`CLOUDINARY_CLOUD_NAME: ${process.env.CLOUDINARY_CLOUD_NAME}`);
    logger.info(`CLOUDINARY_API_KEY: ${process.env.CLOUDINARY_API_KEY}`);
    logger.info(`CLOUDINARY_API_SECRET: ${process.env.CLOUDINARY_API_SECRET.substring(0, 3)}...`); // Afficher seulement les premiers caractères pour la sécurité
    
    // Charger une image de test
    const testImagePath = path.join(process.cwd(), 'src', 'test-images', 'product.jpg');
    logger.info(`Chargement de l'image de test: ${testImagePath}`);
    
    if (!fs.existsSync(testImagePath)) {
      throw new Error(`Image de test non trouvée: ${testImagePath}`);
    }
    
    const imageBuffer = fs.readFileSync(testImagePath);
    logger.info(`Image chargée, taille: ${imageBuffer.length} octets`);
    
    // Tester l'upload vers Cloudinary
    logger.info('Tentative d\'upload vers Cloudinary...');
    const result = await CloudinaryService.uploadImage(imageBuffer, {
      folder: 'test-connection',
      publicId: `test-connection-${Date.now()}`
    });
    
    logger.info('=== Résultat du test ===');
    logger.info('✅ Connexion à Cloudinary réussie!');
    logger.info(`URL de l'image: ${result.url}`);
    logger.info(`ID public: ${result.publicId}`);
    
    // Tester la suppression de l'image
    logger.info('Tentative de suppression de l\'image...');
    await CloudinaryService.deleteImage(result.publicId);
    logger.info('✅ Suppression de l\'image réussie!');
    
    logger.info('=== Test terminé avec succès ===');
    process.exit(0);
  } catch (error) {
    logger.error('❌ Erreur lors du test de connexion à Cloudinary:', error);
    if (error instanceof Error) {
      logger.error('Message d\'erreur:', error.message);
      logger.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

// Exécuter le test
testCloudinaryConnection();
