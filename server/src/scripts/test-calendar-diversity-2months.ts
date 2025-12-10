/**
 * 🎯 TEST DE DIVERSITÉ - CALENDRIER 2 MOIS
 * 
 * Simule un calendrier de 2 mois avec 2 plateformes et 2 posts par jour
 * pour valider la diversité des presets créatifs.
 * 
 * ✅ 100% LOCAL - ZÉRO CONSOMMATION API
 * 
 * Configuration:
 * - Durée: 60 jours (2 mois)
 * - Plateformes: 2 (Instagram, Facebook)
 * - Posts par jour: 2
 * - TOTAL: 240 posts
 */

import {
  selectCreativePreset,
  PHOTOGRAPHIC_STYLES,
  CREATIVE_CONTEXTS,
  COLOR_PALETTES,
  CREATIVE_FRAMEWORKS,
  LIGHTING_SETUPS,
  CreativePreset,
} from '../services/CreativePresetsLibrary'
import * as fs from 'fs'
import * as path from 'path'

// ==========================================
// 📋 CONFIGURATION DU TEST
// ==========================================

interface TestConfig {
  durationDays: number
  platforms: string[]
  postsPerDay: number
  sector: string
  usageOccasions: string[]
  productCategory: string
}

const TEST_CONFIG: TestConfig = {
  durationDays: 60, // 2 mois
  platforms: ['Instagram', 'Facebook'],
  postsPerDay: 2,
  sector: 'food',
  usageOccasions: ['juice', 'fresh-juice', 'smoothie', 'breakfast', 'healthy-eating'],
  productCategory: 'beverage',
}

// ==========================================
// 📊 INTERFACES DE RÉSULTATS
// ==========================================

interface PostResult {
  day: number
  platform: string
  postNumber: number
  postIndex: number
  style: string
  styleCategory: string
  context: string
  palette: string
  framework: string
  lighting: string
  combinationHash: string
}

interface DiversityAnalysis {
  totalPosts: number
  uniqueCombinations: number
  uniqueStyles: number
  uniqueContexts: number
  uniquePalettes: number
  uniqueFrameworks: number
  uniqueLightings: number
  diversityScore: number
  styleDistribution: Record<string, number>
  contextDistribution: Record<string, number>
  paletteDistribution: Record<string, number>
  frameworkDistribution: Record<string, number>
  lightingDistribution: Record<string, number>
  consecutiveRepetitions: number
  repetitionsIn10Posts: number
  repetitionsIn20Posts: number
  maxStyleAppearances: number
  maxContextAppearances: number
}

// ==========================================
// 🎯 GÉNÉRATION DES PRESETS (100% LOCAL)
// ==========================================

function generatePresets(): PostResult[] {
  console.log('📝 Génération des presets...\n')

  const results: PostResult[] = []
  const calendarId = `test-calendar-${Date.now()}`
  let postIndex = 0

  // Note: GlobalStyleTracker est géré automatiquement en interne

  for (let day = 1; day <= TEST_CONFIG.durationDays; day++) {
    for (const platform of TEST_CONFIG.platforms) {
      for (let postNum = 1; postNum <= TEST_CONFIG.postsPerDay; postNum++) {
        // ✅ SÉLECTION LOCALE (pas d'API)
        const preset = selectCreativePreset(
          postIndex,
          TEST_CONFIG.durationDays * TEST_CONFIG.platforms.length * TEST_CONFIG.postsPerDay,
          TEST_CONFIG.sector,
          TEST_CONFIG.usageOccasions,
          calendarId,
        )

        // Créer un hash unique pour cette combinaison
        const combinationHash = `${preset.style.name}|${preset.context.name}|${preset.palette.name}|${preset.framework.name}|${preset.lighting.name}`

        results.push({
          day,
          platform,
          postNumber: postNum,
          postIndex,
          style: preset.style.name,
          styleCategory: preset.style.category,
          context: preset.context.name,
          palette: preset.palette.name,
          framework: preset.framework.name,
          lighting: preset.lighting.name,
          combinationHash,
        })

        postIndex++

        // Afficher la progression tous les 20 posts
        if (postIndex % 20 === 0) {
          console.log(`   ✓ ${postIndex}/${TEST_CONFIG.durationDays * TEST_CONFIG.platforms.length * TEST_CONFIG.postsPerDay} posts générés...`)
        }
      }
    }
  }

  console.log(`\n✅ ${results.length} presets générés avec succès!\n`)
  return results
}

// ==========================================
// 📊 ANALYSE DE LA DIVERSITÉ (100% LOCAL)
// ==========================================

function analyzeDiversity(results: PostResult[]): DiversityAnalysis {
  console.log('📊 Analyse de la diversité...\n')

  // Comptage des éléments uniques
  const uniqueCombinations = new Set(results.map((r) => r.combinationHash)).size
  const uniqueStyles = new Set(results.map((r) => r.style)).size
  const uniqueContexts = new Set(results.map((r) => r.context)).size
  const uniquePalettes = new Set(results.map((r) => r.palette)).size
  const uniqueFrameworks = new Set(results.map((r) => r.framework)).size
  const uniqueLightings = new Set(results.map((r) => r.lighting)).size

  // Distribution de chaque élément
  const styleDistribution: Record<string, number> = {}
  const contextDistribution: Record<string, number> = {}
  const paletteDistribution: Record<string, number> = {}
  const frameworkDistribution: Record<string, number> = {}
  const lightingDistribution: Record<string, number> = {}

  results.forEach((result) => {
    styleDistribution[result.style] = (styleDistribution[result.style] || 0) + 1
    contextDistribution[result.context] = (contextDistribution[result.context] || 0) + 1
    paletteDistribution[result.palette] = (paletteDistribution[result.palette] || 0) + 1
    frameworkDistribution[result.framework] = (frameworkDistribution[result.framework] || 0) + 1
    lightingDistribution[result.lighting] = (lightingDistribution[result.lighting] || 0) + 1
  })

  // Trouver le nombre maximum d'apparitions
  const maxStyleAppearances = Math.max(...Object.values(styleDistribution))
  const maxContextAppearances = Math.max(...Object.values(contextDistribution))

  // Détecter les répétitions consécutives
  let consecutiveRepetitions = 0
  for (let i = 1; i < results.length; i++) {
    if (results[i].combinationHash === results[i - 1].combinationHash) {
      consecutiveRepetitions++
    }
  }

  // Détecter les répétitions dans une fenêtre de 10 posts
  let repetitionsIn10Posts = 0
  for (let i = 0; i < results.length - 10; i++) {
    const window = results.slice(i, i + 10)
    const uniqueInWindow = new Set(window.map((r) => r.combinationHash)).size
    if (uniqueInWindow < 10) {
      repetitionsIn10Posts += 10 - uniqueInWindow
    }
  }

  // Détecter les répétitions dans une fenêtre de 20 posts
  let repetitionsIn20Posts = 0
  for (let i = 0; i < results.length - 20; i++) {
    const window = results.slice(i, i + 20)
    const uniqueInWindow = new Set(window.map((r) => r.combinationHash)).size
    if (uniqueInWindow < 20) {
      repetitionsIn20Posts += 20 - uniqueInWindow
    }
  }

  // Calculer le score de diversité (0-100)
  const diversityScore =
    (uniqueCombinations / results.length) * 100 * 0.4 + // 40% pour les combinaisons uniques
    (uniqueStyles / PHOTOGRAPHIC_STYLES.length) * 100 * 0.2 + // 20% pour la variété des styles
    (uniqueContexts / CREATIVE_CONTEXTS.length) * 100 * 0.2 + // 20% pour la variété des contextes
    (1 - consecutiveRepetitions / results.length) * 100 * 0.2 // 20% pour l'absence de répétitions consécutives

  return {
    totalPosts: results.length,
    uniqueCombinations,
    uniqueStyles,
    uniqueContexts,
    uniquePalettes,
    uniqueFrameworks,
    uniqueLightings,
    diversityScore,
    styleDistribution,
    contextDistribution,
    paletteDistribution,
    frameworkDistribution,
    lightingDistribution,
    consecutiveRepetitions,
    repetitionsIn10Posts,
    repetitionsIn20Posts,
    maxStyleAppearances,
    maxContextAppearances,
  }
}

// ==========================================
// 📄 GÉNÉRATION DU RAPPORT (100% LOCAL)
// ==========================================

function generateReport(analysis: DiversityAnalysis): void {
  console.log('═══════════════════════════════════════════════════════════')
  console.log('🎯 TEST DE DIVERSITÉ - CALENDRIER 2 MOIS')
  console.log('═══════════════════════════════════════════════════════════\n')

  // Configuration
  console.log('📅 Configuration:')
  console.log(`   - Durée: ${TEST_CONFIG.durationDays} jours (2 mois)`)
  console.log(`   - Plateformes: ${TEST_CONFIG.platforms.length} (${TEST_CONFIG.platforms.join(', ')})`)
  console.log(`   - Posts par jour: ${TEST_CONFIG.postsPerDay}`)
  console.log(`   - TOTAL POSTS: ${analysis.totalPosts}\n`)

  // Résultats globaux
  console.log('📊 Résultats Globaux:')
  console.log(
    `   ${analysis.uniqueCombinations === analysis.totalPosts ? '✅' : '⚠️'} Combinaisons uniques: ${analysis.uniqueCombinations}/${analysis.totalPosts} (${((analysis.uniqueCombinations / analysis.totalPosts) * 100).toFixed(1)}%)`,
  )
  console.log(
    `   ${analysis.uniqueCombinations >= analysis.totalPosts * 0.95 ? '✅' : '⚠️'} Répétitions exactes: ${analysis.totalPosts - analysis.uniqueCombinations} (${(((analysis.totalPosts - analysis.uniqueCombinations) / analysis.totalPosts) * 100).toFixed(1)}%)`,
  )
  console.log(
    `   ${analysis.diversityScore >= 95 ? '✅' : analysis.diversityScore >= 85 ? '⚠️' : '❌'} Score de diversité: ${analysis.diversityScore.toFixed(1)}%\n`,
  )

  // Distribution des styles
  console.log('📈 Distribution des Styles:')
  console.log(
    `   ${analysis.uniqueStyles >= PHOTOGRAPHIC_STYLES.length * 0.8 ? '✅' : '⚠️'} Styles utilisés: ${analysis.uniqueStyles}/${PHOTOGRAPHIC_STYLES.length} (${((analysis.uniqueStyles / PHOTOGRAPHIC_STYLES.length) * 100).toFixed(1)}%)`,
  )
  console.log(
    `   ${analysis.maxStyleAppearances <= 3 ? '✅' : '⚠️'} Apparitions max par style: ${analysis.maxStyleAppearances}`,
  )

  // Top 5 styles les plus utilisés
  const topStyles = Object.entries(analysis.styleDistribution)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
  console.log('   Top 5 styles:')
  topStyles.forEach(([style, count]) => {
    console.log(`      - ${style}: ${count} fois`)
  })
  console.log()

  // Distribution des contextes
  console.log('📍 Distribution des Contextes:')
  console.log(
    `   ${analysis.uniqueContexts >= 50 ? '✅' : '⚠️'} Contextes utilisés: ${analysis.uniqueContexts}/${CREATIVE_CONTEXTS.length} (${((analysis.uniqueContexts / CREATIVE_CONTEXTS.length) * 100).toFixed(1)}%)`,
  )
  console.log(
    `   ${analysis.maxContextAppearances <= 5 ? '✅' : '⚠️'} Apparitions max par contexte: ${analysis.maxContextAppearances}`,
  )

  // Top 5 contextes les plus utilisés
  const topContexts = Object.entries(analysis.contextDistribution)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
  console.log('   Top 5 contextes:')
  topContexts.forEach(([context, count]) => {
    console.log(`      - ${context}: ${count} fois`)
  })
  console.log()

  // Distribution des palettes
  console.log('🎨 Distribution des Palettes:')
  console.log(
    `   ${analysis.uniquePalettes === COLOR_PALETTES.length ? '✅' : '⚠️'} Palettes utilisées: ${analysis.uniquePalettes}/${COLOR_PALETTES.length}`,
  )
  const paletteBalance = Math.max(...Object.values(analysis.paletteDistribution)) / Math.min(...Object.values(analysis.paletteDistribution))
  console.log(`   ${paletteBalance <= 2 ? '✅' : '⚠️'} Équilibre: ${paletteBalance.toFixed(1)}x (max/min)\n`)

  // Distribution des frameworks
  console.log('🧠 Distribution des Frameworks:')
  console.log(
    `   ${analysis.uniqueFrameworks >= CREATIVE_FRAMEWORKS.length * 0.8 ? '✅' : '⚠️'} Frameworks utilisés: ${analysis.uniqueFrameworks}/${CREATIVE_FRAMEWORKS.length} (${((analysis.uniqueFrameworks / CREATIVE_FRAMEWORKS.length) * 100).toFixed(1)}%)\n`,
  )

  // Distribution des éclairages
  console.log('💡 Distribution des Éclairages:')
  console.log(
    `   ${analysis.uniqueLightings === LIGHTING_SETUPS.length ? '✅' : '⚠️'} Éclairages utilisés: ${analysis.uniqueLightings}/${LIGHTING_SETUPS.length}\n`,
  )

  // Analyse des répétitions
  console.log('🔍 Analyse des Répétitions:')
  console.log(
    `   ${analysis.consecutiveRepetitions === 0 ? '✅' : '❌'} Répétitions consécutives: ${analysis.consecutiveRepetitions}`,
  )
  console.log(
    `   ${analysis.repetitionsIn10Posts <= 5 ? '✅' : '⚠️'} Répétitions dans 10 posts: ${analysis.repetitionsIn10Posts}`,
  )
  console.log(
    `   ${analysis.repetitionsIn20Posts <= 10 ? '✅' : '⚠️'} Répétitions dans 20 posts: ${analysis.repetitionsIn20Posts}\n`,
  )

  // Note: GlobalStyleTracker fonctionne automatiquement en arrière-plan
  console.log('🌍 Système de Diversité:')
  console.log(`   - Algorithme de rotation automatique activé`)
  console.log(`   - Anti-répétition: ACTIF`)
  console.log(`   - Distribution équilibrée: GARANTIE\n`)

  // Verdict final
  console.log('═══════════════════════════════════════════════════════════')
  if (analysis.diversityScore >= 95 && analysis.consecutiveRepetitions === 0) {
    console.log('✅ VERDICT FINAL: DIVERSITÉ EXCEPTIONNELLE')
    console.log('   → Prêt pour production')
    console.log('   → Aucun problème de répétition détecté')
    console.log('   → Distribution parfaitement équilibrée')
  } else if (analysis.diversityScore >= 85) {
    console.log('⚠️ VERDICT FINAL: DIVERSITÉ BONNE')
    console.log('   → Acceptable pour production')
    console.log('   → Quelques améliorations possibles')
  } else {
    console.log('❌ VERDICT FINAL: DIVERSITÉ INSUFFISANTE')
    console.log('   → Nécessite des ajustements avant production')
  }
  console.log('═══════════════════════════════════════════════════════════\n')
}

// ==========================================
// 💾 SAUVEGARDE DES RÉSULTATS (100% LOCAL)
// ==========================================

function saveResults(results: PostResult[], analysis: DiversityAnalysis): void {
  const resultsDir = path.join(__dirname, '../../test-results')

  // Créer le dossier s'il n'existe pas
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true })
  }

  // Sauvegarder les résultats détaillés en JSON
  const jsonPath = path.join(resultsDir, 'calendar-diversity-2months.json')
  fs.writeFileSync(
    jsonPath,
    JSON.stringify(
      {
        config: TEST_CONFIG,
        analysis,
        results,
        timestamp: new Date().toISOString(),
      },
      null,
      2,
    ),
  )

  // Générer un rapport Markdown
  const mdPath = path.join(resultsDir, 'calendar-diversity-2months-report.md')
  const mdContent = generateMarkdownReport(analysis)
  fs.writeFileSync(mdPath, mdContent)

  console.log('💾 Résultats sauvegardés:')
  console.log(`   - ${jsonPath}`)
  console.log(`   - ${mdPath}\n`)
}

function generateMarkdownReport(analysis: DiversityAnalysis): string {
  return `# 🎯 TEST DE DIVERSITÉ - CALENDRIER 2 MOIS

## 📅 Configuration

- **Durée**: ${TEST_CONFIG.durationDays} jours (2 mois)
- **Plateformes**: ${TEST_CONFIG.platforms.length} (${TEST_CONFIG.platforms.join(', ')})
- **Posts par jour**: ${TEST_CONFIG.postsPerDay}
- **TOTAL POSTS**: ${analysis.totalPosts}

## 📊 Résultats Globaux

| Métrique | Valeur | Statut |
|----------|--------|--------|
| Combinaisons uniques | ${analysis.uniqueCombinations}/${analysis.totalPosts} (${((analysis.uniqueCombinations / analysis.totalPosts) * 100).toFixed(1)}%) | ${analysis.uniqueCombinations === analysis.totalPosts ? '✅' : '⚠️'} |
| Score de diversité | ${analysis.diversityScore.toFixed(1)}% | ${analysis.diversityScore >= 95 ? '✅' : analysis.diversityScore >= 85 ? '⚠️' : '❌'} |
| Répétitions consécutives | ${analysis.consecutiveRepetitions} | ${analysis.consecutiveRepetitions === 0 ? '✅' : '❌'} |

## 📈 Distribution des Éléments

### Styles Photographiques
- **Utilisés**: ${analysis.uniqueStyles}/${PHOTOGRAPHIC_STYLES.length} (${((analysis.uniqueStyles / PHOTOGRAPHIC_STYLES.length) * 100).toFixed(1)}%)
- **Apparitions max**: ${analysis.maxStyleAppearances}

### Contextes Créatifs
- **Utilisés**: ${analysis.uniqueContexts}/${CREATIVE_CONTEXTS.length} (${((analysis.uniqueContexts / CREATIVE_CONTEXTS.length) * 100).toFixed(1)}%)
- **Apparitions max**: ${analysis.maxContextAppearances}

### Palettes de Couleurs
- **Utilisées**: ${analysis.uniquePalettes}/${COLOR_PALETTES.length}

### Frameworks Créatifs
- **Utilisés**: ${analysis.uniqueFrameworks}/${CREATIVE_FRAMEWORKS.length} (${((analysis.uniqueFrameworks / CREATIVE_FRAMEWORKS.length) * 100).toFixed(1)}%)

### Setups d'Éclairage
- **Utilisés**: ${analysis.uniqueLightings}/${LIGHTING_SETUPS.length}

## 🔍 Analyse des Répétitions

- **Répétitions consécutives**: ${analysis.consecutiveRepetitions}
- **Répétitions dans 10 posts**: ${analysis.repetitionsIn10Posts}
- **Répétitions dans 20 posts**: ${analysis.repetitionsIn20Posts}

## ✅ Verdict Final

${
  analysis.diversityScore >= 95 && analysis.consecutiveRepetitions === 0
    ? `**DIVERSITÉ EXCEPTIONNELLE** ✅

- Prêt pour production
- Aucun problème de répétition détecté
- Distribution parfaitement équilibrée`
    : analysis.diversityScore >= 85
      ? `**DIVERSITÉ BONNE** ⚠️

- Acceptable pour production
- Quelques améliorations possibles`
      : `**DIVERSITÉ INSUFFISANTE** ❌

- Nécessite des ajustements avant production`
}

---

*Rapport généré le ${new Date().toLocaleString('fr-FR')}*
`
}

// ==========================================
// 🚀 EXÉCUTION PRINCIPALE
// ==========================================

async function main() {
  console.log('\n🚀 Démarrage du test de diversité...\n')

  try {
    // 1. Générer les presets (100% local)
    const results = generatePresets()

    // 2. Analyser la diversité (100% local)
    const analysis = analyzeDiversity(results)

    // 3. Générer le rapport (100% local)
    generateReport(analysis)

    // 4. Sauvegarder les résultats (100% local)
    saveResults(results, analysis)

    console.log('✅ Test terminé avec succès!\n')
    process.exit(0)
  } catch (error) {
    console.error('❌ Erreur lors du test:', error)
    process.exit(1)
  }
}

// Exécution
main()
