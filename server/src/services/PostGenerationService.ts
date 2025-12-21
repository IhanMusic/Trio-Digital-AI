import axios from 'axios';
import * as path from 'path';
import { ICalendar } from '../models/Calendar';
import Post, { IPost } from '../models/Post';
import { IBrand } from '../models/Brand';
import { IUser } from '../models/User';
import { Document } from 'mongoose';
import { OpenAIResponse, OpenAIChoice } from '../types/openai';
import { GeminiImageService } from './GeminiImageService';
import { logger } from '../config/logger';
import { getLanguageName, isDialect, getDialectInfo, getDialectPromptInstructions } from '../utils/languageUtils';
import Product, { IProduct } from '../models/Product';
import KeyDateService from './KeyDateService';
import { parseGPTResponse } from '../utils/promptParser';
import { ProductIntegrationWithStabilityService } from './ProductIntegrationWithStabilityService';
import Veo3Service from './Veo3Service';
import sharp from 'sharp';
import { GPTCreativeDirector } from './GPTCreativeDirector';
import { GPTVideoCreativeDirector } from './GPTVideoCreativeDirector';
import { CannesLionsImageScorer, ScoredImage } from './CannesLionsImageScorer';
import { CreativeOrchestrator } from '../creative-engine/orchestrator/CreativeOrchestrator';
import VisualStrategistService, { VisualStrategy, VisualStrategyContext } from './VisualStrategistService';

// 🔥 CONFIGURATION GÉNÉRATION VIDÉO
// Mettre à true pour générer des REELs au lieu d'images
const GENERATE_VIDEO = true; // ✅ ACTIVÉ - Génère UNE vidéo REEL par calendrier
const VIDEOS_PER_CALENDAR = 1; // Nombre de vidéos à générer par calendrier (pour test)

/**
 * Parse la sélection de produits GPT-5 et retourne les produits correspondants
 * @param productsSelected - String de sélection GPT-5 (ex: "1,3" ou "2")
 * @param products - Liste des produits disponibles
 * @param postIndex - Index du post actuel (pour diversité)
 * @param totalPosts - Nombre total de posts (pour diversité)
 * @returns Array des produits sélectionnés
 */
function parseGPTProductSelection(
  productsSelected: string | undefined,
  products: IProduct[],
  postIndex: number,
  totalPosts: number
): IProduct[] {
  // Si aucun produit disponible, retourner tableau vide
  if (products.length === 0) {
    return [];
  }

  // Si GPT-5 a fourni une sélection, l'utiliser
  if (productsSelected && productsSelected.trim()) {
    try {
      // Parser les indices des produits sélectionnés (ex: "1,3" ou "1,2,3")
      const indices = productsSelected.split(',').map(s => parseInt(s.trim()) - 1); // -1 car GPT utilise 1-based indexing
      const validIndices = indices.filter(i => i >= 0 && i < products.length);
      const selectedProducts = validIndices.map(i => products[i]);
      
      if (selectedProducts.length > 0) {
        logger.info(`✅ GPT-5 sélection parsée: ${selectedProducts.map(p => p.name).join(', ')}`);
        return selectedProducts;
      }
    } catch (error: any) {
      logger.error('❌ Erreur parsing sélection produits GPT-5:', error.message);
    }
  }

  // Fallback intelligent : diversifier automatiquement selon l'index du post
  logger.info('⚠️  Aucune sélection GPT-5 valide, utilisation de la diversification automatique');
  
  // Stratégie de diversification : alterner les produits selon l'index
  if (products.length === 1) {
    return [products[0]];
  } else if (products.length === 2) {
    // Alterner entre les 2 produits
    const selectedIndex = postIndex % 2;
    logger.info(`🔄 Diversification 2 produits: Post ${postIndex + 1} → Produit ${selectedIndex + 1} (${products[selectedIndex].name})`);
    return [products[selectedIndex]];
  } else {
    // Pour 3+ produits, utiliser une rotation plus complexe
    const selectedIndex = postIndex % products.length;
    logger.info(`🔄 Diversification ${products.length} produits: Post ${postIndex + 1} → Produit ${selectedIndex + 1} (${products[selectedIndex].name})`);
    return [products[selectedIndex]];
  }
}

/**
 * Transforme une image (Buffer) en format carré en ajoutant du padding blanc
 */
async function makeImageSquareFromBuffer(imageBuffer: Buffer): Promise<Buffer> {
  try {
    logger.info('Transformation du buffer d\'image en format carré');
    
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();
    
    if (!metadata.width || !metadata.height) {
      throw new Error('Impossible de lire les dimensions de l\'image');
    }
    
    const width = metadata.width;
    const height = metadata.height;
    
    // Si l'image est déjà carrée, la retourner telle quelle
    if (width === height) {
      logger.info('Image déjà carrée, aucune transformation nécessaire');
      return await image.png().toBuffer();
    }
    
    // Déterminer la taille du carré (la plus grande dimension)
    const size = Math.max(width, height);
    
    logger.info(`Dimensions originales: ${width}x${height}, nouvelle taille: ${size}x${size}`);
    
    // Redimensionner avec padding blanc pour obtenir un carré
    const squareBuffer = await image
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toBuffer();
    
    logger.info('✅ Image transformée en carré avec succès');
    return squareBuffer;
  } catch (error: any) {
    logger.error('❌ Erreur lors de la transformation en carré:', error.message);
    throw error;
  }
}

/**
 * Transforme une image (chemin de fichier) en format carré en ajoutant du padding blanc
 */
async function makeImageSquare(imagePath: string): Promise<Buffer> {
  try {
    logger.info(`Transformation de l'image en format carré: ${imagePath}`);
    
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    if (!metadata.width || !metadata.height) {
      throw new Error('Impossible de lire les dimensions de l\'image');
    }
    
    const width = metadata.width;
    const height = metadata.height;
    
    // Si l'image est déjà carrée, la retourner telle quelle
    if (width === height) {
      logger.info('Image déjà carrée, aucune transformation nécessaire');
      return await image.png().toBuffer();
    }
    
    // Déterminer la taille du carré (la plus grande dimension)
    const size = Math.max(width, height);
    
    logger.info(`Dimensions originales: ${width}x${height}, nouvelle taille: ${size}x${size}`);
    
    // Redimensionner avec padding blanc pour obtenir un carré
    const squareBuffer = await image
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toBuffer();
    
    logger.info('✅ Image transformée en carré avec succès');
    return squareBuffer;
  } catch (error: any) {
    logger.error('❌ Erreur lors de la transformation en carré:', error.message);
    throw error;
  }
}

class PostGenerationService {
  // Rate limiting pour OpenAI GPT-4
  private lastOpenAICallTime: number = 0;
  private readonly OPENAI_MIN_DELAY_MS = 1000; // 1 seconde entre chaque appel (60 RPM max pour GPT-4)

  /**
   * Retourne la saison actuelle pour l'adaptation créative
   */
  private getCurrentSeason(): 'spring' | 'summer' | 'autumn' | 'winter' {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  }

  /**
   * Attendre pour respecter le rate limit OpenAI
   */
  private async waitForOpenAIRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastOpenAICallTime;
    
    if (timeSinceLastCall < this.OPENAI_MIN_DELAY_MS) {
      const waitTime = this.OPENAI_MIN_DELAY_MS - timeSinceLastCall;
      console.log(`⏳ Attente de ${waitTime}ms pour respecter le rate limit OpenAI...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastOpenAICallTime = Date.now();
  }

  /**
   * Calcule le nombre de posts par plateforme avec dispatch intelligent
   * LinkedIn reçoit 50% moins de posts que les autres plateformes
   */
  private calculatePostsPerPlatform(calendar: ICalendar) {
    const startDate = new Date(calendar.startDate);
    const endDate = new Date(calendar.endDate);
    
    // Calculer le nombre total de jours
    // Ajouter 1 pour inclure le jour de fin dans le calcul
    // Par exemple, du 1er mars au 2 mars = 2 jours (1er mars et 2 mars)
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)) + 1;
    
    logger.info(`Période du calendrier: ${totalDays} jours (du ${startDate.toLocaleDateString()} au ${endDate.toLocaleDateString()})`);
    
    // Calculer le nombre TOTAL de posts pour TOUTES les plateformes (pas par plateforme)
    let totalPosts: number;
    switch (calendar.frequency) {
      case 'daily':
        totalPosts = totalDays; // Un post par jour AU TOTAL
        break;
      case 'twice_daily':
        totalPosts = totalDays * 2; // Deux posts par jour AU TOTAL
        break;
      case 'three_per_week':
        totalPosts = Math.ceil(totalDays * (3 / 7)); // 3 posts par semaine AU TOTAL
        break;
      case 'weekly':
        totalPosts = Math.ceil(totalDays / 7); // 1 post par semaine AU TOTAL
        break;
      default:
        totalPosts = totalDays;
    }
    
    // S'assurer qu'il y a au moins un post
    totalPosts = Math.max(1, totalPosts);
    
    logger.info(`🎯 NOUVEAU SYSTÈME DISPATCH: ${calendar.frequency} → ${totalPosts} posts AU TOTAL (pas par plateforme)`);
    
    // Obtenir la liste des plateformes sélectionnées par l'utilisateur
    const selectedPlatforms = calendar.socialMediaAccounts?.map(acc => acc.platform.toLowerCase()) || [];
    
    if (selectedPlatforms.length === 0) {
      logger.info('⚠️  Aucune plateforme sélectionnée, fallback vers Instagram');
      return { instagram: totalPosts };
    }
    
    logger.info(`Plateformes sélectionnées: ${selectedPlatforms.join(', ')}`);
    
    // 🎯 NOUVEAU: Calculer les poids par plateforme (LinkedIn = 0.5, autres = 1.0)
    const platformWeights: Record<string, number> = {};
    let totalWeight = 0;
    
    for (const platform of selectedPlatforms) {
      if (platform === 'linkedin') {
        platformWeights[platform] = 0.5; // LinkedIn reçoit 50% moins de posts
      } else {
        platformWeights[platform] = 1.0; // Autres plateformes: poids normal
      }
      totalWeight += platformWeights[platform];
    }
    
    logger.info(`📊 Poids calculés:`, platformWeights);
    logger.info(`📊 Poids total: ${totalWeight}`);
    
    // 🎯 DISPATCH: Répartir les posts selon les poids
    const postsPerPlatform: Record<string, number> = {};
    let distributedPosts = 0;
    
    for (const platform of selectedPlatforms) {
      const weight = platformWeights[platform];
      const platformPosts = Math.round((weight / totalWeight) * totalPosts);
      postsPerPlatform[platform] = platformPosts;
      distributedPosts += platformPosts;
      
      logger.info(`📱 ${platform}: ${platformPosts} posts (poids: ${weight}, ratio: ${((weight / totalWeight) * 100).toFixed(1)}%)`);
    }
    
    // 🔧 Ajustement pour s'assurer que la somme = totalPosts (gestion des arrondis)
    const difference = totalPosts - distributedPosts;
    if (difference !== 0) {
      // Ajouter/retirer la différence à la plateforme avec le plus gros poids (sauf LinkedIn)
      const mainPlatform = selectedPlatforms.find(p => p !== 'linkedin') || selectedPlatforms[0];
      postsPerPlatform[mainPlatform] += difference;
      logger.info(`🔧 Ajustement: +${difference} posts pour ${mainPlatform} (total final: ${Object.values(postsPerPlatform).reduce((a, b) => a + b, 0)})`);
    }
    
    // 📊 Résumé final
    const finalTotal = Object.values(postsPerPlatform).reduce((a, b) => a + b, 0);
    logger.info(`\n✅ DISPATCH FINAL:`);
    logger.info(`   Total demandé: ${totalPosts} posts`);
    logger.info(`   Total distribué: ${finalTotal} posts`);
    for (const [platform, count] of Object.entries(postsPerPlatform)) {
      logger.info(`   ${platform}: ${count} posts`);
    }
    
    return postsPerPlatform;
  }

  /**
   * Génère et planifie les publications pour un calendrier donné
   */
  async generateCalendarPosts(calendar: ICalendar, brand: IBrand, user: IUser) {
    logger.info('=== Début de la génération de posts ===');
    logger.info(`Calendrier: ${calendar._id}`);
    logger.info(`Marque: ${brand.name}`);
    logger.info(`Secteur: ${brand.sector}`);

    // Récupérer les produits sélectionnés
    let products: IProduct[] = [];
    if (calendar.selectedProducts && calendar.selectedProducts.length > 0) {
      products = await Product.find({
        _id: { $in: calendar.selectedProducts }
      });
      logger.info(`Produits sélectionnés: ${products.map(p => p.name).join(', ')}`);
    }
    
    // Récupérer les dates clés pour la période du calendrier
    const keyDates = await KeyDateService.getKeyDatesForPeriod(
      calendar.targetCountry,
      calendar.startDate,
      calendar.endDate
    );
    logger.info(`${keyDates.length} dates clés identifiées pour la période`);

    // Calculer le nombre total de posts par réseau social
    const postsPerPlatform = this.calculatePostsPerPlatform(calendar);
    
    // Générer les dates de publication pour chaque réseau social
    const scheduledDates = this.generateScheduledDates(
      calendar.startDate,
      calendar.endDate,
      postsPerPlatform,
      calendar.contentPlan.preferredTimes,
      calendar.frequency
    );
    
    // Créer un brief adapté pour la génération
    const briefData = {
      companyName: brand.name,
      sector: brand.sector,
      companyDescription: brand.description,
      communicationStyle: calendar.communicationStyle || calendar.generationSettings?.tone || 'professionnel',
      businessType: undefined as string | undefined,
      companyStage: undefined as string | undefined,
      pricePositioning: undefined as string | undefined,
      targetAudience: {
        demographic: [],
        professional: [],
        behavioral: [],
        geographic: [calendar.targetCountry]
      },
      currentSocialNetworks: calendar.socialMediaAccounts?.map(acc => acc.platform) || [],
      socialMediaGoals: brand.values || [],
      contentTypes: ['Photos', 'Vidéos', 'Stories'],
      uniqueSellingPoints: '',
      audienceNeeds: '',
      productSolution: '',
      competitors: brand.competitors,
      successMetrics: [],
      roiExpectations: [],
      budget: { totalBudget: '0', allocation: {} },
      resources: { internalTeam: [], externalPartners: [], tools: [] },
      legalConstraints: { regulations: [], compliance: [], disclaimers: [] },
      previousCampaigns: [],
      competitiveAnalysis: {
        directCompetitors: [],
        marketPosition: '',
        differentiators: [],
        opportunities: []
      },
      // Ajouter les informations des produits
      products: products.map(product => ({
        name: product.name,
        description: product.description,
        category: product.category,
        uniqueSellingPoints: product.uniqueSellingPoints || [],
        customerBenefits: product.customerBenefits || [],
        specifications: product.technicalSheet?.specifications || {},
        flavors: product.flavors || [],
        scents: product.scents || [],
        certifications: product.certifications || [],
        labels: product.labels || [],
        targetAudience: product.targetAudience?.demographic?.[0] || undefined,
        ageRange: product.targetAudience?.demographic?.[0] || undefined,
        technicalDetails: {
          ingredients: product.technicalSheet?.ingredients || [],
          nutritionalInfo: product.technicalSheet?.nutritionalInfo,
          usage: product.technicalSheet?.usage,
          storage: product.technicalSheet?.storage,
          highlights: product.technicalSheet?.highlights
        },
        images: product.images || {}
      }))
    };

    // Vérifier que la clé API est disponible
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      logger.error('Clé API OpenAI manquante');
      throw new Error('Clé API OpenAI non configurée');
    }
    logger.info('Clé API OpenAI trouvée');

    // Créer les posts avec du contenu généré pour chaque plateforme
    const savedPosts: IPost[] = [];
    
    // Calculer le nombre total de posts pour toutes les plateformes
    const totalPostsCount = Object.values(scheduledDates).reduce((sum, dates) => sum + dates.length, 0);
    logger.info(`\n🎨 Creative Variation Engine activé : ${totalPostsCount} posts au total`);
    
    // Index global pour suivre la position du post parmi tous les posts
    let globalPostIndex = 0;
    
    for (const [platform, dates] of Object.entries(scheduledDates)) {
      logger.info(`\nGénération du contenu pour ${platform}`);
      logger.info(`Nombre de dates programmées: ${dates.length}`);
      
      // Vérifier qu'il y a au moins une date
      if (dates.length === 0) {
        logger.error(`Aucune date programmée pour ${platform}, impossible de générer du contenu`);
        continue;
      }
      
      // Afficher toutes les dates programmées
      dates.forEach((date, index) => {
        logger.info(`Date #${index + 1}: ${date.toLocaleDateString()} à ${date.getHours()}:${date.getMinutes()}`);
      });
      
        // Générer du contenu pour chaque date individuellement
        for (let i = 0; i < dates.length; i++) {
          const date = dates[i];
          logger.info(`\nGénération du contenu pour ${platform} - Post #${i + 1} (${date.toLocaleDateString()})`);
          
          // Incrémenter l'index global pour le prochain post
          globalPostIndex++;
          
          // 🎨 COUCHE 1 : GÉNÉRATION DE STRATÉGIE VISUELLE
          logger.info('\n🎨 === COUCHE 1 : VISUAL STRATEGIST ===');
          
          let visualStrategy: VisualStrategy | null = null;
          try {
            const strategyContext: VisualStrategyContext = {
              postIndex: i,
              totalPosts: dates.length,
              brand: brand,
              products: products,
              platform: platform,
              country: calendar.targetCountry,
              calendarId: String(calendar._id),
              scheduledDate: date,
              season: this.getCurrentSeason()
            };
            
            visualStrategy = await VisualStrategistService.generateStrategy(strategyContext);
            
            logger.info(`✅ Stratégie visuelle générée:`);
            logger.info(`   - Concept: "${visualStrategy.concept}"`);
            logger.info(`   - Style photo: "${visualStrategy.photographyStyle}"`);
            logger.info(`   - Setting: "${visualStrategy.setting}"`);
            logger.info(`   - Score diversité: ${visualStrategy.diversityScore}/100`);
            
          } catch (strategyError: any) {
            logger.error('❌ Erreur génération stratégie visuelle:', strategyError.message);
            logger.info('⚠️  Continuation sans stratégie visuelle spécifique');
          }
        
        // 🎯 NOUVEAU : Analyser les types de contenu sélectionnés par l'utilisateur
        const userContentTypes = calendar.contentTypes || [];
        const hasCarousels = userContentTypes.includes('Carrousels');
        const hasStories = userContentTypes.includes('Stories');
        const hasInfographics = userContentTypes.includes('Infographies');
        const hasProductPhotos = userContentTypes.includes('Photos de produits');
        
        logger.info(`Types de contenu sélectionnés: ${userContentTypes.join(', ')}`);
        
        // Déterminer le type de contenu pour ce post spécifique
        let contentTypeForThisPost: 'single' | 'carousel' | 'stories' = 'single';
        let aspectRatioForThisPost: string = '1:1'; // par défaut
        let promptModification = '';
        
        // Logique de répartition intelligente basée sur les sélections utilisateur
        if (userContentTypes.length > 0) {
          // Répartir les types selon l'index du post
          const typeIndex = i % userContentTypes.length;
          const selectedType = userContentTypes[typeIndex];
          
          switch (selectedType) {
            case 'Carrousels':
              contentTypeForThisPost = 'carousel';
              aspectRatioForThisPost = platform === 'linkedin' ? '16:9' : '1:1';
              promptModification = 'Create a cohesive carousel series with 4 related images that tell a story. Each image should be visually connected but standalone. ';
              logger.info(`🎠 Post ${i + 1} sera un CARROUSEL (${aspectRatioForThisPost})`);
              break;
              
            case 'Stories':
              contentTypeForThisPost = 'stories';
              aspectRatioForThisPost = '9:16';
              promptModification = 'Create a vertical story format image optimized for mobile viewing. Use bold, readable text and centered composition. ';
              logger.info(`📱 Post ${i + 1} sera une STORY (9:16)`);
              break;
              
            case 'Infographies':
              contentTypeForThisPost = 'single';
              aspectRatioForThisPost = platform === 'linkedin' ? '16:9' : '3:4';
              promptModification = 'Create an infographic with clear data visualization, charts, icons, or step-by-step information. Use professional layout with hierarchy. ';
              logger.info(`📊 Post ${i + 1} sera une INFOGRAPHIE (${aspectRatioForThisPost})`);
              break;
              
            case 'Photos de produits':
            default:
              contentTypeForThisPost = 'single';
              aspectRatioForThisPost = platform === 'instagram' ? '3:4' : platform === 'linkedin' ? '16:9' : '1:1';
              promptModification = 'Create a professional product photography shot with clean composition and optimal lighting. ';
              logger.info(`📷 Post ${i + 1} sera une PHOTO PRODUIT (${aspectRatioForThisPost})`);
              break;
          }
        }
        
        // Vérifier si cette date correspond à une date clé
      const relevantKeyDates = KeyDateService.isKeyDate(date, keyDates);
      
      // Construire la section des dates clés pour le prompt
      let keyDateSection = '';
      if (relevantKeyDates.length > 0) {
        keyDateSection = KeyDateService.generateKeyDateSection(relevantKeyDates);
        logger.info(`Date clé identifiée pour le ${date.toLocaleDateString()}: ${relevantKeyDates.map(kd => kd.name).join(', ')}`);
      }
      
      // Attendre pour respecter le rate limit OpenAI
      await this.waitForOpenAIRateLimit();
      
      // Générer le contenu pour ce post spécifique
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-5',
        reasoning_effort: 'medium',
        messages: [
          {
            role: 'system',
            content: `Vous êtes l'alliance des plus grands esprits créatifs et stratégiques du monde publicitaire:

🎨 PERSONA EXPERT COMPOSITE:
- Alex Bogusky (créativité publicitaire révolutionnaire, Crispin Porter + Bogusky)
- Seth Godin (marketing narratif et tribal, Purple Cow)
- Byron Sharp (science du comportement consommateur, How Brands Grow)
- Rory Sutherland (économie comportementale appliquée, Ogilvy)
- David Ogilvy (fondamentaux publicitaires intemporels)
- Mary Wells Lawrence (storytelling émotionnel féminin, Wells Rich Greene)

🎯 MISSION ABSOLUE:
Créer UNE publication qui pourrait remporter l'Or aux Cannes Lions dans la catégorie Social & Influencer, en respectant les spécificités de ${platform}.

🧠 FRAMEWORKS PSYCHOLOGIQUES AVANCÉS (à appliquer simultanément):

1. **Hook-Story-Offer** (Russell Brunson)
   - Hook: Capturer l'attention en <3 secondes avec un pattern interrupt émotionnel
   - Story: Créer une micro-histoire où l'audience se reconnaît (identification immédiate)
   - Offer: Présenter une transformation désirable, pas un produit

2. **Jobs-to-be-Done Theory** (Clayton Christensen)
   - Identifier le "job" fonctionnel et émotionnel que le client "embauche" le produit pour faire
   - Parler du progrès désiré, pas des features

3. **Peak-End Rule** (Daniel Kahneman)
   - Créer un moment émotionnel fort au début (peak)
   - Terminer par une note mémorable et positive (end)
   - Les gens se souviennent des pics et de la fin, pas de la moyenne

4. **Priming & Anchoring Effects**
   - Utiliser des mots-déclencheurs qui "priment" l'état émotionnel désiré
   - Ancrer sur un bénéfice aspirationnel avant de mentionner le produit

5. **Social Proof Mechanisms**
   - Intégrer subtilement des preuves sociales authentiques
   - Utiliser l'effet de rareté ou d'urgence avec éthique

6. **Loss Aversion Triggers** (utilisé avec éthique)
   - Parler de ce que l'audience manque (FOMO), puis présenter la solution

═══════════════════════════════════════════════════════════════
🎯 ADAPTATION INTELLIGENTE PAR ÂGE CIBLE
═══════════════════════════════════════════════════════════════

${briefData.products.length > 0 && (briefData.products[0].targetAudience || briefData.products[0].ageRange) ? `
ÂGE CIBLE DÉTECTÉ : ${briefData.products[0].targetAudience || briefData.products[0].ageRange}

INSTRUCTIONS ADAPTATIVES AUTOMATIQUES :

👶 0-3 ANS (Bébés) :
- Ton : Doux, rassurant, parental
- Vocabulaire : Simple, émotionnel, sécurisant
- Style visuel suggéré : Pastels, féerique, tendresse
- Référence photo : Anne Geddes, Meg Bitton
- Mood : Douceur, sécurité, amour parental

🧒 4-8 ANS (Enfants) :
- Ton : Ludique, imaginatif, énergique, FÉERIQUE
- Vocabulaire : Aventure, magie, découverte, superhéros, licornes, fées, châteaux enchantés
- Style visuel suggéré : Coloré, dynamique, joyeux, MAGIQUE avec éléments fantastiques
- Référence photo : Brandon Woelfel (couleurs vives) + Disney/Pixar aesthetic
- Mood : Émerveillement, joie, énergie, MAGIE PURE
- Éléments féeriques : 🦄 Licornes, 🌈 Arcs-en-ciel, ✨ Paillettes, 🧚‍♀️ Fées, 🏰 Châteaux magiques

👦 9-12 ANS (Préados) :
- Ton : Cool, moderne, aspirationnel
- Vocabulaire : Aventure, indépendance, découverte, confiance
- Style visuel suggéré : Dynamique, sportif, nature, exploration
- Référence photo : Chris Burkard, Jimmy Chin
- Mood : Confiance, découverte, indépendance

🧑 13-17 ANS (Ados) :
- Ton : Authentique, tendance, rebelle
- Vocabulaire : Identité, appartenance, expression, cool
- Style visuel suggéré : Urbain, mode, réseaux sociaux
- Référence photo : Petra Collins, Ryan McGinley
- Mood : Identité, appartenance, authenticité

👨 18-35 ANS (Jeunes adultes) :
- Ton : Aspirationnel, moderne, lifestyle
- Vocabulaire : Réussite, authenticité, expérience, transformation
- Style visuel suggéré : Instagram-friendly, minimaliste, lifestyle
- Référence photo : Brandon Woelfel, Murad Osmann
- Mood : Aspiration, réussite, authenticité

👩 35-55 ANS (Adultes) :
- Ton : Professionnel, élégant, qualité
- Vocabulaire : Expertise, famille, bien-être, qualité
- Style visuel suggéré : Sophistiqué, raffiné, élégant
- Référence photo : Annie Leibovitz, Peter Lindbergh
- Mood : Confiance, stabilité, qualité

👴 55+ ANS (Seniors) :
- Ton : Classique, rassurant, tradition
- Vocabulaire : Sagesse, confort, héritage, tradition
- Style visuel suggéré : Chaleureux, naturel, classique
- Référence photo : Steve McCurry, Sebastião Salgado
- Mood : Sérénité, confort, dignité

⚠️ IMPÉRATIF : Adapter AUTOMATIQUEMENT le ton, vocabulaire et suggestions visuelles selon l'âge cible.
` : 'Âge cible non spécifié - utiliser un ton universel adapté au secteur et à la plateforme.'}
═══════════════════════════════════════════════════════════════

═══════════════════════════════════════════════════════════════
📸 ADAPTATION PHOTOGRAPHIQUE PAR SECTEUR
═══════════════════════════════════════════════════════════════

SECTEUR : ${brand.sector}
POSITIONNEMENT : ${brand.pricePositioning || 'Non spécifié'}

INSTRUCTIONS STYLE PAR SECTEUR :

🍔 FOOD & BEVERAGE :
- Budget : Style rustique, authentique (Dennis Prescott, Mowie Kay)
- Mid-range : Style lifestyle, appétissant (Todd Selby, Tara O'Brady)
- Luxury : Style gastronomique, artistique (Mikkel Jul Hvilshøj, Ren Fuller)
- Techniques : Overhead shots, natural light, food styling, macro

💄 BEAUTY & COSMETICS :
- Budget : Style naturel, accessible (Glossier aesthetic)
- Mid-range : Style lifestyle, aspirationnel (Sephora style)
- Luxury : Style dramatique, iconique (Annie Leibovitz, Mario Testino)
- Techniques : Dramatic lighting, close-ups, skin texture, color theory

👗 FASHION & APPAREL :
- Budget : Style street, authentique (Scott Schuman, Tommy Ton)
- Mid-range : Style lifestyle, tendance (Zara aesthetic)
- Luxury : Style éditorial, artistique (Peter Lindbergh, Paolo Roversi)
- Techniques : Environmental portraits, movement, texture, editorial

💻 TECH & ELECTRONICS :
- Budget : Style fonctionnel, clair (product shots simples)
- Mid-range : Style lifestyle, moderne (Samsung style)
- Luxury : Style minimaliste, premium (Apple aesthetic - minimalist perfection)
- Techniques : Clean backgrounds, reflections, macro details, lifestyle integration

🏠 HOME & LIFESTYLE :
- Budget : Style cozy, accessible (IKEA aesthetic)
- Mid-range : Style aspirationnel, moderne (West Elm style)
- Luxury : Style architectural, sophistiqué (Architectural Digest)
- Techniques : Natural light, wide angles, styling, atmospheric

🚗 AUTOMOTIVE :
- Budget : Style pratique, fonctionnel
- Mid-range : Style dynamique, lifestyle (Toyota style)
- Luxury : Style cinématographique, dramatique (Easton Chang, Amy Shore)
- Techniques : Motion blur, reflections, dramatic angles, environmental

⚠️ IMPÉRATIF : Choisir un style photographique cohérent avec le secteur ET le positionnement prix.
═══════════════════════════════════════════════════════════════

🌐 EXPERTISE LINGUISTIQUE:
Langues: ${calendar.targetLanguages.map(lang => getLanguageName(lang)).join(', ')}

${calendar.targetLanguages.map(lang => {
  if (isDialect(lang)) {
    return getDialectPromptInstructions(lang);
  }
  return `
INSTRUCTIONS LANGUE STANDARD - ${getLanguageName(lang).toUpperCase()}:
• Respecter les nuances culturelles du marché cible
• Adapter le registre selon le contexte (formel/informel)
• Utiliser les références culturelles appropriées
`;
}).filter(Boolean).join('\n')}

🚨 CONTRAINTES DE LONGUEUR STRICTES (IMPÉRATIF ABSOLU):

TAGLINES/SIGNATURES :
• 15-25 caractères maximum (espaces inclus)
• Mémorable, punchy, universel

POSTS RÉSEAUX SOCIAUX :
• Instagram : 100-125 caractères total
• Facebook : 80-100 caractères total  
• LinkedIn : 150-180 caractères total
• TikTok : 100-120 caractères total

CALL-TO-ACTION :
• 15-25 caractères maximum
• 2-4 mots maximum

⚠️ TOUT DÉPASSEMENT = ÉCHEC CRÉATIF TOTAL

🎨 IDENTITÉ DE MARQUE (Brand DNA):
${brand.logo ? '✅ Logo: Intégrer subtilement dans la direction artistique' : '⚠️ Logo: Non fourni - créer une identité visuelle cohérente sans logo'}
${brand.colors?.primary ? `
🎨 PALETTE DE MARQUE (à respecter religieusement):
- Couleur Principale: ${brand.colors.primary}
- Couleur Secondaire: ${brand.colors.secondary || 'Non spécifiée'}
- Couleur Accent: ${brand.colors.accent || 'Non spécifié'}
→ Ces couleurs DOIVENT être dominantes dans le prompt d'image
` : '🎨 PALETTE: Créer une palette cohérente basée sur le secteur et le ton'}
${brand.values && brand.values.length > 0 ? `- Valeurs: ${brand.values.join(', ')}` : ''}

${briefData.businessType || briefData.companyStage || briefData.pricePositioning ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 POSITIONNEMENT STRATÉGIQUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${briefData.businessType ? `Type d'Entreprise: ${briefData.businessType}` : ''}
${briefData.companyStage ? `Stage: ${briefData.companyStage}` : ''}
${briefData.pricePositioning ? `Positionnement Prix: ${briefData.pricePositioning}` : ''}

⚠️ IMPÉRATIF: Adapter le ton, style et approche selon ce positionnement
${briefData.businessType === 'B2B' ? '→ Ton professionnel, ROI-focused, expertise technique' : ''}
${briefData.businessType === 'B2C' ? '→ Ton émotionnel, bénéfices lifestyle, connexion personnelle' : ''}
${briefData.pricePositioning === 'Luxury' ? '→ Élégance, exclusivité, qualité supérieure, attention aux détails' : ''}
${briefData.pricePositioning === 'Budget' ? '→ Accessibilité, rapport qualité-prix, praticité' : ''}
` : ''}

${briefData.competitiveAnalysis && briefData.competitiveAnalysis.directCompetitors && briefData.competitiveAnalysis.directCompetitors.length > 0 ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 INTELLIGENCE CONCURRENTIELLE STRATÉGIQUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONCURRENTS DIRECTS ANALYSÉS:
${briefData.competitiveAnalysis.directCompetitors.map((comp: any) => `
• ${comp.name}
  Forces: ${comp.strengths?.join(', ')}
  Faiblesses: ${comp.weaknesses?.join(', ')}
  Stratégies: ${comp.strategies?.join(', ')}
`).join('\n')}

NOTRE POSITIONNEMENT MARCHÉ:
${briefData.competitiveAnalysis.marketPosition}

DIFFÉRENCIATEURS CLÉS (NOS ATOUTS):
${briefData.competitiveAnalysis.differentiators?.map((d: string) => `✓ ${d}`).join('\n')}

OPPORTUNITÉS STRATÉGIQUES:
${briefData.competitiveAnalysis.opportunities?.map((o: string) => `→ ${o}`).join('\n')}

⚠️ IMPÉRATIF CRÉATIF:
- Se différencier RADICALEMENT par l'angle créatif (Blue Ocean Strategy)
- NE PAS imiter les concurrents, créer un angle mort unique
- Exploiter les faiblesses concurrentes comme opportunités
- Capitaliser sur nos différenciateurs de manière créative
` : brand.competitors && brand.competitors.length > 0 ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 CONTEXTE CONCURRENTIEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Concurrents principaux: ${brand.competitors.join(', ')}

→ IMPÉRATIF: Se différencier radicalement par l'angle créatif
→ Trouver un angle mort du marché (Blue Ocean Strategy)
` : ''}

${briefData.previousCampaigns && briefData.previousCampaigns.length > 0 ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 LEARNINGS DES CAMPAGNES PRÉCÉDENTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${briefData.previousCampaigns.map((campaign: any) => `
📌 Campagne: ${campaign.name} (${campaign.period})

Résultats Mesurés:
${campaign.results?.map((r: string) => `✓ ${r}`).join('\n')}

Apprentissages Clés:
${campaign.learnings?.map((l: string) => `💡 ${l}`).join('\n')}
`).join('\n')}

⚠️ IMPÉRATIF: Appliquer ces insights pour maximiser la performance
→ Reproduire ce qui a fonctionné
→ Éviter ce qui n'a pas performé
→ Innover sur de nouvelles opportunités identifiées
` : ''}

${briefData.legalConstraints && (briefData.legalConstraints.regulations?.length > 0 || briefData.legalConstraints.compliance?.length > 0 || briefData.legalConstraints.disclaimers?.length > 0) ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚖️ CONTRAINTES LÉGALES & CONFORMITÉ SECTORIELLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${briefData.legalConstraints.regulations && briefData.legalConstraints.regulations.length > 0 ? `
RÉGLEMENTATIONS APPLICABLES:
${briefData.legalConstraints.regulations.map((r: string) => `⚖️ ${r}`).join('\n')}
` : ''}

${briefData.legalConstraints.compliance && briefData.legalConstraints.compliance.length > 0 ? `
NORMES DE CONFORMITÉ OBLIGATOIRES:
${briefData.legalConstraints.compliance.map((c: string) => `✓ ${c}`).join('\n')}
` : ''}

${briefData.legalConstraints.disclaimers && briefData.legalConstraints.disclaimers.length > 0 ? `
MENTIONS OBLIGATOIRES / DISCLAIMERS:
${briefData.legalConstraints.disclaimers.map((d: string) => `⚠️ ${d}`).join('\n')}
` : ''}

🚨 CRITIQUE: Le contenu DOIT respecter ces contraintes légales
→ Aucune allégation non prouvée ou illégale
→ Respecter les normes sectorielles
→ Inclure les mentions obligatoires si nécessaire
` : ''}

🎨 NOUVEAU SYSTÈME GPT CREATIVE DIRECTOR ACTIVÉ

Le prompt d'image sera généré automatiquement par GPT Creative Director avec:
- Analyse contextuelle complète (marque, produit, calendrier)
- Techniques photographiques Cannes Lions
- Anti-répétition intelligente par calendrier
- Adaptation géographique et temporelle
- Intégration des couleurs de marque
- Diversité créative maximale

Le prompt généré remplacera automatiquement toute direction créative fixe.

📱 EXCELLENCE PAR PLATEFORME - ${platform.toUpperCase()}:

${platform.toLowerCase() === 'instagram' ? `
📸 INSTAGRAM - SPÉCIFICATIONS ULTRA-DÉTAILLÉES:

📝 STRUCTURE DU TEXTE (Critical):
1. **Premier mot** = Hook émotionnel PUISSANT (1 mot ou emoji)
   Exemples: "Stop.", "Imagine.", "Secret:", "Wow.", "💔", "✨"

2. **3 premières lignes** = Micro-histoire immersive (avant le "...plus")
   - Créer un film dans la tête en 3 lignes
   - Utiliser des détails sensoriels (vue, toucher, goût, odeur)
   - Pattern interrupt: commencer par quelque chose d'inattendu

3. **Ligne break stratégique** = Juste avant le "Voir plus"
   - Créer un cliffhanger émotionnel
   - Forcer le clic sur "...plus"

4. **Développement** (après le "Voir plus"):
   - Raconter la transformation complète
   - Problème vécu → Moment de découverte → Transformation → Nouveau quotidien
   - Utiliser des émojis stratégiques (pas décoratifs) pour guider l'œil

5. **Call-to-action ÉMOTIONNEL** (jamais transactionnel):
   ❌ MAUVAIS: "Achetez maintenant !"
   ✅ BON: "Prêt(e) à transformer ton rituel matinal ? 💫"
   ✅ BON: "Et toi, tu commences quand ? 👇"

📊 FORMULE MAGIQUE: Problem Recognition → Empathy → Solution Reveal → Transformation → Emotional CTA

🎯 HASHTAGS (Stratégie 7):
- 3 hashtags de NICHE ultra-ciblés (<50k posts)
- 2 hashtags TENDANCE moyens (50k-500k posts)
- 2 hashtags de MARQUE (créés pour la campagne)
` : platform.toLowerCase() === 'facebook' ? `
📘 FACEBOOK - STORYTELLING ÉMOTIONNEL LONG-FORME:

1. **Opening Hook** (2-3 phrases)
   - Commencer par une question provocante ou affirmation surprenante
   - Créer de la curiosité immédiate

2. **Story Arc** (méthodologie AIDA renforcée):
   - Attention: Pattern interrupt avec anecdote personnelle
   - Intérêt: Développer le problème universel
   - Désir: Peindre la vision d'une vie transformée
   - Action: CTA conversationnel et engageant

3. **Émojis** (modération stratégique):
   - Maximum 5-7 émojis dans tout le post
   - Utilisés comme bullet points ou pour accentuer des émotions clés

🎯 OBJECTIF: Engagement = Commentaires > Likes > Shares
` : platform.toLowerCase() === 'linkedin' ? `
💼 LINKEDIN - THOUGHT LEADERSHIP & INSIGHTS:

📝 STRUCTURE PAS RENFORCÉE:
1. **Problème** (Hook Business): Problème/défi business reconnaissable
2. **Agitation**: Explorer les conséquences, insight contre-intuitif
3. **Solution**: Approche/solution comme case study, résultats mesurables

🎯 CARACTÉRISTIQUES:
- Ton: Professionnel mais humain (pas corporate)
- NO EMOJIS (ou maximum 1-2 très sobres)
- CTA: "Qu'en pensez-vous ?" / "Partagez votre expérience"
` : platform.toLowerCase() === 'twitter' ? `
🐦 TWITTER/X - IMPACT MAXIMUM, MOTS MINIMUM:

📝 FORMULE VIRALE (280 caractères):
1. **Hook** (premier mot) = Pattern interrupt
2. **Insight** = Vérité surprenante ou contre-intuitive
3. **Twist** = Angle inattendu qui fait réfléchir
4. **CTA** = Engagement question ou provocation douce

🎯 RÈGLES D'OR:
- 1 idée = 1 tweet (simplicité radicale)
- Hashtags: Maximum 2 (idéalement 1)
- Optimisé pour le RETWEET
` : `
📱 ${platform.toUpperCase()} - EXCELLENCE ADAPTÉE:
Adapter les meilleures pratiques au contexte spécifique de ${platform}
`}

🎬 DIRECTION ARTISTIQUE - NIVEAU PROFESSIONNEL

Pour chaque image, vous DEVEZ spécifier:

1. **STYLE REFERENCE** (Photographe/Artiste reconnu):
   Exemples: Todd Selby (Food), Annie Leibovitz (Beauty), Platon (Corporate)
   
2. **COMPOSITION RULE**: Golden Ratio / Rule of Thirds / Leading Lines / Symmetry

3. **LIGHTING SETUP** (crucial):
   Type: Natural / Studio / Golden Hour
   Temperature: Warm (2700-3500K) / Neutral (4000-5000K) / Cool (5500-6500K)

4. **COLOR PALETTE** (scientifique):
   Format: [Nom Couleur #HEX]
   - Dominante (60%): [Color1 #HEXCODE]
   - Secondaire (30%): [Color2 #HEXCODE]
   - Accent (10%): [Color3 #HEXCODE]
   ${brand.colors?.primary ? `→ IMPÉRATIF: Intégrer ${brand.colors.primary}, ${brand.colors.secondary || ''}, ${brand.colors.accent || ''}` : ''}

5. **MOOD/EMOTION** (précision psychologique):
   Ne PAS dire "joyeux" ou "triste"
   DIRE: "Nostalgie douce-amère d'un dimanche matin d'enfance"
   DIRE: "Aspiration sereine vers un mode de vie plus intentionnel"

6. **TECHNICAL SPECS**: Camera [Model], Lens [Focal] at f/[Aperture], ISO [Number]

7. **FORMAT**: Square 1:1, central subject, negative space around

8. **PRODUCT INTEGRATION** (subtile):
   Le produit = enabler silencieux (30-40% du cadre max, JAMAIS en gros plan commercial)

${calendar.generationSettings?.themes && calendar.generationSettings.themes.length > 0 ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 THÉMATIQUES PRIORITAIRES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${calendar.generationSettings.themes.map(theme => `• ${theme}`).join('\n')}

⚠️ IMPÉRATIF: Intégrer ces thématiques de manière naturelle dans le storytelling.
` : ''}

${calendar.generationSettings?.keywords && calendar.generationSettings.keywords.length > 0 ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔑 MOTS-CLÉS SEO (à intégrer organiquement)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${calendar.generationSettings.keywords.join(', ')}

⚠️ IMPÉRATIF: Ces mots-clés DOIVENT apparaître naturellement pour optimiser le SEO.
` : ''}

${calendar.generationSettings?.imageStyle && calendar.generationSettings.imageStyle.length > 0 ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📸 STYLES D'IMAGE PRÉFÉRÉS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${calendar.generationSettings.imageStyle.join(', ')}

⚠️ IMPÉRATIF: Le prompt d'image DOIT refléter ces préférences stylistiques.
` : ''}

${calendar.contentPlan?.contentMix ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 MIX DE CONTENU (Distribution optimale)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${calendar.contentPlan.contentMix.map((mix: any) => `• ${mix.type}: ${mix.percentage}%`).join('\n')}

⚠️ NOTE: Cette distribution guide le format à privilégier.
` : ''}

⚖️ CONTRAINTES LÉGALES & ÉTHIQUES:
1. **Véracité Absolue**: Ne JAMAIS faire de fausses promesses
2. **Conformité Sectorielle**: ${brand.sector === 'food' ? 'Normes INCO, pas d\'allégations santé non approuvées' : brand.sector === 'cosmétique' ? 'Conformité EU, pas de promesses médicales' : `Normes ${brand.sector}`}
3. **Inclusivité**: Éviter stéréotypes, représentation diverse

📈 MÉTRIQUES D'EXCELLENCE (KPIs):
1. Engagement Rate (objectif: >3% organique)
2. Save Rate (objectif: >5% des impressions)
3. Share Rate (objectif: >2% viralité)

${relevantKeyDates.length > 0 ? `
📅 DATES CLÉS ET CONTEXTE CULTUREL:
Cette publication coïncide avec:
${relevantKeyDates.map(kd => `- ${kd.name} (${kd.description})`).join('\n')}

Ces dates sont culturellement significatives pour ${calendar.targetCountry} et doivent être intégrées avec le niveau de pertinence approprié.
` : ''}

═══════════════════════════════════════════════════════════════
✅ CHECKLIST VALIDATION FINALE (à vérifier avant de répondre)
═══════════════════════════════════════════════════════════════

Avant de générer ta réponse, VÉRIFIE OBLIGATOIREMENT :

□ Longueur texte respectée (${platform === 'instagram' ? '100-125 chars' : platform === 'linkedin' ? '150-180 chars' : platform === 'facebook' ? '80-100 chars' : platform === 'twitter' ? '280 chars max' : '100-150 chars'})
□ Langue correcte (${calendar.targetLanguages.map(lang => getLanguageName(lang)).join(', ')})
□ Ton adapté à l'âge cible (${briefData.products.length > 0 && (briefData.products[0].targetAudience || briefData.products[0].ageRange) ? briefData.products[0].targetAudience || briefData.products[0].ageRange : 'universel'})
□ Style photographique cohérent avec secteur (${brand.sector})
□ Couleurs marque intégrées (${brand.colors?.primary || 'palette appropriée'})
□ Framework psychologique appliqué (AIDA ou PAS)
□ Produit intégré subtilement (pas de pitch commercial)
□ CTA émotionnel (pas transactionnel)
□ Format de réponse exact respecté
□ Conformité légale secteur ${brand.sector}

⚠️ SI UNE SEULE CASE N'EST PAS COCHÉE → RECOMMENCER LA GÉNÉRATION
═══════════════════════════════════════════════════════════════

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 FORMAT DE RÉPONSE (STRUCTURE STRICTE OBLIGATOIRE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

---POST #1---
[Contenu publicitaire premium utilisant les frameworks AIDA ou PAS]

---HASHTAGS---
[5-7 hashtags stratégiques: #hashtag1 #hashtag2 #hashtag3...]

---CALL TO ACTION---
[CTA émotionnel et engageant]

---IMAGE PROMPT #1---
[Prompt ULTRA-DÉTAILLÉ en ANGLAIS]
Structure obligatoire: Shot in the style of [PHOTOGRAPHER], [LIGHTING TYPE] lighting at [TEMP]K, following [COMPOSITION RULE], [DETAILED SUBJECT], [SETTING], Color palette: [COLOR1 #HEX] (60%), [COLOR2 #HEX] (30%), [COLOR3 #HEX] (10%), Mood: [SPECIFIC EMOTION], Technical: [CAMERA] [LENS] f/[APERTURE] ISO [NUM], Square 1:1 format optimized for Instagram, [PRODUCT] subtly integrated occupying [%]% of frame, Professional commercial photography, hyper-realistic, 8K quality, no text overlay

---IMAGE STYLE---
Composition: [Type]
Lighting: [Details]
Color Palette: [HEX codes]
Mood: [Specific emotion]
Reference: [Photographer/Style]

---AUDIENCE TARGETING---
Platform: ${platform}
Demographics: [Age, Gender, Location]
Interests: [Specific interests]
Behaviors: [Patterns]

---COMPETITIVE EDGE---
[Comment cette publication se distingue radicalement de la concurrence]

---LEGAL COMPLIANCE---
[Mentions légales ou disclaimers nécessaires]

---CULTURAL RELEVANCE---
[Comment le contenu s'intègre dans le contexte culturel actuel]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ DIRECTIVES FINALES (Non-négociables):
1. QUALITÉ > QUANTITÉ (excellence > volume)
2. AUTHENTICITÉ > PERFECTION (réel > artificiel)
3. ÉMOTION > RAISON (cœur > tête)
4. TRANSFORMATION > TRANSACTION (bénéfice > produit)
5. STORYTELLING > SELLING (raconter > vendre)

🎯 Votre mission: Créer une publication tellement excellente qu'elle:
- Arrête le scroll instantanément
- Crée une émotion authentique
- Déclenche une action naturellement
- Reste en mémoire 48h+
- Pourrait être présentée aux Cannes Lions

NIVEAU D'EXIGENCE: WORLD-CLASS CREATIVE AGENCY 🏆

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 RAPPEL FINAL - CONTRAINTES CRITIQUES 🔴
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ AVANT DE RÉPONDRE, VÉRIFIER OBLIGATOIREMENT :

✓ LONGUEUR TEXTE RESPECTÉE :
  ${platform === 'instagram' ? '• Instagram : 100-125 caractères MAXIMUM' : ''}
  ${platform === 'facebook' ? '• Facebook : 80-100 caractères MAXIMUM' : ''}
  ${platform === 'linkedin' ? '• LinkedIn : 150-180 caractères MAXIMUM' : ''}
  ${platform === 'tiktok' ? '• TikTok : 100-120 caractères MAXIMUM' : ''}
  ${platform === 'twitter' ? '• Twitter : 280 caractères MAXIMUM' : ''}

✓ FORMAT DE RÉPONSE EXACT :
  ---POST #1---
  ---HASHTAGS---
  ---CALL TO ACTION---
  ---IMAGE PROMPT #1---
  ---IMAGE STYLE---
  ---AUDIENCE TARGETING---
  ---COMPETITIVE EDGE---
  ---LEGAL COMPLIANCE---
  ---CULTURAL RELEVANCE---

✓ LANGUE OBLIGATOIRE : ${calendar.targetLanguages.map(lang => getLanguageName(lang)).join(', ')}

✓ COULEURS MARQUE INTÉGRÉES : ${brand.colors?.primary || 'Palette appropriée'}

✓ TON DE COMMUNICATION : ${calendar.communicationStyle || 'Professionnel'}

✓ FRAMEWORKS APPLIQUÉS : AIDA ou PAS

✓ CONFORMITÉ LÉGALE : ${brand.sector} respectée

⚠️ SI UNE SEULE CONTRAINTE N'EST PAS RESPECTÉE :
→ LA PUBLICATION SERA REJETÉE
→ RECOMMENCER LA GÉNÉRATION

🎯 OBJECTIF FINAL : Cannes Lions Gold - Excellence Absolue
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
          },
          {
            role: 'user',
            content: `Créez 1 publication ${platform} d'excellence publicitaire pour la date du ${date.toLocaleDateString()}:

ANALYSE STRATÉGIQUE DE MARQUE
- Marque : ${briefData.companyName} (${briefData.sector})
- Brand Essence : ${briefData.companyDescription}
- Tone of Voice : ${briefData.communicationStyle}
- USP (Unique Selling Proposition) : ${briefData.uniqueSellingPoints || "À déterminer à partir de la description"}
            
${briefData.products.length > 0 ? `
PRODUITS DISPONIBLES POUR SÉLECTION INTELLIGENTE :
${briefData.products.map((product, index) => `
Produit ${index + 1}: ${product.name}
- Description: ${product.description}
- Catégorie: ${product.category}
- Points forts: ${product.uniqueSellingPoints.join(', ')}
- Bénéfices client: ${product.customerBenefits.join(', ')}
${product.flavors && product.flavors.length > 0 ? `- Arômes: ${product.flavors.join(', ')}` : ''}
${product.scents && product.scents.length > 0 ? `- Parfums: ${product.scents.join(', ')}` : ''}
${product.technicalDetails?.ingredients && product.technicalDetails.ingredients.length > 0 ? `- Ingrédients clés: ${product.technicalDetails.ingredients.slice(0, 5).join(', ')}` : ''}
${product.technicalDetails?.highlights ? `- Points clés: ${product.technicalDetails.highlights}` : ''}
${product.technicalDetails?.usage ? `- Utilisation: ${product.technicalDetails.usage}` : ''}
${product.certifications && product.certifications.length > 0 ? `- Certifications: ${product.certifications.join(', ')}` : ''}
${product.labels && product.labels.length > 0 ? `- Labels: ${product.labels.join(', ')}` : ''}
${Object.keys(product.specifications || {}).length > 0 ? `- Spécifications: ${Object.entries(product.specifications).map(([key, value]) => `${key}: ${value}`).join(', ')}` : ''}
`).join('\n')}

🎯 DIRECTIVES CRÉATIVES POUR L'EXPLOITATION DES DONNÉES PRODUIT:

📸 STORYTELLING SENSORIEL:
${briefData.products.some(p => p.flavors?.length > 0 || p.scents?.length > 0) ? `
- Créer des descriptions ÉVOCATRICES qui font appel aux sens
- Utiliser un langage sensoriel immersif (ex: "notes de vanille bourbon", "fraîcheur mentholée")
- Évoquer visuellement les arômes et parfums dans la direction artistique
` : ''}

🌿 VALORISATION DES INGRÉDIENTS:
${briefData.products.some(p => p.technicalDetails?.ingredients?.length > 0) ? `
- Mettre en avant les ingrédients PREMIUM, NATURELS ou BIO
- Créer des visuels qui montrent la qualité des ingrédients
- Raconter l'histoire des ingrédients (origine, bienfaits)
` : ''}

🏆 BADGES DE CONFIANCE:
${briefData.products.some(p => p.certifications?.length > 0 || p.labels?.length > 0) ? `
- Intégrer subtilement les certifications et labels dans le storytelling
- Renforcer la crédibilité avec ces preuves de qualité
- Utiliser ces éléments comme différenciateurs clés
` : ''}

📖 CONTENU ÉDUCATIF:
${briefData.products.some(p => p.technicalDetails?.usage) ? `
- Créer des posts tutoriels/tips basés sur les modes d'utilisation
- Éduquer l'audience sur les meilleures pratiques
- Transformer les spécifications techniques en bénéfices concrets
` : ''}

⚠️ OBLIGATION : Exploiter ces données riches pour créer du contenu DIFFÉRENCIANT et ENGAGEANT

🎯 SÉLECTION INTELLIGENTE DES PRODUITS (IMPÉRATIF) :
Vous devez choisir intelligemment le(s) produit(s) optimal(aux) selon le contexte créatif de ce post :

📋 RÈGLES DE SÉLECTION :
- 1 PRODUIT : Pour un focus spécifique, storytelling centré, mise en avant d'une innovation
- 2-3 PRODUITS : Pour montrer une gamme, créer une comparaison, démontrer la variété
- TOUTE LA GAMME : Pour une vision d'ensemble de la marque, campagne de lancement

🎯 DIVERSITÉ OBLIGATOIRE (Post ${i + 1}/${dates.length}):
- VARIER les produits entre chaque post pour éviter la répétition
- Post ${i + 1} : Choisir un produit DIFFÉRENT des posts précédents si possible
- Créer de la variété dans la sélection pour maintenir l'intérêt de l'audience
- Alterner entre les produits disponibles pour maximiser l'exposition de la gamme

⚠️ OBLIGATION : Dans votre réponse, vous DEVEZ inclure une section :
---PRODUITS SÉLECTIONNÉS---
[Numéros des produits choisis : ex. "1,3" ou "1,2,3" ou "1"]
[Justification de votre choix en 1-2 phrases, en tenant compte de la diversité]

Cette sélection déterminera quelles images de référence seront utilisées pour la génération visuelle.
` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌍 ADAPTATION CULTURELLE OBLIGATOIRE - ${calendar.targetCountry.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ IMPÉRATIF : Utilise ta connaissance native de GPT-5 pour adapter le contenu à ${calendar.targetCountry}.

📋 CHECKLIST CULTURELLE (à appliquer automatiquement) :

1. **TABOUS CULTURELS** :
   - Identifie les tabous de ${calendar.targetCountry} (religion, politique, mœurs)
   - Ne JAMAIS les violer dans le contenu ou les visuels suggérés
   
2. **VALEURS LOCALES** :
   - Intègre les valeurs culturelles dominantes de ${calendar.targetCountry}
   - Exemple : Si MENA → Famille, hospitalité, tradition-modernité
   
3. **CODES VISUELS** :
   - Suggère des éléments visuels qui résonnent avec ${calendar.targetCountry}
   - Évite les clichés et stéréotypes
   
4. **RÉFÉRENCES CULTURELLES** :
   - Utilise des références que l'audience de ${calendar.targetCountry} comprendra
   - Évite les références trop occidentales si marché non-occidental

5. **COMPORTEMENTS CONSOMMATEURS** :
   - Adapte le CTA aux habitudes d'achat de ${calendar.targetCountry}
   - Exemple : Si MENA → Importance de la recommandation familiale

🎯 OBJECTIF : Le contenu doit sembler écrit par un natif de ${calendar.targetCountry}.

⚠️ NOTE : Le style de communication "${calendar.communicationStyle}" est DÉJÀ défini.
Cette section concerne uniquement l'adaptation culturelle PAR PAYS.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AUDIENCE CIBLE & INSIGHTS PSYCHOGRAPHIQUES
- Marché : ${calendar.targetCountry}
- Langues : ${calendar.targetLanguages.map(lang => {
  const dialectInfo = isDialect(lang) ? getDialectInfo(lang) : null;
  return dialectInfo ? dialectInfo.name : getLanguageName(lang);
}).join(', ')}
- Profil démographique : ${briefData.targetAudience.demographic?.join(', ') || 'Non spécifié'}
${briefData.audienceNeeds ? `
- Besoins & Désirs de l'Audience : ${briefData.audienceNeeds}
→ IMPÉRATIF: Créer du contenu qui résonne avec ces besoins profonds
` : ''}
${briefData.productSolution ? `
- Solution Apportée par le Produit : ${briefData.productSolution}
→ IMPÉRATIF: Présenter le produit comme enabler de transformation, pas comme objet
` : ''}
            
OBJECTIFS STRATÉGIQUES & PERFORMANCE
- Objectifs business : ${briefData.socialMediaGoals.join(', ')}
- Période de campagne : du ${calendar.startDate.toLocaleDateString()} au ${calendar.endDate.toLocaleDateString()}
- KPIs prioritaires : Engagement, Conversion, Mémorisation de marque
${briefData.successMetrics && briefData.successMetrics.length > 0 ? `
- Métriques de Succès à Optimiser : ${briefData.successMetrics.join(', ')}
→ Le contenu DOIT être optimisé pour ces KPIs spécifiques
` : ''}
${briefData.roiExpectations && briefData.roiExpectations.length > 0 ? `
- Attentes ROI : ${briefData.roiExpectations.join(', ')}
→ Créer du contenu orienté performance pour atteindre ces objectifs mesurables
` : ''}

${keyDateSection}
            
DIRECTIVES CRÉATIVES
- Créez une publication qui atteint le niveau d'excellence des campagnes primées aux Cannes Lions
- Utilisez les frameworks AIDA (Attention, Intérêt, Désir, Action) ou PAS (Problème, Agitation, Solution)
- Pour le prompt d'image, utilisez une structure narrative visuelle professionnelle
- La publication doit avoir sa propre identité créative unique et mémorable
- Adaptez parfaitement le ton et le style aux spécificités de ${platform} et de l'audience cible`
          }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

        const content = response.data.choices[0].message.content;
        logger.info(`Contenu généré pour le post #${i + 1}:\n${content.substring(0, 200)}...`);
        
        const parsedPosts = parseGPTResponse(content);
        
        if (parsedPosts.length === 0) {
          logger.error(`Erreur: Aucun post n'a été extrait du contenu généré`);
          continue;
        }
        
        const parsedPost = parsedPosts[0];
        
        // 🎯 EXTRAIRE LA SÉLECTION DE PRODUITS DE GPT-5
        let selectedProducts: IProduct[] = [];
        
        // Utiliser la nouvelle fonction parseGPTProductSelection
        selectedProducts = parseGPTProductSelection(parsedPost.productsSelected, products, i, dates.length);
        
        logger.info(`🎯 GPT-5 a sélectionné ${selectedProducts.length} produit(s) pour le post ${i + 1}:`);
        selectedProducts.forEach((product, index) => {
          logger.info(`   ${index + 1}. ${product.name}`);
        });
        
        // Ajouter les dates clés associées au post
        const keyDatesData = relevantKeyDates.length > 0 ? 
          relevantKeyDates.map(kd => ({ 
            name: kd.name, 
            importance: String(kd.importance) 
          })) : 
          undefined;
        
        const postData = {
          calendarId: calendar._id,
          brandId: brand._id,
          createdBy: user._id,
          platform,
          scheduledDate: date,
          content: {
            text: parsedPost.postContent,
            mediaType: 'image' as 'image' | 'video' | 'text',
            imageUrl: '',
            imageUrls: [] as string[],
            imagePublicId: '',
            imagePrompt: parsedPost.imagePrompt,
            imageStyle: parsedPost.imageStyle,
            contentType: 'single' as 'single' | 'carousel' | 'stories'
          },
          status: 'pending_validation',
          tags: calendar.generationSettings?.themes || [],
          hashtags: parsedPost.hashtags,
          callToAction: parsedPost.callToAction,
          audienceTargeting: parsedPost.audienceTargeting,
          competitiveEdge: parsedPost.competitiveEdge,
          legalCompliance: parsedPost.legalCompliance,
          culturalRelevance: parsedPost.culturalRelevance,
          keyDates: keyDatesData,
          aiGenerated: true,
          // Ajouter les références aux produits SÉLECTIONNÉS
          products: selectedProducts.map(p => p._id) || calendar.selectedProducts || []
        };
        
          // 🏆 GÉNÉRATION D'IMAGE NIVEAU CANNES LIONS
          try {
            logger.info('🏆 === GÉNÉRATION D\'IMAGE NIVEAU CANNES LIONS ===');
            logger.info(`Plateforme: ${platform}, Marque: ${brand.name}, Secteur: ${brand.sector}`);
            
            // Récupérer le prompt brut généré par GPT-5
            const rawImagePrompt = parsedPost.imagePrompt;
            logger.info('Prompt GPT-5 original (premiers 200 chars):', rawImagePrompt.substring(0, 200) + '...');
            
            // 🎯 PRÉPARER LES IMAGES DE RÉFÉRENCE - SEULEMENT LES PRODUITS SÉLECTIONNÉS PAR GPT-5
            let referenceImageBase64: string | undefined;
            let referenceImagesBase64: string[] = [];
            let hasProductReference = false;
            
            if (selectedProducts.length > 0) {
              logger.info(`📦 Traitement UNIQUEMENT des ${selectedProducts.length} produit(s) sélectionné(s) par GPT-5:`);
              selectedProducts.forEach((product, index) => {
                logger.info(`   ${index + 1}. ${product.name} ✅ SÉLECTIONNÉ pour le texte`);
              });
              
              // 🎯 CORRECTION COHÉRENCE : Traiter SEULEMENT les produits sélectionnés par GPT-5
              for (const [index, product] of selectedProducts.entries()) {
                logger.info(`\n📸 Traitement image produit ${index + 1}/${selectedProducts.length}: ${product.name}`);
                
                // Vérifier si le produit a une image
                if (product.images && product.images.main) {
                  const productImagePath = product.images.main;
                  logger.info(`📸 Image du produit trouvée: ${productImagePath}`);
                  
                  try {
                    let imageBuffer: Buffer;
                    
                    // Vérifier si c'est une URL (Cloudinary ou autre)
                    if (productImagePath.startsWith('http://') || productImagePath.startsWith('https://') || productImagePath.includes('cloudinary.com')) {
                      logger.info('📥 Téléchargement depuis URL:', productImagePath.substring(0, 80) + '...');
                      
                      const response = await axios.get(productImagePath, { 
                        responseType: 'arraybuffer',
                        timeout: 30000
                      });
                      imageBuffer = Buffer.from(response.data);
                      logger.info('✅ Image téléchargée:', imageBuffer.length, 'bytes');
                    } else {
                      // Chemin local - pour développement ou fallback
                      const fullPath = path.join(process.cwd(), 'public', productImagePath);
                      logger.info('📂 Lecture depuis le système de fichiers:', fullPath);
                      
                      const fs = await import('fs');
                      if (!fs.existsSync(fullPath)) {
                        throw new Error(`Fichier introuvable: ${fullPath}`);
                      }
                      
                      imageBuffer = await fs.promises.readFile(fullPath);
                      logger.info('✅ Image lue:', imageBuffer.length, 'bytes');
                    }
                    
                    // 🎯 HAUTE RÉSOLUTION : Transformer en carré 2048x2048
                    logger.info('🎯 Transformation en haute résolution 2048x2048 (qualité maximale)...');
                    const highResBuffer = await sharp(imageBuffer)
                      .resize(2048, 2048, {
                        fit: 'contain',
                        background: { r: 255, g: 255, b: 255, alpha: 1 }
                      })
                      .png({ quality: 100 })
                      .toBuffer();
                    
                    const productImageBase64 = highResBuffer.toString('base64');
                    referenceImagesBase64.push(productImageBase64);
                    
                    // Pour compatibilité avec l'ancien système, utiliser le premier produit comme référence principale
                    if (index === 0) {
                      referenceImageBase64 = productImageBase64;
                    }
                    
                    hasProductReference = true;
                    logger.info(`✅ Image produit ${index + 1} convertie en base64: ${productImageBase64.length} chars`);
                  } catch (error: any) {
                    logger.error(`❌ Erreur lors du traitement de l'image produit ${product.name}:`);
                    logger.error('Details:', error.message);
                    if (error.response) {
                      logger.error('HTTP Status:', error.response.status);
                    }
                    logger.info(`⚠️  Produit ${product.name} ignoré pour la génération`);
                  }
                } else {
                  logger.info(`ℹ️  Aucune image associée au produit ${product.name}`);
                }
              }
              
              logger.info(`\n🎯 Résumé des images de référence (COHÉRENCE TEXTE-IMAGE):`);
              logger.info(`   - Images collectées: ${referenceImagesBase64.length}/${selectedProducts.length}`);
              logger.info(`   - Produits dans le texte: ${selectedProducts.map(p => p.name).join(', ')}`);
              logger.info(`   - Cohérence garantie: ${referenceImagesBase64.length > 0 ? 'OUI ✅' : 'NON ❌'}`);
            }
            
            // 🎨 NOUVEAU SYSTÈME : CREATIVE ENGINE 2026 + GPT CREATIVE DIRECTOR
            logger.info('🎨 === CREATIVE ENGINE 2026 + GPT CREATIVE DIRECTOR ===');
            logger.info(`🎯 Génération prompt d'image avec presets sectoriels 2026`);
            
            // 🆕 ÉTAPE 1: Utiliser CreativeOrchestrator pour obtenir la direction créative sectorielle
            const orchestrator = new CreativeOrchestrator({ diversityMode: 'high' });
            let creativeDirection;
            try {
              creativeDirection = await orchestrator.generateCreativeDirection({
                brand: {
                  name: brand.name,
                  sector: brand.sector,
                  colors: brand.colors,
                  values: brand.values
                },
                product: selectedProducts.length > 0 ? {
                  name: selectedProducts[0].name,
                  category: selectedProducts[0].category,
                  description: selectedProducts[0].description
                } : undefined,
                platform: platform,
                objective: calendar.campaignObjective || 'engagement',
                language: calendar.targetLanguages?.[0] || 'fr',
                season: this.getCurrentSeason()
              });
              
              logger.info(`✅ CreativeOrchestrator 2026 - Direction créative générée:`);
              logger.info(`   - Style: ${creativeDirection.style.name}`);
              logger.info(`   - Contexte: ${creativeDirection.context.name}`);
              logger.info(`   - Palette: ${creativeDirection.palette.name}`);
              logger.info(`   - Score Cannes Lions: ${creativeDirection.metadata.cannesLionsScore}/100`);
            } catch (orchestratorError: any) {
              logger.error('❌ Erreur CreativeOrchestrator:', orchestratorError.message);
              logger.info('⚠️  Fallback vers GPT Creative Director seul');
              creativeDirection = null;
            }
            
            // Préparer les données pour GPT Creative Director
            const brandData = {
              name: brand.name,
              sector: brand.sector,
              pricePositioning: brand.pricePositioning,
              businessType: brand.businessType,
              colors: brand.colors,
              description: brand.description,
              values: brand.values,
              targetAudience: briefData.targetAudience.geographic?.[0] || calendar.targetCountry
            };
            
            // 🎯 CORRECTION CRITIQUE : Utiliser les produits SÉLECTIONNÉS par GPT-5
            const productData = selectedProducts.length > 0 ? {
              name: selectedProducts[0].name,
              category: selectedProducts[0].category,
              description: selectedProducts[0].description,
              uniqueSellingPoints: selectedProducts[0].uniqueSellingPoints,
              customerBenefits: selectedProducts[0].customerBenefits,
              usageOccasions: selectedProducts[0].usageOccasions,
              images: selectedProducts[0].images
            } : products.length > 0 ? {
              name: products[0].name,
              category: products[0].category,
              description: products[0].description,
              uniqueSellingPoints: products[0].uniqueSellingPoints,
              customerBenefits: products[0].customerBenefits,
              usageOccasions: products[0].usageOccasions,
              images: products[0].images
            } : {
              name: brand.name,
              category: 'general',
              description: brand.description || 'Produit de qualité'
            };
            
            const calendarData = {
              campaignObjective: calendar.campaignObjective,
              generationSettings: calendar.generationSettings,
              communicationStyle: calendar.communicationStyle,
              targetAudience: briefData.targetAudience.geographic?.[0] || calendar.targetCountry
            };
            
            const postContext = {
              postIndex: i,
              totalPosts: dates.length,
              scheduledDate: date.toISOString(),
              platform: platform,
              country: calendar.targetCountry,
              // 🎯 BRIEF CRÉATIF COMPLET CANNES LIONS
              // COHÉRENCE : Texte généré pour alignement parfait
              generatedText: parsedPost.postContent,
              // QUALITÉ : Éléments créatifs GPT-5 pour richesse maximale
              originalImagePrompt: parsedPost.imagePrompt,
              hashtags: parsedPost.hashtags,
              callToAction: parsedPost.callToAction,
              imageStyle: parsedPost.imageStyle,
              audienceTargeting: parsedPost.audienceTargeting,
              competitiveEdge: parsedPost.competitiveEdge,
              legalCompliance: parsedPost.legalCompliance,
              culturalRelevance: parsedPost.culturalRelevance,
              // CONTEXTE : Données enrichies
              keyDates: keyDatesData,
              selectedProducts: selectedProducts.map(p => ({
                name: p.name,
                category: p.category,
                description: p.description
              })),
              // 🆕 COUCHE 1 : STRATÉGIE VISUELLE
              visualStrategy: visualStrategy || undefined
            };
            
            // Générer le prompt d'image avec GPT Creative Director APRÈS avoir le texte
            let gptImagePrompt: string;
            try {
              logger.info('🤖 Appel à GPT Creative Director avec contexte textuel...');
              gptImagePrompt = await GPTCreativeDirector.generateImagePrompt(
                brandData,
                productData,
                calendarData,
                postContext,
                String(calendar._id)
              );
              
              logger.info('✅ GPT Creative Director a généré le prompt cohérent avec le texte');
              logger.info(`📝 Prompt généré (premiers 200 chars): ${gptImagePrompt.substring(0, 200)}...`);
              
            } catch (error: any) {
              logger.error('❌ Erreur GPT Creative Director:', error.message);
              logger.info('⚠️  Utilisation du prompt GPT-5 original');
              
              // Fallback : utiliser le prompt généré par GPT-5
              gptImagePrompt = rawImagePrompt;
            }
            
            // Utiliser le prompt généré par GPT Creative Director (cohérent avec le texte)
            const finalImagePrompt = gptImagePrompt;
            
            logger.info('✅ Prompt final prêt pour génération');
            logger.info('🔍 Prompt final (premiers 500 chars):');
            logger.info(finalImagePrompt.substring(0, 500) + '...');
            
            // 🎯 GÉNÉRATION SELON LE TYPE DE CONTENU SÉLECTIONNÉ
            logger.info(`\n🎯 === GÉNÉRATION ${contentTypeForThisPost.toUpperCase()} ===`);
            
            if (contentTypeForThisPost === 'carousel') {
              // 🎠 GÉNÉRATION DE CARROUSEL (4 images)
              logger.info('🎠 Génération d\'un carrousel avec 4 images...');
              
              try {
                const carouselResults = await GeminiImageService.generateCarouselImages(
                  finalImagePrompt,
                  4, // 4 images par carrousel
                  {
                    aspectRatio: aspectRatioForThisPost as any,
                    imageSize: '2K',
                    referenceImages: referenceImagesBase64.length > 0 ? referenceImagesBase64 : undefined,
                    referenceImage: referenceImageBase64,
                    referenceImageStrength: hasProductReference ? 0.7 : undefined
                  }
                );
                
                if (carouselResults.length > 0) {
                  // Configurer le post comme carrousel
                  postData.content.contentType = 'carousel';
                  postData.content.imageUrls = carouselResults.map(r => r.url);
                  postData.content.imageUrl = carouselResults[0].url; // Première image comme preview
                  
                  logger.info(`✅ Carrousel généré avec ${carouselResults.length} images`);
                  carouselResults.forEach((result, index) => {
                    logger.info(`   Image ${index + 1}: ${result.url}`);
                  });
                } else {
                  logger.error('❌ Aucune image générée pour le carrousel, fallback vers image simple');
                  contentTypeForThisPost = 'single';
                }
              } catch (carouselError: any) {
                logger.error('❌ Erreur génération carrousel:', carouselError.message);
                logger.info('⚠️  Fallback vers génération d\'image simple');
                contentTypeForThisPost = 'single';
              }
            }
            
            // Si ce n'est pas un carrousel OU si le carrousel a échoué, générer une image simple
            if (contentTypeForThisPost !== 'carousel') {
              logger.info(`📸 Génération d'image simple (${contentTypeForThisPost}) avec format ${aspectRatioForThisPost}...`);
              
              const generatedVariations = [];
              
              for (let variation = 1; variation <= 2; variation++) {
                logger.info(`\n📸 Génération variation ${variation}/2...`);
                
                // Ajuster légèrement le strength pour chaque variation
                const adjustedStrength = hasProductReference ? 0.7 + ((variation - 1) * 0.05) : undefined;
                
                if (adjustedStrength) {
                  logger.info(`🎚️  Reference strength pour variation ${variation}: ${adjustedStrength.toFixed(2)}`);
                }
                
                try {
                  // 🎯 UTILISER LE SUPPORT MULTI-PRODUITS DE GEMINI
                  let geminiResults;

                  // Choisir entre référence unique ou multiple selon le nombre de produits
                  if (referenceImagesBase64.length > 1) {
                    logger.info(`🎯 Utilisation du mode MULTI-PRODUITS avec ${referenceImagesBase64.length} références`);
                    geminiResults = await GeminiImageService.generateImages(
                      finalImagePrompt,
                      {
                        numberOfImages: 1,
                        aspectRatio: aspectRatioForThisPost as any,
                        imageSize: '2K',
                        referenceImages: referenceImagesBase64,
                        referenceImageStrength: adjustedStrength
                      }
                    );
                  } else if (referenceImageBase64) {
                    logger.info(`🎯 Utilisation du mode PRODUIT UNIQUE avec 1 référence`);
                    geminiResults = await GeminiImageService.generateImages(
                      finalImagePrompt,
                      {
                        numberOfImages: 1,
                        aspectRatio: aspectRatioForThisPost as any,
                        imageSize: '2K',
                        referenceImage: referenceImageBase64,
                        referenceImageStrength: adjustedStrength
                      }
                    );
                  } else {
                    logger.info(`🎯 Génération sans référence produit`);
                    geminiResults = await GeminiImageService.generateImages(
                      finalImagePrompt,
                      {
                        numberOfImages: 1,
                        aspectRatio: aspectRatioForThisPost as any,
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
                    logger.info(`✅ Variation ${variation} générée: ${geminiResults[0].url}`);
                  } else {
                    logger.error(`❌ Variation ${variation}: Aucune image retournée`);
                  }
                } catch (variationError: any) {
                  logger.error(`❌ Erreur variation ${variation}:`, variationError.message);
                }
              }
              
              // 🏆 SCORING AUTOMATIQUE AVEC GEMINI VISION
              if (generatedVariations.length > 0) {
                logger.info(`\n🏆 === SCORING AUTOMATIQUE GEMINI VISION ===`);
                
                // Déterminer si l'image contient probablement des mains
                // (heuristique basée sur le prompt)
                const promptLower = finalImagePrompt.toLowerCase();
                const hasHands = promptLower.includes('hand') || promptLower.includes('holding') || 
                                 promptLower.includes('grip') || promptLower.includes('finger');
                
                logger.info(`Présence mains détectée: ${hasHands ? 'OUI' : 'NON'}`);
                
                // Scorer chaque variation
                const scoredVariations: ScoredImage[] = [];
                
                for (const variation of generatedVariations) {
                  try {
                    logger.info(`\n📊 Scoring de la variation ${variation.variation}...`);
                    
                    const score = await CannesLionsImageScorer.scoreImage(
                      variation.url,
                      variation.variation,
                      hasHands,
                      parsedPost.postContent // 🆕 Passer le texte pour évaluer la cohérence
                    );
                    
                    scoredVariations.push({
                      ...variation,
                      score
                    });
                    
                  } catch (scoringError: any) {
                    logger.error(`❌ Erreur scoring variation ${variation.variation}:`, scoringError.message);
                    logger.info('⚠️  Utilisation de scores par défaut pour cette variation');
                    
                    // Utiliser des scores par défaut en cas d'erreur
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
                        // 🆕 NOUVEAUX CRITÈRES PAR DÉFAUT
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
                logger.info(`\n🎯 Sélection de la meilleure parmi ${scoredVariations.length} variations scorées...`);
                
                const bestImage = CannesLionsImageScorer.selectBestImage(scoredVariations);
                
                postData.content.imageUrl = bestImage.url;
                
                logger.info(`\n✅ === GÉNÉRATION RÉUSSIE ===`);
                logger.info(`🏆 Image gagnante: Variation ${bestImage.variation}`);
                logger.info(`📊 Score global: ${bestImage.score.overall}/100`);
                logger.info(`   - Anatomie: ${bestImage.score.anatomicalAccuracy}/100`);
                logger.info(`   - Composition: ${bestImage.score.compositionExcellence}/100`);
                logger.info(`   - Produit: ${bestImage.score.productFidelity}/100`);
                logger.info(`   - Cannes Lions: ${bestImage.score.cannesLionsPotential}/100`);
                logger.info(`📐 Dimensions: ${bestImage.width}x${bestImage.height}`);
                logger.info(`🔗 URL: ${bestImage.url}`);
                
                if (bestImage.score.recommendations.length > 0) {
                  logger.info(`💡 Recommandations: ${bestImage.score.recommendations.slice(0, 2).join(', ')}`);
                }
                
              } else {
                logger.error('❌ Aucune variation n\'a été générée avec succès');
              }
            }
            
          } catch (error: any) {
            logger.error('❌ === ERREUR GÉNÉRATION IMAGE ===');
            logger.error('Message:', error.message);
            logger.error('Stack:', error.stack);
            if (error.response) {
              logger.error('HTTP Status:', error.response.status);
              logger.error('HTTP Data:', JSON.stringify(error.response.data).substring(0, 500));
            }
          }

        // Marquer explicitement ce post comme IMAGE
        postData.content.mediaType = 'image';

        logger.info('Création du post IMAGE dans la base de données...');
        const post = await Post.create(postData);
        logger.info('Post IMAGE créé avec succès, ID:', post._id);
        savedPosts.push(post);
      }
    }

    // 🎬 GÉNÉRATION D'UNE VIDÉO REEL (en plus des images)
    if (GENERATE_VIDEO && VIDEOS_PER_CALENDAR > 0) {
      logger.info('\n\n🎬 ========================================');
      logger.info('🎬 GÉNÉRATION DE VIDÉO REEL VEO3');
      logger.info('🎬 ========================================\n');
      
      try {
        // Choisir Instagram comme plateforme pour le REEL
        const reelPlatform = 'instagram';
        
        // Date : milieu de la période du calendrier
        const reelDate = new Date(calendar.startDate);
        const daysDiff = Math.floor((calendar.endDate.getTime() - calendar.startDate.getTime()) / (24 * 60 * 60 * 1000));
        reelDate.setDate(reelDate.getDate() + Math.floor(daysDiff / 2));
        reelDate.setHours(18, 0, 0, 0); // 18h00 pour les REELs
        
        logger.info(`Date programmée pour le REEL: ${reelDate.toLocaleDateString()} à ${reelDate.getHours()}:${reelDate.getMinutes()}`);
        
        // Attendre pour respecter le rate limit OpenAI
        await this.waitForOpenAIRateLimit();
        
        // Générer le contenu texte pour le REEL
        logger.info('Génération du contenu texte du REEL avec GPT-5...');
        
        const reelResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-5',
          reasoning_effort: 'medium',
          messages: [
            {
              role: 'system',
              content: `Tu es un expert en création de REELS Instagram viraux. Crée un contenu court, percutant et engageant pour un REEL de ${brand.name}.`
            },
            {
              role: 'user',
              content: `Créez un contenu REEL Instagram pour ${brand.name} (${brand.sector}).
              
${briefData.products.length > 0 ? `Produit phare: ${briefData.products[0].name} - ${briefData.products[0].description}` : ''}

Le contenu doit être:
- Court et percutant (50-100 mots max)
- Optimisé pour un format vidéo vertical 9:16
- Avec un hook fort dans les 3 premières secondes
- Call-to-action engageant

FORMAT DE RÉPONSE:
---POST #1---
[Contenu du REEL]

---HASHTAGS---
[5-7 hashtags]

---CALL TO ACTION---
[CTA]`
            }
          ]
        }, {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        
        const reelContent = reelResponse.data.choices[0].message.content;
        logger.info(`Contenu REEL généré:\n${reelContent.substring(0, 200)}...`);
        
        const parsedReelPosts = parseGPTResponse(reelContent);
        
        if (parsedReelPosts.length === 0) {
          throw new Error('Impossible de parser le contenu REEL généré');
        }
        
        const parsedReelPost = parsedReelPosts[0];
        
        // 🎬 NOUVEAU SYSTÈME : GPT VIDEO CREATIVE DIRECTOR
        logger.info('🎬 === NOUVEAU SYSTÈME GPT VIDEO CREATIVE DIRECTOR ===');
        logger.info(`🎯 Génération script vidéo unique pour ${brand.name} - REEL`);
        
        // Préparer les données pour GPT Video Creative Director
        const videoBrandData = {
          name: brand.name,
          sector: brand.sector,
          pricePositioning: brand.pricePositioning,
          businessType: brand.businessType,
          colors: brand.colors,
          description: brand.description,
          values: brand.values,
          targetAudience: briefData.targetAudience.geographic?.[0] || calendar.targetCountry
        };
        
        const videoProductData = products.length > 0 ? {
          name: products[0].name,
          category: products[0].category,
          description: products[0].description,
          uniqueSellingPoints: products[0].uniqueSellingPoints,
          customerBenefits: products[0].customerBenefits,
          usageOccasions: products[0].usageOccasions,
          images: products[0].images
        } : {
          name: brand.name,
          category: 'general',
          description: brand.description || 'Produit de qualité'
        };
        
        const videoCalendarData = {
          campaignObjective: calendar.campaignObjective,
          generationSettings: calendar.generationSettings,
          communicationStyle: calendar.communicationStyle,
          targetAudience: briefData.targetAudience.geographic?.[0] || calendar.targetCountry
        };
        
        const videoContext = {
          postIndex: 0, // Premier et seul REEL
          totalPosts: 1,
          scheduledDate: reelDate.toISOString(),
          platform: reelPlatform,
          country: calendar.targetCountry,
          videoType: 'product-showcase' as 'text-to-video' | 'image-to-video' | 'product-showcase' | 'lifestyle',
          duration: 8 as 4 | 6 | 8,
          aspectRatio: '9:16' as '16:9' | '9:16'
        };
        
        // Générer le script vidéo avec GPT Video Creative Director
        let reelPrompt: string;
        try {
          logger.info('🤖 Appel à GPT Video Creative Director...');
          reelPrompt = await GPTVideoCreativeDirector.generateVideoScript(
            videoBrandData,
            videoProductData,
            videoCalendarData,
            videoContext,
            String(calendar._id)
          );
          
          logger.info('✅ GPT Video Creative Director a généré le script avec succès');
          logger.info(`📝 Script généré (premiers 300 chars): ${reelPrompt.substring(0, 300)}...`);
          
        } catch (error: any) {
          logger.error('❌ Erreur GPT Video Creative Director:', error.message);
          logger.info('⚠️  Utilisation d\'un script de fallback');
          
          // Script de fallback simple mais efficace
          const productDetails = products.length > 0 ? products[0] : null;
          reelPrompt = `Professional 8-second commercial video showcasing ${productDetails ? productDetails.name : 'product'} for ${brand.name}.

🎬 CINEMATOGRAPHY:
- Format: 9:16 vertical video optimized for Instagram Reel
- Camera movement: Smooth, dynamic reveal showcasing product from multiple angles
- Lighting: Professional commercial lighting with cinematic quality
- Setting: ${productDetails?.category || 'Lifestyle'} context that complements the product
${brand.colors?.primary ? `- Color palette: ${brand.colors.primary} brand colors integrated in environment` : ''}

🎯 PRODUCT INTEGRATION:
- The product occupies 40-60% of frame throughout the video
- Product is always in sharp focus and well-lit
- Background and environment enhance the product without competing for attention
- Natural lifestyle integration showing product in authentic use context

⚡ STYLE & MOOD:
- Tone: Professional and aspirational
- Style: High-end commercial product video
- Mood: ${productDetails?.category === 'food' ? 'Appetizing and fresh' : productDetails?.category === 'cosmetic' ? 'Luxurious and elegant' : 'Modern and premium'}
- Quality: Cinema-grade, 1080p resolution, professional color grading

📹 VIDEO CONCEPT:
${parsedReelPost.postContent}`;
        }
        
        logger.info('📝 Script REEL final prêt');
        logger.info('Produit:', videoProductData.name || 'N/A');
        logger.info('Script complet:', reelPrompt.substring(0, 300) + '...');
        
        // 🎨 PIPELINE EN 2 ÉTAPES : Nano Banana → VEO3
        // Étape 1: Générer une image stylisée avec Nano Banana
        // Étape 2: Animer l'image avec VEO3 (image-to-video)
        
        logger.info('🎨 ========================================');
        logger.info('🎨 ÉTAPE 1/2: Génération image avec Nano Banana');
        logger.info('🎨 ========================================');
        
        // Préparer l'image produit de référence pour Nano Banana
        let productReferenceBase64: string | undefined;
        
        if (calendar.selectedProducts && calendar.selectedProducts.length > 0 && products.length > 0) {
          const product = products[0]; // Utiliser le premier produit
          
          if (product.images && product.images.main) {
            try {
              logger.info(`📥 Téléchargement image produit: ${product.name}`);
              const response = await axios.get(product.images.main, {
                responseType: 'arraybuffer',
                timeout: 30000
              });
              const imageBuffer = Buffer.from(response.data);
              productReferenceBase64 = imageBuffer.toString('base64');
              logger.info(`✅ Image produit téléchargée: ${imageBuffer.length} bytes`);
            } catch (error: any) {
              logger.error(`❌ Erreur téléchargement image ${product.name}:`, error.message);
            }
          }
        }
        
        // Construire le prompt pour Nano Banana (image statique pour vidéo 9:16)
        const productDetails = products.length > 0 ? products[0] : null;
        const nanoBananaPrompt = `Professional 9:16 vertical commercial product shot for Instagram Reel.
${parsedReelPost.postContent}

Product: ${productDetails ? productDetails.name : 'featured product'}
Style: High-end product photography, cinematic composition
Format: Vertical 9:16 optimized for mobile video animation
Setting: ${productDetails?.category || 'Lifestyle'} context that tells a story
Colors: ${brand.colors?.primary ? `${brand.colors.primary} brand palette` : 'Vibrant commercial colors'}
Mood: ${productDetails?.category === 'food' ? 'Fresh and appetizing' : productDetails?.category === 'cosmetic' ? 'Luxurious and elegant' : 'Modern and premium'}

The product should be the focal point (40-60% of frame), clearly visible, well-lit, ready for smooth animation.`;

        logger.info('📝 Prompt Nano Banana:', nanoBananaPrompt.substring(0, 200) + '...');
        
        // Générer l'image avec Nano Banana (avec ou sans référence produit)
        const nanaBananaResults = await GeminiImageService.generateImages(
          nanoBananaPrompt,
          {
            numberOfImages: 1,
            aspectRatio: '9:16', // Format vertical pour REEL
            imageSize: '1K',
            referenceImage: productReferenceBase64
          }
        );
        
        if (nanaBananaResults.length === 0) {
          throw new Error('Nano Banana n\'a pas généré d\'image');
        }
        
        logger.info('✅ Image Nano Banana générée:', nanaBananaResults[0].url);
        
        // Télécharger l'image générée pour l'animer avec VEO3
        logger.info('📥 Téléchargement de l\'image Nano Banana pour animation...');
        const nanaBananaImageResponse = await axios.get(nanaBananaResults[0].url, {
          responseType: 'arraybuffer',
          timeout: 30000
        });
        const nanaBananaImageBuffer = Buffer.from(nanaBananaImageResponse.data);
        logger.info(`✅ Image téléchargée: ${nanaBananaImageBuffer.length} bytes`);
        
        // 🎬 ÉTAPE 2: Animer l'image avec VEO3 (image-to-video)
        logger.info('\n🎬 ========================================');
        logger.info('🎬 ÉTAPE 2/2: Animation avec VEO3');
        logger.info('🎬 ========================================');
        
        logger.info('🎥 Animation de l\'image Nano Banana en REEL 9:16 vertical');
        
        const video = await Veo3Service.generateVideoFromImage(
          reelPrompt,
          nanaBananaImageBuffer,
          {
            duration: 8,
            aspectRatio: '9:16', // ✅ Compatible avec image-to-video !
            resolution: '1080p'
          }
        );
        
        logger.info('✅ REEL généré avec succès par VEO3');
        logger.info('URL vidéo:', video.videoUrl);
        
        // Vérifier que la vidéo a bien été générée
        if (!video.videoUrl || !video.videoPublicId) {
          throw new Error('Vidéo générée mais URL ou publicId manquant');
        }
        
        // Créer le post VIDÉO
        const videoPostData = {
          calendarId: calendar._id,
          brandId: brand._id,
          createdBy: user._id,
          platform: reelPlatform,
          scheduledDate: reelDate,
          content: {
            text: parsedReelPost.postContent,
            mediaType: 'video' as 'image' | 'video' | 'text',
            videoUrl: video.videoUrl,
            videoPublicId: video.videoPublicId,
            videoPrompt: reelPrompt,
            videoDuration: video.duration,
            videoFormat: '9:16' as '16:9' | '9:16' | '1:1',
            videoResolution: '1080p' as '720p' | '1080p',
            hasAudio: true
          },
          videoType: 'reel' as 'story' | 'reel' | 'short' | 'animation' | 'standard',
          status: 'pending_validation',
          tags: calendar.generationSettings?.themes || [],
          hashtags: parsedReelPost.hashtags,
          callToAction: parsedReelPost.callToAction,
          aiGenerated: true,
          products: calendar.selectedProducts || []
        };
        
        logger.info('Création du post VIDÉO dans la base de données...');
        logger.info('Post data:', {
          platform: videoPostData.platform,
          mediaType: videoPostData.content.mediaType,
          videoUrl: videoPostData.content.videoUrl ? 'présent' : 'absent',
          videoType: videoPostData.videoType,
          scheduledDate: videoPostData.scheduledDate
        });
        
        const videoPost = await Post.create(videoPostData);
        logger.info('✅ Post VIDÉO créé avec succès, ID:', videoPost._id);
        savedPosts.push(videoPost);
        
      } catch (error: any) {
        logger.error('❌ Erreur lors de la génération vidéo VEO3:', error.message);
        logger.error('Stack:', error.stack);
        logger.info('⚠️  La génération continue sans vidéo (toutes les images ont été créées)');
      }
    }

    logger.info(`\n=== Fin de la génération ===`);
    logger.info(`${savedPosts.length} posts générés au total`);
    logger.info(`Images: ${savedPosts.filter(p => p.content.mediaType === 'image').length}`);
    logger.info(`Textes: ${savedPosts.filter(p => p.content.mediaType === 'text').length}`);
    return savedPosts;
  }

  /**
   * Génère les dates de publication pour chaque réseau social
   */
  private generateScheduledDates(
    startDate: Date,
    endDate: Date,
    postsPerPlatform: Record<string, number>,
    preferredTimes: ICalendar['contentPlan']['preferredTimes'],
    frequency: ICalendar['frequency']
  ) {
    const scheduledDates: Record<string, Date[]> = {};
    
    // Calculer le nombre total de jours
    // Ajouter 1 pour inclure le jour de fin dans le calcul
    // Par exemple, du 1er mars au 2 mars = 2 jours (1er mars et 2 mars)
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)) + 1;
    
    logger.info(`Période: ${totalDays} jours (du ${startDate.toLocaleDateString()} au ${endDate.toLocaleDateString()})`);
    logger.info(`Fréquence: ${frequency}`);
    
    for (const [platform, totalPosts] of Object.entries(postsPerPlatform)) {
      const dates: Date[] = [];
      const platformTimes = preferredTimes[platform as keyof typeof preferredTimes] || ['12:00'];
      
      logger.info(`Plateforme: ${platform}, Total posts demandés: ${totalPosts}`);
      
      // FORCER LA GÉNÉRATION D'UN POST PAR JOUR POUR LES FRÉQUENCES QUOTIDIENNES
      if (frequency === 'daily' || frequency === 'twice_daily') {
        const postsPerDay = frequency === 'daily' ? 1 : 2;
        logger.info(`Fréquence ${frequency}: Génération de ${postsPerDay} post(s) par jour`);
        
        // Limiter le nombre de jours à parcourir en fonction du nombre total de posts demandés
        // Cela garantit qu'on ne génère pas plus de posts que demandé
        const daysToGenerate = Math.min(totalDays, Math.ceil(totalPosts / postsPerDay));
        
        logger.info(`Jours à générer: ${daysToGenerate} sur ${totalDays} jours disponibles`);
        
        // Parcourir chaque jour de la période
        for (let day = 0; day < daysToGenerate; day++) {
          const dayDate = new Date(startDate.getTime() + (day * 24 * 60 * 60 * 1000));
          logger.info(`Jour ${day + 1}/${daysToGenerate}: ${dayDate.toLocaleDateString()}`);
          
          // Créer le nombre approprié de posts pour ce jour
          for (let i = 0; i < postsPerDay; i++) {
            // Vérifier si on a atteint le nombre total de posts demandés
            if (dates.length >= totalPosts) {
              logger.info(`Nombre maximum de posts atteint (${totalPosts}). Arrêt de la génération.`);
              break;
            }
            
            const postDate = new Date(dayDate);
            
            // Sélectionner une heure préférée, en évitant les doublons le même jour
            let timeIndex = Math.floor(Math.random() * platformTimes.length);
            if (postsPerDay > 1 && i > 0 && platformTimes.length > 1) {
              // Éviter la même heure pour plusieurs posts le même jour
              const usedTimes = new Set();
              for (let j = 0; j < i; j++) {
                const prevDate = dates[dates.length - j - 1];
                usedTimes.add(`${prevDate.getHours()}:${prevDate.getMinutes()}`);
              }
              
              // Trouver une heure non utilisée
              let attempts = 0;
              while (attempts < platformTimes.length) {
                const time = platformTimes[timeIndex];
                if (!usedTimes.has(time)) {
                  break;
                }
                timeIndex = (timeIndex + 1) % platformTimes.length;
                attempts++;
              }
            }
            
            const randomTime = platformTimes[timeIndex];
            const [hours, minutes] = randomTime.split(':').map(Number);
            postDate.setHours(hours, minutes);
            
            dates.push(postDate);
            logger.info(`Post #${dates.length} programmé pour le ${postDate.toLocaleDateString()} à ${hours}:${minutes}`);
          }
          
          // Si on a atteint le nombre total de posts demandés, sortir de la boucle
          if (dates.length >= totalPosts) {
            break;
          }
        }
      } else {
        // Pour les autres fréquences (three_per_week, weekly), on utilise l'approche d'intervalle
        // Déterminer le nombre de posts par jour selon la fréquence
        let postsPerDay = 0;
        switch (frequency) {
          case 'three_per_week':
            postsPerDay = 3/7; // Environ 3 posts répartis sur 7 jours
            break;
          case 'weekly':
            postsPerDay = 1/7; // Environ 1 post par semaine
            break;
          default:
            postsPerDay = 1;
        }
        
        // Calculer combien de jours doivent recevoir des publications
        // Utiliser le nombre total de posts demandés directement pour déterminer le nombre de jours
        const daysWithPosts = Math.min(totalDays, Math.ceil(totalPosts));
        
        // Distribuer les jours de publication uniformément sur la période
        // Si on a plus d'un jour, calculer l'intervalle pour répartir uniformément
        const dayInterval = daysWithPosts <= 1 ? 0 : (totalDays - 1) / (daysWithPosts - 1);
        
        logger.info(`Fréquence: ${frequency}, Posts par jour: ${postsPerDay}`);
        logger.info(`Jours avec posts: ${daysWithPosts}, Intervalle entre les jours: ${dayInterval.toFixed(1)}`);
        
        let remainingPosts = totalPosts;
        let currentDay = 0;
        
        while (remainingPosts > 0 && currentDay < totalDays) {
          // Calculer la date pour ce jour
          const dayDate = new Date(startDate.getTime() + (Math.floor(currentDay) * 24 * 60 * 60 * 1000));
          
          // Déterminer combien de posts publier ce jour (toujours 1 pour ces fréquences)
          const postsThisDay = Math.min(remainingPosts, 1);
          
          // Créer les posts pour ce jour
          for (let i = 0; i < postsThisDay; i++) {
            const postDate = new Date(dayDate);
            
            // Sélectionner une heure préférée
            const randomTime = platformTimes[Math.floor(Math.random() * platformTimes.length)];
            const [hours, minutes] = randomTime.split(':').map(Number);
            postDate.setHours(hours, minutes);
            
            dates.push(postDate);
            logger.info(`Post #${dates.length} programmé pour le ${postDate.toLocaleDateString()} à ${hours}:${minutes}`);
            remainingPosts--;
          }
          
          // Avancer au prochain jour de publication selon l'intervalle calculé
          currentDay += dayInterval > 0 ? dayInterval : 1;
        }
      }
      
      logger.info(`${dates.length} dates générées pour ${platform}`);
      scheduledDates[platform] = dates;
    }

    return scheduledDates;
  }
}

export default new PostGenerationService();
