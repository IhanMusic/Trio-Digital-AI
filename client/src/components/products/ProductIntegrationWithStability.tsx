import React, { useState, useRef } from 'react';
import { apiClient } from '../../utils/apiClient';
import { useAuth } from '../../hooks/useAuth';

interface ProductIntegrationWithStabilityProps {
  onIntegrationComplete?: (imageUrl: string) => void;
}

const ProductIntegrationWithStability: React.FC<ProductIntegrationWithStabilityProps> = ({ 
  onIntegrationComplete 
}) => {
  const { user } = useAuth();
  const [productImage, setProductImage] = useState<File | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [productPreview, setProductPreview] = useState<string | null>(null);
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [method, setMethod] = useState<'inpaint' | 'search-and-replace'>('inpaint');
  const [prompt, setPrompt] = useState<string>('a product seamlessly integrated into the scene, with matching lighting and perspective');
  const [negativePrompt, setNegativePrompt] = useState<string>('unrealistic integration, floating objects, mismatched lighting, poor composition');
  const [searchPrompt, setSearchPrompt] = useState<string>('object');
  const [stylePreset, setStylePreset] = useState<string>('photographic');
  
  const productInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);

  const handleProductImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProductImage(file);
      setProductPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleBackgroundImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setBackgroundImage(file);
      setBackgroundPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleProductDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setProductImage(file);
        setProductPreview(URL.createObjectURL(file));
        setError(null);
      } else {
        setError('Le fichier doit être une image');
      }
    }
  };

  const handleBackgroundDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setBackgroundImage(file);
        setBackgroundPreview(URL.createObjectURL(file));
        setError(null);
      } else {
        setError('Le fichier doit être une image');
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    if (!productImage || !backgroundImage) {
      setError('Veuillez sélectionner une image de produit et une image d\'arrière-plan');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('productImage', productImage);
      formData.append('backgroundImage', backgroundImage);
      formData.append('prompt', prompt);
      formData.append('negativePrompt', negativePrompt);
      formData.append('stylePreset', stylePreset);
      
      if (method === 'search-and-replace') {
        formData.append('searchPrompt', searchPrompt);
      }

      const endpoint = method === 'inpaint' 
        ? '/api/product-integration-stability/inpaint' 
        : '/api/product-integration-stability/search-and-replace';

      const response = await apiClient.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setResultImage(response.data.result.imageUrl);
        setSuccess(true);
        if (onIntegrationComplete) {
          onIntegrationComplete(response.data.result.imageUrl);
        }
      } else {
        setError(response.data.message || 'Une erreur est survenue');
      }
    } catch (err: any) {
      console.error('Erreur lors de l\'intégration du produit:', err);
      setError(err.response?.data?.message || err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setProductImage(null);
    setBackgroundImage(null);
    setProductPreview(null);
    setBackgroundPreview(null);
    setResultImage(null);
    setError(null);
    setSuccess(false);
    setPrompt('a product seamlessly integrated into the scene, with matching lighting and perspective');
    setNegativePrompt('unrealistic integration, floating objects, mismatched lighting, poor composition');
    setSearchPrompt('object');
    setStylePreset('photographic');
  };

  return (
    <div className="glass-panel p-6 rounded-xl">
      <h2 className="text-xl font-semibold text-white mb-2">
        Intégration de produit avec Stability AI
      </h2>
      <p className="text-white/60 mb-6">
        Intégrez votre produit dans une image générée en utilisant les API de Stability AI.
      </p>

      {error && (
        <div className="glass-panel border-red-500/30 px-4 py-3 rounded-xl mb-4" role="alert">
          <span className="text-red-400">{error}</span>
        </div>
      )}

      {success && (
        <div className="glass-panel border-[#53dfb2]/30 px-4 py-3 rounded-xl mb-4" role="alert">
          <span className="text-[#53dfb2]">Intégration réussie !</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label htmlFor="method" className="block text-sm font-medium text-white/80 mb-1">
              Méthode d'intégration
            </label>
            <select
              id="method"
              value={method}
              onChange={(e) => setMethod(e.target.value as 'inpaint' | 'search-and-replace')}
              disabled={loading}
              className="glass-input w-full"
            >
              <option value="inpaint">Inpaint</option>
              <option value="search-and-replace">Search and Replace</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-white/80 mb-1">
              Prompt
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={2}
              className="glass-input w-full"
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="negativePrompt" className="block text-sm font-medium text-white/80 mb-1">
              Prompt négatif
            </label>
            <textarea
              id="negativePrompt"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              rows={2}
              className="glass-input w-full"
              disabled={loading}
            />
          </div>

          {method === 'search-and-replace' && (
            <div className="mb-4">
              <label htmlFor="searchPrompt" className="block text-sm font-medium text-white/80 mb-1">
                Prompt de recherche
              </label>
              <input
                id="searchPrompt"
                type="text"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                className="glass-input w-full"
                disabled={loading}
                placeholder="Objet à remplacer dans l'image de fond"
              />
              <p className="text-xs text-white/60 mt-1">Objet à remplacer dans l'image de fond</p>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="stylePreset" className="block text-sm font-medium text-white/80 mb-1">
              Style Preset
            </label>
            <select
              id="stylePreset"
              value={stylePreset}
              onChange={(e) => setStylePreset(e.target.value)}
              disabled={loading}
              className="glass-input w-full"
            >
              <option value="photographic">Photographic</option>
              <option value="digital-art">Digital Art</option>
              <option value="cinematic">Cinematic</option>
              <option value="anime">Anime</option>
              <option value="enhance">Enhance</option>
              <option value="3d-model">3D Model</option>
              <option value="pixel-art">Pixel Art</option>
              <option value="neon-punk">Neon Punk</option>
              <option value="isometric">Isometric</option>
              <option value="low-poly">Low Poly</option>
              <option value="origami">Origami</option>
              <option value="line-art">Line Art</option>
              <option value="analog-film">Analog Film</option>
              <option value="fantasy-art">Fantasy Art</option>
            </select>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-white/80 mb-2">
              Image du produit
            </h3>
            <div 
              className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center cursor-pointer hover:bg-white/5 transition-colors"
              onDrop={handleProductDrop}
              onDragOver={handleDragOver}
              onClick={() => productInputRef.current?.click()}
            >
              {productPreview ? (
                <img 
                  src={productPreview} 
                  alt="Aperçu du produit" 
                  className="w-full h-auto max-h-[300px] object-contain rounded-lg mx-auto"
                />
              ) : (
                <div className="py-6">
                  <svg className="w-12 h-12 text-white/40 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-white/60">
                    Glissez-déposez une image ou cliquez pour sélectionner
                  </p>
                </div>
              )}
              <input
                ref={productInputRef}
                type="file"
                accept="image/*"
                onChange={handleProductImageChange}
                disabled={loading}
                className="hidden"
              />
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-white/80 mb-2">
              Image d'arrière-plan
            </h3>
            <div 
              className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center cursor-pointer hover:bg-white/5 transition-colors"
              onDrop={handleBackgroundDrop}
              onDragOver={handleDragOver}
              onClick={() => backgroundInputRef.current?.click()}
            >
              {backgroundPreview ? (
                <img 
                  src={backgroundPreview} 
                  alt="Aperçu de l'arrière-plan" 
                  className="w-full h-auto max-h-[300px] object-contain rounded-lg mx-auto"
                />
              ) : (
                <div className="py-6">
                  <svg className="w-12 h-12 text-white/40 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-white/60">
                    Glissez-déposez une image ou cliquez pour sélectionner
                  </p>
                </div>
              )}
              <input
                ref={backgroundInputRef}
                type="file"
                accept="image/*"
                onChange={handleBackgroundImageChange}
                disabled={loading}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          className="glass-button bg-white/5 hover:bg-white/10"
        >
          Réinitialiser
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || !productImage || !backgroundImage}
          className={`glass-button ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Intégration en cours...
            </>
          ) : 'Intégrer le produit'}
        </button>
      </div>

      {resultImage && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-white/80 mb-3">
            Résultat
          </h3>
          <div className="glass-panel p-4 rounded-xl">
            <img 
              src={resultImage} 
              alt="Résultat de l'intégration" 
              className="w-full h-auto max-h-[500px] object-contain rounded-lg mx-auto"
            />
          </div>
          <div className="flex justify-center mt-4">
            <a
              href={resultImage}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button bg-white/5 hover:bg-white/10"
            >
              Ouvrir l'image
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductIntegrationWithStability;
