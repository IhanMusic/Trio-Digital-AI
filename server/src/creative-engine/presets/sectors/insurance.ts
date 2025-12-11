/**
 * 🛡️ INSURANCE - PRESETS SECTORIELS
 * 
 * Presets créatifs ultra-spécialisés pour le secteur Assurance et Mutuelle
 * Qualité Cannes Lions garantie
 * 
 * Catégories couvertes:
 * - Assurance auto
 * - Assurance habitation
 * - Assurance vie
 * - Assurance santé
 * - Assurance professionnelle
 * - Assurance voyage
 * - Prévoyance
 * - Retraite complémentaire
 * - Épargne
 * - Assurance crédit
 * - Mutuelle santé
 * - Protection juridique
 */

import { SectorPreset } from '../types';

export const INSURANCE_PRESET: SectorPreset = {
  sector: 'insurance',
  displayName: 'Assurance & Mutuelle',

  photographicStyles: [
    {
      name: "Protection & Security",
      category: "Conceptual Photography",
      reference: "Allianz, AXA, Zurich campaigns",
      lighting: "Warm, protective, reassuring, soft",
      composition: "Protection metaphors, family safety, security symbols",
      mood: "Protective, secure, reassuring, trustworthy",
      technicalSpecs: "50mm f/2.8, ISO 200, soft studio light, conceptual",
      bestFor: ["general-insurance", "protection", "security", "family"],
      cannesLionsScore: 89
    },
    {
      name: "Life Moments",
      category: "Lifestyle Photography",
      reference: "Life insurance campaigns",
      lighting: "Warm, natural, emotional, authentic",
      composition: "Family moments, life milestones, precious memories",
      mood: "Emotional, precious, loving, protective",
      technicalSpecs: "35mm f/1.4, ISO 400, natural light, candid moments",
      bestFor: ["life-insurance", "family", "milestones", "protection"],
      cannesLionsScore: 91
    },
    {
      name: "Health & Wellness",
      category: "Healthcare Photography",
      reference: "Health insurance campaigns",
      lighting: "Bright, clean, healthy, optimistic",
      composition: "Healthy lifestyles, medical care, wellness",
      mood: "Healthy, caring, optimistic, supportive",
      technicalSpecs: "35mm f/2.8, ISO 400, bright natural light, lifestyle",
      bestFor: ["health-insurance", "mutuelle", "wellness", "medical"],
      cannesLionsScore: 88
    },
    {
      name: "Home Sweet Home",
      category: "Interior/Lifestyle Photography",
      reference: "Home insurance campaigns",
      lighting: "Warm, cozy, inviting, secure",
      composition: "Beautiful homes, family spaces, security",
      mood: "Cozy, secure, comfortable, protected",
      technicalSpecs: "24mm f/2.8, ISO 400, warm natural light, interior",
      bestFor: ["home-insurance", "property", "family", "security"],
      cannesLionsScore: 87
    },
    {
      name: "On The Road",
      category: "Automotive/Lifestyle Photography",
      reference: "Auto insurance campaigns",
      lighting: "Dynamic, safe, confident, clear",
      composition: "Safe driving, family travel, road confidence",
      mood: "Safe, confident, protected, free",
      technicalSpecs: "24-70mm f/2.8, ISO 400, natural light, automotive",
      bestFor: ["auto-insurance", "travel", "mobility", "safety"],
      cannesLionsScore: 86
    },
    {
      name: "Business Continuity",
      category: "Corporate Photography",
      reference: "Professional insurance campaigns",
      lighting: "Professional, reliable, trustworthy",
      composition: "Business operations, professional settings, continuity",
      mood: "Professional, reliable, secure, supportive",
      technicalSpecs: "50mm f/2.8, ISO 200, corporate lighting, business",
      bestFor: ["professional-insurance", "business", "liability", "corporate"],
      cannesLionsScore: 85
    },
    {
      name: "Travel Adventure",
      category: "Travel Photography",
      reference: "Travel insurance campaigns",
      lighting: "Bright, adventurous, exciting, safe",
      composition: "Travel destinations, adventure, exploration",
      mood: "Adventurous, exciting, protected, free",
      technicalSpecs: "16-35mm f/2.8, ISO 400, natural light, travel",
      bestFor: ["travel-insurance", "adventure", "vacation", "exploration"],
      cannesLionsScore: 88
    },
    {
      name: "Golden Years",
      category: "Lifestyle Photography",
      reference: "Retirement and pension campaigns",
      lighting: "Warm, peaceful, comfortable, secure",
      composition: "Happy retirees, peaceful lifestyle, enjoyment",
      mood: "Peaceful, secure, fulfilled, comfortable",
      technicalSpecs: "50mm f/2, ISO 400, warm natural light, lifestyle",
      bestFor: ["retirement", "pension", "prévoyance", "long-term"],
      cannesLionsScore: 87
    },
    {
      name: "Claims Support",
      category: "Service Photography",
      reference: "Claims and support campaigns",
      lighting: "Supportive, professional, caring",
      composition: "Helpful agents, support moments, resolution",
      mood: "Supportive, caring, professional, helpful",
      technicalSpecs: "35mm f/2.8, ISO 400, soft lighting, service",
      bestFor: ["claims", "support", "service", "assistance"],
      cannesLionsScore: 84
    },
    {
      name: "Digital Insurance",
      category: "Tech/Lifestyle Photography",
      reference: "Insurtech campaigns",
      lighting: "Modern, clean, tech-forward",
      composition: "Mobile apps, digital services, convenience",
      mood: "Modern, convenient, innovative, accessible",
      technicalSpecs: "35mm f/1.8, ISO 400, natural light, tech context",
      bestFor: ["digital", "insurtech", "apps", "modern"],
      cannesLionsScore: 86
    }
  ],

  contexts: [
    {
      name: "Family Home",
      description: "Warm, secure family home environment",
      usageOccasions: ["home-insurance", "family", "security", "comfort"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Medical Facility",
      description: "Modern, clean healthcare environment",
      usageOccasions: ["health-insurance", "medical", "care", "wellness"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Road Journey",
      description: "Safe, scenic road travel environment",
      usageOccasions: ["auto-insurance", "travel", "mobility", "safety"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Business Office",
      description: "Professional business environment",
      usageOccasions: ["professional-insurance", "business", "corporate", "liability"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Travel Destination",
      description: "Exciting travel destination or airport",
      usageOccasions: ["travel-insurance", "vacation", "adventure", "exploration"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Retirement Paradise",
      description: "Peaceful retirement setting",
      usageOccasions: ["retirement", "pension", "prévoyance", "peace"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Customer Service Center",
      description: "Modern, helpful customer service environment",
      usageOccasions: ["claims", "support", "service", "assistance"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Life Milestone",
      description: "Important life moment (wedding, birth, graduation)",
      usageOccasions: ["life-insurance", "milestones", "family", "protection"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Outdoor Activity",
      description: "Active outdoor lifestyle setting",
      usageOccasions: ["health", "wellness", "active", "lifestyle"],
      culturalRelevance: ["universal"],
      seasonalFit: ["spring", "summer"]
    },
    {
      name: "Digital Lifestyle",
      description: "Modern digital-first lifestyle",
      usageOccasions: ["digital", "insurtech", "modern", "convenience"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    }
  ],

  colorPalettes: [
    {
      name: "Trust Blue",
      description: "Classic insurance blue conveying trust and stability",
      colors: ["#003366", "#0066CC", "#FFFFFF", "#F5F7FA", "#1A1A1A"],
      bestFor: ["general-insurance", "trust", "stability", "corporate"],
      mood: "trustworthy, stable, professional, reliable",
      brandIntegration: 90
    },
    {
      name: "Protection Green",
      description: "Protective green palette for security messaging",
      colors: ["#059669", "#10B981", "#FFFFFF", "#ECFDF5", "#1F2937"],
      bestFor: ["protection", "security", "health", "safety"],
      mood: "protective, secure, healthy, safe",
      brandIntegration: 85
    },
    {
      name: "Family Warmth",
      description: "Warm palette for family-focused insurance",
      colors: ["#EA580C", "#F97316", "#FFFFFF", "#FFF7ED", "#1C1917"],
      bestFor: ["family", "life-insurance", "home", "warmth"],
      mood: "warm, loving, protective, family-oriented",
      brandIntegration: 80
    },
    {
      name: "Health Fresh",
      description: "Fresh, clean palette for health insurance",
      colors: ["#0891B2", "#06B6D4", "#FFFFFF", "#ECFEFF", "#164E63"],
      bestFor: ["health", "mutuelle", "wellness", "medical"],
      mood: "fresh, healthy, clean, caring",
      brandIntegration: 85
    },
    {
      name: "Travel Adventure",
      description: "Vibrant palette for travel insurance",
      colors: ["#7C3AED", "#8B5CF6", "#FFFFFF", "#F5F3FF", "#1E1B4B"],
      bestFor: ["travel", "adventure", "vacation", "exploration"],
      mood: "adventurous, exciting, vibrant, free",
      brandIntegration: 75
    },
    {
      name: "Retirement Gold",
      description: "Warm, comfortable palette for retirement",
      colors: ["#92400E", "#D97706", "#FFFFFF", "#FFFBEB", "#1C1917"],
      bestFor: ["retirement", "pension", "prévoyance", "comfort"],
      mood: "warm, comfortable, peaceful, secure",
      brandIntegration: 80
    },
    {
      name: "Auto Dynamic",
      description: "Dynamic palette for auto insurance",
      colors: ["#DC2626", "#EF4444", "#FFFFFF", "#FEF2F2", "#1F2937"],
      bestFor: ["auto", "mobility", "dynamic", "safety"],
      mood: "dynamic, safe, confident, protected",
      brandIntegration: 75
    },
    {
      name: "Digital Modern",
      description: "Modern palette for digital insurance",
      colors: ["#6366F1", "#818CF8", "#FFFFFF", "#EEF2FF", "#1E1B4B"],
      bestFor: ["digital", "insurtech", "modern", "innovative"],
      mood: "modern, innovative, convenient, accessible",
      brandIntegration: 80
    }
  ],

  frameworks: [
    {
      name: "Protection Promise",
      structure: "Risk → Protection → Security → Peace of Mind",
      application: "Communique la promesse de protection et de tranquillité",
      bestFor: ["general-insurance", "protection", "security", "peace"]
    },
    {
      name: "Life Journey",
      structure: "Milestone → Need → Coverage → Confidence",
      application: "Accompagne les moments importants de la vie",
      bestFor: ["life-insurance", "family", "milestones", "long-term"]
    },
    {
      name: "Health Care",
      structure: "Health → Prevention → Care → Recovery",
      application: "Montre le parcours de santé et de bien-être",
      bestFor: ["health-insurance", "mutuelle", "wellness", "medical"]
    },
    {
      name: "Claims Support",
      structure: "Incident → Contact → Support → Resolution",
      application: "Illustre le processus de support et d'assistance",
      bestFor: ["claims", "support", "service", "assistance"]
    }
  ],

  lightingSetups: [
    {
      name: "Warm Protective",
      timeOfDay: "Golden hour/Daytime",
      characteristics: "Warm, soft, protective, reassuring",
      mood: "Protective, warm, secure, comforting",
      technicalDetails: "Natural window light, warm color temperature, soft shadows"
    },
    {
      name: "Clean Healthcare",
      timeOfDay: "Any",
      characteristics: "Bright, clean, healthy, optimistic",
      mood: "Clean, healthy, professional, caring",
      technicalDetails: "Even lighting, bright exposure, clean backgrounds"
    },
    {
      name: "Professional Corporate",
      timeOfDay: "Any (controlled)",
      characteristics: "Even, professional, trustworthy",
      mood: "Professional, trustworthy, reliable, corporate",
      technicalDetails: "Softboxes, fill light, corporate background"
    },
    {
      name: "Lifestyle Natural",
      timeOfDay: "Daytime",
      characteristics: "Natural, authentic, emotional",
      mood: "Authentic, emotional, relatable, human",
      technicalDetails: "Available light, fast lens, candid approach"
    }
  ],

  bestPractices: [
    "Always convey protection and security, not fear",
    "Show real people in relatable situations",
    "Use diverse representation across all demographics",
    "Emphasize peace of mind, not worst-case scenarios",
    "Show the human side of insurance (agents, support)",
    "Use warm, inviting imagery for family products",
    "Highlight digital convenience for modern audiences",
    "Show the positive outcome, not the risk",
    "Include clear visual metaphors for protection",
    "Maintain regulatory compliance in all imagery"
  ],

  avoidances: [
    "Avoid fear-based or anxiety-inducing imagery",
    "Don't show accidents, disasters, or negative events",
    "Avoid cold, impersonal corporate imagery",
    "Don't use generic stock photos of worried people",
    "Avoid complex fine print or legal imagery",
    "Don't show outdated or stereotypical representations",
    "Avoid imagery that excludes any demographic",
    "Don't use imagery that trivializes serious situations",
    "Avoid overly staged or artificial scenarios",
    "Don't neglect the emotional aspect of insurance"
  ]
};
