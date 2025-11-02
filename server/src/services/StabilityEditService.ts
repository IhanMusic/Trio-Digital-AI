import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { FileStorageService } from './FileStorageService';
import sharp from 'sharp';

// Fonction utilitaire pour télécharger une image depuis une URL
async function downloadImage(url: string): Promise<string> {
  // Vérifier si l'URL est une URL Cloudinary
  if (url.startsWith('http')) {
    console.log(`Téléchargement de l'image depuis ${url}...`);
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const tempPath = path.join(process.cwd(), 'temp', `temp-${Date.now()}.png`);
    
    // Créer le dossier temp s'il n'existe pas
    const tempDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    fs.writeFileSync(tempPath, Buffer.from(response.data));
    console.log(`Image téléchargée et sauvegardée temporairement: ${tempPath}`);
    return tempPath;
  }
  
  // Si ce n'est pas une URL, c'est déjà un chemin local
  return url;
}

/**
 * Service pour interagir avec les API d'édition d'images de Stability AI
 */
export class StabilityEditService {
  /**
   * Supprime l'arrière-plan d'une image
   * @param imagePath Chemin vers l'image
   * @returns Chemin vers l'image sans arrière-plan
   */
  static async removeBackground(imagePath: string): Promise<string> {
    try {
      const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
      if (!STABILITY_API_KEY) {
        throw new Error('Clé API Stability manquante');
      }

      // Télécharger l'image si c'est une URL
      const localImagePath = await downloadImage(imagePath);
      
      // Créer un FormData pour l'API
      const formData = new FormData();
      formData.append('image', fs.createReadStream(localImagePath));
      formData.append('output_format', 'png');

      console.log('Envoi de la requête à Stability AI Remove Background...');

      // Appeler l'API
      const response = await axios.post(
        'https://api.stability.ai/v2beta/stable-image/edit/remove-background',
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

      // Sauvegarder l'image générée
      const { url: outputImageUrl } = await FileStorageService.saveImage(
        Buffer.from(response.data),
        {
          maxWidth: 1024,
          maxHeight: 1024,
          quality: 100,
          format: 'png'
        }
      );

      // Retourner directement l'URL Cloudinary
      return outputImageUrl;
    } catch (error: any) {
      console.error('Erreur lors de la suppression de l\'arrière-plan:', error);
      throw error;
    }
  }

  /**
   * Intègre un contenu dans une image en utilisant un masque
   * @param imagePath Chemin vers l'image de base
   * @param maskPath Chemin vers le masque
   * @param prompt Description du contenu à intégrer
   * @param options Options supplémentaires
   * @returns Chemin vers l'image résultante
   */
  static async inpaint(
    imagePath: string,
    maskPath: string,
    prompt: string,
    options?: {
      negativePrompt?: string;
      seed?: number;
      stylePreset?: string;
      growMask?: number;
    }
  ): Promise<string> {
    try {
      const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
      if (!STABILITY_API_KEY) {
        throw new Error('Clé API Stability manquante');
      }

      // Télécharger les images si ce sont des URLs
      const localImagePath = await downloadImage(imagePath);
      const localMaskPath = await downloadImage(maskPath);
      
      // Créer un FormData pour l'API
      const formData = new FormData();
      formData.append('image', fs.createReadStream(localImagePath));
      formData.append('mask', fs.createReadStream(localMaskPath));
      formData.append('prompt', prompt);

      if (options?.negativePrompt) {
        formData.append('negative_prompt', options.negativePrompt);
      }

      if (options?.seed) {
        formData.append('seed', options.seed.toString());
      }

      if (options?.stylePreset) {
        formData.append('style_preset', options.stylePreset);
      }

      if (options?.growMask !== undefined) {
        formData.append('grow_mask', options.growMask.toString());
      }

      formData.append('output_format', 'png');

      console.log('Envoi de la requête à Stability AI Inpaint...');
      console.log('Prompt:', prompt);

      // Appeler l'API
      const response = await axios.post(
        'https://api.stability.ai/v2beta/stable-image/edit/inpaint',
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

      // Sauvegarder l'image générée
      const { url: outputImageUrl } = await FileStorageService.saveImage(
        Buffer.from(response.data),
        {
          maxWidth: 1024,
          maxHeight: 1024,
          quality: 100,
          format: 'png'
        }
      );

      // Retourner directement l'URL Cloudinary
      return outputImageUrl;
    } catch (error: any) {
      console.error('Erreur lors de l\'inpainting:', error);
      throw error;
    }
  }

  /**
   * Remplace un objet dans une image par un autre objet décrit par un prompt
   * @param imagePath Chemin vers l'image
   * @param searchPrompt Description de l'objet à remplacer
   * @param prompt Description de l'objet de remplacement
   * @param options Options supplémentaires
   * @returns Chemin vers l'image résultante
   */
  static async searchAndReplace(
    imagePath: string,
    searchPrompt: string,
    prompt: string,
    options?: {
      negativePrompt?: string;
      seed?: number;
      stylePreset?: string;
      growMask?: number;
    }
  ): Promise<string> {
    try {
      const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
      if (!STABILITY_API_KEY) {
        throw new Error('Clé API Stability manquante');
      }

      // Télécharger l'image si c'est une URL
      const localImagePath = await downloadImage(imagePath);
      
      // Créer un FormData pour l'API
      const formData = new FormData();
      formData.append('image', fs.createReadStream(localImagePath));
      formData.append('search_prompt', searchPrompt);
      formData.append('prompt', prompt);

      if (options?.negativePrompt) {
        formData.append('negative_prompt', options.negativePrompt);
      }

      if (options?.seed) {
        formData.append('seed', options.seed.toString());
      }

      if (options?.stylePreset) {
        formData.append('style_preset', options.stylePreset);
      }

      if (options?.growMask !== undefined) {
        formData.append('grow_mask', options.growMask.toString());
      }

      formData.append('output_format', 'png');

      console.log('Envoi de la requête à Stability AI Search and Replace...');
      console.log('Search Prompt:', searchPrompt);
      console.log('Prompt:', prompt);

      // Appeler l'API
      const response = await axios.post(
        'https://api.stability.ai/v2beta/stable-image/edit/search-and-replace',
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

      // Sauvegarder l'image générée
      const { url: outputImageUrl } = await FileStorageService.saveImage(
        Buffer.from(response.data),
        {
          maxWidth: 1024,
          maxHeight: 1024,
          quality: 100,
          format: 'png'
        }
      );

      // Retourner directement l'URL Cloudinary
      return outputImageUrl;
    } catch (error: any) {
      console.error('Erreur lors du search and replace:', error);
      throw error;
    }
  }

  /**
   * Remplace l'arrière-plan d'une image et ajuste l'éclairage
   * @param subjectImagePath Chemin vers l'image du sujet
   * @param backgroundPrompt Description de l'arrière-plan souhaité
   * @param options Options supplémentaires
   * @returns ID de la tâche pour polling
   */
  static async replaceBackgroundAndRelight(
    subjectImagePath: string,
    backgroundPrompt: string,
    options?: {
      backgroundReferencePath?: string;
      foregroundPrompt?: string;
      negativePrompt?: string;
      preserveOriginalSubject?: number;
      lightSourceDirection?: 'above' | 'below' | 'left' | 'right';
      lightSourceStrength?: number;
      seed?: number;
    }
  ): Promise<string> {
    try {
      const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
      if (!STABILITY_API_KEY) {
        throw new Error('Clé API Stability manquante');
      }

      // Télécharger les images si ce sont des URLs
      const localSubjectImagePath = await downloadImage(subjectImagePath);
      
      // Créer un FormData pour l'API
      const formData = new FormData();
      formData.append('subject_image', fs.createReadStream(localSubjectImagePath));
      formData.append('background_prompt', backgroundPrompt);

      if (options?.backgroundReferencePath) {
        const localBackgroundReferencePath = await downloadImage(options.backgroundReferencePath);
        formData.append('background_reference', fs.createReadStream(localBackgroundReferencePath));
      }

      if (options?.foregroundPrompt) {
        formData.append('foreground_prompt', options.foregroundPrompt);
      }

      if (options?.negativePrompt) {
        formData.append('negative_prompt', options.negativePrompt);
      }

      if (options?.preserveOriginalSubject !== undefined) {
        formData.append('preserve_original_subject', options.preserveOriginalSubject.toString());
      }

      if (options?.lightSourceDirection) {
        formData.append('light_source_direction', options.lightSourceDirection);
      }

      if (options?.lightSourceStrength !== undefined) {
        formData.append('light_source_strength', options.lightSourceStrength.toString());
      }

      if (options?.seed) {
        formData.append('seed', options.seed.toString());
      }

      formData.append('output_format', 'png');

      console.log('Envoi de la requête à Stability AI Replace Background and Relight...');

      // Appeler l'API
      const response = await axios.post(
        'https://api.stability.ai/v2beta/stable-image/edit/replace-background-and-relight',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${STABILITY_API_KEY}`,
            ...formData.getHeaders()
          }
        }
      );

      if (!response.data || !response.data.id) {
        throw new Error('Réponse invalide de Stability AI');
      }

      return response.data.id;
    } catch (error: any) {
      console.error('Erreur lors du replace background and relight:', error);
      throw error;
    }
  }

  /**
   * Récupère le résultat d'une tâche Replace Background and Relight
   * @param id ID de la tâche
   * @returns Chemin vers l'image résultante
   */
  static async getBackgroundReplaceResult(id: string): Promise<string> {
    try {
      const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
      if (!STABILITY_API_KEY) {
        throw new Error('Clé API Stability manquante');
      }

      console.log('Récupération du résultat de Replace Background and Relight...');

      // Appeler l'API
      const response = await axios.get(
        `https://api.stability.ai/v2beta/stable-image/edit/replace-background-and-relight/result/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${STABILITY_API_KEY}`,
            'Accept': 'image/*'
          },
          responseType: 'arraybuffer'
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

      // Sauvegarder l'image générée
      const { url: outputImageUrl } = await FileStorageService.saveImage(
        Buffer.from(response.data),
        {
          maxWidth: 1024,
          maxHeight: 1024,
          quality: 100,
          format: 'png'
        }
      );

      // Retourner directement l'URL Cloudinary
      return outputImageUrl;
    } catch (error: any) {
      console.error('Erreur lors de la récupération du résultat:', error);
      throw error;
    }
  }

  /**
   * Vérifie si une tâche Replace Background and Relight est terminée
   * @param id ID de la tâche
   * @returns true si la tâche est terminée, false sinon
   */
  static async checkBackgroundReplaceStatus(id: string): Promise<boolean> {
    try {
      const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
      if (!STABILITY_API_KEY) {
        throw new Error('Clé API Stability manquante');
      }

      // Appeler l'API
      const response = await axios.get(
        `https://api.stability.ai/v2beta/stable-image/edit/replace-background-and-relight/status/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${STABILITY_API_KEY}`
          }
        }
      );

      if (!response.data || !response.data.status) {
        throw new Error('Réponse invalide de Stability AI');
      }

      return response.data.status === 'completed';
    } catch (error: any) {
      console.error('Erreur lors de la vérification du statut:', error);
      throw error;
    }
  }
}
