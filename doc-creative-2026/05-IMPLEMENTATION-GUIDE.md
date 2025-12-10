# 🚀 Guide d'Implémentation - Creative Engine 2026

> **Version:** 2.0 - Objectif 1000 Presets  
> **Audience:** Développeurs & Contributeurs  
> **Dernière mise à jour:** Décembre 2025

---

## 📑 Table des Matières

1. [Démarrage Rapide](#démarrage-rapide)
2. [Ajouter un Nouveau Style](#ajouter-un-nouveau-style)
3. [Ajouter un Nouveau Contexte](#ajouter-un-nouveau-contexte)
4. [Ajouter un Nouveau Framework](#ajouter-un-nouveau-framework)
5. [Tests & Validation](#tests--validation)
6. [Bonnes Pratiques](#bonnes-pratiques)
7. [Troubleshooting](#troubleshooting)

---

## 🏁 Démarrage Rapide

### Fichier Principal

```
server/src/services/CreativePresetsLibrary.ts
```

### Structure du Fichier

```typescript
// 1. INTERFACES (lignes 1-50)
interface PhotographicStyle { ... }
interface CreativeContext { ... }
interface ColorPalette { ... }
interface CreativeFramework { ... }
interface LightingSetup { ... }

// 2. DONNÉES (lignes 50-2500)
const PHOTOGRAPHIC_STYLES: PhotographicStyle[] = [ ... ];
const CREATIVE_CONTEXTS: CreativeContext[] = [ ... ];
const COLOR_PALETTES: ColorPalette[] = [ ... ];
const CREATIVE_FRAMEWORKS: CreativeFramework[] = [ ... ];
const LIGHTING_SETUPS: LightingSetup[] = [ ... ];

// 3. MAPPINGS (lignes 2500-2800)
const SECTOR_TO_CATEGORIES = { ... };
const USAGE_TO_CONTEXTS = { ... };

// 4. FONCTIONS (lignes 2800-3200)
export function selectCreativePreset() { ... }
export function preFilterStylesBySector() { ... }
export function generateColorPalettePrompt() { ... }
```

---

## 🎨 Ajouter un Nouveau Style

### Étape 1 : Localiser la Section

```typescript
// Chercher dans CreativePresetsLibrary.ts
const PHOTOGRAPHIC_STYLES: PhotographicStyle[] = [
  // ... styles existants
  
  // AJOUTER ICI ↓
];
```

### Étape 2 : Créer le Style

```typescript
{
  name: "Nom Unique Descriptif",
  category: "food", // Voir liste des catégories
  reference: "Référence photographe/campagne détaillée avec mots-clés",
  lighting: "Description éclairage avec température Kelvin",
  composition: "Règles de composition détaillées",
  mood: "Atmosphère émotionnelle",
  technicalSpecs: "Caméra, objectif, ISO, ouverture"
}
```

### Exemple Complet

```typescript
{
  name: "Artisan Bakery Golden Hour",
  category: "food",
  reference: "French artisan bakery photography by Mowie Kay, rustic bread photography, sourdough aesthetic, flour dust in air, warm crusty textures, traditional boulangerie atmosphere, handcrafted bread celebration, morning bakery ritual, fresh-from-oven warmth",
  lighting: "Warm golden morning light at 3200K streaming through bakery windows, flour particles catching light creating magical atmosphere, soft shadows on crusty bread surfaces, warm amber tones suggesting fresh-baked warmth",
  composition: "Bread as hero with supporting elements (flour, wheat, linen), rule of thirds with bread off-center, shallow depth of field isolating texture details, rustic wooden surfaces and vintage props, hands of baker adding human element",
  mood: "Artisanal craftsmanship, morning ritual warmth, traditional baking heritage, sensory bread experience, authentic handmade quality",
  technicalSpecs: "Canon 5D Mark IV, 50mm f/1.4 at f/2.8, ISO 400, natural window light with flour dust particles"
}
```

### Catégories Disponibles

| Catégorie | Description |
|-----------|-------------|
| `food` | Photographie culinaire |
| `beverage` | Boissons et liquides |
| `beauty` | Beauté et cosmétique |
| `lifestyle` | Style de vie |
| `studio` | Studio professionnel |
| `luxury` | Luxe et premium |
| `documentary` | Documentaire |
| `cinematic` | Cinématographique |
| `experimental` | Expérimental |
| `agriculture` | Agriculture |
| `manufacturing` | Industrie |
| `finance` | Finance |
| `healthcare` | Santé |
| `education` | Éducation |
| `real_estate` | Immobilier |
| `energy` | Énergie |
| `crypto` | Crypto/Web3 |
| `ai_tech` | IA/Tech |
| `transport` | Transport |
| `telehealth` | Télémédecine |

---

## 🌍 Ajouter un Nouveau Contexte

### Étape 1 : Localiser la Section

```typescript
const CREATIVE_CONTEXTS: CreativeContext[] = [
  // ... contextes existants
  
  // AJOUTER ICI ↓
];
```

### Étape 2 : Créer le Contexte

```typescript
{
  name: "Nom Évocateur du Lieu/Ambiance",
  description: "Description détaillée 50-100 mots incluant éléments visuels, matériaux, textures, éclairage, ambiance, éléments humains si pertinent, atmosphère émotionnelle, détails sensoriels"
}
```

### Exemple Complet

```typescript
{
  name: "Artisan Coffee Roastery Workshop",
  description: "Atelier de torréfaction artisanale avec machines à torréfier en cuivre patiné, sacs de jute remplis de grains verts du monde entier, arôme de café fraîchement torréfié omniprésent, lumière naturelle filtrant par grandes fenêtres industrielles, torréfacteur passionné vérifiant la couleur des grains, étagères de bocaux étiquetés par origine, ambiance chaleureuse de savoir-faire traditionnel, sons de crépitement des grains en torréfaction, vapeur s'échappant des machines, authenticité artisanale palpable"
}
```

### Étape 3 : Ajouter au Mapping Usage

```typescript
// Dans USAGE_TO_CONTEXTS
USAGE_TO_CONTEXTS['coffee'] = [
  // ... contextes existants
  'Artisan Coffee Roastery Workshop', // NOUVEAU
];
```

---

## 🧠 Ajouter un Nouveau Framework

### Étape 1 : Localiser la Section

```typescript
const CREATIVE_FRAMEWORKS: CreativeFramework[] = [
  // ... frameworks existants
  
  // AJOUTER ICI ↓
];
```

### Étape 2 : Créer le Framework

```typescript
{
  name: "Nom du Framework",
  structure: "Étape 1 → Étape 2 → Étape 3 → Résultat",
  application: "Description détaillée de comment appliquer ce framework au contenu créatif",
  category: "classic" // classic | emotional | narrative | b2b
}
```

### Exemple Complet

```typescript
{
  name: "Transformation Journey",
  structure: "Current State → Catalyst → Struggle → Breakthrough → New Reality",
  application: "Montrer l'état actuel insatisfaisant du client, introduire le produit comme catalyseur de changement, illustrer le processus de transformation avec ses défis, célébrer le moment de breakthrough, présenter la nouvelle réalité améliorée grâce au produit",
  category: "narrative"
}
```

### Catégories de Frameworks

| Catégorie | Usage | Exemples |
|-----------|-------|----------|
| `classic` | Marketing traditionnel | AIDA, PAS, Hook-Story-Offer |
| `emotional` | Connexion émotionnelle | Emotional Rollercoaster, Nostalgia |
| `narrative` | Storytelling complexe | Parallel Lives, Reverse Chronology |
| `b2b` | Business-to-Business | Problem-Solution-ROI, Expertise-Trust |

---

## ✅ Tests & Validation

### Test de Diversité

```bash
cd server
npx ts-node src/scripts/test-preset-diversity.ts
```

### Résultat Attendu

```
✓ Combinaisons uniques: 99.8%
✓ Styles utilisés: 114/114 (100%)
✓ Contextes utilisés: 50/50 (100%)
✓ Palettes utilisées: 12/12 (100%)
✓ Frameworks utilisés: 25/25 (100%)
✓ Score global: 99.6%
```

### Test Spécifique Secteur

```bash
npx ts-node src/scripts/test-beverage-diversity.ts
```

### Validation Manuelle

```typescript
// Dans un fichier de test
import { selectCreativePreset } from './CreativePresetsLibrary';

const preset = selectCreativePreset({
  sector: 'beverage',
  productCategory: 'juice',
  usageOccasions: ['breakfast', 'sport'],
  brandColors: { primary: '#FF6B35', secondary: '#2EC4B6' }
});

console.log(preset);
// Vérifier que le style, contexte, palette sont cohérents
```

---

## 📋 Bonnes Pratiques

### ✅ À Faire

| Pratique | Raison |
|----------|--------|
| Noms uniques et descriptifs | Évite les doublons |
| Références photographes réels | Crédibilité et qualité |
| Température Kelvin dans lighting | Précision technique |
| 50-100 mots par description | Richesse sans verbosité |
| Tester après chaque ajout | Détection précoce des erreurs |

### ❌ À Éviter

| Anti-pattern | Problème |
|--------------|----------|
| Noms génériques ("Style 1") | Confusion |
| Descriptions courtes (<30 mots) | Manque de détails |
| Copier-coller sans adaptation | Doublons |
| Oublier le mapping secteur | Style inaccessible |
| Ignorer les tests | Régressions |

### Checklist Avant Commit

- [ ] Nom unique vérifié
- [ ] Catégorie correcte
- [ ] Référence photographe/campagne incluse
- [ ] Éclairage en Kelvin
- [ ] Composition détaillée
- [ ] Mood émotionnel défini
- [ ] Specs techniques complètes
- [ ] Mapping secteur mis à jour
- [ ] Tests passés

---

## 🔧 Troubleshooting

### Problème : Style non sélectionné

**Cause probable :** Catégorie non mappée au secteur

**Solution :**
```typescript
// Vérifier SECTOR_TO_CATEGORIES
SECTOR_TO_CATEGORIES['votre_secteur'] = [
  // ... catégories existantes
  'nouvelle_categorie', // Ajouter
];
```

### Problème : Contexte non utilisé

**Cause probable :** Non ajouté au mapping usage

**Solution :**
```typescript
// Vérifier USAGE_TO_CONTEXTS
USAGE_TO_CONTEXTS['usage_pertinent'] = [
  // ... contextes existants
  'Nouveau Contexte', // Ajouter
];
```

### Problème : Diversité faible

**Cause probable :** Trop peu de presets dans une catégorie

**Solution :**
1. Identifier la catégorie sous-représentée
2. Ajouter 5-10 nouveaux styles/contextes
3. Relancer les tests

### Problème : Erreur TypeScript

**Cause probable :** Interface non respectée

**Solution :**
```typescript
// Vérifier que tous les champs requis sont présents
interface PhotographicStyle {
  name: string;        // ✓ Requis
  category: string;    // ✓ Requis
  reference: string;   // ✓ Requis
  lighting: string;    // ✓ Requis
  composition: string; // ✓ Requis
  mood: string;        // ✓ Requis
  technicalSpecs: string; // ✓ Requis
}
```

---

## 📊 Objectifs 2026

### Roadmap Presets

| Q1 2026 | Q2 2026 | Q3 2026 | Q4 2026 |
|---------|---------|---------|---------|
| 150 styles | 200 styles | 250 styles | 300 styles |
| 60 contextes | 80 contextes | 100 contextes | 120 contextes |
| 15 palettes | 18 palettes | 20 palettes | 25 palettes |
| 30 frameworks | 35 frameworks | 40 frameworks | 50 frameworks |

### Priorités

1. **Haute** : Styles Food/Beverage (+50)
2. **Haute** : Contextes B2B (+30)
3. **Moyenne** : Styles Beauty (+25)
4. **Moyenne** : Frameworks émotionnels (+15)
5. **Basse** : Éclairages saisonniers (+10)

---

## 🔗 Ressources

- [01-ARCHITECTURE-MODULAIRE.md](./01-ARCHITECTURE-MODULAIRE.md)
- [02-PRESETS-GUIDELINES.md](./02-PRESETS-GUIDELINES.md)
- [03-CONTEXTES-ETENDUS.md](./03-CONTEXTES-ETENDUS.md)
- [04-MAPPING-FORMULAIRES.md](./04-MAPPING-FORMULAIRES.md)

---

*Documentation générée pour Trio Digital - Creative Engine 2026*
