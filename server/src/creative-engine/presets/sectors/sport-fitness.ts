/**
 * 🏃 SPORT & FITNESS - PRESETS SECTORIELS
 * 
 * Presets créatifs ultra-spécialisés pour le secteur Sport & Fitness
 * Qualité Cannes Lions garantie
 * 
 * Catégories couvertes:
 * - Équipements fitness
 * - Vêtements de sport
 * - Chaussures de sport
 * - Nutrition sportive
 * - Salles de sport
 * - Coaching personnel
 * - Sports collectifs
 * - Sports individuels
 * - Sports nautiques
 * - Sports d'hiver
 * - Outdoor et randonnée
 * - Récupération et bien-être
 */

import { SectorPreset } from '../types';

export const SPORT_FITNESS_PRESET: SectorPreset = {
  sector: 'sport-fitness',
  displayName: 'Sport & Fitness',

  photographicStyles: [
    {
      name: "Dynamic Action Freeze",
      category: "Sports Photography",
      reference: "Walter Iooss Jr., Neil Leifer, Adam Pretty",
      lighting: "High-speed flash, frozen motion, dramatic rim light",
      composition: "Peak action moment, rule of thirds, dynamic diagonals",
      mood: "Powerful, explosive, intense, victorious",
      technicalSpecs: "70-200mm f/2.8, ISO 1600, 1/2000s, high-speed sync",
      bestFor: ["action-sports", "competition", "performance", "athletes"],
      cannesLionsScore: 94
    },
    {
      name: "Cinematic Sports Epic",
      category: "Sports Photography",
      reference: "Martin Schoeller, Annie Leibovitz",
      lighting: "Dramatic studio lighting, chiaroscuro, hero lighting",
      composition: "Low angle hero shot, dramatic pose, powerful stance",
      mood: "Epic, heroic, inspirational, legendary",
      technicalSpecs: "85mm f/1.4, ISO 200, studio strobes, dramatic shadows",
      bestFor: ["athlete-portraits", "brand-campaigns", "hero-shots", "premium"],
      cannesLionsScore: 95
    },
    {
      name: "Lifestyle Fitness",
      category: "Sports Photography",
      reference: "Cass Bird, Petra Collins",
      lighting: "Natural light, soft shadows, authentic feel",
      composition: "Environmental context, real moments, relatable scenes",
      mood: "Aspirational, authentic, motivating, accessible",
      technicalSpecs: "35mm f/1.4, ISO 400, natural light, candid style",
      bestFor: ["gym-lifestyle", "everyday-fitness", "wellness", "community"],
      cannesLionsScore: 88
    },
    {
      name: "Studio Product Hero",
      category: "Sports Photography",
      reference: "Nike creative team, Adidas campaigns",
      lighting: "Controlled studio, gradient backgrounds, product focus",
      composition: "Clean isolation, dynamic angles, floating effect",
      mood: "Premium, innovative, sleek, desirable",
      technicalSpecs: "100mm macro f/2.8, ISO 100, multiple strobes, seamless",
      bestFor: ["footwear", "equipment", "apparel", "product-launch"],
      cannesLionsScore: 92
    },
    {
      name: "Outdoor Adventure Epic",
      category: "Sports Photography",
      reference: "Jimmy Chin, Chris Burkard, Renan Ozturk",
      lighting: "Natural dramatic light, golden hour, epic landscapes",
      composition: "Human vs nature scale, epic vistas, adventure context",
      mood: "Adventurous, free, inspiring, breathtaking",
      technicalSpecs: "16-35mm f/2.8, ISO 200, natural light, wide angle",
      bestFor: ["outdoor-sports", "hiking", "climbing", "adventure"],
      cannesLionsScore: 96
    },
    {
      name: "Motion Blur Energy",
      category: "Sports Photography",
      reference: "Ernst Haas, Pep Bonet",
      lighting: "Mixed ambient, intentional blur, speed effect",
      composition: "Panning motion, speed lines, dynamic energy",
      mood: "Fast, energetic, dynamic, powerful",
      technicalSpecs: "24-70mm f/2.8, ISO 400, 1/30s panning, tracking",
      bestFor: ["running", "cycling", "speed-sports", "energy"],
      cannesLionsScore: 89
    },
    {
      name: "Gritty Documentary",
      category: "Sports Photography",
      reference: "Gregory Crewdson, Platon",
      lighting: "Raw natural light, high contrast, authentic texture",
      composition: "Close-up details, sweat and effort, raw emotion",
      mood: "Raw, authentic, intense, real",
      technicalSpecs: "50mm f/1.8, ISO 800, available light, documentary style",
      bestFor: ["training", "behind-scenes", "effort", "dedication"],
      cannesLionsScore: 90
    },
    {
      name: "Clean Minimalist Sport",
      category: "Sports Photography",
      reference: "Apple Fitness+, Peloton campaigns",
      lighting: "Bright, even, clean studio, high-key",
      composition: "Negative space, clean lines, modern aesthetic",
      mood: "Modern, clean, accessible, premium",
      technicalSpecs: "85mm f/2.8, ISO 100, softbox, white background",
      bestFor: ["fitness-apps", "wellness", "modern-gym", "tech-fitness"],
      cannesLionsScore: 88
    },
    {
      name: "Team Spirit Collective",
      category: "Sports Photography",
      reference: "Sports Illustrated, ESPN",
      lighting: "Stadium lighting, dramatic atmosphere, team focus",
      composition: "Group dynamics, team unity, collective energy",
      mood: "United, powerful, team spirit, victory",
      technicalSpecs: "24-70mm f/2.8, ISO 1600, mixed lighting, wide shots",
      bestFor: ["team-sports", "collective", "community", "clubs"],
      cannesLionsScore: 91
    },
    {
      name: "Nutrition & Recovery",
      category: "Sports Photography",
      reference: "Food photography meets fitness",
      lighting: "Bright natural light, fresh and clean, appetizing",
      composition: "Product in context, lifestyle integration, health focus",
      mood: "Healthy, energizing, scientific, trustworthy",
      technicalSpecs: "50mm f/2.8, ISO 200, natural light, lifestyle context",
      bestFor: ["supplements", "nutrition", "recovery", "health-products"],
      cannesLionsScore: 86
    }
  ],

  contexts: [
    {
      name: "Modern Gym Environment",
      description: "State-of-the-art fitness facility with premium equipment",
      usageOccasions: ["gym", "training", "fitness", "workout"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Outdoor Running Trail",
      description: "Scenic running path through nature, urban park or trail",
      usageOccasions: ["running", "jogging", "cardio", "outdoor"],
      culturalRelevance: ["universal"],
      seasonalFit: ["spring", "summer", "autumn"]
    },
    {
      name: "Mountain Peak Achievement",
      description: "Summit moment, epic mountain views, achievement context",
      usageOccasions: ["hiking", "climbing", "achievement", "adventure"],
      culturalRelevance: ["universal"],
      seasonalFit: ["summer", "autumn"]
    },
    {
      name: "Competition Arena",
      description: "Professional sports venue, competition atmosphere",
      usageOccasions: ["competition", "professional", "performance", "event"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Home Workout Space",
      description: "Clean home gym setup, accessible fitness environment",
      usageOccasions: ["home-fitness", "accessible", "everyday", "convenience"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Beach & Water Sports",
      description: "Coastal environment for water-based activities",
      usageOccasions: ["swimming", "surfing", "beach-sports", "summer"],
      culturalRelevance: ["coastal", "tropical", "mediterranean"],
      seasonalFit: ["summer"]
    },
    {
      name: "Winter Sports Paradise",
      description: "Snow-covered mountains, ski resorts, winter activities",
      usageOccasions: ["skiing", "snowboarding", "winter-sports", "mountain"],
      culturalRelevance: ["alpine", "nordic", "universal"],
      seasonalFit: ["winter"]
    },
    {
      name: "Urban Street Sports",
      description: "City environment for skateboarding, parkour, street fitness",
      usageOccasions: ["street-sports", "urban", "youth", "alternative"],
      culturalRelevance: ["urban", "youth-culture"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Yoga & Wellness Studio",
      description: "Serene studio space for mindful movement and recovery",
      usageOccasions: ["yoga", "pilates", "meditation", "recovery"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Sports Field & Court",
      description: "Professional playing field for team sports",
      usageOccasions: ["football", "basketball", "tennis", "team-sports"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    }
  ],

  colorPalettes: [
    {
      name: "High Energy Performance",
      description: "Bold, energetic colors for maximum impact",
      colors: ["#FF4500", "#FFD700", "#000000", "#FFFFFF", "#00FF00"],
      bestFor: ["performance", "energy", "competition", "intensity"],
      mood: "powerful, energetic, intense, motivating",
      brandIntegration: 80
    },
    {
      name: "Premium Athletic",
      description: "Sophisticated palette for premium sports brands",
      colors: ["#1A1A1A", "#2C2C2C", "#D4AF37", "#FFFFFF", "#C0C0C0"],
      bestFor: ["luxury-sports", "premium", "professional", "elite"],
      mood: "sophisticated, premium, exclusive, professional",
      brandIntegration: 85
    },
    {
      name: "Fresh Wellness",
      description: "Clean, fresh colors for health and wellness",
      colors: ["#00CED1", "#98FB98", "#FFFFFF", "#F0F8FF", "#20B2AA"],
      bestFor: ["wellness", "yoga", "recovery", "health"],
      mood: "fresh, clean, healthy, balanced",
      brandIntegration: 75
    },
    {
      name: "Outdoor Adventure",
      description: "Natural earth tones for outdoor activities",
      colors: ["#228B22", "#8B4513", "#87CEEB", "#F5DEB3", "#2F4F4F"],
      bestFor: ["hiking", "outdoor", "nature", "adventure"],
      mood: "natural, adventurous, rugged, authentic",
      brandIntegration: 70
    },
    {
      name: "Urban Street",
      description: "Edgy urban palette for street sports",
      colors: ["#1C1C1C", "#FF6B6B", "#4ECDC4", "#FFFFFF", "#FFE66D"],
      bestFor: ["street-sports", "skateboarding", "urban", "youth"],
      mood: "edgy, urban, cool, rebellious",
      brandIntegration: 75
    },
    {
      name: "Team Spirit",
      description: "Bold team colors for collective sports",
      colors: ["#003366", "#CC0000", "#FFFFFF", "#FFD700", "#228B22"],
      bestFor: ["team-sports", "clubs", "community", "collective"],
      mood: "united, proud, competitive, spirited",
      brandIntegration: 80
    },
    {
      name: "Winter Sports",
      description: "Cool palette for winter activities",
      colors: ["#FFFFFF", "#87CEEB", "#4169E1", "#1E90FF", "#000080"],
      bestFor: ["skiing", "snowboarding", "winter", "ice-sports"],
      mood: "fresh, cool, crisp, exhilarating",
      brandIntegration: 75
    },
    {
      name: "Nutrition Science",
      description: "Clean, scientific palette for sports nutrition",
      colors: ["#32CD32", "#FF8C00", "#FFFFFF", "#4169E1", "#2E8B57"],
      bestFor: ["supplements", "nutrition", "science", "health"],
      mood: "scientific, trustworthy, energizing, healthy",
      brandIntegration: 70
    }
  ],

  frameworks: [
    {
      name: "Hero's Journey",
      structure: "Challenge → Training → Struggle → Victory",
      application: "Raconte le parcours de l'athlète vers la réussite",
      bestFor: ["athlete-stories", "motivation", "achievement", "transformation"]
    },
    {
      name: "Performance Science",
      structure: "Problem → Innovation → Technology → Results",
      application: "Met en avant la science et la technologie derrière la performance",
      bestFor: ["equipment", "footwear", "tech-products", "innovation"]
    },
    {
      name: "Community Power",
      structure: "Individual → Team → Community → Movement",
      application: "Montre la force du collectif et de la communauté",
      bestFor: ["team-sports", "fitness-community", "clubs", "events"]
    },
    {
      name: "Wellness Balance",
      structure: "Stress → Movement → Recovery → Balance",
      application: "Communique l'équilibre entre effort et récupération",
      bestFor: ["wellness", "recovery", "yoga", "holistic-fitness"]
    }
  ],

  lightingSetups: [
    {
      name: "High-Speed Action",
      timeOfDay: "Any (controlled)",
      characteristics: "Frozen motion, sharp details, dramatic shadows",
      mood: "Powerful, intense, dynamic, explosive",
      technicalDetails: "High-speed sync flash, 1/8000s capability, multiple strobes"
    },
    {
      name: "Golden Hour Epic",
      timeOfDay: "Golden hour",
      characteristics: "Warm backlight, rim lighting, heroic silhouettes",
      mood: "Inspirational, epic, warm, aspirational",
      technicalDetails: "Backlit subject, reflector fill, warm color temperature"
    },
    {
      name: "Gym Ambient",
      timeOfDay: "Any (indoor)",
      characteristics: "Mixed artificial light, authentic gym atmosphere",
      mood: "Authentic, gritty, real, motivating",
      technicalDetails: "Available light, high ISO, fast lens, documentary style"
    },
    {
      name: "Clean Studio",
      timeOfDay: "Any (studio)",
      characteristics: "Even, controlled, product-focused, clean",
      mood: "Premium, clean, professional, modern",
      technicalDetails: "Softboxes, white seamless, even exposure, no harsh shadows"
    }
  ],

  bestPractices: [
    "Capture peak action moments for maximum impact",
    "Show authentic effort and emotion, not posed perfection",
    "Include diverse body types and abilities for inclusivity",
    "Highlight product benefits through action demonstration",
    "Use dynamic angles to convey energy and movement",
    "Show real sweat and effort for authenticity",
    "Include environmental context that resonates with target audience",
    "Capture team dynamics and community spirit",
    "Emphasize the transformation journey, not just results",
    "Balance aspirational imagery with relatable moments"
  ],

  avoidances: [
    "Avoid unrealistic body standards or excessive retouching",
    "Don't show unsafe exercise form or dangerous activities",
    "Avoid static, posed shots that lack energy",
    "Don't use outdated equipment or facilities",
    "Avoid excluding diverse body types and abilities",
    "Don't show athletes in distress without context",
    "Avoid cluttered backgrounds that distract from action",
    "Don't use overly aggressive or intimidating imagery",
    "Avoid clichéd motivational imagery (sunrise runner silhouette)",
    "Don't neglect the recovery and wellness aspect of fitness"
  ]
};
