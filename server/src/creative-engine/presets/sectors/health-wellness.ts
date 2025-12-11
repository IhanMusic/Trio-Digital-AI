/**
 * 🏥 HEALTH & WELLNESS - PRESETS SECTORIELS
 * 
 * Presets créatifs ultra-spécialisés pour le secteur Santé et Services sociaux
 * Qualité Cannes Lions garantie
 * 
 * Catégories couvertes:
 * - Hôpitaux
 * - Cliniques
 * - Médecine générale
 * - Spécialités médicales
 * - Pharmacies
 * - Laboratoires d'analyses
 * - Imagerie médicale
 * - Soins à domicile
 * - Maisons de retraite
 * - Handicap
 * - Aide sociale
 * - Télémédecine
 */

import { SectorPreset } from '../types';

export const HEALTH_WELLNESS_PRESET: SectorPreset = {
  sector: 'health-wellness',
  displayName: 'Santé & Services sociaux',

  photographicStyles: [
    {
      name: "Compassionate Care",
      category: "Healthcare Photography",
      reference: "Mayo Clinic, Cleveland Clinic campaigns",
      lighting: "Soft, warm, caring, professional",
      composition: "Doctor-patient interaction, caring moments, trust",
      mood: "Compassionate, caring, trustworthy, professional",
      technicalSpecs: "50mm f/2, ISO 400, soft natural light, intimate",
      bestFor: ["hospitals", "clinics", "patient-care", "medical"],
      cannesLionsScore: 91
    },
    {
      name: "Modern Medical Excellence",
      category: "Healthcare Photography",
      reference: "Johns Hopkins, Stanford Health campaigns",
      lighting: "Clean, bright, professional, modern",
      composition: "State-of-the-art facilities, advanced technology, expertise",
      mood: "Advanced, professional, innovative, trustworthy",
      technicalSpecs: "24-70mm f/2.8, ISO 200, controlled lighting, medical",
      bestFor: ["hospitals", "specialties", "technology", "innovation"],
      cannesLionsScore: 90
    },
    {
      name: "Wellness Lifestyle",
      category: "Lifestyle Photography",
      reference: "Wellness and preventive care campaigns",
      lighting: "Bright, natural, healthy, optimistic",
      composition: "Healthy lifestyles, prevention, wellness activities",
      mood: "Healthy, optimistic, active, balanced",
      technicalSpecs: "35mm f/1.8, ISO 400, natural light, lifestyle",
      bestFor: ["wellness", "prevention", "lifestyle", "health-promotion"],
      cannesLionsScore: 88
    },
    {
      name: "Pharmacy Trust",
      category: "Retail Healthcare Photography",
      reference: "CVS, Walgreens, pharmacy campaigns",
      lighting: "Bright, clean, accessible, professional",
      composition: "Pharmacist consultation, products, accessibility",
      mood: "Accessible, trustworthy, helpful, professional",
      technicalSpecs: "35mm f/2.8, ISO 400, retail lighting, service",
      bestFor: ["pharmacy", "retail-health", "accessibility", "consultation"],
      cannesLionsScore: 85
    },
    {
      name: "Laboratory Precision",
      category: "Scientific Photography",
      reference: "Lab and diagnostic campaigns",
      lighting: "Clean, precise, scientific, professional",
      composition: "Lab equipment, precision work, scientific accuracy",
      mood: "Precise, scientific, accurate, professional",
      technicalSpecs: "100mm macro f/2.8, ISO 200, controlled lighting, scientific",
      bestFor: ["laboratories", "diagnostics", "research", "precision"],
      cannesLionsScore: 86
    },
    {
      name: "Home Care Warmth",
      category: "Healthcare/Lifestyle Photography",
      reference: "Home healthcare campaigns",
      lighting: "Warm, comfortable, caring, home environment",
      composition: "Care at home, dignity, comfort, support",
      mood: "Warm, caring, dignified, supportive",
      technicalSpecs: "35mm f/1.4, ISO 400, warm natural light, home",
      bestFor: ["home-care", "elderly-care", "support", "dignity"],
      cannesLionsScore: 89
    },
    {
      name: "Senior Living Dignity",
      category: "Lifestyle Photography",
      reference: "Senior care and retirement campaigns",
      lighting: "Warm, dignified, comfortable, respectful",
      composition: "Active seniors, dignity, quality of life, community",
      mood: "Dignified, active, comfortable, respected",
      technicalSpecs: "50mm f/2, ISO 400, warm natural light, lifestyle",
      bestFor: ["senior-care", "retirement", "dignity", "quality-of-life"],
      cannesLionsScore: 88
    },
    {
      name: "Telehealth Modern",
      category: "Tech/Healthcare Photography",
      reference: "Telemedicine and digital health campaigns",
      lighting: "Modern, clean, tech-forward, accessible",
      composition: "Video consultations, digital health, convenience",
      mood: "Modern, convenient, accessible, innovative",
      technicalSpecs: "35mm f/1.8, ISO 400, screen lighting, tech context",
      bestFor: ["telehealth", "digital-health", "convenience", "modern"],
      cannesLionsScore: 87
    },
    {
      name: "Mental Health Support",
      category: "Healthcare/Lifestyle Photography",
      reference: "Mental health awareness campaigns",
      lighting: "Soft, calming, supportive, hopeful",
      composition: "Support, hope, recovery, understanding",
      mood: "Supportive, hopeful, understanding, calming",
      technicalSpecs: "50mm f/1.8, ISO 400, soft natural light, intimate",
      bestFor: ["mental-health", "support", "therapy", "wellness"],
      cannesLionsScore: 90
    },
    {
      name: "Pediatric Joy",
      category: "Healthcare Photography",
      reference: "Children's hospital campaigns",
      lighting: "Bright, cheerful, warm, child-friendly",
      composition: "Happy children, caring staff, colorful environments",
      mood: "Joyful, caring, child-friendly, hopeful",
      technicalSpecs: "35mm f/1.8, ISO 400, bright natural light, candid",
      bestFor: ["pediatrics", "children", "family", "care"],
      cannesLionsScore: 91
    }
  ],

  contexts: [
    {
      name: "Modern Hospital",
      description: "State-of-the-art hospital facility",
      usageOccasions: ["hospital", "medical", "care", "treatment"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Doctor's Office",
      description: "Welcoming medical consultation room",
      usageOccasions: ["consultation", "primary-care", "checkup", "advice"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Pharmacy Counter",
      description: "Modern pharmacy with helpful staff",
      usageOccasions: ["pharmacy", "medication", "consultation", "retail"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Laboratory Setting",
      description: "Clean, precise laboratory environment",
      usageOccasions: ["lab", "diagnostics", "testing", "research"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Patient Home",
      description: "Comfortable home care environment",
      usageOccasions: ["home-care", "recovery", "support", "comfort"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Senior Community",
      description: "Active, dignified senior living community",
      usageOccasions: ["senior-care", "community", "lifestyle", "dignity"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Wellness Center",
      description: "Modern wellness and prevention facility",
      usageOccasions: ["wellness", "prevention", "fitness", "health"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Therapy Room",
      description: "Calm, supportive therapy environment",
      usageOccasions: ["therapy", "mental-health", "support", "recovery"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Children's Ward",
      description: "Colorful, child-friendly hospital area",
      usageOccasions: ["pediatrics", "children", "family", "care"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    },
    {
      name: "Telehealth Setup",
      description: "Modern video consultation environment",
      usageOccasions: ["telehealth", "digital", "convenience", "remote"],
      culturalRelevance: ["universal"],
      seasonalFit: ["all-seasons"]
    }
  ],

  colorPalettes: [
    {
      name: "Medical Trust",
      description: "Classic healthcare blue conveying trust and care",
      colors: ["#0077B6", "#00B4D8", "#FFFFFF", "#F0F9FF", "#023E8A"],
      bestFor: ["hospitals", "clinics", "medical", "trust"],
      mood: "trustworthy, professional, caring, clean",
      brandIntegration: 90
    },
    {
      name: "Wellness Green",
      description: "Fresh green palette for wellness and prevention",
      colors: ["#059669", "#10B981", "#FFFFFF", "#ECFDF5", "#064E3B"],
      bestFor: ["wellness", "prevention", "health", "natural"],
      mood: "healthy, fresh, natural, balanced",
      brandIntegration: 85
    },
    {
      name: "Caring Warmth",
      description: "Warm palette for compassionate care",
      colors: ["#EA580C", "#FB923C", "#FFFFFF", "#FFF7ED", "#7C2D12"],
      bestFor: ["home-care", "senior-care", "compassion", "warmth"],
      mood: "warm, caring, compassionate, supportive",
      brandIntegration: 80
    },
    {
      name: "Pediatric Joy",
      description: "Bright, playful palette for children's health",
      colors: ["#F472B6", "#A78BFA", "#34D399", "#FBBF24", "#FFFFFF"],
      bestFor: ["pediatrics", "children", "family", "joy"],
      mood: "joyful, playful, caring, hopeful",
      brandIntegration: 75
    },
    {
      name: "Mental Health Calm",
      description: "Calming palette for mental health services",
      colors: ["#7C3AED", "#A78BFA", "#FFFFFF", "#F5F3FF", "#4C1D95"],
      bestFor: ["mental-health", "therapy", "calm", "support"],
      mood: "calming, supportive, hopeful, understanding",
      brandIntegration: 85
    },
    {
      name: "Laboratory Precision",
      description: "Clean, precise palette for diagnostics",
      colors: ["#0EA5E9", "#38BDF8", "#FFFFFF", "#F0F9FF", "#0369A1"],
      bestFor: ["laboratory", "diagnostics", "precision", "science"],
      mood: "precise, scientific, clean, professional",
      brandIntegration: 85
    },
    {
      name: "Pharmacy Accessible",
      description: "Accessible, friendly palette for pharmacy",
      colors: ["#16A34A", "#4ADE80", "#FFFFFF", "#F0FDF4", "#166534"],
      bestFor: ["pharmacy", "retail", "accessible", "helpful"],
      mood: "accessible, helpful, trustworthy, friendly",
      brandIntegration: 80
    },
    {
      name: "Digital Health",
      description: "Modern palette for telehealth services",
      colors: ["#6366F1", "#818CF8", "#FFFFFF", "#EEF2FF", "#3730A3"],
      bestFor: ["telehealth", "digital", "modern", "innovation"],
      mood: "modern, innovative, convenient, accessible",
      brandIntegration: 80
    }
  ],

  frameworks: [
    {
      name: "Care Journey",
      structure: "Concern → Consultation → Care → Recovery",
      application: "Illustre le parcours de soins du patient",
      bestFor: ["hospitals", "clinics", "treatment", "recovery"]
    },
    {
      name: "Prevention First",
      structure: "Awareness → Prevention → Health → Wellness",
      application: "Promeut la prévention et le bien-être",
      bestFor: ["wellness", "prevention", "health-promotion", "lifestyle"]
    },
    {
      name: "Compassionate Support",
      structure: "Need → Understanding → Support → Dignity",
      application: "Montre le soutien compatissant et la dignité",
      bestFor: ["home-care", "senior-care", "mental-health", "support"]
    },
    {
      name: "Innovation in Care",
      structure: "Challenge → Innovation → Solution → Better Outcomes",
      application: "Met en avant l'innovation médicale",
      bestFor: ["technology", "telehealth", "research", "innovation"]
    }
  ],

  lightingSetups: [
    {
      name: "Clinical Clean",
      timeOfDay: "Any",
      characteristics: "Bright, clean, professional, even",
      mood: "Professional, clean, trustworthy, medical",
      technicalDetails: "Even lighting, bright exposure, clean backgrounds"
    },
    {
      name: "Warm Caring",
      timeOfDay: "Daytime",
      characteristics: "Warm, soft, caring, comfortable",
      mood: "Caring, warm, supportive, human",
      technicalDetails: "Natural window light, warm color temperature, soft shadows"
    },
    {
      name: "Calming Soft",
      timeOfDay: "Any",
      characteristics: "Soft, calming, supportive, gentle",
      mood: "Calming, supportive, peaceful, hopeful",
      technicalDetails: "Diffused light, soft shadows, gentle exposure"
    },
    {
      name: "Modern Tech",
      timeOfDay: "Any",
      characteristics: "Clean, modern, tech-forward",
      mood: "Modern, innovative, professional, accessible",
      technicalDetails: "Even lighting, screen integration, clean backgrounds"
    }
  ],

  bestPractices: [
    "Always show compassion and human connection in healthcare",
    "Use diverse representation across all demographics",
    "Show patients with dignity and respect",
    "Emphasize positive outcomes and hope",
    "Include healthcare professionals as caring experts",
    "Show modern facilities and technology appropriately",
    "Balance clinical accuracy with emotional warmth",
    "Highlight accessibility and inclusivity",
    "Show real moments of care and support",
    "Maintain patient privacy and dignity in all imagery"
  ],

  avoidances: [
    "Avoid showing patients in distress or pain",
    "Don't use clinical imagery that feels cold or impersonal",
    "Avoid stereotypical representations of illness",
    "Don't show outdated medical equipment or facilities",
    "Avoid imagery that could cause anxiety or fear",
    "Don't neglect diversity in patient and staff representation",
    "Avoid overly staged or artificial medical scenarios",
    "Don't show identifiable patient information",
    "Avoid imagery that stigmatizes any condition",
    "Don't use imagery that could be seen as exploitative"
  ]
};
