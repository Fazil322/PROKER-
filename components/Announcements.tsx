

import React from 'react';
import { useData } from '../context/DataContext.tsx';

const MegaphoneIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 15h8.25a7.5 7.5 0 000-15H10.5zM10.5 6a7.5 7.5 0 00-7.5 7.5h15a7.5 7.5 0 00-7.5-7.5z" />
  </svg>
);


const Announcements: React.FC = () => {
  const { announcements } = useData();
  return (
    <section id="announcements" className="bg-white dark:bg-gray-800 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Pengumuman Penting</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Informasi terbaru dari sekolah dan OSIS.</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-4">
          {announcements.map((item) => (
            <div key={item.id} className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-start space-x-4 hover:shadow-md hover:border-brand-blue-300 dark:hover:border-brand-blue-500 transition-all">
               <div className="flex-shrink-0 bg-brand-blue-100 dark:bg-brand-blue-900/50 text-brand-blue-700 dark:text-brand-blue-300 rounded-full p-3">
                 <MegaphoneIcon className="w-6 h-6" />
               </div>
              <div>
                <span className="text-xs font-bold uppercase text-brand-blue-600 dark:text-brand-blue-400">{item.category}</span>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-1">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Announcements;