import { v2 as cloudinary } from 'cloudinary';
import { logger } from '../config/logger';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Vérifier que les variables d'environnement sont définies
if (!process.env.CLOUDINARY_CLOUD_NAME || 
    !process.env.CLOUDINARY_API_KEY || 
    !process.env.CLOUDINARY_API_SECRET) {
  logger.error('Variables d\'environnement Cloudinary manquantes');
  logger.error('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? 'Défini' : 'Non défini');
  logger.error('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'Défini' : 'Non défini');
  logger.error('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Défini' : 'Non défini');
}

// Configuration de Cloudinary avec les identifiants
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || ''
});

export class CloudinaryService {
  static async uploadImage(
    imageBuffer: Buffer,
    options: {
      folder?: string;
      publicId?: string;
      transformation?: any;
    } = {}
  ): Promise<{ url: string; publicId: string }> {
    // Vérifier à nouveau les variables d'environnement
    if (!process.env.CLOUDINARY_CLOUD_NAME || 
        !process.env.CLOUDINARY_API_KEY || 
        !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Variables d\'environnement Cloudinary manquantes');
    }
    
    // Reconfigurer Cloudinary à chaque appel pour s'assurer que les variables d'environnement sont utilisées
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    try {
      logger.info('Début du téléchargement vers Cloudinary...');
      
      // Convertir le buffer en base64
      const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;
      
      // Configurer les options de téléchargement
      const uploadOptions: any = {
        folder: options.folder || 'trio-digital',
        resource_type: 'image',
        quality: 'auto',
        fetch_format: 'auto'
      };
      
      if (options.publicId) {
        uploadOptions.public_id = options.publicId;
      }
      
      if (options.transformation) {
        uploadOptions.transformation = options.transformation;
      }
      
      // Télécharger l'image
      const result = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload(base64Image, uploadOptions, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        });
      });
      
      logger.info('Image téléchargée avec succès vers Cloudinary');
      logger.info('URL:', result.secure_url);
      
      // Vérifier que l'URL est bien une URL complète et non une chaîne de connexion
      if (!result.secure_url || !result.secure_url.startsWith('http')) {
        logger.error('URL Cloudinary invalide:', result.secure_url);
        throw new Error('URL Cloudinary invalide');
      }
      
      return {
        url: result.secure_url,
        publicId: result.public_id
      };
    } catch (error) {
      logger.error('Erreur lors du téléchargement vers Cloudinary:', error);
      throw error;
    }
  }
  
  static async deleteImage(publicId: string): Promise<void> {
    try {
      if (!publicId) return;
      
      await new Promise<void>((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
          if (error) reject(error);
          else resolve();
        });
      });
      
      logger.info('Image supprimée de Cloudinary:', publicId);
    } catch (error) {
      logger.error('Erreur lors de la suppression de l\'image:', error);
      throw error;
    }
  }
  
  static getImageUrl(publicId: string, options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
    format?: string;
  } = {}): string {
    const transformation = [];
    
    if (options.width || options.height) {
      const resizeOptions: any = {};
      if (options.width) resizeOptions.width = options.width;
      if (options.height) resizeOptions.height = options.height;
      if (options.crop) resizeOptions.crop = options.crop;
      transformation.push(resizeOptions);
    }
    
    if (options.quality) {
      transformation.push({ quality: options.quality });
    }
    
    if (options.format) {
      transformation.push({ fetch_format: options.format });
    }
    
    const url = cloudinary.url(publicId, {
      secure: true,
      transformation
    });
    
    // Vérifier que l'URL est bien une URL complète
    if (!url || !url.startsWith('http')) {
      logger.error('URL Cloudinary générée invalide:', url);
      // Générer une URL de secours basée sur le cloud_name et le publicId
      return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`;
    }
    
    return url;
  }
}
