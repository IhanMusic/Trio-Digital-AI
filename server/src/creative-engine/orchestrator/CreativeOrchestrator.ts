/**
 * 🎭 CREATIVE ORCHESTRATOR
 * 
 * Orchestrateur principal du Creative Engine 2026
 * Coordonne la sélection des presets, contextes et frameworks
 * pour générer des prompts créatifs de qualité Cannes Lions
 */

import { 
  getPresetBySector, 
  getRandomStyleForSector,
  getRandomContextForSector,
  getRandomPaletteForSector
} from '../presets/sectors';
import { 
  SectorPreset, 
  PhotographicStyle, 
  CreativeContext, 
  ColorPalette, 
  CreativeFramework, 
  LightingSetup 
} from '../presets/types';
import { CreativeRequest, CreativeOutput, OrchestratorConfig } from './types';

export class CreativeOrchestrator {
  private config: OrchestratorConfig;
  private usedStyles: Set<string> = new Set();
  private usedContexts: Set<string> = new Set();
  private usedPalettes: Set<string> = new Set();

  constructor(config?: Partial<OrchestratorConfig>) {
    this.config = {
      diversityMode: 'high',
      cannesLionsMinScore: 85,
      maxStyleReuse: 2,
      seasonalAwareness: true,
      culturalAdaptation: true,
      ...config
    };
  }

  /**
   * Génère une direction créative complète pour une requête
   */
  async generateCreativeDirection(request: CreativeRequest): Promise<CreativeOutput> {
    const { brand, product, platform, objective, language = 'fr' } = request;
    
    // 1. Récupérer le preset sectoriel
    const sector = brand.sector || product?.category || 'Agroalimentaire et FMCG';
    const preset = getPresetBySector(sector);
    
    // 2. Sélectionner le style photographique optimal
    const style = this.selectOptimalStyle(preset, request);
    
    // 3. Sélectionner le contexte approprié
    const context = this.selectOptimalContext(preset, request);
    
    // 4. Sélectionner la palette de couleurs
    const palette = this.selectOptimalPalette(preset, request, brand);
    
    // 5. Sélectionner le framework narratif
    const framework = this.selectOptimalFramework(preset, request);
    
    // 6. Sélectionner l'éclairage
    const lighting = this.selectOptimalLighting(preset, request);
    
    // 7. Générer le prompt créatif
    const prompt = this.buildCreativePrompt({
      style,
      context,
      palette,
      framework,
      lighting,
      brand,
      product,
      platform,
      objective,
      language
    });
    
    // 8. Marquer les éléments comme utilisés pour la diversité
    this.markAsUsed(style, context, palette);
    
    return {
      prompt,
      style,
      context,
      palette,
      framework,
      lighting,
      preset,
      metadata: {
        sector,
        cannesLionsScore: style.cannesLionsScore,
        diversityIndex: this.calculateDiversityIndex(),
        generatedAt: new Date().toISOString()
      }
    };
  }

  /**
   * Sélectionne le style photographique optimal
   */
  private selectOptimalStyle(preset: SectorPreset, request: CreativeRequest): PhotographicStyle {
    const { objective } = request;
    
    // Filtrer par score Cannes Lions minimum
    let eligibleStyles = preset.photographicStyles.filter(
      s => (s.cannesLionsScore || 0) >= this.config.cannesLionsMinScore
    );
    
    // Si aucun style ne passe le filtre, prendre tous les styles
    if (eligibleStyles.length === 0) {
      eligibleStyles = [...preset.photographicStyles];
    }
    
    // Si mode diversité élevé, éviter les styles déjà utilisés
    if (this.config.diversityMode === 'high') {
      const unusedStyles = eligibleStyles.filter(s => !this.usedStyles.has(s.name));
      if (unusedStyles.length > 0) {
        eligibleStyles = unusedStyles;
      }
    }
    
    // Prioriser par objectif
    if (objective) {
      const objectiveLower = objective.toLowerCase();
      const matchingStyles = eligibleStyles.filter(s => 
        s.bestFor.some(b => objectiveLower.includes(b.toLowerCase()))
      );
      if (matchingStyles.length > 0) {
        eligibleStyles = matchingStyles;
      }
    }
    
    // Sélection aléatoire pondérée par score
    return this.weightedRandomSelect(eligibleStyles);
  }

  /**
   * Sélectionne le contexte optimal
   */
  private selectOptimalContext(preset: SectorPreset, request: CreativeRequest): CreativeContext {
    const { season } = request;
    
    let eligibleContexts = [...preset.contexts];
    
    // Filtrer par saison si awareness activée
    if (this.config.seasonalAwareness && season) {
      const seasonalContexts = eligibleContexts.filter(c => {
        const seasonalFit = c.seasonalFit || [];
        return seasonalFit.includes('all-seasons') || seasonalFit.includes(season);
      });
      if (seasonalContexts.length > 0) {
        eligibleContexts = seasonalContexts;
      }
    }
    
    // Mode diversité
    if (this.config.diversityMode === 'high') {
      const unusedContexts = eligibleContexts.filter(c => !this.usedContexts.has(c.name));
      if (unusedContexts.length > 0) {
        eligibleContexts = unusedContexts;
      }
    }
    
    // Sélection aléatoire
    return eligibleContexts[Math.floor(Math.random() * eligibleContexts.length)];
  }

  /**
   * Sélectionne la palette de couleurs optimale
   */
  private selectOptimalPalette(preset: SectorPreset, request: CreativeRequest, brand: any): ColorPalette {
    let eligiblePalettes = [...preset.colorPalettes];
    
    // Prioriser les palettes avec bonne intégration de marque
    eligiblePalettes.sort((a, b) => (b.brandIntegration || 0) - (a.brandIntegration || 0));
    
    // Mode diversité
    if (this.config.diversityMode === 'high') {
      const unusedPalettes = eligiblePalettes.filter(p => !this.usedPalettes.has(p.name));
      if (unusedPalettes.length > 0) {
        eligiblePalettes = unusedPalettes;
      }
    }
    
    // Prendre les 3 meilleures et sélectionner aléatoirement
    const topPalettes = eligiblePalettes.slice(0, 3);
    return topPalettes[Math.floor(Math.random() * topPalettes.length)];
  }

  /**
   * Sélectionne le framework narratif optimal
   */
  private selectOptimalFramework(preset: SectorPreset, request: CreativeRequest): CreativeFramework {
    const { objective } = request;
    
    let eligibleFrameworks = [...preset.frameworks];
    
    // Prioriser par objectif
    if (objective) {
      const objectiveLower = objective.toLowerCase();
      const matchingFrameworks = eligibleFrameworks.filter(f => 
        f.bestFor.some(b => objectiveLower.includes(b.toLowerCase()))
      );
      if (matchingFrameworks.length > 0) {
        eligibleFrameworks = matchingFrameworks;
      }
    }
    
    return eligibleFrameworks[Math.floor(Math.random() * eligibleFrameworks.length)];
  }

  /**
   * Sélectionne l'éclairage optimal
   */
  private selectOptimalLighting(preset: SectorPreset, request: CreativeRequest): LightingSetup {
    const { timeOfDay } = request;
    
    let eligibleLighting = [...preset.lightingSetups];
    
    // Filtrer par moment de la journée si spécifié
    if (timeOfDay) {
      const matchingLighting = eligibleLighting.filter(l => 
        l.timeOfDay.toLowerCase().includes(timeOfDay.toLowerCase()) ||
        l.timeOfDay === 'Any' ||
        l.timeOfDay.includes('Any')
      );
      if (matchingLighting.length > 0) {
        eligibleLighting = matchingLighting;
      }
    }
    
    return eligibleLighting[Math.floor(Math.random() * eligibleLighting.length)];
  }

  /**
   * Construit le prompt créatif final
   */
  private buildCreativePrompt(params: {
    style: PhotographicStyle;
    context: CreativeContext;
    palette: ColorPalette;
    framework: CreativeFramework;
    lighting: LightingSetup;
    brand: any;
    product: any;
    platform: string;
    objective: string;
    language: string;
  }): string {
    const { style, context, palette, lighting, brand, product } = params;
    
    const productName = product?.name || brand.name;
    const productDescription = product?.description || brand.description || '';
    
    // Construction du prompt structuré
    const promptParts = [
      // Style photographique
      `${style.category} style, ${style.name}`,
      
      // Éclairage
      `${lighting.characteristics}`,
      
      // Composition
      `${style.composition}`,
      
      // Contexte
      `Setting: ${context.name} - ${context.description}`,
      
      // Produit/Marque
      `Featuring: ${productName}`,
      productDescription ? `Product: ${productDescription}` : '',
      
      // Mood et atmosphère
      `Mood: ${style.mood}`,
      
      // Palette de couleurs
      `Color palette: ${palette.name} - ${palette.mood}`,
      
      // Spécifications techniques
      `Technical: ${style.technicalSpecs}`,
      
      // Qualité
      `Ultra high quality, professional ${style.category.toLowerCase()}, award-winning composition`,
      `Cannes Lions quality, ${style.reference} inspired`,
      
      // Éviter
      'No text, no watermarks, no logos, photorealistic'
    ];
    
    return promptParts.filter(p => p).join('. ');
  }

  /**
   * Sélection aléatoire pondérée par score Cannes Lions
   */
  private weightedRandomSelect(items: PhotographicStyle[]): PhotographicStyle {
    if (items.length === 0) {
      throw new Error('No items to select from');
    }
    
    const totalWeight = items.reduce((sum, item) => sum + (item.cannesLionsScore || 50), 0);
    let random = Math.random() * totalWeight;
    
    for (const item of items) {
      random -= (item.cannesLionsScore || 50);
      if (random <= 0) {
        return item;
      }
    }
    
    return items[items.length - 1];
  }

  /**
   * Marque les éléments comme utilisés
   */
  private markAsUsed(style: PhotographicStyle, context: CreativeContext, palette: ColorPalette): void {
    this.usedStyles.add(style.name);
    this.usedContexts.add(context.name);
    this.usedPalettes.add(palette.name);
  }

  /**
   * Calcule l'index de diversité
   */
  private calculateDiversityIndex(): number {
    const totalUsed = this.usedStyles.size + this.usedContexts.size + this.usedPalettes.size;
    return Math.min(100, totalUsed * 10);
  }

  /**
   * Réinitialise le tracking de diversité
   */
  resetDiversity(): void {
    this.usedStyles.clear();
    this.usedContexts.clear();
    this.usedPalettes.clear();
  }

  /**
   * Génère plusieurs directions créatives pour un calendrier
   */
  async generateCalendarDirections(
    request: CreativeRequest, 
    count: number
  ): Promise<CreativeOutput[]> {
    const outputs: CreativeOutput[] = [];
    
    for (let i = 0; i < count; i++) {
      const output = await this.generateCreativeDirection(request);
      outputs.push(output);
    }
    
    return outputs;
  }
}

// Export singleton
export const creativeOrchestrator = new CreativeOrchestrator();
