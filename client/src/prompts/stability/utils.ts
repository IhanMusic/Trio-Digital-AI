import { BriefData } from '../../types/brief';

export type SectorType = 
  | 'FMCG (Fast-Moving Consumer Goods)' 
  | 'Banque et Finance' 
  | 'Hôtellerie, Restauration et Loisirs' 
  | 'Technologie et Innovation'
  | 'Biens de consommation'
  | 'Automobile'
  | 'Industrie Manufacturière';

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface PromptValidation {
  isValid: boolean;
  errors: string[];
}

export interface StabilityParams {
  cfgScale: number;
  steps: number;
  samples: number;  // Rendu obligatoire
  clipGuidancePreset?: string;
  sampler?: string;
}

const QUALITY_MODIFIERS = [
  'masterpiece',
  'best quality',
  'highly detailed',
  'sharp focus',
  'professional photography',
  '8k uhd',
  'award winning',
  'stunning',
  'perfect composition',
  'cinematic lighting'
];

const ADVERTISING_QUALITY_MODIFIERS = [
  'award-winning advertising photography',
  'cannes lions quality',
  'professional advertising campaign',
  'premium brand imagery',
  'high-end commercial photography',
  'advertising industry standard',
  'professional marketing visual',
  'strategic brand communication',
  'visual storytelling excellence',
  'advertising creative direction'
];

const TECHNICAL_MODIFIERS = [
  'raw photo',
  'high resolution',
  'detailed',
  'sharp',
  'professional',
  'commercial photography',
  'advertising quality'
];

const ADVERTISING_COMPOSITION_TECHNIQUES = [
  'rule of thirds composition',
  'golden ratio layout',
  'leading lines technique',
  'visual hierarchy design',
  'focal point emphasis',
  'negative space utilization',
  'color psychology application',
  'visual weight balance',
  'depth layering technique',
  'framing device implementation'
];

const ADVERTISING_LIGHTING_TECHNIQUES = [
  'dramatic product lighting',
  'rim lighting technique',
  'soft diffused key light',
  'professional 3-point lighting',
  'atmospheric lighting mood',
  'volumetric light effect',
  'high-key advertising lighting',
  'low-key dramatic lighting',
  'golden hour warm lighting',
  'studio lighting perfection'
];

export const validatePrompt = (prompt: string, briefData: BriefData): PromptValidation => {
  const errors: string[] = [];

  // Vérification de la longueur
  if (prompt.length < 10) {
    errors.push('Prompt trop court');
  }

  // Vérification des mots-clés essentiels
  const essentialKeywords = ['quality', 'professional', 'detailed'];
  essentialKeywords.forEach(keyword => {
    if (!prompt.toLowerCase().includes(keyword)) {
      errors.push(`Le prompt devrait inclure le mot-clé "${keyword}"`);
    }
  });

  // Vérification des éléments spécifiques au secteur
  if (briefData.sector && !prompt.toLowerCase().includes(briefData.sector.toLowerCase())) {
    errors.push('Le prompt devrait inclure des éléments spécifiques au secteur');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const optimizePromptForStability = (prompt: string, isAdvertising: boolean = false): string => {
  // Optimisations spécifiques pour SDXL
  const optimizedPrompt = prompt
    .replace(/\s+/g, ' ') // Normalise les espaces
    .replace(/^\s+|\s+$/g, '') // Trim
    .replace(/(?:^|\s)(?:a\s+|an\s+|the\s+)/g, ' ') // Supprime les articles inutiles
    .replace(/\b(?:very|really|extremely)\s+/g, '') // Supprime les intensifieurs inutiles
    .trim();

  // Sélectionner les modificateurs appropriés
  const qualityPrefix = isAdvertising 
    ? ADVERTISING_QUALITY_MODIFIERS.slice(0, 5).join(', ')
    : QUALITY_MODIFIERS.join(', ');
  
  // Ajouter les modificateurs techniques à la fin
  const technicalSuffix = TECHNICAL_MODIFIERS.join(', ');
  
  // Ajouter des techniques de composition publicitaire si demandé
  const compositionTechniques = isAdvertising
    ? `, ${ADVERTISING_COMPOSITION_TECHNIQUES.slice(0, 3).join(', ')}`
    : '';
    
  // Ajouter des techniques d'éclairage publicitaire si demandé
  const lightingTechniques = isAdvertising
    ? `, ${ADVERTISING_LIGHTING_TECHNIQUES.slice(0, 3).join(', ')}`
    : '';

  return `${qualityPrefix}, ${optimizedPrompt}${compositionTechniques}${lightingTechniques}, ${technicalSuffix}`;
};

export const createAdvertisingPrompt = (
  basePrompt: string,
  style: 'minimalist' | 'emotional' | 'authentic' | 'bold' | 'corporate' = 'emotional'
): string => {
  // Sélectionner les techniques de composition selon le style
  let compositionTechniques: string[] = [];
  let lightingTechniques: string[] = [];
  
  switch (style) {
    case 'minimalist':
      compositionTechniques = [
        'negative space utilization',
        'perfect symmetry',
        'minimalist composition',
        'visual simplicity'
      ];
      lightingTechniques = [
        'clean studio lighting',
        'soft diffused light',
        'high-key lighting',
        'shadow minimization'
      ];
      break;
    case 'emotional':
      compositionTechniques = [
        'dramatic composition',
        'storytelling framing',
        'emotional focal point',
        'dynamic perspective'
      ];
      lightingTechniques = [
        'dramatic lighting contrast',
        'emotional light mood',
        'cinematic lighting technique',
        'atmospheric light effect'
      ];
      break;
    case 'authentic':
      compositionTechniques = [
        'natural composition',
        'authentic framing',
        'environmental context',
        'genuine moment capture'
      ];
      lightingTechniques = [
        'natural lighting',
        'golden hour warmth',
        'ambient light capture',
        'realistic light interaction'
      ];
      break;
    case 'bold':
      compositionTechniques = [
        'provocative composition',
        'unexpected framing',
        'visual tension technique',
        'disruptive perspective'
      ];
      lightingTechniques = [
        'high contrast lighting',
        'dramatic shadow play',
        'bold color lighting',
        'unconventional light source'
      ];
      break;
    case 'corporate':
      compositionTechniques = [
        'professional composition',
        'balanced corporate framing',
        'strategic visual hierarchy',
        'trustworthy perspective'
      ];
      lightingTechniques = [
        'professional 3-point lighting',
        'corporate environment lighting',
        'clean shadow definition',
        'professional studio setup'
      ];
      break;
  }
  
  // Sélectionner aléatoirement 2 techniques de chaque catégorie
  const selectedComposition = compositionTechniques.slice(0, 2).join(', ');
  const selectedLighting = lightingTechniques.slice(0, 2).join(', ');
  
  // Ajouter les techniques au prompt de base
  return `${basePrompt}, ${selectedComposition}, ${selectedLighting}, award-winning advertising photography, cannes lions quality`;
};

export const getDimensions = (
  purpose: 'social' | 'product' | 'lifestyle' | 'banner',
  platform?: string,
  hasLegalText: boolean = false
): ImageDimensions => {
  let dimensions: ImageDimensions = { width: 1024, height: 1024 }; // Default square optimisé pour SDXL

  switch (purpose) {
    case 'social':
      if (platform) {
        dimensions = getSocialDimensions(platform);
      }
      break;
    case 'product':
      dimensions = { width: 1024, height: 1024 }; // Portrait pour produits
      break;
    case 'lifestyle':
      dimensions = { width: 1024, height: 768 }; // Format 4:3 pour lifestyle
      break;
    case 'banner':
      dimensions = { width: 1024, height: 512 }; // Format 2:1 pour bannières
      break;
  }

  // Ajuster pour le texte légal si nécessaire
  if (hasLegalText) {
    dimensions.height = Math.floor(dimensions.height * 1.2);
  }

  // S'assurer que les dimensions sont valides pour SDXL
  return validateDimensions(dimensions);
};

const getSocialDimensions = (platform: string): ImageDimensions => {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return { width: 1024, height: 1024 }; // Format carré
    case 'facebook':
      return { width: 1024, height: 640 }; // Format 16:10
    case 'linkedin':
      return { width: 1024, height: 576 }; // Format 16:9
    case 'twitter':
      return { width: 1024, height: 512 }; // Format 2:1
    default:
      return { width: 1024, height: 1024 };
  }
};

const validateDimensions = (dimensions: ImageDimensions): ImageDimensions => {
  // SDXL requiert des dimensions multiples de 64
  const roundTo64 = (num: number): number => Math.round(num / 64) * 64;
  
  // Limiter les dimensions maximales pour SDXL
  const maxDim = 1024; // Maximum supporté par SDXL
  const minDim = 512;  // Minimum supporté par SDXL
  
  let width = Math.min(Math.max(roundTo64(dimensions.width), minDim), maxDim);
  let height = Math.min(Math.max(roundTo64(dimensions.height), minDim), maxDim);
  
  return { width, height };
};

export const getStabilityParams = (
  briefData: BriefData,
  purpose: string
): StabilityParams => {
  // Paramètres optimisés pour SDXL
  const baseParams: StabilityParams = {
    cfgScale: 10,    // Augmenté pour plus de fidélité
    steps: 50,       // Plus de steps pour plus de détails
    samples: 1,      // Valeur par défaut
    clipGuidancePreset: 'FAST_BLUE',
    sampler: 'DPM++ 2M Karras'
  };

  // Ajustements selon le secteur
  switch (briefData.sector as SectorType) {
    case 'FMCG (Fast-Moving Consumer Goods)':
      baseParams.cfgScale = 12;  // Produits nécessitent plus de détails
      baseParams.steps = 60;
      break;
    case 'Banque et Finance':
      baseParams.cfgScale = 11;  // Images corporate plus précises
      baseParams.steps = 55;
      break;
    case 'Hôtellerie, Restauration et Loisirs':
      baseParams.cfgScale = 9;   // Plus de créativité
      baseParams.steps = 45;
      break;
  }

  // Ajustements selon l'utilisation
  switch (purpose) {
    case 'product':
      baseParams.cfgScale += 2;
      baseParams.steps += 10;
      break;
    case 'lifestyle':
      baseParams.cfgScale -= 1;
      baseParams.steps -= 5;
      break;
    case 'social':
      baseParams.steps -= 10;
      baseParams.samples = 2;  // Générer plus d'options pour le social
      break;
  }

  return baseParams;
};

export const formatPromptForStability = (
  mainPrompt: string,
  negativePrompt?: string,
  options?: {
    isAdvertising?: boolean;
    adStyle?: 'minimalist' | 'emotional' | 'authentic' | 'bold' | 'corporate';
    useAdvancedStructure?: boolean;
  }
): { prompt: string; negative_prompt?: string } => {
  // Déterminer si on utilise les optimisations publicitaires
  const isAdvertising = options?.isAdvertising || mainPrompt.toLowerCase().includes('advertising') || mainPrompt.toLowerCase().includes('ad ');
  
  // Appliquer les optimisations publicitaires si nécessaire
  let formattedPrompt = '';
  
  if (isAdvertising && options?.adStyle) {
    // Utiliser le prompt publicitaire avancé avec style spécifique
    formattedPrompt = createAdvertisingPrompt(mainPrompt, options.adStyle);
    formattedPrompt = optimizePromptForStability(formattedPrompt, true);
  } else if (isAdvertising) {
    // Utiliser le prompt publicitaire standard
    formattedPrompt = optimizePromptForStability(mainPrompt, true);
  } else {
    // Utiliser l'optimisation standard
    formattedPrompt = optimizePromptForStability(mainPrompt);
  }
  
  // Structure avancée pour les prompts publicitaires
  if (isAdvertising && options?.useAdvancedStructure) {
    formattedPrompt = structureAdvertisingPrompt(formattedPrompt);
  }
  
  // Negative prompt optimisé pour SDXL
  const defaultNegative = [
    'blurry', 'low quality', 'low resolution', 'jpeg artifacts',
    'compression artifacts', 'amateur', 'unprofessional',
    'oversaturated', 'undersaturated', 'distorted proportions',
    'unrealistic anatomy', 'deformed', 'bad composition',
    'watermark', 'text', 'writing', 'signature', 'logo',
    'out of frame', 'cropped', 'worst quality', 'normal quality',
    'jpeg artifacts', 'signature', 'watermark', 'username',
    'blurry', 'artist name', 'trademark', 'title',
    'multiple views', 'extra digit', 'fewer digits',
    'poorly drawn face', 'out of frame', 'poorly drawn hands',
    'text', 'error', 'missing fingers', 'extra digit',
    'fewer digits', 'cropped', 'worst quality'
  ].join(', ');
  
  // Ajouter des éléments négatifs spécifiques à la publicité
  const advertisingNegative = isAdvertising ? [
    'generic stock photo',
    'cliché advertising',
    'dated advertising style',
    'poor brand representation',
    'amateur marketing',
    'ineffective visual communication',
    'confusing message',
    'visual clutter',
    'distracting elements',
    'poor advertising composition'
  ].join(', ') : '';
  
  const finalNegative = advertisingNegative 
    ? `${defaultNegative}, ${advertisingNegative}` 
    : defaultNegative;
  
  return {
    prompt: formattedPrompt,
    negative_prompt: negativePrompt 
      ? `${finalNegative}, ${negativePrompt}`
      : finalNegative
  };
};

// Structure un prompt publicitaire selon les meilleures pratiques
export const structureAdvertisingPrompt = (prompt: string): string => {
  // Extraire les éléments clés du prompt
  const elements = prompt.split(', ');
  
  // Catégoriser les éléments
  const qualityElements = elements.filter(e => 
    e.includes('quality') || 
    e.includes('award') || 
    e.includes('masterpiece')
  );
  
  const compositionElements = elements.filter(e => 
    e.includes('composition') || 
    e.includes('framing') || 
    e.includes('perspective') ||
    e.includes('rule of thirds') ||
    e.includes('golden ratio')
  );
  
  const lightingElements = elements.filter(e => 
    e.includes('lighting') || 
    e.includes('shadow') || 
    e.includes('light')
  );
  
  const styleElements = elements.filter(e => 
    e.includes('style') || 
    e.includes('mood') || 
    e.includes('atmosphere')
  );
  
  const technicalElements = elements.filter(e => 
    e.includes('resolution') || 
    e.includes('detailed') || 
    e.includes('sharp')
  );
  
  // Autres éléments
  const otherElements = elements.filter(e => 
    !qualityElements.includes(e) &&
    !compositionElements.includes(e) &&
    !lightingElements.includes(e) &&
    !styleElements.includes(e) &&
    !technicalElements.includes(e)
  );
  
  // Construire le prompt structuré
  return [
    ...qualityElements,
    ...compositionElements,
    ...otherElements,
    ...lightingElements,
    ...styleElements,
    ...technicalElements
  ].join(', ');
};

export const extractVisualElements = (briefData: BriefData): string[] => {
  const elements: string[] = [];

  // Extraire les éléments visuels des campagnes précédentes
  briefData.previousCampaigns?.forEach(campaign => {
    campaign.learnings
      .filter(learning => learning.toLowerCase().includes('visuel'))
      .forEach(learning => elements.push(learning));
  });

  // Ajouter les différenciateurs visuels
  briefData.competitiveAnalysis?.differentiators
    ?.filter(diff => diff.toLowerCase().includes('visuel'))
    .forEach(diff => elements.push(diff));

  // Ajouter les éléments spécifiques au secteur
  if (briefData.sector) {
    elements.push(`sector: ${briefData.sector}`);
  }

  return elements;
};
