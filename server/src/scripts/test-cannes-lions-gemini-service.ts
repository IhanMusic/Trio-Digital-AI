/**
 * Script de test pour CannesLionsGeminiService
 * 
 * Test complet du nouveau service optimisé pour la génération d'images
 * publicitaires de niveau Cannes Lions avec Gemini 3 Pro
 */

import dotenv from 'dotenv';
import path from 'path';

// Configuration de l'environnement
dotenv.config({ path: path.join(process.cwd(), '.env') });

import { CannesLionsGeminiService, BrandContext, ProductContext, CalendarContext } from '../services/CannesLionsGeminiService';
import { logger } from '../config/logger';

// ==========================================
// DONNÉES DE TEST RÉALISTES
// ==========================================

const mockBrandContext: BrandContext = {
  _id: 'test-brand-001',
  name: 'Éco-Délice',
  sector: 'Alimentation et Boissons',
  description: 'Marque française de produits bio et équitables, spécialisée dans les yaourts artisanaux aux fruits de saison.',
  colors: {
    primary: '#2E7D32', // Vert nature
    secondary: '#FFF8E1', // Crème naturel
    accent: '#FF6F00'     // Orange énergique
  },
  businessType: 'B2C (Business to Consumer)',
  companyStage: 'PME (5-20 ans)',
  pricePositioning: 'Premium',
  competitors: ['Danone Bio', 'Les 2 Vaches', 'La Fermière'],
  mission: 'Offrir des produits laitiers bio de qualité supérieure tout en soutenant l\'agriculture locale et durable',
  values: ['Bio', 'Local', 'Artisanal', 'Équitable', 'Durabilité']
};

const mockProductContexts: ProductContext[] = [
  {
    _id: 'test-product-001',
    name: 'Yaourt Bio aux Fruits Rouges',
    description: 'Yaourt onctueux au lait de vaches normandes, enrichi de fruits rouges bio de nos producteurs partenaires.',
    category: 'Yaourts aux fruits',
    images: {
      main: 'https://example.com/yaourt-fruits-rouges.jpg',
      gallery: ['https://example.com/yaourt-detail1.jpg', 'https://example.com/yaourt-detail2.jpg']
    },
    uniqueSellingPoints: [
      'Lait de vaches normandes élevées au pâturage',
      'Fruits bio locaux de saison',
      'Texture onctueuse artisanale',
      'Sans additifs ni conservateurs',
      'Pot en verre consigné'
    ],
    customerBenefits: [
      'Goût authentique et naturel',
      'Apport en probiotiques naturels',
      'Soutien à l\'agriculture locale',
      'Emballage écologique réutilisable',
      'Traçabilité complète des ingrédients'
    ],
    targetAudience: {
      demographic: ['25-44 ans', 'Familles', 'Femmes'],
      lifestyle: ['Soucieux de leur santé', 'Eco-conscients', 'Parents'],
      psychographic: ['Recherchent la qualité', 'Sensibles à l\'origine', 'Innovateurs'],
      geographic: ['Urbain', 'Périurbain']
    },
    keywords: ['bio', 'local', 'artisanal', 'fruits rouges', 'normandie', 'probiotiques'],
    certifications: ['Agriculture Biologique', 'Origine France Garantie'],
    labels: ['Bio', 'Local', 'Artisanal'],
    technicalSheet: {
      ingredients: ['Lait entier bio', 'Fruits rouges bio 15%', 'Ferments lactiques', 'Sucre de canne bio'],
      nutritionalInfo: 'Protéines: 4.2g, Lipides: 3.8g, Glucides: 12.5g pour 100g',
      usage: 'À consommer frais, idéal au petit-déjeuner ou en collation',
      storage: 'À conserver entre 0°C et 4°C, à consommer dans les 7 jours après ouverture',
      highlights: 'Riche en probiotiques naturels, source de calcium et protéines'
    }
  }
];

const mockCalendarContext: CalendarContext = {
  _id: 'test-calendar-001',
  name: 'Campagne Automne 2024 - Éco-Délice',
  targetCountry: 'FR',
  targetLanguages: ['fr'],
  socialNetworks: ['Instagram', 'Facebook', 'TikTok'],
  contentTypes: ['Photo produit', 'Lifestyle', 'Unboxing'],
  communicationStyle: 'Authentique et chaleureux',
  selectedProducts: ['test-product-001'],
  generationSettings: {
    tone: 'authentique',
    themes: ['nature', 'artisanal', 'famille', 'bien-être'],
    keywords: ['bio', 'local', 'artisanal', 'savoureux'],
    imageStyle: ['naturel', 'chaleureux', 'premium'],
    integrateProductImages: true
  }
};

// ==========================================
// SCÉNARIOS DE TEST
// ==========================================

async function testBasicGeneration() {
  console.log('\n🧪 TEST 1: Génération basique niveau Cannes Lions');
  console.log('================================================');
  
  try {
    const creativePrompt = `
      Créez une image publicitaire premium pour notre yaourt bio aux fruits rouges.
      L'image doit montrer le produit dans un environnement naturel et authentique,
      avec une mise en scène qui évoque la qualité artisanale et l'origine locale.
      Style photographique professionnel, éclairage naturel, composition équilibrée.
    `;
    
    const result = await CannesLionsGeminiService.generateCannesLionsImage(
      mockBrandContext,
      mockProductContexts,
      mockCalendarContext,
      creativePrompt,
      {
        numberOfImages: 1,
        imageSize: '2K',
        aspectRatio: '1:1'
      }
    );
    
    console.log('✅ Génération réussie !');
    console.log(`📊 Métadonnées:`);
    console.log(`   - Images générées: ${result.images.length}`);
    console.log(`   - Temps de traitement: ${result.metadata.processingTime}ms`);
    console.log(`   - Prompt utilisé: ${result.metadata.promptUsed.substring(0, 100)}...`);
    console.log(`   - Adaptation culturelle: ${result.metadata.culturalAdaptation.country}`);
    
    result.images.forEach((image, index) => {
      console.log(`   - Image ${index + 1}:`);
      console.log(`     URL: ${image.url}`);
      console.log(`     Dimensions: ${image.width}x${image.height}`);
      console.log(`     Qualité: ${image.qualityScore}%`);
      console.log(`     Conformité marque: ${image.brandCompliance}%`);
      console.log(`     Fidélité produit: ${image.productFidelity}%`);
    });
    
    return result;
    
  } catch (error) {
    console.error('❌ Erreur lors du test basique:', error);
    throw error;
  }
}

async function testMultiPlatformGeneration() {
  console.log('\n🧪 TEST 2: Génération multi-plateformes');
  console.log('=======================================');
  
  try {
    const creativePrompt = `
      Créez une campagne visuelle cohérente pour notre yaourt bio,
      adaptée aux différents réseaux sociaux. L'image doit être
      moderne, engageante et mettre en valeur l'aspect premium du produit.
    `;
    
    const platforms = ['Instagram', 'TikTok', 'LinkedIn'];
    
    const results = await CannesLionsGeminiService.generateForPlatforms(
      mockBrandContext,
      mockProductContexts,
      mockCalendarContext,
      creativePrompt,
      platforms
    );
    
    console.log('✅ Génération multi-plateformes réussie !');
    
    for (const [platform, result] of Object.entries(results)) {
      console.log(`📱 ${platform}:`);
      console.log(`   - Images: ${result.images.length}`);
      console.log(`   - Format: ${result.metadata.generationParams.aspectRatio}`);
      console.log(`   - Résolution: ${result.metadata.generationParams.imageSize}`);
      console.log(`   - Qualité moyenne: ${Math.round(result.images.reduce((acc, img) => acc + (img.qualityScore || 0), 0) / result.images.length)}%`);
    }
    
    return results;
    
  } catch (error) {
    console.error('❌ Erreur lors du test multi-plateformes:', error);
    throw error;
  }
}

async function testLuxuryBrandGeneration() {
  console.log('\n🧪 TEST 3: Génération pour marque de luxe');
  console.log('==========================================');
  
  try {
    // Modifier le contexte pour une marque de luxe
    const luxuryBrand: BrandContext = {
      ...mockBrandContext,
      name: 'Délices d\'Exception',
      pricePositioning: 'Luxury / Haut de gamme',
      businessType: 'B2C (Business to Consumer)',
      mission: 'Créer des expériences gustatives d\'exception avec les meilleurs ingrédients du monde',
      colors: {
        primary: '#1A1A1A', // Noir élégant
        secondary: '#D4AF37', // Or
        accent: '#FFFFFF'     // Blanc pur
      }
    };
    
    const creativePrompt = `
      Créez une image publicitaire ultra-premium pour notre yaourt d'exception.
      Style photographique de luxe, éclairage dramatique, matériaux nobles,
      composition sophistiquée avec beaucoup d'espace négatif.
      L'image doit évoquer l'exclusivité et le raffinement absolu.
    `;
    
    const result = await CannesLionsGeminiService.generateCannesLionsImage(
      luxuryBrand,
      mockProductContexts,
      mockCalendarContext,
      creativePrompt,
      {
        numberOfImages: 1,
        imageSize: '4K', // Maximum pour le luxe
        aspectRatio: '3:4'
      }
    );
    
    console.log('✅ Génération luxe réussie !');
    console.log(`💎 Style détecté: ${result.metadata.generationParams.imageSize} - Luxe`);
    console.log(`🎨 Preset utilisé: Luxury Premium Photography`);
    console.log(`📊 Score qualité: ${result.images[0]?.qualityScore}%`);
    
    return result;
    
  } catch (error) {
    console.error('❌ Erreur lors du test luxe:', error);
    throw error;
  }
}

async function testVariationsGeneration() {
  console.log('\n🧪 TEST 4: Génération de variations');
  console.log('===================================');
  
  try {
    // D'abord générer une image de base
    const basePrompt = `
      Image publicitaire moderne pour yaourt bio aux fruits rouges,
      style lifestyle naturel et authentique.
    `;
    
    const baseResult = await CannesLionsGeminiService.generateCannesLionsImage(
      mockBrandContext,
      mockProductContexts,
      mockCalendarContext,
      basePrompt,
      { numberOfImages: 1, imageSize: '2K' }
    );
    
    console.log('✅ Image de base générée');
    
    // Ensuite générer des variations
    const variationPrompts = [
      'Version avec éclairage plus chaud et ambiance cocooning',
      'Version avec mise en scène outdoor, pique-nique familial',
      'Version minimaliste avec focus sur la texture du yaourt'
    ];
    
    const variations = await CannesLionsGeminiService.generateVariations(
      baseResult,
      variationPrompts,
      { imageSize: '2K' }
    );
    
    console.log(`✅ ${variations.length} variations générées !`);
    
    variations.forEach((variation, index) => {
      console.log(`🔄 Variation ${index + 1}:`);
      console.log(`   - Prompt: ${variationPrompts[index]}`);
      console.log(`   - Qualité: ${variation.images[0]?.qualityScore}%`);
      console.log(`   - Temps: ${variation.metadata.processingTime}ms`);
    });
    
    return variations;
    
  } catch (error) {
    console.error('❌ Erreur lors du test variations:', error);
    throw error;
  }
}

async function testCulturalAdaptation() {
  console.log('\n🧪 TEST 5: Adaptation culturelle');
  console.log('=================================');
  
  try {
    const cultures = [
      { country: 'FR', languages: ['fr'], name: 'France' },
      { country: 'US', languages: ['en'], name: 'États-Unis' },
      { country: 'JP', languages: ['ja'], name: 'Japon' }
    ];
    
    const creativePrompt = `
      Créez une image publicitaire pour notre yaourt bio qui respecte
      les codes visuels et culturels du marché cible.
    `;
    
    const results = [];
    
    for (const culture of cultures) {
      const culturalCalendar: CalendarContext = {
        ...mockCalendarContext,
        targetCountry: culture.country,
        targetLanguages: culture.languages
      };
      
      const result = await CannesLionsGeminiService.generateCannesLionsImage(
        mockBrandContext,
        mockProductContexts,
        culturalCalendar,
        creativePrompt,
        { numberOfImages: 1, imageSize: '2K' }
      );
      
      console.log(`🌍 ${culture.name}:`);
      console.log(`   - Codes visuels: ${result.metadata.culturalAdaptation.visualCodes.join(', ')}`);
      console.log(`   - Couleurs culturelles: ${result.metadata.culturalAdaptation.colorPreferences.join(', ')}`);
      console.log(`   - Valeurs: ${result.metadata.culturalAdaptation.culturalValues.join(', ')}`);
      console.log(`   - Qualité: ${result.images[0]?.qualityScore}%`);
      
      results.push({ culture: culture.name, result });
    }
    
    console.log('✅ Adaptation culturelle testée avec succès !');
    return results;
    
  } catch (error) {
    console.error('❌ Erreur lors du test culturel:', error);
    throw error;
  }
}

// ==========================================
// FONCTION PRINCIPALE DE TEST
// ==========================================

async function runAllTests() {
  console.log('🚀 DÉMARRAGE DES TESTS CANNES LIONS GEMINI SERVICE');
  console.log('==================================================');
  
  // Vérifier la configuration
  if (!process.env.GOOGLE_API_KEY) {
    console.error('❌ GOOGLE_API_KEY non configurée dans .env');
    process.exit(1);
  }
  
  console.log('✅ Configuration vérifiée');
  console.log(`🔑 Google API Key: ${process.env.GOOGLE_API_KEY.substring(0, 10)}...`);
  
  const results: {
    basic: any;
    multiPlatform: any;
    luxury: any;
    variations: any;
    cultural: any;
  } = {
    basic: null,
    multiPlatform: null,
    luxury: null,
    variations: null,
    cultural: null
  };
  
  try {
    // Test 1: Génération basique
    results.basic = await testBasicGeneration();
    
    // Attendre entre les tests pour respecter le rate limit
    console.log('\n⏳ Attente 30s pour respecter le rate limit...');
    await new Promise(resolve => setTimeout(resolve, 30000));
    
    // Test 2: Multi-plateformes
    results.multiPlatform = await testMultiPlatformGeneration();
    
    // Attendre entre les tests
    console.log('\n⏳ Attente 30s pour respecter le rate limit...');
    await new Promise(resolve => setTimeout(resolve, 30000));
    
    // Test 3: Marque de luxe
    results.luxury = await testLuxuryBrandGeneration();
    
    // Attendre entre les tests
    console.log('\n⏳ Attente 30s pour respecter le rate limit...');
    await new Promise(resolve => setTimeout(resolve, 30000));
    
    // Test 4: Variations
    results.variations = await testVariationsGeneration();
    
    // Attendre entre les tests
    console.log('\n⏳ Attente 30s pour respecter le rate limit...');
    await new Promise(resolve => setTimeout(resolve, 30000));
    
    // Test 5: Adaptation culturelle
    results.cultural = await testCulturalAdaptation();
    
  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
  }
  
  // Résumé final
  console.log('\n🏆 RÉSUMÉ DES TESTS');
  console.log('==================');
  
  const testResults = [
    { name: 'Génération basique', success: !!results.basic },
    { name: 'Multi-plateformes', success: !!results.multiPlatform },
    { name: 'Marque de luxe', success: !!results.luxury },
    { name: 'Variations', success: !!results.variations },
    { name: 'Adaptation culturelle', success: !!results.cultural }
  ];
  
  testResults.forEach(test => {
    console.log(`${test.success ? '✅' : '❌'} ${test.name}`);
  });
  
  const successCount = testResults.filter(t => t.success).length;
  const totalTests = testResults.length;
  
  console.log(`\n📊 Résultat global: ${successCount}/${totalTests} tests réussis`);
  
  if (successCount === totalTests) {
    console.log('🎉 TOUS LES TESTS SONT PASSÉS ! Le service CannesLionsGeminiService est opérationnel.');
  } else {
    console.log('⚠️ Certains tests ont échoué. Vérifiez les logs ci-dessus.');
  }
  
  return results;
}

// Exécution si appelé directement
if (require.main === module) {
  runAllTests()
    .then(() => {
      console.log('\n✅ Tests terminés');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Erreur fatale:', error);
      process.exit(1);
    });
}

export { runAllTests };
