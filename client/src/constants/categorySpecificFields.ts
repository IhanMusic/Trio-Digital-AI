export interface TechnicalField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'multiselect' | 'boolean' | 'tags' | 'range';
  options?: string[];
  placeholder?: string;
  unit?: string;
  required?: boolean;
  min?: number;
  max?: number;
}

// Champs techniques spécialisés par catégorie de produit
export const TECHNICAL_FIELDS_BY_CATEGORY: Record<string, Record<string, TechnicalField[]>> = {
  "Beauté et Bien-être": {
    // === SOINS CAPILLAIRES ===
    "Shampoings": [
      { key: "usageOccasions", label: "Occasions d'usage", type: "multiselect", 
        options: ["Lavage quotidien", "Lavage fréquent", "Après sport", "Avant coloration", "Soin intensif", "Voyage"] },
      { key: "hairTypes", label: "Types de cheveux", type: "multiselect", 
        options: ["Normaux", "Secs", "Gras", "Mixtes", "Colorés", "Méchés", "Bouclés", "Lisses", "Fins", "Épais", "Abîmés", "Pellicules"] },
      { key: "activeIngredients", label: "Ingrédients actifs", type: "tags" },
      { key: "texture", label: "Texture", type: "select", 
        options: ["Gel", "Crème", "Mousse", "Huile", "Liquide transparent", "Liquide nacré"] },
      { key: "scalpConcerns", label: "Problèmes du cuir chevelu", type: "multiselect", 
        options: ["Pellicules", "Démangeaisons", "Irritations", "Excès de sébum", "Sécheresse", "Sensibilité"] },
      { key: "sulfateFree", label: "Sans sulfates", type: "boolean" },
      { key: "siliconeFree", label: "Sans silicones", type: "boolean" },
      { key: "parabensFreee", label: "Sans parabènes", type: "boolean" },
      { key: "colorSafe", label: "Protège la couleur", type: "boolean" },
      { key: "frequencyUse", label: "Fréquence d'utilisation", type: "select", 
        options: ["Usage quotidien", "2-3 fois par semaine", "1 fois par semaine", "Usage occasionnel"] },
      { key: "naturalOrigin", label: "% d'origine naturelle", type: "range", min: 0, max: 100, unit: "%" }
    ],

    "Après-shampoings et masques": [
      { key: "usageOccasions", label: "Occasions d'usage", type: "multiselect", 
        options: ["Après chaque shampoing", "1-2 fois par semaine", "Soin intensif", "Avant coiffage", "Démêlage"] },
      { key: "hairTypes", label: "Types de cheveux", type: "multiselect", 
        options: ["Normaux", "Secs", "Très secs", "Abîmés", "Colorés", "Bouclés", "Lisses", "Fins", "Épais", "Crépus"] },
      { key: "treatmentType", label: "Type de soin", type: "select", 
        options: ["Après-shampoing", "Masque", "Soin sans rinçage", "Baume", "Conditionneur"] },
      { key: "applicationTime", label: "Temps de pose", type: "select", 
        options: ["Instantané", "2-3 minutes", "5-10 minutes", "15-20 minutes", "Toute la nuit"] },
      { key: "benefits", label: "Bénéfices", type: "multiselect", 
        options: ["Démêlage", "Hydratation", "Nutrition", "Réparation", "Brillance", "Protection", "Volume", "Lissage"] },
      { key: "texture", label: "Texture", type: "select", 
        options: ["Crème légère", "Crème riche", "Baume", "Gel", "Huile", "Mousse"] },
      { key: "rinseOut", label: "À rincer", type: "boolean" },
      { key: "heatProtection", label: "Protection thermique", type: "boolean" }
    ],

    "Colorations capillaires": [
      { key: "usageOccasions", label: "Occasions d'usage", type: "multiselect", 
        options: ["Première coloration", "Retouches racines", "Changement de couleur", "Couverture cheveux blancs", "Reflets"] },
      { key: "hairTypes", label: "Types de cheveux", type: "multiselect", 
        options: ["Naturels", "Colorés", "Méchés", "Blancs", "Gris", "Fins", "Épais", "Abîmés", "Résistants"] },
      { key: "colorationType", label: "Type de coloration", type: "select", 
        options: ["Permanente", "Semi-permanente", "Temporaire", "Ton sur ton", "Décoloration", "Balayage"] },
      { key: "colorRange", label: "Gamme de couleurs", type: "multiselect", 
        options: ["Blonds", "Bruns", "Châtains", "Noirs", "Roux", "Fantaisie", "Cendrés", "Dorés", "Acajou"] },
      { key: "coverage", label: "Couverture cheveux blancs", type: "range", min: 0, max: 100, unit: "%" },
      { key: "developmentTime", label: "Temps de pose", type: "text", placeholder: "Ex: 30-45 minutes" },
      { key: "ammoniaFree", label: "Sans ammoniaque", type: "boolean" },
      { key: "ppd_Free", label: "Sans PPD", type: "boolean" },
      { key: "professionalUse", label: "Usage professionnel", type: "boolean" },
      { key: "aftercareRequired", label: "Soins spécifiques requis", type: "boolean" }
    ],

    // === SOINS VISAGE ===
    "Nettoyants visage": [
      { key: "usageOccasions", label: "Occasions d'usage", type: "multiselect", 
        options: ["Matin", "Soir", "Après sport", "Démaquillage", "Double nettoyage", "Voyage"] },
      { key: "skinTypes", label: "Types de peau", type: "multiselect", 
        options: ["Normale", "Sèche", "Grasse", "Mixte", "Sensible", "Mature", "Acnéique", "Déshydratée"] },
      { key: "cleansingType", label: "Type de nettoyage", type: "select", 
        options: ["Gel", "Mousse", "Crème", "Huile", "Baume", "Eau micellaire", "Lotion", "Savon"] },
      { key: "activeIngredients", label: "Ingrédients actifs", type: "tags" },
      { key: "makeupRemoval", label: "Démaquillant", type: "boolean" },
      { key: "waterproof", label: "Enlève le waterproof", type: "boolean" },
      { key: "rinsing", label: "Nécessite rinçage", type: "boolean" },
      { key: "eyesSafe", label: "Adapté contour des yeux", type: "boolean" }
    ],

    "Crèmes hydratantes visage": [
      { key: "usageOccasions", label: "Occasions d'usage", type: "multiselect", 
        options: ["Matin", "Soir", "Jour et nuit", "Sous maquillage", "Après rasage", "Voyage"] },
      { key: "skinTypes", label: "Types de peau", type: "multiselect", 
        options: ["Normale", "Sèche", "Très sèche", "Grasse", "Mixte", "Sensible", "Mature", "Déshydratée"] },
      { key: "texture", label: "Texture", type: "select", 
        options: ["Gel", "Crème légère", "Crème riche", "Fluide", "Baume", "Sérum-crème"] },
      { key: "spf", label: "Indice SPF", type: "number", min: 0, max: 100 },
      { key: "antiAging", label: "Anti-âge", type: "boolean" },
      { key: "mattifying", label: "Matifiant", type: "boolean" },
      { key: "tinted", label: "Teinté", type: "boolean" },
      { key: "activeIngredients", label: "Ingrédients actifs", type: "tags" }
    ],

    // === MAQUILLAGE ===
    "Fond de teint et correcteurs": [
      { key: "usageOccasions", label: "Occasions d'usage", type: "multiselect", 
        options: ["Quotidien", "Soirée", "Mariage", "Photo", "Longue tenue", "Sport"] },
      { key: "skinTypes", label: "Types de peau", type: "multiselect", 
        options: ["Normale", "Sèche", "Grasse", "Mixte", "Sensible", "Mature", "Acnéique"] },
      { key: "coverage", label: "Couvrance", type: "select", 
        options: ["Légère", "Moyenne", "Forte", "Modulable"] },
      { key: "finish", label: "Fini", type: "select", 
        options: ["Mat", "Satiné", "Lumineux", "Naturel", "Déwy"] },
      { key: "texture", label: "Texture", type: "select", 
        options: ["Liquide", "Crème", "Poudre", "Stick", "Cushion", "Mousse"] },
      { key: "spf", label: "Indice SPF", type: "number", min: 0, max: 50 },
      { key: "longWearing", label: "Longue tenue", type: "boolean" },
      { key: "waterproof", label: "Waterproof", type: "boolean" },
      { key: "buildable", label: "Modulable", type: "boolean" },
      { key: "shadeRange", label: "Nombre de teintes", type: "number", min: 1, max: 100 }
    ],

    // === SOINS CORPS ===
    "Crèmes hydratantes corps": [
      { key: "usageOccasions", label: "Occasions d'usage", type: "multiselect", 
        options: ["Après douche", "Matin", "Soir", "Massage", "Avant exposition solaire", "Après épilation"] },
      { key: "skinTypes", label: "Types de peau", type: "multiselect", 
        options: ["Normale", "Sèche", "Très sèche", "Sensible", "Atopique", "Mature", "Vergetures"] },
      { key: "texture", label: "Texture", type: "select", 
        options: ["Lait", "Crème", "Baume", "Huile", "Gel", "Mousse"] },
      { key: "absorption", label: "Absorption", type: "select", 
        options: ["Rapide", "Moyenne", "Lente", "Non grasse"] },
      { key: "bodyAreas", label: "Zones du corps", type: "multiselect", 
        options: ["Corps entier", "Mains", "Pieds", "Coudes/Genoux", "Décolleté", "Jambes"] },
      { key: "specialBenefits", label: "Bénéfices spéciaux", type: "multiselect", 
        options: ["Anti-âge", "Raffermissant", "Anti-vergetures", "Apaisant", "Réparateur", "Parfumé"] }
    ]
  },

  "Agroalimentaire et FMCG": {
    // === BOISSONS ===
    "Eaux": [
      { key: "usageOccasions", label: "Occasions d'usage", type: "multiselect", 
        options: ["Hydratation quotidienne", "Sport", "Repas", "Détox", "Digestion"] },
      { key: "waterType", label: "Type d'eau", type: "select", 
        options: ["Plate", "Gazeuse", "Légèrement gazeuse", "Aromatisée", "Minérale", "De source"] },
      { key: "mineralization", label: "Minéralisation", type: "select", 
        options: ["Faible", "Moyenne", "Forte", "Très faible"] },
      { key: "packaging", label: "Conditionnement", type: "multiselect", 
        options: ["Bouteille plastique", "Bouteille verre", "Canette", "Fontaine", "Pack"] },
      { key: "carbonation", label: "Niveau de gazéification", type: "select", 
        options: ["Non gazéifiée", "Légèrement gazéifiée", "Moyennement gazéifiée", "Fortement gazéifiée"] },
      { key: "ph", label: "pH", type: "number", min: 6, max: 9 },
      { key: "sodium", label: "Sodium", type: "number", unit: "mg/L" },
      { key: "calcium", label: "Calcium", type: "number", unit: "mg/L" },
      { key: "magnesium", label: "Magnésium", type: "number", unit: "mg/L" }
    ],

    "Jus de fruits": [
      { key: "usageOccasions", label: "Occasions d'usage", type: "multiselect", 
        options: ["Petit-déjeuner", "Collation", "Sport", "Détox", "Apéritif", "Goûter enfant"] },
      { key: "fruitContent", label: "Teneur en fruits", type: "range", min: 0, max: 100, unit: "%" },
      { key: "sugarContent", label: "Teneur en sucres", type: "number", unit: "g/100ml" },
      { key: "calories", label: "Calories", type: "number", unit: "kcal/100ml" },
      { key: "vitaminC", label: "Vitamine C", type: "number", unit: "mg/100ml" },
      { key: "preservation", label: "Conservation", type: "select", 
        options: ["Frais", "Longue conservation", "Pasteurisé", "HPP", "Surgelé"] },
      { key: "addedSugar", label: "Sucres ajoutés", type: "boolean" },
      { key: "pulp", label: "Avec pulpe", type: "boolean" },
      { key: "organic", label: "Biologique", type: "boolean" },
      { key: "flavors", label: "Parfums/Fruits", type: "tags" }
    ],

    // === SNACKING ===
    "Chips et apéritifs salés": [
      { key: "usageOccasions", label: "Occasions d'usage", type: "multiselect", 
        options: ["Apéritif", "Collation", "Pique-nique", "Soirée TV", "Pause bureau", "Fête"] },
      { key: "snackType", label: "Type de snack", type: "select", 
        options: ["Chips", "Crackers", "Biscuits apéritifs", "Fruits à coque", "Pop-corn", "Bretzels"] },
      { key: "mainIngredient", label: "Ingrédient principal", type: "select", 
        options: ["Pomme de terre", "Maïs", "Blé", "Légumineuses", "Légumes", "Céréales"] },
      { key: "cookingMethod", label: "Mode de cuisson", type: "select", 
        options: ["Frit", "Cuit au four", "Grillé", "Soufflé", "Déshydraté"] },
      { key: "saltContent", label: "Teneur en sel", type: "number", unit: "g/100g" },
      { key: "fatContent", label: "Teneur en matières grasses", type: "number", unit: "g/100g" },
      { key: "calories", label: "Calories", type: "number", unit: "kcal/100g" },
      { key: "flavors", label: "Saveurs", type: "tags" },
      { key: "texture", label: "Texture", type: "select", 
        options: ["Croustillant", "Croquant", "Moelleux", "Soufflé"] },
      { key: "spiciness", label: "Niveau de piment", type: "select", 
        options: ["Doux", "Légèrement épicé", "Épicé", "Très épicé"] }
    ],

    "Biscuits secs et petits-beurre": [
      { key: "usageOccasions", label: "Occasions d'usage", type: "multiselect", 
        options: ["Petit-déjeuner", "Goûter", "Pause café", "Collation", "Dessert", "Voyage"] },
      { key: "biscuitType", label: "Type de biscuit", type: "select", 
        options: ["Petit-beurre", "Sablé", "Digestif", "Galette", "Cracker sucré", "Biscotte"] },
      { key: "texture", label: "Texture", type: "select", 
        options: ["Croquant", "Fondant", "Croustillant", "Moelleux"] },
      { key: "sweetness", label: "Niveau de sucré", type: "select", 
        options: ["Peu sucré", "Moyennement sucré", "Sucré", "Très sucré"] },
      { key: "calories", label: "Calories", type: "number", unit: "kcal/100g" },
      { key: "sugars", label: "Sucres", type: "number", unit: "g/100g" },
      { key: "fats", label: "Matières grasses", type: "number", unit: "g/100g" },
      { key: "fiber", label: "Fibres", type: "number", unit: "g/100g" },
      { key: "wholegrains", label: "Céréales complètes", type: "boolean" },
      { key: "butter", label: "Au beurre", type: "boolean" }
    ]
  },

  "Automobile": {
    // === VÉHICULES ===
    "Véhicules neufs": [
      { key: "enginePower", label: "Puissance moteur", type: "number", unit: "ch" },
      { key: "fuelConsumption", label: "Consommation (L/100km)", type: "number", unit: "L/100km" },
      { key: "co2Emissions", label: "Émissions CO2", type: "number", unit: "g/km" },
      { key: "fuelType", label: "Type de carburant", type: "select", 
        options: ["Essence", "Diesel", "Hybride", "Électrique", "GPL", "GNV", "Hydrogène"] },
      { key: "transmission", label: "Transmission", type: "select", 
        options: ["Manuelle", "Automatique", "CVT", "Robotisée", "Séquentielle"] },
      { key: "drivetrain", label: "Transmission", type: "select", 
        options: ["Traction", "Propulsion", "4x4", "Intégrale"] },
      { key: "seatingCapacity", label: "Nombre de places", type: "number", min: 1, max: 9 },
      { key: "warranty", label: "Garantie", type: "text", placeholder: "Ex: 5 ans ou 100 000 km" },
      { key: "safetyRating", label: "Note sécurité Euro NCAP", type: "select", 
        options: ["5 étoiles", "4 étoiles", "3 étoiles", "2 étoiles", "1 étoile", "Non testé"] },
      { key: "bodyType", label: "Carrosserie", type: "select", 
        options: ["Berline", "Break", "SUV", "Coupé", "Cabriolet", "Monospace", "Pick-up"] },
      { key: "autonomy", label: "Autonomie électrique", type: "number", unit: "km" }
    ],

    "Véhicules d'occasion": [
      { key: "mileage", label: "Kilométrage", type: "number", unit: "km" },
      { key: "year", label: "Année", type: "number", min: 1990, max: 2025 },
      { key: "previousOwners", label: "Nombre de propriétaires", type: "number", min: 1, max: 10 },
      { key: "serviceHistory", label: "Historique d'entretien", type: "boolean" },
      { key: "accidentHistory", label: "Historique d'accidents", type: "boolean" },
      { key: "condition", label: "État général", type: "select", 
        options: ["Excellent", "Très bon", "Bon", "Correct", "À rénover"] },
      { key: "enginePower", label: "Puissance moteur", type: "number", unit: "ch" },
      { key: "fuelType", label: "Type de carburant", type: "select", 
        options: ["Essence", "Diesel", "Hybride", "Électrique", "GPL", "GNV"] },
      { key: "transmission", label: "Transmission", type: "select", 
        options: ["Manuelle", "Automatique", "CVT", "Robotisée"] },
      { key: "lastService", label: "Dernier entretien", type: "text", placeholder: "Ex: il y a 6 mois" },
      { key: "remainingWarranty", label: "Garantie restante", type: "text" }
    ],

    // === PIÈCES ET ACCESSOIRES ===
    "Pièces détachées": [
      { key: "partCategory", label: "Catégorie de pièce", type: "select", 
        options: ["Moteur", "Transmission", "Freinage", "Suspension", "Électrique", "Carrosserie", "Intérieur"] },
      { key: "partNumber", label: "Référence pièce", type: "text" },
      { key: "compatibility", label: "Compatibilité véhicules", type: "tags" },
      { key: "brandCompatibility", label: "Marques compatibles", type: "multiselect", 
        options: ["Renault", "Peugeot", "Citroën", "Volkswagen", "BMW", "Mercedes", "Audi", "Ford", "Opel"] },
      { key: "partCondition", label: "État de la pièce", type: "select", 
        options: ["Neuf", "Reconditionné", "Occasion", "Échange standard"] },
      { key: "warranty", label: "Garantie", type: "text", placeholder: "Ex: 2 ans" },
      { key: "installation", label: "Installation requise", type: "select", 
        options: ["Facile", "Moyenne", "Difficile", "Professionnel requis"] },
      { key: "oem", label: "Pièce d'origine (OEM)", type: "boolean" },
      { key: "aftermarket", label: "Pièce adaptable", type: "boolean" }
    ]
  },

  "Mode et Luxe": {
    // === VÊTEMENTS ===
    "Prêt-à-porter femme": [
      { key: "clothingType", label: "Type de vêtement", type: "select", 
        options: ["Robe", "Jupe", "Pantalon", "Jean", "Chemisier", "T-shirt", "Pull", "Veste", "Manteau"] },
      { key: "sizes", label: "Tailles disponibles", type: "multiselect", 
        options: ["XS", "S", "M", "L", "XL", "XXL", "34", "36", "38", "40", "42", "44", "46", "48"] },
      { key: "materials", label: "Matières", type: "tags" },
      { key: "colors", label: "Coloris disponibles", type: "tags" },
      { key: "season", label: "Saison", type: "multiselect", 
        options: ["Printemps", "Été", "Automne", "Hiver", "Mi-saison", "Toute saison"] },
      { key: "occasion", label: "Occasion", type: "multiselect", 
        options: ["Quotidien", "Bureau", "Soirée", "Cérémonie", "Sport", "Détente", "Vacances"] },
      { key: "fit", label: "Coupe", type: "select", 
        options: ["Slim", "Regular", "Loose", "Oversize", "Ajusté", "Ample"] },
      { key: "careInstructions", label: "Instructions d'entretien", type: "textarea" },
      { key: "madeIn", label: "Fabriqué en", type: "text" },
      { key: "sustainableMaterials", label: "Matières durables", type: "boolean" },
      { key: "limitedEdition", label: "Édition limitée", type: "boolean" }
    ],

    // === ACCESSOIRES ===
    "Maroquinerie": [
      { key: "productType", label: "Type de produit", type: "select", 
        options: ["Sac à main", "Portefeuille", "Ceinture", "Pochette", "Sac à dos", "Valise", "Porte-documents"] },
      { key: "materials", label: "Matières", type: "multiselect", 
        options: ["Cuir véritable", "Cuir synthétique", "Toile", "Nylon", "Daim", "Crocodile", "Python"] },
      { key: "dimensions", label: "Dimensions", type: "text", placeholder: "Ex: 30x20x10 cm" },
      { key: "capacity", label: "Capacité", type: "text", placeholder: "Ex: 15L ou A4" },
      { key: "compartments", label: "Nombre de compartiments", type: "number", min: 1, max: 20 },
      { key: "closureType", label: "Type de fermeture", type: "multiselect", 
        options: ["Zip", "Bouton-pression", "Aimant", "Boucle", "Scratch", "Cordon"] },
      { key: "handleType", label: "Type de portage", type: "multiselect", 
        options: ["Poignées", "Bandoulière", "Chaîne", "Dos", "Main", "Épaule"] },
      { key: "colors", label: "Coloris disponibles", type: "tags" },
      { key: "hardwareColor", label: "Couleur des accessoires", type: "multiselect", 
        options: ["Doré", "Argenté", "Bronze", "Noir", "Gunmetal"] },
      { key: "waterResistant", label: "Résistant à l'eau", type: "boolean" },
      { key: "luxury", label: "Produit de luxe", type: "boolean" }
    ],

    // === BIJOUTERIE ===
    "Bijouterie": [
      { key: "jewelryType", label: "Type de bijou", type: "select", 
        options: ["Bague", "Collier", "Bracelet", "Boucles d'oreilles", "Broche", "Pendentif", "Chaîne"] },
      { key: "materials", label: "Matériaux", type: "multiselect", 
        options: ["Or 18k", "Or 14k", "Or 9k", "Argent 925", "Platine", "Acier inoxydable", "Titane", "Vermeil"] },
      { key: "gemstones", label: "Pierres précieuses", type: "tags" },
      { key: "caratWeight", label: "Poids en carats", type: "number", min: 0, max: 50 },
      { key: "setting", label: "Type de sertissage", type: "select", 
        options: ["Griffe", "Clos", "Pavé", "Rail", "Tension", "Invisible"] },
      { key: "sizes", label: "Tailles disponibles", type: "multiselect", 
        options: ["48", "50", "52", "54", "56", "58", "60", "62", "Ajustable"] },
      { key: "chainLength", label: "Longueur chaîne", type: "text", placeholder: "Ex: 45 cm" },
      { key: "hallmarked", label: "Poinçonné", type: "boolean" },
      { key: "handmade", label: "Fait main", type: "boolean" },
      { key: "giftBox", label: "Écrin inclus", type: "boolean" },
      { key: "certificate", label: "Certificat d'authenticité", type: "boolean" }
    ]
  }
};

// Fonction pour obtenir les champs techniques selon le secteur et la catégorie
export const getTechnicalFieldsByCategory = (sector: string, category: string): TechnicalField[] => {
  const sectorFields = TECHNICAL_FIELDS_BY_CATEGORY[sector];
  if (!sectorFields) return [];
  
  const categoryFields = sectorFields[category];
  if (!categoryFields) return [];
  
  return categoryFields;
};

// Fonction pour vérifier si une catégorie a des champs spécialisés
export const hasCategorySpecificFields = (sector: string, category: string): boolean => {
  return !!(TECHNICAL_FIELDS_BY_CATEGORY[sector]?.[category]);
};
