import { Request, Response } from 'express';
import { PromptService } from '../services/PromptService';
import { BriefData } from '../types/brief';
import mongoose from 'mongoose';
import axios from 'axios';
import Brand from '../models/Brand';

interface StrategyMetrics {
  executionTime: number;
  tokenCount: number;
  retryCount: number;
  validationScore: number;
  cacheMiss: boolean;
}

interface CachedStrategy {
  result: any;
  metrics: StrategyMetrics;
  timestamp: Date;
  key: string;
}

interface GPTResponse {
  content: string;
  tokenCount: number;
}

export class StrategyController {
  private static readonly CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
  private static readonly OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  static async generateStrategy(req: Request, res: Response): Promise<void> {
    try {
      const { briefData, options, brandId } = req.body;

      if (!brandId) {
        res.status(400).json({
          success: false,
          error: 'brandId est requis'
        });
        return;
      }

      // Vérifier que l'utilisateur a accès à cette marque
      const brand = await Brand.findOne({ 
        _id: brandId, 
        'team.userId': req.user?._id 
      });

      if (!brand) {
        res.status(403).json({
          success: false,
          error: 'Accès non autorisé à cette marque'
        });
        return;
      }

      // 1. Obtenir les prompts optimisés
      const [marketAnalysisPrompt, strategicAnalysisPrompt, recommendationsPrompt] = 
        await Promise.all([
          PromptService.getOptimizedPrompt('gpt', 'marketAnalysis', briefData.sector, briefData),
          PromptService.getOptimizedPrompt('gpt', 'strategicAnalysis', briefData.sector, briefData),
          PromptService.getOptimizedPrompt('gpt', 'recommendations', briefData.sector, briefData)
        ]);

      if (!marketAnalysisPrompt || !strategicAnalysisPrompt || !recommendationsPrompt) {
        res.status(500).json({
          success: false,
          error: 'Erreur lors de la récupération des prompts optimisés'
        });
        return;
      }

      // 2. Générer la stratégie
      const result = await this.executeStrategyGeneration(
        marketAnalysisPrompt,
        strategicAnalysisPrompt,
        recommendationsPrompt,
        briefData,
        options
      );

      // 3. Sauvegarder dans le cache si valide
      if (result.success && result.result?.validation?.isValid && result.metrics) {
        await this.cacheStrategy(briefData, brandId, result.result, result.metrics);
      }

      res.json(result);
    } catch (error) {
      console.error('Erreur lors de la génération de la stratégie:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la génération de la stratégie'
      });
    }
  }

  static async checkCache(req: Request, res: Response): Promise<void> {
    try {
      const { briefData, brandId } = req.body;
      if (!brandId) {
        res.status(400).json({
          success: false,
          error: 'brandId est requis'
        });
        return;
      }
      const cachedStrategy = await this.getCachedStrategy(briefData, brandId);

      if (cachedStrategy) {
        res.json({
          success: true,
          result: cachedStrategy.result,
          metrics: cachedStrategy.metrics
        });
      } else {
        res.json({ success: false });
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du cache:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la vérification du cache'
      });
    }
  }

  static async recordMetrics(req: Request, res: Response): Promise<void> {
    try {
      const { briefData, metrics, success, brandId } = req.body;
      
      if (!brandId) {
        res.status(400).json({
          success: false,
          error: 'brandId est requis'
        });
        return;
      }
      
      await mongoose.connection.collection('strategyMetrics').insertOne({
        sector: briefData.sector,
        brandId: new mongoose.Types.ObjectId(brandId),
        userId: req.user?._id,
        timestamp: new Date(),
        metrics,
        success
      });

      res.json({ success: true });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des métriques:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur lors de l\'enregistrement des métriques'
      });
    }
  }

  private static async executeStrategyGeneration(
    marketAnalysisPrompt: any,
    strategicAnalysisPrompt: any,
    recommendationsPrompt: any,
    briefData: BriefData,
    options: any
  ): Promise<{
    success: boolean;
    result?: any;
    metrics?: StrategyMetrics;
    error?: string;
  }> {
    const startTime = Date.now();
    let tokenCount = 0;

    try {
      // Exécuter les prompts en séquence
      const marketAnalysis = await this.executeGPTPrompt(marketAnalysisPrompt);
      tokenCount += marketAnalysis.tokenCount;

      const strategicAnalysis = await this.executeGPTPrompt(strategicAnalysisPrompt);
      tokenCount += strategicAnalysis.tokenCount;

      const recommendations = await this.executeGPTPrompt(recommendationsPrompt);
      tokenCount += recommendations.tokenCount;

      const result = {
        marketAnalysis: marketAnalysis.content,
        strategicAnalysis: strategicAnalysis.content,
        recommendations: recommendations.content,
        validation: {
          isValid: true,
          score: 100,
          feedback: ['Stratégie générée avec succès']
        }
      };

      const metrics: StrategyMetrics = {
        executionTime: Date.now() - startTime,
        tokenCount,
        retryCount: 0,
        validationScore: 100,
        cacheMiss: true
      };

      return {
        success: true,
        result,
        metrics
      };
    } catch (error) {
      console.error('Erreur lors de l\'exécution de la stratégie:', error);
      return {
        success: false,
        error: 'Erreur lors de l\'exécution de la stratégie'
      };
    }
  }

  private static async executeGPTPrompt(prompt: any): Promise<GPTResponse> {
    if (!this.OPENAI_API_KEY) {
      throw new Error('OpenAI API key non configurée');
    }

    try {
      // Préparer les messages avec un message système pour améliorer la qualité
      const messages = [
        {
          role: 'system',
          content: `Vous êtes un expert en marketing et stratégie digitale.
          Vos réponses doivent être :
          - Très détaillées et structurées
          - Basées sur des données concrètes
          - Orientées résultats
          - Adaptées au secteur d'activité
          - Respectueuses des contraintes légales
          - Optimisées pour les ressources disponibles`
        },
        {
          role: 'user',
          content: prompt.content
        }
      ];

      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4',
        messages,
        max_tokens: 2048,
        temperature: 0.7,
        presence_penalty: 0.3,
        frequency_penalty: 0.3
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.OPENAI_API_KEY}`
        }
      });

      return {
        content: response.data.choices[0].message.content,
        tokenCount: response.data.usage.total_tokens
      };
    } catch (error: any) {
      console.error('Erreur GPT:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error?.message || 'Erreur lors de l\'appel à GPT');
    }
  }

  private static async getCachedStrategy(
    briefData: BriefData,
    brandId: string
  ): Promise<CachedStrategy | null> {
    try {
      const cacheKey = this.generateCacheKey(briefData, brandId);
      const cached = await mongoose.connection.collection('strategyCache').findOne({
        key: cacheKey,
        timestamp: { $gt: new Date(Date.now() - this.CACHE_TTL) }
      });

      return cached as CachedStrategy | null;
    } catch (error) {
      console.error('Erreur lors de la récupération du cache:', error);
      return null;
    }
  }

  private static async cacheStrategy(
    briefData: BriefData,
    brandId: string,
    result: any,
    metrics: StrategyMetrics
  ): Promise<void> {
    try {
      const cacheKey = this.generateCacheKey(briefData, brandId);
      await mongoose.connection.collection('strategyCache').updateOne(
        { key: cacheKey },
        {
          $set: {
            result,
            metrics,
            timestamp: new Date(),
            key: cacheKey
          }
        },
        { upsert: true }
      );
    } catch (error) {
      console.error('Erreur lors de la mise en cache:', error);
    }
  }

  private static generateCacheKey(briefData: BriefData, brandId: string): string {
    const keyElements = [
      brandId,
      briefData.sector,
      briefData.communicationStyle,
      briefData.currentSocialNetworks.sort().join(','),
      briefData.contentTypes.sort().join(','),
      briefData.socialMediaGoals.sort().join(',')
    ];

    return keyElements.join('|');
  }
}
