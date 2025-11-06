import express from 'express';
import { authenticate } from '../middleware/auth';
import Veo3Service from '../services/Veo3Service';
import EnhancedVeoService from '../services/EnhancedVeoService';
import Product from '../models/Product';
import Brand from '../models/Brand';
import Calendar from '../models/Calendar';
import { logger } from '../config/logger';
import axios from 'axios';

const router = express.Router();

/**
 * POST /veo3/generate
 * Génère une vidéo intelligente adaptée à la marque et au produit
 */
router.post('/generate', authenticate, async (req, res) => {
  try {
    const {
      prompt,
      brandId,
      productId,
      calendarId,
      postIndex = 0,
      duration = 8,
      aspectRatio = '9:16',
      resolution = '1080p',
      videoType = 'text-to-video',
      numberOfVideos = 1,
      // Fallback vers génération basique si pas de contexte
      useBasicGeneration = false
    } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt requis' });
    }

    // Si contexte marque/produit disponible, utiliser Enhanced VEO
    if (!useBasicGeneration && brandId && productId) {
      logger.info('🎬 Génération vidéo Enhanced VEO démarrée');
      
      // Récupérer les données contextuelles
      const [brand, product, calendar] = await Promise.all([
        Brand.findById(brandId),
        Product.findById(productId),
        calendarId ? Calendar.findById(calendarId) : null
      ]);

      if (!brand || !product) {
        return res.status(404).json({ 
          error: 'Marque ou produit non trouvé' 
        });
      }

      const enhancedVideo = await EnhancedVeoService.generateIntelligentVideo(
        brand,
        product,
        calendar,
        postIndex,
        {
          duration,
          aspectRatio,
          resolution,
          videoType: videoType as any,
          numberOfVideos
        }
      );

      res.json({
        success: true,
        video: enhancedVideo,
        enhanced: true,
        creativeInfo: enhancedVideo.creativeInfo
      });

    } else {
      // Fallback vers génération basique
      logger.info('🎬 Génération vidéo VEO3 basique (fallback)');
      
      const video = await Veo3Service.generateVideo(prompt, {
        duration,
        aspectRatio,
        resolution,
        numberOfVideos
      });

      res.json({
        success: true,
        video,
        enhanced: false
      });
    }

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
 * Anime une image existante avec intelligence créative
 */
router.post('/animate-image', authenticate, async (req, res) => {
  try {
    const {
      prompt,
      imageUrl,
      brandId,
      productId,
      calendarId,
      postIndex = 0,
      duration = 8,
      aspectRatio = '9:16',
      resolution = '1080p',
      useBasicGeneration = false
    } = req.body;

    if (!prompt || !imageUrl) {
      return res.status(400).json({ error: 'Prompt et imageUrl requis' });
    }

    // Télécharger l'image
    const imageResponse = await axios.get(imageUrl, {
      responseType: 'arraybuffer'
    });
    const imageBuffer = Buffer.from(imageResponse.data);

    // Si contexte disponible, utiliser Enhanced VEO
    if (!useBasicGeneration && brandId && productId) {
      logger.info('🎬 Animation d\'image Enhanced VEO démarrée');
      
      const [brand, product, calendar] = await Promise.all([
        Brand.findById(brandId),
        Product.findById(productId),
        calendarId ? Calendar.findById(calendarId) : null
      ]);

      if (!brand || !product) {
        return res.status(404).json({ 
          error: 'Marque ou produit non trouvé' 
        });
      }

      const enhancedVideo = await EnhancedVeoService.generateIntelligentVideo(
        brand,
        product,
        calendar,
        postIndex,
        {
          duration,
          aspectRatio,
          resolution,
          videoType: 'image-to-video',
          startImage: imageBuffer
        }
      );

      res.json({
        success: true,
        video: enhancedVideo,
        enhanced: true,
        creativeInfo: enhancedVideo.creativeInfo
      });

    } else {
      // Fallback vers animation basique
      logger.info('🎬 Animation d\'image basique (fallback)');

      const video = await Veo3Service.generateVideoFromImage(
        prompt,
        imageBuffer,
        {
          duration,
          aspectRatio,
          resolution
        }
      );

      res.json({
        success: true,
        video,
        enhanced: false
      });
    }

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
 * Génère une vidéo intelligente avec images de produits en référence
 */
router.post('/generate-with-products', authenticate, async (req, res) => {
  try {
    const {
      prompt,
      productIds,
      brandId,
      calendarId,
      postIndex = 0,
      duration = 8,
      aspectRatio = '16:9',
      resolution = '1080p',
      useBasicGeneration = false
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

    // Si contexte disponible, utiliser Enhanced VEO
    if (!useBasicGeneration && brandId) {
      logger.info(`🎬 Génération Enhanced VEO avec ${referenceImages.length} images produits`);
      
      const [brand, calendar] = await Promise.all([
        Brand.findById(brandId),
        calendarId ? Calendar.findById(calendarId) : null
      ]);

      if (!brand) {
        return res.status(404).json({ error: 'Marque non trouvée' });
      }

      // Utiliser le premier produit comme produit principal
      const mainProduct = products[0];

      const enhancedVideo = await EnhancedVeoService.generateIntelligentVideo(
        brand,
        mainProduct,
        calendar,
        postIndex,
        {
          duration: 8, // Forcé pour images de référence
          aspectRatio: '16:9', // Forcé pour images de référence
          resolution,
          videoType: 'product-showcase',
          referenceImages
        }
      );

      res.json({
        success: true,
        video: enhancedVideo,
        enhanced: true,
        creativeInfo: enhancedVideo.creativeInfo,
        productsUsed: products.map(p => ({
          id: p._id,
          name: p.name
        }))
      });

    } else {
      // Fallback vers génération basique
      logger.info(`🎬 Génération basique avec ${referenceImages.length} images produits`);

      const video = await Veo3Service.generateVideoWithReferences(
        prompt,
        referenceImages,
        {
          duration: 8,
          aspectRatio: '16:9',
          resolution
        }
      );

      res.json({
        success: true,
        video,
        enhanced: false,
        productsUsed: products.map(p => ({
          id: p._id,
          name: p.name
        }))
      });
    }

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

/**
 * POST /veo3/preview-creative
 * Prévisualise le preset créatif qui sera utilisé pour la génération
 */
router.post('/preview-creative', authenticate, async (req, res) => {
  try {
    const {
      brandId,
      productId,
      calendarId,
      postIndex = 0,
      videoType = 'product-showcase'
    } = req.body;

    if (!brandId || !productId) {
      return res.status(400).json({
        error: 'brandId et productId requis pour la prévisualisation'
      });
    }

    // Récupérer les données contextuelles
    const [brand, product, calendar] = await Promise.all([
      Brand.findById(brandId),
      Product.findById(productId),
      calendarId ? Calendar.findById(calendarId) : null
    ]);

    if (!brand || !product) {
      return res.status(404).json({ 
        error: 'Marque ou produit non trouvé' 
      });
    }

    logger.info('👁️ Prévisualisation preset créatif');

    const preview = await EnhancedVeoService.previewCreativePreset(
      brand,
      product,
      calendar,
      postIndex,
      videoType
    );

    res.json({
      success: true,
      preview: {
        style: preview.style,
        palette: preview.palette,
        context: preview.context,
        lighting: preview.lighting,
        promptPreview: preview.previewPrompt,
        diversityStats: preview.diversityStats,
        brand: {
          name: brand.name,
          sector: brand.sector,
          colors: brand.colors
        },
        product: {
          name: product.name,
          category: product.category
        }
      }
    });

  } catch (error: any) {
    logger.error('❌ Erreur prévisualisation créative:', error);
    res.status(500).json({
      error: 'Erreur lors de la prévisualisation',
      details: error.message
    });
  }
});

/**
 * POST /veo3/generate-diverse
 * Génère plusieurs vidéos avec diversité garantie
 */
router.post('/generate-diverse', authenticate, async (req, res) => {
  try {
    const {
      brandId,
      productId,
      calendarId,
      numberOfVideos = 3,
      duration = 8,
      aspectRatio = '9:16',
      resolution = '1080p',
      videoType = 'product-showcase'
    } = req.body;

    if (!brandId || !productId) {
      return res.status(400).json({
        error: 'brandId et productId requis'
      });
    }

    if (numberOfVideos < 1 || numberOfVideos > 5) {
      return res.status(400).json({
        error: 'numberOfVideos doit être entre 1 et 5'
      });
    }

    // Récupérer les données contextuelles
    const [brand, product, calendar] = await Promise.all([
      Brand.findById(brandId),
      Product.findById(productId),
      calendarId ? Calendar.findById(calendarId) : null
    ]);

    if (!brand || !product) {
      return res.status(404).json({ 
        error: 'Marque ou produit non trouvé' 
      });
    }

    logger.info(`🎬 Génération de ${numberOfVideos} vidéos diversifiées`);

    const diverseVideos = await EnhancedVeoService.generateDiverseVideos(
      brand,
      product,
      calendar,
      numberOfVideos,
      {
        duration,
        aspectRatio,
        resolution,
        videoType: videoType as any
      }
    );

    // Analyser la diversité obtenue
    const styles = new Set(diverseVideos.map(v => v.creativeInfo.selectedStyle));
    const contexts = new Set(diverseVideos.map(v => v.creativeInfo.selectedContext));
    const palettes = new Set(diverseVideos.map(v => v.creativeInfo.selectedPalette));

    res.json({
      success: true,
      videos: diverseVideos,
      diversityAnalysis: {
        uniqueStyles: styles.size,
        uniqueContexts: contexts.size,
        uniquePalettes: palettes.size,
        totalVideos: numberOfVideos,
        diversityScore: Math.round((styles.size + contexts.size + palettes.size) / (numberOfVideos * 3) * 100)
      }
    });

  } catch (error: any) {
    logger.error('❌ Erreur génération vidéos diversifiées:', error);
    res.status(500).json({
      error: 'Erreur lors de la génération diversifiée',
      details: error.message
    });
  }
});

/**
 * POST /veo3/product-demo
 * Génère une vidéo de démonstration produit optimisée
 */
router.post('/product-demo', authenticate, async (req, res) => {
  try {
    const {
      brandId,
      productId,
      calendarId,
      productImageUrls = [],
      duration = 8,
      resolution = '1080p'
    } = req.body;

    if (!brandId || !productId) {
      return res.status(400).json({
        error: 'brandId et productId requis'
      });
    }

    // Récupérer les données contextuelles
    const [brand, product, calendar] = await Promise.all([
      Brand.findById(brandId),
      Product.findById(productId),
      calendarId ? Calendar.findById(calendarId) : null
    ]);

    if (!brand || !product) {
      return res.status(404).json({ 
        error: 'Marque ou produit non trouvé' 
      });
    }

    // Télécharger les images produit si fournies
    let productImages: Buffer[] | undefined;
    if (productImageUrls.length > 0) {
      productImages = [];
      for (const imageUrl of productImageUrls.slice(0, 3)) { // Max 3 images
        try {
          const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer'
          });
          productImages.push(Buffer.from(response.data));
        } catch (error) {
          logger.info(`Image produit non accessible: ${imageUrl}`);
        }
      }
    }

    logger.info('🛍️ Génération démo produit optimisée');

    const productDemo = await EnhancedVeoService.generateProductDemo(
      brand,
      product,
      calendar,
      productImages,
      {
        duration,
        resolution
      }
    );

    res.json({
      success: true,
      video: productDemo,
      demoType: 'product-showcase',
      creativeInfo: productDemo.creativeInfo
    });

  } catch (error: any) {
    logger.error('❌ Erreur génération démo produit:', error);
    res.status(500).json({
      error: 'Erreur lors de la génération démo',
      details: error.message
    });
  }
});

/**
 * POST /veo3/lifestyle
 * Génère une vidéo lifestyle adaptée au secteur
 */
router.post('/lifestyle', authenticate, async (req, res) => {
  try {
    const {
      brandId,
      productId,
      calendarId,
      duration = 8,
      aspectRatio = '9:16',
      resolution = '1080p'
    } = req.body;

    if (!brandId || !productId) {
      return res.status(400).json({
        error: 'brandId et productId requis'
      });
    }

    // Récupérer les données contextuelles
    const [brand, product, calendar] = await Promise.all([
      Brand.findById(brandId),
      Product.findById(productId),
      calendarId ? Calendar.findById(calendarId) : null
    ]);

    if (!brand || !product) {
      return res.status(404).json({ 
        error: 'Marque ou produit non trouvé' 
      });
    }

    logger.info('🌟 Génération vidéo lifestyle');

    const lifestyleVideo = await EnhancedVeoService.generateLifestyleVideo(
      brand,
      product,
      calendar,
      {
        duration,
        aspectRatio,
        resolution
      }
    );

    res.json({
      success: true,
      video: lifestyleVideo,
      videoType: 'lifestyle',
      creativeInfo: lifestyleVideo.creativeInfo
    });

  } catch (error: any) {
    logger.error('❌ Erreur génération vidéo lifestyle:', error);
    res.status(500).json({
      error: 'Erreur lors de la génération lifestyle',
      details: error.message
    });
  }
});

export default router;
