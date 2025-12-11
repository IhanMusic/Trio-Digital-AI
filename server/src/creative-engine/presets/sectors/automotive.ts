/**
 * 🚗 AUTOMOTIVE - PRESETS SECTORIELS
 * 
 * Presets créatifs ultra-spécialisés pour le secteur Automobile
 * Qualité Cannes Lions garantie
 * 
 * Catégories couvertes:
 * - Véhicules neufs
 * - Véhicules d'occasion
 * - Pièces détachées
 * - Accessoires auto
 * - Pneumatiques
 * - Entretien et réparation
 * - Carrosserie
 * - Électronique embarquée
 * - Carburants et lubrifiants
 * - Location de véhicules
 * - Véhicules électriques
 * - Équipements de sécurité
 */

import { SectorPreset } from '../types';

export const AUTOMOTIVE_PRESET: SectorPreset = {
  sector: 'automotive',
  displayName: 'Automobile',

  photographicStyles: [
    {
      name: "Cinematic Car Photography",
      category: "Automotive Photography",
      reference: "Easton Chang, Larry Chen, Webb Bland",
      lighting: "Golden hour backlight, dramatic rim lighting, cinematic flares",
      composition: "Low angle hero shot, rule of thirds, leading lines from road",
      mood: "Powerful, aspirational, cinematic, premium",
      technicalSpecs: "24-70mm f/2.8, ISO 100, golden hour, polarizer filter",
      bestFor: ["new-vehicles", "luxury-cars", "sports-cars", "brand-campaigns"],
      cannesLionsScore: 94
    },
    {
      name: "Studio Automotive",
      category: "Automotive Photography",
      reference: "Tim Wallace, Nigel Harniman",
      lighting: "Multiple strobes, light painting, controlled reflections",
      composition: "3/4 angle, clean background, perfect reflections",
      mood: "Pristine, luxurious, showroom-quality, sophisticated",
      technicalSpecs: "50mm f/8, ISO 100, multiple exposures, light painting",
      bestFor: ["new-vehicles", "premium", "catalog", "showroom"],
      cannesLionsScore: 92
    },
    {
      name: "Dynamic Action Shot",
      category: "Automotive Photography",
      reference: "Richard Pardon, Agnieszka Doroszewicz",
      lighting: "Natural light, motion blur background, sharp subject",
      composition: "Panning shot, speed lines, dynamic angle",
      mood: "Exciting, powerful, dynamic, adrenaline",
      technicalSpecs: "70-200mm f/2.8, ISO 400, 1/60s panning, tracking",
      bestFor: ["sports-cars", "performance", "racing", "action"],
      cannesLionsScore: 91
    },
    {
      name: "Lifestyle Automotive",
      category: "Automotive Photography",
      reference: "Patrick Curtet, Steffen Jahn",
      lighting: "Natural environmental light, soft shadows, authentic feel",
      composition: "Car in context, lifestyle setting, human element",
      mood: "Aspirational, relatable, lifestyle, authentic",
      technicalSpecs: "35mm f/1.4, ISO 400, environmental portrait style",
      bestFor: ["family-cars", "SUV", "lifestyle", "everyday-use"],
      cannesLionsScore: 88
    },
    {
      name: "Detail & Craftsmanship",
      category: "Automotive Photography",
      reference: "Pepper Yandell, Markus Wendler",
      lighting: "Soft directional light, texture emphasis, controlled highlights",
      composition: "Macro details, material textures, design elements",
      mood: "Luxurious, detailed, crafted, premium",
      technicalSpecs: "100mm macro f/2.8, ISO 100, focus stacking, soft light",
      bestFor: ["luxury-details", "interior", "craftsmanship", "premium-features"],
      cannesLionsScore: 90
    },
    {
      name: "Urban Street Style",
      category: "Automotive Photography",
      reference: "Mike Crawat, Philipp Rupprecht",
      lighting: "City lights, neon reflections, night photography",
      composition: "Urban backdrop, street context, architectural elements",
      mood: "Urban, modern, edgy, contemporary",
      technicalSpecs: "24mm f/1.4, ISO 1600, long exposure, city lights",
      bestFor: ["city-cars", "electric-vehicles", "urban-mobility", "modern"],
      cannesLionsScore: 89
    },
    {
      name: "Adventure & Off-Road",
      category: "Automotive Photography",
      reference: "Chris Burkard, Jimmy Chin",
      lighting: "Natural dramatic light, epic landscapes, adventure mood",
      composition: "Epic landscape, car as explorer, adventure context",
      mood: "Adventurous, rugged, freedom, exploration",
      technicalSpecs: "16-35mm f/2.8, ISO 200, dramatic landscapes, wide angle",
      bestFor: ["SUV", "4x4", "off-road", "adventure"],
      cannesLionsScore: 93
    },
    {
      name: "Minimalist Automotive",
      category: "Automotive Photography",
      reference: "Benedict Redgrove, Tom Munro",
      lighting: "Clean studio light, minimal shadows, pure white/black",
      composition: "Isolated subject, negative space, geometric purity",
      mood: "Clean, modern, sophisticated, minimalist",
      technicalSpecs: "85mm f/5.6, ISO 100, seamless background, even lighting",
      bestFor: ["electric-vehicles", "concept-cars", "modern-design", "tech"],
      cannesLionsScore: 91
    },
    {
      name: "Heritage & Classic",
      category: "Automotive Photography",
      reference: "Rémi Dargegen, Amy Shore",
      lighting: "Warm vintage tones, soft natural light, nostalgic feel",
      composition: "Classic angles, heritage settings, timeless composition",
      mood: "Nostalgic, timeless, elegant, heritage",
      technicalSpecs: "50mm f/2, ISO 200, warm color grading, vintage feel",
      bestFor: ["classic-cars", "heritage", "vintage", "collector"],
      cannesLionsScore: 90
    },
    {
      name: "Technical Product Shot",
      category: "Automotive Photography",
      reference: "Industrial photography standards",
      lighting: "Even studio lighting, no harsh shadows, detail clarity",
      composition: "Clean product isolation, multiple angles, technical accuracy",
      mood: "Professional, technical, informative, clear",
      technicalSpecs: "90mm f/8, ISO 100, product lighting, white background",
      bestFor: ["parts", "accessories", "technical", "e-commerce"],
      cannesLionsScore: 85
    }
  ],

  contexts: [
    {
      name: "Open Road Freedom",
      description: "Endless highway stretching to horizon, freedom and adventure",
      usageOccasions: ["road-trip", "freedom", "adventure", "journey"],
      culturalRelevance: ["universal", "american", "european"],
      seasonalFit: ["summer", "spring"]
    },
    {
      name: "Urban Cityscape",
      description: "Modern city environment with architecture and street life",
      usageOccasions: ["city-driving", "commute", "urban-lifestyle", "modern"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Mountain Adventure",
      description: "Dramatic mountain roads, epic landscapes, adventure spirit",
      usageOccasions: ["adventure", "off-road", "exploration", "weekend"],
      culturalRelevance: ["universal"],
      seasonalFit: ["summer", "autumn"]
    },
    {
      name: "Coastal Drive",
      description: "Scenic coastal road with ocean views, freedom feeling",
      usageOccasions: ["vacation", "leisure", "scenic", "premium"],
      culturalRelevance: ["mediterranean", "california", "universal"],
      seasonalFit: ["summer", "spring"]
    },
    {
      name: "Premium Showroom",
      description: "Elegant showroom environment with perfect lighting",
      usageOccasions: ["launch", "premium", "new-model", "luxury"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Family Moments",
      description: "Family activities, school runs, weekend adventures",
      usageOccasions: ["family", "practical", "everyday", "safety"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Professional Workshop",
      description: "Clean professional garage, expert technicians at work",
      usageOccasions: ["service", "maintenance", "repair", "professional"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Racing Circuit",
      description: "Professional racing track, performance testing, speed",
      usageOccasions: ["performance", "racing", "sport", "competition"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Charging Station Future",
      description: "Modern EV charging infrastructure, sustainable future",
      usageOccasions: ["electric", "sustainable", "future", "technology"],
      culturalRelevance: ["universal", "european", "asian"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Night City Lights",
      description: "City at night with neon lights, reflections, urban energy",
      usageOccasions: ["night-driving", "urban", "modern", "lifestyle"],
      culturalRelevance: ["universal", "asian"],
      seasonalFit: ["all-seasons"]
    }
  ],

  colorPalettes: [
    {
      name: "Premium Metallic",
      description: "Sophisticated metallic tones for luxury vehicles",
      colors: ["#1C1C1C", "#4A4A4A", "#C0C0C0", "#D4AF37", "#FFFFFF"],
      bestFor: ["luxury", "premium", "executive", "sedan"],
      mood: "sophisticated, elegant, premium, exclusive",
      brandIntegration: 85
    },
    {
      name: "Sport Performance",
      description: "Bold, energetic colors for sports and performance",
      colors: ["#FF0000", "#000000", "#FFFFFF", "#FFD700", "#1E90FF"],
      bestFor: ["sports-cars", "performance", "racing", "dynamic"],
      mood: "powerful, exciting, dynamic, aggressive",
      brandIntegration: 75
    },
    {
      name: "Electric Future",
      description: "Clean, futuristic palette for electric vehicles",
      colors: ["#00D4FF", "#00FF88", "#FFFFFF", "#E8E8E8", "#1A1A2E"],
      bestFor: ["electric-vehicles", "hybrid", "sustainable", "tech"],
      mood: "innovative, clean, futuristic, sustainable",
      brandIntegration: 80
    },
    {
      name: "Adventure Earth",
      description: "Rugged earth tones for SUV and off-road",
      colors: ["#5D4E37", "#8B7355", "#2F4F4F", "#556B2F", "#D2B48C"],
      bestFor: ["SUV", "off-road", "adventure", "outdoor"],
      mood: "rugged, adventurous, natural, capable",
      brandIntegration: 70
    },
    {
      name: "Urban Modern",
      description: "Contemporary urban palette for city vehicles",
      colors: ["#2C3E50", "#34495E", "#95A5A6", "#ECF0F1", "#E74C3C"],
      bestFor: ["city-cars", "compact", "urban", "modern"],
      mood: "modern, urban, practical, stylish",
      brandIntegration: 75
    },
    {
      name: "Classic Heritage",
      description: "Timeless colors for classic and heritage vehicles",
      colors: ["#8B0000", "#006400", "#000080", "#F5F5DC", "#D4AF37"],
      bestFor: ["classic", "heritage", "vintage", "collector"],
      mood: "timeless, elegant, nostalgic, prestigious",
      brandIntegration: 80
    },
    {
      name: "Family Trust",
      description: "Warm, trustworthy colors for family vehicles",
      colors: ["#4169E1", "#228B22", "#F5F5F5", "#708090", "#FFD700"],
      bestFor: ["family-cars", "minivan", "safety", "practical"],
      mood: "trustworthy, safe, reliable, friendly",
      brandIntegration: 70
    },
    {
      name: "Night Drive",
      description: "Dark, atmospheric palette for night photography",
      colors: ["#0D0D0D", "#1A1A2E", "#16213E", "#0F3460", "#E94560"],
      bestFor: ["night-shots", "urban-night", "dramatic", "moody"],
      mood: "mysterious, dramatic, urban, sophisticated",
      brandIntegration: 75
    }
  ],

  frameworks: [
    {
      name: "Performance Storytelling",
      structure: "Power → Control → Freedom → Achievement",
      application: "Communique la puissance et le contrôle à travers des visuels dynamiques",
      bestFor: ["sports-cars", "performance", "racing"]
    },
    {
      name: "Journey Narrative",
      structure: "Departure → Discovery → Experience → Destination",
      application: "Raconte l'histoire du voyage et de l'aventure",
      bestFor: ["SUV", "family", "adventure", "road-trip"]
    },
    {
      name: "Innovation Showcase",
      structure: "Problem → Technology → Solution → Future",
      application: "Met en avant l'innovation technologique et la vision future",
      bestFor: ["electric-vehicles", "tech-features", "safety", "autonomous"]
    },
    {
      name: "Craftsmanship Heritage",
      structure: "Heritage → Expertise → Detail → Excellence",
      application: "Valorise le savoir-faire et l'héritage de la marque",
      bestFor: ["luxury", "premium", "heritage", "craftsmanship"]
    }
  ],

  lightingSetups: [
    {
      name: "Golden Hour Hero",
      timeOfDay: "Golden hour (1h before sunset)",
      characteristics: "Warm backlight, rim lighting, dramatic shadows",
      mood: "Cinematic, aspirational, premium, dramatic",
      technicalDetails: "Backlit at 45°, reflector for fill, polarizer to control reflections"
    },
    {
      name: "Studio Light Painting",
      timeOfDay: "Any (controlled studio)",
      characteristics: "Multiple exposures, controlled highlights, perfect reflections",
      mood: "Pristine, showroom, luxurious, perfect",
      technicalDetails: "Long exposure, moving light source, multiple layers composited"
    },
    {
      name: "Overcast Soft Light",
      timeOfDay: "Overcast day",
      characteristics: "Even, soft, no harsh shadows, true colors",
      mood: "Clean, accurate, professional, balanced",
      technicalDetails: "Natural diffused light, minimal post-processing needed"
    },
    {
      name: "Night City Ambient",
      timeOfDay: "Blue hour to night",
      characteristics: "City lights, neon reflections, atmospheric",
      mood: "Urban, modern, dramatic, atmospheric",
      technicalDetails: "Long exposure, tripod, multiple light sources, HDR"
    }
  ],

  bestPractices: [
    "Always show vehicle in pristine, clean condition",
    "Use low angles to emphasize power and presence",
    "Include environmental context that matches target audience lifestyle",
    "Highlight key design elements and unique features",
    "Show vehicle in motion for dynamic energy",
    "Use reflections strategically to show form and lines",
    "Include human scale reference when appropriate",
    "Emphasize technology features through detail shots",
    "Match lighting mood to vehicle positioning (luxury=dramatic, family=warm)",
    "Show interior details for premium and tech-focused vehicles"
  ],

  avoidances: [
    "Avoid dirty or damaged vehicles in hero shots",
    "Don't show vehicles in unsafe or illegal driving situations",
    "Avoid cluttered backgrounds that distract from the vehicle",
    "Don't use harsh midday lighting that creates unflattering shadows",
    "Avoid showing competitors' vehicles in frame",
    "Don't exaggerate vehicle size or proportions unrealistically",
    "Avoid dated styling or locations that age the content",
    "Don't show empty or lifeless environments for lifestyle shots",
    "Avoid technical jargon without visual explanation",
    "Don't neglect the emotional connection in favor of specs only"
  ]
};
