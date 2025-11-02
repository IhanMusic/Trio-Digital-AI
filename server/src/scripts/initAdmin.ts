import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from '../config/db';
import User from '../models/User';

// Charger les variables d'environnement
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const initializeAdmin = async () => {
  try {
    console.log('Chargement des variables d\'environnement...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    
    console.log('Connexion à la base de données...');
    await connectDB();
    console.log('Connecté à MongoDB');
    
    const adminEmail = 'hello@thirdadvertising.dz';
    
    // Vérifier si l'admin existe déjà
    console.log('Vérification de l\'existence de l\'administrateur...');
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('L\'administrateur existe déjà');
      if (!existingAdmin.isAdmin) {
        console.log('Mise à jour des droits administrateur...');
        existingAdmin.isAdmin = true;
        await existingAdmin.save();
        console.log('Droits administrateur mis à jour');
      }
    } else {
      // Créer l'administrateur
      console.log('Création de l\'administrateur...');
      const adminUser = new User({
        email: adminEmail,
        isAdmin: true
      });

      await adminUser.save();
      console.log('Administrateur créé avec succès');
    }
    
    // Vérification finale
    const admin = await User.findOne({ email: adminEmail });
    console.log('État final de l\'administrateur:', {
      exists: !!admin,
      isAdmin: admin?.isAdmin,
      email: admin?.email
    });
    
    await mongoose.connection.close();
    console.log('Connexion à la base de données fermée');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de l\'administrateur:', error);
    try {
      await mongoose.connection.close();
    } catch (err) {
      console.error('Erreur lors de la fermeture de la connexion:', err);
    }
    process.exit(1);
  }
};

initializeAdmin();
