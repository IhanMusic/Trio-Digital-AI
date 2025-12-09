import React from 'react';
import { TechnicalField } from '../../constants/technicalFields';

interface Props {
  field: TechnicalField;
  value: any;
  onChange: (value: any) => void;
}

export const DynamicField: React.FC<Props> = ({ field, value, onChange }) => {
  const baseClasses = "w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#53dfb2] focus:border-transparent";
  
  const renderField = () => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            className={baseClasses}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
          />
        );
        
      case 'textarea':
        return (
          <textarea
            className={baseClasses}
            rows={3}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
          />
        );
        
      case 'number':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="number"
              className={baseClasses}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              min={field.min}
              max={field.max}
              placeholder={field.placeholder}
            />
            {field.unit && (
              <span className="text-white/60 text-sm">{field.unit}</span>
            )}
          </div>
        );
        
      case 'select':
        return (
          <select
            className={baseClasses}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">Sélectionner</option>
            {field.options?.map(option => (
              <option key={option} value={option} className="bg-gray-800 text-white">
                {option}
              </option>
            ))}
          </select>
        );
        
      case 'multiselect':
        return (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {field.options?.map(option => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-[#53dfb2] bg-white/10 border-white/20 rounded focus:ring-[#53dfb2] focus:ring-2"
                  checked={(value || []).includes(option)}
                  onChange={(e) => {
                    const currentValues = value || [];
                    if (e.target.checked) {
                      onChange([...currentValues, option]);
                    } else {
                      onChange(currentValues.filter((v: string) => v !== option));
                    }
                  }}
                />
                <span className="text-white text-sm">{option}</span>
              </label>
            ))}
          </div>
        );
        
      case 'boolean':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-[#53dfb2] bg-white/10 border-white/20 rounded focus:ring-[#53dfb2] focus:ring-2"
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
            />
            <span className="text-white">Oui</span>
          </label>
        );
        
      case 'tags':
        return (
          <div className="space-y-2">
            <input
              type="text"
              className={baseClasses}
              placeholder="Tapez et appuyez sur Entrée pour ajouter"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const newTag = e.currentTarget.value.trim();
                  if (newTag && !(value || []).includes(newTag)) {
                    onChange([...(value || []), newTag]);
                    e.currentTarget.value = '';
                  }
                }
              }}
            />
            <div className="flex flex-wrap gap-2">
              {(value || []).map((tag: string, index: number) => (
                <span key={index} className="inline-flex items-center bg-[#53dfb2]/20 text-[#53dfb2] px-3 py-1 rounded-full text-sm">
                  {tag}
                  <button
                    type="button"
                    className="ml-2 hover:text-red-400 transition-colors"
                    onClick={() => onChange((value || []).filter((_: any, i: number) => i !== index))}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        );
        
      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              min={field.min}
              max={field.max}
              value={value || field.min}
              onChange={(e) => onChange(parseInt(e.target.value))}
              style={{
                background: `linear-gradient(to right, #53dfb2 0%, #53dfb2 ${((value || field.min || 0) - (field.min || 0)) / ((field.max || 100) - (field.min || 0)) * 100}%, rgba(255,255,255,0.2) ${((value || field.min || 0) - (field.min || 0)) / ((field.max || 100) - (field.min || 0)) * 100}%, rgba(255,255,255,0.2) 100%)`
              }}
            />
            <div className="flex justify-between text-sm text-white/60">
              <span>{field.min}{field.unit}</span>
              <span className="text-[#53dfb2] font-medium">{value || field.min}{field.unit}</span>
              <span>{field.max}{field.unit}</span>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-white/80 mb-2">
        {field.label}
        {field.required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {renderField()}
    </div>
  );
};
