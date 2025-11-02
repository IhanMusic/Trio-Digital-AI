import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { config } from '../../config/env';

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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
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
        <div className="glass-panel text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-white">Aucun produit</h3>
          <p className="mt-2 text-white/60">
            Commencez par ajouter votre premier produit.
          </p>
          <div className="mt-8">
            <Link
              to={`/brands/${brandId}/products/new`}
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
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Nouveau produit
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="glass-panel overflow-hidden rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="relative h-48 bg-black/20">
                {product.images.main ? (
                  <img
                    src={config.getImageUrl(product.images.main)}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/40">
                    <svg
                      className="h-16 w-16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                <p className="text-white/60 mb-4 line-clamp-2">{product.description}</p>
                
                {product.flavors.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-white/80 mb-1">Arômes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.flavors.map((flavor, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80"
                        >
                          {flavor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {product.scents.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white/80 mb-1">Parfums:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.scents.map((scent, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80"
                        >
                          {scent}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
                  <span className="text-xs text-white/40">
                    Créé le {new Date(product.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                  <div className="flex space-x-2">
                    <Link
                      to={`/brands/${brandId}/products/${product._id}`}
                      className="glass-button text-xs py-1 px-3"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="glass-button text-xs py-1 px-3 bg-red-500/20 hover:bg-red-500/30"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
