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
  targetCountry: string;
  targetLanguages: string[];
  selectedProducts: mongoose.Types.ObjectId[];
  socialMediaAccounts: {
    platform: string;
    handle: string;
  }[];
  ethnicDetails: {
    languages: string[];
    culturalEvents: {
      name: string;
      date: Date;
      description: string;
    }[];
    localHolidays: {
      name: string;
      date: Date;
      description: string;
    }[];
    demographics: {
      languages: string[];
      religions: string[];
      customs: string[];
    };
  };
  frequency: 'daily' | 'twice_daily' | 'three_per_week' | 'weekly';
  contentPlan: {
    frequency: {
      facebook?: number;
      instagram?: number;
      twitter?: number;
      linkedin?: number;
      tiktok?: number;
    };
    preferredTimes: {
      facebook?: string[];
      instagram?: string[];
      twitter?: string[];
      linkedin?: string[];
      tiktok?: string[];
    };
    contentMix: Array<{
      type: 'image' | 'video' | 'text';
      percentage: number;
    }>;
  };
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
  approvalWorkflow: {
    enabled: boolean;
    approvers: {
      userId: IUser['_id'];
      role: string;
      order: number;
    }[];
  };
  metrics: {
    targetReach: number;
    targetEngagement: number;
    targetConversions: number;
  };
  budget: {
    total: number;
    allocation: {
      organic: number;
      paid: number;
    };
  };
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
  ethnicDetails: {
    languages: [String],
    culturalEvents: [{
      name: String,
      date: Date,
      description: String
    }],
    localHolidays: [{
      name: String,
      date: Date,
      description: String
    }],
    demographics: {
      languages: [String],
      religions: [String],
      customs: [String]
    }
  },
  frequency: {
    type: String,
    enum: ['daily', 'twice_daily', 'three_per_week', 'weekly'],
    required: [true, 'La fréquence de publication est requise'],
    default: 'daily'
  },
  contentPlan: {
    frequency: {
      facebook: Number,
      instagram: Number,
      twitter: Number,
      linkedin: Number,
      tiktok: Number
    },
    preferredTimes: {
      facebook: [String],
      instagram: [String],
      twitter: [String],
      linkedin: [String],
      tiktok: [String]
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
  approvalWorkflow: {
    enabled: {
      type: Boolean,
      default: false
    },
    approvers: [{
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      role: String,
      order: Number
    }]
  },
  metrics: {
    targetReach: Number,
    targetEngagement: Number,
    targetConversions: Number
  },
  budget: {
    total: Number,
    allocation: {
      organic: Number,
      paid: Number
    }
  },
  notes: String,
  selectedProducts: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
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
