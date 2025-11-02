import express from 'express';
import { authenticate } from '../middleware/auth';
import Veo3Service from '../services/Veo3Service';
import Product from '../models/Product';
import { logger } from '../config/logger';
import axios from 'axios';

const router = express.Router();

/**
 * POST /veo3/generate
 * Génère une vidéo à partir d'un prompt texte
 */
router.post('/generate', authenticate, async (req, res) => {
  try {
    const {
      prompt,
      duration = 8,
      aspectRatio = '9:16',
      resolution = '1080p',
      negativePrompt,
      numberOfVideos = 1
    } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt requis' });
    }

    logger.info('🎬 Génération vidéo VEO3 démarrée');
    
    const video = await Veo3Service.generateVideo(prompt, {
      duration,
      aspectRatio,
      resolution,
      negativePrompt,
      numberOfVideos
    });

    res.json({
      success: true,
      video
    });

  } catch (error: any) {
    logger.error('❌ Erreur génération vidéo:', error);
    res.status(500).json({
      error: 'Erreur lors de la génération vidéo',
      details: error.message
    });
  }
});

/**
 * POST /veo3/animate-image
 * Anime une image existante (image-to-video)
 */
router.post('/animate-image', authenticate, async (req, res) => {
  try {
    const {
      prompt,
      imageUrl,
      duration = 8,
      aspectRatio = '9:16',
      resolution = '1080p',
      negativePrompt
    } = req.body;

    if (!prompt || !imageUrl) {
      return res.status(400).json({ error: 'Prompt et imageUrl requis' });
    }

    // Télécharger l'image
    const imageResponse = await axios.get(imageUrl, {
      responseType: 'arraybuffer'
    });
    const imageBuffer = Buffer.from(imageResponse.data);

    logger.info('🎬 Animation d\'image démarrée');

    const video = await Veo3Service.generateVideoFromImage(
      prompt,
      imageBuffer,
      {
        duration,
        aspectRatio,
        resolution,
        negativePrompt
      }
    );

    res.json({
      success: true,
      video
    });

  } catch (error: any) {
    logger.error('❌ Erreur animation image:', error);
    res.status(500).json({
      error: 'Erreur lors de l\'animation',
      details: error.message
    });
  }
});

/**
 * POST /veo3/generate-with-products
 * Génère une vidéo avec des images de produits en référence
 */
router.post('/generate-with-products', authenticate, async (req, res) => {
  try {
    const {
      prompt,
      productIds,
      duration = 8,
      aspectRatio = '16:9',
      resolution = '1080p',
      negativePrompt
    } = req.body;

    if (!prompt || !productIds || productIds.length === 0) {
      return res.status(400).json({
        error: 'Prompt et productIds requis (1-3 produits)'
      });
    }

    if (productIds.length > 3) {
      return res.status(400).json({
        error: 'Maximum 3 produits pour les références'
      });
    }

    // Récupérer les produits
    const products = await Product.find({
      _id: { $in: productIds }
    });

    if (products.length === 0) {
      return res.status(404).json({ error: 'Aucun produit trouvé' });
    }

    // Récupérer les images produits
    const referenceImages: Buffer[] = [];
    for (const product of products) {
      if (product.images?.main) {
        try {
          const response = await axios.get(product.images.main, {
            responseType: 'arraybuffer'
          });
          referenceImages.push(Buffer.from(response.data));
        } catch (error) {
          logger.info(`Image produit ${product._id} non accessible`);
        }
      }
    }

    if (referenceImages.length === 0) {
      return res.status(400).json({
        error: 'Aucune image produit accessible'
      });
    }

    logger.info(`🎬 Génération vidéo avec ${referenceImages.length} images produits`);

    const video = await Veo3Service.generateVideoWithReferences(
      prompt,
      referenceImages,
      {
        duration: 8, // Forcé pour images de référence
        aspectRatio: '16:9', // Forcé pour images de référence
        resolution,
        negativePrompt
      }
    );

    res.json({
      success: true,
      video,
      productsUsed: products.map(p => ({
        id: p._id,
        name: p.name
      }))
    });

  } catch (error: any) {
    logger.error('❌ Erreur génération avec produits:', error);
    res.status(500).json({
      error: 'Erreur lors de la génération avec produits',
      details: error.message
    });
  }
});

/**
 * POST /veo3/interpolate
 * Génère une vidéo par interpolation entre deux images
 */
router.post('/interpolate', authenticate, async (req, res) => {
  try {
    const {
      prompt,
      startImageUrl,
      endImageUrl,
      duration = 8,
      aspectRatio = '16:9',
      resolution = '1080p',
      negativePrompt
    } = req.body;

    if (!prompt || !startImageUrl || !endImageUrl) {
      return res.status(400).json({
        error: 'Prompt, startImageUrl et endImageUrl requis'
      });
    }

    // Télécharger les deux images
    const [startResponse, endResponse] = await Promise.all([
      axios.get(startImageUrl, { responseType: 'arraybuffer' }),
      axios.get(endImageUrl, { responseType: 'arraybuffer' })
    ]);

    const startImage = Buffer.from(startResponse.data);
    const endImage = Buffer.from(endResponse.data);

    logger.info('🎬 Interpolation vidéo démarrée');

    const video = await Veo3Service.generateVideoWithInterpolation(
      prompt,
      startImage,
      endImage,
      {
        duration: 8, // Forcé pour interpolation
        aspectRatio,
        resolution,
        negativePrompt
      }
    );

    res.json({
      success: true,
      video
    });

  } catch (error: any) {
    logger.error('❌ Erreur interpolation:', error);
    res.status(500).json({
      error: 'Erreur lors de l\'interpolation',
      details: error.message
    });
  }
});

/**
 * POST /veo3/extend
 * Étend une vidéo existante de 7 secondes
 */
router.post('/extend', authenticate, async (req, res) => {
  try {
    const {
      prompt,
      videoUrl,
      resolution = '720p',
      negativePrompt
    } = req.body;

    if (!prompt || !videoUrl) {
      return res.status(400).json({
        error: 'Prompt et videoUrl requis'
      });
    }

    // Télécharger la vidéo
    const videoResponse = await axios.get(videoUrl, {
      responseType: 'arraybuffer'
    });
    const videoBuffer = Buffer.from(videoResponse.data);

    logger.info('🎬 Extension vidéo démarrée');

    const video = await Veo3Service.extendVideo(
      videoBuffer,
      prompt,
      {
        resolution: '720p', // Forcé pour extension
        negativePrompt
      }
    );

    res.json({
      success: true,
      video,
      note: 'Vidéo étendue de 7 secondes supplémentaires'
    });

  } catch (error: any) {
    logger.error('❌ Erreur extension vidéo:', error);
    res.status(500).json({
      error: 'Erreur lors de l\'extension',
      details: error.message
    });
  }
});

export default router;
