import express from 'express';
import { authenticate } from '../middleware/auth';
import Product, { IProduct } from '../models/Product';
import Brand from '../models/Brand';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../public/images');
    // Créer le dossier s'il n'existe pas
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Générer un nom de fichier unique
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

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
 * @desc Créer un nouveau produit
 * @access Private
 */
router.post('/', authenticate, upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'mainImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 10 }
]), async (req: express.Request, res: express.Response) => {
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
    
    // Traiter les fichiers uploadés
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    // Préparer les données du produit
    const productData: any = {
      ...req.body,
      createdBy: req.user?._id
    };
    
    // Ajouter les chemins des images
    if (files.logo && files.logo.length > 0) {
      productData.logo = `/images/${files.logo[0].filename}`;
    }
    
    if (files.mainImage && files.mainImage.length > 0) {
      if (!productData.images) productData.images = {};
      productData.images.main = `/images/${files.mainImage[0].filename}`;
    }
    
    if (files.galleryImages && files.galleryImages.length > 0) {
      if (!productData.images) productData.images = {};
      productData.images.gallery = files.galleryImages.map(file => `/images/${file.filename}`);
    }
    
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
 * @desc Mettre à jour un produit
 * @access Private
 */
router.put('/:id', authenticate, upload.fields([
  { name: 'logo', maxCount: 1 },
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
    
    // Préparer les données du produit
    const productData: any = {
      ...req.body
    };
    
    // Ajouter les chemins des images
    if (files.logo && files.logo.length > 0) {
      productData.logo = `/images/${files.logo[0].filename}`;
    }
    
    if (files.mainImage && files.mainImage.length > 0) {
      if (!productData.images) productData.images = {};
      productData.images = { ...productData.images, main: `/images/${files.mainImage[0].filename}` };
    }
    
    if (files.galleryImages && files.galleryImages.length > 0) {
      if (!productData.images) productData.images = {};
      const galleryImages = files.galleryImages.map(file => `/images/${file.filename}`);
      productData.images = { 
        ...productData.images, 
        gallery: galleryImages 
      };
    }
    
    // Mettre à jour le produit
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      productData,
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
