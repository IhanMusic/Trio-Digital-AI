import axios, { AxiosError } from 'axios';
import FormData from 'form-data';
import path from 'path';
import fs from 'fs';
import { FileStorageService } from './FileStorageService';
import { logger } from '../config/logger';
import ProductAnalysisService from './ProductAnalysisService';
import { IProduct } from '../models/Product';

// Fonction pour traduire le prompt en anglais
async function translateToEnglish(prompt: string): Promise<string> {
  try {
    logger.info('Début de la traduction du prompt:', prompt.slice(0, 100) + '...');
    
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      logger.error('Clé API OpenAI manquante pour la traduction');
      return prompt; // Retourner le prompt original en cas d'erreur
    }

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-5',
      reasoning_effort: 'low',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator specializing in marketing and advertising content.
          Translate the following text to English:
          - Maintain the professional tone and style
          - Keep technical terms accurate
          - Ensure marketing impact is preserved
          - Be precise with industry-specific terminology`
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      }
    });

    const translation = response.data.choices[0].message.content;
    logger.info('Traduction terminée:', translation.slice(0, 100) + '...');
    return translation;
  } catch (error: any) {
    logger.error('Erreur de traduction:', error.response?.data || error.message);
    return prompt; // Retourner le prompt original en cas d'erreur
  }
}

export class ImageGenerationService {
  /**
   * Génère une image à partir d'un prompt
   */
  static async generateImage(prompt: string, options: {
    purpose?: 'social' | 'product' | 'lifestyle';
    aspect_ratio?: string;
  } = {}): Promise<{ url: string; publicId?: string }> {
    try {
      logger.info('=== Début de la génération d\'image avec Stability Ultra ===');
      logger.debug('Prompt:', prompt);
      logger.debug('Options:', options);

      // Vérifier le dossier public/images
      const publicDir = path.join(process.cwd(), 'public');
      const imagesDir = path.join(publicDir, 'images');
      
      if (!fs.existsSync(publicDir)) {
        logger.info('Création du dossier public...');
        fs.mkdirSync(publicDir, { recursive: true });
      }
      if (!fs.existsSync(imagesDir)) {
        logger.info('Création du dossier images...');
        fs.mkdirSync(imagesDir, { recursive: true });
      }

      const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
      if (!STABILITY_API_KEY) {
        logger.error('Clé API Stability manquante');
        throw new Error('Clé API Stability non configurée');
      }
      logger.info('Clé API Stability trouvée:', STABILITY_API_KEY.substring(0, 10) + '...');

      // Traduire le prompt en anglais
      logger.info('Traduction du prompt en anglais...');
      const englishPrompt = await translateToEnglish(prompt);
      
      // Créer un FormData pour Ultra
      const formData = new FormData();
      formData.append('prompt', englishPrompt);
      formData.append('output_format', 'png');

      if (options.aspect_ratio) {
        formData.append('aspect_ratio', options.aspect_ratio);
      }

      logger.info('=== Configuration de la requête Stability Ultra ===');
      logger.info('URL: https://api.stability.ai/v2beta/stable-image/generate/ultra');
      logger.info('Headers:', {
        'Authorization': `Bearer ${STABILITY_API_KEY.substring(0, 10)}...`,
        'Accept': 'image/*',
        ...formData.getHeaders()
      });
      logger.info('FormData:', {
        prompt: prompt,
        aspect_ratio: options.aspect_ratio,
        output_format: 'png'
      });
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
        logger.error('❌ Pas de données reçues de Stability AI');
        throw new Error('Pas de données reçues de Stability AI');
      }

      logger.info('✅ Réponse reçue de Stability Ultra');
      logger.info('Content-Type:', response.headers['content-type']);
      logger.info('Taille de la réponse:', response.data.length, 'octets');

      // Vérifier le type MIME de la réponse
      const contentType = response.headers['content-type'];
      if (!contentType || !contentType.startsWith('image/')) {
        throw new Error(`Type de contenu non supporté: ${contentType}`);
      }

      logger.info('Sauvegarde de l\'image générée...');
      const { url: generatedImageUrl, publicId } = await FileStorageService.saveImage(
        Buffer.from(response.data),
        {
          maxWidth: 1024,
          maxHeight: 1024,
          quality: 100,
          format: 'png',
          purpose: options.purpose,
          useCloudinary: true // Utiliser Cloudinary par défaut
        }
      );

      logger.info('Image générée et sauvegardée avec succès:', generatedImageUrl);
      if (publicId) {
        logger.info('ID public Cloudinary:', publicId);
      }
      
      return { 
        url: generatedImageUrl, 
        publicId 
      };
    } catch (error: any) {
      logger.error('Erreur lors de la génération de l\'image');
      if (error instanceof AxiosError) {
        logger.error('Message:', error.message);
        if (error.response) {
          logger.error('Status:', error.response.status);
          logger.error('Headers:', error.response.headers);
          logger.error('Data:', error.response.data);
        }
      } else if (error instanceof Error) {
        logger.error('Message:', error.message);
      } else {
        logger.error('Erreur inconnue:', error);
      }
      throw error;
    }
  }

  /**
   * Génère une image avec une analyse détaillée du produit
   */
  static async generateProductImage(
    prompt: string, 
    product: IProduct, 
    options: {
      purpose?: 'social' | 'product' | 'lifestyle';
      aspect_ratio?: string;
      context?: string;
      includeBackground?: boolean;
      style?: string;
      angle?: 'front' | 'side' | 'top' | 'isometric' | '3/4';
      lighting?: 'studio' | 'natural' | 'dramatic' | 'soft' | 'bright';
    } = {}
  ): Promise<{ url: string; publicId?: string }> {
    try {
      logger.info('=== Début de la génération d\'image avec analyse détaillée du produit ===');
      logger.info(`Produit: ${product.name}`);
      logger.info(`Prompt original: ${prompt}`);
      
      // Enrichir le prompt avec l'analyse détaillée du produit
      const enhancedPrompt = await ProductAnalysisService.enhancePromptWithProductAnalysis(
        prompt,
        product,
        {
          purpose: options.purpose || 'product',
          context: options.context,
          includeBackground: options.includeBackground,
          style: options.style,
          angle: options.angle,
          lighting: options.lighting
        }
      );
      
      logger.info('Prompt enrichi avec l\'analyse détaillée du produit');
      logger.debug('Prompt enrichi:', enhancedPrompt.substring(0, 200) + '...');
      
      // Générer l'image avec le prompt enrichi
      return await this.generateImage(enhancedPrompt, {
        purpose: options.purpose || 'product',
        aspect_ratio: options.aspect_ratio
      });
    } catch (error: any) {
      logger.error('Erreur lors de la génération d\'image avec analyse détaillée du produit:', error.message);
      
      // En cas d'erreur, essayer de générer l'image avec le prompt original
      logger.info('Tentative de génération avec le prompt original...');
      return await this.generateImage(prompt, {
        purpose: options.purpose,
        aspect_ratio: options.aspect_ratio
      });
    }
  }
}
