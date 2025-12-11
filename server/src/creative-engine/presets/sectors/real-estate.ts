/**
 * 🏠 REAL ESTATE - PRESETS SECTORIELS
 * 
 * Presets créatifs ultra-spécialisés pour le secteur Immobilier
 * Qualité Cannes Lions garantie
 * 
 * Catégories couvertes:
 * - Vente immobilière
 * - Location immobilière
 * - Gestion locative
 * - Promotion immobilière
 * - Immobilier commercial
 * - Immobilier industriel
 * - Expertise immobilière
 * - Syndic de copropriété
 * - Investissement immobilier
 * - Immobilier de luxe
 * - Logement social
 * - Proptech
 */

import { SectorPreset } from '../types';

export const REAL_ESTATE_PRESET: SectorPreset = {
  sector: 'real-estate',
  displayName: 'Immobilier',

  photographicStyles: [
    {
      name: "Luxury Property Showcase",
      category: "Architectural Photography",
      reference: "Sotheby's, Christie's Real Estate campaigns",
      lighting: "Golden hour, dramatic, luxurious, architectural",
      composition: "Stunning architecture, premium finishes, aspirational views",
      mood: "Luxurious, aspirational, exclusive, prestigious",
      technicalSpecs: "16-35mm f/2.8, ISO 100, golden hour, tilt-shift",
      bestFor: ["luxury", "premium", "high-end", "exclusive"],
      cannesLionsScore: 94
    },
    {
      name: "Bright & Airy Interiors",
      category: "Interior Photography",
      reference: "Architectural Digest, Elle Décor",
      lighting: "Bright natural light, airy, spacious feel",
      composition: "Open spaces, natural light, lifestyle appeal",
      mood: "Bright, spacious, welcoming, livable",
      technicalSpecs: "24mm f/4, ISO 200, HDR, natural light",
      bestFor: ["residential", "apartments", "homes", "lifestyle"],
      cannesLionsScore: 90
    },
    {
      name: "Lifestyle Home Living",
      category: "Lifestyle Photography",
      reference: "Real estate lifestyle campaigns",
      lighting: "Warm, natural, lived-in, authentic",
      composition: "Family moments, home life, emotional connection",
      mood: "Warm, welcoming, family-oriented, aspirational",
      technicalSpecs: "35mm f/1.8, ISO 400, natural light, lifestyle",
      bestFor: ["family-homes", "lifestyle", "emotional", "residential"],
      cannesLionsScore: 89
    },
    {
      name: "Commercial Excellence",
      category: "Commercial Photography",
      reference: "CBRE, JLL commercial campaigns",
      lighting: "Professional, clean, business-focused",
      composition: "Modern offices, commercial spaces, professional environments",
      mood: "Professional, modern, efficient, business-ready",
      technicalSpecs: "24mm f/4, ISO 200, controlled lighting, architectural",
      bestFor: ["commercial", "office", "business", "corporate"],
      cannesLionsScore: 87
    },
    {
      name: "New Development Vision",
      category: "Architectural/CGI Photography",
      reference: "Property development campaigns",
      lighting: "Idealized, aspirational, future-focused",
      composition: "Architectural renders, future vision, development potential",
      mood: "Visionary, aspirational, modern, innovative",
      technicalSpecs: "CGI rendering, architectural visualization, lifestyle",
      bestFor: ["new-development", "off-plan", "promotion", "vision"],
      cannesLionsScore: 88
    },
    {
      name: "Neighborhood & Location",
      category: "Lifestyle/Location Photography",
      reference: "Location-focused real estate",
      lighting: "Natural, authentic, neighborhood feel",
      composition: "Local amenities, neighborhood life, community",
      mood: "Community, convenient, connected, livable",
      technicalSpecs: "35mm f/2.8, ISO 400, natural light, documentary",
      bestFor: ["location", "neighborhood", "community", "amenities"],
      cannesLionsScore: 86
    },
    {
      name: "Investment Opportunity",
      category: "Corporate/Financial Photography",
      reference: "Real estate investment campaigns",
      lighting: "Professional, trustworthy, data-focused",
      composition: "Growth charts, property portfolios, ROI visuals",
      mood: "Professional, trustworthy, growth-oriented, analytical",
      technicalSpecs: "50mm f/2.8, ISO 200, corporate lighting, data",
      bestFor: ["investment", "portfolio", "ROI", "financial"],
      cannesLionsScore: 85
    },
    {
      name: "Proptech Innovation",
      category: "Tech/Real Estate Photography",
      reference: "Proptech and real estate tech campaigns",
      lighting: "Modern, clean, tech-forward",
      composition: "Digital tools, virtual tours, tech integration",
      mood: "Innovative, modern, convenient, digital",
      technicalSpecs: "35mm f/1.8, ISO 400, screen lighting, tech",
      bestFor: ["proptech", "digital", "virtual-tours", "innovation"],
      cannesLionsScore: 87
    },
    {
      name: "Twilight Exterior",
      category: "Architectural Photography",
      reference: "Premium real estate photography",
      lighting: "Blue hour, dramatic, warm interior glow",
      composition: "Exterior at twilight, warm lights, inviting",
      mood: "Dramatic, inviting, premium, atmospheric",
      technicalSpecs: "24mm f/8, ISO 100, blue hour, HDR",
      bestFor: ["exterior", "premium", "dramatic", "showcase"],
      cannesLionsScore: 92
    },
    {
      name: "Aerial & Drone",
      category: "Aerial Photography",
      reference: "Drone real estate photography",
      lighting: "Natural, comprehensive, scale-showing",
      composition: "Aerial views, property context, surroundings",
      mood: "Comprehensive, impressive, contextual, expansive",
      technicalSpecs: "Drone, wide angle, ISO 100, aerial",
      bestFor: ["aerial", "land", "estates", "context"],
      cannesLionsScore: 89
    }
  ],

  contexts: [
    {
      name: "Luxury Villa",
      description: "Stunning luxury villa with premium amenities",
      usageOccasions: ["luxury", "villa", "premium", "exclusive"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Modern Apartment",
      description: "Contemporary urban apartment living",
      usageOccasions: ["apartment", "urban", "modern", "city"],
      culturalRelevance: ["urban"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Family Home",
      description: "Comfortable family home with garden",
      usageOccasions: ["family", "home", "suburban", "garden"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Commercial Office",
      description: "Modern commercial office space",
      usageOccasions: ["commercial", "office", "business", "corporate"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "New Development Site",
      description: "New construction or development project",
      usageOccasions: ["development", "new-build", "construction", "project"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Vibrant Neighborhood",
      description: "Attractive neighborhood with local amenities",
      usageOccasions: ["neighborhood", "location", "community", "amenities"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Investment Property",
      description: "Property with investment potential",
      usageOccasions: ["investment", "rental", "portfolio", "ROI"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Waterfront Property",
      description: "Property with water views or access",
      usageOccasions: ["waterfront", "views", "premium", "lifestyle"],
      culturalRelevance: ["coastal"],
      seasonalFit: ["summer", "spring"]
    },
    {
      name: "Historic Property",
      description: "Character property with historic features",
      usageOccasions: ["historic", "character", "heritage", "unique"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Eco-Friendly Home",
      description: "Sustainable, eco-friendly property",
      usageOccasions: ["eco", "sustainable", "green", "modern"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    }
  ],

  colorPalettes: [
    {
      name: "Luxury Gold",
      description: "Sophisticated palette for luxury properties",
      colors: ["#1A1A1A", "#D4AF37", "#FFFFFF", "#F5F5F5", "#8B7355"],
      bestFor: ["luxury", "premium", "exclusive", "high-end"],
      mood: "luxurious, sophisticated, exclusive, prestigious",
      brandIntegration: 90
    },
    {
      name: "Modern Clean",
      description: "Clean, modern palette for contemporary properties",
      colors: ["#FFFFFF", "#F5F5F5", "#333333", "#0066CC", "#E8E8E8"],
      bestFor: ["modern", "contemporary", "clean", "minimalist"],
      mood: "modern, clean, spacious, fresh",
      brandIntegration: 85
    },
    {
      name: "Warm Home",
      description: "Warm palette for family homes",
      colors: ["#8B4513", "#D2B48C", "#FFFFFF", "#FFF8DC", "#2D3436"],
      bestFor: ["family", "home", "warm", "welcoming"],
      mood: "warm, welcoming, comfortable, homey",
      brandIntegration: 80
    },
    {
      name: "Corporate Professional",
      description: "Professional palette for commercial properties",
      colors: ["#003366", "#0066CC", "#FFFFFF", "#F5F7FA", "#333333"],
      bestFor: ["commercial", "office", "corporate", "professional"],
      mood: "professional, trustworthy, corporate, business",
      brandIntegration: 85
    },
    {
      name: "Eco Green",
      description: "Sustainable palette for eco-friendly properties",
      colors: ["#228B22", "#90EE90", "#FFFFFF", "#F0FFF0", "#2F4F4F"],
      bestFor: ["eco", "sustainable", "green", "natural"],
      mood: "sustainable, natural, fresh, eco-friendly",
      brandIntegration: 80
    },
    {
      name: "Urban Chic",
      description: "Trendy palette for urban properties",
      colors: ["#2C3E50", "#34495E", "#FFFFFF", "#ECF0F1", "#E74C3C"],
      bestFor: ["urban", "trendy", "city", "modern"],
      mood: "urban, trendy, modern, stylish",
      brandIntegration: 80
    },
    {
      name: "Investment Trust",
      description: "Trustworthy palette for investment properties",
      colors: ["#1E3A5F", "#3B82F6", "#FFFFFF", "#F8FAFC", "#0F172A"],
      bestFor: ["investment", "trust", "financial", "growth"],
      mood: "trustworthy, professional, growth, reliable",
      brandIntegration: 85
    },
    {
      name: "Coastal Blue",
      description: "Fresh palette for waterfront properties",
      colors: ["#0077B6", "#00B4D8", "#FFFFFF", "#CAF0F8", "#03045E"],
      bestFor: ["waterfront", "coastal", "beach", "views"],
      mood: "fresh, coastal, relaxing, premium",
      brandIntegration: 80
    }
  ],

  frameworks: [
    {
      name: "Dream Home Journey",
      structure: "Dream → Search → Discover → Home",
      application: "Accompagne le parcours vers la maison idéale",
      bestFor: ["residential", "family", "first-home", "lifestyle"]
    },
    {
      name: "Investment Value",
      structure: "Opportunity → Analysis → Investment → Returns",
      application: "Démontre la valeur d'investissement",
      bestFor: ["investment", "commercial", "portfolio", "ROI"]
    },
    {
      name: "Lifestyle Upgrade",
      structure: "Current → Aspiration → Property → Lifestyle",
      application: "Montre l'amélioration du style de vie",
      bestFor: ["luxury", "upgrade", "premium", "lifestyle"]
    },
    {
      name: "Location Story",
      structure: "Location → Amenities → Community → Life",
      application: "Met en avant l'emplacement et le quartier",
      bestFor: ["location", "neighborhood", "community", "amenities"]
    }
  ],

  lightingSetups: [
    {
      name: "Bright Interior",
      timeOfDay: "Daytime",
      characteristics: "Bright, natural, spacious, welcoming",
      mood: "Bright, spacious, welcoming, livable",
      technicalDetails: "Natural window light, HDR, flash fill, wide angle"
    },
    {
      name: "Golden Hour Exterior",
      timeOfDay: "Golden hour",
      characteristics: "Warm, dramatic, aspirational, premium",
      mood: "Aspirational, warm, premium, inviting",
      technicalDetails: "Golden hour timing, warm tones, architectural angles"
    },
    {
      name: "Twilight Magic",
      timeOfDay: "Blue hour",
      characteristics: "Dramatic, warm interior glow, atmospheric",
      mood: "Dramatic, inviting, premium, atmospheric",
      technicalDetails: "Blue hour, interior lights on, HDR, tripod"
    },
    {
      name: "Lifestyle Natural",
      timeOfDay: "Daytime",
      characteristics: "Natural, authentic, lived-in, warm",
      mood: "Authentic, warm, relatable, lifestyle",
      technicalDetails: "Natural light, candid moments, lifestyle context"
    }
  ],

  bestPractices: [
    "Show properties at their absolute best with proper staging",
    "Use wide-angle lenses to show space without distortion",
    "Include lifestyle elements to help buyers visualize living there",
    "Shoot exteriors at golden hour or twilight for drama",
    "Highlight unique features and selling points",
    "Show the neighborhood and local amenities",
    "Use drone photography for context and scale",
    "Include floor plans and virtual tours where possible",
    "Show properties in all seasons if relevant",
    "Maintain accuracy - don't misrepresent the property"
  ],

  avoidances: [
    "Avoid extreme wide-angle distortion that misrepresents space",
    "Don't show cluttered or poorly staged properties",
    "Avoid harsh midday lighting for exteriors",
    "Don't include personal items that distract",
    "Avoid showing properties in poor weather",
    "Don't use outdated or low-quality photography",
    "Avoid misrepresenting property size or features",
    "Don't neglect curb appeal and exterior shots",
    "Avoid showing neighboring properties in poor condition",
    "Don't use imagery that could be seen as discriminatory"
  ]
};
