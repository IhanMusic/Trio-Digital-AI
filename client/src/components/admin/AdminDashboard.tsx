import React from 'react';
import { useAdminData } from '../../hooks/useAdminData';
import StatsCard from '../common/StatsCard';
import EmptyState from '../common/EmptyState';

// Icônes SVG simples
const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Activity = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const AdminDashboard: React.FC = () => {
  const { stats, users, loading, error, refreshStats } = useAdminData();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-panel p-6 animate-pulse">
              <div className="h-4 bg-white/20 rounded mb-4"></div>
              <div className="h-8 bg-white/20 rounded mb-2"></div>
              <div className="h-3 bg-white/20 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <button
            onClick={refreshStats}
            className="glass-button px-4 py-2 text-sm"
          >
            Réessayer
          </button>
        </div>
        
        <div className="glass-panel p-8">
          <div className="text-center">
            <div className="text-red-400 mb-4">⚠️</div>
            <h3 className="text-lg font-medium text-white mb-2">Erreur de chargement</h3>
            <p className="text-white/60 mb-4">{error}</p>
            <button
              onClick={refreshStats}
              className="glass-button px-6 py-2"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-white/60 mt-1">Vue d'ensemble de votre plateforme</p>
        </div>
        <button
          onClick={refreshStats}
          className="glass-button px-4 py-2 text-sm"
        >
          Actualiser
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon="👥"
          label="Utilisateurs totaux"
          value={stats?.totalUsers || 0}
          color="text-[#53dfb2]"
          subtitle="Inscrits"
        />
        
        <StatsCard
          icon="🟢"
          label="Utilisateurs actifs"
          value={stats?.activeUsers || 0}
          color="text-green-400"
          subtitle="Ce mois"
        />
        
        <StatsCard
          icon="⚡"
          label="Générations AI"
          value={stats?.totalGenerations || 0}
          color="text-yellow-400"
          subtitle="Total"
        />
        
        <StatsCard
          icon="📈"
          label="Ce mois"
          value={stats?.generationsThisMonth || 0}
          color="text-blue-400"
          subtitle="Générations"
        />
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            État du système
          </h3>
          
          <div className="space-y-3">
            {stats?.systemHealth && Object.entries(stats.systemHealth).map(([service, status]) => (
              <div key={service} className="flex items-center justify-between">
                <span className="text-white/80 capitalize">
                  {service.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </span>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    status === 'healthy' ? 'bg-green-400' :
                    status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                  }`} />
                  <span className={`text-sm ${
                    status === 'healthy' ? 'text-green-400' :
                    status === 'warning' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {status === 'healthy' ? 'Opérationnel' :
                     status === 'warning' ? 'Attention' : 'Erreur'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Utilisateurs récents
          </h3>
          
          {(users || []).length > 0 ? (
            <div className="space-y-3">
              {(users || []).slice(0, 5).map((user) => (
                <div key={user._id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#53dfb2] to-[#3fa88a] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{user.name}</p>
                      <p className="text-white/60 text-xs">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      user.role === 'owner' ? 'bg-purple-500/20 text-purple-300' :
                      user.role === 'admin' ? 'bg-red-500/20 text-red-300' :
                      user.role === 'editor' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Aucun utilisateur"
              description="Les utilisateurs récents apparaîtront ici"
            />
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Actions rapides</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="glass-panel p-4 hover:scale-105 transition-all duration-200 text-left">
            <Users className="w-8 h-8 text-[#53dfb2] mb-2" />
            <h4 className="text-white font-medium mb-1">Gérer les utilisateurs</h4>
            <p className="text-white/60 text-sm">Ajouter, modifier ou supprimer des utilisateurs</p>
          </button>
          
          <button className="glass-panel p-4 hover:scale-105 transition-all duration-200 text-left">
            <Activity className="w-8 h-8 text-[#53dfb2] mb-2" />
            <h4 className="text-white font-medium mb-1">Monitoring</h4>
            <p className="text-white/60 text-sm">Surveiller les performances du système</p>
          </button>
          
          <button className="glass-panel p-4 hover:scale-105 transition-all duration-200 text-left">
            <TrendingUp className="w-8 h-8 text-[#53dfb2] mb-2" />
            <h4 className="text-white font-medium mb-1">Rapports</h4>
            <p className="text-white/60 text-sm">Consulter les statistiques détaillées</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
