# Trio Digital Documentation

## Form Translations

### Add Brand Form (Ajouter une marque)

#### Basic Information
- Company Name (Nom de l'entreprise)
- Email (E-Mail)
- Sector (Secteur d'activité)
- Company Description (Description de l'entreprise)

#### Visual Resources
- Your Logo (Votre Logo)
- Brand Guidelines (Charte Graphique)
- Product/Service Photos (Photos de produits/services)

#### Social Networks
- Currently Used Social Networks (Réseaux sociaux utilisés actuellement)
  - Facebook
  - Instagram
  - LinkedIn
  - YouTube
  - Twitter
  - TikTok

#### Communication Style (Ton de Communication)
- Professional (Professionnel)
- Casual (Décontracté)
- Formal (Formel)
- Friendly (Amical)
- Dynamic (Dynamique)

### New Calendar Form (Nouveau Calendrier)

#### Basic Information
- Calendar Name (Nom du calendrier)
- Start Date (Date de début)
- End Date (Date de fin)
- Brand (Marque)
- Target Country (Pays cible)

#### Publication Settings
- Publication Frequency (Fréquence de publication)
  - Daily (Quotidienne)
  - Weekly (Hebdomadaire)
  - Monthly (Mensuelle)

#### Content Plan
- Platform Frequency (Fréquence par plateforme)
  - Facebook: 3 posts/week
  - Instagram: 3 posts/week
  - Twitter: 3 posts/week
  - LinkedIn: 2 posts/week
  - TikTok: 2 posts/week

## AI Generation System Prompts

### 1. System Context Prompt
```
You are a digital marketing expert specialized in [platform].
Generate content adapted to the platform's specificities:
- Facebook: engaging text, moderate emojis, clear call-to-action
- Instagram: concise text, frequent emojis, relevant hashtags
- Twitter: short and impactful message, limited hashtags
- LinkedIn: professional tone, business content, no emojis
- TikTok: casual tone, trends, viral hashtags

Your response must follow this exact format:
---POST---
[Post content here]
---IMAGE PROMPT---
[An English prompt describing the image to generate, without emojis or hashtags]
```

### 2. Content Generation Prompt
```
Create a [platform] post for:
- Brand: [companyName] ([sector])
- Description: [companyDescription]
- Style: [communicationStyle]
- Target: [targetCountry]
- Goals: [socialMediaGoals]
```

### 3. Platform-Specific Characteristics

#### Facebook
- Engaging text
- Moderate emojis
- Clear call-to-action
- Format: Long text + image
- Tone: Balance between professional and casual

#### Instagram
- Concise text
- Frequent emojis
- Relevant hashtags
- Format: Dominant image + short text
- Tone: Visual and inspiring

#### Twitter
- Short and impactful message
- Limited hashtags
- Format: Short text + optional image
- Tone: Direct and dynamic

#### LinkedIn
- Professional tone
- Business content
- No emojis
- Format: Structured text + professional image
- Tone: Formal and expert

#### TikTok
- Casual tone
- Current trends
- Viral hashtags
- Format: Vertical video + short text
- Tone: Young and dynamic

### 4. Image Generation Parameters
- Purpose: social
- Aspect Ratio: 
  - Instagram: 1:1
  - Other platforms: 16:9
- Style: Adapted according to brand tone and platform

### 5. Content Scheduling Logic
- Intervals calculated based on chosen frequency
- Publication times optimized per platform
- Balanced distribution over calendar period
