import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';

const Lightbox: React.FC<{ src: string; onClose: () => void }> = ({ src, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[100]"
            onClick={onClose}
        >
            <div className="relative max-w-4xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
                <img src={src} alt="Enlarged gallery view" className="max-w-full max-h-full object-contain rounded-lg" />
                 <button 
                    onClick={onClose} 
                    className="absolute -top-2 -right-2 bg-white text-black rounded-full h-8 w-8 flex items-center justify-center text-xl font-bold"
                    aria-label="Close lightbox"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

const GalleryPreview: React.FC = () => {
  const { galleryImages } = useData();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
    <section id="gallery" className="bg-gray-50 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Galeri Kegiatan</h2>
          <p className="mt-4 text-lg text-gray-600">Momen-momen tak terlupakan yang terekam kamera.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {galleryImages.map((image) => (
            <div key={image.id} className="overflow-hidden rounded-lg aspect-w-1 aspect-h-1 cursor-pointer" onClick={() => setSelectedImage(image.src)}>
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
            <a href="#gallery" className="bg-gray-800 hover:bg-black text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
                Lihat Galeri Lengkap
            </a>
        </div>
      </div>
    </section>
    {selectedImage && <Lightbox src={selectedImage} onClose={() => setSelectedImage(null)} />}
    </>
  );
};

export default GalleryPreview;