/**
 * 🎯 TEST DE LA CORRECTION ANTI-BIAIS
 * Vérifie que la randomisation élimine le biais de position
 * dans la sélection des contextes créatifs
 */

import { preFilterContextsByUsage, CREATIVE_CONTEXTS } from '../services/CreativePresetsLibrary';

interface TestResult {
  contextName: string;
  count: number;
  percentage: number;
  position: 'first' | 'top3' | 'other';
}

/**
 * Test la distribution des contextes après randomisation
 */
function testContextRandomization(): void {
  console.log('🎯 TEST ANTI-BIAIS - RANDOMISATION DES CONTEXTES');
  console.log('='.repeat(60));
  
  const numTests = 1000;
  const usageOccasions = ['juice', 'breakfast', 'healthy'];
  
  // Compteurs pour analyser la distribution
  const firstPositionCount: Record<string, number> = {};
  const top3PositionCount: Record<string, number> = {};
  const totalAppearances: Record<string, number> = {};
  
  console.log(`\n📊 Génération de ${numTests} listes de contextes randomisées...`);
  
  for (let i = 0; i < numTests; i++) {
    // Générer un calendarId unique et un postIndex variable
    const calendarId = `test-calendar-${i}-${Date.now()}-${Math.random()}`;
    const postIndex = i % 50; // Variation du postIndex
    
    const contexts = preFilterContextsByUsage(
      usageOccasions,
      'beverage',
      calendarId,
      postIndex
    );
    
    // Analyser les positions
    contexts.forEach((context, index) => {
      const name = context.name;
      
      // Compter les apparitions totales
      totalAppearances[name] = (totalAppearances[name] || 0) + 1;
      
      // Compter les premières positions
      if (index === 0) {
        firstPositionCount[name] = (firstPositionCount[name] || 0) + 1;
      }
      
      // Compter le top 3
      if (index < 3) {
        top3PositionCount[name] = (top3PositionCount[name] || 0) + 1;
      }
    });
  }
  
  console.log('\n🏆 RÉSULTATS - PREMIÈRE POSITION:');
  console.log('-'.repeat(50));
  
  // Trier par fréquence d'apparition en première position
  const firstPositionResults = Object.entries(firstPositionCount)
    .map(([name, count]) => ({
      contextName: name,
      count,
      percentage: (count / numTests) * 100,
      position: 'first' as const
    }))
    .sort((a, b) => b.count - a.count);
  
  // Afficher le top 10 des premières positions
  console.log('Top 10 contextes en première position:');
  firstPositionResults.slice(0, 10).forEach((result, index) => {
    const status = result.percentage > 5 ? '⚠️  BIAIS' : '✅ OK';
    console.log(`${(index + 1).toString().padStart(2)}. ${result.contextName.padEnd(35)} ${result.count.toString().padStart(4)} fois (${result.percentage.toFixed(1)}%) ${status}`);
  });
  
  console.log('\n📈 ANALYSE STATISTIQUE:');
  console.log('-'.repeat(50));
  
  const maxFirstPosition = Math.max(...Object.values(firstPositionCount));
  const minFirstPosition = Math.min(...Object.values(firstPositionCount));
  const avgFirstPosition = Object.values(firstPositionCount).reduce((a, b) => a + b, 0) / Object.keys(firstPositionCount).length;
  
  console.log(`Contextes différents en 1ère position: ${Object.keys(firstPositionCount).length}`);
  console.log(`Maximum en 1ère position: ${maxFirstPosition} fois (${(maxFirstPosition/numTests*100).toFixed(1)}%)`);
  console.log(`Minimum en 1ère position: ${minFirstPosition} fois (${(minFirstPosition/numTests*100).toFixed(1)}%)`);
  console.log(`Moyenne en 1ère position: ${avgFirstPosition.toFixed(1)} fois (${(avgFirstPosition/numTests*100).toFixed(1)}%)`);
  
  // Calculer l'écart-type pour mesurer la dispersion
  const variance = Object.values(firstPositionCount)
    .reduce((sum, count) => sum + Math.pow(count - avgFirstPosition, 2), 0) / Object.keys(firstPositionCount).length;
  const standardDeviation = Math.sqrt(variance);
  
  console.log(`Écart-type: ${standardDeviation.toFixed(2)} (plus c'est bas, plus c'est uniforme)`);
  
  // Évaluation de la qualité de la randomisation
  const uniformityScore = 100 - (standardDeviation / avgFirstPosition * 100);
  console.log(`Score d'uniformité: ${uniformityScore.toFixed(1)}% (objectif: >80%)`);
  
  console.log('\n🎯 VÉRIFICATION ANTI-BIAIS:');
  console.log('-'.repeat(50));
  
  const biasedContexts = firstPositionResults.filter(r => r.percentage > 5);
  if (biasedContexts.length === 0) {
    console.log('✅ SUCCÈS: Aucun contexte ne dépasse 5% en première position');
    console.log('✅ Le biais de position a été éliminé !');
  } else {
    console.log(`⚠️  ATTENTION: ${biasedContexts.length} contexte(s) dépassent 5% en première position:`);
    biasedContexts.forEach(context => {
      console.log(`   - ${context.contextName}: ${context.percentage.toFixed(1)}%`);
    });
  }
  
  // Test spécifique pour "Modern Kitchen" et "Cozy Home"
  console.log('\n🔍 VÉRIFICATION SPÉCIFIQUE - Anciens contextes dominants:');
  console.log('-'.repeat(50));
  
  const modernKitchenCount = firstPositionCount['Modern Kitchen Bright'] || 0;
  const cozyHomeCount = firstPositionCount['Cozy Home Comfort'] || 0;
  
  console.log(`"Modern Kitchen Bright" en 1ère position: ${modernKitchenCount} fois (${(modernKitchenCount/numTests*100).toFixed(1)}%)`);
  console.log(`"Cozy Home Comfort" en 1ère position: ${cozyHomeCount} fois (${(cozyHomeCount/numTests*100).toFixed(1)}%)`);
  
  const combinedOldDominance = ((modernKitchenCount + cozyHomeCount) / numTests) * 100;
  console.log(`Dominance combinée anciens leaders: ${combinedOldDominance.toFixed(1)}% (avant: ~55%)`);
  
  if (combinedOldDominance < 10) {
    console.log('✅ EXCELLENT: La dominance des anciens leaders a été brisée !');
  } else if (combinedOldDominance < 20) {
    console.log('✅ BON: Réduction significative de la dominance');
  } else {
    console.log('⚠️  Le biais persiste partiellement');
  }
  
  console.log('\n🎲 TEST DE REPRODUCTIBILITÉ:');
  console.log('-'.repeat(50));
  
  // Test avec le même calendarId et postIndex
  const sameCalendarId = 'test-reproducibility';
  const samePostIndex = 5;
  
  const result1 = preFilterContextsByUsage(usageOccasions, 'beverage', sameCalendarId, samePostIndex);
  const result2 = preFilterContextsByUsage(usageOccasions, 'beverage', sameCalendarId, samePostIndex);
  
  const isReproducible = result1.length === result2.length && 
    result1.every((context, index) => context.name === result2[index].name);
  
  if (isReproducible) {
    console.log('✅ REPRODUCTIBILITÉ: Même seed → même ordre (déterministe)');
  } else {
    console.log('⚠️  REPRODUCTIBILITÉ: Ordre différent avec même seed');
  }
  
  console.log('\n🌟 RÉSUMÉ FINAL:');
  console.log('='.repeat(60));
  console.log(`Tests effectués: ${numTests}`);
  console.log(`Contextes uniques utilisés: ${Object.keys(firstPositionCount).length}`);
  console.log(`Score d'uniformité: ${uniformityScore.toFixed(1)}%`);
  console.log(`Réduction du biais: ${(55 - combinedOldDominance).toFixed(1)} points de pourcentage`);
  
  if (uniformityScore > 80 && combinedOldDominance < 10) {
    console.log('\n🎉 MISSION ACCOMPLIE !');
    console.log('La randomisation anti-biais fonctionne parfaitement.');
    console.log('Diversité maximale atteinte avec distribution uniforme.');
  } else if (uniformityScore > 70) {
    console.log('\n✅ BONNE AMÉLIORATION !');
    console.log('Le biais a été significativement réduit.');
  } else {
    console.log('\n⚠️  AMÉLIORATION PARTIELLE');
    console.log('Le biais persiste, ajustements nécessaires.');
  }
}

// Exécution du test
if (require.main === module) {
  testContextRandomization();
}

export { testContextRandomization };
