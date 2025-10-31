import React, { useState } from 'react';
import { useData } from '../context/DataContext.tsx';
import Modal from './ui/Modal.tsx';
import { Article } from '../types.ts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GoogleGenAI } from "@google/genai";

const ShareButtons: React.FC<{ article: Article }> = ({ article }) => {
    const url = window.location.href;
    const text = `Baca artikel menarik: ${article.title}`;

    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    };

    return (
        <div className="flex items-center space-x-3 mt-6 border-t dark:border-gray-600 pt-4">
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Bagikan:</span>
            <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.052 24l3.773-13.886a9.928 9.928 0 0116.146-6.17L24 0l-1.42 6.17a9.928 9.928 0 01-16.298 9.38L.052 24z"/></svg>
            </a>
            <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
            <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.054c0 2.29 1.628 4.295 3.79 4.748-.49.132-.98.17-1.464.128.616 1.942 2.398 3.328 4.509 3.364-1.79 1.408-4.043 2.22-6.52 2.22-.424 0-.84-.024-1.249-.073 2.278 1.468 4.986 2.32 7.928 2.32 9.49 0 14.676-7.854 14.676-14.676 0-.223-.005-.446-.014-.668.996-.718 1.86-1.618 2.55-2.65z"/></svg>
            </a>
        </div>
    );
};


const ArticleModalContent: React.FC<{ article: Article; onClose: () => void }> = ({ article, onClose }) => {
    const [summary, setSummary] = useState('');
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [summaryError, setSummaryError] = useState('');

    const generateSummary = async () => {
        if (!process.env.API_KEY) {
            setSummaryError("Fitur AI tidak dapat diaktifkan. Kunci API tidak dikonfigurasi.");
            return;
        }
        setIsSummarizing(true);
        setSummaryError('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Buat ringkasan (intisari) dari artikel berikut dalam 3 poin kunci menggunakan format bullet points. Jawab dalam Bahasa Indonesia. Artikel:\n\n"${article.content}"`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            setSummary(response.text);
        } catch (error) {
            console.error("Error generating summary:", error);
            setSummaryError("Maaf, terjadi kesalahan saat membuat ringkasan.");
        } finally {
            setIsSummarizing(false);
        }
    };

    return (
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            <img src={article.image} alt={article.title} className="w-full h-auto max-h-80 object-cover rounded-lg mb-4" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Ditulis oleh <strong>{article.author}</strong> pada {article.date}
            </p>
            
            {summary || isSummarizing || summaryError ? (
                <div className="my-6 p-4 rounded-lg bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
                    <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Intisari AI</h3>
                    {isSummarizing && <p className="animate-pulse">Membuat ringkasan...</p>}
                    {summaryError && <p className="text-red-500">{summaryError}</p>}
                    {summary && <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary}</ReactMarkdown>}
                </div>
            ) : (
                <div className="my-6">
                    <button onClick={generateSummary} disabled={isSummarizing} className="btn-animated bg-brand-yellow-400 text-brand-blue-900 font-bold py-2 px-4 rounded-full text-sm">
                        Buat Intisari (AI)
                    </button>
                </div>
            )}
            
            <div className="mt-4 leading-relaxed">
                 <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
            </div>
             <ShareButtons article={article} />
        </div>
    );
};


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
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Artikel & Berita Terbaru</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Wawasan, tips, dan cerita inspiratif dari lingkungan sekolah.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.slice(0, 3).map((article, index) => (
                        <div 
                            key={article.id} 
                            className="card-lift-glow bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col group"
                            data-aos={index === 0 ? "fade-right" : index === 1 ? "fade-up" : "fade-left"}
                            data-aos-delay={index * 100}
                        >
                            <div className="relative">
                                <img className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" src={article.image} alt={article.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                               <h3 className="text-lg font-bold text-gray-900 dark:text-white flex-grow mb-3">{article.title}</h3>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                                     <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(article.author)}&background=DFF0FF&color=0252BF`} alt={article.author} className="w-6 h-6 rounded-full mr-2" />
                                     <span>Oleh {article.author} - {article.date}</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">{article.excerpt}</p>
                                <button
                                    onClick={() => openArticle(article)}
                                    className="mt-auto self-start text-sm font-semibold text-brand-blue-600 dark:text-brand-blue-400 hover:text-brand-blue-800 dark:hover:text-brand-blue-300 group/link"
                                >
                                    Baca Selengkapnya <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1">&rarr;</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedArticle && (
                <Modal isOpen={!!selectedArticle} onClose={closeArticle} title={selectedArticle.title}>
                   <ArticleModalContent article={selectedArticle} onClose={closeArticle} />
                </Modal>
            )}
        </section>
    );
};

export default LatestNews;