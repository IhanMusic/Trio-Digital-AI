import { spawn } from 'child_process';
import path from 'path';
import { promises as fs } from 'fs';

interface ProcessedImage {
  url: string;
  metadata: {
    width: number;
    height: number;
    format: string;
  };
  styleGuide?: StyleGuide;
}

interface StyleGuide {
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

interface ProcessResult {
  success: boolean;
  path?: string;
  error?: string;
}

interface AnalyzeResult {
  success: boolean;
  style_guide?: StyleGuide;
  error?: string;
}

export class ImageProcessingService {
  private static pythonScript = path.join(process.cwd(), 'src', 'python', 'image_processor.py');
  private static pythonPath = path.join(process.cwd(), 'venv', 'bin', 'python3');

  private static async runPythonScript(args: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn(this.pythonPath, [this.pythonScript, ...args]);
      
      let output = '';
      let errorOutput = '';

      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Python script failed with code ${code}: ${errorOutput}`));
        } else {
          resolve(output.trim());
        }
      });

      pythonProcess.on('error', (error) => {
        reject(error);
      });
    });
  }

  static async processProductImage(
    generatedImagePath: string,
    productImagePath: string,
    styleGuide?: StyleGuide
  ): Promise<ProcessedImage> {
    try {
        // Vérifier que le script Python existe
        await fs.access(this.pythonScript);

        // Créer le chemin de sortie dans public/images
        const outputPath = path.join(process.cwd(), 'public', 'images', `processed_${Date.now()}.png`);

        // Analyser d'abord l'image générée pour extraire le style
        const styleAnalysis = await this.runPythonScript(['analyze', generatedImagePath]);
        const styleResult = JSON.parse(styleAnalysis);

        if (!styleResult.success) {
          throw new Error(styleResult.error || 'Failed to analyze generated image');
        }

        // Fusionner le style guide fourni avec l'analyse
        const combinedStyle = {
          ...styleResult.style_guide,
          ...styleGuide
        };

        // Préparer les arguments pour le traitement
        const args = [
          'process',
          generatedImagePath,
          productImagePath,
          outputPath,
          JSON.stringify(combinedStyle)
        ];

        // Exécuter le script Python
        const result = await this.runPythonScript(args);
        const processResult: ProcessResult = JSON.parse(result);

        if (!processResult.success) {
          throw new Error(processResult.error || 'Failed to process image');
        }

      // Convertir le chemin absolu en URL relative
      const relativePath = processResult.path!.split('public')[1];
      return {
        url: relativePath,
        metadata: {
          width: 1024,
          height: 1024,
          format: 'png'
        },
        styleGuide: combinedStyle
      };
    } catch (error) {
      console.error('Error in processProductImage:', error);
      throw error;
    }
  }

  static async analyzeStyleGuide(imagePath: string): Promise<StyleGuide> {
    try {
      // Vérifier que le script Python existe
      await fs.access(this.pythonScript);

      // Exécuter le script Python
      const result = await this.runPythonScript(['analyze', imagePath]);
      const analyzeResult: AnalyzeResult = JSON.parse(result);

      if (!analyzeResult.success || !analyzeResult.style_guide) {
        throw new Error(analyzeResult.error || 'Failed to analyze image');
      }

      return analyzeResult.style_guide;
    } catch (error) {
      console.error('Error in analyzeStyleGuide:', error);
      throw error;
    }
  }
}
