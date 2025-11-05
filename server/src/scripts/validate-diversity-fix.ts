/**
 * Script de validation finale pour confirmer que le problème de diversité est résolu
 * Teste le nouveau système anti-répétition intégré dans GPTPresetSelector
 */

import { randomizeFromFilteredPresets } from '../services/GPTPresetSelector';
import { getRelevantPresetsForGPT } from '../services/CreativePresetsLibrary';

console.log('✅ VALIDATION FINALE - CORRECTION DE LA DIVERSITÉ');
console.log('================================================\n');

// Données de test pour différents secteurs problématiques
const testCases = [
  {
    name: 'Boissons (cas problématique principal)',
    brand: { name: 'Marque Boisson', sector: 'beverage', colors: { primary: '#FF6B35' } },
    product: { name: 'Jus Bio', category: 'juice', usageOccasions: ['breakfast', 'refreshment'], description: 'Jus bio' },
    calendar: { _id: 'test-beverage', campaignObjective: 'Awareness' }
  },
  {
    name: 'Alimentation (autre cas sensible)',
    brand: { name: 'Marque Food', sector: 'food', colors: { primary: '#E74C3C' } },
    product: { name: 'Yaourt Bio', category: 'yogurt', usageOccasions: ['breakfast', 'snack'], description: 'Yaourt bio' },
    calendar: { _id: 'test-food', campaignObjective: 'Engagement' }
  },
  {
    name: 'Cosmétiques (test de contrôle)',
    brand: { name: 'Marque Beauty', sector: 'beauty', colors: { primary: '#9B59B6' } },
    product: { name: 'Crème Visage', category: 'skincare', usageOccasions: ['morning', 'evening'], description: 'Crème anti-âge' },
    calendar: { _id: 'test-beauty', campaignObjective: 'Conversion' }
  }
];

// Fonction pour tester la diversité sur un cas donné
async function testDiversityForCase(testCase: any, numGenerations: number = 15) {
  console.log(`🧪 Test: ${testCase.name}`);
  console.log('=' + '='.repeat(testCase.name.length + 6));
  
  const filteredPresets = getRelevantPresetsForGPT(testCase.brand, testCase.product, testCase.calendar);
  console.log(`Presets disponibles: ${filteredPresets.styles.length} styles, ${filteredPresets.contexts.length} contextes`);
  
  const styleUsage = new Map<string, number>();
  const contextUsage = new Map<string, number>();
  const paletteUsage = new Map<string, number>();
  
  console.log(`\n📊 Génération de ${numGenerations} presets avec le système anti-répétition:`);
  
  for (let i = 0; i < numGenerations; i++) {
    const preset = randomizeFromFilteredPresets(filteredPresets, i);
    
    // Compter les usages
    styleUsage.set(preset.style.name, (styleUsage.get(preset.style.name) || 0) + 1);
    contextUsage.set(preset.context.name, (contextUsage.get(preset.context.name) || 0) + 1);
    paletteUsage.set(preset.palette.name, (paletteUsage.get(preset.palette.name) || 0) + 1);
    
    // Afficher les 5 premiers et 5 derniers
    if (i < 5 || i >= numGenerations - 5) {
      console.log(`  ${i + 1}. ${preset.style.name} + ${preset.context.name} + ${preset.palette.name}`);
    } else if (i === 5) {
      console.log(`  ... (générations 6-${numGenerations - 5} masquées) ...`);
    }
  }
  
  // Analyser les résultats
  const uniqueStyles = styleUsage.size;
  const uniqueContexts = contextUsage.size;
  const uniquePalettes = paletteUsage.size;
  
  const maxStyleRepetition = Math.max(...styleUsage.values());
  const maxContextRepetition = Math.max(...contextUsage.values());
  const maxPaletteRepetition = Math.max(...paletteUsage.values());
  
  console.log(`\n📈 Résultats pour ${testCase.name}:`);
  console.log(`✅ Styles uniques: ${uniqueStyles}/${numGenerations} (${((uniqueStyles / numGenerations) * 100).toFixed(1)}%)`);
  console.log(`✅ Contextes uniques: ${uniqueContexts}/${numGenerations} (${((uniqueContexts / numGenerations) * 100).toFixed(1)}%)`);
  console.log(`✅ Palettes uniques: ${uniquePalettes}/${numGenerations} (${((uniquePalettes / numGenerations) * 100).toFixed(1)}%)`);
  console.log(`⚠️  Répétition max style: ${maxStyleRepetition}/${numGenerations}`);
  console.log(`⚠️  Répétition max contexte: ${maxContextRepetition}/${numGenerations}`);
  console.log(`⚠️  Répétition max palette: ${maxPaletteRepetition}/${numGenerations}`);
  
  // Évaluation de la qualité
  const diversityScore = ((uniqueStyles / numGenerations) + (uniqueContexts / numGenerations) + (uniquePalettes / numGenerations)) / 3;
  const repetitionPenalty = Math.max(maxStyleRepetition - 2, 0) / numGenerations; // Pénalité si plus de 2 répétitions
  const finalScore = Math.max(0, diversityScore - repetitionPenalty);
  
  console.log(`🎯 Score de diversité: ${(finalScore * 100).toFixed(1)}%`);
  
  if (finalScore >= 0.8) {
    console.log('✅ EXCELLENT: Diversité optimale');
  } else if (finalScore >= 0.7) {
    console.log('✅ BON: Diversité acceptable');
  } else if (finalScore >= 0.6) {
    console.log('⚠️  MOYEN: Diversité améliorable');
  } else {
    console.log('❌ FAIBLE: Problème de diversité persistant');
  }
  
  console.log(''); // Ligne vide pour séparer les tests
  
  return {
    name: testCase.name,
    uniqueStyles,
    uniqueContexts,
    uniquePalettes,
    maxStyleRepetition,
    maxContextRepetition,
    maxPaletteRepetition,
    diversityScore: finalScore,
    numGenerations
  };
}

// Exécuter tous les tests
async function runAllTests() {
  const results = [];
  
  for (const testCase of testCases) {
    const result = await testDiversityForCase(testCase, 15);
    results.push(result);
  }
  
  // Résumé final
  console.log('🏆 RÉSUMÉ FINAL DE LA VALIDATION');
  console.log('=================================');
  
  let totalScore = 0;
  let passedTests = 0;
  
  results.forEach(result => {
    const status = result.diversityScore >= 0.7 ? '✅ RÉUSSI' : '❌ ÉCHEC';
    console.log(`${status} ${result.name}: ${(result.diversityScore * 100).toFixed(1)}% diversité`);
    
    if (result.diversityScore >= 0.7) {
      passedTests++;
    }
    totalScore += result.diversityScore;
  });
  
  const averageScore = totalScore / results.length;
  
  console.log(`\n📊 STATISTIQUES GLOBALES:`);
  console.log(`Tests réussis: ${passedTests}/${results.length}`);
  console.log(`Score moyen: ${(averageScore * 100).toFixed(1)}%`);
  
  if (passedTests === results.length && averageScore >= 0.8) {
    console.log('\n🎉 VALIDATION COMPLÈTE RÉUSSIE !');
    console.log('✅ Le problème de répétition des presets est RÉSOLU');
    console.log('✅ Le système anti-répétition fonctionne parfaitement');
    console.log('✅ La diversité est garantie pour tous les secteurs testés');
    
    console.log('\n📋 PROCHAINES ÉTAPES:');
    console.log('1. ✅ Déployer les modifications en production');
    console.log('2. 📊 Surveiller les métriques de diversité en temps réel');
    console.log('3. 🔍 Analyser les retours utilisateurs sur la variété du contenu');
    console.log('4. 🚀 Considérer l\'extension du système à d\'autres composants');
    
  } else if (passedTests >= results.length * 0.7) {
    console.log('\n⚠️  VALIDATION PARTIELLE');
    console.log('✅ Amélioration significative de la diversité');
    console.log('⚠️  Quelques ajustements peuvent être nécessaires');
    
  } else {
    console.log('\n❌ VALIDATION ÉCHOUÉE');
    console.log('❌ Le problème de diversité persiste');
    console.log('🔍 Investigation supplémentaire nécessaire');
  }
  
  // Recommandations spécifiques
  const failedTests = results.filter(r => r.diversityScore < 0.7);
  if (failedTests.length > 0) {
    console.log('\n🔧 RECOMMANDATIONS POUR LES TESTS ÉCHOUÉS:');
    failedTests.forEach(test => {
      console.log(`- ${test.name}: Augmenter maxHistory ou enrichir les presets disponibles`);
    });
  }
}

// Lancer la validation
runAllTests().catch(error => {
  console.error('❌ Erreur lors de la validation:', error);
});
