import express from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/auth';
import Brand from '../models/Brand';
import Post from '../models/Post';
import { CloudinaryService } from '../services/CloudinaryService';

const router = express.Router();

// Configuration multer pour l'upload de fichiers
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers image sont autorisés'));
    }
  }
});

/**
 * @route GET /api/brands/stats
 * @desc Récupérer les statistiques des marques actives
 * @access Private
 */
router.get('/stats', authenticate, async (req: express.Request, res: express.Response) => {
  try {
    // Récupérer toutes les marques de l'utilisateur
    const brands = await Brand.find({ userId: req.user?._id });
    
    // Pour chaque marque, récupérer les statistiques
    const stats = await Promise.all(
      brands.map(async (brand) => {
        // Compter le nombre total de posts
        const postsCount = await Post.countDocuments({ brandId: brand._id });
        
        // Trouver le dernier post
        const lastPost = await Post.findOne({ brandId: brand._id })
          .sort({ createdAt: -1 })
          .select('createdAt');

        return {
          _id: brand._id,
          name: brand.name,
          postsCount,
          lastActivity: lastPost?.createdAt || brand.createdAt
        };
      })
    );

    // Trier par nombre de posts et date de dernière activité
    const sortedStats = stats.sort((a, b) => {
      if (b.postsCount === a.postsCount) {
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
      }
      return b.postsCount - a.postsCount;
    });

    res.json({
      success: true,
      data: sortedStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

/**
 * @route GET /api/brands
 * @desc Récupérer toutes les marques de l'utilisateur
 * @access Private
 */
router.get('/', authenticate, async (req: express.Request, res: express.Response) => {
  try {
    const brands = await Brand.find({ userId: req.user?._id });
    res.json({
      success: true,
      data: brands
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des marques',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

/**
 * @route POST /api/brands
 * @desc Créer une nouvelle marque avec logo optionnel
 * @access Private
 */
router.post('/', authenticate, upload.single('logo'), async (req: express.Request, res: express.Response) => {
  try {
    let brandData;
    
    console.log('🔍 Début création marque...');
    console.log('📁 Fichier reçu:', req.file ? 'Oui' : 'Non');
    console.log('📝 Body reçu:', Object.keys(req.body));
    
    // Si on a des données FormData avec logo
    if (req.file) {
      console.log('📄 Parsing brandData depuis FormData...');
      
      try {
        // Vérifier que brandData existe
        if (!req.body.brandData) {
          throw new Error('brandData manquant dans FormData');
        }
        
        console.log('📄 brandData brut:', req.body.brandData.substring(0, 200) + '...');
        brandData = JSON.parse(req.body.brandData);
        console.log('✅ JSON parsé avec succès');
        
      } catch (parseError) {
        console.error('❌ Erreur parsing JSON:', parseError);
        console.error('📄 brandData reçu:', req.body.brandData);
        
        return res.status(400).json({
          success: false,
          message: 'Erreur de parsing des données du formulaire',
          details: `JSON invalide: ${parseError instanceof Error ? parseError.message : 'Format incorrect'}`,
          error: 'INVALID_JSON_FORMAT'
        });
      }
      
      console.log('🖼️ Upload du logo vers Cloudinary...');
      
      try {
        // Upload et redimensionnement du logo
        const logoResult = await CloudinaryService.uploadImage(req.file.buffer, {
          folder: 'brands/logos',
          transformation: [
            { width: 1080, height: 1080, crop: 'fill', gravity: 'center' },
            { quality: 'auto', format: 'auto' }
          ]
        });
        
        brandData.logo = logoResult.url;
        console.log('✅ Logo uploadé:', logoResult.url);
        
      } catch (cloudinaryError) {
        console.error('❌ Erreur Cloudinary:', cloudinaryError);
        
        return res.status(500).json({
          success: false,
          message: 'Erreur lors de l\'upload du logo',
          details: cloudinaryError instanceof Error ? cloudinaryError.message : 'Erreur Cloudinary inconnue',
          error: 'CLOUDINARY_UPLOAD_FAILED'
        });
      }
      
    } else {
      // Données JSON classiques
      console.log('📝 Données JSON classiques');
      brandData = req.body;
    }

    // Validation des secteurs d'activité
    const validSectors = [
      "Agriculture et Agroalimentaire", "Artisanat et Métiers d'art", "Assurance et Mutuelle",
      "Automobile", "Banque et Finance", "Beauté et Bien-être", "Bâtiment et Construction",
      "Biens de consommation", "Chimie et Pharmaceutique", "Communication et Médias",
      "Divertissement et Culture", "Éducation et Formation", "Énergie et Ressources",
      "Environnement et Développement durable", "FMCG (Fast-Moving Consumer Goods)",
      "Hôtellerie, Restauration et Loisirs", "Immobilier", "Industrie Manufacturière",
      "Informatique et Technologies", "Juridique et Conseil", "Mode et Luxe",
      "ONG et Associations", "Retail et Distribution", "Santé et Services sociaux",
      "Sécurité et Défense", "Services B2B", "Services B2C", "Sport et Fitness",
      "Télécommunications", "Transport et Logistique"
    ];
    
    if (brandData.sector && !validSectors.includes(brandData.sector)) {
      console.error('❌ Secteur invalide:', brandData.sector);
      return res.status(400).json({
        success: false,
        message: 'Secteur d\'activité invalide',
        details: `Le secteur "${brandData.sector}" n'est pas reconnu`,
        error: 'INVALID_SECTOR'
      });
    }

    console.log('💾 Création de la marque en base...');
    console.log('📊 Données finales:', {
      name: brandData.name,
      sector: brandData.sector,
      hasDescription: !!brandData.description,
      hasLogo: !!brandData.logo,
      userId: req.user?._id
    });

    const brand = new Brand({
      ...brandData,
      userId: req.user?._id
    });

    await brand.save();
    console.log('✅ Marque créée avec succès:', brand._id);

    res.status(201).json({
      success: true,
      data: brand
    });
  } catch (error) {
    console.error('❌ Erreur création marque:', error);
    
    let statusCode = 400;
    let message = 'Erreur lors de la création de la marque';
    let details = '';
    let errorCode = 'UNKNOWN_ERROR';
    
    if (error instanceof Error) {
      // Erreurs de validation Mongoose
      if (error.name === 'ValidationError') {
        message = 'Données invalides';
        details = Object.values((error as any).errors).map((err: any) => err.message).join(', ');
        errorCode = 'VALIDATION_ERROR';
      }
      // Erreurs de duplication
      else if (error.message.includes('duplicate key')) {
        message = 'Une marque avec ce nom existe déjà';
        statusCode = 409;
        errorCode = 'DUPLICATE_NAME';
      }
      // Erreurs de token/auth
      else if (error.message.includes('jwt') || error.message.includes('token')) {
        message = 'Session expirée, veuillez vous reconnecter';
        statusCode = 401;
        errorCode = 'AUTH_ERROR';
      }
      // Autres erreurs
      else {
        details = error.message;
      }
    }
    
    res.status(statusCode).json({
      success: false,
      message,
      details,
      errorCode,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

/**
 * @route GET /api/brands/:id
 * @desc Récupérer une marque spécifique
 * @access Private
 */
router.get('/:id', authenticate, async (req: express.Request, res: express.Response) => {
  try {
    const brand = await Brand.findOne({
      _id: req.params.id,
      userId: req.user?._id
    });

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Marque non trouvée'
      });
    }

    res.json({
      success: true,
      data: brand
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la marque',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

/**
 * @route PUT /api/brands/:id
 * @desc Mettre à jour une marque avec logo optionnel
 * @access Private
 */
router.put('/:id', authenticate, upload.single('logo'), async (req: express.Request, res: express.Response) => {
  try {
    let brandData;
    
    // Si on a des données FormData avec logo
    if (req.file) {
      brandData = JSON.parse(req.body.brandData);
      
      // Upload et redimensionnement du logo
      const logoUrl = await CloudinaryService.uploadImage(req.file.buffer, {
        folder: 'brands/logos',
        transformation: [
          { width: 1080, height: 1080, crop: 'fill', gravity: 'center' },
          { quality: 'auto', format: 'auto' }
        ]
      });
      
      brandData.logo = logoUrl;
    } else {
      // Données JSON classiques
      brandData = req.body;
    }

    const brand = await Brand.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user?._id
      },
      brandData,
      { new: true }
    );

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Marque non trouvée'
      });
    }

    res.json({
      success: true,
      data: brand
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la marque',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

/**
 * @route DELETE /api/brands/:id
 * @desc Supprimer une marque
 * @access Private
 */
router.delete('/:id', authenticate, async (req: express.Request, res: express.Response) => {
  try {
    const brand = await Brand.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?._id
    });

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Marque non trouvée'
      });
    }

    res.json({
      success: true,
      message: 'Marque supprimée avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la marque',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

export default router;
