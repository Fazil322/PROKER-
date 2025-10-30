
import React from 'react';
import { useData } from '../context/DataContext.tsx';

const GalleryPreview: React.FC = () => {
    const { gallery } = useData();

    return (
        <section id="gallery" className="bg-white dark:bg-gray-800/50 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Galeri Kegiatan</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Momen-momen berharga yang terekam dalam kegiatan sekolah.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {gallery.slice(0, 4).map((image, index) => (
                        <div 
                            key={image.id} 
                            className={`group relative overflow-hidden rounded-lg shadow-lg ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
                        >
                            <img 
                                src={image.src} 
                                alt={image.alt} 
                                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                                <p className="text-white text-center text-sm font-semibold">{image.alt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GalleryPreview;
