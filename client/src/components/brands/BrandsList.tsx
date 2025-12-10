import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { config } from '../../config/env';
import SearchBar from '../common/SearchBar';
import EmptyState from '../common/EmptyState';
import { useFilters } from '../../hooks/useFilters';

interface Brand {
  _id: string;
  name: string;
  sector: string;
  createdAt: string;
  logo?: string;
  description?: string;
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
}

// Helper functions for brand logo fallback
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getColorFromName = (name: string): string => {
  const colors = [
    '#53dfb2', '#3fa88a', '#6366f1', '#8b5cf6', 
    '#ec4899', '#f59e0b', '#10b981', '#3b82f6',
    '#14b8a6', '#f97316', '#06b6d4', '#a855f7'
  ];
  const hash = name.split('').reduce((acc, char) => 
    acc + char.charCodeAt(0), 0
  );
  return colors[hash % colors.length];
};

const BrandLogo: React.FC<{ brand: Brand; size?: 'sm' | 'md' | 'lg' }> = ({ brand, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl'
  };

  if (brand.logo) {
    return (
      <img 
        src={`${config.apiUrl}/static/${brand.logo}`} 
        alt={brand.name}
        className={`${sizeClasses[size]} object-contain rounded-xl`}
      />
    );
  }

  // Fallback: Initiales stylées avec couleur de marque
  const backgroundColor = brand.colors?.primary || getColorFromName(brand.name);
  const initials = getInitials(brand.name);

  return (
    <div 
      className={`${sizeClasses[size]} rounded-xl flex items-center justify-center font-bold text-white shadow-lg`}
      style={{ backgroundColor }}
    >
      {initials}
    </div>
  );
};

const BrandsList: React.FC = () => {
  const { token, isLoading: authLoading, isAuthenticated } = useAuthContext();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSector, setSelectedSector] = useState<string>('all');

  // Filters and search
  const {
    searchQuery,
    setSearchQuery,
    filteredData: filteredBrands,
    setFilter,
    clearAllFilters,
    hasActiveFilters
  } = useFilters({
    data: brands,
    searchFields: ['name', 'sector', 'description'],
    filterFunctions: {
      sector: (brand, value) => value === 'all' || brand.sector === value
    }
  });

  // Get unique sectors for filter
  const sectors = ['all', ...Array.from(new Set(brands.map(b => b.sector)))];

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated || !token) {
      setError('Veuillez vous connecter pour accéder à vos marques');
      setLoading(false);
      return;
    }

    const fetchBrands = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/brands`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des marques');
        }

        const data = await response.json();
        setBrands(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [token, authLoading, isAuthenticated]);

  // Update sector filter
  useEffect(() => {
    setFilter('sector', selectedSector);
  }, [selectedSector, setFilter]);

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
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-[#53dfb2] bg-clip-text text-transparent">
          Mes Marques
        </h1>
        <Link
          to="/brands/new"
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
          Ajouter une marque
        </Link>
      </div>

      {error && (
        <div className="glass-panel border-red-500/30 px-6 py-4 rounded-xl mb-8">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {brands.length === 0 ? (
        <EmptyState
          icon="🏢"
          title="Aucune marque"
          description="Commencez par créer votre première marque pour gérer vos produits et calendriers éditoriaux."
          actionLabel="Nouvelle marque"
          actionLink="/brands/new"
        />
      ) : (
        <>
          {/* Search and Filters */}
          <div className="glass-panel p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Rechercher une marque..."
                />
              </div>

              {/* Sector Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="glass-input py-3"
                >
                  <option value="all">Tous les secteurs</option>
                  {sectors.filter(s => s !== 'all').map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex bg-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-[#53dfb2] text-white' 
                        : 'text-white/60 hover:text-white'
                    }`}
                    title="Vue grille"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-all ${
                      viewMode === 'list' 
                        ? 'bg-[#53dfb2] text-white' 
                        : 'text-white/60 hover:text-white'
                    }`}
                    title="Vue liste"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Info */}
            {hasActiveFilters && (
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-white/60">
                  {filteredBrands.length} marque{filteredBrands.length > 1 ? 's' : ''} trouvée{filteredBrands.length > 1 ? 's' : ''}
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

          {/* Brands Display */}
          {filteredBrands.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="Aucun résultat"
              description="Aucune marque ne correspond à vos critères de recherche."
              actionLabel="Réinitialiser"
              onAction={clearAllFilters}
            />
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBrands.map((brand) => (
                <div 
                  key={brand._id} 
                  className="glass-panel p-6 hover:scale-[1.02] transition-all duration-300"
                >
                  {/* Brand Logo/Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <BrandLogo brand={brand} size="md" />
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80">
                      {brand.sector}
                    </span>
                  </div>

                  {/* Brand Name */}
                  <h3 className="text-xl font-semibold text-white mb-2 truncate">
                    {brand.name}
                  </h3>

                  {/* Description */}
                  {brand.description && (
                    <p className="text-sm text-white/60 mb-4 line-clamp-2">
                      {brand.description}
                    </p>
                  )}

                  {/* Date */}
                  <div className="flex items-center text-xs text-white/40 mb-4">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Créée le {new Date(brand.createdAt).toLocaleDateString('fr-FR')}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      to={`/brands/${brand._id}`}
                      className="flex-1 glass-button text-center text-sm py-2"
                    >
                      Voir détails
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="glass-panel overflow-hidden">
              <ul className="divide-y divide-white/10">
                {filteredBrands.map((brand) => (
                  <li key={brand._id}>
                    <div className="px-6 py-4 flex items-center hover:bg-white/5 transition-colors">
                      {/* Logo */}
                      <div className="mr-4 flex-shrink-0">
                        <BrandLogo brand={brand} size="sm" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-semibold text-white truncate">{brand.name}</p>
                          <span className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/80 flex-shrink-0">
                            {brand.sector}
                          </span>
                        </div>
                        <p className="text-sm text-white/60">
                          Créée le {new Date(brand.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="ml-4 flex-shrink-0">
                        <Link
                          to={`/brands/${brand._id}`}
                          className="glass-button text-xs py-2 px-4"
                        >
                          Voir détails
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BrandsList;
