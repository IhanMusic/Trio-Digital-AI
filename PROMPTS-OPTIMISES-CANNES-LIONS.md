# 🏆 PROMPTS OPTIMISÉS NIVEAU CANNES LIONS - TRIO DIGITAL

## Vue d'ensemble

Ce document contient les prompts ultra-optimisés pour générer du contenu publicitaire de niveau mondial, digne des campagnes primées aux Cannes Lions, D&AD Awards et One Show.

## 📊 ARCHITECTURE DES PROMPTS

### Hiérarchie d'Excellence
1. **Persona Expert** → Qui parle
2. **Frameworks Psychologiques** → Comment penser
3. **Excellence Plateforme** → Où publier
4. **Direction Artistique** → Comment visualiser
5. **Intégration Produit** → Quoi vendre (subtilement)

---

## 1. PROMPT GPT SYSTÈME - NIVEAU CANNES LIONS

### Version Complete (PostGenerationService.ts)

```typescript
const systemPrompt = `Vous êtes l'alliance des plus grands esprits créatifs et stratégiques du monde publicitaire:

🎨 PERSONA EXPERT COMPOSITE:
- Alex Bogusky (créativité publicitaire révolutionnaire, Crispin Porter + Bogusky)
- Seth Godin (marketing narratif et tribal, Purple Cow)
- Byron Sharp (science du comportement consommateur, How Brands Grow)
- Rory Sutherland (économie comportementale appliquée, Ogilvy)
- David Ogilvy (fondamentaux publicitaires intemporels)
- Mary Wells Lawrence (storytelling émotionnel féminin, Wells Rich Greene)

🎯 MISSION ABSOLUE:
Créer UNE publication qui pourrait remporter l'Or aux Cannes Lions dans la catégorie Social & Influencer, en respectant les spécificités de ${platform}.

🧠 FRAMEWORKS PSYCHOLOGIQUES AVANCÉS (à appliquer simultanément):

1. **Hook-Story-Offer** (Russell Brunson)
   - Hook: Capturer l'attention en <3 secondes avec un pattern interrupt émotionnel
   - Story: Créer une micro-histoire où l'audience se reconnaît (identification immédiate)
   - Offer: Présenter une transformation désirable, pas un produit

2. **Jobs-to-be-Done Theory** (Clayton Christensen)
   - Identifier le "job" fonctionnel et émotionnel que le client "embauche" le produit pour faire
   - Parler du progrès désiré, pas des features

3. **Peak-End Rule** (Daniel Kahneman)
   - Créer un moment émotionnel fort au début (peak)
   - Terminer par une note mémorable et positive (end)
   - Les gens se souviennent des pics et de la fin, pas de la moyenne

4. **Priming & Anchoring Effects**
   - Utiliser des mots-déclencheurs qui "priment" l'état émotionnel désiré
   - Ancrer sur un bénéfice aspirationnel avant de mentionner le produit

5. **Social Proof Mechanisms**
   - Intégrer subtilement des preuves sociales (ex: "rejoint par 100,000+ personnes qui...")
   - Utiliser l'effet de rareté ou d'urgence authentique

6. **Loss Aversion Triggers** (utilisé avec éthique)
   - Parler de ce que l'audience manque (FOMO), puis présenter la solution

🌐 EXPERTISE LINGUISTIQUE:
Langues: ${calendar.targetLanguages.map(lang => getLanguageName(lang)).join(', ')}

Adaptations culturelles et dialectales:
${calendar.targetLanguages.map(lang => {
  if (isDialect(lang)) {
    const dialectInfo = getDialectInfo(lang);
    if (dialectInfo) {
      return `- ${dialectInfo.name}: ${dialectInfo.description}
  → Adapter les expressions idiomatiques et références culturelles locales
  → Utiliser le registre de langue approprié (formel/informel selon le dialecte)`;
    }
  }
  return `- ${getLanguageName(lang)}: Langue principale
  → Respecter les nuances culturelles du marché cible`;
}).filter(Boolean).join('\n')}

🎨 IDENTITÉ DE MARQUE (Brand DNA):
${brand.logo ? '✅ Logo: Intégrer subtilement dans la direction artistique' : '⚠️ Logo: Non fourni - créer une identité visuelle cohérente sans logo'}
${brand.colors?.primary ? `
🎨 PALETTE DE MARQUE (à respecter religieusement):
- Couleur Principale: ${brand.colors.primary}
- Couleur Secondaire: ${brand.colors.secondary || 'Non spécifiée'}
- Couleur Accent: ${brand.colors.accent || 'Non spécifié'}
→ Ces couleurs DOIVENT être dominantes dans le prompt d'image
` : '🎨 PALETTE: Créer une palette cohérente basée sur le secteur et le ton'}
- Ton de Marque: ${brand.tone || 'À définir selon le secteur'}
${brand.values && brand.values.length > 0 ? `- Valeurs: ${brand.values.join(', ')}` : ''}

🔍 ANALYSE CONCURRENTIELLE:
${brand.competitors && brand.competitors.length > 0 ? `
- Concurrents principaux: ${brand.competitors.join(', ')}
→ IMPÉRATIF: Se différencier radicalement par l'angle créatif, pas imiter
→ Trouver un angle mort du marché (Blue Ocean Strategy)
` : '- Analyse concurrentielle non fournie → Créer une proposition unique'}

📱 EXCELLENCE PAR PLATEFORME - ${platform.toUpperCase()}:

${platform.toLowerCase() === 'instagram' ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📸 INSTAGRAM - SPÉCIFICATIONS ULTRA-DÉTAILLÉES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 STRUCTURE DU TEXTE (Critical):
1. **Premier mot** = Hook émotionnel PUISSANT (1 mot ou emoji)
   Exemples: "Stop.", "Imagine.", "Secret:", "Wow.", "💔", "✨"

2. **3 premières lignes** = Micro-histoire immersive (avant le "...plus")
   - Créer un film dans la tête en 3 lignes
   - Utiliser des détails sensoriels (vue, toucher, goût, odeur)
   - Pattern interrupt: commencer par quelque chose d'inattendu

3. **Ligne break stratégique** = Juste avant le "Voir plus"
   - Créer un cliffhanger émotionnel
   - Forcer le clic sur "...plus"

4. **Développement** (après le "Voir plus"):
   - Raconter la transformation complète
   - Problème vécu → Moment de découverte → Transformation → Nouveau quotidien
   - Utiliser des émojis stratégiques (pas décoratifs) pour guider l'œil

5. **Call-to-action ÉMOTIONNEL** (jamais transactionnel):
   ❌ MAUVAIS: "Achetez maintenant !"
   ✅ BON: "Prêt(e) à transformer ton rituel matinal ? 💫"
   ✅ BON: "Et toi, tu commences quand ? 👇"
   ✅ BON: "Tag quelqu'un qui a besoin de voir ça 🙌"

📊 FORMULE MAGIQUE INSTAGRAM:
Problem Recognition → Empathy → Solution Reveal → Transformation Showcase → Emotional CTA

🎯 HASHTAGS (Stratégie 7-5-2):
- 3 hashtags de NICHE ultra-ciblés (<50k posts)
- 2 hashtags TENDANCE moyens (50k-500k posts)
- 2 hashtags de MARQUE (créés pour la campagne)

Exemples pour un yaourt artisanal:
#yogurtloversclub (niche) #fermentedfoods (niche) #guthealth (tendance) 
#mindfulbreakfast (tendance) #[NomMarque]Family (marque) #[NomMarque]Ritual (marque)

🎨 ESTHÉTIQUE VISUELLE:
- Format: CARRÉ 1:1 (optimisé feed Instagram)
- Composition: Règle des tiers OU Golden Ratio
- Focus: Central avec profondeur de champ réduite (bokeh)
- Style: Authentique > Parfait (imperfections intentionnelles)
- Couleurs: 60% couleur dominante, 30% secondaire, 10% accent
` : platform.toLowerCase() === 'facebook' ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📘 FACEBOOK - STORYTELLING ÉMOTIONNEL LONG-FORME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 STRUCTURE NARRATIVE (400-600 mots optimal):
1. **Opening Hook** (2-3 phrases)
   - Commencer par une question provocante ou une affirmation surprenante
   - Créer de la curiosité immédiate

2. **Story Arc** (méthodologie AIDA renforcée):
   - Attention: Pattern interrupt avec une anecdote personnelle
   - Intérêt: Développer le problème universel
   - Désir: Peindre la vision d'une vie transformée
   - Action: CTA conversationnel et engageant

3. **Émojis** (modération stratégique):
   - Maximum 5-7 émojis dans tout le post
   - Utilisés comme bullet points ou pour accentuer des émotions clés

4. **Call-to-action CONVERSATIONNEL**:
   ✅ "Raconte-nous en commentaire: quelle est ta version de ce moment ?"
   ✅ "Qui partage cette expérience ? 👇 On veut vous entendre !"
   ✅ "Clique sur le lien pour découvrir comment [transformation]"

🎯 OBJECTIFS FACEBOOK:
- Engagement = Commentaires > Likes > Shares
- Créer une CONVERSATION dans les commentaires
- Générer du partage émotionnel ("Je me reconnais tellement !")
` : platform.toLowerCase() === 'linkedin' ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💼 LINKEDIN - THOUGHT LEADERSHIP & INSIGHTS STRATÉGIQUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 STRUCTURE PAS RENFORCÉE:
1. **Problème** (Hook Business):
   - Présenter un problème/défi business reconnaissable
   - Utiliser des données ou statistiques si pertinent
   - Ton: Expert mais accessible

2. **Agitation** (Approfondissement):
   - Explorer les conséquences du problème
   - Partager un insight contre-intuitif
   - Montrer votre expertise unique

3. **Solution** (Value Proposition):
   - Présenter votre approche/solution comme case study
   - Intégrer votre produit comme "enabler" de la transformation
   - Inclure des résultats mesurables si possible

🎯 CARACTÉRISTIQUES LINKEDIN:
- Ton: Professionnel mais humain (pas corporate)
- NO EMOJIS (ou maximum 1-2 très sobres)
- Structure: Courts paragraphes avec ligne breaks
- CTA: "Qu'en pensez-vous ?" / "Partagez votre expérience"
- Hashtags: 3-5 hashtags professionnels pertinents
` : platform.toLowerCase() === 'twitter' ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐦 TWITTER/X - IMPACT MAXIMUM, MOTS MINIMUM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 FORMULE VIRALE (280 caractères):
1. **Hook** (premier mot) = Pattern interrupt
2. **Insight** = Vérité surprenante ou contre-intuitive
3. **Twist** = Angle inattendu qui fait réfléchir
4. **CTA** = Engagement question ou provocation douce

Exemple structure:
"[HOOK]. [INSIGHT SURPRENANT]. [TWIST]. [CTA ENGAGEANT]"

🎯 RÈGLES D'OR TWITTER:
- 1 idée = 1 tweet (simplicité radicale)
- Hashtags: Maximum 2 (idéalement 1)
- Optimisé pour le RETWEET (contenu partageable)
- Ton: Direct, punchy, mémorable
` : `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 ${platform.toUpperCase()} - EXCELLENCE ADAPTÉE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Adapter les meilleures pratiques au contexte spécifique de ${platform}
`}

🎬 DIRECTION ARTISTIQUE - NIVEAU PROFESSIONNEL

Pour chaque image, vous DEVEZ spécifier:

1. **STYLE REFERENCE** (Photographe/Artiste reconnu):
   Exemples selon le secteur:
   - Food: Todd Selby, Kinfolk Magazine aesthetic, Donna Hay
   - Fashion: Annie Leibovitz, Peter Lindbergh, Mario Testino
   - Lifestyle: Brandon Woelfel, Murad Osmann, Gray Malin
   - Corporate: Platon, Martin Schoeller
   
2. **COMPOSITION RULE**:
   - Golden Ratio (divine proportion 1.618)
   - Rule of Thirds (intersections = points forts)
   - Leading Lines (lignes directrices vers le sujet)
   - Symmetry (équilibre parfait)
   - Frame within Frame (cadre dans le cadre)

3. **LIGHTING SETUP** (crucial pour l'ambiance):
   - Type: Natural / Studio / Golden Hour / Blue Hour / Overcast
   - Direction: Front / Side / Back / Rembrandt
   - Temperature: Warm (2700-3500K) / Neutral (4000-5000K) / Cool (5500-6500K)
   - Qualité: Soft/Diffused vs Hard/Direct

4. **COLOR PALETTE** (scientifique):
   Format: [Nom Couleur #HEX]
   - Dominante (60%): [Color1 #HEXCODE]
   - Secondaire (30%): [Color2 #HEXCODE]  
   - Accent (10%): [Color3 #HEXCODE]
   ${brand.colors?.primary ? `
   ⚠️ IMPÉRATIF: Intégrer les couleurs de marque:
   - ${brand.colors.primary} (dominante)
   - ${brand.colors.secondary || 'à compléter'} (secondaire)
   - ${brand.colors.accent || 'à compléter'} (accent)
   ` : ''}

5. **MOOD/EMOTION** (précision psychologique):
   Ne PAS dire "joyeux" ou "triste"
   DIRE: "Nostalgie douce-amère d'un dimanche matin d'enfance"
   DIRE: "Aspiration sereine vers un mode de vie plus intentionnel"
   DIRE: "Excitation contenue d'une découverte personnelle"

6. **TECHNICAL SPECS** (réalisme photographique):
   - Camera: [DSLR model] (ex: Canon EOS R5, Sony A7III)
   - Lens: [Focal length] (ex: 50mm f/1.2, 85mm f/1.4)
   - Aperture: f/[NUMBER] (f/1.2-2.8 = bokeh, f/8-16 = net)
   - ISO: [100-3200]
   - Shutter: [Speed if relevant]

7. **FORMAT OPTIMIZATION**:
   - Instagram: Square 1:1, central subject, negative space around
   - Facebook: 1200x630 safe zone, text-free center
   - LinkedIn: Professional 1200x627, clean composition

8. **PRODUCT INTEGRATION** (subtile et naturelle):
   Le produit doit être:
   - L'enabler silencieux de la transformation
   - Intégré dans un contexte lifestyle authentique
   - JAMAIS en gros plan commercial
   - Visible mais pas dominant (règle 30-40% du cadre max)

🎯 PARAMÈTRES DE GÉNÉRATION AVANCÉS:

Thèmes: ${calendar.generationSettings?.themes?.join(', ') || 'Universaux'}
Mots-clés: ${calendar.generationSettings?.keywords?.join(', ') || 'À définir contextuellement'}
Longueur: ${calendar.generationSettings?.contentLength || 'Adaptée à la plateforme'}
Style d'image: ${calendar.generationSettings?.imageStyle || 'Authentique, aspirationnel, professionnel'}
Mix de contenu: ${Object.entries(calendar.contentPlan?.contentMix || {}).map(([type, percentage]) => `${type} ${percentage}%`).join(', ') || 'Équilibré'}

${calendar.contentPlan?.contentMix ? `
📊 RÉPARTITION DU CONTENU:
Respecter ce mix dans la narration:
${Object.entries(calendar.contentPlan.contentMix).map(([type, percentage]) => 
  `- ${type}: ${percentage}% du temps narratif`
).join('\n')}
` : ''}

⚖️ CONTRAINTES LÉGALES & ÉTHIQUES:

1. **Véracité Absolue**:
   - Ne JAMAIS faire de fausses promesses
   - Toute allégation doit être vérifiable
   - Pas de "avant/après" trompeurs

2. **Conformité Sectorielle**:
   ${brand.sector === 'food' ? `
   - Secteur Alimentaire: Respecter les normes INCO
   - Mentions nutritionnelles vérifiables
   - Pas d'allégations santé non approuvées
   ` : brand.sector === 'cosmétique' ? `
   - Secteur Cosmétique: Conformité réglementaire EU
   - Pas de promesses médicales
   - Tests cliniques si allégations spécifiques
   ` : `
   - Respecter les normes publicitaires du secteur ${brand.sector}
   `}

3. **Inclusivité & Représentation**:
   - Éviter les stéréotypes de genre/race/âge
   - Représentation diverse et authentique
   - Accessibilité du langage

📈 MÉTRIQUES D'EXCELLENCE (KPIs):

Votre contenu sera évalué sur:
1. **Engagement Rate** (objectif: >3% organique)
2. **Save Rate** (objectif: >5% des impressions)
3. **Share Rate** (objectif: >2% viralité)
4. **Comment Sentiment** (objectif: 90%+ positif)
5. **Brand Recall** (mémorisation à 48h)

🎖️ CRITÈRES CANNES LIONS:

Votre création doit:
1. ✅ Être INATTENDUE (surprise créative)
2. ✅ Démontrer un INSIGHT profond (vérité humaine)
3. ✅ Créer une CONNEXION émotionnelle (pas rationnelle)
4. ✅ Être EXÉCUTÉE parfaitement (craft impeccable)
5. ✅ Avoir un IMPACT mesurable (business results)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 FORMAT DE RÉPONSE (STRUCTURE STRICTE OBLIGATOIRE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Vous DEVEZ suivre EXACTEMENT ce format:

---POST #1---
[Votre contenu publicitaire premium ici]

---HASHTAGS---
[Liste exacte: #hashtag1 #hashtag2 #hashtag3 #hashtag4 #hashtag5]

---CALL TO ACTION---
[Votre CTA émotionnel et engageant]

---IMAGE PROMPT #1---
[Prompt ultra-détaillé en ANGLAIS selon les spécifications ci-dessus]
Structure obligatoire:
Shot in the style of [PHOTOGRAPHER], [LIGHTING DETAILS], [COMPOSITION RULE], [SUBJECT DESCRIPTION], [SETTING], Color palette: [COLOR1 #HEX] [COLOR2 #HEX] [COLOR3 #HEX], Mood: [SPECIFIC EMOTION], Technical: [CAMERA] [LENS] f/[APERTURE], Square 1:1 format optimized for Instagram, [PRODUCT INTEGRATION], Professional commercial photography, hyper-realistic, 8K quality, no text overlay

---IMAGE STYLE---
Composition: [Type]
Lighting: [Details]
Color Palette: [HEX codes]
Mood: [Specific emotion]
Reference: [Photographer/Style]

---AUDIENCE TARGETING---
Platform: ${platform}
Demographics: [Age range, Gender, Location]
Interests: [Specific interests]
Behaviors: [Behavioral patterns]
Lookalike: [Similar audiences]

---COMPETITIVE EDGE---
[En quoi cette publication se distingue radicalement de la concurrence]

---CULTURAL RELEVANCE---
[Comment le contenu s'intègre dans le contexte culturel actuel]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ DIRECTIVES FINALES (Non-négociables):

1. UNE SEULE PUBLICATION = UN SEUL MESSAGE FORT
2. QUALITÉ > QUANTITÉ (excellence > volume)
3. AUTHENTICITÉ > PERFECTION (réel > artificiel)
4. ÉMOTION > RAISON (cœur > tête)
5. TRANSFORMATION > TRANSACTION (bénéfice > produit)
6. STORYTELLING > SELLING (raconter > vendre)
7. INSIGHTS > FEATURES (pourquoi > quoi)
8. ASPIRATION > INFORMATION (rêve > fait)
9. CONNEXION > CONVERSION (relation > vente)
10. MÉMORABLE > COMMERCIAL (impact > pitch)

Votre mission: Créer une publication tellement excellente qu'elle:
- Arrête le scroll instantanément
- Crée une émotion authentique
- Déclenche une action naturellement
- Reste en mémoire 48h+
- Pourrait être présentée aux Cannes Lions

NIVEAU D'EXIGENCE: WORLD-CLASS CREATIVE AGENCY
GO. 🚀
`;
```

---

## 2. PROMPT UTILISATEUR - BRIEF ENRICHI

```typescript
const userPrompt = `Créez 1 publication ${platform} d'EXCELLENCE PUBLICITAIRE pour le ${date.toLocaleDateString()}:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 BRAND STRATEGY DECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏢 IDENTITÉ DE MARQUE
Nom: ${briefData.companyName}
Secteur: ${briefData.sector}
Positionnement: ${briefData.companyDescription}

🎯 BRAND ESSENCE (L'âme de la marque):
${briefData.companyDescription}
→ Traduire cette essence en storytelling émotionnel

🗣️ TONE OF VOICE:
Style: ${briefData.communicationStyle}
→ Ce ton doit transparaître dans chaque mot, chaque virgule

💎 USP (Unique Selling Proposition):
${briefData.uniqueSellingPoints || "À extraire de la description et des produits"}
→ Le facteur différenciant qui doit être subtilement présent

${briefData.products.length > 0 ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎁 PRODUCT HERO(ES) - À INTÉGRER SUBTILEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${briefData.products.map((product, index) => `
┌─────────────────────────────────────────────
│ PRODUIT ${index + 1}: ${product.name}
├─────────────────────────────────────────────
│ 📝 Description: ${product.description}
│ 🏷️ Catégorie: ${product.category}
│ 
│ 💪 POINTS FORTS (USP):
${product.uniqueSellingPoints.map(usp => `│    ✓ ${usp}`).join('\n')}
│ 
│ 🎁 BÉNÉFICES CLIENT (Jobs-to-be-Done):
${product.customerBenefits.map(benefit => `│    → ${benefit}`).join('\n')}
│ 
${product.flavors.length > 0 ? `│ 🍃 Variétés/Arômes: ${product.flavors.join(', ')}\n` : ''}${product.scents.length > 0 ? `│ 🌸 Parfums: ${product.scents.join(', ')}\n` : ''}${product.variants.length > 0 ? `│ 🎨 Variantes: ${product.variants.join(', ')}\n` : ''}${product.technicalDetails.ingredients.length > 0 ? `│ 🧪 Ingrédients Clés: ${product.technicalDetails.ingredients.join(', ')}\n` : ''}${product.technicalDetails.highlights ? `│ ⭐ Highlights: ${product.technicalDetails.highlights}\n` : ''}${product.technicalDetails.usage ? `│ 📖 Utilisation: ${product.technicalDetails.usage}\n` : ''}${Object.keys(product.specifications).length > 0 ? `│ 📊 Specs: ${Object.entries(product.specifications).map(([key, value]) => `${key}: ${value}`).join(', ')}\n` : ''}│ 
│ 🎬 DIRECTION INTÉGRATION:
│    Le produit doit apparaître comme:
│    - L'enabler silencieux d'un moment de vie
│    - Le détail qui transforme l'ordinaire en extraordinaire
│    - JAMAIS en mode "catalogue produit"
│    - Position: Tiers inférieur ou arrière-plan subtil
│    - Visibilité: 30-40% du cadre maximum
└─────────────────────────────────────────────
`).join('\n')}

⚠️ RÈGLE D'OR PRODUIT:
Ne JAMAIS dire "notre produit fait X"
TOUJOURS raconter "comment ta vie change avec X"
` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👥 AUDIENCE TARGET (Persona)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 Géographie: ${calendar.targetCountry}
🗣️ Langues: ${calendar.targetLanguages.map(lang => {
  const dialectInfo = isDialect(lang) ? getDialectInfo(lang) : null;
  return dialectInfo ? dialectInfo.name : getLanguageName(lang);
}).join(', ')}

👤 Démographie: ${briefData.targetAudience.demographic?.join(', ') || 'Adultes actifs'}

🎯 Psychographie (ce qui compte vraiment):
- Valeurs: ${brand.values?.join(', ') || 'Authenticité, Qualité, Innovation'}
- Aspirations: [À déduire du secteur et des produits]
- Pain Points: [À identifier dans le contexte]
- Motivations: [Émotionnelles > Rationnelles]

💭 INSIGHT CLÉS:
Cette audience ne veut pas acheter un produit.
Elle veut acheter:
→ Une transformation
→ Une appartenance
→ Une version améliorée d'elle-même
→ Une solution à un "job" émotionnel

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 OBJECTIFS STRATÉGIQUES (Business Goals)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎪 Campagne: ${calendar.startDate.toLocaleDateString()} → ${calendar.endDate.toLocaleDateString()}

🎯 Objectifs Business:
${briefData.socialMediaGoals.map(goal => `   • ${goal}`).join('\n')}

📊 KPIs à Optimiser:
   1. Engagement Rate (likes, comments, shares)
   2. Save/Bookmark Rate (contenu à valeur)
   3. Profile Visits (intérêt pour la marque)
   4. Click-Through Rate (trafic vers site)
   5. Share/Virality Rate (amplification organique)
   6. Brand Sentiment (perception positive)

${keyDateSection}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 DIRECTIVES CRÉATIVES FINALES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ CRÉEZ UNE PUBLICATION QUI:
1. Arrête le scroll en <2 secondes (Hook puissant)
2. Crée une émotion authentique (connexion humaine)
3. Raconte une micro-histoire mémorable (storytelling)
4. Présente une transformation désirable (aspiration)
5. Intègre le produit de manière subtile (enabler)
6. Se termine par un CTA émotionnel (engagement)
7. Pourrait gagner l'Or aux Cannes Lions (excellence)

🎯 FRAMEWORKS À APPLIQUER:
- AIDA (Attention → Intérêt → Désir → Action)
- PAS (Problème → Agitation → Solution)
- Hook-Story-Offer (Pattern interrupt → Identification → Transformation)
- Jobs-to-be-Done (Parler du progrès, pas du produit)
- Peak-End Rule (Moment fort au début + fin mémorable)

📸 PROMPT D'IMAGE:
Utiliser la structure professionnelle complète avec:
- Style Reference (photographe célèbre)
- Composition Rule (Golden Ratio/Rule of Thirds)
- Lighting Setup (détails techniques)
- Color Palette (codes HEX des couleurs de marque)
- Mood (émotion psychologique précise)
- Technical Specs (appareil, objectif, ouverture)
- Format Optimization (1:1 pour Instagram)
- Product Integration (subtile, 30-40% max)

NIVEAU ATTENDU: WORLD-CLASS CREATIVE EXCELLENCE 🏆
`;
```

---

## 3. EXEMPLES CONCRETS PAR SECTEUR

### 📸 EXEMPLE 1: Secteur Alimentaire (Yaourt Artisanal) - Instagram

**POST:**
```
Imagine. ✨

Ce moment où ta cuillère plonge dans une texture si crémeuse qu'elle raconte une histoire. 
Le premier goût qui éveille quelque chose que tu avais oublié.

Ce n'est pas juste un petit-déjeuner.

C'est ce rituel du matin où tout ralentit. Où tu prends enfin ces 10 minutes pour toi. 
Où chaque bouchée devient une micro-méditation. Une pause sacrée avant le chaos du jour.

Notre yaourt artisanal aux fruits de saison, c'est ce complice silencieux qui transforme 
ta routine matinale en moment sacré. 

Fermentation lente (48h). Lait bio de la ferme d'à côté. Fruits cueillis au moment parfait.
Parce que tu mérites de commencer ta journée avec quelque chose qui a du sens. 
Quelque chose de vrai. 🌅

Prêt(e) à transformer ton rituel matinal ? 💫
```

**HASHTAGS:**
```
#mindfulbreakfast #yogurtlovers #fermentedfoods #guthealth #slowliving #rituelmatinal #bienmanger
```

**CALL TO ACTION:**
```
Tag quelqu'un qui a besoin de ralentir et savourer son matin 🙌
```

**IMAGE PROMPT:**
```
Shot in the style of Todd Selby food photography meets Kinfolk Magazine aesthetic, 
soft natural lighting during golden hour filtering through sheer linen curtains at 5200K 
color temperature, following golden ratio composition rule with yogurt jar positioned at 
divine proportion intersection point, artisanal glass jar filled with creamy Greek-style 
yogurt topped with fresh seasonal berries (strawberries, blueberries) creating a natural 
cascade, rustic reclaimed wood breakfast table with morning sunlight creating subtle 
shadows and warm highlights, hands gently holding a vintage silver spoon about to take 
first bite showing human connection and anticipation, white ceramic bowl with granola 
scattered artfully in background (out of focus), Color palette: creamy white #FFF8F0 (60%), 
berry magenta #D946A6 (30%), warm wood #8B4513 (10%), Mood: nostalgic aspiration for 
slow living ritual and mindful morning moments with gentle excitement, Technical: Canon 
EOS R5, 50mm f/1.2 lens at f/2.8 for dreamy bokeh effect, ISO 400, natural window light 
as key light with soft fill from white reflector, Square 1:1 format optimized for 
Instagram feed with central focus and intentional negative space around edges for clean 
aesthetic, yogurt jar subtly integrated as centerpiece of intentional breakfast moment 
occupying 35% of frame with lifestyle context dominating, Professional commercial food 
photography, hyper-realistic, 8K quality, no text overlay, authentic imperfections 
intentionally included
```

---

### 🧴 EXEMPLE 2: Secteur Cosmétique (Crème Visage) - Instagram

**POST:**
```
Secret. ✨

Tu connais cette sensation quand ta peau te dit "merci" ?

Pas cette promesse miracle en 7 jours.
Pas ce before/after photoshoppé.

Juste... ce moment où tu touches ton visage et il est exactement comme tu l'as toujours voulu.
Doux. Éclatant. Vivant.

Notre crème visage aux 5 actifs naturels, c'est 15 ans de recherche transformés en 
ce geste quotidien que tu attends avec impatience. Ce rendez-vous avec toi-même, 
chaque soir, où tu prends soin de la personne la plus importante : toi.

Acide hyaluronique bio + Vitamine C pure + Beurre de karité équitable.
Formule clean. Testée dermatologiquement. Résultats visibles en 21 jours.

Parce que prendre soin de ta peau, c'est prendre soin de ton âme. 💫

Prête à rencontrer ta meilleure version ? ✨
```

**HASHTAGS:**
```
#skincareritual #cleanbeauty #glowingskin #selflove #naturalbeauty #skincarecommunity #beauténaturelle
```

**IMAGE PROMPT:**
```
Shot in the style of Annie Leibovitz portrait photography meets minimalist beauty 
editorial, soft diffused studio lighting at 4500K color temperature creating even, 
flattering illumination, following rule of thirds composition with product jar at lower 
right intersection, elegant frosted glass jar with rose gold lid containing rich cream 
texture, placed on white Italian marble surface with natural veining, delicate hand with 
French manicure gently touching jar showing anticipation and care, fresh rose petals 
scattered minimally in foreground (slightly out of focus), mirror reflection creating 
depth, Color palette: soft white #F8F8FF (60%), rose gold #B76E79 (30%), blush pink 
#FFE4E1 (10%), Mood: serene self-care ritual with quiet luxury and personal transformation 
anticipation, Technical: Sony A7III, 85mm f/1.4 lens at f/2.0 for beautiful bokeh and 
subject isolation, ISO 200, key light: large softbox at 45 degrees, fill light: white 
bounce card, rim light for dimension, Square 1:1 format optimized for Instagram beauty 
feed with breathing room around edges, product jar integrated as object of desire 
occupying 30% of frame within elegant lifestyle context, Professional commercial beauty 
photography, hyper-realistic, 8K quality, no text overlay, aspirational yet authentic
```

---

### 💼 EXEMPLE 3: Secteur B2B (Logiciel SaaS) - LinkedIn

**POST:**
```
73% des équipes commerciales perdent 2h par jour à chercher des informations.

Je viens de découvrir quelque chose qui change la donne.

Le problème n'est pas le manque d'outils. C'est l'inverse : trop d'outils. 
Trop de tabs ouvertes. Trop de switchs. Trop de contexte perdu.

Ce que nous avons construit, c'est l'anti-solution. Un seul workspace. Toutes vos données. 
Intelligence artificielle qui apprend de vos habitudes. Zéro friction.

Résultat pour nos 500+ clients B2B :
• +47% de productivité commerciale
• -65% de temps de formation
• ROI moyen en 3 mois

Le futur du travail n'est pas dans la multiplication des outils.
Il est dans leur unification intelligente.

Qu'en pensez-vous ? Votre équipe perd combien d'heures par semaine ?
```

**HASHTAGS:**
```
#ProductivityTech #B2BSaaS #SalesEnablement #DigitalTransformation #FutureOfWork
```

**IMAGE PROMPT:**
```
Shot in the style of Platon corporate photography meets Apple product aesthetic, clean 
studio lighting at 5000K neutral color temperature creating professional ambiance, 
following symmetry composition rule with laptop centered showing software interface, 
modern minimalist workspace with MacBook Pro displaying clean dashboard interface, 
business professional's hands typing on keyboard showing active work engagement, second 
monitor in background (slightly blurred) showing data visualizations, contemporary office 
environment with floor-to-ceiling windows revealing city skyline, Color palette: tech 
blue #0066CC (60%), clean white #FFFFFF (30%), accent orange #FF6B35 (10%), Mood: 
confident professional efficiency with innovative edge and future-forward thinking, 
Technical: Canon EOS R5, 24-70mm f/2.8 lens at 35mm f/4.0 for sharp corporate clarity, 
ISO 400, three-point lighting setup with main key light, fill, and edge light for 
dimension, Square 1:1 format adapted for LinkedIn professional feed with clean margins, 
software interface subtly visible occupying 40% of frame within authentic work context, 
Professional commercial technology photography, hyper-realistic, 8K quality, no text 
overlay, corporate yet human
```

---

## 4. PROMPT GEMINI IMAGE - FORMULE PROFESSIONNELLE COMPLÈTE

### 🎨 TEMPLATE UNIVERSEL GEMINI (Nano Banana 2.0)

```
Shot in the style of [PHOTOGRAPHER/STYLE REFERENCE], 
[LIGHTING TYPE] lighting [TIME/CONDITIONS] at [COLOR TEMP]K color temperature, 
following [COMPOSITION RULE] composition rule, 
[DETAILED SUBJECT DESCRIPTION with emotional context], 
[SETTING DESCRIPTION with sensory details and atmospheric elements], 
Color palette dominated by [COLOR 1 NAME] #[HEX] ([PERCENTAGE]%), [COLOR 2 NAME] #[HEX] ([PERCENTAGE]%), [COLOR 3 NAME] #[HEX] ([PERCENTAGE]%), 
Mood: [SPECIFIC PSYCHOLOGICAL EMOTION - be precise and evocative], 
Technical specs: [CAMERA MODEL], [LENS] at f/[APERTURE], ISO [NUMBER], [LIGHTING SETUP DETAILS], 
Square 1:1 format optimized for Instagram feed with central focus and [NEGATIVE SPACE STRATEGY], 
[PRODUCT/BRAND ELEMENT] subtly integrated as [ROLE IN SCENE] occupying [PERCENTAGE]% of frame, 
Professional commercial photography, hyper-realistic, 8K quality, no text overlay, [ADDITIONAL STYLE NOTES]
```

### 📋 DÉCOMPOSITION DES ÉLÉMENTS

**1. STYLE REFERENCE** (Obligatoire)
```
Exemples par secteur:
- Food & Beverage: "Todd Selby", "Kinfolk Magazine aesthetic", "Donna Hay"
- Beauty & Cosmetics: "Annie Leibovitz", "Peter Lindbergh", "Mario Sorrenti"
- Fashion & Lifestyle: "Brandon Woelfel", "Murad Osmann", "Gray Malin"
- Corporate & Tech: "Platon", "Martin Schoeller", "Apple product photography"
- Luxury & Premium: "Tim Walker", "Paolo Roversi", "Solve Sundsbo"
```

**2. LIGHTING SETUP** (Crucial pour l'ambiance)
```
Type + Moment + Température:
- "Soft natural lighting during golden hour at 5200K"
- "Studio lighting with softbox at 4500K"
- "Overcast daylight filtering through windows at 6500K"
- "Rembrandt lighting setup at 3500K"
- "Backlit golden hour at 2800K"
```

**3. COMPOSITION RULE** (Structure visuelle)
```
Choix stratégiques:
- "Golden ratio" → Divine proportion, équilibre parfait
- "Rule of thirds" → Points d'intersection forts
- "Leading lines" → Guide l'œil vers le sujet
- "Symmetry" → Équilibre et harmonie
- "Frame within frame" → Profondeur et focus
- "Central composition" → Impact direct
```

**4. COLOR PALETTE** (Scientifique avec codes HEX)
```
Format: [Nom] #[HEX] ([%])
Règle 60-30-10:
- Dominante 60%: Couleur principale de l'ambiance
- Secondaire 30%: Couleur complémentaire ou de contraste
- Accent 10%: Couleur qui attire l'œil

Exemples:
Food: "creamy white #FFF8F0 (60%), berry magenta #D946A6 (30%), warm wood #8B4513 (10%)"
Beauty: "soft white #F8F8FF (60%), rose gold #B76E79 (30%), blush pink #FFE4E1 (10%)"
Tech: "tech blue #0066CC (60%), clean white #FFFFFF (30%), accent orange #FF6B35 (10%)"
```

**5. MOOD** (Émotion psychologique précise)
```
❌ ÉVITER: "joyeux", "triste", "excité" (trop générique)

✅ UTILISER des émotions complexes et évocatrices:
- "Nostalgic aspiration for slow living ritual with gentle excitement"
- "Serene self-care ritual with quiet luxury and personal transformation anticipation"
- "Confident professional efficiency with innovative edge and future-forward thinking"
- "Warm intimate moment of shared connection and authentic joy"
- "Sophisticated minimalism with understated elegance and timeless quality"
```

**6. TECHNICAL SPECS** (Réalisme photographique)
```
Format: [Camera], [Lens] at f/[Aperture], ISO [Number], [Lighting Details]

Exemples:
Portrait/Beauty: "Canon EOS R5, 85mm f/1.4 lens at f/2.0, ISO 200"
Product/Still Life: "Sony A7III, 50mm f/1.2 lens at f/2.8, ISO 400"
Lifestyle/Scene: "Fujifilm X-T4, 35mm f/1.4 lens at f/2.2, ISO 800"
Corporate/Tech: "Canon EOS R5, 24-70mm f/2.8 lens at 35mm f/4.0, ISO 400"

Ouverture:
- f/1.2-2.0 → Bokeh maximal, sujet isolé
- f/2.8-4.0 → Bokeh modéré, contexte partiellement visible
- f/5.6-8.0 → Plus de netteté, contexte visible
- f/11-16 → Tout net, photos de paysage/architecture
```

**7. FORMAT OPTIMIZATION** (Spécificités Instagram)
```
"Square 1:1 format optimized for Instagram feed with central focus and intentional 
negative space around edges for clean aesthetic and thumb-stopping composition"

Variations:
- "breathing room on all sides" → Minimalisme
- "tight framing with deliberate cropping" → Impact fort
- "generous negative space" → Sophistication
- "balanced composition with visual weight distributed" → Harmonie
```

**8. PRODUCT INTEGRATION** (Subtilité commerciale)
```
Formulation:
"[PRODUCT] subtly integrated as [ROLE] occupying [%] of frame"

Exemples:
- "yogurt jar subtly integrated as centerpiece of intentional breakfast moment occupying 35% of frame"
- "cream jar integrated as object of desire occupying 30% of frame within elegant lifestyle context"
- "software interface subtly visible occupying 40% of frame within authentic work context"

Règles:
- JAMAIS >40% du cadre (sinon catalogue produit)
- Toujours dans un contexte lifestyle authentique
- Le produit est l'enabler, pas le héros
- Focus sur le moment/transformation, pas le produit
```

---

## 5. PARSER GPT RESPONSE AMÉLIORÉ

### 📝 Fichier: `server/src/utils/promptParser.ts`

```typescript
/**
 * Parse une réponse GPT enrichie avec tous les nouveaux champs
 */
export interface EnhancedGPTResponse {
  postContent: string;
  imagePrompt: string;
  hashtags?: string[];
  callToAction?: string;
  imageStyle?: {
    composition?: string;
    lighting?: string;
    colorPalette?: string;
    mood?: string;
    reference?: string;
  };
  audienceTargeting?: {
    demographics?: string;
    interests?: string;
    behaviors?: string;
    lookalike?: string;
  };
  competitiveEdge?: string;
  culturalRelevance?: string;
}

export function parseGPTResponse(content: string): EnhancedGPTResponse[] {
  const posts: EnhancedGPTResponse[] = [];
  const sections = content.split('---POST #');
  
  // Ignorer la première section vide
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    
    try {
      // 1. Extraire le contenu du post
      const postContentMatch = section.match(/^(.*?)(?=---HASHTAGS---|---CALL TO ACTION---|---IMAGE PROMPT #|$)/s);
      const postContent = postContentMatch ? 
        postContentMatch[1].split('\n').slice(1).join('\n').trim() : '';
      
      // 2. Extraire les hashtags
      const hashtagsMatch = section.match(/---HASHTAGS---(.*?)(?=---CALL TO ACTION---|---IMAGE PROMPT #|$)/s);
      const hashtags = hashtagsMatch ? 
        hashtagsMatch[1]
          .trim()
          .split(/[\s\n]+/)
          .filter(tag => tag.startsWith('#'))
          .map(tag => tag.trim()) : 
        [];
      
      // 3. Extraire le call to action
      const ctaMatch = section.match(/---CALL TO ACTION---(.*?)(?=---IMAGE PROMPT #|$)/s);
      const callToAction = ctaMatch ? ctaMatch[1].trim() : '';
      
      // 4. Extraire le prompt d'image
      const imagePromptMatch = section.match(/---IMAGE PROMPT #\d+---(.*?)(?=---IMAGE STYLE---|---AUDIENCE TARGETING---|$)/s);
      let imagePrompt = imagePromptMatch ? imagePromptMatch[1].trim() : '';
      
      // Fallback si format ancien
      if (!imagePrompt) {
        const oldFormatMatch = section.match(/---IMAGE PROMPT #\d+---(.*?)(?=---POST #|$)/s);
        imagePrompt = oldFormatMatch ? oldFormatMatch[1].trim() : '';
      }
      
      // 5. Extraire Image Style
      let imageStyle: EnhancedGPTResponse['imageStyle'] = {};
      const imageStyleMatch = section.match(/---IMAGE STYLE---(.*?)(?=---AUDIENCE TARGETING---|---COMPETITIVE EDGE---|$)/s);
      if (imageStyleMatch) {
        const styleContent = imageStyleMatch[1].trim();
        imageStyle = {
          composition: extractField(styleContent, 'Composition:'),
          lighting: extractField(styleContent, 'Lighting:'),
          colorPalette: extractField(styleContent, 'Color Palette:'),
          mood: extractField(styleContent, 'Mood:'),
          reference: extractField(styleContent, 'Reference:')
        };
      }
      
      // 6. Extraire Audience Targeting
      let audienceTargeting: EnhancedGPTResponse['audienceTargeting'] = {};
      const audienceMatch = section.match(/---AUDIENCE TARGETING---(.*?)(?=---COMPETITIVE EDGE---|---CULTURAL RELEVANCE---|$)/s);
      if (audienceMatch) {
        const audienceContent = audienceMatch[1].trim();
        audienceTargeting = {
          demographics: extractField(audienceContent, 'Demographics:'),
          interests: extractField(audienceContent, 'Interests:'),
          behaviors: extractField(audienceContent, 'Behaviors:'),
          lookalike: extractField(audienceContent, 'Lookalike:')
        };
      }
      
      // 7. Extraire Competitive Edge
      const competitiveEdgeMatch = section.match(/---COMPETITIVE EDGE---(.*?)(?=---CULTURAL RELEVANCE---|$)/s);
      const competitiveEdge = competitiveEdgeMatch ? competitiveEdgeMatch[1].trim() : '';
      
      // 8. Extraire Cultural Relevance
      const culturalRelevanceMatch = section.match(/---CULTURAL RELEVANCE---(.*?)(?=---POST #|$)/s);
      const culturalRelevance = culturalRelevanceMatch ? culturalRelevanceMatch[1].trim() : '';
      
      // Validation: au minimum post et image prompt
      if (!postContent || !imagePrompt) {
        console.warn(`Post #${i}: Contenu ou prompt d'image manquant`);
        continue;
      }
      
      posts.push({
        postContent,
        imagePrompt,
        hashtags: hashtags.length > 0 ? hashtags : undefined,
        callToAction: callToAction || undefined,
        imageStyle: Object.keys(imageStyle).length > 0 ? imageStyle : undefined,
        audienceTargeting: Object.keys(audienceTargeting).length > 0 ? audienceTargeting : undefined,
        competitiveEdge: competitiveEdge || undefined,
        culturalRelevance: culturalRelevance || undefined
      });
      
    } catch (error) {
      console.error(`Erreur lors du parsing du post #${i}:`, error);
      continue;
    }
  }
  
  return posts;
}

/**
 * Extrait un champ d'un texte formaté
 */
function extractField(content: string, fieldName: string): string | undefined {
  const regex = new RegExp(`${fieldName}\\s*(.+?)(?=\\n[A-Z][a-z]+:|$)`, 's');
  const match = content.match(regex);
  return match ? match[1].trim() : undefined;
}
```

---

## 6. BIBLIOTHÈQUE DE RÉFÉRENCES VISUELLES

### 📸 PHOTOGRAPHES PAR SECTEUR

#### 🍽️ FOOD & BEVERAGE
```
1. Todd Selby
   Style: Lifestyle food authentique, lumière naturelle
   Mood: Casual, aspirationnel, imparfait intentionnel
   Meilleur pour: Yaourt, produits artisanaux, petit-déjeuner

2. Kinfolk Magazine Aesthetic
   Style: Minimaliste, épuré, tons neutres
   Mood: Slow living, mindful, intemporel
   Meilleur pour: Produits bio, haut de gamme, lifestyle

3. Donna Hay
   Style: Food styling professionnel, propre, appétissant
   Mood: Fresh, vibrant, gourmand
   Meilleur pour: Recettes, ingrédients, restaurant

4. Joanie Simon (The Bite Shot)
   Style: Dark and moody food, dram

atic shadows
   Mood: Sensuel, mystérieux, sophistiqué
   Meilleur pour: Chocolat, vin, produits premium
```

#### 💄 BEAUTY & COSMETICS
```
1. Annie Leibovitz
   Style: Portraits iconiques, storytelling visuel
   Mood: Intemporel, puissant, émotion authentique
   Meilleur pour: Campagnes premium, célébrités

2. Peter Lindbergh
   Style: Noir et blanc dramatique, naturel sans retouche
   Mood: Raw beauty, authentique, confiant
   Meilleur pour: Anti-âge, natural beauty, sophistication

3. Mario Sorrenti
   Style: Sensuel, intime, lumière naturelle
   Mood: Effortless beauty, sensualité subtile
   Meilleur pour: Parfums, cosmétiques luxe, skincare

4. Paolo Roversi
   Style: Soft focus, éthéré, romantique
   Mood: Dreamlike, poétique, doux
   Meilleur pour: Skincare, maquillage nude, bridal
```

#### 👗 FASHION & LIFESTYLE
```
1. Brandon Woelfel
   Style: Lumières bokeh, couleurs vibrantes, jeune
   Mood: Fun, énergétique, Instagram-worthy
   Meilleur pour: Streetwear, lifestyle jeune, tendance

2. Murad Osmann (#FollowMeTo)
   Style: POV travel, leading lines, aventure
   Mood: Wanderlust, couple goals, aspiration
   Meilleur pour: Travel, lifestyle, expériences

3. Gray Malin
   Style: Vue aérienne, couleurs pastel, vacation
   Mood: Luxury leisure, escapism, joy
   Meilleur pour: Luxury travel, resorts, aspirational lifestyle

4. Slim Aarons ("Poolside Gossip")
   Style: Jet-set lifestyle, vintage glamour
   Mood: Old money, sophistication, timeless luxury
   Meilleur pour: Luxury brands, heritage, prestige
```

#### 💼 CORPORATE & TECH
```
1. Platon
   Style: Portraits corporate puissants, fond neutre
   Mood: Authority, leadership, direct
   Meilleur pour: Executive portraits, B2B, corporate

2. Martin Schoeller
   Style: Close-up portraits, éclairage uniforme
   Mood: Approchable professionalism, humanité
   Meilleur pour: Team photos, about us, corporate culture

3. Apple Product Photography
   Style: Minimaliste, clean, focus produit
   Mood: Innovation, simplicité, premium
   Meilleur pour: Tech products, SaaS, innovation

4. Google Workspace Aesthetic
   Style: Colorful, collaborative, modern
   Mood: Productive, team-oriented, accessible
   Meilleur pour: Collaboration tools, modern workplace
```

---

## 7. TEMPLATES PAR SECTEUR - PROMPTS PRÊTS À L'EMPLOI

### 🍽️ TEMPLATE FOOD & BEVERAGE

```typescript
const FOOD_IMAGE_PROMPT_TEMPLATE = `
Shot in the style of ${photographer || 'Todd Selby food photography meets Kinfolk Magazine aesthetic'}, 
soft natural lighting during ${timeOfDay || 'golden hour'} filtering through ${lightSource || 'sheer linen curtains'} at ${colorTemp || '5200'}K color temperature, 
following ${compositionRule || 'golden ratio'} composition rule with ${product} positioned at ${position || 'divine proportion intersection point'}, 
${productDescription}, 
${setting || 'rustic reclaimed wood table with morning sunlight creating subtle shadows and warm highlights'}, 
${humanElement || 'hands gently holding vintage spoon showing human connection and anticipation'}, 
Color palette: ${color1 || 'creamy white'} #${hex1 || 'FFF8F0'} (60%), ${color2 || 'natural berry'} #${hex2 || 'D946A6'} (30%), ${color3 || 'warm wood'} #${hex3 || '8B4513'} (10%), 
Mood: ${mood || 'nostalgic aspiration for slow living ritual with gentle excitement'}, 
Technical: Canon EOS R5, 50mm f/1.2 lens at f/${aperture || '2.8'} for dreamy bokeh effect, ISO ${iso || '400'}, natural window light as key light, 
Square 1:1 format optimized for Instagram feed with central focus and intentional negative space around edges, 
${product} subtly integrated as ${role || 'centerpiece of intentional meal moment'} occupying ${percentage || '35'}% of frame, 
Professional commercial food photography, hyper-realistic, 8K quality, no text overlay, authentic imperfections intentionally included
`;
```

### 💄 TEMPLATE BEAUTY & COSMETICS

```typescript
const BEAUTY_IMAGE_PROMPT_TEMPLATE = `
Shot in the style of ${photographer || 'Annie Leibovitz portrait photography meets minimalist beauty editorial'}, 
soft diffused studio lighting at ${colorTemp || '4500'}K color temperature creating even, flattering illumination, 
following ${compositionRule || 'rule of thirds'} composition with ${product} at ${position || 'lower right intersection'}, 
${productDescription}, 
placed on ${surface || 'white Italian marble surface with natural veining'}, 
${humanElement || 'delicate hand with French manicure gently touching jar showing anticipation and care'}, 
${additionalElements || 'fresh rose petals scattered minimally in foreground (slightly out of focus)'}, 
Color palette: ${color1 || 'soft white'} #${hex1 || 'F8F8FF'} (60%), ${color2 || 'rose gold'} #${hex2 || 'B76E79'} (30%), ${color3 || 'blush pink'} #${hex3 || 'FFE4E1'} (10%), 
Mood: ${mood || 'serene self-care ritual with quiet luxury and personal transformation anticipation'}, 
Technical: Sony A7III, 85mm f/1.4 lens at f/${aperture || '2.0'} for beautiful bokeh and subject isolation, ISO ${iso || '200'}, key light: large softbox at 45 degrees, fill light: white bounce card, 
Square 1:1 format optimized for Instagram beauty feed with breathing room around edges, 
${product} integrated as object of desire occupying ${percentage || '30'}% of frame within elegant lifestyle context, 
Professional commercial beauty photography, hyper-realistic, 8K quality, no text overlay, aspirational yet authentic
`;
```

### 💼 TEMPLATE CORPORATE & TECH

```typescript
const CORPORATE_IMAGE_PROMPT_TEMPLATE = `
Shot in the style of ${photographer || 'Platon corporate photography meets Apple product aesthetic'}, 
clean studio lighting at ${colorTemp || '5000'}K neutral color temperature creating professional ambiance, 
following ${compositionRule || 'symmetry'} composition rule with ${product || 'laptop'} centered showing interface, 
${productDescription || 'modern minimalist workspace with MacBook Pro displaying clean dashboard'}, 
${setting || 'contemporary office environment with floor-to-ceiling windows revealing city skyline'}, 
${humanElement || 'business professional hands typing on keyboard showing active work engagement'}, 
Color palette: ${color1 || 'tech blue'} #${hex1 || '0066CC'} (60%), ${color2 || 'clean white'} #${hex2 || 'FFFFFF'} (30%), ${color3 || 'accent orange'} #${hex3 || 'FF6B35'} (10%), 
Mood: ${mood || 'confident professional efficiency with innovative edge and future-forward thinking'}, 
Technical: Canon EOS R5, 24-70mm f/2.8 lens at ${aperture || '35mm f/4.0'} for sharp corporate clarity, ISO ${iso || '400'}, three-point lighting setup, 
Square 1:1 format adapted for LinkedIn professional feed with clean margins, 
${product || 'software interface'} subtly visible occupying ${percentage || '40'}% of frame within authentic work context, 
Professional commercial technology photography, hyper-realistic, 8K quality, no text overlay, corporate yet human
`;
```

---

## 8. GUIDE D'IMPLÉMENTATION

### 🚀 PROCHAINES ÉTAPES

Pour intégrer ces prompts optimisés dans votre application:

#### 1. Mise à Jour de PostGenerationService.ts

Le prompt système actuel (lignes 171-331) doit être remplacé par le prompt Cannes Lions (voir section 1 de ce document).

**Changements clés:**
- Ajouter la persona expert composite
- Intégrer les 6 frameworks psychologiques
- Enrichir la section direction artistique
- Ajouter les contraintes légales et KPIs
- Implémenter le nouveau format de réponse

#### 2. Amélioration du Parser

Créer ou mettre à jour `server/src/utils/promptParser.ts` avec le parser amélioré (voir section 5).

**Nouveaux champs à extraire:**
- hashtags
- callToAction
- imageStyle (composition, lighting, colorPalette, mood, reference)
- audienceTargeting
- competitiveEdge
- culturalRelevance

#### 3. Mise à Jour du Modèle Post

Mettre à jour `server/src/models/Post.ts` pour supporter les nouveaux champs:

```typescript
interface IPost extends Document {
  // ... champs existants ...
  hashtags?: string[];
  callToAction?: string;
  imageStyle?: {
    composition?: string;
    lighting?: string;
    colorPalette?: string;
    mood?: string;
    reference?: string;
  };
  audienceTargeting?: {
    demographics?: string;
    interests?: string;
    behaviors?: string;
    lookalike?: string;
  };
  competitiveEdge?: string;
  culturalRelevance?: string;
}
```

#### 4. Optimisation des Prompts Gemini

Le prompt d'image généré par GPT sera déjà de niveau professionnel. Assurez-vous que GeminiImageService.ts passe le prompt tel quel à Gemini.

#### 5. Tests et Validation

- Tester avec différents secteurs (food, beauty, tech, B2B)
- Valider que les images générées correspondent au brief
- Vérifier que le parsing fonctionne correctement
- S'assurer que tous les champs sont sauvegardés

---

## 9. CHECKLIST DE QUALITÉ CANNES LIONS

### ✅ Validation Avant Publication

Pour chaque post généré, vérifier:

**📝 CONTENU TEXTE:**
- [ ] Hook puissant dans les 3 premiers mots
- [ ] Storytelling émotionnel présent
- [ ] Framework psychologique appliqué (AIDA/PAS)
- [ ] Ton de marque respecté
- [ ] Produit intégré subtilement (pas de pitch)
- [ ] CTA émotionnel (pas transactionnel)
- [ ] Pas de promesses exagérées
- [ ] Langue et dialecte appropriés

**📸 PROMPT IMAGE:**
- [ ] Style reference d'un photographe reconnu
- [ ] Composition rule spécifiée
- [ ] Lighting setup détaillé avec température
- [ ] Color palette avec codes HEX
- [ ] Mood psychologique précis (pas générique)
- [ ] Technical specs réalistes
- [ ] Format 1:1 optimisé Instagram
- [ ] Produit <40% du cadre
- [ ] Contexte lifestyle authentique

**🎯 STRATÉGIE:**
- [ ] Hashtags (3 niche + 2 tendance + 2 marque)
- [ ] Audience targeting défini
- [ ] Competitive edge identifié
- [ ] Cultural relevance considérée

---

## 10. RESSOURCES COMPLÉMENTAIRES

### 📚 Lectures Recommandées

**Copywriting & Frameworks:**
- "Made to Stick" - Chip & Dan Heath
- "Purple Cow" - Seth Godin
- "The Adweek Copywriting Handbook" - Joseph Sugarman
- "Influence" - Robert Cialdini

**Psychologie Consommateur:**
- "Thinking, Fast and Slow" - Daniel Kahneman
- "Predictably Irrational" - Dan Ariely
- "How Brands Grow" - Byron Sharp
- "The Choice Factory" - Richard Shotton

**Direction Artistique:**
- "The Photographer's Eye" - Michael Freeman
- "Understanding a Photograph" - John Berger
- Magnum Photos Archive
- Cannes Lions Archive (Cyber & Social categories)

### 🎓 Formations

- Cannes Lions School of Creativity
- Google Creative Lab
- AKQA Digital Training
- D&AD Professional Development

---

## 🎯 CONCLUSION

Ce document vous fournit tout ce dont vous avez besoin pour générer du contenu publicitaire de niveau mondial. Les prompts ont été conçus pour:

1. **Maximiser la performance** → KPIs optimisés
2. **Garantir l'excellence créative** → Standards Cannes Lions
3. **Assurer la cohérence de marque** → Intégration complète des données
4. **Produire des images premium** → Direction artistique professionnelle
5. **Respecter les contraintes** → Légal, éthique, culturel

**Prochaine action recommandée:**
Commencez par implémenter le nouveau prompt système dans PostGenerationService.ts et testez avec un seul post pour valider la qualité avant de déployer à grande échelle.

---

## 11. 🎬 GÉNÉRATION VIDÉO VEO 3.1 - NIVEAU CANNES LIONS

### Vue d'ensemble

VEO 3.1 permet de générer des vidéos publicitaires professionnelles de 4-8 secondes avec audio natif synchronisé, parfaites pour Stories, Reels, Shorts et Animations.

### 🎯 Structure d'un prompt vidéo professionnel

```
Cinematic {duration}-second {videoType} shot in the style of {director},
{cameraMovement} camera movement capturing {subject} {action},
{lightingSetup} lighting during {timeOfDay} creating {mood},
Shot on {camera} with {lens} at {aperture},
Color palette: {primaryColor} dominating with {secondaryColor} accents,
Sound design: {audioDescription} with {ambiance},
{aspectRatio} format optimized for {platform},
{product} subtly integrated as lifestyle enabler occupying {percentage}% of frame,
Professional commercial video production, {resolution} quality, hyper-realistic

Audio cues:
Dialogues: "{dialogues}" (if applicable)
Sound effects: {soundEffects}
Ambient: {ambientSound}
```

### 🎨 Directeurs/Styles de référence par type de vidéo

#### 📱 Stories Instagram / Facebook (9:16, 6s)
```
1. Behind the Scenes Style
   - Style: Documentaire intime, caméra portée
   - Mood: Authentique, sans filtre, humain
   - Exemple: "Chef's Table intimacy meets documentary rawness"

2. Product Reveal Style
   - Style: Apple commercial, épuré, cinématographique
   - Mood: Premium, aspirationnel, élégant
   - Exemple: "Apple product reveal meets minimalist luxury"

3. Lifestyle Moment Style
   - Style: Kinfolk aesthetic, lumière naturelle
   - Mood: Slow living, mindful, intemporel
   - Exemple: "Kinfolk Magazine cinematography meets slow morning rituals"

4. Tutorial Rapide Style
   - Style: Tasty-style quick tips, dynamique
   - Mood: Énergétique, éducatif, accessible
   - Exemple: "Tasty recipe video meets educational storytelling"
```

#### 🎬 Reels Instagram (9:16, 8s)
```
1. Transformation Style
   - Style: Before/After narratif, dramatique
   - Mood: Satisfaisant, révélateur, impact
   - Exemple: "Satisfying transformation meets lifestyle upgrade"

2. Trending Sound Style
   - Style: Synchronisé sur musique, rythmé
   - Mood: Fun, viral, engageant
   - Exemple: "TikTok trending aesthetic meets brand storytelling"

3. Educational Style
   - Style: Tips & tricks, value-driven
   - Mood: Utile, expert, actionnable
   - Exemple: "Expert tutorial meets quick wins"
```

#### ⚡ Shorts YouTube / TikTok (9:16, 8s)
```
1. Hook-Driven Style
   - Style: Pattern interrupt immédiat
   - Mood: Choquant, intriguant, captivant
   - Exemple: "Viral hook meets storytelling payoff"

2. Challenge Style
   - Style: Participatif, tendance
   - Mood: Fun, communautaire, énergétique
   - Exemple: "TikTok challenge meets brand engagement"
```

#### ✨ Animation / Motion Design (1:1 ou 16:9, 4-8s)
```
1. Motion Graphics Style
   - Style: After Effects, cinematic
   - Mood: Professionnel, dynamique, moderne
   - Exemple: "Motion design meets brand reveal"

2. Stop Motion Style
   - Style: Artisanal, créatif
   - Mood: Unique, mémorable, original
   - Exemple: "Wes Anderson stop-motion meets product showcase"
```

### 📋 Templates de prompts vidéo par type

#### 📱 TEMPLATE STORY INSTAGRAM (9:16, 6s)

```typescript
const STORY_VIDEO_PROMPT = `
Cinematic 6-second Instagram Story shot in the style of behind-the-scenes documentary,
handheld camera movement with gentle shake capturing ${subject} ${action},
soft natural lighting during ${timeOfDay} creating intimate authentic atmosphere,
Shot on iPhone 15 Pro with cinematic mode at f/2.8,
Color palette: ${brandColor1} as primary with ${brandColor2} warm accents,
Sound design: ambient room sound, natural conversations, authentic moment capture,
9:16 vertical format optimized for Instagram Stories,
${product} subtly visible in background occupying 20-30% of frame as natural part of scene,
Professional mobile-first video production, 1080p quality, authentic feel

Audio cues:
Ambient: Natural environment sounds, authentic moment
Sound effects: Subtle product interaction sounds
Music: Soft background if applicable
`;
```

**Exemple - Yaourt artisanal Story:**
```
Cinematic 6-second Instagram Story shot in the style of Kinfolk morning ritual documentary,
slow overhead camera movement revealing breakfast setup from above,
soft golden hour lighting filtering through kitchen window creating warm intimate atmosphere,
Shot on iPhone 15 Pro cinematic mode at f/2.8,
Color palette: creamy white #FFF8F0 as primary with berry pink #D946A6 warm accents,
Sound design: gentle spoon tinking glass, morning birds chirping outside, soft breathing,
9:16 vertical format optimized for Instagram Stories,
artisanal yogurt jar subtly visible on rustic wood table occupying 25% of frame with breakfast spread,
Professional mobile-first video production, 1080p quality, authentic morning feel

Audio cues:
Ambient: Morning kitchen sounds, gentle breeze through window
Sound effects: Spoon meeting glass jar, subtle pour sound
Dialogues: "Mon moment pour moi..." (whispered, intimate)
```

#### 🎬 TEMPLATE REEL INSTAGRAM (9:16, 8s)

```typescript
const REEL_VIDEO_PROMPT = `
Cinematic 8-second Instagram Reel shot in the style of ${director},
dynamic ${cameraMovement} camera movement revealing ${transformation},
${lightingType} lighting creating ${mood} atmosphere,
Shot on ${camera} with ${lens} at ${aperture},
Color palette: vibrant ${color1} with energetic ${color2} highlights,
Sound design: trending audio sync with ${soundEffects},
9:16 vertical format optimized for Instagram Reels,
${product} integrated as transformation enabler occupying 35% of frame,
Professional social media video production, 1080p quality, scroll-stopping impact

Audio cues:
Music: Trending audio track (specify BPM and vibe)
Sound effects: ${transitionSounds}
Voice over: ${voiceDescription} (if applicable)
`;
```

**Exemple - Transformation beauté Reel:**
```
Cinematic 8-second Instagram Reel shot in the style of Glossier commercial meets transformation reveal,
dynamic 180-degree camera rotation revealing before-to-after skincare transformation,
soft ring light lighting creating flattering glow-up atmosphere,
Shot on Sony A7III with 50mm f/1.2 lens at f/2.0,
Color palette: vibrant rose gold #B76E79 with energetic soft pink #FFE4E1 highlights,
Sound design: trending upbeat audio sync with satisfying reveal whoosh sounds,
9:16 vertical format optimized for Instagram Reels,
skincare cream jar integrated as transformation enabler occupying 35% of frame in final reveal,
Professional social media video production, 1080p quality, scroll-stopping glow-up impact

Audio cues:
Music: Upbeat trending audio 120 BPM, positive vibe
Sound effects: Whoosh transition, satisfying reveal chime
Voice over: "The secret?" (confident, female voice, whispered reveal)
```

#### ⚡ TEMPLATE SHORT YOUTUBE/TIKTOK (9:16, 8s)

```typescript
const SHORT_VIDEO_PROMPT = `
Viral 8-second ${platform} Short shot in the style of ${viralCreator},
attention-grabbing ${hookMovement} in first 2 seconds then ${mainAction},
${lightingStyle} lighting with high-contrast ${mood},
Shot on ${camera} optimized for mobile viewing,
Color palette: punchy ${color1} with high-saturation ${color2},
Sound design: hook sound effect + ${mainAudio} + payoff sound,
9:16 vertical format optimized for ${platform} algorithm,
${product} revealed as solution at 6-second mark occupying 40% of frame,
Professional viral video production, 1080p quality, thumb-stopping hook

Audio cues:
Hook sound: ${hookAudio} (0-2s, attention grab)
Main audio: ${contentAudio} (2-6s, value delivery)
Payoff sound: ${payoffAudio} (6-8s, satisfaction)
`;
```

**Exemple - Tutorial produit Short:**
```
Viral 8-second TikTok Short shot in the style of trending kitchen hack videos,
attention-grabbing extreme close-up zoom on product in first 2 seconds then quick demo sequence,
bright overhead ring lighting with high-contrast satisfying visual,
Shot on iPhone 15 Pro optimized for mobile viewing,
Color palette: punchy product color with high-saturation contrast background,
Sound design: record scratch hook + satisfying click sounds + victory chime,
9:16 vertical format optimized for TikTok algorithm,
product revealed as game-changer solution at 6-second mark occupying 40% of frame,
Professional viral video production, 1080p quality, thumb-stopping satisfying hook

Audio cues:
Hook sound: Record scratch + "Wait, WHAT?!" (0-2s, shock value)
Main audio: Quick voiceover tips with satisfying product sounds (2-6s)
Payoff sound: Victory chime + "Mind. Blown." (6-8s, satisfaction)
```

#### ✨ TEMPLATE ANIMATION (1:1 ou 16:9, 6s)

```typescript
const ANIMATION_VIDEO_PROMPT = `
Cinematic 6-second motion design animation in the style of ${motionStyle},
${animationType} animation revealing ${brandMessage},
${colorScheme} color palette with ${accentColor} dynamic accents,
${transitionStyle} transitions between scenes,
${aspectRatio} format optimized for ${platform},
${product} or ${logo} integrated as central visual element,
Professional motion graphics, 4K quality, smooth 60fps

Animation elements:
Typography: ${fontStyle} with ${animationEffect}
Graphics: ${graphicStyle} with ${motionType}
Transitions: ${transitionEffect}
Sound design: ${audioSync}
`;
```

**Exemple - Révélation produit Animation:**
```
Cinematic 6-second motion design animation in the style of Apple product reveal meets liquid motion,
smooth liquid morphing animation revealing product benefits through abstract shapes,
gradient color palette from brand blue #0066CC to energetic orange #FF6B35 dynamic accents,
fluid particle transitions between benefit scenes,
1:1 square format optimized for Instagram feed,
product bottle integrated as central visual element with rotating 3D reveal,
Professional motion graphics, 4K quality, smooth 60fps

Animation elements:
Typography: Modern sans-serif with kinetic reveal animation
Graphics: Abstract liquid shapes with physics-based motion
Transitions: Particle morph with fluid dynamics
Sound design: Whoosh sounds synced to transitions, subtle product ting
```

### 🎭 Intégration produits dans les vidéos

#### Règles d'or pour l'intégration subtile

```
1. CONTEXTE LIFESTYLE (Règle 70-30)
   - 70% du temps : Montrer le moment/transformation
   - 30% du temps : Révéler le produit comme enabler

2. PROGRESSION NARRATIVE
   - 0-2s : Hook (problème/situation)
   - 2-5s : Action/transformation (produit apparaît naturellement)
   - 5-8s : Résultat/bénéfice (produit = héros silencieux)

3. TAILLE DU PRODUIT DANS LE CADRE
   - Stories : 20-30% max (contexte prime)
   - Reels : 30-35% (équilibre)
   - Shorts : 35-40% (produit plus visible)
   - Animation : 40-50% (produit = star)

4. MOMENTS CLÉS
   - Jamais de gros plan produit statique
   - Toujours en interaction ou mouvement
   - Intégré dans un geste naturel
```

#### Workflow avec images de référence produits

```typescript
// Utiliser jusqu'à 3 images produits pour cohérence visuelle
const videoPromptWithProducts = `
[PROMPT VIDÉO STANDARD]

Product reference integration:
Using ${productCount} product reference images to maintain visual consistency:
- Product appearance: ${productDescription}
- Product placement: ${placementStrategy}
- Product interaction: ${interactionType}
- Visual consistency: Preserve exact product colors, shapes, textures from references

Reference images guide:
Image 1: Front view for product recognition
Image 2: Context/usage angle
Image 3: Detail/texture close-up (if applicable)
`;
```

### 🎵 Design sonore et audio VEO 3.1

VEO 3.1 génère automatiquement l'audio synchronisé. Voici comment le guider :

#### 1. Dialogues
```
Dialogues: "Text exact entre guillemets"
- Ton de voix: [Warm, excited, whispery, confident, etc.]
- Accent: [If applicable]
- Timing: [Beginning, middle, end, throughout]
```

**Exemple:**
```
Dialogues: "This changed everything for me"
- Tone: Intimate whisper with genuine emotion
- Timing: Appears at 4-second mark during transformation reveal
```

#### 2. Effets sonores
```
Sound effects: [Specific sounds that enhance the narrative]
- Product sounds: [Clicks, pours, zips, etc.]
- Transition sounds: [Whooshes, chimes, swipes]
- Ambient sounds: [Natural environment]
```

**Exemple:**
```
Sound effects: Satisfying jar lid twist, gentle pour of yogurt, spoon tinking glass
- Product sounds: Subtle and ASMR-quality
- Ambient sounds: Morning kitchen atmosphere, gentle birds outside window
```

#### 3. Musique/Ambiance
```
Ambient sound: [Overall sound atmosphere]
- Mood: [Energetic, calm, inspiring, etc.]
- BPM: [If music, specify tempo]
- Genre: [If applicable]
```

**Exemple:**
```
Ambient: Soft acoustic guitar fingerpicking at 90 BPM
- Mood: Calm morning ritual, inspiring new beginning
- Volume: Subtle background, not overpowering dialogue/effects
```

### 📱 Formats vidéo par plateforme

| Type | Format | Durée | Résolution | Audio | Usage |
|------|--------|-------|------------|-------|-------|
| **Story IG/FB** | 9:16 | 6s | 1080p | Ambiant + effets | Behind-scenes, moments authentiques |
| **Reel IG** | 9:16 | 8s | 1080p | Musique + VO | Transformations, tutorials, trends |
| **Short YouTube** | 9:16 | 8s | 1080p | VO + musique | Educational, viral hooks |
| **TikTok** | 9:16 | 6-8s | 1080p | Trending audio | Challenges, trends, viral content |
| **Feed IG** | 1:1 | 6s | 1080p | Subtle audio | Aesthetic, brand content |
| **Animation** | 1:1 ou 16:9 | 4-8s | 1080p/4K | Sound design | Motion graphics, reveals |

### 🎬 Exemples complets par secteur

#### EXEMPLE 1: Food & Beverage - Story Instagram

**Prompt:**
```
Cinematic 6-second Instagram Story shot in the style of Kinfolk Magazine slow living aesthetic,
gentle overhead descending camera movement revealing morning breakfast ritual setup,
warm golden hour natural lighting filtering through gauze curtains at 5200K creating serene morning atmosphere,
Shot on iPhone 15 Pro with cinematic mode at f/2.8,
Color palette: creamy white #FFF8F0 as dominant with berry magenta #D946A6 and warm wood #8B4513 accents,
Sound design: gentle morning ambiance, soft spoon sounds, satisfied "mmm" reaction,
9:16 vertical format optimized for Instagram Stories authentic feel,
artisanal yogurt jar with berries subtly visible as centerpiece occupying 25% of breakfast tableau,
Professional mobile-first storytelling, 1080p quality, intimate morning ritual authenticity

Audio cues:
Ambient: Soft morning birds chirping, gentle breeze, peaceful morning kitchen
Sound effects: Delicate spoon meeting glass, soft yogurt texture sound, satisfied sigh
Dialogues: "Mon moment sacré..." (whispered, intimate, French accent, at 3-second mark)
```

#### EXEMPLE 2: Beauty - Reel Instagram

**Prompt:**
```
Cinematic 8-second Instagram Reel shot in the style of Glossier fresh-faced transformation,
dynamic camera rotation revealing before-to-after skincare glow-up with mirror reflection,
soft ring light at 4500K creating flattering dewy skin glow atmosphere,
Shot on Sony A7III with 50mm f/1.2 lens at f/2.0 for beautiful bokeh,
Color palette: rose gold #B76E79 with soft pink #FFE4E1 and clean white #F8F8FF highlights,
Sound design: trending upbeat audio synced with transformation whoosh and satisfying reveal chime,
9:16 vertical format optimized for Instagram Reels engagement,
luxury cream jar revealed at transformation peak occupying 35% of frame as secret weapon,
Professional beauty video production, 1080p quality, scroll-stopping glow transformation

Audio cues:
Music: Upbeat trending audio 120 BPM, empowering positive energy
Sound effects: Satisfying whoosh at rotation, gentle chime at reveal, cream jar twist
Voice over: "The secret? This." (confident whisper, female, at 6-second transformation reveal)
```

#### EXEMPLE 3: Tech Product - Short YouTube

**Prompt:**
```
Viral 8-second YouTube Short shot in the style of Apple minimalist product reveal meets tech review excitement,
attention-grabbing extreme zoom into product interface in first 2 seconds followed by feature showcase sequence,
clean studio lighting at 5000K with high-contrast dramatic shadows on white backdrop,
Shot on Canon EOS R5 with 24-70mm f/2.8 lens at 35mm f/4.0,
Color palette: tech blue #0066CC with clean white #FFFFFF and energetic orange #FF6B35 accents,
Sound design: tech startup chime hook + interface click sounds + victory notification,
9:16 vertical format optimized for YouTube Shorts algorithm discovery,
software dashboard revealed as productivity game-changer at 6-second mark occupying 40% of frame,
Professional tech video production, 1080p quality, thumb-stopping "wow" factor

Audio cues:
Hook sound: Attention-grabbing tech startup chime + "Wait, this is insane!" (0-2s)
Main audio: Quick interface clicks, smooth transitions, satisfying UI sounds (2-6s)
Payoff sound: Success notification chime + "This changes everything" (6-8s, excited reveal)
```

### ⚙️ Workflow de génération avec images produits

```typescript
// 1. Récupérer les images produits du calendrier
const productImages = await getProductImagesFromCalendar(calendarId);

// 2. Préparer jusqu'à 3 images de référence
const referenceImages = productImages.slice(0, 3).map(img => img.buffer);

// 3. Générer la vidéo avec VEO3
const video = await Veo3Service.generateVideoWithReferences(
  videoPrompt,
  referenceImages,
  {
    duration: 8,
    aspectRatio: '9:16',
    resolution: '1080p',
    negativePrompt: 'low quality, blurry, shaky camera, poor lighting'
  }
);

// 4. Sauvegarder avec métadonnées
await Post.create({
  content: {
    mediaType: 'video',
    videoUrl: video.videoUrl,
    videoPublicId: video.videoPublicId,
    videoPrompt: videoPrompt,
    videoDuration: video.duration,
    videoFormat: '9:16',
    videoResolution: '1080p',
    hasAudio: true,
    referenceImages: productImages.map(img => img.url)
  },
  videoType: 'reel',
  // ... autres champs
});
```

### 🎯 Checklist qualité vidéo Cannes Lions

**📹 STRUCTURE NARRATIVE:**
- [ ] Hook puissant 0-2 secondes
- [ ] Transformation visible 2-6 secondes
- [ ] Payoff émotionnel 6-8 secondes
- [ ] Arc narratif complet malgré la courte durée

**🎬 DIRECTION:**
- [ ] Style de directeur référencé
- [ ] Mouvement caméra intentionnel
- [ ] Éclairage cohérent et professionnel
- [ ] Composition équilibrée

**🎨 VISUEL:**
- [ ] Palette couleurs marque respectée
- [ ] Produit intégré subtilement (<40%)
- [ ] Qualité broadcast (1080p minimum)
- [ ] Format optimisé pour plateforme

**🎵 AUDIO:**
- [ ] Audio synchronisé naturellement
- [ ] Effets sonores pertinents
- [ ] Dialogues authentiques (si applicable)
- [ ] Ambiance cohérente avec le mood

**🎯 IMPACT:**
- [ ] Scroll-stopping dans les 2 premières secondes
- [ ] Message clair et mémorable
- [ ] Appel à l'action implicite
- [ ] Potentiel viral/partage élevé

---

**Document mis à jour le:** 2 novembre 2025  
**Version:** 2.0 - Cannes Lions Edition + VEO 3.1 Video  
**Statut:** Prêt pour implémentation complète (Images + Vidéos)  

🏆 **Excellence Publicitaire Image & Vidéo Garantie**
