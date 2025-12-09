import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { config } from '../../config/env';
import { ProductData } from '../../types/brief';
import { PRODUCT_CATEGORIES_BY_SECTOR, getCategoriesBySector } from '../../constants/formOptions';

// Target audience pour les produits
const TARGET_AUDIENCE_OPTIONS = {
  demographic: [
    '0-2 ans',
    '3-12 ans',
    '13-17 ans',
    '18-24 ans',
    '25-34 ans',
    '35-44 ans',
    '45-54 ans',
    '55+ ans',
    'Hommes',
    'Femmes',
    'Familles'
  ],
  lifestyle: [
    'Sportifs',
    'Étudiants',
    'Professionnels actifs',
    'Parents',
    'Retraités',
    'Voyageurs',
    'Créatifs',
    'Eco-conscients'
  ],
  psychographic: [
    'Soucieux de leur santé',
    'Recherchent la qualité',
    'Sensibles au prix',
    'Innovateurs',
    'Traditionalistes',
    'Aventuriers',
    'Pragmatiques'
  ],
  geographic: [
    'Urbain',
    'Périurbain',
    'Rural',
    'National',
    'International'
  ]
};

// Occasions d'usage courantes
const COMMON_USAGE_OCCASIONS = [
  'Petit-déjeuner',
  'Déjeuner',
  'Dîner',
  'Collation',
  'Avant sport',
  'Après sport',
  'Au travail',
  'À la maison',
  'En déplacement',
  'Moment détente',
  'Soin du matin',
  'Soin du soir',
  'Occasion spéciale',
  'Quotidien'
];

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { brandId, productId } = useParams<{ brandId: string; productId: string }>();
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(!!productId);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [isEditMode] = useState(!!productId);
  
  // États pour la liaison intelligente avec la marque
  const [brandSector, setBrandSector] = useState<string>('');
  const [showAllCategories, setShowAllCategories] = useState(false);
  
  // États pour les champs dynamiques
  const [newFlavor, setNewFlavor] = useState('');
  const [newScent, setNewScent] = useState('');
  const [newUSP, setNewUSP] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  
  const [formData, setFormData] = useState<ProductData>({
    name: '',
    description: '',
    category: '',
    brandId: brandId || '',
    mainImage: null,
    mainImageUrl: '',
    galleryImages: [],
    galleryImageUrls: [],
    flavors: [],
    scents: [],
    uniqueSellingPoints: [],
    customerBenefits: [],
    targetAudience: {
      demographic: [],
      lifestyle: [],
      psychographic: [],
      geographic: []
    },
    usageOccasions: [],
    keywords: [],
    technicalSheet: {
      ingredients: [],
      nutritionalInfo: '',
      usage: '',
      storage: '',
      highlights: ''
    },
    certifications: [],
    labels: []
  });
  
  // Récupérer le secteur de la marque pour filtrer les catégories
  useEffect(() => {
    if (brandId && token) {
      const fetchBrandSector = async () => {
        try {
          const response = await fetch(`${config.apiUrl}/brands/${brandId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data.sector) {
              setBrandSector(result.data.sector);
            }
          }
        } catch (error) {
          console.error('Erreur lors de la récupération du secteur de la marque:', error);
        }
      };
      
      fetchBrandSector();
    }
  }, [brandId, token]);

  // Charger les données du produit si on est en mode édition
  useEffect(() => {
    if (productId && token) {
      const fetchProductDetails = async () => {
        try {
          setLoading(true);
          const response = await fetch(`${config.apiUrl}/products/${productId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des détails du produit');
          }
          
          const result = await response.json();
          if (!result.success) {
            throw new Error(result.message || 'Erreur lors de la récupération des détails du produit');
          }
          
          const product = result.data;
          
          setFormData({
            name: product.name || '',
            description: product.description || '',
            category: product.category || '',
            brandId: product.brandId || brandId || '',
            mainImage: null,
            mainImageUrl: product.images?.main || '',
            galleryImages: [],
            galleryImageUrls: product.images?.gallery || [],
            flavors: product.flavors || [],
            scents: product.scents || [],
            uniqueSellingPoints: product.uniqueSellingPoints || [],
            customerBenefits: product.customerBenefits || [],
            targetAudience: product.targetAudience || {
              demographic: [],
              lifestyle: [],
              psychographic: [],
              geographic: []
            },
            usageOccasions: product.usageOccasions || [],
            keywords: product.keywords || [],
            technicalSheet: {
              ingredients: product.technicalSheet?.ingredients || [],
              nutritionalInfo: product.technicalSheet?.nutritionalInfo || '',
              usage: product.technicalSheet?.usage || '',
              storage: product.technicalSheet?.storage || '',
              highlights: product.technicalSheet?.highlights || ''
            },
            certifications: product.certifications || [],
            labels: product.labels || []
          });
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Une erreur est survenue');
        } finally {
          setLoading(false);
        }
      };
      
      fetchProductDetails();
    }
  }, [productId, token, brandId]);

  // Fonction pour obtenir les catégories filtrées selon le secteur de la marque
  const getFilteredCategories = () => {
    if (showAllCategories) {
      return Object.values(PRODUCT_CATEGORIES_BY_SECTOR).flat();
    }
    
    // Si pas de secteur chargé, retourner tableau vide pour éviter le mélange
    if (!brandSector) {
      return [];
    }
    
    return getCategoriesBySector(brandSector);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof ProductData] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'mainImage' | 'galleryImages') => {
    const files = e.target.files;
    if (!files) return;
    
    if (field === 'galleryImages') {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], ...Array.from(files)]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: files[0],
        mainImageUrl: URL.createObjectURL(files[0])
      }));
    }
  };
  
  const handleAddItem = (field: keyof Pick<ProductData, 'flavors' | 'scents' | 'uniqueSellingPoints' | 'customerBenefits' | 'usageOccasions' | 'keywords' | 'certifications' | 'labels'>, value: string) => {
    if (!value.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), value]
    }));
    
    // Réinitialiser le champ d'entrée
    if (field === 'flavors') setNewFlavor('');
    else if (field === 'scents') setNewScent('');
    else if (field === 'uniqueSellingPoints') setNewUSP('');
    else if (field === 'customerBenefits') setNewBenefit('');
    else if (field === 'certifications') setNewCertification('');
    else if (field === 'labels') setNewLabel('');
    else if (field === 'keywords') setNewKeyword('');
  };
  
  const handleAddIngredient = () => {
    if (!newIngredient.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      technicalSheet: {
        ...prev.technicalSheet,
        ingredients: [...prev.technicalSheet.ingredients, newIngredient]
      }
    }));
    setNewIngredient('');
  };
  
  const handleRemoveItem = (field: keyof Pick<ProductData, 'flavors' | 'scents' | 'uniqueSellingPoints' | 'customerBenefits' | 'usageOccasions' | 'keywords' | 'certifications' | 'labels'>, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };
  
  const handleRemoveIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technicalSheet: {
        ...prev.technicalSheet,
        ingredients: prev.technicalSheet.ingredients.filter((_, i) => i !== index)
      }
    }));
  };

  const handleTargetAudienceChange = (category: keyof ProductData['targetAudience'], value: string) => {
    setFormData(prev => {
      const currentValues = prev.targetAudience[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      return {
        ...prev,
        targetAudience: {
          ...prev.targetAudience,
          [category]: newValues
        }
      };
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.category) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    try {
      setSaving(true);
      
      // Préparer les données du produit en JSON (comme BriefForm)
      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        brandId: formData.brandId,
        flavors: formData.flavors,
        scents: formData.scents,
        uniqueSellingPoints: formData.uniqueSellingPoints,
        customerBenefits: formData.customerBenefits,
        targetAudience: formData.targetAudience,
        usageOccasions: formData.usageOccasions,
        keywords: formData.keywords,
        technicalSheet: {
          ingredients: formData.technicalSheet.ingredients,
          nutritionalInfo: formData.technicalSheet.nutritionalInfo || '',
          usage: formData.technicalSheet.usage || '',
          storage: formData.technicalSheet.storage || '',
          highlights: formData.technicalSheet.highlights || ''
        },
        certifications: formData.certifications,
        labels: formData.labels,
        // Conserver les URLs d'images existantes en mode édition
        images: {
          main: formData.mainImageUrl || '',
          gallery: formData.galleryImageUrls || []
        }
      };
      
      const url = isEditMode
        ? `${config.apiUrl}/products/${productId}`
        : `${config.apiUrl}/products`;
      
      const method = isEditMode ? 'PUT' : 'POST';
      
      // Envoyer les données en JSON (comme BriefForm)
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
      
      if (!response.ok) {
        throw new Error(`Erreur lors de la ${isEditMode ? 'mise à jour' : 'création'} du produit`);
      }
      
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || `Erreur lors de la ${isEditMode ? 'mise à jour' : 'création'} du produit`);
      }
      
      // Si on a de nouvelles images à uploader, les uploader après
      const createdProductId = result.data._id;
      if (formData.mainImage || formData.galleryImages.length > 0) {
        await uploadProductImages(createdProductId);
      }
      
      navigate(`/brands/${brandId}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setSaving(false);
    }
  };
  
  // Fonction pour uploader les images séparément
  const uploadProductImages = async (productId: string) => {
    try {
      const formDataToSend = new FormData();
      
      if (formData.mainImage) {
        formDataToSend.append('mainImage', formData.mainImage);
      }
      
      formData.galleryImages.forEach((image) => {
        formDataToSend.append('galleryImages', image);
      });
      
      const response = await fetch(`${config.apiUrl}/products/${productId}/images`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'upload des images');
      }
      
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || 'Erreur lors de l\'upload des images');
      }
      
      console.log('Images uploadées avec succès:', result.data);
    } catch (error) {
      console.error('Erreur lors de l\'upload des images:', error);
      // Remonter l'erreur pour l'afficher à l'utilisateur
      throw error;
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#53dfb2]"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#53dfb2] bg-clip-text text-transparent">
          {isEditMode ? 'Modifier le produit' : 'Nouveau produit'}
        </h1>
        <button
          onClick={() => navigate(`/brands/${brandId}`)}
          className="glass-button inline-flex items-center"
        >
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Retour
        </button>
      </div>
      
      {error && (
        <div className="glass-panel border-red-500/30 px-6 py-4 rounded-xl mb-6">
          <p className="text-red-400">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations de base */}
        <section className="glass-panel p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/20 pb-2">
            Informations de base
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                Nom du produit *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#53dfb2] focus:border-transparent"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-white/80 mb-2">
                Catégorie *
              </label>
              
              {/* Affichage du contexte de la marque */}
              {brandSector && (
                <div className="mb-4 p-3 bg-[#53dfb2]/10 border border-[#53dfb2]/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#53dfb2] font-medium">
                        Secteur de la marque : {brandSector}
                      </p>
                      <p className="text-xs text-[#53dfb2]/70">
                        {getFilteredCategories().length} catégories pertinentes
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="showAllCategories"
                        checked={showAllCategories}
                        onChange={(e) => setShowAllCategories(e.target.checked)}
                        className="form-checkbox h-4 w-4 text-[#53dfb2]"
                      />
                      <label htmlFor="showAllCategories" className="text-xs text-white/70">
                        Voir toutes les catégories
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              <select
                id="category"
                name="category"
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#53dfb2] focus:border-transparent"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Sélectionnez une catégorie</option>
                {getFilteredCategories().map((category: string) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              
              {brandSector && !showAllCategories && (
                <p className="text-xs text-white/50 mt-2">
                  Catégories filtrées pour le secteur "{brandSector}". 
                  Cochez "Voir toutes les catégories" pour plus d'options.
                </p>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#53dfb2] focus:border-transparent"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </section>
        
        {/* Target Audience SPÉCIFIQUE au produit */}
        <section className="glass-panel p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/20 pb-2">
            Public Cible du Produit
          </h2>
          
          <div className="flex items-start space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
            <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-blue-300">
              Définissez la cible spécifique de ce produit. Une marque peut avoir plusieurs produits avec des audiences différentes.
            </p>
          </div>
          
          {Object.entries(TARGET_AUDIENCE_OPTIONS).map(([category, options]) => (
            <div key={category} className="mb-6">
              <label className="block text-sm font-medium text-white/80 mb-4">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {options.map((option) => (
                  <label key={option} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-pink-500"
                      checked={formData.targetAudience[category as keyof ProductData['targetAudience']].includes(option)}
                      onChange={() => handleTargetAudienceChange(category as keyof ProductData['targetAudience'], option)}
                    />
                    <span className="text-white">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Occasions d'usage */}
        <section className="glass-panel p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/20 pb-2">
            Occasions d'Usage
          </h2>
          
          <p className="text-sm text-white/60 mb-4">
            Sélectionnez les moments ou situations où ce produit est utilisé
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {COMMON_USAGE_OCCASIONS.map((occasion) => (
              <label key={occasion} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-[#53dfb2]"
                  checked={formData.usageOccasions.includes(occasion)}
                  onChange={() => {
                    if (formData.usageOccasions.includes(occasion)) {
                      setFormData(prev => ({
                        ...prev,
                        usageOccasions: prev.usageOccasions.filter(o => o !== occasion)
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        usageOccasions: [...prev.usageOccasions, occasion]
                      }));
                    }
                  }}
                />
                <span className="text-white text-sm">{occasion}</span>
              </label>
            ))}
          </div>
        </section>
        
        {/* Proposition de valeur */}
        <section className="glass-panel p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/20 pb-2">
            Proposition de Valeur
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* USPs */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Points Forts (USPs)
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#53dfb2] focus:border-transparent"
                  value={newUSP}
                  onChange={(e) => setNewUSP(e.target.value)}
                  placeholder="Ex: 100% naturel"
                />
                <button
                  type="button"
                  className="glass-button px-3 py-2"
                  onClick={() => handleAddItem('uniqueSellingPoints', newUSP)}
                >
                  +
                </button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {formData.uniqueSellingPoints.map((usp, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/10 px-3 py-2 rounded-lg">
                    <span className="text-white/80">{usp}</span>
                    <button
                      type="button"
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleRemoveItem('uniqueSellingPoints', index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Bénéfices clients */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Bénéfices Clients
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#53dfb2] focus:border-transparent"
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  placeholder="Ex: Améliore l'énergie"
                />
                <button
                  type="button"
                  className="glass-button px-3 py-2"
                  onClick={() => handleAddItem('customerBenefits', newBenefit)}
                >
                  +
                </button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {formData.customerBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/10 px-3 py-2 rounded-lg">
                    <span className="text-white/80">{benefit}</span>
                    <button
                      type="button"
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleRemoveItem('customerBenefits', index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SEO & Keywords */}
        <section className="glass-panel p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/20 pb-2">
            SEO & Mots-clés
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Mots-clés principaux (3-5 recommandés)
            </label>
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#53dfb2] focus:border-transparent"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Ex: bio, sans gluten, protéines"
              />
              <button
                type="button"
                className="glass-button px-3 py-2"
                onClick={() => handleAddItem('keywords', newKeyword)}
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.keywords.map((keyword, index) => (
                <span key={index} className="inline-flex items-center bg-[#53dfb2]/20 text-[#53dfb2] px-3 py-1 rounded-full text-sm">
                  {keyword}
                  <button
                    type="button"
                    className="ml-2 hover:text-red-400"
                    onClick={() => handleRemoveItem('keywords', index)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        </section>
        
        {/* Caractéristiques */}
        <section className="glass-panel p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/20 pb-2">
            Caractéristiques
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Arômes */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Arômes
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#53dfb2] focus:border-transparent"
                  value={newFlavor}
                  onChange={(e) => setNewFlavor(e.target.value)}
                  placeholder="Nouvel arôme"
                />
                <button
                  type="button"
                  className="glass-button px-3 py-2"
                  onClick={() => handleAddItem('flavors', newFlavor)}
                >
                  +
                </button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {formData.flavors.map((flavor, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/10 px-3 py-2 rounded-lg">
                    <span className="text-white/80">{flavor}</span>
                    <button
                      type="button"
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleRemoveItem('flavors', index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Parfums */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Parfums
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#53dfb2] focus:border-transparent"
                  value={newScent}
                  onChange={(e) => setNewScent(e.target.value)}
                  placeholder="Nouveau parfum"
                />
                <button
                  type="button"
                  className="glass-button px-3 py-2"
                  onClick={() => handleAddItem('scents', newScent)}
                >
                  +
                </button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {formData.scents.map((scent, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/10 px-3 py-2 rounded-lg">
                    <span className="text-white/80">{scent}</span>
                    <button
                      type="button"
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleRemoveItem('scents', index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Certifications & Labels */}
        <section className="glass-panel p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/20 pb-2">
            Certifications & Labels
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Certifications (Bio, ISO, etc.)
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#53dfb2] focus:border-transparent"
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  placeholder="Ex: Agriculture Biologique"
                />
                <button
                  type="button"
                  className="glass-button px-3 py-2"
                  onClick={() => handleAddItem('certifications', newCertification)}
                >
                  +
                </button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/10 px-3 py-2 rounded-lg">
                    <span className="text-white/80">{cert}</span>
                    <button
                      type="button"
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleRemoveItem('certifications', index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Labels (Vegan, Made in France, etc.)
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#53dfb2] focus:border-transparent"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="Ex: Vegan, Cruelty-Free"
                />
                <button
                  type="button"
                  className="glass-button px-3 py-2"
                  onClick={() => handleAddItem('labels', newLabel)}
                >
                  +
                </button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {formData.labels.map((label, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/10 px-3 py-2 rounded-lg">
                    <span className="text-white/80">{label}</span>
                    <button
                      type="button"
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleRemoveItem('labels', index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Images */}
        <section className="glass-panel p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/20 pb-2">
            Images
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Image principale
              </label>
              <div className="flex items-center space-x-4">
                {formData.mainImageUrl && (
                  <div className="w-24 h-24 bg-white/10 rounded-lg overflow-hidden">
                    <img
                      src={formData.mainImageUrl}
                      alt="Image principale"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <label className="flex-1 flex items-center justify-center px-4 py-2 bg-white/10 border border-white/20 rounded-lg cursor-pointer hover:bg-white/20 transition-colors">
                  <svg
                    className="mr-2 h-5 w-5 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="text-sm text-white/80">Choisir un fichier</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'mainImage')}
                  />
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Galerie d'images
              </label>
              <label className="flex items-center justify-center px-4 py-2 bg-white/10 border border-white/20 rounded-lg cursor-pointer hover:bg-white/20 transition-colors">
                <svg
                  className="mr-2 h-5 w-5 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="text-sm text-white/80">Ajouter des images</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange(e, 'galleryImages')}
                />
              </label>
              <div className="mt-2">
                <p className="text-sm text-white/60">
                  {formData.galleryImages.length + formData.galleryImageUrls.length} images sélectionnées
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="glass-button bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-6 py-3"
          >
            {saving ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enregistrement...
              </span>
            ) : (
              <span>{isEditMode ? 'Mettre à jour' : 'Créer le produit'}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
