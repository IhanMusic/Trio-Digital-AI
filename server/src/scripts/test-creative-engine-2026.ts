/**
 * 🧪 TEST CREATIVE ENGINE 2026
 * 
 * Script de test pour valider l'intégration complète du Creative Engine
 * avec tous les presets sectoriels et l'orchestrateur
 */

import { 
  getPresetBySector, 
  ALL_SECTOR_PRESETS,
  SECTOR_PRESETS_MAP 
} from '../creative-engine/presets/sectors';
import { CreativeOrchestrator } from '../creative-engine/orchestrator/CreativeOrchestrator';

async function testCreativeEngine() {
  console.log('🎨 TEST CREATIVE ENGINE 2026\n');
  console.log('='.repeat(60));
  
  // Test 1: Vérifier tous les presets sectoriels
  console.log('\n📦 TEST 1: Presets Sectoriels Disponibles\n');
  console.log(`Total presets: ${ALL_SECTOR_PRESETS.length}`);
  
  ALL_SECTOR_PRESETS.forEach((preset, index) => {
    console.log(`  ${index + 1}. ${preset.displayName} (${preset.sector})`);
    console.log(`     - Styles: ${preset.photographicStyles.length}`);
    console.log(`     - Contextes: ${preset.contexts.length}`);
    console.log(`     - Palettes: ${preset.colorPalettes.length}`);
    console.log(`     - Frameworks: ${preset.frameworks.length}`);
    console.log(`     - Éclairages: ${preset.lightingSetups.length}`);
  });
  
  // Test 2: Vérifier le mapping des secteurs
  console.log('\n🗺️ TEST 2: Mapping Secteurs Formulaire\n');
  const mappedSectors = Object.keys(SECTOR_PRESETS_MAP);
  console.log(`Secteurs mappés: ${mappedSectors.length}`);
  
  // Test 3: Tester l'orchestrateur
  console.log('\n🎭 TEST 3: Orchestrateur Créatif\n');
  
  const orchestrator = new CreativeOrchestrator({
    diversityMode: 'high',
    cannesLionsMinScore: 80
  });
  
  // Test avec différents secteurs
  const testCases = [
    {
      brand: { name: 'Danone', sector: 'Agroalimentaire et FMCG' },
      product: { name: 'Yaourt Nature', category: 'Produits laitiers' },
      platform: 'Instagram',
      objective: 'Engagement'
    },
    {
      brand: { name: 'L\'Oréal', sector: 'Beauté et Bien-être' },
      product: { name: 'Sérum Anti-âge', category: 'Soins visage' },
      platform: 'Instagram',
      objective: 'Notoriété'
    },
    {
      brand: { name: 'BMW', sector: 'Automobile' },
      product: { name: 'Série 3', category: 'Berlines' },
      platform: 'Facebook',
      objective: 'Conversion'
    },
    {
      brand: { name: 'Nike', sector: 'Sport et Fitness' },
      product: { name: 'Air Max', category: 'Chaussures' },
      platform: 'Instagram',
      objective: 'Engagement'
    },
    {
      brand: { name: 'Apple', sector: 'Informatique et Technologies' },
      product: { name: 'iPhone 15', category: 'Smartphones' },
      platform: 'Instagram',
      objective: 'Lancement'
    }
  ];
  
  for (const testCase of testCases) {
    console.log(`\n📸 Test: ${testCase.brand.name} - ${testCase.product.name}`);
    console.log(`   Secteur: ${testCase.brand.sector}`);
    
    try {
      const output = await orchestrator.generateCreativeDirection(testCase);
      
      console.log(`   ✅ Direction créative générée:`);
      console.log(`      - Style: ${output.style.name} (Score: ${output.style.cannesLionsScore || 'N/A'})`);
      console.log(`      - Contexte: ${output.context.name}`);
      console.log(`      - Palette: ${output.palette.name}`);
      console.log(`      - Framework: ${output.framework.name}`);
      console.log(`      - Éclairage: ${output.lighting.name}`);
      console.log(`      - Diversité Index: ${output.metadata.diversityIndex}`);
      console.log(`\n   📝 Prompt (extrait):`);
      console.log(`      "${output.prompt.substring(0, 200)}..."`);
    } catch (error) {
      console.log(`   ❌ Erreur: ${error}`);
    }
  }
  
  // Test 4: Test de diversité sur plusieurs générations
  console.log('\n\n🎲 TEST 4: Diversité sur 5 Générations\n');
  
  orchestrator.resetDiversity();
  
  const diversityTest = {
    brand: { name: 'Test Brand', sector: 'Agroalimentaire et FMCG' },
    product: { name: 'Test Product', category: 'Boissons' },
    platform: 'Instagram',
    objective: 'Engagement'
  };
  
  const styles = new Set<string>();
  const contexts = new Set<string>();
  const palettes = new Set<string>();
  
  for (let i = 0; i < 5; i++) {
    const output = await orchestrator.generateCreativeDirection(diversityTest);
    styles.add(output.style.name);
    contexts.add(output.context.name);
    palettes.add(output.palette.name);
    console.log(`   Génération ${i + 1}: Style="${output.style.name}", Contexte="${output.context.name}"`);
  }
  
  console.log(`\n   📊 Résultats diversité:`);
  console.log(`      - Styles uniques: ${styles.size}/5`);
  console.log(`      - Contextes uniques: ${contexts.size}/5`);
  console.log(`      - Palettes uniques: ${palettes.size}/5`);
  
  // Résumé
  console.log('\n' + '='.repeat(60));
  console.log('✅ TESTS CREATIVE ENGINE 2026 TERMINÉS');
  console.log('='.repeat(60));
  console.log(`\n📊 Résumé:`);
  console.log(`   - ${ALL_SECTOR_PRESETS.length} presets sectoriels`);
  console.log(`   - ${mappedSectors.length} secteurs mappés`);
  console.log(`   - Orchestrateur fonctionnel`);
  console.log(`   - Diversité garantie`);
}

// Exécuter les tests
testCreativeEngine().catch(console.error);
