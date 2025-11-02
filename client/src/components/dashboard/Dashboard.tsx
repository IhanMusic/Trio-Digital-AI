import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { config } from '../../config/env';
import { useAuthContext } from '../../contexts/AuthContext';

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
    _id: string;
  };
  validationScore?: number;
}

interface BrandStats {
  _id: string;
  name: string;
  postsCount: number;
  lastActivity: string;
}

const platformIcons: Record<string, string> = {
  facebook: '📘',
  instagram: '📸',
  twitter: '🐦',
  linkedin: '💼',
  tiktok: '🎵'
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [activeMarques, setActiveMarques] = useState<BrandStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Récupérer les posts récents
        const postsResponse = await fetch(
          `${config.apiUrl}/posts/recent`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        // Récupérer les statistiques des marques
        const brandsResponse = await fetch(
          `${config.apiUrl}/brands/stats`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (!postsResponse.ok || !brandsResponse.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const postsData = await postsResponse.json();
        const brandsData = await brandsResponse.json();

        setRecentPosts(postsData.data || []);
        setActiveMarques(brandsData.data || []);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="glass-panel p-8 rounded-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#53dfb2]"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-white to-[#53dfb2] bg-clip-text text-transparent">
            Tableau de bord
          </h1>
          <button
            onClick={() => navigate('/brands')}
            className="px-4 py-2 bg-[#53dfb2]/20 hover:bg-[#53dfb2]/30 text-[#53dfb2] rounded-lg transition-all duration-300"
          >
            Nouvelle Génération
          </button>
        </div>

        {/* Sections principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Section Dernière Génération */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <span className="mr-3">🎨</span>
                Dernière Génération
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    const currentIndex = recentPosts.findIndex(p => p._id === recentPosts[0]?._id);
                    if (currentIndex > 0) {
                      setRecentPosts(prev => {
                        const newPosts = [...prev];
                        [newPosts[currentIndex], newPosts[currentIndex - 1]] = 
                        [newPosts[currentIndex - 1], newPosts[currentIndex]];
                        return newPosts;
                      });
                    }
                  }}
                  className="p-2 bg-[#53dfb2]/20 hover:bg-[#53dfb2]/30 text-[#53dfb2] rounded-lg transition-all duration-300"
                  disabled={recentPosts.length <= 1}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    const currentIndex = recentPosts.findIndex(p => p._id === recentPosts[0]?._id);
                    if (currentIndex < recentPosts.length - 1) {
                      setRecentPosts(prev => {
                        const newPosts = [...prev];
                        [newPosts[currentIndex], newPosts[currentIndex + 1]] = 
                        [newPosts[currentIndex + 1], newPosts[currentIndex]];
                        return newPosts;
                      });
                    }
                  }}
                  className="p-2 bg-[#53dfb2]/20 hover:bg-[#53dfb2]/30 text-[#53dfb2] rounded-lg transition-all duration-300"
                  disabled={recentPosts.length <= 1}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {recentPosts[0] && (
              <div className="glass-panel overflow-hidden hover:scale-[1.02] transition-all duration-300 h-[600px] flex flex-col">
                {recentPosts[0].content.imageUrl && (
                  <div className="relative">
                    <img 
                      src={config.getImageUrl(recentPosts[0].content.imageUrl)} 
                      alt="Generated content"
                      className="w-full h-auto"
                    />
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-black/50 text-white">
                        {platformIcons[recentPosts[0].platform]} {recentPosts[0].platform}
                      </span>
                      {recentPosts[0].validationScore && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          recentPosts[0].validationScore >= 90 ? 'bg-[#53dfb2]/50 text-[#53dfb2]' :
                          recentPosts[0].validationScore >= 80 ? 'bg-yellow-500/50 text-yellow-400' :
                          'bg-red-500/50 text-red-400'
                        }`}>
                          {recentPosts[0].validationScore}%
                        </span>
                      )}
                    </div>
                  </div>
                )}
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-lg font-medium text-white">{recentPosts[0].brandId.name}</span>
                      <p className="text-sm text-white/60 mt-1">
                        {new Date(recentPosts[0].scheduledDate).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      recentPosts[0].status === 'pending_validation' ? 'bg-white/10 text-white' :
                      recentPosts[0].status === 'approved' ? 'bg-[#53dfb2]/20 text-[#53dfb2]' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {recentPosts[0].status === 'pending_validation' ? 'En validation' :
                       recentPosts[0].status === 'approved' ? 'Validé' : 'Refusé'}
                    </span>
                  </div>
                  <p className="text-white/80 leading-relaxed">{recentPosts[0].content.text}</p>
                </div>
              </div>
            )}
          </div>

          {/* Section Marques Actives */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <span className="mr-3">🎯</span>
                Marques Actives
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    const currentIndex = activeMarques.findIndex(m => m._id === activeMarques[0]?._id);
                    if (currentIndex > 0) {
                      setActiveMarques(prev => {
                        const newMarques = [...prev];
                        [newMarques[currentIndex], newMarques[currentIndex - 1]] = 
                        [newMarques[currentIndex - 1], newMarques[currentIndex]];
                        return newMarques;
                      });
                    }
                  }}
                  className="p-2 bg-[#53dfb2]/20 hover:bg-[#53dfb2]/30 text-[#53dfb2] rounded-lg transition-all duration-300"
                  disabled={activeMarques.length <= 1}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    const currentIndex = activeMarques.findIndex(m => m._id === activeMarques[0]?._id);
                    if (currentIndex < activeMarques.length - 1) {
                      setActiveMarques(prev => {
                        const newMarques = [...prev];
                        [newMarques[currentIndex], newMarques[currentIndex + 1]] = 
                        [newMarques[currentIndex + 1], newMarques[currentIndex]];
                        return newMarques;
                      });
                    }
                  }}
                  className="p-2 bg-[#53dfb2]/20 hover:bg-[#53dfb2]/30 text-[#53dfb2] rounded-lg transition-all duration-300"
                  disabled={activeMarques.length <= 1}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {activeMarques[0] && (
              <div className="glass-panel overflow-hidden hover:scale-[1.02] transition-all duration-300 h-[600px] flex flex-col">
                <div className="p-8 flex-1">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-2xl font-medium text-white mb-2">{activeMarques[0].name}</h3>
                      <p className="text-sm text-white/60">
                        Dernière activité: {new Date(activeMarques[0].lastActivity).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <span className="px-4 py-2 bg-[#53dfb2]/20 rounded-lg text-[#53dfb2] font-medium">
                      {activeMarques[0].postsCount} posts
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <span className="text-white/80">Posts ce mois</span>
                      <span className="text-[#53dfb2] font-medium">
                        {Math.floor(activeMarques[0].postsCount * 0.4)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <span className="text-white/80">En attente d'approbation</span>
                      <span className="text-[#53dfb2] font-medium">
                        {Math.floor(activeMarques[0].postsCount * 0.2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <span className="text-white/80">Planifiés</span>
                      <span className="text-[#53dfb2] font-medium">
                        {Math.floor(activeMarques[0].postsCount * 0.3)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/brands/${activeMarques[0]._id}`)}
                    className="w-full mt-8 px-4 py-3 bg-[#53dfb2]/20 hover:bg-[#53dfb2]/30 text-[#53dfb2] rounded-lg transition-all duration-300 text-center"
                  >
                    Voir les détails
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Rapide */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Navigation - Mes Marques */}
          <Link to="/brands" className="block">
            <div className="glass-panel overflow-hidden hover:scale-105 transition-all duration-300">
              <div className="px-6 py-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#53dfb2]/20 rounded-xl p-4">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-white">Mes Marques</h3>
                    <p className="mt-2 text-sm text-white/60">Gérer vos marques et leurs contenus</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Navigation - Mes Calendriers */}
          <Link to="/calendars" className="block">
            <div className="glass-panel overflow-hidden hover:scale-105 transition-all duration-300">
              <div className="px-6 py-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#53dfb2]/20 rounded-xl p-4">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-white">Mes Calendriers</h3>
                    <p className="mt-2 text-sm text-white/60">Planifier vos publications</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Navigation - Équipe */}
          <Link to="/team" className="block">
            <div className="glass-panel overflow-hidden hover:scale-105 transition-all duration-300">
              <div className="px-6 py-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#53dfb2]/20 rounded-xl p-4">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-white">Équipe</h3>
                    <p className="mt-2 text-sm text-white/60">Gérer vos collaborateurs</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Navigation - Profil */}
          <Link to="/profile" className="block">
            <div className="glass-panel overflow-hidden hover:scale-105 transition-all duration-300">
              <div className="px-6 py-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#53dfb2]/20 rounded-xl p-4">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-white">Profil</h3>
                    <p className="mt-2 text-sm text-white/60">Gérer vos informations</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Navigation - Facturation */}
          <Link to="/billing" className="block">
            <div className="glass-panel overflow-hidden hover:scale-105 transition-all duration-300">
              <div className="px-6 py-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#53dfb2]/20 rounded-xl p-4">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-white">Facturation</h3>
                    <p className="mt-2 text-sm text-white/60">Gérer votre abonnement</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Navigation - Statistiques */}
          <Link to="/stats" className="block">
            <div className="glass-panel overflow-hidden hover:scale-105 transition-all duration-300">
              <div className="px-6 py-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#53dfb2]/20 rounded-xl p-4">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-white">Statistiques</h3>
                    <p className="mt-2 text-sm text-white/60">Voir vos performances</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
