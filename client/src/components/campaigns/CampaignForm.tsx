import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getWithAuth } from '../../utils/apiUtils';
import { config } from '../../config/env';

interface Brand {
  _id: string;
  name: string;
  sector: string;
  colors: string[];
}

interface Product {
  _id: string;
  name: string;
  category: string;
  description: string;
}

interface CampaignFormData {
  name: string;
  description: string;
  brandId: string;
  selectedProducts: string[];
  campaignType: string;
  primaryObjective: string;
  startDate: string;
  endDate: string;
  budget?: {
    total: number;
    allocation: {
      organic: number;
      ads: number;
      influencers: number;
    };
  };
  targetAudience: {
    primary: string[];
    secondary: string[];
    demographics: string[];
    interests: string[];
    behaviors: string[];
  };
}

const CAMPAIGN_TYPES = [
  { value: 'product-launch', label: 'Lancement de produit', description: 'Introduire un nouveau produit sur le marché' },
  { value: 'brand-awareness', label: 'Notoriété de marque', description: 'Augmenter la visibilité et reconnaissance de la marque' },
  { value: 'seasonal', label: 'Campagne saisonnière', description: 'Capitaliser sur les moments culturels et saisonniers' },
  { value: 'promotional', label: 'Promotion commerciale', description: 'Stimuler les ventes avec des offres spéciales' },
  { value: 'retention', label: 'Fidélisation client', description: 'Renforcer la relation avec les clients existants' },
  { value: 'rebranding', label: 'Rebranding', description: 'Accompagner un changement d\'identité de marque' }
];

const PRIMARY_OBJECTIVES = [
  { value: 'awareness', label: 'Notoriété', description: 'Faire connaître la marque/produit' },
  { value: 'consideration', label: 'Considération', description: 'Inciter à considérer l\'achat' },
  { value: 'conversion', label: 'Conversion', description: 'Générer des ventes directes' },
  { value: 'loyalty', label: 'Fidélité', description: 'Renforcer la fidélité client' },
  { value: 'engagement', label: 'Engagement', description: 'Créer de l\'interaction et de l\'engagement' }
];

interface CampaignFormProps {
  onSubmit: (campaign: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ onSubmit, onCancel, isLoading = false }) => {
  const { user, token } = useAuth();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [formData, setFormData] = useState<CampaignFormData>({
    name: '',
    description: '',
    brandId: '',
    selectedProducts: [],
    campaignType: '',
    primaryObjective: '',
    startDate: '',
    endDate: '',
    budget: {
      total: 10000,
      allocation: {
        organic: 30,
        ads: 50,
        influencers: 20
      }
    },
    targetAudience: {
      primary: [],
      secondary: [],
      demographics: [],
      interests: [],
      behaviors: []
    }
  });

  const [audienceInputs, setAudienceInputs] = useState({
    primary: '',
    secondary: '',
    demographics: '',
    interests: '',
    behaviors: ''
  });

  // Charger les marques au montage
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoadingBrands(true);
        console.log('🔄 Tentative de chargement des marques...');
        console.log('👤 Utilisateur connecté:', !!user);
        console.log('🔑 Token disponible:', !!token);
        
        if (!user) {
          console.warn('⚠️ Utilisateur non connecté, impossible de charger les marques');
          setLoadingBrands(false);
          return;
        }

        if (!token) {
          console.warn('⚠️ Token non disponible dans le contexte');
          setLoadingBrands(false);
          return;
        }

        console.log('📡 Appel API avec getWithAuth...');
        const brandsResult = await getWithAuth(`${config.apiUrl}/brands`);
        console.log('📡 Réponse API brands:', brandsResult);
        
        if (!brandsResult.success) {
          throw new Error(brandsResult.message || 'Erreur lors de la récupération des marques');
        }
        
        setBrands(brandsResult.data || []);
        console.log('✅ Marques chargées:', brandsResult.data?.length || 0);
      } catch (error: any) {
        console.error('❌ Erreur lors du chargement des marques:', error);
        
        if (error.response?.status === 401) {
          console.error('🔐 Erreur d\'authentification - token invalide ou expiré');
        } else if (error.response?.status === 403) {
          console.error('🚫 Accès refusé');
        } else if (error.response?.status === 404) {
          console.log('📭 Endpoint brands non trouvé');
        } else {
          console.error('🔥 Erreur serveur:', error.message);
        }
      } finally {
        setLoadingBrands(false);
      }
    };

    fetchBrands();
  }, [user, token]);

  // Charger les produits quand une marque est sélectionnée
  useEffect(() => {
    const fetchProducts = async () => {
      if (!formData.brandId) {
        setProducts([]);
        return;
      }

      setLoadingProducts(true);
      try {
        console.log('Chargement des produits pour la marque:', formData.brandId);
        
        // Utiliser la même approche que les calendriers
        const result = await getWithAuth(`${config.apiUrl}/products/brand/${formData.brandId}`);
        
        if (result.success) {
          console.log('Produits chargés:', result.data.length);
          setProducts(result.data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [formData.brandId]);

  const handleInputChange = (field: keyof CampaignFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBudgetChange = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      budget: {
        ...prev.budget!,
        [field]: value
      }
    }));
  };

  const handleBudgetAllocationChange = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      budget: {
        ...prev.budget!,
        allocation: {
          ...prev.budget!.allocation,
          [field]: value
        }
      }
    }));
  };

  const handleAudienceInputChange = (field: string, value: string) => {
    setAudienceInputs(prev => ({
      ...prev,
      [field]: value
    }));

    // Convertir en tableau
    const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({
      ...prev,
      targetAudience: {
        ...prev.targetAudience,
        [field]: arrayValue
      }
    }));
  };

  const handleProductToggle = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedProducts: prev.selectedProducts.includes(productId)
        ? prev.selectedProducts.filter(id => id !== productId)
        : [...prev.selectedProducts, productId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const selectedCampaignType = CAMPAIGN_TYPES.find(type => type.value === formData.campaignType);
  const selectedObjective = PRIMARY_OBJECTIVES.find(obj => obj.value === formData.primaryObjective);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-[#53dfb2] bg-clip-text text-transparent mb-4">
          Créer une nouvelle campagne
        </h2>
        <p className="text-white/60">
          Générez automatiquement une stratégie complète avec GPT-5 : contenu organique, publicités Meta Ads, 
          et recommandations d'influenceurs personnalisées.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations de base */}
        <div className="glass-panel p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/20 pb-2">📋 Informations de base</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Nom de la campagne *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="glass-input"
                placeholder="Ex: Lancement Été 2024"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Marque *
              </label>
              {loadingBrands ? (
                <div className="glass-input bg-white/5">
                  Chargement des marques...
                </div>
              ) : (
                <select
                  value={formData.brandId}
                  onChange={(e) => handleInputChange('brandId', e.target.value)}
                  className="glass-input"
                  required
                >
                  <option value="">Sélectionner une marque</option>
                  {brands.map(brand => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name} ({brand.sector})
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-white/80 mb-2">
              Description de la campagne *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="glass-input"
              placeholder="Décrivez les objectifs et le contexte de votre campagne..."
              required
            />
          </div>
        </div>

        {/* Produits (optionnel) */}
        {formData.brandId && (
          <div className="glass-panel p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/20 pb-2">🛍️ Produits à promouvoir (optionnel)</h3>
            
            {loadingProducts ? (
              <div className="text-white/60">Chargement des produits...</div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                  <div
                    key={product._id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.selectedProducts.includes(product._id)
                        ? 'border-[#53dfb2] bg-[#53dfb2]/10'
                        : 'border-white/20 hover:border-white/30 bg-white/5'
                    }`}
                    onClick={() => handleProductToggle(product._id)}
                  >
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={formData.selectedProducts.includes(product._id)}
                        onChange={() => handleProductToggle(product._id)}
                        className="form-checkbox mr-2"
                      />
                      <h4 className="font-medium text-white">{product.name}</h4>
                    </div>
                    <p className="text-sm text-white/60">{product.category}</p>
                    <p className="text-xs text-white/50 mt-1">{product.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/60">Aucun produit disponible pour cette marque.</p>
            )}
          </div>
        )}

        {/* Type et objectif */}
        <div className="glass-panel p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/20 pb-2">🎯 Stratégie de campagne</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Type de campagne *
              </label>
              <select
                value={formData.campaignType}
                onChange={(e) => handleInputChange('campaignType', e.target.value)}
                className="glass-input"
                required
              >
                <option value="">Sélectionner un type</option>
                {CAMPAIGN_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {selectedCampaignType && (
                <p className="text-sm text-white/60 mt-1">{selectedCampaignType.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Objectif principal *
              </label>
              <select
                value={formData.primaryObjective}
                onChange={(e) => handleInputChange('primaryObjective', e.target.value)}
                className="glass-input"
                required
              >
                <option value="">Sélectionner un objectif</option>
                {PRIMARY_OBJECTIVES.map(obj => (
                  <option key={obj.value} value={obj.value}>
                    {obj.label}
                  </option>
                ))}
              </select>
              {selectedObjective && (
                <p className="text-sm text-white/60 mt-1">{selectedObjective.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Période et budget */}
        <div className="glass-panel p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/20 pb-2">📅 Période et budget</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Date de début *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="glass-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Date de fin *
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="glass-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Budget total (€)
              </label>
              <input
                type="number"
                value={formData.budget?.total || ''}
                onChange={(e) => handleBudgetChange('total', parseInt(e.target.value) || 0)}
                className="glass-input"
                placeholder="10000"
                min="0"
              />
            </div>
          </div>

          {formData.budget && formData.budget.total > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-white/80 mb-4">Répartition du budget (%)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-white/60 mb-2">Contenu organique</label>
                  <input
                    type="number"
                    value={formData.budget.allocation.organic}
                    onChange={(e) => handleBudgetAllocationChange('organic', parseInt(e.target.value) || 0)}
                    className="glass-input text-sm py-2"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-2">Publicités</label>
                  <input
                    type="number"
                    value={formData.budget.allocation.ads}
                    onChange={(e) => handleBudgetAllocationChange('ads', parseInt(e.target.value) || 0)}
                    className="glass-input text-sm py-2"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-2">Influenceurs</label>
                  <input
                    type="number"
                    value={formData.budget.allocation.influencers}
                    onChange={(e) => handleBudgetAllocationChange('influencers', parseInt(e.target.value) || 0)}
                    className="glass-input text-sm py-2"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Audience cible */}
        <div className="glass-panel p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/20 pb-2">👥 Audience cible (optionnel)</h3>
          <p className="text-sm text-white/60 mb-6">
            Séparez les éléments par des virgules. Ces informations aideront GPT-5 à personnaliser la stratégie.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Audience principale
              </label>
              <input
                type="text"
                value={audienceInputs.primary}
                onChange={(e) => handleAudienceInputChange('primary', e.target.value)}
                className="glass-input"
                placeholder="Ex: Femmes 25-35 ans, urbaines"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Audience secondaire
              </label>
              <input
                type="text"
                value={audienceInputs.secondary}
                onChange={(e) => handleAudienceInputChange('secondary', e.target.value)}
                className="glass-input"
                placeholder="Ex: Hommes 30-40 ans, professionnels"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Démographie
              </label>
              <input
                type="text"
                value={audienceInputs.demographics}
                onChange={(e) => handleAudienceInputChange('demographics', e.target.value)}
                className="glass-input"
                placeholder="Ex: CSP+, diplômés, parents"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Centres d'intérêt
              </label>
              <input
                type="text"
                value={audienceInputs.interests}
                onChange={(e) => handleAudienceInputChange('interests', e.target.value)}
                className="glass-input"
                placeholder="Ex: lifestyle, beauté, sport, voyage"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Comportements
              </label>
              <input
                type="text"
                value={audienceInputs.behaviors}
                onChange={(e) => handleAudienceInputChange('behaviors', e.target.value)}
                className="glass-input"
                placeholder="Ex: acheteurs en ligne, early adopters, influencés par les réseaux sociaux"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="glass-button bg-white/10 hover:bg-white/20 px-6 py-3"
            disabled={isLoading}
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="glass-button px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Génération en cours...
              </>
            ) : (
              '🚀 Générer la campagne avec GPT-5'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;
