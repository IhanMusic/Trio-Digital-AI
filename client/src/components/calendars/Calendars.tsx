import React, { useState, useEffect } from 'react';
import { config } from '../../config/env';
import { Link, useNavigate } from 'react-router-dom';
import { getWithAuth, postWithAuth, putWithAuth, deleteWithAuth } from '../../utils/apiUtils';
import EnhancedGenerationProgress from '../loading/EnhancedGenerationProgress';
import { countries } from '../../constants/countries';
import { 
  SOCIAL_NETWORKS, 
  CONTENT_TYPES, 
  TONE_OF_VOICE 
} from '../../constants/formOptions';
import SearchBar from '../common/SearchBar';
import StatusBadge, { StatusType } from '../common/StatusBadge';
import StatsCard from '../common/StatsCard';
import EmptyState from '../common/EmptyState';
import { useFilters } from '../../hooks/useFilters';

type Status = 'draft' | 'active' | 'completed' | 'archived';

interface CalendarData {
  _id: string;
  name: string;
  brandId: {
    _id: string;
    name: string;
  };
  status: Status;
  startDate: string;
  endDate: string;
  progress?: number;
}

interface Brand {
  _id: string;
  name: string;
  sector: string;
  description?: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  images?: {
    main?: string;
  };
}

interface CalendarFormData {
  name: string;
  startDate: string;
  endDate: string;
  country: string;
  languages: string[];  // Changé de language à languages
  brandId: string;
  selectedProducts: string[]; // IDs des produits sélectionnés
  goals: string[];
  frequency: 'daily' | 'twice_daily' | 'three_per_week' | 'weekly';
  socialNetworks: string[];
  contentTypes: string[];
  communicationStyle: string;
  contentPlan: {
    frequency: {
      facebook: number;
      instagram: number;
      twitter: number;
      linkedin: number;
      tiktok: number;
    };
    preferredTimes: {
      facebook: string[];
      instagram: string[];
      twitter: string[];
      linkedin: string[];
      tiktok: string[];
    };
    contentMix: {
      type: string;
      percentage: number;
    }[];
  };
  generationSettings: {
    tone: string;
    themes: string[];
    keywords: string[];
    contentLength: {
      min: number;
      max: number;
    };
    imageStyle: string[];
    integrateProductImages: boolean;
  };
}

const LanguageSection: React.FC<{
  country: string;
  languages: string[];
  onChange: (languages: string[]) => void;
}> = ({ country, languages, onChange }) => {
  const selectedCountry = countries.find(c => c.code === country);
  if (!selectedCountry) return null;

  const allLanguages = [
    { code: selectedCountry.languages.primary, name: selectedCountry.languageNames.primary },
    ...(selectedCountry.languages.secondary?.map((code, index) => ({
      code,
      name: selectedCountry.languageNames.secondary?.[index] || code
    })) || [])
  ];

  return (
    <div className="space-y-2 glass-panel p-4">
      {allLanguages.map(lang => {
        const dialectInfo = selectedCountry.dialectInfo?.[lang.code];
        return (
          <label key={lang.code} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={languages.includes(lang.code)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...languages, lang.code]);
                } else {
                  onChange(languages.filter(l => l !== lang.code));
                }
              }}
              className="form-checkbox h-4 w-4 text-[#53dfb2] rounded focus:ring-[#53dfb2]"
            />
            <span className="text-white">
              {lang.name}
              {dialectInfo && (
                <span className="ml-2 text-sm text-white/60">
                  ({dialectInfo.description})
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
};

const SocialNetworksSection: React.FC<{
  selectedNetworks: string[];
  onChange: (networks: string[]) => void;
}> = ({ selectedNetworks, onChange }) => {
  const handleNetworkChange = (network: string) => {
    if (selectedNetworks.includes(network)) {
      onChange(selectedNetworks.filter(n => n !== network));
    } else {
      onChange([...selectedNetworks, network]);
    }
  };

  return (
    <div className="space-y-2 glass-panel p-4">
      <h4 className="text-white mb-3">Quels réseaux sociaux utilisez-vous actuellement ?</h4>
      <div className="grid grid-cols-2 gap-4">
        {SOCIAL_NETWORKS.map((network) => (
          <label key={network.name} className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-[#53dfb2] rounded focus:ring-[#53dfb2]"
              checked={selectedNetworks.includes(network.name)}
              onChange={() => handleNetworkChange(network.name)}
            />
            <span className="text-white">{network.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const ContentTypesSection: React.FC<{
  selectedTypes: string[];
  onChange: (types: string[]) => void;
}> = ({ selectedTypes, onChange }) => {
  const handleTypeChange = (type: string) => {
    if (selectedTypes.includes(type)) {
      onChange(selectedTypes.filter(t => t !== type));
    } else {
      onChange([...selectedTypes, type]);
    }
  };

  return (
    <div className="space-y-2 glass-panel p-4">
      <h4 className="text-white mb-3">Types de contenu à générer</h4>
      {CONTENT_TYPES.map((category) => (
        <div key={category.category} className="mb-4">
          <h5 className="text-white/80 text-sm font-medium mb-2">{category.category}</h5>
          <div className="grid grid-cols-2 gap-3">
            {category.types.map((type) => (
              <label key={type} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-[#53dfb2] rounded focus:ring-[#53dfb2]"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                />
                <span className="text-white">{type}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};


const ProductsSection: React.FC<{
  selectedProducts: string[];
  onChange: (products: string[]) => void;
  availableProducts: Product[];
}> = ({ selectedProducts, onChange, availableProducts }) => {
  return (
    <div className="space-y-2 glass-panel p-4">
      <h4 className="text-white mb-3">Produits à mettre en avant</h4>
      {availableProducts.length === 0 ? (
        <p className="text-white/60">Aucun produit disponible pour cette marque</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableProducts.map((product) => (
            <label key={product._id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-[#53dfb2] rounded focus:ring-[#53dfb2]"
                checked={selectedProducts.includes(product._id)}
                onChange={() => {
                  if (selectedProducts.includes(product._id)) {
                    onChange(selectedProducts.filter(id => id !== product._id));
                  } else {
                    onChange([...selectedProducts, product._id]);
                  }
                }}
              />
              <span className="text-white">{product.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const Calendars: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingCalendarId, setGeneratingCalendarId] = useState<string | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<CalendarFormData>({
    name: '',
    startDate: '',
    endDate: '',
    country: '',
    languages: [],  // Initialisé comme un tableau vide
    brandId: '',
    selectedProducts: [], // Initialisé comme un tableau vide
    goals: [],
    frequency: 'daily',
    socialNetworks: [],
    contentTypes: [],
    communicationStyle: 'Professionnel',
    contentPlan: {
      frequency: {
        facebook: 3,
        instagram: 3,
        twitter: 3,
        linkedin: 2,
        tiktok: 2
      },
      preferredTimes: {
        facebook: ['10:00', '15:00', '19:00'],
        instagram: ['9:00', '13:00', '18:00'],
        twitter: ['8:00', '12:00', '17:00'],
        linkedin: ['10:00', '14:00'],
        tiktok: ['11:00', '16:00']
      },
      contentMix: [
        { type: 'image', percentage: 60 },
        { type: 'video', percentage: 30 },
        { type: 'text', percentage: 10 }
      ]
    },
    generationSettings: {
      tone: 'professionnel',
      themes: ['produit', 'marque', 'lifestyle'],
      keywords: [],
      contentLength: {
        min: 100,
        max: 280
      },
      imageStyle: ['moderne', 'professionnel'],
      integrateProductImages: true
    }
  });

  const [calendars, setCalendars] = useState<CalendarData[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const navigate = useNavigate();

  // Filters and search
  const {
    searchQuery,
    setSearchQuery,
    filteredData: filteredCalendars,
    setFilter,
    clearAllFilters,
    hasActiveFilters
  } = useFilters({
    data: calendars,
    searchFields: ['name'],
    filterFunctions: {
      status: (calendar, value) => value === 'all' || calendar.status === value
    }
  });

  // Update status filter
  useEffect(() => {
    setFilter('status', selectedStatus);
  }, [selectedStatus, setFilter]);

  // Calculate statistics
  const stats = {
    total: calendars.length,
    draft: calendars.filter(c => c.status === 'draft').length,
    active: calendars.filter(c => c.status === 'active').length,
    completed: calendars.filter(c => c.status === 'completed').length,
    archived: calendars.filter(c => c.status === 'archived').length
  };

  // Charger les marques et les calendriers au montage du composant
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Chargement des marques et calendriers...');
        
        // Récupérer les marques d'abord avec la nouvelle fonction utilitaire
        const brandsResult = await getWithAuth(`${config.apiUrl}/brands`);
        
        if (!brandsResult.success) {
          throw new Error(brandsResult.message || 'Erreur lors de la récupération des marques');
        }
        
        console.log('Marques chargées:', brandsResult.data.length);
        setBrands(brandsResult.data);
        
        // Si des marques sont disponibles, sélectionner la première par défaut
        if (brandsResult.data.length > 0) {
          setFormData(prev => ({
            ...prev,
            brandId: brandsResult.data[0]._id
          }));
        }

        // Ensuite récupérer les calendriers avec la nouvelle fonction utilitaire
        const calendarsResult = await getWithAuth(`${config.apiUrl}/calendars`);
        
        if (!calendarsResult.success) {
          throw new Error(calendarsResult.message || 'Erreur lors de la récupération des calendriers');
        }
        
        console.log('Calendriers chargés:', calendarsResult.data.length);
        setCalendars(calendarsResult.data);
      } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
        
        // Vérifier si l'erreur est liée à l'authentification
        if (error instanceof Error && error.message.includes('Non authentifié')) {
          console.log('Redirection vers la page de connexion...');
          navigate('/login');
        } else {
          alert('Erreur : ' + (error instanceof Error ? error.message : 'Erreur inconnue'));
        }
      }
    };

    fetchData();
  }, [navigate]);

  // Charger les produits quand une marque est sélectionnée
  useEffect(() => {
    if (formData.brandId) {
      const fetchProducts = async () => {
        try {
          console.log('Chargement des produits pour la marque:', formData.brandId);
          
          // Utiliser la nouvelle fonction utilitaire
          const result = await getWithAuth(`${config.apiUrl}/products/brand/${formData.brandId}`);
          
          if (result.success) {
            console.log('Produits chargés:', result.data.length);
            setAvailableProducts(result.data);
          }
        } catch (error) {
          console.error('Erreur lors du chargement des produits:', error);
          setAvailableProducts([]);
          
          // Vérifier si l'erreur est liée à l'authentification
          if (error instanceof Error && error.message.includes('Non authentifié')) {
            console.log('Redirection vers la page de connexion...');
            navigate('/login');
          }
        }
      };
      
      fetchProducts();
    } else {
      setAvailableProducts([]);
    }
  }, [formData.brandId, navigate]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce calendrier ?')) {
      return;
    }

    try {
      console.log('Suppression du calendrier:', id);
      
      // Utiliser la nouvelle fonction utilitaire
      await deleteWithAuth(`${config.apiUrl}/calendars/${id}`);
      
      console.log('Calendrier supprimé avec succès');
      
      // Mettre à jour la liste des calendriers
      setCalendars(calendars.filter(calendar => calendar._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du calendrier:', error);
      
      // Vérifier si l'erreur est liée à l'authentification
      if (error instanceof Error && error.message.includes('Non authentifié')) {
        console.log('Redirection vers la page de connexion...');
        navigate('/login');
      } else {
        alert('Erreur : ' + (error instanceof Error ? error.message : 'Erreur inconnue'));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      validateForm();
      
      console.log('Création du calendrier...');
      
      // Utiliser la nouvelle fonction utilitaire
      const result = await postWithAuth(`${config.apiUrl}/calendars`, formData);
      
      console.log('Calendrier créé avec succès:', result);
      setShowForm(false);
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la création du calendrier:', error);
      
      // Vérifier si l'erreur est liée à l'authentification
      if (error instanceof Error && error.message.includes('Non authentifié')) {
        console.log('Redirection vers la page de connexion...');
        navigate('/login');
      } else {
        alert('Erreur : ' + (error instanceof Error ? error.message : 'Erreur inconnue'));
      }
    }
  };

  const validateForm = () => {
    if (!formData.brandId) {
      throw new Error('La marque est requise');
    }
    if (!formData.country) {
      throw new Error('Le pays cible est requis');
    }
    if (formData.languages.length === 0) {
      throw new Error('Au moins une langue est requise');
    }
    if (!formData.startDate || !formData.endDate) {
      throw new Error('Les dates de début et de fin sont requises');
    }
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    if (isNaN(start.getTime())) {
      throw new Error('La date de début est invalide');
    }
    if (isNaN(end.getTime())) {
      throw new Error('La date de fin est invalide');
    }
    if (start >= end) {
      throw new Error('La date de fin doit être postérieure à la date de début');
    }
    if (!formData.name.trim()) {
      throw new Error('Le nom du calendrier est requis');
    }
  };

  const handleGenerate = async () => {
    try {
      validateForm();

      if (!formData.brandId) {
        throw new Error('Veuillez sélectionner une marque');
      }

      const brand = brands.find(b => b._id === formData.brandId);
      if (!brand) {
        throw new Error('La marque sélectionnée est invalide');
      }

      setIsGenerating(true);
      setShowForm(false);

      console.log('Préparation des données du calendrier pour la génération...');
      
      const frequencyMultiplier = formData.frequency === 'daily' ? 1 
        : formData.frequency === 'twice_daily' ? 2 
        : formData.frequency === 'three_per_week' ? 3/7
        : 1/7;
      const calendarData = {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        brandId: brand._id,
        targetCountry: formData.country,
        targetLanguages: formData.languages,  // Changé de targetLanguage à targetLanguages
        selectedProducts: formData.selectedProducts, // Ajouter les produits sélectionnés
        socialMediaAccounts: formData.socialNetworks.map(network => ({
          platform: network,
          handle: `@${brand.name.toLowerCase().replace(/\s+/g, '')}_${network.toLowerCase()}`
        })),
        contentPlan: {
          ...formData.contentPlan,
          contentMix: formData.contentPlan.contentMix.map(mix => ({
            type: mix.type,
            percentage: mix.percentage
          })),
          // Ne garder que les fréquences pour les réseaux sociaux sélectionnés
          frequency: Object.fromEntries(
            Object.entries(formData.contentPlan.frequency)
              .filter(([platform]) => formData.socialNetworks.includes(platform))
              .map(([platform, value]) => [
                platform,
                value * frequencyMultiplier
              ])
          ),
          // Ne garder que les heures préférées pour les réseaux sociaux sélectionnés
          preferredTimes: Object.fromEntries(
            Object.entries(formData.contentPlan.preferredTimes)
              .filter(([platform]) => formData.socialNetworks.includes(platform))
          )
        },
        generationSettings: {
          ...formData.generationSettings,
          tone: formData.communicationStyle.toLowerCase()
        }
      };

      console.log('Création du calendrier...');
      
      // Utiliser la nouvelle fonction utilitaire
      const calendarResult = await postWithAuth(`${config.apiUrl}/calendars`, calendarData);
      
      if (!calendarResult.success || !calendarResult.data || !calendarResult.data._id) {
        throw new Error('Réponse invalide du serveur lors de la création du calendrier');
      }

      console.log('Calendrier créé avec succès, ID:', calendarResult.data._id);
      
      const calendar = calendarResult.data;
      setGeneratingCalendarId(calendar._id);
      
      console.log('Génération du contenu pour le calendrier...');
      
      try {
        // Ajouter un délai pour s'assurer que le calendrier est bien enregistré
        console.log('Attente de 5 secondes avant de lancer la génération...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        console.log('Envoi de la requête de génération pour le calendrier:', calendar._id);
        
        // Vérifier que le calendrier existe toujours
        try {
          const calendarCheck = await getWithAuth(`${config.apiUrl}/calendars/${calendar._id}`);
          console.log('Vérification du calendrier:', calendarCheck);
          
          if (!calendarCheck.success || !calendarCheck.data) {
            throw new Error('Calendrier non trouvé ou inaccessible');
          }
          
          // Vérifier que le calendrier a des réseaux sociaux
          if (!calendarCheck.data.socialMediaAccounts || calendarCheck.data.socialMediaAccounts.length === 0) {
            throw new Error('Le calendrier doit avoir au moins un réseau social');
          }
          
          // Vérifier que le contentMix est valide
          if (!calendarCheck.data.contentPlan || !calendarCheck.data.contentPlan.contentMix) {
            throw new Error('Le plan de contenu est incomplet');
          }
          
          const contentMixSum = calendarCheck.data.contentPlan.contentMix.reduce((sum: number, mix: any) => sum + mix.percentage, 0);
          console.log('Somme des pourcentages du contentMix:', contentMixSum);
          
          if (contentMixSum !== 100) {
            throw new Error(`La somme des pourcentages du contentMix doit être égale à 100% (actuellement ${contentMixSum}%)`);
          }
          
          // Vérifier que les préférences de temps sont définies pour chaque réseau social
          const selectedPlatforms = calendarCheck.data.socialMediaAccounts.map((acc: any) => acc.platform.toLowerCase());
          for (const platform of selectedPlatforms) {
            if (!calendarCheck.data.contentPlan.preferredTimes || 
                !calendarCheck.data.contentPlan.preferredTimes[platform] || 
                calendarCheck.data.contentPlan.preferredTimes[platform].length === 0) {
              console.warn(`Aucune heure préférée définie pour ${platform}, utilisation de l'heure par défaut (12:00)`);
              // Définir une heure par défaut
              if (!calendarCheck.data.contentPlan.preferredTimes) {
                calendarCheck.data.contentPlan.preferredTimes = {};
              }
              calendarCheck.data.contentPlan.preferredTimes[platform] = ['12:00'];
              
              // Mettre à jour le calendrier
              await putWithAuth(`${config.apiUrl}/calendars/${calendar._id}`, {
                contentPlan: {
                  ...calendarCheck.data.contentPlan
                }
              });
            }
          }
        } catch (checkError) {
          console.error('Erreur lors de la vérification du calendrier:', checkError);
          throw checkError;
        }
        
        // Utiliser fetch directement pour avoir plus de contrôle sur la requête
        console.log('Lancement de la génération...');
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('Non authentifié');
        }
        
        const response = await fetch(`${config.apiUrl}/calendars/${calendar._id}/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({}) // Corps vide mais valide
        });
        
        if (!response.ok) {
          console.error('Réponse non-OK:', response.status, response.statusText);
          const errorText = await response.text();
          console.error('Contenu de l\'erreur:', errorText);
          
          let errorMessage = `Erreur ${response.status}`;
          try {
            const errorData = JSON.parse(errorText);
            if (errorData && errorData.error) {
              errorMessage = errorData.error;
            }
          } catch (e) {
            console.error('Impossible de parser l\'erreur JSON:', e);
          }
          
          throw new Error(errorMessage);
        }
        
        const generateResult = await response.json();
        
        if (!generateResult.success) {
          console.error('Échec de la génération du contenu:', generateResult);
          throw new Error('Échec de la génération du contenu: ' + (generateResult.error || 'Raison inconnue'));
        }

        console.log('Contenu généré avec succès, redirection vers les résultats...');
        window.location.href = `/results/${calendar._id}`;
      } catch (generateError) {
        console.error('Erreur détaillée lors de la génération:', generateError);
        throw new Error('Erreur lors de la génération du contenu: ' + 
          (generateError instanceof Error ? generateError.message : 'Erreur inconnue'));
      }
    } catch (error) {
      console.error('Erreur lors de la génération du calendrier:', error);
      setIsGenerating(false);
      
      // Vérifier si l'erreur est liée à l'authentification
      if (error instanceof Error && error.message.includes('Non authentifié')) {
        console.log('Redirection vers la page de connexion...');
        navigate('/login');
      } else {
        alert('Erreur : ' + (error instanceof Error ? error.message : 'Erreur inconnue'));
      }
    }
  };

  if (isGenerating && generatingCalendarId) {
    const selectedBrand = brands.find(b => b._id === formData.brandId);
    
    // Calculer le nombre de posts attendus
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)) + 1;
    
    let expectedPosts = totalDays;
    switch (formData.frequency) {
      case 'twice_daily':
        expectedPosts = totalDays * 2;
        break;
      case 'three_per_week':
        expectedPosts = Math.ceil(totalDays * (3 / 7));
        break;
      case 'weekly':
        expectedPosts = Math.ceil(totalDays / 7);
        break;
      default:
        expectedPosts = totalDays;
    }
    
    // Multiplier par le nombre de réseaux sociaux sélectionnés
    expectedPosts = expectedPosts * formData.socialNetworks.length;
    
    return (
      <EnhancedGenerationProgress 
        calendarId={generatingCalendarId}
        brandName={selectedBrand?.name}
        expectedPosts={expectedPosts}
      />
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-[#53dfb2] bg-clip-text text-transparent">
          Calendriers Éditoriaux
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="glass-button inline-flex items-center justify-center"
        >
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Nouveau Calendrier
        </button>
      </div>

      {calendars.length === 0 ? (
        <EmptyState
          icon="📅"
          title="Aucun calendrier"
          description="Créez votre premier calendrier éditorial pour planifier et générer du contenu pour vos réseaux sociaux."
          actionLabel="Nouveau Calendrier"
          onAction={() => setShowForm(true)}
        />
      ) : (
        <>
          {/* Statistics Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <StatsCard
              icon="📊"
              label="Total"
              value={stats.total}
              color="text-white"
            />
            <StatsCard
              icon="📝"
              label="Brouillons"
              value={stats.draft}
              color="text-gray-400"
            />
            <StatsCard
              icon="🎯"
              label="En cours"
              value={stats.active}
              color="text-[#53dfb2]"
            />
            <StatsCard
              icon="✅"
              label="Terminés"
              value={stats.completed}
              color="text-green-400"
            />
            <StatsCard
              icon="📦"
              label="Archivés"
              value={stats.archived}
              color="text-orange-400"
            />
          </div>

          {/* Search and Filters */}
          <div className="glass-panel p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Rechercher un calendrier..."
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="glass-input py-3"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="draft">📝 Brouillons</option>
                  <option value="active">🎯 En cours</option>
                  <option value="completed">✅ Terminés</option>
                  <option value="archived">📦 Archivés</option>
                </select>
              </div>
            </div>

            {/* Active Filters Info */}
            {hasActiveFilters && (
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-white/60">
                  {filteredCalendars.length} calendrier{filteredCalendars.length > 1 ? 's' : ''} trouvé{filteredCalendars.length > 1 ? 's' : ''}
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-[#53dfb2] hover:text-[#53dfb2]/80 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>

          {/* Calendars Display */}
          {filteredCalendars.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="Aucun résultat"
              description="Aucun calendrier ne correspond à vos critères de recherche."
              actionLabel="Réinitialiser"
              onAction={clearAllFilters}
            />
          ) : (
            /* Cards View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCalendars.map((calendar) => (
                <div 
                  key={calendar._id} 
                  className="glass-panel p-6 hover:scale-[1.02] transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-1 truncate">
                        {calendar.name}
                      </h3>
                      <p className="text-sm text-white/60">
                        {calendar.brandId?.name || 'Marque inconnue'}
                      </p>
                    </div>
                    <StatusBadge 
                      status={calendar.status as StatusType} 
                      size="sm"
                    />
                  </div>

                  {/* Dates */}
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center text-xs text-white/60">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Du {new Date(calendar.startDate).toLocaleDateString('fr-FR')} au {new Date(calendar.endDate).toLocaleDateString('fr-FR')}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-white/60 mb-2">
                      <span>Progression</span>
                      <span>{calendar.progress || 0}%</span>
                    </div>
                    <div className="relative w-full bg-white/10 rounded-full h-2">
                      <div
                        className="absolute h-2 bg-gradient-to-r from-[#53dfb2] to-[#3fa88a] rounded-full transition-all duration-500"
                        style={{ width: `${calendar.progress || 0}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-white/10">
                    <Link
                      to={`/results/${calendar._id}`}
                      className="flex-1 glass-button text-center text-xs py-2"
                    >
                      👁️ Voir
                    </Link>
                    <button
                      onClick={() => handleDelete(calendar._id)}
                      className="glass-button text-xs py-2 px-3 bg-red-500/20 hover:bg-red-500/30"
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal de création de calendrier */}
      {showForm && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-[#2d2d67]/80 backdrop-blur-sm" onClick={() => setShowForm(false)}></div>
            
            <div className="relative glass-panel rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#2d2d67]/90 backdrop-blur-md p-4 border-b border-white/10 z-10">
                <h3 className="text-xl font-medium text-white">Nouveau Calendrier Éditorial</h3>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Champs du formulaire */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                      Nom du calendrier
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="glass-input mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="brandId" className="block text-sm font-medium text-white/80 mb-2">
                      Marque
                    </label>
                    <select
                      id="brandId"
                      name="brandId"
                      value={formData.brandId}
                      onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                      className="glass-input mt-1"
                      required
                    >
                      <option value="">Sélectionnez une marque</option>
                      {brands.map((brand) => (
                        <option key={brand._id} value={brand._id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-white/80 mb-2">
                        Date de début
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="glass-input mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-white/80 mb-2">
                        Date de fin
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="glass-input mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-white/80 mb-2">
                      Pays cible
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="glass-input mt-1"
                      required
                    >
                      <option value="">Sélectionnez un pays</option>
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.country && (
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Langues
                      </label>
                      <LanguageSection
                        country={formData.country}
                        languages={formData.languages}
                        onChange={(languages) => setFormData({ ...formData, languages })}
                      />
                    </div>
                  )}


                  {availableProducts.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Produits à mettre en avant
                      </label>
                      <ProductsSection
                        selectedProducts={formData.selectedProducts}
                        onChange={(products) => setFormData({ ...formData, selectedProducts: products })}
                        availableProducts={availableProducts}
                      />
                      
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Réseaux sociaux
                    </label>
                    <SocialNetworksSection
                      selectedNetworks={formData.socialNetworks}
                      onChange={(networks) => setFormData({ ...formData, socialNetworks: networks })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Types de contenu
                    </label>
                    <ContentTypesSection
                      selectedTypes={formData.contentTypes}
                      onChange={(types) => setFormData({ ...formData, contentTypes: types })}
                    />
                  </div>


                  <div>
                    <label htmlFor="communicationStyle" className="block text-sm font-medium text-white/80 mb-2">
                      Ton de Communication
                    </label>
                    <select
                      id="communicationStyle"
                      name="communicationStyle"
                      value={formData.communicationStyle}
                      onChange={(e) => setFormData({ ...formData, communicationStyle: e.target.value })}
                      className="glass-input mt-1"
                    >
                      <option value="">Sélectionnez un style</option>
                      {TONE_OF_VOICE.map((tone) => (
                        <option key={tone.style} value={tone.style}>
                          {tone.style} - {tone.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="frequency" className="block text-sm font-medium text-white/80 mb-2">
                      Fréquence de publication
                    </label>
                    <select
                      id="frequency"
                      name="frequency"
                      value={formData.frequency}
                      onChange={(e) => setFormData({ ...formData, frequency: e.target.value as 'daily' | 'twice_daily' | 'three_per_week' | 'weekly' })}
                      className="glass-input mt-1"
                    >
                      <option value="daily">Quotidienne (1 post par jour)</option>
                      <option value="twice_daily">Bi-quotidienne (2 posts par jour)</option>
                      <option value="three_per_week">3 posts par semaine</option>
                      <option value="weekly">1 post par semaine</option>
                    </select>
                  </div>
                </form>
              </div>
              
              <div className="sticky bottom-0 bg-[#2d2d67]/90 backdrop-blur-md p-4 border-t border-white/10 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="glass-button bg-white/10 hover:bg-white/20"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="glass-button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                  Générer
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="glass-button"
                >
                  Créer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendars;
