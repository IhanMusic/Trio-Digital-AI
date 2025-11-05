import OpenAI from 'openai';
import { 
  getRelevantPresetsForGPT,
  FilteredPresets,
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
 * Système anti-répétition pour améliorer la diversité des presets
 * Évite les répétitions sur les derniers posts générés
 * VERSION CORRIGÉE : Instance par calendrier (pas globale)
 */
class AntiRepetitionPresetSelector {
  private static instances: Map<string, AntiRepetitionPresetSelector> = new Map();
  private recentStyles: string[] = [];
  private recentContexts: string[] = [];
  private recentPalettes: string[] = [];
  private maxHistory = 15; // AUGMENTÉ : Éviter les répétitions sur les 15 derniers posts
  private calendarId: string;

  private constructor(calendarId: string) {
    this.calendarId = calendarId;
    console.log(`[AntiRepetition] 🆕 Nouvelle instance créée pour calendrier: ${calendarId}`);
  }

  static getInstance(calendarId: string): AntiRepetitionPresetSelector {
    if (!AntiRepetitionPresetSelector.instances.has(calendarId)) {
      AntiRepetitionPresetSelector.instances.set(calendarId, new AntiRepetitionPresetSelector(calendarId));
      console.log(`[AntiRepetition] 📊 Instances actives: ${AntiRepetitionPresetSelector.instances.size}`);
    }
    return AntiRepetitionPresetSelector.instances.get(calendarId)!;
  }

  /**
   * Récupère l'historique des presets utilisés pour GPT-5
   */
  getUsedPresetsHistory(): string[] {
    const history: string[] = [];
    
    // Ajouter les styles récents
    this.recentStyles.forEach(style => {
      history.push(`Style: ${style}`);
    });
    
    // Ajouter les contextes récents
    this.recentContexts.forEach(context => {
      history.push(`Context: ${context}`);
    });
    
    // Ajouter les palettes récentes
    this.recentPalettes.forEach(palette => {
      history.push(`Palette: ${palette}`);
    });
    
    return history;
  }

  /**
   * Enregistre un preset utilisé dans l'historique
   */
  recordUsedPreset(preset: CreativePreset) {
    console.log(`[AntiRepetition] 📝 Enregistrement preset: ${preset.style.name} + ${preset.context.name}`);
    
    // Ajouter à l'historique (sera géré par selectDiversePreset si appelé)
    if (!this.recentStyles.includes(preset.style.name)) {
      this.recentStyles.push(preset.style.name);
    }
    if (!this.recentContexts.includes(preset.context.name)) {
      this.recentContexts.push(preset.context.name);
    }
    if (!this.recentPalettes.includes(preset.palette.name)) {
      this.recentPalettes.push(preset.palette.name);
    }
    
    // Maintenir la taille de l'historique
    if (this.recentStyles.length > this.maxHistory) {
      this.recentStyles.shift();
    }
    if (this.recentContexts.length > this.maxHistory) {
      this.recentContexts.shift();
    }
    if (this.recentPalettes.length > this.maxHistory) {
      this.recentPalettes.shift();
    }
  }

  selectDiversePreset(filteredPresets: any, seed?: number, brandId?: string, postIndex?: number) {
    console.log(`[AntiRepetition] 🎨 Sélection diversifiée pour calendrier: ${this.calendarId}`);
    console.log(`[AntiRepetition] 📊 État actuel - Styles: ${this.recentStyles.length}/${this.maxHistory}, Contextes: ${this.recentContexts.length}/${this.maxHistory}`);
    
    // Filtrer les styles récemment utilisés
    const availableStyles = filteredPresets.styles.filter((style: any) => 
      !this.recentStyles.includes(style.name)
    );
    
    const availableContexts = filteredPresets.contexts.filter((context: any) => 
      !this.recentContexts.includes(context.name)
    );
    
    const availablePalettes = filteredPresets.palettes.filter((palette: any) => 
      !this.recentPalettes.includes(palette.name)
    );

    console.log(`[AntiRepetition] 🔍 Options disponibles - Styles: ${availableStyles.length}/${filteredPresets.styles.length}, Contextes: ${availableContexts.length}/${filteredPresets.contexts.length}`);

    // Si pas assez d'options disponibles, réinitialiser l'historique
    if (availableStyles.length < 3) {
      console.log(`[AntiRepetition] 🔄 Réinitialisation styles (${availableStyles.length} disponibles < 3)`);
      this.recentStyles = [];
    }
    if (availableContexts.length < 2) {
      console.log(`[AntiRepetition] 🔄 Réinitialisation contextes (${availableContexts.length} disponibles < 2)`);
      this.recentContexts = [];
    }
    if (availablePalettes.length < 3) {
      console.log(`[AntiRepetition] 🔄 Réinitialisation palettes (${availablePalettes.length} disponibles < 3)`);
      this.recentPalettes = [];
    }

    // CORRECTION CRITIQUE : Seed vraiment unique par marque/calendrier/post
    const timestamp = Date.now();
    const randomSalt = Math.random() * 1000000;
    const brandSeed = brandId ? brandId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
    const calendarSeed = this.calendarId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const baseSeed = timestamp + randomSalt + brandSeed + calendarSeed + (postIndex || 0) + (seed || 0);

    console.log(`[AntiRepetition] 🎲 Seed calculé: ${baseSeed} (timestamp: ${timestamp}, brand: ${brandSeed}, calendar: ${calendarSeed}, post: ${postIndex})`);

    const stylesToUse = availableStyles.length > 0 ? availableStyles : filteredPresets.styles;
    const contextsToUse = availableContexts.length > 0 ? availableContexts : filteredPresets.contexts;
    const palettesToUse = availablePalettes.length > 0 ? availablePalettes : filteredPresets.palettes;

    // Utiliser des multiplicateurs premiers différents pour éviter les corrélations
    const styleIndex = Math.floor(Math.abs(Math.sin(baseSeed * 7919) * 10000) % stylesToUse.length);
    const contextIndex = Math.floor(Math.abs(Math.sin(baseSeed * 8191) * 10000) % contextsToUse.length);
    const paletteIndex = Math.floor(Math.abs(Math.sin(baseSeed * 8209) * 10000) % palettesToUse.length);
    const frameworkIndex = Math.floor(Math.abs(Math.sin(baseSeed * 8221) * 10000) % filteredPresets.frameworks.length);
    const lightingIndex = Math.floor(Math.abs(Math.sin(baseSeed * 8231) * 10000) % filteredPresets.lightings.length);

    const selectedStyle = stylesToUse[styleIndex];
    const selectedContext = contextsToUse[contextIndex];
    const selectedPalette = palettesToUse[paletteIndex];

    console.log(`[AntiRepetition] 🎯 Indices calculés - Style: ${styleIndex}/${stylesToUse.length-1}, Context: ${contextIndex}/${contextsToUse.length-1}`);

    // Ajouter à l'historique
    this.recentStyles.push(selectedStyle.name);
    this.recentContexts.push(selectedContext.name);
    this.recentPalettes.push(selectedPalette.name);

    // Maintenir la taille de l'historique
    if (this.recentStyles.length > this.maxHistory) {
      const removed = this.recentStyles.shift();
      console.log(`[AntiRepetition] 📤 Style retiré de l'historique: ${removed}`);
    }
    if (this.recentContexts.length > this.maxHistory) {
      const removed = this.recentContexts.shift();
      console.log(`[AntiRepetition] 📤 Contexte retiré de l'historique: ${removed}`);
    }
    if (this.recentPalettes.length > this.maxHistory) {
      const removed = this.recentPalettes.shift();
      console.log(`[AntiRepetition] 📤 Palette retirée de l'historique: ${removed}`);
    }

    console.log(`[AntiRepetition] ✅ Sélectionné: "${selectedStyle.name}" + "${selectedContext.name}" + "${selectedPalette.name}"`);
    console.log(`[AntiRepetition] 📈 Nouvel historique - Styles: [${this.recentStyles.slice(-3).join(', ')}...], Contextes: [${this.recentContexts.slice(-3).join(', ')}...]`);

    return {
      style: selectedStyle,
      palette: selectedPalette,
      framework: filteredPresets.frameworks[frameworkIndex],
      context: selectedContext,
      lighting: filteredPresets.lightings[lightingIndex],
      reference: selectedStyle.reference
    };
  }
}

/**
 * Interface pour la réponse parsée de GPT-5
 */
interface ParsedPresetSelection {
  styleIndex: number;
  paletteIndex: number;
  frameworkIndex: number;
  contextIndex: number;
  lightingIndex: number;
  justification?: string;
}

/**
 * Construit le prompt de sélection de preset pour GPT-5
 */
function buildPresetSelectionPrompt(
  filteredPresets: FilteredPresets,
  brand: any,
  product: any,
  calendar: any,
  postIndex: number = 0,
  usedPresets: string[] = []
): string {
  return `Tu es un directeur artistique expert niveau Cannes Lions. Ta mission est de sélectionner le preset créatif optimal pour une publication social media.

CONTEXTE DE LA MARQUE:
Nom: ${brand.name}
Secteur: ${brand.sector}
Positionnement prix: ${brand.pricePositioning || 'Non spécifié'}
Type de business: ${brand.businessType || 'Non spécifié'}
Couleurs de marque: ${brand.colors?.primary || 'Non spécifié'}

CONTEXTE DU PRODUIT:
Nom: ${product.name}
Catégorie: ${product.category}
Description: ${product.description}
Points forts: ${product.uniqueSellingPoints?.join(', ') || 'Non spécifié'}
Bénéfices clients: ${product.customerBenefits?.join(', ') || 'Non spécifié'}
Occasions d'usage: ${product.usageOccasions?.join(', ') || 'Non spécifié'}

CONTEXTE DE LA CAMPAGNE:
Objectif: ${calendar.campaignObjective || 'Non spécifié'}
Thématiques: ${calendar.generationSettings?.themes?.join(', ') || 'Non spécifié'}
Ton: ${calendar.communicationStyle || 'Non spécifié'}

CONTEXTE DE DIVERSITÉ:
Post numéro: ${postIndex + 1}
${usedPresets.length > 0 ? `Presets déjà utilisés dans ce calendrier: ${usedPresets.join(', ')}` : 'Premier post du calendrier'}

⚠️ IMPÉRATIF DIVERSITÉ: ${usedPresets.length > 0 ? 'Tu DOIS sélectionner des éléments DIFFÉRENTS des presets déjà utilisés pour garantir la variété visuelle.' : 'Sélectionne le preset optimal pour ce premier post.'}

═══════════════════════════════════════════════════════════════

STYLES PHOTOGRAPHIQUES DISPONIBLES (${filteredPresets.styles.length}):
${filteredPresets.styles.map((style, i) => `
${i}. ${style.name}
   Catégorie: ${style.category}
   Mood: ${style.mood}
   Référence: ${style.reference.substring(0, 150)}...
`).join('\n')}

PALETTES DE COULEURS (${filteredPresets.palettes.length}):
${filteredPresets.palettes.map((palette, i) => `
${i}. ${palette.name}
   Intégration marque: ${palette.brandIntegration}%
   Description: ${palette.description}
`).join('\n')}

FRAMEWORKS NARRATIFS (${filteredPresets.frameworks.length}):
${filteredPresets.frameworks.map((framework, i) => `
${i}. ${framework.name}
   Structure: ${framework.structure}
   Application: ${framework.application}
`).join('\n')}

CONTEXTES VISUELS (${filteredPresets.contexts.length}):
${filteredPresets.contexts.map((context, i) => `
${i}. ${context.name}
   Description: ${context.description}
`).join('\n')}

SETUPS D'ÉCLAIRAGE (${filteredPresets.lightings.length}):
${filteredPresets.lightings.map((lighting, i) => `
${i}. ${lighting.name}
   Moment: ${lighting.timeOfDay}
   Mood: ${lighting.mood}
   Caractéristiques: ${lighting.characteristics}
`).join('\n')}

═══════════════════════════════════════════════════════════════

⚠️ MISSION: Sélectionne le preset créatif optimal en choisissant:
- 1 style photographique parmi les ${filteredPresets.styles.length} disponibles
- 1 palette de couleurs parmi les ${filteredPresets.palettes.length} disponibles
- 1 framework narratif parmi les ${filteredPresets.frameworks.length} disponibles
- 1 contexte visuel parmi les ${filteredPresets.contexts.length} disponibles
- 1 setup d'éclairage parmi les ${filteredPresets.lightings.length} disponibles

CRITÈRES DE SÉLECTION:
1. Cohérence avec le secteur et le positionnement de la marque
2. Pertinence pour le produit et ses occasions d'usage
3. Alignement avec l'objectif de campagne
4. Créativité et impact visuel (niveau Cannes Lions)
5. Intégration harmonieuse des couleurs de marque
6. 🎯 DIVERSITÉ MAXIMALE: Éviter absolument les répétitions avec les presets déjà utilisés

FORMAT DE RÉPONSE STRICT (ne pas dévier):
---PRESET---
Style: [index du style, ex: 3]
Palette: [index de la palette, ex: 1]
Framework: [index du framework, ex: 0]
Context: [index du contexte, ex: 2]
Lighting: [index de l'éclairage, ex: 4]
Justification: [1 phrase courte expliquant pourquoi ces choix sont optimaux]
---END---

IMPORTANT: Réponds UNIQUEMENT avec le format ci-dessus, sans texte additionnel avant ou après.`;
}

/**
 * Parse la réponse de GPT-5 pour extraire les indices sélectionnés
 */
function parseGPTResponse(response: string): ParsedPresetSelection | null {
  try {
    // Extraire le contenu entre ---PRESET--- et ---END---
    const match = response.match(/---PRESET---([\s\S]*?)---END---/);
    if (!match) {
      console.error('[GPTPresetSelector] Format de réponse invalide: marqueurs non trouvés');
      return null;
    }
    
    const content = match[1].trim();
    
    // Extraire chaque champ
    const styleMatch = content.match(/Style:\s*(\d+)/);
    const paletteMatch = content.match(/Palette:\s*(\d+)/);
    const frameworkMatch = content.match(/Framework:\s*(\d+)/);
    const contextMatch = content.match(/Context:\s*(\d+)/);
    const lightingMatch = content.match(/Lighting:\s*(\d+)/);
    const justificationMatch = content.match(/Justification:\s*(.+)/);
    
    if (!styleMatch || !paletteMatch || !frameworkMatch || !contextMatch || !lightingMatch) {
      console.error('[GPTPresetSelector] Champs manquants dans la réponse');
      return null;
    }
    
    return {
      styleIndex: parseInt(styleMatch[1]),
      paletteIndex: parseInt(paletteMatch[1]),
      frameworkIndex: parseInt(frameworkMatch[1]),
      contextIndex: parseInt(contextMatch[1]),
      lightingIndex: parseInt(lightingMatch[1]),
      justification: justificationMatch ? justificationMatch[1].trim() : undefined
    };
  } catch (error) {
    console.error('[GPTPresetSelector] Erreur lors du parsing:', error);
    return null;
  }
}

/**
 * Valide que les indices sont dans les limites des arrays
 */
function validateIndices(
  parsed: ParsedPresetSelection,
  filteredPresets: FilteredPresets
): boolean {
  return (
    parsed.styleIndex >= 0 && parsed.styleIndex < filteredPresets.styles.length &&
    parsed.paletteIndex >= 0 && parsed.paletteIndex < filteredPresets.palettes.length &&
    parsed.frameworkIndex >= 0 && parsed.frameworkIndex < filteredPresets.frameworks.length &&
    parsed.contextIndex >= 0 && parsed.contextIndex < filteredPresets.contexts.length &&
    parsed.lightingIndex >= 0 && parsed.lightingIndex < filteredPresets.lightings.length
  );
}

/**
 * Fonction principale : demande à GPT-5 de sélectionner le preset optimal
 * @param filteredPresets - Presets pré-filtrés
 * @param brand - Données de la marque
 * @param product - Données du produit
 * @param calendar - Données du calendrier
 * @param postIndex - Index du post (pour diversité)
 * @param calendarId - ID du calendrier (pour historique)
 * @returns Preset créatif sélectionné par GPT-5, ou null si échec
 */
export async function selectPresetWithGPT(
  filteredPresets: FilteredPresets,
  brand: any,
  product: any,
  calendar: any,
  postIndex: number = 0,
  calendarId?: string
): Promise<CreativePreset | null> {
  try {
    console.log('[GPTPresetSelector] Début de la sélection par GPT-5...');
    
    // 1. Récupérer l'historique des presets utilisés pour ce calendrier
    const usedPresets = calendarId ? getUsedPresetsHistory(calendarId) : [];
    console.log(`[GPTPresetSelector] Historique récupéré: ${usedPresets.length} presets utilisés`);
    
    // 2. Construire le prompt avec contexte de diversité
    const prompt = buildPresetSelectionPrompt(filteredPresets, brand, product, calendar, postIndex, usedPresets);
    
    // 3. Appeler GPT-5 avec seed unique pour diversité
    const uniqueSeed = Date.now() + postIndex + (calendarId ? calendarId.length : 0);
    const openaiClient = getOpenAIClient();
    const completion = await openaiClient.chat.completions.create({
      model: 'gpt-4o', // ou 'gpt-4-turbo' selon disponibilité
      messages: [
        {
          role: 'system',
          content: 'Tu es un directeur artistique expert. Réponds uniquement avec le format demandé, sans texte additionnel.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8, // Plus de créativité pour diversité
      max_tokens: 500,
      seed: uniqueSeed // Seed unique pour chaque post
    });
    
    const response = completion.choices[0].message.content;
    if (!response) {
      console.error('[GPTPresetSelector] Réponse vide de GPT-5');
      return null;
    }
    
    console.log('[GPTPresetSelector] Réponse GPT-5 reçue');
    
    // 4. Parser la réponse
    const parsed = parseGPTResponse(response);
    if (!parsed) {
      console.error('[GPTPresetSelector] Échec du parsing de la réponse');
      return null;
    }
    
    // 5. Valider les indices
    if (!validateIndices(parsed, filteredPresets)) {
      console.error('[GPTPresetSelector] Indices hors limites');
      return null;
    }
    
    // 6. Composer le preset créatif
    const preset: CreativePreset = {
      style: filteredPresets.styles[parsed.styleIndex],
      palette: filteredPresets.palettes[parsed.paletteIndex],
      framework: filteredPresets.frameworks[parsed.frameworkIndex],
      context: filteredPresets.contexts[parsed.contextIndex],
      lighting: filteredPresets.lightings[parsed.lightingIndex],
      reference: filteredPresets.styles[parsed.styleIndex].reference
    };
    
    console.log('[GPTPresetSelector] Preset sélectionné avec succès:');
    console.log(`  - Style: ${preset.style.name}`);
    console.log(`  - Palette: ${preset.palette.name}`);
    console.log(`  - Framework: ${preset.framework.name}`);
    console.log(`  - Context: ${preset.context.name}`);
    console.log(`  - Lighting: ${preset.lighting.name}`);
    if (parsed.justification) {
      console.log(`  - Justification: ${parsed.justification}`);
    }
    
    // 7. Enregistrer dans l'historique pour éviter les répétitions futures
    if (calendarId) {
      recordUsedPreset(calendarId, preset);
    }
    
    return preset;
    
  } catch (error) {
    console.error('[GPTPresetSelector] Erreur lors de la sélection:', error);
    return null;
  }
}

/**
 * Récupère l'historique des presets utilisés pour un calendrier donné
 */
function getUsedPresetsHistory(calendarId: string): string[] {
  const antiRepetitionSelector = AntiRepetitionPresetSelector.getInstance(calendarId);
  return antiRepetitionSelector.getUsedPresetsHistory();
}

/**
 * Enregistre un preset utilisé dans l'historique d'un calendrier
 */
function recordUsedPreset(calendarId: string, preset: CreativePreset): void {
  const antiRepetitionSelector = AntiRepetitionPresetSelector.getInstance(calendarId);
  antiRepetitionSelector.recordUsedPreset(preset);
}

/**
 * Fallback amélioré : utilise le système anti-répétition pour garantir la diversité
 * Utilisé si GPT-5 échoue ou si le parsing échoue
 * Évite les répétitions sur les derniers posts générés
 */
export function randomizeFromFilteredPresets(
  filteredPresets: FilteredPresets,
  seed?: number,
  calendarId: string = 'fallback-calendar',
  brandId?: string,
  postIndex?: number
): CreativePreset {
  console.log(`[GPTPresetSelector] 🔄 Fallback amélioré: utilisation du système anti-répétition pour calendrier: ${calendarId}`);
  
  // Utiliser le système anti-répétition pour garantir la diversité
  const antiRepetitionSelector = AntiRepetitionPresetSelector.getInstance(calendarId);
  return antiRepetitionSelector.selectDiversePreset(filteredPresets, seed, brandId, postIndex);
}
