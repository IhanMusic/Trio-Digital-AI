/**
 * 🏦 BANKING & FINANCE - PRESETS SECTORIELS
 * 
 * Presets créatifs ultra-spécialisés pour le secteur Banque et Finance
 * Qualité Cannes Lions garantie
 * 
 * Catégories couvertes:
 * - Banque de détail
 * - Banque d'investissement
 * - Crédit immobilier
 * - Crédit à la consommation
 * - Épargne et placements
 * - Assurance-vie
 * - Gestion de patrimoine
 * - Services aux entreprises
 * - Moyens de paiement
 * - Banque en ligne
 * - Fintech
 * - Courtage
 */

import { SectorPreset } from '../types';

export const BANKING_FINANCE_PRESET: SectorPreset = {
  sector: 'banking-finance',
  displayName: 'Banque & Finance',

  photographicStyles: [
    {
      name: "Premium Trust",
      category: "Corporate Photography",
      reference: "JP Morgan, Goldman Sachs, UBS campaigns",
      lighting: "Sophisticated studio lighting, premium feel, trustworthy",
      composition: "Confident professionals, premium environments, trust symbols",
      mood: "Trustworthy, premium, sophisticated, reliable",
      technicalSpecs: "85mm f/2.8, ISO 200, studio lighting, corporate setting",
      bestFor: ["private-banking", "wealth-management", "investment", "premium"],
      cannesLionsScore: 92
    },
    {
      name: "Modern Digital Banking",
      category: "Lifestyle/Tech Photography",
      reference: "Revolut, N26, Monzo campaigns",
      lighting: "Bright, clean, modern, tech-forward",
      composition: "Mobile devices, digital interfaces, modern lifestyle",
      mood: "Modern, innovative, accessible, convenient",
      technicalSpecs: "35mm f/1.8, ISO 400, natural light, lifestyle context",
      bestFor: ["digital-banking", "fintech", "mobile-payments", "apps"],
      cannesLionsScore: 89
    },
    {
      name: "Life Milestones",
      category: "Lifestyle Photography",
      reference: "Retail banking campaigns",
      lighting: "Warm, natural, emotional, authentic",
      composition: "Family moments, home buying, life achievements",
      mood: "Aspirational, emotional, supportive, life-changing",
      technicalSpecs: "35mm f/1.4, ISO 400, natural light, candid moments",
      bestFor: ["mortgages", "savings", "life-insurance", "family-banking"],
      cannesLionsScore: 90
    },
    {
      name: "Business Growth",
      category: "Corporate Photography",
      reference: "Business banking campaigns",
      lighting: "Professional, dynamic, growth-oriented",
      composition: "Entrepreneurs, business success, growth metaphors",
      mood: "Dynamic, supportive, growth, partnership",
      technicalSpecs: "50mm f/2.8, ISO 200, mixed lighting, business context",
      bestFor: ["business-banking", "SME", "corporate", "growth"],
      cannesLionsScore: 87
    },
    {
      name: "Data & Analytics",
      category: "Conceptual Photography",
      reference: "Bloomberg, Reuters financial imagery",
      lighting: "Screen glow, data visualization, analytical",
      composition: "Charts, data flows, market analysis, intelligence",
      mood: "Intelligent, analytical, precise, informed",
      technicalSpecs: "50mm f/2.8, ISO 200, screen lighting, data context",
      bestFor: ["trading", "analytics", "investment", "market-data"],
      cannesLionsScore: 86
    },
    {
      name: "Security & Protection",
      category: "Conceptual Photography",
      reference: "Banking security campaigns",
      lighting: "Professional, secure, trustworthy",
      composition: "Security metaphors, protection symbols, trust",
      mood: "Secure, protected, trustworthy, safe",
      technicalSpecs: "50mm f/2.8, ISO 200, studio lighting, conceptual",
      bestFor: ["security", "fraud-protection", "insurance", "safety"],
      cannesLionsScore: 85
    },
    {
      name: "Global Markets",
      category: "Architectural/Conceptual Photography",
      reference: "International banking campaigns",
      lighting: "Dramatic, global, impressive scale",
      composition: "Financial districts, global connectivity, world markets",
      mood: "Global, powerful, connected, prestigious",
      technicalSpecs: "24mm f/4, ISO 200, architectural lighting, wide angle",
      bestFor: ["international", "markets", "global-banking", "investment"],
      cannesLionsScore: 88
    },
    {
      name: "Sustainable Finance",
      category: "Lifestyle/Conceptual Photography",
      reference: "ESG and sustainable banking",
      lighting: "Natural, green, sustainable feel",
      composition: "Nature, sustainability, responsible investment",
      mood: "Sustainable, responsible, green, ethical",
      technicalSpecs: "35mm f/2.8, ISO 400, natural light, environmental",
      bestFor: ["ESG", "sustainable-investment", "green-finance", "ethical"],
      cannesLionsScore: 87
    },
    {
      name: "Retirement Planning",
      category: "Lifestyle Photography",
      reference: "Pension and retirement campaigns",
      lighting: "Warm, peaceful, secure, comfortable",
      composition: "Happy retirees, peaceful lifestyle, security",
      mood: "Peaceful, secure, comfortable, fulfilled",
      technicalSpecs: "50mm f/2, ISO 400, warm natural light, lifestyle",
      bestFor: ["retirement", "pension", "long-term-savings", "planning"],
      cannesLionsScore: 86
    },
    {
      name: "Fintech Innovation",
      category: "Tech/Product Photography",
      reference: "Stripe, Square, PayPal campaigns",
      lighting: "Clean, modern, tech-forward, innovative",
      composition: "Payment devices, apps, seamless transactions",
      mood: "Innovative, seamless, modern, efficient",
      technicalSpecs: "85mm f/2.8, ISO 100, product lighting, tech context",
      bestFor: ["payments", "fintech", "innovation", "digital"],
      cannesLionsScore: 89
    }
  ],

  contexts: [
    {
      name: "Premium Bank Branch",
      description: "Modern, elegant bank branch with premium finishes",
      usageOccasions: ["retail-banking", "premium", "service", "consultation"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Financial District",
      description: "Impressive financial district with iconic architecture",
      usageOccasions: ["corporate", "investment", "global", "prestige"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Home Purchase Moment",
      description: "Family receiving keys to new home, milestone moment",
      usageOccasions: ["mortgage", "home-buying", "family", "milestone"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Mobile Banking Lifestyle",
      description: "Modern lifestyle with seamless mobile banking",
      usageOccasions: ["digital", "mobile", "convenience", "modern"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Business Meeting",
      description: "Professional business meeting for financial planning",
      usageOccasions: ["business", "corporate", "planning", "advisory"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Trading Floor",
      description: "Dynamic trading environment with market data",
      usageOccasions: ["trading", "markets", "investment", "dynamic"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Retirement Paradise",
      description: "Peaceful retirement setting, enjoying life",
      usageOccasions: ["retirement", "pension", "lifestyle", "peace"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Startup Office",
      description: "Modern startup environment for business banking",
      usageOccasions: ["startup", "SME", "business", "growth"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Sustainable Future",
      description: "Green environment representing sustainable finance",
      usageOccasions: ["ESG", "sustainable", "green", "responsible"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Family Planning",
      description: "Family discussing financial future together",
      usageOccasions: ["savings", "planning", "family", "future"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    }
  ],

  colorPalettes: [
    {
      name: "Trust Blue",
      description: "Classic banking blue conveying trust and stability",
      colors: ["#003366", "#0052CC", "#FFFFFF", "#F5F7FA", "#1A1A1A"],
      bestFor: ["traditional-banking", "trust", "stability", "corporate"],
      mood: "trustworthy, stable, professional, reliable",
      brandIntegration: 90
    },
    {
      name: "Premium Gold",
      description: "Sophisticated gold palette for wealth management",
      colors: ["#1A1A1A", "#D4AF37", "#FFFFFF", "#F5F5F5", "#4A4A4A"],
      bestFor: ["private-banking", "wealth", "premium", "luxury"],
      mood: "premium, sophisticated, exclusive, prestigious",
      brandIntegration: 85
    },
    {
      name: "Fintech Fresh",
      description: "Modern, vibrant palette for digital banking",
      colors: ["#6366F1", "#8B5CF6", "#FFFFFF", "#F8FAFC", "#1E293B"],
      bestFor: ["fintech", "digital", "modern", "innovative"],
      mood: "modern, innovative, fresh, dynamic",
      brandIntegration: 80
    },
    {
      name: "Green Finance",
      description: "Sustainable palette for ESG and green finance",
      colors: ["#059669", "#10B981", "#FFFFFF", "#ECFDF5", "#1F2937"],
      bestFor: ["ESG", "sustainable", "green", "ethical"],
      mood: "sustainable, responsible, green, ethical",
      brandIntegration: 80
    },
    {
      name: "Growth Orange",
      description: "Dynamic palette for business growth",
      colors: ["#EA580C", "#F97316", "#FFFFFF", "#FFF7ED", "#1C1917"],
      bestFor: ["business", "growth", "SME", "dynamic"],
      mood: "dynamic, growth, energetic, supportive",
      brandIntegration: 75
    },
    {
      name: "Security Shield",
      description: "Protective palette for security messaging",
      colors: ["#1E3A5F", "#3B82F6", "#FFFFFF", "#EFF6FF", "#111827"],
      bestFor: ["security", "protection", "insurance", "safety"],
      mood: "secure, protective, trustworthy, safe",
      brandIntegration: 85
    },
    {
      name: "Retirement Warm",
      description: "Warm, comfortable palette for retirement",
      colors: ["#92400E", "#D97706", "#FFFFFF", "#FFFBEB", "#1C1917"],
      bestFor: ["retirement", "pension", "comfort", "peace"],
      mood: "warm, comfortable, peaceful, secure",
      brandIntegration: 80
    },
    {
      name: "Market Data",
      description: "Analytical palette for trading and markets",
      colors: ["#0F172A", "#22C55E", "#EF4444", "#FFFFFF", "#64748B"],
      bestFor: ["trading", "markets", "analytics", "data"],
      mood: "analytical, precise, dynamic, informed",
      brandIntegration: 75
    }
  ],

  frameworks: [
    {
      name: "Trust Building",
      structure: "Need → Trust → Partnership → Security",
      application: "Construit la confiance à travers la fiabilité et l'expertise",
      bestFor: ["banking", "investment", "advisory", "long-term"]
    },
    {
      name: "Life Journey",
      structure: "Dream → Plan → Achieve → Enjoy",
      application: "Accompagne les moments importants de la vie",
      bestFor: ["mortgages", "savings", "retirement", "milestones"]
    },
    {
      name: "Business Growth",
      structure: "Vision → Support → Growth → Success",
      application: "Soutient la croissance des entreprises",
      bestFor: ["business-banking", "SME", "corporate", "growth"]
    },
    {
      name: "Innovation Story",
      structure: "Problem → Innovation → Solution → Convenience",
      application: "Met en avant l'innovation et la simplicité",
      bestFor: ["fintech", "digital", "payments", "modern"]
    }
  ],

  lightingSetups: [
    {
      name: "Corporate Premium",
      timeOfDay: "Any (controlled)",
      characteristics: "Even, sophisticated, trustworthy, premium",
      mood: "Professional, trustworthy, premium, sophisticated",
      technicalDetails: "Softboxes, fill light, premium background, even exposure"
    },
    {
      name: "Warm Lifestyle",
      timeOfDay: "Golden hour/Daytime",
      characteristics: "Warm, natural, emotional, authentic",
      mood: "Warm, emotional, aspirational, human",
      technicalDetails: "Natural window light, warm color temperature, soft shadows"
    },
    {
      name: "Tech Modern",
      timeOfDay: "Any",
      characteristics: "Clean, bright, modern, tech-forward",
      mood: "Modern, innovative, clean, efficient",
      technicalDetails: "Even lighting, screen integration, clean backgrounds"
    },
    {
      name: "Data Ambient",
      timeOfDay: "Any",
      characteristics: "Screen glow, data visualization, analytical",
      mood: "Analytical, dynamic, informed, precise",
      technicalDetails: "Screen as light source, ambient fill, data context"
    }
  ],

  bestPractices: [
    "Always convey trust and security in financial imagery",
    "Show real people achieving real financial goals",
    "Use diverse representation across all demographics",
    "Balance professionalism with approachability",
    "Show technology as enabler, not barrier",
    "Emphasize human advisors for complex products",
    "Use data visualization to simplify complex concepts",
    "Show the emotional benefit, not just the product",
    "Include sustainability messaging where relevant",
    "Maintain regulatory compliance in all imagery"
  ],

  avoidances: [
    "Avoid imagery that suggests gambling or risk-taking",
    "Don't use generic money/cash imagery",
    "Avoid cold, impersonal corporate imagery",
    "Don't show stressed or worried customers",
    "Avoid outdated technology or banking environments",
    "Don't use imagery that excludes any demographic",
    "Avoid overly complex financial jargon visually",
    "Don't show unrealistic wealth or lifestyle promises",
    "Avoid imagery that could be seen as predatory",
    "Don't neglect security and trust messaging"
  ]
};
