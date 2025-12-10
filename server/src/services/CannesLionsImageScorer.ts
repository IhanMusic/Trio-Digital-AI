/**
 * Cannes Lions Image Quality Scorer
 * 
 * Service professionnel d'évaluation de la qualité des images générées
 * Utilise Gemini Vision pour scorer sur 15 critères Cannes Lions
 * 
 * Standards:
 * - Cannes Lions International Festival of Creativity
 * - Professional commercial photography criteria
 * - Anatomical accuracy (medical standards)
 */

import axios from 'axios';
import { logger } from '../config/logger';

export interface DetailedQualityScore {
  overall: number; // 0-100
  anatomicalAccuracy: number;
  compositionExcellence: number;
  lightingMastery: number;
  productFidelity: number;
  technicalSharpness: number;
  colorAccuracy: number;
  realismAuthenticity: number;
  emotionalImpact: number;
  brandIntegration: number;
  detailRichness: number;
  handQuality: number; // Si applicable
  backgroundQuality: number;
  professionalism: number;
  creativeExcellence: number;
  cannesLionsPotential: number;
  
  // 🆕 NOUVEAUX CRITÈRES CANNES LIONS GOLD
  visualStorytelling: number; // Capacité à raconter une histoire visuellement
  textImageCoherence: number; // Cohérence entre le texte et l'image
  memorability: number; // Mémorabilité et impact durable
  culturalRelevance: number; // Pertinence culturelle et contextuelle
  
  // Détails additionnels
  criticalIssues: string[];
  minorImprovements: string[];
  recommendations: string[];
  regenerationRequired: boolean;
  promptAdjustments?: string;
}

export interface ScoredImage {
  url: string;
  width: number;
  height: number;
  variation: number;
  score: DetailedQualityScore;
}

export class CannesLionsImageScorer {
  
  /**
   * Score une image générée selon les critères Cannes Lions
   * @param imageUrl - URL de l'image à scorer
   * @param variation - Numéro de variation
   * @param hasHands - Si l'image contient des mains
   * @param generatedText - Texte généré associé pour évaluer la cohérence (nouveau)
   */
  static async scoreImage(
    imageUrl: string,
    variation: number,
    hasHands: boolean = false,
    generatedText?: string
  ): Promise<DetailedQualityScore> {
    
    logger.info(`📊 Scoring variation ${variation} avec Gemini Vision...`);
    
    try {
      // Construire le prompt de scoring ultra-détaillé avec texte pour cohérence
      const scoringPrompt = this.buildScoringPrompt(hasHands, generatedText);
      
      // Appeler Gemini Vision API pour analyser l'image
      const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
      if (!GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY non configurée');
      }
      
      // Télécharger l'image pour l'envoyer à Gemini Vision
      logger.info('📥 Téléchargement de l\'image pour analyse...');
      const imageResponse = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 30000
      });
      const imageBase64 = Buffer.from(imageResponse.data).toString('base64');
      
      // Appeler Gemini Vision
      logger.info('🔍 Analyse avec Gemini Vision...');
      const visionResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{
            parts: [
              {
                text: scoringPrompt
              },
              {
                inline_data: {
                  mime_type: 'image/jpeg',
                  data: imageBase64
                }
              }
            ]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 60000
        }
      );
      
      // Parser la réponse
      const analysisText = visionResponse.data.candidates[0].content.parts[0].text;
      logger.info('✅ Analyse Gemini Vision reçue');
      
      // Extraire les scores de la réponse
      const score = this.parseScoreResponse(analysisText, hasHands);
      
      logger.info(`📊 Score global: ${score.overall}/100`);
      logger.info(`   - Anatomie: ${score.anatomicalAccuracy}/100`);
      logger.info(`   - Composition: ${score.compositionExcellence}/100`);
      logger.info(`   - Fidélité produit: ${score.productFidelity}/100`);
      if (hasHands) {
        logger.info(`   - Qualité mains: ${score.handQuality}/100`);
      }
      
      if (score.criticalIssues.length > 0) {
        logger.info(`⚠️  Problèmes critiques détectés: ${score.criticalIssues.join(', ')}`);
      }
      
      return score;
      
    } catch (error: any) {
      logger.error('❌ Erreur lors du scoring:', error.message);
      
      // En cas d'erreur, retourner un score par défaut moyen
      return this.getDefaultScore(hasHands);
    }
  }
  
  /**
   * Construit le prompt de scoring ultra-détaillé
   */
  private static buildScoringPrompt(hasHands: boolean, generatedText?: string): string {
    // Section cohérence texte-image si texte fourni
    const textCoherenceSection = generatedText ? `
═══════════════════════════════════════════════════════════════
📝 TEXTE ASSOCIÉ À L'IMAGE (pour évaluation de cohérence):
═══════════════════════════════════════════════════════════════
"${generatedText.substring(0, 500)}"

⚠️ IMPORTANT: Évaluer si l'image reflète fidèlement le message et le ton du texte.
═══════════════════════════════════════════════════════════════
` : '';

    return `You are a professional advertising judge for the Cannes Lions International Festival of Creativity.
Analyze this commercial photography image and provide detailed scoring.

${textCoherenceSection}

═══════════════════════════════════════════════════════════════
CANNES LIONS IMAGE QUALITY ASSESSMENT (19 CRITÈRES)
═══════════════════════════════════════════════════════════════

Score each criterion from 0-100 and provide detailed analysis.

1. ANATOMICAL ACCURACY (0-100):
   ${hasHands ? `
   - Hand anatomy: Count exact number of fingers visible (MUST be 5)
   - Finger structure: Each finger should have proper phalanges
   - Hand proportions: Thumb should be 35% shorter than other digits
   - Grip naturalness: Fingers should curve naturally, not be perfectly straight
   - Skin texture: Should show realistic pores, subtle veins, natural color variation
   - Joint articulation: Knuckles at natural angles, not impossible positions
   ` : '- Body proportions if visible: Golden ratio, realistic posture'}
   Score: [X/100]
   Issues found: [List specific anatomical problems, especially finger count]

2. COMPOSITION EXCELLENCE (0-100):
   - Rule of thirds / Golden ratio application
   - Visual balance and negative space usage
   - Leading lines and focal point clarity
   - Subject positioning and framing
   Score: [X/100]

3. LIGHTING MASTERY (0-100):
   - Professional lighting setup evident
   - Shadows and highlights balanced and intentional
   - Mood and atmosphere successfully created
   - Light direction and quality appropriate
   Score: [X/100]

4. PRODUCT FIDELITY (0-100):
   - Packaging accuracy vs typical product appearance
   - Labels readable and clear
   - Brand colors appear accurate
   - Product shape and proportions correct
   - No distortion or deformation
   Score: [X/100]
   Issues: [List any product discrepancies]

5. TECHNICAL SHARPNESS (0-100):
   - Critical focus on key elements (product, hands if present)
   - No unwanted blur or soft focus
   - Detail preservation in important areas
   - No compression artifacts or noise
   Score: [X/100]

6. COLOR ACCURACY (0-100):
   - Colors appear natural and well-balanced
   - No oversaturation or color casts
   - Professional color grading evident
   - White balance correct
   Score: [X/100]

7. REALISM & AUTHENTICITY (0-100):
   - Looks like real photography, not AI-generated
   - Natural textures and materials
   - Believable scene and context
   - No obvious AI artifacts (weird patterns, impossible physics)
   Score: [X/100]
   Artificial elements detected: [List if any]

8. EMOTIONAL IMPACT (0-100):
   - Evokes desired mood successfully
   - Storytelling is evident and clear
   - Memorable and engaging composition
   - Connects with viewer emotionally
   Score: [X/100]

9. BRAND INTEGRATION (0-100):
   - Product naturally integrated in scene
   - Not overly staged or commercial-looking
   - Brand personality evident through styling
   - Aspirational yet authentic
   Score: [X/100]

10. DETAIL RICHNESS (0-100):
    - Fine texture details visible (fabric, skin, materials)
    - Micro-details present add realism
    - Professional finish quality
    - High resolution appearance
    Score: [X/100]

${hasHands ? `
11. HAND QUALITY (0-100) - CRITICAL:
    - Exact finger count: [State number - MUST be 5]
    - Finger separation: All fingers clearly distinct and separated
    - Natural grip: Grip appears ergonomic and realistic
    - Skin texture: Realistic human skin with pores, slight color variation
    - Proper hand-product interaction: Contact points look natural
    - No mutations: No webbing, fusion, extra digits, or impossible angles
    Score: [X/100]
    Critical hand issues: [List any problems - be very specific about finger count]
` : `
11. OVERALL HUMAN ELEMENTS (0-100):
    - If humans visible, proportions and anatomy correct
    - Natural poses and expressions
    - Realistic skin and features
    Score: [X/100]
`}

12. BACKGROUND QUALITY (0-100):
    - Appropriate context that enhances subject
    - Not distracting or competing for attention
    - Depth of field correctly applied
    - Colors complement the subject
    Score: [X/100]

13. PROFESSIONALISM (0-100):
    - Could be used in a real advertising campaign
    - Meets commercial photography standards
    - No amateur mistakes or obvious flaws
    - Publication-ready quality
    Score: [X/100]

14. CREATIVE EXCELLENCE (0-100):
    - Original and fresh approach
    - Not generic or cliché
    - Shows creative thinking and vision
    - Memorable and distinctive
    Score: [X/100]

15. OVERALL CANNES LIONS POTENTIAL (0-100):
    - Would this win at Cannes Lions?
    - Professional campaign-worthy?
    - Breakthrough creative quality?
    - Ready for global advertising?
    Score: [X/100]

🆕 16. VISUAL STORYTELLING (0-100):
    - Does the image tell a clear story without words?
    - Narrative elements present and coherent
    - Emotional journey evident in the composition
    - Viewer can understand the context and message instantly
    - Story arc visible (beginning, middle, end suggested)
    Score: [X/100]
    Story detected: [Describe the visual narrative]

🆕 17. TEXT-IMAGE COHERENCE (0-100):
    ${generatedText ? `
    - Does the image perfectly match the text message?
    - Visual elements align with text descriptions
    - Mood and tone consistent between text and image
    - No contradictions or mismatches
    - Synergy creates stronger combined impact
    ` : '- N/A (no text provided for comparison)'}
    Score: [X/100]
    ${generatedText ? 'Coherence analysis: [Explain how image matches or differs from text]' : ''}

🆕 18. MEMORABILITY (0-100):
    - Will viewers remember this image 24-48 hours later?
    - Unique visual hook or distinctive element present
    - Not generic or forgettable
    - Creates lasting impression through originality
    - "Thumb-stopping" power on social media
    Score: [X/100]
    Memorable elements: [What makes this image stick in memory?]

🆕 19. CULTURAL RELEVANCE (0-100):
    - Appropriate for target culture and context
    - No cultural insensitivity or stereotypes
    - Resonates with intended audience values
    - Timely and contextually aware
    - Universal appeal vs. culturally specific (as appropriate)
    Score: [X/100]
    Cultural notes: [Any cultural considerations observed]

═══════════════════════════════════════════════════════════════
SUMMARY & RECOMMENDATIONS
═══════════════════════════════════════════════════════════════

OVERALL AVERAGE SCORE: [Calculate average of all 19 scores]

CRITICAL ISSUES (Score < 70, requires regeneration):
[List issues that are deal-breakers and require image regeneration]

MINOR IMPROVEMENTS (Score 70-85):
[List issues that could be enhanced but don't require regeneration]

RECOMMENDATIONS:
[Specific suggestions if score < 85]

REGENERATION REQUIRED: [YES/NO]
If YES, prompt adjustments needed: [Specific instructions]

Please provide your analysis in this structured format, being especially strict about:
- Finger count (must be exactly 5 if hands visible)
- Product accuracy
- Anatomical correctness
- AI artifacts

Be honest and critical - this is for Cannes Lions level quality.`;
  }
  
  /**
   * Parse la réponse de Gemini Vision et extrait les scores
   */
  private static parseScoreResponse(text: string, hasHands: boolean): DetailedQualityScore {
    
    // Fonction helper pour extraire un score
    const extractScore = (text: string, criterion: string): number => {
      const patterns = [
        new RegExp(`${criterion}.*?(?:Score:|:)\\s*(\\d+)(?:/100)?`, 'i'),
        new RegExp(`${criterion}.*?(\\d+)(?:/100)`, 'i'),
        new RegExp(`\\d+\\.\\s*${criterion}.*?(\\d+)`, 'i')
      ];
      
      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
          const score = parseInt(match[1]);
          if (score >= 0 && score <= 100) {
            return score;
          }
        }
      }
      
      // Score par défaut si non trouvé
      return 75;
    };
    
    // Extraire tous les scores (15 originaux + 4 nouveaux = 19 critères)
    const scores = {
      anatomicalAccuracy: extractScore(text, 'ANATOMICAL ACCURACY'),
      compositionExcellence: extractScore(text, 'COMPOSITION EXCELLENCE'),
      lightingMastery: extractScore(text, 'LIGHTING MASTERY'),
      productFidelity: extractScore(text, 'PRODUCT FIDELITY'),
      technicalSharpness: extractScore(text, 'TECHNICAL SHARPNESS'),
      colorAccuracy: extractScore(text, 'COLOR ACCURACY'),
      realismAuthenticity: extractScore(text, 'REALISM & AUTHENTICITY'),
      emotionalImpact: extractScore(text, 'EMOTIONAL IMPACT'),
      brandIntegration: extractScore(text, 'BRAND INTEGRATION'),
      detailRichness: extractScore(text, 'DETAIL RICHNESS'),
      handQuality: hasHands ? extractScore(text, 'HAND QUALITY') : 100,
      backgroundQuality: extractScore(text, 'BACKGROUND QUALITY'),
      professionalism: extractScore(text, 'PROFESSIONALISM'),
      creativeExcellence: extractScore(text, 'CREATIVE EXCELLENCE'),
      cannesLionsPotential: extractScore(text, 'CANNES LIONS POTENTIAL'),
      // 🆕 NOUVEAUX CRITÈRES CANNES LIONS GOLD
      visualStorytelling: extractScore(text, 'VISUAL STORYTELLING'),
      textImageCoherence: extractScore(text, 'TEXT-IMAGE COHERENCE'),
      memorability: extractScore(text, 'MEMORABILITY'),
      culturalRelevance: extractScore(text, 'CULTURAL RELEVANCE')
    };
    
    // Calculer le score global (moyenne)
    const scoreValues = Object.values(scores);
    const overall = Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length);
    
    // Extraire les problèmes critiques
    const criticalIssues: string[] = [];
    const criticalMatch = text.match(/CRITICAL ISSUES[\s\S]*?:([\s\S]*?)(?:MINOR IMPROVEMENTS|RECOMMENDATIONS|$)/i);
    if (criticalMatch && criticalMatch[1]) {
      const issues = criticalMatch[1]
        .split(/[-•\n]/)
        .map(s => s.trim())
        .filter(s => s.length > 10 && !s.startsWith('['));
      criticalIssues.push(...issues);
    }
    
    // Extraire les améliorations mineures
    const minorImprovements: string[] = [];
    const minorMatch = text.match(/MINOR IMPROVEMENTS[\s\S]*?:([\s\S]*?)(?:RECOMMENDATIONS|REGENERATION|$)/i);
    if (minorMatch && minorMatch[1]) {
      const improvements = minorMatch[1]
        .split(/[-•\n]/)
        .map(s => s.trim())
        .filter(s => s.length > 10 && !s.startsWith('['));
      minorImprovements.push(...improvements);
    }
    
    // Extraire les recommandations
    const recommendations: string[] = [];
    const recoMatch = text.match(/RECOMMENDATIONS[\s\S]*?:([\s\S]*?)(?:REGENERATION|$)/i);
    if (recoMatch && recoMatch[1]) {
      const recos = recoMatch[1]
        .split(/[-•\n]/)
        .map(s => s.trim())
        .filter(s => s.length > 10 && !s.startsWith('['));
      recommendations.push(...recos);
    }
    
    // Déterminer si régénération nécessaire
    const regenerationRequired = 
      overall < 75 || 
      scores.anatomicalAccuracy < 70 || 
      scores.handQuality < 70 || 
      scores.productFidelity < 70 ||
      criticalIssues.length > 0;
    
    // Extraire les ajustements de prompt si nécessaire
    let promptAdjustments: string | undefined;
    const adjustMatch = text.match(/prompt adjustments needed:([\s\S]*?)(?:\n\n|$)/i);
    if (adjustMatch && adjustMatch[1]) {
      promptAdjustments = adjustMatch[1].trim();
    }
    
    return {
      overall,
      ...scores,
      criticalIssues: criticalIssues.slice(0, 5), // Max 5
      minorImprovements: minorImprovements.slice(0, 5),
      recommendations: recommendations.slice(0, 5),
      regenerationRequired,
      promptAdjustments
    };
  }
  
  /**
   * Retourne un score par défaut en cas d'erreur
   */
  private static getDefaultScore(hasHands: boolean): DetailedQualityScore {
    return {
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
      handQuality: hasHands ? 75 : 100,
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
      recommendations: ['Scoring failed - using default scores'],
      regenerationRequired: false
    };
  }
  
  /**
   * Compare plusieurs images scorées et retourne la meilleure
   */
  static selectBestImage(scoredImages: ScoredImage[]): ScoredImage {
    if (scoredImages.length === 0) {
      throw new Error('Aucune image à comparer');
    }
    
    if (scoredImages.length === 1) {
      return scoredImages[0];
    }
    
    logger.info(`\n🏆 Sélection de la meilleure image parmi ${scoredImages.length} variations...`);
    
    // Trier par score global décroissant
    const sorted = [...scoredImages].sort((a, b) => {
      // Priorité 1: Score global
      if (b.score.overall !== a.score.overall) {
        return b.score.overall - a.score.overall;
      }
      
      // Priorité 2: Pas de problèmes critiques
      if (a.score.criticalIssues.length !== b.score.criticalIssues.length) {
        return a.score.criticalIssues.length - b.score.criticalIssues.length;
      }
      
      // Priorité 3: Anatomie (surtout mains)
      if (b.score.anatomicalAccuracy !== a.score.anatomicalAccuracy) {
        return b.score.anatomicalAccuracy - a.score.anatomicalAccuracy;
      }
      
      // Priorité 4: Fidélité produit
      if (b.score.productFidelity !== a.score.productFidelity) {
        return b.score.productFidelity - a.score.productFidelity;
      }
      
      // Priorité 5: Potentiel Cannes Lions
      return b.score.cannesLionsPotential - a.score.cannesLionsPotential;
    });
    
    const best = sorted[0];
    
    logger.info(`✅ Meilleure image sélectionnée: Variation ${best.variation}`);
    logger.info(`   Score: ${best.score.overall}/100`);
    logger.info(`   Anatomie: ${best.score.anatomicalAccuracy}/100`);
    logger.info(`   Produit: ${best.score.productFidelity}/100`);
    logger.info(`   Cannes Lions: ${best.score.cannesLionsPotential}/100`);
    
    if (best.score.criticalIssues.length > 0) {
      logger.info(`   ⚠️  Problèmes: ${best.score.criticalIssues.slice(0, 2).join(', ')}`);
    }
    
    // Logger les autres variations pour comparaison
    sorted.slice(1).forEach((img, idx) => {
      logger.info(`   Variation ${img.variation} (rejetée): ${img.score.overall}/100`);
    });
    
    return best;
  }
}
