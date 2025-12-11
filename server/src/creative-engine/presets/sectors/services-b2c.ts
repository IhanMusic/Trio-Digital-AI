/**
 * 👥 SERVICES B2C - PRESETS SECTORIELS
 * 
 * Presets créatifs ultra-spécialisés pour le secteur Services B2C
 * Qualité Cannes Lions garantie
 * 
 * Catégories couvertes:
 * - Services à la personne
 * - Coiffure et esthétique
 * - Réparation
 * - Nettoyage à domicile
 * - Garde d'enfants
 * - Aide aux personnes âgées
 * - Cours particuliers
 * - Services administratifs
 * - Conciergerie
 * - Livraison
 * - Services funéraires
 * - Wedding planning
 */

import { SectorPreset } from '../types';

export const SERVICES_B2C_PRESET: SectorPreset = {
  sector: 'services-b2c',
  displayName: 'Services B2C',

  photographicStyles: [
    {
      name: "Warm Human Connection",
      category: "Lifestyle Photography",
      reference: "Airbnb, Care.com campaigns",
      lighting: "Soft natural light, warm tones, intimate atmosphere",
      composition: "Human interaction, genuine moments, emotional connection",
      mood: "Warm, caring, trustworthy, personal",
      technicalSpecs: "35mm f/1.4, ISO 400, natural light, candid moments",
      bestFor: ["personal-services", "care", "family", "human-connection"],
      cannesLionsScore: 91
    },
    {
      name: "Home Comfort",
      category: "Interior/Lifestyle Photography",
      reference: "IKEA, home service brands",
      lighting: "Bright, airy, natural home lighting",
      composition: "Cozy home environments, family spaces, comfort",
      mood: "Comfortable, homey, welcoming, safe",
      technicalSpecs: "24mm f/2.8, ISO 400, natural light, wide angle",
      bestFor: ["home-services", "cleaning", "repair", "domestic"],
      cannesLionsScore: 87
    },
    {
      name: "Professional Service Excellence",
      category: "Service Photography",
      reference: "Premium service brands",
      lighting: "Clean, professional, flattering",
      composition: "Expert at work, quality service delivery, professionalism",
      mood: "Professional, expert, reliable, quality",
      technicalSpecs: "50mm f/2.8, ISO 200, controlled lighting, service context",
      bestFor: ["professional-services", "expertise", "quality", "premium"],
      cannesLionsScore: 86
    },
    {
      name: "Joyful Moments",
      category: "Lifestyle Photography",
      reference: "Pampers, family brands",
      lighting: "Bright, cheerful, natural light",
      composition: "Happy families, children, joyful interactions",
      mood: "Joyful, happy, loving, family-oriented",
      technicalSpecs: "35mm f/1.8, ISO 400, natural light, candid",
      bestFor: ["childcare", "family-services", "education", "kids"],
      cannesLionsScore: 89
    },
    {
      name: "Elegant Event",
      category: "Event Photography",
      reference: "Wedding and event planners",
      lighting: "Romantic, elegant, atmospheric",
      composition: "Beautiful details, elegant setups, special moments",
      mood: "Elegant, romantic, special, memorable",
      technicalSpecs: "85mm f/1.4, ISO 800, mixed lighting, event style",
      bestFor: ["wedding", "events", "celebrations", "special-occasions"],
      cannesLionsScore: 92
    },
    {
      name: "Beauty Transformation",
      category: "Beauty Photography",
      reference: "Salon and spa brands",
      lighting: "Flattering beauty lighting, soft and even",
      composition: "Before/after, transformation, beauty results",
      mood: "Beautiful, confident, transformed, radiant",
      technicalSpecs: "85mm f/2.8, ISO 200, beauty lighting, portrait",
      bestFor: ["beauty", "salon", "spa", "wellness"],
      cannesLionsScore: 88
    },
    {
      name: "Caring Compassion",
      category: "Healthcare/Care Photography",
      reference: "Senior care, healthcare brands",
      lighting: "Soft, warm, comforting",
      composition: "Caring interactions, dignity, respect, support",
      mood: "Compassionate, caring, dignified, supportive",
      technicalSpecs: "50mm f/2, ISO 400, soft natural light, intimate",
      bestFor: ["elderly-care", "healthcare", "support-services", "compassion"],
      cannesLionsScore: 87
    },
    {
      name: "Educational Excellence",
      category: "Educational Photography",
      reference: "Tutoring and education brands",
      lighting: "Bright, focused, learning environment",
      composition: "Learning moments, achievement, progress",
      mood: "Inspiring, educational, achievement, growth",
      technicalSpecs: "35mm f/2.8, ISO 400, natural light, educational setting",
      bestFor: ["tutoring", "education", "learning", "development"],
      cannesLionsScore: 85
    },
    {
      name: "Convenience & Speed",
      category: "Service Photography",
      reference: "Delivery and convenience brands",
      lighting: "Dynamic, urban, energetic",
      composition: "Fast service, convenience, modern lifestyle",
      mood: "Fast, convenient, modern, efficient",
      technicalSpecs: "24-70mm f/2.8, ISO 800, mixed lighting, dynamic",
      bestFor: ["delivery", "convenience", "fast-service", "urban"],
      cannesLionsScore: 84
    },
    {
      name: "Respectful Dignity",
      category: "Sensitive Service Photography",
      reference: "Funeral and memorial services",
      lighting: "Soft, respectful, dignified",
      composition: "Peaceful, respectful, supportive, dignified",
      mood: "Respectful, peaceful, dignified, supportive",
      technicalSpecs: "50mm f/2.8, ISO 200, soft lighting, respectful",
      bestFor: ["funeral", "memorial", "sensitive-services", "support"],
      cannesLionsScore: 83
    }
  ],

  contexts: [
    {
      name: "Family Home",
      description: "Warm, welcoming family home environment",
      usageOccasions: ["home-services", "family", "domestic", "comfort"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Beauty Salon",
      description: "Modern, stylish salon or spa environment",
      usageOccasions: ["beauty", "salon", "spa", "wellness"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Children's Space",
      description: "Safe, colorful, child-friendly environment",
      usageOccasions: ["childcare", "education", "kids", "family"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Wedding Venue",
      description: "Elegant wedding or event venue",
      usageOccasions: ["wedding", "events", "celebrations", "special"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Senior Living",
      description: "Comfortable, dignified senior care environment",
      usageOccasions: ["elderly-care", "senior", "healthcare", "support"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Learning Environment",
      description: "Focused, inspiring educational setting",
      usageOccasions: ["tutoring", "education", "learning", "development"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Urban Delivery",
      description: "City streets, doorstep delivery, urban convenience",
      usageOccasions: ["delivery", "convenience", "urban", "fast-service"],
      culturalRelevance: ["urban"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Client's Home",
      description: "Service delivery at customer's residence",
      usageOccasions: ["home-services", "repair", "cleaning", "personal"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Outdoor Activity",
      description: "Parks, gardens, outdoor service settings",
      usageOccasions: ["outdoor", "activities", "events", "leisure"],
      culturalRelevance: ["universal"],
      seasonalFit: ["spring", "summer"]
    },
    {
      name: "Peaceful Memorial",
      description: "Respectful, peaceful memorial setting",
      usageOccasions: ["funeral", "memorial", "remembrance", "support"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    }
  ],

  colorPalettes: [
    {
      name: "Warm Family",
      description: "Warm, inviting colors for family services",
      colors: ["#FF9F43", "#FECA57", "#FFFFFF", "#FFF9E6", "#2D3436"],
      bestFor: ["family", "childcare", "home", "warmth"],
      mood: "warm, loving, family-oriented, welcoming",
      brandIntegration: 85
    },
    {
      name: "Beauty Elegance",
      description: "Sophisticated palette for beauty services",
      colors: ["#E84393", "#FD79A8", "#FFFFFF", "#FFEEF8", "#2D3436"],
      bestFor: ["beauty", "salon", "spa", "wellness"],
      mood: "elegant, beautiful, feminine, sophisticated",
      brandIntegration: 80
    },
    {
      name: "Trust & Care",
      description: "Trustworthy palette for care services",
      colors: ["#0984E3", "#74B9FF", "#FFFFFF", "#E8F4FD", "#2D3436"],
      bestFor: ["healthcare", "elderly-care", "trust", "professional"],
      mood: "trustworthy, caring, professional, reliable",
      brandIntegration: 85
    },
    {
      name: "Joyful Kids",
      description: "Bright, playful colors for children's services",
      colors: ["#00CEC9", "#81ECEC", "#FDCB6E", "#FF7675", "#FFFFFF"],
      bestFor: ["childcare", "education", "kids", "playful"],
      mood: "playful, joyful, energetic, fun",
      brandIntegration: 75
    },
    {
      name: "Wedding Romance",
      description: "Romantic palette for wedding services",
      colors: ["#DFE6E9", "#B2BEC3", "#D4A574", "#FFFFFF", "#2D3436"],
      bestFor: ["wedding", "events", "romantic", "elegant"],
      mood: "romantic, elegant, timeless, beautiful",
      brandIntegration: 80
    },
    {
      name: "Clean Home",
      description: "Fresh, clean palette for home services",
      colors: ["#00B894", "#55EFC4", "#FFFFFF", "#F0FFF4", "#2D3436"],
      bestFor: ["cleaning", "home-services", "fresh", "clean"],
      mood: "clean, fresh, healthy, organized",
      brandIntegration: 80
    },
    {
      name: "Urban Speed",
      description: "Dynamic palette for delivery services",
      colors: ["#6C5CE7", "#A29BFE", "#FFFFFF", "#F8F9FA", "#2D3436"],
      bestFor: ["delivery", "convenience", "urban", "modern"],
      mood: "fast, modern, convenient, dynamic",
      brandIntegration: 75
    },
    {
      name: "Peaceful Dignity",
      description: "Respectful palette for sensitive services",
      colors: ["#636E72", "#B2BEC3", "#FFFFFF", "#F5F6FA", "#2D3436"],
      bestFor: ["funeral", "memorial", "respectful", "dignified"],
      mood: "peaceful, respectful, dignified, calm",
      brandIntegration: 85
    }
  ],

  frameworks: [
    {
      name: "Care Journey",
      structure: "Need → Trust → Care → Satisfaction",
      application: "Montre le parcours de soin et d'attention au client",
      bestFor: ["care-services", "personal-services", "healthcare", "support"]
    },
    {
      name: "Transformation Story",
      structure: "Before → Service → After → Joy",
      application: "Illustre la transformation positive apportée par le service",
      bestFor: ["beauty", "cleaning", "repair", "improvement"]
    },
    {
      name: "Life Moments",
      structure: "Moment → Need → Service → Memory",
      application: "Capture les moments importants de la vie",
      bestFor: ["wedding", "events", "celebrations", "milestones"]
    },
    {
      name: "Convenience Promise",
      structure: "Problem → Solution → Delivery → Relief",
      application: "Communique la simplicité et la commodité du service",
      bestFor: ["delivery", "convenience", "fast-service", "urban"]
    }
  ],

  lightingSetups: [
    {
      name: "Warm Home Light",
      timeOfDay: "Daytime",
      characteristics: "Soft window light, warm tones, cozy atmosphere",
      mood: "Warm, welcoming, comfortable, homey",
      technicalDetails: "Natural window light, warm color temperature, soft shadows"
    },
    {
      name: "Beauty Flattering",
      timeOfDay: "Any (controlled)",
      characteristics: "Even, flattering, skin-friendly lighting",
      mood: "Beautiful, flattering, professional, radiant",
      technicalDetails: "Ring light or softbox, fill light, beauty dish"
    },
    {
      name: "Event Romantic",
      timeOfDay: "Evening/Night",
      characteristics: "Romantic, atmospheric, elegant lighting",
      mood: "Romantic, elegant, magical, memorable",
      technicalDetails: "Mixed ambient and flash, warm tones, bokeh"
    },
    {
      name: "Natural Candid",
      timeOfDay: "Daytime",
      characteristics: "Natural, authentic, documentary style",
      mood: "Authentic, real, genuine, relatable",
      technicalDetails: "Available light, fast lens, candid approach"
    }
  ],

  bestPractices: [
    "Show genuine human connections and emotions",
    "Use real customers and authentic scenarios",
    "Emphasize the transformation or benefit of the service",
    "Include diverse representation in all imagery",
    "Show the service provider as caring and professional",
    "Capture real moments, not staged perfection",
    "Highlight convenience and ease of service",
    "Use warm, inviting color palettes",
    "Show the end result and customer satisfaction",
    "Maintain respect and dignity in sensitive services"
  ],

  avoidances: [
    "Avoid cold, impersonal service imagery",
    "Don't use generic stock photos of smiling people",
    "Avoid showing service providers as subservient",
    "Don't neglect diversity in customer representation",
    "Avoid overly perfect, unrealistic scenarios",
    "Don't show messy or unprofessional service delivery",
    "Avoid imagery that could be seen as exploitative",
    "Don't use outdated or stereotypical representations",
    "Avoid showing customers in vulnerable positions",
    "Don't neglect the emotional aspect of personal services"
  ]
};
