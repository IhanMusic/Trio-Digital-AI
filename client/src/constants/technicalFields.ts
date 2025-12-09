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

export const TECHNICAL_FIELDS_BY_SECTOR: Record<string, TechnicalField[]> = {
  "Agroalimentaire et FMCG": [
    { key: "usageOccasions", label: "Occasions d'usage", type: "multiselect", 
      options: ["Petit-déjeuner", "Déjeuner", "Dîner", "Collation", "Avant sport", "Après sport", "En déplacement", "À la maison", "Au travail", "Moment détente"] },
    { key: "flavors", label: "Arômes", type: "tags" },
    { key: "scents", label: "Parfums", type: "tags" },
    { key: "calories", label: "Calories (pour 100g/ml)", type: "number", unit: "kcal" },
    { key: "proteins", label: "Protéines", type: "number", unit: "g" },
    { key: "carbs", label: "Glucides", type: "number", unit: "g" },
    { key: "fats", label: "Lipides", type: "number", unit: "g" },
    { key: "allergens", label: "Allergènes", type: "multiselect", 
      options: ["Gluten", "Lactose", "Fruits à coque", "Œufs", "Soja", "Poisson", "Crustacés", "Céleri", "Moutarde", "Sésame", "Sulfites", "Lupin", "Mollusques"] },
    { key: "preservatives", label: "Conservateurs", type: "tags" },
    { key: "origin", label: "Origine des ingrédients", type: "text" },
    { key: "shelfLife", label: "Durée de conservation", type: "text", placeholder: "Ex: 12 mois" },
    { key: "storageTemp", label: "Température de conservation", type: "text", placeholder: "Ex: 2-8°C" },
    { key: "organicCertified", label: "Certifié biologique", type: "boolean" },
    { key: "glutenFree", label: "Sans gluten", type: "boolean" },
    { key: "vegan", label: "Vegan", type: "boolean" },
    { key: "kosher", label: "Casher", type: "boolean" },
    { key: "halal", label: "Halal", type: "boolean" }
  ],

  "Beauté et Bien-être": [
    { key: "usageOccasions", label: "Occasions d'usage", type: "multiselect", 
      options: ["Soin du matin", "Soin du soir", "Avant maquillage", "Après démaquillage", "Avant sport", "Après sport", "Moment détente", "Soin express", "Routine hebdomadaire"] },
    { key: "skinTypes", label: "Types de peau", type: "multiselect", 
      options: ["Normale", "Sèche", "Grasse", "Mixte", "Sensible", "Mature", "Acnéique"] },
    { key: "activeIngredients", label: "Ingrédients actifs", type: "tags" },
    { key: "spf", label: "Indice SPF", type: "number", min: 0, max: 100 },
    { key: "applicationTime", label: "Moment d'application", type: "multiselect", 
      options: ["Matin", "Soir", "Jour et nuit"] },
    { key: "texture", label: "Texture", type: "select", 
      options: ["Gel", "Crème", "Fluide", "Baume", "Huile", "Sérum", "Mousse", "Lotion"] },
    { key: "ageRange", label: "Tranche d'âge", type: "select", 
      options: ["Tous âges", "16-25 ans", "25-35 ans", "35-45 ans", "45+ ans"] },
    { key: "dermatologicallyTested", label: "Testé dermatologiquement", type: "boolean" },
    { key: "hypoallergenic", label: "Hypoallergénique", type: "boolean" },
    { key: "parabensFreee", label: "Sans parabènes", type: "boolean" },
    { key: "siliconeFree", label: "Sans silicones", type: "boolean" },
    { key: "crueltyfree", label: "Non testé sur animaux", type: "boolean" },
    { key: "naturalOrigin", label: "% d'origine naturelle", type: "range", min: 0, max: 100, unit: "%" }
  ],

  "Automobile": [
    { key: "enginePower", label: "Puissance moteur", type: "number", unit: "ch" },
    { key: "fuelConsumption", label: "Consommation (L/100km)", type: "number", unit: "L/100km" },
    { key: "co2Emissions", label: "Émissions CO2", type: "number", unit: "g/km" },
    { key: "fuelType", label: "Type de carburant", type: "select", 
      options: ["Essence", "Diesel", "Hybride", "Électrique", "GPL", "GNV"] },
    { key: "transmission", label: "Transmission", type: "select", 
      options: ["Manuelle", "Automatique", "CVT", "Robotisée"] },
    { key: "drivetrain", label: "Transmission", type: "select", 
      options: ["Traction", "Propulsion", "4x4", "Intégrale"] },
    { key: "seatingCapacity", label: "Nombre de places", type: "number", min: 1, max: 9 },
    { key: "warranty", label: "Garantie", type: "text", placeholder: "Ex: 5 ans ou 100 000 km" },
    { key: "safetyRating", label: "Note sécurité Euro NCAP", type: "select", 
      options: ["5 étoiles", "4 étoiles", "3 étoiles", "2 étoiles", "1 étoile", "Non testé"] }
  ],

  "Mode et Luxe": [
    { key: "materials", label: "Matières", type: "tags" },
    { key: "sizes", label: "Tailles disponibles", type: "multiselect", 
      options: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
    { key: "colors", label: "Coloris disponibles", type: "tags" },
    { key: "careInstructions", label: "Instructions d'entretien", type: "textarea" },
    { key: "madeIn", label: "Fabriqué en", type: "text" },
    { key: "sustainableMaterials", label: "Matières durables", type: "boolean" },
    { key: "recycledMaterials", label: "Matières recyclées", type: "boolean" },
    { key: "ethicalProduction", label: "Production éthique", type: "boolean" },
    { key: "limitedEdition", label: "Édition limitée", type: "boolean" },
    { key: "seasonCollection", label: "Collection", type: "select", 
      options: ["Printemps/Été", "Automne/Hiver", "Permanente", "Capsule"] }
  ],

  "Informatique et Technologies": [
    { key: "operatingSystem", label: "Système d'exploitation", type: "select", 
      options: ["Windows", "macOS", "Linux", "iOS", "Android", "Web", "Multi-plateforme"] },
    { key: "compatibility", label: "Compatibilité", type: "multiselect", 
      options: ["PC", "Mac", "Mobile", "Tablette", "Cloud"] },
    { key: "storage", label: "Stockage", type: "text", placeholder: "Ex: 256 GB SSD" },
    { key: "ram", label: "Mémoire RAM", type: "text", placeholder: "Ex: 8 GB" },
    { key: "processor", label: "Processeur", type: "text" },
    { key: "connectivity", label: "Connectivité", type: "multiselect", 
      options: ["WiFi", "Bluetooth", "4G", "5G", "USB-C", "Lightning", "Ethernet"] },
    { key: "batteryLife", label: "Autonomie batterie", type: "text", placeholder: "Ex: 10 heures" },
    { key: "warranty", label: "Garantie", type: "text", placeholder: "Ex: 2 ans" },
    { key: "certifications", label: "Certifications", type: "multiselect", 
      options: ["CE", "FCC", "Energy Star", "EPEAT", "ISO 27001"] }
  ],

  "Sport et Fitness": [
    { key: "activityType", label: "Type d'activité", type: "multiselect", 
      options: ["Running", "Fitness", "Musculation", "Yoga", "Natation", "Cyclisme", "Sports collectifs", "Outdoor"] },
    { key: "skillLevel", label: "Niveau", type: "select", 
      options: ["Débutant", "Intermédiaire", "Avancé", "Professionnel"] },
    { key: "materials", label: "Matériaux", type: "tags" },
    { key: "waterResistant", label: "Résistant à l'eau", type: "boolean" },
    { key: "breathable", label: "Respirant", type: "boolean" },
    { key: "antibacterial", label: "Antibactérien", type: "boolean" },
    { key: "uvProtection", label: "Protection UV", type: "boolean" },
    { key: "weight", label: "Poids", type: "text", placeholder: "Ex: 250g" },
    { key: "dimensions", label: "Dimensions", type: "text" }
  ],

  "Artisanat et Métiers d'art": [
    { key: "craftTechnique", label: "Technique artisanale", type: "text" },
    { key: "materials", label: "Matériaux utilisés", type: "tags" },
    { key: "handmade", label: "Fait main", type: "boolean" },
    { key: "uniquePiece", label: "Pièce unique", type: "boolean" },
    { key: "artisanName", label: "Nom de l'artisan", type: "text" },
    { key: "productionTime", label: "Temps de fabrication", type: "text", placeholder: "Ex: 2 semaines" },
    { key: "origin", label: "Région d'origine", type: "text" },
    { key: "traditionalMethod", label: "Méthode traditionnelle", type: "boolean" }
  ],

  "Assurance et Mutuelle": [
    { key: "coverage", label: "Couverture", type: "tags" },
    { key: "deductible", label: "Franchise", type: "text", placeholder: "Ex: 500€" },
    { key: "monthlyPremium", label: "Cotisation mensuelle", type: "text", placeholder: "Ex: 45€/mois" },
    { key: "ageLimit", label: "Limite d'âge", type: "text" },
    { key: "waitingPeriod", label: "Délai de carence", type: "text" },
    { key: "reimbursementRate", label: "Taux de remboursement", type: "range", min: 0, max: 100, unit: "%" },
    { key: "onlineManagement", label: "Gestion en ligne", type: "boolean" }
  ],

  "Banque et Finance": [
    { key: "interestRate", label: "Taux d'intérêt", type: "number", unit: "%" },
    { key: "fees", label: "Frais", type: "tags" },
    { key: "minimumDeposit", label: "Dépôt minimum", type: "text", placeholder: "Ex: 1000€" },
    { key: "accountType", label: "Type de compte", type: "select", 
      options: ["Courant", "Épargne", "Professionnel", "Jeune", "Premium"] },
    { key: "onlineBanking", label: "Banque en ligne", type: "boolean" },
    { key: "mobileApp", label: "Application mobile", type: "boolean" },
    { key: "customerService", label: "Service client 24h/24", type: "boolean" }
  ],

  "Bâtiment et Construction": [
    { key: "materials", label: "Matériaux", type: "tags" },
    { key: "dimensions", label: "Dimensions", type: "text" },
    { key: "weight", label: "Poids", type: "text", placeholder: "Ex: 25kg/m²" },
    { key: "fireResistance", label: "Résistance au feu", type: "text" },
    { key: "thermalInsulation", label: "Isolation thermique", type: "text", placeholder: "Ex: R=5 m².K/W" },
    { key: "waterResistance", label: "Résistance à l'eau", type: "boolean" },
    { key: "ecoFriendly", label: "Écologique", type: "boolean" },
    { key: "warranty", label: "Garantie", type: "text", placeholder: "Ex: 10 ans" }
  ],

  "Biens de consommation": [
    { key: "dimensions", label: "Dimensions", type: "text" },
    { key: "weight", label: "Poids", type: "text" },
    { key: "materials", label: "Matériaux", type: "tags" },
    { key: "powerConsumption", label: "Consommation électrique", type: "text", placeholder: "Ex: 150W" },
    { key: "warranty", label: "Garantie", type: "text", placeholder: "Ex: 2 ans" },
    { key: "ecoLabel", label: "Label écologique", type: "boolean" },
    { key: "madeIn", label: "Fabriqué en", type: "text" }
  ],

  "Chimie et Pharmaceutique": [
    { key: "activeIngredients", label: "Principes actifs", type: "tags" },
    { key: "concentration", label: "Concentration", type: "text" },
    { key: "dosage", label: "Posologie", type: "textarea" },
    { key: "contraindications", label: "Contre-indications", type: "textarea" },
    { key: "sideEffects", label: "Effets secondaires", type: "textarea" },
    { key: "storageConditions", label: "Conditions de stockage", type: "text" },
    { key: "expiryDate", label: "Durée de validité", type: "text" },
    { key: "prescriptionRequired", label: "Sur ordonnance", type: "boolean" }
  ],

  "Communication et Médias": [
    { key: "serviceType", label: "Type de service", type: "select", 
      options: ["Publicité", "Relations publiques", "Marketing digital", "Événementiel", "Création graphique"] },
    { key: "targetAudience", label: "Audience cible", type: "tags" },
    { key: "deliveryTime", label: "Délai de livraison", type: "text" },
    { key: "revisions", label: "Nombre de révisions incluses", type: "number" },
    { key: "formats", label: "Formats livrés", type: "multiselect", 
      options: ["Print", "Digital", "Vidéo", "Audio", "Web"] }
  ],

  "Divertissement et Culture": [
    { key: "genre", label: "Genre", type: "tags" },
    { key: "duration", label: "Durée", type: "text", placeholder: "Ex: 2h30" },
    { key: "ageRating", label: "Classification d'âge", type: "select", 
      options: ["Tous publics", "6 ans", "12 ans", "16 ans", "18 ans"] },
    { key: "language", label: "Langue", type: "multiselect", 
      options: ["Français", "Anglais", "Espagnol", "Italien", "Allemand"] },
    { key: "subtitles", label: "Sous-titres disponibles", type: "multiselect", 
      options: ["Français", "Anglais", "Espagnol", "Italien", "Allemand"] },
    { key: "format", label: "Format", type: "multiselect", 
      options: ["DVD", "Blu-ray", "Streaming", "Téléchargement"] }
  ],

  "Éducation et Formation": [
    { key: "level", label: "Niveau", type: "select", 
      options: ["Débutant", "Intermédiaire", "Avancé", "Expert"] },
    { key: "duration", label: "Durée", type: "text", placeholder: "Ex: 40 heures" },
    { key: "format", label: "Format", type: "multiselect", 
      options: ["Présentiel", "En ligne", "Hybride", "E-learning"] },
    { key: "certification", label: "Certification", type: "boolean" },
    { key: "prerequisites", label: "Prérequis", type: "textarea" },
    { key: "languages", label: "Langues", type: "multiselect", 
      options: ["Français", "Anglais", "Espagnol", "Italien", "Allemand"] }
  ],

  "Énergie et Ressources": [
    { key: "energyType", label: "Type d'énergie", type: "select", 
      options: ["Solaire", "Éolienne", "Hydraulique", "Nucléaire", "Gaz", "Charbon"] },
    { key: "capacity", label: "Capacité", type: "text", placeholder: "Ex: 5 kW" },
    { key: "efficiency", label: "Rendement", type: "range", min: 0, max: 100, unit: "%" },
    { key: "lifespan", label: "Durée de vie", type: "text", placeholder: "Ex: 25 ans" },
    { key: "carbonFootprint", label: "Empreinte carbone", type: "text", placeholder: "Ex: 50g CO2/kWh" },
    { key: "renewable", label: "Renouvelable", type: "boolean" }
  ],

  "Environnement et Développement durable": [
    { key: "ecoImpact", label: "Impact écologique", type: "textarea" },
    { key: "carbonReduction", label: "Réduction CO2", type: "text", placeholder: "Ex: -30% d'émissions" },
    { key: "recyclable", label: "Recyclable", type: "boolean" },
    { key: "biodegradable", label: "Biodégradable", type: "boolean" },
    { key: "certifications", label: "Certifications environnementales", type: "multiselect", 
      options: ["ISO 14001", "PEFC", "FSC", "Cradle to Cradle", "Ecolabel"] },
    { key: "energyClass", label: "Classe énergétique", type: "select", 
      options: ["A+++", "A++", "A+", "A", "B", "C", "D"] }
  ],

  "Hôtellerie, Restauration et Loisirs": [
    { key: "capacity", label: "Capacité d'accueil", type: "number" },
    { key: "starRating", label: "Classification étoiles", type: "select", 
      options: ["1 étoile", "2 étoiles", "3 étoiles", "4 étoiles", "5 étoiles", "Palace"] },
    { key: "amenities", label: "Équipements", type: "multiselect", 
      options: ["WiFi", "Piscine", "Spa", "Restaurant", "Bar", "Salle de sport", "Parking"] },
    { key: "cuisine", label: "Type de cuisine", type: "tags" },
    { key: "accessibility", label: "Accessible PMR", type: "boolean" },
    { key: "petFriendly", label: "Animaux acceptés", type: "boolean" }
  ],

  "Immobilier": [
    { key: "surface", label: "Surface", type: "text", placeholder: "Ex: 85 m²" },
    { key: "rooms", label: "Nombre de pièces", type: "number" },
    { key: "bedrooms", label: "Chambres", type: "number" },
    { key: "bathrooms", label: "Salles de bain", type: "number" },
    { key: "floor", label: "Étage", type: "text" },
    { key: "elevator", label: "Ascenseur", type: "boolean" },
    { key: "parking", label: "Parking", type: "boolean" },
    { key: "balcony", label: "Balcon/Terrasse", type: "boolean" },
    { key: "energyClass", label: "Classe énergétique", type: "select", 
      options: ["A", "B", "C", "D", "E", "F", "G"] },
    { key: "heatingType", label: "Type de chauffage", type: "select", 
      options: ["Individuel gaz", "Individuel électrique", "Collectif", "Pompe à chaleur"] }
  ],

  "Industrie Manufacturière": [
    { key: "productionCapacity", label: "Capacité de production", type: "text" },
    { key: "materials", label: "Matières premières", type: "tags" },
    { key: "qualityStandards", label: "Normes qualité", type: "multiselect", 
      options: ["ISO 9001", "ISO 14001", "OHSAS 18001", "CE", "FDA"] },
    { key: "leadTime", label: "Délai de fabrication", type: "text" },
    { key: "customization", label: "Personnalisation possible", type: "boolean" },
    { key: "minimumOrder", label: "Commande minimum", type: "text" }
  ],

  "Juridique et Conseil": [
    { key: "expertise", label: "Domaines d'expertise", type: "multiselect", 
      options: ["Droit des affaires", "Droit immobilier", "Droit de la famille", "Droit pénal", "Droit social"] },
    { key: "experience", label: "Années d'expérience", type: "number" },
    { key: "languages", label: "Langues parlées", type: "multiselect", 
      options: ["Français", "Anglais", "Espagnol", "Italien", "Allemand"] },
    { key: "consultationFee", label: "Tarif consultation", type: "text", placeholder: "Ex: 200€/heure" },
    { key: "emergencyService", label: "Service d'urgence", type: "boolean" }
  ],

  "ONG et Associations": [
    { key: "cause", label: "Cause défendue", type: "tags" },
    { key: "targetBeneficiaries", label: "Bénéficiaires cibles", type: "tags" },
    { key: "geographicScope", label: "Zone d'intervention", type: "multiselect", 
      options: ["Local", "Régional", "National", "International"] },
    { key: "volunteers", label: "Nombre de bénévoles", type: "number" },
    { key: "taxDeductible", label: "Dons déductibles d'impôts", type: "boolean" },
    { key: "transparency", label: "Label de transparence", type: "boolean" }
  ],

  "Retail et Distribution": [
    { key: "storeFormat", label: "Format de magasin", type: "select", 
      options: ["Hypermarché", "Supermarché", "Proximité", "Spécialisé", "En ligne"] },
    { key: "productRange", label: "Gamme de produits", type: "tags" },
    { key: "deliveryOptions", label: "Options de livraison", type: "multiselect", 
      options: ["Livraison à domicile", "Click & Collect", "Drive", "Retrait magasin"] },
    { key: "paymentMethods", label: "Moyens de paiement", type: "multiselect", 
      options: ["Carte bancaire", "Espèces", "Chèque", "Paiement mobile", "Crypto"] },
    { key: "loyaltyProgram", label: "Programme de fidélité", type: "boolean" }
  ],

  "Santé et Services sociaux": [
    { key: "specialties", label: "Spécialités médicales", type: "multiselect", 
      options: ["Cardiologie", "Dermatologie", "Pédiatrie", "Gynécologie", "Orthopédie", "Neurologie"] },
    { key: "equipment", label: "Équipements disponibles", type: "tags" },
    { key: "emergencyService", label: "Service d'urgence", type: "boolean" },
    { key: "insurance", label: "Conventionné sécurité sociale", type: "boolean" },
    { key: "accessibility", label: "Accessible PMR", type: "boolean" },
    { key: "languages", label: "Langues parlées", type: "multiselect", 
      options: ["Français", "Anglais", "Espagnol", "Italien", "Allemand", "Arabe"] }
  ],

  "Sécurité et Défense": [
    { key: "securityLevel", label: "Niveau de sécurité", type: "select", 
      options: ["Standard", "Renforcé", "Haute sécurité", "Très haute sécurité"] },
    { key: "certifications", label: "Certifications", type: "multiselect", 
      options: ["APSAD", "CNPP", "A2P", "ISO 27001", "Common Criteria"] },
    { key: "responseTime", label: "Temps de réponse", type: "text", placeholder: "Ex: < 15 minutes" },
    { key: "coverage", label: "Zone de couverture", type: "text" },
    { key: "monitoring", label: "Surveillance 24h/24", type: "boolean" }
  ],

  "Services B2B": [
    { key: "serviceType", label: "Type de service", type: "tags" },
    { key: "clientSize", label: "Taille de clients", type: "multiselect", 
      options: ["TPE", "PME", "ETI", "Grandes entreprises", "Multinationales"] },
    { key: "sla", label: "Accord de niveau de service", type: "text" },
    { key: "support", label: "Support client", type: "multiselect", 
      options: ["Email", "Téléphone", "Chat", "Sur site", "24h/24"] },
    { key: "scalability", label: "Évolutivité", type: "boolean" }
  ],

  "Services B2C": [
    { key: "serviceArea", label: "Zone de service", type: "text" },
    { key: "availability", label: "Disponibilité", type: "multiselect", 
      options: ["Lundi-Vendredi", "Week-end", "Soirées", "24h/24", "Sur rendez-vous"] },
    { key: "homeService", label: "Service à domicile", type: "boolean" },
    { key: "emergencyService", label: "Service d'urgence", type: "boolean" },
    { key: "insurance", label: "Assuré", type: "boolean" },
    { key: "guarantee", label: "Garantie", type: "text", placeholder: "Ex: Satisfait ou remboursé" }
  ],

  "Télécommunications": [
    { key: "networkType", label: "Type de réseau", type: "multiselect", 
      options: ["2G", "3G", "4G", "5G", "Fibre", "ADSL", "Satellite"] },
    { key: "dataAllowance", label: "Enveloppe data", type: "text", placeholder: "Ex: 100 GB" },
    { key: "speed", label: "Débit", type: "text", placeholder: "Ex: 1 Gb/s" },
    { key: "coverage", label: "Couverture", type: "text", placeholder: "Ex: 99% du territoire" },
    { key: "roaming", label: "Roaming inclus", type: "boolean" },
    { key: "unlimitedCalls", label: "Appels illimités", type: "boolean" }
  ],

  "Transport et Logistique": [
    { key: "transportMode", label: "Mode de transport", type: "multiselect", 
      options: ["Routier", "Ferroviaire", "Aérien", "Maritime", "Multimodal"] },
    { key: "capacity", label: "Capacité", type: "text", placeholder: "Ex: 25 tonnes" },
    { key: "deliveryTime", label: "Délai de livraison", type: "text" },
    { key: "tracking", label: "Suivi en temps réel", type: "boolean" },
    { key: "insurance", label: "Assurance marchandises", type: "boolean" },
    { key: "specialHandling", label: "Manutention spécialisée", type: "multiselect", 
      options: ["Fragile", "Réfrigéré", "Dangereux", "Surdimensionné"] }
  ]
};
