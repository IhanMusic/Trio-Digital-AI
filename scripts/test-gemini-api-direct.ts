import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "path";

/**
 * Script de test direct pour l'API Gemini avec la nouvelle clé
 * Teste la génération d'images avec Gemini 3 Pro selon la nouvelle documentation
 */

async function testGeminiAPI() {
  console.log('🧪 === TEST DIRECT API GEMINI ===');
  console.log('Clé API:', 'AIzaSyC0RYZMQ7Ekqcq3IgTTFYUt82RS56swEbc');
  console.log('Modèle cible: gemini-3-pro-image-preview (Nano Banana Pro)');
  
  try {
    // 1. Initialiser le client Gemini avec la nouvelle clé
    console.log('\n📡 Initialisation du client Gemini...');
    const ai = new GoogleGenAI({ 
      apiKey: 'AIzaSyC0RYZMQ7Ekqcq3IgTTFYUt82RS56swEbc' 
    });
    console.log('✅ Client Gemini initialisé');

    // 2. Test simple de génération d'image avec Gemini 3 Pro
    console.log('\n🎨 Test de génération d\'image simple...');
    
    const prompt = "Create a professional product photo of a refreshing beverage bottle on a clean white background, studio lighting, commercial photography style";
    
    console.log('Prompt:', prompt);
    console.log('Modèle: gemini-3-pro-image-preview');
    console.log('Configuration: 1:1, 1K resolution');
    
    // Utiliser la nouvelle syntaxe Gemini 3 Pro selon la documentation
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    console.log('\n📊 Analyse de la réponse...');
    
    // Vérifier la structure de la réponse
    if (!response.candidates || response.candidates.length === 0) {
      throw new Error('❌ Aucun candidat dans la réponse');
    }

    const candidate = response.candidates[0];
    if (!candidate.content || !candidate.content.parts) {
      throw new Error('❌ Aucun contenu dans le candidat');
    }

    console.log(`✅ Réponse reçue avec ${candidate.content.parts.length} partie(s)`);

    // 3. Traiter les parties de la réponse
    let imageCount = 0;
    let textCount = 0;
    
    for (const [index, part] of candidate.content.parts.entries()) {
      console.log(`\n📋 Partie ${index + 1}:`);
      
      if (part.text) {
        console.log('   Type: TEXT');
        console.log('   Contenu:', part.text.substring(0, 100) + '...');
        textCount++;
      } else if (part.inlineData && part.inlineData.mimeType?.startsWith('image/')) {
        console.log('   Type: IMAGE');
        console.log('   MIME Type:', part.inlineData.mimeType);
        console.log('   Taille données:', part.inlineData.data?.length || 0, 'caractères base64');
        
        if (part.inlineData.data) {
          // Sauvegarder l'image
          const imageData = part.inlineData.data;
          const buffer = Buffer.from(imageData, "base64");
          const filename = `test-gemini-${Date.now()}-${imageCount + 1}.png`;
          const filepath = path.join(process.cwd(), 'scripts', filename);
          
          fs.writeFileSync(filepath, buffer);
          console.log('   ✅ Image sauvegardée:', filename);
          console.log('   📁 Chemin:', filepath);
          console.log('   📏 Taille fichier:', buffer.length, 'bytes');
          
          imageCount++;
        }
      } else if (part.thought) {
        console.log('   Type: THOUGHT (processus de réflexion)');
        console.log('   Contenu réflexion disponible');
      } else {
        console.log('   Type: INCONNU');
        console.log('   Clés:', Object.keys(part));
      }
    }

    // 4. Résumé des résultats
    console.log('\n🎉 === RÉSULTATS DU TEST ===');
    console.log(`✅ API Gemini: FONCTIONNELLE`);
    console.log(`✅ Clé API: VALIDE`);
    console.log(`✅ Modèle gemini-3-pro-image-preview: ACCESSIBLE`);
    console.log(`📊 Images générées: ${imageCount}`);
    console.log(`📝 Parties texte: ${textCount}`);
    console.log(`🔧 Nouvelle syntaxe API: COMPATIBLE`);
    
    if (imageCount > 0) {
      console.log('\n🎯 DIAGNOSTIC: La génération d\'images fonctionne parfaitement !');
      console.log('   Le problème est donc dans l\'intégration avec votre application.');
      console.log('   Vérifiez:');
      console.log('   1. La configuration de la clé API dans votre .env');
      console.log('   2. L\'appel asynchrone dans PostGenerationService');
      console.log('   3. La gestion des erreurs dans le workflow');
    } else {
      console.log('\n⚠️  DIAGNOSTIC: Aucune image générée');
      console.log('   Vérifiez les quotas et limites de votre clé API');
    }

  } catch (error: any) {
    console.error('\n❌ === ERREUR LORS DU TEST ===');
    console.error('Type:', error.constructor.name);
    console.error('Message:', error.message);
    
    if (error.response) {
      console.error('Status HTTP:', error.response.status);
      console.error('Données réponse:', error.response.data);
    }
    
    if (error.code) {
      console.error('Code erreur:', error.code);
    }
    
    console.error('Stack:', error.stack);
    
    // Diagnostic des erreurs courantes
    if (error.message.includes('API key')) {
      console.log('\n🔑 DIAGNOSTIC: Problème de clé API');
      console.log('   - Vérifiez que la clé est correcte');
      console.log('   - Vérifiez les permissions de la clé');
      console.log('   - Vérifiez que l\'API Gemini est activée');
    } else if (error.message.includes('quota') || error.message.includes('limit')) {
      console.log('\n📊 DIAGNOSTIC: Problème de quotas');
      console.log('   - Vérifiez vos quotas API dans Google Cloud Console');
      console.log('   - Attendez avant de refaire un test');
    } else if (error.message.includes('model')) {
      console.log('\n🤖 DIAGNOSTIC: Problème de modèle');
      console.log('   - Le modèle gemini-3-pro-image-preview n\'est peut-être pas disponible');
      console.log('   - Essayez avec gemini-2.5-flash-image');
    }
  }
}

// Test avec fallback sur Gemini 2.5 Flash
async function testGeminiFallback() {
  console.log('\n🔄 === TEST FALLBACK GEMINI 2.5 FLASH ===');
  
  try {
    const ai = new GoogleGenAI({ 
      apiKey: 'AIzaSyC0RYZMQ7Ekqcq3IgTTFYUt82RS56swEbc' 
    });

    const prompt = "Create a simple product photo of a beverage bottle";
    
    console.log('Modèle fallback: gemini-2.5-flash-image');
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
    });

    if (response.candidates?.[0]?.content?.parts) {
      let imageFound = false;
      
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.mimeType?.startsWith('image/')) {
          const imageData = part.inlineData.data;
          if (imageData) {
            const buffer = Buffer.from(imageData, "base64");
            const filename = `test-gemini-fallback-${Date.now()}.png`;
            const filepath = path.join(process.cwd(), 'scripts', filename);
            
            fs.writeFileSync(filepath, buffer);
            console.log('✅ Image fallback sauvegardée:', filename);
            imageFound = true;
          }
        }
      }
      
      if (imageFound) {
        console.log('✅ FALLBACK: Gemini 2.5 Flash fonctionne !');
      } else {
        console.log('❌ FALLBACK: Aucune image générée avec Gemini 2.5 Flash');
      }
    }
    
  } catch (error: any) {
    console.error('❌ Erreur fallback:', error.message);
  }
}

// Exécuter les tests
async function runAllTests() {
  console.log('🚀 Démarrage des tests Gemini API...\n');
  
  // Test principal avec Gemini 3 Pro
  await testGeminiAPI();
  
  // Test fallback avec Gemini 2.5 Flash
  await testGeminiFallback();
  
  console.log('\n✅ Tests terminés !');
  console.log('📁 Vérifiez le dossier scripts/ pour les images générées');
}

// Point d'entrée
runAllTests().catch(console.error);

export { testGeminiAPI, testGeminiFallback };
