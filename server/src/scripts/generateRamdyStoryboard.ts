import { ImageGenerationService } from '../services/ImageGenerationService';
import { logger } from '../config/logger';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const scenes = [
  {
    name: "Scene 1 - Plan 1",
    prompt: "Warm and cozy kitchen interior with soft lighting. Fresh ingredients laid out on a wooden countertop, a sizzling pan visible. Ramadan atmosphere, intimate lighting. Hand-drawn colorful storyboard style, vibrant colors, sketchy lines, artistic illustration like a professional storyboard artist would draw.",
  },
  {
    name: "Scene 1 - Plan 2",
    prompt: "Close-up of hands placing melting white cheese slices on a gratin dish. The creamy cheese texture blending beautifully with other ingredients. Soft lighting highlighting the melting cheese. Hand-drawn colorful storyboard style, vibrant colors, sketchy lines, artistic illustration like a professional storyboard artist would draw.",
  },
  {
    name: "Scene 2 - Plan 3",
    prompt: "Extreme close-up of white cheese melting slowly on a gratin, forming a smooth golden cover. Focus on the stretchy, creamy texture of the melting cheese. Hand-drawn colorful storyboard style, vibrant colors, sketchy lines, artistic illustration like a professional storyboard artist would draw.",
  },
  {
    name: "Scene 2 - Plan 4",
    prompt: "Hands incorporating generous portions of white cheese into bourek filling. Close-up on the creamy cheese mixing with other ingredients. Cooking preparation scene. Hand-drawn colorful storyboard style, vibrant colors, sketchy lines, artistic illustration like a professional storyboard artist would draw.",
  },
  {
    name: "Scene 3 - Plan 5",
    prompt: "Close-up of golden-brown boureks fresh from the oven, with melted white cheese visible inside. Steam rising, crispy texture visible. Hand-drawn colorful storyboard style, vibrant colors, sketchy lines, artistic illustration like a professional storyboard artist would draw.",
  },
  {
    name: "Scene 3 - Plan 6",
    prompt: "Modern family of four around a Ramadan dinner table. Mother with visible styled hair wearing modern casual clothes (no hijab, western style outfit), father in casual modern clothes, young boy, and teenage daughter with long visible hair (no hijab, modern outfit). Everyone smiling warmly. Traditional dishes visible on table. Contemporary home setting with warm lighting. Hand-drawn colorful storyboard style, vibrant colors, sketchy lines, artistic illustration like a professional storyboard artist would draw.",
  },
  {
    name: "Scene 4 - Plan 7",
    prompt: "Product shot of white cheese: rectangular bar and round portion box with blue and white packaging. Simple blue illustrations of cows on white background, no text. Clean, modern presentation on traditional table setting. Hand-drawn colorful storyboard style, vibrant colors, sketchy lines, artistic illustration like a professional storyboard artist would draw.",
  }
];

async function generateStoryboard() {
  try {
    logger.info('=== Début de la génération du storyboard Ramdy ===');
    
    for (const [index, scene] of scenes.entries()) {
      logger.info(`Génération de l'image ${index + 1}/${scenes.length}: ${scene.name}`);
      
      try {
        const imageUrl = await ImageGenerationService.generateImage(scene.prompt, {
          purpose: 'social',
          aspect_ratio: '16:9'
        });
        
        logger.info(`✅ Image générée avec succès: ${imageUrl}`);
        logger.info('-------------------');
      } catch (error) {
        logger.error(`❌ Erreur lors de la génération de l'image ${index + 1}: ${scene.name}`);
        logger.error(error instanceof Error ? error.message : String(error));
        continue;
      }
      
      // Petite pause entre chaque génération pour éviter de surcharger l'API
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    logger.info('=== Génération du storyboard Ramdy terminée ===');
  } catch (error) {
    logger.error('Erreur lors de la génération du storyboard:', error);
    process.exit(1);
  }
}

// Exécuter le script
generateStoryboard().catch(console.error);
