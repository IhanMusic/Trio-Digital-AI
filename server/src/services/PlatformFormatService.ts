/**
 * Service pour déterminer les formats d'images optimaux selon les plateformes sélectionnées
 * Basé sur les spécifications 2024 et les capacités de Gemini 3 Pro
 */

export interface ImageFormat {
  aspectRatio: '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '4:5' | '5:4' | '9:16' | '16:9' | '21:9';
  imageSize: '1K' | '2K' | '4K';
  width?: number;
  height?: number;
}

export interface ContentTypeInfo {
  type: 'Posts' | 'Stories' | 'Carrousels';
  isCarousel: boolean;
  numberOfImages: number;
}

export class PlatformFormatService {
  /**
   * Détermine le format optimal selon les plateformes et le type de contenu
   */
  static getOptimalFormat(platforms: string[], contentType: string): ImageFormat {
    const contentInfo = this.parseContentType(contentType);
    
    // Stories : toujours 9:16 en 2K pour toutes les plateformes
    if (contentInfo.type === 'Stories') {
      return {
        aspectRatio: '9:16',
        imageSize: '2K',
        width: 1536,
        height: 2752
      };
    }
    
    // LinkedIn Posts : toujours 16:9 en 2K
    if (platforms.includes('LinkedIn')) {
      return {
        aspectRatio: '16:9',
        imageSize: '2K',
        width: 2752,
        height: 1536
      };
    }
    
    // 🎯 Instagram Posts : 4:5 en 2K (format optimal pour le feed Instagram)
    if (platforms.includes('Instagram')) {
      return {
        aspectRatio: '4:5',
        imageSize: '2K',
        width: 1856,
        height: 2304
      };
    }
    
    // Facebook Posts : 1:1 en 2K (format carré optimal pour Facebook)
    if (platforms.includes('Facebook')) {
      return {
        aspectRatio: '1:1',
        imageSize: '2K',
        width: 2048,
        height: 2048
      };
    }
    
    // Fallback : format carré en 2K
    return {
      aspectRatio: '1:1',
      imageSize: '2K',
      width: 2048,
      height: 2048
    };
  }
  
  /**
   * Parse le type de contenu pour extraire les informations
   */
  static parseContentType(contentType: string): ContentTypeInfo {
    const lowerType = contentType.toLowerCase();
    
    if (lowerType.includes('stories')) {
      return {
        type: 'Stories',
        isCarousel: false,
        numberOfImages: 1
      };
    }
    
    if (lowerType.includes('carrousels') || lowerType.includes('carousel')) {
      return {
        type: 'Carrousels',
        isCarousel: true,
        numberOfImages: 4 // Par défaut 4 images pour un carrousel
      };
    }
    
    // Posts normaux
    return {
      type: 'Posts',
      isCarousel: false,
      numberOfImages: 1
    };
  }
  
  /**
   * Obtient les dimensions exactes pour un format donné
   */
  static getDimensions(aspectRatio: string, imageSize: '1K' | '2K' | '4K'): { width: number; height: number } {
    const baseSize = imageSize === '4K' ? 4096 : imageSize === '2K' ? 2048 : 1024;
    
    switch (aspectRatio) {
      case '1:1':
        return { width: baseSize, height: baseSize };
      
      case '3:4':
        // Pour 2K : 1792x2304 (maintient la qualité optimale)
        if (imageSize === '2K') {
          return { width: 1792, height: 2304 };
        }
        return { width: Math.round(baseSize * 0.75), height: baseSize };
      
      case '4:3':
        return { width: baseSize, height: Math.round(baseSize * 0.75) };
      
      case '9:16':
        // Pour 2K : 1536x2752 (optimisé pour les stories)
        if (imageSize === '2K') {
          return { width: 1536, height: 2752 };
        }
        return { width: Math.round(baseSize * 0.5625), height: baseSize };
      
      case '16:9':
        return { width: baseSize, height: Math.round(baseSize * 0.5625) };
      
      case '2:3':
        return { width: Math.round(baseSize * 0.667), height: baseSize };
      
      case '3:2':
        return { width: baseSize, height: Math.round(baseSize * 0.667) };
      
      case '4:5':
        return { width: Math.round(baseSize * 0.8), height: baseSize };
      
      case '5:4':
        return { width: baseSize, height: Math.round(baseSize * 0.8) };
      
      case '21:9':
        return { width: baseSize, height: Math.round(baseSize * 0.429) };
      
      default:
        return { width: baseSize, height: baseSize };
    }
  }
  
  /**
   * Vérifie si un format est supporté par Gemini
   */
  static isSupportedByGemini(aspectRatio: string): boolean {
    const supportedRatios = ['1:1', '2:3', '3:2', '3:4', '4:3', '4:5', '5:4', '9:16', '16:9', '21:9'];
    return supportedRatios.includes(aspectRatio);
  }
  
  /**
   * Obtient des informations détaillées sur un format
   */
  static getFormatInfo(platforms: string[], contentType: string) {
    const format = this.getOptimalFormat(platforms, contentType);
    const contentInfo = this.parseContentType(contentType);
    const dimensions = this.getDimensions(format.aspectRatio, format.imageSize);
    
    return {
      ...format,
      ...dimensions,
      contentInfo,
      platforms,
      description: this.getFormatDescription(format.aspectRatio, platforms, contentInfo.type)
    };
  }
  
  /**
   * Génère une description du format choisi
   */
  private static getFormatDescription(aspectRatio: string, platforms: string[], contentType: string): string {
    const platformStr = platforms.join(', ');
    
    switch (aspectRatio) {
      case '3:4':
        return `Format portrait 3:4 optimisé pour ${platformStr} - Idéal pour les posts ${contentType}`;
      case '16:9':
        return `Format paysage 16:9 optimisé pour ${platformStr} - Parfait pour le contenu professionnel`;
      case '9:16':
        return `Format vertical 9:16 optimisé pour les Stories sur ${platformStr}`;
      case '1:1':
        return `Format carré 1:1 - Format universel compatible avec toutes les plateformes`;
      default:
        return `Format ${aspectRatio} pour ${platformStr}`;
    }
  }
}
