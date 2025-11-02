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
import { getLanguageName, isDialect, getDialectInfo } from '../utils/languageUtils';
import Product, { IProduct } from '../models/Product';
import KeyDateService from './KeyDateService';
import { parseGPTResponse } from '../utils/promptParser';
import { ProductIntegrationWithStabilityService } from './ProductIntegrationWithStabilityService';
import Veo3Service from './Veo3Service';
import sharp from 'sharp';

// 🔥 CONFIGURATION GÉNÉRATION VIDÉO
// Mettre à true pour générer des REELs au lieu d'images
const GENERATE_VIDEO = true;

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
   * Calcule le nombre de posts par plateforme en fonction de la fréquence
   */
  private calculatePostsPerPlatform(calendar: ICalendar) {
    const postsPerPlatform: Record<string, number> = {};
    const startDate = new Date(calendar.startDate);
    const endDate = new Date(calendar.endDate);
    
    // Calculer le nombre total de jours
    // Ajouter 1 pour inclure le jour de fin dans le calcul
    // Par exemple, du 1er mars au 2 mars = 2 jours (1er mars et 2 mars)
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)) + 1;
    
    logger.info(`Période du calendrier: ${totalDays} jours (du ${startDate.toLocaleDateString()} au ${endDate.toLocaleDateString()})`);
    
    // Calculer le nombre de posts en fonction de la fréquence et du nombre de jours
    let totalPosts: number;
    switch (calendar.frequency) {
      case 'daily':
        totalPosts = totalDays; // Un post par jour
        break;
      case 'twice_daily':
        totalPosts = totalDays * 2; // Deux posts par jour
        break;
      case 'three_per_week':
        totalPosts = Math.ceil(totalDays * (3 / 7)); // 3 posts par semaine
        break;
      case 'weekly':
        totalPosts = Math.ceil(totalDays / 7); // 1 post par semaine
        break;
      default:
        totalPosts = totalDays;
    }
    
    // S'assurer qu'il y a au moins un post
    totalPosts = Math.max(1, totalPosts);
    
    logger.info(`Fréquence: ${calendar.frequency}, Total posts calculés: ${totalPosts}`);
    
    // Obtenir la liste des plateformes sélectionnées par l'utilisateur
    const selectedPlatforms = new Set(calendar.socialMediaAccounts?.map(acc => acc.platform.toLowerCase()) || []);
    logger.info(`Plateformes sélectionnées: ${Array.from(selectedPlatforms).join(', ')}`);
    
    // Calculer le nombre total de posts pour chaque plateforme
    for (const [platform, frequency] of Object.entries(calendar.contentPlan.frequency)) {
      // Ne générer du contenu que pour les plateformes sélectionnées
      if (selectedPlatforms.has(platform.toLowerCase())) {
        // Utiliser la fréquence spécifique à la plateforme si elle est définie
        const platformFrequency = frequency || 1;
        postsPerPlatform[platform] = totalPosts * platformFrequency;
        logger.info(`Plateforme: ${platform}, Fréquence: ${platformFrequency}, Posts à générer: ${postsPerPlatform[platform]}`);
      } else {
        logger.info(`Plateforme: ${platform} ignorée (non sélectionnée par l'utilisateur)`);
      }
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
      communicationStyle: brand.tone,
      targetAudience: {
        demographic: brand.targetAudience,
        professional: [],
        behavioral: [],
        geographic: [calendar.targetCountry]
      },
      currentSocialNetworks: brand.socialMediaAccounts?.map(acc => acc.platform) || [],
      socialMediaGoals: brand.values || [],
      contentTypes: ['Photos', 'Vidéos', 'Stories'],
      uniqueSellingPoints: '',
      competitors: brand.competitors,
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
        variants: product.variants || [],
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

🌐 EXPERTISE LINGUISTIQUE:
Langues: ${calendar.targetLanguages.map(lang => getLanguageName(lang)).join(', ')}

Adaptations culturelles et dialectales:
${calendar.targetLanguages.map(lang => {
  if (isDialect(lang)) {
    const dialectInfo = getDialectInfo(lang);
    if (dialectInfo) {
      return `- ${dialectInfo.name}: ${dialectInfo.description}
  → Adapter les expressions idiomatiques et références culturelles locales
  → Utiliser le registre de langue approprié (formel/informel selon le dialecte)`;
    }
  }
  return `- ${getLanguageName(lang)}: Langue principale
  → Respecter les nuances culturelles du marché cible`;
}).filter(Boolean).join('\n')}

🎨 IDENTITÉ DE MARQUE (Brand DNA):
${brand.logo ? '✅ Logo: Intégrer subtilement dans la direction artistique' : '⚠️ Logo: Non fourni - créer une identité visuelle cohérente sans logo'}
${brand.colors?.primary ? `
🎨 PALETTE DE MARQUE (à respecter religieusement):
- Couleur Principale: ${brand.colors.primary}
- Couleur Secondaire: ${brand.colors.secondary || 'Non spécifiée'}
- Couleur Accent: ${brand.colors.accent || 'Non spécifié'}
→ Ces couleurs DOIVENT être dominantes dans le prompt d'image
` : '🎨 PALETTE: Créer une palette cohérente basée sur le secteur et le ton'}
- Ton de Marque: ${brand.tone || 'À définir selon le secteur'}
${brand.values && brand.values.length > 0 ? `- Valeurs: ${brand.values.join(', ')}` : ''}

🔍 ANALYSE CONCURRENTIELLE:
${brand.competitors && brand.competitors.length > 0 ? `
- Concurrents principaux: ${brand.competitors.join(', ')}
→ IMPÉRATIF: Se différencier radicalement par l'angle créatif, pas imiter
→ Trouver un angle mort du marché (Blue Ocean Strategy)
` : '- Analyse concurrentielle non fournie → Créer une proposition unique'}

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

🎯 PARAMÈTRES AVANCÉS:
- Thèmes: ${calendar.generationSettings?.themes?.join(', ') || 'Universaux'}
- Mots-clés: ${calendar.generationSettings?.keywords?.join(', ') || 'Contextuels'}
- Longueur: ${calendar.generationSettings?.contentLength || 'Adaptée'}
- Style image: ${calendar.generationSettings?.imageStyle || 'Authentique, aspirationnel'}
${calendar.contentPlan?.contentMix ? `
- Mix de contenu: ${Object.entries(calendar.contentPlan.contentMix).map(([type, percentage]) => `${type} ${percentage}%`).join(', ')}` : ''}

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

NIVEAU D'EXIGENCE: WORLD-CLASS CREATIVE AGENCY 🏆`
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
PRODUITS À METTRE EN AVANT :
${briefData.products.map((product, index) => `
Produit ${index + 1}: ${product.name}
- Description: ${product.description}
- Catégorie: ${product.category}
- Points forts: ${product.uniqueSellingPoints.join(', ')}
- Bénéfices client: ${product.customerBenefits.join(', ')}
${product.flavors.length > 0 ? `- Arômes: ${product.flavors.join(', ')}` : ''}
${product.scents.length > 0 ? `- Parfums: ${product.scents.join(', ')}` : ''}
${product.variants.length > 0 ? `- Variantes: ${product.variants.join(', ')}` : ''}
${product.technicalDetails.ingredients.length > 0 ? `- Ingrédients clés: ${product.technicalDetails.ingredients.join(', ')}` : ''}
${product.technicalDetails.highlights ? `- Points clés: ${product.technicalDetails.highlights}` : ''}
${product.technicalDetails.usage ? `- Utilisation: ${product.technicalDetails.usage}` : ''}
${Object.keys(product.specifications).length > 0 ? `- Spécifications: ${Object.entries(product.specifications).map(([key, value]) => `${key}: ${value}`).join(', ')}` : ''}
`).join('\n')}
            
Assurez-vous d'intégrer ces produits dans votre contenu de manière naturelle et persuasive.
` : ''}

AUDIENCE CIBLE
- Marché : ${calendar.targetCountry}
- Langues : ${calendar.targetLanguages.map(lang => {
  const dialectInfo = isDialect(lang) ? getDialectInfo(lang) : null;
  return dialectInfo ? dialectInfo.name : getLanguageName(lang);
}).join(', ')}
- Profil démographique : ${briefData.targetAudience.demographic?.join(', ') || 'Non spécifié'}
            
OBJECTIFS STRATÉGIQUES
- Objectifs business : ${briefData.socialMediaGoals.join(', ')}
- Période de campagne : du ${calendar.startDate.toLocaleDateString()} au ${calendar.endDate.toLocaleDateString()}
- KPIs prioritaires : Engagement, Conversion, Mémorisation de marque

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
        
        // Ajouter les dates clés associées au post
        const keyDatesData = relevantKeyDates.length > 0 ? 
          relevantKeyDates.map(kd => ({ 
            name: kd.name, 
            importance: kd.importance 
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
            imageUrl: '',
            imagePublicId: '',
            imagePrompt: parsedPost.imagePrompt,
            imageStyle: parsedPost.imageStyle
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
          // Ajouter les références aux produits
          products: calendar.selectedProducts || []
        };
        
          // Générer une image pour le post
          try {
            logger.info('=== Début de la génération d\'image avec Gemini ===');
            logger.info(`Génération d'image pour ${platform}`);
            logger.info(`Marque: ${brand.name}, Secteur: ${brand.sector}, Style: ${brand.tone}`);
            
            // Récupérer le prompt d'image
            const prompt = parsedPost.imagePrompt;
            logger.info('Prompt complet:', prompt);
            
            // Forcer le format 1:1 pour toutes les plateformes
            const aspect_ratio = '1:1';
            logger.info('Ratio d\'aspect:', aspect_ratio);
            
            // Préparer l'image de référence si un produit est sélectionné
            let referenceImageBase64: string | undefined;
            
            if (calendar.selectedProducts && calendar.selectedProducts.length > 0 && products.length > 0) {
              const product = products[0];
              logger.info(`Produit sélectionné: ${product.name}`);
              
              // Vérifier si le produit a une image
              if (product.images && product.images.main) {
                const productImagePath = product.images.main;
                logger.info(`Image du produit trouvée: ${productImagePath}`);
                
                try {
                  let imageBuffer: Buffer;
                  
                  // Vérifier si c'est une URL (Cloudinary ou autre)
                  if (productImagePath.startsWith('http://') || productImagePath.startsWith('https://') || productImagePath.includes('cloudinary.com')) {
                    logger.info('📥 Téléchargement de l\'image depuis l\'URL:', productImagePath);
                    
                    // Télécharger l'image depuis l'URL
                    const response = await axios.get(productImagePath, { 
                      responseType: 'arraybuffer',
                      timeout: 30000 // 30 secondes de timeout
                    });
                    imageBuffer = Buffer.from(response.data);
                    logger.info('✅ Image téléchargée depuis l\'URL avec succès');
                  } else {
                    // Chemin local - pour développement ou fallback
                    const fullPath = path.join(process.cwd(), 'public', productImagePath);
                    logger.info('📂 Lecture de l\'image depuis le chemin local:', fullPath);
                    
                    const fs = await import('fs');
                    if (!fs.existsSync(fullPath)) {
                      throw new Error(`Fichier introuvable: ${fullPath}`);
                    }
                    
                    imageBuffer = await fs.promises.readFile(fullPath);
                    logger.info('✅ Image lue depuis le système de fichiers local');
                  }
                  
                  // Transformer l'image en carré pour toutes les plateformes (format 1:1)
                  logger.info('📐 Format carré (1:1) - transformation de l\'image produit en carré');
                  const squareImageBuffer = await makeImageSquareFromBuffer(imageBuffer);
                  referenceImageBase64 = squareImageBuffer.toString('base64');
                  logger.info('✅ Image produit transformée en carré et convertie en base64');
                } catch (error: any) {
                  logger.error('❌ Erreur lors de la conversion de l\'image produit en base64:');
                  logger.error('Details:', error.message);
                  if (error.response) {
                    logger.error('HTTP Status:', error.response.status);
                    logger.error('HTTP Data:', error.response.data);
                  }
                  logger.info('Génération sans image de référence');
                }
              } else {
                logger.info('Aucune image associée au produit');
              }
            }
            
            // Générer l'image avec Gemini (avec ou sans image de référence)
            logger.info(`Génération avec Gemini${referenceImageBase64 ? ' en incluant l\'image du produit' : ' sans image de référence'}`);
            
            const geminiResults = await GeminiImageService.generateImages(
              prompt,
              {
                numberOfImages: 1,
                aspectRatio: aspect_ratio as '1:1' | '16:9',
                imageSize: '1K',
                referenceImage: referenceImageBase64
              }
            );
            
            if (geminiResults.length > 0) {
              const imageUrl = geminiResults[0].url;
              logger.info('✅ Image générée avec succès par Gemini');
              logger.info('URL de l\'image:', imageUrl);
              
              // Utiliser l'image générée directement
              postData.content.imageUrl = imageUrl;
            } else {
              logger.error('❌ Aucune image retournée par Gemini');
            }
          } catch (error: any) {
            logger.error('❌ Erreur lors de la génération de l\'image avec Gemini');
            logger.error('Message d\'erreur:', error.message);
            if (error.response) {
              logger.error('Détails de l\'erreur:', {
                status: error.response.status,
                data: error.response.data
              });
            }
          }

        // 🎬 GÉNÉRATION VIDÉO VEO3 (EN PLUS de l'image)
        if (GENERATE_VIDEO) {
          try {
            logger.info('=== Début de la génération REEL VEO3 ===');
            
            // Construire le prompt vidéo professionnel pour REEL Instagram
            const reelPrompt = `Cinematic 8-second Instagram Reel shot in the style of ${brand.name} commercial meets lifestyle storytelling,
${parsedPost.postContent},
dynamic camera movement revealing ${products.length > 0 ? products[0].name : 'product'} in authentic lifestyle context,
shot on Sony A7III with 50mm f/1.2 lens at f/2.0 for beautiful bokeh,
9:16 vertical format optimized for Instagram Reels,
professional commercial video production, 1080p quality, scroll-stopping transformation reveal

Audio cues:
Ambient: Natural environment sounds with authentic moment capture
Sound effects: Subtle product interaction sounds
Music: Upbeat inspiring audio at 120 BPM synchronized with transformation`;

            logger.info('Prompt REEL construit:', reelPrompt.substring(0, 200) + '...');
            
            // Préparer les images produits (jusqu'à 3)
            const productImageBuffers: Buffer[] = [];
            
            if (calendar.selectedProducts && calendar.selectedProducts.length > 0 && products.length > 0) {
              const productsToUse = products.slice(0, 3); // Max 3 produits
              
              for (const product of productsToUse) {
                if (product.images && product.images.main) {
                  try {
                    logger.info(`Téléchargement image produit: ${product.name}`);
                    const response = await axios.get(product.images.main, {
                      responseType: 'arraybuffer',
                      timeout: 30000
                    });
                    productImageBuffers.push(Buffer.from(response.data));
                    logger.info(`✅ Image produit ${product.name} téléchargée`);
                  } catch (error: any) {
                    logger.error(`Erreur téléchargement image ${product.name}:`, error.message);
                  }
                }
              }
            }
            
            // Générer la vidéo avec VEO3
            if (productImageBuffers.length > 0) {
              logger.info(`🎬 Génération REEL avec ${productImageBuffers.length} image(s) produit(s)`);
              
              const video = await Veo3Service.generateVideoWithReferences(
                reelPrompt,
                productImageBuffers,
                {
                  duration: 8,
                  aspectRatio: '9:16',
                  resolution: '1080p'
                }
              );
              
              logger.info('✅ REEL généré avec succès par VEO3');
              logger.info('URL vidéo:', video.videoUrl);
              
              // Ajouter les infos vidéo au postData (casting en any pour TypeScript)
              (postData as any).content.mediaType = 'video';
              (postData as any).content.videoUrl = video.videoUrl;
              (postData as any).content.videoPublicId = video.videoPublicId;
              (postData as any).content.videoPrompt = reelPrompt;
              (postData as any).content.videoDuration = video.duration;
              (postData as any).content.videoFormat = '9:16';
              (postData as any).content.videoResolution = '1080p';
              (postData as any).content.hasAudio = true;
              (postData as any).videoType = 'reel';
              
            } else {
              logger.info('⚠️  Aucune image produit disponible, génération vidéo sans référence');
              
              const video = await Veo3Service.generateVideo(reelPrompt, {
                duration: 8,
                aspectRatio: '9:16',
                resolution: '1080p'
              });
              
              logger.info('✅ REEL généré avec succès par VEO3 (sans référence produit)');
              logger.info('URL vidéo:', video.videoUrl);
              
              // Ajouter les infos vidéo au postData (casting en any pour TypeScript)
              (postData as any).content.mediaType = 'video';
              (postData as any).content.videoUrl = video.videoUrl;
              (postData as any).content.videoPublicId = video.videoPublicId;
              (postData as any).content.videoPrompt = reelPrompt;
              (postData as any).content.videoDuration = video.duration;
              (postData as any).content.videoFormat = '9:16';
              (postData as any).content.videoResolution = '1080p';
              (postData as any).content.hasAudio = true;
              (postData as any).videoType = 'reel';
            }
            
          } catch (error: any) {
            logger.error('❌ Erreur lors de la génération vidéo VEO3:', error.message);
            logger.error('Stack:', error.stack);
            // Ne pas bloquer la création du post si la vidéo échoue
            logger.info('Création du post sans vidéo (image seulement)');
          }
        }

        logger.info('Création du post dans la base de données...');
        const post = await Post.create(postData);
        logger.info('Post créé avec succès, ID:', post._id);
        savedPosts.push(post);
      }
    }

    logger.info(`\n=== Fin de la génération ===`);
    logger.info(`${savedPosts.length} posts générés au total`);
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
