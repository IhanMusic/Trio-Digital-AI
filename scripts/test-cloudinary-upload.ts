import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { CloudinaryService } from '../server/src/services/CloudinaryService.js';
import { FileStorageService } from '../server/src/services/FileStorageService.js';

// Charger les variables d'environnement depuis le serveur
dotenv.config({ path: path.join(__dirname, '../server/.env') });

async function testCloudinaryUpload() {
  console.log('🧪 Test de l\'upload Cloudinary avec orange ananas-Camera.jpg');
  console.log('=' .repeat(60));
  
  try {
    // 1. Vérifier les variables d'environnement
    console.log('\n📋 Vérification des variables d\'environnement:');
    console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? '✅ Défini' : '❌ Non défini');
    console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✅ Défini' : '❌ Non défini');
    console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✅ Défini' : '❌ Non défini');
    
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Variables d\'environnement Cloudinary manquantes');
    }
    
    // 2. Charger le fichier image
    const imagePath = path.join(__dirname, '../orange ananas-Camera.jpg');
    console.log('\n📁 Chargement du fichier:', imagePath);
    
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Fichier non trouvé: ${imagePath}`);
    }
    
    const imageBuffer = fs.readFileSync(imagePath);
    console.log('✅ Fichier chargé, taille:', imageBuffer.length, 'octets');
    
    // 3. Test avec CloudinaryService directement
    console.log('\n🔄 Test 1: Upload direct avec CloudinaryService...');
    try {
      const result1 = await CloudinaryService.uploadImage(imageBuffer, {
        folder: 'test-product-upload',
        transformation: {
          quality: 'auto',
          fetch_format: 'auto'
        }
      });
      
      console.log('✅ Upload CloudinaryService réussi!');
      console.log('URL:', result1.url);
      console.log('Public ID:', result1.publicId);
      
      // Nettoyer l'image de test
      console.log('\n🧹 Nettoyage de l\'image de test...');
      await CloudinaryService.deleteImage(result1.publicId);
      console.log('✅ Image de test supprimée');
      
    } catch (error) {
      console.error('❌ Erreur CloudinaryService:', error);
      throw error;
    }
    
    // 4. Test avec FileStorageService (qui utilise CloudinaryService)
    console.log('\n🔄 Test 2: Upload avec FileStorageService...');
    try {
      const result2 = await FileStorageService.saveImage(imageBuffer, {
        purpose: 'product',
        useCloudinary: true,
        maxWidth: 1024,
        maxHeight: 1024
      });
      
      console.log('✅ Upload FileStorageService réussi!');
      console.log('URL:', result2.url);
      console.log('Public ID:', result2.publicId);
      console.log('Métadonnées:', result2.metadata);
      
      // Nettoyer l'image de test
      if (result2.publicId) {
        console.log('\n🧹 Nettoyage de l\'image de test...');
        await CloudinaryService.deleteImage(result2.publicId);
        console.log('✅ Image de test supprimée');
      }
      
    } catch (error) {
      console.error('❌ Erreur FileStorageService:', error);
      throw error;
    }
    
    // 5. Test de validation des buffers
    console.log('\n🔄 Test 3: Validation du buffer d\'image...');
    try {
      // Simuler la validation qui se fait dans FileStorageService
      const sharp = require('sharp');
      const metadata = await sharp(imageBuffer).metadata();
      
      console.log('✅ Validation du buffer réussie!');
      console.log('Format:', metadata.format);
      console.log('Dimensions:', `${metadata.width}x${metadata.height}`);
      console.log('Taille:', metadata.size, 'octets');
      
    } catch (error) {
      console.error('❌ Erreur validation buffer:', error);
      throw error;
    }
    
    console.log('\n🎉 TOUS LES TESTS SONT PASSÉS!');
    console.log('✅ Cloudinary fonctionne correctement');
    console.log('✅ Les services d\'upload fonctionnent');
    console.log('✅ La validation des images fonctionne');
    
  } catch (error) {
    console.error('\n💥 ERREUR DANS LES TESTS:');
    console.error(error);
    
    // Diagnostic détaillé
    console.log('\n🔍 DIAGNOSTIC:');
    if (error instanceof Error) {
      if (error.message.includes('Variables d\'environnement')) {
        console.log('❌ Problème de configuration Cloudinary');
        console.log('   → Vérifiez le fichier server/.env');
      } else if (error.message.includes('Fichier non trouvé')) {
        console.log('❌ Fichier image introuvable');
        console.log('   → Vérifiez que orange ananas-Camera.jpg existe dans le dossier racine');
      } else if (error.message.includes('cloudinary')) {
        console.log('❌ Problème de connexion Cloudinary');
        console.log('   → Vérifiez vos identifiants Cloudinary');
      } else {
        console.log('❌ Erreur inconnue:', error.message);
      }
    }
    
    process.exit(1);
  }
}

// Exécuter le test
testCloudinaryUpload().catch(console.error);
