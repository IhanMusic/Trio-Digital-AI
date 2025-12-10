import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { config } from '../../config/env';
import SearchBar from '../common/SearchBar';
import EmptyState from '../common/EmptyState';
import { useFilters } from '../../hooks/useFilters';

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  flavors: string[];
  scents: string[];
  images: {
    main?: string;
    gallery: string[];
  };
  createdAt: string;
}

interface ProductsListProps {
  brandId: string;
  brandLogo?: string;
  brandName?: string;
}

const ProductsList: React.FC<ProductsListProps> = ({ brandId, brandLogo, brandName }) => {
  const { token } = useAuthContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filters and search
  const {
    searchQuery,
    setSearchQuery,
    filteredData: filteredProducts,
    setFilter,
    clearAllFilters,
    hasActiveFilters
  } = useFilters({
    data: products,
    searchFields: ['name', 'description', 'category'],
    filterFunctions: {
      category: (product, value) => value === 'all' || product.category === value
    }
  });

  // Get unique categories for filter
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.apiUrl}/products/brand/${brandId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des produits');
        }

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message || 'Erreur lors de la récupération des produits');
        }

        setProducts(result.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brandId, token]);

  // Update category filter
  useEffect(() => {
    setFilter('category', selectedCategory);
  }, [selectedCategory, setFilter]);

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return;
    }

    try {
      const response = await fetch(`${config.apiUrl}/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du produit');
      }

      // Mettre à jour la liste des produits
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#53dfb2]"></div>
      </div>
    );
  }

  // Category badge colors
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Boisson': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Snack': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Cosmétique': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'Alimentaire': 'bg-green-500/20 text-green-400 border-green-500/30',
      'default': 'bg-white/10 text-white/80 border-white/20'
    };
    return colors[category] || colors.default;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div className="flex items-center">
          {brandLogo && (
            <div className="w-10 h-10 mr-3 rounded-lg overflow-hidden bg-white/10">
              <img 
                src={`${config.apiUrl}/static/${brandLogo}`} 
                alt={`Logo ${brandName || 'de la marque'}`}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <h2 className="text-2xl font-semibold text-white">Produits</h2>
        </div>
        <Link
          to={`/brands/${brandId}/products/new`}
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
          Ajouter un produit
        </Link>
      </div>

      {error && (
        <div className="glass-panel border-red-500/30 px-6 py-4 rounded-xl mb-6">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {products.length === 0 ? (
        <EmptyState
          icon="📦"
          title="Aucun produit"
          description="Commencez par ajouter votre premier produit pour cette marque."
          actionLabel="Nouveau produit"
          actionLink={`/brands/${brandId}/products/new`}
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
                  placeholder="Rechercher un produit..."
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="glass-input py-3"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.filter(c => c !== 'all').map(category => (
                    <option key={category} value={category}>{category}</option>
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
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
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

          {/* Products Display */}
          {filteredProducts.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="Aucun résultat"
              description="Aucun produit ne correspond à vos critères de recherche."
              actionLabel="Réinitialiser"
              onAction={clearAllFilters}
            />
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product._id} className="glass-panel overflow-hidden rounded-xl hover:scale-[1.02] transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-48 bg-black/20">
                    {product.images.main ? (
                      <img
                        src={config.getImageUrl(product.images.main)}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/40">
                        <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-2 right-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(product.category)}`}>
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                    <p className="text-white/60 mb-4 line-clamp-2">{product.description}</p>
                    
                    {/* Flavors */}
                    {product.flavors.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-sm">🍓</span>
                          <h4 className="text-sm font-medium text-white/80">Arômes</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {product.flavors.slice(0, 3).map((flavor, index) => (
                            <span key={index} className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80">
                              {flavor}
                            </span>
                          ))}
                          {product.flavors.length > 3 && (
                            <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/60">
                              +{product.flavors.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Scents */}
                    {product.scents.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-sm">🌸</span>
                          <h4 className="text-sm font-medium text-white/80">Parfums</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {product.scents.slice(0, 3).map((scent, index) => (
                            <span key={index} className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80">
                              {scent}
                            </span>
                          ))}
                          {product.scents.length > 3 && (
                            <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/60">
                              +{product.scents.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Footer */}
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
                      <span className="text-xs text-white/40">
                        {new Date(product.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                      <div className="flex space-x-2">
                        <Link
                          to={`/brands/${brandId}/products/${product._id}`}
                          className="glass-button text-xs py-1 px-3"
                        >
                          ✏️ Modifier
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="glass-button text-xs py-1 px-3 bg-red-500/20 hover:bg-red-500/30"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="glass-panel overflow-hidden">
              <ul className="divide-y divide-white/10">
                {filteredProducts.map((product) => (
                  <li key={product._id}>
                    <div className="px-6 py-4 flex items-center hover:bg-white/5 transition-colors">
                      {/* Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-black/20 flex-shrink-0 mr-4">
                        {product.images.main ? (
                          <img
                            src={config.getImageUrl(product.images.main)}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/40">
                            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-white truncate">{product.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border flex-shrink-0 ${getCategoryColor(product.category)}`}>
                            {product.category}
                          </span>
                        </div>
                        <p className="text-sm text-white/60 line-clamp-1 mb-2">{product.description}</p>
                        <div className="flex items-center gap-4 text-xs text-white/40">
                          {product.flavors.length > 0 && (
                            <span>🍓 {product.flavors.length} arôme{product.flavors.length > 1 ? 's' : ''}</span>
                          )}
                          {product.scents.length > 0 && (
                            <span>🌸 {product.scents.length} parfum{product.scents.length > 1 ? 's' : ''}</span>
                          )}
                          <span>{new Date(product.createdAt).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="ml-4 flex-shrink-0 flex space-x-2">
                        <Link
                          to={`/brands/${brandId}/products/${product._id}`}
                          className="glass-button text-xs py-2 px-4"
                        >
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="glass-button text-xs py-2 px-3 bg-red-500/20 hover:bg-red-500/30"
                        >
                          🗑️
                        </button>
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

export default ProductsList;
