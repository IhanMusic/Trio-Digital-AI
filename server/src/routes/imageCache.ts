import express, { Request, Response } from 'express';
import { ImageCacheService } from '../services/ImageCacheService';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileStorageService } from '../services/FileStorageService';
import fs from 'fs/promises';
import axios from 'axios';
import sharp from 'sharp';
import { authenticate } from '../middleware/auth';
import { checkGenerationQuota } from '../middleware/quotas';
import Brand from '../models/Brand';

const router = express.Router();

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'public', 'images'));
  },
  filename: (req, file, cb) => {
    const ext = '.png';
    cb(null, `${uuidv4()}${ext}`);
  }
});

const upload = multer({ storage });

// Fonction pour télécharger et convertir une image
async function downloadAndConvertImage(imageUrl: string): Promise<Buffer> {
  try {
    console.log('Téléchargement de l\'image depuis:', imageUrl);

    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 10000, // 10 secondes timeout
      maxContentLength: 10 * 1024 * 1024, // 10MB max
      headers: {
        'Accept': 'image/*'
      }
    });

    console.log('Image téléchargée, type:', response.headers['content-type']);
    console.log('Taille:', response.data.length, 'octets');

    // Utiliser sharp pour convertir l'image en PNG
    const sharpInstance = sharp(response.data);
    
    // Obtenir les métadonnées de l'image
    const metadata = await sharpInstance.metadata();
    console.log('Métadonnées de l\'image:', metadata);

    // Convertir en PNG avec des options optimisées
    const pngBuffer = await sharpInstance
      .png({
        quality: 90,
        compressionLevel: 9,
        palette: true
      })
      .toBuffer();

    console.log('Image convertie en PNG, nouvelle taille:', pngBuffer.length, 'octets');

    return pngBuffer;
  } catch (error) {
    console.error('Erreur lors du téléchargement ou de la conversion:', error);
    throw error;
  }
}

// Ajouter une image au cache
router.post('/', authenticate, checkGenerationQuota, upload.none(), async (req: Request, res: Response) => {
  try {
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

    const { imageUrl, imageData: imageDataStr, brandId } = req.body;

    if (!imageUrl || !imageDataStr || !brandId) {
      console.log('Missing required fields:', { imageUrl, imageDataStr, brandId });
      return res.status(400).json({
        success: false,
        error: 'URL d\'image, données d\'image et brandId sont requis'
      });
    }

    // Vérifier que l'utilisateur a accès à cette marque
    const brand = await Brand.findOne({ 
      _id: brandId, 
      'team.userId': req.user?._id 
    });

    if (!brand) {
      return res.status(403).json({
        success: false,
        error: 'Accès non autorisé à cette marque'
      });
    }

    // Construire l'URL complète si c'est une URL relative
    const fullImageUrl = imageUrl.startsWith('http') 
      ? imageUrl 
      : `${req.protocol}://${req.get('host')}${imageUrl}`;

    console.log('URL complète:', fullImageUrl);

    try {
      // Télécharger et convertir l'image
      const pngBuffer = await downloadAndConvertImage(fullImageUrl);

      // Générer un nom de fichier unique
      const filename = `${uuidv4()}.png`;
      const filepath = path.join(process.cwd(), 'public', 'images', filename);

      // Sauvegarder l'image
      await fs.writeFile(filepath, pngBuffer);
      console.log('Image sauvegardée:', filepath);

      const imageData = JSON.parse(imageDataStr);
      const {
        prompt,
        briefId,
        params = {},
        score,
        validation: validationDetails,
        metadata = {}
      } = imageData;

      // Construire l'URL de l'image
      const savedImageUrl = `/images/${filename}`;

      await ImageCacheService.addToCache(
        prompt,
        briefId,
        params,
        savedImageUrl,
        score,
        validationDetails,
        {
          ...metadata,
          brandId,
          userId: req.user?._id
        }
      );

      console.log('Image mise en cache avec succès');
      res.json({ success: true, imageUrl: savedImageUrl });

    } catch (processError: any) {
      console.error('Erreur lors du traitement de l\'image:', processError);
      return res.status(500).json({
        success: false,
        error: `Erreur lors du traitement de l'image: ${processError.message}`
      });
    }

  } catch (error: any) {
    console.error('Erreur lors de l\'ajout au cache:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    res.status(500).json({
      success: false,
      error: error.message || 'Erreur lors de la sauvegarde dans le cache'
    });
  }
});

// Rechercher une image dans le cache
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { prompt, params, metadata, brandId } = req.query;

    if (!prompt || !params || !brandId) {
      return res.status(400).json({
        success: false,
        error: 'Prompt, paramètres et brandId sont requis'
      });
    }

    // Vérifier que l'utilisateur a accès à cette marque
    const brand = await Brand.findOne({ 
      _id: brandId, 
      'team.userId': req.user?._id 
    });

    if (!brand) {
      return res.status(403).json({
        success: false,
        error: 'Accès non autorisé à cette marque'
      });
    }

    const result = await ImageCacheService.findInCache(
      prompt as string,
      JSON.parse(params as string),
      metadata ? {
        ...JSON.parse(metadata as string),
        brandId,
        userId: req.user?._id
      } : {
        brandId,
        userId: req.user?._id
      }
    );

    res.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    console.error('Erreur lors de la recherche dans le cache:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Erreur lors de la recherche dans le cache'
    });
  }
});

// Nettoyer le cache
router.post('/cleanup', authenticate, async (req: Request, res: Response) => {
  try {
    const { olderThanDays, brandId } = req.body;
    
    if (typeof olderThanDays !== 'number' || olderThanDays < 1) {
      return res.status(400).json({
        success: false,
        error: 'olderThanDays doit être un nombre positif'
      });
    }

    if (!brandId) {
      return res.status(400).json({
        success: false,
        error: 'brandId est requis'
      });
    }

    // Vérifier que l'utilisateur a accès à cette marque
    const brand = await Brand.findOne({ 
      _id: brandId, 
      'team.userId': req.user?._id 
    });

    if (!brand) {
      return res.status(403).json({
        success: false,
        error: 'Accès non autorisé à cette marque'
      });
    }

    await ImageCacheService.clearCache(olderThanDays, brandId);
    res.json({ success: true });
  } catch (error: any) {
    console.error('Erreur lors du nettoyage du cache:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Erreur lors du nettoyage du cache'
    });
  }
});

// Obtenir les statistiques du cache
router.get('/stats', authenticate, async (req: Request, res: Response) => {
  try {
    const { brandId } = req.query;

    if (!brandId) {
      return res.status(400).json({
        success: false,
        error: 'brandId est requis'
      });
    }

    // Vérifier que l'utilisateur a accès à cette marque
    const brand = await Brand.findOne({ 
      _id: brandId, 
      'team.userId': req.user?._id 
    });

    if (!brand) {
      return res.status(403).json({
        success: false,
        error: 'Accès non autorisé à cette marque'
      });
    }

    const stats = await ImageCacheService.getStats(brandId as string);
    res.json({
      success: true,
      data: stats
    });
  } catch (error: any) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Erreur lors de la récupération des statistiques'
    });
  }
});

export default router;
