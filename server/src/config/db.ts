import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI n\'est pas définie dans les variables d\'environnement');
    }

    console.log('Tentative de connexion à MongoDB...');
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // Force IPv4
    });

    console.log('MongoDB connecté avec succès');

    // Log de l'état de la connexion
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connecté à MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Erreur de connexion Mongoose:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose déconnecté de MongoDB');
    });

    // Gestion propre de la fermeture
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('Connexion Mongoose fermée suite à l\'arrêt de l\'application');
        process.exit(0);
      } catch (err) {
        console.error('Erreur lors de la fermeture de la connexion:', err);
        process.exit(1);
      }
    });

  } catch (error: any) {
    console.error('Erreur de connexion MongoDB:', {
      message: error.message,
      code: error.code,
      name: error.name
    });
    
    // Sortir du processus en cas d'erreur de connexion
    process.exit(1);
  }
};

export const checkConnection = async () => {
  try {
    const state = mongoose.connection.readyState;
    switch (state) {
      case 0:
        return 'Déconnecté';
      case 1:
        return 'Connecté';
      case 2:
        return 'Connexion en cours';
      case 3:
        return 'Déconnexion en cours';
      default:
        return 'État inconnu';
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de la connexion:', error);
    return 'Erreur';
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB déconnecté avec succès');
  } catch (error) {
    console.error('Erreur lors de la déconnexion MongoDB:', error);
    throw error;
  }
};
