import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { config } from '../../config/env';
import { BriefData } from '../../types/brief';
import { SECTORS } from '../../constants/formOptions';

// Options pour le positionnement stratégique
const BUSINESS_TYPES = [
  'B2B (Business to Business)',
  'B2C (Business to Consumer)',
  'B2B2C (Hybrid)',
  'SaaS (Software as a Service)',
  'E-commerce',
  'Marketplace',
  'Entreprise de Services',
  'Industrie/Manufacturing'
];

const COMPANY_STAGES = [
  'Startup (0-2 ans)',
  'Scale-up (2-5 ans)',
  'PME (5-20 ans)',
  'ETI (Entreprise de Taille Intermédiaire)',
  'Grande Entreprise',
  'Multinationale'
];

const PRICE_POSITIONING = [
  'Budget / Entry-Level',
  'Milieu de gamme',
  'Premium',
  'Luxury / Haut de gamme'
];

export const BriefForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { token, isAuthenticated } = useAuthContext();
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState('');
  const [isEditMode] = useState(!!id);
  
  const [formData, setFormData] = useState<BriefData>({
    companyName: '',
    email: '',
    sector: '',
    companyDescription: '',
    logo: null,
    colors: {
      primary: '#000000',
      secondary: '#FFFFFF',
      accent: '#FF0000'
    },
    businessType: '',
    companyStage: '',
    pricePositioning: '',
    competitors: '',
    values: [],
    mission: ''
  });

  // Charger les données de la marque si on est en mode édition
  useEffect(() => {
    if (id && isAuthenticated && token) {
      const fetchBrandDetails = async () => {
        try {
          setLoading(true);
          const response = await fetch(`${config.apiUrl}/brands/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des détails de la marque');
          }

          const { data: brand } = await response.json();
          
          setFormData({
            companyName: brand.name || '',
            email: 'marketing@example.com', // Email non stocké dans Brand
            sector: brand.sector || '',
            companyDescription: brand.description || '',
            logo: null,
            colors: brand.colors || { primary: '#000000', secondary: '#FFFFFF', accent: '#FF0000' },
            businessType: brand.businessType || '',
            companyStage: brand.companyStage || '',
            pricePositioning: brand.pricePositioning || '',
            competitors: brand.competitors?.join(', ') || '',
            competitiveAnalysis: brand.competitiveAnalysis,
            previousCampaigns: brand.previousCampaigns,
            legalConstraints: brand.legalConstraints,
            values: brand.values || [],
            mission: brand.mission || ''
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
    
    if (!formData.companyName || !formData.sector) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      const brandData = {
        name: formData.companyName,
        sector: formData.sector,
        description: formData.companyDescription,
        colors: formData.colors,
        businessType: formData.businessType,
        companyStage: formData.companyStage,
        pricePositioning: formData.pricePositioning,
        competitors: formData.competitors.split(',').map(c => c.trim()).filter(Boolean),
        competitiveAnalysis: formData.competitiveAnalysis,
        previousCampaigns: formData.previousCampaigns,
        legalConstraints: formData.legalConstraints,
        values: formData.values,
        mission: formData.mission,
        lastGenerationDate: new Date(),
        contentGenerated: 0,
        team: []
      };

      if (!isAuthenticated || !token) {
        throw new Error('Vous devez être connecté pour effectuer cette action');
      }

      const url = isEditMode 
        ? `${config.apiUrl}/brands/${id}` 
        : `${config.apiUrl}/brands`;
      
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
                Nom de l'entreprise *
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
              <label htmlFor="sector" className="block text-sm font-medium text-white mb-2">
                Secteur d'activité *
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
          </div>

          <div>
            <label htmlFor="companyDescription" className="block text-sm font-medium text-white mb-2">
              Description de l'entreprise *
            </label>
            <textarea
              id="companyDescription"
              rows={4}
              required
              className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white/20"
              value={formData.companyDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, companyDescription: e.target.value }))}
              placeholder="Décrivez votre entreprise en quelques phrases..."
            />
          </div>
        </section>

        {/* Identité Visuelle */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-4">Identité Visuelle</h3>
          
          <p className="text-sm text-white/60 mb-4">
            Définissez les couleurs principales de votre marque. Ces couleurs seront utilisées dans toutes les créations visuelles générées.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="colorPrimary" className="block text-sm font-medium text-white mb-2">
                Couleur Principale *
              </label>
              <div className="space-y-2">
                <input
                  type="color"
                  id="colorPrimary"
                  className="w-full h-12 rounded-lg cursor-pointer border-2 border-white/20"
                  value={formData.colors?.primary || '#000000'}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    colors: { ...prev.colors, primary: e.target.value }
                  }))}
                />
                <input
                  type="text"
                  placeholder="#000000"
                  className="w-full px-4 py-2 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.colors?.primary || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    colors: { ...prev.colors, primary: e.target.value }
                  }))}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="colorSecondary" className="block text-sm font-medium text-white mb-2">
                Couleur Secondaire
              </label>
              <div className="space-y-2">
                <input
                  type="color"
                  id="colorSecondary"
                  className="w-full h-12 rounded-lg cursor-pointer border-2 border-white/20"
                  value={formData.colors?.secondary || '#FFFFFF'}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    colors: { ...prev.colors, secondary: e.target.value }
                  }))}
                />
                <input
                  type="text"
                  placeholder="#FFFFFF"
                  className="w-full px-4 py-2 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.colors?.secondary || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    colors: { ...prev.colors, secondary: e.target.value }
                  }))}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="colorAccent" className="block text-sm font-medium text-white mb-2">
                Couleur d'Accent
              </label>
              <div className="space-y-2">
                <input
                  type="color"
                  id="colorAccent"
                  className="w-full h-12 rounded-lg cursor-pointer border-2 border-white/20"
                  value={formData.colors?.accent || '#FF0000'}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    colors: { ...prev.colors, accent: e.target.value }
                  }))}
                />
                <input
                  type="text"
                  placeholder="#FF0000"
                  className="w-full px-4 py-2 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.colors?.accent || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    colors: { ...prev.colors, accent: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Positionnement Stratégique */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-4">Positionnement Stratégique</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-white mb-2">
                Type d'Entreprise
              </label>
              <select
                id="businessType"
                className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white/20"
                value={formData.businessType || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
              >
                <option value="">Sélectionner</option>
                {BUSINESS_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="companyStage" className="block text-sm font-medium text-white mb-2">
                Stage de l'Entreprise
              </label>
              <select
                id="companyStage"
                className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white/20"
                value={formData.companyStage || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, companyStage: e.target.value }))}
              >
                <option value="">Sélectionner</option>
                {COMPANY_STAGES.map((stage) => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="pricePositioning" className="block text-sm font-medium text-white mb-2">
                Positionnement Prix
              </label>
              <select
                id="pricePositioning"
                className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white/20"
                value={formData.pricePositioning || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, pricePositioning: e.target.value }))}
              >
                <option value="">Sélectionner</option>
                {PRICE_POSITIONING.map((price) => (
                  <option key={price} value={price}>{price}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-blue-300">
              Ces informations stratégiques permettent d'adapter automatiquement le ton, le style et l'approche marketing dans tous les contenus générés.
            </p>
          </div>
        </section>

        {/* Contexte concurrentiel */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-4">Contexte Concurrentiel</h3>
          
          <div>
            <label htmlFor="competitors" className="block text-sm font-medium text-white mb-2">
              Concurrents Principaux
            </label>
            <input
              type="text"
              id="competitors"
              className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white/20"
              value={formData.competitors}
              onChange={(e) => setFormData(prev => ({ ...prev, competitors: e.target.value }))}
              placeholder="Ex: Concurrent1, Concurrent2, Concurrent3"
            />
            <p className="text-sm text-white/60 mt-2">Séparez les noms par des virgules</p>
          </div>
        </section>

        {/* Valeurs et Mission (optionnel) */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-4">Valeurs & Mission (Optionnel)</h3>
          
          <div>
            <label htmlFor="mission" className="block text-sm font-medium text-white mb-2">
              Mission de l'entreprise
            </label>
            <textarea
              id="mission"
              rows={2}
              className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white/20"
              value={formData.mission || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, mission: e.target.value }))}
              placeholder="Ex: Rendre la technologie accessible à tous"
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
