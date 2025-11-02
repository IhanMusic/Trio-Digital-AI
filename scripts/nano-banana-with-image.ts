import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";

async function main() {
  try {
    console.log('🍌 Test de Nano Banana avec image - Démarrage...\n');

    const ai = new GoogleGenAI({
      apiKey: 'AIzaSyAY3uGbXdF4j6n4R8Tj1ssYms7AJj6Qnk4'
    });

    // Charger l'image bouteille.png depuis le dossier racine
    const imagePath = path.join(process.cwd(), '..', 'bouteille.png');
    console.log(`📁 Chargement de l'image: ${imagePath}\n`);
    
    const imageData = fs.readFileSync(imagePath);
    const base64Image = imageData.toString("base64");

    // Créer le prompt avec l'image et le texte
    const prompt = [
      { 
        text: "Crée une affiche publicitaire moderne et attractive pour un yaourt à boire. " +
              "Utilise l'image de la bouteille comme référence pour le design. " +
              "L'affiche doit être colorée, appétissante et professionnelle, avec un style frais et dynamique. " +
              "Ajoute des éléments visuels évoquant la fraîcheur, la santé et le plaisir."
      },
      {
        inlineData: {
          mimeType: "image/png",
          data: base64Image,
        },
      },
    ];

    console.log('📝 Prompt: Création d\'une affiche publicitaire pour yaourt à boire basée sur bouteille.png\n');
    console.log('⏳ Génération en cours avec Nano Banana...\n');

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: prompt,
    });

    let imageGenerated = false;

    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        console.log('📄 Texte de la réponse:');
        console.log('─'.repeat(50));
        console.log(part.text);
        console.log('─'.repeat(50));
        console.log('');
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        
        // Créer le nom du fichier avec timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `yaourt-affiche-${timestamp}.png`;
        
        fs.writeFileSync(filename, buffer);
        
        console.log('✅ Image générée avec succès!\n');
        console.log(`📁 Fichier sauvegardé: ${filename}`);
        console.log(`📏 Taille: ${(buffer.length / 1024).toFixed(2)} KB\n`);
        
        imageGenerated = true;
      }
    }

    if (imageGenerated) {
      console.log('🎉 Affiche publicitaire créée avec succès!');
    } else {
      console.log('⚠️  Aucune image n\'a été générée dans la réponse');
    }

  } catch (error) {
    console.error('❌ Erreur lors de la génération:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
    }
  }
}

main();
