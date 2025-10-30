
import React, { useState } from 'react';
import { useData } from '../context/DataContext.tsx';
import Modal from './ui/Modal.tsx';
import { Article } from '../types.ts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


const LatestNews: React.FC = () => {
    const { articles } = useData();
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 6;

    const openArticle = (article: Article) => {
        setSelectedArticle(article);
    };

    const closeArticle = () => {
        setSelectedArticle(null);
    };
    
    const filteredArticles = articles.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
    
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <section id="news" className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900/90 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
                        <span className="bg-gradient-to-r from-brand-blue-600 to-accent-purple bg-clip-text text-transparent">Artikel & Berita</span> Terbaru
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Wawasan, tips, dan cerita inspiratif dari lingkungan sekolah.</p>
                    
                    <div className="mt-8 max-w-md mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari artikel..."
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                className="w-full px-4 py-3 pl-12 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-brand-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-200 dark:focus:ring-brand-blue-800 transition-all"
                            />
                            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
                
                {currentArticles.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Tidak ada artikel yang ditemukan.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentArticles.map((article, index) => (
                                <div 
                                    key={article.id} 
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col group hover-lift transform transition-all duration-300"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="relative overflow-hidden">
                                        <img className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110" src={article.image} alt={article.title} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-brand-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Artikel</span>
                                        </div>
                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <h3 className="text-xl font-bold line-clamp-2">{article.title}</h3>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span>{article.author}</span>
                                            <span className="mx-2">•</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>{article.date}</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 flex-grow line-clamp-3 mb-4">{article.excerpt}</p>
                                        <button
                                            onClick={() => openArticle(article)}
                                            className="mt-auto self-start flex items-center gap-2 text-sm font-semibold text-brand-blue-600 dark:text-brand-blue-400 hover:text-brand-blue-800 dark:hover:text-brand-blue-300 transition-all group-hover:gap-3"
                                        >
                                            Baca Selengkapnya 
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-12">
                                <button
                                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-blue-50 dark:hover:bg-gray-700 transition-all"
                                >
                                    Previous
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => paginate(i + 1)}
                                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                            currentPage === i + 1
                                                ? 'bg-brand-blue-600 text-white shadow-lg scale-110'
                                                : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-brand-blue-50 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-blue-50 dark:hover:bg-gray-700 transition-all"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {selectedArticle && (
                <Modal isOpen={!!selectedArticle} onClose={closeArticle} title={selectedArticle.title}>
                    <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                        <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-auto max-h-96 object-cover rounded-xl mb-6 shadow-lg" />
                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <strong>{selectedArticle.author}</strong>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {selectedArticle.date}
                            </div>
                        </div>
                        <div className="mt-4 leading-relaxed text-base">
                             <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedArticle.content}</ReactMarkdown>
                        </div>
                    </div>
                </Modal>
            )}
        </section>
    );
};

export default LatestNews;