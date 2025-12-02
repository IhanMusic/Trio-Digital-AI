import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { config } from '../../config/env';
import { useAuthContext } from '../../contexts/AuthContext';
import CarouselViewer from './CarouselViewer';

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
  
  // Utiliser des refs pour éviter les dépendances circulaires
  const postsRef = useRef<Post[]>([]);
  const isPollingRef = useRef(false);

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

  // Fonction de refresh intelligente pour le polling - SANS dépendances circulaires
  const refreshPosts = useCallback(async () => {
    if (isPollingRef.current) {
      console.log('Polling déjà en cours, skip...');
      return;
    }
    
    try {
      isPollingRef.current = true;
      setIsPolling(true);
      
      console.log('🔄 Polling: Vérification des nouveaux posts...');
      
      const response = await fetch(
        `${config.apiUrl}/posts/calendar/${calendarId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (!response.ok) {
        console.error('❌ Erreur HTTP lors du refresh des posts:', response.status);
        return;
      }

      const result = await response.json();
      if (!result.success) {
        console.error('❌ Erreur API lors du refresh:', result.error);
        return;
      }

      const newPostsData = result.data;
      const currentPosts = postsRef.current;
      
      // Logique de comparaison améliorée
      let hasChanges = false;
      
      // Cas 1: Nouveaux posts ajoutés
      if (newPostsData.length > currentPosts.length) {
        console.log(`✅ ${newPostsData.length - currentPosts.length} nouveaux posts détectés`);
        hasChanges = true;
      }
      
      // Cas 2: Posts existants mis à jour (nouvelles images/vidéos)
      if (newPostsData.length === currentPosts.length) {
        const postsWithNewMedia = newPostsData.filter((newPost: Post) => {
          const existingPost = currentPosts.find(p => p._id === newPost._id);
          if (!existingPost) return false;
          
          // Vérifier si le post a reçu une nouvelle image ou vidéo
          const hadMedia = existingPost.content.imageUrl || existingPost.content.videoUrl;
          const hasMedia = newPost.content.imageUrl || newPost.content.videoUrl;
          
          return !hadMedia && hasMedia;
        });
        
        if (postsWithNewMedia.length > 0) {
          console.log(`✅ ${postsWithNewMedia.length} posts ont reçu leurs médias`);
          hasChanges = true;
        }
      }
      
      if (hasChanges) {
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
      // Continuer le polling même en cas d'erreur
    } finally {
      isPollingRef.current = false;
      setIsPolling(false);
    }
  }, [calendarId, token]); // PLUS de dépendance sur posts.length !

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${config.apiUrl}/posts/calendar/${calendarId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des posts');
        }

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.error || 'Erreur lors de la récupération des posts');
        }

        const postsData = result.data;
        
        // Charger les dimensions des images
        await Promise.all(postsData.map(loadImageDimensions));
        
        // Mettre à jour les refs ET les states
        postsRef.current = postsData;
        setPosts(postsData);
      } catch (error) {
        console.error('Erreur:', error);
        setError(error instanceof Error ? error.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [calendarId, token]);

  // Synchroniser postsRef avec posts state
  useEffect(() => {
    postsRef.current = posts;
  }, [posts]);

  // Système de polling automatique - SANS timeout et dépendances fixes
  useEffect(() => {
    if (posts.length === 0 || loading) return; // Pas de polling avant le premier chargement
    
    console.log('🚀 Démarrage du polling automatique pour les nouveaux posts');
    
    // Déterminer si la génération est probablement terminée
    const postsWithoutMedia = posts.filter(post => 
      !post.content.imageUrl && !post.content.videoUrl
    );
    
    console.log(`📊 État actuel: ${posts.length} posts total, ${postsWithoutMedia.length} sans média`);
    
    // Si tous les posts ont leurs médias, arrêter le polling
    if (postsWithoutMedia.length === 0 && posts.length > 0) {
      console.log('✅ Tous les posts ont leurs médias, arrêt du polling');
      return;
    }
    
    // Démarrer le polling toutes les 10 secondes
    const interval = setInterval(() => {
      refreshPosts();
    }, 10000);
    
    // PLUS de timeout ! Le polling continue indéfiniment jusqu'à ce que tous les posts aient leurs médias
    
    return () => {
      console.log('🛑 Nettoyage du polling');
      clearInterval(interval);
    };
  }, [posts.length, loading]); // PLUS de dépendance sur refreshPosts !

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

  // Grouper les posts par plateforme
  const groupedPosts = posts.reduce<Record<string, Post[]>>((acc, post) => {
    const platform = post.platform;
    if (!acc[platform]) {
      acc[platform] = [];
    }
    acc[platform].push(post);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-10">
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
      
      {Object.entries(groupedPosts).map(([platform, platformPosts]) => (
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
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        post.status === 'pending_validation' ? 'bg-white/10 text-white' :
                        post.status === 'approved' ? 'bg-[#53dfb2]/20 text-[#53dfb2]' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {post.status === 'pending_validation' ? 'En validation' :
                         post.status === 'approved' ? 'Validé' : 'Refusé'}
                      </span>
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
      ))}
    </div>
  );
};

export default Results;
