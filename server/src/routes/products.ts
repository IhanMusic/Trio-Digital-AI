import express from 'express';
import { authenticate } from '../middleware/auth';
import Product, { IProduct } from '../models/Product';
import Brand from '../models/Brand';
import mongoose from 'mongoose';
import multer from 'multer';
import { FileStorageService } from '../services/FileStorageService';
import { logger } from '../config/logger';

// Configuration de multer pour stocker en mémoire
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Limite de 10MB
  }
});

const router = express.Router();

/**
 * @route GET /api/products
 * @desc Récupérer tous les produits de l'utilisateur
 * @access Private
 */
router.get('/', authenticate, async (req: express.Request, res: express.Response) => {
  try {
    // Récupérer les marques de l'utilisateur
    const brands = await Brand.find({ 
      $or: [
        { userId: req.user?._id },
        { team: req.user?._id }
      ]
    }).select('_id');
    
    const brandIds = brands.map(brand => brand._id);
    
    // Récupérer les produits associés à ces marques
    const products = await Product.find({ brandId: { $in: brandIds } })
      .populate('brandId', 'name')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des produits',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

/**
 * @route GET /api/products/brand/:brandId
 * @desc Récupérer tous les produits d'une marque spécifique
 * @access Private
 */
router.get('/brand/:brandId', authenticate, async (req: express.Request, res: express.Response) => {
  try {
    const { brandId } = req.params;
    
    // Vérifier que l'utilisateur a accès à cette marque
    const brand = await Brand.findOne({
      _id: brandId,
      $or: [
        { userId: req.user?._id },
        { team: req.user?._id }
      ]
    });
    
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Marque non trouvée ou accès non autorisé'
      });
    }
    
    // Récupérer les produits de cette marque
    const products = await Product.find({ brandId })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des produits',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

/**
 * @route GET /api/products/:id
 * @desc Récupérer un produit spécifique
 * @access Private
 */
router.get('/:id', authenticate, async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    
    // Récupérer le produit
    const product = await Product.findById(id)
      .populate('brandId', 'name userId team');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }
    
    // Vérifier que l'utilisateur a accès à ce produit
    const brand = product.brandId as any;
    if (brand.userId.toString() !== req.user?._id.toString() && 
        !brand.team.includes(req.user?._id)) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé à ce produit'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du produit',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

/**
 * @route POST /api/products
 * @desc Créer un nouveau produit (données JSON uniquement)
 * @access Private
 */
router.post('/', authenticate, async (req: express.Request, res: express.Response) => {
  try {
    const { brandId } = req.body;
    
    // Vérifier que l'utilisateur a accès à cette marque
    const brand = await Brand.findOne({
      _id: brandId,
      $or: [
        { userId: req.user?._id },
        { team: req.user?._id }
      ]
    });
    
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Marque non trouvée ou accès non autorisé'
      });
    }
    
    // Préparer les données du produit
    const productData: any = {
      ...req.body,
      createdBy: req.user?._id
    };
    
    // Créer le produit
    const product = new Product(productData);
    
    await product.save();
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    // Gérer l'erreur de duplication (nom de produit déjà utilisé pour cette marque)
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        success: false,
        message: 'Validation échouée',
        error: error.message
      });
    }
    
    if (error instanceof Error && error.name === 'MongoError' && (error as any).code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Un produit avec ce nom existe déjà pour cette marque'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du produit',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

/**
 * @route PUT /api/products/:id
 * @desc Mettre à jour un produit (données JSON uniquement)
 * @access Private
 */
router.put('/:id', authenticate, async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    
    // Récupérer le produit
    const product = await Product.findById(id)
      .populate('brandId', 'userId team');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }
    
    // Vérifier que l'utilisateur a accès à ce produit
    const brand = product.brandId as any;
    if (brand.userId.toString() !== req.user?._id.toString() && 
        !brand.team.includes(req.user?._id)) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé à ce produit'
      });
    }
    
    // Mettre à jour le produit avec les données JSON
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    // Gérer l'erreur de duplication (nom de produit déjà utilisé pour cette marque)
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        success: false,
        message: 'Validation échouée',
        error: error.message
      });
    }
    
    if (error instanceof Error && error.name === 'MongoError' && (error as any).code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Un produit avec ce nom existe déjà pour cette marque'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du produit',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

/**
 * @route POST /api/products/:id/images
 * @desc Uploader des images pour un produit existant
 * @access Private
 */
router.post('/:id/images', authenticate, upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 10 }
]), async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    
    // Récupérer le produit
    const product = await Product.findById(id)
      .populate('brandId', 'userId team');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }
    
    // Vérifier que l'utilisateur a accès à ce produit
    const brand = product.brandId as any;
    if (brand.userId.toString() !== req.user?._id.toString() && 
        !brand.team.includes(req.user?._id)) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé à ce produit'
      });
    }
    
    // Traiter les fichiers uploadés
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const updateData: any = {};
    
    // Uploader l'image principale
    if (files.mainImage && files.mainImage.length > 0) {
      logger.info('Upload de l\'image principale vers Cloudinary...');
      const { url } = await FileStorageService.saveImage(files.mainImage[0].buffer, {
        purpose: 'product',
        useCloudinary: true
      });
      updateData['images.main'] = url;
      logger.info('Image principale uploadée:', url);
    }
    
    // Uploader les images de galerie
    if (files.galleryImages && files.galleryImages.length > 0) {
      logger.info(`Upload de ${files.galleryImages.length} images de galerie vers Cloudinary...`);
      const galleryUrls = await Promise.all(
        files.galleryImages.map(async (file) => {
          const { url } = await FileStorageService.saveImage(file.buffer, {
            purpose: 'product',
            useCloudinary: true
          });
          return url;
        })
      );
      // Ajouter les nouvelles images à la galerie existante
      const existingGallery = product.images?.gallery || [];
      updateData['images.gallery'] = [...existingGallery, ...galleryUrls];
      logger.info('Images de galerie uploadées');
    }
    
    // Mettre à jour le produit avec les nouvelles URLs d'images
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    
    res.json({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'upload des images',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

/**
 * @route DELETE /api/products/:id
 * @desc Supprimer un produit
 * @access Private
 */
router.delete('/:id', authenticate, async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    
    // Récupérer le produit
    const product = await Product.findById(id)
      .populate('brandId', 'userId team');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }
    
    // Vérifier que l'utilisateur a accès à ce produit
    const brand = product.brandId as any;
    if (brand.userId.toString() !== req.user?._id.toString() && 
        !brand.team.includes(req.user?._id)) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé à ce produit'
      });
    }
    
    // Supprimer le produit
    await Product.findByIdAndDelete(id);
    
    res.json({
      success: true,
      message: 'Produit supprimé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du produit',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

export default router;
