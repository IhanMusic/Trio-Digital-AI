/**
 * 🏨 HOSPITALITY & LEISURE - PRESETS SECTORIELS
 * 
 * Presets créatifs ultra-spécialisés pour le secteur Hôtellerie, Restauration et Loisirs
 * Qualité Cannes Lions garantie
 * 
 * Catégories couvertes:
 * - Hôtellerie
 * - Restauration traditionnelle
 * - Restauration rapide
 * - Cafés et bars
 * - Traiteur
 * - Tourisme
 * - Voyages organisés
 * - Loisirs et divertissement
 * - Parcs et jardins
 * - Sports et activités
 * - Hébergement alternatif
 * - Services de conciergerie
 */

import { SectorPreset } from '../types';

export const HOSPITALITY_LEISURE_PRESET: SectorPreset = {
  sector: 'hospitality-leisure',
  displayName: 'Hôtellerie, Restauration & Loisirs',

  photographicStyles: [
    {
      name: "Luxury Hotel Experience",
      category: "Hospitality Photography",
      reference: "Four Seasons, Ritz-Carlton, Aman campaigns",
      lighting: "Golden hour, dramatic, luxurious, warm",
      composition: "Stunning interiors, breathtaking views, premium details",
      mood: "Luxurious, aspirational, exclusive, serene",
      technicalSpecs: "24mm f/2.8, ISO 200, golden hour, architectural",
      bestFor: ["luxury-hotels", "resorts", "premium", "exclusive"],
      cannesLionsScore: 95
    },
    {
      name: "Culinary Excellence",
      category: "Food/Restaurant Photography",
      reference: "Michelin-starred restaurant campaigns",
      lighting: "Dramatic, artistic, appetizing, sophisticated",
      composition: "Artistic plating, chef moments, dining atmosphere",
      mood: "Sophisticated, appetizing, artistic, premium",
      technicalSpecs: "100mm macro f/2.8, ISO 200, controlled lighting, food",
      bestFor: ["fine-dining", "restaurants", "culinary", "gourmet"],
      cannesLionsScore: 93
    },
    {
      name: "Travel Wanderlust",
      category: "Travel Photography",
      reference: "National Geographic, Condé Nast Traveler",
      lighting: "Natural dramatic light, golden hour, epic landscapes",
      composition: "Stunning destinations, cultural moments, adventure",
      mood: "Adventurous, inspiring, wanderlust, authentic",
      technicalSpecs: "16-35mm f/2.8, ISO 400, natural light, travel",
      bestFor: ["tourism", "destinations", "travel", "adventure"],
      cannesLionsScore: 94
    },
    {
      name: "Cozy Café Atmosphere",
      category: "Lifestyle Photography",
      reference: "Starbucks, artisan café campaigns",
      lighting: "Warm, inviting, natural, cozy",
      composition: "Intimate moments, coffee culture, relaxation",
      mood: "Cozy, warm, inviting, relaxed",
      technicalSpecs: "35mm f/1.4, ISO 800, warm ambient light, lifestyle",
      bestFor: ["cafes", "coffee-shops", "casual-dining", "atmosphere"],
      cannesLionsScore: 88
    },
    {
      name: "Fast Casual Energy",
      category: "Food/Lifestyle Photography",
      reference: "Chipotle, Shake Shack campaigns",
      lighting: "Bright, energetic, fresh, appetizing",
      composition: "Fresh ingredients, quick service, modern vibe",
      mood: "Fresh, energetic, modern, accessible",
      technicalSpecs: "35mm f/2.8, ISO 400, bright lighting, dynamic",
      bestFor: ["fast-casual", "quick-service", "modern", "fresh"],
      cannesLionsScore: 86
    },
    {
      name: "Event & Celebration",
      category: "Event Photography",
      reference: "Catering and event campaigns",
      lighting: "Elegant, atmospheric, celebratory",
      composition: "Beautiful setups, celebrations, memorable moments",
      mood: "Celebratory, elegant, memorable, special",
      technicalSpecs: "24-70mm f/2.8, ISO 800, mixed lighting, event",
      bestFor: ["catering", "events", "celebrations", "weddings"],
      cannesLionsScore: 89
    },
    {
      name: "Adventure Activities",
      category: "Action/Lifestyle Photography",
      reference: "Adventure tourism campaigns",
      lighting: "Natural dramatic, action-focused, exciting",
      composition: "Thrilling activities, adventure moments, excitement",
      mood: "Exciting, adventurous, thrilling, active",
      technicalSpecs: "70-200mm f/2.8, ISO 800, action photography, outdoor",
      bestFor: ["adventure", "activities", "sports", "outdoor"],
      cannesLionsScore: 91
    },
    {
      name: "Boutique Charm",
      category: "Hospitality Photography",
      reference: "Boutique hotel campaigns",
      lighting: "Warm, intimate, characterful, unique",
      composition: "Unique details, local character, personal touches",
      mood: "Charming, unique, intimate, authentic",
      technicalSpecs: "35mm f/1.8, ISO 400, warm natural light, detail",
      bestFor: ["boutique-hotels", "B&B", "unique", "character"],
      cannesLionsScore: 90
    },
    {
      name: "Family Fun",
      category: "Lifestyle Photography",
      reference: "Family resort and theme park campaigns",
      lighting: "Bright, cheerful, fun, energetic",
      composition: "Family moments, fun activities, joy",
      mood: "Joyful, fun, family-friendly, exciting",
      technicalSpecs: "24-70mm f/2.8, ISO 400, bright natural light, candid",
      bestFor: ["family", "theme-parks", "resorts", "entertainment"],
      cannesLionsScore: 88
    },
    {
      name: "Wellness Retreat",
      category: "Wellness Photography",
      reference: "Spa and wellness resort campaigns",
      lighting: "Soft, serene, calming, natural",
      composition: "Peaceful settings, wellness moments, relaxation",
      mood: "Serene, peaceful, rejuvenating, balanced",
      technicalSpecs: "50mm f/2, ISO 200, soft natural light, wellness",
      bestFor: ["spa", "wellness", "retreat", "relaxation"],
      cannesLionsScore: 90
    }
  ],

  contexts: [
    {
      name: "Luxury Hotel Suite",
      description: "Stunning luxury hotel room with premium amenities",
      usageOccasions: ["luxury", "hotel", "accommodation", "premium"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Fine Dining Restaurant",
      description: "Elegant restaurant with sophisticated atmosphere",
      usageOccasions: ["fine-dining", "restaurant", "culinary", "special-occasion"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Exotic Beach Destination",
      description: "Stunning tropical beach paradise",
      usageOccasions: ["beach", "tropical", "vacation", "relaxation"],
      culturalRelevance: ["universal"],
      seasonalFit: ["summer", "winter-escape"]
    },
    {
      name: "Mountain Resort",
      description: "Beautiful mountain setting with stunning views",
      usageOccasions: ["mountain", "ski", "adventure", "nature"],
      culturalRelevance: ["universal"],
      seasonalFit: ["winter", "summer"]
    },
    {
      name: "Urban Rooftop Bar",
      description: "Trendy rooftop bar with city views",
      usageOccasions: ["nightlife", "urban", "trendy", "social"],
      culturalRelevance: ["urban"],
      seasonalFit: ["summer", "spring"]
    },
    {
      name: "Cozy Café Interior",
      description: "Warm, inviting café atmosphere",
      usageOccasions: ["café", "coffee", "casual", "relaxation"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Theme Park Adventure",
      description: "Exciting theme park with attractions",
      usageOccasions: ["family", "entertainment", "fun", "adventure"],
      culturalRelevance: ["universal"],
      seasonalFit: ["spring", "summer"]
    },
    {
      name: "Spa & Wellness Center",
      description: "Serene spa environment for relaxation",
      usageOccasions: ["spa", "wellness", "relaxation", "retreat"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Cultural Heritage Site",
      description: "Historic or cultural destination",
      usageOccasions: ["culture", "heritage", "tourism", "discovery"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Outdoor Adventure Setting",
      description: "Natural setting for adventure activities",
      usageOccasions: ["adventure", "outdoor", "activities", "nature"],
      culturalRelevance: ["universal"],
      seasonalFit: ["spring", "summer", "autumn"]
    }
  ],

  colorPalettes: [
    {
      name: "Luxury Gold",
      description: "Sophisticated palette for luxury hospitality",
      colors: ["#1A1A1A", "#D4AF37", "#FFFFFF", "#F5F5F5", "#8B7355"],
      bestFor: ["luxury", "premium", "exclusive", "sophisticated"],
      mood: "luxurious, sophisticated, exclusive, premium",
      brandIntegration: 90
    },
    {
      name: "Tropical Paradise",
      description: "Vibrant palette for beach destinations",
      colors: ["#00CED1", "#FF6B6B", "#FFEAA7", "#FFFFFF", "#2D3436"],
      bestFor: ["beach", "tropical", "resort", "vacation"],
      mood: "vibrant, tropical, relaxing, paradise",
      brandIntegration: 80
    },
    {
      name: "Culinary Warmth",
      description: "Appetizing palette for restaurants",
      colors: ["#8B4513", "#D2691E", "#F4A460", "#FFFFFF", "#2D3436"],
      bestFor: ["restaurant", "food", "culinary", "dining"],
      mood: "appetizing, warm, inviting, delicious",
      brandIntegration: 85
    },
    {
      name: "Mountain Fresh",
      description: "Natural palette for mountain destinations",
      colors: ["#228B22", "#87CEEB", "#FFFFFF", "#F5F5DC", "#2F4F4F"],
      bestFor: ["mountain", "nature", "adventure", "outdoor"],
      mood: "fresh, natural, adventurous, invigorating",
      brandIntegration: 80
    },
    {
      name: "Urban Nightlife",
      description: "Edgy palette for bars and nightlife",
      colors: ["#1A1A2E", "#E94560", "#0F3460", "#FFFFFF", "#16213E"],
      bestFor: ["nightlife", "bars", "urban", "trendy"],
      mood: "edgy, trendy, exciting, urban",
      brandIntegration: 75
    },
    {
      name: "Café Cozy",
      description: "Warm palette for cafés and casual dining",
      colors: ["#6F4E37", "#D2B48C", "#FFFFFF", "#FFF8DC", "#2D3436"],
      bestFor: ["café", "coffee", "casual", "cozy"],
      mood: "cozy, warm, inviting, comfortable",
      brandIntegration: 85
    },
    {
      name: "Family Fun",
      description: "Bright palette for family entertainment",
      colors: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#FFFFFF", "#2D3436"],
      bestFor: ["family", "entertainment", "fun", "theme-parks"],
      mood: "fun, exciting, joyful, energetic",
      brandIntegration: 75
    },
    {
      name: "Wellness Serenity",
      description: "Calming palette for spa and wellness",
      colors: ["#7C9885", "#B8D4C3", "#FFFFFF", "#F5F5F5", "#3D5A4C"],
      bestFor: ["spa", "wellness", "retreat", "relaxation"],
      mood: "serene, calming, peaceful, rejuvenating",
      brandIntegration: 85
    }
  ],

  frameworks: [
    {
      name: "Escape & Discovery",
      structure: "Dream → Discover → Experience → Remember",
      application: "Inspire le voyage et la découverte",
      bestFor: ["travel", "tourism", "destinations", "adventure"]
    },
    {
      name: "Culinary Journey",
      structure: "Appetite → Anticipation → Taste → Satisfaction",
      application: "Crée l'envie et le plaisir culinaire",
      bestFor: ["restaurants", "food", "culinary", "dining"]
    },
    {
      name: "Luxury Experience",
      structure: "Aspiration → Arrival → Indulgence → Memory",
      application: "Communique l'expérience de luxe",
      bestFor: ["luxury", "premium", "exclusive", "high-end"]
    },
    {
      name: "Family Moments",
      structure: "Together → Play → Joy → Memories",
      application: "Capture les moments familiaux précieux",
      bestFor: ["family", "entertainment", "resorts", "activities"]
    }
  ],

  lightingSetups: [
    {
      name: "Golden Hour Magic",
      timeOfDay: "Golden hour",
      characteristics: "Warm, dramatic, romantic, luxurious",
      mood: "Romantic, luxurious, aspirational, magical",
      technicalDetails: "Backlit, warm tones, soft shadows, golden light"
    },
    {
      name: "Cozy Ambient",
      timeOfDay: "Any",
      characteristics: "Warm, intimate, inviting, comfortable",
      mood: "Cozy, warm, inviting, relaxed",
      technicalDetails: "Warm color temperature, soft lighting, ambient sources"
    },
    {
      name: "Bright & Fresh",
      timeOfDay: "Daytime",
      characteristics: "Bright, clean, appetizing, energetic",
      mood: "Fresh, energetic, appetizing, modern",
      technicalDetails: "Natural daylight, bright exposure, clean whites"
    },
    {
      name: "Dramatic Evening",
      timeOfDay: "Evening/Night",
      characteristics: "Atmospheric, dramatic, sophisticated",
      mood: "Sophisticated, dramatic, elegant, atmospheric",
      technicalDetails: "Mixed lighting, warm accents, controlled shadows"
    }
  ],

  bestPractices: [
    "Show authentic experiences, not just facilities",
    "Capture the emotional benefit of the experience",
    "Use diverse representation in all imagery",
    "Show food in its most appetizing state",
    "Include human elements for scale and relatability",
    "Highlight unique selling points and differentiators",
    "Show the destination or venue at its best time",
    "Capture genuine moments of joy and relaxation",
    "Balance aspirational imagery with accessibility",
    "Include seasonal and cultural relevance"
  ],

  avoidances: [
    "Avoid empty, lifeless spaces without human presence",
    "Don't show food that looks unappetizing or cold",
    "Avoid generic stock imagery of smiling tourists",
    "Don't use outdated facilities or decor",
    "Avoid overcrowded or chaotic scenes",
    "Don't show staff in subservient positions",
    "Avoid imagery that misrepresents the actual experience",
    "Don't neglect diversity in guest representation",
    "Avoid weather or lighting that doesn't flatter the venue",
    "Don't use imagery that could be seen as culturally insensitive"
  ]
};
