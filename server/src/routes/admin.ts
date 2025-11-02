import express from 'express';
import User from '../models/User';
import Prompt from '../models/Prompt';
import { authenticate, requireRole } from '../middleware/auth';

const router = express.Router();

// Route publique pour vérifier l'existence d'un utilisateur
router.get('/verify-user/:email', authenticate, requireRole('admin'), async (req, res) => {
  try {
    const { email } = req.params;
    console.log('Vérification utilisateur:', email);
    
    const user = await User.findOne({ email });
    console.log('Utilisateur trouvé:', user);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.json({
      success: true,
      data: {
        isAdmin: user.isAdmin,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Erreur vérification utilisateur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// Toutes les routes suivantes nécessitent une authentification et un rôle admin
router.use(authenticate, requireRole('admin'));

// User Management Routes
router.get('/users', async (req, res) => {
  try {
    // Récupérer tous les utilisateurs sauf l'admin principal
    const users = await User.find({
      email: { $ne: 'hello@thirdadvertising.dz' }
    })
    .select('-password -__v')
    .sort({ createdAt: -1 });
    
    // Ajouter l'admin principal au début de la liste
    const adminUser = await User.findOne({ email: 'hello@thirdadvertising.dz' })
      .select('-password -__v');
    
    const allUsers = adminUser ? [adminUser, ...users] : users;
    
    console.log('Nombre d\'utilisateurs trouvés:', allUsers.length);
    res.json({
      success: true,
      data: allUsers
    });
  } catch (error) {
    console.error('Erreur GET /users:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des utilisateurs',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

router.post('/users', async (req, res) => {
  try {
    const { email, name, role, password } = req.body;
    
    // Validation de base
    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email, nom et mot de passe requis'
      });
    }

    // Vérification des doublons
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Cet utilisateur existe déjà'
      });
    }

    // Création de l'utilisateur
    const user = new User({ 
      email,
      name,
      password,
      role: role || 'viewer',
      subscription: {
        plan: 'free',
        status: 'active'
      }
    });
    
    await user.save();

    // Ne pas renvoyer le mot de passe
    const { password: _, ...userResponse } = user.toObject();

    res.status(201).json({
      success: true,
      data: userResponse
    });
  } catch (error) {
    console.error('Erreur POST /users:', error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de l\'utilisateur',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, subscription } = req.body;

    // Empêcher la modification de l'admin principal
    const user = await User.findById(id);
    if (user?.email === 'hello@thirdadvertising.dz') {
      return res.status(403).json({
        success: false,
        message: 'Impossible de modifier l\'administrateur principal'
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        role,
        subscription,
        updatedAt: new Date()
      },
      { new: true }
    ).select('-password -__v');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de l\'utilisateur',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Empêcher la suppression de l'admin principal
    const user = await User.findById(id);
    if (user?.email === 'hello@thirdadvertising.dz') {
      return res.status(403).json({
        success: false,
        message: 'Impossible de supprimer l\'administrateur principal'
      });
    }

    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de l\'utilisateur',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// Prompt Management Routes
router.get('/prompts', async (req, res) => {
  try {
    const prompts = await Prompt.find()
      .select('-__v')
      .sort({ lastModified: -1 });
    
    res.json({
      success: true,
      data: prompts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des prompts',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

router.post('/prompts', async (req, res) => {
  try {
    const { name, category, content, description } = req.body;

    const prompt = new Prompt({
      name,
      category,
      content,
      description,
      modifiedBy: req.user?.email
    });

    await prompt.save();

    res.status(201).json({
      success: true,
      data: prompt
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du prompt',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

router.put('/prompts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content, description } = req.body;

    const prompt = await Prompt.findByIdAndUpdate(
      id,
      {
        content,
        description,
        lastModified: new Date(),
        modifiedBy: req.user?.email
      },
      { new: true }
    );

    if (!prompt) {
      return res.status(404).json({
        success: false,
        message: 'Prompt non trouvé'
      });
    }

    res.json({
      success: true,
      data: prompt
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du prompt',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

router.delete('/prompts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await Prompt.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Prompt non trouvé'
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du prompt',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

export default router;
