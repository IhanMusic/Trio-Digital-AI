import React, { useState, useEffect } from 'react';
import { apiClient } from '../../utils/apiClient';
import { ICampaign, getCampaignTypeLabel, getPrimaryObjectiveLabel, getCampaignStatusColor, getCampaignStatusLabel, CAMPAIGN_TYPES } from '../../types/campaign';

interface CampaignsListProps {
  onCreateNew: () => void;
  onViewCampaign: (campaign: ICampaign) => void;
}

const CampaignsList: React.FC<CampaignsListProps> = ({ onCreateNew, onViewCampaign }) => {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/campaigns');
      if (response.data.success) {
        setCampaigns(response.data.data);
      } else {
        setError('Erreur lors du chargement des campagnes');
      }
    } catch (error: any) {
      console.error('Erreur:', error);
      setError(error.response?.data?.message || 'Erreur lors du chargement des campagnes');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCampaign = async (campaignId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette campagne ?')) {
      return;
    }

    try {
      const response = await apiClient.delete(`/api/campaigns/${campaignId}`);
      if (response.data.success) {
        setCampaigns(prev => prev.filter(c => c._id !== campaignId));
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (error: any) {
      console.error('Erreur:', error);
      alert(error.response?.data?.message || 'Erreur lors de la suppression');
    }
  };

  const handleRegenerateStrategy = async (campaignId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir régénérer la stratégie ? Cela remplacera la stratégie actuelle.')) {
      return;
    }

    try {
      const response = await apiClient.post(`/api/campaigns/${campaignId}/regenerate-strategy`, {});
      if (response.data.success) {
        // Mettre à jour la campagne dans la liste
        setCampaigns(prev => prev.map(c => 
          c._id === campaignId ? response.data.data : c
        ));
        alert('Stratégie régénérée avec succès !');
      } else {
        alert('Erreur lors de la régénération');
      }
    } catch (error: any) {
      console.error('Erreur:', error);
      alert(error.response?.data?.message || 'Erreur lors de la régénération');
    }
  };

  // Filtrer les campagnes
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesFilter = filter === 'all' || campaign.status === filter || campaign.campaignType === filter;
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.brandId.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getCampaignTypeIcon = (type: string) => {
    const campaignType = CAMPAIGN_TYPES.find(t => t.value === type);
    return campaignType?.icon || '📋';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Erreur</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
            <div className="mt-4">
              <button
                onClick={fetchCampaigns}
                className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campagnes Marketing</h1>
          <p className="text-gray-600 mt-1">
            Gérez vos campagnes générées automatiquement avec GPT-5
          </p>
        </div>
        <button
          onClick={onCreateNew}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nouvelle campagne
        </button>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher par nom de campagne ou marque..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les types</option>
              <optgroup label="Par statut">
                <option value="draft">Brouillons</option>
                <option value="active">Actives</option>
                <option value="paused">En pause</option>
                <option value="completed">Terminées</option>
              </optgroup>
              <optgroup label="Par type">
                {CAMPAIGN_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-blue-600">{campaigns.length}</div>
          <div className="text-sm text-gray-600">Total campagnes</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-green-600">
            {campaigns.filter(c => c.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Actives</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-yellow-600">
            {campaigns.filter(c => c.status === 'draft').length}
          </div>
          <div className="text-sm text-gray-600">Brouillons</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-purple-600">
            {campaigns.filter(c => c.budget?.total).reduce((sum, c) => sum + (c.budget?.total || 0), 0).toLocaleString()}€
          </div>
          <div className="text-sm text-gray-600">Budget total</div>
        </div>
      </div>

      {/* Liste des campagnes */}
      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {campaigns.length === 0 ? 'Aucune campagne créée' : 'Aucune campagne trouvée'}
          </h3>
          <p className="text-gray-600 mb-6">
            {campaigns.length === 0 
              ? 'Créez votre première campagne marketing automatisée avec GPT-5'
              : 'Essayez de modifier vos filtres de recherche'
            }
          </p>
          {campaigns.length === 0 && (
            <button
              onClick={onCreateNew}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Créer ma première campagne
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => {
            const daysRemaining = getDaysRemaining(campaign.endDate);
            const isExpired = daysRemaining < 0;
            const isExpiringSoon = daysRemaining <= 7 && daysRemaining >= 0;

            return (
              <div
                key={campaign._id}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  {/* En-tête de la carte */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">
                        {getCampaignTypeIcon(campaign.campaignType)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {campaign.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {campaign.brandId.name} • {campaign.brandId.sector}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCampaignStatusColor(campaign.status)}`}>
                      {getCampaignStatusLabel(campaign.status)}
                    </span>
                  </div>

                  {/* Informations de la campagne */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{getCampaignTypeLabel(campaign.campaignType)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Objectif:</span>
                      <span className="font-medium">{getPrimaryObjectiveLabel(campaign.primaryObjective)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Période:</span>
                      <span className="font-medium">
                        {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                      </span>
                    </div>
                    {campaign.budget && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Budget:</span>
                        <span className="font-medium">{campaign.budget.total.toLocaleString()}€</span>
                      </div>
                    )}
                  </div>

                  {/* Indicateur de temps restant */}
                  {campaign.status === 'active' && (
                    <div className={`text-sm mb-4 p-2 rounded ${
                      isExpired 
                        ? 'bg-red-50 text-red-700' 
                        : isExpiringSoon 
                          ? 'bg-yellow-50 text-yellow-700'
                          : 'bg-green-50 text-green-700'
                    }`}>
                      {isExpired 
                        ? `Expirée depuis ${Math.abs(daysRemaining)} jour(s)`
                        : isExpiringSoon
                          ? `Se termine dans ${daysRemaining} jour(s)`
                          : `${daysRemaining} jours restants`
                      }
                    </div>
                  )}

                  {/* Métriques rapides */}
                  {campaign.influencerStrategy?.recommendedProfiles && (
                    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-sm font-medium">
                          {(campaign.influencerStrategy.recommendedProfiles.microInfluencers?.length || 0) +
                           (campaign.influencerStrategy.recommendedProfiles.midTierInfluencers?.length || 0) +
                           (campaign.influencerStrategy.recommendedProfiles.macroInfluencers?.length || 0)}
                        </div>
                        <div className="text-xs text-gray-600">Influenceurs</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-sm font-medium">
                          {campaign.campaignPackage?.organicContent?.posts || 0}
                        </div>
                        <div className="text-xs text-gray-600">Posts</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-sm font-medium">
                          {campaign.selectedProducts?.length || 0}
                        </div>
                        <div className="text-xs text-gray-600">Produits</div>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {campaign.description}
                  </p>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onViewCampaign(campaign)}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Voir détails
                    </button>
                    <button
                      onClick={() => handleRegenerateStrategy(campaign._id)}
                      className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
                      title="Régénérer la stratégie"
                    >
                      🔄
                    </button>
                    <button
                      onClick={() => handleDeleteCampaign(campaign._id)}
                      className="px-3 py-2 border border-red-300 text-red-600 rounded text-sm hover:bg-red-50 transition-colors"
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CampaignsList;
