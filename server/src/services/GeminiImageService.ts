import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";
import { FileStorageService } from './FileStorageService';
import { PlatformFormatService, ImageFormat } from './PlatformFormatService';

interface GeminiGenerationOptions {
  numberOfImages?: number;
  imageSize?: '1K' | '2K' | '4K';
  aspectRatio?: '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '4:5' | '5:4' | '9:16' | '16:9' | '21:9';
  referenceImage?: string; // Base64 encoded image (legacy - single product)
  referenceImages?: string[]; // Base64 encoded images (multi-products support - up to 14 images)
  referenceImageStrength?: number;
}

interface GeminiGenerationResult {
  url: string;
  width: number;
  height: number;
  format: string;
}

export class GeminiImageService {
  private static ai: GoogleGenAI | null = null;
  private static lastCallTime: number = 0;
  private static readonly MIN_DELAY_MS = 30000; // 30 secondes entre chaque appel (2 RPM max)

  private static async waitForRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastCallTime;
    
    if (timeSinceLastCall < this.MIN_DELAY_MS) {
      const waitTime = this.MIN_DELAY_MS - timeSinceLastCall;
      console.log(`⏳ Attente de ${Math.round(waitTime / 1000)}s pour respecter le rate limit Gemini (2 RPM)...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastCallTime = Date.now();
  }

  private static getClient(): GoogleGenAI {
    if (!this.ai) {
      const apiKey = process.env.GOOGLE_API_KEY;
      if (!apiKey) {
        throw new Error('Google API Key non configurée');
      }
      this.ai = new GoogleGenAI({ apiKey });
    }
    return this.ai;
  }

  /**
   * Génère des images avec Gemini (Nano Banana)
   * Supporte maintenant plusieurs images de référence (multi-produits)
   */
  static async generateImages(
    prompt: string,
    options: GeminiGenerationOptions = {}
  ): Promise<GeminiGenerationResult[]> {
    try {
      const ai = this.getClient();
      
      const {
        numberOfImages = 4,
        imageSize = '1K',
        aspectRatio = '1:1',
        referenceImage,
        referenceImages,
        referenceImageStrength = 0.35
      } = options;

      // 🎯 SUPPORT MULTI-PRODUITS : Utiliser referenceImages si disponible
      const finalReferenceImages = referenceImages || (referenceImage ? [referenceImage] : []);
      const hasReferences = finalReferenceImages.length > 0;

      console.log('🎨 Génération Gemini MULTI-PRODUITS avec les paramètres:', {
        prompt: prompt.substring(0, 100) + '...',
        numberOfImages,
        imageSize,
        aspectRatio,
        numberOfReferenceImages: finalReferenceImages.length,
        hasReferences
      });

      if (finalReferenceImages.length > 0) {
        console.log(`📦 ${finalReferenceImages.length} produit(s) de référence détecté(s)`);
        finalReferenceImages.forEach((_, index) => {
          console.log(`   - Produit ${index + 1}: ${finalReferenceImages[index].length} chars base64`);
        });
      }

      // Attendre pour respecter le rate limit de Gemini (2 RPM max)
      await this.waitForRateLimit();

      // Ajouter l'aspect ratio au prompt pour Instagram (format carré)
      const aspectRatioInstruction = aspectRatio === '1:1' 
        ? ' Generate a square image with 1:1 aspect ratio (same width and height).'
        : aspectRatio === '16:9'
        ? ' Generate a landscape image with 16:9 aspect ratio.'
        : aspectRatio === '9:16'
        ? ' Generate a vertical image with 9:16 aspect ratio.'
        : '';
      
      const enhancedPrompt = prompt + aspectRatioInstruction;

      // 🎯 CONSTRUIRE LE CONTENU AVEC SUPPORT MULTI-RÉFÉRENCES
      let promptContent: any = enhancedPrompt;
      
      // Si des images de référence sont fournies, construire un tableau avec toutes les références
      if (hasReferences) {
        console.log('🔗 Construction du prompt avec références multiples...');
        
        promptContent = [
          { text: enhancedPrompt }
        ];
        
        // Ajouter chaque image de référence au contenu
        finalReferenceImages.forEach((imageBase64, index) => {
          promptContent.push({
            inlineData: {
              mimeType: "image/png",
              data: imageBase64,
            },
          });
          console.log(`   ✅ Référence ${index + 1} ajoutée au prompt`);
        });
        
        console.log(`🎯 Prompt final construit avec ${finalReferenceImages.length} référence(s) produit(s)`);
      }

      // Générer l'image avec Gemini 2 Pro (temporaire pour économiser le quota)
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: promptContent,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      });

      // Vérifier que des candidats existent
      if (!response.candidates || response.candidates.length === 0) {
        throw new Error('Aucun candidat retourné par Gemini');
      }

      // Vérifier que le contenu existe
      const candidate = response.candidates[0];
      if (!candidate.content || !candidate.content.parts) {
        throw new Error('Aucun contenu dans la réponse Gemini');
      }

      // Traiter et sauvegarder chaque image générée
      const results: GeminiGenerationResult[] = [];
      
      // Parcourir les parts de la réponse pour extraire les images
      const parts = candidate.content.parts;
      
      for (const part of parts) {
        // Vérifier si c'est une image (inlineData avec mimeType image)
        if (part.inlineData && part.inlineData.mimeType?.startsWith('image/') && part.inlineData.data) {
          const imageData = part.inlineData.data;
          const buffer = Buffer.from(imageData, "base64");

          // Sauvegarder l'image avec FileStorageService
          const { url: savedUrl, metadata } = await FileStorageService.saveImage(
            buffer,
            {
              quality: 100,
              format: 'png'
            }
          );

          results.push({
            url: savedUrl,
            width: metadata.width,
            height: metadata.height,
            format: metadata.format
          });

          console.log(`Image Gemini sauvegardée: ${savedUrl}`);
          
          // Si on a atteint le nombre d'images demandé, on arrête
          if (results.length >= numberOfImages) {
            break;
          }
        }
      }

      if (results.length === 0) {
        throw new Error('Aucune image trouvée dans la réponse Gemini');
      }

      return results;

    } catch (error: any) {
      console.error('Erreur lors de la génération Gemini:', error);
      throw new Error(`Erreur Gemini: ${error.message}`);
    }
  }

  /**
   * Traduit un prompt en anglais si nécessaire
   */
  static async translatePrompt(prompt: string): Promise<string> {
    try {
      const ai = this.getClient();
      
      // Utiliser Gemini pour traduire
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
          {
            text: `Translate the following text to English, maintaining the professional tone and marketing impact:\n\n${prompt}`
          }
        ],
      });

      const translation = response.candidates?.[0]?.content?.parts?.[0]?.text;
      return translation || prompt;

    } catch (error) {
      console.warn('Erreur lors de la traduction, utilisation du prompt original:', error);
      return prompt;
    }
  }

  /**
   * Convertit un fichier en base64
   */
  static async fileToBase64(filePath: string): Promise<string> {
    const fileBuffer = await fs.promises.readFile(filePath);
    return fileBuffer.toString('base64');
  }

  /**
   * Génère des images optimisées selon les plateformes et le type de contenu
   */
  static async generateOptimizedImages(
    prompt: string,
    platforms: string[],
    contentType: string,
    options: Omit<GeminiGenerationOptions, 'aspectRatio' | 'imageSize'> = {}
  ): Promise<GeminiGenerationResult[]> {
    try {
      // Obtenir le format optimal selon les plateformes et le type de contenu
      const formatInfo = PlatformFormatService.getFormatInfo(platforms, contentType);
      
      console.log('🎯 Format optimal déterminé:', {
        platforms,
        contentType,
        aspectRatio: formatInfo.aspectRatio,
        imageSize: formatInfo.imageSize,
        dimensions: `${formatInfo.width}x${formatInfo.height}`,
        description: formatInfo.description
      });

      // Déterminer le nombre d'images à générer
      const numberOfImages = formatInfo.contentInfo.isCarousel 
        ? formatInfo.contentInfo.numberOfImages 
        : (options.numberOfImages || 1);

      // Si c'est un carrousel, générer plusieurs variations
      if (formatInfo.contentInfo.isCarousel) {
        return await this.generateCarouselImages(
          prompt,
          numberOfImages,
          {
            ...options,
            aspectRatio: formatInfo.aspectRatio,
            imageSize: formatInfo.imageSize
          }
        );
      }

      // Génération normale
      return await this.generateImages(prompt, {
        ...options,
        numberOfImages,
        aspectRatio: formatInfo.aspectRatio,
        imageSize: formatInfo.imageSize
      });

    } catch (error: any) {
      console.error('Erreur lors de la génération optimisée:', error);
      throw new Error(`Erreur génération optimisée: ${error.message}`);
    }
  }

  /**
   * Génère plusieurs images pour un carrousel avec des variations
   */
  static async generateCarouselImages(
    basePrompt: string,
    numberOfImages: number = 4,
    options: GeminiGenerationOptions = {}
  ): Promise<GeminiGenerationResult[]> {
    try {
      console.log('🎠 Génération de carrousel avec', numberOfImages, 'images');

      // Créer des variations du prompt pour chaque image du carrousel
      const promptVariations = this.createCarouselPromptVariations(basePrompt, numberOfImages);
      
      const results: GeminiGenerationResult[] = [];
      
      // Générer chaque image du carrousel
      for (let i = 0; i < promptVariations.length; i++) {
        const variation = promptVariations[i];
        console.log(`🎨 Génération image ${i + 1}/${numberOfImages} du carrousel:`, variation.substring(0, 100) + '...');
        
        try {
          const imageResults = await this.generateImages(variation, {
            ...options,
            numberOfImages: 1 // Une seule image par variation
          });
          
          if (imageResults.length > 0) {
            results.push(imageResults[0]);
          }
          
          // Attendre un peu entre chaque génération pour éviter les rate limits
          if (i < promptVariations.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
          
        } catch (error) {
          console.warn(`Erreur lors de la génération de l'image ${i + 1} du carrousel:`, error);
          // Continuer avec les autres images même si une échoue
        }
      }

      if (results.length === 0) {
        throw new Error('Aucune image générée pour le carrousel');
      }

      console.log(`✅ Carrousel généré avec ${results.length} images`);
      return results;

    } catch (error: any) {
      console.error('Erreur lors de la génération du carrousel:', error);
      throw new Error(`Erreur carrousel: ${error.message}`);
    }
  }

  /**
   * Crée des variations de prompt pour un carrousel
   */
  private static createCarouselPromptVariations(basePrompt: string, numberOfImages: number): string[] {
    const variations = [];
    
    // Angles et perspectives différents
    const angles = [
      'main focus, centered composition',
      'detail shot, close-up perspective', 
      'lifestyle context, environmental setting',
      'product in use, action shot',
      'artistic angle, creative perspective'
    ];
    
    // Styles et ambiances
    const styles = [
      'professional lighting, studio quality',
      'natural lighting, authentic feel',
      'dramatic lighting, high contrast',
      'soft lighting, elegant mood'
    ];

    for (let i = 0; i < numberOfImages; i++) {
      const angle = angles[i % angles.length];
      const style = styles[i % styles.length];
      
      const variation = `${basePrompt}, ${angle}, ${style}, image ${i + 1} of ${numberOfImages}`;
      variations.push(variation);
    }

    return variations;
  }

  /**
   * Détermine les dimensions en fonction du ratio d'aspect et de la taille
   */
  static getDimensionsFromAspectRatio(
    aspectRatio: string,
    imageSize: '1K' | '2K'
  ): { width: number; height: number } {
    // Utiliser le service de formats pour plus de précision
    return PlatformFormatService.getDimensions(aspectRatio, imageSize);
  }
}
