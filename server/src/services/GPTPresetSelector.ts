import OpenAI from 'openai';
import { 
  getRelevantPresetsForGPT,
  FilteredPresets,
  CreativePreset
} from './CreativePresetsLibrary';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Système anti-répétition pour améliorer la diversité des presets
 * Évite les répétitions sur les derniers posts générés
 */
class AntiRepetitionPresetSelector {
  private static instance: AntiRepetitionPresetSelector;
  private recentStyles: string[] = [];
  private recentContexts: string[] = [];
  private recentPalettes: string[] = [];
  private maxHistory = 5; // Éviter les répétitions sur les 5 derniers posts

  static getInstance(): AntiRepetitionPresetSelector {
    if (!AntiRepetitionPresetSelector.instance) {
      AntiRepetitionPresetSelector.instance = new AntiRepetitionPresetSelector();
    }
    return AntiRepetitionPresetSelector.instance;
  }

  selectDiversePreset(filteredPresets: any, seed?: number) {
    console.log('[AntiRepetition] Sélection diversifiée des presets');
    
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

    // Si pas assez d'options disponibles, réinitialiser l'historique
    if (availableStyles.length < 3) {
      console.log(`[AntiRepetition] Réinitialisation styles (${availableStyles.length} disponibles)`);
      this.recentStyles = [];
    }
    if (availableContexts.length < 2) {
      console.log(`[AntiRepetition] Réinitialisation contextes (${availableContexts.length} disponibles)`);
      this.recentContexts = [];
    }
    if (availablePalettes.length < 3) {
      console.log(`[AntiRepetition] Réinitialisation palettes (${availablePalettes.length} disponibles)`);
      this.recentPalettes = [];
    }

    // Sélectionner aléatoirement parmi les options disponibles
    const timestamp = Date.now();
    const randomSalt = Math.random() * 1000000;
    const baseSeed = timestamp + randomSalt + (seed || 0);

    const stylesToUse = availableStyles.length > 0 ? availableStyles : filteredPresets.styles;
    const contextsToUse = availableContexts.length > 0 ? availableContexts : filteredPresets.contexts;
    const palettesToUse = availablePalettes.length > 0 ? availablePalettes : filteredPresets.palettes;

    const styleIndex = Math.floor(Math.abs(Math.sin(baseSeed * 7919) * 10000) % stylesToUse.length);
    const contextIndex = Math.floor(Math.abs(Math.sin(baseSeed * 7937) * 10000) % contextsToUse.length);
    const paletteIndex = Math.floor(Math.abs(Math.sin(baseSeed * 7927) * 10000) % palettesToUse.length);
    const frameworkIndex = Math.floor(Math.abs(Math.sin(baseSeed * 7933) * 10000) % filteredPresets.frameworks.length);
    const lightingIndex = Math.floor(Math.abs(Math.sin(baseSeed * 7949) * 10000) % filteredPresets.lightings.length);

    const selectedStyle = stylesToUse[styleIndex];
    const selectedContext = contextsToUse[contextIndex];
    const selectedPalette = palettesToUse[paletteIndex];

    // Ajouter à l'historique
    this.recentStyles.push(selectedStyle.name);
    this.recentContexts.push(selectedContext.name);
    this.recentPalettes.push(selectedPalette.name);

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

    console.log(`[AntiRepetition] Sélectionné: ${selectedStyle.name} + ${selectedContext.name}`);
    console.log(`[AntiRepetition] Historique: ${this.recentStyles.length} styles, ${this.recentContexts.length} contextes`);

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
  calendar: any
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
 * @returns Preset créatif sélectionné par GPT-5, ou null si échec
 */
export async function selectPresetWithGPT(
  filteredPresets: FilteredPresets,
  brand: any,
  product: any,
  calendar: any
): Promise<CreativePreset | null> {
  try {
    console.log('[GPTPresetSelector] Début de la sélection par GPT-5...');
    
    // 1. Construire le prompt
    const prompt = buildPresetSelectionPrompt(filteredPresets, brand, product, calendar);
    
    // 2. Appeler GPT-5
    const completion = await openai.chat.completions.create({
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
      temperature: 0.7, // Un peu de créativité
      max_tokens: 500
    });
    
    const response = completion.choices[0].message.content;
    if (!response) {
      console.error('[GPTPresetSelector] Réponse vide de GPT-5');
      return null;
    }
    
    console.log('[GPTPresetSelector] Réponse GPT-5 reçue');
    
    // 3. Parser la réponse
    const parsed = parseGPTResponse(response);
    if (!parsed) {
      console.error('[GPTPresetSelector] Échec du parsing de la réponse');
      return null;
    }
    
    // 4. Valider les indices
    if (!validateIndices(parsed, filteredPresets)) {
      console.error('[GPTPresetSelector] Indices hors limites');
      return null;
    }
    
    // 5. Composer le preset créatif
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
    
    return preset;
    
  } catch (error) {
    console.error('[GPTPresetSelector] Erreur lors de la sélection:', error);
    return null;
  }
}

/**
 * Fallback amélioré : utilise le système anti-répétition pour garantir la diversité
 * Utilisé si GPT-5 échoue ou si le parsing échoue
 * Évite les répétitions sur les derniers posts générés
 */
export function randomizeFromFilteredPresets(
  filteredPresets: FilteredPresets,
  seed?: number
): CreativePreset {
  console.log('[GPTPresetSelector] Fallback amélioré: utilisation du système anti-répétition');
  
  // Utiliser le système anti-répétition pour garantir la diversité
  const antiRepetitionSelector = AntiRepetitionPresetSelector.getInstance();
  return antiRepetitionSelector.selectDiversePreset(filteredPresets, seed);
}
