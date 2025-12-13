/**
 * Base Artistic Styles
 * Styles artistiques de base réutilisables par tous les secteurs
 */

import { ArtisticStyle, CompositionStyle, LightingSetup, ColorPalette } from '../types';

// ============================================================================
// COMPOSITIONS DE BASE
// ============================================================================

export const COMPOSITIONS: Record<string, CompositionStyle> = {
  ruleOfThirds: {
    rule: 'rule-of-thirds',
    description: 'Composition équilibrée avec le sujet placé sur les intersections',
    promptModifier: 'rule of thirds composition, balanced layout, dynamic positioning'
  },
  goldenRatio: {
    rule: 'golden-ratio',
    description: 'Composition harmonieuse suivant le nombre d\'or',
    promptModifier: 'golden ratio composition, harmonious proportions, natural flow'
  },
  symmetry: {
    rule: 'symmetry',
    description: 'Composition symétrique pour un impact visuel fort',
    promptModifier: 'perfect symmetry, centered composition, mirror balance'
  },
  leadingLines: {
    rule: 'leading-lines',
    description: 'Lignes directrices guidant le regard vers le sujet',
    promptModifier: 'leading lines composition, visual guidance, depth perspective'
  },
  minimalist: {
    rule: 'minimalist',
    description: 'Composition épurée avec beaucoup d\'espace négatif',
    promptModifier: 'minimalist composition, negative space, clean layout, elegant simplicity'
  },
  framing: {
    rule: 'framing',
    description: 'Cadrage naturel autour du sujet',
    promptModifier: 'natural framing, environmental context, focused subject'
  }
};

// ============================================================================
// ÉCLAIRAGES DE BASE
// ============================================================================

export const LIGHTINGS: Record<string, LightingSetup> = {
  naturalSoft: {
    type: 'natural',
    temperature: 'warm',
    description: 'Lumière naturelle douce et flatteuse',
    promptModifier: 'soft natural lighting, diffused daylight, gentle shadows'
  },
  studioProfessional: {
    type: 'studio',
    temperature: 'neutral',
    description: 'Éclairage studio professionnel contrôlé',
    promptModifier: 'professional studio lighting, controlled exposure, perfect highlights'
  },
  dramatic: {
    type: 'dramatic',
    temperature: 'cool',
    description: 'Éclairage dramatique avec forts contrastes',
    promptModifier: 'dramatic lighting, high contrast, deep shadows, cinematic mood'
  },
  goldenHour: {
    type: 'golden-hour',
    temperature: 'warm',
    description: 'Lumière dorée de fin de journée',
    promptModifier: 'golden hour lighting, warm sunset glow, magical atmosphere'
  },
  highKey: {
    type: 'high-key',
    temperature: 'neutral',
    description: 'Éclairage lumineux et aéré',
    promptModifier: 'high-key lighting, bright and airy, minimal shadows'
  },
  lowKey: {
    type: 'low-key',
    temperature: 'cool',
    description: 'Éclairage sombre et mystérieux',
    promptModifier: 'low-key lighting, moody atmosphere, selective illumination'
  },
  softDiffused: {
    type: 'soft',
    temperature: 'warm',
    description: 'Lumière douce et diffuse',
    promptModifier: 'soft diffused lighting, beauty dish effect, flattering light'
  }
};

// ============================================================================
// PALETTES DE COULEURS DE BASE
// ============================================================================

export const COLOR_PALETTES: Record<string, ColorPalette> = {
  minimalistMonochrome: {
    name: 'Minimaliste Monochrome',
    colors: ['#FFFFFF', '#F5F5F5', '#E0E0E0', '#000000'],
    mood: 'Élégant, épuré, sophistiqué',
    promptModifier: 'monochromatic color scheme, elegant black and white, sophisticated tones'
  },
  warmNatural: {
    name: 'Naturel Chaleureux',
    colors: ['#D4C6A8', '#F9F3E5', '#8A7968', '#4A4039'],
    mood: 'Authentique, chaleureux, terreux',
    promptModifier: 'warm earthy tones, natural color palette, organic feel'
  },
  coolProfessional: {
    name: 'Professionnel Froid',
    colors: ['#0A2463', '#3E92CC', '#FFFFFF', '#D8E1E9'],
    mood: 'Professionnel, confiance, corporate',
    promptModifier: 'professional blue tones, corporate color scheme, trustworthy palette'
  },
  vibrantBold: {
    name: 'Vibrant Audacieux',
    colors: ['#FF0066', '#00FFFF', '#FFFF00', '#000000'],
    mood: 'Énergique, audacieux, moderne',
    promptModifier: 'vibrant bold colors, high contrast palette, attention-grabbing hues'
  },
  luxuryGold: {
    name: 'Luxe Doré',
    colors: ['#1A1A1A', '#D4AF37', '#FFFFFF', '#2C2C2C'],
    mood: 'Luxueux, premium, exclusif',
    promptModifier: 'luxury gold accents, premium black and gold, exclusive feel'
  },
  freshGreen: {
    name: 'Frais Naturel',
    colors: ['#2D5A27', '#8BC34A', '#FFFFFF', '#F5F5F5'],
    mood: 'Frais, naturel, écologique',
    promptModifier: 'fresh green tones, natural eco-friendly palette, organic colors'
  },
  softPastel: {
    name: 'Pastel Doux',
    colors: ['#F5E6E0', '#D4A5A5', '#E8D5B7', '#B8C4BB'],
    mood: 'Doux, féminin, délicat',
    promptModifier: 'soft pastel colors, delicate feminine tones, gentle palette'
  },
  techModern: {
    name: 'Tech Moderne',
    colors: ['#0D1117', '#58A6FF', '#F0F6FC', '#8B949E'],
    mood: 'Moderne, technologique, innovant',
    promptModifier: 'modern tech colors, digital aesthetic, futuristic palette'
  }
};

// ============================================================================
// STYLES ARTISTIQUES COMPLETS
// ============================================================================

export const BASE_ARTISTIC_STYLES: Record<string, ArtisticStyle> = {
  minimalist: {
    id: 'minimalist',
    name: 'Minimaliste Premium',
    description: 'Style épuré inspiré des campagnes Apple - élégance par la simplicité',
    composition: COMPOSITIONS.minimalist,
    lighting: LIGHTINGS.studioProfessional,
    colorPalette: COLOR_PALETTES.minimalistMonochrome,
    photographerReference: ['Hiroshi Sugimoto', 'Peter Lindbergh', 'Apple Creative Team'],
    promptModifiers: [
      'award-winning minimalist photography',
      'clean studio perfection',
      'elegant simplicity',
      'premium product presentation',
      'iconic advertising aesthetic',
      'Cannes Lions quality'
    ]
  },

  emotional: {
    id: 'emotional',
    name: 'Émotionnel Narratif',
    description: 'Style émotionnel inspiré des campagnes Nike - storytelling puissant',
    composition: COMPOSITIONS.ruleOfThirds,
    lighting: LIGHTINGS.dramatic,
    colorPalette: COLOR_PALETTES.warmNatural,
    photographerReference: ['Annie Leibovitz', 'Steve McCurry', 'Nike Creative'],
    promptModifiers: [
      'award-winning emotional photography',
      'powerful storytelling',
      'dramatic cinematic lighting',
      'inspirational moment capture',
      'emotional connection',
      'Cannes Lions quality'
    ]
  },

  authentic: {
    id: 'authentic',
    name: 'Lifestyle Authentique',
    description: 'Style authentique inspiré des campagnes Airbnb - moments vrais',
    composition: COMPOSITIONS.framing,
    lighting: LIGHTINGS.naturalSoft,
    colorPalette: COLOR_PALETTES.warmNatural,
    photographerReference: ['Martin Parr', 'Nan Goldin', 'Airbnb Creative'],
    promptModifiers: [
      'award-winning authentic photography',
      'genuine moment capture',
      'natural lifestyle aesthetic',
      'real-life storytelling',
      'aspirational yet authentic',
      'Cannes Lions quality'
    ]
  },

  bold: {
    id: 'bold',
    name: 'Disruptif Audacieux',
    description: 'Style audacieux inspiré des campagnes Diesel/Benetton - provocation créative',
    composition: COMPOSITIONS.symmetry,
    lighting: LIGHTINGS.dramatic,
    colorPalette: COLOR_PALETTES.vibrantBold,
    photographerReference: ['David LaChapelle', 'Oliviero Toscani', 'Terry Richardson'],
    promptModifiers: [
      'award-winning bold photography',
      'provocative visual concept',
      'disruptive advertising aesthetic',
      'attention-grabbing composition',
      'unexpected visual twist',
      'Cannes Lions quality'
    ]
  },

  corporate: {
    id: 'corporate',
    name: 'Corporate Confiance',
    description: 'Style corporate inspiré des campagnes IBM/Goldman Sachs - professionnalisme',
    composition: COMPOSITIONS.goldenRatio,
    lighting: LIGHTINGS.studioProfessional,
    colorPalette: COLOR_PALETTES.coolProfessional,
    photographerReference: ['Platon', 'Corporate Photography Masters'],
    promptModifiers: [
      'award-winning corporate photography',
      'professional business aesthetic',
      'trustworthy visual language',
      'executive quality visuals',
      'strategic visual communication',
      'Cannes Lions quality'
    ]
  },

  editorial: {
    id: 'editorial',
    name: 'Éditorial Magazine',
    description: 'Style éditorial inspiré de Vogue/Harper\'s Bazaar - haute couture visuelle',
    composition: COMPOSITIONS.leadingLines,
    lighting: LIGHTINGS.dramatic,
    colorPalette: COLOR_PALETTES.luxuryGold,
    photographerReference: ['Mario Testino', 'Patrick Demarchelier', 'Steven Meisel'],
    promptModifiers: [
      'award-winning editorial photography',
      'high fashion aesthetic',
      'magazine cover quality',
      'artistic composition',
      'dramatic fashion lighting',
      'Cannes Lions quality'
    ]
  },

  lifestyle: {
    id: 'lifestyle',
    name: 'Lifestyle Moderne',
    description: 'Style lifestyle moderne - vie quotidienne aspirationnelle',
    composition: COMPOSITIONS.ruleOfThirds,
    lighting: LIGHTINGS.goldenHour,
    colorPalette: COLOR_PALETTES.warmNatural,
    photographerReference: ['Brandon Woelfel', 'Murad Osmann', 'Lifestyle Photographers'],
    promptModifiers: [
      'award-winning lifestyle photography',
      'modern aspirational aesthetic',
      'authentic daily life',
      'warm inviting atmosphere',
      'relatable yet premium',
      'Cannes Lions quality'
    ]
  }
};

// ============================================================================
// FONCTIONS UTILITAIRES
// ============================================================================

export function getArtisticStyle(styleId: string): ArtisticStyle {
  return BASE_ARTISTIC_STYLES[styleId] || BASE_ARTISTIC_STYLES.lifestyle;
}

export function getAllStyles(): ArtisticStyle[] {
  return Object.values(BASE_ARTISTIC_STYLES);
}

export function getStylesByMood(mood: 'professional' | 'emotional' | 'authentic' | 'bold'): ArtisticStyle[] {
  const moodMapping: Record<string, string[]> = {
    professional: ['minimalist', 'corporate', 'editorial'],
    emotional: ['emotional', 'lifestyle'],
    authentic: ['authentic', 'lifestyle'],
    bold: ['bold', 'editorial']
  };
  
  return moodMapping[mood].map(id => BASE_ARTISTIC_STYLES[id]);
}
