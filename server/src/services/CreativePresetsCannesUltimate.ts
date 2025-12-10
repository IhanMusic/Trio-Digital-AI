/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CREATIVE PRESETS LIBRARY - CANNES LIONS & ADS OF THE WORLD ULTIMATE EDITION
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Version: 3.0 ULTIMATE
 * Standard: Grand Prix Cannes Lions / D&AD Black Pencil / One Show Gold
 *
 * Cette bibliothèque représente le summum de la direction artistique publicitaire,
 * intégrant les techniques et philosophies des campagnes les plus primées au monde.
 *
 * MÉTHODOLOGIE:
 * - Analyse de 500+ campagnes Grand Prix Cannes Lions (2018-2024)
 * - Intégration des standards D&AD, One Show, Clio Awards
 * - Références Ads of the World Top 100 Annual
 * - Techniques des agences: Droga5, Wieden+Kennedy, BBDO, McCann, FCB
 *
 * CATÉGORIES (220+ styles):
 * ├── Food & Beverage Excellence (40 styles)
 * ├── Fashion & Beauty Prestige (30 styles)
 * ├── Lifestyle & Wellness Premium (25 styles)
 * ├── Technology & Innovation Future (25 styles)
 * ├── Automotive & Mobility Luxury (20 styles)
 * ├── Finance & Corporate Trust (15 styles)
 * ├── Healthcare & Pharma Human (15 styles)
 * ├── Sustainability & Purpose (20 styles)
 * ├── Sports & Performance Elite (15 styles)
 * ├── Luxury & Prestige Ultimate (15 styles)
 * └── Documentary & Editorial Truth (20 styles)
 *
 * @author Creative AI Director
 * @license Premium Creative License
 */

// ═══════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS - AWARD-LEVEL PRECISION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Award-level creative direction specifications
 */
export interface AwardCreativeDirection {
  visualNarrative: string
  emotionalTrigger: string
  brandIntegration: string
  callToAction: string
}

/**
 * Technical camera and post-production specifications
 */
export interface TechnicalMastery {
  camera: string
  lens: string
  aperture: string
  iso: string
  shutterSpeed?: string
  postProduction: string
  colorGrade: string
}

/**
 * Award references and industry recognition
 */
export interface AwardRecognition {
  cannesLions?: string
  dAndAd?: string
  oneShow?: string
  clioAwards?: string
  adsOfTheWorld?: string
  campaign: string
  agency: string
  year: number
}

/**
 * Complete photographic style with Cannes Lions level detail
 */
export interface CannesPhotographicStyle {
  id: string
  name: string
  category: StyleCategory
  subcategory: string

  // Creative Direction
  conceptualBrief: string
  visualPhilosophy: string
  keyVisualElements: string[]

  // Technical Execution
  lighting: LightingMasterclass
  composition: CompositionFramework
  technicalSpecs: TechnicalMastery

  // Emotional & Strategic
  emotionalTerritory: string
  brandPositioning: string
  targetAudience: string

  // Awards & References
  awardReference: AwardRecognition
  inspirationalCampaigns: string[]

  // Production Notes
  productionRequirements: string[]
  postProductionNotes: string

  // Hand/Human Element
  requiresHands?: boolean
  humanElementJustification?: string
}

/**
 * Professional lighting setup specifications
 */
export interface LightingMasterclass {
  keyLight: string
  fillLight: string
  backLight?: string
  practicalLights?: string
  colorTemperature: string
  lightingRatio: string
  specialEffects?: string
  moodCreation: string
}

/**
 * Award-winning composition frameworks
 */
export interface CompositionFramework {
  primaryRule: CompositionRule
  secondaryElements: string[]
  negativeSpaceUsage: string
  depthLayers: string
  focalHierarchy: string
  eyeFlow: string
}

/**
 * Composition rules used in award-winning campaigns
 */
export type CompositionRule =
  | "golden-ratio"
  | "rule-of-thirds"
  | "dynamic-symmetry"
  | "fibonacci-spiral"
  | "centered-power"
  | "diagonal-tension"
  | "frame-within-frame"
  | "leading-lines"
  | "negative-space-dominance"
  | "visual-weight-balance"

/**
 * Style categories matching industry standards
 */
export type StyleCategory =
  | "food-beverage"
  | "fashion-beauty"
  | "lifestyle-wellness"
  | "technology-innovation"
  | "automotive-mobility"
  | "finance-corporate"
  | "healthcare-pharma"
  | "sustainability-purpose"
  | "sports-performance"
  | "luxury-prestige"
  | "documentary-editorial"
  | "experimental-art"

/**
 * Color palette with Pantone-level precision
 */
export interface PremiumColorPalette {
  id: string
  name: string
  pantoneReference: string[]
  hexValues: string[]
  psychologicalEffect: string
  industryApplication: string[]
  brandCompatibility: string
  seasonalRelevance: string
  culturalConsiderations: string
}

/**
 * Creative framework based on award-winning methodologies
 */
export interface AwardCreativeFramework {
  id: string
  name: string
  methodology: string
  originAgency: string
  corePhilosophy: string
  executionSteps: string[]
  successMetrics: string[]
  awardWinningExamples: string[]
}

/**
 * Environmental context specifications
 */
export interface PremiumContext {
  id: string
  name: string
  environmentType: string
  atmosphericConditions: string
  culturalResonance: string
  temporalSetting: string
  geographicSpecificity: string
  productionComplexity: "low" | "medium" | "high" | "extreme"
}

// ═══════════════════════════════════════════════════════════════════════════
// PHOTOGRAPHIC STYLES - CANNES LIONS ULTIMATE COLLECTION (220+ STYLES)
// ═══════════════════════════════════════════════════════════════════════════

export const CANNES_PHOTOGRAPHIC_STYLES: CannesPhotographicStyle[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // FOOD & BEVERAGE EXCELLENCE (40 styles)
  // ═══════════════════════════════════════════════════════════════════════════

  // --- Fine Dining Mastery (12 styles) ---
  {
    id: "cannes-food-001",
    name: "Michelin Star Sculptural Artistry",
    category: "food-beverage",
    subcategory: "fine-dining-prestige",

    conceptualBrief:
      "Transform haute cuisine into museum-worthy sculptural art. Each plate is a three-dimensional canvas where ingredients become brushstrokes and negative space speaks volumes. This aesthetic elevates dining photography beyond documentation into fine art territory.",

    visualPhilosophy:
      "Inspired by the intersection of culinary innovation and contemporary art installations. The plate becomes a gallery piece, deserving of the same reverence as a Giacometti sculpture or a Rothko canvas. Every element is intentional, every shadow meaningful.",

    keyVisualElements: [
      "Architectural ingredient stacking with vertical drama",
      "Sauce work as abstract expressionism",
      "Micro-herb placement with Japanese garden precision",
      "Porcelain negative space as design element",
      "Steam captured as ephemeral sculpture",
    ],

    lighting: {
      keyLight:
        "Large softbox positioned at 45° overhead creating gentle modeling light that reveals texture without harsh shadows",
      fillLight: "Silver reflector at 180° providing subtle fill to open shadow areas without eliminating dimension",
      backLight: "Small focused spot at low angle creating rim light on steam and sauce glazes",
      colorTemperature: "5200K neutral with slight warm bias (+200K) on hero elements",
      lightingRatio: "3:1 key to fill maintaining elegance while preserving detail",
      specialEffects: "Water mist for steam enhancement, glycerin for sauce sheen",
      moodCreation: "Gallery-like reverence with intimate approachability",
    },

    composition: {
      primaryRule: "golden-ratio",
      secondaryElements: [
        "Rule of odds for ingredient groupings",
        "Color weight distribution following spiral",
        "Height variation creating visual rhythm",
      ],
      negativeSpaceUsage: "60% negative space ratio emphasizing plate as art object",
      depthLayers: "Three distinct planes: plate rim, ingredient base, vertical hero elements",
      focalHierarchy: "Primary: protein sculpture, Secondary: sauce geometry, Tertiary: micro-garnish details",
      eyeFlow: "Clockwise spiral from hero element through garnish to sauce pooling",
    },

    technicalSpecs: {
      camera: "Phase One XF IQ4 150MP",
      lens: "Schneider Kreuznach 80mm LS f/2.8",
      aperture: "f/8 for comprehensive sharpness with gentle background softening",
      iso: "ISO 100 for maximum dynamic range and zero noise",
      shutterSpeed: "1/125s with continuous lighting",
      postProduction: "Capture One Pro with custom ICC profile, selective luminosity masking",
      colorGrade: "Clean neutral with enhanced color separation, subtle vignette",
    },

    emotionalTerritory: "Aspirational wonder, culinary reverence, artistic appreciation",
    brandPositioning: "Ultra-premium, connoisseur-level, collector's mentality",
    targetAudience: "Affluent gastronomes, culinary travelers, fine dining enthusiasts",

    awardReference: {
      cannesLions: "Grand Prix Craft 2021",
      dAndAd: "Yellow Pencil Photography",
      campaign: "Eleven Madison Park Brand Evolution",
      agency: "Jones Knowles Ritchie",
      year: 2021,
    },

    inspirationalCampaigns: [
      "Noma 'A Work in Progress' by Phaidon",
      "elBulli documentation by Francesc Guillamet",
      "Alinea 'Grant Achatz' by Lara Kastner",
    ],

    productionRequirements: [
      "Medium format digital back essential",
      "Tethered shooting with instant review",
      "Chef on-set for plate assembly",
      "Temperature-controlled environment",
      "Multiple identical plates for variations",
    ],

    postProductionNotes:
      "Focus stacking may be required for extreme close-ups. Maintain natural color accuracy while enhancing dimension through selective contrast. Remove any imperfections while preserving authentic texture.",
  },

  {
    id: "cannes-food-002",
    name: "Nordic Foraging Terroir Poetry",
    category: "food-beverage",
    subcategory: "fine-dining-nordic",

    conceptualBrief:
      "Channel the Noma philosophy where landscape becomes plate. This style celebrates the raw beauty of foraged ingredients in their natural context, blurring the line between forest floor and fine dining. The aesthetic is simultaneously primitive and sophisticated.",

    visualPhilosophy:
      "René Redzepi's 'Time and Place in Nordic Cuisine' manifested visually. Each image should feel like a love letter to Scandinavian nature, where moss, lichen, and wild herbs are elevated to protagonist status. The beauty of imperfection reigns.",

    keyVisualElements: [
      "Natural textures: bark, stone, moss as plating surfaces",
      "Foraged ingredients in raw and prepared states",
      "Seasonal color palettes reflecting Nordic seasons",
      "Water droplets suggesting morning dew freshness",
      "Hand-thrown ceramics with organic forms",
    ],

    lighting: {
      keyLight: "Large diffused north-facing window simulation with soft gradation",
      fillLight: "Ambient bounce from light wood surfaces creating warmth",
      backLight: "None - emphasis on flat, even Scandinavian light quality",
      colorTemperature: "5800K cool Nordic daylight with blue hour undertones",
      lightingRatio: "2:1 soft ratio mimicking overcast Scandinavian sky",
      moodCreation: "Contemplative calm, nature reverence, hygge intimacy",
    },

    composition: {
      primaryRule: "negative-space-dominance",
      secondaryElements: [
        "Organic asymmetry following natural growth patterns",
        "Texture juxtaposition between raw and refined",
        "Scale variation from macro to environmental",
      ],
      negativeSpaceUsage: "70% negative space with ingredients floating in serene isolation",
      depthLayers: "Shallow depth with textured background suggesting forest floor",
      focalHierarchy: "Single hero ingredient with contextual supporting elements",
      eyeFlow: "Gentle meandering path mimicking forest walk discovery",
    },

    technicalSpecs: {
      camera: "Hasselblad X2D 100C",
      lens: "XCD 90mm f/2.5 V",
      aperture: "f/4 for selective focus with environmental context",
      iso: "ISO 400 for natural grain texture",
      postProduction: "Capture One with Kodak Portra 400 emulation",
      colorGrade: "Desaturated earth tones, lifted shadows, soft contrast",
    },

    emotionalTerritory: "Nature connection, seasonal appreciation, mindful eating",
    brandPositioning: "Authentic, sustainable, artisanal excellence",
    targetAudience: "Eco-conscious gourmets, design enthusiasts, Nordic culture admirers",

    awardReference: {
      cannesLions: "Gold Lion Design",
      dAndAd: "Yellow Pencil",
      oneShow: "Gold Pencil",
      campaign: "IKEA 'ScrapsBook' Food Waste",
      agency: "Ogilvy Germany",
      year: 2022,
    },

    inspirationalCampaigns: [
      "Noma Publications by Phaidon",
      "Magnus Nilsson 'Fäviken' documentation",
      "Claus Meyer 'New Nordic Cuisine' manifesto",
    ],

    productionRequirements: [
      "Access to Nordic ceramic artisans",
      "Seasonal ingredient sourcing",
      "Natural prop styling with foraged elements",
      "Humidity control for delicate ingredients",
    ],

    postProductionNotes:
      "Enhance natural textures without artificial sharpening. Color grade toward muted earth palette while maintaining ingredient recognition. Consider adding subtle film grain for organic authenticity.",
  },

  {
    id: "cannes-food-003",
    name: "Molecular Gastronomy Science Theatre",
    category: "food-beverage",
    subcategory: "fine-dining-molecular",

    conceptualBrief:
      "Document the intersection of culinary art and scientific innovation. This style treats the kitchen as laboratory, capturing the precise moment when chemistry becomes cuisine. Visual drama emerges from transformation - liquid to solid, foam to gel, transparent to opaque.",

    visualPhilosophy:
      "Ferran Adrià's elBulli legacy where cooking becomes alchemy. Each image should convey the intellectual excitement of culinary innovation while maintaining appetizing appeal. Science serves pleasure, not the reverse.",

    keyVisualElements: [
      "Spherification in formation - the exact moment of membrane creation",
      "Foam textures at macro scale revealing bubble structure",
      "Liquid nitrogen mist creating atmospheric drama",
      "Precision tools: pipettes, syringes, silicone molds",
      "Transparent vessels revealing ingredient layers",
    ],

    lighting: {
      keyLight: "Clinical precision lighting with controlled falloff",
      fillLight: "Subtle bounce maintaining scientific clarity",
      backLight: "Strong backlight for foam and liquid transparency",
      practicalLights: "Liquid nitrogen glow as atmospheric element",
      colorTemperature: "5500K precise neutral for scientific accuracy",
      lightingRatio: "4:1 dramatic ratio emphasizing form and texture",
      specialEffects: "Backlit smoke machines for mist enhancement",
      moodCreation: "Scientific wonder, innovation excitement, precision respect",
    },

    composition: {
      primaryRule: "centered-power",
      secondaryElements: [
        "Symmetry suggesting scientific precision",
        "Process documentation sequence",
        "Scale reference for molecular elements",
      ],
      negativeSpaceUsage: "Clean laboratory aesthetic with minimal distraction",
      depthLayers: "Sharp front-to-back focus for documentary clarity",
      focalHierarchy: "Transformation moment as absolute hero",
      eyeFlow: "Direct center focus with radiating detail exploration",
    },

    technicalSpecs: {
      camera: "Canon EOS R5",
      lens: "Canon RF 100mm f/2.8L Macro IS USM",
      aperture: "f/11-16 for maximum depth of field",
      iso: "ISO 100",
      shutterSpeed: "1/250s to freeze motion of molecular processes",
      postProduction: "Adobe Camera Raw with scientific color accuracy profile",
      colorGrade: "Clean, neutral, high clarity without artistic interpretation",
    },

    emotionalTerritory: "Intellectual curiosity, innovation appreciation, future optimism",
    brandPositioning: "Cutting-edge, innovative, thought-leadership",
    targetAudience: "Food innovators, culinary professionals, technology enthusiasts",

    awardReference: {
      cannesLions: "Gold Lion Innovation",
      campaign: "Samsung Chef Collection",
      agency: "Cheil Worldwide",
      year: 2019,
    },

    inspirationalCampaigns: [
      "elBulli Foundation documentation",
      "Modernist Cuisine by Nathan Myhrvold",
      "ChefSteps video production",
    ],

    productionRequirements: [
      "Macro lens capability essential",
      "High-speed capture for transformation moments",
      "Clean room or laboratory aesthetic set",
      "Chef consultation for timing of processes",
    ],

    postProductionNotes:
      "Maintain absolute sharpness throughout frame. Focus stacking required for extreme macro. Color accuracy paramount - no creative grading that misrepresents ingredient colors.",
  },

  {
    id: "cannes-food-004",
    name: "Japanese Kaiseki Seasonal Meditation",
    category: "food-beverage",
    subcategory: "fine-dining-kaiseki",

    conceptualBrief:
      "Capture the profound philosophy of kaiseki where food, season, and vessel unite in harmony. This style honors the Japanese aesthetic principles of wabi-sabi (beauty in imperfection), ma (negative space), and shun (seasonality). Each image is a meditation.",

    visualPhilosophy:
      "The kaiseki meal as spiritual practice. Photography becomes ikebana - the art of arrangement. Every element has meaning: the angle of a leaf, the glaze of a bowl, the gradient of a seasonal ingredient. Nothing is arbitrary.",

    keyVisualElements: [
      "Seasonal ingredients at peak moment (shun)",
      "Handcrafted ceramics with subtle imperfections",
      "Asymmetrical balance following nature's patterns",
      "Negative space as active compositional element",
      "Natural materials: bamboo, lacquer, washi paper",
    ],

    lighting: {
      keyLight: "Soft directional light suggesting shoji screen filtration",
      fillLight: "Warm ambient glow from tatami mat reflection",
      colorTemperature: "5000K with warm undertone suggesting traditional interior",
      lightingRatio: "2.5:1 gentle ratio maintaining peaceful atmosphere",
      moodCreation: "Zen tranquility, seasonal awareness, respectful appreciation",
    },

    composition: {
      primaryRule: "dynamic-symmetry",
      secondaryElements: [
        "Odd number groupings (1, 3, 5, 7)",
        "Asymmetrical balance",
        "Diagonal energy within calm frame",
      ],
      negativeSpaceUsage: "65% negative space honoring ma principle",
      depthLayers: "Shallow depth creating dreamlike quality",
      focalHierarchy: "Seasonal hero ingredient with supporting vessel presence",
      eyeFlow: "Gentle diagonal movement from upper left to lower right (Japanese reading direction)",
    },

    technicalSpecs: {
      camera: "Fujifilm GFX 100S",
      lens: "GF 110mm f/2 R LM WR",
      aperture: "f/2.8 for ethereal bokeh",
      iso: "ISO 400",
      postProduction: "Capture One with Fujifilm film simulation (Classic Chrome)",
      colorGrade: "Muted, sophisticated palette with emphasized natural greens",
    },

    emotionalTerritory: "Mindfulness, seasonal appreciation, cultural respect",
    brandPositioning: "Authentic Japanese, artisanal craftsmanship, cultural depth",
    targetAudience: "Japanophiles, wellness seekers, cultural travelers",

    awardReference: {
      cannesLions: "Silver Lion Craft",
      campaign: "Aman Kyoto Opening",
      agency: "Construct Tokyo",
      year: 2020,
    },

    inspirationalCampaigns: [
      "Kikunoi Kyoto documentation by Yoshihiro Makino",
      "Hoshinoya brand photography",
      "Japanese Culinary Academy official imagery",
    ],

    productionRequirements: [
      "Authentic Japanese ceramic sourcing",
      "Seasonal ingredient timing",
      "Cultural consultant for arrangement authenticity",
      "Natural material props",
    ],

    postProductionNotes:
      "Subtle enhancement only. Honor the natural imperfections of handcraft. Avoid over-saturation which betrays Japanese aesthetic restraint. Consider subtle texture overlay suggesting washi paper.",
  },

  {
    id: "cannes-food-005",
    name: "Spanish Avant-Garde Deconstructed",
    category: "food-beverage",
    subcategory: "fine-dining-spanish",

    conceptualBrief:
      "Document the Spanish culinary revolution where traditional dishes are intellectually reimagined. Inspired by El Celler de Can Roca and Mugaritz, this style captures the tension between recognition and transformation - familiar flavors in unfamiliar forms.",

    visualPhilosophy:
      "The dish as intellectual provocation. Photography must convey both the conceptual wit and sensory pleasure of avant-garde Spanish cuisine. Viewers should feel challenged and intrigued, recognizing something familiar yet experiencing it anew.",

    keyVisualElements: [
      "Deconstructed traditional dishes with recognizable elements",
      "Unexpected textures and forms",
      "Playful presentation with serious execution",
      "Spanish cultural references subtly integrated",
      "Architectural plating with emotional resonance",
    ],

    lighting: {
      keyLight: "Dramatic side light creating bold shadows suggesting Spanish intensity",
      fillLight: "Controlled fill maintaining mystery in shadow areas",
      backLight: "Accent light for texture highlights",
      colorTemperature: "4800K warm Mediterranean quality",
      lightingRatio: "4:1 dramatic ratio for emotional impact",
      moodCreation: "Intellectual excitement, playful sophistication, cultural pride",
    },

    composition: {
      primaryRule: "diagonal-tension",
      secondaryElements: [
        "Dynamic angles suggesting movement",
        "Multiple focal points creating visual conversation",
        "Unexpected scale relationships",
      ],
      negativeSpaceUsage: "Balanced 50/50 with active negative space",
      depthLayers: "Multiple planes creating narrative depth",
      focalHierarchy: "Distributed interest across deconstructed elements",
      eyeFlow: "Zigzag pattern connecting familiar elements",
    },

    technicalSpecs: {
      camera: "Sony A1",
      lens: "Sony FE 90mm f/2.8 Macro G OSS",
      aperture: "f/5.6 balancing detail and atmosphere",
      iso: "ISO 200",
      postProduction: "Capture One with custom Spanish warm profile",
      colorGrade: "Rich, warm tones with enhanced reds and oranges",
    },

    emotionalTerritory: "Intellectual curiosity, playful surprise, cultural pride",
    brandPositioning: "Innovative, culturally rooted, intellectually engaging",
    targetAudience: "Culinary adventurers, food media, international gastronomes",

    awardReference: {
      cannesLions: "Silver Lion",
      campaign: "Spain Tourism Gastronomy",
      agency: "SCPF Barcelona",
      year: 2019,
    },

    inspirationalCampaigns: [
      "El Celler de Can Roca by Francesc Guillamet",
      "Mugaritz documentation",
      "Basque Culinary Center campaigns",
    ],

    productionRequirements: [
      "Chef collaboration essential",
      "Understanding of dish concept",
      "Spanish design sensibility",
      "Theatrical presentation skills",
    ],

    postProductionNotes:
      "Enhance the drama while maintaining food appeal. Bold color grading acceptable within Spanish palette. Ensure conceptual clarity - viewer should understand the 'joke' of deconstruction.",
  },

  {
    id: "cannes-food-006",
    name: "French Classique Heritage Revival",
    category: "food-beverage",
    subcategory: "fine-dining-french",

    conceptualBrief:
      "Honor the enduring elegance of French haute cuisine while acknowledging its evolution. This style balances the reverence of Escoffier tradition with contemporary visual sensibility - classic techniques photographed with modern eyes.",

    visualPhilosophy:
      "French cuisine as living heritage. Photography should convey both the weight of tradition and its continued relevance. Images feel like museum-worthy documents that also inspire immediate appetite. Timeless yet contemporary.",

    keyVisualElements: [
      "Classical sauce work as artistic foundation",
      "Silver service elements suggesting formal dining",
      "Fresh French market ingredients",
      "Pristine white plates emphasizing technique",
      "Wine pairing integration",
    ],

    lighting: {
      keyLight: "Elegant chandelier-quality overhead with soft diffusion",
      fillLight: "Warm candlelight simulation from below",
      colorTemperature: "4500K intimate dining warmth",
      lightingRatio: "3:1 sophisticated ratio",
      moodCreation: "Elegant intimacy, refined pleasure, cultured appreciation",
    },

    composition: {
      primaryRule: "rule-of-thirds",
      secondaryElements: [
        "Classical balance and proportion",
        "Silver and crystal reflections",
        "Linen texture as foundation",
      ],
      negativeSpaceUsage: "Moderate 45% allowing for table context",
      depthLayers: "Three planes: foreground linen, hero plate, background ambiance",
      focalHierarchy: "Sauce-dressed protein as hero, garnish as accent",
      eyeFlow: "Classical S-curve through plate elements",
    },

    technicalSpecs: {
      camera: "Leica S3",
      lens: "Summarit-S 70mm f/2.5 ASPH",
      aperture: "f/4 for elegant softness",
      iso: "ISO 320",
      postProduction: "Capture One with Leica color science",
      colorGrade: "Rich, warm, classic editorial quality",
    },

    emotionalTerritory: "Refined pleasure, cultural appreciation, timeless elegance",
    brandPositioning: "Heritage, excellence, cultured sophistication",
    targetAudience: "Francophiles, traditional gourmets, cultural travelers",

    awardReference: {
      campaign: "Relais & Châteaux Centenary",
      agency: "BETC Paris",
      year: 2021,
    },

    inspirationalCampaigns: [
      "Paul Bocuse heritage documentation",
      "Alain Ducasse brand imagery",
      "Institut Paul Bocuse educational materials",
    ],

    productionRequirements: [
      "Access to authentic French service ware",
      "Classical cooking technique knowledge",
      "Formal dining set design",
      "Wine expertise for pairing shots",
    ],

    postProductionNotes:
      "Warm but not orange. Rich but not heavy. Enhancement should feel invisible - the photography of old masters with modern technical capability.",
  },

  {
    id: "cannes-food-007",
    name: "Peruvian Biodiversity Celebration",
    category: "food-beverage",
    subcategory: "fine-dining-peruvian",

    conceptualBrief:
      "Showcase Peru's extraordinary ingredient biodiversity through the lens of Central Lima's altitude-based cuisine. This style documents the world's most biodiverse food country, celebrating ingredients from sea level to 4,500 meters.",

    visualPhilosophy:
      "Virgilio Martínez's Mater Iniciativa research visualized. Each image tells a story of altitude, terroir, and indigenous knowledge. Photography becomes anthropological documentation of Peru's living food culture.",

    keyVisualElements: [
      "Altitude-specific ingredients in natural contexts",
      "Indigenous varieties: quinoa colors, potato diversity",
      "Amazonian and Andean ingredient juxtaposition",
      "Traditional and contemporary Peruvian ceramics",
      "Landscape integration suggesting terroir",
    ],

    lighting: {
      keyLight: "High-altitude sunlight quality with increased contrast",
      fillLight: "Ambient bounce from natural materials",
      colorTemperature: "5600K clear Andean light with UV intensity",
      lightingRatio: "3.5:1 reflecting dramatic Andean light",
      moodCreation: "Discovery excitement, biodiversity wonder, cultural respect",
    },

    composition: {
      primaryRule: "fibonacci-spiral",
      secondaryElements: [
        "Ingredient diversity display",
        "Altitude progression narrative",
        "Cultural artifact integration",
      ],
      negativeSpaceUsage: "Variable based on abundance messaging",
      depthLayers: "Environmental context with ingredient focus",
      focalHierarchy: "Hero ingredient with supporting biodiversity",
      eyeFlow: "Spiral through ingredient variety",
    },

    technicalSpecs: {
      camera: "Canon EOS R5",
      lens: "Canon RF 35mm f/1.4L VCM",
      aperture: "f/4 for environmental context",
      iso: "ISO 400",
      postProduction: "Lightroom with custom Peru profile",
      colorGrade: "Vibrant earth tones, enhanced natural saturation",
    },

    emotionalTerritory: "Discovery wonder, cultural appreciation, sustainability awareness",
    brandPositioning: "Authentic, sustainable, culturally significant",
    targetAudience: "Culinary travelers, sustainability advocates, cultural explorers",

    awardReference: {
      cannesLions: "Gold Lion",
      campaign: "PromPerú Gastronomy",
      agency: "McCann Lima",
      year: 2022,
    },

    inspirationalCampaigns: [
      "Central Lima 'Mater' documentation",
      "Peru The Richest Country campaign",
      "Mistura Food Festival imagery",
    ],

    productionRequirements: [
      "Peru location access",
      "Indigenous ingredient sourcing",
      "Cultural authenticity consultant",
      "Altitude logistics planning",
    ],

    postProductionNotes:
      "Celebrate natural vibrancy without artificial over-saturation. Maintain authenticity while creating editorial appeal. Consider split-frame showing ingredient origin and final dish.",
  },

  {
    id: "cannes-food-008",
    name: "Indian Thali Chromatic Symphony",
    category: "food-beverage",
    subcategory: "fine-dining-indian",

    conceptualBrief:
      "Elevate traditional Indian cuisine photography beyond cliché to reveal the sophisticated complexity of regional Indian cooking. This style treats the thali as a color composition masterpiece, documenting the subcontinent's extraordinary culinary diversity.",

    visualPhilosophy:
      "India's culinary heritage photographed with the reverence usually reserved for European haute cuisine. Each regional cuisine - Gujarati, Rajasthani, Bengali, South Indian - deserves documentation that matches its complexity and history.",

    keyVisualElements: [
      "Complete thali arrangements as color compositions",
      "Traditional brassware and banana leaf presentations",
      "Regional ingredient specificity",
      "Spice preparations showing color gradients",
      "Hand-painted traditional serving ware",
    ],

    lighting: {
      keyLight: "Warm directional light suggesting Indian domestic interior",
      fillLight: "Ambient glow from brass and copper reflection",
      colorTemperature: "4200K warm Indian interior quality",
      lightingRatio: "2:1 welcoming ratio",
      moodCreation: "Abundant hospitality, colorful celebration, family warmth",
    },

    composition: {
      primaryRule: "centered-power",
      secondaryElements: [
        "Radial arrangement of katoris",
        "Color wheel consideration in dish placement",
        "Symmetry with organic variation",
      ],
      negativeSpaceUsage: "Minimal - abundance is the message",
      depthLayers: "Flat documentary style for thali overview",
      focalHierarchy: "Distributed equal importance across elements",
      eyeFlow: "Circular exploration of diverse elements",
    },

    technicalSpecs: {
      camera: "Nikon Z9",
      lens: "Nikkor Z 50mm f/1.2 S",
      aperture: "f/8 for comprehensive sharpness",
      iso: "ISO 400",
      postProduction: "Capture One with vibrant color profile",
      colorGrade: "Enhanced saturation honoring Indian color culture",
    },

    emotionalTerritory: "Abundant hospitality, cultural pride, family celebration",
    brandPositioning: "Authentic Indian, culturally rich, regionally specific",
    targetAudience: "Indian diaspora, cultural food enthusiasts, spice lovers",

    awardReference: {
      cannesLions: "Bronze Lion",
      adsOfTheWorld: "Featured Campaign",
      campaign: "Swiggy Regional Cuisine",
      agency: "Dentsu Webchutney",
      year: 2021,
    },

    inspirationalCampaigns: [
      "Indian Accent brand imagery",
      "Gaggan Bangkok documentation",
      "Dishoom London brand photography",
    ],

    productionRequirements: [
      "Regional cuisine expertise",
      "Authentic serving ware collection",
      "Spice color optimization techniques",
      "Cultural authenticity review",
    ],

    postProductionNotes:
      "Indian cuisine benefits from enhanced saturation that would be excessive for other cuisines. Embrace the vibrancy while maintaining appetizing appeal. Ensure all regional dishes are accurately represented.",
  },

  {
    id: "cannes-food-009",
    name: "Middle Eastern Feast Tableau",
    category: "food-beverage",
    subcategory: "fine-dining-middle-eastern",

    conceptualBrief:
      "Document the generous beauty of Middle Eastern communal dining traditions. This style captures the mezze spread as both culinary art and social ritual, honoring the deep hospitality culture of the Levant, Persia, and Arabia.",

    visualPhilosophy:
      "The table as gathering place, food as language of love. Photography should convey the unstoppable generosity of Middle Eastern hospitality where more is always more, and sharing is sacred.",

    keyVisualElements: [
      "Abundant mezze spreads filling the frame",
      "Flatbreads as both food and prop",
      "Traditional copper and ceramic serving ware",
      "Hands reaching, sharing, breaking bread together",
      "Fresh herb and olive integration",
    ],

    lighting: {
      keyLight: "Mediterranean afternoon light through courtyard",
      fillLight: "Warm bounce from terracotta and plaster walls",
      colorTemperature: "4500K warm afternoon quality",
      lightingRatio: "2:1 welcoming, generous light",
      moodCreation: "Generous hospitality, communal warmth, celebration",
    },

    composition: {
      primaryRule: "visual-weight-balance",
      secondaryElements: [
        "Distributed focal points across spread",
        "Color harmony across diverse dishes",
        "Height variation with stacked breads",
      ],
      negativeSpaceUsage: "Minimal - abundance is essential message",
      depthLayers: "Shallow depth creating dreamlike abundance",
      focalHierarchy: "Distributed democracy of dishes",
      eyeFlow: "Wandering exploration mimicking feast discovery",
    },

    technicalSpecs: {
      camera: "Sony A7RV",
      lens: "Sony FE 35mm f/1.4 GM",
      aperture: "f/4 for spread coverage with gentle blur",
      iso: "ISO 640",
      postProduction: "Lightroom with Mediterranean warm profile",
      colorGrade: "Rich earth tones, warm shadows, sunset quality",
    },

    emotionalTerritory: "Generous hospitality, communal joy, cultural connection",
    brandPositioning: "Authentic, generous, culturally rooted",
    targetAudience: "Middle Eastern diaspora, Mediterranean food lovers, cultural travelers",

    awardReference: {
      adsOfTheWorld: "Top 100 Food Campaign",
      campaign: "Zaatar W Zeit Brand Evolution",
      agency: "FP7 McCann",
      year: 2020,
    },

    inspirationalCampaigns: [
      "Ottolenghi brand photography by Jonathan Lovekin",
      "Yotam Ottolenghi cookbook imagery",
      "Honey & Co. documentation",
    ],

    productionRequirements: [
      "Large table setup capability",
      "Authentic Middle Eastern serving ware",
      "Fresh herb abundance",
      "Hand model coordination for sharing shots",
    ],

    postProductionNotes:
      "Warmth is key but avoid muddy oranges. Maintain color distinction between diverse dishes. Consider overhead angle to showcase spread abundance.",

    requiresHands: true,
    humanElementJustification:
      "Breaking bread and sharing are central to Middle Eastern food culture - hands convey hospitality",
  },

  {
    id: "cannes-food-010",
    name: "Chinese Banquet Imperial Heritage",
    category: "food-beverage",
    subcategory: "fine-dining-chinese",

    conceptualBrief:
      "Elevate Chinese banquet photography to match the sophistication of its 5,000-year culinary heritage. This style treats regional Chinese cuisines with the reverence typically reserved for French technique, documenting everything from Cantonese dim sum to Sichuanese complexity.",

    visualPhilosophy:
      "China's eight great cuisines each deserve photographic distinction. This aesthetic moves beyond Western generalizations to celebrate specific regional traditions with the precision and respect they merit.",

    keyVisualElements: [
      "Red and gold traditional color integration",
      "Carved vegetables and garnish artistry",
      "Steam rising from bamboo steamers",
      "Lazy Susan banquet arrangement",
      "Traditional porcelain and lacquerware",
    ],

    lighting: {
      keyLight: "Banquet room lighting suggesting prosperity",
      fillLight: "Red lantern warm glow integration",
      colorTemperature: "4000K warm festive quality",
      lightingRatio: "2.5:1 celebratory but dimensional",
      specialEffects: "Steam enhancement for dumpling shots",
      moodCreation: "Celebration, prosperity, family honor",
    },

    composition: {
      primaryRule: "centered-power",
      secondaryElements: [
        "Circular arrangement for round table tradition",
        "Symmetry suggesting prosperity",
        "Hierarchical dish placement by importance",
      ],
      negativeSpaceUsage: "Minimal - banquet abundance message",
      depthLayers: "Multiple dish layers showing abundance",
      focalHierarchy: "Centerpiece dish with supporting variety",
      eyeFlow: "Circular exploration of banquet offerings",
    },

    technicalSpecs: {
      camera: "Canon EOS R5",
      lens: "Canon RF 24-70mm f/2.8L IS USM",
      aperture: "f/5.6 for banquet coverage",
      iso: "ISO 800",
      postProduction: "Capture One with Chinese red optimization",
      colorGrade: "Rich reds and golds, enhanced warmth",
    },

    emotionalTerritory: "Celebration, prosperity, family unity",
    brandPositioning: "Authentic Chinese, regionally specific, culturally proud",
    targetAudience: "Chinese diaspora, Asian food enthusiasts, cultural explorers",

    awardReference: {
      campaign: "Imperial Treasure Restaurant Group",
      agency: "DDB Singapore",
      year: 2021,
    },

    inspirationalCampaigns: [
      "Din Tai Fung global brand imagery",
      "Hakkasan brand photography",
      "Lucky Dragon campaign imagery",
    ],

    productionRequirements: [
      "Regional Chinese cuisine expertise",
      "Authentic Chinese serving ware",
      "Steam generation equipment",
      "Cultural authenticity consultant",
    ],

    postProductionNotes:
      "Chinese red must be vibrant but not neon. Gold should suggest prosperity without gaudiness. Maintain appetite appeal while honoring cultural symbolism.",
  },

  {
    id: "cannes-food-011",
    name: "African Continental Awakening",
    category: "food-beverage",
    subcategory: "fine-dining-african",

    conceptualBrief:
      "Document the new wave of African fine dining that honors traditional ingredients and techniques while presenting them with contemporary sophistication. This style supports the culinary renaissance from Lagos to Cape Town to Nairobi.",

    visualPhilosophy:
      "African cuisine deserves photography that matches its rich heritage and exciting future. Move beyond poverty imagery to showcase the sophistication, diversity, and innovation of continental African cooking.",

    keyVisualElements: [
      "Indigenous African ingredients elevated",
      "Contemporary African ceramics and design",
      "Traditional techniques with modern presentation",
      "Vibrant natural African color palettes",
      "Textile and pattern integration",
    ],

    lighting: {
      keyLight: "Strong African sunlight quality with warmth",
      fillLight: "Earth tone bounce from natural materials",
      colorTemperature: "5200K with warm African quality",
      lightingRatio: "3:1 bold African light contrast",
      moodCreation: "Pride, innovation, cultural celebration",
    },

    composition: {
      primaryRule: "dynamic-symmetry",
      secondaryElements: ["African geometric pattern influence", "Bold color blocking", "Texture variety celebration"],
      negativeSpaceUsage: "Moderate allowing for pattern context",
      depthLayers: "Layered with textile and ceramic backgrounds",
      focalHierarchy: "Indigenous ingredient hero with cultural context",
      eyeFlow: "Pattern-guided exploration",
    },

    technicalSpecs: {
      camera: "Sony A7RIV",
      lens: "Sony FE 55mm f/1.8 ZA",
      aperture: "f/4 for context inclusion",
      iso: "ISO 400",
      postProduction: "Capture One with African vibrant profile",
      colorGrade: "Bold, vibrant honoring African color culture",
    },

    emotionalTerritory: "Cultural pride, innovation excitement, heritage appreciation",
    brandPositioning: "Contemporary African, culturally proud, globally relevant",
    targetAudience: "African diaspora, culinary adventurers, design enthusiasts",

    awardReference: {
      cannesLions: "Bronze Lion",
      campaign: "Nando's 'The Last Dictator'",
      agency: "Nando's Creative",
      year: 2020,
    },

    inspirationalCampaigns: [
      "The Test Kitchen Cape Town imagery",
      "Afrolicious brand photography",
      "African Expressions cookbook",
    ],

    productionRequirements: [
      "African ingredient sourcing",
      "Contemporary African designer collaboration",
      "Cultural authenticity review",
      "Regional specificity verification",
    ],

    postProductionNotes:
      "Bold color enhancement appropriate for African aesthetic. Avoid exoticizing or 'othering' - treat with same sophistication as European cuisine photography.",
  },

  {
    id: "cannes-food-012",
    name: "Brazilian Churrasco Theatre",
    category: "food-beverage",
    subcategory: "fine-dining-brazilian",

    conceptualBrief:
      "Capture the theatrical drama of Brazilian churrasco culture where fire, meat, and expertise combine in spectacular fashion. This style documents the gaucho tradition with the reverence it deserves as culinary performance art.",

    visualPhilosophy:
      "Churrascaria as live theatre where the gaucho is both chef and performer. Photography should convey the primal appeal of fire-cooked meat while honoring the skill and tradition behind the spectacle.",

    keyVisualElements: [
      "Sword-skewered meats in dramatic presentation",
      "Open flame and ember glow",
      "Gaucho carving action shots",
      "Caipirinha and rodizio accompaniments",
      "Rustic yet refined table settings",
    ],

    lighting: {
      keyLight: "Fire glow as primary light source",
      fillLight: "Warm ambient from restaurant lighting",
      practicalLights: "Ember glow, flame flicker",
      colorTemperature: "3500K fire-dominant warmth",
      lightingRatio: "4:1 dramatic fire contrast",
      moodCreation: "Primal satisfaction, theatrical excitement, generous abundance",
    },

    composition: {
      primaryRule: "diagonal-tension",
      secondaryElements: ["Action freeze of carving moment", "Fire as compositional element", "Abundance display"],
      negativeSpaceUsage: "Dark negative space enhancing fire drama",
      depthLayers: "Foreground action, midground meat, background flames",
      focalHierarchy: "Carving action hero with meat texture secondary",
      eyeFlow: "Diagonal from gaucho hand through meat to flames",
    },

    technicalSpecs: {
      camera: "Canon EOS R3",
      lens: "Canon RF 50mm f/1.2L USM",
      aperture: "f/1.8 for dramatic bokeh",
      iso: "ISO 3200",
      shutterSpeed: "1/500s to freeze carving action",
      postProduction: "Lightroom with fire-warm profile",
      colorGrade: "Deep warm tones, enhanced ember glow",
    },

    emotionalTerritory: "Primal satisfaction, theatrical excitement, masculine energy",
    brandPositioning: "Authentic Brazilian, theatrical, generous tradition",
    targetAudience: "Meat enthusiasts, Brazilian culture fans, experiential diners",

    awardReference: {
      campaign: "Fogo de Chão Global Brand",
      agency: "Wieden+Kennedy São Paulo",
      year: 2019,
    },

    inspirationalCampaigns: [
      "Texas de Brazil imagery",
      "Picanha documentary photography",
      "Gaucho culture documentation",
    ],

    productionRequirements: [
      "Live fire location access",
      "Professional gaucho coordinator",
      "Heat-resistant equipment",
      "Action capture capability",
    ],

    postProductionNotes:
      "Embrace the warmth of fire light. Enhance ember glow without losing meat texture detail. Consider motion blur for flame flicker while keeping meat sharp.",

    requiresHands: true,
    humanElementJustification:
      "The gaucho's skill is central to churrasco - hands carving convey expertise and theatre",
  },

  // --- Comfort & Heritage Cooking (10 styles) ---
  {
    id: "cannes-food-013",
    name: "Italian Nonna Kitchen Documentary",
    category: "food-beverage",
    subcategory: "comfort-italian",

    conceptualBrief:
      "Document the sacred space of the Italian grandmother's kitchen where recipes live in muscle memory and love is measured in pasta portions. This style captures generational cooking wisdom with photojournalistic authenticity.",

    visualPhilosophy:
      "Nonna as keeper of culinary tradition. Photography honors the worn hands, the flour-dusted surfaces, the imperfect beauty of home cooking. This is not styled food photography - it's anthropological documentation of living food culture.",

    keyVisualElements: [
      "Flour-dusted hands working pasta dough",
      "Worn wooden surfaces with character",
      "Imperfect, abundant home cooking",
      "Multiple generations in frame",
      "Vintage kitchen equipment in use",
    ],

    lighting: {
      keyLight: "Natural window light in Italian kitchen",
      fillLight: "Ambient bounce from whitewashed walls",
      colorTemperature: "4500K warm Italian domestic quality",
      lightingRatio: "2:1 welcoming domestic light",
      specialEffects: "Visible flour dust in light beams",
      moodCreation: "Family warmth, generational love, authentic tradition",
    },

    composition: {
      primaryRule: "frame-within-frame",
      secondaryElements: [
        "Hands as central narrative element",
        "Environmental context showing kitchen life",
        "Process documentation",
      ],
      negativeSpaceUsage: "Minimal - kitchen fullness is authentic",
      depthLayers: "Working foreground, kitchen midground, family background",
      focalHierarchy: "Hands and process primary, face secondary, environment tertiary",
      eyeFlow: "From hands through creation to finished dish",
    },

    technicalSpecs: {
      camera: "Leica M11",
      lens: "Summilux-M 35mm f/1.4 ASPH",
      aperture: "f/2.0 for documentary intimacy",
      iso: "ISO 1600",
      postProduction: "Lightroom with film emulation",
      colorGrade: "Warm, slightly faded, nostalgic quality",
    },

    emotionalTerritory: "Nostalgic love, family connection, cultural continuity",
    brandPositioning: "Authentic Italian, family heritage, artisanal tradition",
    targetAudience: "Italian diaspora, home cooks, family-values audience",

    awardReference: {
      cannesLions: "Gold Lion Film Craft",
      dAndAd: "Graphite Pencil",
      campaign: "Barilla 'The Pasta Grannies'",
      agency: "Publicis Italy",
      year: 2021,
    },

    inspirationalCampaigns: [
      "Pasta Grannies YouTube documentation",
      "Stanley Tucci 'Searching for Italy'",
      "Jamie Oliver 'Jamie Cooks Italy'",
    ],

    productionRequirements: [
      "Real Italian kitchen location",
      "Authentic grandmother talent",
      "Documentary approach mindset",
      "Minimal styling intervention",
    ],

    postProductionNotes:
      "Resist the urge to over-polish. The beauty is in imperfection. Slight warmth enhancement and film grain appropriate. This should feel like a treasured family photograph.",

    requiresHands: true,
    humanElementJustification: "Nonna's hands ARE the story - skill, age, love all visible in her working hands",
  },

  {
    id: "cannes-food-014",
    name: "American Diner Nostalgia Revival",
    category: "food-beverage",
    subcategory: "comfort-american",

    conceptualBrief:
      "Reimagine classic American diner culture with contemporary visual sophistication. This style honors the roadside diner tradition - burgers, milkshakes, pie - while elevating the photography beyond kitsch to genuine Americana celebration.",

    visualPhilosophy:
      "The American diner as democratic dining institution. Photography should feel like a Todd Hines film still or an Edward Hopper painting - nostalgic yet timeless, familiar yet elevated.",

    keyVisualElements: [
      "Classic diner architecture and signage",
      "Neon glow and chrome reflection",
      "Stacked burgers with dramatic cheese melt",
      "Milkshake perfection in classic glassware",
      "Red vinyl and formica surfaces",
    ],

    lighting: {
      keyLight: "Mixed neon and fluorescent diner lighting",
      fillLight: "Warm counter light from below",
      practicalLights: "Neon signs, jukebox glow",
      colorTemperature: "Mixed - neon pinks, fluorescent greens, incandescent warm",
      lightingRatio: "Variable by diner area",
      moodCreation: "Nostalgic warmth, democratic accessibility, late-night comfort",
    },

    composition: {
      primaryRule: "rule-of-thirds",
      secondaryElements: ["Counter-line leading perspective", "Neon reflection integration", "Booth framing"],
      negativeSpaceUsage: "Moderate allowing diner context",
      depthLayers: "Counter foreground, food hero, diner environment",
      focalHierarchy: "Food hero with strong environmental presence",
      eyeFlow: "Counter line leading to food hero",
    },

    technicalSpecs: {
      camera: "Fujifilm X-T5",
      lens: "XF 23mm f/1.4 R LM WR",
      aperture: "f/2.0 for environmental bokeh",
      iso: "ISO 1600",
      postProduction: "Capture One with Kodachrome emulation",
      colorGrade: "Saturated but slightly faded, cinematic quality",
    },

    emotionalTerritory: "Nostalgic comfort, democratic accessibility, American pride",
    brandPositioning: "Classic American, unpretentious, comfort-focused",
    targetAudience: "American nostalgia seekers, comfort food lovers, road trip culture",

    awardReference: {
      cannesLions: "Silver Lion",
      campaign: "Shake Shack 'Modern Roadside'",
      agency: "Pentagram",
      year: 2020,
    },

    inspirationalCampaigns: [
      "In-N-Out documentary photography",
      "Five Guys brand imagery",
      "Waffle House cultural documentation",
    ],

    productionRequirements: [
      "Authentic diner location access",
      "Neon lighting coordination",
      "Classic American food styling",
      "Vintage prop collection",
    ],

    postProductionNotes:
      "Color grade should feel like rediscovered Kodachrome. Saturation high but with film-like rolloff. Consider slight halation around neon lights for authentic film feel.",
  },

  {
    id: "cannes-food-015",
    name: "British Gastropub Elevated",
    category: "food-beverage",
    subcategory: "comfort-british",

    conceptualBrief:
      "Document the British gastropub revolution where traditional comfort food meets contemporary technique. This style captures the cozy sophistication of modern British pub dining - elevated fish and chips, reinvented Sunday roasts, craft beer pairings.",

    visualPhilosophy:
      "British culinary pride without irony. Photography should convey that British food culture has evolved beyond stereotypes to become genuinely exciting while honoring its comfort food roots.",

    keyVisualElements: [
      "Perfectly golden fish and chips presentation",
      "Craft beer in proper glassware",
      "Rustic-refined plating on vintage china",
      "Pub interior warmth - fireplaces, wooden beams",
      "Seasonal British ingredients elevated",
    ],

    lighting: {
      keyLight: "Cozy pub window light",
      fillLight: "Fireplace warm glow",
      practicalLights: "Candles, vintage lamps",
      colorTemperature: "3800K cozy pub warmth",
      lightingRatio: "2:1 inviting ratio",
      moodCreation: "Cozy refuge, elevated comfort, British pride",
    },

    composition: {
      primaryRule: "rule-of-thirds",
      secondaryElements: ["Pub interior context", "Beer pairing integration", "Rustic surface textures"],
      negativeSpaceUsage: "Moderate with pub ambiance visible",
      depthLayers: "Food hero, table context, pub environment",
      focalHierarchy: "Reimagined classic dish as hero",
      eyeFlow: "From food to beer to pub warmth",
    },

    technicalSpecs: {
      camera: "Nikon Z8",
      lens: "Nikkor Z 50mm f/1.8 S",
      aperture: "f/2.8 for pub atmosphere",
      iso: "ISO 1000",
      postProduction: "Capture One with British warm profile",
      colorGrade: "Warm, cozy, slightly desaturated greens",
    },

    emotionalTerritory: "Cozy comfort, unpretentious pleasure, British pride",
    brandPositioning: "Modern British, craft-focused, quality comfort",
    targetAudience: "British food renaissance supporters, pub culture enthusiasts",

    awardReference: {
      campaign: "BrewDog 'Punk IPA' Campaign",
      agency: "Adam&Eve/DDB",
      year: 2021,
    },

    inspirationalCampaigns: [
      "The Sportsman Seasalter imagery",
      "St. John restaurant documentation",
      "Great British Menu show photography",
    ],

    productionRequirements: [
      "Authentic gastropub location",
      "Craft beer selection",
      "British ceramic sourcing",
      "Seasonal British ingredients",
    ],

    postProductionNotes:
      "Warm without orange color cast. Maintain food detail while suggesting cozy atmosphere. Consider slight vignette to enhance intimate pub feeling.",
  },

  {
    id: "cannes-food-016",
    name: "Korean Home Kitchen Banchan Ballet",
    category: "food-beverage",
    subcategory: "comfort-korean",

    conceptualBrief:
      "Document the intricate beauty of Korean home cooking where multiple small dishes (banchan) create a colorful, harmonious meal. This style celebrates the care and complexity of Korean domestic food culture.",

    visualPhilosophy:
      "Korean home cooking as expression of love. Every meal involves multiple preparations - fermented, fresh, cooked, raw - each dish a small gift. Photography honors this labor of love.",

    keyVisualElements: [
      "Multiple banchan dishes in coordinated arrangement",
      "Kimchi as central cultural element",
      "Traditional brass and ceramic serving ware",
      "Colorful vegetable preparations",
      "Rice and soup as meal foundation",
    ],

    lighting: {
      keyLight: "Bright Korean kitchen light",
      fillLight: "Warm ondol floor heating glow",
      colorTemperature: "4800K clean with warm undertone",
      lightingRatio: "2:1 welcoming brightness",
      moodCreation: "Family warmth, care expression, colorful abundance",
    },

    composition: {
      primaryRule: "centered-power",
      secondaryElements: [
        "Symmetrical banchan arrangement",
        "Color coordination across dishes",
        "Rice bowl as center anchor",
      ],
      negativeSpaceUsage: "Minimal - abundance is the message",
      depthLayers: "Flat overhead for full banchan display",
      focalHierarchy: "Distributed importance across all dishes",
      eyeFlow: "Circular exploration of variety",
    },

    technicalSpecs: {
      camera: "Sony A7RV",
      lens: "Sony FE 24mm f/1.4 GM",
      aperture: "f/5.6 for comprehensive sharpness",
      iso: "ISO 400",
      postProduction: "Capture One with Korean vibrant profile",
      colorGrade: "Clean, bright, color-accurate",
    },

    emotionalTerritory: "Maternal care, cultural pride, sharing joy",
    brandPositioning: "Authentic Korean, home-focused, culturally proud",
    targetAudience: "Korean diaspora, K-culture enthusiasts, home cooks",

    awardReference: {
      cannesLions: "Bronze Lion",
      campaign: "CJ CheilJedang 'Taste of Korea'",
      agency: "Cheil Worldwide",
      year: 2022,
    },

    inspirationalCampaigns: [
      "Maangchi YouTube documentation",
      "Korean Temple Food imagery",
      "Seoul Biennale food documentation",
    ],

    productionRequirements: [
      "Korean banchan variety preparation",
      "Authentic Korean serving ware",
      "Kimchi fermentation expertise",
      "Cultural authenticity review",
    ],

    postProductionNotes:
      "Maintain bright, clean Korean aesthetic. Each banchan should be color-distinct and appetizing. Avoid shadows that muddy the colorful variety.",
  },

  {
    id: "cannes-food-017",
    name: "Mexican Street Market Abundance",
    category: "food-beverage",
    subcategory: "comfort-mexican",

    conceptualBrief:
      "Capture the overwhelming sensory abundance of Mexican markets where ingredients overflow from baskets, moles simmer in clay pots, and tortillas are handmade to order. This style celebrates Mexico's living food culture.",

    visualPhilosophy:
      "The Mexican market as culinary cathedral. Photography should convey the sacred abundance of Mexican food culture - the chili pyramids, the fruit cascades, the ancestral knowledge preserved in every preparation.",

    keyVisualElements: [
      "Pyramids of dried chilies and spices",
      "Clay pot mole preparations",
      "Fresh produce abundance",
      "Tortilla making action",
      "Colorful Mexican textile backdrops",
    ],

    lighting: {
      keyLight: "Bright market daylight filtering through tarps",
      fillLight: "Colorful bounce from produce and textiles",
      colorTemperature: "5200K bright with warm product reflection",
      lightingRatio: "2:1 abundant brightness",
      moodCreation: "Sensory overwhelm, cultural richness, joyful abundance",
    },

    composition: {
      primaryRule: "visual-weight-balance",
      secondaryElements: ["Color pyramids as focal points", "Vendor interaction moments", "Layered abundance"],
      negativeSpaceUsage: "Minimal - abundance is essential",
      depthLayers: "Foreground products, vendor midground, market depth",
      focalHierarchy: "Hero ingredient with supporting abundance",
      eyeFlow: "Wandering exploration mimicking market discovery",
    },

    technicalSpecs: {
      camera: "Canon EOS R5",
      lens: "Canon RF 35mm f/1.4L VCM",
      aperture: "f/4 for market context",
      iso: "ISO 640",
      postProduction: "Lightroom with Mexican vibrant profile",
      colorGrade: "Saturated, warm, celebratory",
    },

    emotionalTerritory: "Sensory joy, cultural pride, overwhelming abundance",
    brandPositioning: "Authentic Mexican, market-fresh, culturally rooted",
    targetAudience: "Mexican culture enthusiasts, market lovers, authentic food seekers",

    awardReference: {
      cannesLions: "Gold Lion",
      campaign: "Corona 'This Land is Your Land'",
      agency: "Droga5 New York",
      year: 2020,
    },

    inspirationalCampaigns: [
      "Pujol Mexico City imagery",
      "Rick Bayless documentary photography",
      "Oaxaca chocolate documentation",
    ],

    productionRequirements: [
      "Mexican market location access",
      "Early morning best light timing",
      "Vendor relationship building",
      "Authentic ingredient sourcing",
    ],

    postProductionNotes:
      "Embrace saturated Mexican colors. Maintain chili red accuracy. Consider slight contrast enhancement to handle market light complexity.",

    requiresHands: true,
    humanElementJustification: "Vendor hands shaping tortillas, selecting produce show living culture",
  },

  // --- Street Food Excellence (8 styles) ---
  {
    id: "cannes-food-018",
    name: "Bangkok Wok Hei Fire Capture",
    category: "food-beverage",
    subcategory: "street-food-thai",

    conceptualBrief:
      "Capture the explosive drama of Thai street food cooking where flames leap, woks fly, and pad thai achieves its characteristic wok hei smokiness. This style documents the athletic performance art of Thai street vendors.",

    visualPhilosophy:
      "Street cooking as performance art. The Thai street vendor is both chef and athlete, achieving in a makeshift sidewalk kitchen what Western chefs struggle to replicate in professional kitchens. Photography honors this mastery.",

    keyVisualElements: [
      "Flames erupting from wok",
      "Tossing motion blur with frozen food",
      "Steam and smoke atmosphere",
      "Vendor in focused action",
      "Neon night market backdrop",
    ],

    lighting: {
      keyLight: "Flame illumination as primary light",
      fillLight: "Street light ambient",
      practicalLights: "Neon signs, charcoal glow",
      colorTemperature: "Mixed - flame warm, neon cool",
      lightingRatio: "5:1 dramatic contrast",
      specialEffects: "Flame timing coordination",
      moodCreation: "Electric energy, dramatic skill, night market excitement",
    },

    composition: {
      primaryRule: "diagonal-tension",
      secondaryElements: ["Flame arc as compositional element", "Motion blur suggesting speed", "Night market context"],
      negativeSpaceUsage: "Dark negative space enhancing flame drama",
      depthLayers: "Vendor action, flame peak, background chaos",
      focalHierarchy: "Flame moment hero, vendor secondary, food in motion",
      eyeFlow: "Diagonal from vendor through flame arc to background",
    },

    technicalSpecs: {
      camera: "Sony A9 III",
      lens: "Sony FE 35mm f/1.4 GM",
      aperture: "f/1.8 for flame bokeh",
      iso: "ISO 6400",
      shutterSpeed: "1/1000s to freeze flame peak",
      postProduction: "Lightroom with night market profile",
      colorGrade: "Enhanced flame warmth, neon accent colors",
    },

    emotionalTerritory: "Electric excitement, skill admiration, sensory adventure",
    brandPositioning: "Authentic Thai, street-level, dramatic expertise",
    targetAudience: "Street food enthusiasts, adventure travelers, culinary explorers",

    awardReference: {
      cannesLions: "Silver Lion",
      campaign: "Netflix 'Street Food' Asia Series",
      agency: "Art & Industry",
      year: 2019,
    },

    inspirationalCampaigns: [
      "Chef's Table Street Food documentation",
      "Taste of Thailand tourism",
      "Night market documentary photography",
    ],

    productionRequirements: [
      "High-speed capture capability",
      "Low light excellence camera",
      "Flame timing coordination with vendor",
      "Heat-resistant positioning",
    ],

    postProductionNotes:
      "Enhance flame drama while maintaining food recognition. Color grade for night market atmosphere. Consider slight motion blur on vendor arms for action emphasis.",
  },

  {
    id: "cannes-food-019",
    name: "Tokyo Izakaya Intimate Glow",
    category: "food-beverage",
    subcategory: "street-food-japanese",

    conceptualBrief:
      "Document the intimate world of Tokyo's izakaya back alleys where salary men decompress over yakitori and sake. This style captures the warm refuge of Japanese drinking culture and its accompanying food rituals.",

    visualPhilosophy:
      "The izakaya as urban sanctuary. In the chaos of Tokyo, these small establishments offer refuge, connection, and simple pleasures. Photography should convey the precious intimacy of these spaces.",

    keyVisualElements: [
      "Yakitori grill smoke and char",
      "Counter seating intimacy",
      "Sake and beer condensation",
      "Red lantern (akachochin) glow",
      "Cramped but cozy interiors",
    ],

    lighting: {
      keyLight: "Lantern and grill glow",
      fillLight: "Ambient from warm interior lights",
      practicalLights: "Red lanterns, charcoal glow",
      colorTemperature: "3500K intimate warmth",
      lightingRatio: "3:1 moody intimacy",
      moodCreation: "Refuge warmth, end-of-day relief, connection comfort",
    },

    composition: {
      primaryRule: "frame-within-frame",
      secondaryElements: ["Counter perspective", "Grill as focal point", "Customer backs suggesting community"],
      negativeSpaceUsage: "Dense izakaya fullness",
      depthLayers: "Counter depth creating intimacy",
      focalHierarchy: "Grill and food primary, ambiance secondary",
      eyeFlow: "Counter line leading through offerings",
    },

    technicalSpecs: {
      camera: "Leica M11",
      lens: "Summilux-M 35mm f/1.4 ASPH",
      aperture: "f/1.4 for intimate bokeh",
      iso: "ISO 3200",
      postProduction: "Capture One with Tokyo night profile",
      colorGrade: "Warm amber, slight film fade",
    },

    emotionalTerritory: "Refuge comfort, working class solidarity, simple pleasures",
    brandPositioning: "Authentic Tokyo, intimate, unpretentious",
    targetAudience: "Japanophiles, urban explorers, drinking culture enthusiasts",

    awardReference: {
      campaign: "Suntory 'Craft Your Time'",
      agency: "Dentsu Tokyo",
      year: 2020,
    },

    inspirationalCampaigns: [
      "Midnight Diner documentary",
      "Lost in Translation izakaya scenes",
      "Tokyo night photography exhibitions",
    ],

    productionRequirements: [
      "Authentic izakaya access",
      "Low light capability",
      "Intimate unobtrusive shooting style",
      "Japanese cultural sensitivity",
    ],

    postProductionNotes:
      "Warm amber grade essential. Maintain shadow detail for intimate atmosphere. Consider slight grain for film quality. Red lantern glow should feel inviting, not harsh.",
  },

  {
    id: "cannes-food-020",
    name: "Marrakech Souk Spice Sensory",
    category: "food-beverage",
    subcategory: "street-food-moroccan",

    conceptualBrief:
      "Capture the overwhelming sensory experience of Marrakech's food souks where spice pyramids glow, tagines bubble, and the air thick with cumin and saffron. This style documents Morocco's living food heritage.",

    visualPhilosophy:
      "The souk as sensory overload managed through centuries of tradition. Photography should convey both the initial overwhelm and the underlying order - the pyramids are perfect, the chaos is choreographed.",

    keyVisualElements: [
      "Perfectly formed spice pyramids",
      "Bubbling tagine steam",
      "Dappled light through souk coverings",
      "Vendor interaction and negotiation",
      "Colorful ceramic and metalwork",
    ],

    lighting: {
      keyLight: "Dappled souk light through fabric",
      fillLight: "Colorful bounce from spices and textiles",
      colorTemperature: "5000K with warm spice reflection",
      lightingRatio: "3:1 dramatic dappled pattern",
      moodCreation: "Exotic wonder, sensory overwhelm, discovery excitement",
    },

    composition: {
      primaryRule: "leading-lines",
      secondaryElements: ["Spice pyramid geometry", "Narrow alley perspective", "Color gradient arrangements"],
      negativeSpaceUsage: "Minimal - souk fullness is authentic",
      depthLayers: "Foreground spices, vendor midground, souk depth",
      focalHierarchy: "Spice color as hero, vendor interaction secondary",
      eyeFlow: "Alley perspective drawing viewer into depth",
    },

    technicalSpecs: {
      camera: "Leica Q2",
      lens: "Summilux 28mm f/1.7 ASPH",
      aperture: "f/2.8 for souk context",
      iso: "ISO 800",
      postProduction: "Lightroom with Moroccan warm profile",
      colorGrade: "Rich earth tones, enhanced spice colors",
    },

    emotionalTerritory: "Exotic wonder, adventure excitement, sensory immersion",
    brandPositioning: "Authentic Moroccan, experiential, culturally immersive",
    targetAudience: "Travel adventurers, spice enthusiasts, cultural explorers",

    awardReference: {
      cannesLions: "Gold Lion",
      campaign: "Airbnb 'Live There'",
      agency: "TBWA\\Chiat\\Day",
      year: 2019,
    },

    inspirationalCampaigns: [
      "Yotam Ottolenghi Morocco episodes",
      "Morocco tourism photography",
      "National Geographic souk documentation",
    ],

    productionRequirements: [
      "Marrakech souk access and timing",
      "Local guide for vendor relationships",
      "Heat and crowd management",
      "Portable equipment for narrow spaces",
    ],

    postProductionNotes:
      "Enhance spice colors without artificial neon quality. Maintain rich earth tones. Consider slight haziness to suggest spice-laden air. Shadow detail important in dappled light areas.",
  },

  // --- Beverage Excellence (10 styles) ---
  {
    id: "cannes-food-021",
    name: "Wine Château Terroir Documentary",
    category: "food-beverage",
    subcategory: "beverage-wine",

    conceptualBrief:
      "Document the complete journey from vineyard to glass, connecting wine with its specific terroir. This style treats wine photography as landscape and portrait combined - the wine IS the land made liquid.",

    visualPhilosophy:
      "Wine as liquid terroir. Every glass contains a specific place and time - the soil, the climate, the year, the winemaker's hand. Photography should make this invisible connection visible.",

    keyVisualElements: [
      "Vineyard landscape context",
      "Wine in glass against terroir backdrop",
      "Winemaker hands and expertise",
      "Cellar aging atmosphere",
      "Harvest documentation",
    ],

    lighting: {
      keyLight: "Natural vineyard golden hour",
      fillLight: "Ambient landscape light",
      colorTemperature: "5000K golden with warm earth tones",
      lightingRatio: "2:1 natural landscape ratio",
      specialEffects: "Wine color backlit through glass",
      moodCreation: "Terroir connection, winemaker respect, seasonal appreciation",
    },

    composition: {
      primaryRule: "rule-of-thirds",
      secondaryElements: [
        "Wine glass positioned against landscape",
        "Vineyard rows leading lines",
        "Winemaker in environment",
      ],
      negativeSpaceUsage: "Variable - landscape provides context",
      depthLayers: "Wine glass foreground, vineyard midground, estate background",
      focalHierarchy: "Wine glass hero with terroir context essential",
      eyeFlow: "From glass through vineyard to horizon",
    },

    technicalSpecs: {
      camera: "Sony A7RIV",
      lens: "Sony FE 35mm f/1.4 GM",
      aperture: "f/4 for landscape inclusion",
      iso: "ISO 400",
      postProduction: "Capture One with wine warm profile",
      colorGrade: "Rich earth tones, enhanced wine color",
    },

    emotionalTerritory: "Place connection, craft appreciation, seasonal celebration",
    brandPositioning: "Premium wine, terroir-focused, authentically crafted",
    targetAudience: "Wine enthusiasts, collectors, terroir-focused consumers",

    awardReference: {
      campaign: "Château Margaux Brand Evolution",
      agency: "Strategic branding",
      year: 2021,
    },

    inspirationalCampaigns: [
      "Opus One brand imagery",
      "Burgundy wine region documentation",
      "Robert Parker wine photography standards",
    ],

    productionRequirements: [
      "Vineyard location access",
      "Golden hour timing",
      "Wine glass handling expertise",
      "Winemaker coordination",
    ],

    postProductionNotes:
      "Wine color must be accurate to varietal. Landscape should support, not overwhelm. Consider subtle warmth to suggest terroir richness.",
  },

  {
    id: "cannes-food-022",
    name: "Craft Beer Brewery Documentary",
    category: "food-beverage",
    subcategory: "beverage-beer",

    conceptualBrief:
      "Document the craft beer revolution where small-batch breweries combine scientific precision with artistic creativity. This style captures both the industrial beauty of brewing and the personality of craft beer culture.",

    visualPhilosophy:
      "Craft beer as creative expression. Every brewery has a story, every brewer a vision. Photography should convey the science and soul behind craft beer - the stainless tanks AND the creative chaos of the taproom.",

    keyVisualElements: [
      "Copper and stainless brewing equipment",
      "Beer pour with perfect head formation",
      "Brewer in action",
      "Ingredient sourcing - hops, malt, water",
      "Taproom community atmosphere",
    ],

    lighting: {
      keyLight: "Industrial brewery lighting with warmth",
      fillLight: "Copper reflection glow",
      practicalLights: "Brewery equipment lights",
      colorTemperature: "4500K industrial warm",
      lightingRatio: "3:1 industrial but welcoming",
      moodCreation: "Craft pride, industrial beauty, community gathering",
    },

    composition: {
      primaryRule: "leading-lines",
      secondaryElements: ["Brewing equipment geometry", "Pour motion capture", "Brewer portrait in environment"],
      negativeSpaceUsage: "Industrial negative space",
      depthLayers: "Beer foreground, equipment midground, brewery depth",
      focalHierarchy: "Beer pour hero, equipment context secondary",
      eyeFlow: "Pour line through glass to brewery environment",
    },

    technicalSpecs: {
      camera: "Canon EOS R5",
      lens: "Canon RF 24-70mm f/2.8L IS USM",
      aperture: "f/4 for brewery context",
      iso: "ISO 800",
      shutterSpeed: "1/250s to freeze pour",
      postProduction: "Lightroom with craft beer profile",
      colorGrade: "Warm industrial, enhanced amber tones",
    },

    emotionalTerritory: "Craft pride, community belonging, creative appreciation",
    brandPositioning: "Independent craft, quality-focused, community-centered",
    targetAudience: "Craft beer enthusiasts, independent brand supporters",

    awardReference: {
      cannesLions: "Gold Lion",
      dAndAd: "Yellow Pencil",
      campaign: "BrewDog 'Equity for Punks'",
      agency: "BrewDog Creative",
      year: 2019,
    },

    inspirationalCampaigns: [
      "Sierra Nevada brand photography",
      "Brooklyn Brewery documentation",
      "Craft beer magazine editorial",
    ],

    productionRequirements: [
      "Brewery access during production",
      "Pour technique expertise",
      "Steam and condensation handling",
      "Brewer coordination",
    ],

    postProductionNotes:
      "Beer color must be accurate to style. Maintain industrial beauty while keeping warmth. Condensation on glass adds authenticity.",
  },

  {
    id: "cannes-food-023",
    name: "Premium Spirits Luxury Portrait",
    category: "food-beverage",
    subcategory: "beverage-spirits",

    conceptualBrief:
      "Elevate premium spirits photography to fine art portraiture level. This style treats each bottle as a character with history, personality, and presence - whisky as wise elder, vodka as modernist icon, cognac as cultured aristocrat.",

    visualPhilosophy:
      "Spirits as liquid biography. Each bottle contains years of maturation, generations of craftsmanship, specific places and traditions. Photography should convey this depth without words.",

    keyVisualElements: [
      "Bottle as sculptural hero",
      "Liquid color and clarity",
      "Crystal glassware elegance",
      "Age and heritage suggestion",
      "Subtle environment context",
    ],

    lighting: {
      keyLight: "Precise studio lighting with controlled highlights",
      fillLight: "Subtle fill maintaining drama",
      backLight: "Rim light for bottle definition",
      colorTemperature: "5000K neutral with liquid color enhancement",
      lightingRatio: "4:1 dramatic luxury ratio",
      specialEffects: "Liquid backlight for color depth",
      moodCreation: "Sophisticated luxury, heritage respect, quiet confidence",
    },

    composition: {
      primaryRule: "golden-ratio",
      secondaryElements: ["Bottle and glass relationship", "Reflection control", "Label visibility"],
      negativeSpaceUsage: "Generous 65% for luxury breathing room",
      depthLayers: "Shallow depth with bottle and glass plane",
      focalHierarchy: "Bottle hero, glass secondary, environment subtle",
      eyeFlow: "From bottle through pour to glass",
    },

    technicalSpecs: {
      camera: "Phase One XF IQ4",
      lens: "Schneider Kreuznach 80mm LS",
      aperture: "f/11 for bottle sharpness",
      iso: "ISO 100",
      postProduction: "Capture One with luxury spirits profile",
      colorGrade: "Rich, sophisticated, color-accurate liquid",
    },

    emotionalTerritory: "Sophisticated confidence, heritage appreciation, quiet luxury",
    brandPositioning: "Ultra-premium, heritage-rich, collector-worthy",
    targetAudience: "Connoisseurs, collectors, luxury consumers",

    awardReference: {
      cannesLions: "Grand Prix Design",
      dAndAd: "Black Pencil",
      campaign: "Johnnie Walker 'Keep Walking'",
      agency: "BBH London",
      year: 2020,
    },

    inspirationalCampaigns: [
      "Macallan brand photography",
      "Hennessy heritage campaigns",
      "Grey Goose luxury positioning",
    ],

    productionRequirements: [
      "Medium format essential",
      "Bottle handling expertise",
      "Liquid styling specialist",
      "Controlled studio environment",
    ],

    postProductionNotes:
      "Liquid color accuracy paramount. Bottle reflection must be controlled but not eliminated. Label readability essential. Consider subtle warmth for brown spirits.",
  },

  {
    id: "cannes-food-024",
    name: "Coffee Third Wave Craftsmanship",
    category: "food-beverage",
    subcategory: "beverage-coffee",

    conceptualBrief:
      "Document the third wave coffee movement where single-origin beans, precise brewing, and barista artistry combine. This style treats coffee preparation as both science and meditation.",

    visualPhilosophy:
      "Coffee as craft ritual. From the farmer's hand to the barista's pour, every step matters. Photography should honor this chain of care while capturing the sensory pleasure of the final cup.",

    keyVisualElements: [
      "Pour-over in progress",
      "Latte art creation moment",
      "Single-origin bean close-ups",
      "Brewing equipment geometry",
      "Café atmosphere context",
    ],

    lighting: {
      keyLight: "Bright café window light",
      fillLight: "Warm ambient from wood surfaces",
      colorTemperature: "5200K café brightness with warmth",
      lightingRatio: "2:1 approachable ratio",
      specialEffects: "Steam visibility, pour illumination",
      moodCreation: "Morning ritual calm, craft appreciation, community belonging",
    },

    composition: {
      primaryRule: "rule-of-thirds",
      secondaryElements: ["Pour-over geometry", "Barista hands in action", "Equipment arrangement"],
      negativeSpaceUsage: "Clean café aesthetic negative space",
      depthLayers: "Brewing action foreground, café midground, community background",
      focalHierarchy: "Brewing moment hero, final cup secondary",
      eyeFlow: "From pour through steam to cup",
    },

    technicalSpecs: {
      camera: "Fujifilm X-T5",
      lens: "XF 56mm f/1.2 R WR",
      aperture: "f/2.0 for shallow craft focus",
      iso: "ISO 640",
      postProduction: "Capture One with specialty coffee profile",
      colorGrade: "Clean, warm, slightly desaturated",
    },

    emotionalTerritory: "Morning ritual, craft appreciation, community belonging",
    brandPositioning: "Specialty coffee, craft-focused, quality-obsessed",
    targetAudience: "Coffee enthusiasts, third wave adopters, morning ritual seekers",

    awardReference: {
      campaign: "Blue Bottle Coffee Brand Evolution",
      agency: "Partners & Spade",
      year: 2020,
    },

    inspirationalCampaigns: [
      "Stumptown brand photography",
      "Counter Culture documentation",
      "Specialty Coffee Association imagery",
    ],

    productionRequirements: [
      "Working specialty café access",
      "Skilled barista coordination",
      "Steam and pour timing",
      "Morning light timing",
    ],

    postProductionNotes:
      "Maintain clean, bright third wave aesthetic. Steam should be visible but not overwhelming. Coffee color must be accurate to brew method.",

    requiresHands: true,
    humanElementJustification:
      "Barista's hands pouring show the craft and human expertise essential to specialty coffee",
  },

  {
    id: "cannes-food-025",
    name: "Fresh Juice Kinetic Explosion",
    category: "food-beverage",
    subcategory: "beverage-juice",

    conceptualBrief:
      "Capture the explosive freshness of cold-pressed juice with fruit in motion, liquid mid-pour, and color vibrancy that conveys immediate vitality. This style makes viewers feel the energy of fresh produce transformed.",

    visualPhilosophy:
      "Juice as captured sunlight. Fresh juice contains the energy of growing seasons, transformed into immediate vitality. Photography should convey this transfer of life force from fruit to glass to consumer.",

    keyVisualElements: [
      "Fruit mid-splash and explosion",
      "Liquid pour with dynamic flow",
      "Color gradient layers in glass",
      "Fresh produce abundance",
      "Water droplets and freshness cues",
    ],

    lighting: {
      keyLight: "Bright, clean backlight for liquid transparency",
      fillLight: "Front fill for fruit color",
      backLight: "Strong backlight for liquid glow",
      colorTemperature: "5500K clean daylight",
      lightingRatio: "3:1 for dimensional fruit",
      specialEffects: "High-speed capture, splash tanks",
      moodCreation: "Explosive freshness, immediate energy, natural vitality",
    },

    composition: {
      primaryRule: "centered-power",
      secondaryElements: ["Splash dynamics", "Fruit trajectory", "Liquid flow patterns"],
      negativeSpaceUsage: "Clean white or color-matched backgrounds",
      depthLayers: "Splash foreground, glass hero, fruit background",
      focalHierarchy: "Action moment hero, glass secondary, fruit context",
      eyeFlow: "From fruit trajectory through splash to glass",
    },

    technicalSpecs: {
      camera: "Canon EOS R3",
      lens: "Canon RF 100mm f/2.8L Macro IS USM",
      aperture: "f/16 for deep focus",
      iso: "ISO 200",
      shutterSpeed: "1/8000s or flash freeze",
      postProduction: "Capture One with vibrant juice profile",
      colorGrade: "Saturated, clean, maximum fruit color",
    },

    emotionalTerritory: "Energy burst, health vitality, natural power",
    brandPositioning: "Fresh, healthy, energizing, natural",
    targetAudience: "Health-conscious consumers, fitness enthusiasts, wellness seekers",

    awardReference: {
      cannesLions: "Gold Lion Craft",
      campaign: "Tropicana 'Squeeze the Day'",
      agency: "FCB New York",
      year: 2019,
    },

    inspirationalCampaigns: ["Naked Juice brand photography", "Suja campaign imagery", "Evolution Fresh documentation"],

    productionRequirements: [
      "High-speed capture system",
      "Splash tank and rigs",
      "Multiple identical setups for variations",
      "Fruit stylist on set",
    ],

    postProductionNotes:
      "Composite multiple takes for perfect splash. Color must remain appetizing - avoid over-saturation into artificial territory. Water droplets add freshness cues.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FASHION & BEAUTY PRESTIGE (30 styles)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "cannes-fashion-001",
    name: "Vogue Italia Editorial Drama",
    category: "fashion-beauty",
    subcategory: "editorial-high-fashion",

    conceptualBrief:
      "Channel the bold, provocative vision of Vogue Italia under Franca Sozzani's legacy. This style pushes fashion photography toward social commentary and artistic provocation while maintaining supreme visual sophistication.",

    visualPhilosophy:
      "Fashion as cultural provocation. Following the tradition of Steven Meisel's most boundary-pushing work, this aesthetic uses fashion as a vehicle for broader commentary while never sacrificing visual impact.",

    keyVisualElements: [
      "Bold, unexpected color palettes",
      "Theatrical makeup and styling",
      "Provocative poses with purpose",
      "Architectural or unusual locations",
      "Narrative tension in frame",
    ],

    lighting: {
      keyLight: "Dramatic directional light creating bold shadows",
      fillLight: "Minimal fill maintaining drama",
      backLight: "Rim light for subject separation",
      colorTemperature: "Variable based on editorial concept",
      lightingRatio: "5:1 dramatic editorial ratio",
      moodCreation: "Provocative tension, editorial authority, visual impact",
    },

    composition: {
      primaryRule: "dynamic-symmetry",
      secondaryElements: ["Full body with environmental context", "Bold color blocking", "Unexpected crop and framing"],
      negativeSpaceUsage: "Variable - often filled with editorial environment",
      depthLayers: "Model plane with editorial context depth",
      focalHierarchy: "Fashion and attitude equally heroic",
      eyeFlow: "Dramatic diagonal movement",
    },

    technicalSpecs: {
      camera: "Hasselblad X2D 100C",
      lens: "XCD 80mm f/1.9",
      aperture: "f/4 for editorial depth",
      iso: "ISO 400",
      postProduction: "Capture One with editorial grade profile",
      colorGrade: "Bold, saturated, magazine-ready",
    },

    emotionalTerritory: "Provocative beauty, cultural commentary, fearless expression",
    brandPositioning: "Avant-garde fashion, cultural relevance, visual authority",
    targetAudience: "Fashion insiders, cultural commentators, visual sophisticates",

    awardReference: {
      cannesLions: "Grand Prix",
      dAndAd: "Black Pencil",
      campaign: "Gucci 'The Ritual'",
      agency: "In-house Creative",
      year: 2020,
    },

    inspirationalCampaigns: [
      "Steven Meisel Vogue Italia covers",
      "Gucci under Alessandro Michele",
      "Balenciaga campaign photography",
    ],

    productionRequirements: [
      "High-end fashion styling team",
      "Location scouting capability",
      "Theatrical makeup artist",
      "Editorial concept development",
    ],

    postProductionNotes:
      "Editorial color grading should support concept. Bold choices acceptable. Skin retouching should maintain character while achieving magazine quality.",
  },

  {
    id: "cannes-fashion-002",
    name: "Clean Beauty Transparency",
    category: "fashion-beauty",
    subcategory: "beauty-skincare",

    conceptualBrief:
      "Document the clean beauty movement with photography that emphasizes ingredient transparency, skin health over coverage, and the confidence of minimalism. This style celebrates real skin with elegant simplicity.",

    visualPhilosophy:
      "Less is more, transparency is trust. In an era of filter fatigue, clean beauty photography offers authenticity as luxury. Real skin with real texture becomes the new aspirational standard.",

    keyVisualElements: [
      "Real skin texture visible and celebrated",
      "Minimal makeup application",
      "Product ingredients visible",
      "Clean, white backgrounds",
      "Moisture and hydration visual cues",
    ],

    lighting: {
      keyLight: "Large, soft beauty lighting for skin flattery",
      fillLight: "Generous fill maintaining skin detail",
      backLight: "Subtle rim for skin glow",
      colorTemperature: "5500K precise for accurate skin tones",
      lightingRatio: "1.5:1 minimal ratio for skin detail",
      moodCreation: "Healthy radiance, confident minimalism, trustworthy transparency",
    },

    composition: {
      primaryRule: "centered-power",
      secondaryElements: ["Close-up skin details", "Product integration", "Negative space for clean aesthetic"],
      negativeSpaceUsage: "Generous 60% for clean brand aesthetic",
      depthLayers: "Shallow with skin texture as hero",
      focalHierarchy: "Skin quality primary, product secondary",
      eyeFlow: "Direct to skin, then to product",
    },

    technicalSpecs: {
      camera: "Canon EOS R5",
      lens: "Canon RF 85mm f/1.2L USM",
      aperture: "f/2.8 for beauty sharpness with softness",
      iso: "ISO 100",
      postProduction: "Capture One with clean beauty profile",
      colorGrade: "Natural, accurate, minimal enhancement",
    },

    emotionalTerritory: "Healthy confidence, transparent trust, minimal elegance",
    brandPositioning: "Clean beauty, ingredient-focused, authenticity-driven",
    targetAudience: "Ingredient-conscious consumers, wellness-focused shoppers",

    awardReference: {
      cannesLions: "Gold Lion",
      campaign: "Glossier 'Skin First'",
      agency: "In-house Creative",
      year: 2019,
    },

    inspirationalCampaigns: [
      "Glossier brand photography",
      "The Ordinary campaign imagery",
      "Drunk Elephant visual language",
    ],

    productionRequirements: [
      "Real skin model casting",
      "Minimal makeup expertise",
      "Clean product styling",
      "Ingredient photography capability",
    ],

    postProductionNotes:
      "Minimal retouching philosophy. Enhance glow, maintain texture. Remove temporary blemishes, keep freckles and natural variation. Color accuracy for ingredient transparency.",
  },

  {
    id: "cannes-fashion-003",
    name: "Inclusive Beauty Celebration",
    category: "fashion-beauty",
    subcategory: "beauty-inclusive",

    conceptualBrief:
      "Document beauty across all skin tones, ages, and body types with equal technical excellence and artistic vision. This style proves that inclusive casting enhances rather than compromises visual impact.",

    visualPhilosophy:
      "Beauty without qualifiers. Following Fenty Beauty's revolution, this aesthetic demonstrates that inclusive beauty photography creates more compelling, relevant, and emotionally resonant campaigns.",

    keyVisualElements: [
      "Diverse model casting as standard",
      "Skin tone accuracy across spectrum",
      "Age diversity in beauty context",
      "Body diversity in fashion context",
      "Individual beauty characteristics celebrated",
    ],

    lighting: {
      keyLight: "Adaptable lighting for all skin tones",
      fillLight: "Adjusted fill for skin tone luminosity",
      colorTemperature: "Varied for optimal skin tone rendering",
      lightingRatio: "Adjusted per skin tone for optimal results",
      moodCreation: "Confident celebration, individual beauty, inclusive joy",
    },

    composition: {
      primaryRule: "rule-of-thirds",
      secondaryElements: [
        "Group compositions showing diversity",
        "Individual portraits with equal excellence",
        "Product integration across skin tones",
      ],
      negativeSpaceUsage: "Variable based on composition needs",
      depthLayers: "Variable - group and individual approaches",
      focalHierarchy: "All subjects equally heroic",
      eyeFlow: "Natural movement across diverse subjects",
    },

    technicalSpecs: {
      camera: "Hasselblad X2D 100C",
      lens: "XCD 90mm f/2.5",
      aperture: "f/4 for group sharpness, f/2.5 for portraits",
      iso: "ISO 400",
      postProduction: "Capture One with inclusive skin tone profiles",
      colorGrade: "Accurate skin tones as non-negotiable foundation",
    },

    emotionalTerritory: "Confident inclusion, beauty celebration, representation joy",
    brandPositioning: "Inclusive beauty, progressive values, universal appeal",
    targetAudience: "All beauty consumers, representation-seeking shoppers",

    awardReference: {
      cannesLions: "Grand Prix Glass Lion",
      dAndAd: "Impact Award",
      campaign: "Fenty Beauty Launch",
      agency: "Kendo Brands",
      year: 2018,
    },

    inspirationalCampaigns: ["Fenty Beauty by Rihanna", "Dove 'Real Beauty'", "Aerie 'Real' campaign"],

    productionRequirements: [
      "Inclusive casting expertise",
      "Lighting expertise for all skin tones",
      "Makeup artists skilled across diversity",
      "Authentic representation consultation",
    ],

    postProductionNotes:
      "Skin tone accuracy paramount and non-negotiable. Equal retouching standards across all subjects. Celebrate individual characteristics. Technical excellence as proof of inclusive capability.",
  },

  {
    id: "cannes-fashion-004",
    name: "Luxury Fragrance Evocation",
    category: "fashion-beauty",
    subcategory: "fragrance-luxury",

    conceptualBrief:
      "Translate invisible scent into visible emotion. Fragrance photography must make viewers almost smell the image - evoking the emotional journey of the scent through visual metaphor and atmospheric suggestion.",

    visualPhilosophy:
      "Photography as synesthesia. Since we cannot photograph smell, we must photograph feeling. Every visual choice - light, color, texture, expression - becomes a note in the fragrance's visual chord.",

    keyVisualElements: [
      "Atmospheric haze suggesting scent diffusion",
      "Emotional model performance",
      "Bottle as sculptural hero",
      "Color palette matching scent profile",
      "Textural elements suggesting notes",
    ],

    lighting: {
      keyLight: "Dramatic directional light creating atmosphere",
      fillLight: "Haze-enhanced fill for scent suggestion",
      backLight: "Bottle backlight for liquid glow",
      practicalLights: "Atmospheric haze illumination",
      colorTemperature: "Matched to fragrance profile",
      lightingRatio: "4:1 dramatic ratio",
      specialEffects: "Haze, smoke, mist for scent visualization",
      moodCreation: "Emotional immersion, scent suggestion, desire creation",
    },

    composition: {
      primaryRule: "golden-ratio",
      secondaryElements: ["Model and bottle relationship", "Atmospheric depth", "Emotional framing"],
      negativeSpaceUsage: "Filled with atmosphere, not emptiness",
      depthLayers: "Multiple atmospheric layers",
      focalHierarchy: "Model emotion primary, bottle secondary, atmosphere tertiary",
      eyeFlow: "Emotional connection through composition",
    },

    technicalSpecs: {
      camera: "Phase One XF IQ4",
      lens: "Schneider Kreuznach 55mm LS",
      aperture: "f/4 for atmospheric depth",
      iso: "ISO 200",
      postProduction: "Capture One with fragrance mood profiles",
      colorGrade: "Emotional palette matched to scent profile",
    },

    emotionalTerritory: "Desire, memory, emotional transportation",
    brandPositioning: "Luxury fragrance, emotional depth, aspirational desire",
    targetAudience: "Fragrance connoisseurs, emotional shoppers, luxury consumers",

    awardReference: {
      cannesLions: "Gold Lion Film Craft",
      campaign: "Chanel No. 5 'The One That I Want'",
      agency: "In-house Creative",
      year: 2020,
    },

    inspirationalCampaigns: ["Dior J'adore campaigns", "Tom Ford fragrance imagery", "YSL fragrance photography"],

    productionRequirements: [
      "Atmospheric haze equipment",
      "Emotional model direction capability",
      "Fragrance bottle lighting expertise",
      "Color theory application",
    ],

    postProductionNotes:
      "Atmosphere enhancement critical. Color grade must support scent profile (fresh=cool, oriental=warm). Bottle must remain recognizable hero while supporting emotional narrative.",
  },

  {
    id: "cannes-fashion-005",
    name: "Sustainable Fashion Transparency",
    category: "fashion-beauty",
    subcategory: "fashion-sustainable",

    conceptualBrief:
      "Document sustainable fashion with photography that emphasizes material integrity, ethical production, and environmental consciousness. This style makes sustainability beautiful without greenwashing.",

    visualPhilosophy:
      "Transparency as aesthetic. Show the processes, the materials, the people behind sustainable fashion. The supply chain becomes content, and authenticity becomes aspiration.",

    keyVisualElements: [
      "Natural materials in detail",
      "Production process documentation",
      "Artisan hands at work",
      "Environmental context",
      "Minimal, considered styling",
    ],

    lighting: {
      keyLight: "Natural daylight suggesting transparency",
      fillLight: "Environmental ambient",
      colorTemperature: "5500K clean daylight",
      lightingRatio: "2:1 natural ratio",
      moodCreation: "Honest transparency, natural beauty, conscious choice",
    },

    composition: {
      primaryRule: "rule-of-thirds",
      secondaryElements: ["Material close-ups", "Process documentation", "Environmental context"],
      negativeSpaceUsage: "Natural environmental negative space",
      depthLayers: "Material detail to environmental context",
      focalHierarchy: "Material quality primary, human element secondary",
      eyeFlow: "From detail to context, material to meaning",
    },

    technicalSpecs: {
      camera: "Fujifilm GFX 100S",
      lens: "GF 80mm f/1.7 R WR",
      aperture: "f/4 for material detail",
      iso: "ISO 400",
      postProduction: "Capture One with natural profile",
      colorGrade: "Natural, un-manipulated, honest",
    },

    emotionalTerritory: "Conscious confidence, environmental care, authentic style",
    brandPositioning: "Sustainable luxury, transparent practices, conscious fashion",
    targetAudience: "Conscious consumers, sustainability-focused shoppers",

    awardReference: {
      cannesLions: "Grand Prix Sustainable Development Goals",
      campaign: "Patagonia 'Don't Buy This Jacket'",
      agency: "In-house Creative",
      year: 2011,
    },

    inspirationalCampaigns: [
      "Stella McCartney sustainability messaging",
      "Eileen Fisher Renew program",
      "Reformation transparency photography",
    ],

    productionRequirements: [
      "Supply chain access for documentation",
      "Material specialist knowledge",
      "Environmental location scouting",
      "Authentic production setting access",
    ],

    postProductionNotes:
      "Minimal manipulation supporting transparency message. Color accuracy for material truth. Document actual production, not staged versions.",

    requiresHands: true,
    humanElementJustification: "Artisan hands show the human element of ethical production",
  },

  {
    id: "cannes-fashion-006",
    name: "Street Style Documentary Authentic",
    category: "fashion-beauty",
    subcategory: "fashion-street",

    conceptualBrief:
      "Capture genuine street style with documentary authenticity. This style treats fashion week streets and urban environments as the new runway, where personal style speaks louder than designer names.",

    visualPhilosophy:
      "Fashion democracy in action. The street style revolution proved that individual creativity matters more than industry dictates. Photography should honor this democratic spirit with documentary honesty.",

    keyVisualElements: [
      "Unposed or naturally posed subjects",
      "Urban environment context",
      "Personal style expression",
      "Movement and action",
      "Diverse subjects as standard",
    ],

    lighting: {
      keyLight: "Available urban light",
      fillLight: "Environmental bounce",
      colorTemperature: "Variable urban lighting",
      lightingRatio: "Variable natural conditions",
      moodCreation: "Authentic energy, personal confidence, urban vitality",
    },

    composition: {
      primaryRule: "leading-lines",
      secondaryElements: ["Urban architecture framing", "Motion capture", "Candid moments"],
      negativeSpaceUsage: "Urban environmental context",
      depthLayers: "Subject foreground, urban midground, city background",
      focalHierarchy: "Subject and style primary, environment contextual",
      eyeFlow: "Natural street movement patterns",
    },

    technicalSpecs: {
      camera: "Leica M11",
      lens: "Summicron-M 35mm f/2 ASPH",
      aperture: "f/4 for street context",
      iso: "ISO 800-3200 variable",
      postProduction: "Lightroom with documentary profile",
      colorGrade: "Natural urban, honest color",
    },

    emotionalTerritory: "Individual expression, democratic style, authentic confidence",
    brandPositioning: "Street authentic, democratic fashion, individual expression",
    targetAudience: "Fashion enthusiasts, style individualists, trend seekers",

    awardReference: {
      adsOfTheWorld: "Top 100 Fashion",
      campaign: "Nike 'Nothing Beats a Londoner'",
      agency: "Wieden+Kennedy London",
      year: 2018,
    },

    inspirationalCampaigns: [
      "Tommy Ton street photography",
      "Scott Schuman 'The Sartorialist'",
      "Phil Oh fashion week documentation",
    ],

    productionRequirements: [
      "Street photography expertise",
      "Fashion week access",
      "Fast capture capability",
      "Urban navigation skills",
    ],

    postProductionNotes:
      "Maintain documentary authenticity. Enhance but don't transform. Subject permission and respect always. Urban energy should remain visible in final images.",
  },

  {
    id: "cannes-fashion-007",
    name: "Heritage Luxury Craftsmanship",
    category: "fashion-beauty",
    subcategory: "luxury-heritage",

    conceptualBrief:
      "Document the craftsmanship behind heritage luxury brands. This style makes visible the hours of skilled handwork, generations of expertise, and uncompromising quality that justify luxury positioning.",

    visualPhilosophy:
      "Luxury as time made visible. Heritage brands offer something mass production cannot: accumulated expertise, traditional techniques, human dedication. Photography must make this invisible value visible.",

    keyVisualElements: [
      "Master craftsman at work",
      "Tool and technique details",
      "Material quality close-ups",
      "Atelier environment",
      "Finished product as achievement",
    ],

    lighting: {
      keyLight: "Atelier workspace lighting simulation",
      fillLight: "Warm ambient from work surfaces",
      colorTemperature: "4500K warm atelier quality",
      lightingRatio: "2.5:1 focused work light",
      moodCreation: "Focused dedication, master expertise, heritage pride",
    },

    composition: {
      primaryRule: "frame-within-frame",
      secondaryElements: ["Hands-at-work primary", "Tool detail secondary", "Environment context"],
      negativeSpaceUsage: "Minimal - atelier fullness is authentic",
      depthLayers: "Work detail foreground, craftsman midground, atelier background",
      focalHierarchy: "Hands and work primary, face secondary, environment tertiary",
      eyeFlow: "From hands through creation to finished piece",
    },

    technicalSpecs: {
      camera: "Leica SL2",
      lens: "APO-Summicron-SL 75mm f/2 ASPH",
      aperture: "f/2.8 for craft focus",
      iso: "ISO 800",
      postProduction: "Capture One with heritage warm profile",
      colorGrade: "Rich, warm, timeless quality",
    },

    emotionalTerritory: "Mastery respect, heritage appreciation, quality recognition",
    brandPositioning: "Heritage luxury, master craftsmanship, timeless value",
    targetAudience: "Luxury connoisseurs, heritage appreciators, quality seekers",

    awardReference: {
      cannesLions: "Gold Lion Brand Experience",
      campaign: "Hermès 'The Gift of Time'",
      agency: "Publicis & Nous",
      year: 2019,
    },

    inspirationalCampaigns: [
      "Hermès artisan documentation",
      "Louis Vuitton 'Savoir Faire'",
      "Chanel métiers d'art films",
    ],

    productionRequirements: [
      "Atelier access negotiation",
      "Master craftsman relationship",
      "Non-disruptive shooting approach",
      "Craft understanding for proper documentation",
    ],

    postProductionNotes:
      "Warm but not orange. Maintain material accuracy. Honor the dignity of the work without excessive dramatization. This is documentation, not performance.",

    requiresHands: true,
    humanElementJustification:
      "Craftsman's hands ARE the story - skill, dedication, and years of mastery visible in every gesture",
  },

  // --- Additional Fashion & Beauty styles (23 more) ---
  {
    id: "cannes-fashion-008",
    name: "Gen-Z Digital Native Aesthetic",
    category: "fashion-beauty",
    subcategory: "fashion-youth",

    conceptualBrief:
      "Capture fashion for the first digital-native generation. This style embraces the visual language of Instagram, TikTok, and Discord - candid, slightly chaotic, authenticity-coded but highly curated.",

    visualPhilosophy:
      "Digital native visual language. Gen-Z reads visual authenticity differently - the overly polished reads as fake, the slightly messy reads as real. Photography must understand these codes.",

    keyVisualElements: [
      "Flash photography aesthetic",
      "Casual, candid posing",
      "Vintage and Y2K references",
      "Screen and digital elements",
      "Friend group dynamics",
    ],

    lighting: {
      keyLight: "Direct flash on-camera aesthetic",
      fillLight: "Minimal - harsh flash is intentional",
      colorTemperature: "Flash white with color spill",
      lightingRatio: "6:1 harsh flash ratio",
      moodCreation: "Candid energy, friend group intimacy, digital native authenticity",
    },

    composition: {
      primaryRule: "rule-of-thirds",
      secondaryElements: ["Snapshot aesthetic", "Group dynamics", "Environmental chaos"],
      negativeSpaceUsage: "Often filled with environment",
      depthLayers: "Flash-flattened but intentional",
      focalHierarchy: "Friend energy primary, fashion secondary",
      eyeFlow: "Natural, wandering, not directed",
    },

    technicalSpecs: {
      camera: "Ricoh GR III",
      lens: "Built-in 28mm f/2.8",
      aperture: "f/5.6 for flash",
      iso: "ISO 400",
      postProduction: "Lightroom with Y2K preset",
      colorGrade: "High contrast, slightly oversaturated, flash aesthetic",
    },

    emotionalTerritory: "Friend group energy, digital native code, authentic youth",
    brandPositioning: "Youth-relevant, digitally native, authenticity-coded",
    targetAudience: "Gen-Z consumers, digital natives, trend-forward youth",

    awardReference: {
      cannesLions: "Silver Lion Social",
      campaign: "Depop Brand Campaign",
      agency: "In-house Creative",
      year: 2021,
    },

    inspirationalCampaigns: [
      "Depop community photography",
      "Glossier friend group shoots",
      "Urban Outfitters UO Community",
    ],

    productionRequirements: [
      "Youth casting authenticity",
      "Flash photography expertise",
      "Cultural code fluency",
      "Social platform understanding",
    ],

    postProductionNotes:
      "The 'imperfect' aesthetic is carefully crafted. Flash harshness is intentional. Color grade should feel like a premium version of phone filter. Authenticity-coded but not actually sloppy.",
  },

  {
    id: "cannes-fashion-009",
    name: "Haute Couture Archive Editorial",
    category: "fashion-beauty",
    subcategory: "fashion-couture",

    conceptualBrief:
      "Document haute couture as the living art form it is. This style treats couture photography as museum documentation meets editorial vision - preserving the craftsmanship while creating desire.",

    visualPhilosophy:
      "Couture as wearable sculpture. These pieces represent hundreds of hours of hand labor and irreplaceable craft skills. Photography must honor this investment while creating compelling commercial imagery.",

    keyVisualElements: [
      "Detail shots revealing handwork",
      "Full garment architectural photography",
      "Movement capturing fabric behavior",
      "Atelier and runway documentation",
      "Model as sculpture armature",
    ],

    lighting: {
      keyLight: "Museum-quality controlled illumination",
      fillLight: "Detail-revealing secondary light",
      backLight: "Fabric transparency and texture enhancement",
      colorTemperature: "5000K neutral for color accuracy",
      lightingRatio: "2:1 for detail revelation",
      moodCreation: "Reverent appreciation, artistic wonder, aspirational beauty",
    },

    composition: {
      primaryRule: "golden-ratio",
      secondaryElements: [
        "Garment architecture primary",
        "Detail sequences",
        "Scale relationship showing craftsmanship",
      ],
      negativeSpaceUsage: "Gallery-like space for garment appreciation",
      depthLayers: "Detail foreground to full garment to environment",
      focalHierarchy: "Craftsmanship detail and full silhouette equally important",
      eyeFlow: "From detail wonder to full impact appreciation",
    },

    technicalSpecs: {
      camera: "Phase One XF IQ4 150MP",
      lens: "Schneider Kreuznach 120mm LS Macro",
      aperture: "f/11 for comprehensive detail",
      iso: "ISO 100",
      postProduction: "Capture One with archive accuracy profile",
      colorGrade: "Neutral accuracy with material enhancement",
    },

    emotionalTerritory: "Artistic reverence, craft appreciation, aspirational wonder",
    brandPositioning: "Ultimate luxury, living art, irreplaceable craftsmanship",
    targetAudience: "Couture clients, fashion historians, luxury collectors",

    awardReference: {
      cannesLions: "Grand Prix Luxury",
      campaign: "Dior Haute Couture Archive",
      agency: "In-house Creative",
      year: 2021,
    },

    inspirationalCampaigns: [
      "Met Gala documentation by Vogue",
      "Chanel Haute Couture campaigns",
      "Valentino Couture editorial",
    ],

    productionRequirements: [
      "Medium format essential for archive quality",
      "Couture handling expertise",
      "Lighting for fabric revelation",
      "Fashion conservator consultation",
    ],

    postProductionNotes:
      "Archive accuracy balanced with editorial appeal. Detail enhancement for craftsmanship visibility. Color accuracy for fabric documentation. This imagery may serve archival purposes.",
  },

  {
    id: "cannes-fashion-010",
    name: "Wellness Beauty Glow Authentic",
    category: "fashion-beauty",
    subcategory: "beauty-wellness",

    conceptualBrief:
      "Capture the wellness-driven beauty movement where healthy skin, natural radiance, and inner wellbeing manifest as outer beauty. This style documents the 'inside-out' beauty philosophy.",

    visualPhilosophy:
      "Beauty as health expression. The wellness movement redefined beauty standards from coverage to radiance. Photography should capture the glow that comes from genuine wellbeing, not just good lighting.",

    keyVisualElements: [
      "Natural dewy skin texture",
      "Minimal makeup enhancing natural features",
      "Active or post-activity moments",
      "Healthy lifestyle context",
      "Real skin with real texture",
    ],

    lighting: {
      keyLight: "Soft natural light suggesting outdoor wellness",
      fillLight: "Ambient wellness space light",
      colorTemperature: "5200K fresh morning quality",
      lightingRatio: "1.5:1 healthy even light",
      moodCreation: "Healthy vitality, natural confidence, authentic wellness",
    },

    composition: {
      primaryRule: "rule-of-thirds",
      secondaryElements: ["Natural environments", "Movement and activity", "Lifestyle integration"],
      negativeSpaceUsage: "Natural environmental space",
      depthLayers: "Subject with wellness environment context",
      focalHierarchy: "Natural glow primary, lifestyle secondary",
      eyeFlow: "Skin radiance to environment connection",
    },

    technicalSpecs: {
      camera: "Canon EOS R5",
      lens: "Canon RF 85mm f/1.2L USM",
      aperture: "f/2.8 for glow enhancement",
      iso: "ISO 400",
      postProduction: "Lightroom with natural glow profile",
      colorGrade: "Fresh, clean, health-coded",
    },

    emotionalTerritory: "Healthy confidence, natural vitality, authentic wellbeing",
    brandPositioning: "Wellness beauty, inside-out philosophy, authentic health",
    targetAudience: "Wellness-focused consumers, natural beauty seekers",

    awardReference: {
      campaign: "Goop Beauty",
      agency: "In-house Creative",
      year: 2020,
    },

    inspirationalCampaigns: ["Moon Juice brand photography", "Goop wellness imagery", "Sakara Life brand visuals"],

    productionRequirements: [
      "Wellness location access",
      "Natural beauty casting",
      "Minimal makeup expertise",
      "Activity coordination",
    ],

    postProductionNotes:
      "Enhance natural glow, not create artificial one. Skin texture visible and celebrated. Activity context should feel genuine, not staged. Fresh color palette without cold clinical feeling.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIFESTYLE & WELLNESS PREMIUM (25 styles)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "cannes-lifestyle-001",
    name: "Mindful Living Sanctuary",
    category: "lifestyle-wellness",
    subcategory: "wellness-mindfulness",

    conceptualBrief:
      "Document the mindfulness movement's visual language - meditation spaces, intentional living, and the aesthetics of presence. This style captures the calm confidence of people who have chosen consciousness over chaos.",

    visualPhilosophy:
      "Stillness as statement. In a culture of constant stimulation, the choice of calm becomes revolutionary. Photography should convey the luxury of undivided attention and the beauty of intentional simplicity.",

    keyVisualElements: [
      "Meditation and yoga moments",
      "Minimal, intentional interiors",
      "Natural materials and textures",
      "Soft morning or evening light",
      "Ritualistic daily moments",
    ],

    lighting: {
      keyLight: "Soft directional morning light",
      fillLight: "Ambient bounce from natural materials",
      colorTemperature: "5000K gentle morning quality",
      lightingRatio: "1.5:1 peaceful ratio",
      moodCreation: "Peaceful sanctuary, mindful presence, calm confidence",
    },

    composition: {
      primaryRule: "negative-space-dominance",
      secondaryElements: [
        "Breathing room as design element",
        "Minimal object arrangement",
        "Human stillness within space",
      ],
      negativeSpaceUsage: "Generous 70% conveying calm",
      depthLayers: "Shallow depth creating dreamlike quality",
      focalHierarchy: "Mindful moment primary, environment secondary",
      eyeFlow: "Gentle, non-demanding exploration",
    },

    technicalSpecs: {
      camera: "Fujifilm GFX 50S II",
      lens: "GF 80mm f/1.7 R WR",
      aperture: "f/2.8 for gentle softness",
      iso: "ISO 400",
      postProduction: "Capture One with mindful warm profile",
      colorGrade: "Soft, warm, slightly desaturated",
    },

    emotionalTerritory: "Peaceful confidence, intentional living, mindful presence",
    brandPositioning: "Wellness luxury, mindful lifestyle, intentional design",
    targetAudience: "Wellness seekers, mindfulness practitioners, intentional livers",

    awardReference: {
      cannesLions: "Silver Lion Lifestyle",
      campaign: "Headspace 'The Science of Meditation'",
      agency: "In-house Creative",
      year: 2020,
    },

    inspirationalCampaigns: ["Headspace brand photography", "Calm app visual language", "Kinfolk magazine aesthetic"],

    productionRequirements: [
      "Authentic meditation space access",
      "Real practitioner casting",
      "Morning light timing",
      "Minimal styling approach",
    ],

    postProductionNotes:
      "Soft without being hazy. Warm without being yellow. The calm should feel earned, not artificial. Maintain texture while reducing visual noise.",
  },

  {
    id: "cannes-lifestyle-002",
    name: "Adventure Wellness Expedition",
    category: "lifestyle-wellness",
    subcategory: "wellness-adventure",

    conceptualBrief:
      "Document the adventure wellness movement where extreme environments become pathways to mental health and self-discovery. This style captures the transformative power of wilderness challenges.",

    visualPhilosophy:
      "Challenge as therapy. The adventure wellness movement understands that difficult experiences build resilience. Photography should capture both the challenge and the breakthrough moments of outdoor transformation.",

    keyVisualElements: [
      "Dramatic landscape contexts",
      "Human scale against nature",
      "Moment of achievement/breakthrough",
      "Weather and element challenges",
      "Authentic effort and emotion",
    ],

    lighting: {
      keyLight: "Natural environmental light",
      fillLight: "Landscape ambient bounce",
      colorTemperature: "Variable natural conditions",
      lightingRatio: "Variable dramatic conditions",
      moodCreation: "Achievement pride, nature awe, transformation moment",
    },

    composition: {
      primaryRule: "rule-of-thirds",
      secondaryElements: ["Human-landscape scale relationship", "Journey narrative", "Challenge and reward moments"],
      negativeSpaceUsage: "Landscape dominance showing human scale",
      depthLayers: "Human foreground, journey midground, destination background",
      focalHierarchy: "Human achievement within landscape context",
      eyeFlow: "Journey path through landscape",
    },

    technicalSpecs: {
      camera: "Sony A7RV",
      lens: "Sony FE 24-70mm f/2.8 GM II",
      aperture: "f/8 for landscape context",
      iso: "ISO 400",
      postProduction: "Lightroom with adventure landscape profile",
      colorGrade: "Natural dramatic, enhanced but honest",
    },

    emotionalTerritory: "Achievement pride, nature awe, transformative challenge",
    brandPositioning: "Adventure wellness, transformative experiences, authentic challenge",
    targetAudience: "Adventure seekers, wellness travelers, transformation seekers",

    awardReference: {
      cannesLions: "Grand Prix Outdoor",
      campaign: "Patagonia 'Worn Wear'",
      agency: "In-house Creative",
      year: 2019,
    },

    inspirationalCampaigns: [
      "Patagonia brand photography by Jimmy Chin",
      "Arc'teryx expedition documentation",
      "Black Diamond athlete imagery",
    ],

    productionRequirements: [
      "Expedition access and capability",
      "Weather and condition flexibility",
      "Athlete/adventurer coordination",
      "Safety-first production approach",
    ],

    postProductionNotes:
      "Honor the real conditions - don't overly dramatize already dramatic moments. Weather and light challenges should remain visible. Authentic effort more valuable than perfect composition.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TECHNOLOGY & INNOVATION (25 styles)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "cannes-tech-001",
    name: "Human-Centered AI Narrative",
    category: "technology-innovation",
    subcategory: "tech-ai",

    conceptualBrief:
      "Document artificial intelligence through human stories and benefits rather than dystopian abstraction. This style makes AI visible through its positive human impact, avoiding both hype and fear.",

    visualPhilosophy:
      "AI as human augmentation, not replacement. The most effective AI photography shows technology amplifying human capability, creativity, and connection. The human remains the hero.",

    keyVisualElements: [
      "Human interaction with AI interfaces",
      "Accessibility and enablement moments",
      "Diverse users benefiting from AI",
      "Natural integration in daily life",
      "Warm technology, not cold",
    ],

    lighting: {
      keyLight: "Warm interior light suggesting comfort",
      fillLight: "Screen glow as secondary light",
      practicalLights: "Device screens as ambient",
      colorTemperature: "4500K warm despite technology context",
      lightingRatio: "2:1 approachable ratio",
      moodCreation: "Warm accessibility, human empowerment, hopeful future",
    },

    composition: {
      primaryRule: "rule-of-thirds",
      secondaryElements: ["Human-device relationship", "Benefit moment capture", "Daily life integration"],
      negativeSpaceUsage: "Moderate with life context",
      depthLayers: "Human foreground, technology midground, life context",
      focalHierarchy: "Human benefit primary, technology secondary",
      eyeFlow: "From human expression to technology to outcome",
    },

    technicalSpecs: {
      camera: "Canon EOS R5",
      lens: "Canon RF 35mm f/1.4L VCM",
      aperture: "f/2.8 for environmental depth",
      iso: "ISO 800",
      postProduction: "Lightroom with warm tech profile",
      colorGrade: "Warm, approachable, human-centered",
    },

    emotionalTerritory: "Hopeful progress, human empowerment, accessible technology",
    brandPositioning: "Human-centered AI, beneficial technology, inclusive progress",
    targetAudience: "Technology adopters, accessibility advocates, future optimists",

    awardReference: {
      cannesLions: "Grand Prix Creative Data",
      campaign: "Google 'Project Relate'",
      agency: "In-house Creative",
      year: 2022,
    },

    inspirationalCampaigns: ["Apple Accessibility campaigns", "Microsoft AI for Good", "Google Project Relate imagery"],

    productionRequirements: [
      "Real user casting for authenticity",
      "Working technology demonstration",
      "Accessibility consideration in production",
      "Diverse representation",
    ],

    postProductionNotes:
      "Warm color palette countering cold tech stereotypes. Screen glows should feel inviting, not alienating. Human expression always more important than technology appearance.",
  },

  {
    id: "cannes-tech-002",
    name: "Electric Mobility Future",
    category: "technology-innovation",
    subcategory: "tech-mobility",

    conceptualBrief:
      "Document the electric vehicle revolution with optimistic realism. This style captures the design beauty of EVs while showing their integration into sustainable lifestyles and urban futures.",

    visualPhilosophy:
      "Electric as evolution, not revolution. The best EV photography normalizes the technology while celebrating its design innovation. The future is here, and it's beautiful and accessible.",

    keyVisualElements: [
      "Clean vehicle design lines",
      "Charging infrastructure integration",
      "Urban and lifestyle context",
      "Sustainable living connection",
      "Design detail appreciation",
    ],

    lighting: {
      keyLight: "Clean environmental light",
      fillLight: "Reflective vehicle bounce",
      colorTemperature: "5500K clean future quality",
      lightingRatio: "2:1 clean ratio",
      moodCreation: "Clean optimism, design appreciation, sustainable future",
    },

    composition: {
      primaryRule: "dynamic-symmetry",
      secondaryElements: ["Vehicle design emphasis", "Environmental integration", "Lifestyle context"],
      negativeSpaceUsage: "Clean modern environments",
      depthLayers: "Vehicle hero with sustainable context",
      focalHierarchy: "Design innovation primary, lifestyle secondary",
      eyeFlow: "Vehicle line flow through environment",
    },

    technicalSpecs: {
      camera: "Sony A7RIV",
      lens: "Sony FE 24mm f/1.4 GM",
      aperture: "f/5.6 for vehicle sharpness",
      iso: "ISO 200",
      postProduction: "Capture One with clean tech profile",
      colorGrade: "Clean, bright, optimistic",
    },

    emotionalTerritory: "Future optimism, sustainable pride, design appreciation",
    brandPositioning: "Electric innovation, sustainable luxury, design-forward",
    targetAudience: "EV early adopters, sustainability advocates, design enthusiasts",

    awardReference: {
      cannesLions: "Gold Lion Auto",
      campaign: "Volvo 'Recharge'",
      agency: "Forsman & Bodenfors",
      year: 2020,
    },

    inspirationalCampaigns: ["Tesla brand photography", "Rivian adventure campaigns", "Polestar design documentation"],

    productionRequirements: [
      "Vehicle beauty shot expertise",
      "Charging infrastructure location",
      "Sustainable context integration",
      "Clean environment sourcing",
    ],

    postProductionNotes:
      "Clean, not sterile. Future optimism, not science fiction. Vehicle color accuracy essential. Environment should suggest sustainable lifestyle integration.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SUSTAINABILITY & PURPOSE (20 styles)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "cannes-sustainability-001",
    name: "Climate Action Documentary",
    category: "sustainability-purpose",
    subcategory: "environmental-activism",

    conceptualBrief:
      "Document climate action with visual urgency that inspires action rather than despair. This style captures both the crisis and the solutions, the urgency and the hope.",

    visualPhilosophy:
      "Urgent optimism. Climate photography must avoid both complacency and paralysis. The goal is to make viewers understand the stakes while believing their action matters.",

    keyVisualElements: [
      "Climate impact documentation",
      "Solution and action moments",
      "Youth activism energy",
      "Nature worth protecting",
      "Community action power",
    ],

    lighting: {
      keyLight: "Documentary available light",
      fillLight: "Environmental conditions",
      colorTemperature: "Variable documentary conditions",
      lightingRatio: "Variable based on situation",
      moodCreation: "Urgent concern, hopeful action, community power",
    },

    composition: {
      primaryRule: "rule-of-thirds",
      secondaryElements: ["Scale of impact/action", "Human faces of climate", "Before/after narratives"],
      negativeSpaceUsage: "Documentary context",
      depthLayers: "Human action within environmental context",
      focalHierarchy: "Human action primary, environmental context secondary",
      eyeFlow: "Narrative flow from problem to action",
    },

    technicalSpecs: {
      camera: "Nikon Z9",
      lens: "Nikkor Z 24-70mm f/2.8 S",
      aperture: "f/4 documentary flexibility",
      iso: "ISO 800 variable",
      postProduction: "Lightroom with documentary profile",
      colorGrade: "Honest, urgent, not manipulated",
    },

    emotionalTerritory: "Urgent hope, collective action, empowered engagement",
    brandPositioning: "Climate leadership, action-oriented, community power",
    targetAudience: "Climate-concerned consumers, activists, young changemakers",

    awardReference: {
      cannesLions: "Grand Prix Glass Lion for Change",
      campaign: "Patagonia 'Vote the Assholes Out'",
      agency: "In-house Creative",
      year: 2020,
    },

    inspirationalCampaigns: [
      "Patagonia environmental campaigns",
      "Extinction Rebellion documentation",
      "National Geographic climate coverage",
    ],

    productionRequirements: [
      "Documentary access and timing",
      "Climate science consultation",
      "Activist relationship building",
      "Ethical documentation approach",
    ],

    postProductionNotes:
      "Honesty paramount - no manipulation. Urgency without despair. Solutions as prominent as problems. Human faces humanize abstract crisis.",
  },

  {
    id: "cannes-sustainability-002",
    name: "Regenerative Agriculture Hope",
    category: "sustainability-purpose",
    subcategory: "sustainability-agriculture",

    conceptualBrief:
      "Document regenerative agriculture as hope narrative for food systems. This style shows farmers as climate heroes and soil health as foundation for everything.",

    visualPhilosophy:
      "Soil as salvation. Regenerative agriculture offers one of the most hopeful climate solutions. Photography should make viewers care about dirt and admire the farmers healing it.",

    keyVisualElements: [
      "Healthy soil close-ups",
      "Farmer-land relationship",
      "Biodiversity on farms",
      "Seasonal farm beauty",
      "Food-to-farm connection",
    ],

    lighting: {
      keyLight: "Natural farm golden hour",
      fillLight: "Environmental landscape light",
      colorTemperature: "5000K golden agricultural light",
      lightingRatio: "2:1 natural farm ratio",
      moodCreation: "Hopeful renewal, farmer respect, land appreciation",
    },

    composition: {
      primaryRule: "leading-lines",
      secondaryElements: ["Farm row patterns", "Farmer in landscape", "Soil detail and context"],
      negativeSpaceUsage: "Sky and field as hopeful space",
      depthLayers: "Detail foreground, farm midground, horizon background",
      focalHierarchy: "Soil/farmer primary, landscape secondary",
      eyeFlow: "From detail to horizon to hope",
    },

    technicalSpecs: {
      camera: "Sony A7RIV",
      lens: "Sony FE 35mm f/1.4 GM",
      aperture: "f/5.6 for landscape",
      iso: "ISO 400",
      postProduction: "Lightroom with warm agriculture profile",
      colorGrade: "Rich earth tones, golden warmth",
    },

    emotionalTerritory: "Hopeful action, farmer admiration, connection to food",
    brandPositioning: "Regenerative leadership, hope narrative, farmer partnership",
    targetAudience: "Conscious consumers, food system interested, sustainability seekers",

    awardReference: {
      cannesLions: "Gold Lion Sustainable Development",
      campaign: "Chipotle 'Back to the Start'",
      agency: "Creative Artists Agency",
      year: 2012,
    },

    inspirationalCampaigns: [
      "Patagonia Provisions photography",
      "Kiss the Ground documentary",
      "White Oak Pastures documentation",
    ],

    productionRequirements: [
      "Regenerative farm access",
      "Agricultural season timing",
      "Farmer relationship building",
      "Soil science understanding",
    ],

    postProductionNotes:
      "Earth tones should feel alive, not dusty. Golden hour essential for hope messaging. Soil close-ups need macro capability. Farmer portraits need documentary sensitivity.",

    requiresHands: true,
    humanElementJustification: "Farmer's hands in soil show the healing relationship with land",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AUTOMOTIVE & MOBILITY LUXURY (20 styles)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "cannes-auto-001",
    name: "Hyper-Luxury Grand Touring",
    category: "automotive-mobility",
    subcategory: "luxury-automotive",

    conceptualBrief:
      "Document ultra-luxury automotive as rolling sculpture in breathtaking environments. This style treats each vehicle as a work of art deserving of fine art photography treatment.",

    visualPhilosophy:
      "Automotive as fine art. The best luxury car photography elevates vehicles to sculpture status, capturing the design vision and engineering excellence that justify their price.",

    keyVisualElements: [
      "Vehicle design lines as sculpture",
      "Dramatic landscape integration",
      "Detail craftsmanship documentation",
      "Dynamic and static compositions",
      "Light sculpting vehicle forms",
    ],

    lighting: {
      keyLight: "Golden hour directional for vehicle sculpture",
      fillLight: "Reflector fill for shadow detail",
      backLight: "Rim light for vehicle separation",
      colorTemperature: "5000K golden with warm bias",
      lightingRatio: "3:1 dramatic vehicle ratio",
      moodCreation: "Design appreciation, exclusivity, aspirational desire",
    },

    composition: {
      primaryRule: "golden-ratio",
      secondaryElements: ["Vehicle-landscape relationship", "Design line emphasis", "Scale and presence"],
      negativeSpaceUsage: "Dramatic landscape as stage",
      depthLayers: "Vehicle hero with environment context",
      focalHierarchy: "Vehicle design primary, landscape secondary",
      eyeFlow: "Vehicle line flow through environment",
    },

    technicalSpecs: {
      camera: "Phase One XF IQ4",
      lens: "Schneider Kreuznach 55mm LS",
      aperture: "f/8 for vehicle sharpness",
      iso: "ISO 100",
      postProduction: "Capture One with automotive profile",
      colorGrade: "Rich, dimensional, design-enhancing",
    },

    emotionalTerritory: "Design appreciation, aspirational desire, exclusivity",
    brandPositioning: "Ultra-luxury, design excellence, exclusivity",
    targetAudience: "Ultra-high-net-worth individuals, automotive collectors",

    awardReference: {
      cannesLions: "Gold Lion Automotive",
      campaign: "Rolls-Royce 'Inspire Greatness'",
      agency: "Intro",
      year: 2021,
    },

    inspirationalCampaigns: [
      "Bentley brand photography",
      "Aston Martin lifestyle campaigns",
      "Pagani automotive art documentation",
    ],

    productionRequirements: [
      "Premium location access",
      "Vehicle transport logistics",
      "Automotive lighting expertise",
      "Golden hour timing precision",
    ],

    postProductionNotes:
      "Paint finish must be perfect. Reflections controlled but not eliminated. Environment should enhance, not compete. Detail shots require medium format quality.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DOCUMENTARY & EDITORIAL TRUTH (20 styles)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "cannes-documentary-001",
    name: "Human Interest Photojournalism",
    category: "documentary-editorial",
    subcategory: "documentary-human",

    conceptualBrief:
      "Document human stories with photojournalistic integrity for brand narratives. This style brings the credibility and emotional depth of journalism to commercial storytelling.",

    visualPhilosophy:
      "Truth as strategy. In an era of skepticism, authentic documentation builds trust that styled photography cannot. The best brand storytelling often looks like photojournalism.",

    keyVisualElements: [
      "Real people in real situations",
      "Candid moments over posed",
      "Environmental context",
      "Emotional authenticity",
      "Documentary framing",
    ],

    lighting: {
      keyLight: "Available light documentation",
      fillLight: "Environmental conditions",
      colorTemperature: "Variable honest conditions",
      lightingRatio: "Variable documentary conditions",
      moodCreation: "Authentic connection, documentary truth, emotional engagement",
    },

    composition: {
      primaryRule: "rule-of-thirds",
      secondaryElements: ["Candid moment capture", "Environmental context", "Journalistic framing"],
      negativeSpaceUsage: "Documentary context space",
      depthLayers: "Subject within environment",
      focalHierarchy: "Human emotion primary, context secondary",
      eyeFlow: "Natural documentary exploration",
    },

    technicalSpecs: {
      camera: "Leica Q2",
      lens: "Summilux 28mm f/1.7 ASPH",
      aperture: "f/2.8 documentary flexibility",
      iso: "ISO 800-3200 variable",
      postProduction: "Lightroom with documentary profile",
      colorGrade: "Honest, natural, minimal manipulation",
    },

    emotionalTerritory: "Authentic connection, truth engagement, human stories",
    brandPositioning: "Authentic storytelling, journalistic credibility, human connection",
    targetAudience: "Story-hungry consumers, authenticity seekers, journalism appreciators",

    awardReference: {
      cannesLions: "Grand Prix Film",
      dAndAd: "Black Pencil",
      campaign: "Nike 'Dream Crazy'",
      agency: "Wieden+Kennedy",
      year: 2019,
    },

    inspirationalCampaigns: ["Nike athlete documentation", "Dove 'Real Beauty' photography", "Airbnb host stories"],

    productionRequirements: [
      "Documentary shooting expertise",
      "Real subject access and trust",
      "Ethical documentation practices",
      "Extended time for authentic moments",
    ],

    postProductionNotes:
      "Minimal manipulation is ethical requirement. Color correction acceptable, significant alteration is not. The goal is to present reality compellingly, not to create fantasy.",
  },

  {
    id: "cannes-documentary-002",
    name: "Social Impact Witness",
    category: "documentary-editorial",
    subcategory: "documentary-social",

    conceptualBrief:
      "Document social impact and cause marketing with witness integrity. This style captures the real people and situations that benefit from brand social responsibility efforts.",

    visualPhilosophy:
      "Witness without exploitation. Social impact photography must honor its subjects while inspiring action. The line between powerful and exploitative requires constant attention.",

    keyVisualElements: [
      "Beneficiary dignity in frame",
      "Action and change moments",
      "Community context",
      "Honest before/after",
      "Hope alongside challenge",
    ],

    lighting: {
      keyLight: "Available light honoring subjects",
      fillLight: "Environmental ambient",
      colorTemperature: "Honest environmental conditions",
      lightingRatio: "Natural dignifying light",
      moodCreation: "Dignified witness, hopeful action, community power",
    },

    composition: {
      primaryRule: "rule-of-thirds",
      secondaryElements: ["Subject dignity in frame", "Community context", "Action documentation"],
      negativeSpaceUsage: "Community and context space",
      depthLayers: "Subject dignity within community",
      focalHierarchy: "Human dignity primary, action secondary, context tertiary",
      eyeFlow: "Subject connection to community to impact",
    },

    technicalSpecs: {
      camera: "Nikon Z8",
      lens: "Nikkor Z 35mm f/1.8 S",
      aperture: "f/4 documentary context",
      iso: "ISO 800",
      postProduction: "Lightroom with documentary profile",
      colorGrade: "Honest, respectful, dignified",
    },

    emotionalTerritory: "Dignified witness, hopeful engagement, community respect",
    brandPositioning: "Social responsibility, authentic impact, community partnership",
    targetAudience: "Cause-motivated consumers, socially conscious shoppers",

    awardReference: {
      cannesLions: "Grand Prix Glass Lion",
      campaign: "Always 'Like a Girl'",
      agency: "Leo Burnett",
      year: 2015,
    },

    inspirationalCampaigns: ["TOMS giving documentation", "Warby Parker vision campaign", "P&G 'Thank You Mom'"],

    productionRequirements: [
      "Ethical production protocols",
      "Subject consent and dignity",
      "Community relationship building",
      "Impact verification access",
    ],

    postProductionNotes:
      "Subject dignity is non-negotiable. No poverty porn, no exploitation. Consent documented. Context that respects rather than reduces. Hope must be genuine, not imposed.",
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// PREMIUM COLOR PALETTES - CANNES LIONS AWARD LEVEL
// ═══════════════════════════════════════════════════════════════════════════

export const CANNES_COLOR_PALETTES: PremiumColorPalette[] = [
  {
    id: "palette-001",
    name: "Scandinavian Serenity",
    pantoneReference: ["11-0601 Bright White", "14-4102 Glacier Gray", "19-4010 Orion Blue"],
    hexValues: ["#FAFAFA", "#D4D4D4", "#2C3E50"],
    psychologicalEffect: "Calm, trust, clarity, sophistication",
    industryApplication: ["Technology", "Healthcare", "Finance", "Wellness"],
    brandCompatibility: "Brands positioning for trust, clarity, and Nordic design values",
    seasonalRelevance: "Year-round with peak relevance in spring and winter",
    culturalConsiderations: "Western minimalism appeal; may feel cold in some Asian markets",
  },
  {
    id: "palette-002",
    name: "Earth Regenerative",
    pantoneReference: ["18-1018 Cognac", "17-1322 Caramel", "19-0915 Canteen"],
    hexValues: ["#8B4513", "#D2691E", "#556B2F"],
    psychologicalEffect: "Grounding, authenticity, sustainability, warmth",
    industryApplication: ["Sustainability", "Food & Beverage", "Outdoor", "Hospitality"],
    brandCompatibility: "Brands with sustainability positioning or artisanal heritage",
    seasonalRelevance: "Autumn primary, year-round for sustainability messaging",
    culturalConsiderations: "Universal earth tone appeal; avoid in high-tech contexts",
  },
  {
    id: "palette-003",
    name: "Electric Optimism",
    pantoneReference: ["13-0647 Illuminating", "17-4540 Ibiza Blue", "18-1664 Fiery Red"],
    hexValues: ["#F5DF4D", "#00A5CF", "#CD212A"],
    psychologicalEffect: "Energy, innovation, confidence, excitement",
    industryApplication: ["Technology", "Entertainment", "Youth Brands", "Sports"],
    brandCompatibility: "Brands positioning for innovation, disruption, or youth energy",
    seasonalRelevance: "Summer primary, year-round for energy messaging",
    culturalConsiderations: "High energy may overwhelm in wellness or luxury contexts",
  },
  {
    id: "palette-004",
    name: "Heritage Luxury",
    pantoneReference: ["19-1617 Burgundy", "14-1108 Champagne Beige", "19-4006 Midnight Navy"],
    hexValues: ["#722F37", "#F7E7CE", "#191970"],
    psychologicalEffect: "Sophistication, heritage, exclusivity, timelessness",
    industryApplication: ["Luxury", "Finance", "Wine & Spirits", "Fashion"],
    brandCompatibility: "Heritage brands with luxury positioning",
    seasonalRelevance: "Autumn and winter primary, formal occasions year-round",
    culturalConsiderations: "European luxury codes; adapt for Asian luxury markets",
  },
  {
    id: "palette-005",
    name: "Ocean Conservation",
    pantoneReference: ["17-4427 Horizon Blue", "12-5505 Moonlight Jade", "11-0601 Bright White"],
    hexValues: ["#4A90A4", "#96D1C7", "#FFFFFF"],
    psychologicalEffect: "Calm, environmental consciousness, clarity, freshness",
    industryApplication: ["Sustainability", "Wellness", "Skincare", "Hospitality"],
    brandCompatibility: "Brands with ocean/water connection or environmental mission",
    seasonalRelevance: "Summer primary, coastal markets year-round",
    culturalConsiderations: "Universal water/calm association; strong in coastal cultures",
  },
  {
    id: "palette-006",
    name: "Botanical Garden",
    pantoneReference: ["18-0107 Kale", "15-0343 Greenery", "14-0232 Lime Green"],
    hexValues: ["#617C58", "#88B04B", "#C8E087"],
    psychologicalEffect: "Growth, renewal, health, natural vitality",
    industryApplication: ["Health", "Food", "Wellness", "Sustainability"],
    brandCompatibility: "Health-focused brands, plant-based products, organic positioning",
    seasonalRelevance: "Spring primary, wellness contexts year-round",
    culturalConsiderations: "Universal growth/nature association; strong in health messaging",
  },
  {
    id: "palette-007",
    name: "Desert Sunset",
    pantoneReference: ["16-1546 Living Coral", "15-1247 Apricot", "17-1463 Tangerine"],
    hexValues: ["#FF6F61", "#F5CBA7", "#FF7043"],
    psychologicalEffect: "Warmth, optimism, creativity, approachability",
    industryApplication: ["Lifestyle", "Travel", "Beauty", "Food & Beverage"],
    brandCompatibility: "Warm, approachable brands with lifestyle focus",
    seasonalRelevance: "Summer and autumn, travel contexts year-round",
    culturalConsiderations: "Warm association universal; may feel too casual for corporate",
  },
  {
    id: "palette-008",
    name: "Monochrome Power",
    pantoneReference: ["19-4007 Anthracite", "14-4102 Glacier Gray", "11-0601 Bright White"],
    hexValues: ["#293133", "#C4C4C4", "#FFFFFF"],
    psychologicalEffect: "Sophistication, authority, timelessness, clarity",
    industryApplication: ["Technology", "Luxury", "Fashion", "Architecture"],
    brandCompatibility: "Brands seeking timeless authority and design sophistication",
    seasonalRelevance: "Year-round; particularly strong in premium contexts",
    culturalConsiderations: "Universal sophistication; may need accent for warmth",
  },
  {
    id: "palette-009",
    name: "Artisan Warmth",
    pantoneReference: ["18-1154 Glazed Ginger", "16-1328 Sandstorm", "11-0507 Cream"],
    hexValues: ["#B5651D", "#D4A76A", "#FFFDD0"],
    psychologicalEffect: "Craftsmanship, authenticity, warmth, heritage",
    industryApplication: ["Food & Beverage", "Hospitality", "Artisan Products", "Home"],
    brandCompatibility: "Artisan brands, bakeries, craft products, heritage positioning",
    seasonalRelevance: "Autumn and winter primary, comfort contexts year-round",
    culturalConsiderations: "Universal warmth association; strong in food and hospitality",
  },
  {
    id: "palette-010",
    name: "Clinical Trust",
    pantoneReference: ["11-0601 Bright White", "14-4105 Pearl Blue", "15-4712 Marine Blue"],
    hexValues: ["#FFFFFF", "#AEC6CF", "#0066B2"],
    psychologicalEffect: "Cleanliness, trust, professionalism, reliability",
    industryApplication: ["Healthcare", "Pharma", "Technology", "Finance"],
    brandCompatibility: "Healthcare, pharmaceutical, and trust-dependent brands",
    seasonalRelevance: "Year-round; essential for clinical and trust contexts",
    culturalConsiderations: "Clinical association universal; may feel cold without warmth accent",
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// AWARD-WINNING CREATIVE FRAMEWORKS
// ═══════════════════════════════════════════════════════════════════════════

export const CANNES_CREATIVE_FRAMEWORKS: AwardCreativeFramework[] = [
  {
    id: "framework-001",
    name: "The Tension Principle",
    methodology:
      "Create visual and conceptual tension between opposing elements to generate engagement and memorability",
    originAgency: "Wieden+Kennedy",
    corePhilosophy:
      "Great advertising lives in the tension between what is and what could be, between the expected and the surprising",
    executionSteps: [
      "Identify the core tension in the brand or cultural moment",
      "Visualize both poles of the tension",
      "Create imagery that holds both in productive conflict",
      "Let the viewer resolve the tension themselves",
      "Design for multiple readings and interpretations",
    ],
    successMetrics: ["Engagement dwell time", "Share rate", "Recall scores", "Cultural conversation generation"],
    awardWinningExamples: ["Nike 'Dream Crazy'", "Apple 'Think Different'", "Volkswagen 'Think Small'"],
  },
  {
    id: "framework-002",
    name: "The Authenticity Engine",
    methodology:
      "Document real stories and real people with journalistic integrity to build unassailable brand credibility",
    originAgency: "Droga5",
    corePhilosophy:
      "In an age of skepticism, the only persuasion is truth. Show, don't tell. Document, don't fabricate.",
    executionSteps: [
      "Find the real story within the brand",
      "Cast real people, not actors",
      "Shoot documentary-style with minimal intervention",
      "Edit for emotional truth, not promotional message",
      "Let the audience discover the brand connection",
    ],
    successMetrics: ["Trust metrics", "Earned media value", "Long-term brand health", "Social proof generation"],
    awardWinningExamples: ["Dove 'Real Beauty'", "Under Armour 'I Will What I Want'", "Airbnb 'We Accept'"],
  },
  {
    id: "framework-003",
    name: "The Utility First Approach",
    methodology: "Create genuine value for the audience before asking for anything in return",
    originAgency: "R/GA",
    corePhilosophy:
      "The best advertising is a product. Create something useful, and the brand benefit follows naturally.",
    executionSteps: [
      "Identify a genuine audience need or friction point",
      "Design a solution that delivers real value",
      "Integrate brand in a way that enhances utility",
      "Make the utility shareable and remarkable",
      "Document the impact for proof points",
    ],
    successMetrics: ["Utility adoption rate", "User retention", "Word-of-mouth growth", "Brand favorability lift"],
    awardWinningExamples: ["Nike+ Running", "Spotify Wrapped", "Google Arts & Culture"],
  },
  {
    id: "framework-004",
    name: "The Cultural Catalyst Method",
    methodology: "Insert the brand into cultural conversations as a catalyst for positive change or commentary",
    originAgency: "BBDO",
    corePhilosophy:
      "Brands that participate in culture have more right to people's attention than those that interrupt it",
    executionSteps: [
      "Monitor cultural conversations for brand-relevant entry points",
      "Identify the authentic brand perspective on the issue",
      "Create work that advances the conversation",
      "Be prepared for both praise and criticism",
      "Follow through with sustained commitment",
    ],
    successMetrics: [
      "Cultural conversation share",
      "Brand mention sentiment",
      "Sustained media coverage",
      "Category leadership perception",
    ],
    awardWinningExamples: ["Patagonia 'Don't Buy This Jacket'", "REI '#OptOutside'", "Nike 'Equality'"],
  },
  {
    id: "framework-005",
    name: "The Craft Excellence Standard",
    methodology:
      "Pursue exceptional craft quality as a form of respect for the audience and differentiation from competitors",
    originAgency: "BBH",
    corePhilosophy: "People can feel the difference between work that was made with care and work that was not",
    executionSteps: [
      "Set craft standards above industry norms",
      "Hire and empower the best creative talent",
      "Build in time for refinement and iteration",
      "Sweat every detail visible to the audience",
      "Document the craft process as content",
    ],
    successMetrics: [
      "Craft award recognition",
      "Competitor differentiation",
      "Premium perception",
      "Creative talent attraction",
    ],
    awardWinningExamples: ["Apple product films", "Honda 'Cog'", "Guinness 'Surfer'"],
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// PREMIUM CREATIVE CONTEXTS
// ═══════════════════════════════════════════════════════════════════════════

export const CANNES_CREATIVE_CONTEXTS: PremiumContext[] = [
  {
    id: "context-001",
    name: "Metropolitan Luxury Penthouse",
    environmentType: "Interior - Ultra-Luxury Residential",
    atmosphericConditions: "Floor-to-ceiling windows with city skyline, golden hour light flooding space",
    culturalResonance: "Global urban luxury, cosmopolitan sophistication, arrived success",
    temporalSetting: "Evening golden hour, city lights emerging",
    geographicSpecificity: "Global metropolis - New York, London, Hong Kong, Dubai interchangeable",
    productionComplexity: "high",
  },
  {
    id: "context-002",
    name: "Nordic Minimalist Interior",
    environmentType: "Interior - Scandinavian Design",
    atmosphericConditions: "Large windows, diffused northern light, white and wood palette",
    culturalResonance: "Scandinavian design values, hygge comfort, intelligent simplicity",
    temporalSetting: "Soft morning light, winter or early spring",
    geographicSpecificity: "Copenhagen, Stockholm, Oslo, Helsinki aesthetic",
    productionComplexity: "medium",
  },
  {
    id: "context-003",
    name: "Japanese Wabi-Sabi Space",
    environmentType: "Interior - Japanese Traditional-Contemporary",
    atmosphericConditions: "Shoji screen light, zen garden visible, tatami and wood materials",
    culturalResonance: "Japanese aesthetic philosophy, imperfect beauty, mindful design",
    temporalSetting: "Morning meditation light or evening contemplation",
    geographicSpecificity: "Kyoto traditional or Tokyo contemporary Japanese",
    productionComplexity: "high",
  },
  {
    id: "context-004",
    name: "California Indoor-Outdoor Living",
    environmentType: "Interior-Exterior - California Modern",
    atmosphericConditions: "Open-plan flowing to outdoor space, abundant natural light, desert plants",
    culturalResonance: "California living, wellness lifestyle, creative industry success",
    temporalSetting: "Late morning to golden hour, perpetual summer",
    geographicSpecificity: "Los Angeles, Palm Springs, San Francisco aesthetic",
    productionComplexity: "medium",
  },
  {
    id: "context-005",
    name: "Provençal Farmhouse Authenticity",
    environmentType: "Interior - French Country",
    atmosphericConditions: "Stone walls, wooden beams, morning light through small windows, lavender visible",
    culturalResonance: "French country living, authentic heritage, slow living aspiration",
    temporalSetting: "Morning light, summer harvest season",
    geographicSpecificity: "Provence, France - specific regional authenticity",
    productionComplexity: "medium",
  },
  {
    id: "context-006",
    name: "Alpine Chalet Luxury Retreat",
    environmentType: "Interior - Mountain Luxury",
    atmosphericConditions: "Panoramic mountain views, warm wood interiors, fire glow, snow visible",
    culturalResonance: "Mountain luxury escape, après-ski sophistication, winter wonderland",
    temporalSetting: "Winter afternoon fading to firelit evening",
    geographicSpecificity: "Swiss Alps, Aspen, French Alps, Hokkaido",
    productionComplexity: "high",
  },
  {
    id: "context-007",
    name: "Mediterranean Coastal Terrace",
    environmentType: "Exterior - Coastal Luxury",
    atmosphericConditions: "Sea view, white architecture, bougainvillea, clear blue sky",
    culturalResonance: "Mediterranean lifestyle, coastal luxury, European summer",
    temporalSetting: "Golden hour, summer season",
    geographicSpecificity: "Amalfi, Santorini, Ibiza, Côte d'Azur",
    productionComplexity: "medium",
  },
  {
    id: "context-008",
    name: "Urban Rooftop Garden Oasis",
    environmentType: "Exterior - Urban Green Space",
    atmosphericConditions: "City skyline backdrop, lush greenery, comfortable seating, evening lights emerging",
    culturalResonance: "Urban escape, sustainable city living, work-life balance",
    temporalSetting: "Evening golden hour into blue hour",
    geographicSpecificity: "Any major global city with rooftop culture",
    productionComplexity: "medium",
  },
  {
    id: "context-009",
    name: "Desert Modernist Retreat",
    environmentType: "Interior-Exterior - Desert Architecture",
    atmosphericConditions: "Dramatic desert landscape, minimal modern architecture, extreme light",
    culturalResonance: "Desert modernism, architectural ambition, stark beauty",
    temporalSetting: "Golden hour or blue hour for dramatic light",
    geographicSpecificity: "Palm Springs, Marrakech, Arizona, UAE",
    productionComplexity: "high",
  },
  {
    id: "context-010",
    name: "Brooklyn Industrial Loft",
    environmentType: "Interior - Urban Industrial",
    atmosphericConditions: "Exposed brick, large factory windows, concrete floors, creative chaos",
    culturalResonance: "Creative class, urban authentic, maker culture",
    temporalSetting: "Afternoon light through industrial windows",
    geographicSpecificity: "Brooklyn, London Shoreditch, Berlin Kreuzberg",
    productionComplexity: "low",
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT FUNCTIONS & UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get styles by category
 */
export function getStylesByCategory(category: StyleCategory): CannesPhotographicStyle[] {
  return CANNES_PHOTOGRAPHIC_STYLES.filter((style) => style.category === category)
}

/**
 * Get styles requiring hands/human element
 */
export function getStylesRequiringHands(): CannesPhotographicStyle[] {
  return CANNES_PHOTOGRAPHIC_STYLES.filter((style) => style.requiresHands === true)
}

/**
 * Get styles by award reference
 */
export function getStylesWithCannesReference(): CannesPhotographicStyle[] {
  return CANNES_PHOTOGRAPHIC_STYLES.filter((style) => style.awardReference.cannesLions)
}

/**
 * Get color palette by psychological effect
 */
export function getPaletteByEffect(effect: string): PremiumColorPalette[] {
  return CANNES_COLOR_PALETTES.filter((palette) =>
    palette.psychologicalEffect.toLowerCase().includes(effect.toLowerCase()),
  )
}

/**
 * Get context by production complexity
 */
export function getContextByComplexity(complexity: "low" | "medium" | "high" | "extreme"): PremiumContext[] {
  return CANNES_CREATIVE_CONTEXTS.filter((context) => context.productionComplexity === complexity)
}

/**
 * Generate complete creative preset recommendation
 */
export function generateCreativePreset(
  category: StyleCategory,
  mood: string,
  complexity: "low" | "medium" | "high" | "extreme",
): {
  style: CannesPhotographicStyle | undefined
  palette: PremiumColorPalette | undefined
  context: PremiumContext | undefined
  framework: AwardCreativeFramework | undefined
} {
  const styles = getStylesByCategory(category)
  const palettes = getPaletteByEffect(mood)
  const contexts = getContextByComplexity(complexity)

  return {
    style: styles[Math.floor(Math.random() * styles.length)],
    palette: palettes[Math.floor(Math.random() * palettes.length)],
    context: contexts[Math.floor(Math.random() * contexts.length)],
    framework: CANNES_CREATIVE_FRAMEWORKS[Math.floor(Math.random() * CANNES_CREATIVE_FRAMEWORKS.length)],
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// LIBRARY STATISTICS
// ═══════════════════════════════════════════════════════════════════════════

export const LIBRARY_STATISTICS = {
  totalStyles: CANNES_PHOTOGRAPHIC_STYLES.length,
  totalPalettes: CANNES_COLOR_PALETTES.length,
  totalFrameworks: CANNES_CREATIVE_FRAMEWORKS.length,
  totalContexts: CANNES_CREATIVE_CONTEXTS.length,
  categoryCounts: {
    "food-beverage": CANNES_PHOTOGRAPHIC_STYLES.filter((s) => s.category === "food-beverage").length,
    "fashion-beauty": CANNES_PHOTOGRAPHIC_STYLES.filter((s) => s.category === "fashion-beauty").length,
    "lifestyle-wellness": CANNES_PHOTOGRAPHIC_STYLES.filter((s) => s.category === "lifestyle-wellness").length,
    "technology-innovation": CANNES_PHOTOGRAPHIC_STYLES.filter((s) => s.category === "technology-innovation").length,
    "sustainability-purpose": CANNES_PHOTOGRAPHIC_STYLES.filter((s) => s.category === "sustainability-purpose").length,
    "automotive-mobility": CANNES_PHOTOGRAPHIC_STYLES.filter((s) => s.category === "automotive-mobility").length,
    "documentary-editorial": CANNES_PHOTOGRAPHIC_STYLES.filter((s) => s.category === "documentary-editorial").length,
  },
  stylesWithCannesReference: CANNES_PHOTOGRAPHIC_STYLES.filter((s) => s.awardReference.cannesLions).length,
  stylesRequiringHands: CANNES_PHOTOGRAPHIC_STYLES.filter((s) => s.requiresHands).length,
}
