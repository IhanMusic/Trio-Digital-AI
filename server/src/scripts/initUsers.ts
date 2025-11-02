import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from '../config/db';
import User from '../models/User';

// Charger les variables d'environnement
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const defaultUsers = [
  { email: 'hello@thirdadvertising.dz', password: 'Admin@2024', name: 'Admin Principal', isAdmin: true },
  { email: 'marketing@thirdadvertising.dz', password: 'Marketing@2024', name: 'Marketing', isAdmin: false },
  { email: 'social@thirdadvertising.dz', password: 'Social@2024', name: 'Social Media', isAdmin: false },
  { email: 'content@thirdadvertising.dz', password: 'Content@2024', name: 'Content Manager', isAdmin: false }
];

const initializeUsers = async () => {
  try {
    console.log('Connexion à la base de données...');
    await connectDB();
    console.log('Connecté à MongoDB');
    
    for (const userData of defaultUsers) {
      // Vérifier si l'utilisateur existe déjà
      console.log(`Vérification de l'existence de ${userData.email}...`);
      const existingUser = await User.findOne({ email: userData.email });
      
      if (existingUser) {
        console.log(`L'utilisateur ${userData.email} existe déjà`);
        if (userData.email === 'hello@thirdadvertising.dz' && !existingUser.isAdmin) {
          console.log('Mise à jour des droits administrateur...');
          existingUser.isAdmin = true;
          await existingUser.save();
          console.log('Droits administrateur mis à jour');
        }
      } else {
        // Créer l'utilisateur
        console.log(`Création de l'utilisateur ${userData.email}...`);
        const user = new User(userData);
        await user.save();
        console.log(`Utilisateur ${userData.email} créé avec succès`);
      }
    }
    
    // Vérification finale
    const users = await User.find();
    console.log('État final des utilisateurs:', users.map(u => ({
      email: u.email,
      isAdmin: u.isAdmin
    })));
    
    await mongoose.connection.close();
    console.log('Connexion à la base de données fermée');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des utilisateurs:', error);
    try {
      await mongoose.connection.close();
    } catch (err) {
      console.error('Erreur lors de la fermeture de la connexion:', err);
    }
    process.exit(1);
  }
};

initializeUsers();
