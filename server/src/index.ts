import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { logger } from './config/logger';

// Créer les dossiers nécessaires
logger.info('=== Initialisation des dossiers ===');
const publicDir = path.join(__dirname, '..', 'public');
const imagesDir = path.join(publicDir, 'images');
const tempDir = path.join(__dirname, '..', 'temp');

[publicDir, imagesDir, tempDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    logger.info(`✅ Dossier créé: ${dir}`);
  } else {
    logger.info(`✓ Dossier existant: ${dir}`);
  }
});

// Routes
import aiRouter from './routes/ai';
import imageCacheRouter from './routes/imageCache';
import staticRouter from './routes/static';
import strategyRouter from './routes/strategy';
import resultsRouter from './routes/results';
import authRouter from './routes/auth';
import adminRouter from './routes/admin';
import brandsRouter from './routes/brands';
import calendarsRouter from './routes/calendars';
import postsRouter from './routes/posts';
import productsRouter from './routes/products';
import productIntegrationWithStabilityRouter from './routes/productIntegrationWithStability';
import veo3Router from './routes/veo3';
import downloadRouter from './routes/download';
import campaignsRouter from './routes/campaigns';

// Scripts
import { initFolders } from './scripts/initFolders';

// Configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Vérifier les clés API requises
const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
if (STABILITY_API_KEY) {
  console.log('Stability API Key format:', {
    prefix: STABILITY_API_KEY.substring(0, 7),
    length: STABILITY_API_KEY.length
  });
} else {
  console.error('Stability API Key manquante');
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (OPENAI_API_KEY) {
  console.log('OpenAI API Key format:', {
    prefix: OPENAI_API_KEY.substring(0, 7),
    length: OPENAI_API_KEY.length
  });
} else {
  console.error('OpenAI API Key manquante');
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000 // limite chaque IP à 1000 requêtes par fenêtre
});

// Configuration CORS
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'user-email',
    'Access-Control-Allow-Headers',
    'stability-client-id',
    'stability-client-version',
    'stability-client-user-id'
  ],
  exposedHeaders: ['Content-Disposition'],
  credentials: true
};

// Middlewares de sécurité
app.use(cors(corsOptions));
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "blob:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'", "https://res.cloudinary.com", "blob:"],
      frameSrc: ["'none'"],
    }
  }
})); // Sécurité des en-têtes HTTP
app.use(limiter); // Rate limiting

// Middleware pour parser le JSON et les fichiers
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Logger les configurations
console.log('CORS configuré pour:', corsOptions.origin);
console.log('Headers autorisés:', corsOptions.allowedHeaders);

// Routes publiques
app.use('/api/auth', authRouter);

// Route pour les fichiers statiques
app.use('/', staticRouter);

// Routes protégées
app.use('/api/admin', adminRouter);
app.use('/api/ai', aiRouter);
app.use('/api/brands', brandsRouter);
app.use('/api/image-cache', imageCacheRouter);
app.use('/api/static', staticRouter);
app.use('/api/strategy', strategyRouter);
app.use('/api/results', resultsRouter);
app.use('/api/calendars', calendarsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/products', productsRouter);
app.use('/api/campaigns', campaignsRouter);
app.use('/api/product-integration-stability', productIntegrationWithStabilityRouter);
app.use('/api/veo3', veo3Router);
app.use('/api/download', downloadRouter);

// Health check endpoint pour Render
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Servir le frontend React en production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '..', '..', 'client', 'build');
  
  // Servir les fichiers statiques du build React avec des options de cache
  app.use(express.static(clientBuildPath, {
    maxAge: '1d',
    etag: true,
    lastModified: true,
    index: false,
    setHeaders: (res) => {
      // Cache les assets statiques (images, CSS, JS)
      if (res.req?.path?.match(/\.(jpg|jpeg|png|gif|webp|svg|css|js|ico|woff|woff2|ttf|eot)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=86400');
      }
    }
  }));
  
  // Route catch-all pour le routing côté client React
  app.get('*', (req, res) => {
    // Ne pas intercepter les routes API
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    }
  });
}

// Gestion des erreurs globale
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Une erreur est survenue',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Erreur interne du serveur'
  });
});

// Initialisation des dossiers
initFolders().catch((error: Error) => {
  console.error('Erreur lors de l\'initialisation des dossiers:', error);
  process.exit(1);
});

// Connexion à MongoDB
console.log('Tentative de connexion à MongoDB...');

// Afficher les variables d'environnement (masquées)
console.log('Variables d\'environnement chargées:', {
  STABILITY_API_KEY: STABILITY_API_KEY ? `${STABILITY_API_KEY.substring(0, 6)}...` : '❌',
  OPENAI_API_KEY: OPENAI_API_KEY ? `${OPENAI_API_KEY.substring(0, 6)}...` : '❌',
  PORT: process.env.PORT || '5000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI ? '✓' : '❌'
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-media-manager')
  .then(() => {
    console.log('MongoDB connecté avec succès');
    
    // Démarrer le serveur une fois connecté à MongoDB
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error('Erreur de connexion MongoDB:', error);
    process.exit(1);
  });

// Gestion des erreurs non capturées
process.on('unhandledRejection', (error: Error) => {
  console.error('Erreur non gérée:', error);
  process.exit(1);
});

process.on('uncaughtException', (error: Error) => {
  console.error('Exception non capturée:', error);
  process.exit(1);
});
