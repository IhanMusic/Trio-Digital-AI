import { Router } from 'express';
import { StrategyController } from '../controllers/strategyController';
import { authenticate } from '../middleware/auth';
import { checkGenerationQuota } from '../middleware/quotas';

const router = Router();

// Middleware d'authentification pour toutes les routes
router.use(authenticate);

/**
 * @route POST /api/strategy/generate
 * @desc Génère une stratégie complète à partir d'un brief
 * @access Private
 */
router.post('/generate', checkGenerationQuota, StrategyController.generateStrategy);

/**
 * @route POST /api/strategy/cache
 * @desc Vérifie si une stratégie existe en cache
 * @access Private
 */
router.post('/cache', StrategyController.checkCache);

/**
 * @route POST /api/strategy/metrics
 * @desc Enregistre les métriques de génération de stratégie
 * @access Private
 */
router.post('/metrics', StrategyController.recordMetrics);

export default router;
