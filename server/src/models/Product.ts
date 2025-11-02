import mongoose, { Schema, Document } from 'mongoose';
import { IBrand } from './Brand';
import { IUser } from './User';

export interface IProduct extends Document {
  brandId: IBrand['_id'];
  name: string;
  description: string;
  category: string;
  
  // Identité visuelle du produit
  logo?: string;
  brandGuidelines?: string;
  colors?: {
    primary: string;
    secondary?: string;
    accent?: string;
  };
  
  // Caractéristiques spécifiques
  flavors: string[]; // Arômes
  scents: string[]; // Parfums
  variants: string[]; // Autres variantes
  
  // Points forts et bénéfices
  uniqueSellingPoints: string[];
  customerBenefits: string[];
  
  // Fiche technique
  technicalSheet: {
    ingredients: string[];
    nutritionalInfo?: string;
    usage?: string;
    storage?: string;
    highlights?: string;
    specifications?: Record<string, string>; // Dimensions, poids, etc.
  };
  
  // Images
  images: {
    main: string; // URL de l'image principale
    gallery: string[]; // URLs des images supplémentaires
    packaging?: string[]; // Images du packaging
  };
  
  createdBy: IUser['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
  brandId: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    required: [true, 'La marque est requise']
  },
  name: {
    type: String,
    required: [true, 'Le nom du produit est requis'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La description du produit est requise'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'La catégorie du produit est requise'],
    trim: true
  },
  
  // Identité visuelle du produit
  logo: {
    type: String
  },
  brandGuidelines: {
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
  
  // Caractéristiques spécifiques
  flavors: [{
    type: String,
    trim: true
  }],
  scents: [{
    type: String,
    trim: true
  }],
  variants: [{
    type: String,
    trim: true
  }],
  
  // Points forts et bénéfices
  uniqueSellingPoints: [{
    type: String,
    trim: true
  }],
  customerBenefits: [{
    type: String,
    trim: true
  }],
  
  // Fiche technique
  technicalSheet: {
    ingredients: [{
      type: String,
      trim: true
    }],
    nutritionalInfo: {
      type: String,
      trim: true
    },
    usage: {
      type: String,
      trim: true
    },
    storage: {
      type: String,
      trim: true
    },
    highlights: {
      type: String,
      trim: true
    },
    specifications: {
      type: Map,
      of: String
    }
  },
  
  // Images
  images: {
    main: {
      type: String
    },
    gallery: [{
      type: String
    }],
    packaging: [{
      type: String
    }]
  },
  
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Indexes
ProductSchema.index({ brandId: 1 });
ProductSchema.index({ name: 1, brandId: 1 }, { unique: true });
ProductSchema.index({ category: 1 });

export default mongoose.model<IProduct>('Product', ProductSchema);
