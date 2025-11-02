import mongoose from 'mongoose';
import KeyDate from '../models/KeyDate';
import { logger } from '../config/logger';
import dotenv from 'dotenv';

dotenv.config();

async function seedKeyDates() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-media-manager');
    logger.info('Connexion à MongoDB établie');
    
    // Supprimer les dates existantes
    await KeyDate.deleteMany({});
    logger.info('Base de données de dates clés nettoyée');
    
    // Dates fixes internationales
    const internationalDates = [
      {
        name: "Journée internationale des femmes",
        description: "Célébration mondiale des droits des femmes et de l'égalité des genres",
        countries: ["ALL"],
        startDate: "03-08", // Format MM-DD
        isMovable: false,
        category: "international",
        importance: 4,
        tags: ["femmes", "égalité", "droits"],
        marketingRelevance: ["mode", "beauté", "bien-être", "éducation"],
        suggestedThemes: ["émancipation", "leadership féminin", "égalité des chances"]
      },
      {
        name: "Journée de la Terre",
        description: "Journée mondiale de sensibilisation à l'environnement",
        countries: ["ALL"],
        startDate: "04-22",
        isMovable: false,
        category: "international",
        importance: 3,
        tags: ["environnement", "écologie", "planète"],
        marketingRelevance: ["alimentation", "mode", "énergie", "transport"],
        suggestedThemes: ["durabilité", "éco-responsabilité", "protection de l'environnement"]
      },
      {
        name: "Saint-Valentin",
        description: "Fête des amoureux",
        countries: ["ALL"],
        startDate: "02-14",
        isMovable: false,
        category: "commercial",
        importance: 4,
        tags: ["amour", "couple", "cadeaux"],
        marketingRelevance: ["bijouterie", "mode", "restauration", "fleurs", "chocolat"],
        suggestedThemes: ["romance", "amour", "célébration du couple"]
      },
      {
        name: "Black Friday",
        description: "Journée de promotions commerciales importantes",
        countries: ["ALL"],
        startDate: "11-25", // Approximatif, c'est le 4ème vendredi de novembre
        isMovable: true,
        category: "commercial",
        importance: 5,
        tags: ["shopping", "promotions", "soldes"],
        marketingRelevance: ["e-commerce", "mode", "électronique", "ameublement"],
        suggestedThemes: ["bonnes affaires", "économies", "shopping"]
      },
      {
        name: "Journée mondiale de l'environnement",
        description: "Journée de sensibilisation aux enjeux environnementaux",
        countries: ["ALL"],
        startDate: "06-05",
        isMovable: false,
        category: "international",
        importance: 3,
        tags: ["environnement", "écologie", "développement durable"],
        marketingRelevance: ["énergie", "alimentation", "transport", "mode"],
        suggestedThemes: ["écologie", "développement durable", "protection de la nature"]
      }
    ];
    
    // Dates spécifiques à certains pays
    const countrySpecificDates = [
      {
        name: "Ramadan",
        description: "Mois sacré de jeûne dans l'Islam",
        countries: ["DZ", "MA", "TN", "EG", "SA", "AE"],
        startDate: "2025-03-01", // Date approximative pour 2025
        endDate: "2025-03-30",   // Date approximative pour 2025
        isMovable: true,
        category: "religieux",
        importance: 5,
        tags: ["islam", "jeûne", "spiritualité"],
        marketingRelevance: ["alimentation", "commerce", "mode"],
        suggestedThemes: ["partage", "générosité", "famille", "traditions"],
        customPrompt: `
Pour cette publication qui coïncide avec le Ramadan, période sacrée pour les musulmans:

- Adoptez un ton respectueux et inclusif
- Mettez l'accent sur les valeurs universelles: partage, générosité, famille
- Évitez les références explicites à la nourriture pendant les heures de jeûne
- Privilégiez les thèmes de solidarité et de spiritualité
- Si pertinent pour votre marque, vous pouvez évoquer les traditions liées à l'iftar (rupture du jeûne)

Thèmes recommandés: moments de partage, traditions familiales, valeurs communautaires, spiritualité
        `
      },
      {
        name: "Noël",
        description: "Fête chrétienne célébrant la naissance de Jésus-Christ",
        countries: ["FR", "US", "UK", "DE", "IT", "ES"],
        startDate: "12-25",
        isMovable: false,
        category: "religieux",
        importance: 5,
        tags: ["christianisme", "fête", "famille"],
        marketingRelevance: ["commerce", "alimentation", "jouets", "décoration"],
        suggestedThemes: ["partage", "générosité", "magie", "famille"]
      },
      {
        name: "Fête nationale française",
        description: "Commémoration de la prise de la Bastille",
        countries: ["FR"],
        startDate: "07-14",
        isMovable: false,
        category: "national",
        importance: 4,
        tags: ["France", "fête nationale", "histoire"],
        marketingRelevance: ["tourisme", "alimentation", "événementiel"],
        suggestedThemes: ["célébration", "patrimoine français", "valeurs républicaines"]
      },
      {
        name: "Aïd al-Fitr",
        description: "Fête de la rupture du jeûne marquant la fin du Ramadan",
        countries: ["DZ", "MA", "TN", "EG", "SA", "AE"],
        startDate: "2025-03-31", // Date approximative pour 2025
        endDate: "2025-04-01",   // Date approximative pour 2025
        isMovable: true,
        category: "religieux",
        importance: 5,
        tags: ["islam", "fête", "famille"],
        marketingRelevance: ["mode", "alimentation", "cadeaux", "décoration"],
        suggestedThemes: ["célébration", "famille", "joie", "traditions"]
      },
      {
        name: "Thanksgiving",
        description: "Fête de l'Action de grâce",
        countries: ["US", "CA"],
        startDate: "11-28", // 4ème jeudi de novembre pour les USA
        isMovable: true,
        category: "national",
        importance: 5,
        tags: ["famille", "repas", "gratitude"],
        marketingRelevance: ["alimentation", "décoration", "voyage"],
        suggestedThemes: ["famille", "gratitude", "traditions", "partage"]
      }
    ];
    
    // Insérer toutes les dates
    await KeyDate.insertMany([...internationalDates, ...countrySpecificDates]);
    
    logger.info(`${internationalDates.length + countrySpecificDates.length} dates clés insérées avec succès`);
    
    await mongoose.disconnect();
    logger.info('Déconnexion de MongoDB');
    
  } catch (error) {
    logger.error('Erreur lors du remplissage de la base de données:', error);
    process.exit(1);
  }
}

seedKeyDates();
