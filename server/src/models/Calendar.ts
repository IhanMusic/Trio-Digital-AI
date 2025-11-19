import mongoose, { Schema, Document } from 'mongoose';
import { IBrand } from './Brand';
import { IUser } from './User';

export interface ICalendar extends Document {
  brandId: IBrand['_id'];
  name: string;
  startDate: Date;
  endDate: Date;
  createdBy: IUser['_id'];
  status: 'draft' | 'active' | 'completed' | 'archived';
  
  // Localisation
  targetCountry: string;
  targetLanguages: string[];
  
  // Sélection tactique
  selectedProducts: mongoose.Types.ObjectId[];
  socialMediaAccounts: {
    platform: string;
    handle: string;
  }[];
  
  // Ton de communication pour cette campagne
  communicationStyle: string;
  
  // Objectif de la campagne
  campaignObjective?: 'awareness' | 'consideration' | 'conversion' | 'loyalty' | 'launch';
  
  // Fréquence de publication
  frequency: 'daily' | 'twice_daily' | 'three_per_week' | 'weekly';
  
  // Mix de contenu (simplifié)
  contentMix: {
    imagePercentage: number;
    videoPercentage: number;
  };
  
  // Heures de publication préférées par réseau (simplifié)
  contentPlan: {
    frequency: {
      facebook: number;
      instagram: number;
      linkedin: number;
    };
    preferredTimes: {
      facebook: string[];
      instagram: string[];
      linkedin: string[];
    };
    contentMix: {
      type: 'image' | 'text';
      percentage: number;
    }[];
  };
  contentTypes: string[]; // Types de contenu sélectionnés (Photos de produits, Infographies, Carrousels, Stories)
  
  // Configuration créative
  generationSettings: {
    tone: string;
    themes: string[];
    keywords: string[];
    contentLength: {
      min: number;
      max: number;
    };
    imageStyle: string[];
    integrateProductImages?: boolean;
  };
  
  // Dates clés spécifiques (optionnel)
  customKeyDates?: {
    name: string;
    date: Date;
    description: string;
  }[];
  
  // CTA préféré (optionnel)
  preferredCTA?: string;
  
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const CalendarSchema: Schema = new Schema({
  brandId: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Le nom du calendrier est requis'],
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'La date de début est requise']
  },
  endDate: {
    type: Date,
    required: [true, 'La date de fin est requise']
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'completed', 'archived'],
    default: 'draft'
  },
  
  // Localisation
  targetCountry: {
    type: String,
    required: [true, 'Le pays cible est requis']
  },
  targetLanguages: {
    type: [String],
    required: [true, 'Au moins une langue cible est requise'],
    validate: {
      validator: function(v: string[]) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'Au moins une langue cible est requise'
    }
  },
  
  // Sélection tactique
  selectedProducts: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
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
  
  // Ton de communication pour cette campagne
  communicationStyle: {
    type: String,
    trim: true
  },
  
  // Objectif de la campagne
  campaignObjective: {
    type: String,
    enum: ['awareness', 'consideration', 'conversion', 'loyalty', 'launch'],
    trim: true
  },
  
  // Fréquence de publication
  frequency: {
    type: String,
    enum: ['daily', 'twice_daily', 'three_per_week', 'weekly'],
    required: [true, 'La fréquence de publication est requise'],
    default: 'daily'
  },
  
  // Mix de contenu (simplifié)
  contentMix: {
    imagePercentage: {
      type: Number,
      default: 70,
      min: 0,
      max: 100
    },
    videoPercentage: {
      type: Number,
      default: 30,
      min: 0,
      max: 100
    }
  },
  
  // Heures de publication (simplifié)
  contentPlan: {
    frequency: {
      facebook: Number,
      instagram: Number,
      linkedin: Number
    },
    preferredTimes: {
      facebook: [String],
      instagram: [String],
      linkedin: [String]
    },
    contentMix: [{
      type: {
        type: String,
        required: [true, 'Le type de contenu est requis'],
        enum: ['image', 'video', 'text']
      },
      percentage: {
        type: Number,
        required: [true, 'Le pourcentage est requis'],
        min: [0, 'Le pourcentage doit être supérieur ou égal à 0'],
        max: [100, 'Le pourcentage doit être inférieur ou égal à 100']
      }
    }]
  },
  
  // Configuration créative
  generationSettings: {
    tone: String,
    themes: [String],
    keywords: [String],
    contentLength: {
      min: Number,
      max: Number
    },
    imageStyle: [String],
    integrateProductImages: {
      type: Boolean,
      default: false
    }
  },
  
  // Dates clés spécifiques
  customKeyDates: [{
    name: {
      type: String,
      trim: true
    },
    date: {
      type: Date
    },
    description: {
      type: String,
      trim: true
    }
  }],
  
  // CTA préféré
  preferredCTA: {
    type: String,
    trim: true
  },
  
  notes: String
}, {
  timestamps: true
});

// Indexes
CalendarSchema.index({ brandId: 1 });
CalendarSchema.index({ status: 1 });
CalendarSchema.index({ startDate: 1, endDate: 1 });
CalendarSchema.index({ 'approvalWorkflow.approvers.userId': 1 });

// Validations
CalendarSchema.pre('save', function(this: ICalendar, next) {
  // Validation des dates
  if (!this.startDate || !this.endDate) {
    return next(new Error('Les dates de début et de fin sont requises'));
  }

  const start = new Date(this.startDate);
  const end = new Date(this.endDate);

  if (isNaN(start.getTime())) {
    return next(new Error('La date de début est invalide'));
  }

  if (isNaN(end.getTime())) {
    return next(new Error('La date de fin est invalide'));
  }

  if (start >= end) {
    return next(new Error('La date de fin doit être postérieure à la date de début'));
  }

  // Validation du contentMix
  if (this.contentPlan?.contentMix) {
    const sum = this.contentPlan.contentMix.reduce((acc, mix) => acc + mix.percentage, 0);
    if (sum !== 100) {
      return next(new Error('La somme des pourcentages du contentMix doit être égale à 100%'));
    }
  }

  next();
});

export default mongoose.model<ICalendar>('Calendar', CalendarSchema);
