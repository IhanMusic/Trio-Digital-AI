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
  colors?: {
    primary: string;
    secondary?: string;
    accent?: string;
  };
  tone?: string;
  targetAudience?: string[];
  competitors?: string[];
  values?: string[];
  socialMediaAccounts?: {
    platform: string;
    handle: string;
  }[];
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
  tone: {
    type: String,
    trim: true
  },
  targetAudience: [{
    type: String,
    trim: true
  }],
  competitors: [{
    type: String,
    trim: true
  }],
  values: [{
    type: String,
    trim: true
  }],
  socialMediaAccounts: [{
    platform: {
      type: String,
      required: true,
      trim: true
    },
    handle: {
      type: String,
      required: true,
      trim: true
    }
  }],
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
