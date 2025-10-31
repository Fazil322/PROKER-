import React from 'react';
import { useData } from '../context/DataContext.tsx';
import FilterableContent from './ui/FilterableContent.tsx';
import { Announcement } from '../types.ts';

const iconMap: { [key: string]: React.ReactNode } = {
    'Akademik': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>,
    'Kegiatan OSIS': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962A3.75 3.75 0 0115 9.75c0 1.036-.394 2.006-1.057 2.762A3.75 3.75 0 019.75 9.75c0-1.036.394-2.006 1.057-2.762A3.75 3.75 0 0112 3.75c1.036 0 2.006.394 2.762 1.057m-2.962 7.5a3.75 3.75 0 01-2.762 1.057 3.75 3.75 0 01-2.762-1.057A3.75 3.75 0 016 12c0-1.036.394-2.006 1.057-2.762A3.75 3.75 0 019.75 9.75c1.036 0 2.006.394 2.762 1.057m-7.5 0A3.75 3.75 0 016 12c0-1.036.394-2.006 1.057-2.762a3.75 3.75 0 015.524 0A3.75 3.75 0 0115 12c0 1.036-.394 2.006-1.057 2.762m-1.057-2.762a3.75 3.75 0 00-2.762-1.057 3.75 3.75 0 00-2.762 1.057A3.75 3.75 0 003 12c0 1.036.394 2.006 1.057 2.762A3.75 3.75 0 006.75 15c1.036 0 2.006-.394 2.762-1.057m-2.962-7.5a3.75 3.75 0 00-2.762-1.057A3.75 3.75 0 003 9.75c0 1.036.394 2.006 1.057 2.762a3.75 3.75 0 005.524 0A3.75 3.75 0 0012 9.75c-1.036 0-2.006-.394-2.762-1.057z" /></svg>,
    'Umum': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>,
};

const AnnouncementCard: React.FC<{ item: Announcement, index: number }> = ({ item, index }) => (
    <div 
        className="card-lift-glow bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-brand-blue-500 flex flex-col"
        data-aos="fade-up"
        data-aos-delay={index * 100}
    >
        <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold uppercase text-brand-blue-600 dark:text-brand-blue-400 bg-brand-blue-100 dark:bg-brand-blue-900/50 px-2 py-1 rounded-full">{item.category}</span>
            <div className="text-brand-blue-400 dark:text-brand-blue-500">
                 {iconMap[item.category] || iconMap['Umum']}
            </div>
        </div>
        <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">{item.date}</p>
    </div>
);


const Announcements: React.FC = () => {
    const { announcements } = useData();

    if (!announcements || announcements.length === 0) {
        return null;
    }

    return (
        <section id="announcements" className="bg-gray-50 dark:bg-gray-900/50 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Papan Pengumuman</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Informasi penting seputar kegiatan akademik dan OSIS.</p>
                </div>
                
                <FilterableContent<Announcement>
                    items={announcements}
                    searchPlaceholder="Cari pengumuman..."
                    searchKeys={['title']}
                    filterOptions={{ key: 'category', label: 'Kategori' }}
                    renderItem={(item, index) => <AnnouncementCard item={item} index={index} />}
                    initialVisibleCount={6}
                />
            </div>
        </section>
    );
};

export default Announcements;