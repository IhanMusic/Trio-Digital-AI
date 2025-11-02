import { ImageGenerationService } from '../services/ImageGenerationService';
import { logger } from '../config/logger';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const scenes = [
  {
    name: "Interview 1 - Médecin du Sport",
    prompt: "Professional TV storyboard frame without any text: Over-shoulder shot of doctor in consultation room discussing nutrition with athlete. Medical certificates and diplomas blurred on wall. Dynamic sketchy pencil style with professional medical setting. No text elements.",
  },
  {
    name: "Interview 2 - Chef Cuisinier",
    prompt: "Professional TV storyboard frame without any text: Professional chef in restaurant kitchen demonstrating healthy cooking techniques. Steam rising from pots, natural ingredients visible. Energetic sketchy style with culinary atmosphere. No text or labels.",
  },
  {
    name: "Interview 3 - Professeur d'Éducation Physique",
    prompt: "Professional TV storyboard frame without any text: School gymnasium setting with PE teacher explaining benefits of healthy nutrition. Sports equipment in background. Vibrant sketchy style with educational environment. No text overlay.",
  },
  {
    name: "Interview 4 - Jeune Maman Blogueuse",
    prompt: "Professional TV storyboard frame without any text: Modern home office setting with young mother recording content about healthy family lifestyle. Baby toys tastefully scattered. Warm sketchy style with lifestyle blogging setup. No text elements.",
  },
  {
    name: "Interview 5 - Étudiant en Médecine",
    prompt: "Professional TV storyboard frame without any text: University library setting with medical student discussing health benefits. Medical textbooks and laptop visible. Academic sketchy style with youthful energy. No text or graphics.",
  },
  {
    name: "Interview 6 - Pharmacien",
    prompt: "Professional TV storyboard frame without any text: Modern pharmacy interior with pharmacist explaining nutrition facts. Organized shelves of health products in background. Clinical sketchy style with professional environment. No text elements.",
  },
  {
    name: "Plan Final - Packshot Dynamique",
    prompt: "Professional TV storyboard frame without any text: Dynamic composition of Candia milk bottle with flowing liquid effect. Modern laboratory equipment blurred in background. Premium sketchy style with scientific atmosphere. Absolutely no text or labels.",
  }
];

async function generateStoryboard() {
  try {
    logger.info('=== Début de la génération du storyboard ===');
    
    for (const [index, scene] of scenes.entries()) {
      logger.info(`Génération de l'image ${index + 1}/16: ${scene.name}`);
      
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
    
    logger.info('=== Génération du storyboard terminée ===');
  } catch (error) {
    logger.error('Erreur lors de la génération du storyboard:', error);
    process.exit(1);
  }
}

// Exécuter le script
generateStoryboard().catch(console.error);
