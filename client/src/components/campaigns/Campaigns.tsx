import React, { useState } from 'react';
import CampaignsList from './CampaignsList';
import CampaignForm from './CampaignForm';
import CampaignDashboard from './CampaignDashboard';
import { ICampaign } from '../../types/campaign';
import { postWithAuth } from '../../utils/apiUtils';
import { config } from '../../config/env';

type ViewMode = 'list' | 'create' | 'view';

const Campaigns: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedCampaign, setSelectedCampaign] = useState<ICampaign | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateNew = () => {
    setSelectedCampaign(null);
    setViewMode('create');
  };

  const handleViewCampaign = (campaign: ICampaign) => {
    setSelectedCampaign(campaign);
    setViewMode('view');
  };

  const handleBackToList = () => {
    setSelectedCampaign(null);
    setViewMode('list');
  };

  const handleSubmitCampaign = async (campaignData: any) => {
    try {
      setIsLoading(true);
      console.log('🚀 Création de campagne avec postWithAuth...');
      
      // Utiliser la même approche que les calendriers
      const response = await postWithAuth(`${config.apiUrl}/campaigns`, campaignData);
      console.log('📡 Réponse API campaigns:', response);
      
      if (response.success) {
        // Rediriger vers le dashboard de la campagne créée
        setSelectedCampaign(response.data);
        setViewMode('view');
        console.log('✅ Campagne créée avec succès:', response.data);
      } else {
        console.error('❌ Échec de création:', response);
        alert('Erreur lors de la création de la campagne: ' + (response.message || 'Erreur inconnue'));
      }
    } catch (error: any) {
      console.error('❌ Erreur lors de la création de la campagne:', error);
      alert(error.message || 'Erreur lors de la création de la campagne');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCampaign = () => {
    // Pour l'instant, on redirige vers la liste
    // Plus tard, on pourra implémenter l'édition
    setViewMode('list');
  };

  // Vue liste des campagnes
  if (viewMode === 'list') {
    return (
      <CampaignsList
        onCreateNew={handleCreateNew}
        onViewCampaign={handleViewCampaign}
      />
    );
  }

  // Vue création de campagne
  if (viewMode === 'create') {
    return (
      <CampaignForm
        onSubmit={handleSubmitCampaign}
        onCancel={handleBackToList}
        isLoading={isLoading}
      />
    );
  }

  // Vue détail/dashboard de campagne
  if (viewMode === 'view' && selectedCampaign) {
    return (
      <CampaignDashboard
        campaign={selectedCampaign}
        onBack={handleBackToList}
        onEdit={handleEditCampaign}
      />
    );
  }

  // Fallback
  return (
    <CampaignsList
      onCreateNew={handleCreateNew}
      onViewCampaign={handleViewCampaign}
    />
  );
};

export default Campaigns;
