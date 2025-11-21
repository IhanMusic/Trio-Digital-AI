import express from 'express';
import { authenticate } from '../middleware/auth';
import Campaign, { ICampaign } from '../models/Campaign';
import Brand from '../models/Brand';
import Product from '../models/Product';
import CampaignStrategyService from '../services/CampaignStrategyService';
import { logger } from '../config/logger';

const router = express.Router();

// Middleware d'authentification pour toutes les routes
router.use(authenticate);

/**
 * GET /campaigns
 * Récupérer toutes les campagnes de l'utilisateur
 */
router.get('/', async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Utilisateur non authentifié' });
    }

    const campaigns = await Campaign.find({ createdBy: userId })
      .populate('brandId', 'name sector logo colors')
      .populate('selectedProducts', 'name category description')
      .populate('calendars')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: campaigns,
      count: campaigns.length
    });
  } catch (error: any) {
    logger.error('Erreur récupération campagnes:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des campagnes'
    });
  }
});

/**
 * GET /campaigns/:id
 * Récupérer une campagne spécifique
 */
router.get('/:id', async (req, res) => {
  try {
    const userId = req.user?._id;
    const campaignId = req.params.id;

    const campaign = await Campaign.findOne({
      _id: campaignId,
      createdBy: userId
    })
      .populate('brandId')
      .populate('selectedProducts')
      .populate('calendars');

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campagne non trouvée'
      });
    }

    res.json({
      success: true,
      data: campaign
    });
  } catch (error: any) {
    logger.error('Erreur récupération campagne:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la campagne'
    });
  }
});

/**
 * POST /campaigns
 * Créer une nouvelle campagne avec génération automatique
 */
router.post('/', async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Utilisateur non authentifié' });
    }

    const {
      name,
      description,
      brandId,
      selectedProducts,
      campaignType,
      primaryObjective,
      startDate,
      endDate,
      budget,
      targetAudience
    } = req.body;

    // Validation des champs requis
    if (!name || !description || !brandId || !campaignType || !primaryObjective || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Champs requis manquants'
      });
    }

    // Vérifier que la marque appartient à l'utilisateur
    const brand = await Brand.findOne({ _id: brandId, userId });
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Marque non trouvée'
      });
    }

    // Récupérer les produits sélectionnés
    let products: any[] = [];
    if (selectedProducts && selectedProducts.length > 0) {
      products = await Product.find({
        _id: { $in: selectedProducts },
        brandId: brandId
      });
    }

    logger.info('=== Création de campagne automatisée ===');
    logger.info(`Marque: ${brand.name}, Type: ${campaignType}`);

    // Préparer les données d'entrée pour la génération
    const campaignInput = {
      name,
      description,
      campaignType,
      primaryObjective,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      budget,
      targetAudience: targetAudience || {
        primary: [],
        secondary: [],
        demographics: [],
        interests: [],
        behaviors: []
      }
    };

    // 🚀 GÉNÉRATION AUTOMATIQUE DE LA STRATÉGIE COMPLÈTE
    logger.info('Génération automatique de la stratégie avec GPT-5...');
    const strategy = await CampaignStrategyService.generateCompleteCampaign(
      brand,
      products,
      campaignInput
    );

    // Créer la campagne avec toutes les données générées
    const campaignData = {
      name,
      description,
      brandId,
      selectedProducts: selectedProducts || [],
      campaignType,
      primaryObjective,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      budget: strategy.budgetAllocation,
      
      // Données générées automatiquement
      competitiveContext: strategy.competitiveContext,
      historicalInsights: strategy.historicalInsights,
      legalFramework: strategy.legalFramework,
      targetAudience: {
        ...targetAudience,
        psychographics: strategy.creativeStrategy.emotionalTriggers || [],
        painPoints: [],
        motivations: [],
        preferredChannels: ['instagram', 'facebook']
      },
      
      creativeStrategy: strategy.creativeStrategy,
      differentiationStrategy: {
        uniqueValueProposition: strategy.creativeStrategy.mainMessage,
        competitiveAdvantages: strategy.competitiveContext.competitiveDifferentiation,
        marketPositioning: `${campaignType} positioning`,
        brandPersonality: strategy.creativeStrategy.emotionalTriggers
      },
      
      // Stratégie publicitaire Meta Ads
      advertisingStrategy: {
        metaAds: strategy.metaAdsStrategy,
        googleAds: undefined,
        otherPlatforms: undefined
      },
      
      // Stratégie d'influence
      influencerStrategy: {
        budget: {
          total: strategy.budgetAllocation.influencers || 0,
          allocation: {
            microInfluencers: Math.round((strategy.budgetAllocation.influencers || 0) * 0.6),
            midTierInfluencers: Math.round((strategy.budgetAllocation.influencers || 0) * 0.3),
            macroInfluencers: Math.round((strategy.budgetAllocation.influencers || 0) * 0.1)
          }
        },
        recommendedProfiles: {
          microInfluencers: strategy.influencerRecommendations.filter(p => p.tier === 'micro'),
          midTierInfluencers: strategy.influencerRecommendations.filter(p => p.tier === 'mid'),
          macroInfluencers: strategy.influencerRecommendations.filter(p => p.tier === 'macro')
        },
        contentRequirements: {
          postTypes: ['post', 'story', 'reel'],
          contentGuidelines: strategy.creativeStrategy.contentPillars,
          mandatoryHashtags: [`#${brand.name.toLowerCase().replace(/\s+/g, '')}`],
          brandMentions: [`@${brand.name.toLowerCase().replace(/\s+/g, '')}`],
          deliverables: strategy.campaignPackage.influencerContent.briefingDocuments
        },
        timeline: {
          recruitmentPhase: {
            start: new Date(startDate),
            end: new Date(new Date(startDate).getTime() + 7 * 24 * 60 * 60 * 1000) // +7 jours
          },
          contentCreation: {
            start: new Date(new Date(startDate).getTime() + 7 * 24 * 60 * 60 * 1000),
            end: new Date(new Date(startDate).getTime() + 14 * 24 * 60 * 60 * 1000) // +14 jours
          },
          publicationPhase: {
            start: new Date(new Date(startDate).getTime() + 14 * 24 * 60 * 60 * 1000),
            end: new Date(endDate)
          }
        }
      },
      
      campaignPackage: strategy.campaignPackage,
      calendars: [],
      kpis: strategy.performanceTargets,
      riskManagement: strategy.riskManagement,
      status: 'draft',
      createdBy: userId
    };

    const campaign = await Campaign.create(campaignData);
    
    // Populer les données pour la réponse
    const populatedCampaign = await Campaign.findById(campaign._id)
      .populate('brandId', 'name sector logo colors')
      .populate('selectedProducts', 'name category description');

    logger.info(`✅ Campagne créée avec succès: ${campaign._id}`);
    logger.info(`📊 Stratégie générée: ${strategy.influencerRecommendations.length} influenceurs, budget ${strategy.budgetAllocation.total}€`);

    res.status(201).json({
      success: true,
      data: populatedCampaign,
      message: 'Campagne créée avec succès avec stratégie automatisée'
    });

  } catch (error: any) {
    logger.error('Erreur création campagne:', error.message);
    logger.error('Stack:', error.stack);
    
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la campagne',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * PUT /campaigns/:id
 * Mettre à jour une campagne
 */
router.put('/:id', async (req, res) => {
  try {
    const userId = req.user?._id;
    const campaignId = req.params.id;

    // Vérifier que la campagne appartient à l'utilisateur
    const existingCampaign = await Campaign.findOne({
      _id: campaignId,
      createdBy: userId
    });

    if (!existingCampaign) {
      return res.status(404).json({
        success: false,
        message: 'Campagne non trouvée'
      });
    }

    // Mettre à jour la campagne
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    )
      .populate('brandId', 'name sector logo colors')
      .populate('selectedProducts', 'name category description');

    res.json({
      success: true,
      data: updatedCampaign,
      message: 'Campagne mise à jour avec succès'
    });

  } catch (error: any) {
    logger.error('Erreur mise à jour campagne:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la campagne'
    });
  }
});

/**
 * DELETE /campaigns/:id
 * Supprimer une campagne
 */
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user?._id;
    const campaignId = req.params.id;

    const campaign = await Campaign.findOneAndDelete({
      _id: campaignId,
      createdBy: userId
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campagne non trouvée'
      });
    }

    res.json({
      success: true,
      message: 'Campagne supprimée avec succès'
    });

  } catch (error: any) {
    logger.error('Erreur suppression campagne:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la campagne'
    });
  }
});

/**
 * POST /campaigns/:id/regenerate-strategy
 * Régénérer la stratégie d'une campagne
 */
router.post('/:id/regenerate-strategy', async (req, res) => {
  try {
    const userId = req.user?._id;
    const campaignId = req.params.id;

    const campaign = await Campaign.findOne({
      _id: campaignId,
      createdBy: userId
    }).populate('brandId').populate('selectedProducts');

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campagne non trouvée'
      });
    }

    logger.info(`Régénération de stratégie pour campagne: ${campaign.name}`);

    // Préparer les données pour la régénération
    const campaignInput = {
      name: campaign.name,
      description: campaign.description,
      campaignType: campaign.campaignType,
      primaryObjective: campaign.primaryObjective,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      budget: campaign.budget,
      targetAudience: campaign.targetAudience
    };

    // Régénérer la stratégie
    const newStrategy = await CampaignStrategyService.generateCompleteCampaign(
      campaign.brandId as any,
      campaign.selectedProducts as any,
      campaignInput
    );

    // Mettre à jour la campagne avec la nouvelle stratégie
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      {
        creativeStrategy: newStrategy.creativeStrategy,
        advertisingStrategy: {
          metaAds: newStrategy.metaAdsStrategy
        },
        influencerStrategy: {
          ...campaign.influencerStrategy,
          recommendedProfiles: {
            microInfluencers: newStrategy.influencerRecommendations.filter(p => p.tier === 'micro'),
            midTierInfluencers: newStrategy.influencerRecommendations.filter(p => p.tier === 'mid'),
            macroInfluencers: newStrategy.influencerRecommendations.filter(p => p.tier === 'macro')
          }
        },
        budget: newStrategy.budgetAllocation,
        kpis: newStrategy.performanceTargets,
        updatedAt: new Date()
      },
      { new: true }
    )
      .populate('brandId', 'name sector logo colors')
      .populate('selectedProducts', 'name category description');

    res.json({
      success: true,
      data: updatedCampaign,
      message: 'Stratégie régénérée avec succès'
    });

  } catch (error: any) {
    logger.error('Erreur régénération stratégie:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la régénération de la stratégie'
    });
  }
});

/**
 * GET /campaigns/:id/influencers
 * Récupérer les recommandations d'influenceurs pour une campagne
 */
router.get('/:id/influencers', async (req, res) => {
  try {
    const userId = req.user?._id;
    const campaignId = req.params.id;

    const campaign = await Campaign.findOne({
      _id: campaignId,
      createdBy: userId
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campagne non trouvée'
      });
    }

    const influencers = {
      micro: campaign.influencerStrategy.recommendedProfiles.microInfluencers,
      midTier: campaign.influencerStrategy.recommendedProfiles.midTierInfluencers,
      macro: campaign.influencerStrategy.recommendedProfiles.macroInfluencers,
      budget: campaign.influencerStrategy.budget,
      timeline: campaign.influencerStrategy.timeline
    };

    res.json({
      success: true,
      data: influencers
    });

  } catch (error: any) {
    logger.error('Erreur récupération influenceurs:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des influenceurs'
    });
  }
});

/**
 * GET /campaigns/:id/ads-strategy
 * Récupérer la stratégie publicitaire Meta Ads
 */
router.get('/:id/ads-strategy', async (req, res) => {
  try {
    const userId = req.user?._id;
    const campaignId = req.params.id;

    const campaign = await Campaign.findOne({
      _id: campaignId,
      createdBy: userId
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campagne non trouvée'
      });
    }

    res.json({
      success: true,
      data: campaign.advertisingStrategy
    });

  } catch (error: any) {
    logger.error('Erreur récupération stratégie ads:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la stratégie publicitaire'
    });
  }
});

export default router;
