import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { FileStorageService } from './FileStorageService';

/**
 * Service pour générer des masques pour l'intégration de produits
 */
export class MaskGenerationService {
  /**
   * Génère un masque pour l'intégration d'un produit
   * @param imagePath Chemin vers l'image de base
   * @param options Options de génération du masque
   * @returns URL du masque généré
   */
  static async generateMask(
    imagePath: string,
    options: {
      width: number;
      height: number;
      position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'random';
      shape?: 'rectangle' | 'ellipse';
    }
  ): Promise<string> {
    try {
      // Obtenir les informations de l'image
      const imageInfo = await this.getImageInfo(imagePath);
      
      // Déterminer la position du masque
      const position = options.position || 'center';
      const shape = options.shape || 'rectangle';
      
      // Créer un masque noir (transparent)
      const mask = sharp({
        create: {
          width: imageInfo.width,
          height: imageInfo.height,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
      });
      
      // Créer un buffer pour le masque blanc (opaque)
      const maskBuffer = Buffer.alloc(options.width * options.height * 4);
      
      // Remplir le buffer avec du blanc (255, 255, 255, 255)
      for (let i = 0; i < maskBuffer.length; i += 4) {
        maskBuffer[i] = 255;     // R
        maskBuffer[i + 1] = 255; // G
        maskBuffer[i + 2] = 255; // B
        maskBuffer[i + 3] = 255; // A
      }
      
      // Déterminer les coordonnées pour le placement du masque
      let left = 0;
      let top = 0;
      
      switch (position) {
        case 'center':
          left = Math.floor((imageInfo.width - options.width) / 2);
          top = Math.floor((imageInfo.height - options.height) / 2);
          break;
        case 'top-left':
          left = Math.floor(imageInfo.width * 0.1);
          top = Math.floor(imageInfo.height * 0.1);
          break;
        case 'top-right':
          left = Math.floor(imageInfo.width * 0.9 - options.width);
          top = Math.floor(imageInfo.height * 0.1);
          break;
        case 'bottom-left':
          left = Math.floor(imageInfo.width * 0.1);
          top = Math.floor(imageInfo.height * 0.9 - options.height);
          break;
        case 'bottom-right':
          left = Math.floor(imageInfo.width * 0.9 - options.width);
          top = Math.floor(imageInfo.height * 0.9 - options.height);
          break;
        case 'random':
          left = Math.floor(Math.random() * (imageInfo.width - options.width));
          top = Math.floor(Math.random() * (imageInfo.height - options.height));
          break;
      }
      
      // Créer le masque en fonction de la forme
      let maskShapeBuffer;
      if (shape === 'ellipse') {
        // Pour une ellipse, nous utilisons un SVG
        const svgContent = `<svg width="${options.width}" height="${options.height}">
          <ellipse cx="${options.width/2}" cy="${options.height/2}" rx="${options.width/2}" ry="${options.height/2}" fill="white"/>
        </svg>`;
        
        // Convertir le SVG en buffer PNG
        maskShapeBuffer = await sharp(Buffer.from(svgContent))
          .toFormat('png')
          .toBuffer();
      } else {
        // Pour un rectangle, nous créons une image directement
        maskShapeBuffer = await sharp({
          create: {
            width: options.width,
            height: options.height,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 255 }
          }
        })
        .toFormat('png')
        .toBuffer();
      }
      
      // Créer un masque noir (transparent) de la taille de l'image
      const finalMask = await sharp({
        create: {
          width: imageInfo.width,
          height: imageInfo.height,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
      })
      .composite([{
        input: maskShapeBuffer,
        top,
        left
      }])
      .toFormat('png')
      .toBuffer();
      
      // Sauvegarder le masque
      const tempMaskPath = path.join(process.cwd(), 'temp', `mask-${uuidv4()}.png`);
      
      // Créer le dossier temp s'il n'existe pas
      const tempDir = path.join(process.cwd(), 'temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      
      fs.writeFileSync(tempMaskPath, finalMask);
      
      // Sauvegarder le masque dans le stockage
      const { url: maskUrl } = await FileStorageService.saveImage(
        finalMask,
        {
          maxWidth: imageInfo.width,
          maxHeight: imageInfo.height,
          quality: 100,
          format: 'png'
        }
      );
      
      return maskUrl;
    } catch (error: any) {
      console.error('Erreur lors de la génération du masque:', error);
      throw error;
    }
  }
  
  /**
   * Obtient les informations d'une image
   * @param imagePath Chemin vers l'image
   * @returns Informations de l'image
   */
  static async getImageInfo(imagePath: string): Promise<{ width: number; height: number; format: string }> {
    try {
      // Vérifier si l'image est une URL
      if (imagePath.startsWith('http')) {
        // Télécharger l'image
        const response = await fetch(imagePath);
        const buffer = await response.arrayBuffer();
        
        // Obtenir les métadonnées
        const metadata = await sharp(Buffer.from(buffer)).metadata();
        
        return {
          width: metadata.width || 512,
          height: metadata.height || 512,
          format: metadata.format || 'png'
        };
      } else {
        // Lire l'image locale
        const metadata = await sharp(imagePath).metadata();
        
        return {
          width: metadata.width || 512,
          height: metadata.height || 512,
          format: metadata.format || 'png'
        };
      }
    } catch (error: any) {
      console.error('Erreur lors de l\'obtention des informations de l\'image:', error);
      // Retourner des valeurs par défaut en cas d'erreur
      return {
        width: 512,
        height: 512,
        format: 'png'
      };
    }
  }
}
