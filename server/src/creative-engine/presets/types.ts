/**
 * 🎨 CREATIVE ENGINE - TYPES PRESETS
 * 
 * Types TypeScript pour la bibliothèque de presets créatifs
 * Architecture modulaire Cannes Lions 2026
 */

/**
 * Style photographique professionnel
 */
export interface PhotographicStyle {
  name: string;
  category: string;
  reference: string; // Photographe ou artiste de référence
  lighting: string;
  composition: string;
  mood: string;
  technicalSpecs: string;
  bestFor: string[]; // Occasions d'usage optimales
  cannesLionsScore?: number; // Score potentiel Cannes Lions (0-100)
}

/**
 * Contexte créatif visuel
 */
export interface CreativeContext {
  name: string;
  description: string;
  usageOccasions: string[];
  culturalRelevance?: string[]; // Pays/cultures appropriés
  seasonalFit?: string[]; // Saisons appropriées
}

/**
 * Palette de couleurs
 */
export interface ColorPalette {
  name: string;
  description: string;
  colors: string[]; // Codes HEX
  bestFor: string[];
  mood: string;
  brandIntegration?: number; // % d'intégration des couleurs de marque (0-100)
}

/**
 * Framework créatif
 */
export interface CreativeFramework {
  name: string;
  structure: string;
  application: string;
  bestFor: string[];
}

/**
 * Setup d'éclairage professionnel
 */
export interface LightingSetup {
  name: string;
  timeOfDay: string;
  characteristics: string;
  mood: string;
  technicalDetails?: string;
}

/**
 * Preset complet pour un secteur
 */
export interface SectorPreset {
  sector: string;
  displayName: string;
  photographicStyles: PhotographicStyle[];
  contexts: CreativeContext[];
  colorPalettes: ColorPalette[];
  frameworks: CreativeFramework[];
  lightingSetups: LightingSetup[];
  bestPractices: string[];
  avoidances: string[];
}

/**
 * Preset complet pour une catégorie produit
 */
export interface CategoryPreset {
  category: string;
  displayName: string;
  parentSector: string;
  photographicStyles: PhotographicStyle[];
  contexts: CreativeContext[];
  colorPalettes: ColorPalette[];
  specificTechniques: string[];
  bestPractices: string[];
  avoidances: string[];
}

/**
 * Preset sélectionné pour génération
 */
export interface SelectedPreset {
  style: PhotographicStyle;
  context: CreativeContext;
  palette: ColorPalette;
  framework: CreativeFramework;
  lighting: LightingSetup;
  source: 'sector' | 'category';
  confidence: number; // Score de confiance de la sélection (0-100)
}
