/**
 * 🌍 CREATIVE ENGINE - TYPES CONTEXTES
 * 
 * Types TypeScript pour les contextes géographiques et temporels
 * Architecture modulaire Cannes Lions 2026
 */

/**
 * Contexte géographique d'un pays
 */
export interface GeographicContext {
  country: string;
  displayName: string;
  culturalValues: string[];
  visualPreferences: string[];
  taboos: string[];
  holidays: Array<{
    name: string;
    importance: 'critical' | 'high' | 'medium' | 'low';
    date?: string;
  }>;
  consumerBehavior: string[];
  languageNuances?: string[];
  colorSymbolism?: Record<string, string>; // Couleur → Signification culturelle
}

/**
 * Contexte saisonnier
 */
export interface SeasonalContext {
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  displayName: string;
  visualElements: string[];
  colorPalette: string[]; // Codes HEX
  mood: string;
  bestFor: string[]; // Secteurs/catégories appropriés
  avoidFor?: string[]; // Secteurs/catégories à éviter
}

/**
 * Contexte d'événement
 */
export interface EventContext {
  name: string;
  type: 'holiday' | 'commercial' | 'cultural' | 'seasonal';
  importance: 'critical' | 'high' | 'medium' | 'low';
  visualElements: string[];
  colorPalette: string[];
  mood: string;
  bestFor: string[];
  avoidFor?: string[];
  culturalRelevance: string[]; // Pays concernés
}
