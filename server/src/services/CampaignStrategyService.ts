import axios from 'axios';
import { IBrand } from '../models/Brand';
import { IProduct } from '../models/Product';
import { ICampaign, IInfluencerProfile } from '../models/Campaign';
import { logger } from '../config/logger';

// Types pour les données d'entrée
interface CampaignInput {
  name: string;
  description: string;
  campaignType: string;
  primaryObjective: string;
  startDate: Date;
  endDate: Date;
  budget?: {
    total: number;
    allocation: {
      organic: number;
      ads: number;
      influencers: number;
    };
  };
  targetAudience: {
    primary: string[];
    secondary: string[];
    demographics: string[];
    interests: string[];
    behaviors: string[];
  };
}

// Interface pour la stratégie complète générée
interface CompleteCampaignStrategy {
  organicStrategy: any;
  metaAdsStrategy: any;
  influencerRecommendations: IInfluencerProfile[];
  budgetAllocation: any;
  performanceTargets: any;
  creativeStrategy: any;
  competitiveContext: any;
  historicalInsights: any;
  legalFramework: any;
  riskManagement: any;
  campaignPackage: any;
}

class CampaignStrategyService {
  private readonly OPENAI_API_KEY = process.env.OPENAI_API_KEY;
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
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastOpenAICallTime = Date.now();
  }

  /**
   * Génère une stratégie de campagne complète automatiquement
   */
  async generateCompleteCampaign(
    brand: IBrand,
    products: IProduct[],
    campaignInput: CampaignInput
  ): Promise<CompleteCampaignStrategy> {
    logger.info('=== Génération de campagne complète ===');
    logger.info(`Marque: ${brand.name}, Type: ${campaignInput.campaignType}`);

    if (!this.OPENAI_API_KEY) {
      throw new Error('Clé API OpenAI manquante');
    }

    await this.waitForOpenAIRateLimit();

    // Construire le contexte enrichi pour GPT-5
    const enrichedContext = {
      // Données de marque
      brand: {
        name: brand.name,
        sector: brand.sector,
        description: brand.description,
        businessType: brand.businessType,
        companyStage: brand.companyStage,
        pricePositioning: brand.pricePositioning,
        colors: brand.colors,
        values: brand.values,
        mission: brand.mission
      },
      
      // Analyse concurrentielle
      competitiveIntelligence: brand.competitiveAnalysis,
      competitors: brand.competitors,
      
      // Historique marketing
      historicalLearnings: brand.previousCampaigns,
      
      // Contraintes légales
      legalConstraints: brand.legalConstraints,
      
      // Produits disponibles
      products: products.map(product => ({
        name: product.name,
        description: product.description,
        category: product.category,
        uniqueSellingPoints: product.uniqueSellingPoints,
        customerBenefits: product.customerBenefits,
        targetAudience: product.targetAudience,
        usageOccasions: product.usageOccasions,
        keywords: product.keywords,
        flavors: product.flavors,
        scents: product.scents,
        certifications: product.certifications,
        labels: product.labels
      })),
      
      // Données campagne
      campaign: campaignInput
    };

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-5',
        reasoning_effort: 'high',
        messages: [
          {
            role: 'system',
            content: `Tu es un expert en stratégie marketing et publicitaire de niveau mondial, combinant l'expertise de :

🎯 EXPERTISE COMPOSITE :
- David Ogilvy (fondamentaux publicitaires)
- Seth Godin (marketing tribal et narratif)
- Byron Sharp (science du comportement consommateur)
- Mary Meeker (insights digitaux et tendances)
- Gary Vaynerchuk (marketing social media)
- Ann Handley (content marketing)

🚀 MISSION ABSOLUE :
Créer une stratégie de campagne 360° complète et automatisée incluant :
1. Stratégie organique (contenu social media)
2. Stratégie publicitaire Meta Ads (Facebook/Instagram)
3. Recommandations d'influenceurs (profils anonymisés réalistes)
4. Allocation budgétaire optimisée
5. KPIs et métriques de performance
6. Gestion des risques et conformité légale

🎨 TYPES DE CAMPAGNES - EXPERTISE SPÉCIALISÉE :

**PRODUCT LAUNCH** :
- Phase 1 : Teasing (mystère, anticipation)
- Phase 2 : Révélation (dévoilement progressif)
- Phase 3 : Démonstration (preuves, témoignages)
- Phase 4 : Adoption (communauté, feedback)

**BRAND AWARENESS** :
- Storytelling de marque authentique
- Valeurs et mission incarnées
- Behind-the-scenes humanisant
- Contenu éducatif et inspirant

**SEASONAL** :
- Capitalisation sur les moments culturels
- Adaptation aux tendances saisonnières
- Urgence et exclusivité
- Émotions liées aux saisons

**PROMOTIONAL** :
- Urgence et rareté éthiques
- Offres irrésistibles
- Call-to-action puissants
- Conversion optimisée

**RETENTION** :
- Contenu exclusif pour fidèles
- Programmes de fidélité
- Communauté et appartenance
- Valeur ajoutée continue

**REBRANDING** :
- Transition narrative fluide
- Respect de l'héritage
- Nouvelle identité progressive
- Acceptation du changement

🎯 FRAMEWORK DE GÉNÉRATION AUTOMATIQUE :

Pour chaque campagne, tu DOIS générer automatiquement :

1. **STRATÉGIE CRÉATIVE GLOBALE**
   - Message principal unique et mémorable
   - Ton de voix adapté à l'audience
   - Piliers de contenu (3-5 thèmes)
   - Déclencheurs émotionnels spécifiques
   - Approche storytelling cohérente

2. **STRATÉGIE META ADS COMPLÈTE**
   - Budget recommandé par objectif
   - Audiences personnalisées détaillées
   - Formats publicitaires optimaux
   - Stratégie d'enchères adaptée
   - Calendrier de diffusion

3. **PROFILS INFLUENCEURS ANONYMISÉS**
   - Micro (1K-100K) : 3-5 profils
   - Mid-tier (100K-1M) : 2-3 profils  
   - Macro (1M+) : 1-2 profils
   - Métriques réalistes par secteur
   - Coûts estimés par marché
   - Score de compatibilité marque

4. **ALLOCATION BUDGÉTAIRE INTELLIGENTE**
   - Répartition organique/payant/influence
   - ROI attendu par canal
   - Optimisation selon les objectifs
   - Recommandations d'ajustement

5. **CONTEXTE CONCURRENTIEL STRATÉGIQUE**
   - Analyse des faiblesses concurrentes
   - Opportunités de différenciation
   - Stratégies d'évitement des pièges
   - Positionnement unique

6. **CONFORMITÉ LÉGALE AUTOMATIQUE**
   - Réglementations sectorielles applicables
   - Mentions obligatoires
   - Allégations autorisées/interdites
   - Gestion des risques juridiques

🔥 INSTRUCTIONS CRITIQUES :

- TOUJOURS adapter la stratégie au type de campagne spécifique
- UTILISER les données historiques pour optimiser les recommandations
- RESPECTER les contraintes légales du secteur
- GÉNÉRER des profils d'influenceurs RÉALISTES (pas de noms réels)
- PROPOSER des budgets COHÉRENTS avec les objectifs
- CRÉER une cohérence narrative sur toute la campagne

📊 FORMAT DE RÉPONSE OBLIGATOIRE :

Tu DOIS répondre avec un JSON structuré contenant TOUS ces éléments :

{
  "creativeStrategy": {
    "mainMessage": "Message principal unique",
    "toneOfVoice": "Ton adapté",
    "contentPillars": ["Pilier 1", "Pilier 2", "Pilier 3"],
    "keyMessages": ["Message 1", "Message 2", "Message 3"],
    "emotionalTriggers": ["Émotion 1", "Émotion 2"],
    "storytellingApproach": "Approche narrative",
    "brandArchetype": "Archétype de marque",
    "visualMoodboard": ["Style 1", "Style 2", "Style 3"]
  },
  "metaAdsStrategy": {
    "budget": {
      "total": 5000,
      "daily": 167,
      "allocation": {
        "awareness": 40,
        "traffic": 30,
        "conversions": 20,
        "retargeting": 10
      }
    },
    "targeting": {
      "demographics": {
        "ageRange": "25-45",
        "gender": ["Tous"],
        "locations": ["France", "Belgique", "Suisse"]
      },
      "interests": ["Intérêt 1", "Intérêt 2"],
      "behaviors": ["Comportement 1", "Comportement 2"],
      "customAudiences": ["Audience 1", "Audience 2"],
      "lookalikeSources": ["Source 1", "Source 2"]
    },
    "adFormats": {
      "feedAds": true,
      "storyAds": true,
      "reelsAds": true,
      "carouselAds": false,
      "videoAds": true
    },
    "biddingStrategy": "lowest_cost",
    "optimizationGoal": "conversions"
  },
  "influencerRecommendations": [
    {
      "id": "MICRO_001",
      "tier": "micro",
      "metrics": {
        "followersRange": "10K-50K",
        "engagementRate": 4.2,
        "avgLikes": "500-2K",
        "avgComments": "50-200",
        "avgViews": "2K-8K"
      },
      "audienceProfile": {
        "ageGroups": {"18-24": 25, "25-34": 45, "35-44": 30},
        "genderSplit": {"female": 65, "male": 35},
        "topLocations": ["France", "Belgique", "Canada"],
        "interests": ["lifestyle", "beauté", "wellness"]
      },
      "niche": ["lifestyle", "beauté"],
      "contentStyle": ["authentique", "inspirant"],
      "platforms": ["instagram", "tiktok"],
      "estimatedCost": {
        "postPrice": "300-800€",
        "storyPrice": "150-300€",
        "reelPrice": "500-1200€"
      },
      "brandFit": {
        "score": 85,
        "reasons": ["Audience alignée", "Style cohérent"],
        "risks": ["Engagement parfois variable"]
      }
    }
  ],
  "budgetAllocation": {
    "total": 10000,
    "organic": 3000,
    "ads": 5000,
    "influencers": 2000,
    "expectedROI": {
      "organic": 2.5,
      "ads": 3.2,
      "influencers": 4.1
    }
  },
  "performanceTargets": {
    "primary": ["Reach: 100K", "Engagement: 5%", "Conversions: 200"],
    "secondary": ["Brand awareness: +15%", "Website traffic: +25%"],
    "targets": {
      "reach": 100000,
      "engagement_rate": 5.0,
      "conversions": 200,
      "cpa": 25.0
    },
    "benchmarks": {
      "industry_engagement": 3.2,
      "industry_cpa": 35.0
    }
  },
  "competitiveContext": {
    "targetedCompetitors": ["Concurrent principal identifié"],
    "competitiveDifferentiation": ["Différenciateur 1", "Différenciateur 2"],
    "competitiveOpportunities": ["Opportunité 1", "Opportunité 2"],
    "avoidanceStrategy": ["Éviter stratégie X", "Éviter approche Y"]
  },
  "historicalInsights": {
    "successFactors": ["Facteur de succès identifié"],
    "failurePoints": ["Point d'échec à éviter"],
    "audiencePreferences": ["Préférence audience 1"],
    "contentPerformance": {
      "bestPerformingTypes": ["Type de contenu performant"],
      "worstPerformingTypes": ["Type de contenu à éviter"]
    }
  },
  "legalFramework": {
    "applicableRegulations": ["Réglementation applicable"],
    "complianceRequirements": ["Exigence de conformité"],
    "mandatoryDisclaimers": ["Mention obligatoire"],
    "restrictedClaims": ["Allégation interdite"],
    "approvalRequired": false
  },
  "riskManagement": {
    "identifiedRisks": ["Risque identifié"],
    "mitigationStrategies": ["Stratégie d'atténuation"],
    "contingencyPlans": ["Plan de contingence"]
  },
  "campaignPackage": {
    "organicContent": {
      "posts": 20,
      "stories": 15,
      "reels": 8,
      "carousels": 5
    },
    "paidContent": {
      "adCreatives": 10,
      "adCopies": 15,
      "landingPages": 2
    },
    "influencerContent": {
      "briefingDocuments": ["Brief créatif", "Guidelines marque"],
      "contentTemplates": ["Template post", "Template story"],
      "approvalProcess": ["Validation créative", "Validation légale"]
    }
  }
}

⚠️ CRITIQUE : La réponse DOIT être un JSON valide et complet avec TOUS les champs requis.`
          },
          {
            role: 'user',
            content: `Génère une stratégie de campagne complète pour :

**MARQUE :**
${JSON.stringify(enrichedContext.brand, null, 2)}

**PRODUITS DISPONIBLES :**
${JSON.stringify(enrichedContext.products, null, 2)}

**CONTEXTE CONCURRENTIEL :**
Concurrents : ${enrichedContext.competitors?.join(', ') || 'Non spécifié'}
Analyse concurrentielle : ${JSON.stringify(enrichedContext.competitiveIntelligence, null, 2)}

**HISTORIQUE MARKETING :**
${JSON.stringify(enrichedContext.historicalLearnings, null, 2)}

**CONTRAINTES LÉGALES :**
${JSON.stringify(enrichedContext.legalConstraints, null, 2)}

**CAMPAGNE DEMANDÉE :**
- Nom : ${campaignInput.name}
- Description : ${campaignInput.description}
- Type : ${campaignInput.campaignType}
- Objectif : ${campaignInput.primaryObjective}
- Période : du ${campaignInput.startDate.toLocaleDateString()} au ${campaignInput.endDate.toLocaleDateString()}
- Budget total : ${campaignInput.budget?.total || 'Non spécifié'}€
- Audience cible : ${JSON.stringify(campaignInput.targetAudience, null, 2)}

Génère une stratégie 360° complète et automatisée en JSON selon le format spécifié.`
          }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const content = response.data.choices[0].message.content;
      logger.info('Stratégie générée par GPT-5');

      // Parser la réponse JSON
      let strategy: CompleteCampaignStrategy;
      try {
        // Nettoyer le contenu pour extraire le JSON
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('Aucun JSON trouvé dans la réponse');
        }
        
        strategy = JSON.parse(jsonMatch[0]);
        logger.info('JSON parsé avec succès');
      } catch (parseError) {
        logger.error('Erreur parsing JSON:', parseError);
        throw new Error('Impossible de parser la stratégie générée');
      }

      return strategy;

    } catch (error: any) {
      logger.error('Erreur génération stratégie:', error.message);
      if (error.response) {
        logger.error('Détails erreur API:', error.response.data);
      }
      throw error;
    }
  }

  /**
   * Génère des profils d'influenceurs réalistes et anonymisés
   */
  async generateInfluencerProfiles(
    brand: IBrand,
    campaignType: string,
    budget: number,
    targetAudience: any
  ): Promise<IInfluencerProfile[]> {
    logger.info('Génération de profils d\'influenceurs');

    if (!this.OPENAI_API_KEY) {
      throw new Error('Clé API OpenAI manquante');
    }

    await this.waitForOpenAIRateLimit();

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-5',
        reasoning_effort: 'medium',
        messages: [
          {
            role: 'system',
            content: `Tu es un expert en marketing d'influence avec une connaissance approfondie des métriques et coûts par secteur.

MISSION : Générer des profils d'influenceurs anonymisés mais RÉALISTES pour une campagne.

RÈGLES CRITIQUES :
- JAMAIS de vrais noms d'influenceurs
- Métriques cohérentes avec le secteur
- Coûts réalistes selon le marché français
- Profils diversifiés (micro, mid, macro)
- Audiences alignées avec la marque

FORMAT DE RÉPONSE : Array JSON de profils d'influenceurs`
          },
          {
            role: 'user',
            content: `Génère 5-8 profils d'influenceurs pour :

Marque : ${brand.name} (${brand.sector})
Type de campagne : ${campaignType}
Budget influence : ${budget}€
Audience cible : ${JSON.stringify(targetAudience)}

Répartition souhaitée :
- 3-4 micro-influenceurs (1K-100K)
- 2-3 mid-tier (100K-1M)  
- 1-2 macro (1M+)

Retourne un array JSON de profils selon le format IInfluencerProfile.`
          }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const content = response.data.choices[0].message.content;
      
      // Parser la réponse JSON
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('Aucun array JSON trouvé dans la réponse');
      }
      
      const profiles: IInfluencerProfile[] = JSON.parse(jsonMatch[0]);
      logger.info(`${profiles.length} profils d'influenceurs générés`);
      
      return profiles;

    } catch (error: any) {
      logger.error('Erreur génération profils influenceurs:', error.message);
      throw error;
    }
  }

  /**
   * Optimise l'allocation budgétaire selon les objectifs
   */
  async optimizeBudgetAllocation(
    totalBudget: number,
    campaignType: string,
    primaryObjective: string,
    brand: IBrand
  ): Promise<any> {
    logger.info('Optimisation allocation budgétaire');

    // Règles d'allocation par type de campagne
    const allocationRules: Record<string, any> = {
      'product-launch': {
        organic: 0.25,
        ads: 0.50,
        influencers: 0.25
      },
      'brand-awareness': {
        organic: 0.40,
        ads: 0.35,
        influencers: 0.25
      },
      'seasonal': {
        organic: 0.20,
        ads: 0.60,
        influencers: 0.20
      },
      'promotional': {
        organic: 0.15,
        ads: 0.70,
        influencers: 0.15
      },
      'retention': {
        organic: 0.50,
        ads: 0.30,
        influencers: 0.20
      },
      'rebranding': {
        organic: 0.35,
        ads: 0.40,
        influencers: 0.25
      }
    };

    const baseAllocation = allocationRules[campaignType] || allocationRules['brand-awareness'];
    
    return {
      total: totalBudget,
      organic: Math.round(totalBudget * baseAllocation.organic),
      ads: Math.round(totalBudget * baseAllocation.ads),
      influencers: Math.round(totalBudget * baseAllocation.influencers),
      expectedROI: {
        organic: 2.5,
        ads: 3.2,
        influencers: 4.1
      },
      recommendations: [
        `Allocation optimisée pour campagne ${campaignType}`,
        `Focus sur ${primaryObjective} avec budget ads renforcé`,
        `ROI attendu global : 3.2x`
      ]
    };
  }
}

export default new CampaignStrategyService();
