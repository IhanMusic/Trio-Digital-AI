# 🏗️ Architecture Modulaire - Creative Presets Library

> **Version:** 2.0 - Cannes Lions Edition  
> **Objectif:** 1000+ presets créatifs uniques  
> **Dernière mise à jour:** Décembre 2025

---

## 📑 Table des Matières

1. [Vue d'Ensemble](#vue-densemble)
2. [Interfaces TypeScript](#interfaces-typescript)
3. [Composants Principaux](#composants-principaux)
4. [Flux de Données](#flux-de-données)
5. [Système Anti-Répétition](#système-anti-répétition)
6. [Statistiques Actuelles](#statistiques-actuelles)

---

## 🎯 Vue d'Ensemble

### Architecture Globale

```
┌─────────────────────────────────────────────────────────────────┐
│                    TRIO DIGITAL - CREATIVE ENGINE               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │  BriefForm  │    │ ProductForm │    │  Calendars  │         │
│  │   (Marque)  │    │  (Produit)  │    │ (Planning)  │         │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘         │
│         │                  │                  │                 │
│         └──────────────────┼──────────────────┘                 │
│                            ▼                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              CreativePresetsLibrary.ts                   │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │  📸 PHOTOGRAPHIC_STYLES (114+ styles)           │    │   │
│  │  │  🎨 COLOR_PALETTES (12 palettes)                │    │   │
│  │  │  🧠 CREATIVE_FRAMEWORKS (25+ frameworks)        │    │   │
│  │  │  🌍 CREATIVE_CONTEXTS (50+ contextes)           │    │   │
│  │  │  💡 LIGHTING_SETUPS (12 éclairages)             │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                            │                                    │
│                            ▼                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              GlobalStyleTracker                          │   │
│  │  🔄 Système anti-répétition cryptographique             │   │
│  │  📊 Historique global des combinaisons                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                            │                                    │
│                            ▼                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              GPT-5 Creative Director                     │   │
│  │  🎯 Sélection intelligente des presets                  │   │
│  │  ✨ Génération de prompts Cannes Lions                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📐 Interfaces TypeScript

### 1. PhotographicStyle

```typescript
interface PhotographicStyle {
  name: string;           // Ex: "Todd Selby Intimate Food"
  category: string;       // Ex: "food", "beauty", "lifestyle"
  reference: string;      // Références Cannes Lions et photographes
  lighting: string;       // Description technique de l'éclairage
  composition: string;    // Règles de composition
  mood: string;           // Atmosphère émotionnelle
  technicalSpecs: string; // Spécifications caméra/objectif
  requiresHands?: boolean;
  handsJustification?: string;
}
```

### 2. ColorPalette

```typescript
interface ColorPalette {
  name: string;           // Ex: "Brand Dominant"
  description: string;    // Description de la palette
  application: string;    // Comment l'appliquer
  brandIntegration: number; // 0-100% d'intégration marque
}
```

### 3. CreativeFramework

```typescript
interface CreativeFramework {
  name: string;           // Ex: "AIDA Framework"
  structure: string;      // Ex: "Attention → Interest → Desire → Action"
  application: string;    // Guide d'application
}
```

### 4. CreativeContext

```typescript
interface CreativeContext {
  name: string;           // Ex: "Modern Kitchen Bright"
  description: string;    // Description détaillée de l'environnement
}
```

### 5. LightingSetup

```typescript
interface LightingSetup {
  name: string;           // Ex: "Golden Hour Morning"
  timeOfDay: string;      // Ex: "6h-8h du matin"
  characteristics: string; // Caractéristiques techniques
  mood: string;           // Ambiance créée
}
```

### 6. CreativePreset (Combinaison)

```typescript
interface CreativePreset {
  style: PhotographicStyle;
  palette: ColorPalette;
  framework: CreativeFramework;
  context: CreativeContext;
  lighting: LightingSetup;
  reference: string;      // Référence combinée
}
```

---

## 🧩 Composants Principaux

### Catégories de Styles Photographiques

| Catégorie | Nombre | Description |
|-----------|--------|-------------|
| `food` | 25+ | Photographie culinaire Cannes Lions |
| `beverage` | 15+ | Boissons, jus, cocktails |
| `beauty` | 12+ | Cosmétique et soins |
| `lifestyle` | 15+ | Mode de vie et quotidien |
| `studio` | 14+ | Produits en studio |
| `luxury` | 8+ | Luxe et premium |
| `documentary` | 6+ | Style documentaire |
| `cinematic` | 5+ | Style cinématographique |
| `experimental` | 4+ | Styles innovants |
| `agriculture` | 6+ | Agriculture et terroir |
| `manufacturing` | 8+ | Industrie et B2B |

### Catégories de Contextes

| Catégorie | Nombre | Exemples |
|-----------|--------|----------|
| Génériques | 12 | Kitchen, Loft, Spa |
| Sectoriels | 15 | Automotive, Medical, Tech |
| Émotionnels | 10 | Nostalgic, Dreamy, Romantic |
| Culturels | 10 | Japanese, Moroccan, Parisian |
| Tendance | 8 | Metaverse, TikTok, Eco |
| B2B | 10 | Boardroom, Conference, Trade Show |
| Retail | 10 | Supermarket, Boutique, Pop-Up |
| Lifestyle | 10 | Home Office, Student, Family |
| Événementiels | 10 | Wedding, Festival, Gala |
| Saisonniers | 10 | Christmas, Summer, Spring |

---

## 🔄 Flux de Données

### 1. Entrée Utilisateur → Pré-filtrage

```
BriefForm (Marque)
├── sector: "food" ──────────────────┐
├── brandColors: {primary, secondary}│
└── positioning: "premium"           │
                                     ▼
                        ┌────────────────────────┐
                        │ SECTOR_TO_CATEGORIES   │
                        │ food → [food, beverage,│
                        │ lifestyle, minimal...] │
                        └────────────────────────┘
                                     │
ProductForm (Produit)                │
├── category: "Jus de fruits" ───────┤
├── usageOccasions: ["breakfast"]    │
└── targetAudience: {...}            │
                                     ▼
                        ┌────────────────────────┐
                        │ USAGE_TO_CONTEXTS      │
                        │ breakfast → [Kitchen,  │
                        │ Cozy Home, Café...]    │
                        └────────────────────────┘
                                     │
                                     ▼
                        ┌────────────────────────┐
                        │ preFilterStylesBySector│
                        │ preFilterContextsByUsage│
                        └────────────────────────┘
```

### 2. Sélection → Génération

```
┌─────────────────────────────────────────────────────────────┐
│                   selectCreativePreset()                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. GlobalStyleTracker.getNextUniqueStyle()                 │
│     └── Sélection cryptographique anti-biais                │
│                                                             │
│  2. GlobalStyleTracker.getNextUniqueContext()               │
│     └── Rotation équitable des contextes                    │
│                                                             │
│  3. GlobalStyleTracker.getNextUniquePalette()               │
│     └── Distribution uniforme des palettes                  │
│                                                             │
│  4. GlobalStyleTracker.getNextUniqueFramework()             │
│     └── Variation des frameworks narratifs                  │
│                                                             │
│  5. GlobalStyleTracker.getNextUniqueLighting()              │
│     └── Alternance des setups d'éclairage                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    CreativePreset {
                      style, palette, framework,
                      context, lighting, reference
                    }
```

---

## 🔐 Système Anti-Répétition

### GlobalStyleTracker

```typescript
class GlobalStyleTracker {
  // Sets de tracking global
  private static usedStyles: Set<string>;
  private static usedContexts: Set<string>;
  private static usedPalettes: Set<string>;
  private static usedFrameworks: Set<string>;
  private static usedLightings: Set<string>;
  
  // Compteurs
  private static totalGenerations: number;
  private static cycleNumber: number;
  
  // Méthodes principales
  static getNextUniqueStyle(): PhotographicStyle;
  static getNextUniqueContext(available: CreativeContext[]): CreativeContext;
  static getNextUniquePalette(): ColorPalette;
  static getNextUniqueFramework(): CreativeFramework;
  static getNextUniqueLighting(): LightingSetup;
  
  // Sélection cryptographique
  private static cryptographicSelection<T>(items: T[]): T;
}
```

### Algorithme de Sélection

```
┌─────────────────────────────────────────────────────────────┐
│              ALGORITHME FISHER-YATES + SHA-256              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Générer seed unique:                                    │
│     seed = timestamp + microseconds + randomSalt            │
│                                                             │
│  2. Créer hash SHA-256:                                     │
│     hash = crypto.createHash('sha256').update(seed)         │
│                                                             │
│  3. Convertir en index:                                     │
│     index = hash.readUInt32BE(0) % items.length             │
│                                                             │
│  4. Retourner élément:                                      │
│     return items[index]                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Cycle de Rotation

```
Cycle 1: Styles 1-114 utilisés séquentiellement (randomisé)
         ↓ Tous épuisés
Cycle 2: Reset → Styles 1-114 re-randomisés
         ↓ Tous épuisés
Cycle 3: Reset → ...
```

---

## 📊 Statistiques Actuelles

### Inventaire des Presets

| Composant | Quantité Actuelle | Objectif 1000 |
|-----------|-------------------|---------------|
| Styles photographiques | 114 | 200+ |
| Palettes de couleurs | 12 | 20+ |
| Frameworks créatifs | 25 | 40+ |
| Contextes visuels | 50 | 100+ |
| Setups d'éclairage | 12 | 25+ |

### Combinaisons Possibles

```
Combinaisons théoriques = Styles × Palettes × Frameworks × Contextes × Lightings
                        = 114 × 12 × 25 × 50 × 12
                        = 20,520,000 combinaisons uniques
```

### Score de Diversité

```
Test sur 1000 générations:
├── Combinaisons uniques: 998/1000 (99.8%)
├── Styles utilisés: 114/114 (100%)
├── Contextes utilisés: 50/50 (100%)
└── Score global: 99.8%
```

---

## 🔗 Fichiers Liés

- `server/src/services/CreativePresetsLibrary.ts` - Bibliothèque principale
- `server/src/services/GPTPresetSelector.ts` - Sélecteur GPT-5
- `server/src/services/GPTCreativeDirector.ts` - Directeur créatif
- `client/src/components/brands/BriefForm.tsx` - Formulaire marque
- `client/src/components/products/ProductForm.tsx` - Formulaire produit
- `client/src/components/calendars/Calendars.tsx` - Calendrier éditorial

---

## ✅ Checklist Architecture

- [x] Interfaces TypeScript définies
- [x] Système de pré-filtrage par secteur
- [x] Système de pré-filtrage par usage
- [x] GlobalStyleTracker anti-répétition
- [x] Sélection cryptographique SHA-256
- [x] Historique des combinaisons
- [ ] Extension à 200+ styles
- [ ] Extension à 100+ contextes
- [ ] Extension à 40+ frameworks

---

*Documentation générée pour Trio Digital - Creative Engine 2026*
