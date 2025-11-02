import express, { Response, Request } from 'express';
import axios from 'axios';
import cors from 'cors';
import multer from 'multer';
import FormData from 'form-data';
import { FileStorageService } from '../services/FileStorageService';
import { ImageProcessingService } from '../services/ImageProcessingService';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Servir les fichiers statiques du dossier public
router.use(express.static(path.join(process.cwd(), 'public')));

// Configuration de multer pour gérer les données multipart/form-data
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Format de fichier non supporté'));
    }
  }
});

// Configuration CORS spécifique pour les routes AI
router.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'stability-client-id',
    'stability-client-version',
    'stability-client-user-id'
  ],
  credentials: true
}));

// Augmenter la limite de taille du body à 50MB pour Stability AI
router.use(express.json({
  limit: '50mb'
}));
router.use(express.urlencoded({ limit: '50mb', extended: true }));

import { authenticate } from '../middleware/auth';
import { checkGenerationQuota } from '../middleware/quotas';
import { StabilityEditService } from '../services/StabilityEditService';
import { MaskGenerationService } from '../services/MaskGenerationService';
import { GeminiImageService } from '../services/GeminiImageService';

// Système de throttling pour Gemini (max 2 requêtes par minute pour la génération d'images)
let lastGeminiCallTime = 0;
const GEMINI_MIN_DELAY_MS = 30000; // 30 secondes entre chaque appel (permet 2 requêtes/minute max)

async function waitForGeminiRateLimit(): Promise<void> {
  const now = Date.now();
  const timeSinceLastCall = now - lastGeminiCallTime;
  
  if (timeSinceLastCall < GEMINI_MIN_DELAY_MS) {
    const waitTime = GEMINI_MIN_DELAY_MS - timeSinceLastCall;
    console.log(`⏳ Attente de ${Math.round(waitTime / 1000)}s pour respecter le rate limit Gemini (2 RPM)...`);
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
  
  lastGeminiCallTime = Date.now();
}

// Route pour valider une image
router.post('/validate-image', authenticate, checkGenerationQuota, async (req: Request, res: Response) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        error: {
          code: 'MISSING_IMAGE_URL',
          message: 'URL de l\'image manquante',
          service: 'validation'
        }
      });
    }

    // Validation par défaut
    const defaultValidation = {
      score: 70,
      quality: "medium",
      details: [
        {
          criteriaName: "composition",
          score: 70,
          feedback: "Score par défaut"
        },
        {
          criteriaName: "lighting",
          score: 70,
          feedback: "Score par défaut"
        },
        {
          criteriaName: "color",
          score: 70,
          feedback: "Score par défaut"
        },
        {
          criteriaName: "sharpness",
          score: 70,
          feedback: "Score par défaut"
        },
        {
          criteriaName: "style",
          score: 70,
          feedback: "Score par défaut"
        }
      ],
      suggestions: [],
      technicalIssues: [],
      styleIssues: [],
      sectorIssues: []
    };

    res.json(defaultValidation);
  } catch (error: any) {
    console.error('Erreur lors de la validation de l\'image:', error);
    res.status(500).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: error.message || 'Erreur lors de la validation de l\'image',
        service: 'validation'
      }
    });
  }
});

// Route pour ChatGPT
router.post('/gpt', authenticate, checkGenerationQuota, async (req: Request, res: Response) => {
  try {
    console.log('Début de la requête GPT');
    const { messages, maxTokens, type = 'strategy' } = req.body;
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error('Messages invalides:', messages);
      return res.status(400).json({
        error: {
          code: 'INVALID_MESSAGES',
          message: 'Les messages sont requis et doivent être un tableau non vide',
          service: 'gpt'
        }
      });
    }

    // Vérifier que la clé API est disponible
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      console.error('Clé API OpenAI manquante');
      return res.status(500).json({
        error: {
          code: 'API_KEY_MISSING',
          message: 'Clé API OpenAI non configurée',
          service: 'gpt'
        }
      });
    }

    // Configuration spécifique selon le type de contenu
    const config = {
      strategy: {
        model: 'gpt-4-0613',
        maxTokens: 3000,
        temperature: 0.7,
        presencePenalty: 0.6,
        frequencyPenalty: 0.3,
        systemMessage: `Vous êtes un expert en stratégie marketing et création de contenu pour les réseaux sociaux.
        Vos réponses doivent être très détaillées et structurées.
        - Analysez en profondeur chaque aspect
        - Fournissez des recommandations concrètes et actionnables
        - Restez aligné avec les objectifs business
        - Soyez précis dans vos suggestions`
      },
      themes: {
        model: 'gpt-4-1106-preview',
        maxTokens: 3000,
        temperature: 0.8,
        presencePenalty: 0.7,
        frequencyPenalty: 0.4,
        systemMessage: `Vous êtes un expert en création de contenu éditorial.
        Générez des thèmes créatifs et engageants.
        - 12 thèmes uniques et différenciants
        - Objectifs SMART pour chaque thème
        - Formats adaptés aux réseaux
        - Émotions et angles créatifs`
      },
      briefs: {
        model: 'gpt-4-0613',
        maxTokens: 3000,
        temperature: 0.7,
        presencePenalty: 0.6,
        frequencyPenalty: 0.3,
        systemMessage: `Vous êtes un directeur artistique expert en création de briefs créatifs.
        Pour chaque brief :
        - Description visuelle détaillée et précise
        - Message principal impactant (100-150 caractères)
        - Hashtags pertinents et recherchés (5-7)
        - Call-to-action engageant
        - Spécifications techniques exactes`
      }
    };

    const selectedConfig = config[type as keyof typeof config] || config.strategy;

    // Ajouter le message système approprié
    const enhancedMessages = [
      {
        role: 'system',
        content: selectedConfig.systemMessage
      },
      ...messages
    ];

    console.log('Envoi de la requête à OpenAI avec la clé:', OPENAI_API_KEY.substring(0, 10) + '...');

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: selectedConfig.model,
      messages: enhancedMessages,
      max_tokens: maxTokens || selectedConfig.maxTokens,
      temperature: selectedConfig.temperature,
      presence_penalty: selectedConfig.presencePenalty,
      frequency_penalty: selectedConfig.frequencyPenalty,
      top_p: 0.9
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      }
    });

    console.log('Réponse GPT reçue');
    res.json(response.data);
  } catch (error: any) {
    console.error('Erreur détaillée GPT:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    
    res.status(error.response?.status || 500).json({ 
      error: {
        code: 'GPT_API_ERROR',
        message: error.response?.data?.error?.message || error.message,
        service: 'gpt'
      }
    });
  }
});

// Fonction pour traduire le prompt en anglais
async function translateToEnglish(prompt: string): Promise<string> {
  try {
    console.log('Début de la traduction:', prompt.slice(0, 100) + '...');
    
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      throw new Error('Clé API OpenAI manquante pour la traduction');
    }

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4-0613',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator specializing in marketing and advertising content.
          Translate the following French text to English:
          - Maintain the professional tone and style
          - Keep technical terms accurate
          - Ensure marketing impact is preserved
          - Be precise with industry-specific terminology`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 3000,
      temperature: 0.3,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      }
    });

    const translation = response.data.choices[0].message.content;
    console.log('Traduction terminée:', translation.slice(0, 100) + '...');
    return translation;
  } catch (error: any) {
    console.error('Erreur de traduction:', error.response?.data || error.message);
    return prompt;
  }
}

// Route pour Stability AI Generate
router.options('/stability/generate', cors());

router.post('/stability/generate', authenticate, checkGenerationQuota, upload.fields([
  { name: 'product_image', maxCount: 1 },
  { name: 'brand_guide', maxCount: 1 }
]), async (req: Request, res: Response) => {
  try {
    console.log('Body reçu:', req.body);
    // Récupérer les données, que ce soit de FormData ou du body JSON
    const prompt = req.body.prompt || req.body.get('prompt');
    const negative_prompt = req.body.negative_prompt || req.body.get('negative_prompt');
    const aspect_ratio = req.body.aspect_ratio || req.body.get('aspect_ratio');

    console.log('Données reçues:', {
      prompt,
      negative_prompt,
      aspect_ratio,
      contentType: req.headers['content-type']
    });
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    console.log('Stability AI Generate:');
    console.log('- Prompt:', prompt);
    console.log('- Negative Prompt:', negative_prompt);
    console.log('- Aspect Ratio:', aspect_ratio);
    
    const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
    if (!STABILITY_API_KEY) {
      console.log('Clé API Stability manquante');
      throw new Error('Clé API Stability non configurée');
    }

    console.log('Clé API Stability: Présente');

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      console.log('Prompt invalide:', prompt);
      return res.status(400).json({
        error: {
          code: 'INVALID_PROMPT',
          message: 'Le prompt est invalide ou vide',
          service: 'stability'
        }
      });
    }

    console.log('Utilisation du prompt original:', prompt);
    // Traduire le prompt en anglais pour Stability Ultra
    const englishPrompt = await translateToEnglish(prompt);
    console.log('Prompt traduit en anglais:', englishPrompt);

    // Calculer les dimensions en fonction de l'aspect ratio
    let width = 1024;
    let height = 1024;

    if (aspect_ratio) {
      const [w, h] = aspect_ratio.split(':').map(Number);
      if (w && h) {
        if (w > h) {
          height = Math.round((h * width) / w);
        } else {
          width = Math.round((w * height) / h);
        }
      }
    }

    // Créer un FormData pour Ultra
    const formData = new FormData();
    formData.append('prompt', englishPrompt);
    
    if (negative_prompt) {
      formData.append('negative_prompt', negative_prompt);
    }

    formData.append('output_format', 'png');

    console.log('Envoi de la requête à Stability AI Ultra avec dimensions:', { width, height });

    const response = await axios.post(
      'https://api.stability.ai/v2beta/stable-image/generate/ultra',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${STABILITY_API_KEY}`,
          'Accept': 'image/*',
          ...formData.getHeaders()
        },
        responseType: 'arraybuffer',
        maxBodyLength: Infinity,
        maxContentLength: Infinity
      }
    );

    if (!response.data) {
      throw new Error('Pas de données reçues de Stability AI');
    }

    // Vérifier le type MIME de la réponse
    const contentType = response.headers['content-type'];
    console.log('Type de contenu reçu:', contentType);

    if (!contentType || !contentType.startsWith('image/')) {
      console.error('Réponse non valide de Stability AI:', {
        headers: response.headers,
        data: response.data.toString().substring(0, 200)
      });
      throw new Error(`Type de contenu non supporté: ${contentType}`);
    }

    try {
      // Sauvegarder l'image générée
      const { url: generatedImageUrl, metadata } = await FileStorageService.saveImage(
        Buffer.from(response.data),
        {
          maxWidth: width,
          maxHeight: height,
          quality: 100,
          format: 'png'
        }
      );

      let finalImageUrl = generatedImageUrl;
      let styleGuide;

      // Si une photo de produit est fournie, utiliser ImageProcessingService pour le traitement
      if (files?.product_image?.[0]) {
        const productImage = files.product_image[0];

        // Analyser la charte graphique si fournie
        if (files?.brand_guide?.[0]) {
          styleGuide = await ImageProcessingService.analyzeStyleGuide(files.brand_guide[0].path);
        }

        console.log('Traitement de l\'image produit:', {
          generatedPath: path.join(process.cwd(), 'public', generatedImageUrl),
          productPath: productImage.path
        });

        // Traiter l'image avec ImageProcessingService
        const processedImage = await ImageProcessingService.processProductImage(
          path.join(process.cwd(), 'public', generatedImageUrl),
          productImage.path,
          styleGuide
        );

        console.log('Image traitée avec succès:', processedImage);
        finalImageUrl = processedImage.url;

        // Nettoyer les fichiers temporaires
        await fs.promises.unlink(productImage.path);
        if (files?.brand_guide?.[0]) {
          await fs.promises.unlink(files.brand_guide[0].path);
        }
      }

      // Ultra génère toujours des images de haute qualité
      const score = 95;

      res.json({
        data: [{
          url: finalImageUrl,
          width: metadata.width,
          height: metadata.height,
          format: metadata.format
        }],
        score
      });
    } catch (error) {
      console.error('Erreur lors du traitement de l\'image:', error);
      throw error;
    }
  } catch (error: any) {
    console.error('Erreur détaillée Stability:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    
    if (error.response?.status === 401) {
      return res.status(401).json({
        error: {
          code: 'AUTHENTICATION_ERROR',
          message: 'Erreur d\'authentification avec Stability AI',
          service: 'stability',
          details: error.response?.data
        }
      });
    }
    
    if (error.response?.status === 429) {
      return res.status(429).json({
        error: {
          code: 'RATE_LIMIT_ERROR',
          message: 'Trop de requêtes. Veuillez réessayer dans quelques instants.',
          service: 'stability'
        }
      });
    }

    if (error.response?.status === 402) {
      return res.status(402).json({
        error: {
          code: 'PAYMENT_REQUIRED',
          message: 'Votre compte Stability AI nécessite un paiement',
          service: 'stability'
        }
      });
    }

    res.status(error.response?.status || 500).json({
      error: {
        code: 'IMAGE_GENERATION_ERROR',
        message: error.response?.data?.message || error.message,
        service: 'stability',
        details: error.response?.data
      }
    });
  }
});

// Route pour l'intégration de produits avec Stability AI
router.options('/stability/integrate-product', cors());

router.post('/stability/integrate-product', authenticate, checkGenerationQuota, upload.fields([
  { name: 'generated_image', maxCount: 1 },
  { name: 'product_image', maxCount: 1 }
]), async (req: Request, res: Response) => {
  try {
    console.log('Début de l\'intégration de produit avec Stability AI');
    
    // Vérifier que les fichiers nécessaires sont présents
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    if (!files.generated_image || !files.generated_image[0]) {
      return res.status(400).json({
        error: {
          code: 'MISSING_GENERATED_IMAGE',
          message: 'L\'image générée est requise',
          service: 'stability-edit'
        }
      });
    }
    
    if (!files.product_image || !files.product_image[0]) {
      return res.status(400).json({
        error: {
          code: 'MISSING_PRODUCT_IMAGE',
          message: 'L\'image du produit est requise',
          service: 'stability-edit'
        }
      });
    }
    
    const generatedImagePath = files.generated_image[0].path;
    const productImagePath = files.product_image[0].path;
    const integrationMethod = req.body.integration_method || 'inpaint'; // 'inpaint', 'search-and-replace', 'replace-background'
    const productDescription = req.body.product_description || 'product';
    
    console.log('Méthode d\'intégration:', integrationMethod);
    console.log('Description du produit:', productDescription);
    
    // Vérifier que la clé API Stability est disponible
    const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
    if (!STABILITY_API_KEY) {
      throw new Error('Clé API Stability non configurée');
    }
    
    let finalImageUrl: string;
    
    // Utiliser la méthode d'intégration appropriée
    switch (integrationMethod) {
      case 'inpaint': {
        // 1. Supprimer l'arrière-plan du produit
        console.log('Suppression de l\'arrière-plan du produit...');
        const productWithoutBg = await StabilityEditService.removeBackground(productImagePath);
        
        // 2. Obtenir les dimensions du produit
        const productInfo = await MaskGenerationService.getImageInfo(productWithoutBg);
        
        // 3. Générer un masque pour l'intégration
        console.log('Génération du masque pour l\'inpainting...');
        const mask = await MaskGenerationService.generateMask(
          generatedImagePath,
          {
            width: Math.min(productInfo.width, 300), // Limiter la taille pour une meilleure intégration
            height: Math.min(productInfo.height, 300)
          }
        );
        
        // 4. Intégrer le produit avec Inpaint
        console.log('Intégration du produit avec Inpaint...');
        const prompt = `${productDescription} seamlessly integrated into the scene, with matching lighting and perspective`;
        finalImageUrl = await StabilityEditService.inpaint(
          generatedImagePath,
          mask,
          prompt,
          {
            negativePrompt: 'unrealistic integration, floating objects, mismatched lighting, poor composition',
            stylePreset: 'photographic',
            growMask: 5
          }
        );
        break;
      }
      
      case 'search-and-replace': {
        // Utiliser Search and Replace pour remplacer un objet générique par le produit
        console.log('Intégration du produit avec Search and Replace...');
        const searchPrompt = req.body.search_prompt || 'object';
        const prompt = `${productDescription} with realistic lighting and perspective`;
        
        finalImageUrl = await StabilityEditService.searchAndReplace(
          generatedImagePath,
          searchPrompt,
          prompt,
          {
            negativePrompt: 'unrealistic integration, floating objects, mismatched lighting, poor composition',
            stylePreset: 'photographic'
          }
        );
        break;
      }
      
      case 'replace-background': {
        // Utiliser Replace Background and Relight pour placer le produit dans un nouveau contexte
        console.log('Intégration du produit avec Replace Background and Relight...');
        const backgroundPrompt = req.body.background_prompt || 'beautiful scene that complements the product';
        
        // Cette méthode est asynchrone et nécessite un polling
        const taskId = await StabilityEditService.replaceBackgroundAndRelight(
          productImagePath,
          backgroundPrompt,
          {
            backgroundReferencePath: generatedImagePath,
            foregroundPrompt: productDescription,
            preserveOriginalSubject: 0.8
          }
        );
        
        // Attendre que la tâche soit terminée (max 30 secondes)
        let isCompleted = false;
        let attempts = 0;
        const maxAttempts = 10;
        
        while (!isCompleted && attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 3000)); // Attendre 3 secondes
          isCompleted = await StabilityEditService.checkBackgroundReplaceStatus(taskId);
          attempts++;
          console.log(`Vérification du statut (${attempts}/${maxAttempts}): ${isCompleted ? 'Terminé' : 'En cours'}`);
        }
        
        if (!isCompleted) {
          throw new Error('Délai d\'attente dépassé pour Replace Background and Relight');
        }
        
        // Récupérer le résultat
        finalImageUrl = await StabilityEditService.getBackgroundReplaceResult(taskId);
        break;
      }
      
      default:
        throw new Error(`Méthode d'intégration non supportée: ${integrationMethod}`);
    }
    
    // Nettoyer les fichiers temporaires
    try {
      await fs.promises.unlink(generatedImagePath);
      await fs.promises.unlink(productImagePath);
    } catch (error) {
      console.warn('Erreur lors du nettoyage des fichiers temporaires:', error);
    }
    
    // Retourner l'URL de l'image finale
    const relativePath = finalImageUrl.split('public')[1];
    res.json({
      success: true,
      url: relativePath
    });
    
  } catch (error: any) {
    console.error('Erreur lors de l\'intégration du produit:', error);
    
    res.status(500).json({
      error: {
        code: 'PRODUCT_INTEGRATION_ERROR',
        message: error.message || 'Erreur lors de l\'intégration du produit',
        service: 'stability-edit'
      }
    });
  }
});

// Route pour Gemini Image Generation (Nano Banana)
router.options('/gemini/generate', cors());

router.post('/gemini/generate', authenticate, checkGenerationQuota, upload.fields([
  { name: 'reference_image', maxCount: 1 }
]), async (req: Request, res: Response) => {
  try {
    console.log('Début de la génération avec Gemini (Nano Banana)');
    
    const prompt = req.body.prompt;
    const aspect_ratio = req.body.aspect_ratio || '1:1';
    const image_size = req.body.image_size || '1K';
    const number_of_images = parseInt(req.body.number_of_images) || 1;
    const reference_image_base64 = req.body.reference_image; // Image déjà en base64 du client
    
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    console.log('Paramètres Gemini:', {
      prompt: prompt?.substring(0, 100) + '...',
      aspect_ratio,
      image_size,
      number_of_images,
      hasReferenceImageFile: !!files?.reference_image?.[0],
      hasReferenceImageBase64: !!reference_image_base64
    });
    
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({
        error: {
          code: 'INVALID_PROMPT',
          message: 'Le prompt est invalide ou vide',
          service: 'gemini'
        }
      });
    }
    
    // Utiliser le prompt directement sans traduction (économie de quota - 1 appel API au lieu de 2)
    // Gemini est multilingue et comprend le français
    console.log('Prompt utilisé pour Gemini (sans traduction):', prompt.substring(0, 100) + '...');
    
    // Préparer l'image de référence si fournie
    let referenceImageBase64: string | undefined;
    
    // Priorité 1: Image envoyée comme base64 dans le body (cas normal depuis le client)
    if (reference_image_base64 && typeof reference_image_base64 === 'string') {
      referenceImageBase64 = reference_image_base64;
      console.log('Image de référence chargée depuis le body (base64)');
    }
    // Priorité 2: Image envoyée comme fichier (cas des tests ou autres utilisations)
    else if (files?.reference_image?.[0]) {
      referenceImageBase64 = await GeminiImageService.fileToBase64(files.reference_image[0].path);
      console.log('Image de référence chargée depuis un fichier');
    }
    
    // Attendre pour respecter le rate limit de Gemini (2 requêtes/minute max)
    await waitForGeminiRateLimit();
    
    // Générer les images avec Gemini
    const results = await GeminiImageService.generateImages(prompt, {
      numberOfImages: number_of_images,
      imageSize: image_size as '1K' | '2K',
      aspectRatio: aspect_ratio as '1:1' | '3:4' | '4:3' | '9:16' | '16:9',
      referenceImage: referenceImageBase64
    });
    
    // Nettoyer les fichiers temporaires si présents
    if (files?.reference_image?.[0]) {
      try {
        await fs.promises.unlink(files.reference_image[0].path);
      } catch (error) {
        console.warn('Erreur lors du nettoyage des fichiers temporaires:', error);
      }
    }
    
    // Gemini génère toujours des images de haute qualité
    const score = 95;
    
    res.json({
      data: results,
      score,
      service: 'gemini',
      model: 'gemini-2.5-flash-image'
    });
    
  } catch (error: any) {
    console.error('Erreur lors de la génération Gemini:', error);
    
    // Gérer les erreurs spécifiques de Gemini
    let statusCode = 500;
    let errorCode = 'GEMINI_GENERATION_ERROR';
    
    if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      statusCode = 429;
      errorCode = 'RATE_LIMIT_ERROR';
    } else if (error.message?.includes('authentication') || error.message?.includes('API key')) {
      statusCode = 401;
      errorCode = 'AUTHENTICATION_ERROR';
    } else if (error.message?.includes('invalid') || error.message?.includes('Invalid')) {
      statusCode = 400;
      errorCode = 'INVALID_REQUEST';
    }
    
    res.status(statusCode).json({
      error: {
        code: errorCode,
        message: error.message || 'Erreur lors de la génération avec Gemini',
        service: 'gemini',
        details: error.toString()
      }
    });
  }
});

export default router;
