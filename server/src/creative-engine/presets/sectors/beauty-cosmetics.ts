/**
 * 🎨 CREATIVE ENGINE - PRESET SECTEUR BEAUTÉ & COSMÉTIQUES
 * 
 * Preset ultra-complet pour le secteur Beauté et Bien-être
 * Couvre 87+ catégories : Maquillage, Soins visage, Soins corps, Parapharmacie, Soins capillaires, Parfumerie
 * 
 * Architecture modulaire Cannes Lions 2026
 */

import { SectorPreset, PhotographicStyle, CreativeContext, ColorPalette, CreativeFramework, LightingSetup } from '../types';

/**
 * STYLES PHOTOGRAPHIQUES PROFESSIONNELS
 * Adaptés à toutes les catégories beauté
 */
const PHOTOGRAPHIC_STYLES: PhotographicStyle[] = [
  {
    name: "Clean Beauty Minimalist",
    category: "Beauty Photography",
    reference: "Glossier, The Ordinary aesthetic",
    lighting: "Soft diffused natural light, high-key setup",
    composition: "Minimal backgrounds, product-focused, negative space",
    mood: "Pure, honest, transparent, modern",
    technicalSpecs: "85mm f/2.8, ISO 100, soft box lighting",
    bestFor: ["skincare", "natural cosmetics", "clean beauty", "serums", "moisturizers"],
    cannesLionsScore: 88
  },
  {
    name: "Luxury Spa Ambiance",
    category: "Lifestyle Beauty",
    reference: "La Mer, Sisley campaigns",
    lighting: "Warm golden hour light, candles, ambient glow",
    composition: "Spa setting, natural elements (stones, water, plants)",
    mood: "Luxurious, relaxing, indulgent, premium",
    technicalSpecs: "50mm f/1.8, ISO 400, natural + candle light",
    bestFor: ["luxury skincare", "spa products", "premium cosmetics", "anti-aging"],
    cannesLionsScore: 92
  },
  {
    name: "Clinical Professional",
    category: "Medical Beauty",
    reference: "La Roche-Posay, CeraVe style",
    lighting: "Clean white clinical lighting, no shadows",
    composition: "Laboratory aesthetic, scientific precision",
    mood: "Professional, trustworthy, effective, medical-grade",
    technicalSpecs: "100mm macro f/2.8, ISO 200, ring light",
    bestFor: ["dermatological products", "parapharmacie", "medical skincare", "treatments"],
    cannesLionsScore: 85
  },
  {
    name: "Natural Organic Lifestyle",
    category: "Natural Beauty",
    reference: "Weleda, Dr. Hauschka aesthetic",
    lighting: "Soft natural daylight, outdoor settings",
    composition: "Natural ingredients visible, botanical elements",
    mood: "Authentic, eco-friendly, wholesome, pure",
    technicalSpecs: "50mm f/2.0, ISO 200, natural window light",
    bestFor: ["organic cosmetics", "natural ingredients", "eco-beauty", "botanical skincare"],
    cannesLionsScore: 87
  },
  {
    name: "K-Beauty Aesthetic",
    category: "Asian Beauty",
    reference: "Korean beauty brands style",
    lighting: "Bright, even lighting with soft shadows",
    composition: "Cute packaging focus, pastel backgrounds, playful",
    mood: "Fresh, youthful, innovative, fun",
    technicalSpecs: "50mm f/2.8, ISO 100, LED panel lighting",
    bestFor: ["sheet masks", "cushion compacts", "asian beauty", "innovative products"],
    cannesLionsScore: 86
  },
  {
    name: "Glamour Editorial",
    category: "Makeup Photography",
    reference: "Vogue Beauty, high-fashion editorials",
    lighting: "Dramatic side lighting, beauty dish",
    composition: "Close-up beauty shots, makeup application focus",
    mood: "Glamorous, sophisticated, high-fashion, bold",
    technicalSpecs: "85mm f/1.4, ISO 100, beauty dish + reflector",
    bestFor: ["makeup", "lipstick", "foundation", "mascara", "luxury cosmetics"],
    cannesLionsScore: 94
  },
  {
    name: "Lifestyle Authentic",
    category: "Real Life Beauty",
    reference: "Dove, Nivea campaigns",
    lighting: "Natural home lighting, realistic settings",
    composition: "Real people, everyday moments, relatable",
    mood: "Authentic, inclusive, real, empowering",
    technicalSpecs: "35mm f/1.8, ISO 400, available light",
    bestFor: ["mass market cosmetics", "body care", "family products", "daily skincare"],
    cannesLionsScore: 83
  },
  {
    name: "Macro Detail Beauty",
    category: "Product Detail",
    reference: "High-end product photography",
    lighting: "Controlled studio lighting, focus on texture",
    composition: "Extreme close-up, texture and detail emphasis",
    mood: "Luxurious, detailed, premium, sensorial",
    technicalSpecs: "100mm macro f/2.8, ISO 100, macro ring flash",
    bestFor: ["texture showcase", "ingredient close-ups", "premium products", "serums"],
    cannesLionsScore: 89
  },
  {
    name: "Perfume Luxury",
    category: "Fragrance Photography",
    reference: "Chanel, Dior perfume campaigns",
    lighting: "Dramatic backlighting, glass reflections",
    composition: "Bottle as sculpture, artistic shadows, elegant",
    mood: "Mysterious, luxurious, sensual, artistic",
    technicalSpecs: "85mm f/2.0, ISO 100, backlight + reflectors",
    bestFor: ["perfumes", "fragrances", "luxury scents", "eau de parfum"],
    cannesLionsScore: 95
  },
  {
    name: "Fresh Morning Routine",
    category: "Lifestyle Beauty",
    reference: "Instagram beauty influencers",
    lighting: "Bright morning natural light, fresh atmosphere",
    composition: "Bathroom counter, morning ritual, organized",
    mood: "Fresh, energizing, organized, aspirational",
    technicalSpecs: "35mm f/2.0, ISO 200, natural window light",
    bestFor: ["morning skincare", "cleansers", "toners", "daily routine products"],
    cannesLionsScore: 84
  }
];

/**
 * CONTEXTES CRÉATIFS
 * Scènes et ambiances pour la beauté
 */
const CREATIVE_CONTEXTS: CreativeContext[] = [
  {
    name: "Morning Skincare Ritual",
    description: "Bright bathroom, morning light, fresh start of the day",
    usageOccasions: ["morning routine", "cleansing", "day cream", "sun protection"],
    culturalRelevance: ["universal"],
    seasonalFit: ["all-seasons"]
  },
  {
    name: "Evening Self-Care",
    description: "Cozy bedroom, soft lighting, relaxation time",
    usageOccasions: ["night routine", "makeup removal", "night cream", "masks"],
    culturalRelevance: ["universal"],
    seasonalFit: ["all-seasons"]
  },
  {
    name: "Spa Wellness Experience",
    description: "Luxurious spa setting with natural elements",
    usageOccasions: ["treatments", "masks", "luxury skincare", "relaxation"],
    culturalRelevance: ["universal"],
    seasonalFit: ["all-seasons"]
  },
  {
    name: "Professional Makeup Application",
    description: "Makeup studio, professional lighting, beauty chair",
    usageOccasions: ["makeup", "foundation", "lipstick", "professional products"],
    culturalRelevance: ["universal"],
    seasonalFit: ["all-seasons"]
  },
  {
    name: "Natural Outdoor Beauty",
    description: "Outdoor natural setting, botanical elements",
    usageOccasions: ["natural products", "organic cosmetics", "eco-beauty"],
    culturalRelevance: ["universal"],
    seasonalFit: ["spring", "summer"]
  },
  {
    name: "Bathroom Vanity Organized",
    description: "Clean organized bathroom counter with beauty products",
    usageOccasions: ["daily routine", "organization", "product display"],
    culturalRelevance: ["universal"],
    seasonalFit: ["all-seasons"]
  },
  {
    name: "Luxury Dressing Table",
    description: "Elegant vanity with mirror, luxury products displayed",
    usageOccasions: ["luxury cosmetics", "perfumes", "premium skincare"],
    culturalRelevance: ["universal"],
    seasonalFit: ["all-seasons"]
  },
  {
    name: "Beach Summer Glow",
    description: "Beach setting, sun protection, summer vibes",
    usageOccasions: ["sun protection", "summer skincare", "waterproof makeup"],
    culturalRelevance: ["universal"],
    seasonalFit: ["summer"]
  },
  {
    name: "Winter Cocooning",
    description: "Cozy indoor setting, rich textures, warmth",
    usageOccasions: ["rich creams", "nourishing products", "winter care"],
    culturalRelevance: ["universal"],
    seasonalFit: ["winter"]
  },
  {
    name: "Gym Fresh Post-Workout",
    description: "Gym locker room, fresh after workout",
    usageOccasions: ["shower products", "deodorants", "quick skincare"],
    culturalRelevance: ["universal"],
    seasonalFit: ["all-seasons"]
  }
];

/**
 * PALETTES DE COULEURS
 * Adaptées aux différents types de produits beauté
 */
const COLOR_PALETTES: ColorPalette[] = [
  {
    name: "Soft Pastels",
    description: "Gentle pastel tones for feminine beauty",
    colors: ["#FFE5E5", "#E5F3FF", "#FFF5E5", "#F5E5FF"],
    bestFor: ["skincare", "gentle products", "feminine beauty", "K-beauty"],
    mood: "Soft, gentle, feminine, delicate"
  },
  {
    name: "Luxury Gold & Cream",
    description: "Premium gold accents with cream backgrounds",
    colors: ["#D4AF37", "#F5F5DC", "#8B7355", "#FFFFFF"],
    bestFor: ["luxury skincare", "anti-aging", "premium cosmetics", "perfumes"],
    mood: "Luxurious, premium, elegant, sophisticated"
  },
  {
    name: "Clinical White",
    description: "Clean white and light blue for medical beauty",
    colors: ["#FFFFFF", "#F0F8FF", "#E6F3FF", "#D4E9FF"],
    bestFor: ["dermatological", "parapharmacie", "medical skincare", "clinical"],
    mood: "Clean, professional, trustworthy, medical"
  },
  {
    name: "Natural Earth Tones",
    description: "Organic earth colors for natural beauty",
    colors: ["#8B7355", "#A0826D", "#C9B99B", "#E8DCC4"],
    bestFor: ["organic cosmetics", "natural ingredients", "eco-beauty", "botanical"],
    mood: "Natural, organic, authentic, earthy"
  },
  {
    name: "Bold Makeup Colors",
    description: "Vibrant colors for makeup products",
    colors: ["#FF1744", "#D500F9", "#2979FF", "#00E676"],
    bestFor: ["lipstick", "eyeshadow", "nail polish", "bold makeup"],
    mood: "Bold, vibrant, expressive, creative"
  },
  {
    name: "Fresh Morning Light",
    description: "Bright fresh colors for morning products",
    colors: ["#FFF9E6", "#E6F7FF", "#F0FFF0", "#FFFACD"],
    bestFor: ["morning skincare", "cleansers", "energizing products", "vitamin C"],
    mood: "Fresh, energizing, bright, awakening"
  },
  {
    name: "Evening Indigo",
    description: "Deep calming colors for night products",
    colors: ["#2C3E50", "#34495E", "#5D6D7E", "#85929E"],
    bestFor: ["night creams", "sleeping masks", "evening routine", "relaxation"],
    mood: "Calming, relaxing, deep, restorative"
  },
  {
    name: "Rose Gold Elegance",
    description: "Trendy rose gold for modern beauty",
    colors: ["#B76E79", "#E8C4C4", "#F5E6E8", "#FFFFFF"],
    bestFor: ["modern cosmetics", "millennial beauty", "trendy products", "Instagram-worthy"],
    mood: "Trendy, elegant, modern, feminine"
  }
];

/**
 * FRAMEWORKS CRÉATIFS
 * Approches narratives pour la beauté
 */
const CREATIVE_FRAMEWORKS: CreativeFramework[] = [
  {
    name: "Before & After Transformation",
    structure: "Show the transformation journey",
    application: "Display visible results, skin improvement, makeup transformation",
    bestFor: ["anti-aging", "treatments", "makeup", "skin improvement products"]
  },
  {
    name: "Ingredient Storytelling",
    structure: "Highlight key natural ingredients",
    application: "Show raw ingredients alongside finished product",
    bestFor: ["natural cosmetics", "organic products", "ingredient-focused brands"]
  },
  {
    name: "Ritual & Routine",
    structure: "Showcase the daily beauty ritual",
    application: "Step-by-step routine, morning or evening ritual",
    bestFor: ["skincare sets", "routine products", "multi-step systems"]
  },
  {
    name: "Sensorial Experience",
    structure: "Emphasize texture, scent, and feel",
    application: "Close-up textures, sensory details, luxurious feel",
    bestFor: ["luxury products", "perfumes", "rich textures", "sensorial products"]
  },
  {
    name: "Science & Innovation",
    structure: "Highlight scientific research and innovation",
    application: "Laboratory aesthetic, scientific proof, clinical results",
    bestFor: ["dermatological", "innovative formulas", "patented ingredients"]
  },
  {
    name: "Inclusive Beauty",
    structure: "Celebrate diversity and inclusivity",
    application: "Diverse skin tones, all ages, real people",
    bestFor: ["foundation ranges", "inclusive brands", "body positive products"]
  }
];

/**
 * SETUPS D'ÉCLAIRAGE PROFESSIONNELS
 */
const LIGHTING_SETUPS: LightingSetup[] = [
  {
    name: "Soft Beauty Light",
    timeOfDay: "Morning",
    characteristics: "Large soft box, diffused light, minimal shadows",
    mood: "Flattering, soft, professional",
    technicalDetails: "Beauty dish + reflector, 45° angle"
  },
  {
    name: "Natural Window Light",
    timeOfDay: "Daytime",
    characteristics: "Soft natural light from large window",
    mood: "Authentic, natural, fresh",
    technicalDetails: "North-facing window, white reflector"
  },
  {
    name: "Dramatic Side Lighting",
    timeOfDay: "Studio",
    characteristics: "Strong side light creating depth and drama",
    mood: "Dramatic, editorial, high-fashion",
    technicalDetails: "Single strobe 90° side, black flag opposite"
  },
  {
    name: "High-Key Clinical",
    timeOfDay: "Studio",
    characteristics: "Bright even lighting, no shadows, pure white",
    mood: "Clean, clinical, professional",
    technicalDetails: "Multiple soft boxes, white seamless background"
  },
  {
    name: "Golden Hour Glow",
    timeOfDay: "Sunset",
    characteristics: "Warm golden light, soft shadows",
    mood: "Warm, glowing, luxurious",
    technicalDetails: "Natural sunset light + gold reflector"
  },
  {
    name: "Backlit Perfume",
    timeOfDay: "Studio",
    characteristics: "Strong backlight through glass, creating glow",
    mood: "Mysterious, luxurious, artistic",
    technicalDetails: "Backlight + colored gels, low front fill"
  }
];

/**
 * BEST PRACTICES
 * Recommandations pour la photographie beauté
 */
const BEST_PRACTICES: string[] = [
  "Always show product texture and finish clearly",
  "Use models with diverse skin tones for inclusive representation",
  "Highlight key ingredients visually when relevant",
  "Maintain brand color consistency in all visuals",
  "Show products in realistic usage contexts",
  "Emphasize sensorial aspects (texture, glow, smoothness)",
  "Use clean, uncluttered backgrounds for product focus",
  "Include lifestyle elements to create aspiration",
  "Show before/after results when applicable",
  "Respect skin retouching ethics - keep it natural",
  "Display packaging clearly for brand recognition",
  "Use appropriate lighting for product category (soft for skincare, dramatic for makeup)",
  "Include natural elements for organic/natural products",
  "Show product application when relevant",
  "Create aspirational yet achievable beauty standards"
];

/**
 * AVOIDANCES
 * Ce qu'il faut éviter dans la photographie beauté
 */
const AVOIDANCES: string[] = [
  "Over-retouched skin that looks unrealistic",
  "Harsh shadows on face or product",
  "Cluttered backgrounds that distract from product",
  "Inconsistent lighting across product range",
  "Showing products in unflattering angles",
  "Using only one skin tone for diverse product ranges",
  "Ignoring texture and finish of products",
  "Dark or muddy colors for fresh skincare",
  "Overly clinical look for luxury products",
  "Overly glamorous look for medical/dermatological products",
  "Hiding product packaging or brand identity",
  "Using outdated beauty standards",
  "Showing products in unrealistic quantities",
  "Neglecting to show product benefits visually",
  "Creating unattainable beauty standards"
];

/**
 * EXPORT DU PRESET COMPLET
 */
export const BEAUTY_COSMETICS_PRESET: SectorPreset = {
  sector: 'beauty-cosmetics',
  displayName: 'Beauté et Bien-être',
  photographicStyles: PHOTOGRAPHIC_STYLES,
  contexts: CREATIVE_CONTEXTS,
  colorPalettes: COLOR_PALETTES,
  frameworks: CREATIVE_FRAMEWORKS,
  lightingSetups: LIGHTING_SETUPS,
  bestPractices: BEST_PRACTICES,
  avoidances: AVOIDANCES
};

export default BEAUTY_COSMETICS_PRESET;
