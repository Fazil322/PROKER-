
import React from 'react';
import { useData } from '../context/DataContext.tsx';

const Announcements: React.FC = () => {
    const { announcements } = useData();

    if (!announcements || announcements.length === 0) {
        return null;
    }

    // The ticker is gone, let's make a proper section
    return (
        <section id="announcements" className="bg-gray-50 dark:bg-gray-900/50 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Pengumuman Terbaru</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Informasi penting seputar kegiatan akademik dan OSIS.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {announcements.slice(0, 3).map((item) => (
                        <div key={item.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-brand-blue-500">
                            <div className="flex items-center mb-3">
                                <span className="text-xs font-bold uppercase text-brand-blue-600 dark:text-brand-blue-400 bg-brand-blue-100 dark:bg-brand-blue-900 px-2 py-1 rounded-full">{item.category}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Announcements;
