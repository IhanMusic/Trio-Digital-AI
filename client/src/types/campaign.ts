// Types pour les campagnes marketing

export interface IInfluencerProfile {
  id: string;
  tier: 'micro' | 'mid' | 'macro';
  
  metrics: {
    followersRange: string;
    engagementRate: number;
    avgLikes: string;
    avgComments: string;
    avgViews: string;
  };
  
  audienceProfile: {
    ageGroups: Record<string, number>;
    genderSplit: Record<string, number>;
    topLocations: string[];
    interests: string[];
  };
  
  niche: string[];
  contentStyle: string[];
  platforms: string[];
  
  estimatedCost: {
    postPrice: string;
    storyPrice: string;
    reelPrice: string;
  };
  
  brandFit: {
    score: number;
    reasons: string[];
    risks: string[];
  };
}

export interface ICampaign {
  _id: string;
  
  // Informations de base
  name: string;
  description: string;
  brandId: {
    _id: string;
    name: string;
    sector: string;
    logo?: string;
    colors: string[];
  };
  selectedProducts: Array<{
    _id: string;
    name: string;
    category: string;
    description: string;
  }>;
  
  // Type et objectifs de campagne
  campaignType: 'product-launch' | 'brand-awareness' | 'seasonal' | 'promotional' | 'retention' | 'rebranding';
  primaryObjective: 'awareness' | 'consideration' | 'conversion' | 'loyalty' | 'engagement';
  
  // Période et budget
  startDate: string;
  endDate: string;
  budget?: {
    total: number;
    organic: number;
    ads: number;
    influencers: number;
    expectedROI: {
      organic: number;
      ads: number;
      influencers: number;
    };
  };
  
  // Contexte concurrentiel spécifique à la campagne
  competitiveContext: {
    targetedCompetitors: string[];
    competitiveDifferentiation: string[];
    competitiveOpportunities: string[];
    avoidanceStrategy: string[];
  };
  
  // Learnings des campagnes précédentes
  historicalInsights: {
    successFactors: string[];
    failurePoints: string[];
    audiencePreferences: string[];
    contentPerformance: {
      bestPerformingTypes: string[];
      worstPerformingTypes: string[];
    };
  };
  
  // Contraintes légales et conformité
  legalFramework: {
    applicableRegulations: string[];
    complianceRequirements: string[];
    mandatoryDisclaimers: string[];
    restrictedClaims: string[];
    approvalRequired: boolean;
  };
  
  // Audience et ciblage enrichi
  targetAudience: {
    primary: string[];
    secondary: string[];
    demographics: string[];
    interests: string[];
    behaviors: string[];
    psychographics: string[];
    painPoints: string[];
    motivations: string[];
    preferredChannels: string[];
  };
  
  // Stratégie créative avancée
  creativeStrategy: {
    mainMessage: string;
    toneOfVoice: string;
    visualStyle: string[];
    contentPillars: string[];
    keyMessages: string[];
    emotionalTriggers: string[];
    storytellingApproach: string;
    brandArchetype: string;
    visualMoodboard: string[];
  };
  
  // Stratégie de différenciation
  differentiationStrategy: {
    uniqueValueProposition: string;
    competitiveAdvantages: string[];
    marketPositioning: string;
    brandPersonality: string[];
  };
  
  // STRATÉGIE PUBLICITAIRE COMPLÈTE
  advertisingStrategy: {
    metaAds: {
      budget: {
        total: number;
        daily: number;
        allocation: {
          awareness: number;
          traffic: number;
          conversions: number;
          retargeting: number;
        };
      };
      targeting: {
        demographics: {
          ageRange: string;
          gender: string[];
          locations: string[];
        };
        interests: string[];
        behaviors: string[];
        customAudiences: string[];
        lookalikeSources: string[];
      };
      adFormats: {
        feedAds: boolean;
        storyAds: boolean;
        reelsAds: boolean;
        carouselAds: boolean;
        videoAds: boolean;
      };
      biddingStrategy: 'lowest_cost' | 'cost_cap' | 'bid_cap' | 'target_cost';
      optimizationGoal: 'reach' | 'impressions' | 'clicks' | 'conversions' | 'video_views';
    };
    
    googleAds?: {
      budget: number;
      keywords: string[];
      adTypes: string[];
      targetingOptions: string[];
    };
    
    otherPlatforms?: {
      tiktokAds?: any;
      linkedinAds?: any;
      snapchatAds?: any;
    };
  };
  
  // STRATÉGIE MARKETING D'INFLUENCE
  influencerStrategy: {
    budget: {
      total: number;
      allocation: {
        microInfluencers: number;
        midTierInfluencers: number;
        macroInfluencers: number;
      };
    };
    
    recommendedProfiles: {
      microInfluencers: IInfluencerProfile[];
      midTierInfluencers: IInfluencerProfile[];
      macroInfluencers: IInfluencerProfile[];
    };
    
    contentRequirements: {
      postTypes: string[];
      contentGuidelines: string[];
      mandatoryHashtags: string[];
      brandMentions: string[];
      deliverables: string[];
    };
    
    timeline: {
      recruitmentPhase: { start: string; end: string; };
      contentCreation: { start: string; end: string; };
      publicationPhase: { start: string; end: string; };
    };
  };
  
  // Package campagne complet
  campaignPackage: {
    organicContent: {
      posts: number;
      stories: number;
      reels: number;
      carousels: number;
    };
    paidContent: {
      adCreatives: number;
      adCopies: number;
      landingPages: number;
    };
    influencerContent: {
      briefingDocuments: string[];
      contentTemplates: string[];
      approvalProcess: string[];
    };
  };
  
  // Calendriers associés
  calendars: string[];
  
  // Métriques et KPIs
  kpis: {
    primary: string[];
    secondary: string[];
    targets: Record<string, number>;
    benchmarks: Record<string, number>;
  };
  
  // Gestion des risques
  riskManagement: {
    identifiedRisks: string[];
    mitigationStrategies: string[];
    contingencyPlans: string[];
  };
  
  status: 'draft' | 'active' | 'paused' | 'completed' | 'archived';
  
  // Métadonnées
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Types pour les formulaires
export interface CampaignFormData {
  name: string;
  description: string;
  brandId: string;
  selectedProducts: string[];
  campaignType: string;
  primaryObjective: string;
  startDate: string;
  endDate: string;
  budget?: {
    total: number;
    allocation: {
      organic: number;
      ads: number;
      influencers: number;
    };
  };
  targetAudience: {
    primary: string[];
    secondary: string[];
    demographics: string[];
    interests: string[];
    behaviors: string[];
  };
}

// Types pour les réponses API
export interface CampaignResponse {
  success: boolean;
  data: ICampaign;
  message?: string;
}

export interface CampaignsListResponse {
  success: boolean;
  data: ICampaign[];
  count: number;
  message?: string;
}

// Types pour les constantes
export interface CampaignType {
  value: string;
  label: string;
  description: string;
  icon?: string;
}

export interface PrimaryObjective {
  value: string;
  label: string;
  description: string;
  icon?: string;
}

// Constantes
export const CAMPAIGN_TYPES: CampaignType[] = [
  { 
    value: 'product-launch', 
    label: 'Lancement de produit', 
    description: 'Introduire un nouveau produit sur le marché',
    icon: '🚀'
  },
  { 
    value: 'brand-awareness', 
    label: 'Notoriété de marque', 
    description: 'Augmenter la visibilité et reconnaissance de la marque',
    icon: '📢'
  },
  { 
    value: 'seasonal', 
    label: 'Campagne saisonnière', 
    description: 'Capitaliser sur les moments culturels et saisonniers',
    icon: '🎄'
  },
  { 
    value: 'promotional', 
    label: 'Promotion commerciale', 
    description: 'Stimuler les ventes avec des offres spéciales',
    icon: '💰'
  },
  { 
    value: 'retention', 
    label: 'Fidélisation client', 
    description: 'Renforcer la relation avec les clients existants',
    icon: '❤️'
  },
  { 
    value: 'rebranding', 
    label: 'Rebranding', 
    description: 'Accompagner un changement d\'identité de marque',
    icon: '🔄'
  }
];

export const PRIMARY_OBJECTIVES: PrimaryObjective[] = [
  { 
    value: 'awareness', 
    label: 'Notoriété', 
    description: 'Faire connaître la marque/produit',
    icon: '👁️'
  },
  { 
    value: 'consideration', 
    label: 'Considération', 
    description: 'Inciter à considérer l\'achat',
    icon: '🤔'
  },
  { 
    value: 'conversion', 
    label: 'Conversion', 
    description: 'Générer des ventes directes',
    icon: '💳'
  },
  { 
    value: 'loyalty', 
    label: 'Fidélité', 
    description: 'Renforcer la fidélité client',
    icon: '🏆'
  },
  { 
    value: 'engagement', 
    label: 'Engagement', 
    description: 'Créer de l\'interaction et de l\'engagement',
    icon: '💬'
  }
];

// Utilitaires
export const getCampaignTypeLabel = (value: string): string => {
  const type = CAMPAIGN_TYPES.find(t => t.value === value);
  return type ? type.label : value;
};

export const getPrimaryObjectiveLabel = (value: string): string => {
  const objective = PRIMARY_OBJECTIVES.find(o => o.value === value);
  return objective ? objective.label : value;
};

export const getCampaignStatusColor = (status: string): string => {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800';
    case 'active': return 'bg-green-100 text-green-800';
    case 'paused': return 'bg-yellow-100 text-yellow-800';
    case 'completed': return 'bg-blue-100 text-blue-800';
    case 'archived': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getCampaignStatusLabel = (status: string): string => {
  switch (status) {
    case 'draft': return 'Brouillon';
    case 'active': return 'Active';
    case 'paused': return 'En pause';
    case 'completed': return 'Terminée';
    case 'archived': return 'Archivée';
    default: return status;
  }
};
