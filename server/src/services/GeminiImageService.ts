import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";
import { FileStorageService } from './FileStorageService';

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

      // Générer l'image avec Gemini 3 Pro en utilisant la nouvelle syntaxe
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
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
   * Détermine les dimensions en fonction du ratio d'aspect et de la taille
   */
  static getDimensionsFromAspectRatio(
    aspectRatio: string,
    imageSize: '1K' | '2K'
  ): { width: number; height: number } {
    const baseSize = imageSize === '2K' ? 2048 : 1024;
    
    const [w, h] = aspectRatio.split(':').map(Number);
    
    if (w === h) {
      return { width: baseSize, height: baseSize };
    }
    
    if (w > h) {
      const height = Math.round((h * baseSize) / w);
      return { width: baseSize, height };
    } else {
      const width = Math.round((w * baseSize) / h);
      return { width, height: baseSize };
    }
  }
}
