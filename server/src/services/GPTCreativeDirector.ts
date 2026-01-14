import OpenAI from 'openai';
import {
  selectCreativePreset,
  PHOTOGRAPHIC_STYLES,
  CREATIVE_CONTEXTS,
  COLOR_PALETTES,
  CREATIVE_FRAMEWORKS,
  LIGHTING_SETUPS,
  preFilterStylesBySector,
  preFilterContextsByUsage,
  CreativePreset
} from './CreativePresetsLibrary';

// Lazy initialization d'OpenAI pour éviter les erreurs d'import
let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY manquante dans les variables d\'environnement');
    }
    openai = new OpenAI({ apiKey });
  }
  return openai;
}

/**
 * Interface pour les données de marque
 */
interface BrandData {
  name: string;
  sector: string;
  pricePositioning?: string;
  businessType?: string;
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  description?: string;
  values?: string[];
  targetAudience?: string;
}

/**
 * Interface pour les données de produit
 */
interface ProductData {
  name: string;
  category: string;
  description: string;
  uniqueSellingPoints?: string[];
  customerBenefits?: string[];
  usageOccasions?: string[];
  images?: {
    main?: string;
  };
}

/**
 * Interface pour les données de calendrier
 */
interface CalendarData {
  campaignObjective?: string;
  generationSettings?: {
    themes?: string[];
    countries?: string[];
    startDate?: string;
    endDate?: string;
  };
  communicationStyle?: string;
  targetAudience?: string;
}

/**
 * Interface pour le contexte du post
 */
interface PostContext {
  postIndex: number;
  totalPosts: number;
  scheduledDate?: string;
  platform?: string;
  country?: string;
  // 🎯 BRIEF CRÉATIF COMPLET CANNES LIONS
  // COHÉRENCE : Texte généré pour alignement parfait
  generatedText?: string;
  // QUALITÉ : Éléments créatifs GPT-5 pour richesse maximale
  originalImagePrompt?: string;
  hashtags?: string[];
  callToAction?: string;
  imageStyle?: string;
  audienceTargeting?: string;
  competitiveEdge?: string;
  legalCompliance?: string;
  culturalRelevance?: string;
  // CONTEXTE : Données enrichies
  keyDates?: Array<{ name: string; importance: string }>;
  selectedProducts?: Array<{ name: string; category: string; description: string }>;
  // 🆕 COUCHE 1 : STRATÉGIE VISUELLE
  visualStrategy?: {
    concept: string;
    mood: string;
    setting: string;
    lightingStyle: string;
    photographyStyle: string;
    composition: string;
    productIntegration: string;
    culturalContext: string;
    uniqueAngle: string;
    diversityScore: number;
  };
}

/**
 * Interface pour l'analyse sémantique du texte généré
 */
interface TextSemanticAnalysis {
  mainMessage: string;
  emotionalTone: string;
  visualElements: string[];
  keyThemes: string[];
  targetEmotion: string;
}

/**
 * Système anti-répétition pour améliorer la diversité des prompts
 * Instance par calendrier pour éviter les répétitions
 */
class AntiRepetitionPromptManager {
  private static instances: Map<string, AntiRepetitionPromptManager> = new Map();
  private recentPromptHashes: string[] = [];
  private recentTechniques: string[] = [];
  private recentStyles: string[] = [];
  private maxHistory = 15; // Historique des 15 derniers prompts
  private calendarId: string;

  private constructor(calendarId: string) {
    this.calendarId = calendarId;
    console.log(`[GPTCreativeDirector] 🆕 Nouvelle instance anti-répétition pour calendrier: ${calendarId}`);
  }

  static getInstance(calendarId: string): AntiRepetitionPromptManager {
    if (!AntiRepetitionPromptManager.instances.has(calendarId)) {
      AntiRepetitionPromptManager.instances.set(calendarId, new AntiRepetitionPromptManager(calendarId));
    }
    return AntiRepetitionPromptManager.instances.get(calendarId)!;
  }

  /**
   * Génère un hash simple pour un prompt
   */
  private generatePromptHash(prompt: string): string {
    // Hash simple basé sur les mots-clés principaux
    const keywords = prompt.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 4)
      .slice(0, 10)
      .sort()
      .join('');
    
    let hash = 0;
    for (let i = 0; i < keywords.length; i++) {
      const char = keywords.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  }

  /**
   * Vérifie si un prompt est trop similaire aux récents
   */
  isPromptTooSimilar(prompt: string): boolean {
    const hash = this.generatePromptHash(prompt);
    return this.recentPromptHashes.includes(hash);
  }

  /**
   * Enregistre un prompt utilisé
   */
  recordUsedPrompt(prompt: string, technique: string, style: string): void {
    const hash = this.generatePromptHash(prompt);
    
    this.recentPromptHashes.push(hash);
    this.recentTechniques.push(technique);
    this.recentStyles.push(style);

    // Maintenir la taille de l'historique
    if (this.recentPromptHashes.length > this.maxHistory) {
      this.recentPromptHashes.shift();
    }
    if (this.recentTechniques.length > this.maxHistory) {
      this.recentTechniques.shift();
    }
    if (this.recentStyles.length > this.maxHistory) {
      this.recentStyles.shift();
    }

    console.log(`[GPTCreativeDirector] 📝 Prompt enregistré - Hash: ${hash}, Historique: ${this.recentPromptHashes.length}/${this.maxHistory}`);
  }

  /**
   * Récupère l'historique pour éviter les répétitions
   */
  getAvoidanceInstructions(): string {
    if (this.recentTechniques.length === 0) {
      return "Premier post du calendrier - aucune restriction.";
    }

    const recentTechniquesStr = [...new Set(this.recentTechniques.slice(-5))].join(', ');
    const recentStylesStr = [...new Set(this.recentStyles.slice(-5))].join(', ');

    return `ÉVITER ABSOLUMENT ces éléments déjà utilisés récemment:
- Techniques récentes: ${recentTechniquesStr}
- Styles récents: ${recentStylesStr}
- Tu DOIS choisir des techniques et styles COMPLÈTEMENT DIFFÉRENTS pour garantir la diversité visuelle.`;
  }
}

/**
 * Service principal GPT Creative Director
 * Remplace complètement le système de presets fixes
 */
export class GPTCreativeDirector {
  
  /**
   * Génère un prompt d'image parfait et unique pour Gemini
   * @param brand - Données de la marque
   * @param product - Données du produit
   * @param calendar - Données du calendrier
   * @param postContext - Contexte du post (index, date, plateforme)
   * @param calendarId - ID du calendrier pour anti-répétition
   * @returns Prompt d'image optimisé pour Gemini
   */
  static async generateImagePrompt(
    brand: BrandData,
    product: ProductData,
    calendar: CalendarData,
    postContext: PostContext,
    calendarId: string = 'default'
  ): Promise<string> {
    try {
      console.log(`[GPTCreativeDirector] 🎨 Génération prompt pour ${brand.name} - ${product.name} (Post ${postContext.postIndex + 1})`);

      // 1. Récupérer le gestionnaire anti-répétition
      const antiRepetition = AntiRepetitionPromptManager.getInstance(calendarId);
      const avoidanceInstructions = antiRepetition.getAvoidanceInstructions();

      // 2. 🆕 ANALYSE SÉMANTIQUE DU TEXTE GÉNÉRÉ (Priorité 1 - Cohérence texte-image)
      const textAnalysis = this.analyzeGeneratedText(postContext.generatedText);
      console.log(`[GPTCreativeDirector] 📊 Analyse sémantique: Message="${textAnalysis.mainMessage}", Ton="${textAnalysis.emotionalTone}"`);

      // 3. Analyser le contexte temporel et géographique
      const temporalContext = this.analyzeTemporalContext(postContext.scheduledDate, postContext.postIndex);
      const geographicContext = this.analyzeGeographicContext(calendar.generationSettings?.countries);

      // 4. Construire le prompt GPT ultra-sophistiqué avec analyse textuelle
      const gptPrompt = this.buildCreativeDirectorPrompt(
        brand,
        product,
        calendar,
        postContext,
        temporalContext,
        geographicContext,
        avoidanceInstructions,
        textAnalysis
      );

      // 4. Appeler GPT pour générer le prompt d'image
      const openaiClient = getOpenAIClient();
      const completion = await openaiClient.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'Tu es un directeur artistique de niveau Cannes Lions Gold. Tu génères des prompts d\'image d\'une qualité exceptionnelle pour la génération d\'images par IA. Tes prompts sont détaillés, techniques et créatifs.'
          },
          {
            role: 'user',
            content: gptPrompt
          }
        ],
        temperature: 0.9, // Créativité maximale
        max_tokens: 1000,
        seed: Date.now() + postContext.postIndex // Seed unique pour diversité
      });

      const generatedPrompt = completion.choices[0].message.content;
      if (!generatedPrompt) {
        throw new Error('GPT n\'a pas généré de prompt');
      }

      // 5. Extraire les métadonnées du prompt généré (technique, style)
      const technique = this.extractTechnique(generatedPrompt);
      const style = this.extractStyle(generatedPrompt);

      // 6. Vérifier la similarité et régénérer si nécessaire
      if (antiRepetition.isPromptTooSimilar(generatedPrompt)) {
        console.log(`[GPTCreativeDirector] ⚠️ Prompt trop similaire détecté, régénération...`);
        
        // Régénérer avec plus de contraintes d'évitement
        const regeneratedPrompt = await this.regenerateWithMoreDiversity(
          gptPrompt,
          avoidanceInstructions,
          postContext.postIndex
        );
        
        // Enregistrer le prompt régénéré
        antiRepetition.recordUsedPrompt(regeneratedPrompt, technique, style);
        
        console.log(`[GPTCreativeDirector] ✅ Prompt régénéré avec succès`);
        return regeneratedPrompt;
      }

      // 7. Enregistrer le prompt dans l'historique
      antiRepetition.recordUsedPrompt(generatedPrompt, technique, style);

      console.log(`[GPTCreativeDirector] ✅ Prompt généré avec succès - Technique: ${technique}, Style: ${style}`);
      return generatedPrompt;

    } catch (error) {
      console.error('[GPTCreativeDirector] Erreur lors de la génération du prompt:', error);
      
      // Fallback : générer un prompt basique mais fonctionnel
      return this.generateFallbackPrompt(brand, product, postContext);
    }
  }

  /**
   * 🆕 ANALYSE SÉMANTIQUE DU TEXTE GÉNÉRÉ
   * Extrait le message principal, le ton émotionnel et les éléments visuels suggérés
   */
  private static analyzeGeneratedText(generatedText?: string): TextSemanticAnalysis {
    if (!generatedText) {
      return {
        mainMessage: 'Non spécifié',
        emotionalTone: 'Neutre',
        visualElements: [],
        keyThemes: [],
        targetEmotion: 'Engagement'
      };
    }

    // Extraction du message principal (première phrase ou hook)
    const sentences = generatedText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const mainMessage = sentences[0]?.trim() || 'Non spécifié';

    // Analyse du ton émotionnel (mots-clés émotionnels)
    const emotionalKeywords = {
      joyeux: ['joie', 'heureux', 'bonheur', 'sourire', 'célébr', 'fête', 'plaisir'],
      inspirant: ['inspir', 'motiv', 'rêve', 'ambition', 'réussi', 'transform'],
      nostalgique: ['souvenir', 'mémoire', 'autrefois', 'tradition', 'héritage'],
      urgent: ['maintenant', 'aujourd\'hui', 'vite', 'urgent', 'limité', 'dernière chance'],
      serein: ['calme', 'paisible', 'sérénité', 'douceur', 'tranquille', 'zen'],
      dynamique: ['énergie', 'action', 'mouvement', 'dynamique', 'vivant', 'intense'],
      luxueux: ['luxe', 'premium', 'élégant', 'raffiné', 'exclusif', 'prestige'],
      authentique: ['authentique', 'vrai', 'naturel', 'sincère', 'genuine', 'réel']
    };

    let emotionalTone = 'Neutre';
    const textLower = generatedText.toLowerCase();
    for (const [tone, keywords] of Object.entries(emotionalKeywords)) {
      if (keywords.some(keyword => textLower.includes(keyword))) {
        emotionalTone = tone.charAt(0).toUpperCase() + tone.slice(1);
        break;
      }
    }

    // Extraction des éléments visuels suggérés
    const visualKeywords = [
      'couleur', 'lumière', 'ombre', 'texture', 'forme', 'ligne',
      'main', 'visage', 'sourire', 'regard', 'geste',
      'nature', 'ville', 'intérieur', 'extérieur',
      'matin', 'soir', 'nuit', 'jour',
      'table', 'cuisine', 'salon', 'bureau'
    ];
    const visualElements = visualKeywords.filter(keyword => textLower.includes(keyword));

    // Extraction des thèmes clés
    const themeKeywords = {
      famille: ['famille', 'enfant', 'parent', 'ensemble'],
      travail: ['travail', 'bureau', 'professionnel', 'carrière'],
      bienêtre: ['bien-être', 'santé', 'forme', 'équilibre'],
      lifestyle: ['lifestyle', 'vie', 'quotidien', 'routine'],
      innovation: ['innovation', 'nouveau', 'moderne', 'technologie'],
      tradition: ['tradition', 'héritage', 'classique', 'authentique']
    };

    const keyThemes: string[] = [];
    for (const [theme, keywords] of Object.entries(themeKeywords)) {
      if (keywords.some(keyword => textLower.includes(keyword))) {
        keyThemes.push(theme);
      }
    }

    // Déterminer l'émotion cible
    const targetEmotion = emotionalTone !== 'Neutre' ? emotionalTone : 'Engagement';

    return {
      mainMessage,
      emotionalTone,
      visualElements,
      keyThemes,
      targetEmotion
    };
  }

  /**
   * Construit le prompt GPT ultra-sophistiqué pour le directeur artistique
   * 🎯 UTILISE MAINTENANT LA BIBLIOTHÈQUE DE PRESETS CANNES LIONS
   * 🆕 INTÈGRE L'ANALYSE SÉMANTIQUE DU TEXTE POUR COHÉRENCE MAXIMALE
   */
  private static buildCreativeDirectorPrompt(
    brand: BrandData,
    product: ProductData,
    calendar: CalendarData,
    postContext: PostContext,
    temporalContext: string,
    geographicContext: string,
    avoidanceInstructions: string,
    textAnalysis: TextSemanticAnalysis
  ): string {
    // 🎯 SÉLECTION AUTOMATIQUE D'UN PRESET UNIQUE VIA GlobalStyleTracker
    const selectedPreset = selectCreativePreset(
      postContext.postIndex,
      postContext.totalPosts,
      brand.sector,
      product.usageOccasions,
      postContext.platform || 'default'
    );

    console.log(`[GPTCreativeDirector] 🎨 Preset sélectionné: Style="${selectedPreset.style.name}", Contexte="${selectedPreset.context.name}", Palette="${selectedPreset.palette.name}"`);

    // 🎯 CONSTRUIRE LA SECTION PRESET POUR GPT
    const presetSection = `
═══════════════════════════════════════════════════════════════
🎨 PRESET CRÉATIF CANNES LIONS SÉLECTIONNÉ (OBLIGATOIRE):
═══════════════════════════════════════════════════════════════

📸 STYLE PHOTOGRAPHIQUE IMPOSÉ:
Nom: ${selectedPreset.style.name}
Catégorie: ${selectedPreset.style.category}
Référence: ${selectedPreset.style.reference}
Éclairage: ${selectedPreset.style.lighting}
Composition: ${selectedPreset.style.composition}
Mood: ${selectedPreset.style.mood}
Specs techniques: ${selectedPreset.style.technicalSpecs}

🌍 CONTEXTE VISUEL IMPOSÉ:
Nom: ${selectedPreset.context.name}
Description: ${selectedPreset.context.description}

🎨 PALETTE DE COULEURS IMPOSÉE:
Nom: ${selectedPreset.palette.name}
Description: ${selectedPreset.palette.description}
Application: ${selectedPreset.palette.application}
Intégration marque: ${selectedPreset.palette.brandIntegration}%

🧠 FRAMEWORK CRÉATIF IMPOSÉ:
Nom: ${selectedPreset.framework.name}
Structure: ${selectedPreset.framework.structure}
Application: ${selectedPreset.framework.application}

💡 ÉCLAIRAGE IMPOSÉ:
Nom: ${selectedPreset.lighting.name}
Moment: ${selectedPreset.lighting.timeOfDay}
Caractéristiques: ${selectedPreset.lighting.characteristics}
Mood: ${selectedPreset.lighting.mood}

⚠️ IMPÉRATIF ABSOLU: Tu DOIS utiliser EXACTEMENT ce preset dans ton prompt.
Ne pas inventer d'autres styles ou contextes. Ce preset a été sélectionné
par le système anti-répétition global pour garantir la diversité maximale.
═══════════════════════════════════════════════════════════════
`;

    // 🆕 SECTION ANALYSE SÉMANTIQUE DU TEXTE (Priorité 1 - Cohérence)
    const textAnalysisSection = `
═══════════════════════════════════════════════════════════════
📝 ANALYSE SÉMANTIQUE DU TEXTE GÉNÉRÉ (COHÉRENCE OBLIGATOIRE):
═══════════════════════════════════════════════════════════════

MESSAGE PRINCIPAL DU TEXTE:
"${textAnalysis.mainMessage}"

TON ÉMOTIONNEL DÉTECTÉ:
${textAnalysis.emotionalTone}

ÉLÉMENTS VISUELS SUGGÉRÉS PAR LE TEXTE:
${textAnalysis.visualElements.length > 0 ? textAnalysis.visualElements.join(', ') : 'Aucun élément visuel spécifique'}

THÈMES CLÉS IDENTIFIÉS:
${textAnalysis.keyThemes.length > 0 ? textAnalysis.keyThemes.join(', ') : 'Thèmes généraux'}

ÉMOTION CIBLE À ÉVOQUER:
${textAnalysis.targetEmotion}

⚠️ IMPÉRATIF CRITIQUE - COHÉRENCE TEXTE-IMAGE:
L'image DOIT refléter EXACTEMENT le message et le ton du texte généré.
- Si le texte parle de "matin", l'image doit montrer une ambiance matinale
- Si le texte évoque la "famille", l'image doit suggérer un contexte familial
- Si le texte utilise un ton "joyeux", l'image doit être lumineuse et positive
- Si le texte mentionne des éléments visuels, ils DOIVENT apparaître dans l'image

🎯 OBJECTIF: Créer une SYNERGIE PARFAITE entre texte et image pour maximiser
l'impact émotionnel et la mémorabilité (critère Cannes Lions Gold).
═══════════════════════════════════════════════════════════════
`;

    // 🆕 SECTION STRATÉGIE VISUELLE (COUCHE 1 - Priorité absolue)
    const visualStrategySection = postContext.visualStrategy ? `
═══════════════════════════════════════════════════════════════
🎨 STRATÉGIE VISUELLE COUCHE 1 (PRIORITÉ ABSOLUE):
═══════════════════════════════════════════════════════════════

CONCEPT CRÉATIF IMPOSÉ:
"${postContext.visualStrategy.concept}"

MOOD ÉMOTIONNEL IMPOSÉ:
"${postContext.visualStrategy.mood}"

SETTING OBLIGATOIRE:
"${postContext.visualStrategy.setting}"

STYLE PHOTOGRAPHIQUE IMPOSÉ:
"${postContext.visualStrategy.photographyStyle}"

ÉCLAIRAGE IMPOSÉ:
"${postContext.visualStrategy.lightingStyle}"

COMPOSITION IMPOSÉE:
"${postContext.visualStrategy.composition}"

INTÉGRATION PRODUIT:
"${postContext.visualStrategy.productIntegration}"

CONTEXTE CULTUREL:
"${postContext.visualStrategy.culturalContext}"

ANGLE UNIQUE:
"${postContext.visualStrategy.uniqueAngle}"

SCORE DIVERSITÉ: ${postContext.visualStrategy.diversityScore}/100

⚠️ IMPÉRATIF CRITIQUE - COUCHE 1 PRIORITAIRE:
Cette stratégie visuelle a été générée par le VisualStrategistService pour garantir
la diversité créative et éviter les répétitions. Tu DOIS l'utiliser comme base
OBLIGATOIRE pour ton prompt d'image. Cette stratégie remplace et surpasse
tous les autres presets ou suggestions.

🎯 MISSION: Traduire cette stratégie visuelle en prompt technique détaillé
tout en maintenant la cohérence avec le texte généré.
═══════════════════════════════════════════════════════════════
` : '';

    return `Tu es un directeur artistique de niveau Cannes Lions Gold. Ta mission est de créer un prompt d'image PARFAIT et UNIQUE pour générer une image publicitaire exceptionnelle.

${visualStrategySection}

${presetSection}

${textAnalysisSection}

🎯 CONTEXTE DE LA MARQUE:
Nom: ${brand.name}
Secteur: ${brand.sector}
Positionnement: ${brand.pricePositioning || 'Non spécifié'}
Couleurs de marque: ${brand.colors?.primary || 'Non spécifié'} ${brand.colors?.secondary ? `/ ${brand.colors.secondary}` : ''}
Valeurs: ${brand.values?.join(', ') || 'Non spécifié'}
Audience cible: ${brand.targetAudience || calendar.targetAudience || 'Non spécifié'}

🛍️ CONTEXTE DU PRODUIT ENRICHI:
Nom: ${product.name}
Catégorie: ${product.category}
Description: ${product.description}
Points forts: ${product.uniqueSellingPoints?.join(', ') || 'Non spécifié'}
Bénéfices clients: ${product.customerBenefits?.join(', ') || 'Non spécifié'}
Occasions d'usage: ${product.usageOccasions?.join(', ') || 'Non spécifié'}

${(product as any).flavors && (product as any).flavors.length > 0 ? `
🍃 PROFIL SENSORIEL (à évoquer visuellement):
Arômes: ${(product as any).flavors.join(', ')}
→ IMPÉRATIF: Créer une ambiance visuelle qui ÉVOQUE ces arômes
→ Utiliser des éléments visuels, couleurs et compositions qui suggèrent ces saveurs
` : ''}

${(product as any).scents && (product as any).scents.length > 0 ? `
🌸 PARFUMS (à suggérer visuellement):
${(product as any).scents.join(', ')}
→ IMPÉRATIF: Utiliser des éléments visuels qui ÉVOQUENT ces senteurs
→ Créer une atmosphère olfactive par l'image (fleurs, nature, fraîcheur, etc.)
` : ''}

${(product as any).technicalDetails?.ingredients && (product as any).technicalDetails.ingredients.length > 0 ? `
🌿 INGRÉDIENTS PREMIUM À METTRE EN SCÈNE:
${(product as any).technicalDetails.ingredients.slice(0, 3).join(', ')}
→ IMPÉRATIF: Intégrer visuellement ces ingrédients dans la composition
→ Montrer la qualité et l'authenticité des ingrédients (raw, naturel, premium)
` : ''}

${(product as any).certifications && (product as any).certifications.length > 0 ? `
🏆 CERTIFICATIONS À INTÉGRER SUBTILEMENT:
${(product as any).certifications.join(', ')}
→ Inclure discrètement les badges/logos de certification dans l'image
→ Renforcer la crédibilité sans surcharger visuellement
` : ''}

${(product as any).labels && (product as any).labels.length > 0 ? `
✓ LABELS QUALITÉ À VALORISER:
${(product as any).labels.join(', ')}
→ Intégrer ces labels comme éléments de réassurance visuelle
` : ''}

${(product as any).technicalDetails?.usage ? `
📖 CONTEXTE D'UTILISATION:
${(product as any).technicalDetails.usage}
→ Créer des scénarios visuels AUTHENTIQUES montrant le produit en usage réel
` : ''}

${postContext.selectedProducts && postContext.selectedProducts.length > 0 ? `
🎯 PRODUITS SÉLECTIONNÉS POUR CE POST:
${postContext.selectedProducts.map(p => `- ${p.name} (${p.category}): ${p.description}`).join('\n')}

⚠️ IMPÉRATIF CRITIQUE: L'image DOIT montrer UNIQUEMENT ces produits sélectionnés.
Ne pas inclure d'autres produits dans l'image. La cohérence texte-image est OBLIGATOIRE.
` : ''}

📅 CONTEXTE CAMPAGNE:
Objectif: ${calendar.campaignObjective || 'Non spécifié'}
Thématiques: ${calendar.generationSettings?.themes?.join(', ') || 'Non spécifié'}
Style communication: ${calendar.communicationStyle || 'Non spécifié'}

🌍 CONTEXTE GÉOGRAPHIQUE ET TEMPOREL:
${geographicContext}
${temporalContext}

📊 CONTEXTE DU POST:
Post numéro: ${postContext.postIndex + 1} sur ${postContext.totalPosts}
Plateforme: ${postContext.platform || 'Social Media'}
Date prévue: ${postContext.scheduledDate || 'Non spécifiée'}

🚫 CONTRAINTES ANTI-RÉPÉTITION:
${avoidanceInstructions}

═══════════════════════════════════════════════════════════════

🎨 TECHNIQUES PHOTOGRAPHIQUES DISPONIBLES (utilise-les comme inspiration):
- Macro photography (détails extrêmes)
- Tilt-shift (effet miniature)
- Double exposition (fusion créative)
- Light painting (peinture lumineuse)
- High-speed photography (action figée)
- Infrared photography (spectre invisible)
- Underwater photography (immersion aquatique)
- Aerial/drone photography (perspective aérienne)
- Long exposure (mouvement fluide)
- Focus stacking (netteté parfaite)
- HDR (gamme dynamique étendue)
- Bokeh artistique (flou créatif)
- Contre-jour dramatique
- Éclairage cinématographique
- Photographie de rue authentique
- Portrait environnemental
- Nature morte conceptuelle
- Architecture géométrique
- Texture et matières
- Jeu d'ombres et lumières

🏆 RÉFÉRENCES CANNES LIONS (inspire-toi sans copier):
- Campagnes primées pour l'innovation visuelle
- Storytelling émotionnel puissant
- Techniques photographiques révolutionnaires
- Intégration produit naturelle et créative
- Impact visuel mémorable
- Pertinence culturelle et sociale
- Excellence technique et artistique

═══════════════════════════════════════════════════════════════

⚠️ MISSION: Génère un prompt d'image PARFAIT qui:

1. 🎯 INTÈGRE NATURELLEMENT le produit dans une scène créative
2. 🎨 UTILISE une technique photographique innovante et appropriée
3. 🌈 INCORPORE harmonieusement les couleurs de marque (${brand.colors?.primary || 'couleurs appropriées'})
4. 🏆 ATTEINT un niveau de qualité Cannes Lions Gold
5. 🔄 EST COMPLÈTEMENT DIFFÉRENT des prompts précédents
6. 🌍 RESPECTE le contexte géographique et culturel
7. 📅 S'ADAPTE au contexte temporel (saison, événements)
8. 💡 RACONTE une histoire visuelle captivante
9. 🎭 ÉVOQUE l'émotion appropriée au secteur et au produit
10. 📱 EST OPTIMISÉ pour les réseaux sociaux (impact visuel fort)
11. 🆕 REFLÈTE PARFAITEMENT le message et le ton du texte généré (cohérence texte-image)
12. 🆕 ÉVOQUE l'émotion cible "${textAnalysis.targetEmotion}" de manière visuelle
13. 🆕 INTÈGRE les éléments visuels suggérés par le texte: ${textAnalysis.visualElements.join(', ') || 'éléments contextuels appropriés'}
14. 🚫 NE CONTIENT ABSOLUMENT AUCUN TEXTE, lettres, mots, typographie, slogans, titres ou éléments écrits dans l'image - pure imagerie visuelle uniquement

FORMAT DE RÉPONSE:
Génère UNIQUEMENT le prompt d'image final, détaillé et technique, prêt à être envoyé à Gemini.
Le prompt doit faire 200-400 mots et inclure:
- Description de la scène principale (EN COHÉRENCE avec le texte: "${textAnalysis.mainMessage}")
- Technique photographique utilisée
- Spécifications techniques (objectif, ouverture, etc.)
- Éclairage et ambiance (reflétant le ton "${textAnalysis.emotionalTone}")
- Palette de couleurs avec intégration marque
- Composition et cadrage
- Mood et émotion recherchés (émotion cible: "${textAnalysis.targetEmotion}")
- Références stylistiques
- 🆕 Éléments visuels du texte intégrés: ${textAnalysis.visualElements.join(', ') || 'contexte approprié'}
- 🚫 IMPÉRATIF ABSOLU: Aucun texte, lettres, mots, typographie, slogans ou éléments écrits dans l'image - pure imagerie visuelle uniquement. Le texte sera ajouté séparément en post-production.

⚠️ RAPPEL CRITIQUE: L'image doit être la traduction visuelle PARFAITE du texte généré.
Quelqu'un qui lit le texte puis voit l'image doit ressentir une COHÉRENCE TOTALE.

IMPORTANT: Réponds UNIQUEMENT avec le prompt d'image, sans texte additionnel.`;
  }

  /**
   * Analyse le contexte temporel avec équilibre saisonnier intelligent (80/20)
   * 80% des posts sont intemporels, 20% intègrent subtilement la saison
   */
  private static analyzeTemporalContext(scheduledDate?: string, postIndex: number = 0): string {
    if (!scheduledDate) {
      return "Contexte temporel: Focus intemporel sur le produit et la marque, sans référence saisonnière.";
    }

    // 🎯 ALGORITHME D'ÉQUILIBRE SAISONNIER 80/20
    // Utiliser l'index du post pour déterminer si on inclut la saison
    const shouldIncludeSeason = this.shouldIncludeSeasonalContext(postIndex);
    
    if (!shouldIncludeSeason) {
      return "Contexte temporel: Focus INTEMPOREL ABSOLU sur le produit et la marque. INTERDICTION STRICTE de toute référence saisonnière (pas de neige, feuilles d'automne, fleurs de printemps, soleil d'été, etc.). Privilégier un style universel, moderne et applicable toute l'année.";
    }

    const date = new Date(scheduledDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Déterminer la saison
    let season = '';
    if (month >= 3 && month <= 5) season = 'Printemps';
    else if (month >= 6 && month <= 8) season = 'Été';
    else if (month >= 9 && month <= 11) season = 'Automne';
    else season = 'Hiver';

    // Événements spéciaux (seulement pour les posts saisonniers)
    const events = [];
    if (month === 12 && day >= 20) events.push('Fêtes de fin d\'année');
    if (month === 1 && day <= 7) events.push('Nouvelle année');
    if (month === 2 && day === 14) events.push('Saint-Valentin');
    if (month === 3 && day >= 20) events.push('Équinoxe de printemps');
    if (month === 5 && day >= 1 && day <= 31) events.push('Fête du travail/Mai');
    if (month === 6 && day >= 20) events.push('Solstice d\'été');
    if (month === 9 && day >= 20) events.push('Rentrée scolaire');
    if (month === 10 && day === 31) events.push('Halloween');
    if (month === 11 && day >= 20) events.push('Black Friday/Thanksgiving');

    // 🎨 INTENSITÉ SAISONNIÈRE VARIABLE
    const seasonalIntensity = this.getSeasonalIntensity(postIndex);
    
    let context = '';
    if (seasonalIntensity === 'subtle') {
      context = `Contexte temporel: Intégrer SUBTILEMENT des touches de ${season.toLowerCase()}`;
      if (events.length > 0) {
        context += ` et l'esprit ${events[0]}`;
      }
      context += '. Le produit reste le focus principal, la saison n\'est qu\'un accent discret en arrière-plan.';
    } else {
      context = `Contexte temporel: ${season}`;
      if (events.length > 0) {
        context += `, période de ${events.join(' et ')}`;
      }
      context += '. Adapter l\'ambiance, les couleurs et l\'éclairage à cette période tout en gardant le produit comme élément central.';
    }

    return context;
  }

  /**
   * Détermine si ce post doit inclure un contexte saisonnier (algorithme 80/20)
   */
  private static shouldIncludeSeasonalContext(postIndex: number): boolean {
    // Algorithme basé sur l'index du post pour créer un pattern 80/20
    // Posts 0,1,2,3,5,6,7,8 = intemporels (80%)
    // Posts 4,9 = saisonniers (20%)
    const seasonalPattern = [false, false, false, false, true, false, false, false, false, true];
    return seasonalPattern[postIndex % seasonalPattern.length];
  }

  /**
   * Détermine l'intensité saisonnière (subtile ou marquée)
   */
  private static getSeasonalIntensity(postIndex: number): 'subtle' | 'marked' {
    // Alternance entre intensité subtile et marquée pour les posts saisonniers
    // 60% subtile, 40% marquée
    const intensityPattern: ('subtle' | 'marked')[] = ['subtle', 'subtle', 'marked', 'subtle', 'subtle'];
    return intensityPattern[postIndex % intensityPattern.length];
  }

  /**
   * Analyse le contexte géographique
   */
  private static analyzeGeographicContext(countries?: string[]): string {
    if (!countries || countries.length === 0) {
      return "Contexte géographique: International, éviter les références culturelles trop spécifiques.";
    }

    const countryContexts: Record<string, string> = {
      'france': 'Culture française, élégance parisienne, art de vivre, gastronomie',
      'maroc': 'Culture marocaine, architecture traditionnelle, couleurs chaudes, artisanat',
      'algerie': 'Culture algérienne, méditerranéenne, couleurs du désert et de la mer',
      'tunisie': 'Culture tunisienne, méditerranéenne, traditions berbères et arabes',
      'canada': 'Culture canadienne, nature sauvage, multiculturalisme, modernité',
      'usa': 'Culture américaine, dynamisme, innovation, diversité',
      'uk': 'Culture britannique, tradition et modernité, élégance sobre',
      'germany': 'Culture allemande, précision, qualité, innovation technique',
      'spain': 'Culture espagnole, chaleur méditerranéenne, art de vivre',
      'italy': 'Culture italienne, art, gastronomie, élégance naturelle'
    };

    const contexts = countries.map(country => 
      countryContexts[country.toLowerCase()] || `Culture ${country}`
    );

    return `Contexte géographique: ${contexts.join(' + ')}. Intégrer subtilement des éléments culturels appropriés sans stéréotypes.`;
  }

  /**
   * Extrait la technique photographique du prompt généré
   */
  private static extractTechnique(prompt: string): string {
    const techniques = [
      'macro', 'tilt-shift', 'double exposition', 'light painting', 'high-speed',
      'infrared', 'underwater', 'aerial', 'drone', 'long exposure', 'focus stacking',
      'HDR', 'bokeh', 'contre-jour', 'cinématographique', 'street', 'portrait',
      'nature morte', 'architecture', 'texture'
    ];

    for (const technique of techniques) {
      if (prompt.toLowerCase().includes(technique.toLowerCase())) {
        return technique;
      }
    }

    return 'technique standard';
  }

  /**
   * Extrait le style du prompt généré
   */
  private static extractStyle(prompt: string): string {
    const styles = [
      'minimaliste', 'dramatique', 'naturel', 'artistique', 'commercial',
      'lifestyle', 'luxury', 'vintage', 'moderne', 'créatif', 'documentaire',
      'fashion', 'food', 'beauty', 'conceptuel'
    ];

    for (const style of styles) {
      if (prompt.toLowerCase().includes(style.toLowerCase())) {
        return style;
      }
    }

    return 'style standard';
  }

  /**
   * Régénère un prompt avec plus de diversité
   */
  private static async regenerateWithMoreDiversity(
    originalGptPrompt: string,
    avoidanceInstructions: string,
    postIndex: number
  ): Promise<string> {
    const enhancedPrompt = originalGptPrompt + `

🔄 RÉGÉNÉRATION FORCÉE:
Le prompt précédent était trop similaire aux récents. Tu DOIS maintenant:
1. Choisir une technique photographique RADICALEMENT différente
2. Utiliser un style visuel COMPLÈTEMENT nouveau
3. Changer l'angle de vue et la composition
4. Modifier l'éclairage et l'ambiance
5. Créer quelque chose de TOTALEMENT UNIQUE

${avoidanceInstructions}

IMPÉRATIF: Le nouveau prompt doit être à 100% différent des précédents !`;

    const openaiClient = getOpenAIClient();
    const completion = await openaiClient.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Tu es un directeur artistique expert. Tu dois créer un prompt complètement différent et unique.'
        },
        {
          role: 'user',
          content: enhancedPrompt
        }
      ],
      temperature: 1.0, // Créativité maximale pour la régénération
      max_tokens: 1000,
      seed: Date.now() + postIndex + 999 // Seed différent pour garantir la diversité
    });

    return completion.choices[0].message.content || this.generateFallbackPrompt({} as any, {} as any, { postIndex } as any);
  }

  /**
   * Génère un prompt de fallback en cas d'erreur
   */
  private static generateFallbackPrompt(
    brand: BrandData,
    product: ProductData,
    postContext: PostContext
  ): string {
    const techniques = [
      'macro photography with extreme detail',
      'cinematic lighting with dramatic shadows',
      'natural lifestyle photography',
      'minimalist composition with negative space',
      'vibrant color photography with high contrast'
    ];

    const randomTechnique = techniques[postContext.postIndex % techniques.length];

    return `Create a professional ${randomTechnique} of ${product.name} for ${brand.name}. 
The image should feature high-quality commercial photography with perfect lighting, 
sharp focus, and appealing composition. Style: modern and clean with brand colors integration. 
Shot with professional camera, 85mm lens, f/2.8, perfect exposure. 
Background: clean and uncluttered to highlight the product. 
Mood: premium and aspirational, suitable for social media marketing.`;
  }

  /**
   * Méthode utilitaire pour tester la génération de prompts
   */
  static async testPromptGeneration(
    brandName: string = 'Test Brand',
    productName: string = 'Test Product',
    calendarId: string = 'test-calendar'
  ): Promise<string> {
    const mockBrand: BrandData = {
      name: brandName,
      sector: 'food',
      colors: { primary: '#FF6B35' }
    };

    const mockProduct: ProductData = {
      name: productName,
      category: 'beverage',
      description: 'Produit de test pour validation'
    };

    const mockCalendar: CalendarData = {
      campaignObjective: 'Test campaign'
    };

    const mockContext: PostContext = {
      postIndex: 0,
      totalPosts: 10
    };

    return await this.generateImagePrompt(
      mockBrand,
      mockProduct,
      mockCalendar,
      mockContext,
      calendarId
    );
  }
}
