import mongoose, { Schema, Document } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  sector: string;
  description?: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  logo?: string;
  lastGenerationDate: Date;
  contentGenerated: number;
  team: mongoose.Types.ObjectId[];
  
  // Identité visuelle
  colors?: {
    primary: string;
    secondary?: string;
    accent?: string;
  };
  
  // Positionnement stratégique
  businessType?: string;
  companyStage?: string;
  pricePositioning?: string;
  
  // Contexte concurrentiel
  competitors?: string[];
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
  
  // Contraintes légales
  legalConstraints?: {
    regulations: string[];
    compliance: string[];
    disclaimers: string[];
  };
  
  // Valeurs et mission
  values?: string[];
  mission?: string;
}

const BrandSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom de la marque est requis'],
    trim: true
  },
  sector: {
    type: String,
    required: [true, 'Le secteur d\'activité est requis'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  logo: {
    type: String
  },
  
  // Identité visuelle
  colors: {
    primary: {
      type: String
    },
    secondary: {
      type: String
    },
    accent: {
      type: String
    }
  },
  
  // Positionnement stratégique
  businessType: {
    type: String,
    trim: true
  },
  companyStage: {
    type: String,
    trim: true
  },
  pricePositioning: {
    type: String,
    trim: true
  },
  
  // Contexte concurrentiel
  competitors: [{
    type: String,
    trim: true
  }],
  competitiveAnalysis: {
    directCompetitors: [{
      name: {
        type: String,
        trim: true
      },
      strengths: [{
        type: String,
        trim: true
      }],
      weaknesses: [{
        type: String,
        trim: true
      }],
      strategies: [{
        type: String,
        trim: true
      }]
    }],
    marketPosition: {
      type: String,
      trim: true
    },
    differentiators: [{
      type: String,
      trim: true
    }],
    opportunities: [{
      type: String,
      trim: true
    }]
  },
  
  // Historique marketing
  previousCampaigns: [{
    name: {
      type: String,
      trim: true
    },
    period: {
      type: String,
      trim: true
    },
    results: [{
      type: String,
      trim: true
    }],
    learnings: [{
      type: String,
      trim: true
    }]
  }],
  
  // Contraintes légales
  legalConstraints: {
    regulations: [{
      type: String,
      trim: true
    }],
    compliance: [{
      type: String,
      trim: true
    }],
    disclaimers: [{
      type: String,
      trim: true
    }]
  },
  
  // Valeurs et mission
  values: [{
    type: String,
    trim: true
  }],
  mission: {
    type: String,
    trim: true
  },
  
  lastGenerationDate: {
    type: Date,
    default: new Date(),
    required: true
  },
  contentGenerated: {
    type: Number,
    default: 0,
    required: true
  },
  team: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    default: [],
    required: true
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances des requêtes
BrandSchema.index({ userId: 1 });
BrandSchema.index({ name: 1, userId: 1 }, { unique: true });

export default mongoose.model<IBrand>('Brand', BrandSchema);
