/**
 * 🎼 CREATIVE ENGINE - TYPES ORCHESTRATOR
 * 
 * Types TypeScript pour l'orchestrateur principal
 * Architecture modulaire Cannes Lions 2026
 */

import { SelectedPreset } from '../presets/types';
import { GeographicContext, SeasonalContext, EventContext } from '../contexts/types';
import { StorytellingFramework } from '../frameworks/types';

/**
 * Contexte complet d'un post à générer
 * IMPORTANT: Utilise les données des formulaires TSX (Calendar, Brand, Product)
 */
export interface PostContext {
  // Données marque (du formulaire BrandForm.tsx)
  brand: {
    name: string;
    sector: string;
    pricePositioning?: string;
    businessType?: string;
    colors?: {
      primary?: string;
      secondary?: string;
      accent?: string;
    };
    description?: string;
    values?: string[];
    targetAudience?: string;
    logo?: string;
  };

  // Données produit (du formulaire ProductForm.tsx)
  product: {
    name: string;
    category: string;
    description: string;
    uniqueSellingPoints?: string[];
    customerBenefits?: string[];
    usageOccasions?: string[];
    flavors?: string[];
    scents?: string[];
    certifications?: string[];
    labels?: string[];
    technicalDetails?: {
      ingredients?: string[];
      nutritionalInfo?: any;
      usage?: string;
      storage?: string;
      highlights?: string;
    };
    images?: {
      main?: string;
    };
  };

  // Données calendrier (du formulaire CalendarForm dans Calendars.tsx)
  calendar: {
    campaignObjective?: string;
    generationSettings?: {
      themes?: string[];
      countries?: string[];
      startDate?: string;
      endDate?: string;
      imageStyle?: string[];
      keywords?: string[];
    };
    communicationStyle?: string;
    targetAudience?: string;
    targetCountry?: string;
    targetLanguages?: string[];
    contentTypes?: string[];
  };

  // Contexte du post spécifique
  post: {
    index: number;
    totalPosts: number;
    scheduledDate?: string;
    platform?: string;
    generatedText?: string; // Texte généré par GPT-5
    hashtags?: string[];
    callToAction?: string;
  };
}

/**
 * Analyse contextuelle complète
 */
export interface ContextAnalysis {
  sector: string;
  category: string;
  country: string;
  season?: 'spring' | 'summer' | 'autumn' | 'winter';
  events?: string[];
  culturalContext?: GeographicContext;
  seasonalContext?: SeasonalContext;
  eventContexts?: EventContext[];
  targetAudience?: string;
  pricePositioning?: string;
}

/**
 * Presets sélectionnés pour génération
 */
export interface SelectedPresets {
  primary: SelectedPreset;
  alternatives?: SelectedPreset[]; // Presets alternatifs en cas de régénération
  confidence: number; // Score de confiance global (0-100)
  reasoning: string; // Explication de la sélection
}

/**
 * Prompt construit pour génération
 */
export interface BuiltPrompt {
  mainPrompt: string; // Prompt principal pour Gemini
  technicalSpecs: string; // Spécifications techniques
  styleReference: string; // Référence de style
  colorPalette: string[]; // Palette de couleurs
  mood: string; // Mood/ambiance
  composition: string; // Règles de composition
  lighting: string; // Setup d'éclairage
  metadata: {
    preset: SelectedPreset;
    context: ContextAnalysis;
    framework?: StorytellingFramework;
  };
}

/**
 * Image générée avec métadonnées
 */
export interface GeneratedImage {
  url: string;
  width: number;
  height: number;
  variation: number;
  score?: {
    overall: number;
    anatomicalAccuracy: number;
    compositionExcellence: number;
    productFidelity: number;
    cannesLionsPotential: number;
    [key: string]: number;
  };
}

/**
 * Post complet généré
 */
export interface GeneratedPost {
  image: GeneratedImage;
  prompt: BuiltPrompt;
  presets: SelectedPresets;
  qualityScore: QualityCheck;
  metadata: {
    generationTime: number; // Temps de génération en ms
    attempts: number; // Nombre de tentatives
    model: string; // Modèle utilisé (gemini-3-pro-image-preview)
  };
}

/**
 * Contrôle qualité final
 */
export interface QualityCheck {
  passed: boolean;
  score: number; // Score global (0-100)
  criteria: {
    anatomicalAccuracy: boolean;
    compositionExcellence: boolean;
    productFidelity: boolean;
    brandIntegration: boolean;
    technicalQuality: boolean;
    cannesLionsPotential: boolean;
  };
  issues: string[]; // Problèmes détectés
  recommendations: string[]; // Recommandations d'amélioration
  regenerationRequired: boolean;
}

/**
 * Configuration de l'orchestrateur
 */
export interface OrchestratorConfig {
  diversityMode: 'low' | 'medium' | 'high';
  cannesLionsMinScore: number;
  maxStyleReuse: number;
  seasonalAwareness: boolean;
  culturalAdaptation: boolean;
}

/**
 * Requête créative pour l'orchestrateur
 */
export interface CreativeRequest {
  brand: {
    name: string;
    sector?: string;
    description?: string;
    colors?: {
      primary?: string;
      secondary?: string;
      accent?: string;
    };
    values?: string[];
    targetAudience?: string;
  };
  product?: {
    name: string;
    category?: string;
    description?: string;
    uniqueSellingPoints?: string[];
    images?: {
      main?: string;
    };
  };
  platform: string;
  objective: string;
  language?: string;
  season?: 'spring' | 'summer' | 'autumn' | 'winter';
  timeOfDay?: string;
}

/**
 * Sortie créative de l'orchestrateur
 */
export interface CreativeOutput {
  prompt: string;
  style: import('../presets/types').PhotographicStyle;
  context: import('../presets/types').CreativeContext;
  palette: import('../presets/types').ColorPalette;
  framework: import('../presets/types').CreativeFramework;
  lighting: import('../presets/types').LightingSetup;
  preset: import('../presets/types').SectorPreset;
  metadata: {
    sector: string;
    cannesLionsScore?: number;
    diversityIndex: number;
    generatedAt: string;
  };
}
