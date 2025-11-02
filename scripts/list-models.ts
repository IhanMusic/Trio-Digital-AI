// Configuration
const API_KEY = 'AIzaSyAY3uGbXdF4j6n4R8Tj1ssYms7AJj6Qnk4';

async function listModels() {
  try {
    console.log('📋 Liste des modèles disponibles via API REST...\n');
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.models && data.models.length > 0) {
      console.log(`✅ ${data.models.length} modèle(s) trouvé(s):\n`);
      
      data.models.forEach((model: any, index: number) => {
        console.log(`${index + 1}. ${model.name}`);
        console.log(`   Display Name: ${model.displayName || 'N/A'}`);
        console.log(`   Description: ${model.description || 'N/A'}`);
        console.log(`   Supported Methods: ${model.supportedGenerationMethods?.join(', ') || 'N/A'}`);
        console.log('');
      });
    } else {
      console.log('❌ Aucun modèle trouvé');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du listing:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
    }
  }
}

// Exécuter le listing
listModels();
