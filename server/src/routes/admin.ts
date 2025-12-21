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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const sortBy = req.query.sortBy as string || 'createdAt';
    const sortOrder = req.query.sortOrder as string || 'desc';
    const search = req.query.search as string || '';
    const role = req.query.role as string || '';
    const plan = req.query.plan as string || '';

    // Construire le filtre de recherche
    const filter: any = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role && role !== 'all') {
      filter.role = role;
    }
    
    if (plan && plan !== 'all') {
      filter.plan = plan;
    }

    // Calculer le skip pour la pagination
    const skip = (page - 1) * limit;

    // Construire l'objet de tri
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Récupérer les utilisateurs avec pagination
    const users = await User.find(filter)
      .select('-password -__v')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // Compter le total d'utilisateurs
    const total = await User.countDocuments(filter);
    
    console.log('Nombre d\'utilisateurs trouvés:', total);
    
    res.json({
      success: true,
      data: {
        users,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
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
    if (user?.email === 'hello@trio.digital') {
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
    if (user?.email === 'hello@trio.digital') {
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

// Statistics Routes
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ role: { $in: ['admin', 'owner'] } });
    const totalPrompts = await Prompt.countDocuments();

    // Statistiques par plan
    const planStats = await User.aggregate([
      { $group: { _id: '$plan', count: { $sum: 1 } } }
    ]);

    // Statistiques par rôle
    const roleStats = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    // Nouveaux utilisateurs ce mois
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: startOfMonth }
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        adminUsers,
        totalPrompts,
        newUsersThisMonth,
        planDistribution: planStats,
        roleDistribution: roleStats
      }
    });
  } catch (error) {
    console.error('Erreur GET /stats:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// System Metrics Routes
router.get('/metrics', async (req, res) => {
  try {
    const metrics = [
      {
        name: 'CPU Usage',
        value: Math.floor(Math.random() * 100),
        unit: '%',
        status: 'healthy',
        timestamp: new Date()
      },
      {
        name: 'Memory Usage',
        value: Math.floor(Math.random() * 100),
        unit: '%',
        status: 'healthy',
        timestamp: new Date()
      },
      {
        name: 'Database Connections',
        value: Math.floor(Math.random() * 50),
        unit: 'connections',
        status: 'healthy',
        timestamp: new Date()
      },
      {
        name: 'API Response Time',
        value: Math.floor(Math.random() * 500),
        unit: 'ms',
        status: 'healthy',
        timestamp: new Date()
      }
    ];

    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    console.error('Erreur GET /metrics:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des métriques',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// Activity Logs Routes
router.get('/logs', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;

    // Simuler des logs d'activité
    const logs = [
      {
        id: '1',
        action: 'USER_LOGIN',
        user: 'hello@trio.digital',
        details: 'Connexion administrateur',
        timestamp: new Date(),
        ip: '105.102.54.215'
      },
      {
        id: '2',
        action: 'USER_CREATED',
        user: 'hello@trio.digital',
        details: 'Création d\'un nouvel utilisateur',
        timestamp: new Date(Date.now() - 3600000),
        ip: '105.102.54.215'
      },
      {
        id: '3',
        action: 'PROMPT_UPDATED',
        user: 'hello@trio.digital',
        details: 'Modification d\'un prompt',
        timestamp: new Date(Date.now() - 7200000),
        ip: '105.102.54.215'
      }
    ];

    const total = logs.length;
    const skip = (page - 1) * limit;
    const paginatedLogs = logs.slice(skip, skip + limit);

    res.json({
      success: true,
      data: {
        logs: paginatedLogs,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Erreur GET /logs:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des logs',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

export default router;
