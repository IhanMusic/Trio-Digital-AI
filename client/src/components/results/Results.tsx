import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { config } from '../../config/env';
import { useAuthContext } from '../../contexts/AuthContext';

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
    imageWidth?: number;
    imageHeight?: number;
  };
  status: 'pending_validation' | 'approved' | 'rejected';
  brandId: {
    name: string;
  };
  products?: Product[]; // Produits associés au post
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
      const response = await fetch(config.getImageUrl(imageUrl));
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${platform}-post-${postId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
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
      <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-white to-[#53dfb2] bg-clip-text text-transparent">
        Publications Générées
      </h1>
      
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
                {post.content.imageUrl && (
                  <div style={getImageStyle(post)} className="relative">
                    <div className="absolute top-0 right-0 p-2 z-10">
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
                )}
                
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
