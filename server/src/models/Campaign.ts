import mongoose, { Schema, Document } from 'mongoose';
import { IBrand } from './Brand';
import { IProduct } from './Product';
import { IUser } from './User';

// Interface pour les profils d'influenceurs anonymisés
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

// Interface principale pour les campagnes
export interface ICampaign extends Document {
  // Informations de base
  name: string;
  description: string;
  brandId: IBrand['_id'];
  selectedProducts: IProduct['_id'][];
  
  // Type et objectifs de campagne
  campaignType: 'product-launch' | 'brand-awareness' | 'seasonal' | 'promotional' | 'retention' | 'rebranding';
  primaryObjective: 'awareness' | 'consideration' | 'conversion' | 'loyalty' | 'engagement';
  
  // Période et budget
  startDate: Date;
  endDate: Date;
  budget?: {
    total: number;
    allocation: {
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
      recruitmentPhase: { start: Date; end: Date; };
      contentCreation: { start: Date; end: Date; };
      publicationPhase: { start: Date; end: Date; };
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
  calendars: mongoose.Types.ObjectId[];
  
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
  createdBy: IUser['_id'];
  createdAt: Date;
  updatedAt: Date;
}

// Schema Mongoose pour les profils d'influenceurs
const InfluencerProfileSchema = new Schema({
  id: { type: String, required: true },
  tier: { 
    type: String, 
    enum: ['micro', 'mid', 'macro'], 
    required: true 
  },
  
  metrics: {
    followersRange: { type: String, required: true },
    engagementRate: { type: Number, required: true },
    avgLikes: { type: String, required: true },
    avgComments: { type: String, required: true },
    avgViews: { type: String, required: true }
  },
  
  audienceProfile: {
    ageGroups: { type: Map, of: Number },
    genderSplit: { type: Map, of: Number },
    topLocations: [{ type: String }],
    interests: [{ type: String }]
  },
  
  niche: [{ type: String }],
  contentStyle: [{ type: String }],
  platforms: [{ type: String }],
  
  estimatedCost: {
    postPrice: { type: String, required: true },
    storyPrice: { type: String, required: true },
    reelPrice: { type: String, required: true }
  },
  
  brandFit: {
    score: { type: Number, min: 0, max: 100, required: true },
    reasons: [{ type: String }],
    risks: [{ type: String }]
  }
}, { _id: false });

// Schema principal pour les campagnes
const CampaignSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom de la campagne est requis'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La description de la campagne est requise'],
    trim: true
  },
  brandId: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    required: [true, 'La marque est requise']
  },
  selectedProducts: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  
  campaignType: {
    type: String,
    enum: ['product-launch', 'brand-awareness', 'seasonal', 'promotional', 'retention', 'rebranding'],
    required: [true, 'Le type de campagne est requis']
  },
  primaryObjective: {
    type: String,
    enum: ['awareness', 'consideration', 'conversion', 'loyalty', 'engagement'],
    required: [true, 'L\'objectif principal est requis']
  },
  
  startDate: {
    type: Date,
    required: [true, 'La date de début est requise']
  },
  endDate: {
    type: Date,
    required: [true, 'La date de fin est requise']
  },
  budget: {
    total: { type: Number },
    allocation: {
      organic: { type: Number, default: 0 },
      ads: { type: Number, default: 0 },
      influencers: { type: Number, default: 0 }
    }
  },
  
  competitiveContext: {
    targetedCompetitors: [{ type: String, trim: true }],
    competitiveDifferentiation: [{ type: String, trim: true }],
    competitiveOpportunities: [{ type: String, trim: true }],
    avoidanceStrategy: [{ type: String, trim: true }]
  },
  
  historicalInsights: {
    successFactors: [{ type: String, trim: true }],
    failurePoints: [{ type: String, trim: true }],
    audiencePreferences: [{ type: String, trim: true }],
    contentPerformance: {
      bestPerformingTypes: [{ type: String, trim: true }],
      worstPerformingTypes: [{ type: String, trim: true }]
    }
  },
  
  legalFramework: {
    applicableRegulations: [{ type: String, trim: true }],
    complianceRequirements: [{ type: String, trim: true }],
    mandatoryDisclaimers: [{ type: String, trim: true }],
    restrictedClaims: [{ type: String, trim: true }],
    approvalRequired: { type: Boolean, default: false }
  },
  
  targetAudience: {
    primary: [{ type: String, trim: true }],
    secondary: [{ type: String, trim: true }],
    demographics: [{ type: String, trim: true }],
    interests: [{ type: String, trim: true }],
    behaviors: [{ type: String, trim: true }],
    psychographics: [{ type: String, trim: true }],
    painPoints: [{ type: String, trim: true }],
    motivations: [{ type: String, trim: true }],
    preferredChannels: [{ type: String, trim: true }]
  },
  
  creativeStrategy: {
    mainMessage: { type: String, trim: true },
    toneOfVoice: { type: String, trim: true },
    visualStyle: [{ type: String, trim: true }],
    contentPillars: [{ type: String, trim: true }],
    keyMessages: [{ type: String, trim: true }],
    emotionalTriggers: [{ type: String, trim: true }],
    storytellingApproach: { type: String, trim: true },
    brandArchetype: { type: String, trim: true },
    visualMoodboard: [{ type: String, trim: true }]
  },
  
  differentiationStrategy: {
    uniqueValueProposition: { type: String, trim: true },
    competitiveAdvantages: [{ type: String, trim: true }],
    marketPositioning: { type: String, trim: true },
    brandPersonality: [{ type: String, trim: true }]
  },
  
  advertisingStrategy: {
    metaAds: {
      budget: {
        total: { type: Number, default: 0 },
        daily: { type: Number, default: 0 },
        allocation: {
          awareness: { type: Number, default: 0 },
          traffic: { type: Number, default: 0 },
          conversions: { type: Number, default: 0 },
          retargeting: { type: Number, default: 0 }
        }
      },
      targeting: {
        demographics: {
          ageRange: { type: String, trim: true },
          gender: [{ type: String, trim: true }],
          locations: [{ type: String, trim: true }]
        },
        interests: [{ type: String, trim: true }],
        behaviors: [{ type: String, trim: true }],
        customAudiences: [{ type: String, trim: true }],
        lookalikeSources: [{ type: String, trim: true }]
      },
      adFormats: {
        feedAds: { type: Boolean, default: false },
        storyAds: { type: Boolean, default: false },
        reelsAds: { type: Boolean, default: false },
        carouselAds: { type: Boolean, default: false },
        videoAds: { type: Boolean, default: false }
      },
      biddingStrategy: {
        type: String,
        enum: ['lowest_cost', 'cost_cap', 'bid_cap', 'target_cost'],
        default: 'lowest_cost'
      },
      optimizationGoal: {
        type: String,
        enum: ['reach', 'impressions', 'clicks', 'conversions', 'video_views'],
        default: 'reach'
      }
    },
    
    googleAds: {
      budget: { type: Number },
      keywords: [{ type: String, trim: true }],
      adTypes: [{ type: String, trim: true }],
      targetingOptions: [{ type: String, trim: true }]
    },
    
    otherPlatforms: {
      tiktokAds: { type: Schema.Types.Mixed },
      linkedinAds: { type: Schema.Types.Mixed },
      snapchatAds: { type: Schema.Types.Mixed }
    }
  },
  
  influencerStrategy: {
    budget: {
      total: { type: Number, default: 0 },
      allocation: {
        microInfluencers: { type: Number, default: 0 },
        midTierInfluencers: { type: Number, default: 0 },
        macroInfluencers: { type: Number, default: 0 }
      }
    },
    
    recommendedProfiles: {
      microInfluencers: [InfluencerProfileSchema],
      midTierInfluencers: [InfluencerProfileSchema],
      macroInfluencers: [InfluencerProfileSchema]
    },
    
    contentRequirements: {
      postTypes: [{ type: String, trim: true }],
      contentGuidelines: [{ type: String, trim: true }],
      mandatoryHashtags: [{ type: String, trim: true }],
      brandMentions: [{ type: String, trim: true }],
      deliverables: [{ type: String, trim: true }]
    },
    
    timeline: {
      recruitmentPhase: {
        start: { type: Date },
        end: { type: Date }
      },
      contentCreation: {
        start: { type: Date },
        end: { type: Date }
      },
      publicationPhase: {
        start: { type: Date },
        end: { type: Date }
      }
    }
  },
  
  campaignPackage: {
    organicContent: {
      posts: { type: Number, default: 0 },
      stories: { type: Number, default: 0 },
      reels: { type: Number, default: 0 },
      carousels: { type: Number, default: 0 }
    },
    paidContent: {
      adCreatives: { type: Number, default: 0 },
      adCopies: { type: Number, default: 0 },
      landingPages: { type: Number, default: 0 }
    },
    influencerContent: {
      briefingDocuments: [{ type: String, trim: true }],
      contentTemplates: [{ type: String, trim: true }],
      approvalProcess: [{ type: String, trim: true }]
    }
  },
  
  calendars: [{
    type: Schema.Types.ObjectId,
    ref: 'Calendar'
  }],
  
  kpis: {
    primary: [{ type: String, trim: true }],
    secondary: [{ type: String, trim: true }],
    targets: { type: Map, of: Number },
    benchmarks: { type: Map, of: Number }
  },
  
  riskManagement: {
    identifiedRisks: [{ type: String, trim: true }],
    mitigationStrategies: [{ type: String, trim: true }],
    contingencyPlans: [{ type: String, trim: true }]
  },
  
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'completed', 'archived'],
    default: 'draft'
  },
  
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Indexes pour améliorer les performances
CampaignSchema.index({ brandId: 1 });
CampaignSchema.index({ status: 1 });
CampaignSchema.index({ campaignType: 1 });
CampaignSchema.index({ startDate: 1, endDate: 1 });
CampaignSchema.index({ createdBy: 1 });

// Validation des dates
CampaignSchema.pre('save', function(this: ICampaign, next) {
  if (this.startDate && this.endDate && this.startDate >= this.endDate) {
    return next(new Error('La date de fin doit être postérieure à la date de début'));
  }
  
  // Validation du budget
  if (this.budget && this.budget.total > 0) {
    const totalAllocation = (this.budget.allocation?.organic || 0) + 
                           (this.budget.allocation?.ads || 0) + 
                           (this.budget.allocation?.influencers || 0);
    
    if (totalAllocation > this.budget.total) {
      return next(new Error('La somme des allocations ne peut pas dépasser le budget total'));
    }
  }
  
  next();
});

export default mongoose.model<ICampaign>('Campaign', CampaignSchema);
