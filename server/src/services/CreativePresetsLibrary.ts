/**
 * Creative Presets Library
 * Bibliothèque complète de variations créatives pour générer du contenu diversifié
 * S'adapte automatiquement au type de produit et au secteur
 */

export interface PhotographicStyle {
  name: string;
  category: 'studio' | 'lifestyle' | 'food' | 'minimal' | 'action' | 'cinematic' | 'nature' | 'flatlay' | 'editorial';
  references: string[];
  lighting: string;
  composition: string;
  mood: string;
  applicableSectors: string[];
  technicalSpecs: string;
}

export interface ColorPalette {
  name: string;
  description: string;
  application: string;
  brandIntegration: number; // Pourcentage de couleurs de marque (0-100)
}

export interface CreativeFramework {
  name: string;
  structure: string;
  application: string;
}

export interface CreativeContext {
  name: string;
  description: string;
  applicableSectors: string[];
}

export interface LightingSetup {
  name: string;
  timeOfDay: string;
  characteristics: string;
  mood: string;
}

// ==========================================
// 📸 STYLES PHOTOGRAPHIQUES (15+ variations)
// ==========================================

export const PHOTOGRAPHIC_STYLES: PhotographicStyle[] = [
  // STUDIO PHOTOGRAPHY
  {
    name: "Studio Clean & Minimal",
    category: "studio",
    references: [
      "Apple product photography style - pure white cyc wall, single key light, rim light separation, minimalist perfection",
      "Cosmopolitan magazine product shots - high-key lighting, beauty dish, flawless white backdrop, commercial precision",
      "Irving Penn studio work - stark minimalism, controlled lighting, timeless composition, negative space mastery",
      "Jonathan Knowles liquid photography - studio perfection, splash frozen, black backdrop, dramatic contrast",
      "Nadav Kander studio portraits - dramatic single light source, gradient backdrop, sculptural lighting",
      "Tim Tadder studio sports - explosive action frozen, high-speed strobe, black void background, kinetic energy",
      "Rankin beauty photography - soft box perfection, porcelain skin lighting, fashion-forward studio aesthetic",
      "Terry Richardson studio aesthetic - harsh direct flash, raw energy, white seamless, edgy commercial style"
    ],
    lighting: "Studio strobes (2-4 lights), soft boxes, beauty dishes, rim lights, hair lights, controlled precision",
    composition: "Central placement, negative space dominance, rule of thirds for dynamic products, geometric precision",
    mood: "Clean, controlled, premium, focus on product perfection, commercial excellence",
    applicableSectors: ['all'],
    technicalSpecs: "f/8-f/16 (deep focus), ISO 100-200, 1/125-1/250 sync speed, studio strobes with modifiers"
  },
  {
    name: "Studio Editorial Fashion",
    category: "studio",
    references: [
      "Vogue studio editorials - dramatic lighting, bold shadows, fashion forward, aspirational luxury",
      "Mario Testino studio glamour - luxurious lighting, golden tones, celebrity style, editorial polish",
      "Patrick Demarchelier elegance - soft but defined, classic beauty lighting, timeless sophistication",
      "Mert & Marcus high fashion - high contrast, bold colors, avant-garde composition, boundary-pushing",
      "Peter Lindbergh black and white studio - raw beauty, minimal retouching, authentic emotion, natural elegance",
      "Steven Meisel studio mastery - editorial perfection, trend-setting compositions, fashion innovation",
      "Annie Leibovitz studio portraits - storytelling through lighting, character depth, narrative power"
    ],
    lighting: "Fashion three-point lighting, dramatic side lighting, colored gels, kicker lights, editorial sophistication",
    composition: "Dynamic poses, negative space, asymmetric balance, diagonal energy, fashion-forward framing",
    mood: "Editorial, aspirational, trend-setting, bold, sophisticated, luxury aesthetic",
    applicableSectors: ['cosmetic', 'fashion', 'lifestyle', 'luxury'],
    technicalSpecs: "f/5.6-f/11, ISO 100-400, 1/125-1/250, studio strobes with beauty dishes and grids"
  },
  {
    name: "Studio Product Packshot",
    category: "studio",
    references: [
      "Amazon product photography - 360° even lighting, pure white background, no shadows, e-commerce precision",
      "Ikea catalog precision - perfect lighting, accurate colors, lifestyle integration, catalog perfection",
      "Sephora beauty shots - flawless gradient backdrop, product hero positioning, luxury presentation",
      "Nike product line photography - floating products, shadow play, brand colors integration, dynamic energy",
      "Tiffany & Co jewelry - ultra high-key, sparkle enhancement, luxury lighting, precious detail capture"
    ],
    lighting: "Tent lighting or light box, even illumination, no harsh shadows, color-accurate, e-commerce standard",
    composition: "Centered, perfectly aligned, grid precision, standardized angles, catalog-ready",
    mood: "E-commerce ready, accurate, trustworthy, clean, professional, product-focused",
    applicableSectors: ['all'],
    technicalSpecs: "f/11-f/16, ISO 100, 1/125, continuous LED or strobe, color calibrated"
  },

  // LIFESTYLE PHOTOGRAPHY
  {
    name: "Lifestyle Casual Authentic",
    category: "lifestyle",
    references: [
      "Kinfolk magazine aesthetic - natural light, organic moments, muted tones, hygge lifestyle, intentional living",
      "Cereal magazine minimalism - clean spaces, intentional living, Nordic influence, design-conscious",
      "@evakoelzer Instagram style - relatable moments, soft focus, everyday magic, botanical styling, natural beauty",
      "Cup of Jo blog photography - real home settings, natural imperfections, warmth, authentic family life",
      "The Modern House editorial - architectural context, design-conscious, aspirational yet real, modern living",
      "Bon Appétit test kitchen - casual cooking, messy counters, authentic food prep, behind-the-scenes realism",
      "Airbnb Mag travel lifestyle - local culture, authentic experiences, human connection, wanderlust",
      "Goop wellness aesthetic - clean living, organic textures, elevated everyday, wellness lifestyle"
    ],
    lighting: "Natural window light, golden hour, soft indirect illumination, ambient home lighting, organic warmth",
    composition: "Candid moments, rule of thirds, breathing room, natural framing, lifestyle context",
    mood: "Authentic, relatable, warm, aspirational but achievable, cozy, human-centered",
    applicableSectors: ['food', 'beverage', 'lifestyle', 'wellness', 'home'],
    technicalSpecs: "f/2.8-f/5.6, ISO 400-1600, natural light, shallow depth of field, lifestyle lens 35-85mm"
  },

  // FOOD PHOTOGRAPHY
  {
    name: "Food Styling Hero Shot",
    category: "food",
    references: [
      "Donna Hay magazine - clean white backdrop, top-down precision, minimal styling, fresh ingredient focus",
      "Jamie Oliver rustic aesthetic - wood textures, natural mess, appetite appeal, homemade authenticity",
      "Ottolenghi cookbook photography - colorful abundance, overhead compositions, texture focus, ingredient celebration",
      "Kinfolk table gatherings - moody lighting, shared moments, editorial elegance, communal dining",
      "Saveur magazine authenticity - cultural context, imperfect beauty, story-driven, travel-inspired",
      "@foodiecrush Instagram appeal - bright, colorful, shareable, trending aesthetics, social media optimized",
      "Milk Street clean precision - scientific accuracy, technique showcase, minimalist, educational",
      "Salt Fat Acid Heat - ingredient focus, process shots, educational beauty, technique-driven"
    ],
    lighting: "45° natural light, backlit for translucency, side light for texture, food-optimized illumination",
    composition: "Overhead flat lay, 45° hero angle, close-up texture details, ingredient storytelling",
    mood: "Appetizing, fresh, irresistible, sensory, mouth-watering, craveable",
    applicableSectors: ['food', 'beverage', 'culinary'],
    technicalSpecs: "f/2.8-f/5.6, ISO 200-800, natural or continuous LED, macro 50-100mm, shallow DOF"
  },
  {
    name: "Food Action & Movement",
    category: "food",
    references: [
      "Modernist Cuisine high-speed - liquid splashes, steam capture, molecular detail, scientific beauty",
      "Bompas & Parr experimental - creative chaos, unexpected angles, playful interaction, avant-garde food",
      "Food Network TV aesthetics - sizzling action, chef hands, cooking process, dynamic preparation",
      "Tasty top-down process - step-by-step, hands in frame, satisfying completion, recipe visualization"
    ],
    lighting: "High-speed flash, motion-freezing strobe, dramatic side lighting, action-capturing illumination",
    composition: "Dynamic movement, tilted angles, energy captured, process-driven, action focus",
    mood: "Energetic, exciting, satisfying, process-driven, dynamic, ASMR-worthy",
    applicableSectors: ['food', 'beverage', 'culinary'],
    technicalSpecs: "f/5.6-f/8, ISO 400-800, high-speed flash 1/8000s, action freeze, continuous burst"
  },

  // MINIMAL & CONCEPTUAL
  {
    name: "Minimal & Geometric",
    category: "minimal",
    references: [
      "Muji product photography - essential simplicity, functional beauty, neutral tones, zen minimalism",
      "Norm Architects Danish design - clean lines, natural materials, breathing space, Scandinavian aesthetic",
      "COS fashion minimalism - architectural clothing, negative space, monochrome, modernist fashion",
      "Aesop brand imagery - intellectual minimalism, texture focus, sophisticated restraint, apothecary aesthetic",
      "Jil Sander aesthetic - pure forms, perfect proportions, timeless elegance, refined simplicity",
      "John Pawson architectural photography - light and shadow, spatial purity, meditative spaces",
      "@minimalzine Instagram curation - geometric compositions, shadow play, stark beauty, grid perfection"
    ],
    lighting: "Hard directional light creating geometric shadows, high contrast, sculptural lighting",
    composition: "Centered symmetry, negative space dominance, architectural precision, geometric balance",
    mood: "Zen, sophisticated, intellectual, timeless, meditative, refined",
    applicableSectors: ['cosmetic', 'fashion', 'tech', 'lifestyle', 'luxury'],
    technicalSpecs: "f/8-f/11, ISO 100-400, hard light source, geometric shadows, minimal elements"
  },

  // DYNAMIC & ACTION
  {
    name: "Action & Energy",
    category: "action",
    references: [
      "Nike advertising campaigns - athletes in motion, frozen peak action, dramatic lighting, just do it energy",
      "Red Bull content marketing - extreme sports, high-energy, impossible moments, adrenaline rush",
      "GoPro user-generated - first-person perspective, adrenaline, raw authenticity, extreme POV",
      "Adidas Originals street culture - urban movement, dance freeze frames, youth energy, street style",
      "Tim Tadder liquid motion - water splashes, high-speed precision, kinetic beauty, explosive energy",
      "Howard Schatz underwater athletes - grace in motion, fluid dynamics, surreal movement, underwater ballet"
    ],
    lighting: "High-speed flash, motion blur mixed with sharp focus, dramatic backlighting, freeze-frame illumination",
    composition: "Dynamic diagonals, action lines, movement vectors, energy flow, peak moment capture",
    mood: "Energetic, powerful, exciting, unstoppable, adrenaline-fueled, dynamic",
    applicableSectors: ['sports', 'beverage', 'lifestyle', 'energy'],
    technicalSpecs: "f/2.8-f/5.6, ISO 800-3200, high-speed flash or continuous, 1/1000s+, action freeze"
  },

  // CINEMATIC & MOODY
  {
    name: "Cinematic Film Aesthetic",
    category: "cinematic",
    references: [
      "Wes Anderson symmetrical frames - pastel palettes, centered composition, quirky charm, dollhouse aesthetic",
      "Blade Runner 2049 cinematography - neon accents, foggy atmosphere, sci-fi mood, dystopian beauty",
      "Her (Spike Jonze) soft futurism - warm pastels, intimate framing, emotional color, near-future aesthetic",
      "Grand Budapest Hotel color blocking - vibrant symmetry, theatrical staging, period charm, candy colors",
      "Drive neon noir - pink and blue lighting, night atmosphere, retro cool, 80s nostalgia",
      "Moonlight intimate lighting - natural but heightened, emotional color grading, poetic realism",
      "In the Mood for Love - saturated colors, intimate spaces, romantic framing, Wong Kar-wai aesthetic"
    ],
    lighting: "Cinematic three-point lighting, colored gels, atmospheric haze, film-grade illumination",
    composition: "Widescreen framing, symmetrical or rule of thirds, depth of field, cinematic aspect ratio",
    mood: "Nostalgic, emotional, story-driven, atmospheric, cinematic, narrative-rich",
    applicableSectors: ['all'],
    technicalSpecs: "f/1.4-f/2.8, ISO 400-1600, anamorphic look, colored gels, cinematic aspect 2.39:1"
  },

  // NATURE & ORGANIC
  {
    name: "Nature Integration",
    category: "nature",
    references: [
      "@evakoelzer botanical styling - flowers as context, natural mess, organic textures, garden aesthetic",
      "Apartamento magazine editorial - plants as co-stars, lived-in spaces, green abundance, botanical life",
      "Kinfolk garden gatherings - outdoor dining, natural light filtering, seasonal beauty, al fresco living",
      "Cereal travel nature - landscapes meeting products, environmental storytelling, wanderlust aesthetic",
      "National Geographic product context - nature as backdrop, environmental consciousness, planet-friendly",
      "Patagonia outdoor lifestyle - rugged nature, authentic outdoor use, conservation story, adventure aesthetic"
    ],
    lighting: "Dappled natural light, golden hour glow, soft overcast diffusion, organic illumination",
    composition: "Product nestled in nature, organic placement, environmental context, natural integration",
    mood: "Organic, sustainable, harmonious, grounded, eco-conscious, natural beauty",
    applicableSectors: ['wellness', 'food', 'lifestyle', 'eco-friendly', 'outdoor'],
    technicalSpecs: "f/2.8-f/5.6, ISO 200-800, natural light only, organic depth of field, environmental lens"
  },

  // FLAT LAY & TOP-DOWN
  {
    name: "Flat Lay Composition",
    category: "flatlay",
    references: [
      "@mybluehouse knolling - perfectly organized, grid precision, satisfying order, OCD aesthetics",
      "Kinfolk overhead food - casual abundance, organic placement, negative space, artful arrangement",
      "Rifle Paper Co aesthetic - colorful arrangements, playful patterns, artistic styling, illustrated vibe",
      "Martha Stewart precision - symmetrical layouts, color coordination, editorial polish, lifestyle perfection",
      "Cereal magazine travel flat lays - curated objects, storytelling through items, minimal travel aesthetic",
      "Instagram grid aesthetics - cohesive color schemes, repetitive patterns, visual rhythm, feed-optimized"
    ],
    lighting: "Even top-down lighting, no shadows, consistent illumination, flat lighting",
    composition: "Birds-eye view, grid arrangements, geometric patterns, knolling precision, overhead perfection",
    mood: "Organized, satisfying, curated, visually rhythmic, aesthetically pleasing, grid-worthy",
    applicableSectors: ['all'],
    technicalSpecs: "f/5.6-f/11, ISO 200-400, overhead lighting, tripod/boom arm, perfectly aligned top-down"
  },

  // EDITORIAL & MAGAZINE
  {
    name: "Editorial Magazine Style",
    category: "editorial",
    references: [
      "Vogue editorial sophistication - high fashion, dramatic lighting, aspirational luxury, iconic imagery",
      "Kinfolk magazine - lifestyle editorial, authentic moments, muted elegance, slow living aesthetic",
      "Monocle magazine - design-conscious, international, sophisticated simplicity, modern journalism",
      "Cereal magazine - travel editorial, architectural context, minimalist luxury, wanderlust refined",
      "Milk magazine - family lifestyle, authentic parenting, warm natural light, modern family life",
      "T Magazine (NYT) - cultural editorial, artistic direction, intellectual luxury, high-brow lifestyle"
    ],
    lighting: "Editorial three-point lighting, natural light enhanced, controlled mood, magazine-quality",
    composition: "Magazine cover potential, rule of thirds, visual hierarchy, editorial balance",
    mood: "Editorial, aspirational, story-driven, culturally relevant, magazine-worthy",
    applicableSectors: ['all'],
    technicalSpecs: "f/2.8-f/8, ISO 200-800, mixed natural and strobe, editorial lens 35-85mm"
  },

  // STREET & URBAN
  {
    name: "Street Photography Urban",
    category: "lifestyle",
    references: [
      "Brandon Stanton Humans of NY - authentic street moments, real people, urban stories, documentary style",
      "Vivian Maier street photography - candid urban life, mid-century aesthetic, genuine moments, timeless street",
      "Supreme brand street culture - NYC urban, skateboard aesthetic, street style, youth culture",
      "Hypebeast editorial - streetwear context, urban fashion, sneaker culture, street-ready style",
      "Instagram street style - fashion blogger aesthetic, city backdrop, street as runway, urban cool"
    ],
    lighting: "Natural urban light, street lamps, neon signs, city ambient, available light",
    composition: "Candid street moments, environmental context, urban backdrop, lifestyle authenticity",
    mood: "Urban, authentic, street-smart, cool, contemporary, city life",
    applicableSectors: ['fashion', 'lifestyle', 'beverage', 'youth'],
    technicalSpecs: "f/1.4-f/4, ISO 800-3200, prime lens 35-50mm, available light, fast shutter"
  },

  // LUXURY & PREMIUM
  {
    name: "Luxury Premium Style",
    category: "studio",
    references: [
      "Rolls-Royce advertising - ultimate luxury, sophisticated lighting, timeless elegance, understated opulence",
      "Hermès brand imagery - craft perfection, heritage quality, subtle luxury, artisanal excellence",
      "Rolex advertising - precision timelessness, masculine luxury, achievement aesthetic, status symbol",
      "Chanel No.5 campaigns - iconic luxury, French sophistication, feminine mystique, timeless glamour",
      "Louis Vuitton editorial - travel luxury, heritage craftsmanship, monogram prestige, aspirational lifestyle"
    ],
    lighting: "Soft graduated lighting, subtle highlights, refined shadows, luxury illumination",
    composition: "Elegant simplicity, refined balance, understated opulence, premium positioning",
    mood: "Luxurious, sophisticated, exclusive, premium, refined, aspirational",
    applicableSectors: ['luxury', 'cosmetic', 'fashion', 'premium'],
    technicalSpecs: "f/5.6-f/11, ISO 100-200, controlled studio or natural, premium lens quality"
  },

  // VINTAGE & RETRO
  {
    name: "Vintage Retro Aesthetic",
    category: "cinematic",
    references: [
      "1970s advertising golden age - warm tones, soft focus, nostalgic appeal, retro charm",
      "Polaroid instant film aesthetic - vintage color cast, instant nostalgia, analog warmth, lo-fi charm",
      "Kodachrome slide film - saturated vintage colors, grain texture, nostalgic quality, film look",
      "Wes Anderson color palettes applied - vintage pastels, retro symmetry, nostalgic whimsy, period aesthetic",
      "Mad Men era advertising - 1960s sophistication, mid-century modern, vintage elegance, golden age style"
    ],
    lighting: "Warm vintage tones, soft diffusion, nostalgic glow, retro illumination",
    composition: "Vintage framing, period-appropriate styling, nostalgic placement, retro balance",
    mood: "Nostalgic, warm, vintage, retro-cool, timeless, sentimental",
    applicableSectors: ['all'],
    technicalSpecs: "f/2.8-f/5.6, ISO 400-1600, warm color grading, film grain, vintage lens character"
  },

  // TECH & MODERN
  {
    name: "Tech Modern Minimal",
    category: "studio",
    references: [
      "Apple iPhone advertising - clean tech aesthetic, minimalist precision, modern innovation, sleek design",
      "Tesla product photography - futuristic minimalism, tech-forward, sustainable luxury, innovation showcase",
      "Google Pixel campaigns - colorful tech minimalism, friendly innovation, accessible technology, modern simple",
      "Microsoft Surface editorial - professional tech, modern workspace, productivity aesthetic, business tech",
      "Dyson product imagery - engineering beauty, functional design, transparent technology, innovation visible"
    ],
    lighting: "Clean tech lighting, LED precision, modern illumination, clinical cleanliness",
    composition: "Geometric precision, minimalist framing, tech-focused, innovation showcase",
    mood: "Modern, innovative, clean, tech-forward, futuristic, progressive",
    applicableSectors: ['tech', 'lifestyle', 'modern'],
    technicalSpecs: "f/8-f/16, ISO 100-400, LED continuous or strobe, color-accurate, sharp precision"
  }
];

// ==========================================
// 🎨 PALETTES DE COULEURS (12+ variations)
// ==========================================

export const COLOR_PALETTES: ColorPalette[] = [
  {
    name: "Brand Dominant",
    description: "Couleurs de marque à 70%, très identifiable et brand-focused",
    application: "Priorité à la reconnaissance de marque, cohérence maximale",
    brandIntegration: 70
  },
  {
    name: "Complementary Harmony",
    description: "Couleur marque + sa complémentaire sur la roue chromatique",
    application: "Contraste harmonieux, moderne, eye-catching tout en gardant identité",
    brandIntegration: 50
  },
  {
    name: "Monochrome Brand",
    description: "Nuances et variations d'une seule couleur marque (tints & shades)",
    application: "Élégant, cohésif, sophistiqué, monochromatic elegance",
    brandIntegration: 90
  },
  {
    name: "Pastel Soft",
    description: "Pastels doux avec touche couleur marque comme accent",
    application: "Féminin, doux, accessible, Instagram-friendly, soft aesthetic",
    brandIntegration: 30
  },
  {
    name: "Vibrant Pop",
    description: "Couleurs vives saturées avec accent marque stratégique",
    application: "Jeune, énergique, attention-grabbing, Gen Z appeal",
    brandIntegration: 40
  },
  {
    name: "Earth & Natural",
    description: "Tons terre, beiges, verts naturels avec marque intégrée subtilement",
    application: "Naturel, durable, organique, eco-conscious, grounded",
    brandIntegration: 25
  },
  {
    name: "Noir & Blanc + Accent",
    description: "Monochrome B&W avec couleur marque comme seul accent de couleur",
    application: "Élégant, intemporel, impactant, dramatic contrast, premium feel",
    brandIntegration: 20
  },
  {
    name: "Neon & Dark",
    description: "Fond sombre avec néons dont couleur marque, cyberpunk aesthetic",
    application: "Moderne, tech, urbain, nightlife, edgy, contemporary",
    brandIntegration: 35
  },
  {
    name: "Golden Hour Warmth",
    description: "Tons chauds dorés, oranges, ambrés avec marque harmonisée",
    application: "Nostalgique, chaleureux, émotionnel, cozy, sunset vibes",
    brandIntegration: 40
  },
  {
    name: "Cool & Clinical",
    description: "Blues froids, grays, blancs avec marque en contraste",
    application: "Professionnel, tech, trustworthy, clean, medical-grade feel",
    brandIntegration: 30
  },
  {
    name: "Tropical Vibrant",
    description: "Couleurs tropicales vives (corail, turquoise, lime) + marque",
    application: "Été, vacances, joyeux, vacation mode, exotic appeal",
    brandIntegration: 35
  },
  {
    name: "Autumn Harvest",
    description: "Oranges, burgundy, brun, or avec couleur marque seasonale",
    application: "Saisonnier automne, chaleureux, harvest, cozy fall vibes",
    brandIntegration: 45
  }
];

// ==========================================
// 📝 FRAMEWORKS CRÉATIFS (8 variations)
// ==========================================

export const CREATIVE_FRAMEWORKS: CreativeFramework[] = [
  {
    name: "AIDA",
    structure: "Attention → Interest → Desire → Action",
    application: "Hook fort → Développer intérêt → Créer désir → CTA clair"
  },
  {
    name: "PAS",
    structure: "Problem → Agitate → Solution",
    application: "Identifier problème → Agiter pain point → Présenter solution produit"
  },
  {
    name: "Storytelling Narratif",
    structure: "Beginning → Middle → End (Hero's Journey)",
    application: "Raconter histoire complète avec transformation, arc narratif émotionnel"
  },
  {
    name: "Question → Réponse",
    structure: "Question provocante → Développement → Réponse satisfaisante",
    application: "Créer curiosité immédiate, engager réflexion, satisfaire avec réponse"
  },
  {
    name: "Témoignage Social Proof",
    structure: "Voix du client → Expérience authentique → Résultat tangible",
    application: "Social proof, voix authentique, transformation réelle vécue"
  },
  {
    name: "QUEST",
    structure: "Qualify → Understand → Educate → Stimulate → Transition",
    application: "Identifier audience → Comprendre besoins → Éduquer → Stimuler action"
  },
  {
    name: "Before/After Transformation",
    structure: "État initial (problème) → Transformation → État final (résultat)",
    application: "Montrer transformation claire, contrast fort, résultat désirable"
  },
  {
    name: "Éducatif Step-by-Step",
    structure: "Étape 1 → Étape 2 → Étape 3 → Résultat final",
    application: "Décomposer processus, rendre accessible, actionnable, how-to format"
  }
];

// ==========================================
// 🌍 CONTEXTES / SETTINGS (par secteur)
// ==========================================

export const CREATIVE_CONTEXTS: { [key: string]: CreativeContext[] } = {
  food: [
    { name: "Cuisine moderne lumineuse", description: "Clean kitchen, natural light, home cooking aesthetic", applicableSectors: ['food', 'beverage'] },
    { name: "Table familiale conviviale", description: "Family dining, shared moments, togetherness", applicableSectors: ['food', 'beverage'] },
    { name: "Pique-nique en extérieur", description: "Outdoor dining, nature setting, al fresco vibes", applicableSectors: ['food', 'beverage'] },
    { name: "Café lifestyle urbain", description: "Coffee shop setting, urban cool, social gathering", applicableSectors: ['food', 'beverage', 'lifestyle'] },
    { name: "Restaurant fine dining", description: "Upscale restaurant, gourmet presentation, culinary excellence", applicableSectors: ['food'] },
    { name: "Street food urbain", description: "Food truck, street vendor, urban food culture", applicableSectors: ['food', 'beverage'] },
    { name: "Brunch weekend cocooning", description: "Lazy weekend morning, comfort food, relaxation", applicableSectors: ['food', 'beverage'] },
    { name: "Cuisine professionnelle", description: "Chef kitchen, professional tools, culinary craftsmanship", applicableSectors: ['food'] }
  ],
  beverage: [
    { name: "Moment détente solo", description: "Personal relaxation, me-time, self-care moment", applicableSectors: ['beverage', 'lifestyle'] },
    { name: "Fête entre amis", description: "Party atmosphere, social gathering, celebration vibes", applicableSectors: ['beverage', 'food'] },
    { name: "Workout fitness", description: "Gym setting, active lifestyle, post-workout refreshment", applicableSectors: ['beverage', 'sports'] },
    { name: "Bureau workspace", description: "Office desk, productivity fuel, work companion", applicableSectors: ['beverage', 'lifestyle'] },
    { name: "Piscine/plage été", description: "Pool party, beach day, summer refreshment, vacation mode", applicableSectors: ['beverage'] },
    { name: "Road trip aventure", description: "Car travel, adventure companion, on-the-go lifestyle", applicableSectors: ['beverage', 'lifestyle'] },
    { name: "Soirée cosy", description: "Evening relaxation, cozy home, wind-down ritual", applicableSectors: ['beverage', 'lifestyle'] }
  ],
  cosmetic: [
    { name: "Salle de bain moderne", description: "Bathroom ritual, morning routine, self-care space", applicableSectors: ['cosmetic', 'wellness'] },
    { name: "Vanity table élégant", description: "Makeup station, beauty ritual, glamour moment", applicableSectors: ['cosmetic'] },
    { name: "Spa wellness", description: "Spa treatment, professional care, luxury pampering", applicableSectors: ['cosmetic', 'wellness'] },
    { name: "Voyage travel bag", description: "Travel essentials, jet-setter lifestyle, portable beauty", applicableSectors: ['cosmetic', 'lifestyle'] },
    { name: "Chambre intimité", description: "Bedroom ritual, intimate care, night routine", applicableSectors: ['cosmetic', 'wellness'] },
    { name: "Atelier backstage", description: "Professional makeup, backstage glamour, artistry", applicableSectors: ['cosmetic'] }
  ],
  lifestyle: [
    { name: "Chambre cocooning", description: "Bedroom comfort, cozy vibes, personal sanctuary", applicableSectors: ['lifestyle', 'wellness'] },
    { name: "Salon moderne", description: "Living room, home design, contemporary living", applicableSectors: ['lifestyle', 'home'] },
    { name: "Jardin/terrasse", description: "Outdoor living, garden space, fresh air lifestyle", applicableSectors: ['lifestyle', 'wellness'] },
    { name: "Espace créatif atelier", description: "Creative workspace, artistic environment, maker space", applicableSectors: ['lifestyle', 'creative'] },
    { name: "Voyage aventure", description: "Travel destination, adventure setting, exploration lifestyle", applicableSectors: ['lifestyle', 'travel'] }
  ],
  tech: [
    { name: "Bureau moderne workspace", description: "Modern office, productivity space, professional setting", applicableSectors: ['tech', 'lifestyle'] },
    { name: "Commute transport", description: "On-the-go, transit usage, mobile lifestyle", applicableSectors: ['tech', 'lifestyle'] },
    { name: "Home office", description: "Work from home, remote setup, hybrid workspace", applicableSectors: ['tech', 'lifestyle'] },
    { name: "Outdoor tech", description: "Technology in nature, outdoor usage, adventure tech", applicableSectors: ['tech', 'outdoor'] }
  ],
  default: [
    { name: "Studio professionnel", description: "Professional studio, controlled environment, product focus", applicableSectors: ['all'] },
    { name: "Lifestyle quotidien", description: "Everyday life, authentic moments, relatable context", applicableSectors: ['all'] },
    { name: "Contexte urbain", description: "City setting, urban environment, contemporary backdrop", applicableSectors: ['all'] },
    { name: "Nature environnement", description: "Natural setting, outdoor context, environmental backdrop", applicableSectors: ['all'] }
  ]
};

// ==========================================
// ⏰ ÉCLAIRAGE / MOMENTS (7 variations)
// ==========================================

export const LIGHTING_SETUPS: LightingSetup[] = [
  {
    name: "Golden Hour Morning",
    timeOfDay: "6h-8h",
    characteristics: "Warm golden light, soft shadows, gentle illumination, fresh start energy",
    mood: "Fresh, optimistic, new beginnings, gentle awakening"
  },
  {
    name: "Bright Midday",
    timeOfDay: "11h-14h",
    characteristics: "Strong direct light, high contrast, crisp shadows, maximum clarity",
    mood: "Energetic, vibrant, active, peak performance"
  },
  {
    name: "Afternoon Soft",
    timeOfDay: "15h-17h",
    characteristics: "Diffused warm light, softer shadows, comfortable illumination",
    mood: "Comfortable, productive, steady, focused"
  },
  {
    name: "Golden Hour Evening",
    timeOfDay: "17h-19h",
    characteristics: "Magical golden light, long shadows, warm glow, cinematic quality",
    mood: "Romantic, nostalgic, magical, dreamy"
  },
  {
    name: "Blue Hour",
    timeOfDay: "19h-20h",
    characteristics: "Cool blue tones, twilight atmosphere, subtle ambient light",
    mood: "Peaceful, contemplative, transitional, serene"
  },
  {
    name: "Night Ambiance",
    timeOfDay: "21h+",
    characteristics: "Artificial lights, warm interior glow, intimate lighting, cozy atmosphere",
    mood: "Intimate, cozy, relaxing, personal"
  },
  {
    name: "Overcast Soft",
    timeOfDay: "Any time",
    characteristics: "Even diffused light, no harsh shadows, consistent illumination, natural softbox",
    mood: "Calm, consistent, professional, reliable"
  }
];

// ==========================================
// 🎯 FONCTIONS UTILITAIRES
// ==========================================

/**
 * Sélectionne un style photographique applicable au secteur
 */
export function selectApplicableStyles(sector: string): PhotographicStyle[] {
  return PHOTOGRAPHIC_STYLES.filter(style => 
    style.applicableSectors.includes('all') || 
    style.applicableSectors.includes(sector.toLowerCase())
  );
}

/**
 * Sélectionne des contextes applicables au secteur
 */
export function selectApplicableContexts(sector: string): CreativeContext[] {
  const sectorKey = sector.toLowerCase();
  
  // Essayer de trouver des contextes spécifiques au secteur
  if (CREATIVE_CONTEXTS[sectorKey]) {
    return CREATIVE_CONTEXTS[sectorKey];
  }
  
  // Fallback sur les contextes par défaut
  return CREATIVE_CONTEXTS.default;
}

/**
 * Sélectionne une référence photographique aléatoire parmi les disponibles
 */
export function selectRandomReference(style: PhotographicStyle): string {
  const randomIndex = Math.floor(Math.random() * style.references.length);
  return style.references[randomIndex];
}

/**
 * Génère une palette de couleurs adaptée avec intégration de la marque
 */
export function generateColorPalettePrompt(
  palette: ColorPalette,
  brandColors: { primary?: string; secondary?: string; accent?: string }
): string {
  const brandIntegration = palette.brandIntegration;
  
  let prompt = `Color Palette: ${palette.name} - ${palette.description}\n`;
  
  if (brandColors.primary) {
    prompt += `Brand Primary Color: ${brandColors.primary} (${brandIntegration}% integration)\n`;
  }
  if (brandColors.secondary) {
    prompt += `Brand Secondary Color: ${brandColors.secondary}\n`;
  }
  if (brandColors.accent) {
    prompt += `Brand Accent Color: ${brandColors.accent}\n`;
  }
  
  prompt += `Color Strategy: ${palette.application}`;
  
  return prompt;
}

/**
 * Crée un preset créatif complet pour un post
 */
export interface CreativePreset {
  style: PhotographicStyle;
  reference: string;
  palette: ColorPalette;
  framework: CreativeFramework;
  context: CreativeContext;
  lighting: LightingSetup;
}

/**
 * Sélectionne un preset créatif basé sur l'index du post
 * Assure une rotation intelligente pour éviter les répétitions
 */
export function selectCreativePreset(
  postIndex: number,
  totalPosts: number,
  sector: string,
  brandColors: { primary?: string; secondary?: string; accent?: string }
): CreativePreset {
  // Récupérer les styles applicables au secteur
  const applicableStyles = selectApplicableStyles(sector);
  const applicableContexts = selectApplicableContexts(sector);
  
  // Rotation intelligente pour éviter répétitions
  const styleIndex = postIndex % applicableStyles.length;
  const paletteIndex = Math.floor(postIndex / applicableStyles.length) % COLOR_PALETTES.length;
  const frameworkIndex = postIndex % CREATIVE_FRAMEWORKS.length;
  const contextIndex = postIndex % applicableContexts.length;
  const lightingIndex = postIndex % LIGHTING_SETUPS.length;
  
  const selectedStyle = applicableStyles[styleIndex];
  
  return {
    style: selectedStyle,
    reference: selectRandomReference(selectedStyle),
    palette: COLOR_PALETTES[paletteIndex],
    framework: CREATIVE_FRAMEWORKS[frameworkIndex],
    context: applicableContexts[contextIndex],
    lighting: LIGHTING_SETUPS[lightingIndex]
  };
}
