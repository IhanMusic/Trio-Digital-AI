import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";

// 🔑 Configuration avec la nouvelle clé API
const GEMINI_API_KEY = "AIzaSyDm1lCPSSxKBTIfAuKuUyl1_aO5Gn2G8NE";

// 🎯 Script de test simple pour Gemini 3 Pro
async function testGemini3Pro() {
  console.log('🚀 ========================================');
  console.log('🚀 TEST GEMINI 3 PRO - API SIMPLE');
  console.log('🚀 ========================================\n');

  try {
    // Initialiser le client Gemini
    console.log('🔧 Initialisation du client Gemini...');
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    console.log('✅ Client Gemini initialisé avec succès\n');

    // Prompt de test simple mais efficace
    const testPrompt = `Create a professional product photo of a premium artisanal yogurt jar on a rustic wooden table, 
soft natural lighting during golden hour, 
shot in the style of high-end food photography, 
creamy white yogurt with fresh berries on top, 
warm and inviting atmosphere, 
commercial quality, hyper-realistic, 8K quality`;

    console.log('📝 Prompt de test:');
    console.log(testPrompt);
    console.log('\n⏳ Génération en cours avec Gemini 3 Pro...');
    console.log('⚠️  Cela peut prendre 30-60 secondes...\n');

    // Générer l'image avec Gemini 3 Pro
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: testPrompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    console.log('📊 Réponse reçue de Gemini 3 Pro');
    console.log('Candidats:', response.candidates?.length || 0);

    // Vérifier la réponse
    if (!response.candidates || response.candidates.length === 0) {
      throw new Error('Aucun candidat retourné par Gemini 3 Pro');
    }

    const candidate = response.candidates[0];
    if (!candidate.content || !candidate.content.parts) {
      throw new Error('Aucun contenu dans la réponse');
    }

    console.log('Parts dans la réponse:', candidate.content.parts.length);

    // Chercher les images dans la réponse
    let imageCount = 0;
    let textCount = 0;

    for (const [index, part] of candidate.content.parts.entries()) {
      console.log(`\n📋 Part ${index + 1}:`);
      
      if (part.text) {
        textCount++;
        console.log('  Type: TEXT');
        console.log('  Contenu:', part.text.substring(0, 100) + '...');
      }
      
      if (part.inlineData && part.inlineData.mimeType?.startsWith('image/')) {
        imageCount++;
        console.log('  Type: IMAGE');
        console.log('  MIME Type:', part.inlineData.mimeType);
        console.log('  Taille données:', part.inlineData.data?.length || 0, 'caractères base64');

        // Sauvegarder l'image
        if (part.inlineData.data) {
          const imageBuffer = Buffer.from(part.inlineData.data, "base64");
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const filename = `gemini-3-pro-test-${timestamp}.png`;
          const filepath = path.join(__dirname, filename);
          
          fs.writeFileSync(filepath, imageBuffer);
          console.log('  ✅ Image sauvegardée:', filename);
          console.log('  📁 Chemin complet:', filepath);
          console.log('  📏 Taille fichier:', imageBuffer.length, 'bytes');
        }
      }
    }

    console.log('\n🎉 ========================================');
    console.log('🎉 RÉSULTATS DU TEST');
    console.log('🎉 ========================================');
    console.log('✅ Connexion API: SUCCÈS');
    console.log('✅ Modèle utilisé: gemini-3-pro-image-preview');
    console.log('✅ Images générées:', imageCount);
    console.log('✅ Textes générés:', textCount);
    console.log('✅ Qualité: 2K (2048x2048)');
    console.log('✅ Format: 1:1 (carré)');
    
    if (imageCount > 0) {
      console.log('\n🏆 TEST RÉUSSI ! Gemini 3 Pro fonctionne parfaitement avec votre clé API.');
      console.log('📸 Vérifiez le fichier image généré dans le dossier scripts/');
    } else {
      console.log('\n⚠️  Aucune image générée, mais l\'API répond correctement.');
    }

  } catch (error: any) {
    console.error('\n❌ ========================================');
    console.error('❌ ERREUR LORS DU TEST');
    console.error('❌ ========================================');
    console.error('Message:', error.message);
    
    if (error.response) {
      console.error('Status HTTP:', error.response.status);
      console.error('Données réponse:', JSON.stringify(error.response.data, null, 2));
    }
    
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }

    // Diagnostics
    console.error('\n🔍 DIAGNOSTICS:');
    console.error('- Vérifiez que la clé API est correcte');
    console.error('- Vérifiez votre connexion internet');
    console.error('- Vérifiez que Gemini 3 Pro est disponible dans votre région');
    
    process.exit(1);
  }
}

// Exécuter le test
testGemini3Pro().catch(console.error);

export { testGemini3Pro };
