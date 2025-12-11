/**
 * 🍔 FOOD & BEVERAGE - PRESETS SECTORIELS
 * 
 * Presets créatifs ultra-spécialisés pour le secteur Food & Beverage
 * Qualité Cannes Lions garantie
 */

import { SectorPreset } from '../types';

export const FOOD_BEVERAGE_PRESET: SectorPreset = {
  sector: 'food',
  displayName: 'Food & Beverage',

  photographicStyles: [
    {
      name: "Overhead Flat Lay",
      category: "Food Photography",
      reference: "Dennis Prescott, Mowie Kay",
      lighting: "Natural window light, soft shadows from 45° angle",
      composition: "Bird's eye view, geometric arrangement, negative space",
      mood: "Fresh, appetizing, Instagram-worthy, clean",
      technicalSpecs: "50mm f/2.8, ISO 200, natural light, shallow DOF",
      bestFor: ["breakfast", "desserts", "ingredients", "meal prep"],
      cannesLionsScore: 85
    },
    {
      name: "Rustic Food Styling",
      category: "Food Photography",
      reference: "Tara O'Brady, Todd Selby",
      lighting: "Golden hour, warm tones, backlit with natural light",
      composition: "Rule of thirds, natural props (wood, linen), organic placement",
      mood: "Authentic, homemade, comforting, artisanal",
      technicalSpecs: "85mm f/1.8, ISO 400, backlit, warm color grading",
      bestFor: ["homemade", "artisanal", "organic", "farm-to-table"],
      cannesLionsScore: 88
    },
    {
      name: "Gourmet Restaurant Plating",
      category: "Food Photography",
      reference: "Mikkel Jul Hvilshøj, Ren Fuller",
      lighting: "Studio lighting, dramatic shadows, spotlight effect",
      composition: "Minimalist, centered, negative space, artistic plating",
      mood: "Luxurious, sophisticated, haute cuisine, elegant",
      technicalSpecs: "100mm macro f/2.8, ISO 100, studio strobe, black background",
      bestFor: ["fine-dining", "luxury", "premium", "gourmet"],
      cannesLionsScore: 92
    },
    {
      name: "Action Food Photography",
      category: "Food Photography",
      reference: "Ray Kachatorian, Dina Avila",
      lighting: "High-speed flash, frozen motion, dramatic lighting",
      composition: "Dynamic angles, motion blur, splash effects",
      mood: "Energetic, dynamic, exciting, fresh",
      technicalSpecs: "24-70mm f/2.8, ISO 800, 1/2000s, high-speed sync flash",
      bestFor: ["beverages", "sauces", "liquids", "action shots"],
      cannesLionsScore: 90
    },
    {
      name: "Lifestyle Food Context",
      category: "Food Photography",
      reference: "Joanie Simon, Laura Edwards",
      lighting: "Natural diffused light, soft shadows, airy feel",
      composition: "Environmental context, hands in frame, storytelling",
      mood: "Relatable, authentic, lifestyle, aspirational",
      technicalSpecs: "35mm f/1.4, ISO 400, natural light, environmental portrait",
      bestFor: ["everyday meals", "family", "lifestyle", "casual dining"],
      cannesLionsScore: 86
    },
    {
      name: "Macro Food Details",
      category: "Food Photography",
      reference: "Jonathan Gregson, Helene Dujardin",
      lighting: "Soft diffused light, texture emphasis, side lighting",
      composition: "Extreme close-up, texture focus, abstract patterns",
      mood: "Intimate, detailed, sensory, textural",
      technicalSpecs: "100mm macro f/2.8, ISO 100, focus stacking, ring light",
      bestFor: ["textures", "ingredients", "details", "abstract"],
      cannesLionsScore: 87
    },
    {
      name: "Dark & Moody Food",
      category: "Food Photography",
      reference: "Darina Kopcok, Prerna Singh",
      lighting: "Low-key lighting, dramatic shadows, chiaroscuro",
      composition: "Dark background, selective lighting, dramatic contrast",
      mood: "Mysterious, dramatic, sophisticated, intense",
      technicalSpecs: "50mm f/1.8, ISO 800, single light source, dark backdrop",
      bestFor: ["chocolate", "coffee", "wine", "premium products"],
      cannesLionsScore: 89
    },
    {
      name: "Bright & Airy Food",
      category: "Food Photography",
      reference: "Teri Lyn Fisher, Two Loves Studio",
      lighting: "Bright natural light, high-key, minimal shadows",
      composition: "White background, clean lines, minimalist styling",
      mood: "Fresh, clean, healthy, light",
      technicalSpecs: "50mm f/2.8, ISO 200, overexposed background, bright setup",
      bestFor: ["healthy food", "fresh produce", "dairy", "light meals"],
      cannesLionsScore: 84
    }
  ],

  contexts: [
    {
      name: "Morning Breakfast Scene",
      description: "Cozy breakfast table with natural morning light streaming through window",
      usageOccasions: ["breakfast", "morning", "coffee", "tea"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Family Dinner Table",
      description: "Warm family gathering around dinner table, sharing meal together",
      usageOccasions: ["dinner", "family", "gathering", "celebration"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Outdoor Picnic",
      description: "Fresh air picnic setting with blanket, basket, natural surroundings",
      usageOccasions: ["picnic", "outdoor", "summer", "casual"],
      culturalRelevance: ["universal"],
      seasonalFit: ["spring", "summer"]
    },
    {
      name: "Professional Kitchen",
      description: "Clean professional kitchen with chef preparing food, stainless steel",
      usageOccasions: ["professional", "chef", "restaurant", "premium"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Cozy Home Kitchen",
      description: "Warm home kitchen with wooden counters, natural materials, homemade feel",
      usageOccasions: ["homemade", "comfort", "family", "authentic"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Street Food Market",
      description: "Vibrant street food market with authentic local cuisine, bustling atmosphere",
      usageOccasions: ["street food", "authentic", "local", "casual"],
      culturalRelevance: ["asia", "latin-america", "middle-east"],
      seasonalFit: ["all-seasons"]
    }
  ],

  colorPalettes: [
    {
      name: "Fresh & Vibrant",
      description: "Bright, saturated colors for fresh products and healthy food",
      colors: ["#FF6B35", "#F7931E", "#FDC830", "#4CAF50", "#2196F3"],
      bestFor: ["fruits", "vegetables", "fresh", "healthy"],
      mood: "energetic, healthy, appetizing, fresh",
      brandIntegration: 60
    },
    {
      name: "Warm & Comforting",
      description: "Warm earth tones for comfort food and homemade meals",
      colors: ["#8B4513", "#D2691E", "#F4A460", "#DEB887", "#FFE4B5"],
      bestFor: ["comfort food", "baked goods", "homemade", "warm meals"],
      mood: "comforting, nostalgic, warm, cozy",
      brandIntegration: 70
    },
    {
      name: "Luxury Gourmet",
      description: "Sophisticated dark tones with gold accents for premium products",
      colors: ["#1A1A1A", "#2C2C2C", "#D4AF37", "#C0C0C0", "#FFFFFF"],
      bestFor: ["luxury", "premium", "gourmet", "fine-dining"],
      mood: "sophisticated, elegant, luxurious, exclusive",
      brandIntegration: 80
    },
    {
      name: "Natural Organic",
      description: "Earthy greens and browns for organic and natural products",
      colors: ["#556B2F", "#8FBC8F", "#DEB887", "#F5DEB3", "#FFFFFF"],
      bestFor: ["organic", "natural", "eco-friendly", "sustainable"],
      mood: "natural, authentic, healthy, sustainable",
      brandIntegration: 65
    }
  ],

  frameworks: [
    {
      name: "Sensory Storytelling",
      structure: "Visual → Taste → Smell → Touch → Emotion",
      application: "Évoque les sens à travers l'image pour créer une expérience immersive",
      bestFor: ["food", "beverage", "sensory products"]
    },
    {
      name: "Farm to Table Journey",
      structure: "Origin → Process → Plate → Enjoyment",
      application: "Raconte l'histoire du produit de sa source à la consommation",
      bestFor: ["organic", "artisanal", "premium", "authentic"]
    }
  ],

  lightingSetups: [
    {
      name: "Natural Window Light",
      timeOfDay: "Morning (8-10am) or Late Afternoon (4-6pm)",
      characteristics: "Soft, diffused, directional from side",
      mood: "Natural, authentic, fresh, inviting",
      technicalDetails: "45° angle, white reflector opposite, sheer curtain diffuser"
    },
    {
      name: "Dramatic Side Lighting",
      timeOfDay: "Any (controlled studio)",
      characteristics: "Strong directional light, deep shadows, high contrast",
      mood: "Dramatic, sophisticated, artistic, moody",
      technicalDetails: "Single strobe 90° to subject, black flag opposite, no fill"
    },
    {
      name: "Bright Overhead",
      timeOfDay: "Midday (controlled)",
      characteristics: "Even, bright, minimal shadows, clean",
      mood: "Fresh, clean, healthy, modern",
      technicalDetails: "Softbox directly overhead, white bounce cards around, high-key"
    }
  ],

  bestPractices: [
    "Always show food in appetizing, fresh state",
    "Use natural lighting when possible for authenticity",
    "Include human elements (hands, utensils) for scale and relatability",
    "Show product in use context, not just packaged",
    "Emphasize texture and freshness through macro details",
    "Use props that tell a story but don't distract from product",
    "Maintain color accuracy for food (critical for appetite appeal)",
    "Show steam, condensation, or other freshness indicators",
    "Use complementary colors to make food pop",
    "Keep styling natural and not over-produced"
  ],

  avoidances: [
    "Avoid artificial-looking food or obvious fake elements",
    "Don't over-style to the point of unrealistic presentation",
    "Avoid dark, moody lighting for fresh produce or healthy food",
    "Don't show food in unappetizing states (melted, wilted, etc.)",
    "Avoid cluttered compositions that distract from the product",
    "Don't use filters that alter food colors unnaturally",
    "Avoid clichéd food photography tropes (fork twirling pasta, etc.)",
    "Don't show packaging that looks cheap or low-quality",
    "Avoid busy backgrounds that compete with the food",
    "Don't use props that are culturally inappropriate or offensive"
  ]
};
