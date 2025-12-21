import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Schéma utilisateur (copié depuis le modèle User)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'owner'], default: 'user' },
  plan: { type: String, enum: ['free', 'starter', 'pro', 'enterprise'], default: 'free' },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function createAdminUser() {
  try {
    // Connexion à MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/trio-digital';
    console.log('🔗 Tentative de connexion à:', mongoUri.replace(/\/\/.*@/, '//***:***@'));
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB');

    // Vérifier si l'utilisateur admin existe déjà
    const existingAdmin = await User.findOne({ email: 'hello@trio.digital' });
    
    if (existingAdmin) {
      console.log('⚠️  L\'utilisateur admin existe déjà');
      
      // Mettre à jour le mot de passe
      const hashedPassword = await bcrypt.hash('Mazouni1990', 12);
      await User.updateOne(
        { email: 'hello@trio.digital' },
        { 
          password: hashedPassword,
          role: 'owner',
          plan: 'enterprise',
          isActive: true,
          updatedAt: new Date()
        }
      );
      console.log('✅ Mot de passe admin mis à jour');
    } else {
      // Créer le nouvel utilisateur admin
      const hashedPassword = await bcrypt.hash('Mazouni1990', 12);
      
      const adminUser = new User({
        name: 'Admin Trio Digital',
        email: 'hello@trio.digital',
        password: hashedPassword,
        role: 'owner',
        plan: 'enterprise',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      await adminUser.save();
      console.log('✅ Utilisateur admin créé avec succès');
    }

    console.log('\n📋 Informations de connexion admin:');
    console.log('Email: hello@trio.digital');
    console.log('Mot de passe: Mazouni1990');
    console.log('Rôle: owner');
    console.log('Plan: enterprise');

    // Fermer la connexion
    await mongoose.connection.close();
    console.log('\n✅ Script terminé avec succès');
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'utilisateur admin:', error);
    process.exit(1);
  }
}

// Exécuter le script
createAdminUser();
