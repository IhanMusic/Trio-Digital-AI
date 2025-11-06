#!/usr/bin/env ts-node

/**
 * Script de test pour valider les corrections de randomisation
 * Teste la diversité des presets générés avec le nouveau système ultra-entropique
 */

import { randomizeFromFilteredPresets } from '../services/GPTPresetSelector';
import { getRelevantPresetsForGPT } from '../services/CreativePresetsLibrary';

// Mock data pour les tests
const mockBrand = {
  _id: 'test-brand-id-12345',
  name: 'Test Brand',
  sector: 'food',
  colors: {
    primary: '#FF6B35',
    secondary: '#F7931E',
    accent: '#FFD23F'
  }
};

const mockProduct = {
  name: 'Test Product',
  category: 'beverage',
  usageOccasions: ['breakfast', 'snack']
};

const mockCalendar = {
  _id: 'test-calendar-id-67890',
  communicationStyle: 'friendly',
  generationSettings: {
    themes: ['health', 'lifestyle']
  }
};

/**
 * Test de diversité : génère plusieurs presets et vérifie qu'ils sont différents
 */
async function testDiversityGeneration() {
  console.log('🧪 ========================================');
  console.log('🧪 TEST DE DIVERSITÉ DE RANDOMISATION');
  console.log('🧪 ========================================\n');

  // Obtenir les presets filtrés
  const filteredPresets = getRelevantPresetsForGPT(mockBrand, mockProduct, mockCalendar);
  
  console.log(`📊 Presets disponibles:`);
  console.log(`   - Styles: ${filteredPresets.styles.length}`);
  console.log(`   - Contextes: ${filteredPresets.contexts.length}`);
  console.log(`   - Palettes: ${filteredPresets.palettes.length}`);
  console.log(`   - Frameworks: ${filteredPresets.frameworks.length}`);
  console.log(`   - Éclairages: ${filteredPresets.lightings.length}\n`);

  // Générer 10 presets avec le nouveau système
  const generatedPresets: Array<{
    index: number;
    style: string;
    context: string;
    palette: string;
    framework: string;
    lighting: string;
    combo: string;
  }> = [];
  const calendarId = 'test-calendar-diversity-' + Date.now();
  
  console.log('🎨 Génération de 10 presets avec le système optimisé...\n');
  
  for (let i = 0; i < 10; i++) {
    console.log(`--- Post ${i + 1}/10 ---`);
    
    const preset = randomizeFromFilteredPresets(
      filteredPresets,
      undefined, // pas de seed fixe pour tester l'entropie
      calendarId,
      mockBrand._id,
      i
    );
    
    generatedPresets.push({
      index: i + 1,
      style: preset.style.name,
      context: preset.context.name,
      palette: preset.palette.name,
      framework: preset.framework.name,
      lighting: preset.lighting.name,
      combo: `${preset.style.name}+${preset.context.name}+${preset.palette.name}`
    });
    
    console.log(`✅ Style: ${preset.style.name}`);
    console.log(`✅ Context: ${preset.context.name}`);
    console.log(`✅ Palette: ${preset.palette.name}\n`);
  }

  // Analyser la diversité
  console.log('📊 ========================================');
  console.log('📊 ANALYSE DE DIVERSITÉ');
  console.log('📊 ========================================\n');

  // Compter les éléments uniques
  const uniqueStyles = new Set(generatedPresets.map(p => p.style));
  const uniqueContexts = new Set(generatedPresets.map(p => p.context));
  const uniquePalettes = new Set(generatedPresets.map(p => p.palette));
  const uniqueFrameworks = new Set(generatedPresets.map(p => p.framework));
  const uniqueLightings = new Set(generatedPresets.map(p => p.lighting));
  const uniqueCombos = new Set(generatedPresets.map(p => p.combo));

  console.log(`🎨 Styles uniques: ${uniqueStyles.size}/10 (${(uniqueStyles.size/10*100).toFixed(1)}%)`);
  console.log(`🌍 Contextes uniques: ${uniqueContexts.size}/10 (${(uniqueContexts.size/10*100).toFixed(1)}%)`);
  console.log(`🎨 Palettes uniques: ${uniquePalettes.size}/10 (${(uniquePalettes.size/10*100).toFixed(1)}%)`);
  console.log(`📝 Frameworks uniques: ${uniqueFrameworks.size}/10 (${(uniqueFrameworks.size/10*100).toFixed(1)}%)`);
  console.log(`💡 Éclairages uniques: ${uniqueLightings.size}/10 (${(uniqueLightings.size/10*100).toFixed(1)}%)`);
  console.log(`🔄 Combinaisons uniques: ${uniqueCombos.size}/10 (${(uniqueCombos.size/10*100).toFixed(1)}%)\n`);

  // Détection des répétitions
  const styleRepeats = generatedPresets.filter((preset, index) => 
    generatedPresets.findIndex(p => p.style === preset.style) !== index
  );
  
  const comboRepeats = generatedPresets.filter((preset, index) => 
    generatedPresets.findIndex(p => p.combo === preset.combo) !== index
  );

  if (styleRepeats.length > 0) {
    console.log('⚠️  RÉPÉTITIONS DE STYLES DÉTECTÉES:');
    styleRepeats.forEach(repeat => {
      console.log(`   Post ${repeat.index}: ${repeat.style} (déjà utilisé)`);
    });
    console.log('');
  }

  if (comboRepeats.length > 0) {
    console.log('⚠️  RÉPÉTITIONS DE COMBINAISONS DÉTECTÉES:');
    comboRepeats.forEach(repeat => {
      console.log(`   Post ${repeat.index}: ${repeat.combo} (déjà utilisé)`);
    });
    console.log('');
  }

  // Score de diversité global
  const diversityScore = (uniqueStyles.size + uniqueContexts.size + uniquePalettes.size + uniqueCombos.size) / 40 * 100;
  
  console.log(`🏆 SCORE DE DIVERSITÉ GLOBAL: ${diversityScore.toFixed(1)}%\n`);

  // Évaluation
  if (diversityScore >= 85) {
    console.log('✅ EXCELLENT: Diversité optimale atteinte !');
  } else if (diversityScore >= 70) {
    console.log('✅ BON: Diversité satisfaisante');
  } else if (diversityScore >= 50) {
    console.log('⚠️  MOYEN: Diversité acceptable mais améliorable');
  } else {
    console.log('❌ FAIBLE: Problème de diversité détecté');
  }

  return {
    diversityScore,
    uniqueStyles: uniqueStyles.size,
    uniqueContexts: uniqueContexts.size,
    uniquePalettes: uniquePalettes.size,
    uniqueCombos: uniqueCombos.size,
    styleRepeats: styleRepeats.length,
    comboRepeats: comboRepeats.length
  };
}

/**
 * Test de cohérence : vérifie que les mêmes paramètres donnent des résultats différents
 */
async function testConsistentDiversity() {
  console.log('\n🔄 ========================================');
  console.log('🔄 TEST DE COHÉRENCE ANTI-RÉPÉTITION');
  console.log('🔄 ========================================\n');

  const filteredPresets = getRelevantPresetsForGPT(mockBrand, mockProduct, mockCalendar);
  const calendarId = 'test-consistency-' + Date.now();
  
  // Générer 5 presets avec les mêmes paramètres de base
  const results = [];
  
  for (let i = 0; i < 5; i++) {
    const preset = randomizeFromFilteredPresets(
      filteredPresets,
      42, // seed fixe pour tester l'anti-répétition
      calendarId,
      mockBrand._id,
      i
    );
    
    results.push({
      index: i + 1,
      style: preset.style.name,
      context: preset.context.name,
      palette: preset.palette.name
    });
    
    console.log(`Post ${i + 1}: ${preset.style.name} + ${preset.context.name} + ${preset.palette.name}`);
  }
  
  // Vérifier qu'ils sont tous différents malgré le seed fixe
  const uniqueResults = new Set(results.map(r => `${r.style}+${r.context}+${r.palette}`));
  
  console.log(`\n🎯 Résultats uniques: ${uniqueResults.size}/5`);
  
  if (uniqueResults.size === 5) {
    console.log('✅ SUCCÈS: Le système anti-répétition fonctionne correctement');
  } else {
    console.log('⚠️  ATTENTION: Répétitions détectées malgré l\'anti-répétition');
  }
  
  return uniqueResults.size === 5;
}

/**
 * Test de performance : mesure le temps d'exécution
 */
async function testPerformance() {
  console.log('\n⚡ ========================================');
  console.log('⚡ TEST DE PERFORMANCE');
  console.log('⚡ ========================================\n');

  const filteredPresets = getRelevantPresetsForGPT(mockBrand, mockProduct, mockCalendar);
  const calendarId = 'test-performance-' + Date.now();
  
  const startTime = performance.now();
  
  // Générer 20 presets pour mesurer la performance
  for (let i = 0; i < 20; i++) {
    randomizeFromFilteredPresets(
      filteredPresets,
      undefined,
      calendarId,
      mockBrand._id,
      i
    );
  }
  
  const endTime = performance.now();
  const totalTime = endTime - startTime;
  const avgTime = totalTime / 20;
  
  console.log(`⏱️  Temps total pour 20 presets: ${totalTime.toFixed(2)}ms`);
  console.log(`⏱️  Temps moyen par preset: ${avgTime.toFixed(2)}ms`);
  
  if (avgTime < 10) {
    console.log('✅ EXCELLENT: Performance optimale');
  } else if (avgTime < 50) {
    console.log('✅ BON: Performance acceptable');
  } else {
    console.log('⚠️  LENT: Performance à optimiser');
  }
  
  return avgTime;
}

/**
 * Fonction principale de test
 */
async function runAllTests() {
  console.log('🚀 DÉBUT DES TESTS DE RANDOMISATION OPTIMISÉE\n');
  
  try {
    // Test 1: Diversité
    const diversityResults = await testDiversityGeneration();
    
    // Test 2: Cohérence
    const consistencyResult = await testConsistentDiversity();
    
    // Test 3: Performance
    const performanceResult = await testPerformance();
    
    // Résumé final
    console.log('\n🏁 ========================================');
    console.log('🏁 RÉSUMÉ DES TESTS');
    console.log('🏁 ========================================\n');
    
    console.log(`📊 Score de diversité: ${diversityResults.diversityScore.toFixed(1)}%`);
    console.log(`🔄 Anti-répétition: ${consistencyResult ? 'FONCTIONNE' : 'PROBLÈME'}`);
    console.log(`⚡ Performance moyenne: ${performanceResult.toFixed(2)}ms/preset`);
    
    const overallSuccess = diversityResults.diversityScore >= 70 && consistencyResult && performanceResult < 50;
    
    if (overallSuccess) {
      console.log('\n🎉 TOUS LES TESTS RÉUSSIS ! Le système de randomisation est optimisé.');
    } else {
      console.log('\n⚠️  CERTAINS TESTS ONT ÉCHOUÉ. Optimisations supplémentaires nécessaires.');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
    process.exit(1);
  }
}

// Exécuter les tests si le script est appelé directement
if (require.main === module) {
  runAllTests();
}

export { testDiversityGeneration, testConsistentDiversity, testPerformance };
