import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { promises as fsPromises } from 'fs';
import { CloudinaryService } from './CloudinaryService';
import { logger } from '../config/logger';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const TEMP_DIR = path.join(process.cwd(), 'temp');

// Assurer que les dossiers existent
[PUBLIC_DIR, IMAGES_DIR, TEMP_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

interface ImageMetadata {
  width: number;
  height: number;
  format: string;
}

interface ImageOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'png' | 'webp' | 'jpeg';
  purpose?: 'social' | 'product' | 'lifestyle';
  useCloudinary?: boolean;
}

export class FileStorageService {
  private static async validateImageBuffer(buffer: Buffer): Promise<boolean> {
    try {
      // Vérifier si le buffer est vide
      if (!buffer || buffer.length === 0) {
        console.error('Buffer d\'image vide');
        return false;
      }

      // Vérifier les premiers octets pour identifier le format
      const signature = buffer.toString('hex', 0, 4);
      console.log('Signature du fichier:', signature);

      // Liste des signatures de fichiers d'image courants
      const validSignatures = {
        'ffd8ffe0': 'jpeg',
        'ffd8ffe1': 'jpeg', // EXIF
        'ffd8ffe2': 'jpeg', // Canon
        'ffd8ffe3': 'jpeg', // Samsung
        'ffd8ffe8': 'jpeg', // SPIFF
        'ffd8ffed': 'jpeg', // Photoshop
        'ffd8ffee': 'jpeg', // Adobe
        '89504e47': 'png',
        '52494646': 'webp', // RIFF
        '49492a00': 'tiff',
        '4d4d002a': 'tiff'
      };

      if (!Object.keys(validSignatures).includes(signature)) {
        console.error('Format de fichier non reconnu, signature:', signature);
        // Essayer de valider avec Sharp directement au lieu de rejeter
        try {
          const metadata = await sharp(buffer, { failOnError: false }).metadata();
          if (metadata && metadata.width && metadata.height) {
            console.log('Image validée par Sharp malgré signature inconnue');
            return true;
          }
        } catch (error) {
          console.error('Validation Sharp échouée:', error);
        }
        return false;
      }

      // Tenter de lire les métadonnées avec sharp
      const metadata = await sharp(buffer, { failOnError: false }).metadata();
      if (!metadata || !metadata.width || !metadata.height) {
        console.error('Impossible de lire les métadonnées de l\'image');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur lors de la validation du buffer:', error);
      return false;
    }
  }

  static async saveImage(
    imageBuffer: Buffer,
    options: ImageOptions = {}
  ): Promise<{ url: string; metadata: ImageMetadata; publicId?: string }> {
    try {
      console.log('Début du traitement de l\'image...');
      console.log('Taille du buffer:', imageBuffer.length, 'octets');

      // Valider le buffer d'image
      const isValid = await this.validateImageBuffer(imageBuffer);
      if (!isValid) {
        throw new Error('Format d\'image non valide ou corrompu');
      }

      // Créer une instance sharp avec le buffer
      const image = sharp(imageBuffer, { failOnError: false });

      // Obtenir les métadonnées
      const metadata = await image.metadata();
      if (!metadata.width || !metadata.height) {
        throw new Error('Impossible de lire les dimensions de l\'image');
      }

      // Calculer les dimensions de sortie
      const maxWidth = options.maxWidth || 2048;
      const maxHeight = options.maxHeight || 2048;
      const aspectRatio = metadata.width / metadata.height;

      let width = metadata.width;
      let height = metadata.height;

      if (width > maxWidth) {
        width = maxWidth;
        height = Math.round(width / aspectRatio);
      }

      if (height > maxHeight) {
        height = maxHeight;
        width = Math.round(height * aspectRatio);
      }

      // Redimensionner et optimiser
      const processedBuffer = await image
        .resize(width, height, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .png({ quality: 100 })
        .toBuffer();

      // Utiliser Cloudinary si spécifié (par défaut)
      const useCloudinary = options.useCloudinary !== false;
      
      if (useCloudinary) {
        // Déterminer le dossier Cloudinary en fonction de l'option purpose
        let folder = 'trio-digital';
        if (options.purpose) {
          switch (options.purpose) {
            case 'social':
              folder = 'social-posts';
              break;
            case 'product':
              folder = 'product-integration';
              break;
            case 'lifestyle':
              folder = 'lifestyle-images';
              break;
          }
        }
        
        // Télécharger vers Cloudinary
        const { url, publicId } = await CloudinaryService.uploadImage(processedBuffer, {
          folder,
          transformation: {
            quality: 'auto',
            fetch_format: 'auto'
          }
        });
        
        logger.info('Image téléchargée vers Cloudinary avec succès:', url);
        
        return {
          url,
          publicId,
          metadata: {
            width,
            height,
            format: 'png'
          }
        };
      } else {
        // Fallback: stockage local (pour la compatibilité)
        // Générer un nom de fichier unique
        const fileName = `${uuidv4()}.png`;
        const filePath = path.join(IMAGES_DIR, fileName);

        // Sauvegarder le fichier
        await fsPromises.writeFile(filePath, processedBuffer);

        // Construire l'URL relative
        const url = `/images/${fileName}`;

        logger.info('Image traitée et sauvegardée localement avec succès:', url);

        return {
          url,
          metadata: {
            width,
            height,
            format: 'png'
          }
        };
      }
    } catch (error) {
      console.error('Erreur détaillée lors de la sauvegarde de l\'image:', error);
      throw error;
    }
  }

  static async deleteImage(url: string, publicId?: string): Promise<void> {
    try {
      // Si un publicId est fourni, supprimer de Cloudinary
      if (publicId) {
        await CloudinaryService.deleteImage(publicId);
        logger.info('Image supprimée de Cloudinary:', publicId);
        return;
      }
      
      // Sinon, essayer de supprimer localement (pour la compatibilité)
      if (!url) return;

      // Vérifier si c'est une URL Cloudinary
      if (url.includes('cloudinary.com')) {
        logger.info('URL Cloudinary détectée mais pas de publicId fourni:', url);
        return;
      }

      const fileName = url.split('/').pop();
      if (!fileName) return;

      const filePath = path.join(IMAGES_DIR, fileName);

      if (fs.existsSync(filePath)) {
        await fsPromises.unlink(filePath);
        logger.info('Image locale supprimée:', filePath);
      }
    } catch (error) {
      logger.error('Erreur lors de la suppression de l\'image:', error);
      throw error;
    }
  }

  static async verifyImageExists(url: string, publicId?: string): Promise<boolean> {
    // Si c'est une URL Cloudinary, on considère qu'elle existe
    if (url.includes('cloudinary.com')) {
      return true;
    }
    
    // Sinon, vérifier localement
    if (!url) return false;

    const fileName = url.split('/').pop();
    if (!fileName) return false;

    const filePath = path.join(IMAGES_DIR, fileName);
    return fs.existsSync(filePath);
  }

  static async getImageMetadata(url: string, publicId?: string): Promise<ImageMetadata> {
    try {
      // Si c'est une URL Cloudinary, on ne peut pas récupérer les métadonnées directement
      // On retourne des valeurs par défaut ou on pourrait implémenter une requête à l'API Cloudinary
      if (url.includes('cloudinary.com')) {
        return {
          width: 1024, // Valeur par défaut
          height: 1024, // Valeur par défaut
          format: 'png'
        };
      }
      
      // Sinon, récupérer les métadonnées localement
      if (!url) throw new Error('URL requise');

      const fileName = url.split('/').pop();
      if (!fileName) throw new Error('Nom de fichier invalide');

      const filePath = path.join(IMAGES_DIR, fileName);

      if (!fs.existsSync(filePath)) {
        throw new Error('Image non trouvée');
      }

      const metadata = await sharp(filePath).metadata();

      if (!metadata.width || !metadata.height || !metadata.format) {
        throw new Error('Métadonnées incomplètes');
      }

      return {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format
      };
    } catch (error) {
      logger.error('Erreur lors de la récupération des métadonnées:', error);
      throw error;
    }
  }

  /**
   * Sauvegarde une vidéo sur Cloudinary
   */
  static async saveVideo(
    videoBuffer: Buffer,
    options: {
      folder?: string;
      resource_type?: string;
      format?: string;
    } = {}
  ): Promise<{
    url: string;
    publicId: string;
    duration?: number;
    format: string;
    width?: number;
    height?: number;
    resolution?: string;
  }> {
    try {
      logger.info('Début du téléchargement de la vidéo sur Cloudinary...');
      logger.info('Taille du buffer:', videoBuffer.length, 'octets');

      const folder = options.folder || 'generated-videos';
      
      // Uploader vers Cloudinary
      const result = await CloudinaryService.uploadVideo(videoBuffer, {
        folder,
        resource_type: 'video',
        format: options.format || 'mp4'
      });

      logger.info('Vidéo téléchargée vers Cloudinary avec succès:', result.url);

      return {
        url: result.url,
        publicId: result.publicId,
        duration: result.duration,
        format: result.format || 'mp4',
        width: result.width,
        height: result.height,
        resolution: result.height ? `${result.height}p` : undefined
      };
    } catch (error) {
      logger.error('Erreur lors de la sauvegarde de la vidéo:', error);
      throw error;
    }
  }
}
