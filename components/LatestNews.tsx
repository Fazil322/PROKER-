
import React, { useState } from 'react';
import { useData } from '../context/DataContext.tsx';
import Modal from './ui/Modal.tsx';
import { Article } from '../types.ts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


const LatestNews: React.FC = () => {
    const { articles } = useData();
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    const openArticle = (article: Article) => {
        setSelectedArticle(article);
    };

    const closeArticle = () => {
        setSelectedArticle(null);
    };

    return (
        <section id="news" className="bg-gray-50 dark:bg-gray-900/50 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Artikel & Berita Terbaru</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Wawasan, tips, dan cerita inspiratif dari lingkungan sekolah.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.slice(0, 3).map((article) => (
                        <div key={article.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col group">
                            <div className="relative">
                                <img className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" src={article.image} alt={article.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-lg font-bold">{article.title}</h3>
                                </div>
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Oleh {article.author} - {article.date}</p>
                                <p className="text-gray-600 dark:text-gray-300 flex-grow">{article.excerpt}</p>
                                <button
                                    onClick={() => openArticle(article)}
                                    className="mt-4 self-start text-sm font-semibold text-brand-blue-600 dark:text-brand-blue-400 hover:text-brand-blue-800 dark:hover:text-brand-blue-300"
                                >
                                    Baca Selengkapnya &rarr;
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedArticle && (
                <Modal isOpen={!!selectedArticle} onClose={closeArticle} title={selectedArticle.title}>
                    <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                        <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-auto max-h-80 object-cover rounded-lg mb-4" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Ditulis oleh <strong>{selectedArticle.author}</strong> pada {selectedArticle.date}
                        </p>
                        <div className="mt-4 leading-relaxed">
                             <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedArticle.content}</ReactMarkdown>
                        </div>
                    </div>
                </Modal>
            )}
        </section>
    );
};

export default LatestNews;