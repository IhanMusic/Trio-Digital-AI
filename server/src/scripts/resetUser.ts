import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const resetUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social_media_ai');
    
    // Supprimer l'utilisateur existant
    await User.deleteOne({ email: 'hello@thirdadvertising.dz' });
    console.log('Utilisateur supprimé avec succès');

    // Créer un nouvel utilisateur
    const user = new User({
      email: 'hello@thirdadvertising.dz',
      password: 'VotreNouveauMotDePasse123', // À changer
      name: 'Admin',
      role: 'owner',
      isAdmin: true,
      subscription: {
        plan: 'enterprise',
        status: 'active'
      }
    });

    await user.save();
    console.log('Nouvel utilisateur créé avec succès');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la réinitialisation de l\'utilisateur:', error);
    process.exit(1);
  }
};

resetUser();
