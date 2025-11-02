export const getLanguageName = (languageCode: string): string => {
  const languageNames: Record<string, string> = {
    'ar': 'Arabe standard',
    'ar-dz': 'Arabe dialectal algérien (Darija)',
    'en': 'Anglais',
    'fr': 'Français',
    'es': 'Espagnol',
    'de': 'Allemand',
    'it': 'Italien',
    'pt': 'Portugais',
    'ru': 'Russe',
    'zh': 'Chinois',
    'ja': 'Japonais',
    'ko': 'Coréen',
    'hi': 'Hindi',
    'ber': 'Berbère',
    'ca': 'Catalan',
    'gl': 'Galicien',
    'eu': 'Basque',
    'cy': 'Gallois',
    'gd': 'Gaélique écossais',
    'ps': 'Pashto',
    'fa': 'Dari',
    'uz': 'Ouzbek',
    'sq': 'Albanais'
  };
  return languageNames[languageCode] || languageCode;
};

export const isDialect = (languageCode: string): boolean => {
  return languageCode.includes('-');
};

export const getDialectInfo = (languageCode: string): { name: string; description: string } | null => {
  const dialectInfo: Record<string, { name: string; description: string }> = {
    'ar-dz': {
      name: 'Darija',
      description: 'Dialecte arabe algérien, utilisé quotidiennement dans le pays'
    }
  };
  return dialectInfo[languageCode] || null;
};
