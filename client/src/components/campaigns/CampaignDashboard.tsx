import React, { useState } from 'react';
import { ICampaign, getCampaignTypeLabel, getPrimaryObjectiveLabel, getCampaignStatusLabel, IInfluencerProfile } from '../../types/campaign';

interface CampaignDashboardProps {
  campaign: ICampaign;
  onBack: () => void;
  onEdit?: () => void;
}

const CampaignDashboard: React.FC<CampaignDashboardProps> = ({ campaign, onBack, onEdit }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'creative' | 'ads' | 'influencers' | 'content'>('overview');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getTierLabel = (tier: string) => {
    switch (tier) {
      case 'micro': return 'Micro-influenceurs';
      case 'mid': return 'Mid-tier';
      case 'macro': return 'Macro-influenceurs';
      default: return tier;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'micro': return 'bg-green-100 text-green-800';
      case 'mid': return 'bg-blue-100 text-blue-800';
      case 'macro': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderInfluencerProfile = (profile: IInfluencerProfile, index: number) => (
    <div key={profile.id} className="bg-white border rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-medium text-gray-900">Profil #{index + 1}</h4>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTierColor(profile.tier)}`}>
            {getTierLabel(profile.tier)}
          </span>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-green-600">{profile.brandFit.score}/100</div>
          <div className="text-xs text-gray-500">Score de compatibilité</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <div className="text-sm text-gray-600">Followers</div>
          <div className="font-medium">{profile.metrics.followersRange}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Engagement</div>
          <div className="font-medium">{profile.metrics.engagementRate}%</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Likes moyens</div>
          <div className="font-medium">{profile.metrics.avgLikes}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Commentaires</div>
          <div className="font-medium">{profile.metrics.avgComments}</div>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-sm text-gray-600 mb-1">Niches</div>
        <div className="flex flex-wrap gap-1">
          {profile.niche.map((n, i) => (
            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
              {n}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <div className="text-sm text-gray-600 mb-1">Plateformes</div>
        <div className="flex flex-wrap gap-1">
          {profile.platforms.map((p, i) => (
            <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="text-sm text-gray-600 mb-2">Coûts estimés</div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <div className="text-gray-500">Post</div>
            <div className="font-medium">{profile.estimatedCost.postPrice}</div>
          </div>
          <div>
            <div className="text-gray-500">Story</div>
            <div className="font-medium">{profile.estimatedCost.storyPrice}</div>
          </div>
          <div>
            <div className="text-gray-500">Reel</div>
            <div className="font-medium">{profile.estimatedCost.reelPrice}</div>
          </div>
        </div>
      </div>

      {profile.brandFit.reasons.length > 0 && (
        <div className="border-t pt-3 mt-3">
          <div className="text-sm text-gray-600 mb-1">Pourquoi ce profil ?</div>
          <ul className="text-xs text-gray-700 space-y-1">
            {profile.brandFit.reasons.slice(0, 2).map((reason, i) => (
              <li key={i} className="flex items-start">
                <span className="text-green-500 mr-1">✓</span>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
    { id: 'creative', label: 'Stratégie créative', icon: '🎨' },
    { id: 'ads', label: 'Publicités Meta', icon: '📱' },
    { id: 'influencers', label: 'Influenceurs', icon: '👥' },
    { id: 'content', label: 'Package contenu', icon: '📝' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{campaign.name}</h1>
              <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
                <span>{campaign.brandId.name}</span>
                <span>•</span>
                <span>{getCampaignTypeLabel(campaign.campaignType)}</span>
                <span>•</span>
                <span>{getPrimaryObjectiveLabel(campaign.primaryObjective)}</span>
                <span>•</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                  campaign.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {getCampaignStatusLabel(campaign.status)}
                </span>
              </div>
            </div>
          </div>
          {onEdit && (
            <button
              onClick={onEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Modifier
            </button>
          )}
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Vue d'ensemble */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Période</h3>
                  <p className="text-sm text-gray-600">
                    Du {formatDate(campaign.startDate)} au {formatDate(campaign.endDate)}
                  </p>
                </div>
                {campaign.budget && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Budget total</h3>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(campaign.budget.total)}
                    </p>
                  </div>
                )}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Produits</h3>
                  <p className="text-sm text-gray-600">
                    {campaign.selectedProducts.length} produit(s) sélectionné(s)
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700">{campaign.description}</p>
              </div>

              {campaign.budget && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Répartition budgétaire</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        {formatCurrency(campaign.budget.organic)}
                      </div>
                      <div className="text-sm text-green-700">Contenu organique</div>
                      <div className="text-xs text-green-600">
                        ROI attendu: {campaign.budget.expectedROI.organic}x
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">
                        {formatCurrency(campaign.budget.ads)}
                      </div>
                      <div className="text-sm text-blue-700">Publicités</div>
                      <div className="text-xs text-blue-600">
                        ROI attendu: {campaign.budget.expectedROI.ads}x
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">
                        {formatCurrency(campaign.budget.influencers)}
                      </div>
                      <div className="text-sm text-purple-700">Influenceurs</div>
                      <div className="text-xs text-purple-600">
                        ROI attendu: {campaign.budget.expectedROI.influencers}x
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Stratégie créative */}
          {activeTab === 'creative' && campaign.creativeStrategy && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">Message principal</h3>
                <p className="text-lg text-blue-900 font-medium">
                  "{campaign.creativeStrategy.mainMessage}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Ton de voix</h3>
                  <p className="text-gray-700">{campaign.creativeStrategy.toneOfVoice}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Approche storytelling</h3>
                  <p className="text-gray-700">{campaign.creativeStrategy.storytellingApproach}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Piliers de contenu</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {campaign.creativeStrategy.contentPillars.map((pillar, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="font-medium text-gray-900">{pillar}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Messages clés</h3>
                <ul className="space-y-2">
                  {campaign.creativeStrategy.keyMessages.map((message, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">{message}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Déclencheurs émotionnels</h3>
                <div className="flex flex-wrap gap-2">
                  {campaign.creativeStrategy.emotionalTriggers.map((trigger, index) => (
                    <span key={index} className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
                      {trigger}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Publicités Meta */}
          {activeTab === 'ads' && campaign.advertisingStrategy?.metaAds && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">Budget publicitaire</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget total:</span>
                      <span className="font-medium">{formatCurrency(campaign.advertisingStrategy.metaAds.budget.total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget quotidien:</span>
                      <span className="font-medium">{formatCurrency(campaign.advertisingStrategy.metaAds.budget.daily)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">Stratégie d'enchères</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stratégie:</span>
                      <span className="font-medium">{campaign.advertisingStrategy.metaAds.biddingStrategy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Objectif:</span>
                      <span className="font-medium">{campaign.advertisingStrategy.metaAds.optimizationGoal}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Allocation par objectif</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {campaign.advertisingStrategy.metaAds.budget.allocation.awareness}%
                    </div>
                    <div className="text-sm text-blue-700">Notoriété</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-green-600">
                      {campaign.advertisingStrategy.metaAds.budget.allocation.traffic}%
                    </div>
                    <div className="text-sm text-green-700">Trafic</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {campaign.advertisingStrategy.metaAds.budget.allocation.conversions}%
                    </div>
                    <div className="text-sm text-purple-700">Conversions</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-orange-600">
                      {campaign.advertisingStrategy.metaAds.budget.allocation.retargeting}%
                    </div>
                    <div className="text-sm text-orange-700">Retargeting</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Ciblage démographique</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Tranche d'âge</div>
                      <div className="font-medium">{campaign.advertisingStrategy.metaAds.targeting.demographics.ageRange}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Genre</div>
                      <div className="font-medium">{campaign.advertisingStrategy.metaAds.targeting.demographics.gender.join(', ')}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Localisation</div>
                      <div className="font-medium">{campaign.advertisingStrategy.metaAds.targeting.demographics.locations.join(', ')}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Formats publicitaires</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {Object.entries(campaign.advertisingStrategy.metaAds.adFormats).map(([format, enabled]) => (
                    <div key={format} className={`p-3 rounded-lg text-center ${
                      enabled ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'
                    }`}>
                      <div className="text-lg mb-1">
                        {enabled ? '✅' : '❌'}
                      </div>
                      <div className="text-sm font-medium">
                        {format === 'feedAds' ? 'Feed' :
                         format === 'storyAds' ? 'Stories' :
                         format === 'reelsAds' ? 'Reels' :
                         format === 'carouselAds' ? 'Carrousel' :
                         format === 'videoAds' ? 'Vidéo' : format}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Influenceurs */}
          {activeTab === 'influencers' && campaign.influencerStrategy && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">Budget influenceurs</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-lg font-bold text-purple-600">
                      {formatCurrency(campaign.influencerStrategy.budget.total)}
                    </div>
                    <div className="text-sm text-gray-600">Budget total</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">
                      {formatCurrency(campaign.influencerStrategy.budget.allocation.microInfluencers)}
                    </div>
                    <div className="text-sm text-gray-600">Micro</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">
                      {formatCurrency(campaign.influencerStrategy.budget.allocation.midTierInfluencers)}
                    </div>
                    <div className="text-sm text-gray-600">Mid-tier</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">
                      {formatCurrency(campaign.influencerStrategy.budget.allocation.macroInfluencers)}
                    </div>
                    <div className="text-sm text-gray-600">Macro</div>
                  </div>
                </div>
              </div>

              {/* Micro-influenceurs */}
              {campaign.influencerStrategy.recommendedProfiles.microInfluencers.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">
                    Micro-influenceurs ({campaign.influencerStrategy.recommendedProfiles.microInfluencers.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {campaign.influencerStrategy.recommendedProfiles.microInfluencers.map((profile, index) => 
                      renderInfluencerProfile(profile, index)
                    )}
                  </div>
                </div>
              )}

              {/* Mid-tier influenceurs */}
              {campaign.influencerStrategy.recommendedProfiles.midTierInfluencers.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">
                    Mid-tier influenceurs ({campaign.influencerStrategy.recommendedProfiles.midTierInfluencers.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {campaign.influencerStrategy.recommendedProfiles.midTierInfluencers.map((profile, index) => 
                      renderInfluencerProfile(profile, index)
                    )}
                  </div>
                </div>
              )}

              {/* Macro-influenceurs */}
              {campaign.influencerStrategy.recommendedProfiles.macroInfluencers.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">
                    Macro-influenceurs ({campaign.influencerStrategy.recommendedProfiles.macroInfluencers.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {campaign.influencerStrategy.recommendedProfiles.macroInfluencers.map((profile, index) => 
                      renderInfluencerProfile(profile, index)
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Package contenu */}
          {activeTab === 'content' && campaign.campaignPackage && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">Contenu organique</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Posts:</span>
                      <span className="font-bold text-green-600">{campaign.campaignPackage.organicContent.posts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stories:</span>
                      <span className="font-bold text-green-600">{campaign.campaignPackage.organicContent.stories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reels:</span>
                      <span className="font-bold text-green-600">{campaign.campaignPackage.organicContent.reels}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Carrousels:</span>
                      <span className="font-bold text-green-600">{campaign.campaignPackage.organicContent.carousels}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">Contenu payant</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Créatifs pub:</span>
                      <span className="font-bold text-blue-600">{campaign.campaignPackage.paidContent.adCreatives}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Copies pub:</span>
                      <span className="font-bold text-blue-600">{campaign.campaignPackage.paidContent.adCopies}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Landing pages:</span>
                      <span className="font-bold text-blue-600">{campaign.campaignPackage.paidContent.landingPages}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">Contenu influenceurs</h3>
                  <div className="space-y-3">
                    {campaign.campaignPackage.influencerContent.briefingDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-purple-500 mr-2">📄</span>
                        <span className="text-sm text-gray-700">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {campaign.kpis && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">KPIs et objectifs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">KPIs principaux</h4>
                      <ul className="space-y-1">
                        {campaign.kpis.primary.map((kpi, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-center">
                            <span className="text-green-500 mr-2">•</span>
                            {kpi}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">KPIs secondaires</h4>
                      <ul className="space-y-1">
                        {campaign.kpis.secondary.map((kpi, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-center">
                            <span className="text-blue-500 mr-2">•</span>
                            {kpi}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignDashboard;
