import React from 'react';

interface StatsCardProps {
  icon: string;
  label: string;
  value: number | string;
  color?: string;
  subtitle?: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  icon, 
  label, 
  value, 
  color = 'text-[#53dfb2]',
  subtitle,
  className = ""
}) => {
  return (
    <div className={`glass-panel p-4 hover:scale-105 transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        {subtitle && (
          <span className="text-xs text-white/40">{subtitle}</span>
        )}
      </div>
      <div className={`text-3xl font-bold ${color} mb-1`}>
        {value}
      </div>
      <div className="text-sm text-white/60">
        {label}
      </div>
    </div>
  );
};

export default StatsCard;
