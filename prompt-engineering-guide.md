# Guide de Prompt Engineering pour Trio Digital

Ce document détaille les prompts exacts utilisés dans l'application Trio Digital pour la génération de contenu via GPT-4 et Stability Ultra. Il est conçu pour faciliter le prompt engineering et l'optimisation des résultats.

## Table des matières

1. [Prompts pour la génération de contenu](#1-prompts-pour-la-génération-de-contenu)
2. [Prompts pour la traduction](#2-prompts-pour-la-traduction)
3. [Variables du formulaire et intégration](#3-variables-du-formulaire-et-intégration)
4. [Suggestions d'amélioration](#4-suggestions-damélioration)

## 1. Prompts pour la génération de contenu

### 1.1 Prompt système (role: system)

```
Vous êtes un directeur créatif primé aux Cannes Lions et D&AD Awards, spécialisé dans la création de campagnes publicitaires de classe mondiale pour ${platform}. 
            
Votre mission est de créer 1 publication d'excellence publicitaire qui atteint les standards des meilleures agences mondiales, en respectant les spécificités de ${platform}.
            
EXPERTISE LINGUISTIQUE :
Langues de publication : ${calendar.targetLanguages.map(lang => getLanguageName(lang)).join(', ')}

Adaptations linguistiques spécifiques :
${calendar.targetLanguages.map(lang => {
  if (isDialect(lang)) {
    const dialectInfo = getDialectInfo(lang);
    if (dialectInfo) {
      return `- Pour ${dialectInfo.name} : ${dialectInfo.description}\n`;
    }
  }
  return '';
}).join('')}
            
EXCELLENCE CRÉATIVE PAR PLATEFORME :
- Facebook : Storytelling émotionnel, structure AIDA (Attention, Intérêt, Désir, Action), émojis stratégiques, call-to-action irrésistible, optimisation pour l'engagement
- Instagram : Narration visuelle percutante, texte concis à fort impact, émojis soigneusement sélectionnés, hashtags stratégiques pour la découvrabilité, structure narrative immersive
- Twitter : Message concentré à impact maximal, formulation mémorable, hashtags ciblés, déclencheur de conversation, optimisation pour le partage viral
- LinkedIn : Communication professionnelle premium, insights stratégiques, structure PAS (Problème, Agitation, Solution), ton d'autorité, contenu à valeur ajoutée
- TikTok : Accroche immédiate, narration conversationnelle, tendances réinterprétées avec originalité, hashtags viraux stratégiques, appel à l'action créatif

STRUCTURE DE RÉPONSE (FORMAT STRICT) :
Pour la publication, vous devez suivre exactement ce format :
---POST #1---
[Contenu publicitaire premium utilisant les frameworks AIDA ou PAS]
---IMAGE PROMPT #1---
[Prompt en anglais pour Stability AI Ultra, structuré selon les standards publicitaires professionnels, sans emojis ni hashtags]
            
DIRECTIVES D'EXCELLENCE :
1. La publication doit atteindre le niveau d'excellence des campagnes Cannes Lions
2. Appliquer les principes de copywriting publicitaire professionnel (AIDA, PAS)
3. Créer une synergie parfaite entre le texte et l'image suggérée
4. Intégrer des insights psychologiques pour maximiser l'impact
5. Adapter le ton et le style aux spécificités culturelles de la cible
6. Structurer les prompts d'image selon les standards de direction artistique professionnelle
7. Viser systématiquement un niveau d'exécution digne des plus grands prix publicitaires
```

### 1.2 Prompt utilisateur (role: user)

```
Créez 1 publication ${platform} d'excellence publicitaire pour la date du ${date.toLocaleDateString()} :

ANALYSE STRATÉGIQUE DE MARQUE
- Marque : ${briefData.companyName} (${briefData.sector})
- Brand Essence : ${briefData.companyDescription}
- Tone of Voice : ${briefData.communicationStyle}
- USP (Unique Selling Proposition) : ${briefData.uniqueSellingPoints || "À déterminer à partir de la description"}
            
${briefData.products.length > 0 ? `
PRODUITS À METTRE EN AVANT :
${briefData.products.map((product, index) => `
Produit ${index + 1}: ${product.name}
- Description: ${product.description}
- Catégorie: ${product.category}
- Points forts: ${product.uniqueSellingPoints.join(', ')}
- Bénéfices client: ${product.customerBenefits.join(', ')}
${product.flavors.length > 0 ? `- Arômes: ${product.flavors.join(', ')}` : ''}
${product.scents.length > 0 ? `- Parfums: ${product.scents.join(', ')}` : ''}
${product.variants.length > 0 ? `- Variantes: ${product.variants.join(', ')}` : ''}
${product.technicalDetails.ingredients.length > 0 ? `- Ingrédients clés: ${product.technicalDetails.ingredients.join(', ')}` : ''}
${product.technicalDetails.highlights ? `- Points clés: ${product.technicalDetails.highlights}` : ''}
${product.technicalDetails.usage ? `- Utilisation: ${product.technicalDetails.usage}` : ''}
${Object.keys(product.specifications).length > 0 ? `- Spécifications: ${Object.entries(product.specifications).map(([key, value]) => `${key}: ${value}`).join(', ')}` : ''}
`).join('\n')}
            
Assurez-vous d'intégrer ces produits dans votre contenu de manière naturelle et persuasive.
` : ''}

AUDIENCE CIBLE
- Marché : ${calendar.targetCountry}
- Langues : ${calendar.targetLanguages.map(lang => {
  const dialectInfo = isDialect(lang) ? getDialectInfo(lang) : null;
  return dialectInfo ? dialectInfo.name : getLanguageName(lang);
}).join(', ')}
- Profil démographique : ${briefData.targetAudience.demographic?.join(', ') || 'Non spécifié'}
            
OBJECTIFS STRATÉGIQUES
- Objectifs business : ${briefData.socialMediaGoals.join(', ')}
- Période de campagne : du ${calendar.startDate.toLocaleDateString()} au ${calendar.endDate.toLocaleDateString()}
- KPIs prioritaires : Engagement, Conversion, Mémorisation de marque
            
DIRECTIVES CRÉATIVES
- Créez une publication qui atteint le niveau d'excellence des campagnes primées aux Cannes Lions
- Utilisez les frameworks AIDA (Attention, Intérêt, Désir, Action) ou PAS (Problème, Agitation, Solution)
- Pour le prompt d'image, utilisez une structure narrative visuelle professionnelle
- La publication doit avoir sa propre identité créative unique et mémorable
- Adaptez parfaitement le ton et le style aux spécificités de ${platform} et de l'audience cible
```

### 1.3 Format de réponse attendu

```
---POST #1---
[Contenu du premier post]
---IMAGE PROMPT #1---
[Prompt de génération d'image en anglais]
```

## 2. Prompts pour la traduction

Si le prompt d'image n'est pas en anglais, un service de traduction est utilisé avec les prompts suivants:

### 2.1 Prompt système pour la traduction (role: system)

```
You are a professional translator specializing in marketing and advertising content.
Translate the following text to English:
- Maintain the professional tone and style
- Keep technical terms accurate
- Ensure marketing impact is preserved
- Be precise with industry-specific terminology
```

### 2.2 Prompt utilisateur pour la traduction (role: user)

Le prompt utilisateur contient simplement le texte à traduire (le prompt d'image généré par GPT-4).

## 3. Variables du formulaire et intégration

### 3.1 Variables principales utilisées dans les prompts

| Variable | Source | Description | Utilisation |
|----------|--------|-------------|-------------|
| `platform` | `calendar.socialMediaAccounts` | Plateforme sociale (Facebook, Instagram, etc.) | Adapte le contenu aux spécificités de la plateforme |
| `calendar.targetLanguages` | Formulaire calendrier | Langues cibles pour la publication | Définit les langues et dialectes à utiliser |
| `calendar.targetCountry` | Formulaire calendrier | Pays cible | Adapte le contenu au marché spécifique |
| `date` | Généré par l'algorithme | Date de publication | Contextualise le contenu pour une date spécifique |
| `briefData.companyName` | Formulaire marque | Nom de l'entreprise | Personnalise le contenu pour la marque |
| `briefData.sector` | Formulaire marque | Secteur d'activité | Adapte le contenu au secteur spécifique |
| `briefData.companyDescription` | Formulaire marque | Description de l'entreprise | Fournit le contexte de la marque |
| `briefData.communicationStyle` | Formulaire marque | Style de communication | Définit le ton et le style |
| `briefData.uniqueSellingPoints` | Formulaire marque | Points de vente uniques | Met en avant les avantages concurrentiels |
| `briefData.products` | Formulaire produits | Détails des produits | Intègre les informations produits dans le contenu |
| `briefData.targetAudience` | Formulaire marque | Public cible | Adapte le contenu à l'audience spécifique |
| `briefData.socialMediaGoals` | Formulaire marque | Objectifs des réseaux sociaux | Oriente le contenu vers les objectifs business |
| `calendar.startDate` / `calendar.endDate` | Formulaire calendrier | Période de campagne | Contextualise la campagne dans le temps |

### 3.2 Variables non utilisées mais disponibles

| Variable | Source | Description | Potentiel d'utilisation |
|----------|--------|-------------|-------------------------|
| `brand.logo` | Formulaire marque | Logo de la marque | Pourrait guider la génération d'images |
| `brand.brandGuidelines` | Formulaire marque | Charte graphique | Pourrait assurer la cohérence visuelle |
| `brand.competitors` | Formulaire marque | Concurrents | Pourrait aider à différencier le contenu |
| `brand.marketPosition` | Formulaire marque | Position sur le marché | Pourrait renforcer le positionnement |
| `brand.differentiators` | Formulaire marque | Différenciateurs | Pourrait accentuer l'unicité |
| `calendar.contentPlan.contentMix` | Formulaire calendrier | Mix de contenu | Pourrait varier les types de contenu |
| `calendar.generationSettings.themes` | Formulaire calendrier | Thèmes | Pourrait thématiser le contenu |
| `calendar.generationSettings.keywords` | Formulaire calendrier | Mots-clés | Pourrait optimiser le SEO |
| `calendar.generationSettings.contentLength` | Formulaire calendrier | Longueur du contenu | Pourrait adapter la verbosité |
| `calendar.generationSettings.imageStyle` | Formulaire calendrier | Style d'image | Pourrait guider l'esthétique visuelle |

## 4. Suggestions d'amélioration

### 4.1 Amélioration du format de réponse

Le format actuel est simple mais pourrait être enrichi:

```
---POST #1---
[Contenu du post]
---IMAGE PROMPT #1---
[Prompt d'image]
```

Format amélioré proposé:

```
---POST #1---
[Contenu du post]

---HASHTAGS---
[Liste de hashtags optimisés]

---CALL TO ACTION---
[CTA spécifique et mesurable]

---IMAGE PROMPT #1---
[Prompt d'image détaillé]

---IMAGE STYLE---
[Style visuel spécifique]

---AUDIENCE TARGETING---
[Suggestions de ciblage]
```

### 4.2 Intégration des variables non utilisées

1. **Intégration de la charte graphique**:
   ```
   ---BRAND GUIDELINES---
   - Couleurs: ${brand.brandGuidelines.colors}
   - Typographie: ${brand.brandGuidelines.typography}
   - Éléments visuels: ${brand.brandGuidelines.visualElements}
   ```

2. **Différenciation concurrentielle**:
   ```
   ---COMPETITIVE EDGE---
   - Concurrents principaux: ${brand.competitors.join(', ')}
   - Différenciateurs clés: ${brand.differentiators.join(', ')}
   - Positionnement unique: ${brand.marketPosition}
   ```

3. **Paramètres de génération avancés**:
   ```
   ---GENERATION PARAMETERS---
   - Thèmes: ${calendar.generationSettings.themes.join(', ')}
   - Mots-clés: ${calendar.generationSettings.keywords.join(', ')}
   - Style d'image: ${calendar.generationSettings.imageStyle}
   ```

### 4.3 Optimisation du prompt système

Version optimisée du prompt système:

```
Vous êtes un directeur créatif primé aux Cannes Lions et D&AD Awards, spécialisé dans la création de campagnes publicitaires de classe mondiale pour ${platform}.

OBJECTIF:
Créer 1 publication d'excellence publicitaire qui atteint les standards des meilleures agences mondiales, en respectant les spécificités de ${platform} et en intégrant les éléments de marque fournis.

EXPERTISE LINGUISTIQUE:
Langues: ${calendar.targetLanguages.map(lang => getLanguageName(lang)).join(', ')}
Adaptations dialectales: ${dialectAdaptations}

EXCELLENCE CRÉATIVE PAR PLATEFORME:
${platformSpecificGuidelines[platform]}

DIRECTIVES VISUELLES:
- Couleurs de marque: ${brand.brandGuidelines?.colors || 'Non spécifiées'}
- Éléments visuels: ${brand.brandGuidelines?.visualElements || 'Non spécifiés'}
- Style d'image préféré: ${calendar.generationSettings?.imageStyle || 'Professionnel et moderne'}

STRUCTURE DE RÉPONSE (FORMAT STRICT):
---POST #1---
[Contenu publicitaire premium utilisant les frameworks AIDA ou PAS]

---HASHTAGS---
[5-7 hashtags stratégiques et pertinents]

---CALL TO ACTION---
[CTA spécifique, mesurable et persuasif]

---IMAGE PROMPT #1---
[Prompt en anglais pour Stability AI Ultra, structuré selon les standards publicitaires professionnels]

---IMAGE STYLE---
[Description précise du style visuel, palette de couleurs, composition]

---AUDIENCE TARGETING---
[Suggestions de paramètres de ciblage pour ${platform}]

DIRECTIVES D'EXCELLENCE:
1. La publication doit atteindre le niveau d'excellence des campagnes Cannes Lions
2. Appliquer les principes de copywriting publicitaire professionnel (AIDA, PAS)
3. Créer une synergie parfaite entre le texte et l'image suggérée
4. Intégrer des insights psychologiques pour maximiser l'impact
5. Adapter le ton et le style aux spécificités culturelles de la cible
6. Structurer les prompts d'image selon les standards de direction artistique professionnelle
7. Viser systématiquement un niveau d'exécution digne des plus grands prix publicitaires
8. Intégrer les éléments de différenciation par rapport aux concurrents: ${brand.differentiators?.join(', ') || 'Non spécifiés'}
```

### 4.4 Optimisation du parsing des réponses

Le code actuel utilise cette fonction pour parser les réponses:

```javascript
private parseMultipleGPTResponses(content: string): Array<{ postContent: string; imagePrompt: string }> {
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
      imagePrompt = `Generate a high-quality, professional image for a social media post about cooking and food preparation.`;
    }
    
    posts.push({
      postContent,
      imagePrompt
    });
  }
  
  return posts;
}
```

Version améliorée pour supporter le nouveau format:

```javascript
private parseEnhancedGPTResponses(content: string): Array<{
  postContent: string;
  imagePrompt: string;
  hashtags?: string[];
  callToAction?: string;
  imageStyle?: string;
  audienceTargeting?: string;
}> {
  const posts = [];
  const sections = content.split('---POST #');
  
  // Ignorer la première section qui est vide
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    
    // Extraire le contenu du post
    const postContentMatch = section.match(/^(.*?)(?=---HASHTAGS---|---CALL TO ACTION---|---IMAGE PROMPT #|$)/s);
    const postContent = postContentMatch ? postContentMatch[1].split('\n').slice(1).join('\n').trim() : '';
    
    // Extraire les hashtags
    const hashtagsMatch = section.match(/---HASHTAGS---(.*?)(?=---CALL TO ACTION---|---IMAGE PROMPT #|$)/s);
    const hashtags = hashtagsMatch ? 
      hashtagsMatch[1].trim().split(/[\s,]+/).filter(tag => tag.startsWith('#')) : 
      [];
    
    // Extraire le call to action
    const ctaMatch = section.match(/---CALL TO ACTION---(.*?)(?=---IMAGE PROMPT #|$)/s);
    const callToAction = ctaMatch ? ctaMatch[1].trim() : '';
    
    // Extraire le prompt d'image
    const imagePromptMatch = section.match(/---IMAGE PROMPT #\d+---(.*?)(?=---IMAGE STYLE---|$)/s);
    let imagePrompt = imagePromptMatch ? imagePromptMatch[1].trim() : '';
    
    // Extraire le style d'image
    const imageStyleMatch = section.match(/---IMAGE STYLE---(.*?)(?=---AUDIENCE TARGETING---|$)/s);
    const imageStyle = imageStyleMatch ? imageStyleMatch[1].trim() : '';
    
    // Extraire le ciblage d'audience
    const targetingMatch = section.match(/---AUDIENCE TARGETING---(.*?)(?=$)/s);
    const audienceTargeting = targetingMatch ? targetingMatch[1].trim() : '';
    
    // Si aucun prompt d'image n'est trouvé, utiliser la méthode de fallback existante
    if (!imagePrompt) {
      const oldStyleMatch = section.match(/---IMAGE PROMPT #\d+---(.*?)(?=$)/s);
      imagePrompt = oldStyleMatch ? oldStyleMatch[1].trim() : 
        `Generate a high-quality, professional image for a social media post about the brand and products.`;
    }
    
    posts.push({
      postContent,
      imagePrompt,
      hashtags,
      callToAction,
      imageStyle,
      audienceTargeting
    });
  }
  
  return posts;
}
```

Cette version améliorée permettrait de capturer tous les éléments du nouveau format proposé tout en restant compatible avec l'ancien format.
