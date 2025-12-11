/**
 * 🎭 CREATIVE ENGINE - TYPES FRAMEWORKS
 * 
 * Types TypeScript pour les frameworks créatifs (storytelling et visuels)
 * Architecture modulaire Cannes Lions 2026
 */

/**
 * Framework de storytelling narratif
 */
export interface StorytellingFramework {
  name: string;
  displayName: string;
  structure: string;
  steps: string[];
  application: string;
  bestFor: string[]; // Secteurs/objectifs appropriés
  emotionalArc: string;
  examples?: string[];
}

/**
 * Règle de composition visuelle
 */
export interface CompositionRule {
  name: string;
  displayName: string;
  description: string;
  application: string;
  technicalDetails: string;
  bestFor: string[];
  visualExample?: string;
}

/**
 * Théorie des couleurs
 */
export interface ColorTheory {
  name: string;
  displayName: string;
  description: string;
  colorCombinations: Array<{
    name: string;
    colors: string[]; // Codes HEX
    mood: string;
    application: string;
  }>;
  psychologicalEffects: Record<string, string>; // Couleur → Effet psychologique
  culturalMeanings: Record<string, Record<string, string>>; // Pays → Couleur → Signification
}

/**
 * Setup d'éclairage professionnel détaillé
 */
export interface LightingFramework {
  name: string;
  displayName: string;
  type: 'natural' | 'studio' | 'mixed';
  timeOfDay: string;
  equipment?: string[];
  setup: string;
  characteristics: string;
  mood: string;
  bestFor: string[];
  technicalSpecs?: string;
}
