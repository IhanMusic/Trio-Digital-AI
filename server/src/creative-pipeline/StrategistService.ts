/**
 * Strategist Service
 * ÉTAPE 1 du pipeline : Analyse stratégique du brief avec GPT-5
 * Génère une stratégie créative basée sur le contexte business
 */

import axios from 'axios';
import { logger } from '../config/logger';
import {
  StrategistInput,
  CreativeStrategy,
  BrandContext,
  ProductContext,
  CalendarContext,
  PostContext
} from './types';

export class StrategistService {
  private static lastCallTime: number = 0;
  private static readonly MIN_DELAY_MS = 1000; // 1 seconde entre chaque appel

  /**
   * Attendre pour respecter le rate limit
   */
  private static async waitForRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastCallTime;
    
    if (timeSinceLastCall < this.MIN_DELAY_MS) {
      const waitTime = this.MIN_DELAY_MS - timeSinceLastCall;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastCallTime = Date.now();
  }

  /**
   * Génère une stratégie créative à partir du contexte
   */
  static async generateStrategy(input: StrategistInput): Promise<CreativeStrategy> {
    logger.info('🎯 [STRATEGIST] Début de l\'analyse stratégique');
    logger.info(`   Marque: ${input.brand.name} (${input.brand.sector})`);
    logger.info(`   Produit: ${input.product?.name || 'Non spécifié'}`);
    logger.info(`   Plateforme: ${input.post.platform}`);

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      logger.error('Clé API OpenAI manquante');
      throw new Error('Clé API OpenAI non configurée');
    }

    await this.waitForRateLimit();

    try {
      const systemPrompt = this.buildSystemPrompt();
      const userPrompt = this.buildUserPrompt(input);

      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      }, {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const content = response.data.choices[0].message.content;
      const strategy = JSON.parse(content) as CreativeStrategy;

      logger.info('✅ [STRATEGIST] Stratégie créative générée avec succès');
      logger.info(`   Message clé: ${strategy.keyMessage.headline}`);
      logger.info(`   Ton émotionnel: ${strategy.emotionalTone.primary}`);

      return strategy;

    } catch (error: any) {
      logger.error('❌ [STRATEGIST] Erreur lors de la génération de la stratégie:', error.message);
      
      // Retourner une stratégie par défaut en cas d'erreur
      return this.getDefaultStrategy(input);
    }
  }

  /**
   * Construit le prompt système pour le strategist
   */
  private static buildSystemPrompt(): string {
    return `Tu es un stratège créatif senior avec 20 ans d'expérience dans les plus grandes agences de publicité mondiales (BBDO, Ogilvy, Wieden+Kennedy).

Ta mission est d'analyser le contexte business et de produire une stratégie créative qui guidera la direction artistique d'une image publicitaire.

Tu dois retourner un JSON avec la structure suivante:
{
  "targetAudience": {
    "demographic": "Description démographique précise",
    "psychographic": "Profil psychographique détaillé",
    "painPoints": ["Point de douleur 1", "Point de douleur 2"],
    "aspirations": ["Aspiration 1", "Aspiration 2"]
  },
  "keyMessage": {
    "headline": "Message principal en une phrase",
    "subheadline": "Message secondaire de support",
    "emotionalHook": "L'accroche émotionnelle qui fait réagir"
  },
  "emotionalTone": {
    "primary": "Émotion principale (ex: confiance, joie, aspiration)",
    "secondary": "Émotion secondaire",
    "intensity": "subtle | moderate | strong"
  },
  "visualConcept": {
    "mainIdea": "Concept visuel principal en une phrase",
    "storytellingAngle": "L'angle narratif de l'image",
    "moodDescription": "Description détaillée de l'ambiance visuelle"
  },
  "differentiators": ["Différenciateur 1", "Différenciateur 2"],
  "sectorContext": {
    "industryTrends": ["Tendance 1", "Tendance 2"],
    "competitiveAdvantage": "Avantage concurrentiel à mettre en avant",
    "regulatoryConsiderations": ["Considération légale 1"]
  }
}

RÈGLES IMPORTANTES:
1. Sois spécifique au secteur d'activité
2. Adapte le ton au positionnement prix (budget vs luxury)
3. Prends en compte la plateforme sociale (Instagram vs LinkedIn)
4. Le concept visuel doit être réalisable en photographie
5. Évite les clichés et propose des angles originaux`;
  }

  /**
   * Construit le prompt utilisateur avec le contexte
   */
  private static buildUserPrompt(input: StrategistInput): string {
    const { brand, product, calendar, post } = input;

    let prompt = `Analyse ce contexte et génère une stratégie créative:

═══════════════════════════════════════════════════════════════
🏢 MARQUE
═══════════════════════════════════════════════════════════════
- Nom: ${brand.name}
- Secteur: ${brand.sector}
- Description: ${brand.description || 'Non spécifiée'}
- Positionnement prix: ${brand.pricePositioning || 'mid-range'}
- Type de business: ${brand.businessType || 'B2C'}
${brand.colors?.primary ? `- Couleur principale: ${brand.colors.primary}` : ''}
${brand.values?.length ? `- Valeurs: ${brand.values.join(', ')}` : ''}
`;

    if (product) {
      prompt += `
═══════════════════════════════════════════════════════════════
📦 PRODUIT
═══════════════════════════════════════════════════════════════
- Nom: ${product.name}
- Catégorie: ${product.category}
- Description: ${product.description || 'Non spécifiée'}
${product.uniqueSellingPoints?.length ? `- Points forts: ${product.uniqueSellingPoints.join(', ')}` : ''}
${product.customerBenefits?.length ? `- Bénéfices client: ${product.customerBenefits.join(', ')}` : ''}
${product.targetAge ? `- Âge cible: ${product.targetAge}` : ''}
`;
    }

    prompt += `
═══════════════════════════════════════════════════════════════
📅 CAMPAGNE
═══════════════════════════════════════════════════════════════
- Objectif: ${calendar.campaignObjective || 'Engagement'}
- Style de communication: ${calendar.communicationStyle || 'Professionnel'}
- Pays cible: ${calendar.targetCountry}
- Langues: ${calendar.targetLanguages.join(', ')}
${calendar.themes?.length ? `- Thèmes: ${calendar.themes.join(', ')}` : ''}
${calendar.keywords?.length ? `- Mots-clés: ${calendar.keywords.join(', ')}` : ''}

═══════════════════════════════════════════════════════════════
📱 POST
═══════════════════════════════════════════════════════════════
- Plateforme: ${post.platform}
- Position: Post ${post.postIndex + 1} sur ${post.totalPosts}
- Date: ${post.scheduledDate}
${post.generatedText ? `- Texte associé: "${post.generatedText.substring(0, 200)}..."` : ''}
${post.keyDates?.length ? `- Dates clés: ${post.keyDates.map(d => d.name).join(', ')}` : ''}
`;

    return prompt;
  }

  /**
   * Retourne une stratégie par défaut en cas d'erreur
   */
  private static getDefaultStrategy(input: StrategistInput): CreativeStrategy {
    const { brand, product, calendar, post } = input;

    return {
      targetAudience: {
        demographic: `Adultes 25-45 ans intéressés par ${brand.sector}`,
        psychographic: 'Consommateurs modernes recherchant qualité et authenticité',
        painPoints: ['Manque de temps', 'Recherche de qualité'],
        aspirations: ['Améliorer leur quotidien', 'Faire les bons choix']
      },
      keyMessage: {
        headline: `Découvrez ${product?.name || brand.name}`,
        subheadline: 'La qualité que vous méritez',
        emotionalHook: 'Transformez votre quotidien'
      },
      emotionalTone: {
        primary: 'confiance',
        secondary: 'aspiration',
        intensity: 'moderate'
      },
      visualConcept: {
        mainIdea: `Mise en scène lifestyle de ${product?.name || 'la marque'}`,
        storytellingAngle: 'Un moment de vie authentique',
        moodDescription: 'Ambiance chaleureuse et professionnelle'
      },
      differentiators: [
        'Qualité supérieure',
        'Expertise du secteur'
      ],
      sectorContext: {
        industryTrends: ['Authenticité', 'Durabilité'],
        competitiveAdvantage: 'Expertise et qualité reconnues',
        regulatoryConsiderations: []
      }
    };
  }
}
