import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from '../config/db';
import User from '../models/User';

// Charger les variables d'environnement
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const resetPassword = async () => {
  try {
    console.log('Connexion à la base de données...');
    await connectDB();
    console.log('Connecté à MongoDB');
    
    const email = 'hello@thirdadvertising.dz';
    const newPassword = 'Mazouni1990@';
    
    // Trouver l'utilisateur
    console.log(`Recherche de l'utilisateur ${email}...`);
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('Utilisateur non trouvé');
      await mongoose.connection.close();
      process.exit(1);
    }
    
    console.log('Utilisateur trouvé, mise à jour du mot de passe...');
    user.password = newPassword;
    await user.save();
    console.log('Mot de passe réinitialisé avec succès');
    
    await mongoose.connection.close();
    console.log('Connexion à la base de données fermée');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    try {
      await mongoose.connection.close();
    } catch (err) {
      console.error('Erreur lors de la fermeture de la connexion:', err);
    }
    process.exit(1);
  }
};

resetPassword();
