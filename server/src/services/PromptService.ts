import { IPrompt } from '../models/Prompt';
import Prompt from '../models/Prompt';
import { BriefData } from '../types/brief';

interface PromptExecutionResult {
  success: boolean;
  executionTime: number;
  tokenCount: number;
  error?: string;
  output?: any;
}

interface PromptOptimizationMetrics {
  successRate: number;
  averageExecutionTime: number;
  tokenUsage: number;
  errorRate: number;
}

interface CachedResult {
  result: any;
  timestamp: Date;
  key: string;
  metrics: {
    executionTime: number;
    tokenCount: number;
    success: boolean;
  };
}

export class PromptService {
  private static readonly VERSION_PREFIX = 'v';
  private static readonly MIN_SAMPLES_FOR_OPTIMIZATION = 50;
  private static readonly OPTIMIZATION_THRESHOLD = 0.85;
  private static readonly CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

  static async getOptimizedPrompt(
    category: string,
    type: string,
    sector: string,
    context: any
  ): Promise<IPrompt | null> {
    try {
      // Rechercher le prompt le plus performant pour ce secteur
      const prompt = await Prompt.findOne({
        category,
        type,
        isActive: true,
        'sectorConfigs.sector': sector
      })
      .sort({
        'sectorConfigs.performance.successRate': -1,
        'performance.globalSuccessRate': -1
      });

      if (!prompt) {
        console.warn(`No prompt found for category: ${category}, type: ${type}, sector: ${sector}`);
        return null;
      }

      // Appliquer les modifications spécifiques au secteur
      const sectorConfig = prompt.sectorConfigs.find(config => config.sector === sector);
      if (sectorConfig) {
        const currentVersion = prompt.versions.find(v => v.version === prompt.currentVersion);
        if (currentVersion) {
          let modifiedContent = currentVersion.content;

          // Appliquer les modifications du secteur
          sectorConfig.modifications.additions.forEach(addition => {
            modifiedContent += `\n${addition}`;
          });

          sectorConfig.modifications.removals.forEach(removal => {
            modifiedContent = modifiedContent.replace(new RegExp(removal, 'g'), '');
          });

          sectorConfig.modifications.replacements.forEach(replacement => {
            modifiedContent = modifiedContent.replace(
              new RegExp(replacement.from, 'g'),
              replacement.to
            );
          });

          // Mettre à jour la version actuelle avec le contenu modifié
          const modifiedPrompt = prompt;
          const versionIndex = modifiedPrompt.versions.findIndex(
            v => v.version === prompt.currentVersion
          );
          
          if (versionIndex !== -1) {
            modifiedPrompt.versions[versionIndex] = {
              ...currentVersion,
              content: modifiedContent
            };
          }

          return modifiedPrompt;
        }
      }

      return prompt;
    } catch (error) {
      console.error('Error getting optimized prompt:', error);
      return null;
    }
  }

  static async recordExecution(
    promptId: string,
    result: PromptExecutionResult,
    context: any
  ): Promise<void> {
    try {
      const prompt = await Prompt.findById(promptId);
      if (!prompt) return;

      const currentVersion = prompt.versions.find(v => v.version === prompt.currentVersion);
      if (!currentVersion) return;

      // Mettre à jour les métriques de la version
      currentVersion.metrics.totalRuns++;
      if (result.success) {
        currentVersion.metrics.successfulRuns++;
        currentVersion.metrics.lastSuccessfulRun = new Date();
      }
      currentVersion.metrics.averageExecutionTime = 
        (currentVersion.metrics.averageExecutionTime * (currentVersion.metrics.totalRuns - 1) + 
        result.executionTime) / currentVersion.metrics.totalRuns;
      currentVersion.metrics.tokenCount = result.tokenCount;

      // Mettre à jour les métriques globales
      prompt.performance.globalSuccessRate = 
        prompt.versions.reduce((acc, ver) => 
          acc + (ver.metrics.successfulRuns / ver.metrics.totalRuns), 0) / 
        prompt.versions.length;
      prompt.performance.averageExecutionTime = 
        prompt.versions.reduce((acc, ver) => 
          acc + ver.metrics.averageExecutionTime, 0) / 
        prompt.versions.length;

      // Vérifier si une optimisation est nécessaire
      if (this.shouldOptimizePrompt(prompt)) {
        await this.optimizePrompt(prompt);
      }

      await prompt.save();
    } catch (error) {
      console.error('Error recording execution:', error);
    }
  }

  private static shouldOptimizePrompt(prompt: IPrompt): boolean {
    const currentVersion = prompt.versions.find(v => v.version === prompt.currentVersion);
    if (!currentVersion) return false;

    return (
      currentVersion.metrics.totalRuns >= this.MIN_SAMPLES_FOR_OPTIMIZATION &&
      currentVersion.metrics.successRate < this.OPTIMIZATION_THRESHOLD
    );
  }

  private static async optimizePrompt(prompt: IPrompt): Promise<void> {
    try {
      const currentVersion = prompt.versions.find(v => v.version === prompt.currentVersion);
      if (!currentVersion) return;

      // Créer une nouvelle version basée sur les performances
      const newVersion = {
        version: `${this.VERSION_PREFIX}${prompt.versions.length + 1}`,
        content: currentVersion.content,
        metrics: {
          successRate: 0,
          averageExecutionTime: 0,
          tokenCount: 0,
          lastSuccessfulRun: new Date(),
          totalRuns: 0,
          successfulRuns: 0
        },
        createdAt: new Date()
      };

      // Optimisations basées sur les performances
      if (currentVersion.metrics.tokenCount > prompt.parameters.maxTokens * 0.9) {
        // Réduire la verbosité si proche de la limite de tokens
        newVersion.content = this.reduceVerbosity(newVersion.content);
      }

      // Marquer l'ancienne version comme dépréciée
      currentVersion.deprecatedAt = new Date();

      // Ajouter la nouvelle version
      prompt.versions.push(newVersion);
      prompt.currentVersion = newVersion.version;

      // Enregistrer l'historique d'optimisation
      prompt.performance.optimizationHistory.push({
        date: new Date(),
        changes: ['Token optimization', 'Version update'],
        impact: 0 // Sera mesuré après utilisation
      });

      prompt.performance.lastOptimization = new Date();

      await prompt.save();
    } catch (error) {
      console.error('Error optimizing prompt:', error);
    }
  }

  private static reduceVerbosity(content: string): string {
    // Simplifier les instructions répétitives
    return content
      .replace(/\b(please|kindly|would you|could you)\b/gi, '')
      .replace(/\b(ensure|make sure|verify|check)\b/gi, 'ensure')
      .replace(/\b(very|really|extremely|absolutely)\b/gi, '')
      .replace(/\b(necessary|needed|required|mandatory)\b/gi, 'required')
      .replace(/\s+/g, ' ')
      .trim();
  }

  static async getCachedResult(
    category: string,
    type: string,
    context: any
  ): Promise<CachedResult | null> {
    try {
      const prompt = await Prompt.findOne({
        category,
        type,
        isActive: true,
        'caching.enabled': true
      });

      if (!prompt || !prompt.caching.enabled) return null;

      // Construire la clé de cache basée sur le pattern défini
      const cacheKey = prompt.caching.keyPattern
        .map(key => context[key])
        .join(':');

      // Vérifier dans MongoDB si un résultat récent existe
      const cachedResult = await this.findCachedResult(cacheKey, prompt.caching.ttl);
      return cachedResult;
    } catch (error) {
      console.error('Error getting cached result:', error);
      return null;
    }
  }

  private static async findCachedResult(
    cacheKey: string,
    ttl: number
  ): Promise<CachedResult | null> {
    try {
      // Rechercher dans la collection de cache
      const result = await Prompt.db.collection('promptCache').findOne({
        key: cacheKey,
        timestamp: { $gt: new Date(Date.now() - ttl) }
      });

      if (!result) return null;

      return {
        result: result.data,
        timestamp: result.timestamp,
        key: result.key,
        metrics: result.metrics
      };
    } catch (error) {
      console.error('Error finding cached result:', error);
      return null;
    }
  }
}
