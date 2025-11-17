import OpenAI from 'openai';

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
 * Interface pour le contexte de la vidéo
 */
interface VideoContext {
  postIndex: number;
  totalPosts: number;
  scheduledDate?: string;
  platform?: string;
  country?: string;
  videoType?: 'text-to-video' | 'image-to-video' | 'product-showcase' | 'lifestyle';
  duration?: 4 | 6 | 8;
  aspectRatio?: '16:9' | '9:16';
}

/**
 * Système anti-répétition spécialisé pour les scripts vidéo
 * Maintient un historique des concepts narratifs, angles créatifs et techniques cinématographiques
 */
class VideoAntiRepetitionManager {
  private static instances: Map<string, VideoAntiRepetitionManager> = new Map();
  private recentNarratives: string[] = [];
  private recentAngles: string[] = [];
  private recentTechniques: string[] = [];
  private recentConcepts: string[] = [];
  private maxHistory = 20; // Historique plus large pour les vidéos
  private calendarId: string;

  private constructor(calendarId: string) {
    this.calendarId = calendarId;
    console.log(`[GPTVideoCreativeDirector] 🆕 Nouvelle instance anti-répétition vidéo pour calendrier: ${calendarId}`);
  }

  static getInstance(calendarId: string): VideoAntiRepetitionManager {
    if (!VideoAntiRepetitionManager.instances.has(calendarId)) {
      VideoAntiRepetitionManager.instances.set(calendarId, new VideoAntiRepetitionManager(calendarId));
    }
    return VideoAntiRepetitionManager.instances.get(calendarId)!;
  }

  /**
   * Génère un hash pour un script vidéo
   */
  private generateScriptHash(script: string): string {
    const keywords = script.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3)
      .slice(0, 15)
      .sort()
      .join('');
    
    let hash = 0;
    for (let i = 0; i < keywords.length; i++) {
      const char = keywords.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }

  /**
   * Vérifie si un script est trop similaire aux récents
   */
  isScriptTooSimilar(script: string): boolean {
    const hash = this.generateScriptHash(script);
    return this.recentNarratives.some(recentHash => recentHash === hash);
  }

  /**
   * Enregistre un script utilisé avec ses métadonnées
   */
  recordUsedScript(script: string, angle: string, technique: string, concept: string): void {
    const hash = this.generateScriptHash(script);
    
    this.recentNarratives.push(hash);
    this.recentAngles.push(angle);
    this.recentTechniques.push(technique);
    this.recentConcepts.push(concept);

    // Maintenir la taille de l'historique
    if (this.recentNarratives.length > this.maxHistory) {
      this.recentNarratives.shift();
      this.recentAngles.shift();
      this.recentTechniques.shift();
      this.recentConcepts.shift();
    }

    console.log(`[GPTVideoCreativeDirector] 📝 Script enregistré - Angle: ${angle}, Technique: ${technique}`);
  }

  /**
   * Récupère les instructions d'évitement pour la diversité
   */
  getAvoidanceInstructions(): string {
    if (this.recentAngles.length === 0) {
      return "Première vidéo du calendrier - aucune restriction créative.";
    }

    const recentAnglesStr = [...new Set(this.recentAngles.slice(-7))].join(', ');
    const recentTechniquesStr = [...new Set(this.recentTechniques.slice(-7))].join(', ');
    const recentConceptsStr = [...new Set(this.recentConcepts.slice(-7))].join(', ');

    return `ÉVITER ABSOLUMENT ces éléments déjà utilisés récemment:
- Angles créatifs récents: ${recentAnglesStr}
- Techniques cinématographiques récentes: ${recentTechniquesStr}
- Concepts narratifs récents: ${recentConceptsStr}
- Tu DOIS choisir des approches COMPLÈTEMENT DIFFÉRENTES pour garantir la diversité narrative et visuelle.`;
  }

  /**
   * Obtient les statistiques d'usage
   */
  getUsageStats(): { narratives: number; angles: number; techniques: number; concepts: number } {
    return {
      narratives: this.recentNarratives.length,
      angles: [...new Set(this.recentAngles)].length,
      techniques: [...new Set(this.recentTechniques)].length,
      concepts: [...new Set(this.recentConcepts)].length
    };
  }
}

/**
 * GPT Video Creative Director - Service principal
 * Génère des scripts vidéo uniques et adaptés avec intelligence créative
 */
export class GPTVideoCreativeDirector {
  
  /**
   * Génère un script vidéo parfait et unique pour VEO
   * @param brand - Données de la marque
   * @param product - Données du produit
   * @param calendar - Données du calendrier
   * @param videoContext - Contexte de la vidéo
   * @param calendarId - ID du calendrier pour anti-répétition
   * @returns Script vidéo optimisé pour VEO
   */
  static async generateVideoScript(
    brand: BrandData,
    product: ProductData,
    calendar: CalendarData,
    videoContext: VideoContext,
    calendarId: string = 'default'
  ): Promise<string> {
    try {
      console.log(`[GPTVideoCreativeDirector] 🎬 Génération script vidéo pour ${brand.name} - ${product.name} (Vidéo ${videoContext.postIndex + 1})`);

      // 1. Récupérer le gestionnaire anti-répétition
      const antiRepetition = VideoAntiRepetitionManager.getInstance(calendarId);
      const avoidanceInstructions = antiRepetition.getAvoidanceInstructions();

      // 2. Analyser le contexte temporel et géographique
      const temporalContext = this.analyzeTemporalContext(videoContext.scheduledDate, videoContext.postIndex);
      const geographicContext = this.analyzeGeographicContext(calendar.generationSettings?.countries);

      // 3. Construire le prompt GPT ultra-sophistiqué pour vidéo
      const gptPrompt = this.buildVideoCreativeDirectorPrompt(
        brand,
        product,
        calendar,
        videoContext,
        temporalContext,
        geographicContext,
        avoidanceInstructions
      );

      // 4. Appeler GPT pour générer le script vidéo
      const openaiClient = getOpenAIClient();
      const completion = await openaiClient.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'Tu es un directeur créatif vidéo de niveau Cannes Lions Gold spécialisé dans la création de scripts pour VEO 3.1. Tu génères des prompts vidéo d\'une qualité exceptionnelle, narrativement riches et visuellement captivants.'
          },
          {
            role: 'user',
            content: gptPrompt
          }
        ],
        temperature: 0.95, // Créativité maximale pour la narration
        max_tokens: 1200,
        seed: Date.now() + videoContext.postIndex + 1000 // Seed unique pour diversité
      });

      const generatedScript = completion.choices[0].message.content;
      if (!generatedScript) {
        throw new Error('GPT n\'a pas généré de script vidéo');
      }

      // 5. Extraire les métadonnées du script généré
      const angle = this.extractCreativeAngle(generatedScript);
      const technique = this.extractCinematicTechnique(generatedScript);
      const concept = this.extractNarrativeConcept(generatedScript);

      // 6. Vérifier la similarité et régénérer si nécessaire
      if (antiRepetition.isScriptTooSimilar(generatedScript)) {
        console.log(`[GPTVideoCreativeDirector] ⚠️ Script trop similaire détecté, régénération...`);
        
        const regeneratedScript = await this.regenerateWithMoreDiversity(
          gptPrompt,
          avoidanceInstructions,
          videoContext.postIndex
        );
        
        antiRepetition.recordUsedScript(regeneratedScript, angle, technique, concept);
        
        console.log(`[GPTVideoCreativeDirector] ✅ Script régénéré avec succès`);
        return regeneratedScript;
      }

      // 7. Enregistrer le script dans l'historique
      antiRepetition.recordUsedScript(generatedScript, angle, technique, concept);

      console.log(`[GPTVideoCreativeDirector] ✅ Script vidéo généré avec succès - Angle: ${angle}, Technique: ${technique}`);
      return generatedScript;

    } catch (error) {
      console.error('[GPTVideoCreativeDirector] Erreur lors de la génération du script:', error);
      
      // Fallback : générer un script basique mais fonctionnel
      return this.generateFallbackScript(brand, product, videoContext);
    }
  }

  /**
   * Construit le prompt GPT ultra-sophistiqué pour le directeur créatif vidéo
   */
  private static buildVideoCreativeDirectorPrompt(
    brand: BrandData,
    product: ProductData,
    calendar: CalendarData,
    videoContext: VideoContext,
    temporalContext: string,
    geographicContext: string,
    avoidanceInstructions: string
  ): string {
    return `Tu es un directeur créatif vidéo de niveau Cannes Lions Gold spécialisé dans VEO 3.1. Ta mission est de créer un SCRIPT VIDÉO PARFAIT et NARRATIVEMENT UNIQUE.

🎯 CONTEXTE DE LA MARQUE:
Nom: ${brand.name}
Secteur: ${brand.sector}
Positionnement: ${brand.pricePositioning || 'Non spécifié'}
Couleurs de marque: ${brand.colors?.primary || 'Non spécifié'} ${brand.colors?.secondary ? `/ ${brand.colors.secondary}` : ''}
Valeurs: ${brand.values?.join(', ') || 'Non spécifié'}
Audience cible: ${brand.targetAudience || calendar.targetAudience || 'Non spécifié'}

🛍️ CONTEXTE DU PRODUIT:
Nom: ${product.name}
Catégorie: ${product.category}
Description: ${product.description}
Points forts: ${product.uniqueSellingPoints?.join(', ') || 'Non spécifié'}
Bénéfices clients: ${product.customerBenefits?.join(', ') || 'Non spécifié'}
Occasions d'usage: ${product.usageOccasions?.join(', ') || 'Non spécifié'}

📅 CONTEXTE CAMPAGNE:
Objectif: ${calendar.campaignObjective || 'Non spécifié'}
Thématiques: ${calendar.generationSettings?.themes?.join(', ') || 'Non spécifié'}
Style communication: ${calendar.communicationStyle || 'Non spécifié'}

🌍 CONTEXTE GÉOGRAPHIQUE ET TEMPOREL:
${geographicContext}
${temporalContext}

🎬 CONTEXTE VIDÉO:
Type: ${videoContext.videoType || 'product-showcase'}
Durée: ${videoContext.duration || 8} secondes
Format: ${videoContext.aspectRatio || '16:9'}
Vidéo numéro: ${videoContext.postIndex + 1} sur ${videoContext.totalPosts}
Plateforme: ${videoContext.platform || 'Social Media'}
Date prévue: ${videoContext.scheduledDate || 'Non spécifiée'}

🚫 CONTRAINTES ANTI-RÉPÉTITION:
${avoidanceInstructions}

═══════════════════════════════════════════════════════════════

🎨 ANGLES CRÉATIFS DISPONIBLES (varie selon le contexte):
- Storytelling émotionnel (histoire personnelle, témoignage)
- Démonstration technique (fonctionnalités, performance)
- Lifestyle aspirationnel (mode de vie, statut social)
- Problème/Solution (pain point → bénéfice)
- Avant/Après transformation
- Comparaison concurrentielle
- Innovation/Nouveauté (première fois, révolutionnaire)
- Héritage/Tradition (savoir-faire, authenticité)
- Communauté/Appartenance (tribu, mouvement)
- Sensorialité (goût, texture, sensation)
- Durabilité/Responsabilité (éco, social)
- Performance/Efficacité (résultats, rapidité)

🎥 TECHNIQUES CINÉMATOGRAPHIQUES CANNES LIONS:
- Macro cinematography (détails extrêmes en mouvement)
- Time-lapse créatif (transformation temporelle)
- Slow motion dramatique (moments clés ralentis)
- Split screen narratif (comparaisons visuelles)
- Tracking shots fluides (suivi de mouvement)
- Drone cinematography (perspectives aériennes)
- Stop motion artistique (animation créative)
- Light painting vidéo (peinture lumineuse animée)
- Hyperlapse urbain (accéléré de déplacement)
- Morphing transitions (transformations fluides)
- Parallax storytelling (profondeur narrative)
- 360° product reveal (révélation circulaire)
- Underwater cinematography (immersion aquatique)
- Reverse motion narrative (narration inversée)
- Multi-exposure video (superpositions créatives)

🏆 CONCEPTS NARRATIFS PRIMÉS:
- Hero's journey (voyage du héros adapté produit)
- Day in the life (journée type avec produit)
- Problem solver (résolution créative de problème)
- Transformation story (changement visible)
- Behind the scenes (coulisses de fabrication)
- User testimonial (témoignage authentique)
- Product birth (naissance/création du produit)
- Seasonal integration (intégration saisonnière)
- Cultural moment (moment culturel pertinent)
- Sensory experience (expérience sensorielle)
- Social proof (preuve sociale dynamique)
- Innovation showcase (démonstration d'innovation)

═══════════════════════════════════════════════════════════════

⚠️ MISSION: Génère un SCRIPT VIDÉO PARFAIT qui:

1. 🎯 RACONTE UNE HISTOIRE captivante en ${videoContext.duration || 8} secondes
2. 🎨 UTILISE une technique cinématographique innovante et appropriée
3. 🌈 INTÈGRE harmonieusement les couleurs de marque (${brand.colors?.primary || 'couleurs appropriées'})
4. 🏆 ATTEINT un niveau de qualité Cannes Lions Gold
5. 🔄 EST NARRATIVEMENT DIFFÉRENT des scripts précédents
6. 🌍 RESPECTE le contexte géographique et culturel
7. 📅 S'ADAPTE au contexte temporel (saison, événements)
8. 💡 ÉVOQUE l'émotion appropriée au secteur et au produit
9. 🎭 UTILISE un angle créatif pertinent et engageant
10. 📱 EST OPTIMISÉ pour ${videoContext.aspectRatio || '16:9'} et ${videoContext.platform || 'social media'}

FORMAT DE RÉPONSE:
Génère UNIQUEMENT le script vidéo final, détaillé et cinématographique, prêt à être envoyé à VEO 3.1.
Le script doit faire 300-500 mots et inclure:
- Description narrative de la séquence
- Technique cinématographique utilisée
- Mouvements de caméra et transitions
- Éclairage et ambiance visuelle
- Intégration des couleurs de marque
- Rythme et timing (adapté à la durée)
- Émotion et mood recherchés
- Éléments sonores suggérés
- Call-to-action visuel subtil

IMPORTANT: Réponds UNIQUEMENT avec le script vidéo, sans texte additionnel.`;
  }

  /**
   * Analyse le contexte temporel avec équilibre saisonnier intelligent (70/30)
   */
  private static analyzeTemporalContext(scheduledDate?: string, postIndex: number = 0): string {
    if (!scheduledDate) {
      return "Contexte temporel: Focus intemporel sur le produit et la marque, sans référence saisonnière.";
    }

    // Utiliser le même algorithme d'équilibre que pour les images
    const shouldIncludeSeason = this.shouldIncludeSeasonalContext(postIndex);
    
    if (!shouldIncludeSeason) {
      return "Contexte temporel: Focus intemporel sur le produit et la marque. Éviter les références saisonnières, privilégier un storytelling universel et moderne.";
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

    // Événements spéciaux
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

    const seasonalIntensity = this.getSeasonalIntensity(postIndex);
    
    let context = '';
    if (seasonalIntensity === 'subtle') {
      context = `Contexte temporel: Intégrer SUBTILEMENT l'ambiance ${season.toLowerCase()} dans la narration`;
      if (events.length > 0) {
        context += ` et l'esprit ${events[0]}`;
      }
      context += '. Le produit et son histoire restent centraux, la saison n\'est qu\'un accent narratif discret.';
    } else {
      context = `Contexte temporel: ${season}`;
      if (events.length > 0) {
        context += `, période de ${events.join(' et ')}`;
      }
      context += '. Adapter la narration et l\'ambiance visuelle à cette période tout en gardant le produit comme héros de l\'histoire.';
    }

    return context;
  }

  /**
   * Détermine si ce post doit inclure un contexte saisonnier (algorithme 70/30)
   */
  private static shouldIncludeSeasonalContext(postIndex: number): boolean {
    const seasonalPattern = [false, false, true, true, false, false, true, false, false, true];
    return seasonalPattern[postIndex % seasonalPattern.length];
  }

  /**
   * Détermine l'intensité saisonnière (subtile ou marquée)
   */
  private static getSeasonalIntensity(postIndex: number): 'subtle' | 'marked' {
    const intensityPattern: ('subtle' | 'marked')[] = ['subtle', 'subtle', 'marked', 'subtle', 'subtle'];
    return intensityPattern[postIndex % intensityPattern.length];
  }

  /**
   * Analyse le contexte géographique
   */
  private static analyzeGeographicContext(countries?: string[]): string {
    if (!countries || countries.length === 0) {
      return "Contexte géographique: International, éviter les références culturelles trop spécifiques dans la narration.";
    }

    const countryContexts: Record<string, string> = {
      'france': 'Culture française, élégance parisienne, art de vivre, gastronomie raffinée',
      'maroc': 'Culture marocaine, architecture traditionnelle, couleurs chaudes, artisanat authentique',
      'algerie': 'Culture algérienne, méditerranéenne, couleurs du désert et de la mer',
      'tunisie': 'Culture tunisienne, méditerranéenne, traditions berbères et arabes',
      'canada': 'Culture canadienne, nature sauvage, multiculturalisme, modernité nordique',
      'usa': 'Culture américaine, dynamisme urbain, innovation, diversité culturelle',
      'uk': 'Culture britannique, tradition et modernité, élégance sobre, heritage',
      'germany': 'Culture allemande, précision technique, qualité, innovation industrielle',
      'spain': 'Culture espagnole, chaleur méditerranéenne, art de vivre, passion',
      'italy': 'Culture italienne, art renaissance, gastronomie, élégance naturelle'
    };

    const contexts = countries.map(country => 
      countryContexts[country.toLowerCase()] || `Culture ${country}`
    );

    return `Contexte géographique: ${contexts.join(' + ')}. Intégrer subtilement des éléments culturels appropriés dans la narration sans stéréotypes, créer une résonance culturelle authentique.`;
  }

  /**
   * Extrait l'angle créatif du script généré
   */
  private static extractCreativeAngle(script: string): string {
    const angles = [
      'storytelling émotionnel', 'démonstration technique', 'lifestyle aspirationnel',
      'problème/solution', 'avant/après', 'comparaison', 'innovation', 'héritage',
      'communauté', 'sensorialité', 'durabilité', 'performance'
    ];

    for (const angle of angles) {
      if (script.toLowerCase().includes(angle.toLowerCase().split('/')[0])) {
        return angle;
      }
    }

    return 'angle créatif standard';
  }

  /**
   * Extrait la technique cinématographique du script généré
   */
  private static extractCinematicTechnique(script: string): string {
    const techniques = [
      'macro cinematography', 'time-lapse', 'slow motion', 'split screen',
      'tracking shots', 'drone', 'stop motion', 'light painting', 'hyperlapse',
      'morphing', 'parallax', '360°', 'underwater', 'reverse motion', 'multi-exposure'
    ];

    for (const technique of techniques) {
      if (script.toLowerCase().includes(technique.toLowerCase().replace('°', ''))) {
        return technique;
      }
    }

    return 'technique cinématographique standard';
  }

  /**
   * Extrait le concept narratif du script généré
   */
  private static extractNarrativeConcept(script: string): string {
    const concepts = [
      'hero\'s journey', 'day in the life', 'problem solver', 'transformation',
      'behind the scenes', 'testimonial', 'product birth', 'seasonal integration',
      'cultural moment', 'sensory experience', 'social proof', 'innovation showcase'
    ];

    for (const concept of concepts) {
      if (script.toLowerCase().includes(concept.toLowerCase().replace('\'', ''))) {
        return concept;
      }
    }

    return 'concept narratif standard';
  }

  /**
   * Régénère un script avec plus de diversité
   */
  private static async regenerateWithMoreDiversity(
    originalGptPrompt: string,
    avoidanceInstructions: string,
    postIndex: number
  ): Promise<string> {
    const enhancedPrompt = originalGptPrompt + `

🔄 RÉGÉNÉRATION FORCÉE POUR DIVERSITÉ NARRATIVE:
Le script précédent était trop similaire aux récents. Tu DOIS maintenant:
1. Choisir un ANGLE CRÉATIF radicalement différent
2. Utiliser une TECHNIQUE CINÉMATOGRAPHIQUE complètement nouvelle
3. Développer un CONCEPT NARRATIF totalement unique
4. Changer le RYTHME et la STRUCTURE de l'histoire
5. Modifier l'ÉMOTION et le MOOD recherchés
6. Créer quelque chose de NARRATIVEMENT RÉVOLUTIONNAIRE

${avoidanceInstructions}

IMPÉRATIF: Le nouveau script doit être à 100% différent narrativement et visuellement !`;

    const openaiClient = getOpenAIClient();
    const completion = await openaiClient.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Tu es un directeur créatif vidéo expert. Tu dois créer un script complètement différent et narrativement unique.'
        },
        {
          role: 'user',
          content: enhancedPrompt
        }
      ],
      temperature: 1.0, // Créativité maximale pour la régénération
      max_tokens: 1200,
      seed: Date.now() + postIndex + 2000 // Seed différent pour garantir la diversité
    });

    return completion.choices[0].message.content || this.generateFallbackScript({} as any, {} as any, { postIndex } as any);
  }

  /**
   * Génère un script de fallback en cas d'erreur
   */
  private static generateFallbackScript(
    brand: BrandData,
    product: ProductData,
    videoContext: VideoContext
  ): string {
    const narratives = [
      'Cinematic product reveal with smooth camera movement showcasing',
      'Lifestyle integration story featuring natural usage of',
      'Dynamic transformation sequence highlighting the benefits of',
      'Emotional storytelling moment connecting users with',
      'Technical demonstration with artistic flair presenting'
    ];

    const randomNarrative = narratives[videoContext.postIndex % narratives.length];

    return `${randomNarrative} ${product.name} for ${brand.name}. 
Professional cinematography with ${videoContext.duration || 8} seconds of engaging visual storytelling. 
Smooth camera movements, perfect lighting, and brand color integration. 
Shot in ${videoContext.aspectRatio || '16:9'} format with cinematic quality. 
Modern, clean aesthetic with emotional resonance suitable for ${videoContext.platform || 'social media'} marketing.`;
  }

  /**
   * Méthode utilitaire pour tester la génération de scripts
   */
  static async testScriptGeneration(
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
      description: 'Produit de test pour validation vidéo'
    };

    const mockCalendar: CalendarData = {
      campaignObjective: 'Test campaign vidéo'
    };

    const mockContext: VideoContext = {
      postIndex: 0,
      totalPosts: 10,
      videoType: 'product-showcase',
      duration: 8,
      aspectRatio: '16:9'
    };

    return await this.generateVideoScript(
      mockBrand,
      mockProduct,
      mockCalendar,
      mockContext,
      calendarId
    );
  }

  /**
   * Obtient les statistiques de diversité pour un calendrier
   */
  static getDiversityStats(calendarId: string): { narratives: number; angles: number; techniques: number; concepts: number } {
    const manager = VideoAntiRepetitionManager.getInstance(calendarId);
    return manager.getUsageStats();
  }
}
