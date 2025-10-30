
import React from 'react';
// FIX: Add .tsx extension to file import.
import { useData } from '../context/DataContext.tsx';
// FIX: Add .ts extension to file import.
import { Article } from '../types.ts';

const NewsCard: React.FC<{ article: Article }> = ({ article }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group transition-transform duration-300 hover:-translate-y-2">
        <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
        <div className="p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">{article.date} | Oleh: {article.author}</p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2 mb-3">{article.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{article.excerpt}</p>
            <a href="#" className="font-semibold text-brand-blue-600 dark:text-brand-blue-400 group-hover:underline">
                Baca Selengkapnya &rarr;
            </a>
        </div>
    </div>
);

const LatestNews: React.FC = () => {
    const { articles } = useData();
    return (
        <section id="news" className="bg-white dark:bg-gray-800 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Artikel & Berita</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Wawasan dan informasi terkini dari lingkungan sekolah.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.slice(0, 3).map(article => (
                        <NewsCard key={article.id} article={article} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestNews;
