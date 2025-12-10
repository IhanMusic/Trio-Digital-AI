import React from 'react';

export type StatusType = 'draft' | 'generating' | 'active' | 'completed' | 'archived' | 'pending_validation' | 'approved' | 'rejected';

interface StatusConfig {
  label: string;
  icon: string;
  color: string;
  description?: string;
}

const STATUS_CONFIGS: Record<StatusType, StatusConfig> = {
  draft: {
    label: 'Brouillon',
    icon: '📝',
    color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    description: 'En attente de génération'
  },
  generating: {
    label: 'Génération',
    icon: '⚡',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    description: 'Création du contenu en cours...'
  },
  active: {
    label: 'En cours',
    icon: '🎯',
    color: 'bg-[#53dfb2]/20 text-[#53dfb2] border-[#53dfb2]/30',
    description: 'Posts en validation'
  },
  completed: {
    label: 'Terminé',
    icon: '✅',
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
    description: 'Tous les posts validés'
  },
  archived: {
    label: 'Archivé',
    icon: '📦',
    color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    description: 'Calendrier archivé'
  },
  pending_validation: {
    label: 'En validation',
    icon: '⏳',
    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    description: 'En attente de validation'
  },
  approved: {
    label: 'Validé',
    icon: '✓',
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
    description: 'Post validé'
  },
  rejected: {
    label: 'Refusé',
    icon: '✗',
    color: 'bg-red-500/20 text-red-400 border-red-500/30',
    description: 'Post refusé'
  }
};

interface StatusBadgeProps {
  status: StatusType;
  showIcon?: boolean;
  showDescription?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  showIcon = true,
  showDescription = false,
  size = 'md',
  className = ""
}) => {
  const config = STATUS_CONFIGS[status];
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  return (
    <div className="inline-flex flex-col items-start">
      <span 
        className={`
          ${config.color} 
          ${sizeClasses[size]}
          rounded-full 
          font-semibold 
          flex items-center space-x-1 
          border
          transition-all duration-300
          ${className}
        `}
      >
        {showIcon && <span>{config.icon}</span>}
        <span>{config.label}</span>
      </span>
      {showDescription && config.description && (
        <span className="text-xs text-white/60 mt-1 ml-1">
          {config.description}
        </span>
      )}
    </div>
  );
};

export default StatusBadge;
