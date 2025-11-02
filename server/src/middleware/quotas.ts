import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Brand from '../models/Brand';
import Calendar from '../models/Calendar';

interface QuotaLimits {
  [key: string]: {
    generationsPerMonth: number;
    brands: number;
    teamMembers: number;
    calendars: number;
  };
}

const QUOTA_LIMITS: QuotaLimits = {
  free: {
    generationsPerMonth: 10,
    brands: 1,
    teamMembers: 1,
    calendars: 1
  },
  starter: {
    generationsPerMonth: 50,
    brands: 3,
    teamMembers: 3,
    calendars: 5
  },
  pro: {
    generationsPerMonth: 200,
    brands: 10,
    teamMembers: 10,
    calendars: 20
  },
  enterprise: {
    generationsPerMonth: -1, // illimité
    brands: -1,
    teamMembers: -1,
    calendars: -1
  }
};

export const checkGenerationQuota = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new Error('Utilisateur non authentifié');
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    const plan = user.subscription.plan;
    const limit = QUOTA_LIMITS[plan].generationsPerMonth;

    // Si le plan est enterprise ou si la limite est -1, pas de limite
    if (plan === 'enterprise' || limit === -1) {
      return next();
    }

    // Vérifier le nombre de générations du mois en cours
    const brand = await Brand.findById(req.body.brandId);
    if (!brand) {
      throw new Error('Marque non trouvée');
    }

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const lastGeneration = brand.lastGenerationDate ? new Date(brand.lastGenerationDate) : null;

    // Réinitialiser le compteur si on est dans un nouveau mois
    if (!lastGeneration || 
        lastGeneration.getMonth() !== currentMonth || 
        lastGeneration.getFullYear() !== currentYear) {
      brand.contentGenerated = 0;
    }

    if (brand.contentGenerated >= limit) {
      return res.status(429).json({
        success: false,
        message: 'Quota de générations mensuel atteint',
        error: {
          code: 'QUOTA_EXCEEDED',
          limit,
          current: brand.contentGenerated,
          reset: new Date(currentYear, currentMonth + 1, 1)
        }
      });
    }

    // Mettre à jour le compteur et la date de dernière génération
    brand.contentGenerated += 1;
    brand.lastGenerationDate = new Date();
    await brand.save();

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la vérification du quota',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
};

export const checkBrandQuota = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new Error('Utilisateur non authentifié');
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    const plan = user.subscription.plan;
    const limit = QUOTA_LIMITS[plan].brands;

    // Si le plan est enterprise ou si la limite est -1, pas de limite
    if (plan === 'enterprise' || limit === -1) {
      return next();
    }

    const brandCount = await Brand.countDocuments({ userId: user._id });
    if (brandCount >= limit) {
      return res.status(429).json({
        success: false,
        message: 'Quota de marques atteint',
        error: {
          code: 'QUOTA_EXCEEDED',
          limit,
          current: brandCount
        }
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la vérification du quota',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
};

export const checkTeamQuota = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new Error('Utilisateur non authentifié');
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    const plan = user.subscription.plan;
    const limit = QUOTA_LIMITS[plan].teamMembers;

    // Si le plan est enterprise ou si la limite est -1, pas de limite
    if (plan === 'enterprise' || limit === -1) {
      return next();
    }

    const brand = await Brand.findById(req.params.brandId || req.body.brandId);
    if (!brand) {
      throw new Error('Marque non trouvée');
    }

    if (brand.team.length >= limit) {
      return res.status(429).json({
        success: false,
        message: 'Quota de membres d\'équipe atteint',
        error: {
          code: 'QUOTA_EXCEEDED',
          limit,
          current: brand.team.length
        }
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la vérification du quota',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
};

export const checkCalendarQuota = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new Error('Utilisateur non authentifié');
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    const plan = user.subscription.plan;
    const limit = QUOTA_LIMITS[plan].calendars;

    // Si le plan est enterprise ou si la limite est -1, pas de limite
    if (plan === 'enterprise' || limit === -1) {
      return next();
    }

    const brand = await Brand.findById(req.params.brandId || req.body.brandId);
    if (!brand) {
      throw new Error('Marque non trouvée');
    }

    const calendarCount = await Calendar.countDocuments({ brandId: brand._id });
    if (calendarCount >= limit) {
      return res.status(429).json({
        success: false,
        message: 'Quota de calendriers atteint',
        error: {
          code: 'QUOTA_EXCEEDED',
          limit,
          current: calendarCount
        }
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la vérification du quota',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
};
