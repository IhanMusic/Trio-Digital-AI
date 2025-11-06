import { 
  getRelevantPresetsForGPT,
  CreativePreset,
  PhotographicStyle,
  ColorPalette,
  CreativeContext,
  LightingSetup
} from './CreativePresetsLibrary';
import { 
  selectPresetWithGPT,
  randomizeFromFilteredPresets
} from './GPTPresetSelector';
import { logger } from '../config/logger';

/**
 * VEO Creative Director - Intelligence créative pour la génération vidéo
 * 
 * Transforme le système VEO statique en directeur artistique intelligent
 * qui adapte les styles visuels selon la marque, le produit et le contexte.
 * 
 * 🎯 OBJECTIFS:
 * - Éliminer la répétitivité entre marques
 * - Adapter les styles au secteur et positionnement
 * - Garantir la diversité créative sur les campagnes
 * - Intégrer les couleurs de marque harmonieusement
 */

export interface VeoCreativeConfig {
  brand: any;
  product: any;
  calendar?: any;
  postIndex?: number;
  videoType?: 'text-to-video' | 'image-to-video' | 'product-showcase' | 'lifestyle';
  duration?: 4 | 6 | 8;
  aspectRatio?: '16:9' | '9:16';
}

export interface VeoCreativePrompt {
  mainPrompt: string;
  negativePrompt: string;
  styleDescription: string;
  colorGuidance: string;
  lightingInstructions: string;
  contextualElements: string;
  brandIntegration: string;
  technicalSpecs: string;
  creativeReference: string;
}

/**
 * Système de cache créatif pour éviter les répétitions
 * Maintient un historique par calendrier des styles utilisés
 */
class VeoCreativeCache {
  private static instances: Map<string, VeoCreativeCache> = new Map();
  private usedStyles: Set<string> = new Set();
  private usedContexts: Set<string> = new Set();
  private usedPalettes: Set<string> = new Set();
  private maxCacheSize = 15; // Éviter les répétitions sur 15 dernières vidéos

  static getInstance(calendarId: string): VeoCreativeCache {
    if (!VeoCreativeCache.instances.has(calendarId)) {
      VeoCreativeCache.instances.set(calendarId, new VeoCreativeCache());
      logger.info(`[VeoCreativeCache] Nouvelle instance créée pour calendrier: ${calendarId}`);
    }
    return VeoCreativeCache.instances.get(calendarId)!;
  }

  isStyleUsed(styleName: string): boolean {
    return this.usedStyles.has(styleName);
  }

  isContextUsed(contextName: string): boolean {
    return this.usedContexts.has(contextName);
  }

  isPaletteUsed(paletteName: string): boolean {
    return this.usedPalettes.has(paletteName);
  }

  recordUsage(preset: CreativePreset): void {
    this.usedStyles.add(preset.style?.name || 'unknown-style');
    this.usedContexts.add(preset.context?.name || 'unknown-context');
    this.usedPalettes.add(preset.palette?.name || 'unknown-palette');

    // Maintenir la taille du cache
    if (this.usedStyles.size > this.maxCacheSize) {
      const firstStyle = this.usedStyles.values().next().value;
      if (firstStyle) {
        this.usedStyles.delete(firstStyle);
      }
    }
    if (this.usedContexts.size > this.maxCacheSize) {
      const firstContext = this.usedContexts.values().next().value;
      if (firstContext) {
        this.usedContexts.delete(firstContext);
      }
    }
    if (this.usedPalettes.size > this.maxCacheSize) {
      const firstPalette = this.usedPalettes.values().next().value;
      if (firstPalette) {
        this.usedPalettes.delete(firstPalette);
      }
    }

    logger.info(`[VeoCreativeCache] Usage enregistré: ${preset.style?.name || 'unknown'} + ${preset.context?.name || 'unknown'}`);
  }

  getUsageStats(): { styles: number; contexts: number; palettes: number } {
    return {
      styles: this.usedStyles.size,
      contexts: this.usedContexts.size,
      palettes: this.usedPalettes.size
    };
  }
}

/**
 * VEO Creative Director - Service principal
 */
export class VeoCreativeDirector {
  
  /**
   * Génère un preset créatif intelligent pour VEO
   * Utilise GPT-5 pour la sélection optimale ou fallback sur système anti-répétition
   */
  async generateCreativePreset(config: VeoCreativeConfig): Promise<CreativePreset> {
    try {
      logger.info(`[VeoCreativeDirector] 🎬 Génération preset créatif pour ${config.brand.name} - ${config.product.name}`);
      
      // 1. Obtenir les presets pré-filtrés selon le secteur et produit
      const filteredPresets = getRelevantPresetsForGPT(
        config.brand,
        config.product,
        config.calendar
      );

      logger.info(`[VeoCreativeDirector] 📊 Presets disponibles: ${filteredPresets.styles.length} styles, ${filteredPresets.contexts.length} contextes`);

      // 2. Tenter la sélection intelligente avec GPT-5
      const calendarId = config.calendar?._id || 'default-calendar';
      let selectedPreset: CreativePreset | null = null;

      try {
        selectedPreset = await selectPresetWithGPT(
          filteredPresets,
          config.brand,
          config.product,
          config.calendar,
          config.postIndex || 0,
          calendarId
        );
        
        if (selectedPreset) {
          logger.info(`[VeoCreativeDirector] ✅ Preset sélectionné par GPT-5: ${selectedPreset.style?.name || 'unknown'}`);
        }
      } catch (error) {
        logger.info(`[VeoCreativeDirector] ⚠️ GPT-5 indisponible, utilisation du fallback: ${error}`);
      }

      // 3. Fallback sur système anti-répétition si GPT-5 échoue
      if (!selectedPreset) {
        const seed = Date.now() + (config.postIndex || 0);
        selectedPreset = randomizeFromFilteredPresets(
          filteredPresets,
          seed,
          calendarId,
          config.brand._id || 'unknown-brand',
          config.postIndex
        );
        logger.info(`[VeoCreativeDirector] 🔄 Preset sélectionné par fallback: ${selectedPreset.style?.name || 'unknown'}`);
      }

      // 4. Vérification de sécurité
      if (!selectedPreset) {
        throw new Error('Impossible de sélectionner un preset créatif');
      }

      // 5. Enregistrer l'usage pour éviter les répétitions futures
      const cache = VeoCreativeCache.getInstance(calendarId);
      cache.recordUsage(selectedPreset);

      const stats = cache.getUsageStats();
      logger.info(`[VeoCreativeDirector] 📈 Cache stats: ${stats.styles} styles, ${stats.contexts} contextes utilisés`);

      return selectedPreset;

    } catch (error) {
      logger.error(`[VeoCreativeDirector] ❌ Erreur génération preset:`, error);
      throw error;
    }
  }

  /**
   * Transforme un preset créatif en prompt VEO optimisé
   * Adapte les références photographiques au format vidéo
   */
  generateVeoPrompt(preset: CreativePreset, config: VeoCreativeConfig): VeoCreativePrompt {
    logger.info(`[VeoCreativeDirector] 🎨 Génération prompt VEO pour style: ${preset.style.name}`);

    // 1. Construire le prompt principal adapté vidéo
    const mainPrompt = this.buildMainVideoPrompt(preset, config);
    
    // 2. Générer le prompt négatif
    const negativePrompt = this.buildNegativePrompt(preset, config);
    
    // 3. Instructions de style adaptées vidéo
    const styleDescription = this.adaptStyleForVideo(preset.style, config);
    
    // 4. Guidance couleurs avec intégration marque
    const colorGuidance = this.buildColorGuidance(preset.palette, config.brand);
    
    // 5. Instructions d'éclairage pour vidéo
    const lightingInstructions = this.adaptLightingForVideo(preset.lighting, config);
    
    // 6. Éléments contextuels
    const contextualElements = this.buildContextualElements(preset.context, config);
    
    // 7. Intégration de marque
    const brandIntegration = this.buildBrandIntegration(config.brand, config.product);
    
    // 8. Spécifications techniques
    const technicalSpecs = this.buildTechnicalSpecs(config);
    
    // 9. Référence créative
    const creativeReference = preset.reference;

    const veoPrompt: VeoCreativePrompt = {
      mainPrompt,
      negativePrompt,
      styleDescription,
      colorGuidance,
      lightingInstructions,
      contextualElements,
      brandIntegration,
      technicalSpecs,
      creativeReference
    };

    logger.info(`[VeoCreativeDirector] ✅ Prompt VEO généré (${mainPrompt.length} caractères)`);
    
    return veoPrompt;
  }

  /**
   * Construit le prompt principal pour la vidéo
   */
  private buildMainVideoPrompt(preset: CreativePreset, config: VeoCreativeConfig): string {
    const { brand, product, videoType = 'product-showcase' } = config;
    
    let basePrompt = '';

    // Adapter selon le type de vidéo
    switch (videoType) {
      case 'product-showcase':
        basePrompt = `${product.name} product showcase video in ${preset.style.name} style, `;
        break;
      case 'lifestyle':
        basePrompt = `Lifestyle video featuring ${product.name} in ${preset.context.name} setting, `;
        break;
      case 'text-to-video':
        basePrompt = `Creative video concept for ${brand.name} ${product.name}, `;
        break;
      case 'image-to-video':
        basePrompt = `Animated sequence bringing ${product.name} to life, `;
        break;
    }

    // Ajouter le style photographique adapté vidéo
    basePrompt += `${preset.style.reference.split(',')[0]}, `;
    
    // Ajouter le contexte
    basePrompt += `set in ${preset.context.description.split(',')[0]}, `;
    
    // Ajouter l'éclairage
    basePrompt += `${preset.lighting.characteristics}, `;
    
    // Ajouter l'ambiance
    basePrompt += `${preset.style.mood}, `;
    
    // Spécifications vidéo
    basePrompt += `cinematic video quality, smooth camera movement, professional video production`;

    return basePrompt;
  }

  /**
   * Construit le prompt négatif pour éviter les défauts
   */
  private buildNegativePrompt(preset: CreativePreset, config: VeoCreativeConfig): string {
    const negativeElements = [
      'blurry video',
      'shaky camera',
      'poor lighting',
      'pixelated',
      'distorted',
      'amateur quality',
      'watermark',
      'text overlay',
      'low resolution',
      'jerky movement'
    ];

    // Ajouter des éléments négatifs spécifiques au style
    if (preset.style.category === 'luxury') {
      negativeElements.push('cheap looking', 'plastic', 'artificial');
    }
    
    if (preset.style.category === 'minimal') {
      negativeElements.push('cluttered', 'busy background', 'too many elements');
    }

    return negativeElements.join(', ');
  }

  /**
   * Adapte le style photographique pour la vidéo
   */
  private adaptStyleForVideo(style: PhotographicStyle, config: VeoCreativeConfig): string {
    let videoStyle = style.reference;
    
    // Remplacer les termes photo par des termes vidéo
    videoStyle = videoStyle.replace(/photography/g, 'cinematography');
    videoStyle = videoStyle.replace(/photo/g, 'video');
    videoStyle = videoStyle.replace(/shot/g, 'sequence');
    videoStyle = videoStyle.replace(/image/g, 'footage');
    
    // Ajouter des éléments de mouvement
    if (style.category === 'action') {
      videoStyle += ', dynamic camera movement, fast-paced editing';
    } else if (style.category === 'minimal') {
      videoStyle += ', slow smooth camera movement, minimal transitions';
    } else if (style.category === 'cinematic') {
      videoStyle += ', cinematic camera work, professional film techniques';
    }

    return videoStyle;
  }

  /**
   * Construit la guidance couleurs avec intégration marque
   */
  private buildColorGuidance(palette: ColorPalette, brand: any): string {
    let colorGuidance = palette.description;
    
    if (brand.colors?.primary) {
      colorGuidance += `. Primary brand color ${brand.colors.primary} integrated at ${palette.brandIntegration}% prominence`;
      
      if (brand.colors.secondary) {
        colorGuidance += `, secondary color ${brand.colors.secondary} as accent`;
      }
    }
    
    return colorGuidance;
  }

  /**
   * Adapte l'éclairage pour la vidéo
   */
  private adaptLightingForVideo(lighting: LightingSetup, config: VeoCreativeConfig): string {
    let lightingInstructions = lighting.characteristics;
    
    // Ajouter des instructions spécifiques vidéo
    lightingInstructions += `, consistent lighting throughout video sequence`;
    
    if (lighting.name.includes('Golden Hour')) {
      lightingInstructions += `, warm golden light with soft shadows, cinematic golden hour atmosphere`;
    } else if (lighting.name.includes('Studio')) {
      lightingInstructions += `, professional studio lighting setup, controlled illumination`;
    }
    
    return lightingInstructions;
  }

  /**
   * Construit les éléments contextuels
   */
  private buildContextualElements(context: CreativeContext, config: VeoCreativeConfig): string {
    let contextual = context.description;
    
    // Adapter pour le produit
    if (config.product.category) {
      contextual += `, optimized for ${config.product.category} presentation`;
    }
    
    // Ajouter des éléments de mouvement contextuel
    if (context.name.includes('Kitchen')) {
      contextual += `, gentle steam or bubbling effects, kitchen ambiance`;
    } else if (context.name.includes('Beach')) {
      contextual += `, gentle waves, sand particles, ocean breeze effects`;
    } else if (context.name.includes('Urban')) {
      contextual += `, city life movement, urban energy, street atmosphere`;
    }
    
    return contextual;
  }

  /**
   * Construit l'intégration de marque
   */
  private buildBrandIntegration(brand: any, product: any): string {
    let integration = `${brand.name} brand identity`;
    
    if (brand.sector) {
      integration += `, ${brand.sector} sector positioning`;
    }
    
    if (brand.pricePositioning) {
      integration += `, ${brand.pricePositioning} market positioning`;
    }
    
    if (product.uniqueSellingPoints?.length > 0) {
      integration += `, highlighting ${product.uniqueSellingPoints[0]}`;
    }
    
    return integration;
  }

  /**
   * Construit les spécifications techniques
   */
  private buildTechnicalSpecs(config: VeoCreativeConfig): string {
    const specs = [];
    
    if (config.duration) {
      specs.push(`${config.duration} seconds duration`);
    }
    
    if (config.aspectRatio) {
      specs.push(`${config.aspectRatio} aspect ratio`);
    }
    
    specs.push('high quality video', 'smooth motion', 'professional production value');
    
    return specs.join(', ');
  }

  /**
   * Génère le prompt final optimisé pour VEO
   */
  generateFinalVeoPrompt(veoPrompt: VeoCreativePrompt): string {
    const finalPrompt = [
      veoPrompt.mainPrompt,
      veoPrompt.styleDescription,
      veoPrompt.contextualElements,
      veoPrompt.lightingInstructions,
      veoPrompt.colorGuidance,
      veoPrompt.brandIntegration,
      veoPrompt.technicalSpecs
    ].join('. ');

    logger.info(`[VeoCreativeDirector] 🎯 Prompt final généré: ${finalPrompt.length} caractères`);
    
    return finalPrompt;
  }

  /**
   * Obtient les statistiques de diversité pour un calendrier
   */
  getDiversityStats(calendarId: string): { styles: number; contexts: number; palettes: number } {
    const cache = VeoCreativeCache.getInstance(calendarId);
    return cache.getUsageStats();
  }
}

// Export de l'instance singleton
export default new VeoCreativeDirector();
