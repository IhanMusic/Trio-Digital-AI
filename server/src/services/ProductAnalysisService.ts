import { IProduct } from '../models/Product';
import { logger } from '../config/logger';
import axios from 'axios';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

/**
 * Interface pour les caractéristiques visuelles d'un produit
 */
export interface ProductFeatures {
  name: string;
  category: string;
  description: string;
  dimensions: {
    width: number;
    height: number;
  };
  shape: 'rectangle' | 'ellipse' | 'irregular';
  colors: {
    dominant?: string[];
  };
  texture?: string;
  transparency?: number;
  reflectivity?: number;
  detailLevel?: number;
}

/**
 * Service d'analyse détaillée des produits pour améliorer les prompts d'image
 */
class ProductAnalysisService {
  /**
   * Génère une analyse détaillée d'un produit pour Stability Ultra
   * @param product Le produit à analyser
   * @param options Options supplémentaires pour l'analyse
   * @returns Une analyse détaillée formatée pour Stability Ultra
   */
  async generateDetailedAnalysis(
    product: IProduct,
    options: {
      purpose?: 'social' | 'product' | 'lifestyle';
      context?: string;
      includeBackground?: boolean;
      style?: string;
      angle?: 'front' | 'side' | 'top' | 'isometric' | '3/4';
      lighting?: 'studio' | 'natural' | 'dramatic' | 'soft' | 'bright';
    } = {}
  ): Promise<string> {
    logger.info(`Génération d'une analyse détaillée pour le produit: ${product.name}`);
    
    try {
      // Extraire toutes les caractéristiques pertinentes du produit
      const productDetails = this.extractProductDetails(product);
      
      // Générer une analyse détaillée avec GPT-4
      const analysis = await this.generateAnalysisWithGPT(product, productDetails, options);
      
      logger.info(`Analyse détaillée générée avec succès pour ${product.name}`);
      return analysis;
    } catch (error: any) {
      logger.error(`Erreur lors de l'analyse du produit ${product.name}:`, error);
      // Retourner une analyse de base en cas d'erreur
      return this.generateBasicAnalysis(product, options);
    }
  }
  
  /**
   * Extrait toutes les caractéristiques pertinentes d'un produit
   */
  private extractProductDetails(product: IProduct): Record<string, any> {
    return {
      // Informations de base
      name: product.name,
      description: product.description,
      category: product.category,
      
      // Caractéristiques spécifiques
      flavors: product.flavors || [],
      scents: product.scents || [],
      
      // Points forts et bénéfices
      uniqueSellingPoints: product.uniqueSellingPoints || [],
      customerBenefits: product.customerBenefits || [],
      
      // Fiche technique
      technicalSheet: {
        ingredients: product.technicalSheet?.ingredients || [],
        nutritionalInfo: product.technicalSheet?.nutritionalInfo || '',
        usage: product.technicalSheet?.usage || '',
        storage: product.technicalSheet?.storage || '',
        highlights: product.technicalSheet?.highlights || '',
        specifications: product.technicalSheet?.specifications || {}
      },
      
      // Images disponibles
      hasMainImage: !!product.images?.main,
      hasGallery: Array.isArray(product.images?.gallery) && product.images.gallery.length > 0
    };
  }
  
  /**
   * Génère une analyse détaillée avec GPT-4
   */
  private async generateAnalysisWithGPT(
    product: IProduct,
    productDetails: Record<string, any>,
    options: Record<string, any>
  ): Promise<string> {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      logger.error('Clé API OpenAI manquante pour l\'analyse de produit');
      return this.generateBasicAnalysis(product, options);
    }
    
    try {
      logger.info('Envoi de la requête à GPT-4 pour l\'analyse détaillée du produit');
      
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-5',
        reasoning_effort: 'low',
        messages: [
          {
            role: 'system',
            content: `Vous êtes un expert en photographie de produits et en direction artistique, spécialisé dans la création de prompts détaillés pour Stability AI Ultra. Votre mission est de créer une analyse détaillée et précise d'un produit qui sera utilisée pour générer des images photoréalistes.

DIRECTIVES:
1. Analysez toutes les caractéristiques physiques du produit en détail
2. Décrivez précisément les matériaux, textures, couleurs et finitions
3. Spécifiez les proportions, dimensions et forme générale
4. Identifiez les éléments distinctifs et caractéristiques uniques
5. Décrivez l'emballage si pertinent
6. Incluez des détails sur l'éclairage idéal pour mettre en valeur le produit
7. Suggérez l'angle de vue optimal pour présenter le produit
8. Précisez le contexte/environnement approprié pour le produit
9. Utilisez un vocabulaire technique et précis
10. Structurez l'analyse de manière logique et complète

FORMAT DE RÉPONSE:
Fournissez une description détaillée en anglais, optimisée pour Stability AI Ultra, qui capture tous les aspects visuels importants du produit. N'incluez pas d'introduction ni de conclusion - uniquement la description technique détaillée.`
          },
          {
            role: 'user',
            content: `Créez une analyse détaillée pour ce produit qui sera utilisée comme prompt pour Stability AI Ultra:

INFORMATIONS PRODUIT:
- Nom: ${product.name}
- Description: ${product.description}
- Catégorie: ${product.category}
${product.flavors?.length ? `- Arômes/Saveurs: ${product.flavors.join(', ')}` : ''}
${product.scents?.length ? `- Parfums/Odeurs: ${product.scents.join(', ')}` : ''}
${product.uniqueSellingPoints?.length ? `- Points forts: ${product.uniqueSellingPoints.join(', ')}` : ''}
${product.customerBenefits?.length ? `- Bénéfices client: ${product.customerBenefits.join(', ')}` : ''}

FICHE TECHNIQUE:
${product.technicalSheet?.ingredients?.length ? `- Ingrédients: ${product.technicalSheet.ingredients.join(', ')}` : ''}
${product.technicalSheet?.nutritionalInfo ? `- Informations nutritionnelles: ${product.technicalSheet.nutritionalInfo}` : ''}
${product.technicalSheet?.usage ? `- Utilisation: ${product.technicalSheet.usage}` : ''}
${product.technicalSheet?.storage ? `- Conservation: ${product.technicalSheet.storage}` : ''}
${product.technicalSheet?.highlights ? `- Points clés: ${product.technicalSheet.highlights}` : ''}
${product.technicalSheet?.specifications ? `- Spécifications: ${JSON.stringify(product.technicalSheet.specifications)}` : ''}

CONTEXTE D'UTILISATION:
- Objectif: ${options.purpose || 'social media'}
- Style souhaité: ${options.style || 'photorealistic product photography'}
- Angle de vue: ${options.angle || 'optimal product presentation angle'}
- Éclairage: ${options.lighting || 'professional studio lighting'}
- Inclure arrière-plan/contexte: ${options.includeBackground ? 'Oui' : 'Non'}
${options.context ? `- Contexte spécifique: ${options.context}` : ''}

Générez une description détaillée en anglais qui capture tous les aspects visuels importants de ce produit pour Stability AI Ultra.`
          }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      const analysis = response.data.choices[0].message.content;
      logger.info('Analyse détaillée générée avec succès');
      
      return analysis;
    } catch (error: any) {
      logger.error('Erreur lors de la génération de l\'analyse avec GPT:', error.message);
      return this.generateBasicAnalysis(product, options);
    }
  }
  
  /**
   * Génère une analyse de base en cas d'échec de l'analyse détaillée
   */
  private generateBasicAnalysis(
    product: IProduct,
    options: Record<string, any>
  ): string {
    logger.info(`Génération d'une analyse de base pour ${product.name}`);
    
    // Construire une description de base (les couleurs sont maintenant au niveau de la marque)
    const colorInfo = '';
    
    const categoryInfo = product.category 
      ? `in the ${product.category} category` 
      : '';
    
    const styleInfo = options.style 
      ? `in ${options.style} style` 
      : 'in photorealistic style';
    
    const lightingInfo = options.lighting 
      ? `with ${options.lighting} lighting` 
      : 'with professional studio lighting';
    
    const angleInfo = options.angle 
      ? `from a ${options.angle} angle` 
      : 'from the optimal presentation angle';
    
    // Construire l'analyse de base
    return `A detailed, photorealistic image of ${product.name}, ${categoryInfo} ${colorInfo}. 
The product should be shown ${angleInfo}, ${lightingInfo}, ${styleInfo}, 
with high attention to detail, texture, and material quality. 
${product.description}`;
  }
  
  /**
   * Extrait les caractéristiques visuelles d'un produit à partir de son image
   * @param productImagePath Chemin vers l'image du produit
   * @param product Informations du produit
   * @returns Caractéristiques visuelles du produit
   */
  async extractProductFeatures(
    productImagePath: string,
    product?: IProduct
  ): Promise<ProductFeatures> {
    logger.info(`Extraction des caractéristiques visuelles du produit: ${product?.name || 'inconnu'}`);
    
    try {
      // Télécharger l'image si c'est une URL
      let localImagePath = productImagePath;
      if (productImagePath.startsWith('http')) {
        logger.info(`Téléchargement de l'image depuis ${productImagePath}...`);
        const response = await axios.get(productImagePath, { responseType: 'arraybuffer' });
        const tempPath = path.join(process.cwd(), 'temp', `temp-product-${Date.now()}.png`);
        
        // Créer le dossier temp s'il n'existe pas
        const tempDir = path.join(process.cwd(), 'temp');
        if (!fs.existsSync(tempDir)) {
          fs.mkdirSync(tempDir, { recursive: true });
        }
        
        fs.writeFileSync(tempPath, Buffer.from(response.data));
        localImagePath = tempPath;
        logger.info(`Image téléchargée et sauvegardée temporairement: ${localImagePath}`);
      }
      
      // Analyser l'image avec sharp
      const metadata = await sharp(localImagePath).metadata();
      const { width = 0, height = 0 } = metadata;
      
      // Extraire les couleurs dominantes
      const stats = await sharp(localImagePath)
        .resize(100) // Réduire la taille pour accélérer l'analyse
        .stats();
      
      // Déterminer les couleurs dominantes à partir des canaux
      const channels = stats.channels;
      const dominantColors = [];
      
      // Convertir les valeurs RGB en couleurs hexadécimales
      if (channels.length >= 3) {
        const r = Math.round(channels[0].mean);
        const g = Math.round(channels[1].mean);
        const b = Math.round(channels[2].mean);
        dominantColors.push(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
      }
      
      // Déterminer la forme approximative du produit
      // Pour une analyse plus précise, on pourrait utiliser des algorithmes de détection de contours
      // mais pour simplifier, on utilise le ratio largeur/hauteur
      let shape: 'rectangle' | 'ellipse' | 'irregular' = 'rectangle';
      const ratio = width / height;
      
      if (ratio > 0.9 && ratio < 1.1) {
        // Si le ratio est proche de 1, c'est probablement un cercle ou un carré
        shape = 'ellipse';
      } else if (ratio > 2 || ratio < 0.5) {
        // Si le ratio est très différent de 1, c'est probablement un rectangle
        shape = 'rectangle';
      } else {
        // Sinon, on considère que c'est une forme irrégulière
        shape = 'irregular';
      }
      
      // Construire les caractéristiques du produit
      const features: ProductFeatures = {
        name: product?.name || 'Product',
        category: product?.category || 'Unknown',
        description: product?.description || '',
        dimensions: {
          width,
          height
        },
        shape,
        colors: {
          dominant: dominantColors
        },
        texture: 'smooth', // Valeur par défaut
        transparency: 0, // Valeur par défaut
        reflectivity: 0.5, // Valeur par défaut
        detailLevel: 8 // Valeur par défaut sur une échelle de 1 à 10
      };
      
      logger.info('Caractéristiques visuelles extraites avec succès');
      return features;
    } catch (error: any) {
      logger.error('Erreur lors de l\'extraction des caractéristiques visuelles:', error.message);
      
      // Retourner des caractéristiques par défaut en cas d'erreur
      return {
        name: product?.name || 'Product',
        category: product?.category || 'Unknown',
        description: product?.description || '',
        dimensions: {
          width: 500,
          height: 500
        },
        shape: 'rectangle',
        colors: {
          dominant: []
        }
      };
    }
  }
  
  /**
   * Génère un prompt détaillé pour l'intégration d'un produit basé sur ses caractéristiques
   * @param features Caractéristiques du produit
   * @param basePrompt Prompt de base (optionnel)
   * @returns Prompt détaillé pour l'intégration du produit
   */
  generateDetailedProductPrompt(
    features: ProductFeatures,
    basePrompt?: string
  ): string {
    logger.info(`Génération d'un prompt détaillé pour l'intégration du produit: ${features.name}`);
    
    // Construire la description des couleurs (basé sur les couleurs dominantes extraites de l'image)
    let colorDescription = '';
    if (features.colors.dominant && features.colors.dominant.length > 0) {
      colorDescription += colorDescription ? `, with dominant colors ${features.colors.dominant.join(', ')}` : `with dominant colors ${features.colors.dominant.join(', ')}`;
    }
    
    // Construire la description de la forme
    const shapeDescription = features.shape === 'rectangle' 
      ? 'rectangular shape' 
      : features.shape === 'ellipse' 
        ? 'elliptical/circular shape' 
        : 'irregular shape';
    
    // Construire le prompt détaillé
    const detailedPrompt = `${basePrompt ? basePrompt + '\n\n' : ''}A photorealistic, high-quality image of ${features.name}, a ${features.category} product with ${shapeDescription} and ${colorDescription}. 

The product should be rendered with exact fidelity to its original appearance, maintaining all original design elements, labels, packaging details, and brand identity. The product must be the exact same ${features.name} as in the reference image, with no alterations to its fundamental design or appearance.

Preserve all text, logos, and graphic elements exactly as they appear on the original product. Maintain the precise color scheme, proportions, and distinctive features that make this product immediately recognizable as ${features.name}.

The lighting should enhance the product's details and textures while maintaining color accuracy. The product should be perfectly integrated into the scene with realistic shadows and reflections that match the environment's lighting conditions.`;
    
    logger.info('Prompt détaillé généré avec succès');
    return detailedPrompt;
  }

  /**
   * Enrichit un prompt existant avec l'analyse détaillée du produit
   */
  async enhancePromptWithProductAnalysis(
    prompt: string,
    product: IProduct,
    options: {
      purpose?: 'social' | 'product' | 'lifestyle';
      context?: string;
      includeBackground?: boolean;
      style?: string;
      angle?: 'front' | 'side' | 'top' | 'isometric' | '3/4';
      lighting?: 'studio' | 'natural' | 'dramatic' | 'soft' | 'bright';
    } = {}
  ): Promise<string> {
    logger.info(`Enrichissement du prompt avec l'analyse du produit: ${product.name}`);
    
    try {
      // Générer l'analyse détaillée du produit
      const productAnalysis = await this.generateDetailedAnalysis(product, options);
      
      // Combiner le prompt original avec l'analyse du produit
      const enhancedPrompt = `${prompt}

DETAILED PRODUCT SPECIFICATIONS:
${productAnalysis}

The image must accurately represent all the product details described above while maintaining the creative direction of the original prompt.`;
      
      logger.info('Prompt enrichi avec succès');
      return enhancedPrompt;
    } catch (error: any) {
      logger.error('Erreur lors de l\'enrichissement du prompt:', error.message);
      return prompt; // Retourner le prompt original en cas d'erreur
    }
  }
}

export default new ProductAnalysisService();
