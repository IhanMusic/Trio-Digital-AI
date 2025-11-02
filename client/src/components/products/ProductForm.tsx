import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { config } from '../../config/env';
import { TARGET_AUDIENCES } from '../../constants/formOptions';

// Types pour le formulaire
interface ProductFormData {
  name: string;
  description: string;
  category: string;
  flavors: string[];
  scents: string[];
  variants: string[];
  uniqueSellingPoints: string[];
  customerBenefits: string[];
  technicalSheet: {
    ingredients: string[];
    nutritionalInfo: string;
    usage: string;
    storage: string;
    highlights: string;
  };
  logo?: File | null;
  logoUrl?: string;
  mainImage?: File | null;
  mainImageUrl?: string;
  galleryImages: File[];
  galleryImageUrls: string[];
  targetAudience: {
    demographic: string[];
    professional: string[];
    behavioral: string[];
    geographic: string[];
  };
}

// Catégories de produits
const PRODUCT_CATEGORIES = [
  'Alimentaire',
  'Boisson',
  'Cosmétique',
  'Hygiène',
  'Entretien',
  'Textile',
  'Électronique',
  'Mobilier',
  'Décoration',
  'Autre'
];

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { brandId, productId } = useParams<{ brandId: string; productId: string }>();
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(!!productId);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [isEditMode] = useState(!!productId);
  
  // État pour les champs dynamiques
  const [newFlavor, setNewFlavor] = useState('');
  const [newScent, setNewScent] = useState('');
  const [newVariant, setNewVariant] = useState('');
  const [newUSP, setNewUSP] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  
  // État principal du formulaire
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: '',
    flavors: [],
    scents: [],
    variants: [],
    uniqueSellingPoints: [],
    customerBenefits: [],
    technicalSheet: {
      ingredients: [],
      nutritionalInfo: '',
      usage: '',
      storage: '',
      highlights: ''
    },
    logo: null,
    logoUrl: '',
    mainImage: null,
    mainImageUrl: '',
    galleryImages: [],
    galleryImageUrls: [],
    targetAudience: {
      demographic: [],
      professional: [],
      behavioral: [],
      geographic: []
    }
  });
  
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
          
          // Convertir les données du produit au format du formulaire
          setFormData({
            name: product.name || '',
            description: product.description || '',
            category: product.category || '',
            flavors: product.flavors || [],
            scents: product.scents || [],
            variants: product.variants || [],
            uniqueSellingPoints: product.uniqueSellingPoints || [],
            customerBenefits: product.customerBenefits || [],
            technicalSheet: {
              ingredients: product.technicalSheet?.ingredients || [],
              nutritionalInfo: product.technicalSheet?.nutritionalInfo || '',
              usage: product.technicalSheet?.usage || '',
              storage: product.technicalSheet?.storage || '',
              highlights: product.technicalSheet?.highlights || ''
            },
            logoUrl: product.logo || '',
            mainImageUrl: product.images?.main || '',
            galleryImageUrls: product.images?.gallery || [],
            logo: null,
            mainImage: null,
            galleryImages: [],
            targetAudience: {
              demographic: product.targetAudience?.demographic || [],
              professional: product.targetAudience?.professional || [],
              behavioral: product.targetAudience?.behavioral || [],
              geographic: product.targetAudience?.geographic || []
            }
          });
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Une erreur est survenue');
        } finally {
          setLoading(false);
        }
      };
      
      fetchProductDetails();
    }
  }, [productId, token]);
  
  // Gestionnaires pour les champs simples
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Gestion des champs imbriqués
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof ProductFormData] as any),
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
  
  // Gestionnaire pour les fichiers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'mainImage' | 'galleryImages') => {
    const files = e.target.files;
    if (!files) return;
    
    if (field === 'galleryImages') {
      // Pour les champs qui acceptent plusieurs fichiers
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], ...Array.from(files)]
      }));
    } else {
      // Pour les champs qui acceptent un seul fichier
      setFormData(prev => ({
        ...prev,
        [field]: files[0]
      }));
      
      // Créer une URL pour prévisualiser l'image
      if (field === 'logo') {
        setFormData(prev => ({
          ...prev,
          logoUrl: URL.createObjectURL(files[0])
        }));
      } else if (field === 'mainImage') {
        setFormData(prev => ({
          ...prev,
          mainImageUrl: URL.createObjectURL(files[0])
        }));
      }
    }
  };
  
  // Gestionnaires pour les tableaux
  const handleAddItem = (field: 'flavors' | 'scents' | 'variants' | 'uniqueSellingPoints' | 'customerBenefits' | 'technicalSheet.ingredients', value: string) => {
    if (!value.trim()) return;
    
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof ProductFormData] as any),
          [child]: [...(prev[parent as keyof ProductFormData] as any)[child], value]
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field as keyof ProductFormData] as string[]), value]
      }));
    }
    
    // Réinitialiser le champ d'entrée
    if (field === 'flavors') setNewFlavor('');
    else if (field === 'scents') setNewScent('');
    else if (field === 'variants') setNewVariant('');
    else if (field === 'uniqueSellingPoints') setNewUSP('');
    else if (field === 'customerBenefits') setNewBenefit('');
    else if (field === 'technicalSheet.ingredients') setNewIngredient('');
  };
  
  const handleRemoveItem = (field: 'flavors' | 'scents' | 'variants' | 'uniqueSellingPoints' | 'customerBenefits' | 'technicalSheet.ingredients', index: number) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof ProductFormData] as any),
          [child]: (prev[parent as keyof ProductFormData] as any)[child].filter((_: any, i: number) => i !== index)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: (prev[field as keyof ProductFormData] as string[]).filter((_, i) => i !== index)
      }));
    }
  };

  // Gestionnaire pour le public cible
  const handleTargetAudienceChange = (category: keyof ProductFormData['targetAudience'], value: string) => {
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
  
  // Gestionnaire pour la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.category) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    try {
      setSaving(true);
      
      // Créer un FormData pour envoyer les fichiers
      const formDataToSend = new FormData();
      
      // Ajouter les champs simples
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('brandId', brandId || '');
      
      // Ajouter les tableaux
      formData.flavors.forEach((flavor, index) => {
        formDataToSend.append(`flavors[${index}]`, flavor);
      });
      
      formData.scents.forEach((scent, index) => {
        formDataToSend.append(`scents[${index}]`, scent);
      });
      
      formData.variants.forEach((variant, index) => {
        formDataToSend.append(`variants[${index}]`, variant);
      });
      
      formData.uniqueSellingPoints.forEach((usp, index) => {
        formDataToSend.append(`uniqueSellingPoints[${index}]`, usp);
      });
      
      formData.customerBenefits.forEach((benefit, index) => {
        formDataToSend.append(`customerBenefits[${index}]`, benefit);
      });
      
      // Ajouter la fiche technique
      formData.technicalSheet.ingredients.forEach((ingredient, index) => {
        formDataToSend.append(`technicalSheet[ingredients][${index}]`, ingredient);
      });
      
      formDataToSend.append('technicalSheet[nutritionalInfo]', formData.technicalSheet.nutritionalInfo);
      formDataToSend.append('technicalSheet[usage]', formData.technicalSheet.usage);
      formDataToSend.append('technicalSheet[storage]', formData.technicalSheet.storage);
      formDataToSend.append('technicalSheet[highlights]', formData.technicalSheet.highlights);
      
      // Ajouter le public cible
      formData.targetAudience.demographic.forEach((item, index) => {
        formDataToSend.append(`targetAudience[demographic][${index}]`, item);
      });
      
      formData.targetAudience.professional.forEach((item, index) => {
        formDataToSend.append(`targetAudience[professional][${index}]`, item);
      });
      
      formData.targetAudience.behavioral.forEach((item, index) => {
        formDataToSend.append(`targetAudience[behavioral][${index}]`, item);
      });
      
      formData.targetAudience.geographic.forEach((item, index) => {
        formDataToSend.append(`targetAudience[geographic][${index}]`, item);
      });
      
      // Ajouter les fichiers
      if (formData.logo) {
        formDataToSend.append('logo', formData.logo);
      }
      
      if (formData.mainImage) {
        formDataToSend.append('mainImage', formData.mainImage);
      }
      
      formData.galleryImages.forEach((image, index) => {
        formDataToSend.append(`galleryImages[${index}]`, image);
      });
      
      // Déterminer l'URL et la méthode
      const url = isEditMode
        ? `${config.apiUrl}/products/${productId}`
        : `${config.apiUrl}/products`;
      
      const method = isEditMode ? 'PUT' : 'POST';
      
      // Envoyer la requête
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });
      
      if (!response.ok) {
        throw new Error(`Erreur lors de la ${isEditMode ? 'mise à jour' : 'création'} du produit`);
      }
      
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || `Erreur lors de la ${isEditMode ? 'mise à jour' : 'création'} du produit`);
      }
      
      // Rediriger vers la page de détail de la marque
      navigate(`/brands/${brandId}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setSaving(false);
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
              <select
                id="category"
                name="category"
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#53dfb2] focus:border-transparent"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Sélectionnez une catégorie</option>
                {PRODUCT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
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
        
        {/* Public cible */}
        <section className="glass-panel p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/20 pb-2">
            Public Cible
          </h2>
          
          {Object.entries(TARGET_AUDIENCES).map(([category, options]) => (
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
                      checked={formData.targetAudience[category as keyof ProductFormData['targetAudience']].includes(option)}
                      onChange={() => handleTargetAudienceChange(category as keyof ProductFormData['targetAudience'], option)}
                    />
                    <span className="text-white">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
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
