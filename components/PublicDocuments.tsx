import React from 'react';
import { useData } from '../context/DataContext.tsx';
import FilterableContent from './ui/FilterableContent.tsx';
import { Document } from '../types.ts';

const DocumentIconSvg: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625a1.875 1.875 0 00-1.875 1.875v17.25a1.875 1.875 0 001.875 1.875h12.75a1.875 1.875 0 001.875-1.875V10.5M8.25 17.25h.008v.008H8.25v-.008z" />
    </svg>
);

const DocumentCard: React.FC<{ item: Document, index: number }> = ({ item, index }) => (
    <div 
        className="card-lift-glow bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col group p-6 h-full"
        data-aos="fade-up"
        data-aos-delay={index * 100}
    >
        <div className="flex-shrink-0 mb-4">
            <DocumentIconSvg className="w-10 h-10 text-brand-blue-500" />
        </div>
        <div className="flex-grow">
           <span className="text-xs font-bold uppercase text-brand-blue-600 dark:text-brand-blue-400">{item.category}</span>
           <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1 mb-2">{item.title}</h3>
           <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
        </div>
        <a 
            href={item.file_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-6 self-start text-sm font-semibold text-white bg-brand-blue-600 dark:bg-brand-blue-500 hover:bg-brand-blue-700 dark:hover:bg-brand-blue-600 py-2 px-4 rounded-md flex items-center transition-colors"
        >
            Unduh Dokumen
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
        </a>
    </div>
);


const PublicDocuments: React.FC = () => {
    const { documents } = useData();

    if (!documents || documents.length === 0) {
        return null;
    }

    return (
        <section id="documents" className="bg-gray-50 dark:bg-gray-900/50 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Pusat Dokumen OSIS</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Akses program kerja, laporan, dan dokumen penting lainnya.</p>
                </div>
                
                <FilterableContent<Document>
                    items={documents}
                    searchPlaceholder="Cari dokumen..."
                    searchKeys={['title', 'description']}
                    filterOptions={{ key: 'category', label: 'Kategori' }}
                    renderItem={(item, index) => <DocumentCard item={item} index={index} />}
                />
            </div>
        </section>
    );
};

export default PublicDocuments;