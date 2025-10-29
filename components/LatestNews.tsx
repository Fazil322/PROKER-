import React from 'react';
import { useData } from '../context/DataContext';

const LatestNews: React.FC = () => {
  const { articles } = useData();

  return (
    <section id="articles" className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Berita & Artikel Terkini</h2>
          <p className="mt-4 text-lg text-gray-600">Wawasan, liputan, dan cerita inspiratif dari lingkungan sekolah.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="group flex flex-col bg-gray-50 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={article.image} alt={article.title} />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-blue-600">
                    {article.category}
                  </p>
                  <a href="#articles" className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900 group-hover:text-brand-blue-700">{article.title}</p>
                    <p className="mt-3 text-base text-gray-500">{article.excerpt}</p>
                  </a>
                </div>
                <div className="mt-6">
                  <a href="#articles" className="text-base font-semibold text-brand-blue-600 hover:text-brand-blue-800">
                    Baca selengkapnya &rarr;
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
            <a href="#articles" className="bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
                Lihat Semua Berita
            </a>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;