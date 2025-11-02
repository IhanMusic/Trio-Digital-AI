import express, { Request, Response } from 'express';
import { Result, IResult } from '../models/Result';
import Brand from '../models/Brand';
import { authenticate } from '../middleware/auth';
import { checkGenerationQuota } from '../middleware/quotas';
import mongoose from 'mongoose';

const router = express.Router();

// Créer ou mettre à jour un résultat
router.post('/', authenticate, checkGenerationQuota, async (req: Request, res: Response) => {
  try {
    const { briefId, brandId } = req.body;

    if (!briefId || !brandId) {
      return res.status(400).json({
        success: false,
        message: 'briefId et brandId sont requis'
      });
    }

    // Vérifier que l'utilisateur a accès à cette marque
    const brand = await Brand.findOne({ _id: brandId, 'team.userId': req.user?._id });
    if (!brand) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé à cette marque'
      });
    }

    const result = await Result.findOneAndUpdate(
      { briefId },
      { ...req.body, userId: req.user?._id },
      { new: true, upsert: true }
    );

    console.log(`POST - Création résultat pour briefId: ${briefId}`);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Erreur lors de la création/mise à jour du résultat:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création/mise à jour du résultat',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// Récupérer un résultat par briefId
router.get('/:briefId', authenticate, async (req: Request, res: Response) => {
  try {
    const { briefId } = req.params;
    console.log(`GET - Recherche résultat pour briefId: ${briefId}`);

    const result = await Result.findOne({ briefId })
      .populate('brandId', 'name')
      .populate('userId', 'name email');
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Résultat non trouvé'
      });
    }

    // Vérifier que l'utilisateur a accès à ce résultat
    const brand = await Brand.findOne({ 
      _id: result.brandId, 
      'team.userId': req.user?._id 
    });
    
    if (!brand) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé à ce résultat'
      });
    }

    console.log('Résultat trouvé avec succès');
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du résultat:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du résultat',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// Mettre à jour un résultat
router.patch('/:briefId', authenticate, async (req: Request, res: Response) => {
  try {
    const { briefId } = req.params;
    console.log(`PATCH - Mise à jour résultat pour briefId: ${briefId}`);
    console.log('Données de mise à jour:', JSON.stringify(req.body, null, 2));

    // Récupérer le résultat existant
    const existingResult = await Result.findOne({ briefId });
    if (!existingResult) {
      return res.status(404).json({
        success: false,
        message: 'Résultat non trouvé'
      });
    }

    // Vérifier que l'utilisateur a accès à ce résultat
    const brand = await Brand.findOne({ 
      _id: existingResult.brandId, 
      'team.userId': req.user?._id 
    });
    
    if (!brand) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé à ce résultat'
      });
    }

    // Si la mise à jour concerne les briefs exécutés
    if (req.body.executedBriefs) {
      // Assurez-vous que chaque brief exécuté a toutes les propriétés requises
      const validExecutedBriefs = req.body.executedBriefs.map((brief: any) => {
        // Créer un nouvel objet avec la structure exacte attendue
        const validBrief = {
          visualPrompt: String(brief.visualPrompt || ''),
          content: {
            main: String(brief.content?.main || ''),
            tagline: String(brief.content?.tagline || ''),
            hashtags: Array.isArray(brief.content?.hashtags) ? brief.content.hashtags.map(String) : [],
            cta: String(brief.content?.cta || ''),
            question: String(brief.content?.question || '')
          },
          specs: {
            format: String(brief.specs?.format || ''),
            dimensions: String(brief.specs?.dimensions || ''),
            altText: String(brief.specs?.altText || '')
          }
        };

        // Ajouter l'image seulement si elle est présente
        if (brief.image) {
          Object.assign(validBrief, {
            image: {
              url: String(brief.image.url || ''),
              alt: String(brief.image.alt || ''),
              type: String(brief.image.type || ''),
              ratio: String(brief.image.ratio || ''),
              quality: String(brief.image.quality || 'high')
            }
          });
        }

        return validBrief;
      });

      // Mettre à jour uniquement les briefs exécutés
      existingResult.set('executedBriefs', validExecutedBriefs);
    } else {
      // Pour les autres mises à jour, utiliser l'approche standard
      Object.assign(existingResult, req.body);
    }

    // Sauvegarder les modifications
    await existingResult.save();

    console.log('Résultat mis à jour avec succès');
    res.json({
      success: true,
      data: existingResult
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du résultat:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du résultat',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

export default router;
