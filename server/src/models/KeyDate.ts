import mongoose, { Document, Schema } from 'mongoose';

export interface IKeyDate extends Document {
  name: string;                // Nom de l'événement (ex: "Ramadan", "Noël")
  description: string;         // Description de l'événement
  countries: string[];         // Liste des codes pays concernés (ex: ["DZ", "FR", "ALL"] pour tous les pays)
  startDate: Date | string;    // Date de début (peut être dynamique chaque année)
  endDate?: Date | string;     // Date de fin (optionnel, pour les événements sur plusieurs jours)
  isMovable: boolean;          // Indique si la date change chaque année (ex: Ramadan)
  category: string;            // Catégorie (religieux, national, international, commercial)
  importance: number;          // Niveau d'importance (1-5)
  tags: string[];              // Tags associés pour faciliter la recherche
  marketingRelevance: string[]; // Secteurs d'activité pour lesquels cette date est particulièrement pertinente
  suggestedThemes: string[];   // Thèmes suggérés pour le contenu
  customPrompt?: string;       // Prompt spécifique à utiliser pour cette date clé
}

const KeyDateSchema = new Schema<IKeyDate>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  countries: { type: [String], required: true },
  startDate: { type: Schema.Types.Mixed, required: true }, // Mixed pour supporter date ou string
  endDate: { type: Schema.Types.Mixed },
  isMovable: { type: Boolean, default: false },
  category: { type: String, required: true },
  importance: { type: Number, default: 3, min: 1, max: 5 },
  tags: { type: [String], default: [] },
  marketingRelevance: { type: [String], default: [] },
  suggestedThemes: { type: [String], default: [] },
  customPrompt: { type: String }
});

export default mongoose.model<IKeyDate>('KeyDate', KeyDateSchema);
