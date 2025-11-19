export const getLanguageName = (languageCode: string): string => {
  const languageNames: Record<string, string> = {
    'ar': 'Arabe standard',
    'ar-dz': 'Arabe dialectal algérien (Darija)',
    'ar-ma': 'Arabe dialectal marocain (Darija)',
    'ar-tn': 'Arabe dialectal tunisien (Darija)',
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

export const getDialectInfo = (languageCode: string): { name: string; description: string; script?: string; examples?: string[] } | null => {
  const dialectInfo: Record<string, { name: string; description: string; script?: string; examples?: string[] }> = {
    'ar-dz': {
      name: 'Darija Algérienne',
      description: 'Dialecte arabe algérien authentique, mélange d\'arabe, berbère et français',
      script: 'arabic',
      examples: [
        'كيراك؟ - Kirak? (Comment ça va?)',
        'بصح - Bsah (Vraiment)',
        'نشوفك غدوة - Nchoufek ghodwa (À demain)',
        'واش راك دير؟ - Wach rak dir? (Qu\'est-ce que tu fais?)',
        'الله يعطيك الصحة - Allah ya3tik saha (Que Dieu te donne la santé)'
      ]
    },
    'ar-ma': {
      name: 'Darija Marocaine',
      description: 'Dialecte arabe marocain, distinct de l\'algérien',
      script: 'arabic',
      examples: [
        'كيداير؟ - Kidayr? (Comment ça va?)',
        'بزاف - Bzaf (Beaucoup)',
        'نشوفك غدا - Nchoufek ghda (À demain)',
        'أش كاتدير؟ - Ach katdir? (Qu\'est-ce que tu fais?)',
        'الله يعطيك الصحة - Allah ya3tik saha (Que Dieu te donne la santé)'
      ]
    },
    'ar-tn': {
      name: 'Darija Tunisienne',
      description: 'Dialecte arabe tunisien, avec ses spécificités linguistiques',
      script: 'arabic',
      examples: [
        'أهلا كيفك؟ - Ahla kifek? (Salut, comment ça va?)',
        'برشا - Barcha (Beaucoup)',
        'نراك غدوة - Nrak ghodwa (À demain)',
        'شنوة تعمل؟ - Chnouwa ta3mel? (Qu\'est-ce que tu fais?)',
        'ربي يعطيك الصحة - Rabbi ya3tik saha (Que Dieu te donne la santé)'
      ]
    }
  };
  return dialectInfo[languageCode] || null;
};

export const getDialectPromptInstructions = (languageCode: string): string => {
  const dialectInstructions: Record<string, string> = {
    'ar-dz': `
INSTRUCTIONS SPÉCIFIQUES DARIJA ALGÉRIENNE :

🇩🇿 AUTHENTICITÉ LINGUISTIQUE :
• Utiliser EXCLUSIVEMENT le dialecte algérien (pas marocain, pas tunisien)
• Expressions typiquement algériennes : "kirak", "bsah", "nchoufek ghodwa"
• Éviter les expressions marocaines comme "kidayr", "bzaf"
• Intégrer naturellement les mots français algérianisés

📝 ÉCRITURE ET SCRIPT :
• OBLIGATOIRE : Écrire en caractères arabes (الأبجدية العربية)
• Adapter l'orthographe arabe au dialecte algérien
• Utiliser la translittération latine UNIQUEMENT si spécifiquement demandé

🎯 REGISTRE ET TON :
• Registre familier et authentique
• Éviter l'arabe standard (fusha) sauf pour les mots religieux
• Ton chaleureux et direct, typiquement algérien
• Intégrer les références culturelles algériennes

✅ EXEMPLES CORRECTS :
• "كيراك؟ الحمد لله" (Kirak? Alhamdulillah)
• "بصح هذا مليح" (Bsah hadha mlih)
• "إن شاء الله نشوفك غدوة" (Inchallah nchoufek ghodwa)
`,
    'ar-ma': `
INSTRUCTIONS SPÉCIFIQUES DARIJA MAROCAINE :

🇲🇦 AUTHENTICITÉ LINGUISTIQUE :
• Utiliser EXCLUSIVEMENT le dialecte marocain
• Expressions typiquement marocaines : "kidayr", "bzaf", "nchoufek ghda"
• Éviter les expressions algériennes
• Intégrer les spécificités linguistiques marocaines

📝 ÉCRITURE ET SCRIPT :
• OBLIGATOIRE : Écrire en caractères arabes
• Adapter l'orthographe arabe au dialecte marocain
• Utiliser la translittération latine UNIQUEMENT si spécifiquement demandé
`,
    'ar-tn': `
INSTRUCTIONS SPÉCIFIQUES DARIJA TUNISIENNE :

🇹🇳 AUTHENTICITÉ LINGUISTIQUE :
• Utiliser EXCLUSIVEMENT le dialecte tunisien
• Expressions typiquement tunisiennes : "kifek", "barcha", "nrak ghodwa"
• Éviter les expressions algériennes et marocaines
• Intégrer les spécificités linguistiques tunisiennes

📝 ÉCRITURE ET SCRIPT :
• OBLIGATOIRE : Écrire en caractères arabes
• Adapter l'orthographe arabe au dialecte tunisien
• Utiliser la translittération latine UNIQUEMENT si spécifiquement demandé
`
  };
  return dialectInstructions[languageCode] || '';
};
