import { BriefData } from '../../types/brief';
import { config } from '../../config/env';

export interface ValidationDetail {
  criteriaName: string;
  score: number;
  feedback: string;
  category?: 'technical' | 'creative' | 'advertising';
}

export interface ValidationResult {
  score: number;
  quality: 'low' | 'medium' | 'high';
  details: ValidationDetail[];
  suggestions: string[];
  technicalIssues: string[];
  styleIssues: string[];
  sectorIssues: string[];
  advertisingEffectiveness?: {
    score: number;
    strengths: string[];
    weaknesses: string[];
  };
}

export class ImageValidationService {
  private static readonly CRITERIA_WEIGHTS = {
    // Critères techniques
    composition: 0.15,
    lighting: 0.15,
    color: 0.15,
    sharpness: 0.10,
    style: 0.10,
    
    // Critères publicitaires
    visualImpact: 0.10,
    brandConsistency: 0.10,
    narrativeClarity: 0.05,
    emotionalResonance: 0.05,
    memorability: 0.05
  };

  private static readonly QUALITY_THRESHOLDS = {
    HIGH: 90,
    MEDIUM: 80,
    LOW: 70
  };

  private static readonly MAX_RETRIES = 3;
  private static readonly RETRY_DELAY = 1000;

  private static getAuthHeaders() {
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
      throw new Error('Utilisateur non authentifié');
    }
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userEmail}`
    };
  }

  private static determineQuality(score: number): 'low' | 'medium' | 'high' {
    if (score >= this.QUALITY_THRESHOLDS.HIGH) return 'high';
    if (score >= this.QUALITY_THRESHOLDS.MEDIUM) return 'medium';
    return 'low';
  }

  static async validateImage(
    imageUrl: string,
    briefData: BriefData
  ): Promise<ValidationResult> {
    let retryCount = 0;

    while (retryCount < this.MAX_RETRIES) {
      try {
        const response = await fetch(`${config.apiUrl}/ai/validate-image`, {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify({
            imageUrl,
            briefData,
            criteria: Object.keys(this.CRITERIA_WEIGHTS)
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(`Erreur validation: ${response.status}, details: ${JSON.stringify(errorData)}`);
        }

        const result = await response.json();
        return this.processValidationResult(result, briefData);

      } catch (error) {
        console.error(`Erreur validation image (tentative ${retryCount + 1}):`, error);
        retryCount++;
        if (retryCount < this.MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY));
        }
      }
    }

    console.warn('Utilisation de la validation par défaut après échec des tentatives');
    return this.getDefaultValidationResult();
  }

  private static processValidationResult(
    rawResult: any,
    briefData: BriefData
  ): ValidationResult {
    try {
      const details: ValidationDetail[] = [];
      let totalScore = 0;
      let advertisingScore = 0;
      let advertisingCriteriaCount = 0;

      // Évaluer chaque critère
      Object.entries(this.CRITERIA_WEIGHTS).forEach(([criteria, weight]) => {
        const criteriaScore = this.evaluateCriteria(criteria, rawResult, briefData);
        totalScore += criteriaScore * weight;
        
        // Déterminer la catégorie du critère
        let category: 'technical' | 'creative' | 'advertising' = 'technical';
        if (['visualImpact', 'brandConsistency', 'narrativeClarity', 'emotionalResonance', 'memorability'].includes(criteria)) {
          category = 'advertising';
          advertisingScore += criteriaScore;
          advertisingCriteriaCount++;
        } else if (criteria === 'style') {
          category = 'creative';
        }
        
        details.push({
          criteriaName: criteria,
          score: criteriaScore,
          feedback: this.getFeedback(criteria, criteriaScore),
          category
        });
      });

      const finalScore = Math.round(totalScore);
      const quality = this.determineQuality(finalScore);
      
      // Calculer le score d'efficacité publicitaire
      const avgAdvertisingScore = advertisingCriteriaCount > 0 
        ? Math.round(advertisingScore / advertisingCriteriaCount) 
        : 0;
      
      // Identifier les forces et faiblesses publicitaires
      const adStrengths: string[] = [];
      const adWeaknesses: string[] = [];
      
      details.forEach(detail => {
        if (detail.category === 'advertising') {
          if (detail.score >= this.QUALITY_THRESHOLDS.HIGH) {
            adStrengths.push(`${detail.criteriaName}: ${detail.feedback}`);
          } else if (detail.score < this.QUALITY_THRESHOLDS.MEDIUM) {
            adWeaknesses.push(`${detail.criteriaName}: ${detail.feedback}`);
          }
        }
      });

      return {
        score: finalScore,
        quality,
        details,
        suggestions: this.generateSuggestions(details),
        technicalIssues: this.identifyTechnicalIssues(rawResult),
        styleIssues: this.identifyStyleIssues(rawResult, briefData),
        sectorIssues: this.identifySectorIssues(rawResult, briefData),
        advertisingEffectiveness: {
          score: avgAdvertisingScore,
          strengths: adStrengths,
          weaknesses: adWeaknesses
        }
      };
    } catch (error) {
      console.error('Erreur lors du traitement du résultat de validation:', error);
      return this.getDefaultValidationResult();
    }
  }

  private static evaluateCriteria(
    criteria: string,
    result: any,
    briefData: BriefData
  ): number {
    try {
      // Logique d'évaluation spécifique à chaque critère
      switch (criteria) {
        // Critères techniques
        case 'composition':
          return this.evaluateComposition(result);
        case 'lighting':
          return this.evaluateLighting(result);
        case 'color':
          return this.evaluateColor(result, briefData);
        case 'sharpness':
          return this.evaluateSharpness(result);
        case 'style':
          return this.evaluateStyle(result, briefData);
          
        // Critères publicitaires
        case 'visualImpact':
          return this.evaluateVisualImpact(result, briefData);
        case 'brandConsistency':
          return this.evaluateBrandConsistency(result, briefData);
        case 'narrativeClarity':
          return this.evaluateNarrativeClarity(result, briefData);
        case 'emotionalResonance':
          return this.evaluateEmotionalResonance(result, briefData);
        case 'memorability':
          return this.evaluateMemorability(result, briefData);
          
        default:
          return 70; // Score par défaut acceptable
      }
    } catch (error) {
      console.warn(`Erreur lors de l'évaluation du critère ${criteria}:`, error);
      return 70; // Score par défaut en cas d'erreur
    }
  }

  // Évaluation des critères techniques
  private static evaluateComposition(result: any): number {
    // Vérifier si le résultat contient une évaluation de composition
    if (result?.composition?.score) {
      return result.composition.score;
    }
    
    // Évaluation basée sur les règles de composition publicitaire
    const compositionScore = result?.composition?.details?.reduce((score: number, detail: any) => {
      // Vérifier les règles de composition publicitaire
      if (detail.rule === 'rule_of_thirds' && detail.compliance > 0.8) score += 20;
      if (detail.rule === 'golden_ratio' && detail.compliance > 0.7) score += 15;
      if (detail.rule === 'visual_hierarchy' && detail.compliance > 0.8) score += 20;
      if (detail.rule === 'negative_space' && detail.compliance > 0.7) score += 15;
      if (detail.rule === 'framing' && detail.compliance > 0.8) score += 15;
      if (detail.rule === 'leading_lines' && detail.compliance > 0.7) score += 15;
      return score;
    }, 0);
    
    return compositionScore || 85;
  }

  private static evaluateLighting(result: any): number {
    if (result?.lighting?.score) {
      return result.lighting.score;
    }
    
    // Évaluation basée sur les techniques d'éclairage publicitaire
    const lightingScore = result?.lighting?.details?.reduce((score: number, detail: any) => {
      if (detail.technique === 'dramatic_lighting' && detail.quality > 0.8) score += 20;
      if (detail.technique === 'product_highlighting' && detail.quality > 0.9) score += 25;
      if (detail.technique === 'mood_lighting' && detail.quality > 0.8) score += 20;
      if (detail.technique === 'shadow_control' && detail.quality > 0.7) score += 15;
      if (detail.technique === 'color_temperature' && detail.quality > 0.8) score += 20;
      return score;
    }, 0);
    
    return lightingScore || 80;
  }

  private static evaluateColor(result: any, briefData: BriefData): number {
    if (result?.color?.score) {
      return result.color.score;
    }
    
    // Évaluation basée sur la psychologie des couleurs en publicité
    const colorScore = result?.color?.details?.reduce((score: number, detail: any) => {
      if (detail.aspect === 'brand_consistency' && detail.quality > 0.8) score += 25;
      if (detail.aspect === 'color_harmony' && detail.quality > 0.8) score += 20;
      if (detail.aspect === 'emotional_impact' && detail.quality > 0.7) score += 20;
      if (detail.aspect === 'contrast' && detail.quality > 0.8) score += 15;
      if (detail.aspect === 'saturation' && detail.quality > 0.7) score += 20;
      return score;
    }, 0);
    
    return colorScore || 90;
  }

  private static evaluateSharpness(result: any): number {
    if (result?.sharpness?.score) {
      return result.sharpness.score;
    }
    
    // Évaluation basée sur la netteté et la clarté de l'image
    const sharpnessScore = result?.sharpness?.details?.reduce((score: number, detail: any) => {
      if (detail.aspect === 'focus' && detail.quality > 0.8) score += 25;
      if (detail.aspect === 'detail_preservation' && detail.quality > 0.8) score += 25;
      if (detail.aspect === 'noise_level' && detail.quality > 0.9) score += 20;
      if (detail.aspect === 'edge_definition' && detail.quality > 0.8) score += 15;
      if (detail.aspect === 'texture_clarity' && detail.quality > 0.7) score += 15;
      return score;
    }, 0);
    
    return sharpnessScore || 85;
  }

  private static evaluateStyle(result: any, briefData: BriefData): number {
    if (result?.style?.score) {
      return result.style.score;
    }
    
    // Évaluation basée sur la cohérence du style avec le brief
    const styleScore = result?.style?.details?.reduce((score: number, detail: any) => {
      if (detail.aspect === 'brand_alignment' && detail.quality > 0.8) score += 25;
      if (detail.aspect === 'tone_consistency' && detail.quality > 0.8) score += 25;
      if (detail.aspect === 'aesthetic_quality' && detail.quality > 0.8) score += 20;
      if (detail.aspect === 'visual_language' && detail.quality > 0.7) score += 15;
      if (detail.aspect === 'contemporary_relevance' && detail.quality > 0.7) score += 15;
      return score;
    }, 0);
    
    return styleScore || 85;
  }
  
  // Évaluation des critères publicitaires
  private static evaluateVisualImpact(result: any, briefData: BriefData): number {
    if (result?.advertising?.visualImpact) {
      return result.advertising.visualImpact;
    }
    
    // Évaluation basée sur l'impact visuel publicitaire
    const impactScore = result?.advertising?.details?.reduce((score: number, detail: any) => {
      if (detail.aspect === 'attention_grabbing' && detail.quality > 0.8) score += 25;
      if (detail.aspect === 'visual_hierarchy' && detail.quality > 0.8) score += 20;
      if (detail.aspect === 'stopping_power' && detail.quality > 0.9) score += 25;
      if (detail.aspect === 'focal_point_clarity' && detail.quality > 0.8) score += 15;
      if (detail.aspect === 'visual_tension' && detail.quality > 0.7) score += 15;
      return score;
    }, 0);
    
    return impactScore || 80;
  }
  
  private static evaluateBrandConsistency(result: any, briefData: BriefData): number {
    if (result?.advertising?.brandConsistency) {
      return result.advertising.brandConsistency;
    }
    
    // Évaluation basée sur la cohérence avec l'identité de marque
    const brandScore = result?.advertising?.details?.reduce((score: number, detail: any) => {
      if (detail.aspect === 'visual_identity_alignment' && detail.quality > 0.8) score += 25;
      if (detail.aspect === 'tone_of_voice_match' && detail.quality > 0.8) score += 20;
      if (detail.aspect === 'brand_values_expression' && detail.quality > 0.8) score += 20;
      if (detail.aspect === 'target_audience_relevance' && detail.quality > 0.9) score += 20;
      if (detail.aspect === 'competitive_differentiation' && detail.quality > 0.7) score += 15;
      return score;
    }, 0);
    
    return brandScore || 85;
  }
  
  private static evaluateNarrativeClarity(result: any, briefData: BriefData): number {
    if (result?.advertising?.narrativeClarity) {
      return result.advertising.narrativeClarity;
    }
    
    // Évaluation basée sur la clarté du message publicitaire
    const narrativeScore = result?.advertising?.details?.reduce((score: number, detail: any) => {
      if (detail.aspect === 'message_clarity' && detail.quality > 0.9) score += 25;
      if (detail.aspect === 'storytelling_coherence' && detail.quality > 0.8) score += 20;
      if (detail.aspect === 'concept_communication' && detail.quality > 0.8) score += 20;
      if (detail.aspect === 'visual_metaphor_effectiveness' && detail.quality > 0.7) score += 15;
      if (detail.aspect === 'information_hierarchy' && detail.quality > 0.8) score += 20;
      return score;
    }, 0);
    
    return narrativeScore || 80;
  }
  
  private static evaluateEmotionalResonance(result: any, briefData: BriefData): number {
    if (result?.advertising?.emotionalResonance) {
      return result.advertising.emotionalResonance;
    }
    
    // Évaluation basée sur la résonance émotionnelle
    const emotionalScore = result?.advertising?.details?.reduce((score: number, detail: any) => {
      if (detail.aspect === 'emotional_impact' && detail.quality > 0.8) score += 25;
      if (detail.aspect === 'psychological_appeal' && detail.quality > 0.8) score += 20;
      if (detail.aspect === 'audience_connection' && detail.quality > 0.9) score += 25;
      if (detail.aspect === 'aspiration_alignment' && detail.quality > 0.7) score += 15;
      if (detail.aspect === 'cultural_relevance' && detail.quality > 0.7) score += 15;
      return score;
    }, 0);
    
    return emotionalScore || 85;
  }
  
  private static evaluateMemorability(result: any, briefData: BriefData): number {
    if (result?.advertising?.memorability) {
      return result.advertising.memorability;
    }
    
    // Évaluation basée sur le caractère mémorable de l'image
    const memorabilityScore = result?.advertising?.details?.reduce((score: number, detail: any) => {
      if (detail.aspect === 'distinctiveness' && detail.quality > 0.8) score += 25;
      if (detail.aspect === 'visual_hook' && detail.quality > 0.9) score += 25;
      if (detail.aspect === 'conceptual_stickiness' && detail.quality > 0.8) score += 20;
      if (detail.aspect === 'simplicity_clarity' && detail.quality > 0.8) score += 15;
      if (detail.aspect === 'emotional_connection' && detail.quality > 0.7) score += 15;
      return score;
    }, 0);
    
    return memorabilityScore || 80;
  }

  private static getFeedback(criteria: string, score: number): string {
    // Feedback spécifique pour les critères publicitaires
    if (['visualImpact', 'brandConsistency', 'narrativeClarity', 'emotionalResonance', 'memorability'].includes(criteria)) {
      if (score >= this.QUALITY_THRESHOLDS.HIGH) return 'Niveau Cannes Lions';
      if (score >= this.QUALITY_THRESHOLDS.MEDIUM) return 'Qualité professionnelle';
      if (score >= this.QUALITY_THRESHOLDS.LOW) return 'Standard publicitaire';
      if (score >= 60) return 'Acceptable';
      return 'À améliorer';
    }
    
    // Feedback standard pour les autres critères
    if (score >= this.QUALITY_THRESHOLDS.HIGH) return 'Excellent';
    if (score >= this.QUALITY_THRESHOLDS.MEDIUM) return 'Très bon';
    if (score >= this.QUALITY_THRESHOLDS.LOW) return 'Bon';
    if (score >= 60) return 'Acceptable';
    return 'À améliorer';
  }

  private static generateSuggestions(details: ValidationDetail[]): string[] {
    const suggestions: string[] = [];
    
    // Suggestions pour les critères techniques
    details.filter(detail => detail.category === 'technical' && detail.score < this.QUALITY_THRESHOLDS.LOW)
      .forEach(detail => {
        suggestions.push(`Améliorer ${detail.criteriaName}: ${detail.feedback}`);
      });
    
    // Suggestions pour les critères publicitaires
    details.filter(detail => detail.category === 'advertising' && detail.score < this.QUALITY_THRESHOLDS.MEDIUM)
      .forEach(detail => {
        switch (detail.criteriaName) {
          case 'visualImpact':
            suggestions.push('Renforcer l\'impact visuel avec un point focal plus fort et un contraste plus marqué');
            break;
          case 'brandConsistency':
            suggestions.push('Améliorer la cohérence avec l\'identité de marque et ses valeurs');
            break;
          case 'narrativeClarity':
            suggestions.push('Clarifier le message publicitaire et la narration visuelle');
            break;
          case 'emotionalResonance':
            suggestions.push('Renforcer la connexion émotionnelle avec l\'audience cible');
            break;
          case 'memorability':
            suggestions.push('Ajouter un élément visuel distinctif pour améliorer la mémorabilité');
            break;
          default:
            suggestions.push(`Améliorer ${detail.criteriaName}: ${detail.feedback}`);
        }
      });
    
    return suggestions;
  }

  private static identifyTechnicalIssues(result: any): string[] {
    const issues: string[] = [];
    if (result?.technicalIssues?.length > 0) {
      issues.push(...result.technicalIssues);
    }
    return issues;
  }

  private static identifyStyleIssues(result: any, briefData: BriefData): string[] {
    const issues: string[] = [];
    if (result?.styleIssues?.length > 0) {
      issues.push(...result.styleIssues);
    }
    return issues;
  }

  private static identifySectorIssues(result: any, briefData: BriefData): string[] {
    const issues: string[] = [];
    if (result?.sectorIssues?.length > 0) {
      issues.push(...result.sectorIssues);
    }
    return issues;
  }

  private static getDefaultValidationResult(): ValidationResult {
    const defaultScore = this.QUALITY_THRESHOLDS.LOW;
    return {
      score: defaultScore,
      quality: this.determineQuality(defaultScore),
      details: Object.keys(this.CRITERIA_WEIGHTS).map(criteria => {
        // Déterminer la catégorie du critère
        let category: 'technical' | 'creative' | 'advertising' = 'technical';
        if (['visualImpact', 'brandConsistency', 'narrativeClarity', 'emotionalResonance', 'memorability'].includes(criteria)) {
          category = 'advertising';
        } else if (criteria === 'style') {
          category = 'creative';
        }
        
        return {
          criteriaName: criteria,
          score: defaultScore,
          feedback: 'Score par défaut',
          category
        };
      }),
      suggestions: ['Validation automatique indisponible'],
      technicalIssues: [],
      styleIssues: [],
      sectorIssues: [],
      advertisingEffectiveness: {
        score: defaultScore,
        strengths: [],
        weaknesses: []
      }
    };
  }
}
