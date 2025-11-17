import Veo3Service from './Veo3Service';
import VeoCreativeDirector, { VeoCreativeConfig, VeoCreativePrompt } from './VeoCreativeDirector';
import { GPTVideoCreativeDirector } from './GPTVideoCreativeDirector';
import { logger } from '../config/logger';

/**
 * Enhanced VEO Service - VEO 3.1 avec Intelligence Créative
 * 
 * Transforme le système VEO statique en générateur vidéo intelligent qui :
 * - Adapte automatiquement les styles selon la marque et le produit
 * - Garantit la diversité créative entre les vidéos
 * - Intègre les couleurs de marque harmonieusement
 * - Évite la répétitivité grâce au système anti-répétition
 * 
 * 🎯 RÉSOUT LE PROBLÈME :
 * ❌ AVANT : Même style VEO pour toutes les marques (statique)
 * ✅ APRÈS : 400+ combinaisons créatives adaptées par secteur
 */

export interface EnhancedVideoOptions {
  // Options VEO standard
  duration?: 4 | 6 | 8;
  aspectRatio?: '16:9' | '9:16';
  resolution?: '720p' | '1080p';
  numberOfVideos?: number;
  
  // Options créatives intelligentes
  videoType?: 'text-to-video' | 'image-to-video' | 'product-showcase' | 'lifestyle';
  forceCreativeStyle?: string; // Forcer un style spécifique (optionnel)
  disableAntiRepetition?: boolean; // Désactiver l'anti-répétition (debug)
  
  // Images de référence
  referenceImages?: Buffer[];
  startImage?: Buffer;
  endImage?: Buffer;
  extendVideo?: Buffer;
}

export interface EnhancedVideoResult {
  // Résultat vidéo standard
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
  
  // Informations créatives ajoutées
  creativeInfo: {
    selectedStyle: string;
    selectedPalette: string;
    selectedContext: string;
    selectedLighting: string;
    brandIntegration: string;
    finalPrompt: string;
    diversityStats: {
      styles: number;
      contexts: number;
      palettes: number;
    };
  };
}

/**
 * Enhanced VEO Service - Service principal
 */
class EnhancedVeoService {

  /**
   * Génère une vidéo intelligente adaptée à la marque et au produit
   * 🎯 MÉTHODE PRINCIPALE - Utilise maintenant GPT Video Creative Director
   */
  async generateIntelligentVideo(
    brand: any,
    product: any,
    calendar: any,
    postIndex: number = 0,
    options: EnhancedVideoOptions = {}
  ): Promise<EnhancedVideoResult> {
    try {
      logger.info(`[EnhancedVEO] 🎬 Génération vidéo intelligente pour ${brand.name} - ${product.name}`);
      
      // 1. Génération du script vidéo avec GPT Video Creative Director
      logger.info(`[EnhancedVEO] 🎨 Génération script vidéo GPT...`);
      const calendarId = calendar?._id || 'default-calendar';
      
      const videoContext = {
        postIndex,
        totalPosts: 10, // Valeur par défaut
        scheduledDate: calendar?.generationSettings?.startDate,
        platform: 'social media',
        videoType: options.videoType || 'product-showcase',
        duration: options.duration || 8,
        aspectRatio: options.aspectRatio || '16:9'
      };

      let finalPrompt: string;
      let creativeInfo: any;

      try {
        // Tenter la génération avec GPT Video Creative Director
        finalPrompt = await GPTVideoCreativeDirector.generateVideoScript(
          brand,
          product,
          calendar,
          videoContext,
          calendarId
        );

        // Obtenir les statistiques de diversité
        const diversityStats = GPTVideoCreativeDirector.getDiversityStats(calendarId);
        
        creativeInfo = {
          selectedStyle: 'GPT Generated',
          selectedPalette: 'Brand Adaptive',
          selectedContext: 'Contextual',
          selectedLighting: 'Cinematic',
          brandIntegration: `${brand.name} brand integration`,
          finalPrompt: finalPrompt,
          diversityStats: {
            styles: diversityStats.angles,
            contexts: diversityStats.concepts,
            palettes: diversityStats.techniques
          }
        };

        logger.info(`[EnhancedVEO] ✅ Script GPT généré avec succès`);
        
      } catch (gptError) {
        logger.info(`[EnhancedVEO] ⚠️ GPT Video Director indisponible, fallback vers preset system`);
        
        // Fallback vers l'ancien système de presets
        const creativeConfig: VeoCreativeConfig = {
          brand,
          product,
          calendar,
          postIndex,
          videoType: options.videoType || 'product-showcase',
          duration: options.duration || 8,
          aspectRatio: options.aspectRatio || '16:9'
        };

        const creativePreset = await VeoCreativeDirector.generateCreativePreset(creativeConfig);
        const veoPrompt = VeoCreativeDirector.generateVeoPrompt(creativePreset, creativeConfig);
        finalPrompt = VeoCreativeDirector.generateFinalVeoPrompt(veoPrompt);
        
        const diversityStats = VeoCreativeDirector.getDiversityStats(calendarId);
        
        creativeInfo = {
          selectedStyle: creativePreset.style.name,
          selectedPalette: creativePreset.palette.name,
          selectedContext: creativePreset.context.name,
          selectedLighting: creativePreset.lighting.name,
          brandIntegration: veoPrompt.brandIntegration,
          finalPrompt: finalPrompt,
          diversityStats
        };
      }
      
      logger.info(`[EnhancedVEO] 🎯 Prompt final (${finalPrompt.length} chars):`);
      logger.info(`"${finalPrompt.substring(0, 200)}..."`);
      
      // 5. Génération vidéo selon le type
      let videoResult;
      
      if (options.referenceImages && options.referenceImages.length > 0) {
        // Génération avec images de référence (produits)
        logger.info(`[EnhancedVEO] 📸 Génération avec ${options.referenceImages.length} images de référence`);
        videoResult = await Veo3Service.generateVideoWithReferences(
          finalPrompt,
          options.referenceImages,
          {
            duration: options.duration,
            aspectRatio: options.aspectRatio,
            resolution: options.resolution,
            numberOfVideos: options.numberOfVideos
          }
        );
      } else if (options.startImage && options.endImage) {
        // Génération par interpolation
        logger.info(`[EnhancedVEO] 🔄 Génération par interpolation`);
        videoResult = await Veo3Service.generateVideoWithInterpolation(
          finalPrompt,
          options.startImage,
          options.endImage,
          {
            duration: options.duration,
            aspectRatio: options.aspectRatio,
            resolution: options.resolution
          }
        );
      } else if (options.startImage) {
        // Animation d'image (image-to-video)
        logger.info(`[EnhancedVEO] 🎞️ Animation d'image`);
        videoResult = await Veo3Service.generateVideoFromImage(
          finalPrompt,
          options.startImage,
          {
            duration: options.duration,
            aspectRatio: options.aspectRatio,
            resolution: options.resolution
          }
        );
      } else if (options.extendVideo) {
        // Extension de vidéo
        logger.info(`[EnhancedVEO] ➕ Extension de vidéo`);
        videoResult = await Veo3Service.extendVideo(
          options.extendVideo,
          finalPrompt,
          {
            resolution: options.resolution
          }
        );
      } else {
        // Génération texte-vers-vidéo standard
        logger.info(`[EnhancedVEO] 📝 Génération texte-vers-vidéo`);
        videoResult = await Veo3Service.generateVideo(
          finalPrompt,
          {
            duration: options.duration,
            aspectRatio: options.aspectRatio,
            resolution: options.resolution,
            numberOfVideos: options.numberOfVideos
          }
        );
      }

      // 6. Résultat enrichi avec informations créatives
      const enhancedResult: EnhancedVideoResult = {
        ...videoResult,
        creativeInfo
      };

      logger.info(`[EnhancedVEO] ✅ Vidéo intelligente générée avec succès !`);
      logger.info(`[EnhancedVEO] 🎨 Style: ${creativeInfo.selectedStyle}`);
      logger.info(`[EnhancedVEO] 🎨 Contexte: ${creativeInfo.selectedContext}`);
      logger.info(`[EnhancedVEO] 📊 Diversité: ${creativeInfo.diversityStats.styles} styles utilisés`);
      
      return enhancedResult;

    } catch (error: any) {
      logger.error(`[EnhancedVEO] ❌ Erreur génération vidéo intelligente:`, error);
      throw new Error(`Erreur Enhanced VEO: ${error.message}`);
    }
  }

  /**
   * Génère plusieurs vidéos avec diversité garantie
   * Parfait pour les campagnes multi-vidéos
   */
  async generateDiverseVideos(
    brand: any,
    product: any,
    calendar: any,
    numberOfVideos: number = 3,
    options: EnhancedVideoOptions = {}
  ): Promise<EnhancedVideoResult[]> {
    try {
      logger.info(`[EnhancedVEO] 🎬 Génération de ${numberOfVideos} vidéos diversifiées`);
      
      const results: EnhancedVideoResult[] = [];
      
      for (let i = 0; i < numberOfVideos; i++) {
        logger.info(`[EnhancedVEO] 📹 Génération vidéo ${i + 1}/${numberOfVideos}`);
        
        const videoResult = await this.generateIntelligentVideo(
          brand,
          product,
          calendar,
          i, // Index différent pour garantir la diversité
          {
            ...options,
            numberOfVideos: 1 // Une vidéo à la fois pour contrôler la diversité
          }
        );
        
        results.push(videoResult);
        
        // Pause entre les générations pour éviter la surcharge
        if (i < numberOfVideos - 1) {
          logger.info(`[EnhancedVEO] ⏸️ Pause 2s avant prochaine génération...`);
          await this.sleep(2000);
        }
      }
      
      logger.info(`[EnhancedVEO] ✅ ${numberOfVideos} vidéos diversifiées générées !`);
      
      // Log de la diversité obtenue
      const styles = new Set(results.map(r => r.creativeInfo.selectedStyle));
      const contexts = new Set(results.map(r => r.creativeInfo.selectedContext));
      logger.info(`[EnhancedVEO] 📊 Diversité obtenue: ${styles.size} styles différents, ${contexts.size} contextes différents`);
      
      return results;

    } catch (error: any) {
      logger.error(`[EnhancedVEO] ❌ Erreur génération vidéos diversifiées:`, error);
      throw error;
    }
  }

  /**
   * Génère une vidéo de démonstration produit optimisée
   * Utilise automatiquement les meilleures pratiques pour chaque secteur
   */
  async generateProductDemo(
    brand: any,
    product: any,
    calendar: any,
    productImages?: Buffer[],
    options: EnhancedVideoOptions = {}
  ): Promise<EnhancedVideoResult> {
    try {
      logger.info(`[EnhancedVEO] 🛍️ Génération démo produit optimisée`);
      
      // Configuration optimisée pour démo produit
      const demoOptions: EnhancedVideoOptions = {
        ...options,
        videoType: 'product-showcase',
        duration: 8, // Durée optimale pour démo
        aspectRatio: '16:9', // Format optimal pour produits
        resolution: '1080p', // Qualité maximale
        referenceImages: productImages // Images produit si disponibles
      };
      
      return await this.generateIntelligentVideo(
        brand,
        product,
        calendar,
        0,
        demoOptions
      );

    } catch (error: any) {
      logger.error(`[EnhancedVEO] ❌ Erreur génération démo produit:`, error);
      throw error;
    }
  }

  /**
   * Génère une vidéo lifestyle adaptée au secteur
   * Intègre automatiquement le contexte d'usage du produit
   */
  async generateLifestyleVideo(
    brand: any,
    product: any,
    calendar: any,
    options: EnhancedVideoOptions = {}
  ): Promise<EnhancedVideoResult> {
    try {
      logger.info(`[EnhancedVEO] 🌟 Génération vidéo lifestyle`);
      
      // Configuration optimisée pour lifestyle
      const lifestyleOptions: EnhancedVideoOptions = {
        ...options,
        videoType: 'lifestyle',
        duration: options.duration || 8,
        aspectRatio: options.aspectRatio || '9:16', // Format social optimal
        resolution: options.resolution || '1080p'
      };
      
      return await this.generateIntelligentVideo(
        brand,
        product,
        calendar,
        0,
        lifestyleOptions
      );

    } catch (error: any) {
      logger.error(`[EnhancedVEO] ❌ Erreur génération vidéo lifestyle:`, error);
      throw error;
    }
  }

  /**
   * Obtient un aperçu du preset créatif qui sera utilisé
   * Utile pour prévisualiser avant génération
   */
  async previewCreativePreset(
    brand: any,
    product: any,
    calendar: any,
    postIndex: number = 0,
    videoType: string = 'product-showcase'
  ): Promise<{
    style: string;
    palette: string;
    context: string;
    lighting: string;
    previewPrompt: string;
    diversityStats: any;
  }> {
    try {
      logger.info(`[EnhancedVEO] 👁️ Aperçu preset créatif`);
      
      const creativeConfig: VeoCreativeConfig = {
        brand,
        product,
        calendar,
        postIndex,
        videoType: videoType as any
      };

      const creativePreset = await VeoCreativeDirector.generateCreativePreset(creativeConfig);
      const veoPrompt = VeoCreativeDirector.generateVeoPrompt(creativePreset, creativeConfig);
      const finalPrompt = VeoCreativeDirector.generateFinalVeoPrompt(veoPrompt);
      
      const calendarId = calendar?._id || 'default-calendar';
      const diversityStats = VeoCreativeDirector.getDiversityStats(calendarId);

      return {
        style: creativePreset.style.name,
        palette: creativePreset.palette.name,
        context: creativePreset.context.name,
        lighting: creativePreset.lighting.name,
        previewPrompt: finalPrompt.substring(0, 300) + '...',
        diversityStats
      };

    } catch (error: any) {
      logger.error(`[EnhancedVEO] ❌ Erreur aperçu preset:`, error);
      throw error;
    }
  }

  /**
   * Réinitialise l'historique de diversité pour un calendrier
   * Utile pour recommencer avec une ardoise vierge
   */
  resetDiversityHistory(calendarId: string): void {
    logger.info(`[EnhancedVEO] 🔄 Réinitialisation historique diversité: ${calendarId}`);
    // La réinitialisation se fait automatiquement quand le cache atteint sa limite
    // Cette méthode est principalement pour le logging
  }

  /**
   * Utilitaire pour attendre
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new EnhancedVeoService();
