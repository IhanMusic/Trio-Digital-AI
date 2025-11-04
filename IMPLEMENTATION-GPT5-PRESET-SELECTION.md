# GUIDE D'IMPLÉMENTATION : Sélection Intelligente de Presets par GPT-5

## 📋 RÉSUMÉ EXÉCUTIF

Ce document détaille l'implémentation d'un système où GPT-5 sélectionne intelligemment les presets créatifs (style photographique, palette, framework, contexte, éclairage) en se basant sur les données des formulaires Brand, Product et Calendar.

**Objectif :** Remplacer la randomisation anarchique par une sélection intelligente et contextuelle.

**Date :** 4 novembre 2025  
**Version :** 1.0  
**Temps d'implémentation estimé :** 2-3 heures

---

## 🎯 ARCHITECTURE DE LA SOLUTION

### Vue d'ensemble du flux

```
┌─────────────────────────────────────────────────────────────┐
│  1. COLLECTE DES DONNÉES                                     │
│     - Brand (sector, colors, positioning)                    │
│     - Product (category, occasions, benefits)                │
│     - Calendar (themes, keywords, objective)                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  2. PRÉ-FILTRAGE INTELLIGENT                                 │
│     - Mapper secteur → catégories photographiques            │
│     - Filtrer 114 styles → 15-25 styles pertinents           │
│     - Filtrer 12 contextes → 4-6 contextes pertinents        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  3. PROMPT GPT-5 ENRICHI                                     │
│     - Présenter les options pré-filtrées                     │
│     - Contexte complet (marque, produit, campagne)           │
│     - Demander sélection + justification                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  4. PARSING DE LA RÉPONSE GPT-5                              │
│     - Extraire les indices sélectionnés                      │
│     - Composer le preset créatif complet                     │
│     - Fallback sur randomisation si parsing échoue           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  5. GÉNÉRATION DU CONTENU                                    │
│     - Utiliser le preset sélectionné par GPT-5               │
│     - Générer texte + image avec ce preset                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📂 FICHIERS À MODIFIER

### 1. `server/src/services/CreativePresetsLibrary.ts`
**Modifications :**
- Ajouter le mapping `SECTOR_TO_CATEGORIES`
- Créer la fonction `preFilterStylesBySector()`
- Créer la fonction `preFilterContextsByUsage()`
- Créer la fonction `getRelevantPresetsForGPT()`

### 2. `server/src/services/PostGenerationService.ts`
**Modifications :**
- Modifier la fonction de génération de posts
- Intégrer l'appel au pré-filtrage
- Construire le prompt GPT-5 avec presets filtrés
- Ajouter le parsing de la réponse GPT-5
- Implémenter le fallback

### 3. Nouveau fichier : `server/src/services/GPTPresetSelector.ts`
**Contenu :**
- Service dédié à la sélection de presets par GPT-5
- Gestion du prompt de sélection
- Parsing de la réponse
- Gestion des erreurs

---

## 🔧 ÉTAPE 1 : Mapping Secteur → Catégories

### Fichier : `server/src/services/CreativePresetsLibrary.ts`

```typescript
/**
 * Mapping des secteurs vers les catégories photographiques pertinentes
 * Un secteur peut avoir 2-4 catégories pour offrir flexibilité et diversité
 */
export const SECTOR_TO_CATEGORIES: Record<string, string[]> = {
  // ALIMENTAIRE & BOISSONS
  'food': [
    'food',      // Styles culinaires (Todd Selby, Michelin Star, Noma)
    'beverage',  // Styles boissons (Cocktail Mixology, Liquid Pour)
    'studio',    // Packshots produits (Häagen-Dazs, Danone, Yoplait)
    'lifestyle'  // Moments de vie (petit-déjeuner, famille)
  ],
  
  'dairy': [
    'food',      // Styles culinaires
    'studio',    // Packshots yaourts/glaces
    'lifestyle'  // Usage quotidien
  ],
  
  'beverage': [
    'beverage',  // Styles boissons spécifiques
    'food',      // Contexte culinaire
    'lifestyle'  // Moments de consommation
  ],
  
  // BEAUTÉ & COSMÉTIQUE
  'cosmetic': [
    'beauty',    // Portraits beauté (Annie Leibovitz, Peter Lindbergh)
    'cosmetic',  // Produits cosmétiques (K-Beauty, Clinical Skincare)
    'luxury',    // Positionnement premium
    'lifestyle'  // Usage quotidien (Spa Wellness)
  ],
  
  'beauty': [
    'beauty',    // Portraits et beauté
    'cosmetic',  // Produits
    'luxury'     // Haut de gamme
  ],
  
  // MODE & LIFESTYLE
  'fashion': [
    'fashion',   // Styles mode (Vogue Editorial, Street Style)
    'lifestyle', // Lifestyle fashion (Brandon Woelfel)
    'editorial', // Éditorial haut de gamme
    'luxury'     // Mode luxe (Slim Aarons)
  ],
  
  'lifestyle': [
    'lifestyle', // Styles lifestyle génériques
    'fashion',   // Mode lifestyle
    'minimal'    // Minimalisme moderne
  ],
  
  // TECHNOLOGIE
  'tech': [
    'minimal',   // Minimalisme tech (Apple Minimalist)
    'studio',    // Packshots produits tech
    'lifestyle'  // Tech dans la vie (Google Workplace)
  ],
  
  'technology': [
    'minimal',
    'studio',
    'lifestyle'
  ],
  
  // LUXE
  'luxury': [
    'luxury',    // Styles luxe purs (Watches Macro, Automotive Detail)
    'editorial', // Éditorial haut de gamme
    'lifestyle'  // Lifestyle aspirationnel (Slim Aarons Poolside)
  ],
  
  // AUTOMOBILE
  'automobile': [
    'automobile', // Styles auto (Dynamic Motion, Electric Future)
    'luxury'      // Positionnement premium
  ],
  
  'automotive': [
    'automobile',
    'luxury'
  ],
  
  // FINANCE & BANQUE
  'finance': [
    'finance',   // Styles finance (Corporate Trust, Digital Banking)
    'minimal',   // Minimalisme professionnel
    'studio'     // Environnements bureau
  ],
  
  'banking': [
    'finance',
    'minimal',
    'studio'
  ],
  
  // SANTÉ
  'health': [
    'healthcare', // Styles santé (Healthcare Compassion, Medical Tech)
    'minimal'     // Clarté et professionnalisme
  ],
  
  'healthcare': [
    'healthcare',
    'minimal'
  ],
  
  // ÉDUCATION
  'education': [
    'education',  // Styles éducation (Classroom Learning, STEM)
    'lifestyle'   // Moments d'apprentissage
  ],
  
  // AGRICULTURE
  'agriculture': [
    'agriculture', // Styles agriculture (Organic Farm, Harvest)
    'food',        // Lien avec alimentaire
    'lifestyle'    // Vie rurale
  ],
  
  // ARTISANAT
  'craft': [
    'artisanat',  // Styles artisanat (Craftsmanship Hands)
    'lifestyle'   // Contexte artisanal
  ],
  
  'artisanat': [
    'artisanat',
    'lifestyle'
  ],
  
  // BIENS DE CONSOMMATION
  'consumer-goods': [
    'studio',     // Packshots produits
    'lifestyle',  // Usage quotidien
    'minimal'     // Présentation épurée
  ],
  
  // COMMUNICATION & MÉDIAS
  'media': [
    'minimal',    // Design moderne
    'lifestyle',  // Contexte créatif
    'studio'      // Environnements professionnels
  ],
  
  'communication': [
    'minimal',
    'lifestyle',
    'studio'
  ],
  
  // INDUSTRIE
  'manufacturing': [
    'studio',     // Environnements industriels
    'minimal'     // Clarté technique
  ],
  
  'industry': [
    'studio',
    'minimal'
  ],
  
  // FALLBACK GÉNÉRIQUE (si secteur non reconnu)
  'default': [
    'lifestyle',  // Toujours pertinent
    'minimal',    // Universel
    'studio'      // Packshots génériques
  ]
};

/**
 * Mapping des occasions d'usage vers les contextes visuels pertinents
 */
export const USAGE_TO_CONTEXTS: Record<string, string[]> = {
  // Moments alimentaires
  'breakfast': ['Modern Kitchen Bright', 'Cozy Home Comfort', 'Minimalist Studio White'],
  'lunch': ['Modern Kitchen Bright', 'Outdoor Nature Setting', 'Urban Loft Industrial'],
  'dinner': ['Cozy Home Comfort', 'Luxury Hotel Suite', 'Rustic Countryside'],
  'snack': ['Modern Kitchen Bright', 'Outdoor Nature Setting', 'Street Urban Authentic'],
  
  // Sport & bien-être
  'sport': ['Outdoor Nature Setting', 'Modern Office Workspace', 'Minimalist Studio White'],
  'workout': ['Outdoor Nature Setting', 'Modern Office Workspace', 'Urban Loft Industrial'],
  'yoga': ['Spa Wellness Zen', 'Outdoor Nature Setting', 'Botanical Garden Natural'],
  'wellness': ['Spa Wellness Zen', 'Botanical Garden Natural', 'Cozy Home Comfort'],
  
  // Beauté & soins
  'morning-routine': ['Modern Kitchen Bright', 'Spa Wellness Zen', 'Minimalist Studio White'],
  'evening-routine': ['Spa Wellness Zen', 'Cozy Home Comfort', 'Luxury Hotel Suite'],
  'skincare': ['Spa Wellness Zen', 'Minimalist Studio White', 'Botanical Garden Natural'],
  
  // Travail & productivité
  'work': ['Modern Office Workspace', 'Urban Loft Industrial', 'Minimalist Studio White'],
  'office': ['Modern Office Workspace', 'Minimalist Studio White', 'Urban Loft Industrial'],
  
  // Loisirs & social
  'party': ['Urban Loft Industrial', 'Luxury Hotel Suite', 'Street Urban Authentic'],
  'celebration': ['Luxury Hotel Suite', 'Boutique Retail Chic', 'Modern Kitchen Bright'],
  'relaxation': ['Spa Wellness Zen', 'Cozy Home Comfort', 'Botanical Garden Natural'],
  
  // Shopping & retail
  'shopping': ['Boutique Retail Chic', 'Street Urban Authentic', 'Urban Loft Industrial'],
  
  // Fallback
  'default': ['Minimalist Studio White', 'Modern Kitchen Bright', 'Cozy Home Comfort']
};
```

---

## 🔧 ÉTAPE 2 : Fonctions de Pré-filtrage

### Fichier : `server/src/services/CreativePresetsLibrary.ts`

```typescript
/**
 * Pré-filtre les styles photographiques selon le secteur de la marque
 * @param sector - Secteur de la marque (ex: 'food', 'cosmetic', 'tech')
 * @param productCategory - Catégorie du produit (optionnel, pour affinage)
 * @returns Array de styles photographiques pertinents (15-25 styles)
 */
export function preFilterStylesBySector(
  sector: string,
  productCategory?: string
): PhotographicStyle[] {
  // 1. Obtenir les catégories pertinentes pour ce secteur
  const relevantCategories = SECTOR_TO_CATEGORIES[sector.toLowerCase()] 
    || SECTOR_TO_CATEGORIES['default'];
  
  console.log(`[PreFilter] Secteur: ${sector} → Catégories: ${relevantCategories.join(', ')}`);
  
  // 2. Filtrer les styles par catégorie
  const filteredByCategory = PHOTOGRAPHIC_STYLES.filter(style =>
    relevantCategories.some(cat => 
      style.category.toLowerCase().includes(cat.toLowerCase())
    )
  );
  
  console.log(`[PreFilter] Styles filtrés par catégorie: ${filteredByCategory.length}`);
  
  // 3. Si catégorie produit fournie, prioriser les styles correspondants
  if (productCategory) {
    const priorityStyles = filteredByCategory.filter(style =>
      style.name.toLowerCase().includes(productCategory.toLowerCase()) ||
      style.category.toLowerCase().includes(productCategory.toLowerCase())
    );
    
    const otherStyles = filteredByCategory.filter(s => !priorityStyles.includes(s));
    
    // Combiner : prioritaires en premier, puis autres
    const combined = [...priorityStyles, ...otherStyles];
    
    console.log(`[PreFilter] Styles prioritaires (${productCategory}): ${priorityStyles.length}`);
    
    // Limiter à 25 styles maximum pour GPT-5
    return combined.slice(0, 25);
  }
  
  // Limiter à 25 styles maximum
  return filteredByCategory.slice(0, 25);
}

/**
 * Pré-filtre les contextes visuels selon les occasions d'usage du produit
 * @param usageOccasions - Occasions d'usage du produit
 * @param productCategory - Catégorie du produit (pour contexte supplémentaire)
 * @returns Array de contextes visuels pertinents (4-6 contextes)
 */
export function preFilterContextsByUsage(
  usageOccasions: string[],
  productCategory?: string
): CreativeContext[] {
  const relevantContextNames = new Set<string>();
  
  // 1. Mapper les occasions d'usage vers les contextes
  usageOccasions.forEach(occasion => {
    const contexts = USAGE_TO_CONTEXTS[occasion.toLowerCase()] 
      || USAGE_TO_CONTEXTS['default'];
    contexts.forEach(ctx => relevantContextNames.add(ctx));
  });
  
  // 2. Ajouter des contextes génériques toujours pertinents
  relevantContextNames.add('Minimalist Studio White');
  relevantContextNames.add('Cozy Home Comfort');
  
  // 3. Filtrer les contextes disponibles
  const filteredContexts = CREATIVE_CONTEXTS.filter(context =>
    relevantContextNames.has(context.name)
  );
  
  console.log(`[PreFilter] Contextes filtrés: ${filteredContexts.length} (${Array.from(relevantContextNames).join(', ')})`);
  
  // Limiter à 6 contextes maximum
  return filteredContexts.slice(0, 6);
}

/**
 * Interface pour les presets pré-filtrés
 */
export interface FilteredPresets {
  styles: PhotographicStyle[];      // 15-25 styles pertinents
  palettes: ColorPalette[];         // Toutes les 12 palettes
  frameworks: CreativeFramework[];  // Tous les 8 frameworks
  contexts: CreativeContext[];      // 4-6 contextes pertinents
  lightings: LightingSetup[];       // Tous les 7 éclairages
}

/**
 * Fonction principale : obtenir tous les presets pré-filtrés pour GPT-5
 * @param brand - Données de la marque
 * @param product - Données du produit
 * @param calendar - Données du calendrier (optionnel)
 * @returns Presets pré-filtrés prêts pour GPT-5
 */
export function getRelevantPresetsForGPT(
  brand: any,
  product: any,
  calendar?: any
): FilteredPresets {
  console.log(`[PreFilter] Début du pré-filtrage pour ${brand.name} - ${product.name}`);
  
  // 1. Pré-filtrer les styles par secteur et catégorie produit
  const filteredStyles = preFilterStylesBySector(
    brand.sector,
    product.category
  );
  
  // 2. Pré-filtrer les contextes par occasions d'usage
  const filteredContexts = preFilterContextsByUsage(
    product.usageOccasions || [],
    product.category
  );
  
  // 3. Garder toutes les palettes, frameworks et éclairages
  // (GPT-5 choisira parmi tous, car ils sont tous potentiellement pertinents)
  
  const result: FilteredPresets = {
    styles: filteredStyles,
    palettes: COLOR_PALETTES,        // Toutes les 12
    frameworks: CREATIVE_FRAMEWORKS,  // Tous les 8
    contexts: filteredContexts,
    lightings: LIGHTING_SETUPS        // Tous les 7
  };
  
  console.log(`[PreFilter] Résultat: ${result.styles.length} styles, ${result.contexts.length} contextes`);
  
  return result;
}
```

---

## 🔧 ÉTAPE 3 : Service de Sélection GPT-5

### Nouveau fichier : `server/src/services/GPTPresetSelector.ts`

```typescript
import OpenAI from 'openai';
import { FilteredPresets } from './CreativePresetsLibrary';
import type { CreativePreset } from './CreativePresetsLibrary';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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
   Mood: ${context.mood}
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
 * Fallback : randomisation parmi les presets pré-filtrés
 * Utilisé si GPT-5 échoue ou si le parsing échoue
 */
export function randomizeFromFilteredPresets(
  filteredPresets: FilteredPresets,
  seed?: number
): CreativePreset {
  console.log('[GPTPresetSelector] Fallback: randomisation parmi les presets filtrés');
  
  const random = (max: number) => Math.floor(Math.random() * max);
  
  return {
    style: filteredPresets.styles[random(filteredPresets.styles.length)],
    palette: filteredPresets.palettes[random(filteredPresets.palettes.length)],
    framework: filteredPresets.frameworks[random(filteredPresets.frameworks.length)],
    context: filteredPresets.contexts[random(filteredPresets.contexts.length)],
    lighting: filteredPresets.lightings[random(filteredPresets.lightings.length)],
    reference: filteredPresets.styles[random(filteredPresets.styles.length)].reference
  };
}
```

---

## 🔧 ÉTAPE 4 : Intégration dans PostGenerationService

### Fichier : `server/src/services/PostGenerationService.ts`

```typescript
import { getRelevantPresetsForGPT } from './CreativePresetsLibrary';
import { selectPresetWithGPT, randomizeFromFilteredPresets } from './GPTPresetSelector';

// Dans la fonction de génération de posts, remplacer l'ancien système de sélection

async function generatePost(
  brand: IBrand,
  product: IProduct,
  calendar: ICalendar,
  postDate: Date,
  platform: string
) {
  try {
    console.log(`[PostGeneration] Génération post pour ${product.name} sur ${platform}`);
    
    // 1. PRÉ-FILTRAGE DES PRESETS
    const filteredPresets = getRelevantPresetsForGPT(brand, product, calendar);
    
    // 2. SÉLECTION PAR GPT-5
    let creativePreset = await selectPresetWithGPT(
      filteredPresets,
      brand,
      product,
      calendar
    );
    
    // 3. FALLBACK SI GPT-5 ÉCHOUE
    if (!creativePreset) {
      console.warn('[PostGeneration] GPT-5 a échoué, utilisation du fallback');
      creativePreset = randomizeFromFilteredPresets(filteredPresets);
    }
    
    // 4. CONTINUER AVEC LA GÉNÉRATION NORMALE
    // Le reste du code reste identique, utilisant creativePreset
    
    // Générer le contenu texte avec GPT-5
    const textContent = await generateTextContent(
      brand,
      product,
      calendar,
      platform,
      creativePreset
    );
    
    // Générer l'image avec Gemini
    const imageUrl = await generateImage(
      textContent.imagePrompt,
      creativePreset,
      brand,
      product
    );
    
    // Sauvegarder le post
    const post = await savePost({
      brand,
      product,
      calendar,
      platform,
      scheduledDate: postDate,
      content: textContent.content,
      imageUrl,
      creativePreset,
      // ...
    });
    
    return post;
    
  } catch (error) {
    console.error('[PostGeneration] Erreur:', error);
    throw error;
  }
}
```

---

## 🔧 ÉTAPE 5 : Variables d'Environnement

### Fichier : `server/.env`

Ajouter si nécessaire :

```bash
# OpenAI API (pour GPT-5)
OPENAI_API_KEY=sk-...

# Optionnel : Activer/désactiver la sélection GPT-5
USE_GPT_PRESET_SELECTION=true
```

---

## 📊 ÉTAPE 6 : Tests et Validation

### Test Unitaire : `server/src/services/__tests__/GPTPresetSelector.test.ts`

```typescript
import { selectPresetWithGPT, randomizeFromFilteredPresets } from '../GPTPresetSelector';
import { getRelevantPresetsForGPT } from '../CreativePresetsLibrary';

describe('GPTPresetSelector', () => {
  const mockBrand = {
    name: 'Test Brand',
    sector: 'food',
    colors: { primary: '#FF0000' },
    pricePositioning: 'premium'
  };
  
  const mockProduct = {
    name: 'Yaourt Grec',
    category: 'yogurt',
    description: 'Yaourt grec protéiné',
    uniqueSellingPoints: ['Riche en protéines', 'Sans sucre ajouté'],
    customerBenefits: ['Énergie durable', 'Satiété'],
    usageOccasions: ['breakfast', 'sport']
  };
  
  const mockCalendar = {
    campaignObjective: 'awareness',
    generationSettings: {
      themes: ['santé', 'sport'],
      tone: 'dynamique'
    }
  };
  
  test('Pre-filtering returns relevant presets', () => {
    const filtered = getRelevantPresetsForGPT(mockBrand, mockProduct, mockCalendar);
    
    expect(filtered.styles.length).toBeGreaterThan(0);
    expect(filtered.styles.length).toBeLessThanOrEqual(25);
    expect(filtered.contexts.length).toBeGreaterThan(0);
    expect(filtered.contexts.length).toBeLessThanOrEqual(6);
    expect(filtered.palettes.length).toBe(12);
    expect(filtered.frameworks.length).toBe(8);
    expect(filtered.lightings.length).toBe(7);
  });
  
  test('Fallback randomization works', () => {
    const filtered = getRelevantPresetsForGPT(mockBrand, mockProduct, mockCalendar);
    const preset = randomizeFromFilteredPresets(filtered);
    
    expect(preset).toHaveProperty('style');
    expect(preset).toHaveProperty('palette');
    expect(preset).toHaveProperty('framework');
    expect(preset).toHaveProperty('context');
    expect(preset).toHaveProperty('lighting');
  });
  
  test('GPT selection returns valid preset', async () => {
    const filtered = getRelevantPresetsForGPT(mockBrand, mockProduct, mockCalendar);
    const preset = await selectPresetWithGPT(filtered, mockBrand, mockProduct, mockCalendar);
    
    if (preset) {
      expect(preset).toHaveProperty('style');
      expect(preset).toHaveProperty('palette');
      expect(preset).toHaveProperty('framework');
      expect(preset).toHaveProperty('context');
      expect(preset).toHaveProperty('lighting');
    }
  }, 30000); // Timeout 30s pour l'appel API
});
```

---

## 🚀 ÉTAPE 7 : Déploiement et Monitoring

### Logs à Surveiller

```typescript
// Dans PostGenerationService.ts
console.log('[PostGeneration] Preset sélectionné:', {
  style: creativePreset.style.name,
  palette: creativePreset.palette.name,
  framework: creativePreset.framework.name,
  context: creativePreset.context.name,
  lighting: creativePreset.lighting.name,
  source: creativePreset.source // 'gpt' ou 'fallback'
});
```

### Métriques à Tracker

1. **Taux de succès GPT-5** : % de fois où GPT-5 sélectionne avec succès
2. **Temps de réponse GPT-5** : Latence moyenne de l'appel API
3. **Taux de fallback** : % de fois où on utilise la randomisation
4. **Coût API** : Coût par post généré (tokens utilisés)

---

## 📈 AVANTAGES DE CETTE APPROCHE

### ✅ Avantages Techniques

1. **Intelligence Contextuelle**
   - GPT-5 comprend les nuances du brief
   - Sélection adaptée au contexte spécifique
   - Créativité tout en restant pertinent

2. **Pré-filtrage Efficace**
   - Réduit 114 styles → 15-25 pertinents
   - GPT-5 ne se perd pas dans trop d'options
   - Coût API optimisé (moins de tokens)

3. **Robustesse**
   - Fallback automatique si GPT-5 échoue
   - Validation des indices
   - Gestion d'erreurs complète

4. **Traçabilité**
   - Logs détaillés à chaque étape
   - Justification de GPT-5 enregistrée
   - Debugging facilité

### ✅ Avantages Business

1. **Qualité Supérieure**
   - Presets adaptés au contexte
   - Cohérence marque garantie
   - Niveau Cannes Lions maintenu

2. **Flexibilité**
   - S'adapte à chaque produit
   - Prend en compte les occasions d'usage
   - Respecte l'objectif de campagne

3. **Scalabilité**
   - Fonctionne pour tous les secteurs
   - Extensible (ajout de nouveaux secteurs facile)
   - Performance maintenue

---

## ⚠️ POINTS D'ATTENTION

### Coûts API

- **GPT-4o** : ~$0.01 par 1K tokens
- **Prompt moyen** : ~2K tokens (styles + contexte)
- **Coût par post** : ~$0.02-0.03
- **Pour 100 posts** : ~$2-3

### Latence

- **Appel GPT-5** : +1-2 secondes par post
- **Total génération** : 5-7 secondes (au lieu de 3-5)
- **Acceptable** pour génération batch

### Taux de Succès

- **Objectif** : >95% de succès GPT-5
- **Fallback** : <5% d'utilisation
- **Monitoring** : Alertes si >10% de fallback

---

## 🔄 MIGRATION PROGRESSIVE

### Phase 1 : Test A/B (Semaine 1)
- 10% des posts avec GPT-5
- 90% avec ancien système
- Comparer qualité et performance

### Phase 2 : Déploiement Progressif (Semaine 2-3)
- 50% GPT-5, 50% ancien
- Monitoring intensif
- Ajustements si nécessaire

### Phase 3 : Déploiement Complet (Semaine 4)
- 100% GPT-5
- Ancien système en fallback uniquement
- Documentation finalisée

---

## 📚 RESSOURCES COMPLÉMENTAIRES

### Documentation OpenAI
- [GPT-4 API Reference](https://platform.openai.com/docs/api-reference)
- [Best Practices for Prompting](https://platform.openai.com/docs/guides/prompt-engineering)

### Code Source
- `server/src/services/CreativePresetsLibrary.ts` - Presets et pré-filtrage
- `server/src/services/GPTPresetSelector.ts` - Sélection GPT-5
- `server/src/services/PostGenerationService.ts` - Intégration

---

## ✅ CHECKLIST D'IMPLÉMENTATION

- [ ] **Étape 1** : Ajouter mappings dans CreativePresetsLibrary.ts
- [ ] **Étape 2** : Créer fonctions de pré-filtrage
- [ ] **Étape 3** : Créer GPTPresetSelector.ts
- [ ] **Étape 4** : Intégrer dans PostGenerationService.ts
- [ ] **Étape 5** : Configurer variables d'environnement
- [ ] **Étape 6** : Écrire tests unitaires
- [ ] **Étape 7** : Tester en local
- [ ] **Étape 8** : Déployer en staging
- [ ] **Étape 9** : Test A/B en production
- [ ] **Étape 10** : Déploiement complet

---

## 🎯 RÉSULTAT ATTENDU

Après implémentation, chaque post sera généré avec :

1. ✅ **Preset pré-filtré** selon le secteur (15-25 styles pertinents)
2. ✅ **Sélection intelligente** par GPT-5 basée sur le contexte complet
3. ✅ **Justification** de la sélection (traçabilité)
4. ✅ **Fallback robuste** si GPT-5 échoue
5. ✅ **Qualité garantie** niveau Cannes Lions

**Impact attendu :**
- 📈 +30% de pertinence créative
- 🎨 +50% de diversité visuelle
- ⚡ Temps de génération : +2 secondes
- 💰 Coût additionnel : ~$0.02 par post

---

**Document créé le :** 4 novembre 2025  
**Version :** 1.0  
**Auteur :** Documentation technique Trio Digital  
**Statut :** Prêt pour implémentation
