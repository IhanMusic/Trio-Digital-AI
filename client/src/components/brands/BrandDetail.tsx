import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import BriefForm from './BriefForm';
import ProductsList from '../products/ProductsList';
import { config } from '../../config/env';

type TabType = 'info' | 'products';

interface Brand {
  _id: string;
  name: string;
  sector: string;
  description?: string;
  logo?: string;
}

const BrandDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token, isLoading: authLoading } = useAuthContext();
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading) return;
    if (!token) {
      setError('Veuillez vous connecter pour accéder à cette page');
      setLoading(false);
      return;
    }

    const fetchBrand = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.apiUrl}/brands/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des détails de la marque');
        }

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message || 'Erreur lors de la récupération des détails de la marque');
        }

        setBrand(result.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchBrand();
  }, [id, token, authLoading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-panel p-8 rounded-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#53dfb2]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel border-red-500/30 px-6 py-4 rounded-xl mb-8">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="glass-panel px-6 py-4 rounded-xl mb-8">
        <p className="text-white/60">Marque non trouvée</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {brand.logo && (
            <div className="w-16 h-16 mr-4 rounded-lg overflow-hidden bg-white/10">
              <img 
                src={`${config.apiUrl}/static/${brand.logo}`} 
                alt={`Logo ${brand.name}`}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-[#53dfb2] bg-clip-text text-transparent">
            {brand.name}
          </h1>
        </div>
        <button
          onClick={() => navigate('/brands')}
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
          Retour aux marques
        </button>
      </div>

      <div className="glass-panel p-6 rounded-xl">
        <div className="border-b border-white/20">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('info')}
              className={`${
                activeTab === 'info'
                  ? 'border-[#53dfb2] text-[#53dfb2]'
                  : 'border-transparent text-white/60 hover:text-white/80 hover:border-white/20'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Informations
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`${
                activeTab === 'products'
                  ? 'border-[#53dfb2] text-[#53dfb2]'
                  : 'border-transparent text-white/60 hover:text-white/80 hover:border-white/20'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Produits
            </button>
            {/* Onglet Statistiques supprimé */}
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'info' && (
            <BriefForm />
          )}
          {activeTab === 'products' && (
            <ProductsList brandId={brand._id} brandLogo={brand.logo} brandName={brand.name} />
          )}
          {/* Contenu de l'onglet Statistiques supprimé */}
        </div>
      </div>
    </div>
  );
};

export default BrandDetail;
