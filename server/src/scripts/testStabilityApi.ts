import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const STABILITY_API_KEY = 'sk-0rPxRciQYj6okYo30O66DZ6FJg57Qn47rxzX1LbpJhAJrTRm';

async function testStabilityApi() {
  console.log('=== Test de l\'API Stability ===');
  
  try {
    // Créer un FormData pour le test
    const formData = new FormData();
    formData.append('prompt', 'A simple test image of a blue circle');
    formData.append('output_format', 'png');
    formData.append('aspect_ratio', '1:1');

    console.log('Envoi de la requête à Stability AI...');
    console.log('URL:', 'https://api.stability.ai/v2beta/stable-image/generate/ultra');
    console.log('Prompt:', 'A simple test image of a blue circle');

    const response = await axios.post(
      'https://api.stability.ai/v2beta/stable-image/generate/ultra',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${STABILITY_API_KEY}`,
          'Accept': 'image/*',
          ...formData.getHeaders()
        },
        responseType: 'arraybuffer',
        maxBodyLength: Infinity,
        maxContentLength: Infinity
      }
    );

    console.log('\nRéponse reçue:');
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    
    if (response.data) {
      console.log('Taille des données:', response.data.length, 'octets');
      
      // Sauvegarder l'image de test
      const testDir = path.join(process.cwd(), 'test-images');
      if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir);
      }
      
      const imagePath = path.join(testDir, 'test-image.png');
      fs.writeFileSync(imagePath, response.data);
      console.log('\n✅ Test réussi! Image sauvegardée dans:', imagePath);
    }
  } catch (error: any) {
    console.error('\n❌ Erreur lors du test:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      
      // Si la réponse est un JSON
      if (error.response.data) {
        try {
          const errorData = JSON.parse(error.response.data.toString());
          console.error('Message d\'erreur:', errorData);
        } catch {
          console.error('Données brutes:', error.response.data.toString());
        }
      }
    } else {
      console.error('Message:', error.message);
    }
  }
}

// Exécuter le test
testStabilityApi();
