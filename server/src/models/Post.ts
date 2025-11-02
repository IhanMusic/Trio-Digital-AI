import mongoose, { Schema, Document } from 'mongoose';
import { IBrand } from './Brand';
import { ICalendar } from './Calendar';
import { IUser } from './User';
import { IProduct } from './Product';

export interface IPost extends Document {
  calendarId: ICalendar['_id'];
  brandId: IBrand['_id'];
  createdBy: IUser['_id'];
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'tiktok';
  scheduledDate: Date;
  content: {
    text: string;
    imageUrl?: string;
    imagePublicId?: string; // ID public Cloudinary
    videoUrl?: string;
    imageStyle?: string; // Style visuel de l'image
    imagePrompt?: string; // Prompt utilisé pour générer l'image
  };
  status: 'pending_validation' | 'approved' | 'rejected';
  approvalStatus: {
    approved: boolean;
    approvedBy?: IUser['_id'];
    approvedAt?: Date;
    comments?: string;
  };
  metrics?: {
    reach?: number;
    engagement?: number;
    clicks?: number;
    shares?: number;
    comments?: number;
    likes?: number;
  };
  tags: string[];
  hashtags?: string[]; // Hashtags générés pour le post
  callToAction?: string; // Call-to-action spécifique
  audienceTargeting?: string; // Suggestions de ciblage
  competitiveEdge?: string; // Différenciation par rapport à la concurrence
  legalCompliance?: string; // Mentions légales ou disclaimers
  culturalRelevance?: string; // Pertinence culturelle du post
  keyDates?: { // Dates clés associées au post
    name: string;
    importance: number;
  }[];
  aiGenerated: boolean;
  products: IProduct['_id'][]; // Référence aux produits associés
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema({
  calendarId: {
    type: Schema.Types.ObjectId,
    ref: 'Calendar',
    required: true
  },
  brandId: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  platform: {
    type: String,
    enum: ['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok'],
    required: true
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  content: {
    text: {
      type: String,
      required: true
    },
    imageUrl: String,
    imagePublicId: String, // ID public Cloudinary
    videoUrl: String,
    imageStyle: String,
    imagePrompt: String
  },
  status: {
    type: String,
    enum: ['pending_validation', 'approved', 'rejected'],
    default: 'pending_validation'
  },
  approvalStatus: {
    approved: {
      type: Boolean,
      default: false
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    approvedAt: Date,
    comments: String
  },
  metrics: {
    reach: Number,
    engagement: Number,
    clicks: Number,
    shares: Number,
    comments: Number,
    likes: Number
  },
  tags: [String],
  aiGenerated: {
    type: Boolean,
    default: true
  },
  hashtags: [String],
  callToAction: String,
  audienceTargeting: String,
  competitiveEdge: String,
  legalCompliance: String,
  culturalRelevance: String,
  keyDates: [{
    name: String,
    importance: Number
  }],
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, {
  timestamps: true
});

// Indexes
PostSchema.index({ calendarId: 1, scheduledDate: 1 });
PostSchema.index({ brandId: 1 });
PostSchema.index({ status: 1 });
PostSchema.index({ platform: 1 });
PostSchema.index({ 'approvalStatus.approved': 1 });
PostSchema.index({ products: 1 }); // Index pour la recherche par produits
PostSchema.index({ hashtags: 1 }); // Index pour la recherche par hashtags
PostSchema.index({ keyDates: 1 }); // Index pour la recherche par dates clés

export default mongoose.model<IPost>('Post', PostSchema);
