# 🔗 Mapping Formulaires - Liaison Données → Presets

> **Version:** 2.0 - Objectif 1000 Presets  
> **Formulaires:** BriefForm, ProductForm, Calendars  
> **Dernière mise à jour:** Décembre 2025

---

## 📑 Table des Matières

1. [Vue d'Ensemble](#vue-densemble)
2. [BriefForm → Secteur → Styles](#briefform--secteur--styles)
3. [ProductForm → Catégorie → Contextes](#productform--catégorie--contextes)
4. [Calendars → Ton → Frameworks](#calendars--ton--frameworks)
5. [Flux Complet](#flux-complet)
6. [Tableaux de Correspondance](#tableaux-de-correspondance)

---

## 🎯 Vue d'Ensemble

### Architecture des Formulaires

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUX DONNÉES → PRESETS                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐                                           │
│  │   BriefForm     │──────────────────────────────────┐        │
│  │   (Marque)      │                                  │        │
│  │                 │                                  │        │
│  │  • sector       │───► SECTOR_TO_CATEGORIES ───────►│        │
│  │  • brandColors  │───► generateColorPalettePrompt ─►│        │
│  │  • positioning  │───► Framework selection ────────►│        │
│  │  • targetMarket │                                  │        │
│  └─────────────────┘                                  │        │
│                                                       ▼        │
│  ┌─────────────────┐                        ┌──────────────┐   │
│  │  ProductForm    │                        │   PRESETS    │   │
│  │   (Produit)     │                        │   FILTRÉS    │   │
│  │                 │                        │              │   │
│  │  • category     │───► preFilterStyles ──►│  • Styles    │   │
│  │  • usageOccas.  │───► USAGE_TO_CONTEXTS ►│  • Contextes │   │
│  │  • targetAud.   │───► Framework match ──►│  • Palettes  │   │
│  │  • USPs         │                        │  • Frameworks│   │
│  └─────────────────┘                        │  • Lightings │   │
│                                             └──────────────┘   │
│  ┌─────────────────┐                              │            │
│  │   Calendars     │                              │            │
│  │   (Planning)    │                              │            │
│  │                 │                              ▼            │
│  │  • platforms    │───► Format adaptation ──────►│            │
│  │  • tone         │───► Framework selection ────►│            │
│  │  • frequency    │───► Diversity control ──────►│            │
│  │  • language     │                              │            │
│  └─────────────────┘                              │            │
│                                                   ▼            │
│                                        ┌──────────────────┐    │
│                                        │ selectCreative   │    │
│                                        │ Preset()         │    │
│                                        └──────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📋 BriefForm → Secteur → Styles

### Champs du BriefForm

| Champ | Type | Impact sur Presets |
|-------|------|-------------------|
| `name` | string | Identification |
| `sector` | select | **CRITIQUE** - Filtre styles |
| `brandColors.primary` | color | Intégration palette |
| `brandColors.secondary` | color | Intégration palette |
| `brandColors.accent` | color | Intégration palette |
| `positioning` | select | Framework selection |
| `targetMarket` | select | Contextes culturels |
| `brandVoice` | textarea | Ton du contenu |
| `competitors` | array | Différenciation |

### Mapping Secteur → Catégories de Styles

```typescript
SECTOR_TO_CATEGORIES = {
  // ALIMENTAIRE & BOISSONS
  'food': ['food', 'beverage', 'lifestyle', 'minimal', 'luxury', 'studio', 
           'nature', 'documentary', 'action', 'editorial', 'cinematic', 'beauty',
           'fashion', 'experimental', 'conceptual', 'digital', 'artisanat', 'healthcare'],
  
  'dairy': ['food', 'studio', 'lifestyle', 'minimal', 'luxury', 'nature', 
            'beauty', 'documentary', 'editorial', 'action', 'fashion', 'experimental',
            'conceptual', 'artisanat', 'healthcare'],
  
  'beverage': ['beverage', 'food', 'lifestyle', 'minimal', 'luxury', 'studio', 
               'action', 'nature', 'documentary', 'cinematic', 'editorial', 'beauty',
               'fashion', 'experimental', 'conceptual', 'digital', 'ai_tech', 'healthcare'],
  
  // BEAUTÉ & COSMÉTIQUE
  'cosmetic': ['beauty', 'cosmetic', 'luxury', 'lifestyle', 'minimal', 'studio', 
               'editorial', 'cinematic', 'nature', 'experimental', 'fashion', 'food',
               'digital', 'ai_tech', 'conceptual', 'artisanat'],
  
  // TECHNOLOGIE
  'technology': ['minimal', 'studio', 'lifestyle', 'ai_tech', 'digital', 
                 'experimental', 'conceptual', 'cinematic', 'editorial', 'fashion',
                 'beauty', 'luxury', 'nature', 'crypto', 'food', 'artisanat'],
  
  // AUTOMOBILE
  'automobile': ['automobile', 'luxury', 'lifestyle', 'cinematic', 'action', 
                 'documentary', 'minimal', 'studio', 'fashion', 'experimental',
                 'conceptual', 'digital', 'ai_tech', 'nature', 'beauty', 'editorial'],
  
  // FINANCE
  'finance': ['finance', 'minimal', 'studio', 'lifestyle', 'documentary', 
              'editorial', 'luxury', 'cinematic', 'ai_tech', 'digital', 'crypto',
              'experimental', 'conceptual', 'fashion', 'beauty', 'nature', 'food'],
  
  // SANTÉ
  'healthcare': ['healthcare', 'minimal', 'telehealth', 'lifestyle', 'nature', 
                 'documentary', 'beauty', 'studio', 'editorial', 'food', 'luxury',
                 'fashion', 'experimental', 'conceptual', 'digital', 'ai_tech'],
  
  // ÉDUCATION
  'education': ['education', 'lifestyle', 'minimal', 'documentary', 'editorial', 
                'studio', 'nature', 'beauty', 'cinematic', 'ai_tech', 'digital',
                'experimental', 'conceptual', 'fashion', 'food', 'artisanat'],
  
  // AGRICULTURE
  'agriculture': ['agriculture', 'food', 'lifestyle', 'nature', 'documentary', 
                  'editorial', 'minimal', 'studio', 'cinematic', 'artisanat',
                  'beauty', 'luxury', 'experimental', 'conceptual', 'fashion', 'telehealth'],
  
  // INDUSTRIE
  'manufacturing': ['manufacturing', 'studio', 'minimal', 'documentary', 
                    'editorial', 'lifestyle', 'cinematic', 'conceptual', 'action',
                    'ai_tech', 'digital', 'experimental', 'luxury', 'nature', 'artisanat', 'fashion'],
  
  // IMMOBILIER
  'real-estate': ['real_estate', 'lifestyle', 'luxury', 'minimal', 'documentary', 
                  'editorial', 'cinematic', 'nature', 'studio', 'conceptual', 'fashion',
                  'beauty', 'food', 'experimental', 'digital', 'ai_tech', 'artisanat'],
  
  // ÉNERGIE
  'energy': ['energy', 'lifestyle', 'minimal', 'nature', 'documentary', 
             'editorial', 'cinematic', 'conceptual', 'experimental', 'ai_tech',
             'digital', 'luxury', 'fashion', 'beauty', 'food', 'artisanat'],
  
  // CRYPTO & WEB3
  'crypto': ['crypto', 'ai_tech', 'minimal', 'digital', 'experimental', 
             'conceptual', 'cinematic', 'lifestyle', 'luxury', 'fashion',
             'beauty', 'food', 'nature', 'editorial', 'studio', 'artisanat'],
  
  // DEFAULT
  'default': ['lifestyle', 'minimal', 'studio', 'documentary', 'editorial',
              'nature', 'beauty', 'cinematic', 'luxury', 'conceptual', 'fashion', 'action']
};
```

### Liste des 29 Secteurs Disponibles

| # | Secteur | Clé |
|---|---------|-----|
| 1 | Agroalimentaire | `food` |
| 2 | Produits laitiers | `dairy` |
| 3 | Boissons | `beverage` |
| 4 | Cosmétique | `cosmetic` |
| 5 | Mode | `fashion` |
| 6 | Technologie | `technology` |
| 7 | Automobile | `automobile` |
| 8 | Finance | `finance` |
| 9 | Banque | `banking` |
| 10 | Fintech | `fintech` |
| 11 | Santé | `healthcare` |
| 12 | Médical | `medical` |
| 13 | Télémédecine | `telehealth` |
| 14 | Éducation | `education` |
| 15 | Agriculture | `agriculture` |
| 16 | Artisanat | `artisanat` |
| 17 | Biens de consommation | `consumer-goods` |
| 18 | Médias | `media` |
| 19 | Communication | `communication` |
| 20 | Industrie | `manufacturing` |
| 21 | Immobilier | `real-estate` |
| 22 | Architecture | `architecture` |
| 23 | Énergie | `energy` |
| 24 | Environnement | `environment` |
| 25 | Crypto | `crypto` |
| 26 | Blockchain | `blockchain` |
| 27 | IA | `ai` |
| 28 | Transport | `transport` |
| 29 | Luxe | `luxury` |

---

## 📦 ProductForm → Catégorie → Contextes

### Champs du ProductForm

| Champ | Type | Impact sur Presets |
|-------|------|-------------------|
| `name` | string | Identification |
| `category` | select | Filtre contextes |
| `subcategory` | select | Affinage contextes |
| `usageOccasions` | multi-select | **CRITIQUE** - USAGE_TO_CONTEXTS |
| `targetAudience.ageRange` | select | Contextes générationnels |
| `targetAudience.gender` | select | Styles adaptés |
| `targetAudience.lifestyle` | select | Contextes lifestyle |
| `USPs` | array | Frameworks narratifs |
| `ingredients` | array | Contextes naturels |
| `packaging` | object | Styles studio |

### Mapping Usage → Contextes (Extrait)

```typescript
USAGE_TO_CONTEXTS = {
  // MOMENTS ALIMENTAIRES
  'breakfast': ['Modern Kitchen Bright', 'Cozy Home Comfort', 'Family Kitchen Busy', 
                'Home Office Remote Work', 'Scandinavian Hygge Cozy', 'Parisian Café Classic'],
  
  'lunch': ['Modern Kitchen Bright', 'Business Lunch Restaurant', 'Outdoor Nature Setting', 
            'Coworking Space Collaborative', 'Parisian Café Classic', 'Mediterranean Villa Luxury'],
  
  'dinner': ['Cozy Home Comfort', 'Luxury Hotel Suite', 'Rustic Countryside', 
             'Family Kitchen Busy', 'Mediterranean Villa Luxury', 'Parisian Café Classic'],
  
  // BOISSONS
  'juice': ['Fruit Explosion Studio Chaos', 'Heritage Orange Grove Sunrise', 
            'Premium Wellness Sanctuary', 'Dynamic Splash Laboratory', 'Beach Sunset Romance',
            'Botanical Garden Natural', 'Brazilian Carnival Energy', 'African Savanna Wild',
            'Tokyo Neon Cyberpunk', 'New York Rooftop Urban', 'Summer Beach Vacation'],
  
  'coffee': ['Parisian Café Classic', 'Coworking Space Collaborative', 'Home Office Remote Work', 
             'Scandinavian Hygge Cozy', 'Modern Office Workspace', 'Airport Business Lounge'],
  
  'smoothie': ['Premium Wellness Sanctuary', 'Dynamic Splash Laboratory', 'Spa Wellness Zen', 
               'Beach Sunset Romance', 'Sports Stadium Energy', 'Yoga Lifestyle Flow'],
  
  // SPORT & BIEN-ÊTRE
  'sport': ['Outdoor Nature Setting', 'Sports Stadium Energy', 'Mountain Peak Achievement', 
            'Beach Sunset Romance', 'Winter Sports Mountain', 'Music Festival Outdoor'],
  
  'wellness': ['Spa Wellness Zen', 'Botanical Garden Natural', 'Cozy Home Comfort', 
               'Forest Enchanted Magical'],
  
  'yoga': ['Spa Wellness Zen', 'Outdoor Nature Setting', 'Botanical Garden Natural', 
           'Beach Sunset Romance'],
  
  // BEAUTÉ
  'skincare': ['Spa Wellness Zen', 'Minimalist Studio White', 'Botanical Garden Natural', 
               'Luxury Hotel Suite'],
  
  'makeup': ['Minimalist Studio White', 'Fashion Runway Backstage', 'Luxury Hotel Suite', 
             'Boutique Retail Chic'],
  
  // TRAVAIL
  'work': ['Modern Office Workspace', 'Home Office Remote Work', 'Coworking Space Collaborative', 
           'Corporate Boardroom Executive'],
  
  'meeting': ['Corporate Boardroom Executive', 'Conference Center Professional', 
              'Hotel Conference Room', 'Business Lunch Restaurant'],
  
  // LOISIRS
  'party': ['Urban Loft Industrial', 'Luxury Hotel Suite', 'Birthday Party Celebration', 
            'Music Festival Outdoor'],
  
  'relaxation': ['Spa Wellness Zen', 'Cozy Home Comfort', 'Beach Sunset Romance', 
                 'Forest Enchanted Magical'],
  
  // SAISONS
  'summer': ['Beach Sunset Romance', 'Summer Beach Vacation', 'Outdoor Nature Setting', 
             'Music Festival Outdoor'],
  
  'winter': ['Winter Sports Mountain', 'Christmas Holiday Festive', 'Cozy Home Comfort', 
             'Mountain Peak Achievement'],
  
  // DEFAULT
  'default': ['Minimalist Studio White', 'Modern Kitchen Bright', 'Cozy Home Comfort', 
              'Outdoor Nature Setting', 'Urban Loft Industrial', 'Boutique Retail Chic']
};
```

### Catégories de Produits (300+)

| Secteur | Catégories Principales |
|---------|----------------------|
| Food | Fruits, Légumes, Viandes, Poissons, Céréales, Snacks, Desserts, Plats préparés |
| Dairy | Lait, Yaourts, Fromages, Crèmes, Beurre, Glaces |
| Beverage | Jus, Sodas, Eaux, Cafés, Thés, Alcools, Smoothies, Energy drinks |
| Cosmetic | Skincare, Makeup, Haircare, Parfums, Soins corps |
| Fashion | Vêtements, Chaussures, Accessoires, Bijoux |
| Tech | Smartphones, Ordinateurs, Wearables, IoT, Software |
| Auto | Voitures, Motos, Accessoires, Services |
| Finance | Banque, Assurance, Investissement, Crypto |
| Healthcare | Médicaments, Dispositifs, Services, Bien-être |

---

## 📅 Calendars → Ton → Frameworks

### Champs du Calendars

| Champ | Type | Impact sur Presets |
|-------|------|-------------------|
| `name` | string | Identification |
| `platforms` | multi-select | Format adaptation |
| `tone` | select | **CRITIQUE** - Framework selection |
| `frequency` | select | Diversity control |
| `language` | select | Localisation |
| `startDate` | date | Saisonnalité |
| `endDate` | date | Saisonnalité |
| `objectives` | multi-select | Framework alignment |

### Mapping Ton → Frameworks

| Ton | Frameworks Recommandés |
|-----|----------------------|
| **Professionnel** | Problem-Solution-ROI, Expertise-Trust-Partnership, Challenge-Innovation-Leadership |
| **Décontracté** | Hook-Story-Offer, Social Proof, Value-First |
| **Inspirant** | Storytelling Journey, Emotional Rollercoaster, Nostalgia-Future Bridge |
| **Éducatif** | Question-Answer, Value-First, Before-After-Bridge |
| **Humoristique** | Surprise-Delight-Share, Hook-Story-Offer |
| **Luxueux** | AIDA, Storytelling Journey, Vulnerability-Connection |
| **Engagé** | PAS, Fear-Relief-Empowerment, Community-Belonging-Identity |

### Mapping Plateforme → Format

| Plateforme | Ratio | Résolution | Spécificités |
|------------|-------|------------|--------------|
| Instagram Feed | 1:1 | 1080×1080 | Carré, hashtags |
| Instagram Story | 9:16 | 1080×1920 | Vertical, éphémère |
| Instagram Reels | 9:16 | 1080×1920 | Vertical, dynamique |
| Facebook | 1.91:1 | 1200×628 | Horizontal, texte |
| LinkedIn | 1.91:1 | 1200×628 | Professionnel |
| Twitter/X | 16:9 | 1200×675 | Horizontal, concis |
| TikTok | 9:16 | 1080×1920 | Vertical, tendance |
| Pinterest | 2:3 | 1000×1500 | Vertical, inspirant |
| YouTube Thumbnail | 16:9 | 1280×720 | Horizontal, accrocheur |

---

## 🔄 Flux Complet

### Exemple : Marque de Jus Bio

```
ENTRÉE:
├── BriefForm
│   ├── sector: "beverage"
│   ├── brandColors: { primary: "#FF6B35", secondary: "#2EC4B6" }
│   ├── positioning: "premium"
│   └── targetMarket: "France"
│
├── ProductForm
│   ├── category: "Jus de fruits"
│   ├── usageOccasions: ["breakfast", "healthy-snack", "sport"]
│   ├── targetAudience: { ageRange: "25-45", lifestyle: "active" }
│   └── USPs: ["100% bio", "Sans sucres ajoutés", "Local"]
│
└── Calendars
    ├── platforms: ["instagram", "facebook"]
    ├── tone: "inspirant"
    ├── frequency: "daily"
    └── language: "fr"

TRAITEMENT:
├── preFilterStylesBySector("beverage")
│   └── → 18 catégories de styles
│
├── preFilterContextsByUsage(["breakfast", "healthy-snack", "sport"])
│   └── → 25 contextes pertinents
│
├── selectFrameworkByTone("inspirant")
│   └── → Storytelling Journey, Emotional Rollercoaster
│
└── generateColorPalettePrompt(brandColors)
    └── → Brand Harmonious (70% intégration)

SORTIE:
└── CreativePreset {
      style: "Juice Burst Explosion Kinetic",
      context: "Premium Wellness Sanctuary",
      palette: "Brand Harmonious",
      framework: "Storytelling Journey",
      lighting: "Golden Hour Morning"
    }
```

---

## 📊 Tableaux de Correspondance

### Secteur → Nombre de Styles Disponibles

| Secteur | Styles Disponibles | Catégories |
|---------|-------------------|------------|
| food | 40+ | 18 |
| beverage | 35+ | 18 |
| cosmetic | 25+ | 16 |
| technology | 20+ | 16 |
| automobile | 15+ | 16 |
| finance | 15+ | 17 |
| healthcare | 15+ | 16 |
| manufacturing | 20+ | 16 |
| real-estate | 15+ | 17 |

### Usage → Nombre de Contextes

| Usage | Contextes | Priorité |
|-------|-----------|----------|
| juice | 24 | Haute |
| breakfast | 8 | Haute |
| coffee | 8 | Moyenne |
| sport | 6 | Moyenne |
| wellness | 4 | Moyenne |
| work | 4 | Basse |
| default | 6 | Fallback |

### Ton → Frameworks Compatibles

| Ton | Frameworks | Nombre |
|-----|------------|--------|
| Professionnel | B2B | 6 |
| Inspirant | Émotionnels | 5 |
| Éducatif | Classiques | 4 |
| Décontracté | Storytelling | 3 |
| Luxueux | Narratifs | 3 |

---

## 🔗 Ressources

- [01-ARCHITECTURE-MODULAIRE.md](./01-ARCHITECTURE-MODULAIRE.md)
- [02-PRESETS-GUIDELINES.md](./02-PRESETS-GUIDELINES.md)
- [03-CONTEXTES-ETENDUS.md](./03-CONTEXTES-ETENDUS.md)
- [05-IMPLEMENTATION-GUIDE.md](./05-IMPLEMENTATION-GUIDE.md)

---

*Documentation générée pour Trio Digital - Creative Engine 2026*
