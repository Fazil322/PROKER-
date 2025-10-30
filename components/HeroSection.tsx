import React from 'react';
import { useData } from '../context/DataContext.tsx';

const HeroSection: React.FC = () => {
    const { siteContent } = useData();

    return (
        <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden" style={{ backgroundImage: `url(${siteContent.heroBackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-700/20 via-transparent to-accent-purple/20 animate-pulse-slow"></div>
            
            <div className="absolute top-20 left-10 w-72 h-72 bg-brand-blue-500/30 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-float animation-delay-500"></div>
            
            <div className="relative z-10 p-4 max-w-5xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-down" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>
                    Selamat Datang di Website Resmi
                </h1>
                <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-brand-yellow-400 mb-4 animate-fade-in-up" style={{textShadow: '3px 3px 10px rgba(0,0,0,0.9)'}}>
                    {siteContent.siteName}
                </p>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-300" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.8)'}}>
                    Platform Digital Modern untuk Organisasi Siswa yang Inovatif dan Inspiratif
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-500">
                    <a href="#events" className="bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-2xl">
                        Lihat Informasi
                    </a>
                    <a href="#about" className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-110">
                        Tentang Kami
                    </a>
                </div>
            </div>
            
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
};

export default HeroSection;