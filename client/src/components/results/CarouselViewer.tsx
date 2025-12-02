import React, { useState } from 'react';
import './CarouselViewer.css';

interface CarouselViewerProps {
  images: string[];
  alt?: string;
  className?: string;
}

const CarouselViewer: React.FC<CarouselViewerProps> = ({ 
  images, 
  alt = "Image du carrousel", 
  className = "" 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className={`carousel-viewer carousel-empty ${className}`}>
        <p>Aucune image disponible</p>
      </div>
    );
  }

  // Si une seule image, afficher sans navigation
  if (images.length === 1) {
    return (
      <div className={`carousel-viewer carousel-single ${className}`}>
        <img 
          src={images[0]} 
          alt={alt}
          className="carousel-image"
        />
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
  };

  const goToNext = () => {
    setCurrentIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`carousel-viewer ${className}`}>
      {/* Image principale */}
      <div className="carousel-image-container">
        <img 
          src={images[currentIndex]} 
          alt={`${alt} ${currentIndex + 1}`}
          className="carousel-image"
        />
        
        {/* Boutons de navigation */}
        <button 
          className="carousel-nav carousel-nav-prev"
          onClick={goToPrevious}
          aria-label="Image précédente"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M15 18L9 12L15 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
        
        <button 
          className="carousel-nav carousel-nav-next"
          onClick={goToNext}
          aria-label="Image suivante"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M9 18L15 12L9 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Indicateur de position */}
        <div className="carousel-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Indicateurs (dots) */}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>

      {/* Miniatures (optionnel, pour les carrousels avec beaucoup d'images) */}
      {images.length > 3 && (
        <div className="carousel-thumbnails">
          {images.map((image, index) => (
            <button
              key={index}
              className={`carousel-thumbnail ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            >
              <img 
                src={image} 
                alt={`Miniature ${index + 1}`}
                className="thumbnail-image"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarouselViewer;
