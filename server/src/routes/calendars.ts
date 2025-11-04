import express, { Request, Response, RequestHandler } from 'express';
import { IUser } from '../models/User';
import { authenticate } from '../middleware/auth';
import Calendar from '../models/Calendar';
import Brand from '../models/Brand';
import PostGenerationService from '../services/PostGenerationService';
import EmailService from '../services/EmailService';
import { FileStorageService } from '../services/FileStorageService';
import mongoose from 'mongoose';

const router = express.Router();

// Créer un nouveau calendrier
router.post('/', authenticate, async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Non authentifié'
    });
  }
  try {
    const calendar = new Calendar({
      ...req.body,
      createdBy: req.user._id
    });
    await calendar.save();
    res.status(201).json({
      success: true,
      data: calendar
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// Générer les publications pour un calendrier
router.post('/:id/generate', authenticate, async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Non authentifié'
    });
  }
  try {
    const calendar = await Calendar.findById(req.params.id);
    if (!calendar) {
      return res.status(404).json({
        success: false,
        error: 'Calendrier non trouvé'
      });
    }

    const brand = await Brand.findById(calendar.brandId);
    if (!brand) {
      return res.status(404).json({
        success: false,
        error: 'Marque non trouvée'
      });
    }

    console.log(`\n=== Début de la génération pour le calendrier ${calendar._id} ===`);
    console.log('Marque:', brand.name);
    console.log('Période:', calendar.startDate, 'à', calendar.endDate);

    // Générer les publications
    const posts = await PostGenerationService.generateCalendarPosts(calendar, brand, req.user);

    console.log(`\n=== Fin de la génération ===`);
    console.log(`${posts.length} publications générées`);

    // Vérifier les images générées
    console.log('\nVérification des images générées:');
    for (const post of posts) {
      if (post.content.imageUrl) {
        console.log(`Post ${post._id}: Image URL = ${post.content.imageUrl}`);
        const imageExists = await FileStorageService.verifyImageExists(post.content.imageUrl);
        console.log(`Image existe: ${imageExists}`);
      } else {
        console.log(`Post ${post._id}: Pas d'image générée`);
      }
    }

    // Envoyer l'email de notification "Calendrier prêt" (asynchrone)
    EmailService.sendCalendarReadyEmail(
      req.user.email,
      req.user.name,
      String(calendar._id),
      posts.length,
      brand.name
    ).catch(error => {
      console.error('Erreur lors de l\'envoi de l\'email de notification calendrier:', error);
      // On ne bloque pas la réponse si l'email échoue
    });

    res.status(200).json({
      success: true,
      data: {
        message: 'Publications générées avec succès',
        count: posts.length,
        posts: posts
      }
    });
  } catch (error) {
    console.error('\n=== Erreur lors de la génération ===');
    console.error('Type d\'erreur:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Message:', error instanceof Error ? error.message : error);
    console.error('Stack:', error instanceof Error ? error.stack : 'Pas de stack trace');

    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// Obtenir tous les calendriers
router.get('/', authenticate, async (req: Request, res: Response) => {
  if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Non authentifié'
      });
  }
  try {
    const calendars = await Calendar.find({ createdBy: req.user._id })
      .populate('brandId', 'name')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: calendars
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// Obtenir un calendrier spécifique
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Non authentifié'
    });
  }
  try {
    const calendar = await Calendar.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    }).populate('brandId', 'name');
    
    if (!calendar) {
      return res.status(404).json({
        success: false,
        error: 'Calendrier non trouvé'
      });
    }
    
    res.json({
      success: true,
      data: calendar
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// Copier les comptes de réseaux sociaux d'une marque vers un calendrier
router.post('/:id/copy-social-accounts', authenticate, async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Non authentifié'
    });
  }
  
  try {
    const { brandId } = req.body;
    
    if (!brandId || !mongoose.Types.ObjectId.isValid(brandId)) {
      return res.status(400).json({
        success: false,
        error: 'ID de marque invalide'
      });
    }
    
    // Récupérer le calendrier
    const calendar = await Calendar.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });
    
    if (!calendar) {
      return res.status(404).json({
        success: false,
        error: 'Calendrier non trouvé'
      });
    }
    
    // Récupérer la marque
    const brand = await Brand.findById(brandId);
    
    if (!brand) {
      return res.status(404).json({
        success: false,
        error: 'Marque non trouvée'
      });
    }
    
    // Vérifier que l'utilisateur a accès à cette marque
    if (brand.userId.toString() !== req.user._id.toString() && 
        !brand.team.some(id => id.toString() === req.user?._id.toString())) {
      return res.status(403).json({
        success: false,
        error: 'Vous n\'avez pas accès à cette marque'
      });
    }
    
    // Note: socialMediaAccounts sont maintenant gérés uniquement au niveau du calendrier
    // Pas de copie depuis la marque nécessaire
    await calendar.save();
    
    res.json({
      success: true,
      data: calendar
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// Mettre à jour un calendrier
router.put('/:id', authenticate, async (req: Request, res: Response) => {
  if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Non authentifié'
      });
  }
  try {
    const calendar = await Calendar.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!calendar) {
      return res.status(404).json({
        success: false,
        error: 'Calendrier non trouvé'
      });
    }
    
    res.json({
      success: true,
      data: calendar
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// Supprimer un calendrier
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Non authentifié'
      });
  }
  try {
    const calendar = await Calendar.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });
    
    if (!calendar) {
      return res.status(404).json({
        success: false,
        error: 'Calendrier non trouvé'
      });
    }
    
    res.json({
      success: true,
      data: { message: 'Calendrier supprimé avec succès' }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

export default router;
