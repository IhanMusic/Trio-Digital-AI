import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { IBrand } from './Brand';

export interface ITeamInvitation extends Document {
  brandId: IBrand['_id'];
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'pending' | 'accepted' | 'expired' | 'canceled';
  invitedBy: IUser['_id'];
  token: string;
  expiresAt: Date;
  acceptedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TeamInvitationSchema: Schema = new Schema({
  brandId: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Format d\'email invalide'
    }
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    required: [true, 'Le rôle est requis']
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'expired', 'canceled'],
    default: 'pending'
  },
  invitedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 jours
  },
  acceptedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
TeamInvitationSchema.index({ brandId: 1, email: 1 }, { unique: true });
TeamInvitationSchema.index({ token: 1 }, { unique: true });
TeamInvitationSchema.index({ expiresAt: 1 });
TeamInvitationSchema.index({ status: 1 });

// Méthode pour vérifier si l'invitation est expirée
TeamInvitationSchema.methods.isExpired = function(): boolean {
  return this.status === 'expired' || new Date() > this.expiresAt;
};

// Méthode pour accepter l'invitation
TeamInvitationSchema.methods.accept = async function(): Promise<void> {
  if (this.isExpired()) {
    throw new Error('L\'invitation a expiré');
  }
  
  if (this.status !== 'pending') {
    throw new Error('L\'invitation n\'est plus valide');
  }

  this.status = 'accepted';
  this.acceptedAt = new Date();
  await this.save();
};

// Méthode pour annuler l'invitation
TeamInvitationSchema.methods.cancel = async function(): Promise<void> {
  if (this.status !== 'pending') {
    throw new Error('L\'invitation ne peut plus être annulée');
  }

  this.status = 'canceled';
  await this.save();
};

// Middleware pour marquer automatiquement les invitations expirées
TeamInvitationSchema.pre('save', function(this: ITeamInvitation) {
  if (this.status === 'pending' && new Date() > this.expiresAt) {
    this.status = 'expired';
  }
});

export default mongoose.model<ITeamInvitation>('TeamInvitation', TeamInvitationSchema);
