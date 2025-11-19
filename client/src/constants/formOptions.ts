export const SECTORS = [
  "Agriculture et Agroalimentaire",
  "Artisanat et Métiers d'art",
  "Assurance et Mutuelle",
  "Automobile",
  "Banque et Finance",
  "Beauté et Bien-être",
  "Bâtiment et Construction",
  "Biens de consommation",
  "Chimie et Pharmaceutique",
  "Communication et Médias",
  "Divertissement et Culture",
  "Éducation et Formation",
  "Énergie et Ressources",
  "Environnement et Développement durable",
  "FMCG (Fast-Moving Consumer Goods)",
  "Hôtellerie, Restauration et Loisirs",
  "Immobilier",
  "Industrie Manufacturière",
  "Informatique et Technologies",
  "Juridique et Conseil",
  "Mode et Luxe",
  "ONG et Associations",
  "Retail et Distribution",
  "Santé et Services sociaux",
  "Sécurité et Défense",
  "Services B2B",
  "Services B2C",
  "Sport et Fitness",
  "Télécommunications",
  "Transport et Logistique"
];

// Mapping des catégories par secteur d'activité
export const PRODUCT_CATEGORIES_BY_SECTOR: Record<string, string[]> = {
  "Agriculture et Agroalimentaire": [
    "Produits laitiers",
    "Viandes et charcuterie",
    "Fruits et légumes",
    "Céréales et légumineuses",
    "Boissons alcoolisées",
    "Boissons non-alcoolisées",
    "Boulangerie-pâtisserie",
    "Épicerie salée",
    "Épicerie sucrée",
    "Produits bio",
    "Surgelés",
    "Conserves",
    "Condiments et sauces",
    "Nutrition animale",
    "Équipements agricoles"
  ],
  "Artisanat et Métiers d'art": [
    "Bijouterie artisanale",
    "Poterie et céramique",
    "Maroquinerie artisanale",
    "Menuiserie et ébénisterie",
    "Textile et couture",
    "Verrerie d'art",
    "Métallurgie artistique",
    "Sculpture",
    "Peinture et arts graphiques",
    "Restauration d'art",
    "Instruments de musique",
    "Parfumerie artisanale"
  ],
  "Assurance et Mutuelle": [
    "Assurance auto",
    "Assurance habitation",
    "Assurance vie",
    "Assurance santé",
    "Assurance professionnelle",
    "Assurance voyage",
    "Prévoyance",
    "Retraite complémentaire",
    "Épargne",
    "Assurance crédit",
    "Mutuelle santé",
    "Protection juridique"
  ],
  "Automobile": [
    "Véhicules neufs",
    "Véhicules d'occasion",
    "Pièces détachées",
    "Accessoires auto",
    "Pneumatiques",
    "Entretien et réparation",
    "Carrosserie",
    "Électronique embarquée",
    "Carburants et lubrifiants",
    "Location de véhicules",
    "Véhicules électriques",
    "Équipements de sécurité"
  ],
  "Banque et Finance": [
    "Banque de détail",
    "Banque d'investissement",
    "Crédit immobilier",
    "Crédit à la consommation",
    "Épargne et placements",
    "Assurance-vie",
    "Gestion de patrimoine",
    "Services aux entreprises",
    "Moyens de paiement",
    "Banque en ligne",
    "Fintech",
    "Courtage"
  ],
  "Beauté et Bien-être": [
    "Cosmétiques visage",
    "Cosmétiques corps",
    "Parfumerie",
    "Soins capillaires",
    "Maquillage",
    "Soins homme",
    "Produits bio et naturels",
    "Instituts de beauté",
    "Spa et thalasso",
    "Massage et relaxation",
    "Onglerie",
    "Équipements beauté"
  ],
  "Bâtiment et Construction": [
    "Gros œuvre",
    "Second œuvre",
    "Matériaux de construction",
    "Isolation et étanchéité",
    "Plomberie et chauffage",
    "Électricité",
    "Menuiserie",
    "Carrelage et revêtements",
    "Peinture et décoration",
    "Toiture et couverture",
    "Terrassement",
    "Rénovation énergétique"
  ],
  "Biens de consommation": [
    "Électroménager",
    "Mobilier",
    "Décoration",
    "Jardinage",
    "Bricolage",
    "Produits d'entretien",
    "Papeterie",
    "Jouets et jeux",
    "Articles de sport",
    "Bagagerie",
    "Produits pour animaux",
    "Électronique grand public"
  ],
  "Chimie et Pharmaceutique": [
    "Médicaments sur ordonnance",
    "Automédication",
    "Parapharmacie",
    "Compléments alimentaires",
    "Produits chimiques industriels",
    "Cosmétiques",
    "Produits d'hygiène",
    "Dispositifs médicaux",
    "Biotechnologies",
    "Recherche et développement",
    "Chimie fine",
    "Produits vétérinaires"
  ],
  "Communication et Médias": [
    "Publicité",
    "Relations publiques",
    "Marketing digital",
    "Production audiovisuelle",
    "Édition",
    "Presse",
    "Radio et télévision",
    "Événementiel",
    "Communication corporate",
    "Réseaux sociaux",
    "Création graphique",
    "Photographie"
  ],
  "Divertissement et Culture": [
    "Cinéma",
    "Musique",
    "Spectacles vivants",
    "Jeux vidéo",
    "Édition de livres",
    "Musées et patrimoine",
    "Festivals",
    "Parcs d'attractions",
    "Arts plastiques",
    "Danse",
    "Théâtre",
    "Production culturelle"
  ],
  "Éducation et Formation": [
    "Enseignement primaire",
    "Enseignement secondaire",
    "Enseignement supérieur",
    "Formation professionnelle",
    "Formation continue",
    "E-learning",
    "Langues étrangères",
    "Soutien scolaire",
    "Formation en entreprise",
    "Coaching",
    "Matériel pédagogique",
    "Orientation scolaire"
  ],
  "Énergie et Ressources": [
    "Électricité",
    "Gaz naturel",
    "Énergies renouvelables",
    "Pétrole et carburants",
    "Charbon",
    "Nucléaire",
    "Efficacité énergétique",
    "Stockage d'énergie",
    "Distribution d'énergie",
    "Services énergétiques",
    "Exploration minière",
    "Recyclage"
  ],
  "Environnement et Développement durable": [
    "Gestion des déchets",
    "Traitement de l'eau",
    "Énergies renouvelables",
    "Conseil environnemental",
    "Éco-construction",
    "Biodiversité",
    "Agriculture durable",
    "Transport écologique",
    "Économie circulaire",
    "Certification environnementale",
    "Dépollution",
    "Sensibilisation écologique"
  ],
  "FMCG (Fast-Moving Consumer Goods)": [
    "Produits d'hygiène",
    "Produits d'entretien",
    "Alimentation packagée",
    "Boissons",
    "Tabac",
    "Cosmétiques de masse",
    "Produits pour bébés",
    "Produits pour animaux",
    "Snacking",
    "Produits surgelés",
    "Conserves",
    "Produits bio"
  ],
  "Hôtellerie, Restauration et Loisirs": [
    "Hôtellerie",
    "Restauration traditionnelle",
    "Restauration rapide",
    "Cafés et bars",
    "Traiteur",
    "Tourisme",
    "Voyages organisés",
    "Loisirs et divertissement",
    "Parcs et jardins",
    "Sports et activités",
    "Hébergement alternatif",
    "Services de conciergerie"
  ],
  "Immobilier": [
    "Vente immobilière",
    "Location immobilière",
    "Gestion locative",
    "Promotion immobilière",
    "Immobilier commercial",
    "Immobilier industriel",
    "Expertise immobilière",
    "Syndic de copropriété",
    "Investissement immobilier",
    "Immobilier de luxe",
    "Logement social",
    "Proptech"
  ],
  "Industrie Manufacturière": [
    "Métallurgie",
    "Mécanique",
    "Électronique",
    "Textile",
    "Agroalimentaire industriel",
    "Chimie industrielle",
    "Plasturgie",
    "Papier et carton",
    "Bois et ameublement",
    "Équipements industriels",
    "Automation",
    "Maintenance industrielle"
  ],
  "Informatique et Technologies": [
    "Logiciels",
    "Hardware",
    "Services IT",
    "Cybersécurité",
    "Cloud computing",
    "Intelligence artificielle",
    "Développement web",
    "Applications mobiles",
    "Big Data",
    "IoT",
    "Blockchain",
    "Réalité virtuelle"
  ],
  "Juridique et Conseil": [
    "Droit des affaires",
    "Droit immobilier",
    "Droit de la famille",
    "Droit pénal",
    "Droit social",
    "Propriété intellectuelle",
    "Conseil en management",
    "Audit et expertise comptable",
    "Conseil fiscal",
    "Médiation",
    "Notariat",
    "Huissiers de justice"
  ],
  "Mode et Luxe": [
    "Prêt-à-porter femme",
    "Prêt-à-porter homme",
    "Lingerie",
    "Chaussures",
    "Maroquinerie",
    "Bijouterie",
    "Horlogerie",
    "Parfumerie de luxe",
    "Accessoires mode",
    "Vêtements enfant",
    "Sportswear",
    "Haute couture",
    "Vintage et seconde main"
  ],
  "ONG et Associations": [
    "Action humanitaire",
    "Environnement",
    "Éducation",
    "Santé",
    "Droits de l'homme",
    "Aide au développement",
    "Protection animale",
    "Culture et patrimoine",
    "Sport associatif",
    "Insertion sociale",
    "Recherche médicale",
    "Aide aux personnes âgées"
  ],
  "Retail et Distribution": [
    "Grande distribution",
    "Commerce de proximité",
    "E-commerce",
    "Magasins spécialisés",
    "Franchises",
    "Vente à distance",
    "Marketplace",
    "Distribution automatique",
    "Cash & carry",
    "Outlets",
    "Pop-up stores",
    "Commerce équitable"
  ],
  "Santé et Services sociaux": [
    "Hôpitaux",
    "Cliniques",
    "Médecine générale",
    "Spécialités médicales",
    "Pharmacies",
    "Laboratoires d'analyses",
    "Imagerie médicale",
    "Soins à domicile",
    "Maisons de retraite",
    "Handicap",
    "Aide sociale",
    "Télémédecine"
  ],
  "Sécurité et Défense": [
    "Sécurité privée",
    "Surveillance",
    "Systèmes d'alarme",
    "Cybersécurité",
    "Équipements de protection",
    "Sécurité incendie",
    "Défense nationale",
    "Sécurité industrielle",
    "Transport de fonds",
    "Contrôle d'accès",
    "Vidéosurveillance",
    "Formation sécurité"
  ],
  "Services B2B": [
    "Conseil en management",
    "Services informatiques",
    "Nettoyage industriel",
    "Sécurité",
    "Logistique",
    "Maintenance",
    "Formation professionnelle",
    "Ressources humaines",
    "Communication B2B",
    "Services financiers",
    "Externalisation",
    "Facility management"
  ],
  "Services B2C": [
    "Services à la personne",
    "Coiffure et esthétique",
    "Réparation",
    "Nettoyage à domicile",
    "Garde d'enfants",
    "Aide aux personnes âgées",
    "Cours particuliers",
    "Services administratifs",
    "Conciergerie",
    "Livraison",
    "Services funéraires",
    "Wedding planning"
  ],
  "Sport et Fitness": [
    "Équipements fitness",
    "Vêtements de sport",
    "Chaussures de sport",
    "Nutrition sportive",
    "Salles de sport",
    "Coaching personnel",
    "Sports collectifs",
    "Sports individuels",
    "Sports nautiques",
    "Sports d'hiver",
    "Outdoor et randonnée",
    "Récupération et bien-être"
  ],
  "Télécommunications": [
    "Téléphonie mobile",
    "Internet fixe",
    "Internet mobile",
    "Téléphonie fixe",
    "Télévision",
    "Services cloud",
    "Équipements réseau",
    "Solutions entreprises",
    "IoT et M2M",
    "Cybersécurité",
    "Data centers",
    "Fibre optique"
  ],
  "Transport et Logistique": [
    "Transport routier",
    "Transport ferroviaire",
    "Transport aérien",
    "Transport maritime",
    "Logistique",
    "Entreposage",
    "Messagerie et colis",
    "Transport urbain",
    "Mobilité partagée",
    "Véhicules électriques",
    "Supply chain",
    "Fret international"
  ]
};

// Fonction utilitaire pour récupérer les catégories d'un secteur
export const getCategoriesBySector = (sector: string): string[] => {
  return PRODUCT_CATEGORIES_BY_SECTOR[sector] || [];
};

// Classification des secteurs par type (pour compatibilité avec sectorUtils.ts)
export const SECTOR_CATEGORIES = {
  PHYSICAL_PRODUCTS: [
    'Agriculture & Agroalimentaire',
    'Automobile & Transport',
    'Textile & Mode',
    'Électronique & High-Tech',
    'Cosmétiques & Beauté',
    'Pharmacie & Santé',
    'Sport & Fitness',
    'Mode & Luxe',
    'Beauté & Bien-être'
  ],
  PURE_SERVICES: [
    'Services Financiers',
    'Éducation & Formation',
    'Santé & Médical',
    'Conseil & Consulting',
    'Marketing & Communication',
    'Immobilier',
    'Juridique & Conseil',
    'Assurance & Mutuelle',
    'Télécommunications',
    'ONG & Associations'
  ],
  HYBRID: [
    'Technologie & Logiciels',
    'E-commerce & Retail',
    'Tourisme & Hôtellerie',
    'Énergie & Environnement',
    'BTP & Construction',
    'Médias & Divertissement',
    'Restauration & Food Service',
    'Logistique & Transport',
    'Divertissement & Culture',
    'Retail & Distribution'
  ]
};

export interface SocialNetwork {
  name: string;
  features: string[];
}

export const SOCIAL_NETWORKS: SocialNetwork[] = [
  {
    name: "Facebook",
    features: ["Posts", "Images"]
  },
  {
    name: "Instagram",
    features: ["Posts", "Images", "Stories"]
  },
  {
    name: "LinkedIn",
    features: ["Posts", "Images"]
  }
];

export interface ContentObjective {
  category: string;
  objectives: string[];
}

export const CONTENT_OBJECTIVES: ContentObjective[] = [
  {
    category: "Notoriété",
    objectives: [
      "Augmenter la visibilité de la marque",
      "Développer la communauté",
      "Améliorer la reconnaissance de marque",
      "Atteindre de nouvelles audiences"
    ]
  },
  {
    category: "Engagement",
    objectives: [
      "Augmenter les interactions",
      "Créer une communauté active",
      "Stimuler les conversations",
      "Améliorer le taux d'engagement"
    ]
  },
  {
    category: "Conversion",
    objectives: [
      "Générer des leads",
      "Augmenter les ventes",
      "Promouvoir des produits/services",
      "Diriger le trafic vers le site web"
    ]
  },
  {
    category: "Fidélisation",
    objectives: [
      "Renforcer la relation client",
      "Améliorer la satisfaction client",
      "Encourager les recommandations",
      "Développer la loyauté à la marque"
    ]
  }
];

export interface ContentType {
  category: string;
  types: string[];
}

export const CONTENT_TYPES: ContentType[] = [
  {
    category: "Visuels",
    types: [
      "Photos de produits",
      "Infographies",
      "Carrousels",
      "Stories"
    ]
  }
];

export interface ToneOfVoice {
  style: string;
  description: string;
}

export const TONE_OF_VOICE: ToneOfVoice[] = [
  {
    style: "Professionnel",
    description: "Formel, expert et sérieux"
  },
  {
    style: "Décontracté",
    description: "Amical, accessible et naturel"
  },
  {
    style: "Inspirant",
    description: "Motivant, positif et énergique"
  },
  {
    style: "Éducatif",
    description: "Informatif, clair et pédagogique"
  },
  {
    style: "Humoristique",
    description: "Léger, divertissant et enjoué"
  },
  {
    style: "Premium",
    description: "Sophistiqué, élégant et exclusif"
  }
];

export const TARGET_AUDIENCES = {
  demographic: [
    "18-24 ans",
    "25-34 ans",
    "35-44 ans",
    "45-54 ans",
    "55+ ans",
    "Hommes",
    "Femmes"
  ],
  professional: [
    "Étudiants",
    "Jeunes actifs",
    "Cadres",
    "Entrepreneurs",
    "Décideurs",
    "Professionnels"
  ],
  behavioral: [
    "Early adopters",
    "Passionnés de technologie",
    "Éco-responsables",
    "Influenceurs",
    "Consommateurs premium"
  ],
  geographic: [
    "Urbain",
    "Périurbain",
    "Rural",
    "National",
    "International"
  ]
};

export const POSTING_FREQUENCY = [
  {
    network: "Facebook",
    recommendations: [
      "1-2 posts par jour",
      "Stories quotidiennes",
      "2-3 reels par semaine"
    ]
  },
  {
    network: "Instagram",
    recommendations: [
      "4-7 posts par semaine",
      "Stories quotidiennes",
      "2-3 reels par semaine"
    ]
  },
  {
    network: "LinkedIn",
    recommendations: [
      "3-5 posts par semaine",
      "1 article par semaine",
      "Stories occasionnelles"
    ]
  },
  {
    network: "Twitter",
    recommendations: [
      "3-5 tweets par jour",
      "1-2 threads par semaine",
      "Engagement quotidien"
    ]
  },
  {
    network: "TikTok",
    recommendations: [
      "1-3 vidéos par jour",
      "Lives hebdomadaires",
      "Participation aux trends"
    ]
  }
];

export interface CompetitorStrategy {
  id: string;
  label: string;
}

export const COMPETITOR_STRATEGIES: CompetitorStrategy[] = [
  {
    id: "influencers",
    label: "Utilisation efficace des influenceurs pour élargir la portée"
  },
  {
    id: "creative_campaigns",
    label: "Campagnes publicitaires créatives qui captent l'attention"
  },
  {
    id: "community_engagement",
    label: "Engagement actif avec la communauté (réponses rapides, jeux, enquêtes)"
  },
  {
    id: "video_content",
    label: "Contenu vidéo de haute qualité qui raconte une histoire"
  },
  {
    id: "promotions",
    label: "Utilisation stratégique de promotions et remises exclusives sur les réseaux sociaux"
  }
];

export interface SuccessMetric {
  id: string;
  label: string;
}

export const SUCCESS_METRICS: SuccessMetric[] = [
  {
    id: "engagement_metrics",
    label: "Nombre de likes, commentaires et partages"
  },
  {
    id: "follower_growth",
    label: "Taux de croissance des abonnés"
  },
  {
    id: "user_engagement",
    label: "Engagement des utilisateurs (temps passé sur la page, interactions)"
  },
  {
    id: "lead_conversion",
    label: "Conversion des leads en ventes"
  },
  {
    id: "campaign_roi",
    label: "Retour sur investissement des campagnes publicitaires"
  }
];

export interface RoiExpectation {
  id: string;
  label: string;
}

export const ROI_EXPECTATIONS: RoiExpectation[] = [
  {
    id: "follower_growth",
    label: "Augmentation du nombre de followers de 20% dans les six prochains mois"
  },
  {
    id: "engagement_improvement",
    label: "Amélioration de l'engagement de 30% sur tous les posts"
  },
  {
    id: "lead_generation",
    label: "Génération de 50 leads qualifiés par mois via les réseaux sociaux"
  },
  {
    id: "website_traffic",
    label: "Augmentation de 10% du trafic sur le site web provenant des réseaux sociaux"
  },
  {
    id: "campaign_roi",
    label: "Retour sur investissement de 5:1 pour les campagnes publicitaires sur les réseaux sociaux"
  }
];
