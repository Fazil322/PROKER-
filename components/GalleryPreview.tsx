import React, { useState } from 'react';
import { useData } from '../context/DataContext.tsx';
import Lightbox from './ui/Lightbox.tsx';

const GalleryPreview: React.FC = () => {
    const { gallery } = useData();
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    return (
        <>
            <section id="gallery" className="bg-white dark:bg-gray-800/50 py-16 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12" data-aos="fade-up">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Galeri Kegiatan</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Momen-momen berharga yang terekam dalam kegiatan sekolah.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {gallery.slice(0, 4).map((image, index) => (
                            <div 
                                key={image.id} 
                                className={`card-lift-glow group relative overflow-hidden rounded-lg shadow-lg cursor-pointer ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
                                onClick={() => openLightbox(gallery.findIndex(g => g.id === image.id))}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <img 
                                    src={image.src} 
                                    alt={image.alt} 
                                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                                        </svg>
                                    </div>
                                    <p className="absolute bottom-4 text-white text-center text-sm font-semibold">{image.alt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {gallery.length > 4 && (
                        <div className="text-center mt-12" data-aos="fade-up">
                            <button
                                onClick={() => openLightbox(0)}
                                className="btn-animated bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                            >
                                Lihat Galeri Lengkap
                            </button>
                        </div>
                    )}
                </div>
            </section>
            
            {lightboxOpen && (
                <Lightbox
                    images={gallery}
                    currentIndex={currentImageIndex}
                    onClose={closeLightbox}
                />
            )}
        </>
    );
};

export default GalleryPreview;