import React, { useState } from 'react';
// FIX: Add .tsx extension to file import.
import { useData } from '../context/DataContext.tsx';
// FIX: Add .tsx extension to file import.
import Modal from './ui/Modal.tsx';

const GalleryPreview: React.FC = () => {
    const { gallery } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const openModal = (src: string) => {
        setSelectedImage(src);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <section id="gallery" className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Galeri Kegiatan</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Momen-momen berharga yang terekam dalam gambar.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {gallery.map((image, index) => (
                        <div key={image.id} className={`overflow-hidden rounded-lg ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover cursor-pointer transform hover:scale-105 transition-transform duration-300"
                                onClick={() => openModal(image.src)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {selectedImage && (
                <Modal isOpen={isModalOpen} onClose={closeModal} title="Pratinjau Gambar">
                    <img src={selectedImage} alt="Pratinjau Galeri" className="w-full h-auto rounded-lg" />
                </Modal>
            )}
        </section>
    );
};

export default GalleryPreview;