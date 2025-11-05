#!/usr/bin/env ts-node

/**
 * Script de test RÉALISTE pour valider la correction GPT-5 de diversité des presets
 * 
 * Ce script utilise la vraie API OpenAI pour tester que GPT-5 reçoit bien l'historique 
 * des presets utilisés et génère des presets diversifiés pour un même calendrier.
 * 
 * Usage: npx ts-node server/src/scripts/test-gpt5-diversity-real.ts
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import { selectPresetWithGPT, randomizeFromFilteredPresets } from '../services/GPTPresetSelector';
import { getRelevantPresetsForGPT } from '../services/CreativePresetsLibrary';

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Vérifier que l'API key est disponible
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY manquante dans le fichier .env');
  process.exit(1);
}

console.log('✅ API OpenAI trouvée:', process.env.OPENAI_API_KEY.substring(0, 20) + '...');

// Mock data réalistes pour les tests
const mockBrand = {
  _id: 'test-brand-boissons',
  name: 'FreshDrink',
  sector: 'food',
  description: 'Marque de boissons naturelles et rafraîchissantes',
  colors: {
    primary: '#00B4D8',
    secondary: '#90E0EF',
    accent: '#0077B6'
  },
  values: ['Naturalité', 'Fraîcheur', 'Bien-être'],
  competitors: ['Coca-Cola', 'Pepsi', 'Orangina']
};

const mockProduct = {
  _id: 'test-product-jus',
  name: 'Jus de Fruits Bio',
  category: 'beverage',
  description: 'Jus de fruits 100% naturel sans sucre ajouté',
  uniqueSellingPoints: ['100% bio', 'Sans conservateurs', 'Riche en vitamines'],
  customerBenefits: ['Hydratation naturelle', 'Boost énergétique', 'Goût authentique'],
  usageOccasions: ['Petit-déjeuner', 'Collation', 'Sport', 'Détente']
};

const mockCalendar = {
  _id: 'test-calendar-diversite',
  name: 'Campagne Diversité Test',
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-01-31'),
  frequency: 'daily',
  targetCountry: 'France',
  targetLanguages: ['fr'],
  communicationStyle: 'décontracté',
  generationSettings: {
    themes: ['Naturalité', 'Fraîcheur', 'Bien-être'],
    tone: 'friendly',
    keywords: ['bio', 'naturel', 'frais']
  }
};

/**
 * Test principal : génération de 5 presets consécutifs pour le même calendrier
 */
async function testGPT5Diversity() {
  console.log('\n🎯 === TEST GPT-5 DIVERSITÉ RÉALISTE ===');
  console.log(`Marque: ${mockBrand.name} (${mockBrand.sector})`);
  console.log(`Produit: ${mockProduct.name}`);
  console.log(`Calendrier: ${mockCalendar._id}`);
  console.log(`API OpenAI: ${process.env.OPENAI_API_KEY ? 'Configurée' : 'Manquante'}`);
  
  // Pré-filtrer les presets une seule fois
  console.log('\n📋 Pré-filtrage des presets...');
  const filteredPresets = getRelevantPresetsForGPT(mockBrand, mockProduct, mockCalendar);
  console.log(`✅ ${filteredPresets.styles.length} styles, ${filteredPresets.contexts.length} contextes, ${filteredPresets.palettes.length} palettes`);
  
  const results = [];
  const calendarId = String(mockCalendar._id);
  
  // Générer 5 presets consécutifs pour simuler un calendrier réel
  for (let postIndex = 0; postIndex < 5; postIndex++) {
    console.log(`\n🤖 === POST ${postIndex + 1}/5 ===`);
    
    try {
      // Appel réel à GPT-5 avec l'API OpenAI
      console.log(`📞 Appel GPT-5 pour post ${postIndex + 1}...`);
      const startTime = Date.now();
      
      const gptPreset = await selectPresetWithGPT(
        filteredPresets,
        mockBrand,
        mockProduct,
        mockCalendar,
        postIndex,
        calendarId
      );
      
      const duration = Date.now() - startTime;
      
      if (gptPreset) {
        console.log(`✅ GPT-5 réussi en ${duration}ms`);
        console.log(`   Style: "${gptPreset.style.name}" (${gptPreset.style.category})`);
        console.log(`   Context: "${gptPreset.context.name}"`);
        console.log(`   Palette: "${gptPreset.palette.name}"`);
        console.log(`   Framework: "${gptPreset.framework.name}"`);
        console.log(`   Lighting: "${gptPreset.lighting.name}"`);
        
        results.push({
          postIndex: postIndex + 1,
          source: 'GPT-5',
          style: gptPreset.style.name,
          context: gptPreset.context.name,
          palette: gptPreset.palette.name,
          framework: gptPreset.framework.name,
          lighting: gptPreset.lighting.name,
          duration
        });
      } else {
        console.log('⚠️  GPT-5 a échoué, utilisation du fallback');
        
        // Fallback avec système anti-répétition
        const fallbackPreset = randomizeFromFilteredPresets(
          filteredPresets,
          postIndex,
          calendarId,
          String(mockBrand._id),
          postIndex
        );
        
        console.log(`🔄 Fallback utilisé`);
        console.log(`   Style: "${fallbackPreset.style.name}" (${fallbackPreset.style.category})`);
        console.log(`   Context: "${fallbackPreset.context.name}"`);
        console.log(`   Palette: "${fallbackPreset.palette.name}"`);
        
        results.push({
          postIndex: postIndex + 1,
          source: 'Fallback',
          style: fallbackPreset.style.name,
          context: fallbackPreset.context.name,
          palette: fallbackPreset.palette.name,
          framework: fallbackPreset.framework.name,
          lighting: fallbackPreset.lighting.name,
          duration
        });
      }
      
      // Attendre 1 seconde entre les appels pour respecter les rate limits
      if (postIndex < 4) {
        console.log('⏳ Attente 1s (rate limit)...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
    } catch (error: any) {
      console.error(`❌ Erreur post ${postIndex + 1}:`, error.message);
      
      // En cas d'erreur, utiliser le fallback
      const fallbackPreset = randomizeFromFilteredPresets(
        filteredPresets,
        postIndex,
        calendarId,
        String(mockBrand._id),
        postIndex
      );
      
      results.push({
        postIndex: postIndex + 1,
        source: 'Fallback (Erreur)',
        style: fallbackPreset.style.name,
        context: fallbackPreset.context.name,
        palette: fallbackPreset.palette.name,
        framework: fallbackPreset.framework.name,
        lighting: fallbackPreset.lighting.name,
        duration: 0,
        error: error.message
      });
    }
  }
  
  // Analyse des résultats
  console.log('\n📊 === ANALYSE DES RÉSULTATS ===');
  
  // Compter les sources
  const gptCount = results.filter(r => r.source === 'GPT-5').length;
  const fallbackCount = results.filter(r => r.source.includes('Fallback')).length;
  
  console.log(`🤖 GPT-5 réussi: ${gptCount}/5 (${(gptCount/5*100).toFixed(1)}%)`);
  console.log(`🔄 Fallback utilisé: ${fallbackCount}/5 (${(fallbackCount/5*100).toFixed(1)}%)`);
  
  // Analyser la diversité
  const uniqueStyles = new Set(results.map(r => r.style)).size;
  const uniqueContexts = new Set(results.map(r => r.context)).size;
  const uniquePalettes = new Set(results.map(r => r.palette)).size;
  
  console.log(`\n🎨 DIVERSITÉ OBTENUE:`);
  console.log(`   Styles uniques: ${uniqueStyles}/5 (${(uniqueStyles/5*100).toFixed(1)}%)`);
  console.log(`   Contextes uniques: ${uniqueContexts}/5 (${(uniqueContexts/5*100).toFixed(1)}%)`);
  console.log(`   Palettes uniques: ${uniquePalettes}/5 (${(uniquePalettes/5*100).toFixed(1)}%)`);
  
  // Score de diversité global
  const diversityScore = Math.round((uniqueStyles + uniqueContexts + uniquePalettes) / 15 * 100);
  console.log(`\n🏆 SCORE DE DIVERSITÉ: ${diversityScore}/100`);
  
  if (diversityScore >= 80) {
    console.log('✅ EXCELLENT - Diversité maximale atteinte');
  } else if (diversityScore >= 60) {
    console.log('⚠️  BON - Diversité acceptable mais améliorable');
  } else {
    console.log('❌ INSUFFISANT - Problème de diversité détecté');
  }
  
  // Tableau détaillé
  console.log('\n📋 DÉTAIL DES RÉSULTATS:');
  console.table(results.map(r => ({
    Post: r.postIndex,
    Source: r.source,
    Style: r.style.substring(0, 20),
    Context: r.context.substring(0, 15),
    Palette: r.palette.substring(0, 15),
    'Durée (ms)': r.duration,
    Erreur: r.error ? 'Oui' : 'Non'
  })));
  
  // Temps moyen GPT-5
  const gptResults = results.filter(r => r.source === 'GPT-5' && r.duration > 0);
  if (gptResults.length > 0) {
    const avgDuration = Math.round(gptResults.reduce((sum, r) => sum + r.duration, 0) / gptResults.length);
    console.log(`⏱️  Temps moyen GPT-5: ${avgDuration}ms`);
  }
  
  // Vérification spécifique du problème "cuisine" pour les boissons
  const cuisineStyles = results.filter(r => r.style.toLowerCase().includes('cuisine') || r.context.toLowerCase().includes('cuisine'));
  if (cuisineStyles.length > 0) {
    console.log(`\n⚠️  ATTENTION: ${cuisineStyles.length} preset(s) avec "cuisine" détecté(s) pour une marque de boissons`);
    console.log('   Cela pourrait indiquer un problème de filtrage sectoriel');
  } else {
    console.log('\n✅ Aucun preset "cuisine" détecté pour cette marque de boissons');
  }
  
  return {
    diversityScore,
    gptSuccessRate: gptCount / 5,
    results
  };
}

// Exécution du test
if (require.main === module) {
  testGPT5Diversity()
    .then((summary) => {
      console.log('\n🎯 === RÉSUMÉ FINAL ===');
      console.log(`Score diversité: ${summary.diversityScore}/100`);
      console.log(`Taux succès GPT-5: ${(summary.gptSuccessRate * 100).toFixed(1)}%`);
      
      if (summary.diversityScore >= 80 && summary.gptSuccessRate >= 0.6) {
        console.log('🎉 TEST RÉUSSI - La correction GPT-5 fonctionne correctement');
        process.exit(0);
      } else {
        console.log('❌ TEST ÉCHOUÉ - Des améliorations sont nécessaires');
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('💥 Erreur fatale:', error);
      process.exit(1);
    });
}

export { testGPT5Diversity };
