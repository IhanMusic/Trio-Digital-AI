import express from 'express';
import { ProductIntegrationWithStabilityService } from '../services/ProductIntegrationWithStabilityService';
import { authenticate } from '../middleware/auth';
import { checkGenerationQuota } from '../middleware/quotas';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../config/logger';

const router = express.Router();

// Configuration de multer pour le téléchargement de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    // Accepter uniquement les images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seules les images sont acceptées'));
    }
  }
});

/**
 * @route POST /api/product-integration-stability/inpaint
 * @desc Intègre un produit dans une image générée en utilisant l'API Inpaint de Stability AI
 * @access Private
 */
router.post('/inpaint', authenticate, checkGenerationQuota, upload.fields([
  { name: 'productImage', maxCount: 1 },
  { name: 'backgroundImage', maxCount: 1 }
]), async (req, res) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    if (!files.productImage || !files.backgroundImage) {
      return res.status(400).json({ 
        success: false, 
        message: 'Les images du produit et de l\'arrière-plan sont requises' 
      });
    }
    
    const productImagePath = files.productImage[0].path;
    const backgroundImagePath = files.backgroundImage[0].path;
    
    // Options de l'intégration
    const options = {
      prompt: req.body.prompt || 'a product seamlessly integrated into the scene, with matching lighting and perspective',
      negativePrompt: req.body.negativePrompt || 'unrealistic integration, floating objects, mismatched lighting, poor composition',
      stylePreset: req.body.stylePreset || 'photographic',
      productWidth: req.body.productWidth ? parseInt(req.body.productWidth) : undefined,
      productHeight: req.body.productHeight ? parseInt(req.body.productHeight) : undefined
    };
    
    logger.info('Début de l\'intégration du produit avec Inpaint', { 
      userId: req.user?._id.toString(),
      options 
    });
    
    const result = await ProductIntegrationWithStabilityService.integrateProductWithInpaint(
      productImagePath,
      backgroundImagePath,
      options
    );
    
    // Nettoyer les fichiers temporaires
    try {
      fs.unlinkSync(productImagePath);
      fs.unlinkSync(backgroundImagePath);
    } catch (error) {
      logger.error('Erreur lors de la suppression des fichiers temporaires', { error });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Intégration du produit réussie',
      result: {
        imageUrl: result
      }
    });
    
  } catch (error: any) {
    logger.error('Erreur lors de l\'intégration du produit avec Inpaint', { error });
    
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'intégration du produit',
      error: error.message
    });
  }
});

/**
 * @route POST /api/product-integration-stability/search-and-replace
 * @desc Intègre un produit dans une image générée en utilisant l'API Search and Replace de Stability AI
 * @access Private
 */
router.post('/search-and-replace', authenticate, checkGenerationQuota, upload.fields([
  { name: 'productImage', maxCount: 1 },
  { name: 'backgroundImage', maxCount: 1 }
]), async (req, res) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    if (!files.productImage || !files.backgroundImage) {
      return res.status(400).json({ 
        success: false, 
        message: 'Les images du produit et de l\'arrière-plan sont requises' 
      });
    }
    
    const productImagePath = files.productImage[0].path;
    const backgroundImagePath = files.backgroundImage[0].path;
    
    // Options de l'intégration
    const options = {
      searchPrompt: req.body.searchPrompt || 'object',
      prompt: req.body.prompt || 'a product with realistic lighting and perspective',
      negativePrompt: req.body.negativePrompt || 'unrealistic integration, floating objects, mismatched lighting, poor composition',
      stylePreset: req.body.stylePreset || 'photographic'
    };
    
    logger.info('Début de l\'intégration du produit avec Search and Replace', { 
      userId: req.user?._id.toString(),
      options 
    });
    
    const result = await ProductIntegrationWithStabilityService.integrateProductWithSearchAndReplace(
      productImagePath,
      backgroundImagePath,
      options
    );
    
    // Nettoyer les fichiers temporaires
    try {
      fs.unlinkSync(productImagePath);
      fs.unlinkSync(backgroundImagePath);
    } catch (error) {
      logger.error('Erreur lors de la suppression des fichiers temporaires', { error });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Intégration du produit réussie',
      result: {
        imageUrl: result
      }
    });
    
  } catch (error: any) {
    logger.error('Erreur lors de l\'intégration du produit avec Search and Replace', { error });
    
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'intégration du produit',
      error: error.message
    });
  }
});

/**
 * @route POST /api/product-integration-stability/advanced
 * @desc Intègre un produit dans une image générée en utilisant une méthode avancée
 * @access Private
 */
router.post('/advanced', authenticate, checkGenerationQuota, upload.fields([
  { name: 'productImage', maxCount: 1 },
  { name: 'backgroundImage', maxCount: 1 }
]), async (req, res) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    if (!files.productImage || !files.backgroundImage) {
      return res.status(400).json({ 
        success: false, 
        message: 'Les images du produit et de l\'arrière-plan sont requises' 
      });
    }
    
    const productImagePath = files.productImage[0].path;
    const backgroundImagePath = files.backgroundImage[0].path;
    
    // Options de l'intégration
    const options = {
      method: req.body.method as 'inpaint' | 'search-and-replace' || 'inpaint',
      searchPrompt: req.body.searchPrompt,
      prompt: req.body.prompt || 'a product seamlessly integrated into the scene, with matching lighting and perspective',
      negativePrompt: req.body.negativePrompt || 'unrealistic integration, floating objects, mismatched lighting, poor composition',
      stylePreset: req.body.stylePreset || 'photographic',
      productWidth: req.body.productWidth ? parseInt(req.body.productWidth) : undefined,
      productHeight: req.body.productHeight ? parseInt(req.body.productHeight) : undefined
    };
    
    logger.info('Début de l\'intégration avancée du produit', { 
      userId: req.user?._id.toString(),
      options 
    });
    
    const result = await ProductIntegrationWithStabilityService.integrateProductAdvanced(
      productImagePath,
      backgroundImagePath,
      options
    );
    
    // Nettoyer les fichiers temporaires
    try {
      fs.unlinkSync(productImagePath);
      fs.unlinkSync(backgroundImagePath);
    } catch (error) {
      logger.error('Erreur lors de la suppression des fichiers temporaires', { error });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Intégration du produit réussie',
      result: {
        imageUrl: result
      }
    });
    
  } catch (error: any) {
    logger.error('Erreur lors de l\'intégration avancée du produit', { error });
    
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'intégration du produit',
      error: error.message
    });
  }
});

export default router;
