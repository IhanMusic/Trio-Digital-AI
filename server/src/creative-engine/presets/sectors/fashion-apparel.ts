/**
 * 🎨 CREATIVE ENGINE - PRESET SECTEUR MODE & LUXE
 * 
 * Preset ultra-complet pour le secteur Mode et Luxe
 * Couvre 13 catégories : Prêt-à-porter, Lingerie, Chaussures, Maroquinerie, Bijouterie, Horlogerie, etc.
 * 
 * Architecture modulaire Cannes Lions 2026
 */

import { SectorPreset, PhotographicStyle, CreativeContext, ColorPalette, CreativeFramework, LightingSetup } from '../types';

/**
 * STYLES PHOTOGRAPHIQUES PROFESSIONNELS
 * Adaptés à toutes les catégories mode
 */
const PHOTOGRAPHIC_STYLES: PhotographicStyle[] = [
  {
    name: "Editorial High Fashion",
    category: "Fashion Photography",
    reference: "Vogue, Harper's Bazaar editorials",
    lighting: "Dramatic studio lighting, strong shadows",
    composition: "Dynamic poses, artistic angles, bold compositions",
    mood: "Sophisticated, artistic, avant-garde, editorial",
    technicalSpecs: "85mm f/1.4, ISO 100, studio strobes",
    bestFor: ["haute couture", "luxury fashion", "designer collections", "editorial campaigns"],
    cannesLionsScore: 95
  },
  {
    name: "Street Style Urban",
    category: "Lifestyle Fashion",
    reference: "Street style photography, urban fashion blogs",
    lighting: "Natural urban light, golden hour preferred",
    composition: "Candid moments, urban backgrounds, authentic",
    mood: "Cool, contemporary, relatable, trendy",
    technicalSpecs: "35mm f/1.8, ISO 400, natural light",
    bestFor: ["streetwear", "casual fashion", "sneakers", "urban apparel"],
    cannesLionsScore: 87
  },
  {
    name: "Luxury Minimalist",
    category: "Luxury Fashion",
    reference: "Celine, Jil Sander campaigns",
    lighting: "Soft even lighting, minimal shadows",
    composition: "Clean backgrounds, product focus, negative space",
    mood: "Elegant, refined, timeless, sophisticated",
    technicalSpecs: "85mm f/2.8, ISO 100, soft box lighting",
    bestFor: ["luxury brands", "minimalist fashion", "premium accessories", "timeless pieces"],
    cannesLionsScore: 93
  },
  {
    name: "Romantic Lifestyle",
    category: "Lifestyle Fashion",
    reference: "Free People, Anthropologie aesthetic",
    lighting: "Soft natural light, dreamy atmosphere",
    composition: "Flowing fabrics, natural settings, movement",
    mood: "Romantic, feminine, dreamy, bohemian",
    technicalSpecs: "50mm f/1.8, ISO 200, natural light",
    bestFor: ["feminine fashion", "dresses", "romantic styles", "bohemian apparel"],
    cannesLionsScore: 85
  },
  {
    name: "Sporty Dynamic",
    category: "Sportswear Photography",
    reference: "Nike, Adidas campaigns",
    lighting: "High-contrast lighting, dynamic shadows",
    composition: "Action shots, movement, energy",
    mood: "Energetic, powerful, athletic, motivating",
    technicalSpecs: "70-200mm f/2.8, ISO 800, fast shutter speed",
    bestFor: ["sportswear", "athletic apparel", "sneakers", "activewear"],
    cannesLionsScore: 88
  },
  {
    name: "Classic Studio Portrait",
    category: "Studio Fashion",
    reference: "Classic fashion photography",
    lighting: "Three-point lighting, professional setup",
    composition: "Full body or 3/4 shots, clean background",
    mood: "Professional, classic, timeless, elegant",
    technicalSpecs: "85mm f/2.0, ISO 100, studio lighting",
    bestFor: ["formal wear", "business attire", "classic fashion", "professional clothing"],
    cannesLionsScore: 82
  },
  {
    name: "Jewelry Macro Luxury",
    category: "Jewelry Photography",
    reference: "Cartier, Tiffany & Co. campaigns",
    lighting: "Precise lighting to enhance sparkle and detail",
    composition: "Extreme close-ups, focus on craftsmanship",
    mood: "Luxurious, precious, detailed, exquisite",
    technicalSpecs: "100mm macro f/2.8, ISO 100, controlled lighting",
    bestFor: ["fine jewelry", "watches", "luxury accessories", "precious stones"],
    cannesLionsScore: 94
  },
  {
    name: "Flat Lay Product",
    category: "Product Photography",
    reference: "Instagram fashion flat lays",
    lighting: "Overhead natural light, even illumination",
    composition: "Bird's eye view, organized layout, styling",
    mood: "Organized, aesthetic, Instagram-worthy, curated",
    technicalSpecs: "50mm f/2.8, ISO 200, overhead natural light",
    bestFor: ["accessories", "shoes", "bags", "product collections"],
    cannesLionsScore: 83
  },
  {
    name: "Vintage Retro",
    category: "Vintage Fashion",
    reference: "Retro fashion campaigns, vintage aesthetics",
    lighting: "Warm tones, film-like quality",
    composition: "Nostalgic settings, vintage props",
    mood: "Nostalgic, timeless, retro, authentic",
    technicalSpecs: "50mm f/1.4, ISO 400, warm color grading",
    bestFor: ["vintage fashion", "retro styles", "second-hand clothing", "classic pieces"],
    cannesLionsScore: 86
  },
  {
    name: "Sustainable Fashion Story",
    category: "Eco Fashion",
    reference: "Patagonia, Stella McCartney campaigns",
    lighting: "Natural outdoor lighting, authentic settings",
    composition: "Natural environments, ethical production focus",
    mood: "Authentic, responsible, natural, conscious",
    technicalSpecs: "35mm f/2.0, ISO 400, natural light",
    bestFor: ["sustainable fashion", "eco-friendly brands", "ethical clothing", "organic materials"],
    cannesLionsScore: 89
  }
];

/**
 * CONTEXTES CRÉATIFS
 * Scènes et ambiances pour la mode
 */
const CREATIVE_CONTEXTS: CreativeContext[] = [
  {
    name: "Urban Street Scene",
    description: "City streets, urban architecture, contemporary setting",
    usageOccasions: ["streetwear", "casual fashion", "urban style", "everyday wear"],
    culturalRelevance: ["universal"],
    seasonalFit: ["all-seasons"]
  },
  {
    name: "Luxury Boutique Interior",
    description: "High-end boutique setting, elegant displays",
    usageOccasions: ["luxury fashion", "premium brands", "designer pieces"],
    culturalRelevance: ["universal"],
    seasonalFit: ["all-seasons"]
  },
  {
    name: "Natural Outdoor Setting",
    description: "Nature, parks, outdoor environments",
    usageOccasions: ["casual wear", "sustainable fashion", "outdoor apparel"],
    culturalRelevance: ["universal"],
    seasonalFit: ["spring", "summer", "autumn"]
  },
  {
    name: "Studio White Background",
    description: "Clean white studio, professional photography setup",
    usageOccasions: ["e-commerce", "product photography", "catalog shots"],
    culturalRelevance: ["universal"],
    seasonalFit: ["all-seasons"]
  },
  {
    name: "Runway Fashion Show",
    description: "Fashion show runway, dramatic lighting",
    usageOccasions: ["haute couture", "designer collections", "fashion week"],
    culturalRelevance: ["universal"],
    seasonalFit: ["all-seasons"]
  },
  {
    name: "Cozy Home Interior",
    description: "Comfortable home setting, intimate atmosphere",
    usageOccasions: ["loungewear", "intimate apparel", "comfortable fashion"],
    culturalRelevance: ["universal"],
    seasonalFit: ["autumn", "winter"]
  },
  {
    name: "Beach Summer Vacation",
    description: "Beach, ocean, summer vacation vibes",
    usageOccasions: ["swimwear", "summer fashion", "resort wear", "vacation style"],
    culturalRelevance: ["universal"],
    seasonalFit: ["summer"]
  },
  {
    name: "Elegant Evening Event",
    description: "Formal event setting, sophisticated atmosphere",
    usageOccasions: ["evening wear", "formal attire", "cocktail dresses", "luxury fashion"],
    culturalRelevance: ["universal"],
    seasonalFit: ["all-seasons"]
  },
  {
    name: "Gym & Fitness Studio",
    description: "Gym environment, athletic setting",
    usageOccasions: ["sportswear", "activewear", "athletic apparel", "fitness fashion"],
    culturalRelevance: ["universal"],
    seasonalFit: ["all-seasons"]
  },
  {
    name: "Vintage Thrift Store",
    description: "Vintage shop, retro atmosphere, second-hand aesthetic",
    usageOccasions: ["vintage fashion", "second-hand clothing", "retro styles"],
    culturalRelevance: ["universal"],
    seasonalFit: ["all-seasons"]
  }
];

/**
 * PALETTES DE COULEURS
 * Adaptées aux différents types de mode
 */
const COLOR_PALETTES: ColorPalette[] = [
  {
    name: "Monochrome Elegance",
    description: "Black, white, and grey tones for timeless elegance",
    colors: ["#000000", "#FFFFFF", "#808080", "#C0C0C0"],
    bestFor: ["luxury fashion", "minimalist style", "formal wear", "timeless pieces"],
    mood: "Elegant, sophisticated, timeless, refined"
  },
  {
    name: "Earth Tones Natural",
    description: "Warm earth colors for sustainable fashion",
    colors: ["#8B7355", "#A0826D", "#C9B99B", "#E8DCC4"],
    bestFor: ["sustainable fashion", "natural materials", "eco-friendly brands", "organic cotton"],
    mood: "Natural, organic, warm, authentic"
  },
  {
    name: "Bold Primary Colors",
    description: "Vibrant primary colors for statement pieces",
    colors: ["#FF0000", "#0000FF", "#FFFF00", "#00FF00"],
    bestFor: ["streetwear", "bold fashion", "statement pieces", "contemporary style"],
    mood: "Bold, energetic, youthful, vibrant"
  },
  {
    name: "Pastel Romantic",
    description: "Soft pastel tones for feminine fashion",
    colors: ["#FFE5E5", "#E5F3FF", "#FFF5E5", "#F5E5FF"],
    bestFor: ["feminine fashion", "romantic styles", "spring collections", "delicate pieces"],
    mood: "Romantic, soft, feminine, dreamy"
  },
  {
    name: "Luxury Gold & Black",
    description: "Premium gold with black for luxury brands",
    colors: ["#D4AF37", "#000000", "#8B7355", "#FFFFFF"],
    bestFor: ["luxury brands", "premium accessories", "jewelry", "high-end fashion"],
    mood: "Luxurious, premium, exclusive, sophisticated"
  },
  {
    name: "Urban Grey Scale",
    description: "Urban grey tones for street style",
    colors: ["#2C3E50", "#34495E", "#7F8C8D", "#BDC3C7"],
    bestFor: ["streetwear", "urban fashion", "contemporary style", "casual wear"],
    mood: "Urban, contemporary, cool, modern"
  },
  {
    name: "Vibrant Sportswear",
    description: "Energetic colors for athletic wear",
    colors: ["#FF6B35", "#00B4D8", "#00FF00", "#FFD700"],
    bestFor: ["sportswear", "activewear", "athletic apparel", "fitness fashion"],
    mood: "Energetic, dynamic, motivating, powerful"
  },
  {
    name: "Vintage Sepia",
    description: "Warm vintage tones for retro fashion",
    colors: ["#8B4513", "#D2691E", "#F4A460", "#FFDEAD"],
    bestFor: ["vintage fashion", "retro styles", "second-hand clothing", "nostalgic pieces"],
    mood: "Nostalgic, vintage, warm, timeless"
  }
];

/**
 * FRAMEWORKS CRÉATIFS
 * Approches narratives pour la mode
 */
const CREATIVE_FRAMEWORKS: CreativeFramework[] = [
  {
    name: "Lifestyle Storytelling",
    structure: "Show the garment in real-life situations",
    application: "Model wearing the piece in authentic settings and activities",
    bestFor: ["casual wear", "everyday fashion", "lifestyle brands", "relatable fashion"]
  },
  {
    name: "Craftsmanship Focus",
    structure: "Highlight the quality and details of construction",
    application: "Close-ups of stitching, materials, craftsmanship details",
    bestFor: ["luxury fashion", "artisanal pieces", "quality focus", "premium brands"]
  },
  {
    name: "Transformation Journey",
    structure: "Show how the piece transforms the wearer",
    application: "Before/after styling, confidence transformation",
    bestFor: ["formal wear", "special occasion fashion", "transformative pieces"]
  },
  {
    name: "Seasonal Collection",
    structure: "Present pieces within seasonal context",
    application: "Seasonal settings, appropriate weather, seasonal activities",
    bestFor: ["seasonal collections", "weather-appropriate fashion", "trend pieces"]
  },
  {
    name: "Heritage & History",
    structure: "Tell the brand's heritage story",
    application: "Historical references, brand legacy, timeless design",
    bestFor: ["heritage brands", "classic fashion", "established labels", "timeless pieces"]
  },
  {
    name: "Sustainability Story",
    structure: "Highlight eco-friendly and ethical aspects",
    application: "Show sustainable materials, ethical production, environmental impact",
    bestFor: ["sustainable fashion", "eco-brands", "ethical clothing", "conscious fashion"]
  }
];

/**
 * SETUPS D'ÉCLAIRAGE PROFESSIONNELS
 */
const LIGHTING_SETUPS: LightingSetup[] = [
  {
    name: "High Fashion Dramatic",
    timeOfDay: "Studio",
    characteristics: "Strong key light, deep shadows, dramatic contrast",
    mood: "Dramatic, editorial, high-fashion",
    technicalDetails: "Single strobe 45° angle, black flag for contrast"
  },
  {
    name: "Natural Golden Hour",
    timeOfDay: "Sunset",
    characteristics: "Warm golden light, soft shadows, natural glow",
    mood: "Romantic, warm, natural, beautiful",
    technicalDetails: "Natural sunset light, reflector for fill"
  },
  {
    name: "Clean Studio Lighting",
    timeOfDay: "Studio",
    characteristics: "Even lighting, minimal shadows, clean look",
    mood: "Professional, clean, commercial",
    technicalDetails: "Two soft boxes 45° angles, white background"
  },
  {
    name: "Urban Street Light",
    timeOfDay: "Daytime",
    characteristics: "Natural urban light, authentic atmosphere",
    mood: "Authentic, urban, contemporary",
    technicalDetails: "Available light, reflector when needed"
  },
  {
    name: "Luxury Boutique Lighting",
    timeOfDay: "Indoor",
    characteristics: "Warm boutique lighting, elegant atmosphere",
    mood: "Luxurious, elegant, sophisticated",
    technicalDetails: "Warm LED panels, accent lighting on products"
  },
  {
    name: "Jewelry Spotlight",
    timeOfDay: "Studio",
    characteristics: "Precise lighting to enhance sparkle and detail",
    mood: "Luxurious, detailed, precious",
    technicalDetails: "Macro ring light + accent lights for sparkle"
  }
];

/**
 * BEST PRACTICES
 * Recommandations pour la photographie mode
 */
const BEST_PRACTICES: string[] = [
  "Show garments on diverse body types and skin tones",
  "Display fabric texture and drape clearly",
  "Include multiple angles for e-commerce shots",
  "Show garments in motion when appropriate",
  "Maintain consistent lighting across collections",
  "Style outfits completely for lifestyle shots",
  "Use appropriate models for target demographic",
  "Show scale and fit accurately",
  "Include close-ups of unique details and craftsmanship",
  "Create aspirational yet achievable styling",
  "Respect cultural sensitivity in fashion representation",
  "Show garments in appropriate seasonal contexts",
  "Highlight sustainable materials when relevant",
  "Use authentic settings for lifestyle photography",
  "Maintain brand aesthetic consistency across all images"
];

/**
 * AVOIDANCES
 * Ce qu'il faut éviter dans la photographie mode
 */
const AVOIDANCES: string[] = [
  "Overly retouched images that misrepresent products",
  "Poor fit or styling that doesn't showcase garments well",
  "Inconsistent lighting across product range",
  "Cluttered backgrounds that distract from clothing",
  "Inappropriate poses that don't suit the garment",
  "Lack of diversity in model representation",
  "Hiding important details or construction",
  "Using only unrealistic body types",
  "Ignoring fabric texture and quality",
  "Poor color accuracy that misrepresents products",
  "Inappropriate styling for target market",
  "Neglecting to show garment versatility",
  "Using dated or cliché fashion photography tropes",
  "Showing garments in unflattering lighting",
  "Creating unattainable or unhealthy body standards"
];

/**
 * EXPORT DU PRESET COMPLET
 */
export const FASHION_APPAREL_PRESET: SectorPreset = {
  sector: 'fashion-apparel',
  displayName: 'Mode et Luxe',
  photographicStyles: PHOTOGRAPHIC_STYLES,
  contexts: CREATIVE_CONTEXTS,
  colorPalettes: COLOR_PALETTES,
  frameworks: CREATIVE_FRAMEWORKS,
  lightingSetups: LIGHTING_SETUPS,
  bestPractices: BEST_PRACTICES,
  avoidances: AVOIDANCES
};

export default FASHION_APPAREL_PRESET;
