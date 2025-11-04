// ============================================
// TYPES OPTIMISÉS - ARCHITECTURE 3 NIVEAUX
// ============================================

// ============================================
// NIVEAU 1: MARQUE (BriefData)
// ADN de la marque - Informations stables
// ============================================

export interface BriefData {
  // Identité de base
  companyName: string;
  sector: string;
  companyDescription: string;
  logo: File | null;
  
  // Identité visuelle
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  
  // Positionnement stratégique
  businessType?: string; // B2B, B2C, SaaS, E-commerce, Marketplace, Service, Manufacturing, etc.
  companyStage?: string; // Startup, Scale-up, PME, ETI, Grande Entreprise, Multinationale
  pricePositioning?: string; // Budget, Milieu de gamme, Premium, Luxury
  
  // Contexte concurrentiel
  competitors: string; // Liste séparée par virgules
  competitiveAnalysis?: {
    directCompetitors: {
      name: string;
      strengths: string[];
      weaknesses: string[];
      strategies: string[];
    }[];
    marketPosition: string;
    differentiators: string[];
    opportunities: string[];
  };
  
  // Historique marketing
  previousCampaigns?: {
    name: string;
    period: string;
    results: string[];
    learnings: string[];
  }[];
  
  // Contraintes légales sectorielles
  legalConstraints?: {
    regulations: string[];
    compliance: string[];
    disclaimers: string[];
  };
  
  // Valeurs et mission (optionnel)
  values?: string[];
  mission?: string;
}

// ============================================
// NIVEAU 2: PRODUIT (ProductData)
// Spécificités du produit - Variable par produit
// ============================================

export interface ProductData {
  // Informations de base
  name: string;
  description: string;
  category: string;
  brandId: string; // Référence à la marque
  
  // Images
  mainImage: File | null;
  mainImageUrl?: string;
  galleryImages: File[];
  galleryImageUrls: string[];
  
  // Caractéristiques spécifiques
  flavors: string[]; // Arômes (pour alimentaire)
  scents: string[]; // Parfums (pour cosmétique)
  
  // Proposition de valeur
  uniqueSellingPoints: string[]; // 3-5 points forts
  customerBenefits: string[]; // 3-5 bénéfices clients
  
  // Target audience SPÉCIFIQUE au produit
  targetAudience: {
    demographic: string[]; // Âge, genre
    lifestyle: string[]; // Occasions d'usage, moments de vie
    psychographic: string[]; // Valeurs, aspirations
    geographic: string[]; // Zones géographiques
  };
  
  // Occasions d'usage
  usageOccasions: string[]; // Ex: "Petit-déjeuner", "Après sport", "Soin du soir"
  
  // SEO & Keywords
  keywords: string[]; // 3-5 mots-clés principaux
  
  // Fiche technique
  technicalSheet: {
    ingredients: string[];
    nutritionalInfo?: string;
    usage?: string;
    storage?: string;
    highlights?: string;
  };
  
  // Certifications & Labels
  certifications: string[];
  labels: string[];
}

// ============================================
// NIVEAU 3: CALENDRIER (CalendarData)
// Configuration tactique par campagne
// ============================================

export interface CalendarData {
  // Informations de base
  name: string;
  brandId: string;
  startDate: string;
  endDate: string;
  
  // Localisation
  country: string;
  languages: string[]; // Plusieurs langues possibles
  
  // Sélection tactique
  selectedProducts: string[]; // IDs des produits à mettre en avant
  socialNetworks: string[]; // Réseaux pour cette campagne
  
  // Ton de communication pour cette campagne
  communicationStyle: string; // Peut varier par campagne
  
  // Objectif de la campagne
  campaignObjective?: 'awareness' | 'consideration' | 'conversion' | 'loyalty' | 'launch';
  
  // Fréquence de publication
  frequency: 'daily' | 'twice_daily' | 'three_per_week' | 'weekly';
  
  // Mix de contenu (simplifié)
  contentMix: {
    imagePercentage: number; // 0-100
    videoPercentage: number; // 0-100 (total doit = 100)
  };
  
  // Heures de publication préférées par réseau
  preferredTimes: {
    facebook?: string[];
    instagram?: string[];
    twitter?: string[];
    linkedin?: string[];
    tiktok?: string[];
  };
  
  // Configuration créative
  creativeSettings: {
    themes: string[]; // 3-5 thématiques prioritaires
    visualStyles: string[]; // Styles visuels préférés
    integrateProductImages: boolean; // Auto-intégrer photos produit
  };
  
  // Dates clés spécifiques (optionnel)
  customKeyDates?: {
    name: string;
    date: string;
    description: string;
  }[];
  
  // CTA préféré (optionnel)
  preferredCTA?: string;
}

// ============================================
// TYPES EXISTANTS (conservés pour compatibilité)
// ============================================

export interface AIError {
  code: string;
  message: string;
  service?: string;
}

export interface Theme {
  name: string;
  objective: string;
  approach: string;
  emotions: string;
  formats: string[];
  networks: string[];
}

export interface SocialMediaPost {
  platform: string;
  content: string;
  callToAction: string;
  hashtags: string[];
}

export interface ContentVariations {
  short: string;
  detailed: string;
  narrative: string;
}

export interface Engagement {
  questions: string[];
  polls: string[];
  responses: string[];
}

export interface Image {
  url: string;
  alt: string;
  type: string;
  ratio: string;
  quality?: 'low' | 'medium' | 'high';
}

export interface VisualVariations {
  withText: string;
  withoutText: string;
  abTesting: string[];
}

export interface Strategy {
  content: string;
  analysis: {
    positioning: string;
    strengths: string[];
    opportunities: string[];
  };
  themes: Theme[];
  calendar: Record<string, any>;
  recommendations: {
    visualStyle: string;
    toneOfVoice: Record<string, string>;
    hashtags: string[];
    engagement: string[];
  };
}

export interface CreativeBrief {
  visualPrompt?: string;
  content: {
    main: string;
    tagline: string;
    hashtags: string[];
    cta: string;
    question: string;
  };
  specs: {
    format: string;
    dimensions: string;
    altText: string;
  };
}

export interface ExecutedBrief extends CreativeBrief {
  image: {
    url: string;
    alt: string;
    type: string;
    ratio: string;
    quality?: 'low' | 'medium' | 'high';
  };
}

export interface VisualAnalysis {
  identity: {
    colors: string[];
    typography: string[];
    iconography: string[];
  };
  composition: {
    layouts: string[];
    grids: string[];
    hierarchy: string[];
  };
  recommendations: {
    palette: string[];
    fonts: string[];
    elements: string[];
    filters: string[];
  };
}

export interface AIServiceResponse {
  briefId: string;
  strategy: Strategy;
  briefs?: {
    briefs: CreativeBrief[];
  };
  visualAnalysis?: VisualAnalysis;
  executedBriefs?: ExecutedBrief[];
  createdAt?: string;
  updatedAt?: string;
}
