import { promises as fs } from 'fs';
import path from 'path';
import { ImageCache } from '../models/ImageCache';
import { FileStorageService } from './FileStorageService';
import mongoose from 'mongoose';

interface ValidationDetails {
  score: number;
  quality: string;
  details: Array<{
    criteriaName: string;
    score: number;
    feedback: string;
  }>;
  suggestions: string[];
  technicalIssues: string[];
  styleIssues: string[];
  sectorIssues: string[];
}

interface GenerationParams {
  cfgScale?: number;
  steps?: number;
  samples?: number;
  width?: number;
  height?: number;
}

interface CacheMetadata {
  purpose?: string;
  timeOfDay?: string;
  sector?: string;
  style?: string;
  quality?: string;
  brandId: string;
  userId: mongoose.Types.ObjectId;
}

export class ImageCacheService {
  private static async downloadImage(url: string): Promise<Buffer> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error);
      throw error;
    }
  }

  static async addToCache(
    prompt: string,
    briefId: string,
    params: GenerationParams = {},
    imageUrl: string,
    score: number,
    validationDetails: ValidationDetails,
    metadata: CacheMetadata
  ): Promise<void> {
    let retries = 3;
    let lastError: Error | null = null;

    // Normaliser les paramètres avec des valeurs par défaut
    const normalizedParams = {
      cfgScale: params.cfgScale || 0,
      steps: params.steps || 0,
      samples: params.samples || 1,
      width: params.width,
      height: params.height
    };

    while (retries > 0) {
      try {
        console.log(`Tentative d'ajout au cache (${4 - retries}/3)`);

        // Vérifier si l'image existe déjà dans le cache
        const existingImage = await ImageCache.findOne({
          prompt,
          'params.cfgScale': normalizedParams.cfgScale,
          'params.steps': normalizedParams.steps,
          'params.samples': normalizedParams.samples,
          'metadata.brandId': metadata.brandId
        });

        if (existingImage) {
          console.log('Image déjà en cache');
          return;
        }

        // Si l'URL est une URL complète, télécharger l'image
        let imageBuffer: Buffer;
        if (imageUrl.startsWith('http')) {
          imageBuffer = await this.downloadImage(imageUrl);
        } else {
          // Si c'est une URL relative, lire le fichier local
          const filePath = path.join(process.cwd(), 'public', imageUrl);
          imageBuffer = await fs.readFile(filePath);
        }

        // Sauvegarder l'image avec FileStorageService
        const { url: savedUrl } = await FileStorageService.saveImage(imageBuffer, {
          maxWidth: normalizedParams.width || 1024,
          maxHeight: normalizedParams.height || 1024,
          quality: 100,
          format: 'png'
        });

        // Créer l'entrée dans le cache
        const cacheEntry = new ImageCache({
          prompt,
          briefId,
          params: normalizedParams,
          imageUrl: savedUrl,
          score,
          validationDetails,
          metadata,
          createdAt: new Date()
        });

        await cacheEntry.save();
        console.log('Image ajoutée au cache avec succès');
        return;

      } catch (error) {
        console.error(`Erreur ajout au cache (tentative ${4 - retries}):`, error);
        lastError = error as Error;
        retries--;
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }

    if (lastError) {
      throw lastError;
    }
  }

  static async findInCache(
    prompt: string,
    params: GenerationParams,
    metadata: CacheMetadata
  ): Promise<{
    found: boolean;
    imageUrl?: string;
    score?: number;
    validationDetails?: ValidationDetails;
  }> {
    try {
      // Normaliser les paramètres avec des valeurs par défaut
      const normalizedParams = {
        cfgScale: params.cfgScale || 0,
        steps: params.steps || 0,
        samples: params.samples || 1,
        width: params.width,
        height: params.height
      };

      // Construire la requête de base
      const query: any = {
        prompt,
        'params.cfgScale': normalizedParams.cfgScale,
        'params.steps': normalizedParams.steps,
        'params.samples': normalizedParams.samples,
        'metadata.brandId': metadata.brandId
      };

      // Ajouter les dimensions si spécifiées
      if (normalizedParams.width) query['params.width'] = normalizedParams.width;
      if (normalizedParams.height) query['params.height'] = normalizedParams.height;

      // Ajouter les critères de métadonnées si fournis
      if (metadata.purpose) query['metadata.purpose'] = metadata.purpose;
      if (metadata.timeOfDay) query['metadata.timeOfDay'] = metadata.timeOfDay;
      if (metadata.sector) query['metadata.sector'] = metadata.sector;
      if (metadata.style) query['metadata.style'] = metadata.style;
      if (metadata.quality) query['metadata.quality'] = metadata.quality;

      const cacheEntry = await ImageCache.findOne(query);

      if (!cacheEntry) {
        return { found: false };
      }

      // Vérifier si l'image existe toujours
      const imageExists = await FileStorageService.verifyImageExists(cacheEntry.imageUrl);
      if (!imageExists) {
        await ImageCache.deleteOne({ _id: cacheEntry._id });
        return { found: false };
      }

      return {
        found: true,
        imageUrl: cacheEntry.imageUrl,
        score: cacheEntry.score,
        validationDetails: cacheEntry.validationDetails
      };

    } catch (error) {
      console.error('Erreur lors de la recherche dans le cache:', error);
      return { found: false };
    }
  }

  static async clearCache(olderThanDays: number = 30, brandId?: string): Promise<void> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

      const query: any = {
        createdAt: { $lt: cutoffDate }
      };

      if (brandId) {
        query['metadata.brandId'] = brandId;
      }

      const oldEntries = await ImageCache.find(query);

      // Supprimer les fichiers d'image
      for (const entry of oldEntries) {
        try {
          await FileStorageService.deleteImage(entry.imageUrl);
        } catch (error) {
          console.error(`Erreur lors de la suppression de l'image ${entry.imageUrl}:`, error);
        }
      }

      // Supprimer les entrées de la base de données
      await ImageCache.deleteMany(query);

    } catch (error) {
      console.error('Erreur lors du nettoyage du cache:', error);
      throw error;
    }
  }

  static async getStats(brandId?: string): Promise<{
    totalImages: number;
    totalSize: number;
    averageScore: number;
  }> {
    try {
      const query = brandId ? { 'metadata.brandId': brandId } : {};
      
      const totalImages = await ImageCache.countDocuments(query);
      const aggregation = await ImageCache.aggregate([
        { $match: query },
        {
          $group: {
            _id: null,
            averageScore: { $avg: '$score' }
          }
        }
      ]);

      let totalSize = 0;
      const entries = await ImageCache.find(query, 'imageUrl');
      
      for (const entry of entries) {
        try {
          const metadata = await FileStorageService.getImageMetadata(entry.imageUrl);
          totalSize += (metadata.width * metadata.height * 4); // 4 bytes par pixel (RGBA)
        } catch (error) {
          console.error(`Erreur lors de la récupération des métadonnées pour ${entry.imageUrl}:`, error);
        }
      }

      return {
        totalImages,
        totalSize,
        averageScore: aggregation[0]?.averageScore || 0
      };

    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  }
}
