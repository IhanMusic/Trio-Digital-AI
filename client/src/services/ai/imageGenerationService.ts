import { BriefData } from '../../types/brief';
import { config } from '../../config/env';
import {
  formatPromptForStability,
  SectorType,
  createAdvertisingPrompt
} from '../../prompts/stability/utils';
import { generateSectorPrompt } from '../../prompts/stability/sectorPrompts';
import { getNegativePromptWithStyle } from '../../prompts/stability/negativePrompts';
import { getStylePreset, PresetType } from '../../prompts/stability/stylePresets';
import { ImageValidationService } from './imageValidationService';
import { ImageGenerationHistoryService } from './imageGenerationHistoryService';
import { ImageCacheService } from './imageCacheService';
import axios from 'axios';

const MAX_ATTEMPTS = 3;
const MIN_VALIDATION_SCORE = 85;
const SCORE_DECAY_PER_ATTEMPT = 5;
const MAX_PROMPT_LENGTH = 2000;

// Seuils de qualité
const QUALITY_THRESHOLDS = {
  HIGH: 90,
  MEDIUM: 80,
  LOW: 70
};

interface CompositionRule {
  name: string;
  description: string;
  prompt: string;
  type?: 'standard' | 'advertising';
}

interface LightingSetup {
  name: string;
  description: string;
  prompt: string;
  timeOfDay?: string;
  type?: 'standard' | 'advertising';
}

interface ColorScheme {
  name: string;
  description: string;
  colors: string[];
  prompt: string;
  type?: 'standard' | 'advertising';
}

type AdvertisingStyle = 'minimalist' | 'emotional' | 'authentic' | 'bold' | 'corporate';

interface GenerationMetadata {
  purpose: string;
  timeOfDay?: string;
  attempt: number;
  quality: 'low' | 'medium' | 'high';
}

interface GenerationOptions {
  purpose?: 'social' | 'product' | 'lifestyle';
  timeOfDay?: string;
  attempt?: number;
  generationId?: string;
}

const COMPOSITION_RULES: CompositionRule[] = [
  {
    name: 'Règle des tiers',
    description: 'Divise l\'image en tiers pour une composition équilibrée',
    prompt: 'composition following rule of thirds, balanced layout, dynamic positioning, professional composition',
    type: 'standard'
  },
  {
    name: 'Point focal',
    description: 'Crée un point d\'intérêt principal',
    prompt: 'strong focal point, eye-catching main subject, clear visual hierarchy, professional product placement',
    type: 'standard'
  },
  // Nouvelles règles de composition publicitaire
  {
    name: 'Composition publicitaire minimaliste',
    description: 'Style épuré avec beaucoup d\'espace négatif',
    prompt: 'award-winning minimalist composition, perfect symmetry, elegant simplicity, strategic negative space, iconic product presentation',
    type: 'advertising'
  },
  {
    name: 'Composition publicitaire narrative',
    description: 'Composition qui raconte une histoire',
    prompt: 'award-winning storytelling composition, emotional focal point, dynamic visual narrative, strategic framing, powerful visual hierarchy',
    type: 'advertising'
  },
  {
    name: 'Composition publicitaire authentique',
    description: 'Composition naturelle et authentique',
    prompt: 'award-winning authentic composition, natural framing, genuine moment capture, environmental context, aspirational yet authentic',
    type: 'advertising'
  },
  {
    name: 'Composition publicitaire audacieuse',
    description: 'Composition provocante et disruptive',
    prompt: 'award-winning bold composition, provocative visual concept, unexpected framing, visual tension technique, attention-grabbing layout',
    type: 'advertising'
  },
  {
    name: 'Composition publicitaire corporate',
    description: 'Composition professionnelle et équilibrée',
    prompt: 'award-winning corporate composition, professional framing, strategic visual hierarchy, balanced layout, trustworthy perspective',
    type: 'advertising'
  }
];

const LIGHTING_SETUPS: LightingSetup[] = [
  {
    name: 'Éclairage studio premium',
    description: 'Éclairage professionnel type studio photo',
    prompt: 'premium studio lighting, professional photography setup, perfect exposure, cinematic lighting, dramatic shadows',
    timeOfDay: 'studio',
    type: 'standard'
  },
  {
    name: 'Lumière naturelle douce',
    description: 'Éclairage doux et diffus',
    prompt: 'soft natural lighting, gentle shadows, airy atmosphere, golden hour lighting, perfect exposure',
    timeOfDay: 'morning',
    type: 'standard'
  },
  // Nouveaux éclairages publicitaires
  {
    name: 'Éclairage publicitaire minimaliste',
    description: 'Éclairage épuré et précis',
    prompt: 'award-winning minimalist lighting, clean studio lighting, perfect exposure, precise shadow control, premium product highlighting',
    timeOfDay: 'studio',
    type: 'advertising'
  },
  {
    name: 'Éclairage publicitaire émotionnel',
    description: 'Éclairage dramatique et émotionnel',
    prompt: 'award-winning emotional lighting, dramatic light contrast, cinematic mood lighting, atmospheric light effect, emotional shadow play',
    timeOfDay: 'evening',
    type: 'advertising'
  },
  {
    name: 'Éclairage publicitaire authentique',
    description: 'Éclairage naturel et authentique',
    prompt: 'award-winning authentic lighting, natural golden hour light, realistic light interaction, environmental lighting, perfect imperfection',
    timeOfDay: 'morning',
    type: 'advertising'
  },
  {
    name: 'Éclairage publicitaire audacieux',
    description: 'Éclairage contrasté et provocant',
    prompt: 'award-winning bold lighting, high contrast lighting, dramatic shadow play, unconventional light source, attention-grabbing highlights',
    timeOfDay: 'night',
    type: 'advertising'
  },
  {
    name: 'Éclairage publicitaire corporate',
    description: 'Éclairage professionnel et équilibré',
    prompt: 'award-winning corporate lighting, professional 3-point lighting, clean shadow definition, balanced exposure, trustworthy illumination',
    timeOfDay: 'day',
    type: 'advertising'
  }
];

const COLOR_SCHEMES: ColorScheme[] = [
  {
    name: 'Premium moderne',
    description: 'Palette sophistiquée et contemporaine',
    colors: ['#1A1A1A', '#FFFFFF', '#C0C0C0', '#808080'],
    prompt: 'modern premium color palette, sophisticated tones, contemporary color scheme, professional color grading',
    type: 'standard'
  },
  // Nouvelles palettes de couleurs publicitaires
  {
    name: 'Palette publicitaire minimaliste',
    description: 'Palette épurée et élégante',
    colors: ['#FFFFFF', '#F5F5F5', '#E0E0E0', '#000000'],
    prompt: 'award-winning minimalist color palette, elegant monochromatic scheme, premium color psychology, sophisticated color harmony, iconic brand colors',
    type: 'advertising'
  },
  {
    name: 'Palette publicitaire émotionnelle',
    description: 'Palette riche et émotionnelle',
    colors: ['#2C3E50', '#E74C3C', '#ECF0F1', '#3498DB'],
    prompt: 'award-winning emotional color palette, dramatic color contrast, cinematic color grading, mood-enhancing tones, emotional color psychology',
    type: 'advertising'
  },
  {
    name: 'Palette publicitaire authentique',
    description: 'Palette naturelle et chaleureuse',
    colors: ['#D4C6A8', '#F9F3E5', '#8A7968', '#4A4039'],
    prompt: 'award-winning authentic color palette, natural color harmony, warm earthy tones, genuine color grading, aspirational yet authentic colors',
    type: 'advertising'
  },
  {
    name: 'Palette publicitaire audacieuse',
    description: 'Palette vibrante et provocante',
    colors: ['#FF0066', '#00FFFF', '#FFFF00', '#000000'],
    prompt: 'award-winning bold color palette, vibrant color contrast, provocative color combinations, attention-grabbing hues, disruptive color psychology',
    type: 'advertising'
  },
  {
    name: 'Palette publicitaire corporate',
    description: 'Palette professionnelle et rassurante',
    colors: ['#0A2463', '#3E92CC', '#FFFFFF', '#D8E1E9'],
    prompt: 'award-winning corporate color palette, professional color harmony, trustworthy blue tones, strategic color psychology, premium business palette',
    type: 'advertising'
  }
];

export class ImageGenerationService {
  private static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Extraire uniquement la partie base64 en supprimant le préfixe data:image/...;base64,
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = error => reject(error);
    });
  }

  private static getAuthHeaders() {
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
      throw new Error('Utilisateur non authentifié');
    }
    return {
      'Authorization': `Bearer ${userEmail}`,
      'Accept': 'application/json'
    };
  }

  private static getCompositionPrompt(brief: BriefData, purpose: string = 'social', useAdvertisingStyle: boolean = false): string {
    if (useAdvertisingStyle) {
      const adStyle = this.determineAdvertisingStyle(brief);
      const adRules = COMPOSITION_RULES.filter(rule => rule.type === 'advertising');
      
      // Trouver la règle correspondant au style publicitaire
      let rule;
      switch (adStyle) {
        case 'minimalist':
          rule = adRules.find(r => r.name.includes('minimaliste'));
          break;
        case 'emotional':
          rule = adRules.find(r => r.name.includes('narrative'));
          break;
        case 'authentic':
          rule = adRules.find(r => r.name.includes('authentique'));
          break;
        case 'bold':
          rule = adRules.find(r => r.name.includes('audacieuse'));
          break;
        case 'corporate':
          rule = adRules.find(r => r.name.includes('corporate'));
          break;
        default:
          rule = adRules[0];
      }
      
      return rule?.prompt || adRules[0].prompt;
    }
    
    // Comportement standard basé sur le purpose
    const rule = purpose === 'product'
      ? COMPOSITION_RULES[1] // Point focal pour les produits
      : COMPOSITION_RULES[0]; // Règle des tiers pour le reste
    
    return rule.prompt;
  }

  private static getLightingPrompt(brief: BriefData, timeOfDay?: string, useAdvertisingStyle: boolean = false): string {
    if (useAdvertisingStyle) {
      const adStyle = this.determineAdvertisingStyle(brief);
      const adSetups = LIGHTING_SETUPS.filter(setup => setup.type === 'advertising');
      
      // Trouver l'éclairage correspondant au style publicitaire
      let setup;
      switch (adStyle) {
        case 'minimalist':
          setup = adSetups.find(s => s.name.includes('minimaliste'));
          break;
        case 'emotional':
          setup = adSetups.find(s => s.name.includes('émotionnel'));
          break;
        case 'authentic':
          setup = adSetups.find(s => s.name.includes('authentique'));
          break;
        case 'bold':
          setup = adSetups.find(s => s.name.includes('audacieux'));
          break;
        case 'corporate':
          setup = adSetups.find(s => s.name.includes('corporate'));
          break;
        default:
          setup = adSetups[0];
      }
      
      return setup?.prompt || adSetups[0].prompt;
    }
    
    // Comportement standard
    const setup = timeOfDay 
      ? LIGHTING_SETUPS.find(s => s.timeOfDay === timeOfDay && s.type === 'standard')
      : brief.pricePositioning?.toLowerCase().includes('luxury') || brief.pricePositioning?.toLowerCase().includes('premium')
        ? LIGHTING_SETUPS[0]
        : LIGHTING_SETUPS[1];
    
    return setup?.prompt || LIGHTING_SETUPS[0].prompt;
  }

  private static getColorPrompt(brief: BriefData, useAdvertisingStyle: boolean = false): string {
    if (useAdvertisingStyle) {
      const adStyle = this.determineAdvertisingStyle(brief);
      const adSchemes = COLOR_SCHEMES.filter(scheme => scheme.type === 'advertising');
      
      // Trouver la palette correspondant au style publicitaire
      let scheme;
      switch (adStyle) {
        case 'minimalist':
          scheme = adSchemes.find(s => s.name.includes('minimaliste'));
          break;
        case 'emotional':
          scheme = adSchemes.find(s => s.name.includes('émotionnelle'));
          break;
        case 'authentic':
          scheme = adSchemes.find(s => s.name.includes('authentique'));
          break;
        case 'bold':
          scheme = adSchemes.find(s => s.name.includes('audacieuse'));
          break;
        case 'corporate':
          scheme = adSchemes.find(s => s.name.includes('corporate'));
          break;
        default:
          scheme = adSchemes[0];
      }
      
      return scheme?.prompt || adSchemes[0].prompt;
    }
    
    // Comportement standard
    return COLOR_SCHEMES[0].prompt;
  }
  
  private static determineAdvertisingStyle(brief: BriefData): AdvertisingStyle {
    // communicationStyle n'est plus dans BriefData, utiliser une valeur par défaut
    // ou le recevoir comme paramètre
    const style = brief.businessType?.toLowerCase() || '';
    const sector = brief.sector.toLowerCase();
    
    // Déterminer le style en fonction du style de communication
    if (style.includes('minimaliste') || style.includes('épuré') || style.includes('simple')) {
      return 'minimalist';
    }
    
    if (style.includes('émotion') || style.includes('inspirant') || style.includes('motivant')) {
      return 'emotional';
    }
    
    if (style.includes('authentique') || style.includes('naturel') || style.includes('réel')) {
      return 'authentic';
    }
    
    if (style.includes('audacieux') || style.includes('provocant') || style.includes('disruptif')) {
      return 'bold';
    }
    
    // Déterminer le style en fonction du secteur
    if (sector.includes('banque') || sector.includes('finance') || sector.includes('assurance')) {
      return 'corporate';
    }
    
    if (sector.includes('technologie') || sector.includes('innovation')) {
      return 'minimalist';
    }
    
    if (sector.includes('hôtellerie') || sector.includes('restauration') || sector.includes('loisirs')) {
      return 'authentic';
    }
    
    if (sector.includes('mode') || sector.includes('luxe')) {
      return 'emotional';
    }
    
    // Style par défaut
    return 'emotional';
  }

  private static determineStylePreset(brief: BriefData, purpose: string, useAdvertisingStyle: boolean = false): PresetType {
    if (useAdvertisingStyle) {
      const adStyle = this.determineAdvertisingStyle(brief);
      
      // Mapper le style publicitaire au preset correspondant
      switch (adStyle) {
        case 'minimalist':
          return 'ad_minimalist';
        case 'emotional':
          return 'ad_emotional';
        case 'authentic':
          return 'ad_authentic';
        case 'bold':
          return 'ad_bold';
        case 'corporate':
          return 'ad_corporate';
        default:
          return 'ad_emotional';
      }
    }
    
    // Comportement standard
    if (brief.pricePositioning?.toLowerCase().includes('premium') || brief.pricePositioning?.toLowerCase().includes('luxury')) {
      return 'premium';
    }

    switch (purpose) {
      case 'product':
        return 'product';
      case 'lifestyle':
        return 'lifestyle';
      case 'social':
        return brief.sector === 'Banque et Finance' ? 'corporate' : 'social';
      default:
        return 'editorial';
    }
  }

  private static determineQuality(score: number): 'low' | 'medium' | 'high' {
    if (score >= QUALITY_THRESHOLDS.HIGH) {
      return 'high';
    } else if (score >= QUALITY_THRESHOLDS.MEDIUM) {
      return 'medium';
    }
    return 'low';
  }

  private static getAspectRatioForPurpose(purpose: 'social' | 'product' | 'lifestyle'): string {
    switch (purpose) {
      case 'social':
        return '1:1';
      case 'product':
        return '3:4';
      case 'lifestyle':
        return '16:9';
      default:
        return '1:1';
    }
  }

  private static truncatePrompt(prompt: string): string {
    if (prompt.length <= MAX_PROMPT_LENGTH) {
      return prompt;
    }

    // Nettoyer le prompt des virgules vides et espaces
    const cleanPrompt = prompt
      .replace(/,\s*,/g, ',')
      .replace(/:\s*,/g, ':')
      .replace(/\s+/g, ' ')
      .trim();

    // Séparer le prompt en parties principales
    const parts = cleanPrompt.split('Style Requirements:');
    const mainPrompt = parts[0];
    const requirements = parts[1] || '';

    // Sélectionner les éléments principaux
    const mainElements = mainPrompt
      .split(',')
      .map(part => part.trim())
      .filter(part => part.length > 0)
      .slice(0, 10);

    // Reconstruire le prompt
    const truncatedPrompt = `${mainElements.join(', ')}${requirements ? ', Style Requirements:' + requirements : ''}`;
    
    // S'assurer que nous ne dépassons pas la limite
    return truncatedPrompt.slice(0, MAX_PROMPT_LENGTH);
  }

  private static async generateWithParams(
    prompt: string,
    negativePrompt: string,
    purpose: 'social' | 'product' | 'lifestyle',
    options?: {
      image?: string;
      strength?: number;
    }
  ): Promise<{ url: string; quality: 'low' | 'medium' | 'high' }> {
    try {
      // Tronquer le prompt si nécessaire
      const truncatedPrompt = this.truncatePrompt(prompt);
      console.log('Envoi du prompt à Gemini (Nano Banana):', truncatedPrompt);

      // Créer le payload pour Gemini
      const payload: any = {
        prompt: truncatedPrompt,
        aspect_ratio: this.getAspectRatioForPurpose(purpose),
        image_size: '1K', // Taille par défaut, peut être '1K' ou '2K'
        number_of_images: 1
      };

      // Ajouter l'image de référence si fournie (pour les photos produit)
      if (options?.image) {
        payload.reference_image = options.image;
      }

      // Utiliser axios.postForm pour Gemini
      const response = await axios.postForm(
        `${config.apiUrl}/ai/gemini/generate`,
        payload,
        {
          headers: {
            ...this.getAuthHeaders(),
            'Accept': 'application/json'
          }
        }
      );

      console.log('Réponse brute de Gemini:', response.data);

      // Gemini renvoie directement un tableau dans data, pas data.data
      if (!response.data || !response.data.data || response.data.data.length === 0) {
        throw new Error('Réponse invalide du serveur');
      }

      return {
        url: response.data.data[0].url,
        quality: 'high' // Gemini génère toujours des images de haute qualité
      };
    } catch (error: any) {
      console.error('Erreur lors de la génération avec Gemini:', error);
      throw error;
    }
  }

  static async generateOptimizedImage(
    description: string,
    briefData: BriefData,
    options: GenerationOptions = {}
  ): Promise<{ url: string; quality: 'low' | 'medium' | 'high' }> {
    // Utiliser le mode publicitaire par défaut pour des résultats de qualité professionnelle
    const useAdvertisingStyle = true;

    const {
      purpose = 'social',
      timeOfDay,
      attempt = 1,
      generationId = `${briefData.companyName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
    } = options;

    // Photos produit ne sont plus dans brief mais seraient passées séparément si nécessaire
    let productOptions;
    // Cette fonctionnalité devrait être adaptée pour recevoir les images produit
    // depuis le backend ou comme paramètre séparé

    if (attempt > MAX_ATTEMPTS) {
      throw new Error(`Nombre maximum de tentatives (${MAX_ATTEMPTS}) atteint`);
    }

    // Construire le prompt enrichi
    const compositionPrompt = this.getCompositionPrompt(briefData, purpose, useAdvertisingStyle);
    const lightingPrompt = this.getLightingPrompt(briefData, timeOfDay, useAdvertisingStyle);
    const colorPrompt = this.getColorPrompt(briefData, useAdvertisingStyle);
    const stylePreset = this.determineStylePreset(briefData, purpose, useAdvertisingStyle);
    const preset = getStylePreset(stylePreset);
    const styleModifiers = preset.promptModifiers.join(', ');
    
    const basePrompt = `${description}, ${compositionPrompt}, ${lightingPrompt}, ${colorPrompt}, ${styleModifiers}`;
    const sectorPrompt = generateSectorPrompt(briefData, basePrompt);

    // Construire le negative prompt (communicationStyle n'existe plus dans brief, utiliser businessType)
    const negativePrompt = getNegativePromptWithStyle(briefData.sector as SectorType, briefData.businessType || 'B2C');

    // Déterminer le style publicitaire à utiliser
    const adStyle = this.determineAdvertisingStyle(briefData);
    
    // Formater les prompts pour Stability avec les options publicitaires
    const formattedPrompts = formatPromptForStability(
      sectorPrompt, 
      negativePrompt,
      {
        isAdvertising: useAdvertisingStyle,
        adStyle: adStyle,
        useAdvancedStructure: true
      }
    );

    // Vérifier le cache avant de générer
    const cachedImage = await ImageCacheService.findInCache(
      formattedPrompts.prompt,
      { samples: 1 },
      {
        purpose,
        timeOfDay,
        sector: briefData.sector,
        style: briefData.businessType || 'B2C'
      }
    );

    if (cachedImage.found) {
      return {
        url: cachedImage.imageUrl!,
        quality: 'high'
      };
    }

    // Démarrer une nouvelle session de génération
    await ImageGenerationHistoryService.startSession(generationId);

    try {
      const result = await this.generateWithParams(
        formattedPrompts.prompt,
        formattedPrompts.negative_prompt || '',
        purpose,
        productOptions
      );
      
      // Validation et enregistrement
      const validation = await ImageValidationService.validateImage(result.url, briefData);
      
      const metadata: GenerationMetadata = {
        purpose,
        timeOfDay,
        attempt,
        quality: result.quality
      };

      await ImageGenerationHistoryService.recordAttempt(
        generationId,
        result.url,
        formattedPrompts.prompt,
        { cfgScale: 0, steps: 0, samples: 1 }, // Ultra gère ses propres paramètres
        validation.score,
        validation,
        metadata
      );

      // Si le score est suffisant, on réessaie avec un meilleur score requis
      if (validation.score < MIN_VALIDATION_SCORE - (attempt - 1) * SCORE_DECAY_PER_ATTEMPT) {
        await ImageGenerationHistoryService.completeSession(generationId, false);
        return this.generateOptimizedImage(description, briefData, {
          ...options,
          attempt: attempt + 1,
          generationId
        });
      }

      // Ajouter au cache si le score est bon
      await ImageCacheService.addToCache(
        formattedPrompts.prompt,
        generationId,
        { samples: 1 },
        result.url,
        validation.score,
        validation,
        {
          purpose,
          timeOfDay,
          sector: briefData.sector,
          style: briefData.businessType || 'B2C',
          quality: result.quality
        }
      );

      await ImageGenerationHistoryService.completeSession(generationId, true);
      return result;

    } catch (error) {
      await ImageGenerationHistoryService.completeSession(generationId, false);
      throw error;
    }
  }

  static async resumeFailedGeneration(
    generationId: string,
    description: string,
    briefData: BriefData,
    options: GenerationOptions = {}
  ): Promise<{ url: string; quality: 'low' | 'medium' | 'high' }> {
    const history = await ImageGenerationHistoryService.resumeSession(generationId);
    
    if (!history.canResume) {
      throw new Error('Impossible de reprendre la génération');
    }

    const nextAttempt = history.lastAttempt ? history.lastAttempt.metadata.attempt + 1 : 1;
    
    if (nextAttempt > MAX_ATTEMPTS) {
      throw new Error(`Nombre maximum de tentatives (${MAX_ATTEMPTS}) atteint`);
    }

    return this.generateOptimizedImage(description, briefData, {
      ...options,
      attempt: nextAttempt,
      generationId
    });
  }
}
