import { BriefData } from '../../types/brief';

/**
 * PROMPT ANALYSE STRATÉGIQUE NIVEAU CANNES LIONS
 * Architecture 3 niveaux: Brand (BriefData) + Product + Calendar
 * Note: Ce prompt utilise uniquement les données de MARQUE
 * Les données Produit et Calendrier seront intégrées par les services appropriés
 */
export const generateStrategicAnalysis = (briefData: BriefData): string => {
  // Construction du contexte concurrentiel
  const competitiveSection = briefData.competitiveAnalysis ? `
═══════════════════════════════════════
ANALYSE CONCURRENTIELLE APPROFONDIE
═══════════════════════════════════════

POSITION MARCHÉ ACTUELLE:
${briefData.competitiveAnalysis.marketPosition || 'À définir'}

DIFFÉRENCIATEURS STRATÉGIQUES:
${briefData.competitiveAnalysis.differentiators?.map((d, i) => `${i + 1}. ${d}`).join('\n') || 'Non spécifiés'}

OPPORTUNITÉS MARCHÉ:
${briefData.competitiveAnalysis.opportunities?.map((o, i) => `${i + 1}. ${o}`).join('\n') || 'À identifier'}

CONCURRENTS DIRECTS - ANALYSE SWOT:
${briefData.competitiveAnalysis.directCompetitors?.map(comp => `
→ ${comp.name}
  ✓ Forces: ${comp.strengths.join(', ')}
  ✗ Faiblesses: ${comp.weaknesses.join(', ')}
  ⚡ Stratégies actives: ${comp.strategies.join(', ')}`).join('\n\n') || 'Aucune analyse SWOT disponible'}
` : `
CONCURRENTS PRINCIPAUX:
${briefData.competitors}
`;

  // Construction de l'historique
  const historySection = briefData.previousCampaigns && briefData.previousCampaigns.length > 0 ? `
═══════════════════════════════════════
HISTORIQUE & LEARNINGS
═══════════════════════════════════════

${briefData.previousCampaigns.map(campaign => `
📊 ${campaign.name} | ${campaign.period}

RÉSULTATS MESURÉS:
${campaign.results.map((r, i) => `  ${i + 1}. ${r}`).join('\n')}

LEARNINGS STRATÉGIQUES:
${campaign.learnings.map((l, i) => `  ${i + 1}. ${l}`).join('\n')}
`).join('\n')}

⚠️ IMPÉRATIF: S'appuyer sur ces données historiques pour optimiser la stratégie.
` : '';

  // Construction du cadre légal
  const legalSection = briefData.legalConstraints ? `
═══════════════════════════════════════
CADRE LÉGAL & CONFORMITÉ
═══════════════════════════════════════

RÉGLEMENTATIONS SECTORIELLES:
${briefData.legalConstraints.regulations.map((r, i) => `  ${i + 1}. ${r}`).join('\n')}

EXIGENCES COMPLIANCE:
${briefData.legalConstraints.compliance.map((c, i) => `  ${i + 1}. ${c}`).join('\n')}

MENTIONS OBLIGATOIRES:
${briefData.legalConstraints.disclaimers.map((d, i) => `  ${i + 1}. ${d}`).join('\n')}

⚠️ VALIDATION REQUISE: Toute recommandation doit intégrer ces contraintes.
` : '';

  // Positionnement stratégique
  const positioningSection = `
═══════════════════════════════════════
POSITIONNEMENT STRATÉGIQUE
═══════════════════════════════════════

Type d'entreprise: ${briefData.businessType || 'À définir'}
Stade de maturité: ${briefData.companyStage || 'À définir'}  
Positionnement prix: ${briefData.pricePositioning || 'À définir'}
${briefData.values ? `\nValeurs fondamentales: ${briefData.values.join(' • ')}` : ''}
${briefData.mission ? `\nMission d'entreprise: ${briefData.mission}` : ''}
`;

  return `
╔════════════════════════════════════════════════════════════════════════╗
║                                                                        ║
║          BRIEF STRATÉGIQUE - STANDARD CANNES LIONS                    ║
║          Architecture 3 Niveaux: Brand / Product / Calendar           ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝

Vous êtes un stratège digital primé à Cannes Lions, reconnu pour :
• Vision stratégique holistique et insights consommateurs
• Analyse concurrentielle approfondie et data-driven
• Création de stratégies différenciantes et performantes
• Expertise en transformation digitale et brand building

═══════════════════════════════════════
ADN DE LA MARQUE
═══════════════════════════════════════

IDENTITÉ CORPORATE:
${briefData.companyName}
Secteur d'activité: ${briefData.sector}

DESCRIPTION ENTREPRISE:
${briefData.companyDescription}

${briefData.colors ? `
PALETTE DE MARQUE:
• Primaire: ${briefData.colors.primary || 'Non définie'}
• Secondaire: ${briefData.colors.secondary || 'Non définie'}  
• Accent: ${briefData.colors.accent || 'Non définie'}
` : ''}

${positioningSection}

${competitiveSection}

${historySection}

${legalSection}

═══════════════════════════════════════
MISSION STRATÉGIQUE
═══════════════════════════════════════

Sur la base de ces informations de MARQUE (Brand level), développez une stratégie 
de contenu social media complète et différenciante.

NOTE IMPORTANTE: 
Les informations PRODUIT (target audience, USP, bénéfices) et CALENDRIER 
(réseaux sociaux, ton, fréquence) seront intégrées ultérieurement par les 
services appropriés. Concentrez-vous sur la stratégie de MARQUE globale.

═══════════════════════════════════════
FRAMEWORK STRATÉGIQUE ATTENDU
═══════════════════════════════════════

1️⃣ ANALYSE STRATÉGIQUE GLOBALE

A. POSITIONNEMENT DIGITAL RECOMMANDÉ (min. 100 caractères)
   → Définir LA Big Idea qui différencie la marque
   → Positionnement unique et mémorable
   → Ancré dans l'ADN de marque et insights marché
   → Déclinable sur tous canaux digitaux
   → Conforme au cadre légal sectoriel

B. FORCES STRATÉGIQUES À EXPLOITER (min. 5 forces, 50 car. chacune)
   → Forces intrinsèques de la marque (ADN, histoire, valeurs)
   → Avantages concurrentiels identifiés
   → Assets digitaux existants ou à créer
   → Learnings des campagnes précédentes
   → Opportunités liées au secteur/stade de l'entreprise

C. OPPORTUNITÉS MARCHÉ À SAISIR (min. 5 opportunités, 50 car. chacune)
   → White spaces dans le paysage concurrentiel
   → Trends culturelles et sociétales émergentes
   → Insights consommateurs inexploités
   → Innovations technologiques applicables
   → Moments marketing stratégiques (événements, saisons)

D. RISQUES & MITIGATION (min. 3 risques)
   → Risques concurrentiels identifiés
   → Risques légaux/réglementaires
   → Risques réputationnels
   → Plans de mitigation pour chaque risque

2️⃣ RECOMMANDATIONS CRÉATIVES CROSS-CANAL

A. DIRECTION ARTISTIQUE GLOBALE (min. 5 guidelines)
   → Territoires visuels de la marque
   → Codes couleurs et typographies
   → Style photographique/graphique
   → Éléments de marque récurrents
   → Évolutions créatives recommandées

B. ARCHITECTURE DE CONTENU (min. 4 piliers)
   → Piliers de contenu stratégiques (80/20 evergreen vs. tactical)
   → Thématiques narratives principales
   → Mix éditorial recommandé
   → Storytelling brand vs. product
   → Équilibre entre éducation, inspiration, promotion

C. TONE OF VOICE & BRAND VOICE (min. 4 dimensions)
   → Personnalité de marque (archétype)
   → Vocabulaire & champ lexical de marque
   → Do's & Don'ts éditoriaux
   → Adaptations cross-canal (B2B vs B2C, formal vs casual)
   → Guidelines mentions légales

3️⃣ TACTIQUES D'ACTIVATION

A. STRATÉGIE D'ENGAGEMENT (min. 5 tactiques)
   → Mécaniques de conversation (comment dialoguer)
   → Stratégie de community management
   → Gestion des influenceurs/ambassadeurs
   → Programmes de fidélisation digitale
   → Activation événementielle (online/offline)

B. HASHTAG STRATEGY (min. 10 hashtags)
   → 3 hashtags de marque propriétaires
   → 4 hashtags de catégorie (secteur)
   → 3 hashtags de campagne (adaptables)
   → Usage et guidelines par contexte
   → KPIs de performance hashtag

C. PARTENARIATS & COLLABORATIONS (min. 3 opportunités)
   → Types de partenaires stratégiques
   → Marques complémentaires (co-branding)
   → Influenceurs/créateurs alignés
   → Médias & plateformes
   → Critères de sélection

4️⃣ MESURE & OPTIMISATION

A. FRAMEWORK KPIs (Catégories + exemples)
   → Awareness: impressions, reach, brand mentions
   → Considération: engagement rate, saves, shares
   → Conversion: clicks, sign-ups, sales
   → Fidélisation: retention, LTV, advocacy
   → Spécifiques secteur (compliance rate si applicable)

B. DASHBOARD & REPORTING
   → Fréquence de reporting recommandée
   → Métriques à tracker quotidiennement vs mensuellement
   → Benchmarks concurrentiels
   → Seuils d'alerte et triggers d'action
   → A/B testing prioritaire

C. STRATÉGIE D'OPTIMISATION CONTINUE
   → Process de test & learn
   → Allocation budgétaire adaptive (70% proven / 30% innovation)
   → Veille concurrentielle organisée
   → Innovation & expérimentation (nouveaux formats, plateformes)

═══════════════════════════════════════
VALIDATION QUALITÉ CANNES LIONS
═══════════════════════════════════════

Chaque section doit respecter :

✓ INSIGHT-DRIVEN
  → Basé sur analyse marché, concurrence, historique
  → Pas de généralités - insights actionnables uniquement
  
✓ DIFFÉRENCIATION
  → Stratégie unique vs. concurrents identifiés
  → Exploitation des forces et opportunités spécifiques
  
✓ FAISABILITÉ
  → Réaliste au vu du stade entreprise et positionnement prix
  → Adaptable selon ressources disponibles
  
✓ COMPLIANCE
  → Respect total cadre légal et réglementations sectorielles
  → Intégration créative des contraintes
  
✓ MESURABILITÉ
  → KPIs clairs et trackables
  → Objectifs SMART (Specific, Measurable, Achievable, Relevant, Time-bound)

✓ SCALABILITÉ
  → Stratégie évolutive (startup → scale-up → enterprise)
  → Déclinable multi-marchés si applicable

═══════════════════════════════════════
FORMAT DE RÉPONSE
═══════════════════════════════════════

• Structurer clairement avec numéros et lettres
• Chaque point doit être actionnable et spécifique
• Éviter jargon générique - être précis et concret
• Citer les insights marché/concurrence qui justifient chaque recommandation
• Intégrer systématiquement la dimension légale/compliance
• Longueurs minimales STRICTEMENT respectées

═══════════════════════════════════════

READY TO BUILD A CANNES LIONS WINNING STRATEGY 🦁🎯
`;
};
