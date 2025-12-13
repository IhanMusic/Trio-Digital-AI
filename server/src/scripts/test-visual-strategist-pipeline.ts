import mongoose from 'mongoose';
import dotenv from 'dotenv';
import VisualStrategistService, { VisualStrategyContext } from '../services/VisualStrategistService';
import { IBrand } from '../models/Brand';
import { IProduct } from '../models/Product';

// Charger les variables d'environnement
dotenv.config({ path: '../.env' });

/**
 * 🧪 TEST DU NOUVEAU PIPELINE 3-COUCHES
 * 
 * Ce script teste le VisualStrategistService (COUCHE 1) 
 * pour valider la génération de stratégies visuelles uniques
 * et la diversité créative sur un calendrier complet.
 */

async function testVisualStrategistPipeline() {
  console.log('🧪 === TEST VISUAL STRATEGIST PIPELINE 3-COUCHES ===\n');

  try {
    // Données de test simulées
    const mockBrand: IBrand = {
      _id: new mongoose.Types.ObjectId(),
      name: 'Danone',
      sector: 'Agroalimentaire et FMCG',
      description: 'Leader mondial de l\'alimentation saine et durable',
      colors: {
        primary: '#0066CC',
        secondary: '#00AA44',
        accent: '#FF6600'
      },
      values: ['Santé', 'Naturalité', 'Durabilité'],
      competitors: ['Nestlé', 'Unilever', 'Lactalis'],
      createdBy: new mongoose.Types.ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date()
    } as IBrand;

    const mockProducts: IProduct[] = [
      {
        _id: new mongoose.Types.ObjectId(),
        name: 'Yaourt Nature Bio',
        description: 'Yaourt nature biologique aux ferments lactiques vivants',
        category: 'Produits laitiers',
        uniqueSellingPoints: ['100% Bio', 'Ferments vivants', 'Sans additifs'],
        customerBenefits: ['Digestion facilitée', 'Apport en probiotiques', 'Goût authentique'],
        flavors: ['Nature'],
        certifications: ['AB Bio', 'Ecocert'],
        labels: ['Bio', 'Français'],
        images: {
          main: 'https://example.com/yaourt-nature.jpg'
        },
        brandId: mockBrand._id,
        createdBy: new mongoose.Types.ObjectId(),
        createdAt: new Date(),
        updatedAt: new Date()
      } as IProduct,
      {
        _id: new mongoose.Types.ObjectId(),
        name: 'Yaourt aux Fruits',
        description: 'Yaourt onctueux aux vrais morceaux de fruits',
        category: 'Produits laitiers',
        uniqueSellingPoints: ['Vrais morceaux de fruits', 'Texture onctueuse', 'Recette traditionnelle'],
        customerBenefits: ['Plaisir gustatif', 'Vitamines naturelles', 'Énergie durable'],
        flavors: ['Fraise', 'Pêche', 'Abricot'],
        certifications: ['Label Rouge'],
        labels: ['Français', 'Artisanal'],
        images: {
          main: 'https://example.com/yaourt-fruits.jpg'
        },
        brandId: mockBrand._id,
        createdBy: new mongoose.Types.ObjectId(),
        createdAt: new Date(),
        updatedAt: new Date()
      } as IProduct
    ];

    const calendarId = 'test-calendar-' + Date.now();
    const totalPosts = 10; // Simuler un calendrier de 10 posts
    
    console.log(`📊 Test sur ${totalPosts} posts pour valider la diversité créative\n`);

    // Générer des stratégies pour chaque post
    const strategies = [];
    
    for (let i = 0; i < totalPosts; i++) {
      console.log(`\n🎨 === POST ${i + 1}/${totalPosts} ===`);
      
      const context: VisualStrategyContext = {
        postIndex: i,
        totalPosts: totalPosts,
        brand: mockBrand,
        products: mockProducts,
        platform: 'instagram',
        country: 'France',
        calendarId: calendarId,
        scheduledDate: new Date(Date.now() + (i * 24 * 60 * 60 * 1000)), // Un post par jour
        season: 'winter'
      };

      try {
        const strategy = await VisualStrategistService.generateStrategy(context);
        strategies.push(strategy);
        
        console.log(`✅ Stratégie générée:`);
        console.log(`   📝 Concept: "${strategy.concept}"`);
        console.log(`   📸 Style: "${strategy.photographyStyle}"`);
        console.log(`   🏠 Setting: "${strategy.setting}"`);
        console.log(`   💡 Éclairage: "${strategy.lightingStyle}"`);
        console.log(`   📐 Composition: "${strategy.composition}"`);
        console.log(`   🎭 Mood: "${strategy.mood}"`);
        console.log(`   🌍 Contexte culturel: "${strategy.culturalContext}"`);
        console.log(`   🎯 Angle unique: "${strategy.uniqueAngle}"`);
        console.log(`   📊 Score diversité: ${strategy.diversityScore}/100`);
        
      } catch (error: any) {
        console.error(`❌ Erreur post ${i + 1}:`, error.message);
      }
    }

    // Analyser la diversité globale
    console.log(`\n\n📊 === ANALYSE DE DIVERSITÉ GLOBALE ===`);
    
    const stats = VisualStrategistService.getCalendarDiversityStats(calendarId);
    
    console.log(`📈 Statistiques de diversité:`);
    console.log(`   - Total stratégies: ${stats.totalStrategies}`);
    console.log(`   - Score diversité moyen: ${stats.averageDiversityScore}/100`);
    console.log(`   - Concepts uniques: ${stats.uniqueConcepts}/${strategies.length}`);
    console.log(`   - Styles photo uniques: ${stats.uniqueStyles}/${strategies.length}`);
    
    // Analyser les répétitions
    const concepts = strategies.map(s => s.concept);
    const styles = strategies.map(s => s.photographyStyle);
    const settings = strategies.map(s => s.setting);
    
    const conceptRepeats = concepts.length - new Set(concepts).size;
    const styleRepeats = styles.length - new Set(styles).size;
    const settingRepeats = settings.length - new Set(settings).size;
    
    console.log(`\n🔍 Analyse des répétitions:`);
    console.log(`   - Concepts répétés: ${conceptRepeats}/${strategies.length} (${((conceptRepeats/strategies.length)*100).toFixed(1)}%)`);
    console.log(`   - Styles répétés: ${styleRepeats}/${strategies.length} (${((styleRepeats/strategies.length)*100).toFixed(1)}%)`);
    console.log(`   - Settings répétés: ${settingRepeats}/${strategies.length} (${((settingRepeats/strategies.length)*100).toFixed(1)}%)`);
    
    // Évaluation de la qualité
    console.log(`\n🏆 === ÉVALUATION QUALITÉ ===`);
    
    const avgDiversityScore = strategies.reduce((sum, s) => sum + s.diversityScore, 0) / strategies.length;
    const minDiversityScore = Math.min(...strategies.map(s => s.diversityScore));
    const maxDiversityScore = Math.max(...strategies.map(s => s.diversityScore));
    
    console.log(`📊 Scores de diversité:`);
    console.log(`   - Moyenne: ${avgDiversityScore.toFixed(1)}/100`);
    console.log(`   - Minimum: ${minDiversityScore}/100`);
    console.log(`   - Maximum: ${maxDiversityScore}/100`);
    
    // Critères de succès
    const diversityThreshold = 70; // Score minimum acceptable
    const uniquenessThreshold = 0.8; // 80% d'unicité minimum
    
    const conceptUniqueness = stats.uniqueConcepts / strategies.length;
    const styleUniqueness = stats.uniqueStyles / strategies.length;
    
    console.log(`\n✅ === CRITÈRES DE SUCCÈS ===`);
    console.log(`📋 Diversité moyenne: ${avgDiversityScore.toFixed(1)}/100 ${avgDiversityScore >= diversityThreshold ? '✅' : '❌'} (seuil: ${diversityThreshold})`);
    console.log(`📋 Unicité concepts: ${(conceptUniqueness*100).toFixed(1)}% ${conceptUniqueness >= uniquenessThreshold ? '✅' : '❌'} (seuil: ${(uniquenessThreshold*100)}%)`);
    console.log(`📋 Unicité styles: ${(styleUniqueness*100).toFixed(1)}% ${styleUniqueness >= uniquenessThreshold ? '✅' : '❌'} (seuil: ${(uniquenessThreshold*100)}%)`);
    
    const allCriteriaMet = avgDiversityScore >= diversityThreshold && 
                          conceptUniqueness >= uniquenessThreshold && 
                          styleUniqueness >= uniquenessThreshold;
    
    console.log(`\n🎯 RÉSULTAT GLOBAL: ${allCriteriaMet ? '✅ SUCCÈS' : '❌ ÉCHEC'}`);
    
    if (allCriteriaMet) {
      console.log(`🏆 Le pipeline 3-couches génère une diversité créative de qualité Cannes Lions !`);
    } else {
      console.log(`⚠️  Le pipeline nécessite des ajustements pour atteindre la qualité cible.`);
    }
    
    // Afficher quelques exemples de stratégies
    console.log(`\n📝 === EXEMPLES DE STRATÉGIES GÉNÉRÉES ===`);
    
    for (let i = 0; i < Math.min(3, strategies.length); i++) {
      const strategy = strategies[i];
      console.log(`\n🎨 Exemple ${i + 1}:`);
      console.log(`   COUCHE 1 - Stratégie: "${strategy.concept}"`);
      console.log(`   COUCHE 2 - Direction: "${strategy.photographyStyle}"`);
      console.log(`   COUCHE 3 - Génération: "${strategy.setting}"`);
      console.log(`   💡 Lighting: "${strategy.lightingStyle}"`);
      console.log(`   📐 Composition: "${strategy.composition}"`);
    }
    
    console.log(`\n✅ Test terminé avec succès !`);
    
  } catch (error: any) {
    console.error('❌ Erreur lors du test:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Exécuter le test
if (require.main === module) {
  testVisualStrategistPipeline()
    .then(() => {
      console.log('\n🎉 Test du pipeline 3-couches terminé !');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Erreur fatale:', error);
      process.exit(1);
    });
}

export { testVisualStrategistPipeline };
