import express from 'express';
import path from 'path';
import cors from 'cors';
import { authenticate } from '../middleware/auth';
import { ImageCache } from '../models/ImageCache';
import Brand from '../models/Brand';

const router = express.Router();

// Configuration CORS spécifique pour les fichiers statiques
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // Cache les résultats CORS pendant 24h
};

// Middleware CORS pour les fichiers statiques
router.use('/images', cors(corsOptions));

// Middleware pour vérifier l'accès aux images
const verifyImageAccess = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    // Extraire le nom du fichier de l'URL
    const filename = path.basename(req.path);
    if (!filename) {
      return res.status(404).json({
        success: false,
        error: 'Image non trouvée'
      });
    }

    // Chercher l'image dans le cache
    const cacheEntry = await ImageCache.findOne({
      imageUrl: { $regex: filename }
    });

    if (!cacheEntry) {
      return res.status(404).json({
        success: false,
        error: 'Image non trouvée dans le cache'
      });
    }

    // Vérifier que l'utilisateur a accès à la marque associée
    const brand = await Brand.findOne({
      _id: cacheEntry.metadata.brandId,
      'team.userId': req.user?._id
    });

    if (!brand) {
      return res.status(403).json({
        success: false,
        error: 'Accès non autorisé à cette image'
      });
    }

    next();
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'accès à l\'image:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la vérification de l\'accès'
    });
  }
};

// Options pour servir les fichiers statiques
const staticOptions = {
  maxAge: '1d', // Cache côté client pendant 1 jour
  immutable: true,
  lastModified: true,
  etag: true,
  index: false, // Désactiver la liste des fichiers
  fallthrough: false, // Renvoyer 404 si le fichier n'existe pas
  setHeaders: (res: express.Response) => {
    // Permettre la mise en cache par le navigateur
    res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
    // Permettre l'affichage des images dans les balises <img>
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL || 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // Optimiser le chargement des images
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Vary', 'Accept-Encoding');
  }
};

// Route OPTIONS pour le preflight CORS
router.options('/images/*', cors(corsOptions));

// Servir les images statiques depuis le dossier public/images
router.use('/images', express.static(path.join(process.cwd(), 'public', 'images'), staticOptions));

export default router;
