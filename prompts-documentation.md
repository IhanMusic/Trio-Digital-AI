# Documentation des Prompts - Trio Digital

## Vue d'ensemble

L'application utilise deux services principaux pour générer tout le contenu affiché dans Results.tsx :

### 1. PostGenerationService.ts
- Gère la génération du contenu textuel avec GPT-4
- Coordonne la planification des posts
- Gère les paramètres spécifiques à chaque plateforme
- Intègre les contraintes de langue et de pays
- Déclenche la génération d'images

### 2. ImageGenerationService.ts
- Gère la génération d'images avec Stability AI Ultra
- Configure les formats selon la plateforme
- Optimise les images générées
- Gère le stockage des images

Le processus complet se déroule comme suit :

### Flux de Données

1. **Initialisation**
   - L'utilisateur configure un calendrier de publication
   - Définit les paramètres de la marque et du contenu
   - Choisit les plateformes et la fréquence

2. **Génération de Contenu (PostGenerationService.ts)**
   - Calcule le nombre de posts nécessaires par plateforme
   - Génère les dates de publication optimales
   - Envoie les prompts à GPT-4 pour le contenu textuel
   - Reçoit et parse les réponses (texte + prompts d'images)

3. **Génération d'Images (ImageGenerationService.ts)**
   - Reçoit les prompts d'images de PostGenerationService
   - Configure le format selon la plateforme
   - Génère les images via Stability AI Ultra
   - Optimise et stocke les images générées

4. **Stockage et Affichage**
   - Les posts sont sauvegardés dans la base de données
   - Results.tsx récupère et affiche les posts
   - Permet la validation et l'édition du contenu
   - Gère le téléchargement des images

## Structure des Prompts GPT-4

### Prompt Système (Role: system)

```
Vous êtes un expert en marketing digital spécialisé dans [PLATFORM]. 
Générez [NUMBER] publications adaptées aux spécificités de la plateforme.

Langues de publication : [LANGUAGES]

Instructions spécifiques pour les langues :
[DIALECT_SPECIFIC_INSTRUCTIONS]

Spécificités par plateforme :
- Facebook : texte engageant, émojis modérés, call-to-action clair
- Instagram : texte concis, émojis fréquents, hashtags pertinents
- Twitter : message court et percutant, hashtags limités
- LinkedIn : ton professionnel, contenu business, pas d'émojis
- TikTok : ton décontracté, tendances, hashtags viraux

Pour chaque publication, suivez ce format exact :
---POST #[numéro]---
[Le contenu du post ici]
---IMAGE PROMPT #[numéro]---
[Un prompt en anglais décrivant l'image à générer, sans emojis ni hashtags]

IMPORTANT: Chaque publication doit être complètement différente des autres.
```

### Prompt Utilisateur (Role: user)

```
Créer [NUMBER] publications [PLATFORM] uniques pour :
- Marque : [BRAND_NAME] ([SECTOR])
- Description : [COMPANY_DESCRIPTION]
- Style : [COMMUNICATION_STYLE]
- Cible : [TARGET_COUNTRY] (Langues : [TARGET_LANGUAGES])
- Objectifs : [SOCIAL_MEDIA_GOALS]
- Période : du [START_DATE] au [END_DATE]
```

## Format de Réponse Attendu

La réponse de GPT-4 doit suivre ce format strict :

```
---POST #1---
[Contenu du premier post]
---IMAGE PROMPT #1---
[Prompt de génération d'image en anglais]

---POST #2---
[Contenu du deuxième post]
---IMAGE PROMPT #2---
[Prompt de génération d'image en anglais]

[etc...]
```

## Paramètres de Configuration GPT-4

- Modèle : gpt-4-0613
- Température : 0.9 (favorise la créativité)
- Tokens maximum : 4000

## Spécificités par Plateforme

### Facebook
- Style : Texte engageant
- Émojis : Utilisation modérée
- Focus : Call-to-action clair
- Format image : 16:9

### Instagram
- Style : Texte concis
- Émojis : Utilisation fréquente
- Hashtags : Nombreux et pertinents
- Format image : 1:1 (carré)

### Twitter
- Style : Messages courts et percutants
- Hashtags : Limités
- Format image : 16:9

### LinkedIn
- Style : Ton professionnel
- Contenu : Orienté business
- Émojis : Évités
- Format image : 16:9

### TikTok
- Style : Ton décontracté
- Hashtags : Tendances et viraux
- Format image : 16:9

## Traitement des Langues

- Support multilingue avec gestion des dialectes
- Instructions spécifiques pour chaque dialecte
- Adaptation du ton selon la langue et le marché cible

## Génération d'Images

### Configuration Stability AI Ultra

L'application utilise l'API Stability AI Ultra pour la génération d'images avec les paramètres suivants :

- **API Endpoint** : `https://api.stability.ai/v2beta/stable-image/generate/ultra`
- **Format de sortie** : PNG
- **Dimensions maximales** : 1024x1024 pixels
- **Qualité** : 100%

### Prompts de Génération

Les prompts de génération d'image sont :
- Automatiquement générés par GPT-4
- Toujours en anglais
- Sans émojis ni hashtags
- Adaptés au format de la plateforme (ratio d'aspect)
- Optimisés pour Stability AI Ultra

### Options de Génération

La génération d'images supporte différentes configurations selon l'usage :

1. **Purpose (Usage)**
   - social : Pour les réseaux sociaux
   - product : Pour les photos de produits
   - lifestyle : Pour les images lifestyle

2. **Aspect Ratio (Format)**
   - 1:1 : Format carré (Instagram)
   - 16:9 : Format paysage (autres réseaux)

### Processus de Génération

1. GPT-4 génère un prompt détaillé en anglais
2. Le prompt est envoyé à Stability AI Ultra
3. L'image générée est :
   - Sauvegardée au format PNG
   - Redimensionnée si nécessaire (max 1024x1024)
   - Optimisée pour le web
   - Stockée dans le dossier public/images

### Bonnes Pratiques pour les Prompts d'Images

1. **Structure du Prompt**
   - Description claire et détaillée de la scène
   - Spécification du style visuel
   - Indication de l'ambiance et de l'éclairage
   - Mention des éléments clés à inclure

2. **Éléments à Éviter**
   - Texte dans l'image
   - Logos ou marques déposées
   - Visages en gros plan
   - Poses non naturelles
   - Déformations anatomiques

## Validation et Contrôle

Les posts générés passent par un processus de validation :
1. Statut initial : 'pending_validation'
2. Options de validation : 'approved' ou 'rejected'
3. Possibilité d'éditer le texte après génération
4. Conservation de l'historique des modifications

## Variantes Utilisées dans la Génération

### 1. Données du Brief de Marque

Les informations suivantes de BriefForm.tsx sont utilisées dans PostGenerationService.ts :

1. **Informations de Base**
   - Nom de l'entreprise (companyName)
   - Secteur d'activité (sector)
   - Description de l'entreprise (description)

2. **Style et Communication**
   - Ton de communication (communicationStyle)
   - Réseaux sociaux actuels (socialMediaAccounts)
   - Objectifs de communication (values/socialMediaGoals)

3. **Public Cible**
   - Audience cible (targetAudience)

### 2. Données du Calendrier Éditorial

Les paramètres suivants de Calendars.tsx sont utilisés dans la génération :

1. **Configuration Temporelle**
   - Période de publication (startDate, endDate)
   - Fréquence de publication (frequency)
     * daily : 1 post/jour
     * twice_daily : 2 posts/jour
     * three_per_week : 3 posts/semaine
     * weekly : 1 post/semaine

2. **Configuration Linguistique**
   - Pays cible (targetCountry)
   - Langues de publication (targetLanguages)

3. **Plan de Publication**
   - Fréquence par plateforme (contentPlan.frequency)
   - Horaires préférés (contentPlan.preferredTimes)

### Impact sur la Génération

Ces variantes sont utilisées pour :
1. Personnaliser le contenu selon l'identité de la marque
2. Adapter le ton et le style selon la plateforme
3. Gérer la fréquence et le timing des publications
4. Assurer l'adaptation linguistique et culturelle

## Variantes Non Utilisées

### 1. Brief de Marque (BriefForm.tsx)

Les champs suivants sont collectés mais pas encore exploités dans la génération :

1. **Ressources Visuelles**
   - Logo (logo)
   - Charte graphique (brandGuidelines)
   - Photos de produits (productPhotos)

2. **Analyse Concurrentielle**
   - Concurrents directs (competitors)
   - Stratégies concurrentielles (competitorStrategies)
   - Position sur le marché (marketPosition)
   - Différenciateurs (differentiators)

3. **Métriques et ROI**
   - Métriques de succès (successMetrics)
   - Attentes de ROI (roiExpectations)

4. **Budget et Ressources**
   - Budget total (budget.totalBudget)
   - Allocation budgétaire (budget.allocation)
   - Équipe interne (resources.internalTeam)
   - Partenaires externes (resources.externalPartners)
   - Outils disponibles (resources.tools)

5. **Contraintes Légales**
   - Réglementations (legalConstraints.regulations)
   - Conformité (legalConstraints.compliance)
   - Mentions obligatoires (legalConstraints.disclaimers)

### 2. Calendrier Éditorial (Calendars.tsx)

Les paramètres suivants sont disponibles mais non utilisés :

1. **Mix de Contenu**
   - Types de contenu (contentPlan.contentMix)
   - Pourcentages par type

2. **Paramètres de Génération**
   - Thèmes (generationSettings.themes)
   - Mots-clés (generationSettings.keywords)
   - Longueur du contenu (generationSettings.contentLength)
   - Style d'image (generationSettings.imageStyle)

### Potentiel d'Amélioration

Ces variantes non utilisées offrent des opportunités d'amélioration pour :
1. Personnalisation plus poussée du contenu
2. Meilleure intégration des contraintes légales
3. Optimisation basée sur les métriques
4. Adaptation du contenu selon le budget et les ressources
5. Génération d'images plus ciblée avec les ressources visuelles de la marque

## Intégration des Produits dans la Génération

### 1. Sélection des Produits
- L'utilisateur sélectionne les produits à mettre en avant dans le calendrier
- Les produits sont stockés dans `calendar.selectedProducts`
- Chaque produit contient :
  - Informations de base (nom, description, catégorie)
  - Points forts (USP)
  - Bénéfices client
  - Caractéristiques techniques
  - Images associées

### 2. Enrichissement du Brief GPT
Le brief envoyé à GPT-4 est enrichi avec les informations produits :
```typescript
const briefData = {
  // ... autres informations de la marque ...
  products: products.map(product => ({
    name: product.name,
    description: product.description,
    category: product.category,
    uniqueSellingPoints: product.uniqueSellingPoints || [],
    customerBenefits: product.customerBenefits || [],
    specifications: product.technicalSheet?.specifications || {},
    flavors: product.flavors || [],
    scents: product.scents || [],
    variants: product.variants || [],
    technicalDetails: {
      ingredients: product.technicalSheet?.ingredients || [],
      usage: product.technicalSheet?.usage,
      storage: product.technicalSheet?.storage,
      highlights: product.technicalSheet?.highlights
    }
  }))
};
```

### 3. Association Post-Produits
- Chaque post généré est lié aux produits concernés
- La relation est stockée dans le modèle Post :
```typescript
interface IPost extends Document {
  // ... autres champs ...
  products: IProduct['_id'][]; // Référence aux produits associés
}
```

### 4. Affichage dans Results
- Les produits associés sont affichés pour chaque post
- Interface visuelle montrant :
  - Miniature du produit (si disponible)
  - Nom du produit
  - Catégorie
- Permet une validation contextuelle du contenu

### 5. Avantages de l'Intégration
- Contenu plus pertinent et ciblé
- Meilleure cohérence entre les posts
- Traçabilité des produits promus
- Facilite la validation du contenu

## Bonnes Pratiques

1. **Cohérence de la marque**
   - Respecter le ton et le style de communication
   - Maintenir une identité visuelle cohérente
   - Adapter le contenu aux valeurs de la marque

2. **Optimisation par plateforme**
   - Respecter les spécificités de chaque réseau social
   - Adapter le format des images
   - Utiliser les fonctionnalités propres à chaque plateforme

3. **Qualité du contenu**
   - Varier les types de contenu
   - Éviter la répétition
   - Maintenir un équilibre texte/image

4. **Planification**
   - Respecter les créneaux horaires optimaux
   - Maintenir une fréquence régulière
   - Adapter le planning selon les fuseaux horaires
