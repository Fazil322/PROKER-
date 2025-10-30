
import React, { useState } from 'react';
import { useData } from '../context/DataContext.tsx';

const GalleryPreview: React.FC = () => {
    const { gallery } = useData();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section id="gallery" className="bg-gradient-to-br from-white via-purple-50/20 to-white dark:from-gray-800/50 dark:via-gray-800/70 dark:to-gray-800/50 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
                        <span className="bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">Galeri</span> Kegiatan
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Momen-momen berharga yang terekam dalam kegiatan sekolah.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {gallery.slice(0, 8).map((image, index) => (
                        <div 
                            key={image.id} 
                            onClick={() => setSelectedImage(image.src)}
                            className={`group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer hover-lift ${
                                index === 0 ? 'col-span-2 row-span-2' : ''
                            }`}
                        >
                            <img 
                                src={image.src} 
                                alt={image.alt} 
                                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                                <div className="text-center">
                                    <p className="text-white font-semibold">{image.alt}</p>
                                    <svg className="w-6 h-6 text-white mx-auto mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in-down"
                    onClick={() => setSelectedImage(null)}
                >
                    <button 
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Close"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img 
                        src={selectedImage} 
                        alt="Gallery preview" 
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </section>
    );
};

export default GalleryPreview;
