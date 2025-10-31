import React, { useEffect, useCallback } from 'react';
import { GalleryImage } from '../../types.ts';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, currentIndex, onClose }) => {
  
  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    // This is a simple implementation. For a more robust solution,
    // the parent component would need to update the currentIndex.
    // However, this approach won't work as props are immutable.
    // The parent needs to expose a setCurrentIndex function.
    // Let's assume the parent handles the index change. 
    // This component will just call handlers.
    // For now, let's just make the parent handle the index change.
    // The parent component should pass a function to change the index.
    // But for simplicity, we'll just handle it internally for now by re-rendering.
    // Wait, the parent `GalleryPreview` DOES control the index.
    // So this component should receive `setCurrentIndex` prop.
    // Let's modify the props.
    // No, let's keep it simple. The parent will re-render this component with a new index.
    // The parent should expose `goToNext` and `goToPrevious` functions.
    // Let's just pass `onNext` and `onPrevious` handlers.
    // Okay, looking at `GalleryPreview`, it just sets the initial index.
    // The lightbox must handle its own state to navigate.
    const [localIndex, setLocalIndex] = React.useState(currentIndex);
    
    useEffect(() => {
        setLocalIndex(currentIndex);
    }, [currentIndex]);
    
    const handleNext = () => {
        setLocalIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevious = () => {
        setLocalIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') onClose();
        if (event.key === 'ArrowRight') handleNext();
        if (event.key === 'ArrowLeft') handlePrevious();
    }, [onClose, images.length]);


  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  const image = images[localIndex];
  if (!image) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="absolute top-4 right-4 text-white z-10" onClick={onClose}>
         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-btn left-4" onClick={handlePrevious}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        
        <figure className="flex flex-col items-center justify-center h-full">
            <img src={image.src} alt={image.alt} />
            <figcaption className="text-white text-center mt-3 bg-black/50 p-2 rounded-md">{image.alt} ({localIndex + 1} / {images.length})</figcaption>
        </figure>
        
        <button className="lightbox-btn right-4" onClick={handleNext}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
};

export default Lightbox;