import path from 'path';
import fs from 'fs';
import axios from 'axios';
import { StabilityEditService } from './StabilityEditService';
import { MaskGenerationService } from './MaskGenerationService';
import { FileStorageService } from './FileStorageService';
import ProductAnalysisService, { ProductFeatures } from './ProductAnalysisService';
import { IProduct } from '../models/Product';
import { logger } from '../config/logger';

/**
 * Service pour intégrer des produits dans des images générées en utilisant les API de Stability AI
 */
export class ProductIntegrationWithStabilityService {
  /**
   * Intègre un produit dans une image générée en utilisant l'API Inpaint de Stability AI
   * @param productImagePath Chemin vers l'image du produit
   * @param backgroundImagePath Chemin vers l'image de fond
   * @param options Options supplémentaires
   * @returns URL de l'image résultante
   */
  static async integrateProductWithInpaint(
    productImagePath: string,
    backgroundImagePath: string,
    options?: {
      prompt?: string;
      negativePrompt?: string;
      stylePreset?: string;
      productWidth?: number;
      productHeight?: number;
    }
  ): Promise<string> {
    try {
      console.log('Début de l\'intégration du produit avec Inpaint...');
      
      // 1. Supprimer l'arrière-plan du produit
      console.log('Suppression de l\'arrière-plan du produit...');
      const productWithoutBg = await StabilityEditService.removeBackground(productImagePath);
      console.log(`Produit sans arrière-plan: ${productWithoutBg}`);
      
      // 2. Télécharger l'image pour obtenir ses dimensions
      console.log('Téléchargement de l\'image du produit pour obtenir ses dimensions...');
      const response = await axios.get(productWithoutBg, { responseType: 'arraybuffer' });
      const tempProductPath = path.join(process.cwd(), 'temp', 'temp-product.png');
      
      // Créer le dossier temp s'il n'existe pas
      const tempDir = path.join(process.cwd(), 'temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      
      fs.writeFileSync(tempProductPath, Buffer.from(response.data));
      console.log(`Image téléchargée et sauvegardée temporairement: ${tempProductPath}`);
      
      // 3. Obtenir les dimensions du produit
      const productInfo = await MaskGenerationService.getImageInfo(tempProductPath);
      console.log(`Dimensions du produit: ${productInfo.width}x${productInfo.height}`);
      
      // 4. Générer un masque pour l'intégration
      console.log('Génération d\'un masque pour l\'intégration...');
      const mask = await MaskGenerationService.generateMask(
        backgroundImagePath,
        {
          width: options?.productWidth || Math.min(productInfo.width, 300),
          height: options?.productHeight || Math.min(productInfo.height, 300)
        }
      );
      console.log(`Masque généré: ${mask}`);
      
      // 5. Intégrer le produit avec Inpaint
      console.log('Intégration du produit avec Inpaint...');
      const prompt = options?.prompt || 
        'a product seamlessly integrated into the scene, with matching lighting and perspective';
      
      const inpaintResult = await StabilityEditService.inpaint(
        backgroundImagePath,
        mask,
        prompt,
        {
          negativePrompt: options?.negativePrompt || 
            'unrealistic integration, floating objects, mismatched lighting, poor composition',
          stylePreset: options?.stylePreset || 'photographic',
          growMask: 5
        }
      );
      
      console.log(`Résultat de l'inpainting: ${inpaintResult}`);
      return inpaintResult;
    } catch (error: any) {
      console.error('Erreur lors de l\'intégration du produit avec Inpaint:', error);
      throw error;
    }
  }
  
  /**
   * Intègre un produit dans une image générée en utilisant l'API Search and Replace de Stability AI
   * @param productImagePath Chemin vers l'image du produit
   * @param backgroundImagePath Chemin vers l'image de fond
   * @param options Options supplémentaires
   * @returns URL de l'image résultante
   */
  static async integrateProductWithSearchAndReplace(
    productImagePath: string,
    backgroundImagePath: string,
    options?: {
      searchPrompt?: string;
      prompt?: string;
      negativePrompt?: string;
      stylePreset?: string;
    }
  ): Promise<string> {
    try {
      console.log('Début de l\'intégration du produit avec Search and Replace...');
      
      // 1. Supprimer l'arrière-plan du produit (optionnel pour cette méthode)
      console.log('Suppression de l\'arrière-plan du produit...');
      const productWithoutBg = await StabilityEditService.removeBackground(productImagePath);
      console.log(`Produit sans arrière-plan: ${productWithoutBg}`);
      
      // 2. Intégrer le produit avec Search and Replace
      console.log('Intégration du produit avec Search and Replace...');
      const searchPrompt = options?.searchPrompt || 'object';
      const prompt = options?.prompt || 
        'a product with realistic lighting and perspective';
      
      const searchAndReplaceResult = await StabilityEditService.searchAndReplace(
        backgroundImagePath,
        searchPrompt,
        prompt,
        {
          negativePrompt: options?.negativePrompt || 
            'unrealistic integration, floating objects, mismatched lighting, poor composition',
          stylePreset: options?.stylePreset || 'photographic'
        }
      );
      
      console.log(`Résultat du search and replace: ${searchAndReplaceResult}`);
      return searchAndReplaceResult;
    } catch (error: any) {
      console.error('Erreur lors de l\'intégration du produit avec Search and Replace:', error);
      throw error;
    }
  }
  
  /**
   * Intègre un produit dans une image générée en utilisant une combinaison de techniques
   * @param productImagePath Chemin vers l'image du produit
   * @param backgroundImagePath Chemin vers l'image de fond
   * @param options Options supplémentaires
   * @returns URL de l'image résultante
   */
  static async integrateProductAdvanced(
    productImagePath: string,
    backgroundImagePath: string,
    options?: {
      method?: 'inpaint' | 'search-and-replace';
      prompt?: string;
      negativePrompt?: string;
      stylePreset?: string;
      productWidth?: number;
      productHeight?: number;
      searchPrompt?: string;
    }
  ): Promise<string> {
    try {
      console.log('Début de l\'intégration avancée du produit...');
      
      // Choisir la méthode d'intégration
      const method = options?.method || 'inpaint';
      
      if (method === 'inpaint') {
        return await this.integrateProductWithInpaint(
          productImagePath,
          backgroundImagePath,
          {
            prompt: options?.prompt,
            negativePrompt: options?.negativePrompt,
            stylePreset: options?.stylePreset,
            productWidth: options?.productWidth,
            productHeight: options?.productHeight
          }
        );
      } else {
        return await this.integrateProductWithSearchAndReplace(
          productImagePath,
          backgroundImagePath,
          {
            searchPrompt: options?.searchPrompt,
            prompt: options?.prompt,
            negativePrompt: options?.negativePrompt,
            stylePreset: options?.stylePreset
          }
        );
      }
    } catch (error: any) {
      console.error('Erreur lors de l\'intégration avancée du produit:', error);
      throw error;
    }
  }

  /**
   * Intègre un produit dans une image générée avec une approche améliorée pour préserver l'apparence du produit
   * @param productImagePath Chemin vers l'image du produit
   * @param backgroundImagePath Chemin vers l'image de fond
   * @param product Informations du produit (optionnel)
   * @param options Options supplémentaires
   * @returns URL de l'image résultante
   */
  static async integrateProductWithEnhancedInpaint(
    productImagePath: string,
    backgroundImagePath: string,
    product?: IProduct,
    options?: {
      prompt?: string;
      negativePrompt?: string;
      stylePreset?: string;
      preserveProductAppearance?: boolean;
      productDetailLevel?: number;
      maskShape?: 'rectangle' | 'ellipse' | 'product-shape';
      position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'random';
    }
  ): Promise<string> {
    try {
      logger.info('Début de l\'intégration améliorée du produit...');
      
      // 1. Extraire les caractéristiques du produit
      logger.info('Extraction des caractéristiques du produit...');
      const productFeatures = await ProductAnalysisService.extractProductFeatures(productImagePath, product);
      logger.info(`Caractéristiques extraites: ${JSON.stringify(productFeatures, null, 2)}`);
      
      // 2. Générer un prompt ultra-précis basé sur ces caractéristiques
      logger.info('Génération d\'un prompt détaillé pour l\'intégration...');
      const basePrompt = options?.prompt || 'a product seamlessly integrated into the scene, with matching lighting and perspective';
      const detailedPrompt = ProductAnalysisService.generateDetailedProductPrompt(productFeatures, basePrompt);
      logger.info(`Prompt détaillé généré: ${detailedPrompt.substring(0, 100)}...`);
      
      // 3. Supprimer l'arrière-plan du produit
      logger.info('Suppression de l\'arrière-plan du produit...');
      const productWithoutBg = await StabilityEditService.removeBackground(productImagePath);
      logger.info(`Produit sans arrière-plan: ${productWithoutBg}`);
      
      // 4. Créer un masque optimisé pour l'intégration
      logger.info('Création d\'un masque optimisé pour l\'intégration...');
      const maskShape = options?.maskShape || 'rectangle';
      const position = options?.position || 'center';
      
      // Convertir la forme du produit en forme compatible avec MaskGenerationService
      let maskShapeValue: 'rectangle' | 'ellipse';
      if (maskShape === 'product-shape') {
        // Si la forme du produit est 'irregular', utiliser 'rectangle' par défaut
        maskShapeValue = productFeatures.shape === 'irregular' ? 'rectangle' : productFeatures.shape;
      } else {
        // Utiliser la forme spécifiée dans les options
        maskShapeValue = maskShape as 'rectangle' | 'ellipse';
      }
      
      const mask = await MaskGenerationService.generateMask(
        backgroundImagePath,
        {
          width: productFeatures.dimensions.width,
          height: productFeatures.dimensions.height,
          shape: maskShapeValue,
          position: position
        }
      );
      logger.info(`Masque généré: ${mask}`);
      
      // 5. Construire le prompt négatif pour éviter les modifications du produit
      const negativePrompt = options?.negativePrompt || 
        'different product, altered product, modified appearance, wrong colors, wrong shape, wrong proportions, ' +
        'unrealistic integration, floating objects, mismatched lighting, poor composition, ' +
        'distorted product, incorrect product, wrong product, generic product';
      
      // 6. Intégrer le produit avec Inpaint en utilisant des paramètres optimisés
      logger.info('Intégration du produit avec Inpaint et paramètres optimisés...');
      const inpaintResult = await StabilityEditService.inpaint(
        backgroundImagePath,
        mask,
        detailedPrompt,
        {
          negativePrompt: negativePrompt,
          stylePreset: options?.stylePreset || 'photographic',
          growMask: 3
        }
      );
      
      logger.info(`Résultat de l'inpainting amélioré: ${inpaintResult}`);
      return inpaintResult;
    } catch (error: any) {
      logger.error('Erreur lors de l\'intégration améliorée du produit:', error);
      throw error;
    }
  }
}
