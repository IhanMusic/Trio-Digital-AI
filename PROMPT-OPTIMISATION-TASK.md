# 🎯 TASK : OPTIMISATION DES PROMPTS GPT-5 ET GPT CREATIVE DIRECTOR

## 📋 CONTEXTE

Application de génération de contenu publicitaire utilisant :
- **GPT-5** pour générer le texte des publications
- **GPT Creative Director (GPT-4o)** pour générer les prompts d'image
- **Gemini Imagen 3** pour générer les images
- **Gemini Vision** pour scorer la qualité (19 critères Cannes Lions)

## 🎯 OBJECTIF

Optimiser les prompts pour atteindre le niveau **Cannes Lions Gold / Ads of the World** en utilisant une approche **SMART** : laisser GPT-5 décider intelligemment au lieu de créer des bases de données massives.

---

## 📁 FICHIERS À OPTIMISER

### 1. **server/src/services/PostGenerationService.ts**
- Ligne ~200-800 : Prompt système GPT-5 pour génération de texte
- **Problème actuel** : Trop long (~3000 mots), instructions dispersées
- **Objectif** : Restructurer sans perdre aucune variable, ajouter instructions intelligentes

### 2. **server/src/services/GPTCreativeDirector.ts**
- Ligne ~300-600 : Prompt pour génération de prompts d'image
- **Problème actuel** : Manque d'adaptation contextuelle (âge, saison, style)
- **Objectif** : Enrichir avec instructions adaptatives intelligentes

---

## 🎨 APPROCHE SMART : INSTRUCTIONS INTELLIGENTES

Au lieu de créer des bases de données de 300+ catégories et 800+ photographes, **enrichir les prompts** avec des instructions qui permettent à GPT-5 de décider lui-même selon le contexte.

### ✅ **VARIABLES CONTEXTUELLES À EXPLOITER**

Ces variables sont **déjà disponibles** dans le code, il faut juste les utiliser intelligemment dans les prompts :

#### **A. DONNÉES PRODUIT (Product.ts)**
```typescript
- product.category // Ex: 'ice_cream', 'sunscreen', 'toys', etc.
- product.targetAudience // Ex: 'children_0_3', 'teens_13_17', 'adults_25_45'
- product.ageRange // Ex: '0-3 ans', '4-8 ans', '9-12 ans'
- product.usageOccasions // Ex: ['summer', 'beach', 'outdoor']
- product.flavors // Ex: ['vanilla', 'chocolate', 'strawberry']
- product.scents // Ex: ['lavender', 'rose', 'citrus']
- product.certifications // Ex: ['organic', 'vegan', 'cruelty-free']
- product.labels // Ex: ['bio', 'fair-trade', 'eco-friendly']
```

#### **B. DONNÉES MARQUE (Brand.ts)**
```typescript
- brand.sector // Ex: 'food', 'beauty', 'fashion', 'tech'
- brand.pricePositioning // Ex: 'luxury', 'mid-range', 'budget'
- brand.businessType // Ex: 'B2C', 'B2B'
- brand.colors.primary // Ex: '#FF6B35'
- brand.values // Ex: ['sustainability', 'innovation', 'quality']
```

#### **C. DONNÉES CALENDRIER (Calendar.ts)**
```typescript
- calendar.targetCountry // Ex: 'france', 'maroc', 'usa'
- calendar.targetLanguages // Ex: ['fr', 'ar', 'en']
- calendar.communicationStyle // Ex: 'professional', 'casual', 'luxury'
- calendar.startDate / endDate // Pour déterminer la saison
```

#### **D. CONTEXTE POST**
```typescript
- postContext.scheduledDate // Date de publication (pour saison)
- postContext.platform // Ex: 'instagram', 'linkedin', 'tiktok'
- postContext.postIndex // Position dans le calendrier (pour diversité)
- postContext.keyDates // Dates clés culturelles (Noël, Ramadan, etc.)
```

---

## 🚀 INSTRUCTIONS À AJOUTER AUX PROMPTS

### **1. ADAPTATION SAISONNIÈRE INTELLIGENTE**

Ajouter cette section au prompt GPT-5 :

```markdown
═══════════════════════════════════════════════════════════════
🌍 ADAPTATION SAISONNIÈRE INTELLIGENTE
═══════════════════════════════════════════════════════════════

CONTEXTE TEMPOREL :
- Date de publication : ${scheduledDate}
- Saison actuelle : ${currentSeason}
- Catégorie produit : ${product.category}

⚠️ INSTRUCTIONS ADAPTATIVES :

1. ANALYSE LA PERTINENCE SAISONNIÈRE :
   - Produits OBLIGATOIREMENT saisonniers : glaces, crème solaire, chauffage, vêtements d'hiver/été
   - Produits INTEMPORELS : technologie, services, produits de base
   - Produits SEMI-SAISONNIERS : cosmétiques, alimentation, lifestyle

2. DÉCISION AUTOMATIQUE :
   - Si produit OBLIGATOIREMENT saisonnier → Intégrer FORTEMENT la saison
   - Si produit INTEMPOREL → Rester universel, aucune référence saisonnière
   - Si produit SEMI-SAISONNIER → Intégrer SUBTILEMENT la saison (20% du contenu)

3. EXEMPLES :
   ✅ Glace en été → "Rafraîchis ton été avec..."
   ✅ Crème hydratante en hiver → "Protège ta peau du froid..."
   ❌ Smartphone en automne → PAS de "Découvre ton nouveau compagnon d'automne"
   ✅ Café en hiver → "Réchauffe tes matins d'hiver..." (subtil, acceptable)

RÈGLE D'OR : La saison doit RENFORCER le message, jamais le forcer.
═══════════════════════════════════════════════════════════════
```

### **2. ADAPTATION STYLE VISUEL SELON ÂGE CIBLE**

Ajouter cette section au prompt GPT Creative Director :

```markdown
═══════════════════════════════════════════════════════════════
🎨 ADAPTATION STYLE VISUEL SELON ÂGE CIBLE
═══════════════════════════════════════════════════════════════

ÂGE CIBLE DU PRODUIT : ${product.ageRange || product.targetAudience}

⚠️ INSTRUCTIONS STYLE PAR TRANCHE D'ÂGE :

👶 0-3 ANS (Bébés) :
- Style : Doux, pastel, féerique, rassurant
- Couleurs : Pastels (rose poudré, bleu ciel, jaune tendre)
- Éléments : Peluches, nuages, étoiles, lune, animaux mignons
- Mood : Tendresse, douceur, sécurité
- Photographe référence : Anne Geddes (bébés), Meg Bitton (enfants doux)

🧒 4-8 ANS (Enfants) :
- Style : Coloré, ludique, imaginatif, aventure
- Couleurs : Vives et saturées (rouge, bleu, jaune, vert)
- Éléments : Superhéros, princesses, dinosaures, magie, arc-en-ciel
- Mood : Joie, émerveillement, énergie
- Photographe référence : Brandon Woelfel (couleurs vives), Murad Osmann (aventure)

👦 9-12 ANS (Préados) :
- Style : Cool, moderne, aspirationnel, aventure
- Couleurs : Contrastées, dynamiques
- Éléments : Sports, technologie, nature, exploration
- Mood : Confiance, découverte, indépendance
- Photographe référence : Chris Burkard (aventure), Jimmy Chin (sports)

🧑 13-17 ANS (Ados) :
- Style : Tendance, urbain, authentique, rebelle
- Couleurs : Sombres ou néons, contrastes forts
- Éléments : Ville, musique, mode, réseaux sociaux
- Mood : Identité, appartenance, cool
- Photographe référence : Petra Collins (ados authentiques), Ryan McGinley (jeunesse)

👨 18-35 ANS (Jeunes adultes) :
- Style : Lifestyle, aspirationnel, moderne, minimaliste
- Couleurs : Naturelles, élégantes, Instagram-friendly
- Éléments : Café, voyage, fitness, technologie, amis
- Mood : Aspiration, réussite, authenticité
- Photographe référence : Brandon Woelfel (lifestyle), Murad Osmann (travel)

👩 35-55 ANS (Adultes) :
- Style : Élégant, professionnel, qualité, sophistiqué
- Couleurs : Sobres, raffinées (noir, blanc, or, bleu marine)
- Éléments : Famille, carrière, maison, bien-être
- Mood : Confiance, stabilité, qualité
- Photographe référence : Annie Leibovitz (portraits), Peter Lindbergh (élégance)

👴 55+ ANS (Seniors) :
- Style : Classique, rassurant, confort, tradition
- Couleurs : Chaleureuses, naturelles (beige, brun, vert)
- Éléments : Nature, famille, tradition, sagesse
- Mood : Sérénité, confort, héritage
- Photographe référence : Steve McCurry (humanité), Sebastião Salgado (dignité)

⚠️ IMPÉRATIF : Adapter TOUS les éléments visuels (composition, couleurs, mood, références) selon l'âge cible.
═══════════════════════════════════════════════════════════════
```

### **3. ADAPTATION PHOTOGRAPHE/STYLE SELON SECTEUR**

Ajouter cette section au prompt GPT Creative Director :

```markdown
═══════════════════════════════════════════════════════════════
📸 ADAPTATION PHOTOGRAPHE/STYLE SELON SECTEUR
═══════════════════════════════════════════════════════════════

SECTEUR : ${brand.sector}
POSITIONNEMENT : ${brand.pricePositioning}

⚠️ INSTRUCTIONS STYLE PAR SECTEUR :

🍔 FOOD & BEVERAGE :
- Budget : Style rustique, authentique (Dennis Prescott, Mowie Kay)
- Mid-range : Style lifestyle, appétissant (Todd Selby, Tara O'Brady)
- Luxury : Style gastronomique, artistique (Mikkel Jul Hvilshøj, Ren Fuller)
- Techniques : Overhead shots, natural light, food styling, macro

💄 BEAUTY & COSMETICS :
- Budget : Style naturel, accessible (Glossier aesthetic)
- Mid-range : Style lifestyle, aspirationnel (Sephora style)
- Luxury : Style dramatique, iconique (Annie Leibovitz, Mario Testino)
- Techniques : Dramatic lighting, close-ups, skin texture, color theory

👗 FASHION & APPAREL :
- Budget : Style street, authentique (Scott Schuman, Tommy Ton)
- Mid-range : Style lifestyle, tendance (Zara aesthetic)
- Luxury : Style éditorial, artistique (Peter Lindbergh, Paolo Roversi)
- Techniques : Environmental portraits, movement, texture, editorial

💻 TECH & ELECTRONICS :
- Budget : Style fonctionnel, clair (product shots simples)
- Mid-range : Style lifestyle, moderne (Samsung style)
- Luxury : Style minimaliste, premium (Apple aesthetic - minimalist perfection)
- Techniques : Clean backgrounds, reflections, macro details, lifestyle integration

🏠 HOME & LIFESTYLE :
- Budget : Style cozy, accessible (IKEA aesthetic)
- Mid-range : Style aspirationnel, moderne (West Elm style)
- Luxury : Style architectural, sophistiqué (Architectural Digest)
- Techniques : Natural light, wide angles, styling, atmospheric

🚗 AUTOMOTIVE :
- Budget : Style pratique, fonctionnel
- Mid-range : Style dynamique, lifestyle (Toyota style)
- Luxury : Style cinématographique, dramatique (Easton Chang, Amy Shore)
- Techniques : Motion blur, reflections, dramatic angles, environmental

⚠️ IMPÉRATIF : Choisir un style photographique cohérent avec le secteur ET le positionnement prix.
═══════════════════════════════════════════════════════════════
```

### **4. CONTRAINTES DE LONGUEUR ASSOUPLIES**

Remplacer les contraintes actuelles par :

```markdown
🚨 CONTRAINTES DE LONGUEUR OPTIMISÉES (IMPÉRATIF ABSOLU):

POSTS RÉSEAUX SOCIAUX (Hook + Corps du texte) :
• Instagram : 150-300 caractères (permet storytelling court)
• Facebook : 200-400 caractères (engagement optimal)
• LinkedIn : 300-500 caractères (thought leadership)
• TikTok : 100-150 caractères (court et percutant)
• Twitter : 250-280 caractères (maximum plateforme)

CALL-TO-ACTION :
• 15-30 caractères maximum
• 2-5 mots maximum

HASHTAGS :
• 5-7 hashtags stratégiques maximum
• Mix : niche (<50k) + tendance (50k-500k) + marque

⚠️ CES LIMITES PERMETTENT UN STORYTELLING EFFICACE TOUT EN RESTANT CONCIS.
```

---

## 📝 TÂCHES CONCRÈTES

### **TÂCHE 1 : Optimiser PostGenerationService.ts**

1. **Restructurer le prompt système GPT-5** (ligne ~200-800) :
   - ✅ Garder TOUTES les variables existantes
   - ✅ Réorganiser par priorité (contraintes critiques en HAUT)
   - ✅ Ajouter section "Adaptation saisonnière intelligente"
   - ✅ Ajouter section "Adaptation style selon âge cible"
   - ✅ Assouplir contraintes de longueur (150-300 chars Instagram)
   - ✅ Améliorer hiérarchie visuelle (sections plus claires)

2. **Ajouter des rappels stratégiques** :
   - Rappeler les contraintes critiques à la fin du prompt
   - Ajouter des exemples concrets pour chaque instruction

### **TÂCHE 2 : Optimiser GPTCreativeDirector.ts**

1. **Enrichir le prompt GPT-4o** (ligne ~300-600) :
   - ✅ Ajouter section "Adaptation style visuel selon âge cible"
   - ✅ Ajouter section "Adaptation photographe/style selon secteur"
   - ✅ Intégrer les données produit enrichies (flavors, scents, certifications)
   - ✅ Améliorer l'analyse sémantique du texte généré (déjà présente, à renforcer)

2. **Améliorer la cohérence texte-image** :
   - Renforcer l'analyse du texte généré
   - S'assurer que l'image reflète parfaitement le message du texte

---

## ✅ CRITÈRES DE SUCCÈS

1. **Aucune variable perdue** : Toutes les variables existantes doivent être conservées
2. **Adaptation intelligente** : GPT-5 doit décider automatiquement selon le contexte
3. **Cohérence texte-image** : L'image doit refléter parfaitement le texte
4. **Diversité créative** : Chaque post doit être unique et adapté
5. **Qualité Cannes Lions** : Score global > 90/100 sur les 19 critères

---

## 🎯 RÉSULTAT ATTENDU

Après optimisation, le système devrait :
- ✅ Générer des glaces avec ambiance estivale automatiquement
- ✅ Générer des produits enfants avec style féerique/superhéros selon l'âge
- ✅ Générer des produits luxury avec style élégant automatiquement
- ✅ Rester intemporel pour les produits tech/services
- ✅ Adapter le style photographique selon secteur + positionnement
- ✅ Maintenir une cohérence parfaite texte-image

---

## 📌 NOTES IMPORTANTES

1. **Ne PAS créer de bases de données** : Laisser GPT-5 décider avec son intelligence native
2. **Exploiter les variables existantes** : Toutes les données nécessaires sont déjà dans le code
3. **Être précis dans les instructions** : GPT-5 est excellent si les instructions sont claires
4. **Tester avec des cas réels** : Glace en été, jouet enfant, produit luxury, etc.

---

## 🚀 COMMENCER L'OPTIMISATION

Pour commencer, ouvrir les fichiers :
1. `server/src/services/PostGenerationService.ts` (ligne ~200-800)
2. `server/src/services/GPTCreativeDirector.ts` (ligne ~300-600)

Et appliquer les optimisations décrites ci-dessus.

**Bonne chance ! 🎨**
