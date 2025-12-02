/**
 * Script de test pour les nouvelles fonctionnalités Gemini améliorées
 * - Formats optimisés par plateforme
 * - Génération de carrousels
 * - Support multi-produits
 */

import { GeminiImageService } from '../server/src/services/GeminiImageService';
import { PlatformFormatService } from '../server/src/services/PlatformFormatService';
import * as fs from 'fs';
import * as path from 'path';

// Configuration des variables d'environnement
require('dotenv').config({ path: path.join(__dirname, '../server/.env') });

async function testPlatformFormats() {
  console.log('🎯 Test des formats optimisés par plateforme\n');
  
  const testCases = [
    {
      platforms: ['Instagram'],
      contentType: 'Posts',
      expected: { aspectRatio: '3:4', imageSize: '2K' }
    },
    {
      platforms: ['LinkedIn'],
      contentType: 'Posts',
      expected: { aspectRatio: '16:9', imageSize: '2K' }
    },
    {
      platforms: ['Instagram', 'Facebook'],
      contentType: 'Stories',
      expected: { aspectRatio: '9:16', imageSize: '2K' }
    },
    {
      platforms: ['Instagram'],
      contentType: 'Carrousels',
      expected: { aspectRatio: '3:4', imageSize: '2K', isCarousel: true }
    }
  ];
  
  for (const testCase of testCases) {
    const formatInfo = PlatformFormatService.getFormatInfo(
      testCase.platforms,
      testCase.contentType
    );
    
    console.log(`📱 ${testCase.platforms.join(', ')} - ${testCase.contentType}:`);
    console.log(`   Format: ${formatInfo.aspectRatio} (${formatInfo.width}x${formatInfo.height})`);
    console.log(`   Qualité: ${formatInfo.imageSize}`);
    console.log(`   Description: ${formatInfo.description}`);
    console.log(`   Type: ${formatInfo.contentInfo.type} ${formatInfo.contentInfo.isCarousel ? '(Carrousel)' : ''}`);
    console.log('');
  }
}

async function testGeminiOptimizedGeneration() {
  console.log('🎨 Test de génération optimisée avec Gemini\n');
  
  if (!process.env.GOOGLE_API_KEY) {
    console.error('❌ GOOGLE_API_KEY non configurée');
    return;
  }
  
  try {
    const prompt = "Une bouteille d'eau premium dans un environnement naturel, éclairage professionnel, style publicitaire";
    const platforms = ['Instagram'];
    const contentType = 'Posts';
    
    console.log('📝 Prompt:', prompt);
    console.log('📱 Plateformes:', platforms.join(', '));
    console.log('📄 Type de contenu:', contentType);
    console.log('');
    
    // Obtenir les informations de format
    const formatInfo = PlatformFormatService.getFormatInfo(platforms, contentType);
    console.log('🎯 Format déterminé:', {
      aspectRatio: formatInfo.aspectRatio,
      imageSize: formatInfo.imageSize,
      dimensions: `${formatInfo.width}x${formatInfo.height}`,
      description: formatInfo.description
    });
    console.log('');
    
    console.log('⏳ Génération en cours...');
    const startTime = Date.now();
    
    const results = await GeminiImageService.generateOptimizedImages(
      prompt,
      platforms,
      contentType
    );
    
    const duration = Date.now() - startTime;
    
    console.log(`✅ Génération terminée en ${Math.round(duration / 1000)}s`);
    console.log(`📸 ${results.length} image(s) générée(s):`);
    
    results.forEach((result, index) => {
      console.log(`   ${index + 1}. ${result.url}`);
      console.log(`      Dimensions: ${result.width}x${result.height}`);
      console.log(`      Format: ${result.format}`);
    });
    
  } catch (error: any) {
    console.error('❌ Erreur lors de la génération optimisée:', error.message);
  }
}

async function testCarouselGeneration() {
  console.log('\n🎠 Test de génération de carrousel\n');
  
  if (!process.env.GOOGLE_API_KEY) {
    console.error('❌ GOOGLE_API_KEY non configurée');
    return;
  }
  
  try {
    const prompt = "Collection de produits cosmétiques haut de gamme, différents angles et contextes";
    const platforms = ['Instagram'];
    const contentType = 'Carrousels';
    
    console.log('📝 Prompt:', prompt);
    console.log('📱 Plateformes:', platforms.join(', '));
    console.log('📄 Type de contenu:', contentType);
    console.log('');
    
    console.log('⏳ Génération du carrousel en cours...');
    const startTime = Date.now();
    
    const results = await GeminiImageService.generateOptimizedImages(
      prompt,
      platforms,
      contentType
    );
    
    const duration = Date.now() - startTime;
    
    console.log(`✅ Carrousel généré en ${Math.round(duration / 1000)}s`);
    console.log(`🎠 ${results.length} images dans le carrousel:`);
    
    results.forEach((result, index) => {
      console.log(`   Image ${index + 1}: ${result.url}`);
      console.log(`      Dimensions: ${result.width}x${result.height}`);
    });
    
  } catch (error: any) {
    console.error('❌ Erreur lors de la génération du carrousel:', error.message);
  }
}

async function testMultiProductSupport() {
  console.log('\n📦 Test du support multi-produits\n');
  
  if (!process.env.GOOGLE_API_KEY) {
    console.error('❌ GOOGLE_API_KEY non configurée');
    return;
  }
  
  // Vérifier si des images de référence existent
  const referenceImages = [
    path.join(__dirname, 'bouteille.png'),
    path.join(__dirname, '../Product.jpg')
  ].filter(imagePath => fs.existsSync(imagePath));
  
  if (referenceImages.length === 0) {
    console.log('⚠️ Aucune image de référence trouvée, test avec prompt uniquement');
    return;
  }
  
  try {
    console.log(`📸 ${referenceImages.length} image(s) de référence trouvée(s):`);
    referenceImages.forEach((imagePath, index) => {
      console.log(`   ${index + 1}. ${path.basename(imagePath)}`);
    });
    console.log('');
    
    // Convertir les images en base64
    const referenceImagesBase64 = [];
    for (const imagePath of referenceImages) {
      const base64 = await GeminiImageService.fileToBase64(imagePath);
      referenceImagesBase64.push(base64);
      console.log(`✅ Image ${path.basename(imagePath)} convertie en base64 (${base64.length} chars)`);
    }
    console.log('');
    
    const prompt = "Composition publicitaire professionnelle mettant en valeur ces produits dans un environnement premium";
    
    console.log('📝 Prompt:', prompt);
    console.log('⏳ Génération avec références multiples...');
    
    const startTime = Date.now();
    
    const results = await GeminiImageService.generateImages(prompt, {
      numberOfImages: 1,
      aspectRatio: '3:4',
      imageSize: '2K',
      referenceImages: referenceImagesBase64
    });
    
    const duration = Date.now() - startTime;
    
    console.log(`✅ Génération multi-produits terminée en ${Math.round(duration / 1000)}s`);
    console.log(`📸 Image générée: ${results[0]?.url}`);
    console.log(`   Dimensions: ${results[0]?.width}x${results[0]?.height}`);
    
  } catch (error: any) {
    console.error('❌ Erreur lors de la génération multi-produits:', error.message);
  }
}

async function main() {
  console.log('🚀 Test des fonctionnalités Gemini améliorées\n');
  console.log('='.repeat(60));
  
  try {
    // Test 1: Formats par plateforme
    await testPlatformFormats();
    console.log('='.repeat(60));
    
    // Test 2: Génération optimisée
    await testGeminiOptimizedGeneration();
    console.log('='.repeat(60));
    
    // Test 3: Génération de carrousel
    await testCarouselGeneration();
    console.log('='.repeat(60));
    
    // Test 4: Support multi-produits
    await testMultiProductSupport();
    console.log('='.repeat(60));
    
    console.log('\n✅ Tests terminés avec succès !');
    
  } catch (error: any) {
    console.error('\n❌ Erreur lors des tests:', error.message);
    process.exit(1);
  }
}

// Exécuter les tests
if (require.main === module) {
  main().catch(console.error);
}

export { testPlatformFormats, testGeminiOptimizedGeneration, testCarouselGeneration, testMultiProductSupport };
