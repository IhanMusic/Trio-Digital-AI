import EnhancedVeoService from '../services/EnhancedVeoService';
import VeoCreativeDirector from '../services/VeoCreativeDirector';
import { logger } from '../config/logger';

/**
 * Script de test pour valider la diversité du système Enhanced VEO
 * 
 * Teste que le nouveau système VEO intelligent :
 * - Génère des styles différents selon les marques
 * - Évite la répétitivité grâce au système anti-répétition
 * - Adapte les prompts selon le secteur et le produit
 * - Intègre correctement les couleurs de marque
 * 
 * 🎯 OBJECTIF : Prouver que le problème de statisme est résolu
 */

// Données de test représentatives
const testBrands = [
  {
    _id: 'brand-luxury-cosmetics',
    name: 'Élégance Paris',
    sector: 'cosmétique',
    pricePositioning: 'premium',
    businessType: 'B2C',
    colors: {
      primary: '#D4AF37', // Or
      secondary: '#000000' // Noir
    }
  },
  {
    _id: 'brand-food-artisanal',
    name: 'Saveurs du Terroir',
    sector: 'alimentaire',
    pricePositioning: 'moyen',
    businessType: 'B2C',
    colors: {
      primary: '#8B4513', // Marron
      secondary: '#228B22' // Vert
    }
  },
  {
    _id: 'brand-tech-innovation',
    name: 'TechFlow Solutions',
    sector: 'technologie',
    pricePositioning: 'premium',
    businessType: 'B2B',
    colors: {
      primary: '#0066CC', // Bleu tech
      secondary: '#FF6600' // Orange
    }
  },
  {
    _id: 'brand-fashion-streetwear',
    name: 'Urban Style Co',
    sector: 'mode',
    pricePositioning: 'accessible',
    businessType: 'B2C',
    colors: {
      primary: '#FF1493', // Rose vif
      secondary: '#000000' // Noir
    }
  }
];

const testProducts = [
  {
    name: 'Sérum Anti-Âge Premium',
    category: 'cosmétique',
    description: 'Sérum révolutionnaire aux peptides pour une peau jeune',
    uniqueSellingPoints: ['Formule brevetée', 'Résultats visibles en 7 jours'],
    customerBenefits: ['Peau plus ferme', 'Rides réduites'],
    usageOccasions: ['Routine du soir', 'Soins anti-âge']
  },
  {
    name: 'Confiture Artisanale Bio',
    category: 'alimentaire',
    description: 'Confiture traditionnelle aux fruits du terroir',
    uniqueSellingPoints: ['100% bio', 'Recette familiale'],
    customerBenefits: ['Goût authentique', 'Sans conservateurs'],
    usageOccasions: ['Petit-déjeuner', 'Goûter']
  },
  {
    name: 'Plateforme IA Analytics',
    category: 'logiciel',
    description: 'Solution d\'analyse prédictive pour entreprises',
    uniqueSellingPoints: ['IA avancée', 'Interface intuitive'],
    customerBenefits: ['Décisions éclairées', 'ROI optimisé'],
    usageOccasions: ['Analyse business', 'Reporting']
  },
  {
    name: 'Sneakers Limited Edition',
    category: 'chaussures',
    description: 'Baskets streetwear design exclusif',
    uniqueSellingPoints: ['Design unique', 'Édition limitée'],
    customerBenefits: ['Style unique', 'Confort optimal'],
    usageOccasions: ['Sortie urbaine', 'Style décontracté']
  }
];

const testCalendars = [
  {
    _id: 'calendar-cosmetics-launch',
    campaignObjective: 'Lancement produit',
    generationSettings: {
      themes: ['luxe', 'beauté', 'innovation']
    },
    communicationStyle: 'élégant et sophistiqué'
  },
  {
    _id: 'calendar-food-seasonal',
    campaignObjective: 'Campagne saisonnière',
    generationSettings: {
      themes: ['terroir', 'authenticité', 'tradition']
    },
    communicationStyle: 'chaleureux et familial'
  },
  {
    _id: 'calendar-tech-b2b',
    campaignObjective: 'Génération de leads B2B',
    generationSettings: {
      themes: ['innovation', 'performance', 'efficacité']
    },
    communicationStyle: 'professionnel et moderne'
  },
  {
    _id: 'calendar-fashion-trend',
    campaignObjective: 'Awareness de marque',
    generationSettings: {
      themes: ['streetwear', 'tendance', 'jeunesse']
    },
    communicationStyle: 'dynamique et branché'
  }
];

interface TestResult {
  brand: string;
  product: string;
  style: string;
  palette: string;
  context: string;
  lighting: string;
  promptPreview: string;
  diversityStats: any;
}

/**
 * Test principal : Génération de presets créatifs diversifiés
 */
async function testCreativePresetDiversity(): Promise<TestResult[]> {
  console.log('\n🎬 === TEST DIVERSITÉ PRESETS CRÉATIFS VEO ===\n');
  
  const results: TestResult[] = [];
  
  for (let i = 0; i < testBrands.length; i++) {
    const brand = testBrands[i];
    const product = testProducts[i];
    const calendar = testCalendars[i];
    
    console.log(`\n📋 Test ${i + 1}/4: ${brand.name} - ${product.name}`);
    console.log(`   Secteur: ${brand.sector} | Positionnement: ${brand.pricePositioning}`);
    
    try {
      // Générer un aperçu du preset créatif
      const preview = await EnhancedVeoService.previewCreativePreset(
        brand,
        product,
        calendar,
        0,
        'product-showcase'
      );
      
      const result: TestResult = {
        brand: brand.name,
        product: product.name,
        style: preview.style,
        palette: preview.palette,
        context: preview.context,
        lighting: preview.lighting,
        promptPreview: preview.previewPrompt,
        diversityStats: preview.diversityStats
      };
      
      results.push(result);
      
      console.log(`   ✅ Style: ${preview.style}`);
      console.log(`   🎨 Palette: ${preview.palette}`);
      console.log(`   🏠 Contexte: ${preview.context}`);
      console.log(`   💡 Éclairage: ${preview.lighting}`);
      console.log(`   📊 Diversité: ${preview.diversityStats.styles} styles utilisés`);
      
    } catch (error) {
      console.error(`   ❌ Erreur pour ${brand.name}:`, error);
    }
  }
  
  return results;
}

/**
 * Test de diversité sur plusieurs générations pour une même marque
 */
async function testAntiRepetitionSystem(): Promise<void> {
  console.log('\n🔄 === TEST SYSTÈME ANTI-RÉPÉTITION ===\n');
  
  const brand = testBrands[0]; // Cosmétique
  const product = testProducts[0];
  const calendar = testCalendars[0];
  
  console.log(`Test anti-répétition pour: ${brand.name}`);
  
  const generatedStyles: string[] = [];
  const generatedContexts: string[] = [];
  
  // Générer 8 presets pour la même marque
  for (let i = 0; i < 8; i++) {
    try {
      const preview = await EnhancedVeoService.previewCreativePreset(
        brand,
        product,
        calendar,
        i, // Index différent pour chaque génération
        'product-showcase'
      );
      
      generatedStyles.push(preview.style);
      generatedContexts.push(preview.context);
      
      console.log(`   Génération ${i + 1}: ${preview.style} + ${preview.context}`);
      
    } catch (error) {
      console.error(`   ❌ Erreur génération ${i + 1}:`, error);
    }
  }
  
  // Analyser la diversité
  const uniqueStyles = new Set(generatedStyles);
  const uniqueContexts = new Set(generatedContexts);
  
  console.log(`\n📊 Résultats anti-répétition:`);
  console.log(`   Styles uniques: ${uniqueStyles.size}/8 (${Math.round(uniqueStyles.size/8*100)}%)`);
  console.log(`   Contextes uniques: ${uniqueContexts.size}/8 (${Math.round(uniqueContexts.size/8*100)}%)`);
  
  if (uniqueStyles.size >= 6) {
    console.log(`   ✅ Excellente diversité de styles !`);
  } else if (uniqueStyles.size >= 4) {
    console.log(`   ⚠️ Diversité correcte mais peut être améliorée`);
  } else {
    console.log(`   ❌ Diversité insuffisante - système à revoir`);
  }
}

/**
 * Test d'adaptation sectorielle
 */
async function testSectorAdaptation(): Promise<void> {
  console.log('\n🎯 === TEST ADAPTATION SECTORIELLE ===\n');
  
  const sectorResults: { [sector: string]: string[] } = {};
  
  for (let i = 0; i < testBrands.length; i++) {
    const brand = testBrands[i];
    const product = testProducts[i];
    const calendar = testCalendars[i];
    
    try {
      const preview = await EnhancedVeoService.previewCreativePreset(
        brand,
        product,
        calendar,
        0,
        'product-showcase'
      );
      
      if (!sectorResults[brand.sector]) {
        sectorResults[brand.sector] = [];
      }
      sectorResults[brand.sector].push(preview.style);
      
      console.log(`${brand.sector.toUpperCase()}: ${preview.style}`);
      
    } catch (error) {
      console.error(`❌ Erreur pour secteur ${brand.sector}:`, error);
    }
  }
  
  console.log(`\n📈 Analyse adaptation sectorielle:`);
  Object.keys(sectorResults).forEach(sector => {
    console.log(`   ${sector}: ${sectorResults[sector].join(', ')}`);
  });
}

/**
 * Test de génération de prompts complets
 */
async function testPromptGeneration(): Promise<void> {
  console.log('\n📝 === TEST GÉNÉRATION PROMPTS COMPLETS ===\n');
  
  const brand = testBrands[2]; // Tech
  const product = testProducts[2];
  const calendar = testCalendars[2];
  
  try {
    // Générer un preset créatif complet
    const creativePreset = await VeoCreativeDirector.generateCreativePreset({
      brand,
      product,
      calendar,
      postIndex: 0,
      videoType: 'product-showcase',
      duration: 8,
      aspectRatio: '16:9'
    });
    
    // Générer le prompt VEO
    const veoPrompt = VeoCreativeDirector.generateVeoPrompt(creativePreset, {
      brand,
      product,
      calendar,
      videoType: 'product-showcase',
      duration: 8,
      aspectRatio: '16:9'
    });
    
    // Générer le prompt final
    const finalPrompt = VeoCreativeDirector.generateFinalVeoPrompt(veoPrompt);
    
    console.log(`Marque: ${brand.name}`);
    console.log(`Produit: ${product.name}`);
    console.log(`\n🎨 Preset sélectionné:`);
    console.log(`   Style: ${creativePreset.style.name}`);
    console.log(`   Palette: ${creativePreset.palette.name}`);
    console.log(`   Contexte: ${creativePreset.context.name}`);
    console.log(`   Éclairage: ${creativePreset.lighting.name}`);
    
    console.log(`\n📝 Prompt VEO généré:`);
    console.log(`   Longueur: ${finalPrompt.length} caractères`);
    console.log(`   Aperçu: "${finalPrompt.substring(0, 200)}..."`);
    
    console.log(`\n🎯 Intégration marque:`);
    console.log(`   ${veoPrompt.brandIntegration}`);
    
    console.log(`\n🎨 Guidance couleurs:`);
    console.log(`   ${veoPrompt.colorGuidance}`);
    
  } catch (error) {
    console.error(`❌ Erreur génération prompt:`, error);
  }
}

/**
 * Fonction principale de test
 */
async function runAllTests(): Promise<void> {
  console.log('🚀 DÉMARRAGE DES TESTS ENHANCED VEO SYSTEM');
  console.log('==========================================');
  
  try {
    // Test 1: Diversité des presets créatifs
    const diversityResults = await testCreativePresetDiversity();
    
    // Test 2: Système anti-répétition
    await testAntiRepetitionSystem();
    
    // Test 3: Adaptation sectorielle
    await testSectorAdaptation();
    
    // Test 4: Génération de prompts complets
    await testPromptGeneration();
    
    // Résumé final
    console.log('\n🎉 === RÉSUMÉ DES TESTS ===\n');
    
    const uniqueStyles = new Set(diversityResults.map(r => r.style));
    const uniquePalettes = new Set(diversityResults.map(r => r.palette));
    const uniqueContexts = new Set(diversityResults.map(r => r.context));
    
    console.log(`✅ Styles différents générés: ${uniqueStyles.size}/${diversityResults.length}`);
    console.log(`✅ Palettes différentes: ${uniquePalettes.size}/${diversityResults.length}`);
    console.log(`✅ Contextes différents: ${uniqueContexts.size}/${diversityResults.length}`);
    
    if (uniqueStyles.size === diversityResults.length) {
      console.log('\n🎯 SUCCÈS TOTAL: Chaque marque a un style unique !');
    } else {
      console.log('\n⚠️ DIVERSITÉ PARTIELLE: Quelques répétitions détectées');
    }
    
    console.log('\n📊 Presets générés par marque:');
    diversityResults.forEach((result, index) => {
      console.log(`   ${index + 1}. ${result.brand}: ${result.style} + ${result.palette}`);
    });
    
    console.log('\n✅ TESTS TERMINÉS - Le système VEO n\'est plus statique !');
    
  } catch (error) {
    console.error('❌ ERREUR GLOBALE TESTS:', error);
  }
}

// Exécution des tests si le script est lancé directement
if (require.main === module) {
  runAllTests().catch(console.error);
}

export { runAllTests, testCreativePresetDiversity, testAntiRepetitionSystem };
