/**
 * 💻 TECH & ELECTRONICS - PRESETS SECTORIELS
 * 
 * Presets créatifs ultra-spécialisés pour le secteur Informatique et Technologies
 * Qualité Cannes Lions garantie
 * 
 * Catégories couvertes:
 * - Logiciels
 * - Hardware
 * - Services IT
 * - Cybersécurité
 * - Cloud computing
 * - Intelligence artificielle
 * - Développement web
 * - Applications mobiles
 * - Big Data
 * - IoT
 * - Blockchain
 * - Réalité virtuelle
 */

import { SectorPreset } from '../types';

export const TECH_ELECTRONICS_PRESET: SectorPreset = {
  sector: 'tech-electronics',
  displayName: 'Informatique & Technologies',

  photographicStyles: [
    {
      name: "Apple-Style Minimalism",
      category: "Product Photography",
      reference: "Apple marketing team, Jony Ive design philosophy",
      lighting: "Clean, even studio light, subtle gradients, no harsh shadows",
      composition: "Centered product, massive negative space, geometric precision",
      mood: "Premium, innovative, clean, aspirational",
      technicalSpecs: "100mm f/8, ISO 100, multiple softboxes, seamless white/gradient",
      bestFor: ["hardware", "devices", "premium-tech", "product-launch"],
      cannesLionsScore: 96
    },
    {
      name: "Futuristic Tech Noir",
      category: "Product Photography",
      reference: "Blade Runner aesthetic, cyberpunk visuals",
      lighting: "Neon accents, dark backgrounds, rim lighting, colored gels",
      composition: "Dramatic angles, reflective surfaces, sci-fi atmosphere",
      mood: "Futuristic, cutting-edge, mysterious, powerful",
      technicalSpecs: "35mm f/1.4, ISO 400, colored LED, dark studio",
      bestFor: ["gaming", "AI", "cybersecurity", "advanced-tech"],
      cannesLionsScore: 93
    },
    {
      name: "Lifestyle Tech Integration",
      category: "Lifestyle Photography",
      reference: "Google, Microsoft lifestyle campaigns",
      lighting: "Natural light, soft shadows, authentic environments",
      composition: "Tech in daily life context, human interaction, relatable",
      mood: "Accessible, friendly, integrated, human-centered",
      technicalSpecs: "35mm f/1.8, ISO 400, natural light, environmental",
      bestFor: ["apps", "software", "consumer-tech", "everyday-use"],
      cannesLionsScore: 89
    },
    {
      name: "Data Visualization Art",
      category: "Abstract/Conceptual",
      reference: "Refik Anadol, data art installations",
      lighting: "Screen glow, digital light, abstract patterns",
      composition: "Abstract data flows, particle systems, digital landscapes",
      mood: "Innovative, intelligent, complex, beautiful",
      technicalSpecs: "CGI/3D rendering, particle effects, data-driven visuals",
      bestFor: ["big-data", "AI", "analytics", "cloud"],
      cannesLionsScore: 92
    },
    {
      name: "Clean UI/UX Showcase",
      category: "Digital Product Photography",
      reference: "Dribbble top designers, Apple UI guidelines",
      lighting: "Even screen lighting, device in context, clean presentation",
      composition: "Device mockups, screen focus, interface highlight",
      mood: "Modern, intuitive, user-friendly, professional",
      technicalSpecs: "85mm f/2.8, ISO 200, controlled screen brightness, angle",
      bestFor: ["apps", "software", "web-platforms", "SaaS"],
      cannesLionsScore: 88
    },
    {
      name: "Industrial Tech",
      category: "Industrial Photography",
      reference: "Server farm photography, data center aesthetics",
      lighting: "Cool blue tones, LED indicators, industrial atmosphere",
      composition: "Symmetry, repetition, scale, technical precision",
      mood: "Powerful, reliable, enterprise, scalable",
      technicalSpecs: "24mm f/4, ISO 800, available light, wide angle",
      bestFor: ["enterprise", "cloud", "infrastructure", "B2B"],
      cannesLionsScore: 87
    },
    {
      name: "Startup Energy",
      category: "Lifestyle Photography",
      reference: "WeWork, startup culture imagery",
      lighting: "Bright, energetic, modern office lighting",
      composition: "Team collaboration, modern workspace, dynamic energy",
      mood: "Innovative, collaborative, dynamic, young",
      technicalSpecs: "24-70mm f/2.8, ISO 400, mixed lighting, candid",
      bestFor: ["startups", "SaaS", "collaboration-tools", "B2B"],
      cannesLionsScore: 86
    },
    {
      name: "Macro Circuit Beauty",
      category: "Macro Photography",
      reference: "Intel, NVIDIA chip photography",
      lighting: "Precise macro lighting, detail emphasis, metallic reflections",
      composition: "Extreme close-up, circuit patterns, technological beauty",
      mood: "Precise, innovative, complex, beautiful",
      technicalSpecs: "100mm macro f/2.8, ISO 100, focus stacking, ring light",
      bestFor: ["semiconductors", "hardware", "components", "innovation"],
      cannesLionsScore: 91
    },
    {
      name: "VR/AR Immersive",
      category: "Experiential Photography",
      reference: "Meta, Apple Vision Pro campaigns",
      lighting: "Mixed reality lighting, device glow, immersive atmosphere",
      composition: "User immersion, virtual worlds, reality blend",
      mood: "Immersive, futuristic, experiential, transformative",
      technicalSpecs: "35mm f/1.4, ISO 800, mixed lighting, motion capture",
      bestFor: ["VR", "AR", "metaverse", "gaming"],
      cannesLionsScore: 90
    },
    {
      name: "Security & Trust",
      category: "Conceptual Photography",
      reference: "Enterprise security campaigns",
      lighting: "Professional, trustworthy, clean corporate",
      composition: "Shield imagery, lock metaphors, protection concepts",
      mood: "Secure, trustworthy, professional, reliable",
      technicalSpecs: "50mm f/2.8, ISO 200, studio lighting, conceptual",
      bestFor: ["cybersecurity", "enterprise", "compliance", "trust"],
      cannesLionsScore: 85
    }
  ],

  contexts: [
    {
      name: "Modern Home Office",
      description: "Clean, organized home workspace with premium tech setup",
      usageOccasions: ["remote-work", "productivity", "home-tech", "lifestyle"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Corporate Innovation Lab",
      description: "Cutting-edge corporate R&D environment",
      usageOccasions: ["enterprise", "innovation", "B2B", "professional"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Startup Coworking Space",
      description: "Dynamic, collaborative modern workspace",
      usageOccasions: ["startup", "collaboration", "creative", "young-professionals"],
      culturalRelevance: ["urban", "tech-hubs"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Data Center Infrastructure",
      description: "Server rooms, cloud infrastructure, enterprise scale",
      usageOccasions: ["enterprise", "cloud", "infrastructure", "B2B"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Smart Home Environment",
      description: "Connected home with IoT devices and automation",
      usageOccasions: ["IoT", "smart-home", "consumer", "lifestyle"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Gaming Setup",
      description: "Premium gaming station with RGB lighting and high-end gear",
      usageOccasions: ["gaming", "esports", "entertainment", "youth"],
      culturalRelevance: ["universal", "youth-culture"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Mobile On-The-Go",
      description: "Urban mobility, using tech while commuting or traveling",
      usageOccasions: ["mobile", "apps", "connectivity", "lifestyle"],
      culturalRelevance: ["urban", "universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Creative Studio",
      description: "Professional creative workspace for designers and creators",
      usageOccasions: ["creative", "design", "content-creation", "professional"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Educational Tech",
      description: "Learning environment with educational technology",
      usageOccasions: ["education", "e-learning", "training", "development"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Healthcare Tech",
      description: "Medical technology in clinical or research settings",
      usageOccasions: ["healthtech", "medical", "research", "innovation"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    }
  ],

  colorPalettes: [
    {
      name: "Apple Clean",
      description: "Minimalist white and silver with subtle accents",
      colors: ["#FFFFFF", "#F5F5F7", "#1D1D1F", "#0071E3", "#86868B"],
      bestFor: ["premium-hardware", "consumer-tech", "minimalist", "Apple-style"],
      mood: "clean, premium, sophisticated, modern",
      brandIntegration: 90
    },
    {
      name: "Cyberpunk Neon",
      description: "Dark backgrounds with vibrant neon accents",
      colors: ["#0D0D0D", "#1A1A2E", "#00FFFF", "#FF00FF", "#39FF14"],
      bestFor: ["gaming", "AI", "cybersecurity", "futuristic"],
      mood: "futuristic, edgy, powerful, cutting-edge",
      brandIntegration: 75
    },
    {
      name: "Enterprise Trust",
      description: "Professional blues and grays for B2B",
      colors: ["#003366", "#0066CC", "#FFFFFF", "#F0F0F0", "#333333"],
      bestFor: ["enterprise", "B2B", "cloud", "security"],
      mood: "trustworthy, professional, reliable, corporate",
      brandIntegration: 85
    },
    {
      name: "Startup Fresh",
      description: "Vibrant, energetic colors for innovation",
      colors: ["#FF6B6B", "#4ECDC4", "#FFFFFF", "#2C3E50", "#F39C12"],
      bestFor: ["startups", "apps", "SaaS", "consumer"],
      mood: "innovative, fresh, dynamic, approachable",
      brandIntegration: 80
    },
    {
      name: "Data Gradient",
      description: "Smooth gradients representing data flow",
      colors: ["#667EEA", "#764BA2", "#F093FB", "#F5576C", "#4FACFE"],
      bestFor: ["big-data", "analytics", "AI", "visualization"],
      mood: "intelligent, flowing, complex, beautiful",
      brandIntegration: 75
    },
    {
      name: "Green Tech Eco",
      description: "Sustainable technology palette",
      colors: ["#00C853", "#69F0AE", "#FFFFFF", "#263238", "#B2FF59"],
      bestFor: ["green-tech", "sustainable", "eco-friendly", "cleantech"],
      mood: "sustainable, innovative, responsible, fresh",
      brandIntegration: 80
    },
    {
      name: "Gaming RGB",
      description: "Bold gaming colors with RGB aesthetic",
      colors: ["#FF0000", "#00FF00", "#0000FF", "#000000", "#FFFFFF"],
      bestFor: ["gaming", "esports", "peripherals", "entertainment"],
      mood: "exciting, powerful, immersive, bold",
      brandIntegration: 70
    },
    {
      name: "Healthcare Tech",
      description: "Clean, clinical palette for health technology",
      colors: ["#00BCD4", "#FFFFFF", "#E3F2FD", "#1976D2", "#4CAF50"],
      bestFor: ["healthtech", "medical", "wellness-tech", "clinical"],
      mood: "clean, trustworthy, caring, professional",
      brandIntegration: 85
    }
  ],

  frameworks: [
    {
      name: "Innovation Story",
      structure: "Problem → Innovation → Solution → Impact",
      application: "Montre comment la technologie résout des problèmes réels",
      bestFor: ["product-launch", "innovation", "disruption", "transformation"]
    },
    {
      name: "User Journey",
      structure: "Discovery → Adoption → Mastery → Advocacy",
      application: "Illustre le parcours utilisateur avec le produit",
      bestFor: ["apps", "software", "SaaS", "consumer-tech"]
    },
    {
      name: "Enterprise Value",
      structure: "Challenge → Capability → Implementation → ROI",
      application: "Démontre la valeur business pour les entreprises",
      bestFor: ["B2B", "enterprise", "cloud", "services"]
    },
    {
      name: "Future Vision",
      structure: "Today → Tomorrow → Possibility → Reality",
      application: "Projette vers un futur rendu possible par la technologie",
      bestFor: ["AI", "VR/AR", "emerging-tech", "vision"]
    }
  ],

  lightingSetups: [
    {
      name: "Product Studio Clean",
      timeOfDay: "Any (studio)",
      characteristics: "Even, shadowless, gradient backgrounds, perfect reflections",
      mood: "Premium, clean, professional, aspirational",
      technicalDetails: "Multiple softboxes, seamless backdrop, controlled reflections"
    },
    {
      name: "Neon Accent",
      timeOfDay: "Any (controlled)",
      characteristics: "Dark base, colored LED accents, rim lighting",
      mood: "Futuristic, edgy, gaming, tech-forward",
      technicalDetails: "RGB LED strips, dark backdrop, selective lighting"
    },
    {
      name: "Natural Office",
      timeOfDay: "Daytime",
      characteristics: "Window light, soft shadows, authentic workspace",
      mood: "Authentic, relatable, professional, human",
      technicalDetails: "Large windows, diffused natural light, minimal artificial"
    },
    {
      name: "Screen Glow",
      timeOfDay: "Any",
      characteristics: "Device screen as primary light source, ambient fill",
      mood: "Intimate, focused, digital, immersive",
      technicalDetails: "Screen brightness controlled, subtle fill light, dark environment"
    }
  ],

  bestPractices: [
    "Show technology in use, not just as static product",
    "Emphasize human benefit and emotional connection",
    "Use clean, uncluttered compositions for premium feel",
    "Highlight innovation through visual metaphors",
    "Include diverse users to show accessibility",
    "Show real interfaces and screens when relevant",
    "Use lighting to convey innovation and premium quality",
    "Balance technical features with emotional benefits",
    "Create visual hierarchy that guides the eye",
    "Maintain brand consistency across all touchpoints"
  ],

  avoidances: [
    "Avoid dated technology or outdated interfaces",
    "Don't use generic stock imagery of people pointing at screens",
    "Avoid cluttered compositions that confuse the message",
    "Don't show technology as cold or intimidating",
    "Avoid clichéd tech imagery (binary code, generic circuits)",
    "Don't neglect the human element in favor of pure product",
    "Avoid inconsistent visual language across campaigns",
    "Don't use overly complex visuals that confuse the message",
    "Avoid showing technology failing or causing frustration",
    "Don't use imagery that excludes non-technical audiences"
  ]
};
