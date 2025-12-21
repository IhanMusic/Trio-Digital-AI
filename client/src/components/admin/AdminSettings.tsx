import React, { useState } from 'react';

// Icônes SVG
const Settings = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Save = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const Key = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const Globe = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const Mail = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

interface SystemSettings {
  siteName: string;
  siteUrl: string;
  adminEmail: string;
  maxUsersPerPlan: {
    free: number;
    starter: number;
    pro: number;
    enterprise: number;
  };
  apiKeys: {
    openai: string;
    gemini: string;
    stability: string;
    cloudinary: string;
  };
  emailSettings: {
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPassword: string;
    fromEmail: string;
  };
  quotaLimits: {
    free: number;
    starter: number;
    pro: number;
    enterprise: number;
  };
}

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: 'Trio Digital AI',
    siteUrl: 'https://trio-digital.com',
    adminEmail: 'hello@thirdadvertising.dz',
    maxUsersPerPlan: {
      free: 1000,
      starter: 5000,
      pro: 10000,
      enterprise: -1
    },
    apiKeys: {
      openai: '••••••••••••••••••••••••••••••••',
      gemini: '••••••••••••••••••••••••••••••••',
      stability: '••••••••••••••••••••••••••••••••',
      cloudinary: '••••••••••••••••••••••••••••••••'
    },
    emailSettings: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUser: 'noreply@trio-digital.com',
      smtpPassword: '••••••••••••••••',
      fromEmail: 'noreply@trio-digital.com'
    },
    quotaLimits: {
      free: 10,
      starter: 100,
      pro: 500,
      enterprise: -1
    }
  });

  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simuler la sauvegarde
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
    
    // Afficher une notification de succès
    alert('Paramètres sauvegardés avec succès !');
  };

  const handleInputChange = (section: keyof SystemSettings, field: string, value: any) => {
    setSettings(prev => {
      if (typeof prev[section] === 'object' && prev[section] !== null) {
        return {
          ...prev,
          [section]: {
            ...(prev[section] as object),
            [field]: value
          }
        };
      } else {
        return {
          ...prev,
          [section]: value
        };
      }
    });
  };

  const tabs = [
    { id: 'general', name: 'Général', icon: Settings },
    { id: 'api', name: 'API Keys', icon: Key },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'quotas', name: 'Quotas', icon: Globe }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Configuration Système</h1>
          <p className="text-white/60 mt-1">
            Gérez les paramètres globaux de l'application
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="glass-button flex items-center space-x-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="glass-panel">
        <div className="border-b border-white/10">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#53dfb2] text-[#53dfb2]'
                      : 'border-transparent text-white/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Onglet Général */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Nom du site
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => handleInputChange('siteName' as any, '', e.target.value)}
                    className="glass-input w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    URL du site
                  </label>
                  <input
                    type="url"
                    value={settings.siteUrl}
                    onChange={(e) => handleInputChange('siteUrl' as any, '', e.target.value)}
                    className="glass-input w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email administrateur
                </label>
                <input
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => handleInputChange('adminEmail' as any, '', e.target.value)}
                  className="glass-input w-full md:w-1/2"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Limites utilisateurs par plan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(settings.maxUsersPerPlan).map(([plan, limit]) => (
                    <div key={plan}>
                      <label className="block text-sm font-medium text-white mb-2 capitalize">
                        {plan}
                      </label>
                      <input
                        type="number"
                        value={limit === -1 ? '' : limit}
                        placeholder="Illimité"
                        onChange={(e) => handleInputChange('maxUsersPerPlan', plan, e.target.value ? parseInt(e.target.value) : -1)}
                        className="glass-input w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Onglet API Keys */}
          {activeTab === 'api' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Clés API</h3>
                <button
                  onClick={() => setShowApiKeys(!showApiKeys)}
                  className="text-sm text-[#53dfb2] hover:text-[#3fa88a] transition-colors"
                >
                  {showApiKeys ? 'Masquer' : 'Afficher'} les clés
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(settings.apiKeys).map(([service, key]) => (
                  <div key={service}>
                    <label className="block text-sm font-medium text-white mb-2 capitalize">
                      {service === 'openai' ? 'OpenAI' : service}
                    </label>
                    <input
                      type={showApiKeys ? 'text' : 'password'}
                      value={showApiKeys ? key.replace(/•/g, 'sk-') : key}
                      onChange={(e) => handleInputChange('apiKeys', service, e.target.value)}
                      className="glass-input w-full font-mono text-sm"
                      placeholder={`Clé API ${service}`}
                    />
                  </div>
                ))}
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-yellow-400 mt-0.5">⚠️</div>
                  <div>
                    <h4 className="text-yellow-400 font-medium">Attention</h4>
                    <p className="text-yellow-300/80 text-sm mt-1">
                      Les clés API sont sensibles. Assurez-vous de les garder secrètes et de ne les partager avec personne.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Onglet Email */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Configuration SMTP</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Serveur SMTP
                  </label>
                  <input
                    type="text"
                    value={settings.emailSettings.smtpHost}
                    onChange={(e) => handleInputChange('emailSettings', 'smtpHost', e.target.value)}
                    className="glass-input w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Port SMTP
                  </label>
                  <input
                    type="number"
                    value={settings.emailSettings.smtpPort}
                    onChange={(e) => handleInputChange('emailSettings', 'smtpPort', parseInt(e.target.value))}
                    className="glass-input w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Utilisateur SMTP
                  </label>
                  <input
                    type="email"
                    value={settings.emailSettings.smtpUser}
                    onChange={(e) => handleInputChange('emailSettings', 'smtpUser', e.target.value)}
                    className="glass-input w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Mot de passe SMTP
                  </label>
                  <input
                    type="password"
                    value={settings.emailSettings.smtpPassword}
                    onChange={(e) => handleInputChange('emailSettings', 'smtpPassword', e.target.value)}
                    className="glass-input w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email expéditeur
                </label>
                <input
                  type="email"
                  value={settings.emailSettings.fromEmail}
                  onChange={(e) => handleInputChange('emailSettings', 'fromEmail', e.target.value)}
                  className="glass-input w-full md:w-1/2"
                />
              </div>
            </div>
          )}

          {/* Onglet Quotas */}
          {activeTab === 'quotas' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Limites de génération par plan</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(settings.quotaLimits).map(([plan, limit]) => (
                  <div key={plan} className="glass-panel p-4">
                    <h4 className="text-white font-medium capitalize mb-3">{plan}</h4>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        Générations par mois
                      </label>
                      <input
                        type="number"
                        value={limit === -1 ? '' : limit}
                        placeholder="Illimité"
                        onChange={(e) => handleInputChange('quotaLimits', plan, e.target.value ? parseInt(e.target.value) : -1)}
                        className="glass-input w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-blue-400 mt-0.5">ℹ️</div>
                  <div>
                    <h4 className="text-blue-400 font-medium">Information</h4>
                    <p className="text-blue-300/80 text-sm mt-1">
                      Laissez vide ou entrez -1 pour un quota illimité. Les quotas se réinitialisent chaque mois.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
