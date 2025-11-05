/**
 * Test final pour valider les nouveaux styles boissons
 * Vérifie la diversité et la pertinence des styles pour différents types de boissons
 */

import { 
  PHOTOGRAPHIC_STYLES, 
  preFilterStylesBySector,
  preFilterContextsByUsage,
  getRelevantPresetsForGPT,
  selectCreativePreset,
  CREATIVE_CONTEXTS,
  COLOR_PALETTES,
  CREATIVE_FRAMEWORKS,
  LIGHTING_SETUPS
} from '../services/CreativePresetsLibrary';

// Types de boissons à tester
const beverageTypes = [
  {
    name: 'Jus d\'orange frais',
    sector: 'beverage',
    category: 'juice',
    usageOccasions: ['breakfast', 'fresh-juice', 'healthy-eating', 'morning-routine']
  },
  {
    name: 'Smoothie vert détox',
    sector: 'beverage', 
    category: 'smoothie',
    usageOccasions: ['smoothie', 'green-juice', 'healthy-eating', 'post-workout']
  },
  {
    name: 'Kombucha artisanal',
    sector: 'beverage',
    category: 'fermented',
    usageOccasions: ['healthy-eating', 'trendy', 'artisan', 'wellness']
  },
  {
    name: 'Café cold brew',
    sector: 'beverage',
    category: 'coffee',
    usageOccasions: ['coffee', 'cold-brew', 'urban', 'work']
  },
  {
    name: 'Cocktail tropical',
    sector: 'beverage',
    category: 'cocktail', 
    usageOccasions: ['cocktail', 'tropical', 'summer', 'celebration']
  },
  {
    name: 'Thé matcha premium',
    sector: 'beverage',
    category: 'tea',
    usageOccasions: ['tea', 'wellness', 'zen', 'premium']
  }
];

