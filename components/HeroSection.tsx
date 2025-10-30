import React from 'react';
// FIX: Add .tsx extension to file import.
import { useData } from '../context/DataContext.tsx';

const HeroSection: React.FC = () => {
    const { siteContent } = useData();

    return (
        <section className="relative h-screen flex items-center justify-center text-center text-white" style={{ backgroundImage: `url(${siteContent.heroBackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 p-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 animate-fade-in-down" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>
                    Selamat Datang di Website Resmi
                </h1>
                <p className="text-5xl sm:text-6xl md:text-7xl font-bold text-brand-yellow-400 mb-8 animate-fade-in-up" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>
                    {siteContent.siteName}
                </p>
                <a href="#announcements" className="bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-300">
                    Lihat Informasi
                </a>
            </div>
        </section>
    );
};

export default HeroSection;