import express from 'express';
import fetch from 'node-fetch';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Route pour télécharger une image via proxy
router.get('/image', authenticate, async (req, res) => {
  try {
    const { url, filename } = req.query;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'URL de l\'image requise'
      });
    }

    // Vérifier que l'URL provient de Cloudinary (sécurité)
    if (!url.startsWith('https://res.cloudinary.com/')) {
      return res.status(403).json({
        success: false,
        message: 'URL non autorisée'
      });
    }

    // Récupérer l'image depuis Cloudinary
    const response = await fetch(url);
    
    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: 'Erreur lors de la récupération de l\'image'
      });
    }

    // Déterminer le nom du fichier
    const finalFilename = filename || `image-${Date.now()}.jpg`;

    // Configurer les headers pour le téléchargement
    res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Content-Disposition', `attachment; filename="${finalFilename}"`);
    res.setHeader('Cache-Control', 'no-cache');

    // Streamer l'image vers le client
    response.body?.pipe(res);

  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'image:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
});

export default router;
