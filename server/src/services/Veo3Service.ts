import { GoogleGenAI } from "@google/genai";
import { logger } from '../config/logger';
import { FileStorageService } from './FileStorageService';
import * as fs from 'fs';
import * as path from 'path';

interface VideoGenerationOptions {
  duration?: 4 | 6 | 8;
  aspectRatio?: '16:9' | '9:16';
  resolution?: '720p' | '1080p';
  negativePrompt?: string;
  referenceImages?: Buffer[]; // Jusqu'à 3 images produits
  startImage?: Buffer; // Pour image-to-video
  endImage?: Buffer; // Pour interpolation
  extendVideo?: string; // Pour extension
  numberOfVideos?: number;
}

interface VideoGenerationResult {
  videoUrl: string;
  videoPublicId?: string;
  duration: number;
  format: string;
  resolution: string;
  hasAudio: boolean;
  metadata: {
    width: number;
    height: number;
    fileSize: number;
  };
}

/**
 * Service de génération de vidéos avec VEO 3.1 via l'API Gemini
 * Supporte :
 * - Génération texte-vers-vidéo
 * - Animation d'images (image-vers-vidéo)
 * - Vidéos avec images de référence (produits)
 * - Interpolation (première + dernière image)
 * - Extension de vidéos existantes
 */
class Veo3Service {
  private ai: GoogleGenAI;
  private readonly MAX_POLL_ATTEMPTS = 60; // 10 minutes max (10s * 60)
  private readonly POLL_INTERVAL_MS = 10000; // 10 secondes
  
  constructor() {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_API_KEY manquante pour VEO3');
    }
    this.ai = new GoogleGenAI({ apiKey });
    logger.info('✅ Veo3Service initialisé avec succès');
  }

  /**
   * Génère une vidéo à partir d'un prompt texte
   * @param prompt Description détaillée de la vidéo à générer
   * @param options Options de génération (durée, format, résolution, etc.)
   * @returns Informations sur la vidéo générée
   */
  async generateVideo(
    prompt: string,
    options: VideoGenerationOptions = {}
  ): Promise<VideoGenerationResult> {
    try {
      logger.info('🎬 Début de génération vidéo VEO 3.1');
      logger.info(`Prompt: ${prompt.substring(0, 100)}...`);
      logger.info(`Options:`, options);

      const {
        duration = 8,
        aspectRatio = '16:9',
        resolution = '1080p',
        negativePrompt,
        numberOfVideos = 1
      } = options;

      // Validation
      this.validateOptions(duration, aspectRatio, resolution);

      // Démarrer la génération
      let operation = await this.ai.models.generateVideos({
        model: "veo-3.1-generate-preview",
        prompt: prompt,
        config: {
          aspectRatio,
          resolution,
          durationSeconds: duration,
          numberOfVideos,
          ...(negativePrompt && { negativePrompt })
        }
      });

      logger.info('⏳ Opération lancée, début du polling...');
      
      // Attendre que la vidéo soit prête
      operation = await this.pollVideoOperation(operation);
      
      // Télécharger et sauvegarder la vidéo
      const result = await this.downloadAndSaveVideo(operation);
      
      logger.info('✅ Vidéo générée avec succès:', result.videoUrl);
      return result;

    } catch (error: any) {
      logger.error('❌ Erreur lors de la génération vidéo:', error);
      throw new Error(`Erreur VEO3: ${error.message}`);
    }
  }

  /**
   * Génère une vidéo en animant une image
   * Parfait pour animer les images générées avec Gemini (Nano Banana)
   */
  async generateVideoFromImage(
    prompt: string,
    imageBuffer: Buffer,
    options: VideoGenerationOptions = {}
  ): Promise<VideoGenerationResult> {
    try {
      logger.info('🎬 Génération vidéo depuis image (image-to-video)');
      logger.info(`Taille image: ${imageBuffer.length} bytes`);

      const {
        duration = 8,
        aspectRatio = '16:9',
        resolution = '1080p',
        negativePrompt
      } = options;

      // Validation
      this.validateOptions(duration, aspectRatio, resolution);

      // Convertir l'image en base64
      const imageBase64 = imageBuffer.toString('base64');

      // Démarrer la génération avec image
      let operation = await this.ai.models.generateVideos({
        model: "veo-3.1-generate-preview",
        prompt: prompt,
        image: {
          imageBytes: imageBase64,
          mimeType: "image/png"
        },
        config: {
          aspectRatio,
          resolution,
          durationSeconds: duration,
          ...(negativePrompt && { negativePrompt })
        }
      });

      logger.info('⏳ Animation de l\'image en cours...');
      
      // Polling
      operation = await this.pollVideoOperation(operation);
      
      // Télécharger
      const result = await this.downloadAndSaveVideo(operation);
      
      logger.info('✅ Vidéo animée générée:', result.videoUrl);
      return result;

    } catch (error: any) {
      logger.error('❌ Erreur lors de l\'animation d\'image:', error);
      throw new Error(`Erreur image-to-video: ${error.message}`);
    }
  }

  /**
   * Génère une vidéo avec des images de référence (jusqu'à 3)
   * Idéal pour préserver l'apparence de produits dans la vidéo
   */
  async generateVideoWithReferences(
    prompt: string,
    referenceImages: Buffer[],
    options: VideoGenerationOptions = {}
  ): Promise<VideoGenerationResult> {
    try {
      logger.info('🎬 Génération vidéo avec images de référence');
      logger.info(`Nombre d\'images de référence: ${referenceImages.length}`);

      if (referenceImages.length === 0 || referenceImages.length > 3) {
        throw new Error('VEO3 accepte entre 1 et 3 images de référence');
      }

      const {
        duration = 8,
        aspectRatio = '16:9',
        resolution = '1080p',
        negativePrompt
      } = options;

      // VEO 3.1 avec références nécessite 8s et 16:9
      if (duration !== 8) {
        logger.info('⚠️ Durée forcée à 8s pour images de référence');
      }
      if (aspectRatio !== '16:9') {
        logger.info('⚠️ Format forcé à 16:9 pour images de référence');
      }

      // Préparer les références
      const references = referenceImages.map(img => ({
        image: {
          imageBytes: img.toString('base64'),
          mimeType: "image/png" as const
        },
        referenceType: "asset" as const
      }));

      // Générer
      let operation = await this.ai.models.generateVideos({
        model: "veo-3.1-generate-preview",
        prompt: prompt,
        config: {
          referenceImages: references as any,
          aspectRatio: '16:9',
          resolution,
          durationSeconds: 8,
          ...(negativePrompt && { negativePrompt })
        }
      });

      logger.info('⏳ Génération avec références en cours...');
      
      operation = await this.pollVideoOperation(operation);
      const result = await this.downloadAndSaveVideo(operation);
      
      logger.info('✅ Vidéo avec références générée:', result.videoUrl);
      return result;

    } catch (error: any) {
      logger.error('❌ Erreur génération avec références:', error);
      throw new Error(`Erreur références: ${error.message}`);
    }
  }

  /**
   * Génère une vidéo par interpolation entre deux images
   * Crée une transition fluide entre l'image de début et de fin
   */
  async generateVideoWithInterpolation(
    prompt: string,
    startImage: Buffer,
    endImage: Buffer,
    options: VideoGenerationOptions = {}
  ): Promise<VideoGenerationResult> {
    try {
      logger.info('🎬 Génération vidéo par interpolation');

      const {
        duration = 8,
        aspectRatio = '16:9',
        resolution = '1080p',
        negativePrompt
      } = options;

      // Validation pour interpolation
      if (duration !== 8) {
        logger.info('⚠️ Durée forcée à 8s pour interpolation');
      }

      // Générer
      let operation = await this.ai.models.generateVideos({
        model: "veo-3.1-generate-preview",
        prompt: prompt,
        image: {
          imageBytes: startImage.toString('base64'),
          mimeType: "image/png"
        },
        config: {
          lastFrame: {
            imageBytes: endImage.toString('base64'),
            mimeType: "image/png"
          },
          aspectRatio,
          resolution,
          durationSeconds: 8,
          ...(negativePrompt && { negativePrompt })
        }
      });

      logger.info('⏳ Interpolation en cours...');
      
      operation = await this.pollVideoOperation(operation);
      const result = await this.downloadAndSaveVideo(operation);
      
      logger.info('✅ Vidéo interpolée générée:', result.videoUrl);
      return result;

    } catch (error: any) {
      logger.error('❌ Erreur interpolation:', error);
      throw new Error(`Erreur interpolation: ${error.message}`);
    }
  }

  /**
   * Étend une vidéo existante de 7 secondes supplémentaires
   * Peut être répété jusqu'à 20 fois (max 148 secondes)
   */
  async extendVideo(
    videoBuffer: Buffer,
    prompt: string,
    options: VideoGenerationOptions = {}
  ): Promise<VideoGenerationResult> {
    try {
      logger.info('🎬 Extension de vidéo existante');

      const {
        resolution = '720p', // Extension en 720p seulement
        negativePrompt
      } = options;

      // L'extension génère toujours 7s supplémentaires
      let operation = await this.ai.models.generateVideos({
        model: "veo-3.1-generate-preview",
        video: {
          videoBytes: videoBuffer.toString('base64')
        },
        prompt: prompt,
        config: {
          resolution: '720p', // Forcé pour extension
          ...(negativePrompt && { negativePrompt })
        }
      });

      logger.info('⏳ Extension de vidéo en cours...');
      
      operation = await this.pollVideoOperation(operation);
      const result = await this.downloadAndSaveVideo(operation);
      
      logger.info('✅ Vidéo étendue générée:', result.videoUrl);
      return result;

    } catch (error: any) {
      logger.error('❌ Erreur extension vidéo:', error);
      throw new Error(`Erreur extension: ${error.message}`);
    }
  }

  /**
   * Polling de l'opération jusqu'à ce que la vidéo soit prête
   * VEO3 est asynchrone et peut prendre 11s à 6 minutes
   */
  private async pollVideoOperation(operation: any): Promise<any> {
    let attempts = 0;
    const startTime = Date.now();

    while (!operation.done && attempts < this.MAX_POLL_ATTEMPTS) {
      await this.sleep(this.POLL_INTERVAL_MS);
      attempts++;
      
      const elapsed = Math.round((Date.now() - startTime) / 1000);
      logger.info(`⏳ Polling tentative ${attempts}/${this.MAX_POLL_ATTEMPTS} (${elapsed}s écoulées)`);

      // Rafraîchir l'opération
      operation = await this.ai.operations.getVideosOperation({ operation });
      
      if (operation.done) {
        logger.info(`✅ Vidéo prête après ${elapsed}s`);
        break;
      }
    }

    if (!operation.done) {
      throw new Error(`Timeout: La vidéo n'est pas prête après ${this.MAX_POLL_ATTEMPTS * this.POLL_INTERVAL_MS / 1000}s`);
    }

    // Vérifier les erreurs
    if (operation.error) {
      throw new Error(`Erreur génération: ${JSON.stringify(operation.error)}`);
    }

    return operation;
  }

  /**
   * Télécharge la vidéo générée et la sauvegarde sur Cloudinary
   */
  private async downloadAndSaveVideo(operation: any): Promise<VideoGenerationResult> {
    try {
      const video = operation.response.generatedVideos[0];
      
      if (!video || !video.video) {
        throw new Error('Aucune vidéo dans la réponse');
      }

      // Créer un répertoire temporaire si nécessaire
      const tempDir = path.join(process.cwd(), 'temp', 'videos');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      // Générer un nom de fichier unique
      const timestamp = Date.now();
      const tempFilePath = path.join(tempDir, `veo3_${timestamp}.mp4`);

      // Télécharger la vidéo dans un fichier temporaire
      logger.info('📥 Téléchargement de la vidéo...');
      await this.ai.files.download({
        file: video.video,
        downloadPath: tempFilePath
      });

      logger.info('✅ Vidéo téléchargée localement:', tempFilePath);

      // Lire le fichier
      const videoBuffer = await fs.promises.readFile(tempFilePath);
      const fileStats = await fs.promises.stat(tempFilePath);

      // Uploader sur Cloudinary
      logger.info('☁️ Upload sur Cloudinary...');
      const cloudinaryResult = await FileStorageService.saveVideo(videoBuffer, {
        folder: 'generated-videos',
        resource_type: 'video',
        format: 'mp4'
      });

      // Nettoyer le fichier temporaire
      await fs.promises.unlink(tempFilePath);
      logger.info('🗑️ Fichier temporaire supprimé');

      // Préparer le résultat
      const result: VideoGenerationResult = {
        videoUrl: cloudinaryResult.url,
        videoPublicId: cloudinaryResult.publicId,
        duration: cloudinaryResult.duration || 8,
        format: cloudinaryResult.format || 'mp4',
        resolution: cloudinaryResult.resolution || '1080p',
        hasAudio: true, // VEO 3.1 génère toujours de l'audio
        metadata: {
          width: cloudinaryResult.width || 1920,
          height: cloudinaryResult.height || 1080,
          fileSize: fileStats.size
        }
      };

      return result;

    } catch (error: any) {
      logger.error('❌ Erreur téléchargement/sauvegarde:', error);
      throw error;
    }
  }

  /**
   * Valide les options de génération
   */
  private validateOptions(
    duration: number,
    aspectRatio: string,
    resolution: string
  ): void {
    // Durées valides
    if (![4, 6, 8].includes(duration)) {
      throw new Error('Durée invalide. Valeurs acceptées: 4, 6, 8 secondes');
    }

    // Formats valides
    if (!['16:9', '9:16'].includes(aspectRatio)) {
      throw new Error('Format invalide. Valeurs acceptées: 16:9, 9:16');
    }

    // Résolutions valides
    if (!['720p', '1080p'].includes(resolution)) {
      throw new Error('Résolution invalide. Valeurs acceptées: 720p, 1080p');
    }

    // 1080p nécessite 8s
    if (resolution === '1080p' && duration !== 8) {
      throw new Error('1080p nécessite une durée de 8 secondes');
    }
  }

  /**
   * Utilitaire pour attendre
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new Veo3Service();
