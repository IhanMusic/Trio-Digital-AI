export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  hasAlpha?: boolean;
}

export interface ImageProcessingOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'png' | 'webp' | 'jpeg';
}

export interface StyleGuide {
  colors: string[];
  lighting: {
    brightness: number;
    contrast: number;
    highlights: Array<{
      x: number;
      y: number;
      radius: number;
    }>;
    shadows: Array<{
      x: number;
      y: number;
      radius: number;
    }>;
  };
  composition: {
    aspectRatio: number;
    gridLines: boolean;
  };
}

export interface ProcessedImage {
  url: string;
  metadata: ImageMetadata;
  styleGuide?: StyleGuide;
}

export interface ValidationResult {
  score: number;
  quality: 'low' | 'medium' | 'high';
  details: Array<{
    criteriaName: string;
    score: number;
    feedback: string;
  }>;
  suggestions: string[];
  technicalIssues: string[];
  styleIssues: string[];
  sectorIssues: string[];
}

export interface GenerationResult {
  data: Array<{
    url: string;
    width: number;
    height: number;
    format: string;
  }>;
  score: number;
  validation?: ValidationResult;
  styleGuide?: StyleGuide;
}
