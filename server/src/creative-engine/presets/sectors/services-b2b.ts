/**
 * 🏢 SERVICES B2B - PRESETS SECTORIELS
 * 
 * Presets créatifs ultra-spécialisés pour le secteur Services B2B
 * Qualité Cannes Lions garantie
 * 
 * Catégories couvertes:
 * - Conseil en management
 * - Services informatiques
 * - Nettoyage industriel
 * - Sécurité
 * - Logistique
 * - Maintenance
 * - Formation professionnelle
 * - Ressources humaines
 * - Communication B2B
 * - Services financiers
 * - Externalisation
 * - Facility management
 */

import { SectorPreset } from '../types';

export const SERVICES_B2B_PRESET: SectorPreset = {
  sector: 'services-b2b',
  displayName: 'Services B2B',

  photographicStyles: [
    {
      name: "Corporate Excellence",
      category: "Corporate Photography",
      reference: "McKinsey, Deloitte, Accenture campaigns",
      lighting: "Professional studio or natural office light, clean and polished",
      composition: "Confident professionals, modern architecture, premium environments",
      mood: "Professional, trustworthy, expert, premium",
      technicalSpecs: "85mm f/2.8, ISO 200, soft studio light, corporate setting",
      bestFor: ["consulting", "management", "professional-services", "enterprise"],
      cannesLionsScore: 90
    },
    {
      name: "Collaborative Partnership",
      category: "Lifestyle Photography",
      reference: "Salesforce, HubSpot campaigns",
      lighting: "Bright, natural office light, warm and inviting",
      composition: "Team collaboration, handshakes, meeting rooms, partnership",
      mood: "Collaborative, trustworthy, partnership, success",
      technicalSpecs: "35mm f/1.8, ISO 400, natural light, candid moments",
      bestFor: ["partnerships", "consulting", "collaboration", "client-relations"],
      cannesLionsScore: 88
    },
    {
      name: "Innovation Hub",
      category: "Architectural Photography",
      reference: "WeWork, Google offices",
      lighting: "Modern architectural lighting, clean lines, contemporary",
      composition: "Modern workspaces, innovation centers, tech-forward environments",
      mood: "Innovative, modern, dynamic, forward-thinking",
      technicalSpecs: "24mm f/4, ISO 200, architectural lighting, wide angle",
      bestFor: ["tech-services", "innovation", "startups", "modern-business"],
      cannesLionsScore: 87
    },
    {
      name: "Data-Driven Insights",
      category: "Conceptual Photography",
      reference: "IBM, SAP campaigns",
      lighting: "Clean studio, screen glow, data visualization elements",
      composition: "Charts, dashboards, analytics visuals, business intelligence",
      mood: "Intelligent, analytical, precise, insightful",
      technicalSpecs: "50mm f/2.8, ISO 200, mixed lighting, screen integration",
      bestFor: ["analytics", "consulting", "data-services", "business-intelligence"],
      cannesLionsScore: 86
    },
    {
      name: "Industrial Expertise",
      category: "Industrial Photography",
      reference: "Siemens, GE industrial campaigns",
      lighting: "Industrial ambient, dramatic shadows, scale emphasis",
      composition: "Large-scale operations, machinery, industrial environments",
      mood: "Powerful, reliable, expert, industrial",
      technicalSpecs: "24-70mm f/2.8, ISO 800, available light, industrial setting",
      bestFor: ["industrial-services", "maintenance", "logistics", "manufacturing"],
      cannesLionsScore: 85
    },
    {
      name: "Human Capital",
      category: "Portrait Photography",
      reference: "LinkedIn, Indeed campaigns",
      lighting: "Flattering portrait light, professional but approachable",
      composition: "Professional portraits, diverse teams, human connection",
      mood: "Human, professional, diverse, approachable",
      technicalSpecs: "85mm f/1.8, ISO 200, portrait lighting, clean background",
      bestFor: ["HR-services", "recruitment", "training", "people-focused"],
      cannesLionsScore: 87
    },
    {
      name: "Security & Protection",
      category: "Conceptual Photography",
      reference: "Enterprise security campaigns",
      lighting: "Professional, trustworthy, clean corporate",
      composition: "Protection metaphors, secure environments, trust symbols",
      mood: "Secure, trustworthy, protective, reliable",
      technicalSpecs: "50mm f/2.8, ISO 200, studio lighting, conceptual",
      bestFor: ["security-services", "compliance", "risk-management", "protection"],
      cannesLionsScore: 84
    },
    {
      name: "Global Reach",
      category: "Conceptual Photography",
      reference: "DHL, FedEx, global logistics",
      lighting: "Bright, international, diverse settings",
      composition: "Global maps, international teams, worldwide operations",
      mood: "Global, connected, expansive, reliable",
      technicalSpecs: "35mm f/2.8, ISO 400, varied lighting, international",
      bestFor: ["logistics", "global-services", "international", "supply-chain"],
      cannesLionsScore: 86
    },
    {
      name: "Clean & Professional",
      category: "Service Photography",
      reference: "ISS, Sodexo campaigns",
      lighting: "Bright, clean, hygienic appearance",
      composition: "Clean environments, professional staff, quality service",
      mood: "Clean, professional, reliable, quality",
      technicalSpecs: "35mm f/2.8, ISO 400, bright lighting, service context",
      bestFor: ["facility-management", "cleaning", "maintenance", "services"],
      cannesLionsScore: 83
    },
    {
      name: "Financial Trust",
      category: "Corporate Photography",
      reference: "Goldman Sachs, JP Morgan campaigns",
      lighting: "Premium, sophisticated, trustworthy",
      composition: "Financial districts, premium offices, trust symbols",
      mood: "Trustworthy, premium, sophisticated, reliable",
      technicalSpecs: "50mm f/2.8, ISO 200, premium lighting, corporate",
      bestFor: ["financial-services", "banking", "investment", "advisory"],
      cannesLionsScore: 89
    }
  ],

  contexts: [
    {
      name: "Executive Boardroom",
      description: "Premium boardroom with modern design and professional atmosphere",
      usageOccasions: ["executive", "strategy", "decision-making", "leadership"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Modern Open Office",
      description: "Contemporary open-plan workspace with collaborative areas",
      usageOccasions: ["collaboration", "teamwork", "modern-business", "innovation"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Client Meeting Room",
      description: "Professional meeting space for client presentations",
      usageOccasions: ["client-meetings", "presentations", "partnerships", "sales"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Industrial Facility",
      description: "Large-scale industrial or logistics environment",
      usageOccasions: ["industrial", "logistics", "operations", "manufacturing"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Training Center",
      description: "Professional training and development facility",
      usageOccasions: ["training", "development", "education", "workshops"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Data Center",
      description: "High-tech server room and IT infrastructure",
      usageOccasions: ["IT-services", "cloud", "infrastructure", "technology"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Global Headquarters",
      description: "Impressive corporate headquarters with international presence",
      usageOccasions: ["corporate", "global", "enterprise", "headquarters"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Conference Event",
      description: "Professional conference or industry event setting",
      usageOccasions: ["events", "conferences", "networking", "industry"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Remote Collaboration",
      description: "Virtual meeting and remote work environment",
      usageOccasions: ["remote-work", "virtual", "digital", "collaboration"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Client Site",
      description: "On-site service delivery at client location",
      usageOccasions: ["on-site", "service-delivery", "client-work", "field"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    }
  ],

  colorPalettes: [
    {
      name: "Corporate Blue",
      description: "Professional blue palette conveying trust and expertise",
      colors: ["#003366", "#0066CC", "#FFFFFF", "#F5F5F5", "#333333"],
      bestFor: ["consulting", "professional-services", "enterprise", "corporate"],
      mood: "trustworthy, professional, reliable, expert",
      brandIntegration: 90
    },
    {
      name: "Innovation Green",
      description: "Fresh green palette for growth and innovation",
      colors: ["#00A86B", "#34C759", "#FFFFFF", "#F0F0F0", "#2C3E50"],
      bestFor: ["growth", "sustainability", "innovation", "progress"],
      mood: "innovative, growing, sustainable, fresh",
      brandIntegration: 80
    },
    {
      name: "Premium Gold",
      description: "Sophisticated palette for premium services",
      colors: ["#1A1A1A", "#D4AF37", "#FFFFFF", "#F5F5F5", "#4A4A4A"],
      bestFor: ["premium", "luxury-services", "executive", "high-end"],
      mood: "premium, sophisticated, exclusive, prestigious",
      brandIntegration: 85
    },
    {
      name: "Tech Modern",
      description: "Contemporary palette for tech-forward services",
      colors: ["#6366F1", "#8B5CF6", "#FFFFFF", "#F8FAFC", "#1E293B"],
      bestFor: ["tech-services", "digital", "innovation", "modern"],
      mood: "modern, innovative, digital, forward-thinking",
      brandIntegration: 80
    },
    {
      name: "Industrial Strength",
      description: "Strong, reliable palette for industrial services",
      colors: ["#374151", "#6B7280", "#F59E0B", "#FFFFFF", "#1F2937"],
      bestFor: ["industrial", "manufacturing", "logistics", "operations"],
      mood: "strong, reliable, industrial, capable",
      brandIntegration: 75
    },
    {
      name: "Human Warmth",
      description: "Warm palette for people-focused services",
      colors: ["#F97316", "#FB923C", "#FFFFFF", "#FFF7ED", "#1C1917"],
      bestFor: ["HR", "training", "recruitment", "people-services"],
      mood: "warm, human, approachable, caring",
      brandIntegration: 80
    },
    {
      name: "Security Shield",
      description: "Protective palette for security services",
      colors: ["#1E3A5F", "#3B82F6", "#FFFFFF", "#E5E7EB", "#111827"],
      bestFor: ["security", "compliance", "protection", "risk"],
      mood: "secure, protective, trustworthy, vigilant",
      brandIntegration: 85
    },
    {
      name: "Global Connect",
      description: "International palette for global services",
      colors: ["#0EA5E9", "#06B6D4", "#FFFFFF", "#F0FDFA", "#0F172A"],
      bestFor: ["global", "international", "logistics", "connectivity"],
      mood: "global, connected, expansive, international",
      brandIntegration: 80
    }
  ],

  frameworks: [
    {
      name: "Problem-Solution-Result",
      structure: "Challenge → Expertise → Solution → Measurable Results",
      application: "Démontre la valeur ajoutée à travers des résultats concrets",
      bestFor: ["consulting", "professional-services", "solutions", "ROI"]
    },
    {
      name: "Partnership Journey",
      structure: "Discovery → Collaboration → Implementation → Success",
      application: "Illustre le parcours de partenariat avec le client",
      bestFor: ["long-term-services", "partnerships", "consulting", "advisory"]
    },
    {
      name: "Expertise Showcase",
      structure: "Industry Knowledge → Methodology → Case Study → Proof",
      application: "Met en avant l'expertise et les références",
      bestFor: ["specialized-services", "consulting", "professional", "expertise"]
    },
    {
      name: "Operational Excellence",
      structure: "Process → Efficiency → Quality → Reliability",
      application: "Communique l'excellence opérationnelle et la fiabilité",
      bestFor: ["operations", "logistics", "facility-management", "services"]
    }
  ],

  lightingSetups: [
    {
      name: "Corporate Professional",
      timeOfDay: "Any (controlled)",
      characteristics: "Even, flattering, professional, clean",
      mood: "Professional, trustworthy, polished, corporate",
      technicalDetails: "Softboxes, fill light, clean background, even exposure"
    },
    {
      name: "Natural Office",
      timeOfDay: "Daytime",
      characteristics: "Window light, soft shadows, authentic workspace",
      mood: "Authentic, approachable, modern, human",
      technicalDetails: "Large windows, diffused natural light, minimal artificial"
    },
    {
      name: "Industrial Ambient",
      timeOfDay: "Any",
      characteristics: "Available industrial light, dramatic scale",
      mood: "Powerful, industrial, operational, impressive",
      technicalDetails: "High ISO, available light, wide angle, scale emphasis"
    },
    {
      name: "Event Atmosphere",
      timeOfDay: "Any",
      characteristics: "Stage lighting, presentation atmosphere, professional",
      mood: "Dynamic, professional, engaging, impressive",
      technicalDetails: "Mixed lighting, fast lens, event photography techniques"
    }
  ],

  bestPractices: [
    "Show real professionals and authentic work environments",
    "Emphasize partnership and collaboration over transaction",
    "Use data and results to demonstrate value",
    "Include diverse teams and inclusive imagery",
    "Show technology as enabler, not replacement for human expertise",
    "Highlight industry-specific expertise and knowledge",
    "Use case studies and success stories visually",
    "Balance professionalism with approachability",
    "Show scale and capability for enterprise clients",
    "Maintain consistency across all B2B touchpoints"
  ],

  avoidances: [
    "Avoid generic stock imagery of handshakes and suits",
    "Don't use overly staged or artificial scenarios",
    "Avoid jargon-heavy visuals without clear meaning",
    "Don't show outdated technology or environments",
    "Avoid excluding diversity in professional imagery",
    "Don't use cold, impersonal corporate imagery",
    "Avoid cluttered or unprofessional environments",
    "Don't neglect the human element in B2B services",
    "Avoid imagery that doesn't reflect actual service delivery",
    "Don't use visuals that could apply to any industry"
  ]
};
