/**
 * Script de test pour vérifier la diversité des presets créatifs
 * Teste la nouvelle randomisation vraiment aléatoire
 */

import { 
  getRelevantPresetsForGPT, 
  selectCreativePreset,
  PHOTOGRAPHIC_STYLES,
  COLOR_PALETTES,
  CREATIVE_CONTEXTS
} from '../server/src/services/CreativePresetsLibrary.js';

// Données de test
const testBrand = {
  name: 'Test Brand',
  sector: 'food',
  colors: { primary: '#FF6B35' }
};

const testProduct = {
  name: 'Yaourt Bio',
  category: 'yogurt',
  usageOccasions: ['breakfast', 'healthy-snack'],
  description: 'Yaourt bio aux fruits'
};

const testCalendar = {
  _id: 'test-calendar-123',
  campaignObjective: 'Awareness'
};

console.log('🧪 TEST DE DIVERSITÉ DES PRESETS CRÉATIFS');
console.log('==========================================\n');

// Test 1: Vérifier le pré-filtrage
console.log('📊 Test 1: Pré-filtrage des presets');
const filteredPresets = getRelevantPresetsForGPT(testBrand, testProduct, testCalendar);

console.log(`✅ Styles filtrés: ${filteredPresets.styles.length}/${PHOTOGRAPHIC_STYLES.length}`);
console.log(`✅ Contextes filtrés: ${filteredPresets.contexts.length}/${CREATIVE_CONTEXTS.length}`);
console.log(`✅ Palettes disponibles: ${filteredPresets.palettes.length}/${COLOR_PALETTES.length}`);

console.log('\n📝 Styles sélectionnés:');
filteredPresets.styles.slice(0, 5).forEach((style, i) => {
  console.log(`  ${i + 1}. ${style.name} (${style.category})`);
});

console.log('\n📝 Contextes sélectionnés:');
filteredPresets.contexts.forEach((context, i) => {
  console.log(`  ${i + 1}. ${context.name}`);
});

// Test 2: Vérifier la diversité sur 10 générations
console.log('\n🎲 Test 2: Diversité sur 10 générations consécutives');
const generatedPresets = [];
const styleUsage = new Map<string, number>();
const contextUsage = new Map<string, number>();

for (let i = 0; i < 10; i++) {
  const preset = selectCreativePreset(i, 10, 'food', testBrand.colors, testCalendar._id);
  generatedPresets.push(preset);
  
  // Compter l'usage des styles
  const styleName = preset.style.name;
  styleUsage.set(styleName, (styleUsage.get(styleName) || 0) + 1);
  
  // Compter l'usage des contextes
  const contextName = preset.context.name;
  contextUsage.set(contextName, (contextUsage.get(contextName) || 0) + 1);
  
  console.log(`  Post ${i + 1}: ${styleName} + ${contextName}`);
}

// Analyser la diversité
console.log('\n📈 Analyse de diversité:');
console.log(`✅ Styles uniques utilisés: ${styleUsage.size}/10`);
console.log(`✅ Contextes uniques utilisés: ${contextUsage.size}/10`);

const maxStyleUsage = Math.max(...styleUsage.values());
const maxContextUsage = Math.max(...contextUsage.values());

console.log(`✅ Répétition max d'un style: ${maxStyleUsage}/10`);
console.log(`✅ Répétition max d'un contexte: ${maxContextUsage}/10`);

// Test 3: Vérifier la randomisation sur différents calendriers
console.log('\n🔄 Test 3: Différence entre calendriers');
const calendar1Presets = [];
const calendar2Presets = [];

for (let i = 0; i < 5; i++) {
  const preset1 = selectCreativePreset(i, 5, 'food', testBrand.colors, 'calendar-1');
  const preset2 = selectCreativePreset(i, 5, 'food', testBrand.colors, 'calendar-2');
  
  calendar1Presets.push(preset1);
  calendar2Presets.push(preset2);
  
  const different = preset1.style.name !== preset2.style.name || preset1.context.name !== preset2.context.name;
  console.log(`  Post ${i + 1}: ${different ? '✅ Différent' : '❌ Identique'}`);
}

// Test 4: Performance temporelle
console.log('\n⏱️  Test 4: Performance de génération');
const startTime = Date.now();

for (let i = 0; i < 100; i++) {
  selectCreativePreset(i, 100, 'food', testBrand.colors, 'perf-test');
}

const endTime = Date.now();
const avgTime = (endTime - startTime) / 100;

console.log(`✅ Temps moyen par génération: ${avgTime.toFixed(2)}ms`);
console.log(`✅ Générations par seconde: ${(1000 / avgTime).toFixed(0)}`);

// Résumé final
console.log('\n🎯 RÉSUMÉ DES TESTS');
console.log('==================');

const diversityScore = (styleUsage.size / 10) * 100;
const repetitionScore = Math.max(0, 100 - (maxStyleUsage - 1) * 20);

console.log(`📊 Score de diversité: ${diversityScore.toFixed(0)}%`);
console.log(`🔄 Score anti-répétition: ${repetitionScore.toFixed(0)}%`);
console.log(`⚡ Performance: ${avgTime < 5 ? 'Excellente' : avgTime < 10 ? 'Bonne' : 'Acceptable'}`);

if (diversityScore >= 80 && repetitionScore >= 60) {
  console.log('✅ TESTS RÉUSSIS - Diversité améliorée !');
} else {
  console.log('❌ TESTS ÉCHOUÉS - Diversité insuffisante');
}
