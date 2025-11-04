import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWithAuth } from '../../utils/apiUtils';
import { config } from '../../config/env';
import Logo from '../common/Logo';
import './EnhancedGenerationProgress.css';

interface GenerationStep {
  id: string;
  title: string;
  description: string;
  estimatedDuration: number; // en secondes
  completed: boolean;
  current: boolean;
  error?: string;
}

interface GenerationStats {
  totalPosts: number;
  completedPosts: number;
  currentStep: string;
  estimatedTimeRemaining: number;
  startTime: number;
}

interface EnhancedGenerationProgressProps {
  calendarId: string;
  brandName?: string;
  expectedPosts?: number;
}

const GENERATION_STEPS: Omit<GenerationStep, 'completed' | 'current' | 'error'>[] = [
  {
    id: 'initialization',
    title: 'Initialisation',
    description: 'Préparation des données de votre marque et produits',
    estimatedDuration: 5
  },
  {
    id: 'content_generation',
    title: 'Génération du contenu',
    description: 'Création des textes avec GPT-5 et sélection des presets créatifs',
    estimatedDuration: 30
  },
  {
    id: 'image_generation',
    title: 'Création des images',
    description: 'Génération des visuels avec Gemini et optimisation Cannes Lions',
    estimatedDuration: 45
  },
  {
    id: 'video_generation',
    title: 'Création des vidéos',
    description: 'Animation des REELs avec VEO3 (si activé)',
    estimatedDuration: 60
  },
  {
    id: 'finalization',
    title: 'Finalisation',
    description: 'Sauvegarde et organisation de votre calendrier éditorial',
    estimatedDuration: 10
  }
];

const EnhancedGenerationProgress: React.FC<EnhancedGenerationProgressProps> = ({
  calendarId,
  brandName = 'votre marque',
  expectedPosts = 10
}) => {
  const navigate = useNavigate();
  const [steps, setSteps] = useState<GenerationStep[]>(
    GENERATION_STEPS.map(step => ({ ...step, completed: false, current: false }))
  );
  const [stats, setStats] = useState<GenerationStats>({
    totalPosts: expectedPosts,
    completedPosts: 0,
    currentStep: 'initialization',
    estimatedTimeRemaining: 150, // 2.5 minutes par défaut
    startTime: Date.now()
  });
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Polling pour vérifier le statut de génération
  const checkGenerationStatus = useCallback(async () => {
    try {
      const response = await getWithAuth(`${config.apiUrl}/calendars/${calendarId}/generation-status`);
      
      if (response.success && response.data) {
        const { status, progress, currentStep, error: serverError, posts } = response.data;
        
        if (serverError) {
          setError(serverError);
          return;
        }

        // Mettre à jour les statistiques
        setStats(prev => ({
          ...prev,
          completedPosts: posts?.length || 0,
          currentStep: currentStep || prev.currentStep,
          estimatedTimeRemaining: Math.max(0, prev.estimatedTimeRemaining - 2) // Décrémenter de 2s à chaque poll
        }));

        // Mettre à jour les étapes
        setSteps(prevSteps => 
          prevSteps.map(step => {
            if (step.id === currentStep) {
              return { ...step, current: true, completed: false };
            } else if (GENERATION_STEPS.findIndex(s => s.id === step.id) < GENERATION_STEPS.findIndex(s => s.id === currentStep)) {
              return { ...step, current: false, completed: true };
            } else {
              return { ...step, current: false, completed: false };
            }
          })
        );

        // Vérifier si la génération est terminée
        if (status === 'completed') {
          setIsComplete(true);
          setTimeout(() => {
            navigate(`/results/${calendarId}`);
          }, 2000);
        } else if (status === 'error') {
          setError('Une erreur est survenue lors de la génération. Veuillez réessayer.');
        }
      }
    } catch (err) {
      console.error('Erreur lors de la vérification du statut:', err);
      // Ne pas afficher d'erreur immédiatement, continuer à essayer
    }
  }, [calendarId, navigate]);

  // Fallback: vérifier directement les posts générés si l'endpoint de statut n'existe pas
  const checkPostsDirectly = useCallback(async () => {
    try {
      const response = await getWithAuth(`${config.apiUrl}/posts/calendar/${calendarId}`);
      
      if (response.success && response.data) {
        const posts = response.data;
        const completedPosts = posts.filter((post: any) => post.content.imageUrl || post.content.videoUrl).length;
        
        setStats(prev => ({
          ...prev,
          completedPosts,
          estimatedTimeRemaining: Math.max(0, prev.estimatedTimeRemaining - 2)
        }));

        // Simuler la progression des étapes basée sur le nombre de posts
        const progressPercentage = (completedPosts / expectedPosts) * 100;
        let currentStepId = 'initialization';
        
        if (progressPercentage > 80) {
          currentStepId = 'finalization';
        } else if (progressPercentage > 60) {
          currentStepId = 'video_generation';
        } else if (progressPercentage > 30) {
          currentStepId = 'image_generation';
        } else if (progressPercentage > 10) {
          currentStepId = 'content_generation';
        }

        setSteps(prevSteps => 
          prevSteps.map(step => {
            if (step.id === currentStepId) {
              return { ...step, current: true, completed: false };
            } else if (GENERATION_STEPS.findIndex(s => s.id === step.id) < GENERATION_STEPS.findIndex(s => s.id === currentStepId)) {
              return { ...step, current: false, completed: true };
            } else {
              return { ...step, current: false, completed: false };
            }
          })
        );

        // Vérifier si tous les posts sont générés
        if (completedPosts >= expectedPosts) {
          setIsComplete(true);
          setTimeout(() => {
            navigate(`/results/${calendarId}`);
          }, 2000);
        }
      }
    } catch (err) {
      console.error('Erreur lors de la vérification des posts:', err);
    }
  }, [calendarId, expectedPosts, navigate]);

  // Timer pour le temps écoulé
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - stats.startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [stats.startTime]);

  // Polling principal
  useEffect(() => {
    // Première vérification immédiate
    checkGenerationStatus().catch(() => {
      // Si l'endpoint de statut n'existe pas, utiliser le fallback
      checkPostsDirectly();
    });

    // Polling toutes les 2 secondes
    const interval = setInterval(() => {
      checkGenerationStatus().catch(() => {
        checkPostsDirectly();
      });
    }, 2000);

    // Timeout de sécurité après 5 minutes
    const timeout = setTimeout(() => {
      setError('La génération prend plus de temps que prévu. Veuillez vérifier vos résultats ou réessayer.');
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [checkGenerationStatus, checkPostsDirectly]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const overallProgress = steps.filter(step => step.completed).length / steps.length * 100;
  const postsProgress = (stats.completedPosts / stats.totalPosts) * 100;

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Erreur de génération</h2>
          <p className="text-white/60 mb-6 max-w-md">{error}</p>
          <div className="space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="glass-button"
            >
              Réessayer
            </button>
            <button
              onClick={() => navigate('/calendars')}
              className="glass-button bg-white/10 hover:bg-white/20"
            >
              Retour aux calendriers
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-[#53dfb2] bg-clip-text text-transparent mb-4">
            Génération Terminée !
          </h2>
          <p className="text-white/60 mb-4">
            {stats.completedPosts} publications créées avec succès
          </p>
          <p className="text-white/40 text-sm">
            Redirection vers vos résultats...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Logo et Animation */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#53dfb2] to-[#2d2d67] rounded-full blur-xl opacity-20 animate-pulse"></div>
        <Logo size="large" color="white" className="relative z-10" />
      </div>

      {/* Message Principal */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-[#53dfb2] bg-clip-text text-transparent mb-4">
          Génération en cours pour {brandName}
        </h2>
        <p className="text-white/60 max-w-md mb-4">
          Notre IA crée du contenu premium optimisé pour vos réseaux sociaux. 
          Chaque publication est unique et adaptée à votre marque.
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-white/40">
          <span>⏱️ Temps écoulé: {formatTime(elapsedTime)}</span>
          <span>⏳ Temps restant: ~{formatTime(stats.estimatedTimeRemaining)}</span>
        </div>
      </div>

      {/* Barre de progression globale */}
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-between text-sm text-white/60 mb-2">
          <span>Progression globale</span>
          <span>{Math.round(overallProgress)}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#53dfb2] to-[#3fa88a] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Progression des posts */}
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-between text-sm text-white/60 mb-2">
          <span>Publications créées</span>
          <span>{stats.completedPosts}/{stats.totalPosts}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#53dfb2]/60 to-[#3fa88a]/60 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${postsProgress}%` }}
          />
        </div>
      </div>

      {/* Étapes détaillées */}
      <div className="w-full max-w-2xl mb-8">
        <h3 className="text-lg font-semibold text-white/80 mb-4 text-center">Étapes de génération</h3>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center space-x-4">
              {/* Icône d'état */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                step.completed 
                  ? 'bg-green-500/20 text-green-400' 
                  : step.current 
                    ? 'bg-[#53dfb2]/20 text-[#53dfb2]' 
                    : 'bg-white/10 text-white/40'
              }`}>
                {step.completed ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : step.current ? (
                  <div className="w-3 h-3 rounded-full bg-current animate-pulse" />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>

              {/* Contenu de l'étape */}
              <div className="flex-1 min-w-0">
                <div className={`font-medium ${
                  step.completed 
                    ? 'text-green-400' 
                    : step.current 
                      ? 'text-[#53dfb2]' 
                      : 'text-white/60'
                }`}>
                  {step.title}
                  {step.current && (
                    <span className="ml-2 text-xs text-white/40">en cours...</span>
                  )}
                </div>
                <div className="text-sm text-white/40 mt-1">
                  {step.description}
                </div>
              </div>

              {/* Durée estimée */}
              <div className="flex-shrink-0 text-xs text-white/30">
                ~{step.estimatedDuration}s
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conseils pendant l'attente */}
      <div className="max-w-2xl w-full">
        <div className="glass-panel p-6 rounded-xl">
          <h4 className="text-lg font-medium text-white/80 mb-3">💡 Le saviez-vous ?</h4>
          <div className="text-white/60 text-sm space-y-2">
            <p>• Chaque publication est générée avec GPT-5 et optimisée selon les standards Cannes Lions</p>
            <p>• Les images sont créées avec Gemini et scorées automatiquement pour garantir la qualité</p>
            <p>• Les vidéos REELs utilisent VEO3 pour une animation cinématographique</p>
            <p>• Le contenu est adapté aux spécificités de chaque réseau social</p>
          </div>
        </div>
      </div>

      {/* Bouton d'annulation */}
      <div className="mt-8">
        <button
          onClick={() => {
            if (window.confirm('Êtes-vous sûr de vouloir annuler la génération ?')) {
              navigate('/calendars');
            }
          }}
          className="glass-button bg-white/5 hover:bg-white/10 text-white/60 hover:text-white/80"
        >
          Annuler la génération
        </button>
      </div>
    </div>
  );
};

export default EnhancedGenerationProgress;
