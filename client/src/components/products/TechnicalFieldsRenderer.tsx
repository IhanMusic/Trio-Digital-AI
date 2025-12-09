import React from 'react';
import { TECHNICAL_FIELDS_BY_SECTOR } from '../../constants/technicalFields';
import { DynamicField } from './DynamicField';

interface Props {
  sector: string;
  formData: any;
  setFormData: (updater: (prev: any) => any) => void;
}

export const TechnicalFieldsRenderer: React.FC<Props> = ({ sector, formData, setFormData }) => {
  const fields = TECHNICAL_FIELDS_BY_SECTOR[sector] || [];
  
  if (fields.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-2 bg-[#53dfb2]/10 border border-[#53dfb2]/30 rounded-lg p-4">
        <svg className="w-5 h-5 text-[#53dfb2] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <p className="text-sm text-[#53dfb2]">
          Détails techniques spécifiques au secteur <strong>{sector}</strong>
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <DynamicField
            key={field.key}
            field={field}
            value={formData.technicalDetails?.[field.key]}
            onChange={(value) => {
              setFormData(prev => ({
                ...prev,
                technicalDetails: {
                  ...prev.technicalDetails,
                  [field.key]: value
                }
              }));
            }}
          />
        ))}
      </div>
    </div>
  );
};
