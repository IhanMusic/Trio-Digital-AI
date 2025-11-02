import mongoose, { Document, Schema } from 'mongoose';

export interface IResult extends Document {
  briefId: string;
  brandId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  strategy?: {
    marketAnalysis?: any;
    targetAudience?: any;
    competitiveAnalysis?: any;
    recommendations?: any;
    kpis?: any;
  };
  briefs?: {
    briefs: Array<{
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
    }>;
  };
  executedBriefs?: Array<{
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
    image: {
      url: string;
      publicId?: string; // ID public Cloudinary
      alt: string;
      type: string;
      ratio: string;
      quality: string;
    };
  }>;
  visualAnalysis?: {
    styleGuide?: any;
    moodBoard?: any;
    colorPalette?: any;
  };
  imageGenerationSession?: {
    briefId: string;
    startTime: number;
    endTime?: number;
    totalAttempts: number;
    bestScore: number;
    bestImageUrl: string;
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
    history: Array<{
      briefId: string;
      timestamp: number;
      imageUrl: string;
      prompt: string;
      params: {
        cfgScale: number;
        steps: number;
        samples: number;
      };
      score: number;
      validationDetails: {
        score: number;
        quality: string;
        details: Array<{
          criteriaName: string;
          score: number;
          feedback: string;
        }>;
        suggestions: string[];
        technicalIssues: string[];
        styleIssues: string[];
        sectorIssues: string[];
      };
      metadata: {
        purpose: string;
        attempt: number;
        quality: string;
      };
    }>;
  };
  cache?: {
    [key: string]: any;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// Schéma pour l'objet image
const ImageSchema = new Schema({
  url: { 
    type: String, 
    required: true,
    set: (v: any) => String(v || '')
  },
  publicId: { // ID public Cloudinary
    type: String,
    required: false
  },
  alt: { 
    type: String, 
    required: true,
    set: (v: any) => String(v || '')
  },
  type: { 
    type: String, 
    required: true,
    set: (v: any) => String(v || '')
  },
  ratio: { 
    type: String, 
    required: true,
    set: (v: any) => String(v || '')
  },
  quality: { 
    type: String, 
    required: true,
    set: (v: any) => String(v || 'high')
  }
});

// Schéma pour le contenu
const ContentSchema = new Schema({
  main: { 
    type: String,
    required: true,
    set: (v: any) => String(v || '')
  },
  tagline: { 
    type: String,
    required: true,
    set: (v: any) => String(v || '')
  },
  hashtags: { 
    type: [String],
    required: true,
    set: (v: any) => Array.isArray(v) ? v.map(String) : []
  },
  cta: { 
    type: String,
    required: true,
    set: (v: any) => String(v || '')
  },
  question: { 
    type: String,
    required: true,
    set: (v: any) => String(v || '')
  }
});

// Schéma pour les spécifications
const SpecsSchema = new Schema({
  format: { 
    type: String,
    required: true,
    set: (v: any) => String(v || '')
  },
  dimensions: { 
    type: String,
    required: true,
    set: (v: any) => String(v || '')
  },
  altText: { 
    type: String,
    required: true,
    set: (v: any) => String(v || '')
  }
});

// Schéma pour les briefs exécutés
const ExecutedBriefSchema = new Schema({
  visualPrompt: { 
    type: String,
    set: (v: any) => String(v || '')
  },
  content: ContentSchema,
  specs: SpecsSchema,
  image: ImageSchema
});

const ResultSchema = new Schema({
  briefId: { type: String, required: true, unique: true },
  brandId: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  strategy: {
    marketAnalysis: Schema.Types.Mixed,
    targetAudience: Schema.Types.Mixed,
    competitiveAnalysis: Schema.Types.Mixed,
    recommendations: Schema.Types.Mixed,
    kpis: Schema.Types.Mixed
  },
  briefs: {
    briefs: [{
      visualPrompt: String,
      content: ContentSchema,
      specs: SpecsSchema
    }]
  },
  executedBriefs: [ExecutedBriefSchema],
  visualAnalysis: {
    styleGuide: Schema.Types.Mixed,
    moodBoard: Schema.Types.Mixed,
    colorPalette: Schema.Types.Mixed
  },
  imageGenerationSession: {
    briefId: String,
    startTime: Number,
    endTime: Number,
    totalAttempts: Number,
    bestScore: Number,
    bestImageUrl: String,
    bestImagePublicId: String, // ID public Cloudinary pour la meilleure image
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'failed'],
      default: 'pending'
    },
    history: [{
      briefId: String,
      timestamp: Number,
      imageUrl: String,
      imagePublicId: String, // ID public Cloudinary
      prompt: String,
      params: {
        cfgScale: Number,
        steps: Number,
        samples: Number
      },
      score: Number,
      validationDetails: {
        score: Number,
        quality: String,
        details: [{
          criteriaName: String,
          score: Number,
          feedback: String
        }],
        suggestions: [String],
        technicalIssues: [String],
        styleIssues: [String],
        sectorIssues: [String]
      },
      metadata: {
        purpose: String,
        attempt: Number,
        quality: String
      }
    }]
  },
  cache: {
    type: Map,
    of: Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Index pour la recherche rapide
ResultSchema.index({ briefId: 1 });
ResultSchema.index({ createdAt: 1 });
ResultSchema.index({ 'imageGenerationSession.status': 1 });

export const Result = mongoose.model<IResult>('Result', ResultSchema);
