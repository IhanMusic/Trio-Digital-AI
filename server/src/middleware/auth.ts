import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User';
import User from '../models/User';
import AuthService from '../services/AuthService';

// Étend l'interface Request pour inclure l'utilisateur
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      token?: string;
    }
  }
}

/**
 * Middleware d'authentification qui vérifie le JWT et ajoute l'utilisateur à la requête
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = AuthService.extractTokenFromHeader(req.header('Authorization'));
    const decoded = AuthService.verifyAccessToken(token);
    
    const user = await User.findById(decoded.userId);
    console.log('Authentification:', {
      userId: decoded.userId,
      userFound: !!user,
      email: decoded.email
    });

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    req.user = user;
    req.token = token;
    console.log('Utilisateur authentifié:', {
      id: user._id,
      email: user.email,
      role: user.role
    });
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error instanceof Error ? error.message : 'Non authentifié'
    });
  }
};

/**
 * Middleware qui vérifie si l'utilisateur a le rôle requis
 */
export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error('Utilisateur non authentifié');
      }

      if (!AuthService.hasRole(req.user, role)) {
        throw new Error('Permissions insuffisantes');
      }

      next();
    } catch (error) {
      res.status(403).json({
        success: false,
        error: error instanceof Error ? error.message : 'Accès refusé'
      });
    }
  };
};

/**
 * Middleware qui vérifie si l'utilisateur est un admin
 */
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new Error('Utilisateur non authentifié');
    }

    if (!req.user.isAdmin) {
      throw new Error('Accès administrateur requis');
    }

    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      error: error instanceof Error ? error.message : 'Accès refusé'
    });
  }
};

/**
 * Middleware de validation des entrées
 */
export const validateRequest = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Données invalides'
      });
    }
  };
};
