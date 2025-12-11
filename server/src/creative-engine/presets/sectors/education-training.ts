/**
 * 📚 EDUCATION & TRAINING - PRESETS SECTORIELS
 * 
 * Presets créatifs ultra-spécialisés pour le secteur Éducation et Formation
 * Qualité Cannes Lions garantie
 * 
 * Catégories couvertes:
 * - Enseignement primaire
 * - Enseignement secondaire
 * - Enseignement supérieur
 * - Formation professionnelle
 * - Formation continue
 * - E-learning
 * - Langues étrangères
 * - Soutien scolaire
 * - Formation en entreprise
 * - Coaching
 * - Matériel pédagogique
 * - Orientation scolaire
 */

import { SectorPreset } from '../types';

export const EDUCATION_TRAINING_PRESET: SectorPreset = {
  sector: 'education-training',
  displayName: 'Éducation & Formation',

  photographicStyles: [
    {
      name: "Inspiring Learning",
      category: "Educational Photography",
      reference: "Harvard, MIT, Stanford campaigns",
      lighting: "Bright, inspiring, natural, academic",
      composition: "Engaged students, inspiring environments, achievement",
      mood: "Inspiring, aspirational, academic, prestigious",
      technicalSpecs: "35mm f/1.8, ISO 400, natural light, candid",
      bestFor: ["higher-education", "university", "academic", "prestige"],
      cannesLionsScore: 91
    },
    {
      name: "Joyful Discovery",
      category: "Educational Photography",
      reference: "Primary education campaigns",
      lighting: "Bright, cheerful, colorful, warm",
      composition: "Happy children, discovery moments, playful learning",
      mood: "Joyful, curious, playful, engaging",
      technicalSpecs: "35mm f/1.4, ISO 400, bright natural light, candid",
      bestFor: ["primary", "children", "discovery", "play-based"],
      cannesLionsScore: 90
    },
    {
      name: "Professional Development",
      category: "Corporate/Educational Photography",
      reference: "Corporate training campaigns",
      lighting: "Professional, modern, clean, corporate",
      composition: "Professional learners, modern facilities, growth",
      mood: "Professional, growth-oriented, modern, ambitious",
      technicalSpecs: "50mm f/2.8, ISO 200, corporate lighting, professional",
      bestFor: ["corporate-training", "professional", "development", "business"],
      cannesLionsScore: 87
    },
    {
      name: "Digital Learning",
      category: "Tech/Educational Photography",
      reference: "Coursera, Udemy, edtech campaigns",
      lighting: "Modern, clean, tech-forward, accessible",
      composition: "Online learning, devices, flexibility, convenience",
      mood: "Modern, accessible, flexible, innovative",
      technicalSpecs: "35mm f/1.8, ISO 400, screen lighting, lifestyle",
      bestFor: ["e-learning", "online", "digital", "edtech"],
      cannesLionsScore: 88
    },
    {
      name: "Hands-On Skills",
      category: "Vocational Photography",
      reference: "Trade school and vocational campaigns",
      lighting: "Practical, authentic, workshop environment",
      composition: "Practical skills, hands-on learning, real-world application",
      mood: "Practical, skilled, authentic, capable",
      technicalSpecs: "24-70mm f/2.8, ISO 800, available light, documentary",
      bestFor: ["vocational", "trades", "practical", "skills"],
      cannesLionsScore: 86
    },
    {
      name: "Language & Culture",
      category: "Educational/Lifestyle Photography",
      reference: "Language school campaigns",
      lighting: "Bright, international, diverse, engaging",
      composition: "Cultural exchange, conversation, global connections",
      mood: "International, engaging, cultural, connected",
      technicalSpecs: "35mm f/2.8, ISO 400, natural light, candid",
      bestFor: ["languages", "cultural", "international", "exchange"],
      cannesLionsScore: 87
    },
    {
      name: "One-on-One Mentoring",
      category: "Educational Photography",
      reference: "Tutoring and coaching campaigns",
      lighting: "Warm, focused, supportive, intimate",
      composition: "Personal attention, mentoring moments, progress",
      mood: "Supportive, focused, personal, encouraging",
      technicalSpecs: "50mm f/1.8, ISO 400, soft natural light, intimate",
      bestFor: ["tutoring", "coaching", "mentoring", "personal"],
      cannesLionsScore: 88
    },
    {
      name: "Campus Life",
      category: "Lifestyle/Educational Photography",
      reference: "University lifestyle campaigns",
      lighting: "Natural, vibrant, social, energetic",
      composition: "Campus activities, social life, community",
      mood: "Vibrant, social, community, exciting",
      technicalSpecs: "24-70mm f/2.8, ISO 400, natural light, lifestyle",
      bestFor: ["campus", "student-life", "community", "social"],
      cannesLionsScore: 89
    },
    {
      name: "Achievement & Success",
      category: "Educational Photography",
      reference: "Graduation and achievement campaigns",
      lighting: "Celebratory, bright, proud, emotional",
      composition: "Graduation moments, achievements, celebrations",
      mood: "Proud, celebratory, successful, emotional",
      technicalSpecs: "85mm f/1.8, ISO 400, natural light, portrait",
      bestFor: ["graduation", "achievement", "success", "celebration"],
      cannesLionsScore: 90
    },
    {
      name: "STEM Innovation",
      category: "Educational/Scientific Photography",
      reference: "STEM education campaigns",
      lighting: "Modern, scientific, innovative, clean",
      composition: "Science labs, technology, innovation, discovery",
      mood: "Innovative, scientific, curious, forward-thinking",
      technicalSpecs: "35mm f/2.8, ISO 400, mixed lighting, scientific",
      bestFor: ["STEM", "science", "technology", "innovation"],
      cannesLionsScore: 89
    }
  ],

  contexts: [
    {
      name: "University Campus",
      description: "Beautiful university campus with historic or modern architecture",
      usageOccasions: ["higher-education", "university", "academic", "campus"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Modern Classroom",
      description: "Bright, well-equipped modern classroom",
      usageOccasions: ["classroom", "learning", "teaching", "education"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Science Laboratory",
      description: "Well-equipped science lab for experiments",
      usageOccasions: ["STEM", "science", "research", "experiments"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Library Study Space",
      description: "Quiet, inspiring library environment",
      usageOccasions: ["study", "research", "quiet", "focus"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Training Room",
      description: "Professional corporate training facility",
      usageOccasions: ["corporate", "training", "professional", "development"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Home Learning",
      description: "Comfortable home study environment",
      usageOccasions: ["e-learning", "home", "remote", "flexible"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Workshop Space",
      description: "Practical workshop for hands-on learning",
      usageOccasions: ["vocational", "practical", "skills", "hands-on"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Playground & Outdoor",
      description: "Outdoor learning and play environment",
      usageOccasions: ["primary", "outdoor", "play", "physical"],
      culturalRelevance: ["universal"],
      seasonalFit: ["spring", "summer"]
    },
    {
      name: "Graduation Ceremony",
      description: "Formal graduation celebration setting",
      usageOccasions: ["graduation", "ceremony", "achievement", "celebration"],
      culturalRelevance: ["universal"],
      seasonalFit: ["spring", "summer"]
    },
    {
      name: "Language Exchange",
      description: "International, multicultural learning environment",
      usageOccasions: ["languages", "cultural", "international", "exchange"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    }
  ],

  colorPalettes: [
    {
      name: "Academic Excellence",
      description: "Classic academic palette conveying prestige",
      colors: ["#1E3A5F", "#2563EB", "#FFFFFF", "#F8FAFC", "#0F172A"],
      bestFor: ["university", "academic", "prestige", "excellence"],
      mood: "prestigious, academic, trustworthy, excellent",
      brandIntegration: 90
    },
    {
      name: "Joyful Learning",
      description: "Bright, playful palette for children's education",
      colors: ["#F59E0B", "#10B981", "#3B82F6", "#EC4899", "#FFFFFF"],
      bestFor: ["primary", "children", "playful", "discovery"],
      mood: "joyful, playful, curious, engaging",
      brandIntegration: 75
    },
    {
      name: "Professional Growth",
      description: "Sophisticated palette for professional training",
      colors: ["#1F2937", "#4B5563", "#3B82F6", "#FFFFFF", "#F3F4F6"],
      bestFor: ["corporate", "professional", "business", "development"],
      mood: "professional, sophisticated, growth-oriented, modern",
      brandIntegration: 85
    },
    {
      name: "Digital Innovation",
      description: "Modern palette for e-learning and edtech",
      colors: ["#6366F1", "#8B5CF6", "#FFFFFF", "#F5F3FF", "#1E1B4B"],
      bestFor: ["e-learning", "digital", "edtech", "innovation"],
      mood: "modern, innovative, digital, accessible",
      brandIntegration: 80
    },
    {
      name: "STEM Discovery",
      description: "Scientific palette for STEM education",
      colors: ["#0891B2", "#06B6D4", "#FFFFFF", "#ECFEFF", "#164E63"],
      bestFor: ["STEM", "science", "technology", "discovery"],
      mood: "scientific, innovative, curious, forward-thinking",
      brandIntegration: 80
    },
    {
      name: "Language & Culture",
      description: "International palette for language learning",
      colors: ["#DC2626", "#F97316", "#FBBF24", "#22C55E", "#3B82F6"],
      bestFor: ["languages", "cultural", "international", "diverse"],
      mood: "international, diverse, engaging, cultural",
      brandIntegration: 75
    },
    {
      name: "Success Green",
      description: "Achievement-focused palette for success stories",
      colors: ["#059669", "#10B981", "#FFFFFF", "#ECFDF5", "#064E3B"],
      bestFor: ["achievement", "success", "graduation", "growth"],
      mood: "successful, growing, achieving, proud",
      brandIntegration: 80
    },
    {
      name: "Warm Mentoring",
      description: "Warm palette for tutoring and coaching",
      colors: ["#EA580C", "#FB923C", "#FFFFFF", "#FFF7ED", "#7C2D12"],
      bestFor: ["tutoring", "coaching", "mentoring", "support"],
      mood: "warm, supportive, encouraging, personal",
      brandIntegration: 80
    }
  ],

  frameworks: [
    {
      name: "Learning Journey",
      structure: "Curiosity → Learning → Mastery → Achievement",
      application: "Illustre le parcours d'apprentissage vers la réussite",
      bestFor: ["education", "courses", "programs", "development"]
    },
    {
      name: "Transformation Story",
      structure: "Before → Education → Growth → Success",
      application: "Montre la transformation par l'éducation",
      bestFor: ["professional", "career", "skills", "transformation"]
    },
    {
      name: "Discovery & Wonder",
      structure: "Question → Exploration → Discovery → Understanding",
      application: "Capture la joie de la découverte et de l'apprentissage",
      bestFor: ["children", "STEM", "curiosity", "discovery"]
    },
    {
      name: "Community & Connection",
      structure: "Individual → Group → Community → Network",
      application: "Met en avant la communauté d'apprentissage",
      bestFor: ["campus", "social", "networking", "community"]
    }
  ],

  lightingSetups: [
    {
      name: "Bright Academic",
      timeOfDay: "Daytime",
      characteristics: "Bright, natural, inspiring, clean",
      mood: "Inspiring, academic, professional, bright",
      technicalDetails: "Large windows, natural light, even exposure"
    },
    {
      name: "Warm Mentoring",
      timeOfDay: "Any",
      characteristics: "Warm, focused, intimate, supportive",
      mood: "Supportive, warm, focused, encouraging",
      technicalDetails: "Soft lighting, warm tones, intimate setting"
    },
    {
      name: "Playful Bright",
      timeOfDay: "Daytime",
      characteristics: "Bright, cheerful, colorful, energetic",
      mood: "Joyful, playful, energetic, engaging",
      technicalDetails: "Bright natural light, colorful environment, high-key"
    },
    {
      name: "Modern Tech",
      timeOfDay: "Any",
      characteristics: "Clean, modern, screen-friendly",
      mood: "Modern, digital, accessible, innovative",
      technicalDetails: "Even lighting, screen integration, clean backgrounds"
    }
  ],

  bestPractices: [
    "Show genuine engagement and curiosity in learning",
    "Use diverse representation across all demographics",
    "Capture authentic moments of discovery and achievement",
    "Show modern, well-equipped learning environments",
    "Include both individual and collaborative learning",
    "Emphasize the joy and excitement of learning",
    "Show real outcomes and success stories",
    "Balance academic rigor with accessibility",
    "Include technology as an enabler of learning",
    "Show the human connection in education"
  ],

  avoidances: [
    "Avoid showing bored or disengaged students",
    "Don't use outdated classroom imagery",
    "Avoid stereotypical representations of students",
    "Don't show stressful or anxiety-inducing scenarios",
    "Avoid excluding any demographic in imagery",
    "Don't use overly staged or artificial learning moments",
    "Avoid imagery that makes education seem elitist",
    "Don't neglect diversity in student and teacher representation",
    "Avoid showing technology as a distraction",
    "Don't use imagery that could discourage potential learners"
  ]
};
