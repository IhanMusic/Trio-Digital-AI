import mongoose, { Schema, Document } from 'mongoose';
import { IBrand } from './Brand';
import { IUser } from './User';

export interface IProduct extends Document {
  brandId: IBrand['_id'];
  name: string;
  description: string;
  category: string;
  
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
    specifications?: Record<string, string>;
  };
  
  // Certifications & Labels
  certifications: string[];
  labels: string[];
  
  // Images
  images: {
    main: string; // URL de l'image principale
    gallery: string[]; // URLs des images supplémentaires
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
  
  // Caractéristiques spécifiques
  flavors: [{
    type: String,
    trim: true
  }],
  scents: [{
    type: String,
    trim: true
  }],
  
  // Proposition de valeur
  uniqueSellingPoints: [{
    type: String,
    trim: true
  }],
  customerBenefits: [{
    type: String,
    trim: true
  }],
  
  // Target audience SPÉCIFIQUE au produit
  targetAudience: {
    demographic: [{
      type: String,
      trim: true
    }],
    lifestyle: [{
      type: String,
      trim: true
    }],
    psychographic: [{
      type: String,
      trim: true
    }],
    geographic: [{
      type: String,
      trim: true
    }]
  },
  
  // Occasions d'usage
  usageOccasions: [{
    type: String,
    trim: true
  }],
  
  // SEO & Keywords
  keywords: [{
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
  
  // Certifications & Labels
  certifications: [{
    type: String,
    trim: true
  }],
  labels: [{
    type: String,
    trim: true
  }],
  
  // Images
  images: {
    main: {
      type: String
    },
    gallery: [{
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
