import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';

// Configuration
const API_KEY = 'AIzaSyAY3uGbXdF4j6n4R8Tj1ssYms7AJj6Qnk4';

async function testGemini3Pro() {
  try {
    console.log('🚀 Test de Gemini 3 Pro Image Preview - Démarrage...\n');
    
    // Initialiser l'API Google Generative AI
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Utiliser le nouveau modèle Gemini 3 Pro Image Preview
    const model = genAI.getGenerativeModel({ model: 'gemini-3-pro-image-preview' });
    
    // Prompt de test pour générer une image
    const prompt = 'Une banane jaune souriante portant des lunettes de soleil sur une plage tropicale au coucher du soleil';
    
    console.log(`📝 Prompt: ${prompt}\n`);
    console.log('⏳ Génération de l\'image en cours...\n');
    
    // Générer le contenu
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Vérifier si une image a été générée
    const candidates = response.candidates;
    if (candidates && candidates[0]?.content?.parts) {
      const parts = candidates[0].content.parts;
      
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        
        // Vérifier si c'est une image (inlineData avec mimeType image)
        if (part.inlineData && part.inlineData.mimeType?.startsWith('image/')) {
          const imageData = part.inlineData.data;
          const mimeType = part.inlineData.mimeType;
          const extension = mimeType.split('/')[1]; // ex: 'png' ou 'jpeg'
          
          // Créer le nom du fichier avec timestamp
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const filename = `nano-banana-${timestamp}.${extension}`;
          const filepath = path.join(process.cwd(), filename);
          
          // Convertir base64 en buffer et sauvegarder
          const buffer = Buffer.from(imageData, 'base64');
          fs.writeFileSync(filepath, buffer);
          
          console.log('✅ Image générée avec succès!\n');
          console.log(`📁 Fichier sauvegardé: ${filename}`);
          console.log(`📏 Taille: ${(buffer.length / 1024).toFixed(2)} KB`);
          console.log(`🎨 Type: ${mimeType}\n`);
          console.log('🎉 Test terminé avec succès!');
          
          return;
        }
      }
      
      // Si on arrive ici, aucune image n'a été trouvée
      console.log('⚠️  Aucune image trouvée dans la réponse');
      console.log('Réponse complète:', JSON.stringify(response, null, 2));
    } else {
      console.log('⚠️  Aucun candidat trouvé dans la réponse');
      console.log('Réponse complète:', JSON.stringify(response, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
    }
  }
}

// Exécuter le test
testGemini3Pro();
