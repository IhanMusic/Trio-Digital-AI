/**
 * Cannes Lions Image Prompt Optimizer
 * 
 * Service professionnel de transformation de vision créative en prompts Gemini ultra-optimisés
 * Inspiré des workflows des meilleurs studios photo publicitaires
 * 
 * Standards:
 * - Annie Leibovitz studio methodology
 * - Ogilvy creative excellence
 * - Cannes Lions quality criteria
 */

import { logger } from '../config/logger';

export interface CreativeEssence {
  subjectDescription: string;
  involvesHumanInteraction: boolean;
  involvesHands: boolean;
  involvesFace: boolean;
  involvesProduct: boolean;
  involvesFood: boolean;
  preferredAspectRatio: '1:1' | '16:9' | '9:16';
  mood: string;
  style: string;
  sector: string;
}

export interface BrandColors {
  primary?: string;
  secondary?: string;
  accent?: string;
}

export interface OptimizedPrompt {
  mainPrompt: string;
  negativePrompt: string;
  generationParams: {
    numberOfImages: number;
    imageSize: '1K' | '2K';
    aspectRatio: '1:1' | '16:9' | '9:16';
    referenceImageStrength?: number;
  };
}

export interface CreativePreset {
  style: {
    name: string;
    reference: string;
    composition: string;
    lighting: string;
    requiresHands?: boolean;
    handsJustification?: string;
  };
  lighting: {
    name: string;
    timeOfDay: string;
    characteristics: string;
  };
  palette: {
    name: string;
    description: string;
  };
  context: {
    name: string;
    description: string;
  };
}

export class CannesLionsImageOptimizer {
  
  /**
   * Point d'entrée principal : transforme un prompt brut en prompt ultra-optimisé
   */
  static optimizeForGemini(
    rawPrompt: string,
    creativePreset: CreativePreset,
    brandColors?: BrandColors,
    hasProductReference: boolean = false,
    sector: string = 'general'
  ): OptimizedPrompt {
    
    logger.info('🎨 Optimisation du prompt pour Gemini (niveau Cannes Lions)');
    
    // 1. Extraire l'essence créative du prompt brut
    const essence = this.extractCreativeEssence(rawPrompt, sector);
    
    // 2. Construire le prompt hiérarchique optimisé
    const optimizedPrompt = this.buildHierarchicalPrompt(
      essence,
      creativePreset,
      brandColors,
      hasProductReference
    );
    
    // 3. Générer le negative prompt intelligent
    const negativePrompt = this.generateIntelligentNegativePrompt(essence);
    
    // 4. Calculer les paramètres optimaux
    const generationParams = this.calculateOptimalParams(essence, hasProductReference);
    
    logger.info('✅ Prompt optimisé généré avec succès');
    
    return {
      mainPrompt: optimizedPrompt,
      negativePrompt,
      generationParams
    };
  }
  
  /**
   * Extrait l'essence créative du prompt brut
   */
  private static extractCreativeEssence(rawPrompt: string, sector: string): CreativeEssence {
    const lowerPrompt = rawPrompt.toLowerCase();
    
    return {
      subjectDescription: this.extractSubjectDescription(rawPrompt),
      involvesHumanInteraction: this.detectsHumanInteraction(lowerPrompt),
      involvesHands: this.detectsHands(lowerPrompt),
      involvesFace: this.detectsFace(lowerPrompt),
      involvesProduct: this.detectsProduct(lowerPrompt),
      involvesFood: this.detectsFood(lowerPrompt, sector),
      preferredAspectRatio: this.detectAspectRatio(lowerPrompt),
      mood: this.extractMood(rawPrompt),
      style: this.extractStyle(rawPrompt),
      sector
    };
  }
  
  /**
   * Construit le prompt hiérarchique optimisé
   */
  private static buildHierarchicalPrompt(
    essence: CreativeEssence,
    preset: CreativePreset,
    brandColors?: BrandColors,
    hasProductRef: boolean = false
  ): string {
    
    const sections: string[] = [];
    
    // SECTION 1: STYLE & COMPOSITION (40% priorité)
    sections.push(this.generateCompositionBlock(essence, preset));
    
    // SECTION 2: SUJET & ANATOMIE (30% priorité) - LE PLUS CRITIQUE
    sections.push(this.generateSubjectBlock(essence, hasProductRef, preset));
    
    // SECTION 3: ÉCLAIRAGE & ATMOSPHÈRE (20% priorité)
    sections.push(this.generateLightingBlock(essence, preset));
    
    // SECTION 4: COULEURS & BRAND (10% priorité)
    if (brandColors?.primary) {
      sections.push(this.generateColorBlock(brandColors, preset));
    }
    
    // SECTION 5: SPÉCIFICATIONS TECHNIQUES
    sections.push(this.generateTechnicalBlock(essence, preset));
    
    return sections.join('\n\n');
  }
  
  /**
   * Génère le bloc de composition photographique
   */
  private static generateCompositionBlock(essence: CreativeEssence, preset: CreativePreset): string {
    return `═══════════════════════════════════════════════════════════════
PRIORITY 1: COMPOSITION PHOTOGRAPHIQUE & STYLE REFERENCE
═══════════════════════════════════════════════════════════════

Shot in the style of ${preset.style.reference}

COMPOSITION RULES:
• Primary rule: ${preset.style.composition}
• Framing: ${this.determineFraming(essence)}
• Camera angle: ${this.determineAngle(essence)}
• Depth of field: ${this.determineDepthOfField(essence)}
• Negative space: Intentional and balanced, allowing the subject to breathe
• Visual flow: Leading lines guide the eye to focal points naturally

SETTING & CONTEXT:
• Environment: ${preset.context.description}
• Atmosphere: ${essence.mood}
• Context integration: Subject naturally integrated in environment
• Background: ${this.determineBackground(essence)}`;
  }
  
  /**
   * Génère le bloc sujet avec contraintes anatomiques ULTRA-PRÉCISES
   */
  private static generateSubjectBlock(
    essence: CreativeEssence, 
    hasProductRef: boolean,
    preset: CreativePreset
  ): string {
    let block = `═══════════════════════════════════════════════════════════════
PRIORITY 2: SUBJECT & ANATOMICAL ACCURACY (CRITICAL)
═══════════════════════════════════════════════════════════════

Subject: ${essence.subjectDescription}`;

    // CONTRAINTES ANATOMIQUES MAINS - UNIQUEMENT SI JUSTIFIÉ PAR LE PRESET
    const shouldIncludeHands = preset.style.requiresHands === true;
    
    if (shouldIncludeHands && preset.style.handsJustification) {
      block += `

HANDS INTERACTION JUSTIFIED:
Justification: ${preset.style.handsJustification}
`;
    }
    
    if (shouldIncludeHands) {
      block += `

⚠️  CRITICAL: HAND ANATOMY SPECIFICATIONS (NON-NEGOTIABLE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ANATOMICAL REQUIREMENTS (Medical Illustration Standards):
• Exactly 5 fingers per hand, clearly separated and distinct
• Thumb: 2 phalanges (proximal + distal), positioned opposably
• Other 4 fingers: 3 phalanges each (proximal + middle + distal)
• Proportions: Thumb 35% shorter than other digits
• Palm structure: Metacarpals forming natural arch
• Knuckles: Visible joints at natural angles

NATURAL GRIP MECHANICS:
• C-grip formation: Thumb and index finger create natural C-shape
• Remaining 3 fingers: Naturally curved following object contour
• No perfectly straight fingers (anatomically impossible at rest)
• Pressure points: Slight skin compression where fingers contact object
• Weight distribution: Hand slightly tilted by object's gravity

SKIN & TEXTURE DETAILS:
• Realistic skin texture: Subtle pores, natural wrinkles at joints
• Veins: Slightly visible on back of hand
• Nails: Natural shape with visible cuticles, no artificial polish
• Color variation: Slight redness at knuckles and fingertips
• Highlights: Subtle shine on knuckles and nail beds

LIGHTING ON HANDS:
• Highlights: On knuckle peaks and nail surfaces
• Shadows: Soft shadows between fingers
• Translucency: If backlit, subtle glow through fingertips
• Form definition: Light reveals 3D hand structure

INTERACTION PHYSICS:
• Contact points: Realistic where skin meets product
• Grip authenticity: Each finger has purpose in the hold
• Balance: Hand positioned to naturally support object weight
• Gesture: Intentional and purposeful, not random or awkward

REFERENCE STANDARDS:
• Medical: Gray's Anatomy hand illustration precision
• Artistic: Albrecht Dürer "Praying Hands" detail level
• Commercial: L'Oréal hand model photography standards
• Photography: Annie Leibovitz hand portraiture excellence

ABSOLUTELY FORBIDDEN:
× More or less than 5 fingers
× Fused or merged digits
× Impossible joint angles
× Floating disconnected hands
× Disproportionate hand-to-object sizing
× Claw-like tension (unnatural)
× Perfect symmetry (not realistic)
× Extra or missing thumb
× Webbed fingers or mutations`;
    }

    // INTÉGRATION PRODUIT (si référence fournie)
    if (hasProductRef) {
      block += `

PRODUCT INTEGRATION (Maximum Fidelity Required):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reference Image Provided: YES
Required Fidelity Level: 95%+ 

📐 PROPORTIONS CRITIQUES (NON-NÉGOCIABLE):
• EXACT same proportions as reference image - NO stretching, squashing, or distortion
• Product scale must be realistic and consistent with environment
• Aspect ratio of packaging MUST be preserved exactly
• Height-to-width ratio identical to reference
• No elongation, compression, or warping of any kind

PRESERVATION CRITICAL:
• Packaging: ALL visual elements identical to reference
• Logos: Exact position, size, colors, and design
• Text: Fonts, sizes, colors precisely matched
• Materials: Glass/plastic/cardboard/metal rendered accurately
• Reflections: Appropriate to material (glossy vs matte)
• Labels: Every detail preserved, readable, sharp
• Colors: Exact brand colors maintained
• Shape: No distortion or deformation - EXACT original shape preserved

PRODUCT POSITIONING:
• Visual occupation: 30-40% of frame maximum
• Focus: ABSOLUTE sharpness on product
• Angle: Most flattering for packaging visibility
• Integration: Natural within lifestyle context, not staged
• Lighting: Flattering but realistic for material type

DETAILS ENHANCEMENT:
• Condensation: If cold product, realistic water droplets with proper physics
• Reflections: Environment reflected appropriately in packaging
• Texture: Material texture accurately rendered (glass clarity, label texture)
• No distortion: Product maintains correct proportions and perspective`;
    }

    return block;
  }
  
  /**
   * Génère le bloc d'éclairage professionnel
   */
  private static generateLightingBlock(essence: CreativeEssence, preset: CreativePreset): string {
    return `═══════════════════════════════════════════════════════════════
PRIORITY 3: PROFESSIONAL LIGHTING SETUP
═══════════════════════════════════════════════════════════════

LIGHTING CONFIGURATION: ${preset.lighting.name}
Time of Day: ${preset.lighting.timeOfDay}
Characteristics: ${preset.lighting.characteristics}

DETAILED LIGHTING PLOT:

Key Light:
• Type: ${this.determineKeyLightType(essence)}
• Position: ${this.determineKeyLightPosition(essence)}
• Quality: ${this.determineLightQuality(essence)}
• Color Temperature: ${this.determineColorTemp(preset)}K

Fill Light:
• Purpose: Shadow control and detail preservation
• Intensity: Softer than key light, preventing harsh shadows
• Position: Opposite to key light for balance

Rim/Separation Light (if applicable):
• Purpose: Subject-background separation and depth
• Position: Behind and above subject
• Intensity: Subtle, creating gentle edge highlight

ATMOSPHERIC LIGHTING:
• Overall mood: ${preset.lighting.characteristics}
• Contrast level: ${this.determineContrast(essence)}
• Shadow quality: ${this.determineShadowQuality(essence)}
• Highlight treatment: Natural, not overblown
• Ambient light: ${this.determineAmbientLight(essence)}`;
  }
  
  /**
   * Génère le bloc de couleurs et intégration de marque
   */
  private static generateColorBlock(brandColors: BrandColors, preset: CreativePreset): string {
    return `═══════════════════════════════════════════════════════════════
BRAND COLOR INTEGRATION
═══════════════════════════════════════════════════════════════

BRAND COLORS (Must Be Dominant):
• Primary Brand Color: ${brandColors.primary}
  → This color MUST be prominently visible in the image
  → Should occupy 40-60% of the color composition
${brandColors.secondary ? `• Secondary Brand Color: ${brandColors.secondary}
  → Supporting color for harmony and balance
  → Should occupy 20-30% of the color composition` : ''}
${brandColors.accent ? `• Accent Brand Color: ${brandColors.accent}
  → Accent points for visual interest
  → Should occupy 10-20% as highlight points` : ''}

COLOR PALETTE STRATEGY: ${preset.palette.name}
Description: ${preset.palette.description}

APPLICATION:
• Environment colors: Harmonize with brand colors
• Product colors: Exact brand color fidelity
• Background: Complementary tones supporting brand palette
• Lighting color cast: Warm/cool to enhance brand colors
• Overall color grading: Professional, saturated but natural`;
  }
  
  /**
   * Génère le bloc de spécifications techniques
   */
  private static generateTechnicalBlock(essence: CreativeEssence, preset: CreativePreset): string {
    return `═══════════════════════════════════════════════════════════════
TECHNICAL SPECIFICATIONS
═══════════════════════════════════════════════════════════════

CAMERA & LENS:
• Camera: Professional DSLR (Canon EOS R5 / Sony A7RIII equivalent)
• Lens: ${this.determineLens(essence)}
• Aperture: ${this.determineAperture(essence)}
• ISO: ${this.determineISO(essence)}
• Focus: ${this.determineFocusPoint(essence)}

FORMAT & QUALITY:
• Aspect Ratio: ${essence.preferredAspectRatio}
• Resolution: 8K quality, professional commercial standard
• File quality: Maximum detail preservation
• Color space: Wide gamut for rich colors
• Dynamic range: High, preserving highlights and shadows

POST-PROCESSING STYLE:
• Color grading: Professional commercial photography
• Contrast: Balanced, not over-processed
• Sharpness: Optimal, no over-sharpening artifacts
• Noise: Minimal to none
• Vignetting: Natural if any, not artificial

STYLE REQUIREMENTS:
• Overall aesthetic: ${preset.style.name}
• Realism level: Photographic, not CGI or illustration
• Commercial quality: Broadcast and print-ready
• Professional finish: Could be featured in major campaigns
• Authenticity: Real photography look, avoiding AI artifacts`;
  }
  
  /**
   * Génère un negative prompt intelligent
   */
  private static generateIntelligentNegativePrompt(essence: CreativeEssence): string {
    const negatives: string[] = [
      // 🚫 TEXTE ET TYPOGRAPHIE (CRITIQUE - PRIORITÉ ABSOLUE)
      "text", "letters", "words", "typography", "font", "writing", "caption",
      "title", "subtitle", "headline", "slogan", "tagline", "label text",
      "written text", "printed text", "handwritten text", "text overlay",
      "any text", "readable text", "visible text", "text elements",
      "numbers", "digits", "characters", "alphabet", "logo text",
      "brand name text", "product name text", "watermark text",
      
      // Anatomie critique
      "extra fingers", "less than 5 fingers", "6 fingers", "7 fingers", "4 fingers",
      "fused fingers", "merged digits", "webbed hands", "deformed hands",
      "mutant hands", "poorly drawn hands", "malformed hands",
      "missing fingers", "floating hands", "disconnected hands",
      "impossible hand pose", "unnatural grip", "wrong hand anatomy",
      "extra limbs", "missing limbs", "deformed body",
      "anatomically incorrect", "distorted anatomy",
      
      // 📐 PROPORTIONS ET DISTORSION (CRITIQUE)
      "distorted proportions", "stretched product", "squashed product", "wrong scale",
      "disproportionate", "resized incorrectly", "elongated", "compressed",
      "warped packaging", "deformed product", "incorrect aspect ratio",
      "stretched packaging", "squashed packaging", "wrong proportions",
      
      // Qualité générale
      "low quality", "worst quality", "blurry", "out of focus", "soft focus (unwanted)",
      "pixelated", "grainy", "noisy", "jpeg artifacts", "compression artifacts",
      "distortion", "warped", "stretched", "squashed",
      "overexposed", "underexposed", "blown out highlights", "crushed blacks",
      "bad lighting", "flat lighting", "poor lighting", "unnatural lighting",
      
      // Artificialité
      "artificial", "fake", "CGI", "3D render", "rendered",
      "cartoon", "anime", "illustration", "drawing", "painting", "sketch",
      "unrealistic", "plastic skin", "wax figure", "mannequin",
      "computer generated", "digital art", "AI artifacts",
      
      // Composition
      "cluttered", "chaotic", "messy", "busy", "crowded",
      "bad composition", "poor framing", "awkward crop", "cut off",
      "unbalanced", "tilted horizon", "Dutch angle (unwanted)",
      
      // Technique
      "oversaturated", "undersaturated", "wrong white balance",
      "color banding", "posterization", "halation",
      "chromatic aberration", "lens flare (unwanted)", "light leak (unwanted)",
      "motion blur (unwanted)", "camera shake",
      
      // Éléments indésirables
      "watermark", "text overlay", "logo overlay", "signature",
      "copyright mark", "timestamp", "date stamp",
      "borders", "frames", "vignette (artificial)", "split screen",
      "duplicate", "multiple views", "collage", "grid layout"
    ];
    
    // Ajouter des negatives spécifiques au contexte
    if (essence.involvesFood) {
      negatives.push(
        "unappetizing", "rotten", "moldy", "burnt", "spoiled",
        "raw meat texture", "unnatural food colors", "processed look",
        "artificial food coloring", "plastic food"
      );
    }
    
    if (essence.involvesProduct) {
      negatives.push(
        "incorrect product", "wrong packaging", "distorted product",
        "blurry labels", "illegible text", "wrong branding",
        "generic product", "product deformation", "melting product",
        "incorrect colors", "faded colors", "wrong logo"
      );
    }
    
    if (essence.involvesFace) {
      negatives.push(
        "asymmetric face", "deformed face", "extra eyes", "missing nose",
        "wrong eye color", "cross-eyed", "lazy eye", "misaligned features",
        "plastic face", "uncanny valley", "dead eyes"
      );
    }
    
    return negatives.join(", ");
  }
  
  /**
   * Calcule les paramètres de génération optimaux
   */
  private static calculateOptimalParams(
    essence: CreativeEssence,
    hasProductRef: boolean
  ): OptimizedPrompt['generationParams'] {
    return {
      numberOfImages: 2, // Générer 2 variations comme demandé
      imageSize: '2K', // Maximum quality
      aspectRatio: essence.preferredAspectRatio,
      referenceImageStrength: hasProductRef ? 0.85 : undefined // FIDÉLITÉ MAXIMALE au produit uploadé
    };
  }
  
  // ==========================================
  // MÉTHODES UTILITAIRES D'EXTRACTION
  // ==========================================
  
  private static extractSubjectDescription(prompt: string): string {
    // Extraire la description du sujet principal
    const match = prompt.match(/subject[:\s]+([^.]+)/i);
    return match ? match[1].trim() : 'product in lifestyle context';
  }
  
  private static detectsHumanInteraction(prompt: string): boolean {
    const keywords = ['hand', 'person', 'people', 'human', 'holding', 'grip', 'touch', 'finger'];
    return keywords.some(kw => prompt.includes(kw));
  }
  
  private static detectsHands(prompt: string): boolean {
    const keywords = ['hand', 'hands', 'holding', 'grip', 'finger', 'palm', 'grasp'];
    return keywords.some(kw => prompt.includes(kw));
  }
  
  private static detectsFace(prompt: string): boolean {
    const keywords = ['face', 'facial', 'portrait', 'headshot', 'eye', 'smile'];
    return keywords.some(kw => prompt.includes(kw));
  }
  
  private static detectsProduct(prompt: string): boolean {
    const keywords = ['product', 'bottle', 'package', 'container', 'jar', 'box', 'packaging'];
    return keywords.some(kw => prompt.includes(kw));
  }
  
  private static detectsFood(prompt: string, sector: string): boolean {
    const foodKeywords = ['food', 'meal', 'dish', 'cuisine', 'cooking', 'ingredient'];
    return foodKeywords.some(kw => prompt.includes(kw)) || 
           sector.toLowerCase().includes('food') ||
           sector.toLowerCase().includes('restaurant');
  }
  
  private static detectAspectRatio(prompt: string): '1:1' | '16:9' | '9:16' {
    if (prompt.includes('16:9') || prompt.includes('landscape')) return '16:9';
    if (prompt.includes('9:16') || prompt.includes('vertical') || prompt.includes('story')) return '9:16';
    return '1:1'; // Default square for Instagram
  }
  
  private static extractMood(prompt: string): string {
    const moodMatch = prompt.match(/mood[:\s]+([^.,]+)/i);
    return moodMatch ? moodMatch[1].trim() : 'professional and aspirational';
  }
  
  private static extractStyle(prompt: string): string {
    const styleMatch = prompt.match(/style[:\s]+([^.,]+)/i);
    return styleMatch ? styleMatch[1].trim() : 'professional commercial photography';
  }
  
  // ==========================================
  // MÉTHODES DE DÉTERMINATION DES PARAMÈTRES
  // ==========================================
  
  private static determineFraming(essence: CreativeEssence): string {
    if (essence.involvesHands && essence.involvesProduct) {
      return 'Medium close-up showing product and hand interaction clearly';
    }
    if (essence.involvesProduct) {
      return 'Product-focused with contextual environment';
    }
    return 'Balanced framing with subject and environment';
  }
  
  private static determineAngle(essence: CreativeEssence): string {
    if (essence.involvesFood) {
      return '45-degree overhead angle (flattering for food)';
    }
    if (essence.involvesProduct) {
      return 'Eye-level or slightly above (product hero angle)';
    }
    return 'Natural eye-level perspective';
  }
  
  private static determineDepthOfField(essence: CreativeEssence): string {
    if (essence.involvesProduct) {
      return 'Shallow (f/2.8-f/4) - sharp subject, soft background bokeh';
    }
    return 'Moderate (f/4-f/5.6) - subject sharp, background softly blurred';
  }
  
  private static determineBackground(essence: CreativeEssence): string {
    return 'Soft bokeh or intentionally blurred, not distracting, complementary colors';
  }
  
  private static determineKeyLightType(essence: CreativeEssence): string {
    if (essence.involvesFood) {
      return 'Soft natural window light or large softbox';
    }
    return 'Studio strobe with large octabox or softbox';
  }
  
  private static determineKeyLightPosition(essence: CreativeEssence): string {
    return '45 degrees above and to the side (Rembrandt lighting)';
  }
  
  private static determineLightQuality(essence: CreativeEssence): string {
    return 'Soft and diffused, creating gentle shadows';
  }
  
  private static determineColorTemp(preset: CreativePreset): number {
    const timeOfDay = preset.lighting.timeOfDay.toLowerCase();
    if (timeOfDay.includes('golden hour') || timeOfDay.includes('sunset')) {
      return 3500; // Warm golden
    }
    if (timeOfDay.includes('blue hour') || timeOfDay.includes('twilight')) {
      return 6500; // Cool blue
    }
    return 5200; // Neutral daylight
  }
  
  private static determineContrast(essence: CreativeEssence): string {
    if (essence.involvesProduct) {
      return 'Moderate to high, showcasing product details';
    }
    return 'Balanced, natural contrast';
  }
  
  private static determineShadowQuality(essence: CreativeEssence): string {
    return 'Soft and natural, adding depth without harshness';
  }
  
  private static determineAmbientLight(essence: CreativeEssence): string {
    return 'Natural environmental light adding atmosphere and realism';
  }
  
  private static determineLens(essence: CreativeEssence): string {
    if (essence.involvesHands || essence.involvesProduct) {
      return '85mm f/1.4 or 100mm f/2.8 macro (flattering compression)';
    }
    if (essence.involvesFace) {
      return '85mm f/1.2 (portrait focal length)';
    }
    return '50mm f/1.2 (versatile standard)';
  }
  
  private static determineAperture(essence: CreativeEssence): string {
    if (essence.involvesProduct) {
      return 'f/2.8-f/4 (product sharp, background bokeh)';
    }
    return 'f/2.0-f/2.8 (shallow depth of field)';
  }
  
  private static determineISO(essence: CreativeEssence): string {
    return 'ISO 100-400 (low noise, maximum quality)';
  }
  
  private static determineFocusPoint(essence: CreativeEssence): string {
    if (essence.involvesProduct) {
      return 'Product label and branding in critical focus';
    }
    if (essence.involvesFace) {
      return 'Eyes in critical focus';
    }
    if (essence.involvesHands) {
      return 'Hand and product interaction point in critical focus';
    }
    return 'Primary subject in critical focus';
  }
}
