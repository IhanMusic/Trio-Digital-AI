import mongoose, { Schema, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  isAdmin: boolean;
  billingInfo?: {
    type: 'company' | 'individual';
    company?: {
      registrationNumber: string; // RC N°
      taxId: string; // NIF N°
      statisticalId: string; // NIS N°
      articleCode: string; // Code Article
    };
    individual?: {
      fullName: string;
      billingAddress: string;
    };
  };
  subscription: {
    plan: 'free' | 'starter' | 'pro' | 'enterprise';
    status: 'active' | 'canceled' | 'expired';
    stripeCustomerId?: string;
    currentPeriodEnd?: Date;
  };
  settings: {
    language: string;
    notifications: boolean;
    timezone: string;
  };
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type IUserDocument = IUser & Document;

const UserSchema: Schema = new Schema({
  email: { 
    type: String, 
    required: [true, 'L\'email est requis'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Format d\'email invalide'
    }
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères']
  },
  name: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true
  },
  role: {
    type: String,
    enum: ['owner', 'admin', 'editor', 'viewer'],
    default: 'owner'
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'starter', 'pro', 'enterprise'],
      default: 'free'
    },
  billingInfo: {
    type: {
      type: String,
      enum: ['company', 'individual']
    },
    company: {
      registrationNumber: String,
      taxId: String,
      statisticalId: String,
      articleCode: String
    },
    individual: {
      fullName: String,
      billingAddress: String
    }
  },
    status: {
      type: String,
      enum: ['active', 'canceled', 'expired'],
      default: 'active'
    },
    stripeCustomerId: String,
    currentPeriodEnd: Date
  },
  settings: {
    language: {
      type: String,
      default: 'fr'
    },
    notifications: {
      type: Boolean,
      default: true
    },
    timezone: {
      type: String,
      default: 'Europe/Paris'
    }
  },
  lastLogin: Date
}, {
  timestamps: true
});

// Indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ 'subscription.stripeCustomerId': 1 });
UserSchema.index({ role: 1 });

// Hash password before saving
UserSchema.pre('save', async function(this: IUser & Document, next) {
  try {
    // Hash du mot de passe si modifié ou nouveau document
    if (this.isModified('password') || this.isNew) {
      if (!this.password) {
        throw new Error('Le mot de passe est requis');
      }
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }

    // Vérifier si c'est un nouvel utilisateur
    if (this.isNew) {
      // Vérifier s'il existe déjà des utilisateurs
      const count = await mongoose.model('User').countDocuments();
      if (count === 0) {
        // Premier utilisateur = super admin
        this.isAdmin = true;
        this.role = 'owner';
        this.subscription.plan = 'enterprise';
      } else {
        // Utilisateurs suivants = rôle par défaut
        this.role = 'viewer';
        this.isAdmin = false;
      }
    }

    next();
  } catch (error) {
    if (error instanceof Error) {
      next(new Error(error.message));
    } else {
      next(new Error('Une erreur est survenue'));
    }
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!candidatePassword || !this.password) {
    return false;
  }
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Erreur lors de la comparaison des mots de passe:', error);
    return false;
  }
};

// Méthode pour vérifier si l'utilisateur est l'admin principal
UserSchema.methods.isMainAdmin = function(): boolean {
  return this.email === 'hello@thirdadvertising.dz';
};

export default mongoose.model<IUser>('User', UserSchema);
