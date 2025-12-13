import { logger } from '../config/logger';
import { IBrand } from '../models/Brand';
import { IProduct } from '../models/Product';

/**
 * 🎨 VISUAL STRATEGIST SERVICE - COUCHE 1 DU PIPELINE 3-COUCHES
 * 
 * Génère des stratégies visuelles uniques et cohérentes pour chaque post
 * Garantit la diversité créative sur l'ensemble du calendrier
 * Évite les répétitions et maintient la qualité Cannes Lions
 */

export interface VisualStrategyContext {
  postIndex: number;
  totalPosts: number;
  brand: IBrand;
  products: IProduct[];
  platform: string;
  country: string;
  calendarId: string;
  scheduledDate: Date;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
}

export interface VisualStrategy {
  concept: string;           // "Moment de plaisir matinal authentique, naturalité française"
  mood: string;             // "Cozy morning ritual, authentic pleasure"
  setting: string;          // "Rustic French kitchen, marble countertop"
  lightingStyle: string;    // "Golden hour window light, 3200K warmth"
  photographyStyle: string; // "Mowie Kay breakfast aesthetic"
  composition: string;      // "Rule of thirds, shallow depth of field"
  productIntegration: string; // "40% frame occupation, natural placement"
  culturalContext: string;  // "French lifestyle, authentic moments"
  uniqueAngle: string;      // "Authentic pleasure vs artificial perfection"
  diversityScore: number;   // 0-100, mesure l'unicité par rapport aux précédents
}

class VisualStrategistService {
  // Cache des stratégies utilisées par calendrier pour éviter les répétitions
  private static usedStrategies: Map<string, VisualStrategy[]> = new Map();
  
  // Base de données des concepts visuels par secteur
  private static readonly VISUAL_CONCEPTS: Record<string, string[]> = {
    'Agroalimentaire et FMCG': [
      'Moment de plaisir matinal authentique',
      'Pause gourmande énergisante',
      'Partage familial convivial',
      'Découverte gustative raffinée',
      'Rituel bien-être quotidien',
      'Instant de pure gourmandise',
      'Tradition culinaire moderne',
      'Fraîcheur naturelle éclatante',
      'Plaisir simple et authentique',
      'Énergie positive matinale',
      'Moment de réconfort chaleureux',
      'Expérience sensorielle unique',
      'Qualité artisanale premium',
      'Naturalité française assumée',
      'Innovation gustative subtile'
    ],
    'Beauté et Bien-être': [
      'Rituel beauté matinal lumineux',
      'Transformation naturelle éclatante',
      'Moment de soin personnel',
      'Confiance rayonnante authentique',
      'Élégance naturelle assumée',
      'Bien-être intérieur visible',
      'Routine beauté minimaliste',
      'Éclat naturel révélé',
      'Soin expert professionnel',
      'Beauté intemporelle moderne',
      'Fraîcheur juvénile naturelle',
      'Sophistication accessible',
      'Pureté des ingrédients',
      'Innovation beauté douce',
      'Harmonie corps-esprit'
    ],
    'Mode et Luxe': [
      'Élégance parisienne intemporelle',
      'Style décontracté chic',
      'Sophistication moderne accessible',
      'Créativité mode assumée',
      'Luxe discret quotidien',
      'Expression personnelle unique',
      'Raffinement contemporain',
      'Audace créative maîtrisée',
      'Classique revisité moderne',
      'Authenticité stylée naturelle',
      'Innovation textile subtile',
      'Artisanat mode premium',
      'Tendance avant-gardiste',
      'Confort luxueux quotidien',
      'Identité mode affirmée'
    ],
    'Tech et Électronique': [
      'Innovation technologique intuitive',
      'Simplicité digitale élégante',
      'Connectivité humaine authentique',
      'Performance discrète puissante',
      'Design fonctionnel épuré',
      'Technologie au service humain',
      'Efficacité quotidienne fluide',
      'Innovation accessible démocratique',
      'Créativité digitale libérée',
      'Productivité sereine optimisée',
      'Connexion sociale enrichie',
      'Expérience utilisateur intuitive',
      'Technologie invisible présente',
      'Performance écologique responsable',
      'Intelligence artificielle bienveillante'
    ]
  };

  private static readonly PHOTOGRAPHY_STYLES: Record<string, string[]> = {
    'food': [
      'Mowie Kay breakfast aesthetic',
      'Dennis Prescott rustic charm',
      'Tara O\'Brady natural light',
      'Todd Selby lifestyle integration',
      'Mikkel Jul Hvilshøj minimalist',
      'Ren Fuller artistic composition',
      'Eva Kosmas Flores moody atmosphere',
      'Linda Lomelino Scandinavian clean',
      'Béatrice Peltre French elegance',
      'Cannelle et Vanille organic beauty'
    ],
    'beauty': [
      'Annie Leibovitz dramatic portrait',
      'Mario Testino glamour luxury',
      'Peter Lindbergh natural elegance',
      'Paolo Roversi ethereal beauty',
      'Steven Meisel editorial perfection',
      'Inez & Vinoodh contemporary edge',
      'Craig McDean minimalist chic',
      'Solve Sundsbo artistic innovation',
      'Tim Walker whimsical storytelling',
      'Rankin bold personality'
    ],
    'fashion': [
      'Peter Lindbergh timeless elegance',
      'Paolo Roversi romantic sophistication',
      'Steven Meisel editorial mastery',
      'Mario Testino vibrant luxury',
      'Annie Leibovitz narrative power',
      'Inez & Vinoodh modern edge',
      'Craig McDean minimalist precision',
      'Tim Walker fantastical storytelling',
      'Solve Sundsbo artistic vision',
      'Juergen Teller authentic rawness'
    ],
    'tech': [
      'Apple minimalist perfection',
      'Samsung lifestyle integration',
      'Google human-centered design',
      'Tesla futuristic elegance',
      'Dyson functional beauty',
      'Bang & Olufsen luxury precision',
      'Braun timeless functionality',
      'Sony innovative aesthetics',
      'Microsoft productivity focus',
      'Adobe creative empowerment'
    ]
  };

  private static readonly LIGHTING_STYLES = [
    'Golden hour window light, 3200K warmth',
    'Soft diffused natural light, 4000K neutral',
    'Dramatic side lighting, 2800K intimate',
    'Bright even studio light, 5000K crisp',
    'Moody atmospheric light, 3000K cozy',
    'Clean minimalist light, 5500K pure',
    'Warm ambient light, 2700K comfortable',
    'Dynamic directional light, 4500K energetic',
    'Ethereal backlight, 6000K dreamy',
    'Professional commercial light, 4200K balanced'
  ];

  private static readonly COMPOSITIONS = [
    'Rule of thirds, shallow depth of field',
    'Central symmetry, balanced composition',
    'Leading lines, dynamic perspective',
    'Golden ratio, harmonious proportions',
    'Negative space, minimalist focus',
    'Diagonal composition, energetic flow',
    'Frame within frame, layered depth',
    'Pattern repetition, rhythmic visual',
    'Asymmetrical balance, modern tension',
    'Close-up macro, intimate detail'
  ];

  private static readonly SETTINGS_BY_SECTOR: Record<string, string[]> = {
    'Agroalimentaire et FMCG': [
      'Rustic French kitchen, marble countertop',
      'Modern breakfast nook, natural wood',
      'Cozy family dining room, warm atmosphere',
      'Minimalist kitchen island, clean lines',
      'Outdoor picnic setting, natural environment',
      'Artisan bakery counter, authentic craft',
      'Contemporary café interior, urban chic',
      'Traditional farmhouse kitchen, heritage charm',
      'Elegant restaurant table, fine dining',
      'Home office desk, productive energy'
    ],
    'Beauté et Bien-être': [
      'Luxurious marble bathroom, spa atmosphere',
      'Natural light vanity, morning ritual',
      'Minimalist bedroom, serene environment',
      'Professional salon setting, expert care',
      'Outdoor natural setting, organic beauty',
      'Contemporary bathroom, modern elegance',
      'Vintage dressing room, timeless charm',
      'Clean studio backdrop, product focus',
      'Cozy home environment, personal care',
      'Sophisticated hotel suite, luxury experience'
    ]
  };

  /**
   * Génère une stratégie visuelle unique pour un post spécifique
   */
  static async generateStrategy(context: VisualStrategyContext): Promise<VisualStrategy> {
    logger.info(`🎨 Génération stratégie visuelle - Post ${context.postIndex + 1}/${context.totalPosts}`);
    
    try {
      // Récupérer les stratégies déjà utilisées pour ce calendrier
      const usedStrategies = this.usedStrategies.get(context.calendarId) || [];
      
      // Déterminer le secteur pour sélectionner les concepts appropriés
      const sector = this.mapSectorToConcepts(context.brand.sector);
      
      // Générer une stratégie unique
      const strategy = await this.createUniqueStrategy(context, usedStrategies, sector);
      
      // Calculer le score de diversité
      strategy.diversityScore = this.calculateDiversityScore(strategy, usedStrategies);
      
      // Mémoriser la stratégie pour éviter les répétitions futures
      usedStrategies.push(strategy);
      this.usedStrategies.set(context.calendarId, usedStrategies);
      
      logger.info(`✅ Stratégie générée - Concept: "${strategy.concept}"`);
      logger.info(`📊 Score diversité: ${strategy.diversityScore}/100`);
      
      return strategy;
      
    } catch (error: any) {
      logger.error('❌ Erreur génération stratégie visuelle:', error.message);
      
      // Stratégie de fallback
      return this.createFallbackStrategy(context);
    }
  }

  /**
   * Crée une stratégie visuelle unique en évitant les répétitions
   */
  private static async createUniqueStrategy(
    context: VisualStrategyContext,
    usedStrategies: VisualStrategy[],
    sector: string
  ): Promise<VisualStrategy> {
    
    // Concepts disponibles pour ce secteur
    const availableConcepts = this.VISUAL_CONCEPTS[sector] || this.VISUAL_CONCEPTS['Agroalimentaire et FMCG'];
    
    // Éviter les concepts déjà utilisés récemment (5 derniers)
    const recentConcepts = usedStrategies.slice(-5).map(s => s.concept);
    const unusedConcepts = availableConcepts.filter(concept => !recentConcepts.includes(concept));
    
    // Sélectionner un concept (prioriser les non-utilisés)
    const selectedConcept = unusedConcepts.length > 0 
      ? this.selectRandomWeighted(unusedConcepts)
      : this.selectRandomWeighted(availableConcepts);

    // Déterminer le style photographique selon le secteur
    const photoCategory = this.getPhotographyCategory(context.brand.sector);
    const photographyStyles = this.PHOTOGRAPHY_STYLES[photoCategory] || this.PHOTOGRAPHY_STYLES['food'];
    
    // Éviter les styles récemment utilisés
    const recentStyles = usedStrategies.slice(-3).map(s => s.photographyStyle);
    const unusedStyles = photographyStyles.filter(style => !recentStyles.includes(style));
    
    const selectedStyle = unusedStyles.length > 0
      ? this.selectRandomWeighted(unusedStyles)
      : this.selectRandomWeighted(photographyStyles);

    // Sélectionner les autres éléments avec diversité
    const lighting = this.selectRandomWeighted(this.LIGHTING_STYLES);
    const composition = this.selectRandomWeighted(this.COMPOSITIONS);
    
    // Sélectionner le setting selon le secteur
    const sectorSettings = this.SETTINGS_BY_SECTOR[sector] || this.SETTINGS_BY_SECTOR['Agroalimentaire et FMCG'];
    const setting = this.selectRandomWeighted(sectorSettings);

    // Adapter selon la saison
    const seasonalMood = this.getSeasonalMood(context.season, selectedConcept);
    
    // Adapter selon le pays/culture
    const culturalContext = this.getCulturalContext(context.country, context.brand.sector);
    
    // Générer l'angle unique
    const uniqueAngle = this.generateUniqueAngle(selectedConcept, context.brand, context.products);

    return {
      concept: selectedConcept,
      mood: seasonalMood,
      setting: setting,
      lightingStyle: lighting,
      photographyStyle: selectedStyle,
      composition: composition,
      productIntegration: this.getProductIntegration(context.products, context.platform),
      culturalContext: culturalContext,
      uniqueAngle: uniqueAngle,
      diversityScore: 0 // Sera calculé après
    };
  }

  /**
   * Mappe le secteur de la marque aux concepts visuels appropriés
   */
  private static mapSectorToConcepts(sector: string): string {
    const sectorMap: Record<string, string> = {
      'Agroalimentaire et FMCG': 'Agroalimentaire et FMCG',
      'Biens de consommation': 'Agroalimentaire et FMCG',
      'Retail et Distribution': 'Agroalimentaire et FMCG',
      'Beauté et Bien-être': 'Beauté et Bien-être',
      'Chimie et Pharmaceutique': 'Beauté et Bien-être',
      'Santé et Services sociaux': 'Beauté et Bien-être',
      'Mode et Luxe': 'Mode et Luxe',
      'Artisanat et Métiers d\'art': 'Mode et Luxe',
      'Informatique et Technologies': 'Tech et Électronique',
      'Télécommunications': 'Tech et Électronique',
      'Communication et Médias': 'Tech et Électronique'
    };

    return sectorMap[sector] || 'Agroalimentaire et FMCG';
  }

  /**
   * Détermine la catégorie photographique selon le secteur
   */
  private static getPhotographyCategory(sector: string): string {
    if (sector.includes('Agroalimentaire') || sector.includes('FMCG') || sector.includes('Biens de consommation')) {
      return 'food';
    }
    if (sector.includes('Beauté') || sector.includes('Bien-être') || sector.includes('Chimie')) {
      return 'beauty';
    }
    if (sector.includes('Mode') || sector.includes('Luxe') || sector.includes('Artisanat')) {
      return 'fashion';
    }
    if (sector.includes('Informatique') || sector.includes('Technologies') || sector.includes('Télécommunications')) {
      return 'tech';
    }
    return 'food'; // Fallback
  }

  /**
   * Sélection pondérée aléatoire d'un élément
   */
  private static selectRandomWeighted<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  /**
   * Adapte le mood selon la saison
   */
  private static getSeasonalMood(season: string, concept: string): string {
    const seasonalAdjustments: Record<string, string> = {
      'spring': 'Fresh renewal energy, optimistic brightness',
      'summer': 'Vibrant warmth, joyful abundance',
      'autumn': 'Cozy comfort, rich authenticity',
      'winter': 'Intimate warmth, sophisticated elegance'
    };

    const baseMood = concept.toLowerCase().includes('matinal') ? 'Morning ritual energy' :
                     concept.toLowerCase().includes('familial') ? 'Shared moment warmth' :
                     concept.toLowerCase().includes('gourmande') ? 'Indulgent pleasure' :
                     'Authentic lifestyle moment';

    return `${baseMood}, ${seasonalAdjustments[season] || seasonalAdjustments['spring']}`;
  }

  /**
   * Génère le contexte culturel selon le pays
   */
  private static getCulturalContext(country: string, sector: string): string {
    const culturalContexts: Record<string, string> = {
      'France': 'French lifestyle authenticity, artisanal heritage',
      'Algeria': 'Algerian hospitality, Mediterranean lifestyle',
      'Tunisia': 'Tunisian elegance, coastal sophistication',
      'Canada': 'Canadian natural lifestyle, multicultural harmony',
      'Belgium': 'Belgian craftsmanship, European refinement',
      'Switzerland': 'Swiss precision, alpine purity'
    };

    return culturalContexts[country] || 'International lifestyle, universal appeal';
  }

  /**
   * Génère un angle unique pour se différencier
   */
  private static generateUniqueAngle(concept: string, brand: IBrand, products: IProduct[]): string {
    const brandValues = brand.values?.join(', ') || 'quality, authenticity';
    const productBenefits = products.length > 0 
      ? products[0].customerBenefits?.slice(0, 2).join(', ') || 'premium quality'
      : 'premium experience';

    const angles = [
      `Authentic ${brandValues} vs artificial perfection`,
      `Real ${productBenefits} vs marketing promises`,
      `Genuine lifestyle integration vs staged photography`,
      `Natural ${brandValues} vs forced positioning`,
      `Honest ${productBenefits} vs exaggerated claims`
    ];

    return this.selectRandomWeighted(angles);
  }

  /**
   * Détermine l'intégration produit selon la plateforme
   */
  private static getProductIntegration(products: IProduct[], platform: string): string {
    const hasProducts = products.length > 0;
    
    if (!hasProducts) {
      return 'Brand presence through environment and mood, 20% visual weight';
    }

    const platformIntegrations: Record<string, string> = {
      'instagram': '40% frame occupation, natural lifestyle placement',
      'facebook': '35% frame occupation, social context integration',
      'linkedin': '30% frame occupation, professional environment',
      'tiktok': '45% frame occupation, dynamic interaction',
      'twitter': '35% frame occupation, clear product visibility'
    };

    return platformIntegrations[platform.toLowerCase()] || '40% frame occupation, natural placement';
  }

  /**
   * Calcule le score de diversité par rapport aux stratégies précédentes
   */
  private static calculateDiversityScore(strategy: VisualStrategy, usedStrategies: VisualStrategy[]): number {
    if (usedStrategies.length === 0) return 100;

    let totalSimilarity = 0;
    const recentStrategies = usedStrategies.slice(-10); // Comparer avec les 10 dernières

    for (const used of recentStrategies) {
      let similarity = 0;
      
      // Comparer chaque élément
      if (strategy.concept === used.concept) similarity += 30;
      if (strategy.photographyStyle === used.photographyStyle) similarity += 25;
      if (strategy.setting === used.setting) similarity += 20;
      if (strategy.lightingStyle === used.lightingStyle) similarity += 15;
      if (strategy.composition === used.composition) similarity += 10;
      
      totalSimilarity += similarity;
    }

    const averageSimilarity = totalSimilarity / recentStrategies.length;
    return Math.max(0, 100 - averageSimilarity);
  }

  /**
   * Crée une stratégie de fallback en cas d'erreur
   */
  private static createFallbackStrategy(context: VisualStrategyContext): VisualStrategy {
    logger.info('⚠️  Utilisation de la stratégie de fallback');
    
    return {
      concept: 'Moment authentique de qualité',
      mood: 'Natural lifestyle energy, genuine pleasure',
      setting: 'Clean modern environment, natural light',
      lightingStyle: 'Soft natural light, 4000K balanced',
      photographyStyle: 'Professional lifestyle photography',
      composition: 'Rule of thirds, balanced composition',
      productIntegration: '40% frame occupation, natural placement',
      culturalContext: 'Universal lifestyle appeal',
      uniqueAngle: 'Authentic quality vs artificial perfection',
      diversityScore: 75
    };
  }

  /**
   * Réinitialise le cache des stratégies pour un calendrier
   */
  static resetCalendarStrategies(calendarId: string): void {
    this.usedStrategies.delete(calendarId);
    logger.info(`🔄 Cache stratégies réinitialisé pour calendrier ${calendarId}`);
  }

  /**
   * Obtient les statistiques de diversité pour un calendrier
   */
  static getCalendarDiversityStats(calendarId: string): {
    totalStrategies: number;
    averageDiversityScore: number;
    uniqueConcepts: number;
    uniqueStyles: number;
  } {
    const strategies = this.usedStrategies.get(calendarId) || [];
    
    if (strategies.length === 0) {
      return {
        totalStrategies: 0,
        averageDiversityScore: 0,
        uniqueConcepts: 0,
        uniqueStyles: 0
      };
    }

    const averageDiversityScore = strategies.reduce((sum, s) => sum + s.diversityScore, 0) / strategies.length;
    const uniqueConcepts = new Set(strategies.map(s => s.concept)).size;
    const uniqueStyles = new Set(strategies.map(s => s.photographyStyle)).size;

    return {
      totalStrategies: strategies.length,
      averageDiversityScore: Math.round(averageDiversityScore),
      uniqueConcepts,
      uniqueStyles
    };
  }
}

export default VisualStrategistService;
