/**
 * 🎨 CREATIVE ENGINE - SECTORS INDEX
 * 
 * Export centralisé de tous les presets sectoriels
 * Qualité Cannes Lions garantie pour tous les secteurs
 */

// Presets existants
export { FOOD_BEVERAGE_PRESET } from './food-beverage';
export { BEAUTY_COSMETICS_PRESET } from './beauty-cosmetics';
export { FASHION_APPAREL_PRESET } from './fashion-apparel';

// Nouveaux presets créés
export { AUTOMOTIVE_PRESET } from './automotive';
export { SPORT_FITNESS_PRESET } from './sport-fitness';
export { TECH_ELECTRONICS_PRESET } from './tech-electronics';
export { SERVICES_B2B_PRESET } from './services-b2b';
export { SERVICES_B2C_PRESET } from './services-b2c';
export { BANKING_FINANCE_PRESET } from './banking-finance';
export { INSURANCE_PRESET } from './insurance';
export { HEALTH_WELLNESS_PRESET } from './health-wellness';
export { EDUCATION_TRAINING_PRESET } from './education-training';
export { HOSPITALITY_LEISURE_PRESET } from './hospitality-leisure';
export { REAL_ESTATE_PRESET } from './real-estate';

// Import pour le mapping
import { FOOD_BEVERAGE_PRESET } from './food-beverage';
import { BEAUTY_COSMETICS_PRESET } from './beauty-cosmetics';
import { FASHION_APPAREL_PRESET } from './fashion-apparel';
import { AUTOMOTIVE_PRESET } from './automotive';
import { SPORT_FITNESS_PRESET } from './sport-fitness';
import { TECH_ELECTRONICS_PRESET } from './tech-electronics';
import { SERVICES_B2B_PRESET } from './services-b2b';
import { SERVICES_B2C_PRESET } from './services-b2c';
import { BANKING_FINANCE_PRESET } from './banking-finance';
import { INSURANCE_PRESET } from './insurance';
import { HEALTH_WELLNESS_PRESET } from './health-wellness';
import { EDUCATION_TRAINING_PRESET } from './education-training';
import { HOSPITALITY_LEISURE_PRESET } from './hospitality-leisure';
import { REAL_ESTATE_PRESET } from './real-estate';

import { SectorPreset } from '../types';

/**
 * Mapping des secteurs du formulaire vers les presets
 * Clé = nom du secteur dans formOptions.ts
 * Valeur = preset correspondant
 */
export const SECTOR_PRESETS_MAP: Record<string, SectorPreset> = {
  // Agroalimentaire et FMCG
  "Agroalimentaire et FMCG": FOOD_BEVERAGE_PRESET,
  
  // Artisanat et Métiers d'art - utilise Fashion pour l'artisanat créatif
  "Artisanat et Métiers d'art": FASHION_APPAREL_PRESET,
  
  // Assurance et Mutuelle
  "Assurance et Mutuelle": INSURANCE_PRESET,
  
  // Automobile
  "Automobile": AUTOMOTIVE_PRESET,
  
  // Banque et Finance
  "Banque et Finance": BANKING_FINANCE_PRESET,
  
  // Beauté et Bien-être
  "Beauté et Bien-être": BEAUTY_COSMETICS_PRESET,
  
  // Bâtiment et Construction - utilise Real Estate
  "Bâtiment et Construction": REAL_ESTATE_PRESET,
  
  // Biens de consommation - utilise Food/Beverage comme base
  "Biens de consommation": FOOD_BEVERAGE_PRESET,
  
  // Chimie et Pharmaceutique - utilise Health/Wellness
  "Chimie et Pharmaceutique": HEALTH_WELLNESS_PRESET,
  
  // Communication et Médias - utilise Tech
  "Communication et Médias": TECH_ELECTRONICS_PRESET,
  
  // Divertissement et Culture - utilise Hospitality
  "Divertissement et Culture": HOSPITALITY_LEISURE_PRESET,
  
  // Éducation et Formation
  "Éducation et Formation": EDUCATION_TRAINING_PRESET,
  
  // Énergie et Ressources - utilise Tech
  "Énergie et Ressources": TECH_ELECTRONICS_PRESET,
  
  // Environnement et Développement durable - utilise Tech
  "Environnement et Développement durable": TECH_ELECTRONICS_PRESET,
  
  // Hôtellerie, Restauration et Loisirs
  "Hôtellerie, Restauration et Loisirs": HOSPITALITY_LEISURE_PRESET,
  
  // Immobilier
  "Immobilier": REAL_ESTATE_PRESET,
  
  // Industrie Manufacturière - utilise Tech
  "Industrie Manufacturière": TECH_ELECTRONICS_PRESET,
  
  // Informatique et Technologies
  "Informatique et Technologies": TECH_ELECTRONICS_PRESET,
  
  // Juridique et Conseil - utilise Services B2B
  "Juridique et Conseil": SERVICES_B2B_PRESET,
  
  // Mode et Luxe
  "Mode et Luxe": FASHION_APPAREL_PRESET,
  
  // ONG et Associations - utilise Services B2C
  "ONG et Associations": SERVICES_B2C_PRESET,
  
  // Retail et Distribution - utilise Food/Beverage
  "Retail et Distribution": FOOD_BEVERAGE_PRESET,
  
  // Santé et Services sociaux
  "Santé et Services sociaux": HEALTH_WELLNESS_PRESET,
  
  // Sécurité et Défense - utilise Services B2B
  "Sécurité et Défense": SERVICES_B2B_PRESET,
  
  // Services B2B
  "Services B2B": SERVICES_B2B_PRESET,
  
  // Services B2C
  "Services B2C": SERVICES_B2C_PRESET,
  
  // Sport et Fitness
  "Sport et Fitness": SPORT_FITNESS_PRESET,
  
  // Télécommunications - utilise Tech
  "Télécommunications": TECH_ELECTRONICS_PRESET,
  
  // Transport et Logistique - utilise Automotive
  "Transport et Logistique": AUTOMOTIVE_PRESET
};

/**
 * Récupère le preset pour un secteur donné
 * @param sector - Nom du secteur (depuis le formulaire)
 * @returns Le preset correspondant ou un preset par défaut
 */
export function getPresetBySector(sector: string): SectorPreset {
  const preset = SECTOR_PRESETS_MAP[sector];
  
  if (preset) {
    return preset;
  }
  
  // Fallback: essayer de trouver une correspondance partielle
  const sectorLower = sector.toLowerCase();
  
  if (sectorLower.includes('food') || sectorLower.includes('beverage') || sectorLower.includes('alimentaire')) {
    return FOOD_BEVERAGE_PRESET;
  }
  if (sectorLower.includes('beauty') || sectorLower.includes('cosmetic') || sectorLower.includes('beauté')) {
    return BEAUTY_COSMETICS_PRESET;
  }
  if (sectorLower.includes('fashion') || sectorLower.includes('mode') || sectorLower.includes('luxe')) {
    return FASHION_APPAREL_PRESET;
  }
  if (sectorLower.includes('auto') || sectorLower.includes('vehicle') || sectorLower.includes('voiture')) {
    return AUTOMOTIVE_PRESET;
  }
  if (sectorLower.includes('sport') || sectorLower.includes('fitness')) {
    return SPORT_FITNESS_PRESET;
  }
  if (sectorLower.includes('tech') || sectorLower.includes('informatique') || sectorLower.includes('digital')) {
    return TECH_ELECTRONICS_PRESET;
  }
  if (sectorLower.includes('bank') || sectorLower.includes('finance') || sectorLower.includes('banque')) {
    return BANKING_FINANCE_PRESET;
  }
  if (sectorLower.includes('insurance') || sectorLower.includes('assurance')) {
    return INSURANCE_PRESET;
  }
  if (sectorLower.includes('health') || sectorLower.includes('santé') || sectorLower.includes('medical')) {
    return HEALTH_WELLNESS_PRESET;
  }
  if (sectorLower.includes('education') || sectorLower.includes('formation') || sectorLower.includes('training')) {
    return EDUCATION_TRAINING_PRESET;
  }
  if (sectorLower.includes('hotel') || sectorLower.includes('restaurant') || sectorLower.includes('tourism')) {
    return HOSPITALITY_LEISURE_PRESET;
  }
  if (sectorLower.includes('real estate') || sectorLower.includes('immobilier') || sectorLower.includes('property')) {
    return REAL_ESTATE_PRESET;
  }
  if (sectorLower.includes('b2b') || sectorLower.includes('business')) {
    return SERVICES_B2B_PRESET;
  }
  if (sectorLower.includes('b2c') || sectorLower.includes('consumer') || sectorLower.includes('service')) {
    return SERVICES_B2C_PRESET;
  }
  
  // Default fallback
  console.warn(`No preset found for sector: ${sector}, using default FOOD_BEVERAGE_PRESET`);
  return FOOD_BEVERAGE_PRESET;
}

/**
 * Liste de tous les presets disponibles
 */
export const ALL_SECTOR_PRESETS: SectorPreset[] = [
  FOOD_BEVERAGE_PRESET,
  BEAUTY_COSMETICS_PRESET,
  FASHION_APPAREL_PRESET,
  AUTOMOTIVE_PRESET,
  SPORT_FITNESS_PRESET,
  TECH_ELECTRONICS_PRESET,
  SERVICES_B2B_PRESET,
  SERVICES_B2C_PRESET,
  BANKING_FINANCE_PRESET,
  INSURANCE_PRESET,
  HEALTH_WELLNESS_PRESET,
  EDUCATION_TRAINING_PRESET,
  HOSPITALITY_LEISURE_PRESET,
  REAL_ESTATE_PRESET
];

/**
 * Récupère un style photographique aléatoire pour un secteur
 */
export function getRandomStyleForSector(sector: string): any {
  const preset = getPresetBySector(sector);
  const styles = preset.photographicStyles;
  return styles[Math.floor(Math.random() * styles.length)];
}

/**
 * Récupère un contexte aléatoire pour un secteur
 */
export function getRandomContextForSector(sector: string): any {
  const preset = getPresetBySector(sector);
  const contexts = preset.contexts;
  return contexts[Math.floor(Math.random() * contexts.length)];
}

/**
 * Récupère une palette de couleurs aléatoire pour un secteur
 */
export function getRandomPaletteForSector(sector: string): any {
  const preset = getPresetBySector(sector);
  const palettes = preset.colorPalettes;
  return palettes[Math.floor(Math.random() * palettes.length)];
}
