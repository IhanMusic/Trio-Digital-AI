import axios from 'axios';
import Post, { IPost } from '../models/Post';
import Product, { IProduct } from '../models/Product';
import { IBrand } from '../models/Brand';
import { IUser } from '../models/User';
import { logger } from '../config/logger';
import { parseGPTResponse } from '../utils/promptParser';
import { GeminiImageService } from './GeminiImageService';
import { GPTCreativeDirector } from './GPTCreativeDirector';
import { CannesLionsImageScorer, ScoredImage } from './CannesLionsImageScorer';
// import { config } from '../config/env';
import sharp from 'sharp';

interface EnhancementContext {
  originalPost: IPost;
  brand: IBrand;
  user: IUser;
  enhancementType: 'enhanced' | 'adapted';
  targetProduct?: IProduct;
}

interface EnhancedPostData {
  postContent: string;
  imagePrompt: string;
  imageStyle: string;
  hashtags: string[];
  callToAction: string;
  audienceTargeting: string;
  competitiveEdge: string;
  legalCompliance: string;
  culturalRelevance: string;
}

class PostEnhancementService {
  private lastOpenAICallTime: number = 0;
  private readonly OPENAI_MIN_DELAY_MS = 1000;

  /**
   * Attendre pour respecter le rate limit OpenAI
   */
  private async waitForOpenAIRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastOpenAICallTime;
    
    if (timeSinceLastCall < this.OPENAI_MIN_DELAY_MS) {
      const waitTime = this.OPENAI_MIN_DELAY_MS - timeSinceLastCall;
      logger.info(`⏳ Attente de ${waitTime}ms pour respecter le rate limit OpenAI...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastOpenAICallTime = Date.now();
  }

  /**
   * Améliore un post existant en gardant le même produit
   */
  async enhancePost(originalPost: IPost, brand: IBrand, user: IUser): Promise<IPost> {
    logger.info('🎨 === ENHANCEMENT D\'UN POST EXISTANT ===');
    logger.info(`Post original: ${originalPost._id}`);
    logger.info(`Plateforme: ${originalPost.platform}`);

    try {
      // Récupérer les produits associés au post original
      const products = await Product.find({
        _id: { $in: originalPost.products || [] }
      });

      const context: EnhancementContext = {
        originalPost,
        brand,
        user,
        enhancementType: 'enhanced'
      };

      // Générer le contenu amélioré
      const enhancedContent = await this.regenerateContent(context, products);

      // Créer le nouveau post amélioré
      const enhancedPostData = {
        calendarId: originalPost.calendarId,
        brandId: originalPost.brandId,
        createdBy: user._id,
        platform: originalPost.platform,
        scheduledDate: originalPost.scheduledDate,
        content: {
          text: enhancedContent.postContent,
          mediaType: originalPost.content.mediaType,
          imageUrl: '', // Sera rempli après génération d'image
          imageUrls: [],
          imagePublicId: '',
          imagePrompt: enhancedContent.imagePrompt,
          imageStyle: enhancedContent.imageStyle,
          contentType: originalPost.content.contentType
        },
        status: 'pending_validation',
        tags: originalPost.tags,
        hashtags: enhancedContent.hashtags,
        callToAction: enhancedContent.callToAction,
        audienceTargeting: enhancedContent.audienceTargeting,
        competitiveEdge: enhancedContent.competitiveEdge,
        legalCompliance: enhancedContent.legalCompliance,
        culturalRelevance: enhancedContent.culturalRelevance,
        keyDates: originalPost.keyDates,
        aiGenerated: true,
        products: originalPost.products,
        // Nouveaux champs pour le tracking
        originalPostId: originalPost._id,
        enhancementType: 'enhanced' as 'enhanced' | 'adapted',
        enhancementHistory: [{
          originalPostId: originalPost._id,
          enhancementType: 'enhanced' as 'enhanced' | 'adapted',
          createdAt: new Date()
        }]
      };

      // Générer la nouvelle image
      await this.generateEnhancedImage(enhancedPostData, enhancedContent.imagePrompt, products, brand);

      // Sauvegarder le post amélioré
      const enhancedPost = await Post.create(enhancedPostData);
      logger.info(`✅ Post amélioré créé: ${enhancedPost._id}`);

      return enhancedPost;

    } catch (error: any) {
      logger.error('❌ Erreur lors de l\'enhancement du post:', error.message);
      throw error;
    }
  }

  /**
   * Adapte un post existant pour un autre produit
   */
  async adaptPostForProduct(originalPost: IPost, targetProduct: IProduct, brand: IBrand, user: IUser): Promise<IPost> {
    logger.info('🔄 === ADAPTATION D\'UN POST POUR UN AUTRE PRODUIT ===');
    logger.info(`Post original: ${originalPost._id}`);
    logger.info(`Produit cible: ${targetProduct.name}`);
    logger.info(`Plateforme: ${originalPost.platform}`);

    try {
      const context: EnhancementContext = {
        originalPost,
        brand,
        user,
        enhancementType: 'adapted',
        targetProduct
      };

      // Générer le contenu adapté pour le nouveau produit
      const adaptedContent = await this.regenerateContent(context, [targetProduct]);

      // Créer le nouveau post adapté
      const adaptedPostData = {
        calendarId: originalPost.calendarId,
        brandId: originalPost.brandId,
        createdBy: user._id,
        platform: originalPost.platform,
        scheduledDate: originalPost.scheduledDate,
        content: {
          text: adaptedContent.postContent,
          mediaType: originalPost.content.mediaType,
          imageUrl: '', // Sera rempli après génération d'image
          imageUrls: [],
          imagePublicId: '',
          imagePrompt: adaptedContent.imagePrompt,
          imageStyle: adaptedContent.imageStyle,
          contentType: originalPost.content.contentType
        },
        status: 'pending_validation',
        tags: originalPost.tags,
        hashtags: adaptedContent.hashtags,
        callToAction: adaptedContent.callToAction,
        audienceTargeting: adaptedContent.audienceTargeting,
        competitiveEdge: adaptedContent.competitiveEdge,
        legalCompliance: adaptedContent.legalCompliance,
        culturalRelevance: adaptedContent.culturalRelevance,
        keyDates: originalPost.keyDates,
        aiGenerated: true,
        products: [targetProduct._id],
        // Nouveaux champs pour le tracking
        originalPostId: originalPost._id,
        enhancementType: 'adapted' as 'enhanced' | 'adapted',
        enhancementHistory: [{
          originalPostId: originalPost._id,
          enhancementType: 'adapted' as 'enhanced' | 'adapted',
          createdAt: new Date(),
          targetProduct: targetProduct._id
        }]
      };

      // Générer la nouvelle image adaptée au produit
      await this.generateEnhancedImage(adaptedPostData, adaptedContent.imagePrompt, [targetProduct], brand);

      // Sauvegarder le post adapté
      const adaptedPost = await Post.create(adaptedPostData);
      logger.info(`✅ Post adapté créé: ${adaptedPost._id}`);

      return adaptedPost;

    } catch (error: any) {
      logger.error('❌ Erreur lors de l\'adaptation du post:', error.message);
      throw error;
    }
  }

  /**
   * Génère le contenu amélioré/adapté avec GPT-5
   */
  private async regenerateContent(context: EnhancementContext, products: IProduct[]): Promise<EnhancedPostData> {
    const { originalPost, brand, enhancementType, targetProduct } = context;

    // Vérifier que la clé API est disponible
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      throw new Error('Clé API OpenAI non configurée');
    }

    // Attendre pour respecter le rate limit
    await this.waitForOpenAIRateLimit();

    const isEnhancement = enhancementType === 'enhanced';
    const actionType = isEnhancement ? 'AMÉLIORATION' : 'ADAPTATION';
    const productInfo = targetProduct || (products.length > 0 ? products[0] : null);

    logger.info(`🤖 Génération ${actionType} avec GPT-5...`);

    const systemPrompt = `Vous êtes un expert en amélioration de contenu publicitaire de niveau Cannes Lions.

${isEnhancement ? `
🎨 MISSION: AMÉLIORER LE CONTENU EXISTANT
Votre tâche est d'améliorer significativement le post existant en gardant le même produit et la même essence créative, mais en:
- Rendant le texte plus percutant et engageant
- Améliorant l'accroche et le storytelling
- Optimisant les hashtags pour plus de portée
- Renforçant le call-to-action
- Créant un prompt d'image plus créatif et professionnel
` : `
🔄 MISSION: ADAPTER POUR UN NOUVEAU PRODUIT
Votre tâche est d'adapter le concept créatif du post original pour un nouveau produit en:
- Gardant l'essence et le style créatif du post original
- Adaptant le contenu spécifiquement au nouveau produit
- Conservant la structure narrative qui fonctionnait
- Ajustant les bénéfices et caractéristiques au nouveau produit
- Créant un prompt d'image cohérent avec le nouveau produit
`}

CONTRAINTES STRICTES:
- Respecter la longueur optimale pour ${originalPost.platform}
- Garder le même ton et style de communication
- Maintenir la cohérence avec la marque ${brand.name}
- ${isEnhancement ? 'Améliorer sans dénaturer l\'essence originale' : 'Adapter fidèlement au nouveau produit'}

FORMAT DE RÉPONSE OBLIGATOIRE:
---POST #1---
[Contenu ${isEnhancement ? 'amélioré' : 'adapté'}]

---HASHTAGS---
[Hashtags optimisés]

---CALL TO ACTION---
[CTA ${isEnhancement ? 'renforcé' : 'adapté'}]

---IMAGE PROMPT #1---
[Prompt d'image ${isEnhancement ? 'amélioré' : 'adapté'} en anglais]

---IMAGE STYLE---
[Style d'image détaillé]

---AUDIENCE TARGETING---
[Ciblage audience]

---COMPETITIVE EDGE---
[Avantage concurrentiel]

---LEGAL COMPLIANCE---
[Conformité légale]

---CULTURAL RELEVANCE---
[Pertinence culturelle]`;

    const userPrompt = `${actionType} du post suivant:

POST ORIGINAL:
Plateforme: ${originalPost.platform}
Texte: "${originalPost.content.text}"
Hashtags: ${originalPost.hashtags?.join(' ') || 'Aucun'}
CTA: ${originalPost.callToAction || 'Aucun'}

MARQUE:
Nom: ${brand.name}
Secteur: ${brand.sector}
Description: ${brand.description}

${isEnhancement ? `
PRODUIT ACTUEL (à conserver):
${productInfo ? `
- Nom: ${productInfo.name}
- Description: ${productInfo.description}
- Catégorie: ${productInfo.category}
- Points forts: ${productInfo.uniqueSellingPoints?.join(', ') || 'N/A'}
- Bénéfices: ${productInfo.customerBenefits?.join(', ') || 'N/A'}
` : 'Aucun produit spécifique'}

OBJECTIF: Créer une version AMÉLIORÉE du même post qui soit plus percutante, engageante et professionnelle.
` : `
NOUVEAU PRODUIT (adaptation cible):
- Nom: ${targetProduct!.name}
- Description: ${targetProduct!.description}
- Catégorie: ${targetProduct!.category}
- Points forts: ${targetProduct!.uniqueSellingPoints?.join(', ') || 'N/A'}
- Bénéfices: ${targetProduct!.customerBenefits?.join(', ') || 'N/A'}

OBJECTIF: Adapter le concept créatif du post original pour ce nouveau produit en gardant ce qui fonctionnait.
`}

Créez un contenu ${isEnhancement ? 'amélioré' : 'adapté'} qui surpasse l'original en qualité et impact.`;

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-5',
        reasoning_effort: 'medium',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const content = response.data.choices[0].message.content;
      logger.info(`✅ Contenu ${actionType} généré par GPT-5`);

      const parsedPosts = parseGPTResponse(content);
      if (parsedPosts.length === 0) {
        throw new Error(`Impossible de parser le contenu ${actionType} généré`);
      }

      const parsedPost = parsedPosts[0];
      return {
        postContent: parsedPost.postContent || '',
        imagePrompt: parsedPost.imagePrompt || '',
        imageStyle: parsedPost.imageStyle || '',
        hashtags: parsedPost.hashtags || [],
        callToAction: parsedPost.callToAction || '',
        audienceTargeting: parsedPost.audienceTargeting || '',
        competitiveEdge: parsedPost.competitiveEdge || '',
        legalCompliance: parsedPost.legalCompliance || '',
        culturalRelevance: parsedPost.culturalRelevance || ''
      };

    } catch (error: any) {
      logger.error(`❌ Erreur lors de la génération ${actionType}:`, error.message);
      throw error;
    }
  }

  /**
   * Génère l'image améliorée/adaptée
   */
  private async generateEnhancedImage(postData: any, imagePrompt: string, products: IProduct[], brand: IBrand): Promise<void> {
    logger.info('🎨 === GÉNÉRATION IMAGE AMÉLIORÉE ===');

    try {
      // Préparer les images de référence des produits
      let referenceImagesBase64: string[] = [];
      let hasProductReference = false;

      for (const product of products) {
        if (product.images && product.images.main) {
          try {
            logger.info(`📸 Traitement image produit: ${product.name}`);
            
            let imageBuffer: Buffer;
            
            if (product.images.main.startsWith('http')) {
              const response = await axios.get(product.images.main, { 
                responseType: 'arraybuffer',
                timeout: 30000
              });
              imageBuffer = Buffer.from(response.data);
            } else {
              const fs = await import('fs');
              const path = await import('path');
              const fullPath = path.join(process.cwd(), 'public', product.images.main);
              imageBuffer = await fs.promises.readFile(fullPath);
            }
            
            // Transformer en haute résolution
            const highResBuffer = await sharp(imageBuffer)
              .resize(2048, 2048, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 1 }
              })
              .png({ quality: 100 })
              .toBuffer();
            
            const productImageBase64 = highResBuffer.toString('base64');
            referenceImagesBase64.push(productImageBase64);
            hasProductReference = true;
            
            logger.info(`✅ Image produit ${product.name} traitée`);
          } catch (error: any) {
            logger.error(`❌ Erreur traitement image ${product.name}:`, error.message);
          }
        }
      }

      // Utiliser GPT Creative Director pour améliorer le prompt
      const brandData = {
        name: brand.name,
        sector: brand.sector,
        pricePositioning: brand.pricePositioning,
        businessType: brand.businessType,
        colors: brand.colors,
        description: brand.description,
        values: brand.values
      };

      const productData = products.length > 0 ? {
        name: products[0].name,
        category: products[0].category,
        description: products[0].description,
        uniqueSellingPoints: products[0].uniqueSellingPoints,
        customerBenefits: products[0].customerBenefits
      } : {
        name: brand.name,
        category: 'general',
        description: brand.description || 'Produit de qualité'
      };

      const calendarData = {
        campaignObjective: 'engagement',
        communicationStyle: 'professionnel'
      };

      const postContext = {
        postIndex: 0,
        totalPosts: 1,
        scheduledDate: new Date().toISOString(),
        platform: postData.platform,
        country: 'FR',
        generatedText: postData.content.text,
        originalImagePrompt: imagePrompt
      };

      // Générer le prompt amélioré
      let finalImagePrompt: string;
      try {
        finalImagePrompt = await GPTCreativeDirector.generateImagePrompt(
          brandData,
          productData,
          calendarData,
          postContext,
          'enhancement'
        );
        logger.info('✅ Prompt d\'image amélioré par GPT Creative Director');
      } catch (error: any) {
        logger.error('❌ Erreur GPT Creative Director:', error.message);
        finalImagePrompt = imagePrompt;
      }

      // Générer les variations d'image
      const generatedVariations = [];
      
      for (let variation = 1; variation <= 2; variation++) {
        try {
          logger.info(`📸 Génération variation ${variation}/2...`);
          
          const adjustedStrength = hasProductReference ? 0.7 + ((variation - 1) * 0.05) : undefined;
          
          let geminiResults;
          if (referenceImagesBase64.length > 1) {
            geminiResults = await GeminiImageService.generateImages(
              finalImagePrompt,
              {
                numberOfImages: 1,
                aspectRatio: postData.platform === 'instagram' ? '3:4' : '1:1',
                imageSize: '2K',
                referenceImages: referenceImagesBase64,
                referenceImageStrength: adjustedStrength
              }
            );
          } else if (referenceImagesBase64.length === 1) {
            geminiResults = await GeminiImageService.generateImages(
              finalImagePrompt,
              {
                numberOfImages: 1,
                aspectRatio: postData.platform === 'instagram' ? '3:4' : '1:1',
                imageSize: '2K',
                referenceImage: referenceImagesBase64[0],
                referenceImageStrength: adjustedStrength
              }
            );
          } else {
            geminiResults = await GeminiImageService.generateImages(
              finalImagePrompt,
              {
                numberOfImages: 1,
                aspectRatio: postData.platform === 'instagram' ? '3:4' : '1:1',
                imageSize: '2K'
              }
            );
          }
          
          if (geminiResults.length > 0) {
            generatedVariations.push({
              url: geminiResults[0].url,
              width: geminiResults[0].width,
              height: geminiResults[0].height,
              variation
            });
            logger.info(`✅ Variation ${variation} générée`);
          }
        } catch (error: any) {
          logger.error(`❌ Erreur variation ${variation}:`, error.message);
        }
      }

      // Scorer et sélectionner la meilleure image
      if (generatedVariations.length > 0) {
        logger.info('🏆 Scoring des variations...');
        
        const scoredVariations: ScoredImage[] = [];
        
        for (const variation of generatedVariations) {
          try {
            const score = await CannesLionsImageScorer.scoreImage(
              variation.url,
              variation.variation,
              false, // hasHands
              postData.content.text
            );
            
            scoredVariations.push({
              ...variation,
              score
            });
          } catch (error: any) {
            logger.error(`❌ Erreur scoring variation ${variation.variation}:`, error.message);
            // Score par défaut en cas d'erreur
            scoredVariations.push({
              ...variation,
              score: {
                overall: 75,
                anatomicalAccuracy: 75,
                compositionExcellence: 75,
                lightingMastery: 75,
                productFidelity: 75,
                technicalSharpness: 75,
                colorAccuracy: 75,
                realismAuthenticity: 75,
                emotionalImpact: 75,
                brandIntegration: 75,
                detailRichness: 75,
                handQuality: 75,
                backgroundQuality: 75,
                professionalism: 75,
                creativeExcellence: 75,
                cannesLionsPotential: 75,
                visualStorytelling: 75,
                textImageCoherence: 75,
                memorability: 75,
                culturalRelevance: 75,
                criticalIssues: [],
                minorImprovements: [],
                recommendations: [],
                regenerationRequired: false
              }
            });
          }
        }
        
        // Sélectionner la meilleure image
        const bestImage = CannesLionsImageScorer.selectBestImage(scoredVariations);
        postData.content.imageUrl = bestImage.url;
        
        logger.info(`✅ Image sélectionnée - Score: ${bestImage.score.overall}/100`);
      } else {
        logger.error('❌ Aucune variation d\'image générée');
      }

    } catch (error: any) {
      logger.error('❌ Erreur génération image améliorée:', error.message);
      throw error;
    }
  }
}

export default new PostEnhancementService();
