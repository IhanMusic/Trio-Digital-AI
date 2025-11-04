import { BriefData, Theme, Strategy } from '../../types/brief';
import { config } from '../../config/env';

/**
 * EDITORIAL THEME SERVICE - Adapté architecture 3 niveaux
 * Note: Ce service utilise maintenant uniquement Brand data (BriefData)
 * TODO: Étendre pour accepter Product et Calendar data en paramètres additionnels
 */
export class EditorialThemeService {
  private static readonly MAX_RETRIES = 3;
  private static readonly RETRY_DELAY = 2000;
  private static readonly THEMES_PER_REQUEST = 3;
  private static readonly TOKEN_LIMIT = 1500;

  private static getAuthHeaders() {
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
      throw new Error('Utilisateur non authentifié');
    }
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userEmail}`
    };
  }

  static async generateEditorialThemes(
    briefData: BriefData,
    strategy: Strategy
  ): Promise<Theme[]> {
    try {
      console.log('Génération des thèmes éditoriaux');
      let themes: Theme[] = [];
      const totalThemesNeeded = 12;
      let retryCount = 0;

      while (themes.length < totalThemesNeeded && retryCount < this.MAX_RETRIES) {
        try {
          const themesToGenerate = Math.min(
            this.THEMES_PER_REQUEST,
            totalThemesNeeded - themes.length
          );

          const response = await fetch(`${config.apiUrl}/ai/gpt`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify({
              messages: [{
                role: 'user',
                content: this.generateThemePrompt(briefData, strategy, themesToGenerate)
              }],
              maxTokens: this.TOKEN_LIMIT,
              type: 'themes',
              temperature: 0.8,
              presencePenalty: 0.7,
              frequencyPenalty: 0.4
            })
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Erreur API GPT: ${response.status}, details: ${JSON.stringify(errorData)}`);
          }

          const data = await response.json();
          console.log('Réponse brute de l\'API:', data.choices[0].message.content);
          
          const newThemes = this.parseThemes(data.choices[0].message.content);
          console.log('Thèmes parsés:', newThemes);
          
          const validThemes = newThemes.filter(theme => this.validateTheme(theme));
          console.log('Thèmes valides:', validThemes);

          themes = [...themes, ...validThemes];
          console.log(`${themes.length}/${totalThemesNeeded} thèmes générés`);

          if (themes.length < totalThemesNeeded) {
            await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY));
          }
        } catch (error) {
          console.error(`Erreur tentative ${retryCount + 1}:`, error);
          retryCount++;
          if (retryCount < this.MAX_RETRIES) {
            await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY));
          }
        }
      }

      if (themes.length < totalThemesNeeded) {
        console.log(`Complétion avec ${totalThemesNeeded - themes.length} thèmes par défaut`);
        const defaultThemes = this.generateDefaultThemes(briefData, totalThemesNeeded - themes.length);
        themes = [...themes, ...defaultThemes];
      }

      return themes;
    } catch (error) {
      console.error('Erreur lors de la génération des thèmes:', error);
      throw error;
    }
  }

  private static generateThemePrompt(briefData: BriefData, strategy: Strategy, count: number): string {
    // Construction contexte historique
    const campaignLearnings = briefData.previousCampaigns && briefData.previousCampaigns.length > 0
      ? briefData.previousCampaigns.map(campaign => 
          `- ${campaign.name}:\n  Résultats : ${campaign.results.join(', ')}\n  Learnings : ${campaign.learnings.join(', ')}`
        ).join('\n')
      : 'Aucune campagne précédente disponible';

    // Construction contexte concurrentiel
    const competitiveContext = briefData.competitiveAnalysis 
      ? `- Position marché : ${briefData.competitiveAnalysis.marketPosition}
- Différenciateurs : ${briefData.competitiveAnalysis.differentiators.join(', ')}
- Opportunités : ${briefData.competitiveAnalysis.opportunities.join(', ')}`
      : 'Analyse concurrentielle non disponible';

    // Construction positionnement stratégique
    const strategicPositioning = `- Type : ${briefData.businessType || 'Non spécifié'}
- Stade : ${briefData.companyStage || 'Non spécifié'}
- Prix : ${briefData.pricePositioning || 'Non spécifié'}`;

    return `En tant que directeur créatif d'une agence de publicité primée, créez ${count} thèmes créatifs pour ${briefData.companyName}.

CONTEXTE MARQUE (Brand Level) :

IDENTITÉ & ADN
- Secteur : ${briefData.sector}
- Description : ${briefData.companyDescription}
${briefData.values ? `- Valeurs : ${briefData.values.join(', ')}` : ''}
${briefData.mission ? `- Mission : ${briefData.mission}` : ''}

POSITIONNEMENT STRATÉGIQUE
${strategicPositioning}

CONCURRENCE & MARCHÉ
${competitiveContext}

APPRENTISSAGES PRÉCÉDENTS
${campaignLearnings}

NOTE IMPORTANTE : 
Les données PRODUIT (target audience, USP) et CALENDRIER (réseaux sociaux, ton) 
seront intégrées ultérieurement. Concentrez-vous sur des thèmes alignés avec 
l'ADN DE MARQUE.

MISSION :
Créez ${count} thèmes créatifs RADICALEMENT DIFFÉRENTS en :
1. Explorant des territoires créatifs variés alignés avec l'ADN marque
2. Capitalisant sur les différenciateurs concurrentiels
3. S'appuyant sur les apprentissages des campagnes passées
4. Restant cohérent avec le positionnement stratégique (type, stade, prix)
5. Visant l'excellence créative niveau Cannes Lions

FORMAT DE RÉPONSE :
THEME 1:
"[Nom créatif]"
- Objectif: [Objectif SMART aligné avec ADN marque]
- Angle: [Approche unique basée sur différenciateurs]
- Émotions: [2-3 émotions cohérentes avec valeurs marque]
- Formats: [Formats suggérés - seront affinés avec data Calendar]
- Réseaux: [Réseaux suggérés - seront affinés avec data Calendar]

RÈGLES :
- Chaque thème doit explorer un territoire UNIQUE
- Rester fidèle à l'ADN et valeurs de marque
- S'appuyer sur les apprentissages passés
- Oser des concepts audacieux mais cohérents
- Viser excellence créative niveau Cannes Lions`;
  }

  private static parseThemes(content: string): Theme[] {
    const themes: Theme[] = [];
    
    // Séparer le contenu en blocs de thèmes
    const themeBlocks = content.split(/THEME \d+:/i)
      .filter(block => block.trim())
      .map(block => block.trim());

    for (const block of themeBlocks) {
      try {
        // Extraire le nom entre guillemets
        const nameMatch = block.match(/[""]([^"""]+)[""]/);
        if (!nameMatch) continue;
        
        const name = nameMatch[1].trim();
        
        // Extraire le reste du contenu après le nom
        const contentAfterName = block.slice(block.indexOf(nameMatch[0]) + nameMatch[0].length);
        
        // Extraire les sections
        const objective = this.extractSection(contentAfterName, 'Objectif');
        const approach = this.extractSection(contentAfterName, 'Angle');
        const emotions = this.extractSection(contentAfterName, 'Émotions');
        const formats = this.extractSection(contentAfterName, 'Formats').split(',').map(f => f.trim());
        const networks = this.extractSection(contentAfterName, 'Réseaux').split(',').map(n => n.trim());

        if (name && objective) {
          themes.push({ name, objective, approach, emotions, formats, networks });
        }
      } catch (error) {
        console.error('Erreur parsing thème:', error);
        continue;
      }
    }

    return themes;
  }

  private static extractSection(text: string, sectionName: string): string {
    const lines = text.split('\n');
    const line = lines.find(l => l.toLowerCase().includes(sectionName.toLowerCase()));
    if (!line) return '';
    
    const content = line.split(':')[1]?.trim() || '';
    return content.split(/\n-/)[0].trim();
  }

  private static validateTheme(theme: Theme): boolean {
    const isValid = !!(
      theme.name?.length > 0 &&
      theme.objective?.length > 0 &&
      theme.approach?.length > 0 &&
      theme.emotions?.length > 0 &&
      theme.formats?.length > 0 &&
      theme.networks?.length > 0
    );

    if (!isValid) {
      console.log('Thème invalide:', {
        hasName: theme.name?.length > 0,
        hasObjective: theme.objective?.length > 0,
        hasApproach: theme.approach?.length > 0,
        hasEmotions: theme.emotions?.length > 0,
        hasFormats: theme.formats?.length > 0,
        hasNetworks: theme.networks?.length > 0
      });
    }

    return isValid;
  }

  private static generateDefaultThemes(briefData: BriefData, count: number): Theme[] {
    const baseThemes = [
      'Expertise et Innovation',
      'Valeurs et Engagement',
      'Success Stories',
      'Conseils et Astuces',
      'Coulisses et Équipe',
      'Actualités Secteur',
      'Témoignages Clients',
      'Événements',
      'Produits et Services',
      'RSE et Impact',
      'Tendances',
      'Moments de Vie'
    ];

    return baseThemes.slice(0, count).map(name => ({
      name,
      objective: `Mettre en avant ${name.toLowerCase()} de ${briefData.companyName}`,
      approach: 'Contenu authentique et engageant aligné avec ADN marque',
      emotions: 'Confiance, Expertise, Innovation',
      formats: ['Photos', 'Vidéos', 'Stories'],
      networks: ['Instagram', 'Facebook', 'LinkedIn'] // Default, sera affiné avec Calendar data
    }));
  }
}
