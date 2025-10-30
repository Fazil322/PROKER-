import React from 'react';
import { useData } from '../context/DataContext.tsx';

const MegaphoneIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 15h8.25a7.5 7.5 0 000-15H10.5zM10.5 6a7.5 7.5 0 00-7.5 7.5h15a7.5 7.5 0 00-7.5-7.5z" />
  </svg>
);

const AnnouncementTicker: React.FC = () => {
    const { announcements } = useData();
    const tickerItems = [...announcements, ...announcements]; // Duplicate for seamless loop

    return (
        <section id="announcements" className="bg-gray-800 dark:bg-gray-950 text-white py-3 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="flex-shrink-0 flex items-center space-x-2 mr-4">
                     <MegaphoneIcon className="w-6 h-6 text-brand-yellow-400" />
                    <span className="font-bold text-sm uppercase tracking-wider">Info Terkini</span>
                </div>
                <div className="flex-grow relative h-6">
                    <div className="absolute inset-0 flex items-center whitespace-nowrap animate-scroll hover:pause-animation">
                       {tickerItems.map((item, index) => (
                           <div key={`${item.id}-${index}`} className="flex items-center mx-6">
                               <span className="text-xs font-bold uppercase text-brand-yellow-400 mr-2">{item.category}:</span>
                               <span className="text-sm text-gray-200">{item.title}</span>
                           </div>
                       ))}
                    </div>
                </div>
            </div>
             <style>{`
                .hover\\:pause-animation:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default AnnouncementTicker;