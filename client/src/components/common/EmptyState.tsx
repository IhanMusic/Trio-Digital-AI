import React from 'react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionLink?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📭',
  title,
  description,
  actionLabel,
  actionLink,
  onAction,
  className = ""
}) => {
  return (
    <div className={`glass-panel text-center py-16 px-6 ${className}`}>
      <div className="text-6xl mb-4 animate-float">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-white mb-3">
        {title}
      </h3>
      <p className="text-white/60 mb-8 max-w-md mx-auto">
        {description}
      </p>
      {(actionLabel && (actionLink || onAction)) && (
        <div>
          {actionLink ? (
            <Link
              to={actionLink}
              className="glass-button inline-flex items-center"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              {actionLabel}
            </Link>
          ) : (
            <button
              onClick={onAction}
              className="glass-button inline-flex items-center"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              {actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
