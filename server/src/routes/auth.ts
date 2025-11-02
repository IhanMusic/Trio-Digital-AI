import express from 'express';
import { body } from 'express-validator';
import User, { IUserDocument } from '../models/User';
import AuthService from '../services/AuthService';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Validation des données d'inscription
const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Email invalide')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error('Cet email est déjà utilisé');
      }
      return true;
    }),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Le mot de passe doit contenir au moins 8 caractères')
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/)
    .withMessage('Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre'),
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Le nom doit contenir au moins 2 caractères')
];

// Validation des données de connexion
const loginValidation = [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').notEmpty().withMessage('Le mot de passe est requis')
];

/**
 * @route POST /api/auth/register
 * @desc Inscription d'un nouvel utilisateur
 * @access Public
 */
router.post('/register', registerValidation, async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, name } = req.body;

    const user = new User({
      email,
      password,
      name,
      role: 'owner', // Premier utilisateur = propriétaire
      subscription: {
        plan: 'free',
        status: 'active'
      }
    });

    await user.save();

    const tokens = AuthService.generateAuthTokens(user);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      }
    });
  } catch (error) {
    // Gestion spécifique de l'erreur de doublon d'email
    if (
      typeof error === 'object' && 
      error !== null && 
      'code' in error && 
      error.code === 11000 && 
      'keyPattern' in error &&
      typeof error.keyPattern === 'object' &&
      error.keyPattern !== null &&
      'email' in error.keyPattern
    ) {
      return res.status(400).json({
        success: false,
        error: 'Un compte existe déjà avec cet email'
      });
    }

    // Autres erreurs
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur lors de l\'inscription'
    });
  }
});

/**
 * @route POST /api/auth/login
 * @desc Connexion d'un utilisateur
 * @access Public
 */
router.post('/login', loginValidation, async (req: express.Request, res: express.Response) => {
  try {
    console.log('Tentative de connexion pour:', req.body.email);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log('Utilisateur non trouvé');
      throw new Error('Email ou mot de passe incorrect');
    }

    console.log('Utilisateur trouvé, vérification du mot de passe');
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      console.log('Mot de passe invalide');
      throw new Error('Email ou mot de passe incorrect');
    }
    console.log('Mot de passe valide');

    // Mise à jour de la dernière connexion
    user.lastLogin = new Date();
    await user.save();

    const tokens = AuthService.generateAuthTokens(user);

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur lors de la connexion'
    });
  }
});

/**
 * @route POST /api/auth/refresh-token
 * @desc Rafraîchit l'access token
 * @access Public
 */
router.post('/refresh-token', async (req: express.Request, res: express.Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new Error('Refresh token manquant');
    }

    const decoded = AuthService.verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    const accessToken = AuthService.refreshAccessToken(refreshToken);

    res.json({
      success: true,
      data: { accessToken }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur lors du rafraîchissement du token'
    });
  }
});

/**
 * @route POST /api/auth/logout
 * @desc Déconnexion de l'utilisateur
 * @access Private
 */
router.post('/logout', authenticate, async (req: express.Request, res: express.Response) => {
  try {
    // Ici, vous pourriez implémenter une liste noire de tokens
    // ou simplement supprimer le refresh token côté client
    res.json({
      success: true,
      message: 'Déconnexion réussie'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur lors de la déconnexion'
    });
  }
});

/**
 * @route GET /api/auth/me
 * @desc Récupère les informations de l'utilisateur connecté
 * @access Private
 */
/**
 * @route PUT /api/auth/update-profile
 * @desc Met à jour le profil de l'utilisateur
 * @access Private
 */
router.put('/update-profile', authenticate, [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Le nom doit contenir au moins 2 caractères'),
  body('email')
    .isEmail()
    .withMessage('Email invalide')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email, _id: { $ne: req.user?._id } });
      if (user) {
        throw new Error('Cet email est déjà utilisé');
      }
      return true;
    })
], async (req: express.Request, res: express.Response) => {
  try {
    const { name, email } = req.body;
    const user = req.user as IUserDocument;

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    user.name = name;
    user.email = email;
    await user.save();

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          subscription: user.subscription
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur lors de la mise à jour du profil'
    });
  }
});

/**
 * @route PUT /api/auth/change-password
 * @desc Change le mot de passe de l'utilisateur
 * @access Private
 */
router.put('/change-password', authenticate, async (req: express.Request, res: express.Response) => {
  console.log('Requête de changement de mot de passe reçue');
  
  try {
    const { currentPassword, newPassword } = req.body;
    const user = req.user as IUserDocument;

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    console.log('Vérification du mot de passe actuel');
    const isValidPassword = await user.comparePassword(currentPassword);
    if (!isValidPassword) {
      console.log('Mot de passe actuel incorrect');
      return res.status(400).json({
        success: false,
        error: 'Mot de passe actuel incorrect'
      });
    }

    console.log('Mise à jour du mot de passe');
    user.password = newPassword;
    await user.save();

    console.log('Mot de passe mis à jour avec succès');
    res.json({
      success: true,
      message: 'Mot de passe modifié avec succès'
    });
  } catch (error) {
    console.error('Erreur lors du changement de mot de passe:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur lors du changement de mot de passe'
    });
  }
});

/**
 * @route POST /api/auth/forgot-password
 * @desc Demande de réinitialisation de mot de passe
 * @access Public
 */
router.post('/forgot-password', [
  body('email').isEmail().withMessage('Email invalide')
], async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      // Pour des raisons de sécurité, on renvoie toujours un succès
      return res.json({
        success: true,
        message: 'Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.'
      });
    }

    const resetToken = AuthService.generatePasswordResetToken(user._id.toString(), user.email);

    // TODO: Envoyer l'email avec le token
    // Pour le moment, on renvoie le token dans la réponse pour le développement
    res.json({
      success: true,
      message: 'Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.',
      data: {
        resetToken // À retirer en production
      }
    });
  } catch (error) {
    console.error('Erreur lors de la demande de réinitialisation:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la demande de réinitialisation'
    });
  }
});

/**
 * @route POST /api/auth/reset-password
 * @desc Réinitialisation du mot de passe avec un token
 * @access Public
 */
router.post('/reset-password', [
  body('token').notEmpty().withMessage('Token requis'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('Le nouveau mot de passe doit contenir au moins 8 caractères')
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/)
    .withMessage('Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre')
], async (req: express.Request, res: express.Response) => {
  try {
    const { token, newPassword } = req.body;
    
    // Vérifie et décode le token
    const decoded = AuthService.verifyPasswordResetToken(token);
    
    // Trouve l'utilisateur
    const user = await User.findById(decoded.userId);
    if (!user || user.email !== decoded.email) {
      throw new Error('Utilisateur non trouvé');
    }

    // Met à jour le mot de passe
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Mot de passe réinitialisé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur lors de la réinitialisation du mot de passe'
    });
  }
});

/**
 * @route PUT /api/auth/update-user
 * @desc Met à jour les informations de l'utilisateur (y compris la facturation)
 * @access Private
 */
router.put('/update-user', authenticate, async (req: express.Request, res: express.Response) => {
  try {
    const user = req.user as IUserDocument;
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Mise à jour des informations de facturation
    if (req.body.billingInfo) {
      user.billingInfo = {
        type: req.body.billingInfo.type,
        ...(req.body.billingInfo.type === 'company' ? {
          company: {
            registrationNumber: req.body.billingInfo.company.registrationNumber,
            taxId: req.body.billingInfo.company.taxId,
            statisticalId: req.body.billingInfo.company.statisticalId,
            articleCode: req.body.billingInfo.company.articleCode,
          }
        } : {
          individual: {
            fullName: req.body.billingInfo.individual.fullName,
            billingAddress: req.body.billingInfo.individual.billingAddress,
          }
        })
      };
    }

    await user.save();

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          subscription: user.subscription,
          billingInfo: user.billingInfo
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur lors de la mise à jour'
    });
  }
});

router.get('/me', authenticate, async (req: express.Request, res: express.Response) => {
  try {
    const user = req.user;
    res.json({
      success: true,
      data: {
        user: {
          id: user?._id,
          email: user?.email,
          name: user?.name,
          role: user?.role,
          subscription: user?.subscription,
          billingInfo: user?.billingInfo
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur lors de la récupération des informations'
    });
  }
});

export default router;
