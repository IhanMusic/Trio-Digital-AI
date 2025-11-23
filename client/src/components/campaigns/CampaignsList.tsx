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
    // Pour l'instant, on simule un chargement rapide et on affiche l'état vide
    const timer = setTimeout(() => {
      console.log('Simulation de chargement terminée, affichage état vide');
      setCampaigns([]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
    
    // Commenté temporairement pour éviter les erreurs
    // fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Tentative de chargement des campagnes...');
      const response = await apiClient.get('/api/campaigns');
      console.log('Réponse API campaigns:', response.data);
      
      if (response.data.success) {
        setCampaigns(response.data.data || []);
      } else {
        console.warn('API response not successful:', response.data);
        setError('Erreur lors du chargement des campagnes');
      }
    } catch (error: any) {
      console.error('Erreur lors du chargement des campagnes:', error);
      
      // Si c'est une erreur 404 ou que l'endpoint n'existe pas encore, on affiche un état vide
      if (error.response?.status === 404) {
        console.log('Endpoint campaigns non trouvé, affichage état vide');
        setCampaigns([]);
        setError(null);
      } else {
        setError(error.response?.data?.message || `Erreur de connexion: ${error.message}`);
      }
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="glass-panel p-8 rounded-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#53dfb2]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="glass-panel border-red-500/30 px-6 py-4 rounded-xl">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-400">Erreur</h3>
              <div className="mt-2 text-sm text-red-300">{error}</div>
              <div className="mt-4">
                <button
                  onClick={fetchCampaigns}
                  className="glass-button bg-red-500/20 hover:bg-red-500/30 px-3 py-2 text-sm"
                >
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-[#53dfb2] bg-clip-text text-transparent">
            Campagnes Marketing
          </h1>
          <p className="text-white/60 mt-1">
            Gérez vos campagnes générées automatiquement avec GPT-5
          </p>
        </div>
        <button
          onClick={onCreateNew}
          className="glass-button inline-flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nouvelle campagne
        </button>
      </div>

      {/* Filtres et recherche */}
      <div className="glass-panel p-6 rounded-xl mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher par nom de campagne ou marque..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input"
            />
          </div>
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="glass-input"
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass-panel p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
          <div className="text-2xl font-bold text-[#53dfb2]">{campaigns.length}</div>
          <div className="text-sm text-white/60">Total campagnes</div>
        </div>
        <div className="glass-panel p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
          <div className="text-2xl font-bold text-green-400">
            {campaigns.filter(c => c.status === 'active').length}
          </div>
          <div className="text-sm text-white/60">Actives</div>
        </div>
        <div className="glass-panel p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
          <div className="text-2xl font-bold text-yellow-400">
            {campaigns.filter(c => c.status === 'draft').length}
          </div>
          <div className="text-sm text-white/60">Brouillons</div>
        </div>
        <div className="glass-panel p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
          <div className="text-2xl font-bold text-purple-400">
            {campaigns.filter(c => c.budget?.total).reduce((sum, c) => sum + (c.budget?.total || 0), 0).toLocaleString()}€
          </div>
          <div className="text-sm text-white/60">Budget total</div>
        </div>
      </div>

      {/* Liste des campagnes */}
      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-white/40 text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-white mb-2">
            {campaigns.length === 0 ? 'Aucune campagne créée' : 'Aucune campagne trouvée'}
          </h3>
          <p className="text-white/60 mb-6">
            {campaigns.length === 0 
              ? 'Créez votre première campagne marketing automatisée avec GPT-5'
              : 'Essayez de modifier vos filtres de recherche'
            }
          </p>
          {campaigns.length === 0 && (
            <button
              onClick={onCreateNew}
              className="glass-button"
            >
              Créer ma première campagne
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign) => {
            const daysRemaining = getDaysRemaining(campaign.endDate);
            const isExpired = daysRemaining < 0;
            const isExpiringSoon = daysRemaining <= 7 && daysRemaining >= 0;

            return (
              <div
                key={campaign._id}
                className="glass-panel overflow-hidden hover:scale-[1.02] transition-all duration-300"
              >
                <div className="p-6">
                  {/* En-tête de la carte */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">
                        {getCampaignTypeIcon(campaign.campaignType)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg">
                          {campaign.name}
                        </h3>
                        <p className="text-sm text-white/60">
                          {campaign.brandId.name} • {campaign.brandId.sector}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'active' ? 'bg-[#53dfb2]/20 text-[#53dfb2]' :
                      campaign.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
                      campaign.status === 'paused' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-white/10 text-white/60'
                    }`}>
                      {getCampaignStatusLabel(campaign.status)}
                    </span>
                  </div>

                  {/* Informations de la campagne */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Type:</span>
                      <span className="font-medium text-white/80">{getCampaignTypeLabel(campaign.campaignType)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Objectif:</span>
                      <span className="font-medium text-white/80">{getPrimaryObjectiveLabel(campaign.primaryObjective)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Période:</span>
                      <span className="font-medium text-white/80">
                        {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                      </span>
                    </div>
                    {campaign.budget && (
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Budget:</span>
                        <span className="font-medium text-[#53dfb2]">{campaign.budget.total.toLocaleString()}€</span>
                      </div>
                    )}
                  </div>

                  {/* Indicateur de temps restant */}
                  {campaign.status === 'active' && (
                    <div className={`text-sm mb-4 p-3 rounded-lg ${
                      isExpired 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                        : isExpiringSoon 
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-green-500/20 text-green-400 border border-green-500/30'
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
                    <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <div className="text-sm font-medium text-white">
                          {(campaign.influencerStrategy.recommendedProfiles.microInfluencers?.length || 0) +
                           (campaign.influencerStrategy.recommendedProfiles.midTierInfluencers?.length || 0) +
                           (campaign.influencerStrategy.recommendedProfiles.macroInfluencers?.length || 0)}
                        </div>
                        <div className="text-xs text-white/60">Influenceurs</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <div className="text-sm font-medium text-white">
                          {campaign.campaignPackage?.organicContent?.posts || 0}
                        </div>
                        <div className="text-xs text-white/60">Posts</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <div className="text-sm font-medium text-white">
                          {campaign.selectedProducts?.length || 0}
                        </div>
                        <div className="text-xs text-white/60">Produits</div>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm text-white/70 mb-4 line-clamp-2">
                    {campaign.description}
                  </p>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onViewCampaign(campaign)}
                      className="flex-1 glass-button text-xs py-2"
                    >
                      Voir détails
                    </button>
                    <button
                      onClick={() => handleRegenerateStrategy(campaign._id)}
                      className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 backdrop-blur-sm"
                      title="Régénérer la stratégie"
                    >
                      <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteCampaign(campaign._id)}
                      className="p-1.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-all duration-300 backdrop-blur-sm"
                      title="Supprimer"
                    >
                      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
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
