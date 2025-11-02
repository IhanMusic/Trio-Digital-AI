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

async function migrateToCloudinary() {
  try {
    logger.info('=== Début de la migration des images vers Cloudinary ===');
    
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
    logger.info(`${files.length} images trouvées à migrer`);

    // Migrer chaque image
    let successCount = 0;
    let errorCount = 0;
    
    for (const file of files) {
      try {
        if (!file.endsWith('.png') && !file.endsWith('.jpg') && !file.endsWith('.jpeg')) {
          logger.info(`Ignoré: ${file} (pas une image)`);
          continue;
        }
        
        const filePath = path.join(IMAGES_DIR, file);
        const fileBuffer = await fsPromises.readFile(filePath);
        
        // Déterminer le dossier en fonction du contexte de l'image
        // Par défaut, utiliser le dossier "migrated-images"
        let folder = 'migrated-images';
        
        // Télécharger vers Cloudinary
        const { url, publicId } = await CloudinaryService.uploadImage(fileBuffer, {
          folder,
          publicId: path.parse(file).name // Utiliser le même nom sans extension
        });
        
        // Mettre à jour les références dans la base de données
        const oldUrl = `/images/${file}`;
        
        // Mettre à jour les posts
        const postsResult = await Post.updateMany(
          { 'content.imageUrl': oldUrl },
          { 
            $set: { 
              'content.imageUrl': url,
              'content.imagePublicId': publicId 
            } 
          }
        );
        
        // Mettre à jour les résultats (executedBriefs)
        const executedBriefsResult = await Result.updateMany(
          { 'executedBriefs.image.url': oldUrl },
          { 
            $set: { 
              'executedBriefs.$[elem].image.url': url,
              'executedBriefs.$[elem].image.publicId': publicId 
            } 
          },
          { arrayFilters: [{ 'elem.image.url': oldUrl }] }
        );
        
        // Mettre à jour les résultats (imageGenerationSession.bestImageUrl)
        const bestImageResult = await Result.updateMany(
          { 'imageGenerationSession.bestImageUrl': oldUrl },
          { 
            $set: { 
              'imageGenerationSession.bestImageUrl': url,
              'imageGenerationSession.bestImagePublicId': publicId
            } 
          }
        );
        
        // Mettre à jour les résultats (imageGenerationSession.history.imageUrl)
        const historyResult = await Result.updateMany(
          { 'imageGenerationSession.history.imageUrl': oldUrl },
          { 
            $set: { 
              'imageGenerationSession.history.$[elem].imageUrl': url,
              'imageGenerationSession.history.$[elem].imagePublicId': publicId
            } 
          },
          { arrayFilters: [{ 'elem.imageUrl': oldUrl }] }
        );
        
        logger.info(`✅ Migré: ${file} -> ${url}`);
        logger.info(`   Posts mis à jour: ${postsResult.modifiedCount}`);
        logger.info(`   ExecutedBriefs mis à jour: ${executedBriefsResult.modifiedCount}`);
        logger.info(`   BestImageUrl mis à jour: ${bestImageResult.modifiedCount}`);
        logger.info(`   History mis à jour: ${historyResult.modifiedCount}`);
        
        successCount++;
      } catch (error) {
        logger.error(`❌ Erreur lors de la migration de ${file}:`, error);
        errorCount++;
      }
    }

    logger.info('\n=== Résumé de la migration ===');
    logger.info(`Total d'images: ${files.length}`);
    logger.info(`Succès: ${successCount}`);
    logger.info(`Erreurs: ${errorCount}`);
    logger.info('Migration terminée');
    
    process.exit(0);
  } catch (error) {
    logger.error('Erreur critique lors de la migration:', error);
    process.exit(1);
  }
}

// Exécuter la migration
migrateToCloudinary();
