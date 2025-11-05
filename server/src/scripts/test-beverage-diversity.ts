/**
 * Script de test spécifique pour les boissons
 * Diagnostique le problème de répétition pour les produits de type boisson
 */

import { 
  getRelevantPresetsForGPT, 
  PHOTOGRAPHIC_STYLES,
  SECTOR_TO_CATEGORIES,
  USAGE_TO_CONTEXTS
} from '../services/CreativePresetsLibrary';

// Données de test pour boissons
const beverageBrand = {
  name: 'Marque Boisson',
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
  _id: 'beverage-calendar-123',
  campaignObjective: 'Awareness'
};

console.log('🥤 TEST SPÉCIFIQUE BOISSONS - DIAGNOSTIC RÉPÉTITION');
console.log('==================================================\n');

// Test 1: Vérifier le mapping secteur pour boissons
console.log('📊 Test 1: Mapping secteur "beverage"');
const beverageCategories = SECTOR_TO_CATEGORIES['beverage'] || SECTOR_TO_CATEGORIES['default'];
console.log(`Catégories pour "beverage": ${beverageCategories.join(', ')}`);

// Compter combien de styles correspondent à ces catégories
const matchingStyles = PHOTOGRAPHIC_STYLES.filter(style =>
  beverageCategories.some(cat => 
    style.category.toLowerCase().includes(cat.toLowerCase())
  )
);

console.log(`✅ Styles disponibles: ${matchingStyles.length}/${PHOTOGRAPHIC_STYLES.length}`);
console.log(`📊 Pourcentage: ${((matchingStyles.length / PHOTOGRAPHIC_STYLES.length) * 100).toFixed(1)}%`);

// Test 2: Vérifier le pré-filtrage complet
console.log('\n📊 Test 2: Pré-filtrage complet pour boissons');
const filteredPresets = getRelevantPresetsForGPT(beverageBrand, beverageProduct, testCalendar);

console.log(`✅ Styles filtrés: ${filteredPresets.styles.length}/${PHOTOGRAPHIC_STYLES.length}`);
console.log(`✅ Contextes filtrés: ${filteredPresets.contexts.length}`);

console.log('\n📝 Styles sélectionnés pour boissons:');
filteredPresets.styles.slice(0, 10).forEach((style, i) => {
  console.log(`  ${i + 1}. ${style.name} (${style.category})`);
});

console.log('\n📝 Contextes sélectionnés pour boissons:');
filteredPresets.contexts.forEach((context, i) => {
  console.log(`  ${i + 1}. ${context.name}`);
});

// Test 3: Vérifier le mapping des occasions d'usage
console.log('\n📊 Test 3: Mapping occasions d\'usage pour boissons');
const usageOccasions = ['juice', 'breakfast', 'refreshment', 'healthy-snack'];

usageOccasions.forEach(occasion => {
  const contexts = USAGE_TO_CONTEXTS[occasion] || [];
  console.log(`"${occasion}": ${contexts.length} contextes → ${contexts.slice(0, 3).join(', ')}${contexts.length > 3 ? '...' : ''}`);
});

// Test 4: Identifier les styles spécifiquement boisson
console.log('\n📊 Test 4: Styles spécifiquement boisson');
const beverageSpecificStyles = PHOTOGRAPHIC_STYLES.filter(style =>
  style.category.includes('beverage') || 
  style.name.toLowerCase().includes('drink') ||
  style.name.toLowerCase().includes('juice') ||
  style.name.toLowerCase().includes('cocktail') ||
  style.name.toLowerCase().includes('coffee') ||
  style.name.toLowerCase().includes('tea')
);

console.log(`✅ Styles spécifiques boissons: ${beverageSpecificStyles.length}`);
beverageSpecificStyles.forEach((style, i) => {
  console.log(`  ${i + 1}. ${style.name} (${style.category})`);
});

// Test 5: Problème potentiel - styles "cuisine" pour boissons
console.log('\n🔍 Test 5: Styles "cuisine" qui pourraient causer la répétition');
const kitchenStyles = PHOTOGRAPHIC_STYLES.filter(style =>
  style.name.toLowerCase().includes('kitchen') ||
  style.name.toLowerCase().includes('cuisine') ||
  style.reference.toLowerCase().includes('kitchen')
);

console.log(`⚠️  Styles "cuisine": ${kitchenStyles.length}`);
kitchenStyles.forEach((style, i) => {
  console.log(`  ${i + 1}. ${style.name} (${style.category})`);
});

// Diagnostic final
console.log('\n🎯 DIAGNOSTIC FINAL');
console.log('==================');

if (filteredPresets.styles.length < 10) {
  console.log('❌ PROBLÈME IDENTIFIÉ: Pré-filtrage trop restrictif');
  console.log(`   → Seulement ${filteredPresets.styles.length} styles disponibles`);
  console.log('   → Risque élevé de répétition');
} else {
  console.log('✅ Pré-filtrage acceptable');
}

if (beverageSpecificStyles.length < 5) {
  console.log('❌ PROBLÈME: Peu de styles spécifiques aux boissons');
  console.log('   → Le système utilise des styles génériques');
} else {
  console.log('✅ Styles boissons suffisants');
}

console.log('\n💡 RECOMMANDATIONS:');
if (filteredPresets.styles.length < 15) {
  console.log('1. Élargir le mapping SECTOR_TO_CATEGORIES pour "beverage"');
  console.log('2. Ajouter plus de catégories compatibles (food, lifestyle, studio, etc.)');
}

if (filteredPresets.contexts.length < 8) {
  console.log('3. Enrichir USAGE_TO_CONTEXTS pour les occasions de boissons');
}

console.log('4. Vérifier pourquoi GPT-5 échoue (logs, API, parsing)');
console.log('5. Améliorer le fallback pour éviter les répétitions même avec peu d\'options');
