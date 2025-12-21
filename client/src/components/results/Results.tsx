import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { config } from '../../config/env';
import { useAuthContext } from '../../contexts/AuthContext';
import CarouselViewer from './CarouselViewer';
import SearchBar from '../common/SearchBar';
import StatusBadge, { StatusType } from '../common/StatusBadge';
import StatsCard from '../common/StatsCard';
import { useFilters } from '../../hooks/useFilters';

// Fonction de debounce personnalisée
function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) {
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
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

interface Post {
  _id: string;
  platform: string;
  scheduledDate: string;
  content: {
    text: string;
    imageUrl?: string;
    imageUrls?: string[]; // Support des carrousels
    imageWidth?: number;
    imageHeight?: number;
    mediaType?: 'image' | 'video';
    contentType?: 'single' | 'carousel' | 'stories'; // Type de contenu
    videoUrl?: string;
    videoPublicId?: string;
    videoFormat?: string;
    videoResolution?: string;
    videoDuration?: number;
    hasAudio?: boolean;
  };
  status: 'pending_validation' | 'approved' | 'rejected';
  brandId: {
    name: string;
  };
  videoType?: 'story' | 'reel' | 'short' | 'animation';
  products?: Product[];
  audienceTargeting?: string;
  competitiveEdge?: string;
  legalCompliance?: string;
  culturalRelevance?: string;
}

const platformIcons: Record<string, string> = {
  facebook: '📘',
  instagram: '📸',
  twitter: '🐦',
  linkedin: '💼',
  tiktok: '🎵'
};

const getImageStyle = (post: Post) => {
  if (!post.content.imageUrl) return {};
  
  const width = post.content.imageWidth || 0;
  const height = post.content.imageHeight || 0;
  
  if (!width || !height) return {
    position: 'relative' as const,
    width: '100%',
    paddingTop: '100%',
    overflow: 'hidden'
  };

  return {
    position: 'relative' as const,
    width: '100%',
    paddingTop: `${(height / width) * 100}%`,
    overflow: 'hidden'
  };
};

const loadImageDimensions = async (post: Post): Promise<void> => {
  if (!post.content.imageUrl || (post.content.imageWidth && post.content.imageHeight)) {
    return;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      post.content.imageWidth = img.width;
      post.content.imageHeight = img.height;
      resolve();
    };
    if (post.content.imageUrl) {
      img.src = config.getImageUrl(post.content.imageUrl);
    }
    img.onerror = () => resolve();
  });
};

const Results: React.FC = () => {
  const { calendarId } = useParams<{ calendarId: string }>();
  const { token } = useAuthContext();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedMediaType, setSelectedMediaType] = useState<string>('all');
  
  // États pour les nouvelles fonctionnalités
  const [enhancingPosts, setEnhancingPosts] = useState<Set<string>>(new Set());
  const [adaptingPosts, setAdaptingPosts] = useState<Set<string>>(new Set());
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedPostForAdaptation, setSelectedPostForAdaptation] = useState<string | null>(null);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  
  // Utiliser des refs pour éviter les dépendances circulaires
  const postsRef = useRef<Post[]>([]);
  const isPollingRef = useRef(false);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 3;

  // Filters and search
  const {
    searchQuery,
    setSearchQuery,
    filteredData: filteredPosts,
    setFilter,
    clearAllFilters,
    hasActiveFilters
  } = useFilters({
    data: posts,
    searchFields: ['content'],
    filterFunctions: {
      platform: (post, value) => value === 'all' || post.platform === value,
      status: (post, value) => value === 'all' || post.status === value,
      mediaType: (post, value) => {
        if (value === 'all') return true;
        if (value === 'video') return post.content.mediaType === 'video';
        if (value === 'carousel') return post.content.contentType === 'carousel';
        if (value === 'image') return !!(post.content.imageUrl && post.content.contentType !== 'carousel' && post.content.mediaType !== 'video');
        if (value === 'pending') return !post.content.imageUrl && !post.content.videoUrl;
        return true;
      }
    }
  });

  // Update filters
  useEffect(() => {
    setFilter('platform', selectedPlatform);
  }, [selectedPlatform, setFilter]);

  useEffect(() => {
    setFilter('status', selectedStatus);
  }, [selectedStatus, setFilter]);

  useEffect(() => {
    setFilter('mediaType', selectedMediaType);
  }, [selectedMediaType, setFilter]);

  // Calculate statistics
  const stats = {
    total: posts.length,
    pending: posts.filter(p => p.status === 'pending_validation').length,
    approved: posts.filter(p => p.status === 'approved').length,
    rejected: posts.filter(p => p.status === 'rejected').length,
    withMedia: posts.filter(p => p.content.imageUrl || p.content.videoUrl).length,
    videos: posts.filter(p => p.content.mediaType === 'video').length,
    carousels: posts.filter(p => p.content.contentType === 'carousel').length
  };

  // Get unique platforms
  const platforms = ['all', ...Array.from(new Set(posts.map(p => p.platform)))];

  const updatePost = useCallback(async (postId: string, newText: string) => {
    try {
      const response = await fetch(`${config.apiUrl}/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: { text: newText }
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du post');
      }
    } catch (error) {
      console.error('Erreur de mise à jour:', error);
    }
  }, [token]);

  const debouncedUpdate = useDebounce(updatePost, 1000);

  // Fonction utilitaire pour comparer les médias d'un post
  const hasMediaChanged = useCallback((oldPost: Post, newPost: Post): boolean => {
    // Comparer imageUrl
    if (oldPost.content.imageUrl !== newPost.content.imageUrl) return true;
    
    // Comparer videoUrl
    if (oldPost.content.videoUrl !== newPost.content.videoUrl) return true;
    
    // Comparer imageUrls (carrousels)
    const oldUrls = oldPost.content.imageUrls || [];
    const newUrls = newPost.content.imageUrls || [];
    if (oldUrls.length !== newUrls.length) return true;
    if (oldUrls.some((url, idx) => url !== newUrls[idx])) return true;
    
    return false;
  }, []);

  // Fonction de fetch avec retry automatique
  const fetchWithRetry = useCallback(async (url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> => {
    try {
      const response = await fetch(url, options);
      
      // Réinitialiser le compteur de retry en cas de succès
      retryCountRef.current = 0;
      
      return response;
    } catch (error) {
      retryCountRef.current++;
      
      if (retryCountRef.current < retries) {
        // Exponential backoff: 2s, 4s, 8s
        const delay = Math.pow(2, retryCountRef.current) * 1000;
        console.log(`⚠️ Erreur réseau, retry ${retryCountRef.current}/${retries} dans ${delay}ms...`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(url, options, retries);
      }
      
      throw error;
    }
  }, []);

  // Fonction de refresh intelligente pour le polling - OPTIMISÉE
  const refreshPosts = useCallback(async () => {
    if (isPollingRef.current) {
      console.log('⏭️ Polling déjà en cours, skip...');
      return;
    }
    
    try {
      isPollingRef.current = true;
      setIsPolling(true);
      
      console.log('🔄 Polling: Vérification des nouveaux posts...');
      
      const response = await fetchWithRetry(
        `${config.apiUrl}/posts/calendar/${calendarId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (!response.ok) {
        console.error('❌ Erreur HTTP lors du refresh des posts:', response.status, response.statusText);
        return;
      }

      const result = await response.json();
      if (!result.success) {
        console.error('❌ Erreur API lors du refresh:', result.error);
        return;
      }

      const newPostsData = result.data;
      const currentPosts = postsRef.current;
      
      // Logique de comparaison AMÉLIORÉE
      let hasChanges = false;
      let changesDetails: string[] = [];
      
      // Cas 1: Nouveaux posts ajoutés
      if (newPostsData.length > currentPosts.length) {
        const diff = newPostsData.length - currentPosts.length;
        changesDetails.push(`${diff} nouveau(x) post(s)`);
        hasChanges = true;
      }
      
      // Cas 2: Posts existants mis à jour (médias)
      const updatedPosts = newPostsData.filter((newPost: Post) => {
        const existingPost = currentPosts.find(p => p._id === newPost._id);
        if (!existingPost) return false;
        
        return hasMediaChanged(existingPost, newPost);
      });
      
      if (updatedPosts.length > 0) {
        changesDetails.push(`${updatedPosts.length} post(s) mis à jour`);
        hasChanges = true;
        
        // Logger les détails des changements
        updatedPosts.forEach((post: Post) => {
          const existingPost = currentPosts.find(p => p._id === post._id);
          if (existingPost) {
            const changes: string[] = [];
            if (existingPost.content.imageUrl !== post.content.imageUrl) changes.push('image');
            if (existingPost.content.videoUrl !== post.content.videoUrl) changes.push('vidéo');
            if ((existingPost.content.imageUrls?.length || 0) !== (post.content.imageUrls?.length || 0)) changes.push('carrousel');
            console.log(`  📝 Post ${post._id}: ${changes.join(', ')} modifié(s)`);
          }
        });
      }
      
      if (hasChanges) {
        console.log(`✅ Changements détectés: ${changesDetails.join(', ')}`);
        
        // Charger les dimensions des nouvelles images
        await Promise.all(newPostsData.map(loadImageDimensions));
        
        // Mettre à jour les refs ET les states
        postsRef.current = newPostsData;
        setPosts(newPostsData);
        
        console.log(`🎉 Posts mis à jour: ${newPostsData.length} posts au total`);
      } else {
        console.log('⏳ Aucun changement détecté, polling continue...');
      }
      
    } catch (error) {
      console.error('❌ Erreur lors du refresh des posts:', error);
      
      // Si trop d'erreurs consécutives, afficher un message à l'utilisateur
      if (retryCountRef.current >= MAX_RETRIES) {
        setError('Erreur de connexion. Vérifiez votre connexion internet et actualisez la page.');
      }
    } finally {
      isPollingRef.current = false;
      setIsPolling(false);
    }
  }, [calendarId, token, hasMediaChanged, fetchWithRetry]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('📥 Chargement initial des posts...');
        
        const response = await fetchWithRetry(
          `${config.apiUrl}/posts/calendar/${calendarId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`Erreur lors de la récupération des posts: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.error || 'Erreur lors de la récupération des posts');
        }

        const postsData = result.data;
        
        console.log(`✅ ${postsData.length} posts chargés`);
        
        // Charger les dimensions des images
        await Promise.all(postsData.map(loadImageDimensions));
        
        // Mettre à jour les refs ET les states
        postsRef.current = postsData;
        setPosts(postsData);
      } catch (error) {
        console.error('❌ Erreur lors du chargement initial:', error);
        setError(error instanceof Error ? error.message : 'Erreur lors de la génération du contenu: Failed to fetch');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [calendarId, token, fetchWithRetry]);

  // Synchroniser postsRef avec posts state
  useEffect(() => {
    postsRef.current = posts;
  }, [posts]);

  // Système de polling automatique - OPTIMISÉ et ROBUSTE
  useEffect(() => {
    // Nettoyer l'ancien interval si existant
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    
    if (loading) {
      console.log('⏸️ Chargement en cours, polling en attente...');
      return;
    }
    
    if (postsRef.current.length === 0) {
      console.log('⏸️ Aucun post chargé, polling en attente...');
      return;
    }
    
    console.log('🚀 Démarrage du polling automatique pour les nouveaux posts');
    
    // Fonction pour vérifier si la génération est terminée
    const checkGenerationComplete = () => {
      const currentPosts = postsRef.current;
      const postsWithoutMedia = currentPosts.filter(post => 
        !post.content.imageUrl && !post.content.videoUrl && 
        (!post.content.imageUrls || post.content.imageUrls.length === 0)
      );
      
      console.log(`📊 État actuel: ${currentPosts.length} posts total, ${postsWithoutMedia.length} sans média`);
      
      return postsWithoutMedia.length === 0 && currentPosts.length > 0;
    };
    
    // Vérification initiale
    if (checkGenerationComplete()) {
      console.log('✅ Tous les posts ont leurs médias, pas de polling nécessaire');
      return;
    }
    
    // Démarrer le polling toutes les 10 secondes
    pollingIntervalRef.current = setInterval(() => {
      // Vérifier si la génération est terminée avant chaque poll
      if (checkGenerationComplete()) {
        console.log('✅ Génération terminée, arrêt du polling');
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
        return;
      }
      
      refreshPosts();
    }, 10000);
    
    console.log('⏰ Polling configuré: vérification toutes les 10 secondes');
    
    return () => {
      console.log('🛑 Nettoyage du polling');
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, [loading, refreshPosts]); // Dépendances minimales et stables

  // Effet pour mettre à jour les dimensions des images si nécessaire
  useEffect(() => {
    const updateDimensions = async () => {
      const updatedPosts = [...posts];
      let hasUpdates = false;

      await Promise.all(
        updatedPosts.map(async (post) => {
          if (post.content.imageUrl && (!post.content.imageWidth || !post.content.imageHeight)) {
            await loadImageDimensions(post);
            hasUpdates = true;
          }
        })
      );

      if (hasUpdates) {
        setPosts(updatedPosts);
      }

      // Ajuster la hauteur de tous les textareas
      setTimeout(() => {
        document.querySelectorAll('textarea').forEach(textarea => {
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';
        });
      }, 0);
    };

    updateDimensions();
  }, [posts]);

  const handleDownload = async (imageUrl: string, platform: string, postId: string) => {
    try {
      const fullImageUrl = config.getImageUrl(imageUrl);
      const filename = `${platform}-post-${postId}.jpg`;
      
      // Utiliser la route proxy pour télécharger l'image
      const downloadUrl = `${config.apiUrl}/download/image?url=${encodeURIComponent(fullImageUrl)}&filename=${encodeURIComponent(filename)}`;
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      link.target = '_blank';
      
      // Ajouter l'en-tête d'autorisation si nécessaire
      if (token) {
        // Pour les téléchargements, on utilise une approche différente car on ne peut pas ajouter des headers à un lien
        // On va faire un fetch pour récupérer le blob et le télécharger
        const response = await fetch(downloadUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Erreur lors du téléchargement');
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
    }
  };

  const handleDownloadCarousel = async (imageUrls: string[], platform: string, postId: string) => {
    try {
      for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i];
        const fullImageUrl = config.getImageUrl(imageUrl);
        const filename = `${platform}-carrousel-${postId}-${i + 1}.jpg`;
        
        const downloadUrl = `${config.apiUrl}/download/image?url=${encodeURIComponent(fullImageUrl)}&filename=${encodeURIComponent(filename)}`;
        
        if (token) {
          const response = await fetch(downloadUrl, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (!response.ok) {
            throw new Error(`Erreur lors du téléchargement de l'image ${i + 1}`);
          }
          
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          
          // Délai entre les téléchargements pour éviter de surcharger le navigateur
          if (i < imageUrls.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement du carrousel:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="glass-panel p-8 rounded-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#53dfb2]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="glass-panel border-red-500/30 px-6 py-4 rounded-xl">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="glass-panel px-6 py-4 rounded-xl text-white/60">
          Aucune publication trouvée pour ce calendrier
        </div>
      </div>
    );
  }

  // Grouper les posts filtrés par plateforme
  const groupedPosts = filteredPosts.reduce<Record<string, Post[]>>((acc, post) => {
    const platform = post.platform;
    if (!acc[platform]) {
      acc[platform] = [];
    }
    acc[platform].push(post);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-[#53dfb2] bg-clip-text text-transparent">
          Publications Générées
        </h1>
        
        {/* Indicateur de polling actif */}
        {!loading && posts.length > 0 && posts.some(post => !post.content.imageUrl && !post.content.videoUrl) && (
          <div className="flex items-center space-x-2 text-sm text-white/60">
            <div className="w-2 h-2 bg-[#53dfb2] rounded-full animate-pulse"></div>
            <span>Génération en cours...</span>
          </div>
        )}
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
        <StatsCard
          icon="📊"
          label="Total"
          value={stats.total}
          color="text-white"
        />
        <StatsCard
          icon="⏳"
          label="En validation"
          value={stats.pending}
          color="text-yellow-400"
        />
        <StatsCard
          icon="✅"
          label="Validés"
          value={stats.approved}
          color="text-green-400"
        />
        <StatsCard
          icon="❌"
          label="Refusés"
          value={stats.rejected}
          color="text-red-400"
        />
        <StatsCard
          icon="🖼️"
          label="Avec média"
          value={stats.withMedia}
          color="text-blue-400"
        />
        <StatsCard
          icon="🎬"
          label="Vidéos"
          value={stats.videos}
          color="text-purple-400"
        />
        <StatsCard
          icon="🎠"
          label="Carrousels"
          value={stats.carousels}
          color="text-pink-400"
        />
      </div>

      {/* Search and Filters */}
      <div className="glass-panel p-4 mb-6">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Rechercher dans le contenu..."
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col md:flex-row gap-3">
            {/* Platform Filter */}
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="glass-input py-3 flex-1"
            >
              <option value="all">Toutes les plateformes</option>
              {platforms.filter(p => p !== 'all').map(platform => (
                <option key={platform} value={platform}>
                  {platformIcons[platform] || '📱'} {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="glass-input py-3 flex-1"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending_validation">⏳ En validation</option>
              <option value="approved">✅ Validés</option>
              <option value="rejected">❌ Refusés</option>
            </select>

            {/* Media Type Filter */}
            <select
              value={selectedMediaType}
              onChange={(e) => setSelectedMediaType(e.target.value)}
              className="glass-input py-3 flex-1"
            >
              <option value="all">Tous les types</option>
              <option value="image">🖼️ Images</option>
              <option value="video">🎬 Vidéos</option>
              <option value="carousel">🎠 Carrousels</option>
              <option value="pending">⏳ En génération</option>
            </select>
          </div>
        </div>

        {/* Active Filters Info */}
        {hasActiveFilters && (
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-white/60">
              {filteredPosts.length} publication{filteredPosts.length > 1 ? 's' : ''} trouvée{filteredPosts.length > 1 ? 's' : ''}
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

      {/* Posts Display */}
      {filteredPosts.length === 0 ? (
        <div className="glass-panel text-center py-16 px-6">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-white mb-3">
            Aucun résultat
          </h3>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Aucune publication ne correspond à vos critères de recherche.
          </p>
          <button
            onClick={clearAllFilters}
            className="glass-button inline-flex items-center"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        Object.entries(groupedPosts).map(([platform, platformPosts]) => (
        <div key={platform} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-white">
            <span className="mr-3">{platformIcons[platform] || '📱'}</span>
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
            <span className="ml-3 text-sm text-white/60">
              ({platformPosts.length} publications)
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformPosts.map(post => (
              <div key={post._id} className="glass-panel overflow-hidden hover:scale-[1.02] transition-all duration-300">
                {/* Affichage conditionnel : Vidéo, Carrousel OU Image */}
                {(() => {
                  // CAS 1: Post VIDÉO
                  if (post.content.mediaType === 'video' && post.content.videoUrl) {
                    return (
                      <div className="relative w-full bg-black" style={{ 
                        paddingTop: post.content.videoFormat === '9:16' ? '177.78%' : 
                                    post.content.videoFormat === '1:1' ? '100%' : '56.25%' 
                      }}>
                        <div className="absolute top-0 left-0 w-full h-full">
                          <video 
                            controls 
                            className="w-full h-full object-contain"
                            poster={post.content.imageUrl ? config.getImageUrl(post.content.imageUrl) : undefined}
                          >
                            <source src={config.getImageUrl(post.content.videoUrl)} type="video/mp4" />
                            Votre navigateur ne supporte pas la lecture de vidéos.
                          </video>
                        </div>
                        {/* Badge type vidéo */}
                        <div className="absolute top-2 left-2 z-10">
                          <span className="bg-[#53dfb2] text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                            🎬 {post.videoType || 'Video'} {post.content.videoDuration ? `${post.content.videoDuration}s` : ''}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  
                  // CAS 2: CARROUSEL (plusieurs images)
                  if (post.content.contentType === 'carousel' && post.content.imageUrls && post.content.imageUrls.length > 0) {
                    const carouselImages = post.content.imageUrls.map(url => config.getImageUrl(url));
                    return (
                      <div className="relative">
                        {/* Badge carrousel */}
                        <div className="absolute top-2 left-2 z-20">
                          <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                            🎠 Carrousel ({post.content.imageUrls.length} images)
                          </span>
                        </div>
                        {/* Badge format */}
                        <div className="absolute top-2 right-12 z-20">
                          <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium shadow-lg">
                            {post.platform === 'instagram' ? '3:4' : post.platform === 'linkedin' ? '16:9' : '1:1'}
                          </span>
                        </div>
                        {/* Bouton téléchargement carrousel */}
                        <div className="absolute top-2 right-2 z-20">
                          <button 
                            onClick={() => handleDownloadCarousel(post.content.imageUrls!, post.platform, post._id)}
                            className="bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all duration-200"
                            title="Télécharger toutes les images du carrousel"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </button>
                        </div>
                        <CarouselViewer 
                          images={carouselImages} 
                          alt={`Carrousel ${post.platform}`}
                          className="rounded-t-xl"
                        />
                      </div>
                    );
                  }
                  
                  // CAS 3: Post IMAGE SIMPLE
                  if (post.content.imageUrl) {
                    return (
                      <div style={getImageStyle(post)} className="relative">
                        {/* Badge format optimisé */}
                        <div className="absolute top-2 left-2 z-10">
                          <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium shadow-lg">
                            {post.platform === 'instagram' ? '3:4' : 
                             post.platform === 'linkedin' ? '16:9' : 
                             post.content.contentType === 'stories' ? '9:16' : '1:1'}
                          </span>
                        </div>
                        <div className="absolute top-2 right-2 p-2 z-10">
                          <button 
                            onClick={() => handleDownload(post.content.imageUrl!, post.platform, post._id)}
                            className="bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all duration-200"
                            title="Télécharger l'image"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </button>
                        </div>
                        <img 
                          src={config.getImageUrl(post.content.imageUrl)} 
                          alt="Post visual" 
                          className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                      </div>
                    );
                  }
                  
                  // CAS 4: Pas de média
                  return (
                    <div className="bg-white/5 p-8 rounded text-white/60 text-center">
                      <div className="mb-2">⏳ Génération en cours...</div>
                      <div className="text-xs">
                        Format cible: {post.platform === 'instagram' ? '3:4 (Instagram)' : 
                                      post.platform === 'linkedin' ? '16:9 (LinkedIn)' : 
                                      '1:1 (Universel)'}
                      </div>
                    </div>
                  );
                })()}
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-white/60">
                      {new Date(post.scheduledDate).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <div className="flex items-center space-x-2">
                      <StatusBadge 
                        status={post.status as StatusType} 
                        size="sm"
                      />
                      <div className="flex space-x-1">
                        <button
                          onClick={async () => {
                            try {
                              const response = await fetch(`${config.apiUrl}/posts/${post._id}/status`, {
                                method: 'PUT',
                                headers: {
                                  'Authorization': `Bearer ${token}`,
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ status: 'approved' })
                              });

                              if (!response.ok) {
                                throw new Error('Erreur lors de la mise à jour du statut');
                              }

                              const result = await response.json();
                              setPosts(posts.map(p => p._id === post._id ? result.data : p));
                            } catch (error) {
                              console.error('Erreur:', error);
                            }
                          }}
                          className="p-1.5 bg-[#53dfb2]/10 hover:bg-[#53dfb2]/20 rounded-lg transition-all duration-300 backdrop-blur-sm"
                          title="Valider"
                        >
                          <svg className="w-4 h-4 text-[#53dfb2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              const response = await fetch(`${config.apiUrl}/posts/${post._id}/status`, {
                                method: 'PUT',
                                headers: {
                                  'Authorization': `Bearer ${token}`,
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ status: 'rejected' })
                              });

                              if (!response.ok) {
                                throw new Error('Erreur lors de la mise à jour du statut');
                              }

                              const result = await response.json();
                              setPosts(posts.map(p => p._id === post._id ? result.data : p));
                            } catch (error) {
                              console.error('Erreur:', error);
                            }
                          }}
                          className="p-1.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-all duration-300 backdrop-blur-sm"
                          title="Refuser"
                        >
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5 6h2a2 2 0 002-2v-6a2 2 0 00-2-2h-2.5" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <textarea
                    className="w-full bg-transparent text-white/80 whitespace-pre-wrap mb-4 leading-relaxed border-none focus:ring-1 focus:ring-[#53dfb2]/50 rounded-lg p-2 overflow-hidden resize-none"
                    value={post.content.text}
                    onChange={(e) => {
                      const updatedPost = { ...post };
                      updatedPost.content.text = e.target.value;
                      setPosts(posts.map(p => p._id === post._id ? updatedPost : p));
                      debouncedUpdate(post._id, e.target.value);
                      // Ajuster la hauteur automatiquement
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                    onFocus={(e) => {
                      // Ajuster la hauteur au focus
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                  />
                  
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/60">
                        Marque: {post.brandId?.name || 'Non spécifiée'}
                      </span>
                    </div>
                    
                    {/* Section des produits */}
                    {post.products && post.products.length > 0 && (
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-white/80 mb-2">
                          Produits mis en avant :
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {post.products.map(product => (
                            <div
                              key={product._id}
                              className="flex items-center bg-white/5 rounded-lg px-3 py-1.5"
                            >
                              {product.images?.main && (
                                <img
                                  src={config.getImageUrl(product.images.main)}
                                  alt={product.name}
                                  className="w-6 h-6 rounded-full object-cover mr-2"
                                />
                              )}
                              <span className="text-sm text-white/80">{product.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Insights Stratégiques */}
                    {(post.competitiveEdge || post.audienceTargeting || post.culturalRelevance || post.legalCompliance) && (
                      <details className="mt-4 group">
                        <summary className="cursor-pointer text-sm font-medium text-[#53dfb2] hover:text-[#53dfb2]/80 transition-colors flex items-center">
                          <svg className="w-4 h-4 mr-2 transform group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                          Insights Stratégiques
                        </summary>
                        
                        <div className="mt-3 space-y-3 pl-6">
                          {post.audienceTargeting && (
                            <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                              <h5 className="text-xs font-semibold text-blue-400 mb-1 flex items-center">
                                🎯 Ciblage Audience
                              </h5>
                              <p className="text-xs text-white/70 leading-relaxed">{post.audienceTargeting}</p>
                            </div>
                          )}
                          
                          {post.competitiveEdge && (
                            <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                              <h5 className="text-xs font-semibold text-purple-400 mb-1 flex items-center">
                                ⚔️ Avantage Concurrentiel
                              </h5>
                              <p className="text-xs text-white/70 leading-relaxed">{post.competitiveEdge}</p>
                            </div>
                          )}
                          
                          {post.culturalRelevance && (
                            <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                              <h5 className="text-xs font-semibold text-green-400 mb-1 flex items-center">
                                🌍 Pertinence Culturelle
                              </h5>
                              <p className="text-xs text-white/70 leading-relaxed">{post.culturalRelevance}</p>
                            </div>
                          )}
                          
                          {post.legalCompliance && (
                            <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                              <h5 className="text-xs font-semibold text-yellow-400 mb-1 flex items-center">
                                ⚖️ Conformité Légale
                              </h5>
                              <p className="text-xs text-white/70 leading-relaxed">{post.legalCompliance}</p>
                            </div>
                          )}
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        ))
      )}
    </div>
  );
};

export default Results;
