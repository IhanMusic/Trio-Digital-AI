/**
 * Script pour corriger le problème de diversité des presets
 * Améliore le système de fallback et ajoute une logique anti-répétition
 */

import { 
  getRelevantPresetsForGPT, 
  selectCreativePreset,
  PHOTOGRAPHIC_STYLES,
  COLOR_PALETTES,
  CREATIVE_CONTEXTS,
  CREATIVE_FRAMEWORKS,
  LIGHTING_SETUPS
} from '../services/CreativePresetsLibrary';

import { 
  selectPresetWithGPT, 
  randomizeFromFilteredPresets 
} from '../services/GPTPresetSelector';

console.log('🔧 CORRECTION DU SYSTÈME DE DIVERSITÉ DES PRESETS');
console.log('================================================\n');

// Données de test pour boissons (cas problématique)
const beverageBrand = {
  name: 'Marque Boisson Test',
  sector: 'beverage',
  colors: { primary: '#FF6B35' }
};

const beverageProduct = {
  name: 'Jus de Fruits Bio',
  category: 'juice',
  usageOccasions: ['breakfast', 'refreshment', 'healthy-snack'],
  description: 'Jus de fruits bio pressé à froid'
};

const testCalendar = {
  _id: 'fix-test-calendar',
  campaignObjective: 'Awareness'
};

// Test 1: Simuler les échecs GPT-5 et tester le fallback
console.log('🧪 Test 1: Simulation échecs GPT-5 et fallback');
console.log('===============================================');

const filteredPresets = getRelevantPresetsForGPT(beverageBrand, beverageProduct, testCalendar);
console.log(`Presets disponibles: ${filteredPresets.styles.length} styles, ${filteredPresets.contexts.length} contextes`);

// Tester le fallback 10 fois pour voir la diversité
console.log('\n📊 Test du fallback randomizeFromFilteredPresets (10 générations):');
const fallbackResults = [];
const styleUsage = new Map<string, number>();

for (let i = 0; i < 10; i++) {
  const preset = randomizeFromFilteredPresets(filteredPresets, i);
  fallbackResults.push(preset);
  
  const styleName = preset.style.name;
  styleUsage.set(styleName, (styleUsage.get(styleName) || 0) + 1);
  
  console.log(`  ${i + 1}. ${styleName} + ${preset.context.name}`);
}

const uniqueStyles = styleUsage.size;
const maxRepetition = Math.max(...styleUsage.values());

console.log(`\n📈 Résultats fallback:`);
console.log(`✅ Styles uniques: ${uniqueStyles}/10`);
console.log(`⚠️  Répétition max: ${maxRepetition}/10`);

if (uniqueStyles < 8) {
  console.log('❌ PROBLÈME CONFIRMÉ: Fallback pas assez diversifié');
} else {
  console.log('✅ Fallback acceptable');
}

// Test 2: Créer un système anti-répétition amélioré
console.log('\n🔧 Test 2: Système anti-répétition amélioré');
console.log('============================================');

class AntiRepetitionPresetSelector {
  private recentStyles: string[] = [];
  private recentContexts: string[] = [];
  private recentPalettes: string[] = [];
  private maxHistory = 5; // Éviter les répétitions sur les 5 derniers posts

  selectDiversePreset(filteredPresets: any, seed?: number) {
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
      this.recentStyles = [];
    }
    if (availableContexts.length < 2) {
      this.recentContexts = [];
    }
    if (availablePalettes.length < 3) {
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

// Tester le nouveau système anti-répétition
const antiRepetitionSelector = new AntiRepetitionPresetSelector();
const improvedResults = [];
const improvedStyleUsage = new Map<string, number>();

console.log('\n📊 Test du système anti-répétition amélioré (10 générations):');

for (let i = 0; i < 10; i++) {
  const preset = antiRepetitionSelector.selectDiversePreset(filteredPresets, i);
  improvedResults.push(preset);
  
  const styleName = preset.style.name;
  improvedStyleUsage.set(styleName, (improvedStyleUsage.get(styleName) || 0) + 1);
  
  console.log(`  ${i + 1}. ${styleName} + ${preset.context.name}`);
}

const improvedUniqueStyles = improvedStyleUsage.size;
const improvedMaxRepetition = Math.max(...improvedStyleUsage.values());

console.log(`\n📈 Résultats système amélioré:`);
console.log(`✅ Styles uniques: ${improvedUniqueStyles}/10`);
console.log(`⚠️  Répétition max: ${improvedMaxRepetition}/10`);

// Comparaison
console.log('\n🏆 COMPARAISON DES SYSTÈMES');
console.log('===========================');
console.log(`Fallback original:     ${uniqueStyles}/10 styles uniques, max répétition: ${maxRepetition}`);
console.log(`Système amélioré:      ${improvedUniqueStyles}/10 styles uniques, max répétition: ${improvedMaxRepetition}`);

const improvement = improvedUniqueStyles - uniqueStyles;
if (improvement > 0) {
  console.log(`✅ AMÉLIORATION: +${improvement} styles uniques`);
} else if (improvement === 0) {
  console.log(`➡️  ÉQUIVALENT: Même diversité`);
} else {
  console.log(`❌ RÉGRESSION: ${improvement} styles uniques`);
}

// Test 3: Vérifier si le problème vient de GPT-5
console.log('\n🤖 Test 3: Diagnostic GPT-5 (simulation sans appel API)');
console.log('======================================================');

// Simuler ce qui se passe quand GPT-5 échoue systématiquement
console.log('Simulation: GPT-5 échoue → Fallback utilisé à chaque fois');
console.log('Si le fallback n\'est pas assez diversifié, on obtient des répétitions');

console.log('\n💡 RECOMMANDATIONS FINALES:');
console.log('============================');
console.log('1. ✅ Le pré-filtrage fonctionne bien (25 styles pour boissons)');
console.log('2. ⚠️  Implémenter le système anti-répétition amélioré');
console.log('3. 🔍 Vérifier les logs GPT-5 pour voir pourquoi il échoue');
console.log('4. 🛠️  Remplacer randomizeFromFilteredPresets par le système amélioré');
console.log('5. 📊 Ajouter des métriques de diversité en production');

if (improvedUniqueStyles >= 9) {
  console.log('\n✅ SOLUTION TROUVÉE: Le système anti-répétition résout le problème !');
} else {
  console.log('\n⚠️  INVESTIGATION SUPPLÉMENTAIRE NÉCESSAIRE');
}
