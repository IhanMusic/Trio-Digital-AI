import KeyDate, { IKeyDate } from '../models/KeyDate';
import { logger } from '../config/logger';

class KeyDateService {
  /**
   * Récupère les dates clés pour un pays et une période donnés
   */
  async getKeyDatesForPeriod(country: string, startDate: Date, endDate: Date): Promise<IKeyDate[]> {
    try {
      logger.info(`Recherche des dates clés pour ${country} du ${startDate.toISOString()} au ${endDate.toISOString()}`);
      
      // Convertir les dates en objets Date si nécessaire
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Récupérer toutes les dates clés pour ce pays ou marquées comme globales ("ALL")
      const keyDates = await KeyDate.find({
        $or: [
          { countries: country },
          { countries: "ALL" }
        ]
      });
      
      // Filtrer les dates qui tombent dans la période
      const relevantDates = keyDates.filter(keyDate => {
        // Pour les dates fixes (non movable)
        if (!keyDate.isMovable) {
          const eventStart = new Date(keyDate.startDate);
          const eventEnd = keyDate.endDate ? new Date(keyDate.endDate) : eventStart;
          
          // Vérifier si l'année correspond à celle de la période
          eventStart.setFullYear(start.getFullYear());
          eventEnd.setFullYear(start.getFullYear());
          
          // Si l'événement tombe à cheval sur deux années (ex: Noël/Nouvel An)
          if (eventStart.getMonth() > eventEnd.getMonth()) {
            eventEnd.setFullYear(eventEnd.getFullYear() + 1);
          }
          
          // Vérifier si l'événement est dans la période
          return (eventStart <= end && eventEnd >= start);
        } else {
          // Pour les dates mobiles (comme Ramadan), utiliser une API ou un calcul spécifique
          // Ici, nous supposons que les dates mobiles sont déjà calculées pour l'année en cours
          // et stockées dans la base de données avec l'année correcte
          const eventStart = new Date(keyDate.startDate);
          const eventEnd = keyDate.endDate ? new Date(keyDate.endDate) : eventStart;
          
          // Vérifier si l'événement est dans la période
          return (eventStart <= end && eventEnd >= start);
        }
      });
      
      logger.info(`${relevantDates.length} dates clés trouvées pour la période`);
      return relevantDates;
    } catch (error) {
      logger.error('Erreur lors de la récupération des dates clés:', error);
      throw error;
    }
  }
  
  /**
   * Génère des prompts spécifiques pour les dates clés
   */
  generateKeyDatePrompts(keyDates: IKeyDate[]): Record<string, string> {
    const prompts: Record<string, string> = {};
    
    keyDates.forEach(keyDate => {
      // Utiliser le prompt personnalisé s'il existe, sinon en générer un
      if (keyDate.customPrompt) {
        prompts[keyDate.name] = keyDate.customPrompt;
      } else {
        prompts[keyDate.name] = `
Pour cette publication qui coïncide avec ${keyDate.name} (${keyDate.description}), 
intégrez subtilement cette thématique dans votre contenu.

Thèmes suggérés: ${keyDate.suggestedThemes.join(', ')}
Niveau d'importance: ${keyDate.importance}/5
        `;
      }
    });
    
    return prompts;
  }
  
  /**
   * Génère une section de prompt pour les dates clés
   */
  generateKeyDateSection(keyDates: IKeyDate[]): string {
    if (keyDates.length === 0) {
      return '';
    }
    
    return `
DATES CLÉS PERTINENTES:
${keyDates.map(kd => `- ${kd.name}: ${kd.description}
  Thèmes suggérés: ${kd.suggestedThemes.join(', ')}
  Importance: ${kd.importance}/5`).join('\n')}

DIRECTIVES POUR LES DATES CLÉS:
- Intégrez subtilement ces thématiques dans votre contenu
- Adaptez le ton et le style en fonction de l'importance de l'événement
- Respectez la sensibilité culturelle liée à ces dates
`;
  }
  
  /**
   * Vérifie si une date correspond à une date clé
   */
  isKeyDate(date: Date, keyDates: IKeyDate[]): IKeyDate[] {
    return keyDates.filter(keyDate => {
      const keyDateStart = new Date(keyDate.startDate);
      const keyDateEnd = keyDate.endDate ? new Date(keyDate.endDate) : keyDateStart;
      
      // Ajuster l'année si nécessaire pour les dates fixes
      if (!keyDate.isMovable) {
        keyDateStart.setFullYear(date.getFullYear());
        keyDateEnd.setFullYear(date.getFullYear());
        
        // Si l'événement tombe à cheval sur deux années
        if (keyDateStart.getMonth() > keyDateEnd.getMonth()) {
          keyDateEnd.setFullYear(keyDateEnd.getFullYear() + 1);
        }
      }
      
      // Vérifier si la date tombe pendant l'événement
      return (date >= keyDateStart && date <= keyDateEnd);
    });
  }
}

export default new KeyDateService();
