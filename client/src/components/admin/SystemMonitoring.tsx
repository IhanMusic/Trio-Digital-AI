import React, { useState, useEffect } from 'react';
import StatsCard from '../common/StatsCard';
import EmptyState from '../common/EmptyState';

// Icônes SVG
const Activity = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const Server = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

const Database = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

const Cpu = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AlertTriangle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  service: string;
  user?: string;
}

interface SystemMetrics {
  cpu: number;
  memory: number;
  storage: number;
  uptime: string;
  activeUsers: number;
  apiCalls: number;
  errors: number;
}

const SystemMonitoring: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 45,
    memory: 68,
    storage: 32,
    uptime: '7j 14h 32m',
    activeUsers: 24,
    apiCalls: 1247,
    errors: 3
  });
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des logs
    const mockLogs: LogEntry[] = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        level: 'info',
        message: 'Génération de contenu réussie pour la marque Nike',
        service: 'AI Service',
        user: 'john@example.com'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        level: 'warning',
        message: 'Limite de quota approchée pour l\'utilisateur premium',
        service: 'Quota Service',
        user: 'marie@example.com'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        level: 'error',
        message: 'Échec de connexion à l\'API Gemini - Retry automatique',
        service: 'External API',
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        level: 'info',
        message: 'Nouveau utilisateur inscrit',
        service: 'Auth Service',
        user: 'nouveau@example.com'
      },
      {
        id: '5',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        level: 'info',
        message: 'Sauvegarde automatique des données effectuée',
        service: 'Database',
      }
    ];

    setTimeout(() => {
      setLogs(mockLogs);
      setLoading(false);
    }, 1000);

    // Simuler la mise à jour des métriques en temps réel
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: Math.max(20, Math.min(80, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(90, prev.memory + (Math.random() - 0.5) * 5)),
        apiCalls: prev.apiCalls + Math.floor(Math.random() * 3)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(log => 
    selectedLevel === 'all' || log.level === selectedLevel
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'info': return 'text-blue-400';
      default: return 'text-white/60';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'info': return <Activity className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Monitoring Système</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-panel p-6 animate-pulse">
              <div className="h-4 bg-white/20 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-white/20 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Monitoring Système</h1>
          <p className="text-white/60 mt-1">
            Surveillance en temps réel des performances et activités
          </p>
        </div>
        <div className="flex items-center space-x-2 text-green-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium">Système opérationnel</span>
        </div>
      </div>

      {/* Métriques système */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          label="CPU"
          value={`${metrics.cpu.toFixed(1)}%`}
          icon="💻"
          color={metrics.cpu > 70 ? 'text-red-400' : 'text-green-400'}
        />
        
        <StatsCard
          label="Mémoire"
          value={`${metrics.memory.toFixed(1)}%`}
          icon="🧠"
          color={metrics.memory > 80 ? 'text-red-400' : 'text-green-400'}
        />
        
        <StatsCard
          label="Stockage"
          value={`${metrics.storage}%`}
          icon="💾"
          color="text-green-400"
        />
        
        <StatsCard
          label="Uptime"
          value={metrics.uptime}
          icon="⏰"
          color="text-green-400"
        />
      </div>

      {/* Métriques d'activité */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          label="Utilisateurs actifs"
          value={metrics.activeUsers.toString()}
          icon="👥"
          color="text-blue-400"
        />
        
        <StatsCard
          label="Appels API"
          value={metrics.apiCalls.toString()}
          icon="🔗"
          color="text-green-400"
        />
        
        <StatsCard
          label="Erreurs"
          value={metrics.errors.toString()}
          icon="⚠️"
          color={metrics.errors > 5 ? 'text-red-400' : 'text-green-400'}
        />
      </div>

      {/* Logs d'activité */}
      <div className="glass-panel">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Logs d'activité</h2>
            <div className="flex space-x-2">
              {['all', 'info', 'warning', 'error'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    selectedLevel === level
                      ? 'bg-[#53dfb2] text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {level === 'all' ? 'Tous' : level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {filteredLogs.length > 0 ? (
            <div className="divide-y divide-white/5">
              {filteredLogs.map((log) => (
                <div key={log.id} className="p-4 hover:bg-white/5 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className={`mt-1 ${getLevelColor(log.level)}`}>
                      {getLevelIcon(log.level)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-white font-medium">{log.message}</p>
                        <span className="text-white/40 text-sm">
                          {formatTimestamp(log.timestamp)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-white/60 text-sm">{log.service}</span>
                        {log.user && (
                          <span className="text-white/40 text-sm">• {log.user}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6">
              <EmptyState
                title="Aucun log trouvé"
                description="Aucune activité ne correspond aux filtres sélectionnés"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemMonitoring;
