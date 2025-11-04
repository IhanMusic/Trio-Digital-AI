/**
 * Creative Presets Library - CANNES LIONS EDITION
 * Bibliothèque enrichie inspirée des campagnes primées aux Cannes Lions
 */

export interface PhotographicStyle {
  name: string;
  category: string;
  reference: string;
  lighting: string;
  composition: string;
  mood: string;
  technicalSpecs: string;
  requiresHands?: boolean;
  handsJustification?: string;
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
}

export interface LightingSetup {
  name: string;
  timeOfDay: string;
  characteristics: string;
  mood: string;
}

export interface CreativePreset {
  style: PhotographicStyle;
  palette: ColorPalette;
  framework: CreativeFramework;
  context: CreativeContext;
  lighting: LightingSetup;
  reference: string;
}

// ==========================================
// 📸 STYLES PHOTOGRAPHIQUES ENRICHIS (114 variations au total)
// ==========================================

export const PHOTOGRAPHIC_STYLES: PhotographicStyle[] = [
  // ========== FOOD & BEVERAGE ENRICHI (15 styles au total) ==========
  {
    name: "Todd Selby Intimate Food",
    category: "food",
    reference: "Todd Selby's intimate food photography meets Kinfolk Magazine slow living aesthetic, natural light emphasis, imperfect beauty celebration",
    lighting: "Natural window light, soft golden hour warmth, organic shadows",
    composition: "Rule of thirds with intentional negative space, hands showing human connection",
    mood: "Nostalgic aspiration for slow living ritual with gentle excitement and mindful presence",
    technicalSpecs: "Canon EOS R5, 50mm f/1.2 at f/2.8, ISO 400-800, natural light only"
  },
  {
    name: "Michelin Star Plating Artistry",
    category: "food",
    reference: "Three Michelin star plating photography from Eleven Madison Park campaigns, fine dining as art form, chef's table intimate perspective, culinary precision storytelling, gastronomic excellence visualization, plate as canvas philosophy",
    lighting: "Soft overhead gallery lighting at 5000K treating plate as art installation, subtle side light revealing texture depth, rim light on sauce creating glossy appeal, museum-quality illumination for culinary masterpiece",
    composition: "Centered plate hero shot with negative space as design element, artistic plating with precise ingredient placement, micro-herbs and edible flowers as final touches, shallow depth of field isolating dish, rule of thirds with sauce swirl leading eye",
    mood: "Culinary artistry reverence, fine dining sophistication, gastronomic excellence, chef's vision celebration, plate as edible art",
    technicalSpecs: "Phase One XF, 80mm at f/5.6, ISO 100, overhead boom arm, gallery spotlighting"
  },
  {
    name: "Farm-to-Fork Harvest Story",
    category: "food",
    reference: "Blue Hill at Stone Barns farm-to-table narrative, ingredient journey storytelling, harvest-to-plate connection, sustainable dining visualization, farmer-chef collaboration photography, seed-to-table transparency",
    lighting: "Natural farm-to-kitchen lighting transition at 5200K, golden hour harvest glow, rustic kitchen window light, authentic agricultural illumination, farm-fresh morning light",
    composition: "Split narrative showing ingredient in field and on plate, farmer's hands harvesting transitioning to chef's hands plating, soil-to-table journey visualization, environmental context showing farm origin, authentic agricultural beauty",
    mood: "Farm-to-table authenticity, sustainable dining pride, ingredient origin transparency, agricultural heritage honor, harvest-to-plate connection",
    technicalSpecs: "Canon EOS R5, 35mm f/1.4 at f/2.8, ISO 400-800, natural light sequence"
  },
  {
    name: "Cocktail Mixology Craft",
    category: "beverage",
    reference: "Death & Co cocktail photography aesthetic, mixology as craft art, artisan cocktail culture, speakeasy sophistication, craft cocktail movement visualization, bartender as artist campaigns",
    lighting: "Moody bar lighting at 4200K creating intimate cocktail lounge atmosphere, backlight through cocktail showing color and clarity, rim light on glass creating elegant glow, dramatic shadows suggesting speakeasy mystique",
    composition: "Cocktail glass hero shot with garnish as focal point, bartender hands mid-craft visible showing artisan process, bar tools and premium spirits partially visible, smoke or vapor adding atmospheric drama, shallow focus on cocktail with blurred bar background",
    mood: "Mixology craft sophistication, cocktail culture elevation, artisan bartending pride, speakeasy mystique, craft cocktail artistry",
    technicalSpecs: "Sony A7SIII, 85mm f/1.4 at f/2.0, ISO 1600-3200, moody bar practicals"
  },
  {
    name: "Breakfast Bowl Instagram Trend",
    category: "food",
    reference: "Smoothie bowl Instagram aesthetic, açai bowl photography trend, breakfast bowl art, health influencer food styling, colorful breakfast photography, morning ritual visualization for social media",
    lighting: "Bright natural morning light at 5500K creating fresh breakfast feel, overhead soft window light, optimistic bright illumination, Instagram-ready lighting, fresh morning atmosphere",
    composition: "Overhead flat-lay of artistically arranged breakfast bowl, colorful toppings creating rainbow effect, granola and fresh fruit arranged in patterns, coffee or juice in frame suggesting complete breakfast, marble or wooden surface, Instagram square crop optimization",
    mood: "Morning ritual joy, healthy breakfast celebration, Instagram aesthetic perfection, wellness lifestyle visualization, colorful breakfast happiness",
    technicalSpecs: "iPhone 15 Pro, overhead natural light, Instagram square format optimization"
  },
  {
    name: "Cheese Board Charcuterie Art",
    category: "food",
    reference: "Artisan cheese board photography, charcuterie board styling trend, grazing table aesthetic, entertaining lifestyle photography, cheese and wine pairing visualization, European cheese culture celebration",
    lighting: "Warm entertaining lighting at 4800K creating inviting atmosphere, soft overhead illumination showing board details, warm candlelight practicals suggesting evening gathering, cozy hosting ambiance",
    composition: "Overhead or 45° angle showing complete cheese board arrangement, variety of cheeses, cured meats, fruits, nuts artfully arranged, hands reaching for cheese suggesting sharing moment, wine glasses partially visible, rustic wooden board on textured surface",
    mood: "Entertaining sophistication, sharing and gathering warmth, artisan cheese appreciation, European food culture, hosting pride",
    technicalSpecs: "Nikon Z7 II, 35mm f/1.8 at f/4, ISO 640, warm natural light"
  },
  {
    name: "Sushi Omakase Japanese Precision",
    category: "food",
    reference: "Jiro Dreams of Sushi aesthetic, omakase experience photography, Japanese sushi craftsmanship, itamae chef artistry, sushi as art form, Japanese culinary precision visualization",
    lighting: "Clean Japanese restaurant lighting at 5500K emphasizing sushi freshness, soft overhead illumination showing fish texture, minimal shadows maintaining ingredient clarity, authentic sushi bar ambiance",
    composition: "Close-up of sushi pieces on traditional plate or wooden board, chef's hands visible showing precision craft, wasabi and ginger artfully placed, negative space emphasizing minimalist Japanese aesthetic, focus on fish texture and rice grain detail",
    mood: "Japanese culinary precision, sushi craftsmanship reverence, omakase experience intimacy, itamae artistry respect, minimalist Japanese elegance",
    technicalSpecs: "Fujifilm GFX 100S, 110mm f/2 at f/4, ISO 400, soft overhead diffusion"
  },
  {
    name: "Donna Hay Clean Minimal",
    category: "food",
    reference: "Donna Hay Magazine editorial perfection, Australian Gourmet Traveller clean aesthetic, Ottolenghi colorful precision",
    lighting: "Soft diffused natural light, high-key setup, minimal shadows",
    composition: "Centered symmetry, top-down precision, geometric arrangement",
    mood: "Clean confidence with fresh optimism and culinary precision",
    technicalSpecs: "Phase One XF, 80mm at f/8, ISO 100, overhead boom arm"
  },
  {
    name: "Dark & Moody Food",
    category: "food",
    reference: "Joanie Simon @thebiteshot dark food aesthetic, Lindt chocolate luxury campaigns, chiaroscuro Dutch masters technique",
    lighting: "Dramatic side light, hard shadows, Rembrandt technique",
    composition: "Low-key composition, dark background dominance",
    mood: "Sensual mystery with sophisticated indulgence and intimate darkness",
    technicalSpecs: "Sony A7RIII, 85mm f/1.4 at f/2.0, ISO 800-1600, single strobe"
  },
  {
    name: "Overhead Flat Lay",
    category: "flatlay",
    reference: "@thrivemags knolling precision, Pinterest food styling, Tasty recipe video top-down aesthetic",
    lighting: "Even overhead LED lighting, shadowless illumination",
    composition: "Birds-eye view, knolling precision, geometric patterns",
    mood: "Organized satisfaction with visual rhythm and curated abundance",
    technicalSpecs: "Fujifilm GFX 50S, 63mm at f/5.6, ISO 200, LED panel array"
  },
  {
    name: "Food in Motion Splash",
    category: "action",
    reference: "Modernist Cuisine high-speed photography, Coca-Cola 'Taste the Feeling' splash moments, Heinz iconic pour campaigns",
    lighting: "High-speed flash, motion-freezing strobe, dramatic backlighting",
    composition: "Frozen action peak moment, dynamic movement captured",
    mood: "Kinetic excitement with refreshing energy and satisfying motion",
    technicalSpecs: "Canon EOS-1D X Mark III, 100mm f/2.8 macro at f/8, ISO 100, 1/8000s"
  },
  {
    name: "Rustic Farm-to-Table",
    category: "lifestyle",
    reference: "Jamie Oliver authentic cooking campaigns, farm-to-table restaurant aesthetic, countryside artisanal craftsmanship",
    lighting: "Warm natural light, rustic ambiance, soft window glow",
    composition: "Casual arrangement, natural imperfection, lived-in authenticity",
    mood: "Warm nostalgia with countryside simplicity and artisanal pride",
    technicalSpecs: "Fujifilm X-T4, 35mm f/1.4 at f/2.2, ISO 800, natural light"
  },
  {
    name: "Asian Food Zen",
    category: "food",
    reference: "Kikkoman Japanese minimalism, ramen photography aesthetic, Asian street food cultural storytelling",
    lighting: "Soft overhead lighting, minimal contrast, clean illumination",
    composition: "Minimalist zen, negative space importance, balanced asymmetry",
    mood: "Zen tranquility with cultural authenticity and mindful appreciation",
    technicalSpecs: "Sony A7III, 50mm f/1.8 at f/2.8, ISO 400, soft diffusion"
  },
  {
    name: "Street Food Urban",
    category: "documentary",
    reference: "Uber Eats local campaigns, Netflix 'Street Food' documentary realism, food truck urban lifestyle",
    lighting: "Available urban light, neon signs, natural street atmosphere",
    composition: "Candid documentary, environmental context, street authenticity",
    mood: "Urban excitement with accessible authenticity and cultural vibrance",
    technicalSpecs: "Canon EOS R6, 35mm f/1.4 at f/2.0, ISO 1600-3200"
  },
  {
    name: "Liquid Pour Artistry",
    category: "action",
    reference: "Guinness iconic pour patience narrative, Perrier sparkling moments, coffee pour-over craft appreciation",
    lighting: "Backlit transparency, liquid glow, dramatic highlighting",
    composition: "Pour action freeze, liquid movement, dynamic flow",
    mood: "Satisfying anticipation with liquid elegance and sensory pleasure",
    technicalSpecs: "Nikon D850, 85mm f/1.8 at f/4, ISO 400, backlit strobe"
  },
  {
    name: "Breakfast Ritual",
    category: "lifestyle",
    reference: "Kinfolk Magazine morning rituals, Cereal Magazine design-conscious living, wellness influencer morning routines",
    lighting: "Golden hour morning light, soft window glow, peaceful illumination",
    composition: "Lifestyle context, product as enabler, human element subtle",
    mood: "Serene morning optimism with intentional living and quiet luxury",
    technicalSpecs: "Canon EOS R5, 50mm f/1.2 at f/2.0, ISO 400, window light"
  },
  {
    name: "Noma Nordic Gastronomy",
    category: "food",
    reference: "Noma restaurant's New Nordic cuisine photography by Ditte Isager, Copenhagen culinary scene, Michelin star plating aesthetic, foraging and wild ingredients storytelling, René Redzepi culinary philosophy visualization, seasonal Nordic ingredients celebration, gastronomic innovation documentation",
    lighting: "Cool Nordic natural light at 5800K creating clean Scandinavian aesthetic, soft diffused daylight through large windows, minimal contrast maintaining delicate ingredient details, cool blue undertones suggesting Nordic purity, natural authentic illumination",
    composition: "Minimalist Scandinavian plating with ingredients as heroes, foraged elements (moss, flowers, wild herbs) artfully placed, negative space abundant emphasizing each ingredient's importance, rustic natural surfaces (stone, wood, ceramics), artistic plating showing culinary craftsmanship, rule of thirds with intentional asymmetry",
    mood: "Nordic culinary innovation, wild nature connection, gastronomic artistry, seasonal ingredient respect, foraging culture celebration, culinary philosophy depth",
    technicalSpecs: "Hasselblad H6D, 80mm at f/5.6, ISO 200, Nordic natural window light, cool color temperature"
  },
  {
    name: "Ferran Adrià Molecular Gastronomy",
    category: "food",
    reference: "ElBulli molecular gastronomy by Francesc Guillamet, Ferran Adrià culinary innovation Gold Cannes Lions campaigns, spherification and foam techniques visualization, avant-garde cuisine photography, culinary science meets art, molecular gastronomy movement documentation",
    lighting: "Clean precision lighting at 5500K emphasizing molecular technique details, soft overhead illumination revealing texture transformations, subtle side light showing foam delicacy, scientific precision lighting, clinical brightness suggesting culinary laboratory",
    composition: "Extreme close-up of molecular techniques (spheres, foams, gels), scientific precision in plating, avant-garde presentation challenging food conventions, molecular transformation visible, artistic plating on modern ceramics, culinary innovation as visual surprise",
    mood: "Culinary science innovation, gastronomic experimentation excitement, molecular technique fascination, avant-garde cuisine revolution, food as chemistry art",
    technicalSpecs: "Canon EOS R5, 100mm f/2.8 macro at f/8, ISO 100, controlled studio precision lighting, focus stacking"
  },
  {
    name: "Massimo Bottura Art Meets Food",
    category: "food",
    reference: "Osteria Francescana plating as contemporary art, Massimo Bottura's 'Oops I Dropped the Lemon Tart' World's 50 Best campaigns, Italian culinary tradition reimagined, food as cultural commentary, gastronomic storytelling, contemporary art meets haute cuisine",
    lighting: "Gallery-style lighting at 5000K treating dish as art installation, dramatic spotlighting on key plating elements, museum-quality illumination, artistic shadows adding depth, sophisticated ambient light suggesting fine dining",
    composition: "Dish plated as contemporary art piece, deconstructed Italian classics with artistic interpretation, cultural references visible through plating, intentional 'imperfection' as artistic statement, negative space as canvas, food philosophy communicated visually",
    mood: "Culinary art fusion, Italian tradition reimagined, gastronomic philosophy depth, food as cultural dialogue, haute cuisine innovation, artistic culinary expression",
    technicalSpecs: "Phase One XF, 80mm at f/8, ISO 100, gallery spotlighting, artistic color grading"
  },
  {
    name: "Yotam Ottolenghi Color Abundance",
    category: "food",
    reference: "Ottolenghi cookbook photography by Jonathan Lovekin, vibrant Middle Eastern vegetable abundance, colorful mezze spreads, vegetarian cuisine celebration, spice market color palette, Plenty cookbook aesthetic, flavor through color visualization",
    lighting: "Bright natural daylight at 5500K emphasizing vegetable color vibrancy, even overhead illumination preventing color dulling, colorful ingredient natural glow, market-fresh lighting, vibrant abundance illumination",
    composition: "Abundant colorful ingredient spreads showing variety and freshness, overhead flat-lay of colorful mezze dishes, rainbow of vegetables and spices, generous portions suggesting abundance, colorful ceramic bowls and serving dishes, market-fresh ingredient celebration",
    mood: "Colorful culinary abundance, vegetarian cuisine celebration, Middle Eastern flavor vibrancy, spice market energy, fresh ingredient joy, generous hospitality",
    technicalSpecs: "Nikon D850, 35mm f/1.8 at f/4, ISO 400, natural bright daylight, vibrant color profile"
  },
  {
    name: "Anthony Bourdain Street Food Adventure",
    category: "documentary",
    reference: "Parts Unknown food documentary aesthetic by Zero Point Zero, street food authenticity celebration, culinary travel photography, local food culture immersion, David Chang Ugly Delicious street scenes, authentic eating experience documentation",
    lighting: "Available authentic street lighting at varying color temperatures, natural market ambiance, neon food stall signs, harsh midday sun or warm evening glow, documentary lighting without manipulation",
    composition: "Candid street food vendor action shots, authentic local eating environment, hands preparing traditional street food, cultural context prominent, unposed authentic food moments, environmental portrait including surroundings",
    mood: "Street food authenticity, culinary adventure spirit, cultural food immersion, local cuisine respect, travel food discovery, authentic eating experience",
    technicalSpecs: "Leica Q2, 28mm f/1.7 at f/2.8, ISO 1600-3200, available street light, documentary approach"
  },
  {
    name: "Chef's Table Cinematic Drama",
    category: "cinematic",
    reference: "Netflix Chef's Table cinematography by David Gelb, dramatic chef portraiture, culinary artistry cinema, kitchen as stage, ingredient close-ups with cinematic depth, culinary documentary aesthetic, food as character",
    lighting: "Cinematic dramatic lighting at 4800K creating emotional depth, chef portrayed with Rembrandt lighting showing dedication, ingredient macro shots with heroic backlighting, kitchen ambient practicals visible, moody atmospheric kitchen illumination",
    composition: "Cinematic chef environmental portrait showing passion and dedication, extreme ingredient close-ups with shallow depth of field, kitchen action captured with film-like movement, hands working with ingredients in heroic framing, culinary craftsmanship celebrated cinematically",
    mood: "Culinary passion drama, chef dedication portrait, ingredient hero worship, kitchen as theater, culinary artistry reverence, food preparation sacred ritual",
    technicalSpecs: "Sony A7SIII, 50mm f/1.2 at f/1.4, ISO 3200, cinematic color grade, anamorphic aesthetic"
  },
  {
    name: "Dominique Ansel Pastry Innovation",
    category: "food",
    reference: "Cronut® viral phenomenon photography, Dominique Ansel Bakery innovation visualization, hybrid pastry creativity, bakery innovation campaigns, Cookie Shot™ playful presentation, pastry chef as inventor, Instagram-worthy pastry moments",
    lighting: "Bright bakery lighting at 5500K showing pastry golden perfection, clean product photography illumination, detail lighting revealing layers and texture, bakery window natural light, appetizing warm glow on baked goods",
    composition: "Innovative pastry hero shots showing unique concept, cross-section revealing internal layers and innovation, pastry held in hands suggesting immediate enjoyment, bakery context suggesting fresh-baked, playful presentation, viral-worthy framing",
    mood: "Pastry innovation excitement, bakery creativity celebration, hybrid concept fascination, sweet innovation joy, Instagram moment capture, playful pastry surprise",
    technicalSpecs: "Canon EOS R5, 100mm f/2.8 macro at f/5.6, ISO 200, bright bakery lighting, appetizing warm grade"
  },
  {
    name: "Burger King 'Moldy Whopper' Honesty",
    category: "food",
    reference: "Burger King 'The Moldy Whopper' Grand Prix Cannes Lions 2020 by INGO Stockholm and David Miami, no preservatives demonstration, food decomposition time-lapse, honest advertising revolution, transparency in food marketing, anti-perfect food photography",
    lighting: "Clinical documentary lighting at 5500K showing decomposition honestly, time-lapse progression lighting consistency, studio photography without beautification, transparent honest illumination, anti-advertising aesthetic lighting",
    composition: "Moldy burger decomposition stages documented clinically, honest food photography without manipulation, time progression sequence, product degradation as transparency proof, anti-perfect food presentation, no-preservatives visual demonstration",
    mood: "Advertising honesty breakthrough, food transparency commitment, anti-perfection movement, ingredient honesty, preservative-free proof, transparent marketing courage",
    technicalSpecs: "Canon EOS R6, 50mm f/1.8 at f/8, ISO 400, clinical studio lighting, unretouched documentary approach"
  },
  {
    name: "Momofuku David Chang Bold Flavor",
    category: "food",
    reference: "Momofuku restaurant bold Asian-fusion aesthetic, David Chang personality-driven food photography, Ssäm Bar irreverent plating, pork bun iconic simplicity, bold flavor visualization, punk-rock culinary attitude",
    lighting: "Bold contrasty lighting at 5200K emphasizing flavor intensity, dramatic shadows suggesting bold taste, natural light with punch, high-contrast illumination matching bold flavors, energetic lighting",
    composition: "Bold simple plating letting ingredients shine, pork belly and bold proteins as heroes, messy authentic eating suggested, hands-on food enjoyment, casual fine dining aesthetic, flavor-forward presentation",
    mood: "Bold flavor confidence, culinary irreverence, Asian-fusion innovation, punk-rock dining energy, authentic bold taste, no-apologies food attitude",
    technicalSpecs: "Fujifilm X-T4, 35mm f/1.4 at f/2.2, ISO 640, natural punchy lighting, bold contrast grade"
  },
  {
    name: "Aperol Spritz Italian Lifestyle",
    category: "beverage",
    reference: "Aperol Spritz 'Aperol Time' global lifestyle campaigns, Italian aperitivo culture, sunset drinking ritual, Venetian lifestyle aesthetic, orange vibrant brand color, summer evening socializing, Italian dolce vita",
    lighting: "Golden hour sunset lighting at 3800K creating warm Italian evening atmosphere, backlight through orange Spritz creating luminous glow, warm terrace lighting, sunset over Italian piazza ambiance, aperitivo hour warm illumination",
    composition: "Aperol Spritz glass with orange slice in Italian lifestyle context (terrace, piazza, waterfront), friends socializing in background suggesting aperitivo culture, sunset visible creating warm atmosphere, Italian architectural elements visible, lifestyle-first product-second framing",
    mood: "Italian dolce vita lifestyle, aperitivo ritual celebration, sunset socializing joy, summer evening relaxation, Italian lifestyle aspiration, aperitivo culture warmth",
    technicalSpecs: "Sony A7III, 35mm f/1.8 at f/2.2, ISO 800, golden hour natural light, warm Italian color grade"
  },
  {
    name: "Coca-Cola Happiness Sharing",
    category: "beverage",
    reference: "Coca-Cola 'Open Happiness' global campaigns, 'Share a Coke' personalization Gold Cannes Lions 2012, polar bears emotional storytelling, happiness visualization, Coca-Cola red brand integration, universal joy moments, sharing and togetherness",
    lighting: "Bright optimistic lighting at 5500K creating happiness atmosphere, warm emotional illumination, backlight creating Coke glow and bubbles, joyful bright lighting, universal happiness ambiance",
    composition: "Coca-Cola in sharing moments (friends, family, celebrations), product with condensation showing cold refreshment, happiness moments with Coke as enabler, red brand color prominently integrated, universal joy scenarios, people smiling and connecting",
    mood: "Universal happiness and joy, sharing and togetherness, refreshment satisfaction, optimistic life celebration, Coca-Cola as happiness enabler, positive emotional connection",
    technicalSpecs: "Canon EOS R5, 50mm f/1.2 at f/2.8, ISO 400, bright optimistic lighting, happiness color grade"
  },
  {
    name: "Stella Artois Chalice Ritual",
    category: "beverage",
    reference: "Stella Artois '9-Step Pouring Ritual' campaigns, Belgian beer tradition, chalice as vessel ritual, beer craftsmanship visualization, Stella Artois premium positioning, beer appreciation culture, slow drinking ritual",
    lighting: "Sophisticated bar lighting at 4800K creating premium ambiance, backlight through golden beer showing clarity and carbonation, rim light on chalice glass, upscale bar atmospheric lighting, premium beer illumination",
    composition: "Stella Artois chalice glass prominently featured showing beer golden color, 9-step pour action captured mid-ritual, bartender hand pouring with precision, perfect beer head visible, Belgian bar or premium environment, ritual and craftsmanship evident",
    mood: "Beer appreciation ritual, Belgian brewing tradition, premium beer craftsmanship, slow drinking sophistication, chalice ritual respect, beer culture elevation",
    technicalSpecs: "Nikon D850, 85mm f/1.8 at f/2.8, ISO 800, premium bar lighting, golden beer color enhancement"
  },
  {
    name: "Heineken Champions League Stadium",
    category: "beverage",
    reference: "Heineken UEFA Champions League partnership campaigns, stadium beer moment, football watching ritual, sports celebration beer, Champions League green brand integration, fan experience photography, beer and football culture",
    lighting: "Stadium lighting at 5500K with match ambient light, television screen glow showing game, sports bar atmosphere, fan celebration lighting, energetic sports viewing illumination",
    composition: "Heineken beer in Champions League viewing context (stadium, sports bar, home with friends), football match visible on screen, fans cheering with beers, Heineken green brand color in sports context, celebration moment capture, communal viewing experience",
    mood: "Sports celebration excitement, football watching ritual, fan camaraderie, Champions League event elevation, communal sports experience, beer as celebration enabler",
    technicalSpecs: "Canon EOS R6, 24-70mm f/2.8 at 35mm f/2.8, ISO 1600, stadium ambient lighting, sports energy grade"
  },
  {
    name: "Corona Extra Beach Sunset Escape",
    category: "beverage",
    reference: "Corona Extra 'Find Your Beach' campaigns, beach sunset relaxation, lime in bottle iconic image, vacation escape visualization, beach lifestyle aesthetic, sunset beer moment, paradise escape marketing",
    lighting: "Beach sunset golden hour at 3500K creating paradise atmosphere, backlight through Corona bottle showing transparency, sunset over ocean visible, warm sand reflections, vacation escape lighting",
    composition: "Corona bottle with lime wedge in beach paradise setting, sunset over ocean in background, bare feet in sand visible suggesting relaxation, beach chair or hammock context, vacation escape visualization, paradise found framing",
    mood: "Beach vacation escape, sunset relaxation, paradise found, stress-free moment, beach lifestyle aspiration, vacation mindset trigger, Corona as escape enabler",
    technicalSpecs: "Sony A7III, 35mm f/1.8 at f/2.8, ISO 400, sunset golden hour natural light, paradise escape grade"
  },
  {
    name: "Guinness 'Good Things Come'",
    category: "beverage",
    reference: "Guinness 'Good Things Come to Those Who Wait' by AMV BBDO Gold Cannes Lions 1999, surfer waiting for perfect wave, patience narrative, 119.5 seconds pour time visualization, Guinness black and white brand, Irish heritage storytelling",
    lighting: "Dramatic cinematic lighting at 4500K creating emotional narrative depth, Irish pub warm atmospheric lighting, Guinness black and white contrast, patient waiting illumination, storytelling mood lighting",
    composition: "Guinness pint with perfect cascading pour and creamy head, patient waiting moment captured, Irish pub atmosphere, 119.5 seconds pour ritual visualization, black and white Guinness brand colors featured, patience and perfection narrative",
    mood: "Patient anticipation reward, good things worth waiting for, Irish pub tradition, Guinness craftsmanship respect, perfect pour satisfaction, patience as virtue narrative",
    technicalSpecs: "Canon EOS R5, 50mm f/1.2 at f/2.0, ISO 1000, Irish pub atmospheric lighting, Guinness B&W grade"
  },
  {
    name: "Pepsi 'Generation Next' Youth Culture",
    category: "beverage",
    reference: "Pepsi 'Generation Next' youth culture campaigns, Pepsi blue brand energy, youth rebellion aesthetic, music and entertainment partnership, celebrity endorsement photography, generational defining moments, cola wars visual language",
    lighting: "Energetic vibrant lighting at 5800K matching youth energy, colorful dynamic illumination, concert or entertainment venue lighting, blue Pepsi brand color integration, youthful vibrant atmosphere",
    composition: "Pepsi in youth culture context (concerts, sports, entertainment events), celebrity or influencer presence, dynamic movement and energy, Pepsi blue brand prominent, generational moment capture, youth lifestyle celebration",
    mood: "Youth culture energy, generational rebellion spirit, entertainment and music connection, young consumer confidence, Pepsi generation identity, pop culture moment",
    technicalSpecs: "Sony A7SIII, 35mm f/1.4 at f/1.8, ISO 2000, concert venue lighting, vibrant youth culture grade"
  },
  {
    name: "Starbucks Third Place Community",
    category: "beverage",
    reference: "Starbucks 'Third Place' between home and work philosophy campaigns, coffee shop community, barista craftsmanship, specialty coffee culture, green brand integration, coffee ritual morning, community gathering space",
    lighting: "Warm coffee shop lighting at 4500K creating cozy community atmosphere, morning natural light through cafe windows, espresso machine steam backlit, comfortable third place illumination, community gathering lighting",
    composition: "Starbucks coffee in third place community context (people working, meeting, connecting), barista crafting coffee visible, green Starbucks brand elements present, coffee shop atmosphere cozy, community gathering visualization, specialty coffee culture",
    mood: "Third place community belonging, coffee ritual comfort, barista craftsmanship appreciation, morning coffee routine, community gathering warmth, specialty coffee culture celebration",
    technicalSpecs: "Fujifilm X-T4, 35mm f/1.4 at f/2.0, ISO 1000, warm cafe ambient lighting, cozy community grade"
  },
  {
    name: "Red Bull 'Gives You Wings' Extreme",
    category: "beverage",
    reference: "Red Bull extreme sports campaigns, 'Gives You Wings' Gold Cannes Lions 1997, Felix Baumgartner space jump, extreme athlete sponsorship, energy drink action sports, adrenaline visualization, Red Bull brand blue and silver",
    lighting: "Extreme sports natural lighting at varying temperatures, action moment dramatic illumination, athlete under pressure lighting, energy drink product in extreme context, adrenaline-pumping lighting",
    composition: "Red Bull can in extreme sports context (skateboarding, BMX, cliff diving, space jumping), athlete mid-action showing extreme feat, product as performance enabler, blue and silver Red Bull brand colors, gives you wings visualization literally or metaphorically",
    mood: "Extreme sports adrenaline, human performance limits pushed, wings metaphor visualization, athletic achievement energy, Red Bull as performance enabler, fear overcome",
    technicalSpecs: "GoPro Hero 11 for POV, Canon EOS R6 for wide shots, various focal lengths, high-speed capture, extreme action grade"
  },
  {
    name: "Nespresso 'What Else' Clooney",
    category: "beverage",
    reference: "Nespresso George Clooney 'What Else?' campaigns, luxury coffee capsule, sophisticated coffee ritual, Nespresso machine as status symbol, espresso perfection, Italian coffee culture premium positioning",
    lighting: "Sophisticated luxury lighting at 5000K creating premium coffee moment, espresso crema backlit showing perfection, upscale environment lighting, Clooney-level sophistication illumination, luxury coffee ritual lighting",
    composition: "Nespresso coffee in luxury context with sophisticated presentation, George Clooney-inspired refinement, espresso cup on premium surface, Nespresso machine visible suggesting technology, crema perfection detail, luxury coffee ritual visualization",
    mood: "Luxury coffee sophistication, Clooney-level refinement, espresso perfection pursuit, premium coffee ritual, Italian coffee culture elegance, what else? rhetorical perfection",
    technicalSpecs: "Phase One XF, 80mm at f/5.6, ISO 100, luxury studio lighting, premium coffee grade"
  },
  {
    name: "Häagen-Dazs Chocolate Fondue Seduction",
    category: "food",
    reference: "Häagen-Dazs sensual chocolate advertising, fondue romantic sharing, premium ice cream seduction campaigns, chocolate indulgence photography, intimate dessert moment, sensory pleasure visualization",
    lighting: "Warm sensual lighting at 4200K creating intimate chocolate moment, chocolate fondue backlit showing glossy texture, romantic low-key illumination, seductive mood lighting, indulgent atmosphere",
    composition: "Chocolate fondue pot with strawberry being dipped, Häagen-Dazs ice cream alongside, intimate sharing moment suggested, hands elegantly dipping, chocolate texture glossy and appetizing, sensual indulgence framing, romantic dessert sharing",
    mood: "Sensual chocolate indulgence, romantic sharing intimacy, premium dessert seduction, chocolate pleasure celebration, intimate sweet moment, sensory indulgence luxury",
    technicalSpecs: "Canon EOS R5, 85mm f/1.2 at f/2.0, ISO 800, warm romantic lighting, sensual chocolate grade"
  },
  {
    name: "Olive Garden 'When You're Here' Family",
    category: "food",
    reference: "Olive Garden 'When You're Here, You're Family' campaigns, Italian-American family dining, unlimited breadsticks culture, casual dining warmth, multi-generational meals, comfort food nostalgia",
    lighting: "Warm family dining lighting at 4500K creating comfort and belonging, restaurant booth cozy illumination, family gathering warmth, comfort food appetizing lighting, home-style atmosphere",
    composition: "Family gathered around Olive Garden table sharing meal, breadsticks and pasta dishes abundant, multi-generational dining visible, warm smiles and connection, Italian-American comfort food featured, family belonging visualization",
    mood: "Family dining warmth, Italian-American comfort, unlimited abundance generosity, multi-generational connection, when you're here you're family belonging, casual dining nostalgia",
    technicalSpecs: "Canon EOS R6, 35mm f/1.8 at f/2.2, ISO 1000, warm restaurant lighting, family comfort grade"
  },
  {
    name: "McDonald's 'I'm Lovin' It' Moment",
    category: "food",
    reference: "McDonald's 'I'm Lovin' It' global campaigns by Heye & Partner, Big Mac iconic close-up, golden arches brand integration, fast food joy moment, universal McDonald's experience, satisfying first bite",
    lighting: "Bright fast food lighting at 5500K creating appetizing appeal, Big Mac hero lighting showing layers, golden fries illumination, McDonald's red and yellow brand colors lighting, satisfying meal moment brightness",
    composition: "Big Mac close-up showing iconic layers (two all-beef patties, special sauce, lettuce, cheese, pickles, onions, sesame seed bun), golden arches visible, first bite moment of satisfaction, McDonald's branded environment, I'm lovin' it expression capture",
    mood: "Fast food satisfaction joy, Big Mac craving fulfillment, McDonald's universal experience, guilty pleasure embrace, I'm lovin' it moment, fast food happiness",
    technicalSpecs: "Sony A7III, 50mm f/1.8 at f/2.8, ISO 400, bright fast food lighting, McDonald's brand colors enhanced"
  },
  {
    name: "Chipotle 'Food With Integrity' Transparency",
    category: "food",
    reference: "Chipotle 'Food With Integrity' campaigns, transparent ingredient sourcing, 'Back to the Start' animation philosophy, fresh ingredient preparation, sustainable farming visualization, assembly line transparency",
    lighting: "Clean transparent lighting at 5500K showing ingredient freshness, assembly line overhead illumination, farm-fresh product lighting, honest food preparation brightness, sustainability-forward lighting",
    composition: "Chipotle fresh ingredients on assembly line, food preparation transparency visible, farm-to-table journey suggested, sustainable ingredients featured, burrito bowl assembly action, ingredient integrity visual proof",
    mood: "Food sourcing transparency, ingredient integrity commitment, sustainable farming respect, fresh preparation honesty, Chipotle values visualization, food with integrity promise",
    technicalSpecs: "Canon EOS R6, 24-70mm f/2.8 at 35mm f/4, ISO 640, clean assembly lighting, fresh ingredient grade"
  },
  {
    name: "Oreo 'Twist Lick Dunk' Ritual",
    category: "food",
    reference: "Oreo 'Twist, Lick, Dunk' eating ritual campaigns, childhood nostalgia, Oreo and milk iconic pairing, playful cookie interaction, Oreo eating methodology, cross-cultural cookie ritual",
    lighting: "Playful bright lighting at 5500K creating childhood nostalgia atmosphere, milk splash backlit showing action, cookie detail lighting, playful ritual illumination, childhood joy brightness",
    composition: "Oreo cookie being twisted apart showing cream filling, cookie dunked in milk glass with splash action, hands performing twist-lick-dunk ritual, childhood nostalgia suggested, playful eating methodology visualization",
    mood: "Childhood nostalgia joy, playful eating ritual, Oreo and milk pairing satisfaction, twist-lick-dunk methodology fun, cookie interaction playfulness, nostalgic treat moment",
    technicalSpecs: "Nikon D850, 105mm f/2.8 macro at f/5.6, ISO 200, playful bright lighting, childhood nostalgia grade"
  },
  {
    name: "KFC 'Finger Lickin' Good' Satisfaction",
    category: "food",
    reference: "KFC 'Finger Lickin' Good' classic campaigns (paused 2020), fried chicken close-up perfection, Colonel Sanders heritage, crispy coating texture, finger-licking satisfaction visualization, fried chicken indulgence",
    lighting: "Warm fried chicken appetizing lighting at 4800K, crispy coating texture detail lighting, golden fried perfection illumination, KFC red brand color integration, satisfying indulgence lighting",
    composition: "KFC fried chicken close-up showing crispy coating texture and juicy interior, hands reaching or finger-licking suggested, Colonel Sanders heritage visible, bucket of chicken abundance, finger lickin' good satisfaction visualization",
    mood: "Fried chicken indulgence satisfaction, finger-licking deliciousness, crispy coating perfection, KFC heritage comfort, guilty pleasure embrace, satisfying comfort food",
    technicalSpecs: "Canon EOS R5, 100mm f/2.8 macro at f/4, ISO 400, warm appetizing lighting, fried chicken perfection grade"
  },
  {
    name: "Häagen-Dazs 'Made Like No Other' Ingredients",
    category: "food",
    reference: "Häagen-Dazs premium ingredient campaigns, 'Made Like No Other' positioning, visible real ingredients (vanilla beans, chocolate chunks, whole strawberries), ingredient transparency, super-premium ice cream category creation",
    lighting: "Premium ingredient detail lighting at 5000K showing quality, macro illumination revealing ingredient authenticity, luxury ice cream lighting, premium positioning brightness, ingredient hero worship lighting",
    composition: "Häagen-Dazs ice cream with premium ingredients prominently visible (whole vanilla beans, large chocolate chunks, real strawberry pieces), macro ingredient detail shots, luxury presentation, ingredient quality transparency, super-premium positioning visualization",
    mood: "Premium ingredient quality pride, made like no other uniqueness, super-premium category elevation, ingredient authenticity celebration, luxury ice cream positioning, uncompromising quality",
    technicalSpecs: "Phase One XF, 120mm macro at f/8, ISO 100, premium ingredient detail lighting, luxury ingredient grade"
  },
  {
    name: "Taco Bell 'Live Más' Youth Culture",
    category: "food",
    reference: "Taco Bell 'Live Más' millennial/Gen Z campaigns, late-night food culture, Doritos Locos Tacos innovation, fast food innovation visualization, youth culture connection, affordable indulgence",
    lighting: "Vibrant youth culture lighting at 5800K, late-night neon ambiance, colorful Taco Bell brand integration, energetic youth lighting, live más energy illumination",
    composition: "Taco Bell innovative products (Doritos Locos Tacos, Crunchwrap Supreme) in youth culture context, late-night food run visualization, friends sharing Taco Bell, purple Taco Bell brand prominent, live más attitude capture",
    mood: "Youth culture live más energy, late-night food culture, affordable indulgence joy, Taco Bell innovation excitement, millennial/Gen Z connection, food innovation celebration",
    technicalSpecs: "Sony A7III, 35mm f/1.8 at f/2.0, ISO 1600, vibrant youth culture lighting, live más energy grade"
  },
  {
    name: "Perrier 'Extraordinaire' French Elegance",
    category: "beverage",
    reference: "Perrier 'C'est Fou' (It's Crazy) French advertising tradition, sparkling water sophistication, green Perrier bottle iconic design, French lifestyle elegance, carbonation bubble artistry, sparkling water premium positioning",
    lighting: "Elegant French lighting at 5200K creating sophistication, backlight through Perrier bottle showing green glass, carbonation bubbles illuminated, elegant French lifestyle lighting, sparkling water premium illumination",
    composition: "Perrier green bottle hero shot showing iconic design, carbonation bubbles rising elegantly, French lifestyle context suggested, slice of lime or lemon, elegant serving presentation, c'est fou artistic interpretation",
    mood: "French sophistication elegance, sparkling water refinement, Perrier green brand distinction, carbonation effervescence celebration, extraordinary moment elevation, French lifestyle aspiration",
    technicalSpecs: "Hasselblad H6D, 80mm at f/11, ISO 100, elegant French lighting, Perrier green enhancement"
  },
  {
    name: "Ben & Jerry's 'Peace, Love & Ice Cream' Activism",
    category: "food",
    reference: "Ben & Jerry's social activism campaigns, 'Peace, Love & Ice Cream' values, Chunky Monkey and Cherry Garcia iconic flavors, Vermont artisan heritage, progressive values visualization, ice cream for social change",
    lighting: "Colorful playful lighting at 5500K matching brand personality, Vermont natural light suggesting artisan roots, social activism energy lighting, peace and love warmth, progressive values brightness",
    composition: "Ben & Jerry's pint with socially conscious flavor name visible, peace symbols and activism messaging, Vermont landscape or activism context, friends sharing ice cream community, colorful playful brand personality, social values visualization",
    mood: "Social activism commitment, peace love and ice cream values, progressive brand personality, Vermont artisan pride, ice cream as vehicle for change, values-driven business celebration",
    technicalSpecs: "Nikon D850, 35mm f/1.8 at f/4, ISO 400, colorful natural lighting, playful activism brand grade"
  },

  // ========== STUDIO PRODUIT GLACES (15 styles au total) ==========
  {
    name: "Häagen-Dazs Premium Luxury",
    category: "studio",
    reference: "Häagen-Dazs 'Extraordinary' global campaigns by creative agency Goodby Silverstein, premium ice cream photography by Per Zennstrom, Magnum 'Pleasure Store' Gold Cannes Lions 2015, Ben & Jerry's 'Cone Together' social campaigns, luxury frozen dessert product photography with visible condensation droplets showing freshness, creamy texture hero shots revealing premium ingredients, Carte d'Or French elegance advertising",
    lighting: "Cold studio lighting with professional frost boxes creating authentic visible condensation, dramatic backlight at 5000K emphasizing ice cream translucency and texture layers, key light positioned 45° highlighting creamy richness and surface details, fill light preventing harsh shadows, creating premium cold fresh atmosphere",
    composition: "Centered hero product shot with tub slightly tilted 15° showing luxurious interior texture, prominent condensation droplets on premium packaging demonstrating freezer freshness, elegant scoop reveal displaying creamy consistency and visible premium ingredients (Madagascar vanilla pods, Belgian chocolate chunks, real fruit pieces), negative space emphasizing product premium isolation",
    mood: "Luxurious indulgence with premium quality promise, sophisticated adult pleasure moment, elevated frozen dessert experience, sensory anticipation of creamy texture",
    technicalSpecs: "Phase One XF 100MP, 120mm macro lens at f/8 for sharp focus front-to-back, ISO 100, studio strobes with softboxes, cold vapor generators, focus stacking 8 images"
  },
  {
    name: "Ben & Jerry's Playful Fun",
    category: "studio",
    reference: "Ben & Jerry's iconic playful packaging photography, 'Cone Together' social activism campaigns, 'Save our Swirled' climate change advertising Bronze Cannes Lions 2015, Vermont artisanal ice cream aesthetic with chunky mix-ins prominently displayed, fun irreverent brand personality, social impact storytelling through product imagery, Unilever Heartbrand global ice cream campaigns",
    lighting: "Bright vibrant studio lighting at 5500K creating fun energetic atmosphere, overhead soft key light eliminating harsh shadows, colorful background gels (blue, pink, yellow) reflecting brand's playful personality, additional rim light creating pop and dimension on swirls and chunks",
    composition: "Dynamic diagonal composition showing pint container with lid playfully removed, exaggerated swirls of ice cream erupting from container, visible chunky mix-ins (cookie dough chunks, brownie pieces, caramel swirls) intentionally messy and abundant, spoon mid-scoop action freeze, fun chaotic energy while maintaining product hero focus",
    mood: "Playful fun irreverence with social consciousness, joyful indulgence without guilt, chunky satisfying texture promise, ice cream as happiness vehicle",
    technicalSpecs: "Canon EOS R5, 85mm f/1.4 lens at f/5.6, ISO 200, high-speed flash freezing action, colorful gels on background lights"
  },
  {
    name: "Magnum Bite Revelation",
    category: "studio",
    reference: "Magnum 'Pleasure' series Gold Cannes Lions 2015 directed by Johan Renck, 'True to Pleasure' global campaign by Lowe London, luxury ice cream bar bite moment photography showing Belgian chocolate shell crack, Magnum Mini indulgence moments, premium frozen dessert cinematography style adapted to still photography, chocolate crack sound visualization",
    lighting: "Dramatic low-key Rembrandt lighting setup creating luxury mood, single powerful key light at 60° angle creating chocolate shell highlight and dramatic crack shadows, subtle backlight separating product from dark background, 4500K warm temperature enhancing chocolate richness and premium feel",
    composition: "Intimate close-up of Magnum bar mid-bite showing satisfying crack in premium Belgian chocolate shell, visible layers of thick chocolate coating and creamy vanilla interior, hand elegantly holding stick showing human indulgence moment, bite taken revealing perfect cross-section, chocolate pieces artfully falling, shallow depth of field isolating moment",
    mood: "Luxurious sensory indulgence, satisfying crack moment anticipation, premium adult treat experience, sophisticated pleasure without guilt",
    technicalSpecs: "Sony A7RIII, 90mm f/2.8 macro at f/4, ISO 400, single strobe with barn doors, black flag negative fill for drama"
  },
  {
    name: "Artisan Gelato Scoop",
    category: "studio",
    reference: "Italian gelato artisan photography tradition, Grom premium gelato campaigns, artisanal ice cream parlor aesthetic from Jeni's Splendid Ice Creams advertising, craft ice cream movement visual identity, farmers market fresh ingredients storytelling, small-batch premium positioning through imagery, traditional metal scoop artistry",
    lighting: "Natural-looking window light simulation at 5200K creating authentic artisanal atmosphere, large softbox as main light source mimicking soft north-facing window, subtle fill maintaining shadows for depth and texture definition, warm practical light in background suggesting artisan shop environment",
    composition: "Artisan metal ice cream scoop loaded with perfectly formed gelato ball showing handcrafted texture with visible ingredients (pistachio pieces, fruit ripples, cocoa nibs), rustic wooden background or marble counter suggesting artisan workshop, additional gelato containers blurred in background, focus on texture ridges from scooping action, authentic imperfect beauty",
    mood: "Authentic artisanal craft pride, handmade quality promise, natural ingredients celebration, nostalgic ice cream parlor memory evocation",
    technicalSpecs: "Fujifilm GFX 100S, 110mm f/2 lens at f/5.6, ISO 200, large octabox soft light, natural wood reflector for warmth"
  },
  {
    name: "Ice Cream Sandwich Stacked",
    category: "studio",
    reference: "Ice cream sandwich product photography from Good Humor campaigns, nostalgic summer treat advertising aesthetic, Klondike Bar 'What would you do?' iconic campaigns, frozen novelty products hero shots, vintage ice cream truck nostalgia reimagined premium, artisan ice cream sandwich trend photography",
    lighting: "Clean bright studio lighting at 5500K creating summer freshness feel, even overhead illumination preventing melt appearance, multiple light sources eliminating all harsh shadows, backlight creating slight glow around edges suggesting cold freshness, cooling gel lighting maintaining frozen look",
    composition: "Stack of 3-4 ice cream sandwiches slightly offset creating dynamic height, top sandwich with perfect bite taken revealing layers (cookie-ice cream-cookie), visible texture contrast between soft cookies and firm ice cream filling, slight intentional melt drip for realism and appetite appeal, summer-bright colorful background",
    mood: "Nostalgic summer treat joy, childhood memory trigger, playful indulgence, refreshing cold satisfaction on hot day",
    technicalSpecs: "Nikon D850, 105mm f/2.8 macro at f/8, ISO 100, multiple studio strobes, white reflector cards, rapid shooting before melt"
  },
  {
    name: "Frozen Dessert Explosion",
    category: "action",
    reference: "Breyers 'Taste Test' dynamic campaigns, ice cream explosion photography trend, Walls/Heartbrand summer refresh advertising, frozen dessert action shots showing ingredients flying, Cornetto cone campaigns with dynamic movement, Popsicle summer fun advertising with water splashes and frozen action",
    lighting: "High-speed flash setup with multiple strobes synchronized to freeze motion at 1/8000s, bright even illumination at 5500K, backlight creating rim light on flying ingredients, dramatic side light adding dimension to ice cream texture mid-air, colorful gels adding summer energy",
    composition: "Explosive dynamic composition with ice cream scoop launched upward, ingredients (berries, chocolate chips, nuts, sauce) flying outward in controlled chaos, frozen motion showing texture and cream density, cone or cup at bottom as launch point, vibrant colorful background suggesting summer fun, all elements sharp and frozen in time",
    mood: "Explosive flavor burst excitement, dynamic summer refreshment energy, playful abundance, cooling sensation visualization",
    technicalSpecs: "Canon EOS-1D X Mark III, 100mm f/2.8 macro at f/11, ISO 100, 1/8000s flash sync, multiple Profoto strobes"
  },
  {
    name: "Ice Cream Cone Drip Moment",
    category: "studio",
    reference: "Classic ice cream cone advertising photography, Dairy Queen soft-serve perfection campaigns, artisan waffle cone photography, gelato cone Italian street food aesthetic, summer ice cream truck nostalgia, soft-serve swirl perfection product shots, deliberate controlled melt moment for appetite appeal",
    lighting: "Soft wrap-around lighting at 5200K creating even illumination on cone and ice cream, overhead key light preventing harsh shadows on delicate swirl, fill light from below bouncing off white surface maintaining texture detail, slight backlight on drip for translucency and visual interest",
    composition: "Classic ice cream cone held at slight angle showing perfect soft-serve swirl on top, waffle cone texture visible and appetizing, single perfect drip running down cone suggesting freshness and imminent melt (appetite trigger), hand partially visible holding cone showing human enjoyment moment, clean simple background keeping focus on product",
    mood: "Classic summer joy nostalgia, simple pleasure moment, racing-against-melt urgency creating appetite, childhood happiness trigger",
    technicalSpecs: "Sony A7III, 85mm f/1.8 lens at f/4, ISO 200, softbox overhead, white bounce cards, shot quickly before natural melt"
  },
  {
    name: "Pint Container Hero Shot",
    category: "studio",
    reference: "Premium pint ice cream packaging photography from Talenti campaigns, Halo Top health-conscious ice cream advertising, artisan ice cream pint branding photography, Netflix & Chill cultural moment advertising, premium freezer section standout photography, pint packaging as canvas for brand storytelling",
    lighting: "Clean product photography lighting at 5000K, three-point lighting setup with key light at 45° highlighting packaging design and frost, fill light preventing shadow detail loss, rim light separating pint from background and creating dimension, cold vapor subtle backlight for freezer freshness suggestion",
    composition: "Centered pint container with lid slightly lifted revealing ice cream texture and colors inside, visible condensation on container sides showing freezer-fresh quality, product label perfectly lit and legible, subtle tilt adding dynamic interest, spoon casually placed suggesting ready-to-eat convenience, clean minimalist background emphasizing premium positioning",
    mood: "Premium indulgence accessibility, sophisticated treat-yourself moment, guilt-free pleasure promise, modern freezer luxury",
    technicalSpecs: "Phase One XF, 80mm lens at f/11, ISO 64, controlled studio lighting, focus stacking for sharp detail throughout"
  },
  {
    name: "Ice Cream Social Sharing Moment",
    category: "lifestyle",
    reference: "Ben & Jerry's 'Cone Together' social campaigns, ice cream as social connector, friends sharing pint photography, communal dessert moment, ice cream bringing people together, social bonding through dessert",
    lighting: "Warm social gathering lighting at 4800K creating friendly atmosphere, soft overhead illumination, cozy evening light suggesting shared moment, warm undertones emphasizing connection",
    composition: "Multiple hands with spoons reaching into shared pint, friends gathered around ice cream, genuine laughter and connection visible, ice cream as centerpiece of social moment, casual authentic gathering, diverse group sharing dessert",
    mood: "Social connection warmth, friendship celebration, shared indulgence joy, communal dessert bonding, ice cream as social glue",
    technicalSpecs: "Canon EOS R6, 35mm f/1.8 at f/2.2, ISO 800, natural social lighting"
  },
  {
    name: "Vegan Ice Cream Plant-Based Pride",
    category: "studio",
    reference: "Oatly ice cream plant-based campaigns, vegan dessert innovation, dairy-free luxury positioning, sustainable indulgence, plant-based ice cream revolution, coconut/oat/almond milk base celebration",
    lighting: "Clean modern lighting at 5500K emphasizing plant-based purity, bright fresh illumination, green-tinted ambient suggesting plant origin, sustainable product lighting, eco-conscious brightness",
    composition: "Ice cream with plant-based ingredients visible (oats, almonds, coconuts), sustainable packaging prominent, plant leaves or botanical elements in frame, eco-friendly presentation, vegan certification visible, plant-based pride messaging",
    mood: "Plant-based innovation pride, sustainable indulgence, dairy-free luxury, environmental consciousness, vegan dessert celebration",
    technicalSpecs: "Sony A7III, 50mm f/1.8 at f/4, ISO 200, bright clean studio lighting"
  },
  {
    name: "Ice Cream Sandwich Nostalgic Summer",
    category: "studio",
    reference: "Good Humor ice cream sandwich nostalgia, childhood summer treat, ice cream truck memories, vintage frozen novelty reimagined premium, artisan ice cream sandwich trend",
    lighting: "Bright summer lighting at 5500K creating nostalgic summer day feel, even illumination preventing melt appearance, cheerful bright lighting, summer sunshine simulation",
    composition: "Stack of artisan ice cream sandwiches with bite taken from top one, cookie texture and ice cream filling clearly visible, slight intentional melt drip for appetite appeal, summer-bright colorful background, nostalgic yet premium presentation",
    mood: "Childhood summer nostalgia, ice cream truck memories, playful indulgence, refreshing summer treat, nostalgic joy",
    technicalSpecs: "Nikon D850, 105mm f/2.8 macro at f/8, ISO 100, bright studio strobes"
  },
  {
    name: "Gelato Italian Artisan Tradition",
    category: "studio",
    reference: "Italian gelato artisan photography, Grom premium gelato campaigns, gelato parlor aesthetic, traditional metal scoop artistry, Italian gelato culture, artisan gelato craftsmanship",
    lighting: "Natural Italian gelateria lighting at 5200K, soft window light simulation, warm practical lights suggesting artisan shop, authentic gelato parlor ambiance",
    composition: "Traditional metal gelato scoop with perfectly formed gelato ball, visible ingredients (pistachio pieces, fruit ripples), rustic Italian marble counter, additional gelato containers blurred background, artisan workshop aesthetic, handcrafted texture evident",
    mood: "Italian artisan craft pride, gelato tradition respect, handmade quality, authentic Italian culture, artisan gelato excellence",
    technicalSpecs: "Fujifilm GFX 100S, 110mm f/2 at f/5.6, ISO 200, natural window simulation"
  },
  {
    name: "Ice Cream Float Retro Diner",
    category: "lifestyle",
    reference: "Classic American ice cream float, retro diner aesthetic, soda fountain nostalgia, 1950s Americana, root beer float tradition, vintage soda shop photography",
    lighting: "Retro diner lighting at 4800K with neon accents, warm nostalgic illumination, vintage soda fountain ambiance, classic American diner atmosphere",
    composition: "Tall glass with ice cream float, vanilla ice cream floating in soda with foam overflowing, striped straw, retro diner counter visible, chrome and red vinyl aesthetic, Americana nostalgia elements",
    mood: "Retro Americana nostalgia, soda fountain memories, 1950s diner charm, classic American treat, vintage soda shop joy",
    technicalSpecs: "Leica Q2, 28mm f/1.7 at f/2.8, ISO 800, retro diner practicals"
  },
  {
    name: "Sorbet Fresh Fruit Vibrant",
    category: "studio",
    reference: "Fresh fruit sorbet photography, vibrant fruit ice cream, healthy frozen dessert, fruit-forward ice cream, natural fruit sorbet, refreshing fruit ice",
    lighting: "Bright vibrant lighting at 5500K emphasizing fruit colors, fresh illumination, colorful fruit enhancement lighting, refreshing brightness",
    composition: "Colorful sorbet scoops with fresh fruit pieces visible, whole fruits surrounding sorbet showing natural ingredients, vibrant color contrast, fresh fruit garnish, healthy dessert presentation, fruit-forward styling",
    mood: "Fresh fruit vitality, healthy indulgence, vibrant refreshment, natural fruit celebration, guilt-free frozen dessert",
    technicalSpecs: "Canon EOS R5, 100mm f/2.8 macro at f/5.6, ISO 200, bright colorful lighting"
  },

  // ========== NOUVEAUX STYLES GLACES CANNES LIONS (10 styles additionnels) ==========
  {
    name: "Häagen-Dazs Seduction Cinématique",
    category: "studio",
    reference: "Häagen-Dazs 'Let Your Tongue Travel' Gold Cannes Lions 2019 by BETC Paris, sensual ice cream advertising cinematography, chocolate seduction campaigns, intimate dessert moments photography, premium indulgence as aphrodisiac visual language, luxury frozen dessert romanticism",
    lighting: "Dramatic chiaroscuro lighting at 3800K creating intimate boudoir atmosphere, single key light from 60° angle creating sensual shadows on melting surface, candlelight warmth suggesting romantic evening, rim light on melting ice cream creating seductive glow, condensation droplets backlit like diamonds",
    composition: "Extreme close-up of spoon entering velvety ice cream surface with slow deliberate movement, melting drops creating sensual patterns on dark marble surface, lips slightly parted in anticipation visible in soft focus background, chocolate sauce creating artistic swirls, intimate framing suggesting private indulgence moment",
    mood: "Sensual chocolate seduction, intimate indulgence ritual, forbidden pleasure anticipation, luxurious adult dessert experience, romantic evening climax",
    technicalSpecs: "RED Komodo 6K, 85mm f/1.2 at f/2.0 for intimate depth, ISO 800, single tungsten key light, black velvet backdrop"
  },
  {
    name: "Ben & Jerry's Activism Explosion",
    category: "studio",
    reference: "Ben & Jerry's 'Justice ReMix'd' social justice campaigns, 'Save Our Swirled' climate activism Bronze Cannes Lions 2015, protest art meets ice cream photography, activist brand storytelling through product, progressive values visualization, ice cream as vehicle for social change",
    lighting: "High-energy strobe lighting at 5800K freezing explosive movement, multiple colored gels (rainbow pride colors) creating activist energy, dramatic backlighting through flying ice cream chunks, UV blacklight making certain elements pop, documentary-style harsh lighting suggesting urgency",
    composition: "Ice cream pint exploding upward with chunks and swirls flying in controlled chaos, protest signs and activist symbols integrated in background, diverse hands reaching for shared pint suggesting community, rainbow of flavors mixing mid-air representing diversity, dynamic diagonal composition suggesting revolution",
    mood: "Activist energy explosion, social justice celebration, progressive values triumph, community solidarity joy, revolutionary ice cream movement",
    technicalSpecs: "Canon EOS-1D X Mark III, 24mm f/1.4 at f/8, ISO 100, 1/8000s with multiple strobes, activist poster backdrop"
  },
  {
    name: "Magnum Double Chocolate ASMR",
    category: "studio",
    reference: "Magnum 'True to Pleasure' ASMR campaigns, chocolate crack sound visualization photography, sensory marketing Gold Cannes Lions 2020, Belgian chocolate shell breaking satisfaction, premium ice cream bar as sensory experience, sound made visible through visual texture",
    lighting: "Precise macro lighting at 4500K revealing chocolate texture micro-details, dual strip lights creating perfect highlight on chocolate shell crack lines, backlight through cracking chocolate showing thickness, focused spot on bite mark, subtle fill maintaining chocolate richness",
    composition: "Ultra-macro shot of teeth marks in Belgian chocolate shell at moment of crack, chocolate shards suspended mid-fall in perfect focus, visible sound waves illustrated through motion blur of falling pieces, creamy vanilla interior revealed like treasure, bite taken at golden ratio point",
    mood: "ASMR satisfaction climax, chocolate crack ecstasy, sensory pleasure peak, premium indulgence breakthrough, auditory-visual synesthesia",
    technicalSpecs: "Hasselblad H6D-100c, 120mm macro at f/11, ISO 50, high-speed flash at 1/8000s, sound-triggered shutter"
  },
  {
    name: "Gelato Artisan Slow Motion Poetry",
    category: "studio",
    reference: "Italian gelato artisan tradition meets modern slow-motion aesthetic, Carpigiani gelato craftsmanship campaigns, artisanal ice cream as performance art photography, slow food movement visualization, Italian dolce vita in frozen time, Grom premium gelato artistic campaigns",
    lighting: "Warm Tuscan golden hour at 3200K streaming through imaginary Italian gelateria window, soft side light emphasizing texture ridges from traditional spatula, practical vintage bulbs creating nostalgic workshop atmosphere, backlight through gelato showing natural ingredient particles",
    composition: "Metal gelato spatula sculpting perfect wave pattern in slow motion capture, visible texture ridges creating mesmerizing patterns, pistachio pieces and fruit ripples suspended in creamy matrix, Italian marble counter reflecting warm light, hands of maestro gelatiere showing decades of expertise",
    mood: "Artisanal poetry in motion, Italian craftsmanship romance, slow food meditation, gelato as sculptural art, nostalgic workshop mastery",
    technicalSpecs: "Phantom TMX 7510 high-speed camera, 85mm f/1.4 at f/2.8, ISO 1600, 10,000 fps capture, warm tungsten practicals"
  },
  {
    name: "Ice Cream Melt Time-Lapse Art",
    category: "experimental",
    reference: "OK Go 'The One Moment' time manipulation aesthetic applied to ice cream, melting as artistic transformation, Sam Taylor-Johnson 'Still Life' time-lapse decay art, ice cream entropy as beauty, transformation photography winning design awards",
    lighting: "Consistent LED panel at 5500K maintaining exposure across 2-hour melt, subtle color temperature shift from 5500K to 4000K showing time passage, rim lighting emphasizing flowing patterns, UV light revealing hidden fluorescent ingredients",
    composition: "Fixed camera position documenting ice cream cone melting over 2 hours compressed to 8 seconds, melting patterns creating abstract art on surface below, colors mixing and separating like living painting, final frame showing beautiful chaos pattern, time as fourth dimension in composition",
    mood: "Beautiful decay poetry, entropy as art form, time transformation beauty, ephemeral dessert philosophy, melting meditation",
    technicalSpecs: "Canon EOS R5 with interval timer, 100mm macro at f/8, ISO 200, 2-hour capture at 30-second intervals"
  },
  {
    name: "Nitrogen Frozen Instant Sculpture",
    category: "experimental",
    reference: "Molecular gastronomy meets ice cream photography, liquid nitrogen instant freezing visualization, Heston Blumenthal theatrical food science, ice cream as chemistry performance, scientific gastronomy Gold Innovation Cannes Lions",
    lighting: "High-speed strobe array at 6500K freezing nitrogen vapor clouds, dramatic backlighting through vapor creating ethereal glow, spot lighting on crystallization moment, practical LED in nitrogen container, scientific precision lighting",
    composition: "Liquid ice cream base hitting -196°C nitrogen creating instant frozen sculpture, vapor clouds billowing dramatically around transformation, crystalline structures forming in real-time, scientific beakers and molecular gastronomy tools visible, transformation from liquid to solid captured mid-process",
    mood: "Scientific transformation wonder, molecular gastronomy theater, instant gratification magic, chemistry as culinary art, frozen sculpture birth",
    technicalSpecs: "Profoto B1X with freeze mode, 50mm f/1.2 at f/4, ISO 400, 1/8000s flash duration, protective housing for equipment"
  },
  {
    name: "Vegan Ice Cream Plant Power",
    category: "lifestyle",
    reference: "Oatly ice cream plant-based revolution campaigns, Ben & Jerry's non-dairy line sustainability photography, vegan dessert as environmental statement, plant-based luxury positioning, sustainable indulgence visualization",
    lighting: "Natural greenhouse lighting at 5200K filtered through plant leaves, green-tinted ambient suggesting plant origin, soft overhead diffusion through greenhouse glass, morning dew on plants creating fresh atmosphere",
    composition: "Ice cream surrounded by source plants (oats, almonds, coconuts) in greenhouse setting, visible plant milk streams flowing toward product, leaves and botanical elements framing composition, sustainable packaging prominent, earth-conscious lifestyle context",
    mood: "Plant-powered indulgence pride, sustainable luxury choice, environmental consciousness, guilt-free pleasure, botanical beauty celebration",
    technicalSpecs: "Fujifilm GFX 100S, 63mm f/2.8 at f/4, ISO 400, natural greenhouse light with reflector fill"
  },
  {
    name: "Childhood Memory Nostalgic Blur",
    category: "emotional",
    reference: "Stranger Things 80s nostalgia aesthetic applied to ice cream, childhood summer memory visualization, ice cream truck emotional triggers, nostalgic advertising Cannes Lions winners, memory-based marketing photography",
    lighting: "Soft nostalgic lighting at 3500K mimicking childhood summer evening, lens flare suggesting memory haze, warm practical lights from imaginary ice cream truck, firefly-like bokeh in background",
    composition: "Slightly out-of-focus edges suggesting memory recall, child's hand reaching for ice cream cone in soft focus, vintage ice cream truck bells visible but blurred, summer elements (sprinkler, bicycle) in dreamy background, intentional light leaks adding to memory feel",
    mood: "Childhood summer nostalgia, innocent joy remembrance, simpler times yearning, ice cream truck excitement, memory lane sweetness",
    technicalSpecs: "Vintage Helios 44-2 lens for swirly bokeh, Canon 5D Mark IV, f/2 wide open, ISO 800, added grain in post"
  },
  {
    name: "Zero Gravity Ice Cream Float",
    category: "conceptual",
    reference: "OK Go zero gravity music video aesthetic, NASA food photography in space, weightless food art trending campaigns, gravity-defying product photography, conceptual advertising Grand Prix Cannes Lions",
    lighting: "Multiple strobes at 5500K freezing floating elements, rim lighting on every floating component, fill from below eliminating gravity shadows, sparkle lights suggesting space environment",
    composition: "Ice cream scoops floating weightlessly with toppings orbiting around them, spoon suspended mid-air with ice cream drop frozen between spoon and cone, sprinkles creating constellation patterns, all elements sharp despite different distances, impossible physics made beautiful",
    mood: "Weightless wonder, gravity-defying joy, space-age dessert, impossible made possible, floating dream state",
    technicalSpecs: "Multiple camera composite technique, 85mm f/1.4 at f/8, ISO 100, 1/8000s with 6 Profoto strobes"
  },
  {
    name: "Ice Cream Social Ritual",
    category: "documentary",
    reference: "Humans of New York storytelling aesthetic, ice cream as social connector documentation, community gathering around frozen treats, authentic moment photography, social documentary Cannes Lions winners",
    lighting: "Available natural light at varying temperatures capturing authentic moments, golden hour community gathering light, neon ice cream shop signs at blue hour, mixed color temperatures showing time passage",
    composition: "Multiple generations sharing ice cream in authentic community setting, hands of different ages reaching for shared sundae, genuine laughter and connection visible, ice cream shop as community hub, environmental portrait including neighborhood context",
    mood: "Community connection warmth, intergenerational bonding, ice cream as social glue, authentic human moments, neighborhood tradition celebration",
    technicalSpecs: "Leica Q2 for discrete documentation, 28mm f/1.7 at f/2.8, ISO 1600-3200, available light only"
  },

  // ========== STUDIO PRODUIT YAOURTS & PRODUITS LAITIERS (14 styles au total) ==========
  {
    name: "Danone Creamy Spoon Lift",
    category: "studio",
    reference: "Danone global yogurt campaigns by Young & Rubicam, 'One Planet One Health' brand positioning, Activia digestive health advertising, Oikos Greek yogurt texture hero shots, yogurt spoon lift revealing creamy consistency, dairy product creaminess visualization, Müller Corner mix-in moment photography, Chobani Greek yogurt lifestyle campaigns",
    lighting: "Soft overhead diffused lighting at 5200K creating natural dairy freshness, key light slightly forward preventing spoon shadow on yogurt, subtle fill maintaining creamy white texture detail, backlight on lifted yogurt creating appetizing translucency and texture highlight",
    composition: "Elegant spoon lifting from yogurt cup mid-action frozen in time, thick creamy yogurt texture clinging to spoon showing premium consistency and protein richness, visible smooth texture and natural color, cup slightly tilted showing full yogurt interior, fresh fruit garnish suggesting natural ingredients, clean white background emphasizing purity and dairy freshness",
    mood: "Creamy satisfaction promise, healthy indulgence without guilt, morning ritual freshness, probiotic wellness benefit visualization",
    technicalSpecs: "Canon EOS R5, 100mm f/2.8 macro at f/5.6, ISO 100, 1/500s freezing spoon lift action, large octabox soft overhead light"
  },
  {
    name: "Yoplait Fruity Fresh Explosion",
    category: "studio",
    reference: "Yoplait fruit-on-bottom campaigns, 'It is so good!' classic advertising, fruit yogurt mix-in moment photography, Activia fruit fusion campaigns, yogurt parfait layering photography, fresh fruit ingredient hero shots, natural fruit pieces suspended in yogurt advertising aesthetic, Liberte organic yogurt campaigns",
    lighting: "Bright vibrant lighting at 5500K emphasizing fresh fruit colors, overhead key light creating even illumination, colored gels (subtle pink/berry tones) enhancing fruit vibrancy, fill light preventing dark shadows in fruit texture, backlight on fruit creating fresh glow",
    composition: "Yogurt cup with fresh berries (strawberries, blueberries, raspberries) bursting from top in controlled explosion, fruit pieces mid-air showing freshness and natural color, visible fruit-yogurt swirl interaction, spoon mid-mix action, yogurt texture showing fruit incorporation, dynamic diagonal composition suggesting mix-in moment, fruit juice droplets frozen in air",
    mood: "Fresh fruity vitality, natural ingredients celebration, vibrant health promise, playful mix-in ritual joy",
    technicalSpecs: "Nikon Z7 II, 105mm f/2.8 macro at f/8, ISO 200, 1/2000s high-speed sync flash, multiple strobes freezing motion"
  },
  {
    name: "Greek Yogurt Protein Power",
    category: "studio",
    reference: "Fage Total Greek yogurt minimalist campaigns, Chobani 'How Matters' brand storytelling, Oikos Triple Zero fitness positioning photography, Greek yogurt thick texture hero shots emphasizing protein content, SKYR Icelandic yogurt strength campaigns, high-protein dairy photography for fitness audience, clean eating visual language",
    lighting: "Clean clinical high-key lighting at 5500K suggesting purity and health, even studio illumination with minimal shadows, white background creating pristine laboratory-clean feel, subtle shadows only for depth, lighting emphasizing thick creamy texture and protein-rich consistency",
    composition: "Bowl or cup of Greek yogurt with spoon standing upright demonstrating thick texture and high protein content, smooth texture showing strain process result, minimal styling keeping focus on product purity, fitness/health props subtly in background (weights, measuring tape, fitness tracker), drop of honey or granola for visual interest, clean minimalist aesthetic",
    mood: "Clean protein power, fitness fuel promise, healthy lifestyle enabler, pure nutrition without compromise",
    technicalSpecs: "Sony A7RIII, 90mm f/2.8 macro at f/11, ISO 100, evenly distributed studio lights, white reflector cards all around"
  },
  {
    name: "Yogurt Bowl Breakfast Perfection",
    category: "lifestyle",
    reference: "Instagram breakfast bowl trend photography, açai bowl aesthetic applied to yogurt, smoothie bowl photography style, Chobani lifestyle marketing campaigns, health influencer breakfast photography, Siggi's Icelandic yogurt simple ingredient focus, overnight oats visual trend, granola and yogurt parfait hero shots",
    lighting: "Natural soft window light at 5200K creating authentic morning breakfast feel, overhead 45° angle mimicking natural daylight, subtle shadows adding depth and dimension, warm practical light in background suggesting kitchen morning atmosphere",
    composition: "Overhead flat-lay of perfectly styled yogurt bowl, Greek yogurt base with artistic arrangement of fresh berries, granola, nuts, seeds, honey drizzle, mint leaves, color contrast creating visual interest, wooden or marble surface suggesting home breakfast ritual, coffee cup partially visible suggesting complete breakfast moment, Instagram-ready aesthetic",
    mood: "Aspirational healthy breakfast ritual, wellness lifestyle visualization, morning self-care moment, nutritious beauty",
    technicalSpecs: "Fujifilm X-T4, 35mm f/1.4 lens at f/2.8, ISO 400, natural window light, white reflector bounce"
  },
  {
    name: "Dairy Milk Pour Studio",
    category: "action",
    reference: "Got Milk? iconic campaigns by Goodby Silverstein, milk mustache celebrity portraits, dairy pour photography showing freshness and movement, milk splash photography techniques, calcium health campaigns showing milk flow, Lactalis dairy group product photography, organic milk packaging campaigns showing farm freshness through pour",
    lighting: "High-speed flash lighting setup at 5500K freezing milk flow at 1/8000s, backlight behind milk stream creating luminosity and translucency, side key light adding dimension to pour texture, minimal shadows keeping clean dairy-fresh feeling, subtle blue background suggesting cold freshness",
    composition: "Dynamic milk pouring action frozen mid-pour, stream of milk showing creamy white texture and natural density, pour creating splash crown in glass or bowl below, background clean and minimal keeping focus on flowing milk, slight mist/splash droplets frozen in air adding dynamism, product carton/bottle partially visible as pour source",
    mood: "Fresh dairy purity, cold refreshment, natural calcium nutrition, wholesome farm-fresh quality promise",
    technicalSpecs: "Canon EOS-1D X Mark III, 100mm f/2.8 macro at f/11, ISO 100, 1/8000s flash sync, multiple Profoto strobes"
  },
  {
    name: "Yogurt Parfait Layers",
    category: "studio",
    reference: "Parfait layering photography from Yoplait and Danone campaigns, yogurt bar assembly advertising, breakfast parfait restaurant menu photography, healthy dessert alternative photography, overnight oats jar trend applied to yogurt parfaits, layered yogurt glass showing ingredients, breakfast meal prep photography aesthetic",
    lighting: "Side lighting at 5200K highlighting layers through glass, key light at 90° angle showing each layer's distinct texture and color, slight backlight creating glow through transparent glass container, fill light preventing harsh shadows, lighting emphasizing layer definition",
    composition: "Clear glass or jar showing distinct beautiful layers of yogurt, granola, fruit compote, and additional yogurt, each layer clearly visible with color and texture contrast, spoon partially in frame suggesting ready-to-eat moment, top garnished with fresh fruit and granola, shot straight-on to emphasize layer perfection, clean background",
    mood: "Organized breakfast satisfaction, layered flavor experience promise, meal prep success, healthy indulgence ritual",
    technicalSpecs: "Sony A7III, 90mm f/2.8 macro at f/5.6, ISO 200, softbox side light, white card fill opposite"
  },
  {
    name: "Fromage Blanc Artisan Texture",
    category: "studio",
    reference: "French fromage blanc artisan photography, European quark dairy product campaigns, fresh cheese texture hero shots, Gervais fresh cheese advertising, artisan dairy product photography emphasizing handmade quality, French fromagerie aesthetic, soft fresh cheese with fruit compote traditional photography",
    lighting: "Soft natural-style lighting at 5200K suggesting artisan dairy farm freshness, diffused overhead light mimicking soft daylight through windows, gentle shadows adding depth to creamy texture, warm undertones suggesting traditional craft quality",
    composition: "Rustic bowl or traditional ceramic containing fresh fromage blanc, spoon showing thick creamy texture, fresh fruit compote (strawberry, apricot) artfully placed alongside or on top, rustic wooden board or marble surface suggesting artisan quality, French countryside aesthetic, herbs or honey for garnish, authentic imperfect styling",
    mood: "Artisan dairy craft tradition, French countryside authenticity, fresh handmade quality, simple ingredient purity",
    technicalSpecs: "Leica SL2, 50mm f/1.4 lens at f/4, ISO 400, natural window light simulation, wooden reflector for warmth"
  },
  {
    name: "Probiotic Yogurt Health Science",
    category: "studio",
    reference: "Activia probiotic health campaigns, digestive health yogurt photography, gut health visualization, probiotic culture scientific photography, health benefit yogurt positioning, wellness yogurt campaigns",
    lighting: "Clean clinical lighting at 5500K suggesting health and science, bright illumination emphasizing purity, health-focused lighting, scientific precision brightness",
    composition: "Yogurt with probiotic culture visualization (microscopic imagery overlay or scientific graphics), health benefit messaging visible, clean white medical-style presentation, scientific credibility elements, wellness positioning clear",
    mood: "Health science confidence, probiotic wellness, digestive health focus, scientific yogurt credibility, gut health commitment",
    technicalSpecs: "Phase One XF, 80mm at f/11, ISO 100, clinical studio lighting, scientific aesthetic"
  },
  {
    name: "Kefir Fermented Culture Tradition",
    category: "studio",
    reference: "Traditional kefir photography, fermented dairy culture, probiotic drink tradition, Eastern European kefir heritage, fermented milk culture celebration, traditional fermentation process",
    lighting: "Natural traditional lighting at 5200K suggesting heritage craft, soft illumination showing kefir texture, authentic fermentation process lighting, traditional dairy culture ambiance",
    composition: "Kefir in traditional glass or bottle, visible kefir grains or culture, fermentation process suggested, traditional Eastern European context, heritage dairy craft elements, authentic cultural presentation",
    mood: "Fermented culture tradition, probiotic heritage, traditional dairy craft, Eastern European authenticity, fermentation process respect",
    technicalSpecs: "Nikon Z7 II, 50mm f/1.4 at f/2.8, ISO 640, natural traditional lighting"
  },
  {
    name: "Skyr Icelandic Protein Power",
    category: "studio",
    reference: "Icelandic Skyr protein photography, Viking heritage dairy, high-protein Icelandic yogurt, Nordic dairy tradition, Skyr thick texture hero shots, Icelandic dairy culture",
    lighting: "Cool Nordic lighting at 5500K suggesting Icelandic origin, clean bright illumination, Nordic purity lighting, Icelandic dairy freshness",
    composition: "Skyr in bowl showing thick protein-rich texture, spoon standing upright demonstrating thickness, Icelandic landscape or Nordic elements suggested, Viking heritage subtle references, high-protein positioning clear",
    mood: "Icelandic heritage pride, Viking protein power, Nordic dairy tradition, high-protein strength, Icelandic purity",
    technicalSpecs: "Canon EOS R5, 85mm f/1.4 at f/4, ISO 200, cool Nordic lighting aesthetic"
  },
  {
    name: "Lassi Indian Yogurt Drink",
    category: "beverage",
    reference: "Indian lassi traditional photography, mango lassi vibrant colors, yogurt drink Indian culture, traditional Indian dairy beverage, lassi cultural authenticity, Indian street food beverage",
    lighting: "Vibrant Indian market lighting at 5500K, colorful illumination, traditional Indian ambiance, street food energy lighting, cultural authenticity brightness",
    composition: "Lassi in traditional Indian glass or clay cup, mango or fruit visible showing flavor, Indian cultural context elements, traditional serving style, vibrant colors (mango yellow, rose pink), cultural authenticity emphasized",
    mood: "Indian cultural tradition, lassi refreshment joy, traditional yogurt drink, Indian street food energy, cultural beverage authenticity",
    technicalSpecs: "Sony A7III, 50mm f/1.8 at f/2.8, ISO 400, vibrant cultural lighting"
  },
  {
    name: "Yogurt Smoothie Healthy Lifestyle",
    category: "lifestyle",
    reference: "Yogurt smoothie health photography, protein smoothie fitness, post-workout yogurt drink, healthy lifestyle smoothie, fitness nutrition photography, active lifestyle yogurt beverage",
    lighting: "Bright healthy lifestyle lighting at 5500K, energetic illumination, fitness-focused brightness, active lifestyle lighting, health and wellness ambiance",
    composition: "Yogurt smoothie in modern glass or bottle, fitness context visible (gym equipment, yoga mat, running shoes), fresh fruit and healthy ingredients visible, active lifestyle setting, health-conscious presentation, post-workout refreshment suggested",
    mood: "Fitness nutrition energy, healthy lifestyle commitment, post-workout refreshment, active wellness, protein power confidence",
    technicalSpecs: "Canon EOS R6, 35mm f/1.8 at f/2.8, ISO 640, bright fitness lifestyle lighting"
  },
  {
    name: "Artisan Yogurt Small-Batch Craft",
    category: "studio",
    reference: "Small-batch artisan yogurt photography, craft dairy producer, local yogurt maker, artisan dairy craftsmanship, handmade yogurt quality, local dairy pride",
    lighting: "Warm artisan lighting at 4800K suggesting handmade craft, natural workshop light, artisan dairy ambiance, craft producer authenticity lighting",
    composition: "Artisan yogurt in glass jar with handwritten label, small-batch production elements visible, craft dairy tools suggested, local producer authenticity, handmade quality evident, artisan workshop aesthetic",
    mood: "Artisan craft pride, small-batch quality, local dairy support, handmade yogurt excellence, craft producer dedication",
    technicalSpecs: "Fujifilm X-T4, 35mm f/1.4 at f/2.2, ISO 800, warm artisan lighting"
  },

  // ========== AGRICULTURE ET AGROALIMENTAIRE (6 styles) ==========
  {
    name: "Organic Farm Golden Hour",
    category: "agriculture",
    reference: "Whole Foods 'Values Matter' campaign by Deutsch NY, Chipotle 'Back to the Start' Gold Cannes Lions 2012 animation with farm footage, Patagonia Provisions regenerative agriculture storytelling, organic farming documentary aesthetic from Kiss the Ground Netflix documentary, farm-to-table restaurant supplier photography, sustainable agriculture visual language, farmer as hero protagonist campaigns like John Deere 'Nothing Runs Like a Deere'",
    lighting: "Golden hour natural sunlight at 3200K creating warm authentic agricultural glow, backlight creating rim light on crops and farmer silhouette, soft fill from sky maintaining shadow detail in foreground, dust particles visible in golden light rays showing active farming, natural warmth emphasizing organic earth connection",
    composition: "Wide establishing shot showing farmer in field with crops at golden hour, rule of thirds with farmer positioned at intersection point, vast agricultural landscape showing scale and natural beauty, leading lines from crop rows creating depth perspective, environmental portrait showing human-land connection, horizon line placed at lower third emphasizing expansive sky",
    mood: "Authentic agricultural heritage pride, sustainable farming hope and optimism, deep connection to earth and natural cycles, farmer as guardian of land, wholesome organic promise, hard work dignity",
    technicalSpecs: "Canon EOS R5, 24-70mm f/2.8 lens at 35mm f/5.6, ISO 400, natural golden hour light, circular polarizing filter for sky contrast"
  },
  {
    name: "Harvest Documentary Authentic",
    category: "agriculture",
    reference: "National Geographic agricultural photography aesthetic, Farm Aid documentary campaigns, harvest season photography tradition, agricultural cooperative branding photography, Monsanto (now Bayer) farmer-focused campaigns, seed company harvest yield photography, agricultural magazine editorial style like Modern Farmer publication",
    lighting: "Natural overcast daylight at 5500K providing even soft illumination without harsh shadows, diffused cloud cover creating perfect conditions for documentary work, subtle directional light showing texture of harvested crops, authentic available light maintaining documentary integrity",
    composition: "Documentary-style candid moments during harvest, hands holding harvested crops in close-up showing product of labor, shallow depth of field isolating subject from background, authentic unposed moments capturing real farm work, environmental context showing scale of operation, worker-centric framing celebrating labor",
    mood: "Documentary authenticity celebrating farm labor, harvest season abundance satisfaction, agricultural community pride, honest portrayal of farming reality, seasonal rhythm connection, food source transparency",
    technicalSpecs: "Nikon D850, 50mm f/1.4 lens at f/2.8, ISO 800, natural overcast light, no flash for authenticity"
  },
  {
    name: "Farm-to-Table Journey",
    category: "agriculture",
    reference: "Farm-to-table restaurant marketing campaigns, Blue Apron ingredient sourcing storytelling, local farm CSA (Community Supported Agriculture) photography, farmers market lifestyle photography, organic produce supply chain transparency campaigns, farm product traceability visual storytelling, seed-to-plate narrative photography",
    lighting: "Soft natural window light at 5200K mimicking farmer's market ambiance, gentle overhead illumination showing fresh produce colors and texture, minimal shadows keeping focus on product freshness, backlight creating glow on fresh vegetables and fruits suggesting vitality",
    composition: "Journey narrative showing produce from field to table, macro shots of fresh harvested vegetables with soil still visible showing authenticity, farmer's hands presenting fresh produce to camera, wooden crates and baskets suggesting artisan harvest, shallow focus on hero product with blurred farm background, connection between land and food emphasized",
    mood: "Fresh local connection celebrating short supply chains, transparent sourcing trust, community agriculture support, seasonal eating celebration, know-your-farmer intimacy, wholesome food origins",
    technicalSpecs: "Fujifilm X-T4, 35mm f/1.4 lens at f/2.2, ISO 400, natural window light, warm white balance for organic feel"
  },
  {
    name: "Agricultural Technology Precision",
    category: "agriculture",
    reference: "John Deere precision agriculture technology campaigns, agricultural drone photography aesthetic, smart farming technology advertising, AgTech startup visual identity, precision irrigation system photography, GPS-guided equipment campaigns, modern farming technology integration visual language, agricultural innovation photography",
    lighting: "Clean modern lighting at 5500K suggesting technological advancement, drone aerial photography with even daylight illumination, equipment detail shots with studio-quality lighting showing precision engineering, blue hour timing for dramatic agricultural technology shots with equipment lights visible",
    composition: "Aerial drone perspective showing precision farming patterns and technology at work, modern agricultural equipment featured prominently showing innovation, GPS screens and technology interfaces visible showing data-driven farming, wide shots showing scale of modern agricultural operations, equipment isolated against sky showing engineering beauty",
    mood: "Agricultural innovation optimism, precision farming efficiency pride, technology-enabled sustainability, modern farmer confidence, data-driven decision making, future of farming excitement",
    technicalSpecs: "DJI Mavic 3 drone for aerials, Canon EOS R6 with 24-70mm f/2.8 for ground shots at f/5.6, ISO 400, mix of aerial and ground perspectives"
  },
  {
    name: "Sustainable Farming Storytelling",
    category: "agriculture",
    reference: "Patagonia environmental campaigns agricultural focus, regenerative agriculture movement photography, sustainable farming certification campaigns like Organic, Rainforest Alliance visual language, climate-smart agriculture photography, soil health campaign imagery, biodiversity farming visual storytelling, carbon sequestration agriculture campaigns",
    lighting: "Natural authentic outdoor lighting at 5200K showing real farming conditions, soft overcast for even illumination revealing environmental health, golden hour for emotional warmth suggesting hope, practical farming lighting conditions without artificial enhancement preserving authenticity",
    composition: "Environmental context showing sustainable practices in action, cover crops and biodiversity visible in frame, soil close-ups showing health and richness, farmer-land relationship emphasized through environmental portraiture, long-term impact suggested through landscape context, comparison shots showing sustainable transformation",
    mood: "Environmental stewardship pride, regenerative hope for agriculture future, soil health consciousness, biodiversity celebration, climate solution optimism, agricultural heritage preservation with modern sustainability",
    technicalSpecs: "Sony A7III, 24-105mm f/4 zoom at various focal lengths, ISO 400-800, natural light only, earth-tone color grading"
  },
  {
    name: "Artisan Producer Portrait",
    category: "agriculture",
    reference: "Artisan food producer photography tradition, small-batch agricultural product branding, heritage seed keeper portraiture, family farm generational photography, agricultural cooperative member portraits, specialty crop grower profiles, craft agricultural producer storytelling, award-winning farmer portraits from agricultural journalism",
    lighting: "Natural portrait lighting at 5200K creating authentic connection, soft window light for flattering farmer portraiture, golden hour warmth for emotional resonance, environmental lighting showing real farm context, subtle fill maintaining shadow detail in face while preserving authenticity",
    composition: "Environmental portrait showing farmer in natural farm setting, rule of thirds with subject and farm context balanced, direct eye contact creating viewer connection, hands visible showing work and dedication, tools and crops as props telling agricultural story, weathered textures celebrating agricultural labor",
    mood: "Artisan pride in craft and quality, generational farming heritage honor, dedication to land and product, authentic producer-consumer connection, small-batch quality commitment, agricultural craftsmanship celebration",
    technicalSpecs: "Leica Q2, 28mm f/1.7 lens at f/2.8, ISO 400, natural light, subtle vignette in post for focus"
  },

  // ========== ARTISANAT ET MÉTIERS D'ART (5 styles) ==========
  {
    name: "Craftsmanship Hands Detail Macro",
    category: "artisanat",
    reference: "Hermès artisan craftsmanship campaigns by BETC Paris, luxury watch making detail photography like Patek Philippe 'You never actually own a Patek Philippe' campaign, Japanese artisan documentary photography aesthetic, Makers Mark whiskey craft storytelling, artisan skill close-up photography tradition, hand-crafted luxury product campaigns, Brunello Cucinelli Italian craftsmanship focus",
    lighting: "Dramatic side lighting at 4500K creating depth and dimension on hands and tools, hard directional light emphasizing texture of materials being worked, subtle backlight on hands creating separation from background, workshop ambient light visible suggesting authentic artisan environment, shadows adding gravitas to craft",
    composition: "Extreme close-up macro shot of artisan hands at work, shallow depth of field isolating specific craft action, tools and materials in frame showing craft specificity, motion blur on hands suggesting ongoing work and dedication, rule of thirds with hands and work at intersection, negative space allowing focus on craft detail",
    mood: "Meticulous craftsmanship dedication, artisan skill mastery, hand-made quality pride, generational knowledge transmission, patience in craft, attention to detail obsession, authentic artisan tradition",
    technicalSpecs: "Nikon D850, 105mm f/2.8 macro lens at f/4, ISO 800, single strobe with softbox, practical workshop light for ambiance"
  },
  {
    name: "Artisan Workshop Heritage",
    category: "artisanat",
    reference: "Traditional artisan workshop photography from craft guilds, Kinfolk Magazine craft feature aesthetic, heritage craft preservation campaigns, European artisan tradition documentation, artisan collective marketing photography, craft school workshop environment, traditional tool and technique celebration photography, UNESCO intangible heritage craft documentation style",
    lighting: "Natural workshop window light at 5200K creating authentic artisan atmosphere, shafts of light through windows creating dramatic workshop ambiance, warm tungsten practical lights visible suggesting authentic working environment, dust particles visible in light beams adding atmosphere, mixed lighting creating authentic workshop feel",
    composition: "Environmental shot showing artisan in traditional workshop setting, tools and materials organized showing years of practice, layered composition with foreground tools leading to artisan at work, workshop architecture and organization telling craft story, warm inviting framing celebrating craft tradition, authenticity prioritized over perfection",
    mood: "Heritage craft preservation pride, traditional skill honor, workshop as sacred space, artisan community connection, time-honored technique respect, cultural tradition continuation, authentic hand-made process",
    technicalSpecs: "Canon EOS R5, 24-70mm f/2.8 lens at 35mm f/4, ISO 1600, natural window light, warm white balance 4500K"
  },
  {
    name: "Traditional Technique Process",
    category: "artisanat",
    reference: "Process documentation photography from artisan education, step-by-step craft instruction visual language, traditional technique preservation documentation, artisan skill tutorial photography, craft process storytelling for luxury brands, making-of documentary style for artisan products, before-during-after craft transformation photography",
    lighting: "Consistent studio-quality lighting at 5500K for clear process documentation, overhead lighting showing work surface clearly, even illumination for educational clarity, subtle shadows maintaining depth while ensuring process visibility, clean lighting allowing focus on technique",
    composition: "Sequential shots showing craft process stages, hands and tools clearly visible demonstrating technique, overhead flat-lay angle for clear process viewing, close-up detail shots of critical technique moments, clean uncluttered background keeping focus on process, materials and tools organized showing craft precision",
    mood: "Educational transparency celebrating craft learning, process fascination, technique mastery demonstration, craft skill accessibility, making process demystification, artisan knowledge sharing generosity",
    technicalSpecs: "Sony A7RIII, 90mm f/2.8 macro lens at f/8, ISO 200, multiple LED panels for even illumination, focus stacking for depth"
  },
  {
    name: "Handmade Luxury Premium",
    category: "artisanat",
    reference: "Luxury hand-made product photography from brands like Bottega Veneta artisan leather campaigns, bespoke tailoring photography tradition, artisan luxury positioning visual language, hand-crafted premium product hero shots, artisan signature detail photography, luxury craft brand storytelling, limited edition artisan product photography",
    lighting: "Luxurious dramatic lighting at 4800K suggesting premium positioning, soft key light revealing material quality and texture, rim lighting creating premium halo effect, dark background emphasizing luxury through contrast, metallic highlights on tools suggesting craftsmanship value, moody sophisticated lighting",
    composition: "Hero product shot showing finished artisan creation, artisan hands presenting work suggesting personal craft investment, detail shots revealing hand-made quality markers, premium materials visible in frame justifying luxury positioning, signature artisan marks featured, clean sophisticated framing suggesting luxury market",
    mood: "Luxury craftsmanship sophistication, premium hand-made value justification, artisan signature quality pride, bespoke personalization, limited edition exclusivity, investment piece positioning, refined taste celebration",
    technicalSpecs: "Phase One XF, 80mm lens at f/8, ISO 100, controlled studio lighting with Profoto strobes, dark luxury backdrop"
  },
  {
    name: "Heritage Craft Storytelling",
    category: "artisanat",
    reference: "Heritage craft brand storytelling campaigns, generational artisan family narratives, cultural craft tradition marketing, artisan legacy documentation photography, craft history visualization, traditional craft modern relevance campaigns, artisan master-apprentice relationship photography, cultural heritage craft celebration",
    lighting: "Warm nostalgic lighting at 4200K suggesting heritage and tradition, natural soft light creating timeless feel, subtle window light evoking generational continuity, warm practical lights visible suggesting long craft history, golden hour warmth for emotional heritage connection",
    composition: "Generational composition showing young and old artisans together, heritage tools and modern work coexisting, workshop as living museum with historical context visible, master-apprentice interaction captured, craft spanning time suggested through layered composition, cultural context visible in frame",
    mood: "Heritage pride and cultural continuity, generational craft knowledge transmission, tradition respect meeting modern relevance, craft legacy preservation, cultural identity through craft, authentic heritage celebration, artisan lineage honor",
    technicalSpecs: "Leica M10, 50mm f/1.4 lens at f/2.8, ISO 800, natural light, warm color grade, subtle vintage tone"
  },

  // ========== AUTOMOBILE (8 styles) ==========
  {
    name: "Luxury Vehicle Studio Reflection",
    category: "automobile",
    reference: "Mercedes-Benz 'The Best or Nothing' global campaigns by Merkley + Partners, BMW 'The Ultimate Driving Machine' iconic photography, Audi 'Vorsprung durch Technik' precision engineering visual language, luxury automotive studio photography tradition, Rolls-Royce bespoke craftsmanship campaigns, Porsche design heritage photography, automotive brand image advertising",
    lighting: "Dramatic studio lighting at 5000K with multiple strobes creating perfect reflections on vehicle paint, graduated lighting from key light positioned 45° emphasizing vehicle curves and design lines, fill lights preventing harsh shadow detail loss, specialized automotive lighting equipment creating signature catchlights in chrome and glass, backlight separating vehicle from background",
    composition: "Three-quarter front angle showing vehicle's most dynamic design perspective, low camera angle emphasizing power and presence, reflective studio floor creating dramatic mirror effect doubling visual impact, clean gradient background keeping focus on vehicle design, negative space emphasizing vehicle as sculpture, precise framing showing design intention",
    mood: "Luxury aspiration with engineering excellence, premium craftsmanship pride, automotive design as art form, sophisticated power, performance promise through visual presence",
    technicalSpecs: "Phase One XF 100MP, 35mm tilt-shift lens at f/11, ISO 64, multiple Profoto strobes with graduated filters, 20-image focus stack"
  },
  {
    name: "Dynamic Motion Panning",
    category: "automobile",
    reference: "Formula 1 racing photography aesthetic, automotive magazine action shots tradition, performance vehicle dynamic advertising like Dodge 'Brotherhood of Muscle' campaigns, sports car motion blur photography, racing heritage visual language, automotive performance storytelling through motion, Top Gear show cinematography style",
    lighting: "Natural daylight at 5500K with vehicle moving through space, available light conditions showing real-world performance environment, motion blur creating dynamic lighting streaks, golden hour timing for dramatic warm tones on moving vehicle, backlight from low sun angle creating rim light on vehicle silhouette",
    composition: "Panning camera technique keeping vehicle sharp while blurring background showing speed, rule of thirds with vehicle positioned leaving negative space ahead suggesting forward motion, low angle emphasizing vehicle's aggressive stance, road and environment blurred creating sense of velocity, motion lines converging creating dynamic energy",
    mood: "Exhilarating speed and performance excitement, dynamic power release, automotive capability demonstration, racing heritage celebration, adrenaline rush visualization",
    technicalSpecs: "Canon EOS-1D X Mark III, 70-200mm f/2.8 lens at 100mm f/8, ISO 400, 1/60s panning technique, continuous autofocus tracking"
  },
  {
    name: "Electric Vehicle Future Clean",
    category: "automobile",
    reference: "Tesla minimalist advertising aesthetic, electric vehicle sustainability campaigns, Rivian adventure EV photography, Lucid Motors luxury electric positioning, EV charging infrastructure photography, sustainable transportation visual language, automotive future technology campaigns, zero-emission vehicle marketing photography",
    lighting: "Clean modern lighting at 5500K suggesting technological advancement and environmental consciousness, soft even illumination emphasizing vehicle's clean design lines, blue-tinted ambient light suggesting electric energy and sustainability, minimal shadows creating pristine high-tech feel, sunrise/sunset light suggesting new automotive dawn",
    composition: "Modern minimalist composition emphasizing vehicle's futuristic design, environmental context showing sustainability (solar panels, wind turbines, nature), charging station presence suggesting infrastructure readiness, clean backgrounds emphasizing vehicle as solution, forward-looking framing suggesting automotive future, technology interface details visible",
    mood: "Sustainable future optimism, clean technology promise, environmental responsibility pride, innovative forward-thinking, silent power elegance, guilt-free luxury mobility",
    technicalSpecs: "Sony A7RIII, 24-70mm f/2.8 lens at various focal lengths f/5.6, ISO 200, natural light with blue color grade in post"
  },
  {
    name: "Classic Car Heritage Nostalgic",
    category: "automobile",
    reference: "Classic car restoration photography, automotive heritage brand campaigns, vintage vehicle auction photography, classic car magazine editorial aesthetic, automotive history celebration, collector vehicle photography tradition, vintage automobile show photography, classic car enthusiast community visual language",
    lighting: "Warm nostalgic lighting at 4200K evoking period authenticity, soft natural light suggesting timeless quality, golden hour warmth creating emotional connection to automotive heritage, practical workshop lights visible suggesting craft and care, vintage-feeling illumination with warm color temperature",
    composition: "Classic three-quarter angle showing vehicle's vintage design heritage, environmental context suggesting era-appropriate setting (vintage garage, classic car show, period-accurate location), detail shots of chrome, badges, vintage craftsmanship, owner or mechanic presence suggesting human story, nostalgic framing celebrating automotive history",
    mood: "Nostalgic appreciation for automotive heritage, vintage craftsmanship respect, classic design timelessness celebration, collector pride, automotive history preservation, golden age automobile romance",
    technicalSpecs: "Leica M10, 35mm f/1.4 lens at f/2.8, ISO 400, natural light, warm vintage color grade, subtle film grain effect"
  },
  {
    name: "Off-Road Adventure Action",
    category: "automobile",
    reference: "Jeep 'Go Anywhere Do Anything' adventure campaigns, Land Rover off-road capability photography, Toyota 4Runner trail-rated advertising, off-road vehicle lifestyle photography, adventure SUV action shots, overlanding photography aesthetic, automotive capability demonstration in nature, outdoor adventure vehicle campaigns",
    lighting: "Natural outdoor adventure lighting at 5200K showing real-world capability environment, dramatic landscape lighting emphasizing environment challenge, dust and splash illuminated by backlight showing action and capability, golden hour warmth suggesting adventure lifestyle, practical vehicle lights visible showing preparedness",
    composition: "Dynamic action shots showing vehicle conquering challenging terrain, environmental scale showing obstacles and capability, vehicle positioned on dramatic angle showing suspension and clearance, splash and dust adding kinetic energy, adventure lifestyle context with camping gear visible, capability demonstration through environmental challenge",
    mood: "Adventure capability confidence, outdoor freedom celebration, rugged reliability promise, escape and exploration excitement, authentic capability demonstration, adventure lifestyle enabler positioning",
    technicalSpecs: "Canon EOS R6, 16-35mm f/2.8 lens at 24mm f/8, ISO 800, fast shutter freezing action, weather-sealed equipment"
  },
  {
    name: "Automotive Detail Craftsmanship",
    category: "automobile",
    reference: "Luxury automotive detail photography, automotive design close-ups, vehicle craftsmanship storytelling like Bentley handcrafted interior campaigns, automotive photography focusing on materials and quality, design detail hero shots, automotive brand differentiation through craft details, luxury vehicle interior photography",
    lighting: "Precision macro lighting at 5000K revealing material quality and craftsmanship, soft directional light showing texture of leather, wood, metal, carbon fiber, graduated lighting preventing hot spots on reflective surfaces, detail illumination showing hand-stitching and premium materials, dramatic shadows adding depth to three-dimensional details",
    composition: "Extreme close-up macro shots of craftsmanship details (stitching, logos, materials), shallow depth of field isolating specific detail from context, texture celebration showing premium material quality, design element abstraction creating artistic interest, craftsmanship process suggestion through composition, detail as design hero",
    mood: "Premium craftsmanship appreciation, luxury materials celebration, attention to detail obsession, hand-made quality pride, automotive artistry recognition, bespoke customization promise",
    technicalSpecs: "Nikon D850, 105mm f/2.8 macro lens at f/5.6, ISO 100, focus stacking 15 images, controlled studio macro lighting"
  },
  {
    name: "Showroom Lifestyle Integration",
    category: "automobile",
    reference: "Premium automotive lifestyle photography, vehicle as lifestyle accessory positioning, luxury brand lifestyle campaigns, automotive showroom experience photography, vehicle ownership lifestyle visualization, premium automotive retail experience, lifestyle integration showing vehicle in aspirational context",
    lighting: "Sophisticated showroom lighting at 5200K creating premium retail ambiance, architectural lighting showing vehicle in luxury environment, warm accent lighting creating inviting atmosphere, premium boutique retail illumination, lifestyle context lighting showing aspirational environment",
    composition: "Vehicle positioned in lifestyle context (upscale urban setting, luxury residence, premium retail space), lifestyle props suggesting target customer aspiration, environmental portraiture including stylish individuals suggesting ownership experience, architectural framing showing vehicle as design object, lifestyle integration suggesting vehicle as life enhancement",
    mood: "Aspirational lifestyle visualization, premium ownership experience promise, sophisticated urban life suggestion, vehicle as status symbol, luxury lifestyle enabler, design object appreciation in life context",
    technicalSpecs: "Sony A7RIII, 24-70mm f/2.8 lens at 35mm f/4, ISO 400, mix of natural and architectural lighting, lifestyle color grade"
  },
  {
    name: "Car Interior Luxury Detail",
    category: "automobile",
    reference: "Luxury automotive interior photography, premium vehicle cabin experience visualization, automotive interior design storytelling, luxury car interior detail campaigns from brands like Lexus 'Experience Amazing', automotive interior craftsmanship photography, premium vehicle interior material showcase, driver experience visualization",
    lighting: "Soft graduated lighting at 4800K creating premium interior ambiance, dashboard illumination from vehicle's own lighting creating authentic cabin atmosphere, window light streaming in suggesting real-world experience, interior accent lighting showing premium materials, warm color temperature suggesting luxury and comfort",
    composition: "Driver's perspective showing luxury interior experience, wide-angle interior shots showing cabin spaciousness and design, detail shots of premium materials (leather, wood, metal), steering wheel and instrument cluster hero shots showing technology, centered symmetrical framing showing interior design balance, human element (hands on steering wheel) suggesting ownership experience",
    mood: "Luxury comfort promise, premium interior experience anticipation, craftsmanship immersion, driver-focused design appreciation, cocoon of luxury sensation, automotive interior as sanctuary",
    technicalSpecs: "Canon EOS R5, 16-35mm f/2.8 lens at 20mm f/4, ISO 800, mixed natural and vehicle interior lighting, HDR bracketing"
  },

  // ========== BANQUE ET FINANCE (6 styles) ==========
  {
    name: "Corporate Trust Professional Portrait",
    category: "finance",
    reference: "Goldman Sachs institutional advertising, JPMorgan Chase 'Making it Real' campaign, financial services professional photography, corporate banking trust visualization, wealth management advisor portraiture, financial institution credibility photography, executive financial leadership campaigns",
    lighting: "Clean professional lighting at 5200K creating trustworthy corporate ambiance, soft key light at 45° creating approachable yet authoritative feel, fill light maintaining facial detail without harsh shadows, subtle rim light adding dimension and professionalism, corporate office ambient light visible in background",
    composition: "Professional environmental portrait showing financial advisor in contemporary office setting, rule of thirds with subject and professional context balanced, direct confident eye contact building viewer trust, business attire immaculate suggesting attention to detail, modern technology visible suggesting innovation, clean professional background without distraction",
    mood: "Trustworthy professionalism with approachable expertise, financial confidence building, institutional stability reassurance, professional competence communication, accessible financial guidance promise",
    technicalSpecs: "Canon EOS R5, 85mm f/1.2 lens at f/2.8, ISO 400, corporate office lighting mix, clean professional color grade"
  },
  {
    name: "Digital Banking Innovation Modern",
    category: "finance",
    reference: "Revolut fintech disruptor campaigns, N26 digital banking visual identity, mobile banking app lifestyle photography, fintech innovation visualization, cashless payment technology photography, digital wallet user experience campaigns, modern banking convenience visual language",
    lighting: "Modern tech-forward lighting at 5500K suggesting innovation and digital future, screen glow from mobile devices creating contemporary ambient light, clean bright illumination suggesting transparency, blue-tinted undertones suggesting technology and security, even lighting removing shadows suggesting openness",
    composition: "Modern lifestyle context showing digital banking in everyday life, mobile phone screen clearly visible showing banking app interface, millennial/Gen Z user demonstrating ease of use, urban contemporary setting suggesting modern lifestyle, minimalist composition focusing on technology interaction, seamless digital experience visualization",
    mood: "Digital innovation excitement, banking convenience celebration, modern financial freedom, tech-savvy confidence, frictionless money management, mobile-first lifestyle enabler",
    technicalSpecs: "Sony A7III, 35mm f/1.8 lens at f/2.2, ISO 800, natural light with screen glow, modern cool color grade"
  },
  {
    name: "Financial Security Confidence",
    category: "finance",
    reference: "Prudential 'Day One Stories' campaign, insurance security visualization, retirement planning peace of mind photography, financial protection family security campaigns, life insurance reassurance visual language, wealth preservation photography, financial safety net visualization",
    lighting: "Warm reassuring lighting at 4800K creating sense of security and comfort, soft natural light suggesting peace of mind, gentle even illumination removing anxiety-inducing shadows, golden hour warmth for emotional reassurance, comfortable home lighting suggesting protected sanctuary",
    composition: "Family-focused lifestyle photography showing financial security results, multi-generational context suggesting long-term protection, comfortable home environment showing assets protected, relaxed authentic moments showing peace of mind, subtle insurance/financial products presence without dominance, emotional security visualization through environmental portrait",
    mood: "Financial security peace of mind, family protection reassurance, future confidence building, worry-free retirement vision, legacy preservation pride, safety net comfort",
    technicalSpecs: "Nikon Z7 II, 50mm f/1.4 lens at f/2.0, ISO 400, natural warm light, emotional warm color grade"
  },
  {
    name: "Investment Growth Aspirational",
    category: "finance",
    reference: "Fidelity investment campaigns, Charles Schwab wealth building visualization, investment growth chart photography, stock market success visualization, wealth accumulation lifestyle photography, financial goals achievement campaigns, investment portfolio growth visual language",
    lighting: "Aspirational bright lighting at 5500K suggesting growth and prosperity, clean modern illumination suggesting clarity and transparency, upward-angled light subtly suggesting growth trajectory, bright optimistic lighting suggesting positive returns, screen glow from trading platforms adding modern context",
    composition: "Growth visualization through graphs and upward trends prominently featured, lifestyle upgrade context showing investment results, modern technology interface visible showing accessibility, aspirational environmental context (luxury items, travel, property), forward-looking framing suggesting future prosperity, achievement visualization through visual metaphors",
    mood: "Financial growth optimism, wealth building excitement, investment returns anticipation, financial independence aspiration, prosperity achievement, long-term wealth vision",
    technicalSpecs: "Canon EOS R6, 24-70mm f/2.8 lens at 50mm f/4, ISO 200, bright modern lighting, aspirational color grade"
  },
  {
    name: "Fintech Disruption Dynamic",
    category: "finance",
    reference: "Square (Block) disruptor campaigns, Stripe payment innovation photography, cryptocurrency exchange visual identity, blockchain technology visualization, peer-to-peer payment photography, fintech startup energy and dynamism, financial technology revolution visual language",
    lighting: "Dynamic energetic lighting at 5800K suggesting disruption and innovation, colorful accent lighting suggesting technological advancement, motion-suggesting illumination creating sense of change, high-key bright lighting removing traditional banking shadows, tech-forward lighting suggesting future of finance",
    composition: "Dynamic composition showing fintech in action, technology interfaces prominently featured showing innovation, young diverse users showing demographic shift, startup environment or modern workspace suggesting disruption, movement and energy in framing, traditional banking conspicuously absent showing disruption",
    mood: "Disruptive innovation excitement, financial democratization energy, technology-enabled freedom, traditional banking liberation, accessible finance revolution, peer-to-peer empowerment",
    technicalSpecs: "Sony A7RIII, 35mm f/1.4 lens at f/2.0, ISO 800-1600, mixed modern lighting, vibrant tech color grade"
  },
  {
    name: "Banking Relationship Human Connection",
    category: "finance",
    reference: "Capital One 'What's in your wallet?' human-focused campaigns, community banking relationship photography, personal banker consultation photography, financial advice human interaction, relationship banking visual language, client-advisor trust visualization, human touch in banking campaigns",
    lighting: "Warm human-connection lighting at 4800K creating interpersonal warmth, soft flattering light on both banker and client creating equity, natural office light suggesting authentic professional environment, warm undertones suggesting relationship beyond transaction, comfortable consultation lighting",
    composition: "Two-person interaction showing banker-client relationship, equal framing showing partnership not hierarchy, consultation setting visible showing professional advice context, documents/screens partially visible showing financial planning process, eye contact or engaged discussion captured showing relationship, comfortable professional setting not intimidating",
    mood: "Human connection in finance, trusted advisor relationship, partnership approach to banking, personalized financial guidance, relationship beyond transaction, accessible professional expertise",
    technicalSpecs: "Canon EOS R5, 50mm f/1.2 lens at f/2.8, ISO 640, natural office light, warm professional color grade"
  },

  // ========== BIENS DE CONSOMMATION (10 styles) ==========
  {
    name: "Consumer Electronics Unboxing Experience",
    category: "consumer_goods",
    reference: "Apple product unboxing aesthetic, tech YouTuber unboxing trend, Samsung Galaxy launch campaigns, consumer electronics first impression photography, product reveal moment capturing, premium tech packaging photography, unboxing experience storytelling",
    lighting: "Clean bright studio lighting at 5500K emphasizing product premium feel, soft overhead illumination revealing packaging layers, detail lighting showing product finish and build quality, minimal shadows keeping focus on reveal moment, bright optimistic lighting suggesting excitement",
    composition: "Hands-in-frame unboxing sequence showing product reveal progression, packaging layers artfully arranged showing unboxing journey, hero product emerging from premium packaging, overhead angle showing complete unboxing scene, accessories visible suggesting value, first-touch moment captured",
    mood: "Anticipation and excitement of new purchase, unboxing satisfaction, premium product reveal, consumer joy moment, new technology eagerness",
    technicalSpecs: "Sony A7III, 50mm f/1.8 lens at f/2.8, ISO 400, bright studio lighting, clean white surface"
  },
  {
    name: "FMCG Retail Shelf Appeal",
    category: "consumer_goods",
    reference: "CPG retail shelf photography, supermarket product placement campaigns, Procter & Gamble shelf visibility studies, retail merchandising photography, point-of-sale visual impact, grocery store product standing-out visual language, FMCG package design in retail environment",
    lighting: "Retail store lighting at 5000K simulating supermarket fluorescent ambiance, even illumination across shelf preventing hotspots, product lighting making hero SKU stand out among competition, clean bright retail environment lighting",
    composition: "Product prominently displayed on retail shelf with competitive context visible, hero product larger or forward-positioned showing shelf dominance, multiple facings suggesting popularity, eye-level placement emphasis, retail environment authentic without clutter",
    mood: "Retail visibility confidence, shelf appeal superiority, consumer choice obviousness, purchase decision facilitation, brand dominance on shelf",
    technicalSpecs: "Canon EOS R6, 24-70mm f/2.8 at 50mm f/5.6, ISO 800, simulated retail lighting"
  },
  {
    name: "Household Products Lifestyle Integration",
    category: "consumer_goods",
    reference: "Method cleaning products lifestyle campaigns, Mrs. Meyer's Clean Day homey aesthetic, household products in real home context, cleaning products lifestyle photography showing product in use, home care integrated naturally in daily life, domestic product authenticity",
    lighting: "Natural home lighting at 5200K creating authentic domestic atmosphere, soft window light suggesting real home environment, warm practical lights visible suggesting evening home routine, comfortable residential lighting",
    composition: "Product integrated naturally in lifestyle home scene, authentic home environment without staged perfection, product in-use or ready-to-use position, human element suggested through lived-in space, relatable domestic setting, product as helpful household member",
    mood: "Domestic comfort and ease, household routine simplification, home care without effort, everyday life enhancement, relatable home reality",
    technicalSpecs: "Fujifilm X-T4, 35mm f/1.4 at f/2.2, ISO 640, natural home lighting"
  },
  {
    name: "Personal Care Daily Ritual",
    category: "consumer_goods",
    reference: "Dove 'Real Beauty' personal care moments, Nivea daily care ritual photography, personal hygiene products intimate moments, bathroom routine lifestyle photography, self-care ritual visualization, morning/evening personal care routine aesthetic",
    lighting: "Soft bathroom lighting at 4800K creating intimate personal moment, natural window light in bathroom suggesting morning routine, warm mirror lighting creating flattering personal space, gentle illumination for self-care moment",
    composition: "Product in bathroom setting ready for use, hands reaching for product showing habitual use, mirror reflection suggesting personal care routine, clean organized bathroom suggesting self-care priority, product placement showing daily accessibility",
    mood: "Personal care ritual comfort, self-care moment tranquility, daily routine reliability, intimate personal moment, hygiene habit satisfaction",
    technicalSpecs: "Canon EOS R5, 50mm f/1.2 at f/2.0, ISO 800, soft bathroom ambient light"
  },
  {
    name: "Home Essentials Organized Abundance",
    category: "consumer_goods",
    reference: "Container Store organization campaigns, Marie Kondo tidying aesthetic, home organization product photography, storage solution satisfaction photography, organized pantry/closet lifestyle trend, home essential products creating order from chaos",
    lighting: "Bright clean lighting at 5500K emphasizing organization and cleanliness, even illumination showing all organized products clearly, optimistic bright lighting suggesting fresh organized start, no harsh shadows in organized space",
    composition: "Beautifully organized products in home storage context, pantry/closet/cabinet showing satisfying organization, products arranged with precision showing organization system success, before-after suggestion through perfect organization, abundance controlled through organization",
    mood: "Organization satisfaction, clutter-free living peace, home system success, controlled abundance, tidying accomplishment pride",
    technicalSpecs: "Sony A7RIII, 24-70mm f/2.8 at 35mm f/5.6, ISO 200, bright even studio lighting"
  },
  {
    name: "Kids Toys Playful Action",
    category: "consumer_goods",
    reference: "LEGO play moment photography, Hasbro toy action shots, kids toys in imaginative play, toy advertising showing play value, children's products joy capture, toy unboxing and play YouTube aesthetic adapted for stills",
    lighting: "Bright colorful lighting at 5500K creating playful energetic atmosphere, vibrant illumination emphasizing toy colors, playful shadows adding dynamism, cheerful bright lighting suggesting fun",
    composition: "Toys in active play scenario, child hands visible showing engagement, multiple toys suggesting play variety, action frozen mid-play, colorful playful environment, imagination visualization through play setup",
    mood: "Playful joy and imagination, childhood fun excitement, toy engagement delight, creative play inspiration, kid happiness celebration",
    technicalSpecs: "Nikon D850, 50mm f/1.4 at f/2.8, ISO 400, bright colorful studio lighting"
  },
  {
    name: "Pet Products Happy Pet Moment",
    category: "consumer_goods",
    reference: "Purina pet food happy pet campaigns, pet product lifestyle photography showing pet satisfaction, pet care products with happy animals, pet toy play moments, pet-owner bonding through products, pet wellness visualization",
    lighting: "Natural warm lighting at 5000K creating comfortable pet-friendly atmosphere, soft illumination flattering for pet photography, outdoor natural light or warm indoor lighting, pet-safe comfortable lighting",
    composition: "Happy pet interacting with product, pet satisfaction evident through body language/expression, product integrated in pet's natural behavior, owner interaction visible suggesting bonding, pet lifestyle context authentic",
    mood: "Pet happiness and wellbeing, pet-owner bond strengthening, pet care satisfaction, animal joy moment, pet life quality enhancement",
    technicalSpecs: "Canon EOS R6, 70-200mm f/2.8 at 135mm f/4, ISO 800, natural light, fast shutter for pet motion"
  },
  {
    name: "Cleaning Products Before-After Transformation",
    category: "consumer_goods",
    reference: "OxiClean dramatic before-after demonstrations, Mr. Clean transformation advertising, cleaning product efficacy proof photography, household cleaning dramatic results, stain removal before-after, cleaning power visualization",
    lighting: "Split lighting showing before (dull/dirty) and after (bright/clean), transformation emphasized through lighting contrast, after side brighter suggesting cleanliness, dramatic lighting emphasizing cleaning result",
    composition: "Side-by-side or split-screen before-after comparison, dirty surface on one side clean on other, product visible showing transformation agent, cleaning action mid-process or completed result, dramatic transformation obvious",
    mood: "Cleaning satisfaction and accomplishment, transformation amazement, product efficacy confidence, cleanliness achievement pride, household care success",
    technicalSpecs: "Sony A7III, 50mm f/1.8 at f/5.6, ISO 200, controlled studio lighting with contrast"
  },
  {
    name: "Home Décor Styled Interior",
    category: "consumer_goods",
    reference: "West Elm lifestyle interior photography, IKEA home furnishing in styled rooms, home décor products in aspirational interiors, interior design product photography, home goods creating beautiful spaces, aspirational home aesthetic",
    lighting: "Natural interior lighting at 5200K creating aspirational home atmosphere, soft window light creating inviting space, warm accent lighting adding coziness, layered lighting creating depth and ambiance",
    composition: "Home décor products styled in beautiful interior setting, room vignette showing products creating beautiful space, products integrated in aspirational yet attainable interior design, lifestyle context showing products elevating home",
    mood: "Home beauty aspiration, interior design achievement, living space elevation, home pride and comfort, design-conscious living",
    technicalSpecs: "Canon EOS R5, 24-70mm f/2.8 at 35mm f/4, ISO 640, natural interior lighting"
  },
  {
    name: "Consumer Packaging Hero Shot",
    category: "consumer_goods",
    reference: "CPG product packaging photography, consumer goods package design showcase, retail-ready packaging hero shots, product packaging standing alone as brand ambassador, package design photography for e-commerce",
    lighting: "Clean studio lighting at 5000K emphasizing packaging design clarity, three-point lighting revealing packaging graphics and materials, rim light separating package from background, even illumination showing label legibility",
    composition: "Product packaging centered and isolated, slight tilt adding dynamic interest, all package faces/information visible, packaging material quality evident, clean simple background keeping focus on package design",
    mood: "Brand identity confidence, packaging design pride, shelf-ready appeal, consumer attraction optimization, purchase decision facilitation through package",
    technicalSpecs: "Phase One XF, 80mm at f/11, ISO 100, controlled studio three-point lighting, white seamless backdrop"
  },

  // ========== COMMUNICATION ET MÉDIAS (7 styles) ==========
  {
    name: "Creative Agency Brainstorm Dynamic",
    category: "media",
    reference: "BBDO creative agency culture campaigns, advertising agency collaborative environment, creative brainstorming session photography, agency teamwork visualization, advertising creative process behind-scenes, campaign development energy capture",
    lighting: "Dynamic office lighting at 5500K suggesting creative energy, mixed natural and practical office lights creating authentic agency atmosphere, whiteboard/screen illumination visible, energetic bright lighting suggesting ideation",
    composition: "Team gathered around table or whiteboard in active brainstorming, sticky notes and sketches visible showing creative process, diverse team showing collaboration, energy and engagement evident through gestures and expressions, agency environment authentic with creative chaos",
    mood: "Creative collaboration energy, ideation excitement, teamwork synergy, advertising creativity in action, campaign development enthusiasm",
    technicalSpecs: "Sony A7III, 24-70mm f/2.8 at 35mm f/2.8, ISO 1600, available office lighting"
  },
  {
    name: "Broadcasting Studio Professional",
    category: "media",
    reference: "CNN broadcast studio photography, BBC news anchor professional setting, television production behind-the-scenes, broadcast journalism professional aesthetic, TV studio technical sophistication, live broadcasting environment",
    lighting: "Professional broadcast lighting at 5600K providing even television-ready illumination, three-point studio lighting setup, dramatic but professional key light, broadcast-quality lighting eliminating unflattering shadows",
    composition: "News anchor or host at broadcast desk with studio visible behind, professional on-camera presence, broadcast equipment visible showing technical sophistication, clean professional studio environment, camera and crew suggestion adding behind-scenes context",
    mood: "Broadcast professionalism and authority, television production sophistication, journalism credibility, live broadcasting intensity, media industry professionalism",
    technicalSpecs: "Canon EOS C300 Mark III, 24-70mm f/2.8 at 50mm f/4, ISO 800, broadcast studio lighting"
  },
  {
    name: "Media Production Behind-Scenes",
    category: "media",
    reference: "Film production behind-the-scenes photography, commercial shoot photography, video production set documentation, production crew at work, filmmaking process visualization, content creation behind-the-curtain",
    lighting: "Production set lighting with practicals visible, dramatic film lighting setup evident, behind-scenes authenticity with work lights and equipment lights, mixed lighting creating authentic production atmosphere",
    composition: "Production crew working with equipment visible, director/cinematographer at work, talent and crew interaction, production equipment (cameras, lights, monitors) prominently featured, set environment showing production scale",
    mood: "Production creativity and craft, filmmaking collaboration, content creation process, behind-scenes authenticity, media production dedication",
    technicalSpecs: "Sony A7SIII, 35mm f/1.4 at f/2.0, ISO 3200, available production set lighting"
  },
  {
    name: "Digital Content Creation Modern",
    category: "media",
    reference: "YouTube creator setup photography, podcast studio aesthetic, content creator workspace, digital media production environment, influencer content creation setup, modern media creation tools",
    lighting: "Modern content creator lighting at 5500K including ring lights and LED panels, screen glow from computers and monitors, contemporary digital production lighting, tech-forward illumination",
    composition: "Content creator at modern production setup, recording equipment visible (microphones, cameras, lights), computer screens showing editing software, contemporary workspace showing digital production tools, creator in action or ready-to-record",
    mood: "Digital content creation energy, modern media making, creator economy participation, independent production empowerment, new media innovation",
    technicalSpecs: "Canon EOS R6, 24-70mm f/2.8 at 35mm f/2.8, ISO 800, LED panel array and screen glow"
  },
  {
    name: "Journalism Documentary Authentic",
    category: "media",
    reference: "Photojournalism tradition, documentary journalism aesthetic, reporter in field, news gathering authenticity, investigative journalism determination, journalistic integrity visualization",
    lighting: "Available natural light maintaining documentary authenticity, environmental lighting showing real reporting conditions, no artificial enhancement preserving journalistic truth, authentic field conditions",
    composition: "Journalist in field conducting interview or reporting, authentic news gathering environment, professional determination evident, notebook/recording device visible, environmental context showing story importance, documentary realism prioritized",
    mood: "Journalistic integrity and determination, truth-seeking commitment, reporting authenticity, news gathering dedication, documentary journalism importance",
    technicalSpecs: "Nikon D850, 24-70mm f/2.8 at various focal lengths f/4, ISO 1600, natural available light only"
  },
  {
    name: "Press Conference Editorial",
    category: "media",
    reference: "Press conference photography, corporate announcement editorial, media event photography, journalist documentation of news events, press briefing professional coverage, news conference visual documentation",
    lighting: "Press conference venue lighting at 5200K, mixed professional event lighting, photographer flash contributing to scene, professional event illumination, podium lighting prominent",
    composition: "Press conference scene with speaker at podium, media photographers visible or suggested, professional event setting, corporate or institutional backdrop, authoritative presentation context, formal announcement environment",
    mood: "Professional news coverage, official announcement gravitas, press event importance, media attention significance, formal communication authority",
    technicalSpecs: "Canon EOS-1D X Mark III, 70-200mm f/2.8 at 135mm f/2.8, ISO 1600, available venue lighting plus flash"
  },
  {
    name: "Podcast Studio Intimate",
    category: "media",
    reference: "Joe Rogan podcast studio aesthetic, NPR podcast production environment, podcast intimate conversation setting, audio content creation space, podcast host-guest dynamic, conversational media intimacy",
    lighting: "Warm intimate podcast lighting at 4500K creating conversational atmosphere, subtle dramatic lighting adding depth, microphone-centric lighting, cozy yet professional studio illumination",
    composition: "Podcast host and guest at microphones in conversation, intimate studio setting, professional audio equipment visible (microphones, headphones, mixing board), conversational positioning across table, comfortable studio environment",
    mood: "Conversational intimacy, authentic dialogue, podcast connection, audio storytelling, intimate media format, deep conversation atmosphere",
    technicalSpecs: "Sony A7III, 50mm f/1.4 at f/2.0, ISO 1600, warm studio practical lighting"
  },

  // ========== INDUSTRIE MANUFACTURIÈRE (7 styles) ==========
  {
    name: "Factory Production Line Precision",
    category: "manufacturing",
    reference: "General Electric manufacturing excellence campaigns, Siemens industrial automation photography, factory production line efficiency visualization, Industry 4.0 smart manufacturing photography, lean manufacturing process documentation, automotive assembly line photography tradition, modern factory floor professional photography",
    lighting: "Industrial facility lighting at 5200K mixed with natural skylights, clean bright factory floor illumination, safety-compliant lighting showing operation visibility, machine work lights visible, overhead fluorescent creating even illumination across production line",
    composition: "Wide shot showing production line scale and efficiency, workers at stations showing human-machine collaboration, automated machinery in operation showing technological advancement, product moving through assembly stages, clean organized factory floor suggesting lean manufacturing, multiple production stages visible showing process flow",
    mood: "Industrial efficiency pride, manufacturing precision, production excellence, modern factory innovation, quality production process, industrial capability confidence",
    technicalSpecs: "Canon EOS R6, 24-70mm f/2.8 at 35mm f/4, ISO 1600, available industrial lighting, fast shutter for machinery motion"
  },
  {
    name: "Industrial Worker Safety Hero",
    category: "manufacturing",
    reference: "Manufacturing worker safety campaigns, industrial PPE advertising photography, factory worker hero portraits, blue-collar worker dignity campaigns, industrial safety equipment photography, manufacturing workforce appreciation visual language, worker-focused industrial photography",
    lighting: "Natural industrial lighting at 5500K showing authentic work environment, safety vest and equipment visibility lighting, portrait lighting flattering worker while maintaining industrial context, practical factory lights creating authentic atmosphere",
    composition: "Worker environmental portrait in factory setting wearing proper safety equipment, direct eye contact showing pride and professionalism, industrial background suggesting scale of operation, safety gear prominently featured, hands and tools visible showing skilled work, confident professional posture",
    mood: "Worker pride and dignity, industrial craftsmanship, safety culture importance, skilled labor respect, manufacturing workforce value, professional industrial expertise",
    technicalSpecs: "Nikon D850, 50mm f/1.4 at f/2.8, ISO 800, available factory lighting with subtle fill, authentic industrial environment"
  },
  {
    name: "Quality Control Detail Macro",
    category: "manufacturing",
    reference: "Manufacturing quality control photography, precision inspection visual documentation, QC process photography, industrial inspection macro photography, quality assurance campaigns, manufacturing precision visualization, defect detection photography for training",
    lighting: "Precision task lighting at 5500K for inspection detail visibility, focused spot lighting on inspection area, magnification lighting showing quality control precision, clean bright lighting eliminating inspection shadows, clinical lighting suggesting quality standards",
    composition: "Extreme close-up of quality inspection in progress, inspector's hands with precision tools visible, product detail under inspection clearly visible, measurement tools or gauges in frame showing precision standards, quality control equipment featured, defect or perfection being verified",
    mood: "Quality assurance confidence, manufacturing precision standards, inspection thoroughness, zero-defect commitment, quality control expertise, production excellence assurance",
    technicalSpecs: "Sony A7RIII, 90mm f/2.8 macro at f/8, ISO 400, focused task lighting, focus stacking for depth"
  },
  {
    name: "Automated Manufacturing Future",
    category: "manufacturing",
    reference: "Industry 4.0 automation photography, robotic manufacturing visualization, smart factory technology campaigns, automated production line photography, industrial robotics in action, future of manufacturing visual language, lights-out manufacturing aesthetic",
    lighting: "Modern industrial lighting at 5500K with LED work lights, robotic equipment LED indicators visible, blue-tinted lighting suggesting high-tech automation, clean bright lighting showing automated precision, machine indicator lights creating futuristic atmosphere",
    composition: "Industrial robots in operation showing automation sophistication, automated assembly process captured mid-cycle, human supervisors monitoring automated systems, computer screens showing production data, clean modern factory floor suggesting advanced manufacturing, technology-human collaboration visible",
    mood: "Manufacturing innovation excitement, automation efficiency, technological advancement pride, future factory vision, Industry 4.0 transformation, smart manufacturing confidence",
    technicalSpecs: "Canon EOS R5, 16-35mm f/2.8 at 24mm f/5.6, ISO 1600, available LED industrial lighting, blue color grade accent"
  },
  {
    name: "Industrial Design Innovation",
    category: "manufacturing",
    reference: "Product design in manufacturing context, industrial design photography, prototype development visualization, engineering design photography, manufacturing R&D visual documentation, product development process photography, industrial innovation storytelling",
    lighting: "Studio-quality lighting in industrial R&D setting at 5500K, design prototype dramatic lighting, engineering workspace illumination, technical drawing and CAD screen glow, innovative lighting suggesting creative engineering process",
    composition: "Product prototype with engineering drawings or CAD models visible, designer/engineer hands working on prototype, technical specifications visible showing precision design, manufacturing tools and materials suggesting production planning, innovation workspace showing creative process, design evolution stages visible",
    mood: "Industrial innovation excitement, engineering creativity, design excellence, manufacturing problem-solving, R&D dedication, product development pride",
    technicalSpecs: "Sony A7III, 50mm f/1.8 at f/2.8, ISO 800, mixed studio and workspace lighting, clean technical aesthetic"
  },
  {
    name: "Supply Chain Logistics Flow",
    category: "manufacturing",
    reference: "Manufacturing logistics photography, supply chain visualization, warehouse operations photography, inventory management visual documentation, just-in-time manufacturing photography, material flow photography, industrial supply chain efficiency campaigns",
    lighting: "Warehouse lighting at 5200K showing logistics operation, forklift lights and safety beacons visible, organized facility illumination, logistics bay lighting, clean industrial warehouse lighting",
    composition: "Warehouse with organized inventory showing supply chain efficiency, material handling equipment in operation, logistics workers managing flow, product staging areas showing organization, supply chain technology (scanners, tablets) visible, efficient space utilization evident",
    mood: "Logistics efficiency confidence, supply chain optimization, organized manufacturing flow, just-in-time precision, warehouse management excellence, industrial logistics pride",
    technicalSpecs: "Nikon Z7 II, 24-70mm f/2.8 at 35mm f/4, ISO 1600, available warehouse lighting, wide coverage showing scale"
  },
  {
    name: "Manufacturing Process Documentary",
    category: "manufacturing",
    reference: "Industrial process documentation photography, manufacturing storytelling campaigns, factory floor documentary aesthetic, production process transparency photography, raw material to finished product journey, manufacturing capability demonstration photography",
    lighting: "Authentic industrial available lighting at 5200K maintaining documentary integrity, natural factory skylights, work station practical lights, process-appropriate lighting without artificial enhancement, real manufacturing environment lighting",
    composition: "Sequential process documentation showing manufacturing stages, raw materials transforming into finished products, authentic factory floor without staging, workers engaged in actual production, production equipment in real operation, environmental context showing manufacturing scale",
    mood: "Manufacturing transparency and authenticity, production process pride, industrial capability demonstration, factory floor reality, manufacturing craftsmanship, production excellence documentation",
    technicalSpecs: "Canon EOS R6, 35mm f/1.4 at f/2.0, ISO 3200, natural industrial lighting, documentary photojournalism approach"
  },

  // ========== ÉDUCATION ET FORMATION (7 styles) ==========
  {
    name: "Classroom Learning Environment",
    category: "education",
    reference: "Educational institution photography, modern classroom environment campaigns, university lifestyle photography, learning space architecture, education facility design showcase, student engagement visualization, contemporary education space documentation",
    lighting: "Natural classroom lighting at 5200K with large windows creating bright learning environment, soft overhead fluorescent supplementing daylight, even illumination across learning space, educational lighting standards met, bright optimistic atmosphere for learning",
    composition: "Wide shot showing modern classroom with students engaged in learning, teacher facilitating collaborative learning visible, contemporary educational technology visible (smartboards, tablets, laptops), flexible learning space furniture arrangement, diverse student body showing inclusive education, collaborative learning activity in progress",
    mood: "Educational excellence and innovation, collaborative learning energy, modern education facility pride, student engagement celebration, inclusive learning environment, future-ready education",
    technicalSpecs: "Canon EOS R6, 24-70mm f/2.8 at 35mm f/4, ISO 640, natural classroom lighting, educational environment aesthetic"
  },
  {
    name: "Higher Education Campus Life",
    category: "education",
    reference: "University campus lifestyle photography, college recruitment campaigns, higher education branding photography, campus architecture showcase, student life documentation, university community visualization, academic institution marketing photography",
    lighting: "Natural outdoor campus lighting at 5500K showing vibrant campus life, golden hour timing for emotional campus beauty, architectural lighting highlighting campus buildings, bright daylight showing active student community, seasonal campus beauty captured",
    composition: "Campus establishing shots showing architectural beauty and scale, students walking between classes showing active campus, iconic campus landmarks featured, diverse student body visible showing inclusive community, campus green spaces and outdoor study areas, university pride and tradition visual communication",
    mood: "Campus community pride, higher education aspiration, university life excitement, academic community belonging, collegiate tradition celebration, future leader development",
    technicalSpecs: "Nikon Z7 II, 24-70mm f/2.8 at various focal lengths f/5.6, ISO 400, natural outdoor campus lighting"
  },
  {
    name: "Online Learning Digital Education",
    category: "education",
    reference: "E-learning platform visual identity, online education campaigns, remote learning photography, digital classroom visualization, EdTech innovation photography, virtual education accessibility, distance learning lifestyle photography",
    lighting: "Modern home office lighting at 5200K showing digital learning environment, laptop/screen glow creating contemporary learning atmosphere, soft natural window light in home learning space, comfortable home lighting suggesting learning accessibility, tech-forward illumination",
    composition: "Student engaged with laptop/tablet in home learning environment, video conference learning visible on screen, comfortable modern home study space, educational technology prominently featured, focused learning posture, accessible education from anywhere visualization",
    mood: "Digital education accessibility, flexible learning empowerment, online education innovation, remote learning convenience, education barrier removal, tech-enabled learning future",
    technicalSpecs: "Sony A7III, 35mm f/1.8 at f/2.2, ISO 800, natural home and screen light mix, modern learning aesthetic"
  },
  {
    name: "STEM Education Innovation",
    category: "education",
    reference: "STEM education campaigns, science laboratory learning, technology education visualization, engineering education photography, mathematics education innovation, robotics and coding education, hands-on STEM learning documentation",
    lighting: "Bright laboratory or maker space lighting at 5500K, technology and equipment screens glowing, clean educational facility illumination, innovation space lighting, STEM learning environment bright and engaging",
    composition: "Students engaged in hands-on STEM activities (robotics, coding, experiments, engineering projects), modern science equipment and technology visible, collaborative STEM learning evident, teacher facilitating inquiry-based learning, problem-solving and innovation in action, diverse students in STEM fields",
    mood: "STEM innovation excitement, hands-on learning engagement, scientific discovery enthusiasm, engineering problem-solving, technology education future, STEM career pathway inspiration",
    technicalSpecs: "Canon EOS R5, 24-70mm f/2.8 at 35mm f/4, ISO 640, bright STEM lab lighting, innovation space aesthetic"
  },
  {
    name: "Early Childhood Education Nurturing",
    category: "education",
    reference: "Preschool and kindergarten photography, early childhood learning environment, play-based learning visualization, child development center campaigns, nurturing early education photography, montessori method visualization, early years foundation stage documentation",
    lighting: "Soft warm lighting at 4800K creating nurturing child-friendly atmosphere, natural window light in early childhood classroom, colorful playful lighting appropriate for young children, bright safe learning environment, gentle illumination for young eyes",
    composition: "Young children engaged in play-based learning activities, nurturing teacher interaction with children, colorful age-appropriate learning materials visible, safe clean early childhood environment, diverse young children learning together, developmental milestone activities featured",
    mood: "Early childhood nurturing care, play-based learning joy, child development support, safe learning environment, foundational education importance, early years curiosity celebration",
    technicalSpecs: "Nikon D850, 35mm f/1.8 at f/2.8, ISO 800, soft natural classroom light, child-friendly warm aesthetic"
  },
  {
    name: "Vocational Training Hands-On Skills",
    category: "education",
    reference: "Vocational education photography, trade skills training documentation, technical college campaigns, apprenticeship program visualization, hands-on skills training photography, career and technical education, skilled trades education promotion",
    lighting: "Workshop and training facility lighting at 5200K, practical work area illumination, hands-on training task lighting, industrial training environment authentic lighting, skill-building workspace illumination",
    composition: "Students learning practical hands-on skills (welding, carpentry, automotive, culinary, electrical), vocational instructor demonstrating technique, professional-grade tools and equipment visible, workshop training environment authentic, career-ready skills development shown, industry-standard training facilities",
    mood: "Vocational skills pride, hands-on learning confidence, trade career pathway, practical education value, skilled workforce development, career-ready training excellence",
    technicalSpecs: "Canon EOS R6, 24-70mm f/2.8 at 35mm f/5.6, ISO 1000, workshop training lighting, vocational education aesthetic"
  },
  {
    name: "Teacher Professional Development",
    category: "education",
    reference: "Teacher training photography, professional development workshops, educator continuing education, teaching excellence campaigns, pedagogical innovation photography, teacher collaboration visualization, educational leadership development photography",
    lighting: "Professional development workshop lighting at 5200K, conference room or training space illumination, collaborative learning environment lighting, professional educational setting, teacher professional growth atmosphere lighting",
    composition: "Teachers engaged in professional development workshop, educator collaboration and idea sharing visible, teaching methodologies being discussed, educational technology training in progress, diverse educator community learning together, teaching excellence commitment evident",
    mood: "Teacher professional growth, educational excellence commitment, pedagogical innovation, educator collaboration, teaching profession pride, continuous learning dedication",
    technicalSpecs: "Sony A7III, 35mm f/1.8 at f/2.8, ISO 800, natural workshop lighting, professional development aesthetic"
  },

  // ========== SANTÉ ET SERVICES SOCIAUX (7 styles) ==========
  {
    name: "Healthcare Professional Compassion",
    category: "healthcare",
    reference: "Hospital healthcare worker campaigns, medical professional portraiture, nurse and doctor compassion visualization, healthcare hero photography tradition, medical staff dedication campaigns, patient care professional photography, healthcare frontline worker appreciation",
    lighting: "Soft medical facility lighting at 5200K creating caring atmosphere, flattering portrait lighting for healthcare professional, hospital corridor or room ambient light, warm undertones suggesting compassion and care, gentle illumination appropriate for medical setting",
    composition: "Healthcare professional environmental portrait in medical setting, compassionate expression and approachable demeanor evident, medical uniform and stethoscope identifying profession, hospital or clinic context visible, direct eye contact creating patient trust, professional confidence balanced with warmth",
    mood: "Healthcare compassion and dedication, medical professional care, patient-centered approach, healthcare hero appreciation, medical expertise with human touch, healing profession pride",
    technicalSpecs: "Canon EOS R5, 85mm f/1.2 at f/2.8, ISO 640, soft hospital ambient lighting, warm professional color grade"
  },
  {
    name: "Hospital Medical Technology",
    category: "healthcare",
    reference: "Hospital medical equipment photography, healthcare technology campaigns, medical device advertising photography, hospital facility modern equipment showcase, healthcare innovation visualization, medical technology in patient care, diagnostic equipment photography",
    lighting: "Clean clinical lighting at 5500K suggesting medical precision, medical equipment screen glow and indicators visible, hospital facility professional illumination, technology-focused lighting showing equipment sophistication, clinical brightness suggesting healthcare standards",
    composition: "Modern medical equipment featured prominently showing technological advancement, healthcare professional operating equipment showing expertise, patient care context with technology supporting treatment, hospital room or examination area showing facility quality, medical monitors and displays visible, clean professional medical environment",
    mood: "Healthcare technology confidence, medical innovation, diagnostic precision, modern medicine capability, patient care advancement, medical facility excellence",
    technicalSpecs: "Sony A7RIII, 24-70mm f/2.8 at 35mm f/4, ISO 800, clean clinical lighting, technical precision aesthetic"
  },
  {
    name: "Patient Care Human Connection",
    category: "healthcare",
    reference: "Patient-doctor relationship photography, healthcare human touch campaigns, medical consultation compassion, patient care bedside manner visualization, healthcare empathy photography, therapeutic relationship documentation, patient-centered care visual language",
    lighting: "Warm caring lighting at 4800K creating comfortable healing environment, soft patient room lighting, compassionate consultation illumination, gentle lighting appropriate for patient comfort, warm undertones emphasizing human connection",
    composition: "Healthcare provider and patient interaction showing caring relationship, gentle touch or reassuring gesture visible, eye contact or engaged conversation evident, medical context present but not dominating, human connection emphasized over clinical setting, patient comfort and dignity prioritized",
    mood: "Healthcare empathy and compassion, healing human connection, patient comfort priority, medical care humanity, therapeutic relationship, healthcare as caring profession",
    technicalSpecs: "Nikon Z7 II, 50mm f/1.4 at f/2.0, ISO 1000, soft natural hospital light, warm empathetic color grade"
  },
  {
    name: "Medical Equipment Clinical Precision",
    category: "healthcare",
    reference: "Medical device product photography, pharmaceutical equipment campaigns, surgical instrument precision photography, medical supply sterile presentation, clinical equipment detail photography, healthcare product commercial photography, medical technology hero shots",
    lighting: "Clinical precision lighting at 5500K emphasizing sterility and precision, even illumination showing medical equipment detail, clean high-key lighting suggesting medical standards, detail lighting revealing equipment quality, sterile environment lighting",
    composition: "Medical equipment isolated showing design and function, sterile presentation suggesting medical-grade quality, equipment detail clearly visible showing precision engineering, clean clinical background, product specifications or uses suggested through composition, professional medical context",
    mood: "Medical precision and sterility, clinical equipment confidence, healthcare quality standards, medical-grade reliability, surgical precision, clinical excellence assurance",
    technicalSpecs: "Phase One XF, 80mm at f/11, ISO 100, controlled clinical studio lighting, pristine sterile aesthetic"
  },
  {
    name: "Mental Health Support Empathy",
    category: "healthcare",
    reference: "Mental health awareness campaigns photography, therapy session visual representation, psychological support visualization, mental wellness campaigns, counseling environment photography, mental health stigma reduction visual language, emotional support service photography",
    lighting: "Soft empathetic lighting at 4500K creating safe comfortable atmosphere, warm gentle illumination suggesting emotional safety, counseling office natural light, non-clinical warm lighting reducing stigma, comfortable therapeutic environment lighting",
    composition: "Therapy or counseling session with supportive interaction visible, comfortable non-clinical setting suggesting accessibility, mental health professional showing empathy, safe space environment evident, emotional support visualization, stigma-free mental health representation",
    mood: "Mental health support compassion, emotional safety, therapy accessibility, mental wellness importance, psychological care empathy, mental health stigma reduction, emotional healing support",
    technicalSpecs: "Canon EOS R6, 50mm f/1.2 at f/2.0, ISO 1000, soft natural light, warm supportive color grade"
  },
  {
    name: "Elderly Care Dignity Respect",
    category: "healthcare",
    reference: "Senior care photography, elderly patient dignity campaigns, nursing home quality care visualization, geriatric care compassion photography, senior citizen healthcare respect, aged care facility photography, elderly patient rights visual language",
    lighting: "Warm respectful lighting at 4800K honoring senior dignity, gentle lighting flattering for elderly subjects, senior care facility comfortable illumination, natural light creating homey atmosphere, warm compassionate lighting",
    composition: "Elderly patient receiving respectful dignified care, caregiver showing compassion and patience, senior care environment comfortable and homelike, elderly person's dignity and personhood evident, intergenerational care visible if appropriate, respect and autonomy prioritized in framing",
    mood: "Elderly care dignity and respect, senior patient honor, aging with grace, compassionate geriatric care, elderly rights protection, quality senior care, aged care excellence",
    technicalSpecs: "Nikon D850, 50mm f/1.4 at f/2.2, ISO 800, soft warm natural light, dignified respectful color grade"
  },
  {
    name: "Community Health Outreach",
    category: "healthcare",
    reference: "Public health campaigns photography, community healthcare outreach visualization, mobile health clinic photography, health education campaigns, preventive care community programs, healthcare accessibility photography, public health initiative documentation",
    lighting: "Natural community setting lighting at 5200K showing authentic outreach context, outdoor public health event lighting, community center ambient light, accessible healthcare setting illumination, authentic available light maintaining documentary feel",
    composition: "Healthcare workers in community setting providing accessible care, diverse community members receiving health services, mobile clinic or community health event, health education in action, public health outreach authenticity, healthcare accessibility demonstration, community engagement evident",
    mood: "Community health commitment, healthcare accessibility, public health dedication, preventive care importance, health equity pursuit, community care outreach, accessible healthcare for all",
    technicalSpecs: "Canon EOS R6, 24-70mm f/2.8 at 35mm f/2.8, ISO 800, natural community lighting, authentic documentary approach"
  },

  // BEAUTY & COSMETICS
  {
    name: "Annie Leibovitz Portrait",
    category: "beauty",
    reference: "Annie Leibovitz iconic portraiture, L'Oréal 'Because You're Worth It', Vanity Fair editorial excellence",
    lighting: "Dramatic directional light, Rembrandt technique, strong shadows",
    composition: "Portrait-focused, subject dominance, emotional connection",
    mood: "Powerful confidence with emotional authenticity and timeless strength",
    technicalSpecs: "Canon EOS R5, 85mm f/1.2 at f/2.0, ISO 200, key light with reflector"
  },
  {
    name: "Peter Lindbergh Raw Beauty",
    category: "beauty",
    reference: "Peter Lindbergh unretouched beauty, Dove 'Real Beauty' campaigns, natural aging celebration",
    lighting: "Soft even lighting, minimal contrast, natural skin rendering",
    composition: "Close portrait, authentic expression, skin texture embrace",
    mood: "Confident authenticity with natural beauty and unretouched pride",
    technicalSpecs: "Leica M10, 50mm f/1.4 at f/2.8, ISO 400, window light"
  },
  {
    name: "Paolo Roversi Ethereal",
    category: "beauty",
    reference: "Paolo Roversi soft focus dreaminess, Dior beauty campaigns, Vogue Italia artistic elegance",
    lighting: "Soft diffused light, dreamy atmosphere, romantic mood",
    composition: "Soft focus, ethereal quality, romantic framing",
    mood: "Dreamlike romance with ethereal elegance and timeless femininity",
    technicalSpecs: "Polaroid 20x24 camera, soft focus filters, natural light"
  },
  {
    name: "Beauty Macro Close-Up",
    category: "beauty",
    reference: "Maybelline lash campaigns extreme close-up, MAC Cosmetics texture focus, beauty vlogger detail revelation",
    lighting: "Ring light illumination, even macro lighting, detail enhancement",
    composition: "Extreme close-up, texture celebration, detail obsession",
    mood: "Intimate revelation with detailed perfection and close-up fascination",
    technicalSpecs: "Nikon D850, 105mm f/2.8 macro at f/11, ISO 100, ring flash"
  },
  {
    name: "Natural No-Makeup",
    category: "beauty",
    reference: "Glossier skin-first philosophy, clean beauty movement, Instagram authentic beauty celebration",
    lighting: "Soft natural daylight, minimal manipulation, authentic rendering",
    composition: "Natural portrait, relaxed expression, authentic moments",
    mood: "Effortless authenticity with natural confidence and skin-first pride",
    technicalSpecs: "Sony A7III, 55mm f/1.8 at f/2.2, ISO 400, window light"
  },
  {
    name: "K-Beauty Glass Skin",
    category: "beauty",
    reference: "Korean beauty glass skin aesthetic, K-beauty glow focus, Asian porcelain skin standards",
    lighting: "Soft diffused light, luminous glow, dewy enhancement",
    composition: "Clean minimal, skin glow focus, radiance emphasis",
    mood: "Luminous perfection with youthful radiance and dewy freshness",
    technicalSpecs: "Canon EOS R5, 85mm f/1.4 at f/2.8, ISO 100, beauty dish"
  },
  {
    name: "Multi-Cultural Beauty",
    category: "beauty",
    reference: "Fenty Beauty inclusive revolution, Rihanna shade inclusivity, universal beauty democracy",
    lighting: "Universal flattering light, diverse skin tone rendering",
    composition: "Diverse representation, cultural celebration, inclusive framing",
    mood: "Inclusive celebration with diverse pride and universal beauty",
    technicalSpecs: "Sony A7RIII, 85mm f/1.8 at f/2.8, ISO 200, calibrated softbox"
  },
  {
    name: "Male Grooming Modern",
    category: "beauty",
    reference: "Gillette 'The Best Men Can Be', men's grooming revolution, male beauty influencer aesthetic",
    lighting: "Clean masculine lighting, defined shadows, confident ambiance",
    composition: "Strong masculine framing, confident posture",
    mood: "Confident modern masculinity with grooming pride and evolved self-care",
    technicalSpecs: "Canon EOS R6, 85mm f/1.8 at f/2.8, ISO 400, directional key"
  },
  {
    name: "Clinical Skincare Science",
    category: "beauty",
    reference: "La Roche-Posay dermatological campaigns, clinical proof aesthetic, pharmaceutical-grade precision",
    lighting: "Clean clinical lighting, high-key setup, medical precision",
    composition: "Clinical precision, scientific credibility, professional trust",
    mood: "Clinical confidence with scientific trust and dermatological authority",
    technicalSpecs: "Phase One XF, 80mm at f/8, ISO 100, even studio lighting"
  },
  {
    name: "Skincare Ritual Zen",
    category: "beauty",
    reference: "Aesop minimalist sophistication, Japanese skincare rituals, spa wellness tranquility",
    lighting: "Soft spa lighting, zen ambiance, peaceful illumination",
    composition: "Minimalist zen, negative space abundance, ritual focus",
    mood: "Zen tranquility with mindful self-care and meditative beauty",
    technicalSpecs: "Fujifilm GFX 50S, 63mm at f/4, ISO 200, soft natural light"
  },

  // LIFESTYLE & FASHION
  {
    name: "Brandon Woelfel Bokeh",
    category: "lifestyle",
    reference: "Brandon Woelfel fairy lights bokeh, urban night photography, Gen Z Instagram aesthetic",
    lighting: "Fairy lights bokeh, urban night lights, magical atmosphere",
    composition: "Bokeh background, subject illuminated, social media ready",
    mood: "Urban magic with youthful wonder and Instagram-worthy moments",
    technicalSpecs: "Sony A7III, 85mm f/1.4 at f/1.4, ISO 1600-3200, city lights"
  },
  {
    name: "Slim Aarons Poolside Luxury",
    category: "luxury",
    reference: "Slim Aarons 'Poolside Gossip', jet-set lifestyle, old money timeless elegance",
    lighting: "Bright sunny daylight, poolside reflection, glamorous sunshine",
    composition: "Luxury lifestyle context, affluent environment, aspirational framing",
    mood: "Sophisticated leisure with old money elegance and timeless luxury",
    technicalSpecs: "Leica M10, 50mm f/1.4 at f/5.6, ISO 100, natural sunlight"
  },
  {
    name: "Murad Osmann Follow Me",
    category: "lifestyle",
    reference: "Murad Osmann #FollowMeTo series, travel couple photography, wanderlust Instagram aesthetic",
    lighting: "Natural travel light, destination ambiance, adventure illumination",
    composition: "POV leading lines, hand-holding perspective, destination context",
    mood: "Wanderlust romance with adventure anticipation and couple connection",
    technicalSpecs: "Canon EOS R6, 16-35mm f/2.8 at 24mm f/5.6, ISO 400"
  },
  {
    name: "Street Style Documentary",
    category: "documentary",
    reference: "Supreme streetwear campaigns, The Sartorialist blog, Louis Vuitton x Supreme cultural collision",
    lighting: "Available street light, urban ambiance, authentic environment",
    composition: "Candid street documentation, fashion spotting, urban context",
    mood: "Urban authenticity with street culture and youth rebellion energy",
    technicalSpecs: "Fujifilm X-Pro3, 35mm f/1.4 at f/2.0, ISO 800-1600"
  },
  {
    name: "Minimalist Wardrobe",
    category: "minimal",
    reference: "Uniqlo lifestyle minimalism, capsule wardrobe aesthetic, minimalist fashion photography",
    lighting: "Clean even lighting, minimal shadows, simple illumination",
    composition: "Minimalist framing, essential focus, clean lines",
    mood: "Calm minimalism with intentional living and curated simplicity",
    technicalSpecs: "Sony A7III, 50mm f/1.8 at f/4, ISO 200, soft diffusion"
  },
  {
    name: "Athleisure Action",
    category: "action",
    reference: "Lululemon 'This is Yoga' campaigns, athleisure lifestyle, active wellness photography",
    lighting: "Natural outdoor light, dynamic movement, energetic atmosphere",
    composition: "Action capture, movement freeze, athletic framing",
    mood: "Dynamic wellness with active lifestyle and athletic confidence",
    technicalSpecs: "Canon EOS R6, 70-200mm f/2.8 at f/4, ISO 800, fast shutter"
  },

  // TECH & CORPORATE
  {
    name: "Apple Minimalist Product",
    category: "minimal",
    reference: "Apple product photography aesthetic, minimalist product reveals, tech clean precision",
    lighting: "Clean studio lighting, neutral color temperature, precision illumination",
    composition: "Centered minimalism, product focus, clean background",
    mood: "Innovative simplicity with premium quality and timeless design",
    technicalSpecs: "Hasselblad H6D, 80mm at f/8, ISO 100, three-point lighting"
  },
  {
    name: "Google Colorful Workplace",
    category: "lifestyle",
    reference: "Google Workspace campaigns, modern workplace aesthetic, collaborative environment photography",
    lighting: "Bright office lighting, colorful ambiance, energetic atmosphere",
    composition: "Environmental workplace, collaborative context, dynamic framing",
    mood: "Productive collaboration with modern workplace and team energy",
    technicalSpecs: "Canon EOS R5, 24-70mm f/2.8 at 35mm f/4, ISO 400"
  },
  {
    name: "Platon Executive Portrait",
    category: "studio",
    reference: "Platon corporate portraiture, executive photography, business leadership aesthetic",
    lighting: "Clean studio setup, professional lighting, authoritative ambiance",
    composition: "Direct portrait, professional framing, leadership presence",
    mood: "Professional authority with leadership confidence and business credibility",
    technicalSpecs: "Canon EOS R5, 85mm f/1.2 at f/4, ISO 200, studio strobes"
  },
  {
    name: "Startup Culture Candid",
    category: "documentary",
    reference: "WeWork community campaigns, startup culture documentation, entrepreneurial spirit photography",
    lighting: "Available office light, natural workplace, authentic atmosphere",
    composition: "Candid workplace, collaborative moments, entrepreneurial context",
    mood: "Entrepreneurial energy with startup innovation and collaborative spirit",
    technicalSpecs: "Sony A7III, 35mm f/1.8 at f/2.2, ISO 800-1600"
  },

  // NATURE & WELLNESS
  {
    name: "Nature Wellness Serenity",
    category: "nature",
    reference: "Wellness retreat photography, nature immersion aesthetic, outdoor mindfulness campaigns",
    lighting: "Natural outdoor light, forest ambiance, peaceful illumination",
    composition: "Nature integration, wellness context, serene framing",
    mood: "Natural serenity with wellness connection and mindful peace",
    technicalSpecs: "Nikon Z7 II, 24-70mm f/2.8 at 50mm f/4, ISO 400"
  },
  {
    name: "Yoga Lifestyle Flow",
    category: "lifestyle",
    reference: "Yoga lifestyle photography, mindfulness practice, wellness movement aesthetic",
    lighting: "Soft natural light, peaceful atmosphere, calming illumination",
    composition: "Movement flow, practice context, wellness framing",
    mood: "Mindful flow with wellness practice and inner peace",
    technicalSpecs: "Canon EOS R6, 50mm f/1.2 at f/2.0, ISO 400, natural light"
  },
  {
    name: "Sustainable Living",
    category: "lifestyle",
    reference: "Patagonia environmental campaigns, sustainable lifestyle, eco-conscious living aesthetic",
    lighting: "Natural outdoor light, earth tones, authentic atmosphere",
    composition: "Environmental context, sustainable lifestyle, conscious framing",
    mood: "Conscious sustainability with environmental responsibility and earth connection",
    technicalSpecs: "Fujifilm X-T4, 35mm f/1.4 at f/2.8, ISO 400, natural light"
  },

  // EDITORIAL & LUXURY
  {
    name: "Vogue Editorial Fashion",
    category: "editorial",
    reference: "Vogue editorial photography, high fashion artistry, runway backstage aesthetic",
    lighting: "Editorial fashion lighting, dramatic mood, high-fashion setup",
    composition: "Fashion editorial framing, artistic vision, trendsetting composition",
    mood: "Sophisticated fashion with editorial elegance and high-fashion artistry",
    technicalSpecs: "Hasselblad H6D, 80mm at f/5.6, ISO 100, fashion lighting"
  },
  {
    name: "Luxury Hotel Lifestyle",
    category: "luxury",
    reference: "Four Seasons hospitality campaigns, luxury hotel lifestyle, five-star experience aesthetic",
    lighting: "Luxury ambient lighting, warm hospitality, elegant atmosphere",
    composition: "Luxury environment, hospitality context, aspirational framing",
    mood: "Luxurious hospitality with five-star elegance and exclusive experience",
    technicalSpecs: "Sony A7RIII, 24-70mm f/2.8 at 35mm f/4, ISO 400"
  },
  {
    name: "Automotive Luxury Detail",
    category: "luxury",
    reference: "Luxury automotive photography, detail craftsmanship, premium vehicle aesthetic",
    lighting: "Dramatic studio lighting, metallic highlights, luxury illumination",
    composition: "Detail focus, craftsmanship emphasis, luxury framing",
    mood: "Premium craftsmanship with automotive luxury and engineering excellence",
    technicalSpecs: "Phase One XF, 80mm at f/8, ISO 100, controlled studio"
  },
  {
    name: "Watches Jewelry Macro",
    category: "luxury",
    reference: "Luxury watch photography, jewelry detail, horological craftsmanship aesthetic",
    lighting: "Precision lighting, metallic enhancement, luxury detail illumination",
    composition: "Macro detail, craftsmanship focus, luxury precision",
    mood: "Horological excellence with luxury craftsmanship and timeless precision",
    technicalSpecs: "Nikon D850, 105mm f/2.8 macro at f/11, ISO 100, focus stacking"
  },

  // CINEMATIC & DRAMATIC
  {
    name: "Cinematic Film Noir",
    category: "cinematic",
    reference: "Film noir cinematography, dramatic shadows, classic Hollywood aesthetic",
    lighting: "Dramatic side lighting, hard shadows, noir atmosphere",
    composition: "Cinematic framing, dramatic angles, noir composition",
    mood: "Dramatic noir with mysterious shadows and classic cinema elegance",
    technicalSpecs: "Sony A7SIII, 50mm f/1.4 at f/2.0, ISO 1600, dramatic single source"
  },
  {
    name: "Golden Hour Romance",
    category: "cinematic",
    reference: "Golden hour cinematography, romantic sunset, dreamy backlight aesthetic",
    lighting: "Golden hour backlight, warm sunset glow, romantic atmosphere",
    composition: "Romantic framing, sunset context, dreamy composition",
    mood: "Romantic dreaminess with golden warmth and sunset magic",
    technicalSpecs: "Canon EOS R5, 85mm f/1.2 at f/1.4, ISO 400, golden hour natural"
  },
  {
    name: "Urban Night Neon",
    category: "cinematic",
    reference: "Blade Runner neon aesthetic, cyberpunk urban, night city cinematic",
    lighting: "Neon urban lights, night city glow, futuristic atmosphere",
    composition: "Urban night framing, neon context, cyberpunk composition",
    mood: "Futuristic urban with neon energy and cyberpunk mystique",
    technicalSpecs: "Sony A7SIII, 35mm f/1.4 at f/1.4, ISO 3200-6400, available neon"
  },

  // VINTAGE & RETRO
  {
    name: "Vintage Film Photography",
    category: "editorial",
    reference: "Film photography aesthetic, vintage grain, analog camera nostalgia",
    lighting: "Natural vintage light, film-like rendering, nostalgic atmosphere",
    composition: "Classic film framing, vintage composition, analog aesthetic",
    mood: "Nostalgic warmth with vintage charm and analog authenticity",
    technicalSpecs: "Leica M6 film camera aesthetic, 50mm f/2.0, ISO 400 film simulation"
  },
  {
    name: "Retro 80s Vibrant",
    category: "editorial",
    reference: "1980s vibrant aesthetic, retro neon colors, vintage commercial photography",
    lighting: "Colorful vibrant lighting, retro ambiance, bold illumination",
    composition: "Retro framing, bold colors, vintage commercial composition",
    mood: "Retro vibrance with 80s energy and nostalgic boldness",
    technicalSpecs: "Canon EOS R6, 50mm f/1.8 at f/2.8, ISO 400, colored gels"
  },

  // MINIMALIST & ABSTRACT
  {
    name: "Studio Clean Minimal",
    category: "minimal",
    reference: "Minimalist studio photography, clean white background, product focus aesthetic",
    lighting: "Even studio lighting, white background, clean illumination",
    composition: "Centered minimal, clean lines, essential focus",
    mood: "Clean precision with minimalist purity and essential simplicity",
    technicalSpecs: "Phase One XF, 80mm at f/11, ISO 100, white seamless backdrop"
  },
  {
    name: "Abstract Artistic",
    category: "editorial",
    reference: "Abstract art photography, artistic experimentation, creative abstraction aesthetic",
    lighting: "Creative lighting, artistic experimentation, abstract illumination",
    composition: "Abstract framing, artistic vision, experimental composition",
    mood: "Artistic creativity with abstract innovation and visual experimentation",
    technicalSpecs: "Sony A7RIII, 90mm f/2.8 macro at f/4, ISO 200, creative techniques"
  },
  {
    name: "Monochrome High Contrast",
    category: "editorial",
    reference: "Black and white photography, high contrast aesthetic, monochrome artistry",
    lighting: "High contrast lighting, dramatic shadows, monochrome atmosphere",
    composition: "High contrast framing, tonal emphasis, monochrome composition",
    mood: "Dramatic contrast with monochrome intensity and timeless black-white",
    technicalSpecs: "Leica M10 Monochrom, 50mm f/1.4 at f/2.8, ISO 400, natural light"
  },

  // SOCIAL MEDIA OPTIMIZED
  {
    name: "Instagram Feed Aesthetic",
    category: "lifestyle",
    reference: "Instagram feed cohesion, social media optimization, influencer aesthetic curation",
    lighting: "Consistent soft light, Instagram-friendly, aesthetic atmosphere",
    composition: "Square framing, feed cohesion, social media optimization",
    mood: "Curated aesthetics with Instagram perfection and social media appeal",
    technicalSpecs: "iPhone 15 Pro, computational photography, natural light, square crop"
  },
  {
    name: "TikTok Vertical Dynamic",
    category: "lifestyle",
    reference: "TikTok vertical format, dynamic content, Gen Z social media aesthetic",
    lighting: "Ring light, dynamic ambiance, social media illumination",
    composition: "Vertical framing, centered subject, TikTok optimization",
    mood: "Dynamic energy with Gen Z appeal and viral content potential",
    technicalSpecs: "iPhone 15 Pro, vertical 9:16, ring light, 4K video frame extraction"
  },

  // ========== NOUVEAUX STYLES INNOVANTS CANNES LIONS (10 styles) ==========
  {
    name: "Surrealist Advertising Magritte",
    category: "conceptual",
    reference: "René Magritte surrealist influence in advertising, Volkswagen 'Think Small' conceptual revolution, Absolut Vodka bottle transformation campaigns, surrealist juxtaposition creating memorable impact, impossible reality visualization, dreamlike brand storytelling, conceptual advertising Gold Cannes Lions tradition",
    lighting: "Even surreal lighting at 5500K creating dreamlike clarity, soft shadows defying physics, multiple light sources creating impossible illumination, clean bright light emphasizing surreal elements, studio lighting with reality-bending shadows",
    composition: "Impossible juxtapositions creating cognitive dissonance, scale manipulation making ordinary extraordinary, perspective distortion challenging perception, floating elements defying gravity, visual metaphors replacing literal representation, negative space as conceptual element",
    mood: "Surreal wonder with intellectual engagement, cognitive surprise triggering memorability, dreamlike brand narrative, impossible made believable, conceptual depth beyond surface",
    technicalSpecs: "Medium format digital, 50mm at f/8, ISO 100, composite photography techniques, extensive post-production surrealism"
  },
  {
    name: "Stop Motion Tactile Craft",
    category: "animation",
    reference: "Laika Studios stop-motion excellence, Aardman Animations Wallace & Gromit charm, Honda 'Paper' stop-motion campaign, tactile handmade aesthetic, frame-by-frame craft visible, imperfect perfection charm, artisanal animation storytelling",
    lighting: "Consistent stop-motion lighting at 5500K maintaining continuity, miniature set lighting creating depth, practical lights visible in frame, slight flicker suggesting handmade process, warm tactile illumination",
    composition: "Miniature world perspective with forced depth, visible texture showing handcrafted materials, slight imperfections adding charm, layered set design creating dimensionality, frozen motion suggesting animation frames",
    mood: "Handcrafted charm with artisanal pride, nostalgic animation warmth, tactile material celebration, patient craft appreciation, whimsical storytelling magic",
    technicalSpecs: "Canon EOS R5, 100mm macro at f/11, ISO 200, frame-by-frame capture, miniature set lighting rigs"
  },
  {
    name: "Double Exposure Narrative Fusion",
    category: "conceptual",
    reference: "True Detective opening titles aesthetic, Nike 'Find Your Greatness' double exposure campaigns, narrative layering through multiple exposures, emotional storytelling through image fusion, metaphorical visual poetry, two stories becoming one",
    lighting: "Layered lighting at different exposures, primary subject key light, secondary narrative ambient glow, transparency creating depth, emotional lighting contrast between layers",
    composition: "Two narratives merged in single frame, silhouette containing secondary story, transparent overlay creating meaning, strategic opacity revealing connections, visual metaphor through fusion",
    mood: "Poetic narrative depth, emotional layer complexity, visual metaphor power, storytelling innovation, artistic message fusion",
    technicalSpecs: "Sony A7RIII, 85mm f/1.4 at f/2.8, ISO 400, in-camera multiple exposure or compositing"
  },
  {
    name: "Hyperrealistic CGI Impossible",
    category: "digital",
    reference: "Audi 'Sphere' concept car CGI campaigns, impossible product demonstrations, photoreal CGI indistinguishable from reality, digital perfection beyond physical limits, future product visualization, CGI allowing impossible camera angles",
    lighting: "Perfect CGI lighting at 5500K with no physical constraints, multiple HDRI environments, photorealistic global illumination, subsurface scattering on materials, physically accurate yet impossible lighting scenarios",
    composition: "Impossible camera positions only achievable in CGI, perfect product presentation without physical limits, dynamic angles defying physics, seamless environment integration, hyperreal detail beyond photography",
    mood: "Future perfection visualization, impossible made real, technological marvel, digital craftsmanship excellence, beyond reality enhancement",
    technicalSpecs: "Full CGI pipeline, Octane/Redshift rendering, 8K output resolution, photogrammetry integration, 32-bit workflow"
  },
  {
    name: "Extreme Minimalism Void",
    category: "minimal",
    reference: "Apple 'Shot on iPhone' minimalist campaigns, Scandinavian design influence, 95% negative space compositions, single element hero focus, silence as communication, less-is-everything philosophy",
    lighting: "Single soft light source at 5500K, minimal shadows, even illumination, no dramatic lighting, pure simplicity",
    composition: "95% empty space with tiny product presence, extreme negative space as design element, single focal point isolation, geometric precision, breathing room maximized",
    mood: "Zen simplicity, confident minimalism, space as luxury, essential focus, quiet sophistication",
    technicalSpecs: "Phase One XF, 80mm at f/11, ISO 64, single softbox, infinite white backdrop"
  },
  {
    name: "Digital Collage Deconstruction",
    category: "editorial",
    reference: "David Carson deconstructed typography, contemporary digital collage art, mixed media layering, analog-digital fusion, controlled chaos aesthetic, punk design philosophy, anti-grid rebellion",
    lighting: "Mixed lighting sources from different elements, varied color temperatures creating energy, no unified lighting creating collage effect, dramatic contrasts between elements",
    composition: "Deconstructed layout breaking all rules, overlapping elements creating depth, mixed scales and perspectives, typography as visual element, organized chaos principle",
    mood: "Creative rebellion, deconstructed energy, punk aesthetic sophistication, controlled chaos, anti-establishment design",
    technicalSpecs: "Mixed media capture, various focal lengths, digital compositing, scanner integration, mixed resolution elements"
  },
  {
    name: "Infrared Otherworld Vision",
    category: "experimental",
    reference: "Richard Mosse infrared war photography, Kodak Aerochrome aesthetic revival, invisible spectrum revealed, alien Earth visualization, environmental photography reimagined, scientific art fusion",
    lighting: "Infrared spectrum capture revealing invisible light, foliage appearing white/pink, sky turning dark dramatic, heat signatures visible, otherworldly natural illumination",
    composition: "Familiar scenes made alien through infrared, vegetation as surreal elements, architectural elements transformed, human subjects ethereal, landscape as foreign planet",
    mood: "Otherworldly discovery, invisible revealed, scientific wonder, environmental reimagining, alien beauty on Earth",
    technicalSpecs: "Modified camera for IR capture, 720nm IR filter, specialized post-processing, false color interpretation"
  },
  {
    name: "Tilt-Shift Miniature Universe",
    category: "perspective",
    reference: "BMW tilt-shift campaigns, miniature faking technique, real world as toy model, selective focus creating scale illusion, playful perspective manipulation, accessible luxury visualization",
    lighting: "Bright even lighting suggesting miniature model, high key illumination, minimal shadows like toy photography, saturated colors enhancing toy effect",
    composition: "High angle suggesting looking down at model, selective focus plane creating miniature effect, enhanced saturation for toy aesthetic, real scenes as dioramas",
    mood: "Playful scale manipulation, world as playground, accessible wonder, toy-like charm, perspective magic",
    technicalSpecs: "Tilt-shift lens 45mm, f/2.8 selective focus, ISO 100, elevated viewpoint, saturation boost post"
  },
  {
    name: "Glitch Art Digital Decay",
    category: "digital",
    reference: "Digital artist Rosa Menkman glitch aesthetics, error as art form, digital decay beauty, corruption as creation, technology failure celebrated, cyberpunk data-moshing, post-internet art movement",
    lighting: "Screen glow and digital artifacts, RGB channel separation, datamoshed color bleeding, electronic interference patterns, corrupted pixel illumination",
    composition: "Intentional digital corruption patterns, pixel sorting algorithms, data bending aesthetics, compression artifacts as design, frame tearing and displacement",
    mood: "Digital age anxiety, beautiful destruction, technology fragility, glitch poetry, error celebration",
    technicalSpecs: "Digital manipulation tools, datamoshing software, hex editor corruption, processing algorithms, glitch apps"
  },
  {
    name: "Thermal Imaging Emotion",
    category: "experimental",
    reference: "Predator movie thermal vision influence, FLIR camera art projects, emotion through heat visualization, invisible temperature narratives, scientific imaging as art, heat signature storytelling",
    lighting: "Thermal radiation capture, no traditional lighting needed, heat emission as illumination, temperature gradients creating contrast, body heat as light source",
    composition: "Heat signatures as compositional elements, temperature contrast creating focus, cold-hot juxtaposition, human warmth against cold environment, emotional heat mapping",
    mood: "Emotional temperature, invisible intimacy, scientific poetry, heat as life force, thermal narrative",
    technicalSpecs: "FLIR thermal camera, temperature range calibration, false color heat mapping, thermal resolution 640x480, specialized thermal software"
  }
];

// ==========================================
// 🎨 PALETTES DE COULEURS (12 variations)
// ==========================================

export const COLOR_PALETTES: ColorPalette[] = [
  {
    name: "Brand Dominant",
    description: "Palette centrée sur les couleurs de marque avec dominance maximale",
    application: "Les couleurs de marque occupent 90% de la composition visuelle",
    brandIntegration: 90
  },
  {
    name: "Brand Harmonious",
    description: "Intégration harmonieuse des couleurs de marque avec complémentaires",
    application: "70% couleurs de marque, 30% teintes complémentaires harmonisées",
    brandIntegration: 70
  },
  {
    name: "Complementary Harmony",
    description: "Équilibre entre couleurs de marque et complémentaires du cercle chromatique",
    application: "50% couleurs de marque, 50% complémentaires pour contraste équilibré",
    brandIntegration: 50
  },
  {
    name: "Monochrome Brand",
    description: "Variations monochromes autour d'une couleur de marque principale",
    application: "Dégradés et tons de la couleur principale de marque",
    brandIntegration: 80
  },
  {
    name: "Pastel Soft",
    description: "Palette pastel douce intégrant subtilement les couleurs de marque",
    application: "Couleurs de marque adoucies en tons pastel avec blancs et crèmes",
    brandIntegration: 40
  },
  {
    name: "Vibrant Pop",
    description: "Couleurs vives et saturées avec accents de marque énergiques",
    application: "Palette vibrante avec couleurs de marque en accents punchy",
    brandIntegration: 35
  },
  {
    name: "Earth Tones Natural",
    description: "Tons naturels terreux avec touches subtiles de marque",
    application: "Beige, terracotta, verts naturels avec 20% de couleurs de marque",
    brandIntegration: 20
  },
  {
    name: "Cool Blues Serenity",
    description: "Palette de bleus apaisants intégrant les couleurs de marque si compatibles",
    application: "Tons bleus froids et sereins avec intégration de marque adaptée",
    brandIntegration: 45
  },
  {
    name: "Warm Golden Luxury",
    description: "Palette chaleureuse dorée évoquant le luxe",
    application: "Ors, bronzes, ambrés avec couleurs de marque en touches luxueuses",
    brandIntegration: 30
  },
  {
    name: "Black White Accent",
    description: "Noir et blanc dominant avec couleurs de marque en accents forts",
    application: "Base monochrome avec 25% de couleurs de marque en points focaux",
    brandIntegration: 25
  },
  {
    name: "Sunset Gradient",
    description: "Dégradé inspiré du coucher de soleil",
    application: "Oranges, roses, violets avec couleurs de marque intégrées dans le dégradé",
    brandIntegration: 40
  },
  {
    name: "Fresh Spring",
    description: "Palette printanière fraîche et énergisante",
    application: "Verts tendres, jaunes soleil, blancs purs avec touches de marque",
    brandIntegration: 35
  }
];

// ==========================================
// 🧠 FRAMEWORKS CRÉATIFS (8 variations)
// ==========================================

export const CREATIVE_FRAMEWORKS: CreativeFramework[] = [
  {
    name: "AIDA Framework",
    structure: "Attention → Interest → Desire → Action",
    application: "Capter l'attention immédiatement, créer de l'intérêt avec une histoire, développer le désir par les bénéfices, terminer par un appel à l'action clair"
  },
  {
    name: "PAS Framework",
    structure: "Problem → Agitate → Solution",
    application: "Identifier le problème, agiter l'émotion autour de ce problème, présenter la solution comme transformation"
  },
  {
    name: "Hook-Story-Offer",
    structure: "Hook → Story → Offer",
    application: "Pattern interrupt émotionnel, micro-histoire d'identification, transformation désirable présentée"
  },
  {
    name: "Question-Answer",
    structure: "Question engageante → Réponse révélatrice",
    application: "Poser une question qui résonne avec l'audience, répondre de manière surprenante et mémorable"
  },
  {
    name: "Before-After-Bridge",
    structure: "Before (problème) → After (résultat) → Bridge (solution)",
    application: "Montrer la situation actuelle, la transformation possible, comment y arriver"
  },
  {
    name: "Storytelling Journey",
    structure: "Hero's Journey narrative arc",
    application: "Héros ordinaire, appel à l'aventure, transformation, nouveau normal - le produit comme guide"
  },
  {
    name: "Social Proof Framework",
    structure: "Témoignage → Résultat → Invitation",
    application: "Commencer par une preuve sociale authentique, montrer les résultats, inviter à rejoindre le mouvement"
  },
  {
    name: "Value-First Approach",
    structure: "Value → Insight → Soft offer",
    application: "Donner de la valeur immédiate, partager un insight unique, mention subtile du produit"
  }
];

// ==========================================
// 🌍 CONTEXTES CRÉATIFS CANNES LIONS (50 variations)
// ==========================================

export const CREATIVE_CONTEXTS: CreativeContext[] = [
  // ========== CONTEXTES GÉNÉRIQUES ESSENTIELS (12 contextes originaux) ==========
  {
    name: "Modern Kitchen Bright",
    description: "Cuisine moderne lumineuse, surfaces blanches épurées, lumière naturelle abondante, équipement contemporain, îlot central design, électroménagers haut de gamme intégrés"
  },
  {
    name: "Rustic Countryside",
    description: "Campagne rustique, textures bois naturel, ambiance artisanale, authenticité rurale, ferme traditionnelle, champs cultivés en arrière-plan, atmosphère bucolique"
  },
  {
    name: "Spa Wellness Zen",
    description: "Spa wellness zen, minimalisme apaisant, plantes vertes luxuriantes, atmosphère de sérénité, pierres naturelles, bougies parfumées, tranquillité absolue"
  },
  {
    name: "Urban Loft Industrial",
    description: "Loft urbain industriel, briques apparentes rouges, métal et béton brut, style contemporain chic, grandes fenêtres d'usine, poutres métalliques apparentes, design urbain sophistiqué"
  },
  {
    name: "Luxury Hotel Suite",
    description: "Suite hôtel luxe cinq étoiles, tissus premium (soie, velours), design sophistiqué, raffinement absolu, vue panoramique, mobilier sur-mesure, service d'exception"
  },
  {
    name: "Botanical Garden Natural",
    description: "Jardin botanique naturel, verdure luxuriante tropicale, lumière filtrée à travers feuillage, connexion nature profonde, serres victoriennes, collection de plantes exotiques"
  },
  {
    name: "Minimalist Studio White",
    description: "Studio minimaliste blanc immaculé, lignes épurées géométriques, espace négatif maximal, pureté visuelle absolue, éclairage indirect, design scandinave"
  },
  {
    name: "Cozy Home Comfort",
    description: "Maison confortable cosy, textiles douillets (plaids, coussins), atmosphère chaleureuse, intimité familiale, cheminée crépitante, décoration personnelle, refuge douillet"
  },
  {
    name: "Modern Office Workspace",
    description: "Bureau moderne workspace, design contemporain épuré, technologie intégrée invisible, productivité optimisée, espaces collaboratifs, ergonomie premium, lumière naturelle abondante"
  },
  {
    name: "Outdoor Nature Setting",
    description: "Extérieur nature sauvage, paysage naturel préservé, lumière du jour changeante, connexion environnementale authentique, biodiversité visible, air pur"
  },
  {
    name: "Boutique Retail Chic",
    description: "Boutique retail chic haut de gamme, présentation soignée merchandising, éclairage commercial sophistiqué, expérience shopping premium, architecture intérieure design, service personnalisé"
  },
  {
    name: "Street Urban Authentic",
    description: "Rue urbaine authentique métropolitaine, vie citadine vibrante, énergie urbaine palpable, contexte métropolitain multiculturel, street art, architecture urbaine éclectique"
  },

  // ========== CATÉGORIE A : CONTEXTES SECTORIELS SPÉCIFIQUES (15 nouveaux) ==========
  {
    name: "Automotive Showroom Premium",
    description: "Showroom automobile premium, éclairage architectural sophistiqué, sols réfléchissants miroir, design minimaliste luxueux, véhicules mis en scène comme sculptures, technologie interactive, ambiance exclusive"
  },
  {
    name: "Racing Circuit Dynamic",
    description: "Circuit automobile professionnel, asphalte lisse, virages inclinés, stands de course, drapeaux à damier, atmosphère compétitive, adrénaline palpable, technologie de pointe visible"
  },
  {
    name: "Vintage Garage Heritage",
    description: "Garage vintage authentique, outils anciens accrochés, établis en bois patiné, odeur d'huile moteur, affiches rétro automobiles, lumière naturelle poussiéreuse, nostalgie mécanique"
  },
  {
    name: "Medical Laboratory Clinical",
    description: "Laboratoire médical clinique, surfaces stériles blanches, équipements scientifiques de précision, éclairage froid professionnel, microscopes et éprouvettes, rigueur scientifique, propreté absolue"
  },
  {
    name: "Hospital Room Compassionate",
    description: "Chambre d'hôpital moderne, design apaisant non-clinique, lumière naturelle douce, équipement médical discret, couleurs chaleureuses, confort patient prioritaire, humanité médicale"
  },
  {
    name: "Pharmacy Modern Clean",
    description: "Pharmacie moderne épurée, comptoirs blancs immaculés, étagères organisées méthodiquement, éclairage LED uniforme, signalétique claire, professionnalisme rassurant, accessibilité optimale"
  },
  {
    name: "Tech Startup Garage",
    description: "Garage startup technologique, tables de ping-pong, post-its colorés partout, écrans multiples, câbles apparents, énergie entrepreneuriale, chaos créatif organisé, innovation en action"
  },
  {
    name: "Data Center Futuristic",
    description: "Centre de données futuriste, serveurs alignés à l'infini, lumières LED bleues, câblage structuré, climatisation visible, technologie de pointe, architecture high-tech, puissance computationnelle"
  },
  {
    name: "Innovation Lab Cutting-Edge",
    description: "Laboratoire d'innovation, prototypes en développement, imprimantes 3D actives, tableaux blancs couverts d'équations, matériaux expérimentaux, recherche en cours, créativité scientifique"
  },
  {
    name: "Trading Floor Energy",
    description: "Salle des marchés financiers, écrans multiples affichant données en temps réel, téléphones sonnant, traders concentrés, énergie frénétique, tension palpable, capitalisme en action"
  },
  {
    name: "Bank Vault Security",
    description: "Coffre-fort bancaire, porte blindée massive, boîtes de sécurité alignées, éclairage tamisé, silence absolu, sécurité maximale, confiance institutionnelle, protection des actifs"
  },
  {
    name: "Fintech Office Modern",
    description: "Bureau fintech moderne, open space lumineux, écrans affichant cryptomonnaies, design scandinave, plantes vertes, café specialty, disruption financière, jeunesse entrepreneuriale"
  },
  {
    name: "Fashion Runway Backstage",
    description: "Coulisses défilé mode, mannequins en préparation, maquilleurs et coiffeurs affairés, vêtements suspendus, miroirs éclairés, chaos organisé pré-show, tension créative, glamour en construction"
  },
  {
    name: "Art Gallery Contemporary",
    description: "Galerie d'art contemporain, murs blancs immaculés, éclairage directionnel précis, œuvres espacées stratégiquement, sols en béton ciré, silence contemplatif, élégance minimaliste"
  },
  {
    name: "Recording Studio Creative",
    description: "Studio d'enregistrement professionnel, panneaux acoustiques, console de mixage imposante, instruments variés, cabine d'isolation vitrée, ambiance tamisée, créativité musicale, technologie audio"
  },

  // ========== CATÉGORIE B : CONTEXTES ÉMOTIONNELS/STORYTELLING (10 nouveaux) ==========
  {
    name: "Childhood Memory Nostalgic",
    description: "Souvenir d'enfance nostalgique, chambre d'enfant vintage, jouets anciens, lumière douce filtrée, couleurs pastel fanées, innocence perdue, douceur du passé, émotion pure"
  },
  {
    name: "Dream Sequence Surreal",
    description: "Séquence onirique surréaliste, logique défiant la réalité, couleurs saturées irréelles, perspectives impossibles, flou artistique, symbolisme visuel, inconscient visualisé"
  },
  {
    name: "Time Travel Portal",
    description: "Portail temporel mystérieux, fusion passé-présent-futur, éléments anachroniques juxtaposés, lumière étrange, distorsion temporelle visible, voyage dans le temps suggéré"
  },
  {
    name: "Underwater Fantasy",
    description: "Fantaisie sous-marine, lumière bleue filtrée, bulles flottantes, mouvement fluide, silence aquatique, monde parallèle subaquatique, apesanteur liquide, mystère des profondeurs"
  },
  {
    name: "Cloud Kingdom Ethereal",
    description: "Royaume des nuages éthéré, ciel infini, lumière céleste dorée, légèreté absolue, perspective aérienne, rêve éveillé, paradis imaginaire, élévation spirituelle"
  },
  {
    name: "Desert Mirage Mysterious",
    description: "Mirage désertique mystérieux, chaleur ondulante visible, sable doré infini, solitude contemplative, illusion d'optique, beauté aride, silence absolu, spiritualité du vide"
  },
  {
    name: "Forest Enchanted Magical",
    description: "Forêt enchantée magique, lumière verte filtrée, mousse luxuriante, arbres centenaires, brume matinale, conte de fées vivant, nature mystique, magie naturelle"
  },
  {
    name: "Mountain Peak Achievement",
    description: "Sommet montagneux conquis, vue panoramique à 360°, air raréfié, accomplissement personnel, dépassement de soi, nature majestueuse, solitude triomphante, perspective élevée"
  },
  {
    name: "Beach Sunset Romance",
    description: "Coucher de soleil romantique sur plage, sable doré, vagues douces, ciel orangé-rose, intimité partagée, moment suspendu, beauté éphémère, amour visualisé"
  },
  {
    name: "Northern Lights Wonder",
    description: "Aurores boréales spectaculaires, ciel dansant vert-violet, froid arctique, émerveillement cosmique, phénomène naturel rare, magie céleste, beauté extraterrestre"
  },

  // ========== CATÉGORIE C : CONTEXTES CULTURELS AUTHENTIQUES (10 nouveaux) ==========
  {
    name: "Japanese Temple Zen",
    description: "Temple japonais zen traditionnel, jardin de pierres ratissé, architecture en bois, tatamis, encens subtil, méditation silencieuse, harmonie parfaite, spiritualité orientale"
  },
  {
    name: "Moroccan Souk Vibrant",
    description: "Souk marocain vibrant, épices colorées en pyramides, tapis suspendus, lumière filtrée, négociations animées, artisanat local, odeurs exotiques, chaos organisé oriental"
  },
  {
    name: "Parisian Café Classic",
    description: "Café parisien classique, terrasse avec chaises bistrot, serveurs en tablier noir, croissants frais, architecture haussmannienne, vie de quartier, élégance décontractée française"
  },
  {
    name: "New York Rooftop Urban",
    description: "Rooftop new-yorkais, skyline iconique, gratte-ciels illuminés, coucher de soleil urbain, cocktails sophistiqués, énergie métropolitaine, rêve américain visualisé"
  },
  {
    name: "Tokyo Neon Cyberpunk",
    description: "Tokyo néon cyberpunk, enseignes lumineuses kanji, foule dense, technologie omniprésente, pluie réfléchissante, futur présent, énergie électrique, modernité extrême"
  },
  {
    name: "Scandinavian Hygge Cozy",
    description: "Hygge scandinave cosy, bougies multiples, couvertures en laine, bois clair, design minimaliste chaleureux, confort nordique, simplicité élégante, bien-être danois"
  },
  {
    name: "Mediterranean Villa Luxury",
    description: "Villa méditerranéenne luxueuse, vue mer azur, architecture blanche, bougainvilliers roses, terrasse en pierre, dolce vita, élégance côtière, paradis ensoleillé"
  },
  {
    name: "African Savanna Wild",
    description: "Savane africaine sauvage, herbes dorées ondulantes, acacia solitaire, faune visible, coucher de soleil rouge, nature brute, liberté absolue, beauté primitive"
  },
  {
    name: "Indian Bazaar Colorful",
    description: "Bazar indien coloré, tissus éclatants, bijoux scintillants, épices aromatiques, foule dense, musique traditionnelle, richesse sensorielle, chaos joyeux"
  },
  {
    name: "Brazilian Carnival Energy",
    description: "Carnaval brésilien énergique, costumes à plumes, samba rythmée, foule dansante, couleurs explosives, joie contagieuse, célébration de la vie, énergie tropicale"
  },

  // ========== CATÉGORIE D : CONTEXTES TENDANCE/FUTURISTES (8 nouveaux) ==========
  {
    name: "Metaverse Digital World",
    description: "Monde numérique métaverse, réalité virtuelle immersive, avatars personnalisés, architecture impossible, physique défiant la gravité, futur digital, connexion globale virtuelle"
  },
  {
    name: "Gaming Room RGB",
    description: "Salle gaming RGB, éclairage LED multicolore, écrans multiples, chaise gaming ergonomique, clavier mécanique, setup streamer, culture gamer, technologie gaming"
  },
  {
    name: "Streaming Studio Setup",
    description: "Studio streaming professionnel, fond vert, ring light, microphone podcast, caméra HD, écran de contrôle, créateur de contenu, production digitale, influence moderne"
  },
  {
    name: "TikTok House Gen-Z",
    description: "Maison TikTok Gen-Z, décor Instagram-worthy, néons colorés, coins photo optimisés, énergie jeune, contenu viral en création, culture internet, créativité digitale"
  },
  {
    name: "Sustainable Eco-Home",
    description: "Maison écologique durable, panneaux solaires, jardin potager, matériaux recyclés, compost visible, minimalisme conscient, vie zéro déchet, responsabilité environnementale"
  },
  {
    name: "Zero-Waste Lifestyle",
    description: "Mode de vie zéro déchet, bocaux en verre réutilisables, produits en vrac, composteur, minimalisme intentionnel, consommation responsable, écologie pratique"
  },
  {
    name: "Solar Punk Future",
    description: "Futur solarpunk optimiste, technologie verte intégrée, jardins verticaux, énergie solaire omniprésente, architecture biomimétique, utopie écologique, harmonie tech-nature"
  },
  {
    name: "Biophilic Design Nature-Tech",
    description: "Design biophilique nature-tech, plantes intégrées architecture, lumière naturelle maximisée, matériaux organiques, technologie invisible, bien-être humain, connexion nature urbaine"
  },

  // ========== CATÉGORIE E : CONTEXTES B2B & ENTREPRISE (10 nouveaux) ==========
  {
    name: "Corporate Boardroom Executive",
    description: "Salle de conseil d'administration corporate, table en bois massif, fauteuils en cuir premium, écrans de présentation high-tech, vue panoramique sur skyline, décisions stratégiques, pouvoir exécutif, leadership d'entreprise"
  },
  {
    name: "Conference Center Professional",
    description: "Centre de conférences professionnel, auditorium moderne, sièges ergonomiques alignés, scène avec éclairage professionnel, écrans géants, networking business, événements corporate, professionnalisme institutionnel"
  },
  {
    name: "Coworking Space Collaborative",
    description: "Espace coworking collaboratif, bureaux partagés modulables, zones de brainstorming créatives, café intégré, wifi haut débit, communauté entrepreneuriale, flexibilité workspace, innovation collective"
  },
  {
    name: "Industrial Warehouse Logistics",
    description: "Entrepôt industriel logistique, rayonnages métalliques hauts, chariots élévateurs en action, codes-barres et scanners, organisation optimisée, supply chain visible, efficacité opérationnelle, B2B distribution"
  },
  {
    name: "Business Lunch Restaurant",
    description: "Restaurant business lunch, tables espacées pour confidentialité, service rapide et discret, menu exécutif, ambiance feutrée professionnelle, deals et négociations, networking déjeuner, cuisine raffinée business"
  },
  {
    name: "Airport Business Lounge",
    description: "Salon business aéroport, fauteuils confortables premium, wifi gratuit, prises électriques multiples, buffet gastronomique, douches privées, calme et productivité, voyageurs d'affaires, luxe fonctionnel"
  },
  {
    name: "Hotel Conference Room",
    description: "Salle de conférence hôtel, configuration modulable, équipement audiovisuel professionnel, service traiteur intégré, lumière naturelle contrôlable, séminaires d'entreprise, formations professionnelles, événements corporate"
  },
  {
    name: "Trade Show Exhibition",
    description: "Salon professionnel exposition, stands design attractifs, démonstrations produits live, badges et networking, foule professionnelle, innovation sectorielle, B2B marketplace, opportunités business"
  },
  {
    name: "Corporate Training Center",
    description: "Centre de formation corporate, salles équipées technologie, tableaux interactifs, espaces travaux pratiques, matériel pédagogique professionnel, développement compétences, formation continue, montée en compétence"
  },
  {
    name: "Business District Skyline",
    description: "Quartier d'affaires skyline, gratte-ciels modernes, architecture corporate imposante, rues animées professionnels, terrasses rooftop, énergie business, ambition urbaine, centre économique métropolitain"
  },

  // ========== CATÉGORIE F : CONTEXTES RETAIL & COMMERCE (10 nouveaux) ==========
  {
    name: "Supermarket Aisle Bright",
    description: "Allée supermarché lumineuse, rayonnages remplis produits, éclairage LED uniforme, chariots et paniers, promotions affichées, choix abondant, courses familiales, consommation quotidienne"
  },
  {
    name: "Convenience Store 24/7",
    description: "Supérette 24/7, ouverture non-stop, produits essentiels accessibles, éclairage nocturne, snacks et boissons, dépannage rapide, proximité urbaine, service continu"
  },
  {
    name: "Department Store Luxury",
    description: "Grand magasin luxe, étages multiples élégants, escalators design, marques premium, service personnalisé, shopping experience haut de gamme, architecture retail sophistiquée, destination shopping"
  },
  {
    name: "Pop-Up Store Trendy",
    description: "Boutique éphémère trendy, installation temporaire créative, design innovant, exclusivité limitée, buzz marketing, expérience immersive, concept store, nouveauté et rareté"
  },
  {
    name: "Market Stall Authentic",
    description: "Étal de marché authentique, produits frais locaux, vendeur passionné, ambiance conviviale, négociation prix, produits saisonniers, commerce traditionnel, authenticité terroir"
  },
  {
    name: "Shopping Mall Atrium",
    description: "Atrium centre commercial, verrière lumineuse, fontaines décoratives, boutiques multiples visibles, escalators croisés, foule shopping, destination loisirs, architecture retail moderne"
  },
  {
    name: "Duty-Free Airport Shop",
    description: "Boutique duty-free aéroport, produits détaxés, marques internationales, voyageurs pressés, luxe accessible, derniers achats voyage, shopping international, zone transit"
  },
  {
    name: "Vending Machine Urban",
    description: "Distributeur automatique urbain, disponibilité 24/7, paiement sans contact, snacks et boissons, solution rapide, technologie self-service, consommation instantanée, vie urbaine moderne"
  },
  {
    name: "Drive-Through Fast Service",
    description: "Drive-through service rapide, commande depuis voiture, rapidité et efficacité, menu visible, paiement fenêtre, consommation nomade, fast-food moderne, commodité automobile"
  },
  {
    name: "Online Shopping Studio",
    description: "Studio e-commerce shooting, fond blanc professionnel, éclairage produit optimal, packshot parfait, photographie commerciale, vente en ligne, marketplace digital, retail transformation"
  },

  // ========== CATÉGORIE G : CONTEXTES LIFESTYLE SPÉCIFIQUES (10 nouveaux) ==========
  {
    name: "Home Office Remote Work",
    description: "Bureau à domicile télétravail, setup ergonomique, écran double, plantes vertes, lumière naturelle, séparation vie pro-perso, productivité home, flexibilité travail, nouvelle normalité"
  },
  {
    name: "Student Dorm Campus",
    description: "Chambre étudiante campus, espace optimisé compact, bureau études, posters muraux, budget limité, vie étudiante, communauté universitaire, indépendance jeunesse, années formation"
  },
  {
    name: "Baby Nursery Tender",
    description: "Chambre bébé tendre, couleurs pastel douces, mobile musical, table à langer, sécurité maximale, douceur parentale, premiers mois vie, cocon protecteur, amour familial"
  },
  {
    name: "Teenager Bedroom Personal",
    description: "Chambre adolescent personnelle, posters idoles, console gaming, bureau devoirs, espace privé, expression identité, refuge personnel, transition enfance-adulte, univers propre"
  },
  {
    name: "Senior Living Comfort",
    description: "Résidence seniors confort, accessibilité adaptée, sécurité renforcée, communauté bienveillante, activités sociales, autonomie préservée, bien-vieillir, dignité âge d'or"
  },
  {
    name: "Pet-Friendly Home",
    description: "Maison pet-friendly, aménagements animaux, jouets et accessoires, espace extérieur sécurisé, famille élargie, amour inconditionnel, compagnons fidèles, vie avec animaux"
  },
  {
    name: "Minimalist Apartment Urban",
    description: "Appartement minimaliste urbain, espace optimisé, rangements cachés, design épuré, fonctionnalité maximale, vie simplifiée, moins c'est plus, élégance urbaine"
  },
  {
    name: "Family Kitchen Busy",
    description: "Cuisine familiale animée, repas préparation collective, enfants aidant, désordre organisé, rires et conversations, cœur de maison, moments partagés, vie familiale quotidienne"
  },
  {
    name: "Bachelor Pad Modern",
    description: "Appartement célibataire moderne, design masculin, technologie intégrée, bar à domicile, espace entertainment, indépendance assumée, style personnel, liberté lifestyle"
  },
  {
    name: "Shared Apartment Roommates",
    description: "Appartement colocation, espaces communs partagés, chambres privées, organisation collective, économies loyer, amitiés colocataires, vie communautaire, jeunesse urbaine"
  },

  // ========== CATÉGORIE H : CONTEXTES ÉVÉNEMENTIELS (10 nouveaux) ==========
  {
    name: "Wedding Reception Elegant",
    description: "Réception mariage élégante, décoration florale raffinée, tables dressées perfectionnées, piste de danse, photobooth, célébration amour, union familles, jour inoubliable, romance célébrée"
  },
  {
    name: "Birthday Party Celebration",
    description: "Fête anniversaire célébration, ballons colorés, gâteau bougies, cadeaux emballés, invités joyeux, musique festive, moments mémorables, joie partagée, année de plus"
  },
  {
    name: "Corporate Event Networking",
    description: "Événement corporate networking, cocktail professionnel, badges nominatifs, conversations business, cartes de visite échangées, opportunités collaboration, relations professionnelles, développement réseau"
  },
  {
    name: "Music Festival Outdoor",
    description: "Festival musique outdoor, scène principale imposante, foule dansante, food trucks variés, camping festivaliers, liberté et musique, énergie collective, expérience immersive, été musical"
  },
  {
    name: "Sports Stadium Energy",
    description: "Stade sportif énergie, gradins remplis supporters, drapeaux et écharpes, chants encouragements, tension compétitive, passion sportive, communion fans, spectacle vivant"
  },
  {
    name: "Theater Performance Arts",
    description: "Théâtre performance arts, scène éclairée dramatiquement, rideaux velours rouge, fauteuils confortables, silence respectueux, culture et émotion, art vivant, soirée culturelle"
  },
  {
    name: "Gallery Opening Vernissage",
    description: "Vernissage galerie art, œuvres exposées, champagne et canapés, artiste présent, collectionneurs et critiques, discussions artistiques, découverte culturelle, soirée mondaine"
  },
  {
    name: "Charity Gala Fundraising",
    description: "Gala charité fundraising, tenue de soirée élégante, enchères silencieuses, discours émouvants, cause noble, générosité collective, impact social, soirée philanthropique"
  },
  {
    name: "Product Launch Event",
    description: "Événement lancement produit, présentation scénographiée, démonstrations live, presse et influenceurs, buzz médiatique, innovation dévoilée, stratégie marketing, moment clé marque"
  },
  {
    name: "Award Ceremony Prestige",
    description: "Cérémonie remise prix, tapis rouge, trophées brillants, discours remerciements, reconnaissance excellence, moment gloire, célébration réussite, prestige et honneur"
  },

  // ========== CATÉGORIE I : CONTEXTES SAISONNIERS & MOMENTS (10 nouveaux) ==========
  {
    name: "Christmas Holiday Festive",
    description: "Fêtes Noël festives, sapin décoré illuminé, cadeaux emballés sous sapin, guirlandes scintillantes, repas famille, magie hivernale, traditions célébrées, esprit Noël"
  },
  {
    name: "Summer Beach Vacation",
    description: "Vacances été plage, sable chaud, mer turquoise, parasols colorés, détente absolue, bronzage et baignade, liberté estivale, souvenirs vacances, évasion soleil"
  },
  {
    name: "Autumn Harvest Cozy",
    description: "Automne récolte cosy, feuilles dorées tombantes, citrouilles décoratives, pulls confortables, boissons chaudes, ambiance chaleureuse, transition saisons, nostalgie douce"
  },
  {
    name: "Spring Renewal Fresh",
    description: "Printemps renouveau frais, fleurs éclosion, bourgeons verts, nettoyage printemps, énergie nouvelle, renaissance nature, optimisme saisonnier, vie qui reprend"
  },
  {
    name: "Winter Sports Mountain",
    description: "Sports hiver montagne, neige poudreuse, ski et snowboard, chalet refuge, chocolat chaud, adrénaline altitude, paysages enneigés, vacances hivernales"
  },
  {
    name: "Back-to-School September",
    description: "Rentrée scolaire septembre, cartable neuf, fournitures fraîches, excitation apprentissage, nouveaux camarades, routine retrouvée, année académique, éducation reprise"
  },
  {
    name: "Valentine's Day Romantic",
    description: "Saint-Valentin romantique, roses rouges, chocolats cœur, dîner chandelles, déclarations amour, couples amoureux, romance célébrée, amour exprimé"
  },
  {
    name: "Halloween Spooky Fun",
    description: "Halloween amusement effrayant, citrouilles sculptées, déguisements créatifs, bonbons distribués, décoration macabre, fête costumée, frissons ludiques, tradition américaine"
  },
  {
    name: "New Year's Eve Celebration",
    description: "Réveillon Nouvel An, compte à rebours minuit, champagne pétillant, feux d'artifice, résolutions nouvelles, espoir année future, fête jusqu'à l'aube, transition temporelle"
  },
  {
    name: "Mother's Father's Day Family",
    description: "Fête mères/pères famille, cadeaux faits main, repas famille réuni, reconnaissance parentale, amour filial, générations ensemble, gratitude exprimée, liens familiaux célébrés"
  }
];

// ==========================================
// 💡 SETUPS D'ÉCLAIRAGE (7 variations)
// ==========================================

export const LIGHTING_SETUPS: LightingSetup[] = [
  {
    name: "Golden Hour Morning",
    timeOfDay: "6h-8h du matin",
    characteristics: "Lumière douce dorée, ombres longues, atmosphère paisible, warmth naturelle",
    mood: "Serein, optimiste, nouveau départ, promesse du jour"
  },
  {
    name: "Bright Midday",
    timeOfDay: "11h-14h",
    characteristics: "Lumière vive directe, contraste élevé, énergétique, clarté maximale",
    mood: "Énergétique, vivant, actif, plein d'énergie"
  },
  {
    name: "Golden Hour Evening",
    timeOfDay: "17h-19h",
    characteristics: "Lumière chaude dorée, ombres adoucies, magic hour cinématographique",
    mood: "Romantique, nostalgique, fin de journée paisible"
  },
  {
    name: "Blue Hour Twilight",
    timeOfDay: "19h-20h crépuscule",
    characteristics: "Lumière bleue froide, transition jour-nuit, atmosphère mystérieuse",
    mood: "Mystérieux, tranquille, introspectif, contemplatif"
  },
  {
    name: "Night Ambiance",
    timeOfDay: "21h-23h nuit",
    characteristics: "Lumières artificielles, ambiance nocturne, mood intime, éclairage dramatique",
    mood: "Intime, dramatique, sophistiqué, nocturne"
  },
  {
    name: "Overcast Diffused",
    timeOfDay: "Toute la journée (temps couvert)",
    characteristics: "Lumière diffuse douce, pas d'ombres dures, même illumination, couleurs saturées",
    mood: "Calme, uniforme, doux, introspectif"
  },
  {
    name: "Studio Controlled",
    timeOfDay: "Environnement contrôlé",
    characteristics: "Éclairage professionnel contrôlé, précision technique, résultat prévisible",
    mood: "Professionnel, précis, contrôlé, commercial"
  }
];

// ==========================================
// 🎯 MAPPINGS SECTEUR → CATÉGORIES (pour pré-filtrage)
// ==========================================

/**
 * Mapping des secteurs vers les catégories photographiques pertinentes
 * Un secteur peut avoir 2-4 catégories pour offrir flexibilité et diversité
 */
export const SECTOR_TO_CATEGORIES: Record<string, string[]> = {
  // ALIMENTAIRE & BOISSONS
  'food': ['food', 'beverage', 'studio', 'lifestyle'],
  'dairy': ['food', 'studio', 'lifestyle'],
  'beverage': ['beverage', 'food', 'lifestyle'],
  
  // BEAUTÉ & COSMÉTIQUE
  'cosmetic': ['beauty', 'cosmetic', 'luxury', 'lifestyle'],
  'beauty': ['beauty', 'cosmetic', 'luxury'],
  
  // MODE & LIFESTYLE
  'fashion': ['fashion', 'lifestyle', 'editorial', 'luxury'],
  'lifestyle': ['lifestyle', 'fashion', 'minimal'],
  
  // TECHNOLOGIE
  'tech': ['minimal', 'studio', 'lifestyle'],
  'technology': ['minimal', 'studio', 'lifestyle'],
  
  // LUXE
  'luxury': ['luxury', 'editorial', 'lifestyle'],
  
  // AUTOMOBILE
  'automobile': ['automobile', 'luxury'],
  'automotive': ['automobile', 'luxury'],
  
  // FINANCE & BANQUE
  'finance': ['finance', 'minimal', 'studio'],
  'banking': ['finance', 'minimal', 'studio'],
  
  // SANTÉ
  'health': ['healthcare', 'minimal'],
  'healthcare': ['healthcare', 'minimal'],
  
  // ÉDUCATION
  'education': ['education', 'lifestyle'],
  
  // AGRICULTURE
  'agriculture': ['agriculture', 'food', 'lifestyle'],
  
  // ARTISANAT
  'craft': ['artisanat', 'lifestyle'],
  'artisanat': ['artisanat', 'lifestyle'],
  
  // BIENS DE CONSOMMATION
  'consumer-goods': ['studio', 'lifestyle', 'minimal'],
  
  // COMMUNICATION & MÉDIAS
  'media': ['minimal', 'lifestyle', 'studio'],
  'communication': ['minimal', 'lifestyle', 'studio'],
  
  // INDUSTRIE
  'manufacturing': ['studio', 'minimal'],
  'industry': ['studio', 'minimal'],
  
  // FALLBACK GÉNÉRIQUE
  'default': ['lifestyle', 'minimal', 'studio']
};

/**
 * Mapping des occasions d'usage vers les contextes visuels pertinents
 * ENRICHI avec les 100 contextes disponibles
 */
export const USAGE_TO_CONTEXTS: Record<string, string[]> = {
  // ========== MOMENTS ALIMENTAIRES ==========
  'breakfast': ['Modern Kitchen Bright', 'Cozy Home Comfort', 'Family Kitchen Busy', 'Home Office Remote Work'],
  'lunch': ['Modern Kitchen Bright', 'Business Lunch Restaurant', 'Outdoor Nature Setting', 'Coworking Space Collaborative'],
  'dinner': ['Cozy Home Comfort', 'Luxury Hotel Suite', 'Rustic Countryside', 'Family Kitchen Busy'],
  'snack': ['Modern Kitchen Bright', 'Outdoor Nature Setting', 'Street Urban Authentic', 'Convenience Store 24/7'],
  'coffee': ['Parisian Café Classic', 'Coworking Space Collaborative', 'Home Office Remote Work', 'Airport Business Lounge'],
  'dessert': ['Cozy Home Comfort', 'Parisian Café Classic', 'Luxury Hotel Suite', 'Birthday Party Celebration'],
  
  // ========== SPORT & BIEN-ÊTRE ==========
  'sport': ['Outdoor Nature Setting', 'Sports Stadium Energy', 'Mountain Peak Achievement', 'Beach Sunset Romance'],
  'workout': ['Outdoor Nature Setting', 'Modern Office Workspace', 'Urban Loft Industrial', 'Home Office Remote Work'],
  'yoga': ['Spa Wellness Zen', 'Outdoor Nature Setting', 'Botanical Garden Natural', 'Beach Sunset Romance'],
  'wellness': ['Spa Wellness Zen', 'Botanical Garden Natural', 'Cozy Home Comfort', 'Forest Enchanted Magical'],
  'meditation': ['Spa Wellness Zen', 'Japanese Temple Zen', 'Forest Enchanted Magical', 'Mountain Peak Achievement'],
  'running': ['Outdoor Nature Setting', 'Beach Sunset Romance', 'Mountain Peak Achievement', 'Urban Loft Industrial'],
  
  // ========== BEAUTÉ & SOINS ==========
  'morning-routine': ['Modern Kitchen Bright', 'Spa Wellness Zen', 'Minimalist Studio White', 'Home Office Remote Work'],
  'evening-routine': ['Spa Wellness Zen', 'Cozy Home Comfort', 'Luxury Hotel Suite', 'Baby Nursery Tender'],
  'skincare': ['Spa Wellness Zen', 'Minimalist Studio White', 'Botanical Garden Natural', 'Luxury Hotel Suite'],
  'makeup': ['Minimalist Studio White', 'Fashion Runway Backstage', 'Luxury Hotel Suite', 'Boutique Retail Chic'],
  'haircare': ['Spa Wellness Zen', 'Fashion Runway Backstage', 'Parisian Café Classic', 'Luxury Hotel Suite'],
  
  // ========== TRAVAIL & PRODUCTIVITÉ ==========
  'work': ['Modern Office Workspace', 'Home Office Remote Work', 'Coworking Space Collaborative', 'Corporate Boardroom Executive'],
  'office': ['Modern Office Workspace', 'Corporate Boardroom Executive', 'Conference Center Professional', 'Business District Skyline'],
  'meeting': ['Corporate Boardroom Executive', 'Conference Center Professional', 'Hotel Conference Room', 'Business Lunch Restaurant'],
  'remote-work': ['Home Office Remote Work', 'Coworking Space Collaborative', 'Parisian Café Classic', 'Airport Business Lounge'],
  'business-travel': ['Airport Business Lounge', 'Luxury Hotel Suite', 'Business District Skyline', 'Hotel Conference Room'],
  
  // ========== LOISIRS & SOCIAL ==========
  'party': ['Urban Loft Industrial', 'Luxury Hotel Suite', 'Birthday Party Celebration', 'Music Festival Outdoor'],
  'celebration': ['Birthday Party Celebration', 'Wedding Reception Elegant', 'Award Ceremony Prestige', 'Luxury Hotel Suite'],
  'relaxation': ['Spa Wellness Zen', 'Cozy Home Comfort', 'Beach Sunset Romance', 'Forest Enchanted Magical'],
  'entertainment': ['Music Festival Outdoor', 'Theater Performance Arts', 'Sports Stadium Energy', 'Urban Loft Industrial'],
  'dating': ['Parisian Café Classic', 'Beach Sunset Romance', 'Luxury Hotel Suite', 'Art Gallery Contemporary'],
  'friends': ['Urban Loft Industrial', 'Parisian Café Classic', 'Music Festival Outdoor', 'Shared Apartment Roommates'],
  
  // ========== SHOPPING & RETAIL ==========
  'shopping': ['Boutique Retail Chic', 'Shopping Mall Atrium', 'Department Store Luxury', 'Street Urban Authentic'],
  'grocery': ['Supermarket Aisle Bright', 'Market Stall Authentic', 'Convenience Store 24/7', 'Modern Kitchen Bright'],
  'luxury-shopping': ['Department Store Luxury', 'Boutique Retail Chic', 'Duty-Free Airport Shop', 'Pop-Up Store Trendy'],
  'online-shopping': ['Online Shopping Studio', 'Home Office Remote Work', 'Cozy Home Comfort', 'Minimalist Studio White'],
  
  // ========== VOYAGE & DÉCOUVERTE ==========
  'travel': ['Airport Business Lounge', 'Luxury Hotel Suite', 'Beach Sunset Romance', 'Mountain Peak Achievement'],
  'vacation': ['Beach Sunset Romance', 'Luxury Hotel Suite', 'Mountain Peak Achievement', 'Mediterranean Villa Luxury'],
  'adventure': ['Mountain Peak Achievement', 'Forest Enchanted Magical', 'Desert Mirage Mysterious', 'African Savanna Wild'],
  'city-break': ['New York Rooftop Urban', 'Parisian Café Classic', 'Tokyo Neon Cyberpunk', 'Business District Skyline'],
  
  // ========== FAMILLE & MAISON ==========
  'family': ['Cozy Home Comfort', 'Family Kitchen Busy', 'Outdoor Nature Setting', 'Birthday Party Celebration'],
  'parenting': ['Baby Nursery Tender', 'Family Kitchen Busy', 'Cozy Home Comfort', 'Outdoor Nature Setting'],
  'home': ['Cozy Home Comfort', 'Modern Kitchen Bright', 'Minimalist Apartment Urban', 'Family Kitchen Busy'],
  'kids': ['Teenager Bedroom Personal', 'Outdoor Nature Setting', 'Birthday Party Celebration', 'Student Dorm Campus'],
  'pets': ['Pet-Friendly Home', 'Outdoor Nature Setting', 'Cozy Home Comfort', 'Botanical Garden Natural'],
  
  // ========== ÉDUCATION & APPRENTISSAGE ==========
  'study': ['Student Dorm Campus', 'Modern Office Workspace', 'Home Office Remote Work', 'Coworking Space Collaborative'],
  'learning': ['Student Dorm Campus', 'Modern Office Workspace', 'Corporate Training Center', 'Conference Center Professional'],
  'education': ['Student Dorm Campus', 'Corporate Training Center', 'Conference Center Professional', 'Modern Office Workspace'],
  
  // ========== ÉVÉNEMENTS SPÉCIAUX ==========
  'wedding': ['Wedding Reception Elegant', 'Luxury Hotel Suite', 'Beach Sunset Romance', 'Mediterranean Villa Luxury'],
  'birthday': ['Birthday Party Celebration', 'Cozy Home Comfort', 'Urban Loft Industrial', 'Music Festival Outdoor'],
  'holiday': ['Christmas Holiday Festive', 'Cozy Home Comfort', 'Family Kitchen Busy', 'Mountain Peak Achievement'],
  'festival': ['Music Festival Outdoor', 'Brazilian Carnival Energy', 'Indian Bazaar Colorful', 'Street Urban Authentic'],
  
  // ========== SAISONS ==========
  'summer': ['Beach Sunset Romance', 'Summer Beach Vacation', 'Outdoor Nature Setting', 'Music Festival Outdoor'],
  'winter': ['Winter Sports Mountain', 'Christmas Holiday Festive', 'Cozy Home Comfort', 'Mountain Peak Achievement'],
  'spring': ['Spring Renewal Fresh', 'Botanical Garden Natural', 'Outdoor Nature Setting', 'Forest Enchanted Magical'],
  'autumn': ['Autumn Harvest Cozy', 'Rustic Countryside', 'Forest Enchanted Magical', 'Cozy Home Comfort'],
  
  // ========== CONTEXTES PROFESSIONNELS B2B ==========
  'corporate': ['Corporate Boardroom Executive', 'Conference Center Professional', 'Business District Skyline', 'Hotel Conference Room'],
  'conference': ['Conference Center Professional', 'Hotel Conference Room', 'Corporate Training Center', 'Trade Show Exhibition'],
  'networking': ['Corporate Event Networking', 'Business Lunch Restaurant', 'Airport Business Lounge', 'Coworking Space Collaborative'],
  'presentation': ['Corporate Boardroom Executive', 'Conference Center Professional', 'Modern Office Workspace', 'Trade Show Exhibition'],
  
  // ========== CONTEXTES CULTURELS ==========
  'art': ['Art Gallery Contemporary', 'Gallery Opening Vernissage', 'Urban Loft Industrial', 'Fashion Runway Backstage'],
  'culture': ['Japanese Temple Zen', 'Moroccan Souk Vibrant', 'Parisian Café Classic', 'Indian Bazaar Colorful'],
  'music': ['Music Festival Outdoor', 'Recording Studio Creative', 'Theater Performance Arts', 'Brazilian Carnival Energy'],
  'fashion': ['Fashion Runway Backstage', 'Boutique Retail Chic', 'Pop-Up Store Trendy', 'New York Rooftop Urban'],
  
  // ========== CONTEXTES TECHNOLOGIQUES ==========
  'tech': ['Tech Startup Garage', 'Data Center Futuristic', 'Innovation Lab Cutting-Edge', 'Fintech Office Modern'],
  'gaming': ['Gaming Room RGB', 'Streaming Studio Setup', 'TikTok House Gen-Z', 'Metaverse Digital World'],
  'digital': ['Streaming Studio Setup', 'Online Shopping Studio', 'Metaverse Digital World', 'Tech Startup Garage'],
  
  // ========== CONTEXTES DURABLES ==========
  'eco': ['Sustainable Eco-Home', 'Zero-Waste Lifestyle', 'Solar Punk Future', 'Biophilic Design Nature-Tech'],
  'organic': ['Rustic Countryside', 'Market Stall Authentic', 'Botanical Garden Natural', 'Sustainable Eco-Home'],
  'natural': ['Botanical Garden Natural', 'Forest Enchanted Magical', 'Outdoor Nature Setting', 'Beach Sunset Romance'],
  
  // ========== CONTEXTES ÉMOTIONNELS ==========
  'romantic': ['Beach Sunset Romance', 'Parisian Café Classic', 'Luxury Hotel Suite', 'Valentine\'s Day Romantic'],
  'nostalgic': ['Childhood Memory Nostalgic', 'Vintage Garage Heritage', 'Rustic Countryside', 'Parisian Café Classic'],
  'dreamy': ['Dream Sequence Surreal', 'Cloud Kingdom Ethereal', 'Underwater Fantasy', 'Northern Lights Wonder'],
  'energetic': ['Music Festival Outdoor', 'Sports Stadium Energy', 'Brazilian Carnival Energy', 'Tokyo Neon Cyberpunk'],
  
  // ========== FALLBACK ENRICHI ==========
  'default': ['Minimalist Studio White', 'Modern Kitchen Bright', 'Cozy Home Comfort', 'Outdoor Nature Setting', 'Urban Loft Industrial', 'Boutique Retail Chic']
};

// ==========================================
// 🎯 FONCTIONS DE PRÉ-FILTRAGE INTELLIGENT
// ==========================================

/**
 * Pré-filtre les styles photographiques selon le secteur de la marque
 * @param sector - Secteur de la marque (ex: 'food', 'cosmetic', 'tech')
 * @param productCategory - Catégorie du produit (optionnel, pour affinage)
 * @returns Array de styles photographiques pertinents (15-25 styles)
 */
export function preFilterStylesBySector(
  sector: string,
  productCategory?: string
): PhotographicStyle[] {
  // 1. Obtenir les catégories pertinentes pour ce secteur
  const relevantCategories = SECTOR_TO_CATEGORIES[sector.toLowerCase()] 
    || SECTOR_TO_CATEGORIES['default'];
  
  console.log(`[PreFilter] Secteur: ${sector} → Catégories: ${relevantCategories.join(', ')}`);
  
  // 2. Filtrer les styles par catégorie
  const filteredByCategory = PHOTOGRAPHIC_STYLES.filter(style =>
    relevantCategories.some(cat => 
      style.category.toLowerCase().includes(cat.toLowerCase())
    )
  );
  
  console.log(`[PreFilter] Styles filtrés par catégorie: ${filteredByCategory.length}`);
  
  // 3. Si catégorie produit fournie, prioriser les styles correspondants
  if (productCategory) {
    const priorityStyles = filteredByCategory.filter(style =>
      style.name.toLowerCase().includes(productCategory.toLowerCase()) ||
      style.category.toLowerCase().includes(productCategory.toLowerCase())
    );
    
    const otherStyles = filteredByCategory.filter(s => !priorityStyles.includes(s));
    
    // Combiner : prioritaires en premier, puis autres
    const combined = [...priorityStyles, ...otherStyles];
    
    console.log(`[PreFilter] Styles prioritaires (${productCategory}): ${priorityStyles.length}`);
    
    // Limiter à 25 styles maximum pour GPT-5
    return combined.slice(0, 25);
  }
  
  // Limiter à 25 styles maximum
  return filteredByCategory.slice(0, 25);
}

/**
 * Pré-filtre les contextes visuels selon les occasions d'usage du produit
 * @param usageOccasions - Occasions d'usage du produit
 * @param productCategory - Catégorie du produit (pour contexte supplémentaire)
 * @returns Array de contextes visuels pertinents (4-6 contextes)
 */
export function preFilterContextsByUsage(
  usageOccasions: string[],
  productCategory?: string
): CreativeContext[] {
  const relevantContextNames = new Set<string>();
  
  // 1. Mapper les occasions d'usage vers les contextes
  usageOccasions.forEach(occasion => {
    const contexts = USAGE_TO_CONTEXTS[occasion.toLowerCase()] 
      || USAGE_TO_CONTEXTS['default'];
    contexts.forEach(ctx => relevantContextNames.add(ctx));
  });
  
  // 2. Ajouter des contextes génériques toujours pertinents
  relevantContextNames.add('Minimalist Studio White');
  relevantContextNames.add('Cozy Home Comfort');
  
  // 3. Filtrer les contextes disponibles
  const filteredContexts = CREATIVE_CONTEXTS.filter(context =>
    relevantContextNames.has(context.name)
  );
  
  console.log(`[PreFilter] Contextes filtrés: ${filteredContexts.length} (${Array.from(relevantContextNames).join(', ')})`);
  
  // Limiter à 6 contextes maximum
  return filteredContexts.slice(0, 6);
}

/**
 * Interface pour les presets pré-filtrés
 */
export interface FilteredPresets {
  styles: PhotographicStyle[];      // 15-25 styles pertinents
  palettes: ColorPalette[];         // Toutes les 12 palettes
  frameworks: CreativeFramework[];  // Tous les 8 frameworks
  contexts: CreativeContext[];      // 4-6 contextes pertinents
  lightings: LightingSetup[];       // Tous les 7 éclairages
}

/**
 * Fonction principale : obtenir tous les presets pré-filtrés pour GPT-5
 * @param brand - Données de la marque
 * @param product - Données du produit
 * @param calendar - Données du calendrier (optionnel)
 * @returns Presets pré-filtrés prêts pour GPT-5
 */
export function getRelevantPresetsForGPT(
  brand: any,
  product: any,
  calendar?: any
): FilteredPresets {
  console.log(`[PreFilter] Début du pré-filtrage pour ${brand.name} - ${product.name}`);
  
  // 1. Pré-filtrer les styles par secteur et catégorie produit
  const filteredStyles = preFilterStylesBySector(
    brand.sector,
    product.category
  );
  
  // 2. Pré-filtrer les contextes par occasions d'usage
  const filteredContexts = preFilterContextsByUsage(
    product.usageOccasions || [],
    product.category
  );
  
  // 3. Garder toutes les palettes, frameworks et éclairages
  // (GPT-5 choisira parmi tous, car ils sont tous potentiellement pertinents)
  
  const result: FilteredPresets = {
    styles: filteredStyles,
    palettes: COLOR_PALETTES,        // Toutes les 12
    frameworks: CREATIVE_FRAMEWORKS,  // Tous les 8
    contexts: filteredContexts,
    lightings: LIGHTING_SETUPS        // Tous les 7
  };
  
  console.log(`[PreFilter] Résultat: ${result.styles.length} styles, ${result.contexts.length} contextes`);
  
  return result;
}

// ==========================================
// 🎯 FONCTIONS DE SÉLECTION INTELLIGENTE (anciennes - conservées pour compatibilité)
// ==========================================

/**
 * Crée un hash simple à partir d'une chaîne de caractères
 * Utilisé pour générer un seed unique par calendrier
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Génère un nombre pseudo-aléatoire basé sur un seed et un offset
 * Permet une randomisation reproductible mais unique
 */
function seededRandom(seed: number, offset: number): number {
  const x = Math.sin(seed + offset) * 10000;
  return Math.floor((x - Math.floor(x)) * 1000000);
}

/**
 * Sélectionne un preset créatif avec RANDOMISATION ANARCHIQUE MAXIMALE
 * Chaque calendrier obtient une signature visuelle complètement unique
 * 
 * @param postIndex - Index du post dans le calendrier
 * @param totalPosts - Nombre total de posts dans le calendrier
 * @param sector - Secteur d'activité (pour filtrage futur)
 * @param brandColors - Couleurs de la marque
 * @param calendarId - ID du calendrier pour seed unique (NOUVEAU)
 */
export function selectCreativePreset(
  postIndex: number,
  totalPosts: number,
  sector: string = 'general',
  brandColors?: { primary?: string; secondary?: string; accent?: string },
  calendarId?: string
): CreativePreset {
  // 🎲 RANDOMISATION TOTALE avec seed unique par calendrier
  // Utiliser calendarId comme seed pour des résultats reproductibles mais uniques
  const seed = calendarId 
    ? simpleHash(calendarId.toString() + postIndex.toString())
    : postIndex * 1000 + Math.floor(Math.random() * 1000); // Fallback vraiment random
  
  // 🎨 Sélection VRAIMENT aléatoire de chaque composant
  // Chaque offset différent crée une séquence indépendante
  const styleIndex = seededRandom(seed, 0) % PHOTOGRAPHIC_STYLES.length;
  const paletteIndex = seededRandom(seed, 1) % COLOR_PALETTES.length;
  const frameworkIndex = seededRandom(seed, 2) % CREATIVE_FRAMEWORKS.length;
  const contextIndex = seededRandom(seed, 3) % CREATIVE_CONTEXTS.length;
  const lightingIndex = seededRandom(seed, 4) % LIGHTING_SETUPS.length;

  const style = PHOTOGRAPHIC_STYLES[styleIndex];
  const palette = COLOR_PALETTES[paletteIndex];
  const framework = CREATIVE_FRAMEWORKS[frameworkIndex];
  const context = CREATIVE_CONTEXTS[contextIndex];
  const lighting = LIGHTING_SETUPS[lightingIndex];

  // Construire la référence complète
  const reference = style.reference;

  return {
    style,
    palette,
    framework,
    context,
    lighting,
    reference
  };
}

/**
 * Génère un prompt de palette de couleurs enrichi
 * Intègre intelligemment les couleurs de marque
 */
export function generateColorPalettePrompt(
  palette: ColorPalette,
  brandColors?: { primary?: string; secondary?: string; accent?: string }
): string {
  let colorPrompt = `COLOR PALETTE: ${palette.name}\n`;
  colorPrompt += `Description: ${palette.description}\n`;
  colorPrompt += `Application: ${palette.application}\n`;
  
  if (brandColors && brandColors.primary) {
    colorPrompt += `Brand Integration: ${palette.brandIntegration}% of brand colors\n`;
    colorPrompt += `Primary Brand Color: ${brandColors.primary}\n`;
    
    if (brandColors.secondary) {
      colorPrompt += `Secondary Brand Color: ${brandColors.secondary}\n`;
    }
    
    if (brandColors.accent) {
      colorPrompt += `Accent Brand Color: ${brandColors.accent}\n`;
    }
    
    colorPrompt += `\n⚠️ CRITICAL: The dominant colors in the image MUST incorporate these brand colors at ${palette.brandIntegration}% integration level.`;
  } else {
    colorPrompt += `Note: No brand colors provided - using palette's natural color harmony`;
  }
  
  return colorPrompt;
}

/**
 * Filtre les styles photographiques par secteur d'activité
 */
export function getStylesBySector(sector: string): PhotographicStyle[] {
  const sectorKeywords: Record<string, string[]> = {
    food: ['food', 'beverage', 'lifestyle'],
    cosmetic: ['beauty', 'cosmetic', 'luxury'],
    fashion: ['fashion', 'lifestyle', 'editorial'],
    tech: ['minimal', 'studio', 'lifestyle'],
    luxury: ['luxury', 'editorial', 'lifestyle']
  };
  
  const keywords = sectorKeywords[sector.toLowerCase()] || ['lifestyle', 'minimal'];
  
  return PHOTOGRAPHIC_STYLES.filter(style =>
    keywords.some(keyword => style.category.includes(keyword))
  );
}

/**
 * Sélectionne un framework créatif approprié basé sur le type de contenu
 */
export function selectFrameworkByContentType(
  contentType: 'promotional' | 'educational' | 'inspirational' | 'social'
): CreativeFramework {
  const frameworkMap: Record<string, number> = {
    promotional: 0, // AIDA
    educational: 3, // Question-Answer
    inspirational: 5, // Storytelling Journey
    social: 6 // Social Proof
  };
  
  const index = frameworkMap[contentType] || 0;
  return CREATIVE_FRAMEWORKS[index];
}
