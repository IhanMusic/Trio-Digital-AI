import mongoose, { Schema, Document } from 'mongoose';

interface PromptMetrics {
  successRate: number;
  averageExecutionTime: number;
  tokenCount: number;
  lastSuccessfulRun: Date;
  totalRuns: number;
  successfulRuns: number;
}

interface PromptVersion {
  version: string;
  content: string;
  metrics: PromptMetrics;
  createdAt: Date;
  deprecatedAt?: Date;
}

interface PromptParameters {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

interface SectorSpecificConfig {
  sector: string;
  modifications: {
    additions: string[];
    removals: string[];
    replacements: { from: string; to: string }[];
  };
  performance: {
    successRate: number;
    averageScore: number;
    sampleSize: number;
  };
}

export interface IPrompt extends Document {
  name: string;
  category: 'gpt' | 'dalle' | 'claude' | 'runway' | 'stability';
  type: 'strategy' | 'creative' | 'visual' | 'analysis';
  description: string;
  currentVersion: string;
  versions: PromptVersion[];
  parameters: PromptParameters;
  dependencies: {
    requiredPrompts: string[];
    optionalPrompts: string[];
    order: number;
  };
  validation: {
    requiredFields: string[];
    minimumLength: number;
    maximumLength: number;
    patterns: string[];
    customValidators: string[];
  };
  sectorConfigs: SectorSpecificConfig[];
  caching: {
    enabled: boolean;
    ttl: number;
    keyPattern: string[];
  };
  usage: {
    contextRestrictions: string[];
    bestPractices: string[];
    examples: {
      input: any;
      output: any;
      score: number;
    }[];
  };
  performance: {
    globalSuccessRate: number;
    averageExecutionTime: number;
    lastOptimization: Date;
    optimizationHistory: {
      date: Date;
      changes: string[];
      impact: number;
    }[];
  };
  modifiedBy: string;
  lastModified: Date;
  isActive: boolean;
}

const PromptSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: true,
    unique: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    enum: ['gpt', 'dalle', 'claude', 'runway', 'stability'],
    index: true
  },
  type: {
    type: String,
    required: true,
    enum: ['strategy', 'creative', 'visual', 'analysis'],
    index: true
  },
  description: {
    type: String,
    required: true
  },
  currentVersion: {
    type: String,
    required: true
  },
  versions: [{
    version: String,
    content: String,
    metrics: {
      successRate: Number,
      averageExecutionTime: Number,
      tokenCount: Number,
      lastSuccessfulRun: Date,
      totalRuns: Number,
      successfulRuns: Number
    },
    createdAt: Date,
    deprecatedAt: Date
  }],
  parameters: {
    temperature: Number,
    maxTokens: Number,
    topP: Number,
    frequencyPenalty: Number,
    presencePenalty: Number
  },
  dependencies: {
    requiredPrompts: [String],
    optionalPrompts: [String],
    order: Number
  },
  validation: {
    requiredFields: [String],
    minimumLength: Number,
    maximumLength: Number,
    patterns: [String],
    customValidators: [String]
  },
  sectorConfigs: [{
    sector: String,
    modifications: {
      additions: [String],
      removals: [String],
      replacements: [{
        from: String,
        to: String
      }]
    },
    performance: {
      successRate: Number,
      averageScore: Number,
      sampleSize: Number
    }
  }],
  caching: {
    enabled: Boolean,
    ttl: Number,
    keyPattern: [String]
  },
  usage: {
    contextRestrictions: [String],
    bestPractices: [String],
    examples: [{
      input: Schema.Types.Mixed,
      output: Schema.Types.Mixed,
      score: Number
    }]
  },
  performance: {
    globalSuccessRate: Number,
    averageExecutionTime: Number,
    lastOptimization: Date,
    optimizationHistory: [{
      date: Date,
      changes: [String],
      impact: Number
    }]
  },
  modifiedBy: {
    type: String,
    required: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true
});

// Indexes pour optimiser les requêtes fréquentes
PromptSchema.index({ 'versions.version': 1 });
PromptSchema.index({ 'sectorConfigs.sector': 1 });
PromptSchema.index({ 'performance.globalSuccessRate': -1 });
PromptSchema.index({ category: 1, type: 1, isActive: 1 });

// Index composé pour la recherche de prompts par secteur et performance
PromptSchema.index({
  'sectorConfigs.sector': 1,
  'performance.globalSuccessRate': -1,
  isActive: 1
});

export default mongoose.model<IPrompt>('Prompt', PromptSchema);
