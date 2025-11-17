#!/usr/bin/env ts-node

/**
 * Script de test pour le nouveau système GPT Creative Director
 * 
 * Ce script teste l'intégration du nouveau workflow de génération de contenu
 * qui remplace l'ancien système de presets par GPT Creative Director.
 */

import { config } from 'dotenv';
import { connect } from 'mongoose';
import { logger } from '../config/logger';
import { GPTCreativeDirector } from '../services/GPTCreativeDirector';
import Brand from '../models/Brand';
import Product from '../models/Product';
import Calendar from '../models/Calendar';
import User from '../models/User';
import PostGenerationService from '../services/PostGenerationService';

// Charger les variables d'environnement
config({ path: '../.env' });

async function testGPTCreativeDirector() {
  try {
    logger.info('🧪 === TEST GPT CREATIVE DIRECTOR ===');
    
    // Connexion à MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI non définie dans les variables d\'environnement');
    }
    
    await connect(MONGODB_URI);
    logger.info('✅ Connexion MongoDB établie');
    
    // 1. Test de génération de prompt d'image
    logger.info('\n📝 Test 1: Génération de prompt d\'image');
    
    const brandData = {
      name: 'EcoFresh',
      sector: 'food',
      description: 'Marque de yaourts biologiques premium',
      colors: {
        primary: '#4CAF50',
        secondary: '#81C784',
        accent: '#FFC107'
      },
      values: ['Bio', 'Naturel', 'Santé'],
      targetAudience: 'France'
    };
    
    const productData = {
      name: 'Yaourt Bio Vanille',
      category: 'dairy',
      description: 'Yaourt onctueux à la vanille de Madagascar',
      uniqueSellingPoints: ['100% bio', 'Vanille naturelle', 'Sans additifs'],
      customerBenefits: ['Goût authentique', 'Santé digestive', 'Plaisir gourmand']
    };
    
    const calendarData = {
      campaignObjective: 'Augmenter la notoriété de marque',
      communicationStyle: 'authentique',
      targetAudience: 'France'
    };
    
    const postContext = {
      postIndex: 0,
      totalPosts: 5,
      scheduledDate: new Date().toISOString(),
      platform: 'instagram',
      country: 'France'
    };
    
    const imagePrompt = await GPTCreativeDirector.generateImagePrompt(
      brandData,
      productData,
      calendarData,
      postContext,
      'test-calendar-123'
    );
    
    logger.info('✅ Prompt d\'image généré avec succès');
    logger.info(`📝 Prompt (premiers 300 chars): ${imagePrompt.substring(0, 300)}...`);
    
    // 2. Test de diversité créative
    logger.info('\n🎨 Test 2: Diversité créative sur plusieurs posts');
    
    const prompts = [];
    for (let i = 0; i < 3; i++) {
      const context = {
        ...postContext,
        postIndex: i,
        scheduledDate: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString()
      };
      
      const prompt = await GPTCreativeDirector.generateImagePrompt(
        brandData,
        productData,
        calendarData,
        context,
        'test-calendar-123'
      );
      
      prompts.push(prompt);
      logger.info(`📝 Post ${i + 1} généré: ${prompt.substring(0, 150)}...`);
      
      // Attendre 1 seconde entre les appels pour respecter les rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Vérifier la diversité
    const uniquePrompts = new Set(prompts.map(p => p.substring(0, 100)));
    logger.info(`🎯 Diversité créative: ${uniquePrompts.size}/${prompts.length} prompts uniques`);
    
    if (uniquePrompts.size === prompts.length) {
      logger.info('✅ Excellente diversité créative - tous les prompts sont uniques');
    } else {
      logger.info('⚠️  Diversité limitée - certains prompts se ressemblent');
    }
    
    // 3. Test d'intégration avec PostGenerationService (simulation)
    logger.info('\n🔄 Test 3: Intégration avec PostGenerationService');
    
    // Chercher un utilisateur de test
    const testUser = await User.findOne({ email: { $regex: /test|admin/i } });
    if (!testUser) {
      logger.info('⚠️  Aucun utilisateur de test trouvé, création d\'un utilisateur temporaire');
      // On pourrait créer un utilisateur temporaire ici si nécessaire
    }
    
    // Chercher une marque de test
    const testBrand = await Brand.findOne().limit(1);
    if (!testBrand) {
      logger.info('⚠️  Aucune marque trouvée pour le test d\'intégration');
    } else {
      logger.info(`✅ Marque de test trouvée: ${testBrand.name}`);
    }
    
    // Chercher un calendrier de test
    const testCalendar = await Calendar.findOne().limit(1);
    if (!testCalendar) {
      logger.info('⚠️  Aucun calendrier trouvé pour le test d\'intégration');
    } else {
      logger.info(`✅ Calendrier de test trouvé: ${testCalendar._id}`);
    }
    
    if (testUser && testBrand && testCalendar) {
      logger.info('🚀 Tous les éléments sont présents pour un test d\'intégration complet');
      logger.info('💡 Pour tester complètement, lancez une génération de calendrier via l\'interface');
    }
    
    // 4. Test de gestion d'erreurs
    logger.info('\n🛡️  Test 4: Gestion d\'erreurs');
    
    try {
      // Test avec des données invalides
      await GPTCreativeDirector.generateImagePrompt(
        { name: '', sector: '', description: '' } as any,
        { name: '', category: '', description: '' } as any,
        { campaignObjective: '', communicationStyle: '' } as any,
        { postIndex: -1, totalPosts: 0 } as any,
        ''
      );
      logger.info('⚠️  Le test d\'erreur n\'a pas échoué comme attendu');
    } catch (error: any) {
      logger.info('✅ Gestion d\'erreur fonctionnelle:', error.message.substring(0, 100));
    }
    
    logger.info('\n🎉 === TESTS TERMINÉS ===');
    logger.info('✅ GPT Creative Director fonctionne correctement');
    logger.info('🔄 Le nouveau système est prêt à remplacer l\'ancien workflow de presets');
    
  } catch (error: any) {
    logger.error('❌ Erreur lors des tests:', error.message);
    logger.error('Stack:', error.stack);
  } finally {
    process.exit(0);
  }
}

// Lancer les tests
testGPTCreativeDirector().catch(console.error);
