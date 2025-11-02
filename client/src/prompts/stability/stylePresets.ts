export type PresetType = 
  | 'premium'
  | 'lifestyle'
  | 'corporate'
  | 'editorial'
  | 'product'
  | 'social'
  | 'documentary'
  | 'ad_minimalist'
  | 'ad_emotional'
  | 'ad_authentic'
  | 'ad_bold'
  | 'ad_corporate';

export interface StylePreset {
  name: string;
  description: string;
  promptModifiers: string[];
  params: {
    cfgScale: number;
    steps: number;
    samples?: number;
    clipGuidancePreset?: string;
    sampler?: string;
  };
  requirements?: {
    minWidth?: number;
    minHeight?: number;
    aspectRatio?: number;
  };
}

const PRESET_REQUIREMENTS = {
  premium: {
    minWidth: 1024,
    minHeight: 1024
  },
  product: {
    minWidth: 768,
    minHeight: 768
  }
};

const ADVERTISING_PRESET_REQUIREMENTS = {
  ad_minimalist: {
    minWidth: 1024,
    minHeight: 1024
  },
  ad_emotional: {
    minWidth: 1024,
    minHeight: 1024
  },
  ad_authentic: {
    minWidth: 1024,
    minHeight: 1024
  },
  ad_bold: {
    minWidth: 1024,
    minHeight: 1024
  },
  ad_corporate: {
    minWidth: 1024,
    minHeight: 1024
  }
};

export const STYLE_PRESETS: Record<PresetType, StylePreset> = {
  premium: {
    name: 'Premium',
    description: 'Style haut de gamme et luxueux',
    promptModifiers: [
      'luxury photography',
      'high-end commercial',
      'premium quality',
      'professional lighting',
      'studio quality',
      'cinematic atmosphere',
      'elegant composition',
      'sophisticated mood',
      'pristine quality',
      'flawless execution'
    ],
    params: {
      cfgScale: 12,
      steps: 60,
      samples: 1,
      clipGuidancePreset: 'FAST_BLUE',
      sampler: 'DPM++ 2M Karras'
    },
    requirements: PRESET_REQUIREMENTS.premium
  },
  lifestyle: {
    name: 'Lifestyle',
    description: 'Style naturel et authentique',
    promptModifiers: [
      'lifestyle photography',
      'candid moment',
      'natural lighting',
      'authentic atmosphere',
      'real life scene',
      'genuine emotion',
      'spontaneous capture',
      'environmental context',
      'natural composition',
      'organic feel'
    ],
    params: {
      cfgScale: 9,
      steps: 45,
      samples: 2,
      clipGuidancePreset: 'FAST_BLUE',
      sampler: 'DPM++ SDE Karras'
    }
  },
  corporate: {
    name: 'Corporate',
    description: 'Style professionnel et business',
    promptModifiers: [
      'corporate photography',
      'professional environment',
      'business setting',
      'executive style',
      'corporate atmosphere',
      'professional lighting',
      'clean composition',
      'formal setting',
      'business context',
      'professional mood'
    ],
    params: {
      cfgScale: 10,
      steps: 50,
      samples: 1,
      clipGuidancePreset: 'FAST_BLUE',
      sampler: 'DPM++ 2M Karras'
    }
  },
  editorial: {
    name: 'Editorial',
    description: 'Style magazine et éditorial',
    promptModifiers: [
      'editorial photography',
      'magazine style',
      'fashion lighting',
      'artistic composition',
      'editorial mood',
      'dramatic atmosphere',
      'high fashion',
      'creative lighting',
      'bold composition',
      'artistic direction'
    ],
    params: {
      cfgScale: 11,
      steps: 55,
      samples: 1,
      clipGuidancePreset: 'FAST_BLUE',
      sampler: 'DPM++ SDE Karras'
    }
  },
  product: {
    name: 'Product',
    description: 'Style produit commercial',
    promptModifiers: [
      'product photography',
      'commercial quality',
      'studio lighting',
      'professional product shot',
      'clean background',
      'perfect exposure',
      'sharp details',
      'commercial setting',
      'professional staging',
      'perfect product placement'
    ],
    params: {
      cfgScale: 12,
      steps: 60,
      samples: 1,
      clipGuidancePreset: 'FAST_BLUE',
      sampler: 'DPM++ 2M Karras'
    },
    requirements: PRESET_REQUIREMENTS.product
  },
  social: {
    name: 'Social',
    description: 'Style réseaux sociaux',
    promptModifiers: [
      'social media style',
      'engaging composition',
      'eye-catching design',
      'vibrant mood',
      'trendy look',
      'modern aesthetic',
      'social appeal',
      'contemporary style',
      'dynamic composition',
      'scroll-stopping visual'
    ],
    params: {
      cfgScale: 9,
      steps: 45,
      samples: 2,
      clipGuidancePreset: 'FAST_BLUE',
      sampler: 'DPM++ SDE Karras'
    }
  },
  documentary: {
    name: 'Documentary',
    description: 'Style documentaire et reportage',
    promptModifiers: [
      'documentary style',
      'photojournalistic approach',
      'natural lighting',
      'authentic moment',
      'real environment',
      'storytelling composition',
      'genuine atmosphere',
      'truthful capture',
      'unposed scene',
      'realistic mood'
    ],
    params: {
      cfgScale: 8,
      steps: 40,
      samples: 1,
      clipGuidancePreset: 'FAST_BLUE',
      sampler: 'DPM++ SDE Karras'
    }
  },
  
  // Nouveaux presets inspirés des grands publicitaires
  ad_minimalist: {
    name: 'Minimaliste Premium',
    description: 'Style minimaliste épuré inspiré des campagnes Apple',
    promptModifiers: [
      'award-winning advertising photography',
      'minimalist composition',
      'clean white background',
      'perfect product hero shot',
      'elegant simplicity',
      'premium advertising aesthetic',
      'perfect symmetry',
      'studio perfection',
      'iconic product presentation',
      'dramatic product lighting',
      'advertising campaign quality',
      'cannes lions award style'
    ],
    params: {
      cfgScale: 12,
      steps: 65,
      samples: 1,
      clipGuidancePreset: 'FAST_BLUE',
      sampler: 'DPM++ 2M Karras'
    },
    requirements: ADVERTISING_PRESET_REQUIREMENTS.ad_minimalist
  },
  
  ad_emotional: {
    name: 'Émotionnel Narratif',
    description: 'Style émotionnel inspiré des campagnes Nike',
    promptModifiers: [
      'award-winning emotional advertising',
      'powerful storytelling image',
      'dramatic cinematic lighting',
      'emotional impact photography',
      'inspirational advertising moment',
      'dynamic composition',
      'motivational visual narrative',
      'advertising campaign quality',
      'emotional connection',
      'dramatic contrast',
      'powerful visual storytelling',
      'cannes lions award style'
    ],
    params: {
      cfgScale: 11,
      steps: 60,
      samples: 1,
      clipGuidancePreset: 'FAST_BLUE',
      sampler: 'DPM++ SDE Karras'
    },
    requirements: ADVERTISING_PRESET_REQUIREMENTS.ad_emotional
  },
  
  ad_authentic: {
    name: 'Lifestyle Authentique',
    description: 'Style authentique inspiré des campagnes Airbnb',
    promptModifiers: [
      'award-winning lifestyle advertising',
      'authentic moment capture',
      'genuine human connection',
      'natural lifestyle photography',
      'warm emotional storytelling',
      'real-life advertising aesthetic',
      'aspirational yet authentic',
      'perfect imperfection',
      'candid advertising moment',
      'natural lighting mastery',
      'advertising campaign quality',
      'cannes lions award style'
    ],
    params: {
      cfgScale: 9,
      steps: 55,
      samples: 1,
      clipGuidancePreset: 'FAST_BLUE',
      sampler: 'DPM++ SDE Karras'
    },
    requirements: ADVERTISING_PRESET_REQUIREMENTS.ad_authentic
  },
  
  ad_bold: {
    name: 'Disruptif Audacieux',
    description: 'Style audacieux inspiré des campagnes Diesel et Benetton',
    promptModifiers: [
      'award-winning bold advertising',
      'provocative visual concept',
      'disruptive advertising aesthetic',
      'high-contrast dramatic lighting',
      'unexpected visual twist',
      'attention-grabbing composition',
      'bold color psychology',
      'conceptual advertising photography',
      'visual metaphor mastery',
      'thought-provoking imagery',
      'advertising campaign quality',
      'cannes lions award style'
    ],
    params: {
      cfgScale: 10,
      steps: 55,
      samples: 1,
      clipGuidancePreset: 'FAST_BLUE',
      sampler: 'DPM++ SDE Karras'
    },
    requirements: ADVERTISING_PRESET_REQUIREMENTS.ad_bold
  },
  
  ad_corporate: {
    name: 'Corporate Confiance',
    description: 'Style corporate inspiré des campagnes IBM et Goldman Sachs',
    promptModifiers: [
      'award-winning corporate advertising',
      'professional business aesthetic',
      'trustworthy visual language',
      'corporate excellence imagery',
      'sophisticated business photography',
      'premium corporate identity',
      'executive quality visuals',
      'strategic visual communication',
      'corporate leadership imagery',
      'professional advertising standards',
      'advertising campaign quality',
      'cannes lions award style'
    ],
    params: {
      cfgScale: 11,
      steps: 60,
      samples: 1,
      clipGuidancePreset: 'FAST_BLUE',
      sampler: 'DPM++ 2M Karras'
    },
    requirements: ADVERTISING_PRESET_REQUIREMENTS.ad_corporate
  }
};

export const getStylePreset = (
  presetType: PresetType,
  overrideParams?: Partial<StylePreset['params']>
): StylePreset => {
  const preset = STYLE_PRESETS[presetType];
  
  if (!preset) {
    throw new Error(`Style preset "${presetType}" not found`);
  }

  if (overrideParams) {
    return {
      ...preset,
      params: {
        ...preset.params,
        ...overrideParams
      }
    };
  }

  return preset;
};

export const validatePresetRequirements = (
  presetType: PresetType,
  width: number,
  height: number
): boolean => {
  const preset = STYLE_PRESETS[presetType];
  
  if (!preset || !preset.requirements) {
    return true;
  }

  const { requirements } = preset;

  if (requirements.minWidth && width < requirements.minWidth) {
    return false;
  }

  if (requirements.minHeight && height < requirements.minHeight) {
    return false;
  }

  if (requirements.aspectRatio) {
    const currentRatio = width / height;
    const tolerance = 0.1; // 10% de tolérance
    return Math.abs(currentRatio - requirements.aspectRatio) <= tolerance;
  }

  return true;
};

export const getSuggestedPreset = (
  purpose: string,
  sector: string,
  style: string
): PresetType => {
  // Styles publicitaires prioritaires
  const styleL = style.toLowerCase();
  
  // Détection des styles publicitaires spécifiques
  if (styleL.includes('minimaliste') || styleL.includes('épuré') || styleL.includes('simple')) {
    return 'ad_minimalist';
  }
  
  if (styleL.includes('émotion') || styleL.includes('inspirant') || styleL.includes('motivant')) {
    return 'ad_emotional';
  }
  
  if (styleL.includes('authentique') || styleL.includes('naturel') || styleL.includes('réel')) {
    return 'ad_authentic';
  }
  
  if (styleL.includes('audacieux') || styleL.includes('provocant') || styleL.includes('disruptif')) {
    return 'ad_bold';
  }
  
  // Style premium prioritaire
  if (styleL.includes('premium') || styleL.includes('luxe')) {
    return 'premium';
  }

  // Selon le secteur
  if (sector.toLowerCase().includes('banque') || 
      sector.toLowerCase().includes('finance') || 
      sector.toLowerCase().includes('assurance') ||
      sector.toLowerCase().includes('conseil')) {
    return 'ad_corporate';
  }
  
  // Selon le but
  switch (purpose.toLowerCase()) {
    case 'product':
      return 'ad_minimalist';
    case 'lifestyle':
      return 'ad_authentic';
    case 'social':
      return 'ad_emotional';
  }

  // Par défaut
  return 'ad_emotional';
};
