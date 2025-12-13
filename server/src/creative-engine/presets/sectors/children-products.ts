/**
 * 🧒 PRESETS CRÉATIFS SPÉCIALISÉS ENFANTS
 * Univers magiques et féeriques pour produits destinés aux enfants
 * Inspiré par Disney, Pixar et l'imaginaire enfantin
 */

import { SectorPreset } from '../types';

export const childrenProductsPresets: SectorPreset = {
  sector: 'children-products',
  displayName: 'Produits Enfants',
  photographicStyles: [],
  contexts: [],
  colorPalettes: [],
  frameworks: [],
  lightingSetups: [],
  bestPractices: [
    'Utiliser des couleurs vives et joyeuses',
    'Intégrer des éléments magiques et féeriques',
    'Créer un sentiment d\'émerveillement',
    'Assurer la sécurité visuelle pour les enfants'
  ],
  avoidances: [
    'Éviter les couleurs sombres ou effrayantes',
    'Pas d\'éléments anxiogènes',
    'Éviter la complexité visuelle excessive'
  ]
};

export const childrenMagicalPresets = [
  {
    id: 'magical-wonderland',
    name: 'Wonderland Magique',
    description: 'Univers féerique avec licornes, arcs-en-ciel et châteaux enchantés',
    category: 'children',
    tags: ['féerique', 'licornes', 'magie', 'enfants'],
    visualElements: {
      style: 'Magical fantasy illustration with Disney/Pixar aesthetic',
      composition: 'Centered magical scene with floating elements',
      lighting: 'Soft, warm magical glow with sparkles and fairy dust',
      colorPalette: {
        primary: '#FF69B4', // Rose magique
        secondary: '#87CEEB', // Bleu ciel
        accent: '#FFD700', // Or scintillant
        supporting: ['#E6E6FA', '#F0E68C', '#DDA0DD'] // Lavande, jaune doux, prune
      },
      mood: 'Pure wonder and magical enchantment',
      elements: [
        '🦄 Licornes gracieuses avec crinières arc-en-ciel',
        '🌈 Arcs-en-ciel vibrants traversant le ciel',
        '✨ Paillettes et poussière d\'étoiles scintillantes',
        '🧚‍♀️ Fées voltigeant avec des ailes iridescentes',
        '🏰 Châteaux de conte de fées sur des nuages',
        '🌸 Fleurs géantes aux couleurs pastel',
        '🦋 Papillons magiques aux ailes chatoyantes'
      ]
    },
    promptTemplate: `Magical wonderland scene in Disney/Pixar style, featuring {product} in an enchanted fairy tale setting. Unicorns with rainbow manes, sparkling fairy dust, floating castles on clouds, giant pastel flowers, and magical butterflies. Soft warm lighting with golden sparkles, dreamy atmosphere. Color palette: magical pink #FF69B4, sky blue #87CEEB, sparkling gold #FFD700. Professional children's book illustration quality, hyper-detailed, 8K resolution.`,
    technicalSpecs: {
      aspectRatio: '1:1',
      resolution: '2048x2048',
      style: 'Disney/Pixar magical illustration',
      lighting: 'Soft magical glow',
      camera: 'Wide magical landscape view'
    },
    ageGroup: '4-8 ans',
    psychologicalTriggers: [
      'Émerveillement pur',
      'Magie et fantaisie',
      'Sécurité dans l\'imaginaire',
      'Joie et découverte'
    ]
  },

  {
    id: 'superhero-adventure',
    name: 'Aventure Super-Héros',
    description: 'Univers de super-héros coloré et dynamique pour enfants courageux',
    category: 'children',
    tags: ['super-héros', 'aventure', 'courage', 'action'],
    visualElements: {
      style: 'Dynamic superhero comic book style with 3D elements',
      composition: 'Action-packed scene with dynamic angles',
      lighting: 'Bold dramatic lighting with heroic backlighting',
      colorPalette: {
        primary: '#FF0000', // Rouge héroïque
        secondary: '#0066FF', // Bleu super-héros
        accent: '#FFD700', // Jaune éclair
        supporting: ['#00FF00', '#FF6600', '#9900FF'] // Vert, orange, violet
      },
      mood: 'Heroic courage and adventurous spirit',
      elements: [
        '🦸‍♂️ Super-héros en action avec capes flottantes',
        '⚡ Éclairs d\'énergie et effets de pouvoir',
        '🏙️ Ville colorée en arrière-plan',
        '💥 Effets visuels dynamiques (POW, BOOM)',
        '🚀 Vaisseaux spatiaux et gadgets futuristes',
        '🌟 Étoiles et symboles héroïques',
        '🛡️ Boucliers et emblèmes de super-héros'
      ]
    },
    promptTemplate: `Dynamic superhero adventure scene featuring {product} in a colorful comic book world. Flying superheroes with flowing capes, lightning energy effects, vibrant cityscape background, action bubbles (POW, BOOM), futuristic gadgets and spaceships. Bold dramatic lighting with heroic backlighting. Color palette: heroic red #FF0000, superhero blue #0066FF, lightning yellow #FFD700. Comic book illustration style, high energy, 8K resolution.`,
    technicalSpecs: {
      aspectRatio: '1:1',
      resolution: '2048x2048',
      style: 'Comic book superhero illustration',
      lighting: 'Bold dramatic heroic lighting',
      camera: 'Dynamic action angle'
    },
    ageGroup: '6-12 ans',
    psychologicalTriggers: [
      'Courage et bravoure',
      'Sentiment de pouvoir',
      'Aventure et action',
      'Identification héroïque'
    ]
  },

  {
    id: 'enchanted-forest',
    name: 'Forêt Enchantée',
    description: 'Forêt magique peuplée d\'animaux parlants et de créatures fantastiques',
    category: 'children',
    tags: ['forêt', 'animaux', 'nature', 'magie'],
    visualElements: {
      style: 'Whimsical forest illustration with talking animals',
      composition: 'Layered forest scene with hidden magical details',
      lighting: 'Dappled sunlight through magical trees',
      colorPalette: {
        primary: '#228B22', // Vert forêt
        secondary: '#DEB887', // Beige naturel
        accent: '#FF69B4', // Rose magique
        supporting: ['#87CEEB', '#F0E68C', '#DDA0DD'] // Bleu ciel, jaune, lavande
      },
      mood: 'Natural wonder and friendly magic',
      elements: [
        '🌳 Arbres géants aux visages souriants',
        '🐰 Lapins parlants avec des chapeaux colorés',
        '🦌 Cerfs majestueux aux bois scintillants',
        '🍄 Champignons géants multicolores',
        '🌺 Fleurs qui chantent et dansent',
        '🦉 Hiboux sages avec des lunettes',
        '✨ Lucioles magiques créant des sentiers lumineux'
      ]
    },
    promptTemplate: `Enchanted forest scene featuring {product} surrounded by talking animals and magical creatures. Giant smiling trees, colorful talking rabbits with hats, majestic deer with sparkling antlers, giant multicolored mushrooms, singing dancing flowers. Dappled magical sunlight through trees, fireflies creating light trails. Color palette: forest green #228B22, natural beige #DEB887, magical pink #FF69B4. Whimsical children's book illustration, detailed and warm, 8K resolution.`,
    technicalSpecs: {
      aspectRatio: '1:1',
      resolution: '2048x2048',
      style: 'Whimsical forest children\'s book illustration',
      lighting: 'Dappled magical forest lighting',
      camera: 'Immersive forest perspective'
    },
    ageGroup: '3-8 ans',
    psychologicalTriggers: [
      'Connexion avec la nature',
      'Amitié avec les animaux',
      'Découverte et exploration',
      'Sécurité dans la nature'
    ]
  },

  {
    id: 'space-adventure',
    name: 'Aventure Spatiale',
    description: 'Exploration de l\'espace avec des aliens amicaux et des planètes colorées',
    category: 'children',
    tags: ['espace', 'aliens', 'planètes', 'exploration'],
    visualElements: {
      style: 'Colorful space adventure with friendly aliens',
      composition: 'Cosmic scene with multiple planets and spaceships',
      lighting: 'Cosmic lighting with nebula glows',
      colorPalette: {
        primary: '#4B0082', // Violet cosmique
        secondary: '#00CED1', // Turquoise spatial
        accent: '#FFD700', // Or stellaire
        supporting: ['#FF1493', '#00FF7F', '#FF4500'] // Rose vif, vert printemps, orange
      },
      mood: 'Cosmic wonder and friendly exploration',
      elements: [
        '🚀 Vaisseaux spatiaux colorés et arrondis',
        '👽 Aliens amicaux aux grands yeux souriants',
        '🪐 Planètes aux anneaux scintillants',
        '⭐ Étoiles dansantes et constellations',
        '🌌 Nébuleuses aux couleurs arc-en-ciel',
        '🛸 Soucoupes volantes rigolotes',
        '🌟 Comètes avec des queues étincelantes'
      ]
    },
    promptTemplate: `Colorful space adventure scene featuring {product} in a friendly cosmic setting. Cute rounded spaceships, smiling big-eyed aliens, planets with sparkling rings, dancing stars and constellations, rainbow nebulas, funny flying saucers. Cosmic lighting with nebula glows and starlight. Color palette: cosmic purple #4B0082, space turquoise #00CED1, stellar gold #FFD700. Friendly space exploration illustration, vibrant and welcoming, 8K resolution.`,
    technicalSpecs: {
      aspectRatio: '1:1',
      resolution: '2048x2048',
      style: 'Friendly space adventure illustration',
      lighting: 'Cosmic nebula lighting',
      camera: 'Wide cosmic perspective'
    },
    ageGroup: '5-10 ans',
    psychologicalTriggers: [
      'Curiosité cosmique',
      'Amitié universelle',
      'Exploration sans peur',
      'Émerveillement scientifique'
    ]
  },

  {
    id: 'candy-dreamland',
    name: 'Pays des Bonbons',
    description: 'Monde sucré fait de bonbons géants et de gourmandises colorées',
    category: 'children',
    tags: ['bonbons', 'sucré', 'gourmandises', 'coloré'],
    visualElements: {
      style: 'Sweet candy land with edible architecture',
      composition: 'Layered candy landscape with sweet details',
      lighting: 'Warm sugary glow with candy reflections',
      colorPalette: {
        primary: '#FF1493', // Rose bonbon
        secondary: '#00BFFF', // Bleu sucette
        accent: '#FFD700', // Jaune miel
        supporting: ['#FF69B4', '#98FB98', '#DDA0DD'] // Rose vif, vert menthe, lavande
      },
      mood: 'Sweet delight and sugary happiness',
      elements: [
        '🍭 Sucettes géantes multicolores',
        '🏠 Maisons en pain d\'épice décorées',
        '🌈 Rivières de sirop coloré',
        '🍬 Bonbons volants aux ailes de papier',
        '🎂 Montagnes de gâteaux à étages',
        '🍫 Arbres en chocolat aux feuilles de menthe',
        '✨ Pluie de confettis sucrés'
      ]
    },
    promptTemplate: `Sweet candy dreamland featuring {product} in an edible wonderland. Giant colorful lollipops, gingerbread houses with decorations, colorful syrup rivers, flying candies with paper wings, layered cake mountains, chocolate trees with mint leaves. Warm sugary lighting with candy reflections and sweet sparkles. Color palette: candy pink #FF1493, lollipop blue #00BFFF, honey yellow #FFD700. Sweet confectionery illustration, mouth-watering and joyful, 8K resolution.`,
    technicalSpecs: {
      aspectRatio: '1:1',
      resolution: '2048x2048',
      style: 'Sweet candy land illustration',
      lighting: 'Warm sugary glow',
      camera: 'Immersive candy perspective'
    },
    ageGroup: '3-8 ans',
    psychologicalTriggers: [
      'Plaisir gustatif',
      'Joie sucrée',
      'Récompense et célébration',
      'Bonheur simple'
    ]
  }
];

export default childrenProductsPresets;
