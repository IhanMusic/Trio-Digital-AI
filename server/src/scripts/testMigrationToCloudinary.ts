import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CloudinaryService } from '../services/CloudinaryService';
import { Result } from '../models/Result';
import Post from '../models/Post';
import { logger } from '../config/logger';

// Charger les variables d'environnement
dotenv.config();

// Vérifier les variables d'environnement Cloudinary
if (!process.env.CLOUDINARY_CLOUD_NAME || 
    !process.env.CLOUDINARY_API_KEY || 
    !process.env.CLOUDINARY_API_SECRET) {
  logger.error('Variables d\'environnement Cloudinary manquantes');
  logger.error('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? 'Défini' : 'Non défini');
  logger.error('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'Défini' : 'Non défini');
  logger.error('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Défini' : 'Non défini');
}

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

async function testMigrationToCloudinary() {
  try {
    logger.info('=== Test de migration d\'une image vers Cloudinary ===');
    
    // Vérifier les variables d'environnement Cloudinary
    if (!process.env.CLOUDINARY_CLOUD_NAME || 
        !process.env.CLOUDINARY_API_KEY || 
        !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Variables d\'environnement Cloudinary manquantes');
    }
    
    // Connexion à la base de données
    await mongoose.connect(process.env.MONGODB_URI as string);
    logger.info('Connecté à MongoDB');

    // Lister tous les fichiers d'images
    const files = await fsPromises.readdir(IMAGES_DIR);
    logger.info(`${files.length} images trouvées au total`);

    // Sélectionner une seule image pour le test
    const imageFiles = files.filter(file => 
      file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
    );
    
    if (imageFiles.length === 0) {
      throw new Error('Aucune image trouvée pour le test');
    }
    
    const testFile = imageFiles[0];
    logger.info(`Image sélectionnée pour le test: ${testFile}`);
    
    try {
      const filePath = path.join(IMAGES_DIR, testFile);
      const fileBuffer = await fsPromises.readFile(filePath);
      
      // Télécharger vers Cloudinary
      const { url, publicId } = await CloudinaryService.uploadImage(fileBuffer, {
        folder: 'test-migration',
        publicId: `test-${path.parse(testFile).name}` // Préfixer avec "test-" pour éviter les conflits
      });
      
      logger.info('=== Résultat du test ===');
      logger.info('✅ Migration de l\'image réussie!');
      logger.info(`Image originale: ${testFile}`);
      logger.info(`URL Cloudinary: ${url}`);
      logger.info(`ID public: ${publicId}`);
      
      // Simuler la mise à jour des références dans la base de données
      const oldUrl = `/images/${testFile}`;
      logger.info(`Ancienne URL: ${oldUrl}`);
      logger.info('Simulation de mise à jour des références dans la base de données:');
      
      // Compter les posts qui seraient mis à jour
      const postsCount = await Post.countDocuments({ 'content.imageUrl': oldUrl });
      logger.info(`Posts à mettre à jour: ${postsCount}`);
      
      // Compter les executedBriefs qui seraient mis à jour
      const executedBriefsCount = await Result.countDocuments({ 'executedBriefs.image.url': oldUrl });
      logger.info(`ExecutedBriefs à mettre à jour: ${executedBriefsCount}`);
      
      // Compter les bestImageUrl qui seraient mis à jour
      const bestImageCount = await Result.countDocuments({ 'imageGenerationSession.bestImageUrl': oldUrl });
      logger.info(`BestImageUrl à mettre à jour: ${bestImageCount}`);
      
      // Compter les history qui seraient mis à jour
      const historyCount = await Result.countDocuments({ 'imageGenerationSession.history.imageUrl': oldUrl });
      logger.info(`History à mettre à jour: ${historyCount}`);
      
      // Supprimer l'image de test de Cloudinary
      logger.info('Suppression de l\'image de test de Cloudinary...');
      await CloudinaryService.deleteImage(publicId);
      logger.info('✅ Image de test supprimée de Cloudinary');
      
    } catch (error) {
      logger.error(`❌ Erreur lors du test de migration:`, error);
    }

    logger.info('=== Test terminé ===');
    
    process.exit(0);
  } catch (error) {
    logger.error('Erreur critique lors du test de migration:', error);
    process.exit(1);
  }
}

// Exécuter le test
testMigrationToCloudinary();
