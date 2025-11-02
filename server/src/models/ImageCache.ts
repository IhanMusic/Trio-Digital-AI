import mongoose, { Schema, Document } from 'mongoose';

interface ValidationDetail {
  criteriaName: string;
  score: number;
  feedback: string;
}

interface ValidationDetails {
  score: number;
  quality: string;
  details: ValidationDetail[];
  suggestions: string[];
  technicalIssues: string[];
  styleIssues: string[];
  sectorIssues: string[];
}

interface GenerationParams {
  cfgScale: number;
  steps: number;
  samples: number;
  width?: number;
  height?: number;
}

interface CacheMetadata {
  purpose?: string;
  timeOfDay?: string;
  sector?: string;
  style?: string;
  quality?: string;
  brandId: string;
  userId: mongoose.Types.ObjectId;
}

export interface IImageCache extends Document {
  prompt: string;
  briefId: string;
  params: GenerationParams;
  imageUrl: string;
  score: number;
  validationDetails: ValidationDetails;
  metadata: CacheMetadata;
  createdAt: Date;
}

const ValidationDetailSchema = new Schema({
  criteriaName: { type: String, required: true },
  score: { type: Number, required: true },
  feedback: { type: String, required: true }
});

const ValidationDetailsSchema = new Schema({
  score: { type: Number, required: true },
  quality: { type: String, required: true },
  details: [ValidationDetailSchema],
  suggestions: [String],
  technicalIssues: [String],
  styleIssues: [String],
  sectorIssues: [String]
});

const GenerationParamsSchema = new Schema({
  cfgScale: { type: Number, required: true, default: 0 },
  steps: { type: Number, required: true, default: 0 },
  samples: { type: Number, required: true, default: 1 },
  width: { type: Number },
  height: { type: Number }
});

const CacheMetadataSchema = new Schema({
  purpose: { type: String },
  timeOfDay: { type: String },
  sector: { type: String },
  style: { type: String },
  quality: { type: String },
  brandId: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const ImageCacheSchema = new Schema({
  prompt: { type: String, required: true },
  briefId: { type: String, required: true },
  params: { type: GenerationParamsSchema, required: true },
  imageUrl: { type: String, required: true },
  score: { type: Number, required: true },
  validationDetails: { type: ValidationDetailsSchema, required: true },
  metadata: { type: CacheMetadataSchema, default: {} },
  createdAt: { type: Date, default: Date.now, expires: '30d' }
});

// Index pour la recherche rapide
ImageCacheSchema.index({ prompt: 1, 'params.cfgScale': 1, 'params.steps': 1, 'params.samples': 1 });
ImageCacheSchema.index({ briefId: 1 });
ImageCacheSchema.index({ createdAt: 1 });

// Index pour les métadonnées couramment recherchées
ImageCacheSchema.index({ 'metadata.purpose': 1 });
ImageCacheSchema.index({ 'metadata.sector': 1 });
ImageCacheSchema.index({ 'metadata.style': 1 });
ImageCacheSchema.index({ 'metadata.brandId': 1 });
ImageCacheSchema.index({ 'metadata.userId': 1 });
ImageCacheSchema.index({ 'metadata.brandId': 1, 'metadata.userId': 1 });

export const ImageCache = mongoose.model<IImageCache>('ImageCache', ImageCacheSchema);
