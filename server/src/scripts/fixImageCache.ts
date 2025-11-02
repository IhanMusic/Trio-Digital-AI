#!/usr/bin/env node
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

async function fixImageCache() {
  try {
    // Connexion à MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/social_media_ai';
    const connection = await mongoose.connect(mongoUri);
    console.log('Connecté à MongoDB');

    // Supprimer l'index imageId
    const db = connection.connection.db;
    if (!db) {
      throw new Error('Impossible de se connecter à la base de données');
    }

    const result = await db.collection('imagecaches').dropIndex('imageId_1');
    console.log('Index imageId_1 supprimé avec succès');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error: any) {
    if (error.code === 27) {
      console.log('L\'index imageId_1 n\'existe pas, aucune action nécessaire');
    } else {
      console.error('Erreur lors de la suppression de l\'index:', error);
    }
    await mongoose.disconnect();
    process.exit(1);
  }
}

fixImageCache();
