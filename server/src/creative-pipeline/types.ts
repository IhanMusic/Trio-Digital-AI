/**
 * Creative Pipeline Types
 * Types et interfaces pour le pipeline de génération d'images en 3 étapes
 * Strategist → Artistic Direction → Gemini Image Generation
 */

// ============================================================================
// ÉTAPE 1: STRATEGIST - Types d'entrée et sortie
// ============================================================================

export interface BrandContext {
  name: string;
  sector: string;
  description?: string;
  pricePositioning?: 'budget' | 'mid-range' | 'premium' | 'luxury';
  businessType?: 'B2B' | 'B2C' | 'B2B2C';
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  values?: string[];
  targetAudience?: string;
}

export interface ProductContext {
  name: string;
  category: string;
  description?: string;
  uniqueSellingPoints?: string[];
  customerBenefits?: string[];
  usageOccasions?: string[];
  targetAge?: string;
  images?: {
    main?: string;
    gallery?: string[];
  };
}

export interface CalendarContext {
  campaignObjective?: string;
  communicationStyle?: string;
  targetCountry: string;
  targetLanguages: string[];
  contentTypes?: string[];
  themes?: string[];
  keywords?: string[];
}

export interface PostContext {
  platform: string;
  postIndex: number;
  totalPosts: number;
  scheduledDate: string;
  generatedText?: string;
  hashtags?: string[];
  callToAction?: string;
  keyDates?: Array<{ name: string; importance: string }>;
}

export interface StrategistInput {
  brand: BrandContext;
  product?: ProductContext;
  calendar: CalendarContext;
  post: PostContext;
}

export interface CreativeStrategy {
  // Analyse de l'audience
  targetAudience: {
    demographic: string;
    psychographic: string;
    painPoints: string[];
    aspirations: string[];
  };
  
  // Message clé
  keyMessage: {
    headline: string;
    subheadline: string;
    emotionalHook: string;
  };
  
  // Ton émotionnel
  emotionalTone: {
    primary: string;
    secondary: string;
    intensity: 'subtle' | 'moderate' | 'strong';
  };
  
  // Concept visuel
  visualConcept: {
    mainIdea: string;
    storytellingAngle: string;
    moodDescription: string;
  };
  
  // Différenciateurs
  differentiators: string[];
  
  // Contexte sectoriel
  sectorContext: {
    industryTrends: string[];
    competitiveAdvantage: string;
    regulatoryConsiderations: string[];
  };
}

// ============================================================================
// ÉTAPE 2: ARTISTIC DIRECTION - Types
// ============================================================================

export interface CompositionStyle {
  rule: 'rule-of-thirds' | 'golden-ratio' | 'symmetry' | 'leading-lines' | 'framing' | 'minimalist';
  description: string;
  promptModifier: string;
}

export interface LightingSetup {
  type: 'natural' | 'studio' | 'dramatic' | 'soft' | 'golden-hour' | 'blue-hour' | 'high-key' | 'low-key';
  temperature: 'warm' | 'neutral' | 'cool';
  description: string;
  promptModifier: string;
}

export interface ColorPalette {
  name: string;
  colors: string[];
  mood: string;
  promptModifier: string;
}

export interface ArtisticStyle {
  id: 'minimalist' | 'emotional' | 'authentic' | 'bold' | 'corporate' | 'editorial' | 'lifestyle';
  name: string;
  description: string;
  composition: CompositionStyle;
  lighting: LightingSetup;
  colorPalette: ColorPalette;
  photographerReference: string[];
  promptModifiers: string[];
}

export interface ArtisticDirection {
  // Style sélectionné
  selectedStyle: ArtisticStyle;
  
  // Composition
  composition: {
    rule: string;
    description: string;
    productPlacement: string;
    negativeSpace: string;
  };
  
  // Éclairage
  lighting: {
    type: string;
    temperature: string;
    direction: string;
    intensity: string;
  };
  
  // Palette de couleurs
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    mood: string;
  };
  
  // Ambiance
  mood: {
    primary: string;
    secondary: string;
    emotionalImpact: string;
  };
  
  // Références
  photographerReference: string[];
  
  // Spécifications techniques
  technicalSpecs: {
    aspectRatio: string;
    resolution: string;
    format: string;
    quality: string;
  };
  
  // Modificateurs de prompt finaux
  promptModifiers: string[];
  
  // Prompt final assemblé
  finalPrompt: string;
}

// ============================================================================
// PRESETS SECTORIELS - Types
// ============================================================================

export interface SectorPreset {
  id: string;
  name: string;
  description: string;
  
  // Modificateurs de prompt par défaut
  defaultPromptModifiers: string[];
  
  // Guide de style
  styleGuide: {
    composition: string;
    lighting: string;
    colorMood: string;
    photographerReferences: string[];
  };
  
  // Styles artistiques disponibles pour ce secteur
  availableStyles: ArtisticStyle[];
  
  // Style recommandé par défaut
  defaultStyle: 'minimalist' | 'emotional' | 'authentic' | 'bold' | 'corporate' | 'editorial' | 'lifestyle';
  
  // Restrictions légales et sectorielles
  restrictions: string[];
  
  // Mots-clés négatifs (à éviter)
  negativeKeywords: string[];
  
  // Adaptations par positionnement prix
  pricePositioningAdaptations: {
    budget: string[];
    'mid-range': string[];
    premium: string[];
    luxury: string[];
  };
}

// ============================================================================
// PIPELINE - Types de sortie
// ============================================================================

export interface PipelineInput {
  brand: BrandContext;
  product?: ProductContext;
  calendar: CalendarContext;
  post: PostContext;
  referenceImages?: string[]; // Base64 encoded images
}

export interface PipelineOutput {
  // Résultats des étapes
  strategy: CreativeStrategy;
  artisticDirection: ArtisticDirection;
  
  // Image générée
  generatedImage: {
    url: string;
    width: number;
    height: number;
    format: string;
  };
  
  // Métadonnées
  metadata: {
    sectorPresetUsed: string;
    styleUsed: string;
    processingTime: number;
    promptUsed: string;
  };
}

// ============================================================================
// MAPPING SECTEURS
// ============================================================================

export type SectorId = 
  | 'agroalimentaire-fmcg'
  | 'artisanat-metiers-art'
  | 'assurance-mutuelle'
  | 'automobile'
  | 'banque-finance'
  | 'beaute-bien-etre'
  | 'batiment-construction'
  | 'biens-consommation'
  | 'chimie-pharmaceutique'
  | 'communication-medias'
  | 'divertissement-culture'
  | 'education-formation'
  | 'energie-ressources'
  | 'environnement-durable'
  | 'hotellerie-restauration'
  | 'immobilier'
  | 'industrie-manufacturiere'
  | 'informatique-technologies'
  | 'juridique-conseil'
  | 'mode-luxe'
  | 'ong-associations'
  | 'retail-distribution'
  | 'sante-services-sociaux'
  | 'securite-defense'
  | 'services-b2b'
  | 'services-b2c'
  | 'sport-fitness'
  | 'telecommunications'
  | 'transport-logistique';

export const SECTOR_NAME_TO_ID: Record<string, SectorId> = {
  'Agroalimentaire et FMCG': 'agroalimentaire-fmcg',
  'Artisanat et Métiers d\'art': 'artisanat-metiers-art',
  'Assurance et Mutuelle': 'assurance-mutuelle',
  'Automobile': 'automobile',
  'Banque et Finance': 'banque-finance',
  'Beauté et Bien-être': 'beaute-bien-etre',
  'Bâtiment et Construction': 'batiment-construction',
  'Biens de consommation': 'biens-consommation',
  'Chimie et Pharmaceutique': 'chimie-pharmaceutique',
  'Communication et Médias': 'communication-medias',
  'Divertissement et Culture': 'divertissement-culture',
  'Éducation et Formation': 'education-formation',
  'Énergie et Ressources': 'energie-ressources',
  'Environnement et Développement durable': 'environnement-durable',
  'Hôtellerie, Restauration et Loisirs': 'hotellerie-restauration',
  'Immobilier': 'immobilier',
  'Industrie Manufacturière': 'industrie-manufacturiere',
  'Informatique et Technologies': 'informatique-technologies',
  'Juridique et Conseil': 'juridique-conseil',
  'Mode et Luxe': 'mode-luxe',
  'ONG et Associations': 'ong-associations',
  'Retail et Distribution': 'retail-distribution',
  'Santé et Services sociaux': 'sante-services-sociaux',
  'Sécurité et Défense': 'securite-defense',
  'Services B2B': 'services-b2b',
  'Services B2C': 'services-b2c',
  'Sport et Fitness': 'sport-fitness',
  'Télécommunications': 'telecommunications',
  'Transport et Logistique': 'transport-logistique'
};

export function getSectorId(sectorName: string): SectorId {
  return SECTOR_NAME_TO_ID[sectorName] || 'biens-consommation';
}
