import express, { Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import Post, { IPost } from '../models/Post';

const router = express.Router();

// Mettre à jour le statut d'un post
router.put('/:postId/status', authenticate, async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { status } = req.body;

    if (!['pending_validation', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Statut invalide'
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Utilisateur non authentifié'
      });
    }

    const post = await Post.findByIdAndUpdate(
      postId,
      {
        status,
        ...(status === 'approved' ? {
          'approvalStatus.approved': true,
          'approvalStatus.approvedBy': req.user._id,
          'approvalStatus.approvedAt': new Date()
        } : status === 'rejected' ? {
          'approvalStatus.approved': false
        } : {})
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post non trouvé'
      });
    }

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// Récupérer les posts récents
router.get('/recent', authenticate, async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate('brandId', 'name')
      .populate('products', 'name description category images')
      .lean();

    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des posts récents:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// Récupérer les posts d'un calendrier
router.get('/calendar/:calendarId', authenticate, async (req: Request, res: Response) => {
  console.log('\n=== Récupération des posts du calendrier ===');
  console.log('Calendar ID:', req.params.calendarId);
  try {
    const { calendarId } = req.params;
    console.log('Récupération des posts pour le calendrier:', calendarId);

    const posts = await Post.find({ calendarId })
      .sort({ scheduledDate: 1 })
      .populate('brandId', 'name')
      .populate('createdBy', 'name email')
      .populate('products', 'name description category images');

    console.log(`${posts.length} posts trouvés`);
    
    // Vérifier les images et les produits
    console.log('\nVérification des posts:');
    for (const post of posts) {
      console.log(`\nPost ${post._id}:`);
      if (post.content.imageUrl) {
        console.log('- Image URL:', post.content.imageUrl);
      }
      console.log('- Texte:', post.content.text.substring(0, 50) + '...');
      if (post.products && post.products.length > 0) {
        console.log('- Produits:', (post.products as any[]).map(p => p.name).join(', '));
      }
    }
    
    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des posts:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

export default router;
