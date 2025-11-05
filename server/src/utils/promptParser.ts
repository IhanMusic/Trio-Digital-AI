/**
 * Utilitaires pour parser les réponses des prompts GPT
 */

/**
 * Parse la réponse de GPT contenant plusieurs publications avec le format amélioré
 */
export function parseEnhancedGPTResponse(content: string): Array<{
  postContent: string;
  imagePrompt: string;
  hashtags?: string[];
  callToAction?: string;
  imageStyle?: string;
  audienceTargeting?: string;
  competitiveEdge?: string;
  legalCompliance?: string;
  culturalRelevance?: string;
  productsSelected?: string;
}> {
  const posts = [];
  const sections = content.split('---POST #');
  
  // Ignorer la première section qui est vide
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    
    // Fonction pour extraire le contenu entre deux marqueurs
    const extractContent = (text: string, startMarker: string, endMarkers: string[]): string => {
      const startIndex = text.indexOf(startMarker);
      if (startIndex === -1) return '';
      
      const contentStart = startIndex + startMarker.length;
      
      // Trouver le premier marqueur de fin qui apparaît après le début
      let endIndex = text.length;
      for (const endMarker of endMarkers) {
        const markerIndex = text.indexOf(endMarker, contentStart);
        if (markerIndex !== -1 && markerIndex < endIndex) {
          endIndex = markerIndex;
        }
      }
      
      return text.substring(contentStart, endIndex).trim();
    };
    
    // Extraire le contenu du post (tout ce qui est avant le premier marqueur)
    const endMarkers = ['---HASHTAGS---', '---CALL TO ACTION---', '---IMAGE PROMPT #', '---IMAGE PROMPT---'];
    let postContent = '';
    
    // Trouver le premier marqueur qui apparaît dans la section
    let firstMarkerIndex = section.length;
    let firstMarker = '';
    
    for (const marker of endMarkers) {
      const index = section.indexOf(marker);
      if (index !== -1 && index < firstMarkerIndex) {
        firstMarkerIndex = index;
        firstMarker = marker;
      }
    }
    
    if (firstMarker) {
      // Extraire le contenu avant le premier marqueur
      postContent = section.substring(0, firstMarkerIndex).trim();
      // Supprimer la première ligne qui contient le numéro du post
      const lines = postContent.split('\n');
      postContent = lines.slice(1).join('\n').trim();
    }
    
    // Extraire les hashtags
    const hashtagsContent = extractContent(section, '---HASHTAGS---', ['---CALL TO ACTION---', '---IMAGE PROMPT #', '---IMAGE PROMPT---', '---COMPETITIVE EDGE---']);
    const hashtags = hashtagsContent ? 
      hashtagsContent.split(/[\s,]+/).filter(tag => tag.startsWith('#')).map(tag => tag.trim()) : 
      [];
    
    // Extraire le call to action
    const callToAction = extractContent(section, '---CALL TO ACTION---', ['---IMAGE PROMPT #', '---IMAGE PROMPT---', '---COMPETITIVE EDGE---']);
    
    // Extraire le prompt d'image (deux formats possibles)
    let imagePrompt = extractContent(section, '---IMAGE PROMPT #', ['---IMAGE STYLE---', '---AUDIENCE TARGETING---', '---COMPETITIVE EDGE---']);
    if (!imagePrompt) {
      imagePrompt = extractContent(section, '---IMAGE PROMPT---', ['---IMAGE STYLE---', '---AUDIENCE TARGETING---', '---COMPETITIVE EDGE---']);
    }
    
    // Si le prompt d'image contient encore un numéro (comme "1---"), le nettoyer
    if (imagePrompt && /^\d+---/.test(imagePrompt)) {
      imagePrompt = imagePrompt.replace(/^\d+---/, '').trim();
    }
    
    // Extraire le style d'image
    const imageStyle = extractContent(section, '---IMAGE STYLE---', ['---AUDIENCE TARGETING---', '---COMPETITIVE EDGE---', '---LEGAL COMPLIANCE---']);
    
    // Extraire le ciblage d'audience
    const audienceTargeting = extractContent(section, '---AUDIENCE TARGETING---', ['---COMPETITIVE EDGE---', '---LEGAL COMPLIANCE---', '---CULTURAL RELEVANCE---']);
    
    // Extraire l'avantage concurrentiel
    const competitiveEdge = extractContent(section, '---COMPETITIVE EDGE---', ['---LEGAL COMPLIANCE---', '---CULTURAL RELEVANCE---', '---PERFORMANCE METRICS---']);
    
    // Extraire la conformité légale
    const legalCompliance = extractContent(section, '---LEGAL COMPLIANCE---', ['---CULTURAL RELEVANCE---', '---PERFORMANCE METRICS---']);
    
    // Extraire la pertinence culturelle
    const culturalRelevance = extractContent(section, '---CULTURAL RELEVANCE---', ['---PERFORMANCE METRICS---', '---PRODUITS SÉLECTIONNÉS---']);
    
    // 🎯 EXTRAIRE LA SÉLECTION DE PRODUITS GPT-5
    const productsSelected = extractContent(section, '---PRODUITS SÉLECTIONNÉS---', ['---PERFORMANCE METRICS---']);
    
    // Si aucun prompt d'image n'est trouvé, essayer le format original
    if (!imagePrompt) {
      // Chercher le dernier "---IMAGE PROMPT #" dans la section
      const lastImagePromptIndex = section.lastIndexOf('---IMAGE PROMPT #');
      if (lastImagePromptIndex !== -1) {
        // Extraire tout ce qui suit ce marqueur
        imagePrompt = section.substring(lastImagePromptIndex + '---IMAGE PROMPT #'.length).trim();
        // Si le prompt commence par un numéro suivi de "---", le nettoyer
        imagePrompt = imagePrompt.replace(/^\d+---/, '').trim();
      }
      
      // Si toujours pas de prompt, utiliser un prompt par défaut
      if (!imagePrompt) {
        imagePrompt = `Generate a high-quality, professional image for a social media post about the brand and products.`;
      }
    }
    
    posts.push({
      postContent,
      imagePrompt,
      hashtags,
      callToAction,
      imageStyle,
      audienceTargeting,
      competitiveEdge,
      legalCompliance,
      culturalRelevance,
      productsSelected
    });
  }
  
  return posts;
}

/**
 * Parse la réponse de GPT avec le format original (pour compatibilité)
 */
export function parseOriginalGPTResponse(content: string): Array<{ postContent: string; imagePrompt: string }> {
  const posts = [];
  const sections = content.split('---POST #');
  
  // Ignorer la première section qui est vide
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    const [postNumber, ...rest] = section.split('---IMAGE PROMPT #');
    const postContent = postNumber.split('\n').slice(1).join('\n').trim();
    
    // Vérifier si rest[0] existe avant d'essayer d'accéder à sa méthode split
    let imagePrompt = '';
    if (rest.length > 0 && rest[0]) {
      imagePrompt = rest[0].split('\n').slice(1).join('\n').trim();
    } else {
      // Si l'image prompt n'est pas trouvé, utiliser un prompt par défaut
      console.log(`Avertissement: Prompt d'image non trouvé pour le post #${i}. Utilisation d'un prompt par défaut.`);
      imagePrompt = `Generate a high-quality, professional image for a social media post about the brand and products.`;
    }
    
    posts.push({
      postContent,
      imagePrompt
    });
  }
  
  return posts;
}

/**
 * Détecte automatiquement le format de la réponse et utilise le parser approprié
 */
export function parseGPTResponse(content: string): Array<{
  postContent: string;
  imagePrompt: string;
  hashtags?: string[];
  callToAction?: string;
  imageStyle?: string;
  audienceTargeting?: string;
  competitiveEdge?: string;
  legalCompliance?: string;
  culturalRelevance?: string;
  productsSelected?: string;
}> {
  // Détecter si le format est amélioré
  const hasEnhancedFormat = content.includes('---HASHTAGS---') || 
                           content.includes('---CALL TO ACTION---') || 
                           content.includes('---IMAGE STYLE---') ||
                           content.includes('---AUDIENCE TARGETING---');
  
  if (hasEnhancedFormat) {
    return parseEnhancedGPTResponse(content);
  } else {
    // Convertir le format original au format amélioré (avec moins de champs)
    return parseOriginalGPTResponse(content).map(post => ({
      postContent: post.postContent,
      imagePrompt: post.imagePrompt,
      hashtags: extractHashtags(post.postContent),
      callToAction: extractCallToAction(post.postContent)
    }));
  }
}

/**
 * Extrait les hashtags d'un texte
 */
function extractHashtags(text: string): string[] {
  const hashtagRegex = /#[\w\u00C0-\u00FF]+/g;
  return text.match(hashtagRegex) || [];
}

/**
 * Tente d'extraire un call-to-action d'un texte
 */
function extractCallToAction(text: string): string {
  // Recherche des phrases qui ressemblent à des CTA
  const ctaPatterns = [
    /(?:cliquez|click).*(?:lien|link)/i,
    /(?:visitez|visit).*(?:site|website|boutique|store)/i,
    /(?:découvrez|discover)/i,
    /(?:achetez|buy|shop).*(?:maintenant|now)/i,
    /(?:inscrivez-vous|sign up)/i,
    /(?:contactez-nous|contact us)/i,
    /(?:en savoir plus|learn more)/i
  ];
  
  // Diviser le texte en phrases
  const sentences = text.split(/[.!?]+/);
  
  // Rechercher des phrases qui correspondent aux patterns de CTA
  for (const pattern of ctaPatterns) {
    for (const sentence of sentences) {
      if (pattern.test(sentence)) {
        return sentence.trim();
      }
    }
  }
  
  return '';
}
