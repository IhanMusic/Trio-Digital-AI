import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";

// 🔑 Configuration avec la nouvelle clé API
const GEMINI_API_KEY = "AIzaSyDm1lCPSSxKBTIfAuKuUyl1_aO5Gn2G8NE";

// 🏆 Prompts dignes de Cannes Lions
const CANNES_LIONS_PROMPTS = [
  {
    name: "Luxury Perfume Campaign",
    prompt: `Create a breathtaking luxury perfume advertisement in the style of a Cannes Lions Gold winner.
    
    A crystal perfume bottle floating in mid-air against a backdrop of liquid gold, 
    surrounded by ethereal light particles and delicate rose petals suspended in time.
    The bottle reflects prismatic light creating rainbow refractions.
    
    Shot with a Hasselblad H6D-400c, 80mm lens, f/2.8, studio lighting with softboxes,
    hyperrealistic detail, 8K resolution, commercial photography perfection.
    
    Color palette: Deep amber gold, crystal clear glass, soft pink rose petals,
    warm golden hour lighting with dramatic shadows.
    
    Style: High-end luxury advertising, reminiscent of Chanel or Dior campaigns,
    artistic composition worthy of international advertising awards.`,
    category: "Luxury Beauty"
  },
  
  {
    name: "Automotive Excellence",
    prompt: `Design a premium automotive advertisement that could win at Cannes Lions.
    
    A sleek electric sports car positioned on a reflective black surface in a minimalist studio,
    dramatic lighting creating perfect reflections and highlighting every curve.
    The car appears to be emerging from darkness into pure light.
    
    Professional automotive photography setup: Phase One XF camera system,
    Schneider Kreuznach 80mm LS lens, f/11 for maximum sharpness,
    multiple studio strobes with precision light modifiers.
    
    Color scheme: Midnight black car with subtle blue electric accents,
    pure white background gradient, dramatic chiaroscuro lighting.
    
    Composition: Rule of thirds, leading lines created by reflections,
    award-winning commercial photography aesthetic.
    
    Style: Tesla Model S Plaid campaign meets BMW i8 advertising excellence.`,
    category: "Automotive Premium"
  },
  
  {
    name: "Gourmet Food Artistry",
    prompt: `Create a Michelin-starred restaurant advertisement worthy of Cannes Lions recognition.
    
    An exquisite dish presented on handcrafted ceramic, featuring:
    - Perfectly seared wagyu beef with gold leaf garnish
    - Microgreens and edible flowers arranged with precision
    - Sauce dots creating artistic patterns on the plate
    - Steam rising elegantly from the warm dish
    
    Shot with Canon EOS R5, RF 100mm f/2.8L Macro lens,
    natural window light diffused through silk, 
    complemented by subtle fill lighting.
    
    Color palette: Rich burgundy beef, vibrant green microgreens,
    warm ceramic tones, golden accents, soft natural lighting.
    
    Composition: Overhead shot with perfect symmetry,
    negative space creating visual breathing room,
    food styling that tells a story of culinary excellence.
    
    Style: Noma restaurant photography meets Michelin Guide perfection.`,
    category: "Culinary Excellence"
  },
  
  {
    name: "Tech Innovation Vision",
    prompt: `Design a cutting-edge technology advertisement for a Cannes Lions submission.
    
    A holographic smartphone interface floating in space,
    surrounded by glowing data streams and geometric light patterns.
    The device displays an AI interface with flowing, organic animations.
    
    Futuristic laboratory setting with clean white surfaces,
    neon blue accent lighting, and subtle particle effects.
    
    Technical specs: Sony α7R V, FE 24-70mm f/2.8 GM II lens,
    LED panel lighting setup for consistent illumination,
    post-production VFX for holographic elements.
    
    Color scheme: Electric blue, pure white, silver metallic accents,
    subtle purple gradients in the holographic displays.
    
    Composition: Central focus on the device with radiating energy,
    depth of field creating layers of visual interest,
    Apple iPhone 15 Pro meets Samsung Galaxy S24 Ultra aesthetic.
    
    Style: Blade Runner 2049 meets contemporary tech advertising.`,
    category: "Technology Innovation"
  }
];

// 🎯 Fonction principale de test
async function testCannesLionsGeneration() {
  console.log('🏆 ========================================');
  console.log('🏆 GEMINI 3 PRO - CANNES LIONS QUALITY');
  console.log('🏆 ========================================\n');

  try {
    // Initialiser le client Gemini
    console.log('🔧 Initialisation du client Gemini...');
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    console.log('✅ Client Gemini initialisé avec succès\n');

    // Tester avec le modèle Gemini 2.5 Flash Image (plus accessible)
    console.log('📋 Utilisation du modèle: gemini-2.5-flash-image');
    console.log('💡 Modèle optimisé pour la génération d\'images rapide et efficace\n');

    // Sélectionner un prompt aléatoire
    const selectedPrompt = CANNES_LIONS_PROMPTS[Math.floor(Math.random() * CANNES_LIONS_PROMPTS.length)];
    
    console.log('🎨 Prompt sélectionné:', selectedPrompt.name);
    console.log('📂 Catégorie:', selectedPrompt.category);
    console.log('📝 Description:', selectedPrompt.prompt.substring(0, 200) + '...\n');

    console.log('⏳ Génération en cours...');
    console.log('⚠️  Cela peut prendre 30-60 secondes pour une qualité Cannes Lions...\n');

    // Générer l'image avec configuration optimale
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: selectedPrompt.prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
        imageConfig: {
          aspectRatio: '16:9', // Format cinématographique
        }
      },
    });

    console.log('📊 Réponse reçue de Gemini');
    
    if (!response.candidates || response.candidates.length === 0) {
      throw new Error('Aucun candidat retourné par Gemini');
    }

    const candidate = response.candidates[0];
    if (!candidate.content || !candidate.content.parts) {
      throw new Error('Aucun contenu dans la réponse');
    }

    // Traiter la réponse
    let imageCount = 0;
    let textCount = 0;

    for (const [index, part] of candidate.content.parts.entries()) {
      if (part.text) {
        textCount++;
        console.log('📝 Description générée:', part.text.substring(0, 150) + '...');
      }
      
      if (part.inlineData && part.inlineData.mimeType?.startsWith('image/')) {
        imageCount++;
        console.log('🖼️  Image générée détectée');

        if (part.inlineData.data) {
          const imageBuffer = Buffer.from(part.inlineData.data, "base64");
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const filename = `cannes-lions-${selectedPrompt.name.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.png`;
          const filepath = path.join(__dirname, filename);
          
          fs.writeFileSync(filepath, imageBuffer);
          
          console.log('✅ Image sauvegardée:', filename);
          console.log('📁 Taille:', Math.round(imageBuffer.length / 1024), 'KB');
        }
      }
    }

    console.log('\n🏆 ========================================');
    console.log('🏆 RÉSULTATS - QUALITÉ CANNES LIONS');
    console.log('🏆 ========================================');
    console.log('✅ Modèle utilisé: gemini-2.5-flash-image');
    console.log('✅ Format: 16:9 (cinématographique)');
    console.log('✅ Qualité: Professionnelle');
    console.log('✅ Images générées:', imageCount);
    console.log('✅ Descriptions:', textCount);
    console.log('✅ Catégorie:', selectedPrompt.category);
    
    if (imageCount > 0) {
      console.log('\n🎉 SUCCÈS ! Image digne de Cannes Lions générée !');
      console.log('📸 Vérifiez le fichier dans le dossier scripts/');
      console.log('🏆 Prête pour une campagne publicitaire premium');
    }

  } catch (error: any) {
    console.error('\n❌ ========================================');
    console.error('❌ ERREUR LORS DE LA GÉNÉRATION');
    console.error('❌ ========================================');
    
    if (error.message.includes('quota')) {
      console.error('💰 QUOTA DÉPASSÉ');
      console.error('- Votre quota gratuit Gemini est épuisé');
      console.error('- Attendez la réinitialisation ou passez à un plan payant');
      console.error('- Consultez: https://ai.google.dev/pricing');
    } else if (error.message.includes('leaked')) {
      console.error('🔐 CLÉ API COMPROMISE');
      console.error('- Votre clé API a été détectée comme exposée');
      console.error('- Générez une nouvelle clé sur Google AI Studio');
    } else {
      console.error('Message:', error.message);
      if (error.stack) {
        console.error('Stack:', error.stack.substring(0, 500) + '...');
      }
    }

    console.error('\n🔍 SOLUTIONS:');
    console.error('1. Vérifiez votre quota sur https://ai.dev/usage');
    console.error('2. Générez une nouvelle clé API si nécessaire');
    console.error('3. Considérez un plan payant pour plus de quota');
    
    process.exit(1);
  }
}

// Exécuter le test
testCannesLionsGeneration().catch(console.error);

export { testCannesLionsGeneration, CANNES_LIONS_PROMPTS };
