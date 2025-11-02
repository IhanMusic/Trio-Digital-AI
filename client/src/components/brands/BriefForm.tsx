import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { BriefData } from '../../types/brief';
import { 
  SECTORS, 
  SOCIAL_NETWORKS, 
  CONTENT_OBJECTIVES, 
  CONTENT_TYPES, 
  TONE_OF_VOICE, 
  TARGET_AUDIENCES,
  COMPETITOR_STRATEGIES,
  SUCCESS_METRICS,
  ROI_EXPECTATIONS,
  CompetitorStrategy,
  SuccessMetric,
  RoiExpectation
} from '../../constants/formOptions';

export const BriefForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { token, isAuthenticated } = useAuthContext();
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState('');
  const [isEditMode, setIsEditMode] = useState(!!id);
  const [formData, setFormData] = useState<BriefData>({
    companyName: 'Coca Cola',
    email: 'marketing@coca-cola.com',
    sector: 'FMCG (Fast-Moving Consumer Goods)',
    companyDescription: 'Coca-Cola est le leader mondial des boissons non alcoolisées, créant des moments de bonheur et de partage depuis 1886. La marque est reconnue pour ses produits rafraîchissants, son marketing innovant et sa capacité à rassembler les gens autour de valeurs positives. Coca-Cola s\'engage dans le développement durable et l\'innovation produit, tout en maintenant la qualité et le goût iconique qui ont fait sa renommée mondiale.',
    logo: null,
    brandGuidelines: null,
    productPhotos: [],
    currentSocialNetworks: ['Facebook', 'Instagram', 'LinkedIn', 'YouTube', 'Twitter', 'TikTok'],
    socialMediaGoals: [
      'Renforcer l\'image de marque positive',
      'Créer des connexions émotionnelles',
      'Engager la communauté mondiale',
      'Promouvoir le lifestyle Coca-Cola',
      'Mettre en avant les initiatives durables',
      'Stimuler l\'engagement des jeunes',
      'Développer la présence digitale',
      'Créer des moments de partage',
      'Augmenter la visibilité des nouveaux produits',
      'Renforcer la fidélité à la marque'
    ],
    contentTypes: [
      'Photos de produits',
      'Vidéos lifestyle',
      'Stories',
      'Reels/Shorts',
      'Behind the scenes',
      'Lives d\'événements',
      'Posts engageants',
      'Témoignages consommateurs',
      'Contenus saisonniers',
      'Tutoriels cocktails',
      'Reportages événements',
      'Interviews partenaires',
      'Infographies',
      'Podcasts',
      'Webséries'
    ],
    communicationStyle: 'Décontracté et inspirant',
    targetAudience: {
      demographic: [
        '13-17 ans',
        '18-24 ans',
        '25-34 ans',
        '35-44 ans',
        '45-54 ans',
        'Hommes',
        'Femmes',
        'Familles'
      ],
      professional: [
        'Étudiants',
        'Jeunes actifs',
        'Professionnels',
        'Parents',
        'Sportifs',
        'Créatifs',
        'Influenceurs',
        'Restaurateurs'
      ],
      behavioral: [
        'Amateurs de soft drinks',
        'Lifestyle actif',
        'Sociables',
        'Sensibles à l\'environnement',
        'Connectés',
        'Chercheurs d\'expériences',
        'Passionnés de culture pop',
        'Adeptes des réseaux sociaux'
      ],
      geographic: [
        'Urbain',
        'Périurbain',
        'Rural',
        'National',
        'International',
        'Zones touristiques',
        'Lieux de divertissement'
      ]
    },
    uniqueSellingPoints: 'Goût iconique mondialement reconnu, héritage historique fort, symbole de partage et de bonheur, présence mondiale, innovation continue, engagement communautaire, qualité constante, expérience rafraîchissante unique',
    customerBenefits: 'Moments de plaisir partagé, rafraîchissement instantané, expérience gustative unique, connexion sociale, participation à une communauté mondiale, accès à des événements exclusifs, engagement dans des causes positives, découverte de nouvelles saveurs',
    audienceNeeds: 'Recherche de moments de partage, désir de rafraîchissement, besoin de connexion sociale, quête d\'expériences authentiques, sensibilité environnementale, recherche de nouveautés, besoin d\'appartenance, désir de divertissement',
    productSolution: 'Gamme complète de boissons rafraîchissantes répondant à tous les goûts et moments de consommation, du Coca-Cola classique aux versions sans sucre, en passant par les nouvelles saveurs et les éditions limitées. Solutions d\'hydratation pour tous les styles de vie, avec un engagement fort pour la durabilité et l\'innovation.',
    competitors: 'Pepsi, Dr Pepper, Red Bull, Orangina, Fanta, Sprite, Monster Energy, Nestlé',
    competitorStrategies: [
      'Marketing digital innovant',
      'Contenu lifestyle engageant',
      'Engagement fort sur la durabilité',
      'Expériences de marque immersives',
      'Stratégie d\'influence dynamique',
      'Storytelling émotionnel',
      'Événements communautaires',
      'Campagnes virales'
    ],
    successMetrics: [
      'Taux d\'engagement sur les contenus',
      'Croissance de la communauté',
      'Sentiment de marque positif',
      'Portée des campagnes',
      'Interactions qualifiées',
      'Partage de contenus',
      'Temps passé sur les contenus',
      'Mentions spontanées'
    ],
    roiExpectations: [
      'Augmentation de 30% de l\'engagement',
      'Croissance de 25% de la communauté',
      'Amélioration de 40% du taux de partage',
      'Hausse de 35% des mentions positives',
      'Progression de 20% de la visibilité',
      'Augmentation de 45% des interactions',
      'Croissance de 50% du reach organique'
    ],
    specificThemes: 'Moments de partage, rafraîchissement, bonheur quotidien, durabilité environnementale, innovation produit, culture pop, sport et divertissement, festivités saisonnières, engagement communautaire, lifestyle jeune et dynamique',
    additionalInfo: 'Focus sur l\'engagement communautaire et la durabilité tout en maintenant l\'ADN festif et rassembleur de la marque. Importance de l\'équilibre entre tradition et innovation. Accent sur les expériences de marque personnalisées et l\'engagement des jeunes générations.',
    legalConstraints: {
      regulations: [
        'Réglementation alimentaire',
        'Normes d\'étiquetage',
        'Communication responsable',
        'Protection des mineurs',
        'RGPD',
        'Allégations nutritionnelles',
        'Normes environnementales',
        'Réglementation publicitaire'
      ],
      compliance: [
        'RGPD',
        'Directives alimentaires',
        'Normes de communication',
        'Réglementation environnementale',
        'Standards publicitaires',
        'Protection des données',
        'Normes sanitaires',
        'Réglementation marketing'
      ],
      disclaimers: [
        'Informations nutritionnelles',
        'Consommation responsable',
        'Allergènes',
        'Conditions promotionnelles',
        'Mentions légales',
        'Droits d\'auteur',
        'Protection des mineurs',
        'Conditions d\'utilisation'
      ]
    },
    budget: {
      totalBudget: '2000000€',
      allocation: {
        "Contenu Digital": 35,
        "Social Media": 30,
        "Influence": 20,
        "Événementiel": 15
      },
      constraints: [
        'Budget trimestriel',
        'ROI minimum attendu',
        'Allocation par gamme',
        'Répartition géographique',
        'Investissement innovation',
        'Budget par réseau social',
        'Coûts de production',
        'Budget influence'
      ]
    },
    resources: {
      internalTeam: [
        'Directeur marketing digital',
        'Social media manager',
        'Content manager',
        'Community manager',
        'Chef de produit',
        'Responsable CRM',
        'Designer graphique',
        'Responsable innovation',
        'Expert communication',
        'Coordinateur événementiel'
      ],
      externalPartners: [
        'Agence créative',
        'Studio photo/vidéo',
        'Agence RP',
        'Influenceurs lifestyle',
        'Experts réseaux sociaux',
        'Consultants durabilité',
        'Producteurs de contenu',
        'Agence média'
      ],
      tools: [
        'Suite Adobe Creative',
        'Hootsuite',
        'Google Analytics',
        'HubSpot',
        'Salesforce',
        'Sprinklr',
        'Brandwatch',
        'Canva Pro',
        'Monday.com',
        'Asana'
      ]
    },
    previousCampaigns: [{
      name: 'Summer Vibes 2023',
      period: 'Q3 2023',
      results: [
        '10M impressions',
        '+55% engagement',
        '500K partages',
        '2M interactions',
        '+70% visibilité',
        '5M vues vidéo',
        '100K UGC',
        '1M mentions'
      ],
      learnings: [
        'Contenus courts plus performants',
        'Impact fort du UGC',
        'Importance du timing saisonnier',
        'Efficacité des challenges',
        'Force du storytelling émotionnel',
        'Impact des micro-influenceurs',
        'Engagement fort sur TikTok',
        'ROI événementiel positif'
      ]
    }],
    competitiveAnalysis: {
      directCompetitors: [{
        name: 'Pepsi',
        strengths: [
          'Marketing jeune',
          'Innovation produit',
          'Présence digitale',
          'Partenariats musicaux',
          'Communication décalée',
          'Stratégie prix',
          'Innovation packaging',
          'Engagement digital'
        ],
        weaknesses: [
          'Image moins iconique',
          'Présence internationale moindre',
          'Heritage moins fort',
          'Diversification limitée',
          'Engagement communautaire plus faible'
        ],
        strategies: [
          'Focus sur la jeunesse',
          'Marketing sportif',
          'Communication digitale',
          'Influence musicale',
          'Innovation continue',
          'Marketing événementiel',
          'Expérience digitale'
        ]
      }],
      marketPosition: 'Leader mondial des soft drinks',
      differentiators: [
        'Heritage historique',
        'Présence mondiale',
        'Image iconique',
        'Goût unique',
        'Force communautaire',
        'Marketing innovant',
        'Engagement durable',
        'Réseau distribution'
      ],
      opportunities: [
        'Innovation produit',
        'Engagement Gen Z',
        'Marketing digital',
        'Durabilité',
        'Personnalisation',
        'Nouveaux marchés',
        'E-commerce',
        'Expériences immersives'
      ]
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'brandGuidelines' | 'productPhotos') => {
    const files = e.target.files;
    if (!files) return;

    if (field === 'productPhotos') {
      const productPhotos = formData.productPhotos || [];
      if (files.length + productPhotos.length > 10) {
        alert('Vous ne pouvez ajouter que 10 photos maximum');
        return;
      }
      setFormData(prev => ({
        ...prev,
        productPhotos: [...(prev.productPhotos || []), ...Array.from(files)]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: files[0]
      }));
    }
  };

  const handleArrayChange = (
    field: 'currentSocialNetworks' | 'socialMediaGoals' | 'contentTypes' | 'competitorStrategies' | 'successMetrics' | 'roiExpectations',
    value: string
  ) => {
    setFormData(prev => {
      const array = prev[field] || [];
      const newArray = array.includes(value)
        ? array.filter((item: string) => item !== value)
        : [...array, value];
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const handleTargetAudienceChange = (category: keyof BriefData['targetAudience'], value: string) => {
    setFormData(prev => {
      const targetAudience = prev.targetAudience || {
        demographic: [],
        professional: [],
        behavioral: [],
        geographic: []
      };
      const currentValues = targetAudience[category] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((item: string) => item !== value)
        : [...currentValues, value];
      return {
        ...prev,
        targetAudience: {
          ...targetAudience,
          [category]: newValues
        }
      };
    });
  };

  // Charger les données de la marque si on est en mode édition
  useEffect(() => {
    if (id && isAuthenticated && token) {
      const fetchBrandDetails = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:5000/api/brands/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des détails de la marque');
          }

          const { data: brand } = await response.json();
          
          // Convertir les données de la marque au format du formulaire
          setFormData({
            ...formData,
            companyName: brand.name || '',
            email: brand.email || 'marketing@example.com', // Valeur par défaut si non définie
            sector: brand.sector || '',
            companyDescription: brand.description || '',
            communicationStyle: brand.tone || '',
            targetAudience: {
              demographic: brand.targetAudience?.filter((audience: string) => 
                (formData.targetAudience?.demographic || []).some(demo => audience.includes(demo))) || [],
              professional: brand.targetAudience?.filter((audience: string) => 
                (formData.targetAudience?.professional || []).some(prof => audience.includes(prof))) || [],
              behavioral: brand.targetAudience?.filter((audience: string) => 
                (formData.targetAudience?.behavioral || []).some(behav => audience.includes(behav))) || [],
              geographic: brand.targetAudience?.filter((audience: string) => 
                (formData.targetAudience?.geographic || []).some(geo => audience.includes(geo))) || [],
            },
            competitors: brand.competitors?.join(', ') || '',
            currentSocialNetworks: brand.socialMediaAccounts?.map((account: { platform: string }) => account.platform) || [],
            socialMediaGoals: brand.values || [],
            // Conserver les autres valeurs par défaut pour les champs non présents dans le modèle Brand
          });
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
          setLoading(false);
        }
      };

      fetchBrandDetails();
    }
  }, [id, token, isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.email || !formData.sector) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      const brandData = {
        name: formData.companyName,
        sector: formData.sector,
        description: formData.companyDescription,
        tone: formData.communicationStyle,
        targetAudience: [
          ...(formData.targetAudience?.demographic || []),
          ...(formData.targetAudience?.professional || []),
          ...(formData.targetAudience?.behavioral || []),
          ...(formData.targetAudience?.geographic || [])
        ],
        competitors: formData.competitors.split(',').map(c => c.trim()),
        values: formData.socialMediaGoals,
        socialMediaAccounts: (formData.currentSocialNetworks || []).map(network => ({
          platform: network,
          handle: `@${formData.companyName.toLowerCase().replace(/\s+/g, '')}_${network.toLowerCase()}`
        })),
        lastGenerationDate: new Date(),
        contentGenerated: 0,
        team: []
      };

      if (!isAuthenticated || !token) {
        throw new Error('Vous devez être connecté pour effectuer cette action');
      }

      // Déterminer si on crée ou on met à jour une marque
      const url = isEditMode 
        ? `http://localhost:5000/api/brands/${id}` 
        : 'http://localhost:5000/api/brands';
      
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(brandData)
      });

      if (response.status === 401) {
        throw new Error('Session expirée. Veuillez vous reconnecter.');
      } else if (!response.ok) {
        throw new Error(`Erreur lors de la ${isEditMode ? 'mise à jour' : 'création'} de la marque`);
      }

      const result = await response.json();
      alert(`Marque ${isEditMode ? 'mise à jour' : 'créée'} avec succès !`);
      navigate('/brands');
    } catch (error) {
      alert('Erreur lors de la sauvegarde : ' + (error instanceof Error ? error.message : 'Erreur inconnue'));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-panel p-8 rounded-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#53dfb2]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Titre supprimé */}
      
      {error && (
        <div className="glass-panel border-red-500/30 px-6 py-4 rounded-xl mb-8">
          <p className="text-red-400">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-12 bg-black/30 p-8 rounded-xl backdrop-blur-sm shadow-xl">
        {/* Informations de base */}
        <section className="space-y-8">
          <h3 className="text-2xl font-semibold text-white border-b border-white/20 pb-4">Informations de Base</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-white mb-2">
                Nom de l'entreprise
              </label>
              <input
                type="text"
                id="companyName"
                required
                className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white/20"
                value={formData.companyName}
                onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                E-Mail
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white/20"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label htmlFor="sector" className="block text-sm font-medium text-white mb-2">
              Secteur d'activité
            </label>
            <select
              id="sector"
              required
              className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white/20"
              value={formData.sector}
              onChange={(e) => setFormData(prev => ({ ...prev, sector: e.target.value }))}
            >
              <option value="">Veuillez sélectionner</option>
              {SECTORS.map((sector) => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Description de l'entreprise */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Description de l'Entreprise</h3>
          
          <div>
            <label htmlFor="companyDescription" className="block text-sm font-medium text-white mb-2">
              Description de l'entreprise
            </label>
            <textarea
              id="companyDescription"
              rows={4}
              required
              className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white/20"
              value={formData.companyDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, companyDescription: e.target.value }))}
            />
          </div>
        </section>


        {/* Objectifs */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Objectifs</h3>
          
          {CONTENT_OBJECTIVES.map((category) => (
            <div key={category.category}>
              <label className="block text-sm font-medium text-white mb-4">
                {category.category}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.objectives.map((objective) => (
                  <label key={objective} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-pink-500"
                      checked={(formData.socialMediaGoals || []).includes(objective)}
                      onChange={() => handleArrayChange('socialMediaGoals', objective)}
                    />
                    <span className="text-white">{objective}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </section>


        {/* Stratégies des concurrents */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Stratégies des Concurrents</h3>
          
          <div>
            <label className="block text-sm font-medium text-white mb-4">
              Quelles stratégies de médias sociaux vos concurrents utilisent-ils que vous admirez ?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COMPETITOR_STRATEGIES.map((strategy: CompetitorStrategy) => (
                <label key={strategy.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-pink-500"
                    checked={(formData.competitorStrategies || []).includes(strategy.label)}
                    onChange={() => handleArrayChange('competitorStrategies', strategy.label)}
                  />
                  <span className="text-white">{strategy.label}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Mesures de succès */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Mesures de Succès</h3>
          
          <div>
            <label className="block text-sm font-medium text-white mb-4">
              Comment mesurez-vous actuellement le succès sur les réseaux sociaux ?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SUCCESS_METRICS.map((metric: SuccessMetric) => (
                <label key={metric.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-pink-500"
                    checked={(formData.successMetrics || []).includes(metric.label)}
                    onChange={() => handleArrayChange('successMetrics', metric.label)}
                  />
                  <span className="text-white">{metric.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-4">
              Quelles sont vos attentes en termes de ROI ?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ROI_EXPECTATIONS.map((expectation: RoiExpectation) => (
                <label key={expectation.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-pink-500"
                    checked={(formData.roiExpectations || []).includes(expectation.label)}
                    onChange={() => handleArrayChange('roiExpectations', expectation.label)}
                  />
                  <span className="text-white">{expectation.label}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Informations supplémentaires */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Informations Supplémentaires</h3>
          
          <div>
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-white mb-2">
              Y a-t-il d'autres informations que vous souhaitez partager ?
            </label>
            <textarea
              id="additionalInfo"
              rows={4}
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              value={formData.additionalInfo}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
            />
          </div>
        </section>

        <div className="flex justify-between items-center pt-6">
          <button
            type="button"
            onClick={() => navigate('/brands')}
            className="px-8 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transition-all duration-200 font-medium"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center space-x-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
            </svg>
            <span>{isEditMode ? 'Mettre à jour' : 'Sauvegarder'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BriefForm;
