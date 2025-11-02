export interface StrategyMetrics {
  executionTime: number;
  tokenCount: number;
  retryCount: number;
  validationScore: number;
  cacheMiss: boolean;
}

export interface StrategyValidation {
  isValid: boolean;
  score: number;
  feedback: string[];
}

export interface StrategyResult {
  marketAnalysis: string;
  strategicAnalysis: string;
  recommendations: string;
  validation: StrategyValidation;
}

export interface GenerationResponse {
  success: boolean;
  result?: StrategyResult;
  metrics?: StrategyMetrics;
  error?: string;
}

export interface CachedStrategy {
  result: StrategyResult;
  metrics: StrategyMetrics;
  timestamp: Date;
  key: string;
}

export interface GPTResponse {
  content: string;
  tokenCount: number;
}
