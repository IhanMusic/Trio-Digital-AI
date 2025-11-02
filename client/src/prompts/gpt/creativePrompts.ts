import { BriefData } from '../../types/brief';

interface ThemeData {
  name: string;
  objective: string;
  approach: string;
  emotions: string;
  formats: string[];
  networks: string[];
}

export const generateCreativeBriefs = (briefData: BriefData, themes: ThemeData[], startIndex: number = 0, batchSize: number = 4): string => {
  const totalBriefs = 12; // Nombre total de briefs souhaités
  const defaultTheme: ThemeData = {
    name: "Moment de partage",
    objective: "Créer des moments de connexion authentiques",
    approach: "Mettre en avant les moments de partage quotidiens",
    emotions: "Joie, convivialité, authenticité",
    formats: ["Photos", "Vidéos", "Stories"],
    networks: ["Instagram", "Facebook", "TikTok"]
  };

  // S'assurer que nous avons assez de thèmes
  const extendedThemes = [...themes];
  while (extendedThemes.length < totalBriefs) {
    extendedThemes.push({
      ...defaultTheme,
      name: `${defaultTheme.name} ${extendedThemes.length + 1}`
    });
  }

  // Calculer les indices de début et de fin pour ce lot
  const endIndex = Math.min(startIndex + batchSize, totalBriefs);
  const selectedThemes = extendedThemes.slice(startIndex, endIndex);

  const currentBatchNumber = Math.floor(startIndex / batchSize) + 1;
  const totalBatches = Math.ceil(totalBriefs / batchSize);

  console.log(`Génération du lot ${currentBatchNumber}/${totalBatches} (briefs ${startIndex + 1} à ${endIndex}/${totalBriefs})`);

  return `En tant que directeur créatif primé aux Cannes Lions et D&AD Awards, spécialisé dans la création de campagnes publicitaires de classe mondiale, créez ${endIndex - startIndex} briefs créatifs d'excellence publicitaire pour ${briefData.companyName} (briefs ${startIndex + 1} à ${endIndex}/${totalBriefs}).

ANALYSE STRATÉGIQUE DE MARQUE
Nom : ${briefData.companyName}
Secteur : ${briefData.sector}
Positionnement : ${briefData.competitiveAnalysis.marketPosition}
USP (Unique Selling Proposition) : ${briefData.uniqueSellingPoints}
Tone of Voice : ${briefData.communicationStyle}
Brand Essence : ${briefData.companyDescription}
Ressources visuelles : ${briefData.productPhotos.length > 0 ? 'Photos produit disponibles' : 'Pas de photos produit'}

${briefData.productPhotos.length > 0 ? `STRATÉGIE D'INTÉGRATION PRODUIT
- Ressources disponibles : ${briefData.productPhotos.length} photos produit haute qualité
- Objectif d'intégration : Présence naturelle et stratégique dans 70% minimum des visuels
- Contextes d'intégration premium :
  * Moments lifestyle aspirationnels : produit intégré comme élément naturel de la scène
  * Environnements premium : produit mis en valeur dans un contexte valorisant
  * Situations d'usage émotionnelles : produit comme facilitateur d'expériences positives
  * Contextes sociaux désirables : produit comme élément de statut ou de partage
  * Moments de vie authentiques : produit intégré de façon crédible et non forcée

DIRECTIVES D'EXCELLENCE PRODUIT :
- Privilégier les compositions où le produit est un élément organique de la narration visuelle
- Créer une hiérarchie visuelle claire avec le produit comme point focal secondaire
- Assurer une présence stratégique du produit dans la zone de poids visuel optimal
- Harmoniser l'esthétique du produit avec l'ambiance générale et l'identité de marque
- Maintenir l'équilibre entre authenticité de la situation et mise en valeur du produit` : ''}

CADRE RÉGLEMENTAIRE
Réglementations sectorielles : ${briefData.legalConstraints.regulations.join(', ')}
Mentions légales requises : ${briefData.legalConstraints.disclaimers.join(', ')}
Standards de conformité : ${briefData.legalConstraints.compliance.join(', ')}

RESSOURCES ET PRODUCTION
Budget alloué : ${briefData.budget.allocation["Photo/Vidéo"] || "N/A"}% du budget global
Équipe créative : ${briefData.resources.internalTeam.join(', ')}
Infrastructure technique : ${briefData.resources.tools.join(', ')}

INSIGHTS CAMPAGNES PRÉCÉDENTES
${briefData.previousCampaigns.map(campaign => `
${campaign.name} (${campaign.period}):
- Performance : ${campaign.results.join(', ')}
- Insights stratégiques : ${campaign.learnings.join(', ')}`).join('\n')}

ANALYSE CONCURRENTIELLE
Position stratégique : ${briefData.competitiveAnalysis.marketPosition}
Avantages différenciateurs : ${briefData.competitiveAnalysis.differentiators.join(', ')}
Benchmark concurrentiel :
${briefData.competitiveAnalysis.directCompetitors.map(competitor => `
- ${competitor.name}:
  Signatures visuelles : ${competitor.strengths.join(', ')}
  Approches stratégiques : ${competitor.strategies.join(', ')}`).join('\n')}

AUDIENCE CIBLE
Profil démographique : ${briefData.targetAudience.demographic.join(', ')}
Insights comportementaux : ${briefData.targetAudience.behavioral.join(', ')}
Zones géographiques prioritaires : ${briefData.targetAudience.geographic.join(', ')}

TERRITOIRES CRÉATIFS :
${selectedThemes.map((theme, index) => `
${startIndex + index + 1}/${totalBriefs} - ${theme.name}
Objectif stratégique : ${theme.objective}
Approche créative : ${theme.approach}
Territoire émotionnel : ${theme.emotions}
Formats prioritaires : ${theme.formats.join(', ')}
Canaux de diffusion : ${theme.networks.join(', ')}
`).join('\n')}

FORMAT DE RÉPONSE POUR CHAQUE BRIEF :

PROMPT STABILITY AI ULTRA (FORMAT CANNES LIONS) :
[Références publicitaires primées]
INSPIRATION CRÉATIVE :
- Campagne de référence 1 : [Nom de campagne primée pertinente]
- Campagne de référence 2 : [Nom de campagne primée pertinente]
- Direction artistique inspirée de : [Photographe/Directeur artistique renommé]
- Esthétique publicitaire : [Style publicitaire spécifique]
- Niveau d'exécution : Qualité Cannes Lions Gold

[Règles anatomiques critiques]
DIRECTIVES TECHNIQUES ABSOLUES :
- Anatomie parfaitement réaliste et proportionnée
- Éviter tout gros plan sur les mains ou les visages
- Positions naturelles et crédibles uniquement
- Interactions authentiques entre les personnages
- Respect strict des contraintes légales sectorielles
- Conformité aux standards publicitaires internationaux

[Narration visuelle]
STORYTELLING VISUEL :
- Concept narratif central : [Concept publicitaire clair]
- Arc émotionnel : [Émotion principale → évolution → impact final]
- Moment décisif capturé : [Moment précis de l'histoire]
- Tension narrative : [Élément créant l'intérêt visuel]
- Message subliminal : [Sous-texte ou message secondaire]
- Connexion émotionnelle : [Mécanisme d'engagement émotionnel]

[Composition publicitaire]
STRUCTURE VISUELLE PREMIUM :
- Composition principale : [Type de composition publicitaire]
- Cadrage stratégique : [Technique de cadrage spécifique]
- Moment de la journée : [Moment précis avec qualité de lumière]
- Environnement architectural : [Style et ambiance du lieu]
- Palette chromatique dominante : [Palette précise avec intention]
- Hiérarchie visuelle : [Organisation des éléments par importance]
- Points de tension visuelle : [Éléments créant dynamisme/intérêt]

[Éléments humains]
DIRECTION DE CASTING ET POSE :
- Profil démographique précis : [Âge, style, attitude]
- Langage corporel : [Posture et gestuelle spécifiques]
- Expression émotionnelle : [Émotion subtile et authentique]
- Style vestimentaire : [Description précise du style]
- Interaction sociale : [Dynamique entre personnages]
- Représentation inclusive : [Diversité pertinente pour la cible]

[Intégration produit]
PRODUCT PLACEMENT STRATÉGIQUE :
- Méthode d'intégration : [Technique d'intégration publicitaire]
- Position relative dans la hiérarchie visuelle : [Placement stratégique]
- Interaction avec l'environnement : [Comment le produit existe dans la scène]
- Mise en valeur subtile : [Technique de valorisation non-intrusive]
- Échelle et proportions : [Taille relative dans la composition]
- Traitement des surfaces : [Rendu des matériaux, reflets, textures]

[Direction de la lumière]
ÉCLAIRAGE PUBLICITAIRE PREMIUM :
- Schéma d'éclairage principal : [Technique d'éclairage publicitaire]
- Sources secondaires : [Éclairages d'appoint et leur rôle]
- Qualité de la lumière : [Caractéristiques précises de la lumière]
- Traitement des ombres : [Style et direction des ombres]
- Effets atmosphériques : [Brume, rayons, particules, etc.]
- Contraste et dynamique : [Ratio entre zones claires et sombres]

[Exécution technique]
SPÉCIFICATIONS DE PRODUCTION :
- Perspective et point de vue : [Angle de caméra précis]
- Distance focale : [Longueur focale et effet recherché]
- Profondeur de champ : [Zone de netteté et bokeh]
- Style photographique : [Référence à un style précis]
- Post-traitement : [Techniques de retouche spécifiques]
- Finition premium : [Détails de finition haut de gamme]

CONTENU MARKETING (FRAMEWORK AIDA) :
Attention : Accroche puissante qui capte immédiatement l'attention
Intérêt : Développement qui suscite la curiosité et l'intérêt
Désir : Élément déclencheur du désir et de l'envie
Action : Call-to-action stratégique et motivant
Tagline : Signature de marque mémorable et impactante
Hashtags : 5-7 hashtags stratégiques pour l'algorithme et l'engagement
Question d'engagement : Question ouverte stimulant l'interaction
Mentions légales : Intégration élégante des mentions obligatoires

SPÉCIFICATIONS TECHNIQUES PREMIUM :
Format : [Format précis avec ratio]
Dimensions : [Dimensions exactes en pixels]
Résolution : [DPI spécifique pour qualité optimale]
Alt text SEO : Description optimisée pour l'accessibilité et le référencement
Zone légale : Emplacement stratégique pour les mentions obligatoires
Estimation budgétaire : Ventilation des coûts de production
Ressources techniques : Équipement et expertise requis

FORMATS PREMIUM PAR PLATEFORME :
- Instagram Feed : 1080x1080px (ratio 1:1) - Optimisé pour l'arrêt du scroll
- Instagram Portrait : 1080x1350px (ratio 4:5) - Maximise la présence écran
- Facebook Premium : 1200x630px (ratio 1.91:1) - Optimisé pour l'engagement
- Stories Immersives : 1080x1920px (ratio 9:16) - Expérience plein écran
- Carousel Narratif : 1080x1080px (ratio 1:1) - Storytelling séquentiel
- LinkedIn Corporate : 1200x627px - Optimisé pour l'environnement professionnel

DIRECTIVES D'EXCELLENCE POUR L'IA :
- Structurer le prompt selon les principes de narration visuelle publicitaire
- Utiliser un vocabulaire technique de direction artistique professionnelle
- Incorporer des références aux campagnes primées pertinentes
- Appliquer les principes de composition des grands photographes publicitaires
- Spécifier avec précision les techniques d'éclairage publicitaire premium
- Détailler les textures et matériaux avec un vocabulaire sensoriel riche
- Créer une hiérarchie visuelle claire avec points d'intérêt stratégiques
- Intégrer les principes de psychologie des couleurs pour l'impact émotionnel
- Utiliser les techniques de tension visuelle pour créer de l'impact
- Incorporer des éléments de storytelling visuel avancé
- Respecter scrupuleusement les contraintes légales sectorielles
- Optimiser chaque élément pour maximiser l'impact avec le budget disponible
- Appliquer les insights des campagnes précédentes pour l'efficacité
${briefData.productPhotos.length > 0 ? `- Intégrer le produit comme élément organique de la narration visuelle
- Utiliser les techniques de product placement des campagnes primées
- Créer une mise en valeur subtile mais stratégique du produit` : ''}

STANDARDS D'EXCELLENCE CRÉATIVE :
- Chaque prompt doit atteindre le niveau d'excellence des campagnes Cannes Lions
- Privilégier une approche constructive avec vocabulaire premium et précis
- Utiliser les techniques narratives des meilleures agences publicitaires mondiales
- Penser en termes de photographie publicitaire haut de gamme
- Intégrer les principes de psychologie visuelle pour maximiser l'impact
- Respecter scrupuleusement les contraintes légales tout en maintenant l'excellence créative
- Optimiser chaque élément pour un ROI maximal des ressources
- Créer une différenciation visuelle claire par rapport à la concurrence
- Appliquer les insights stratégiques des campagnes précédentes
- Viser systématiquement un niveau d'exécution digne des plus grands prix publicitaires

---`;
};

export const generateVisualAnalysis = (briefData: BriefData): string => {
  return `En tant que directeur artistique expert en IA générative, analysez les éléments visuels de la marque ${briefData.companyName} et générez des recommandations détaillées optimisées pour Stability AI :

ÉLÉMENTS ANALYSÉS
Logo : ${briefData.logo ? 'Fourni' : 'Non fourni'}
Photos produits : ${briefData.productPhotos.length} photos fournies
Style de communication : ${briefData.communicationStyle}
Contraintes légales : ${briefData.legalConstraints.regulations.join(', ')}
Budget création : ${briefData.budget.allocation["Photo/Vidéo"] || "N/A"}% du budget total
Ressources : ${briefData.resources.tools.join(', ')}

HISTORIQUE VISUEL
${briefData.previousCampaigns.map(campaign => `
${campaign.name}:
- Résultats visuels : ${campaign.results.join(', ')}
- Apprentissages : ${campaign.learnings.join(', ')}`).join('\n')}

ANALYSE CONCURRENTIELLE
${briefData.competitiveAnalysis.directCompetitors.map(competitor => `
${competitor.name}:
- Forces visuelles : ${competitor.strengths.join(', ')}
- Stratégies : ${competitor.strategies.join(', ')}`).join('\n')}

ANALYSE REQUISE :

1. IDENTITÉ VISUELLE
Couleurs
- Palette principale (codes hexadécimaux)
- Couleurs secondaires (codes hexadécimaux)
- Associations émotionnelles
- Gradients et transitions
- Harmonies colorées
- Conformité réglementaire

Typographie
- Familles de polices principales
- Polices secondaires
- Hiérarchie typographique
- Tailles et espacements
- Styles de caractères
- Lisibilité des mentions légales

Iconographie
- Style d'icônes
- Épaisseur des traits
- Angles et courbes
- Cohérence visuelle
- Système graphique
- Intégration des symboles réglementaires

2. COMPOSITION PHOTOGRAPHIQUE
Layouts
- Grilles de composition
- Points d'intérêt
- Règle des tiers
- Lignes de force
- Équilibre visuel
- Zones mentions légales

Profondeur
- Plans successifs
- Perspective
- Bokeh et flou
- Mise au point
- Échelle relative
- Lisibilité des informations légales

Dynamique
- Mouvements suggérés
- Tensions visuelles
- Rythmes
- Flow directionnel
- Points de fuite
- Hiérarchie informationnelle

3. ADAPTATIONS PAR RÉSEAU
${briefData.currentSocialNetworks.map(network => `
${network}:
- Formats optimaux
- Contraintes techniques
- Best practices visuelles
- Zones de texte
- Points d'attention
- Intégration mentions légales
- Budget alloué
- Ressources nécessaires
`).join('\n')}

4. RECOMMANDATIONS POUR L'IA
Palette
- Combinaisons précises (codes hex)
- Proportions exactes
- Contextes d'utilisation
- Transitions colorées
- Effets lumineux
- Conformité réglementaire

Rendu
- Style photographique
- Qualité d'image
- Netteté et détails
- Grain et texture
- Post-traitement
- Optimisation budgétaire

Composition
- Guides de cadrage
- Points focaux
- Distribution des masses
- Équilibre des éléments
- Hiérarchie visuelle
- Zones mentions légales

Éclairage
- Sources principales
- Lumières d'ambiance
- Ombres et reflets
- Atmosphère
- Effets spéciaux
- Lisibilité des informations

5. VALIDATION ET CONTRÔLE
Conformité
- Check-list réglementaire
- Points de contrôle
- Process de validation
- Documentation requise

Ressources
- Optimisation budget
- Allocation équipe
- Utilisation outils
- Formation nécessaire

Format de réponse :
- Structurez l'analyse par sections
- Utilisez des valeurs numériques précises
- Soyez spécifique et technique
- Pensez en termes d'IA générative
- Optimisez pour Stability AI
- Intégrez les contraintes légales
- Respectez le budget
- Capitalisez sur les apprentissages`;
};
