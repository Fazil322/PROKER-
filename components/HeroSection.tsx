import React, { useEffect, useRef } from 'react';
import { useData } from '../context/DataContext.tsx';
import { Stat } from '../types.ts';

const HeroSection: React.FC = () => {
    const { siteContent, stats } = useData();
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const elements = [titleRef.current, subtitleRef.current, ctaRef.current];
        elements.forEach((el, index) => {
            if (el) {
                setTimeout(() => {
                    el.classList.add('animated');
                }, index * 200);
            }
        });
    }, []);

    // Select specific stats to display on the hero
    const heroStats = stats.filter(s => ['Program Kerja', 'Siswa Terlibat'].includes(s.label));

    return (
        <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
            <div 
                className="absolute inset-0 bg-cover bg-center animate-ken-burns" 
                style={{ backgroundImage: `url(${siteContent.heroBackgroundImage})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="relative z-10 p-4">
                <h1 ref={titleRef} className="hero-reveal text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>
                    Selamat Datang di Website Resmi
                </h1>
                <p ref={subtitleRef} className="hero-reveal text-5xl sm:text-6xl md:text-7xl font-bold text-brand-yellow-400 mb-8" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>
                    {siteContent.siteName}
                </p>
                <a ref={ctaRef} href="#events" className="hero-reveal btn-animated bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                    Lihat Informasi
                </a>
            </div>
            
            {/* Hero Stats Overlay */}
            {heroStats.length > 0 && (
                 <div className="absolute bottom-16 sm:bottom-24 left-1/2 -translate-x-1/2 z-10 w-full px-4">
                     <div className="max-w-md mx-auto grid grid-cols-2 gap-4 text-white">
                         {heroStats.map(stat => (
                             <div key={stat.id} className="text-center backdrop-blur-sm bg-white/10 p-3 rounded-lg">
                                 <p className="text-2xl sm:text-3xl font-bold">{stat.value}{stat.suffix}</p>
                                 <p className="text-xs sm:text-sm uppercase tracking-wider opacity-80">{stat.label}</p>
                             </div>
                         ))}
                     </div>
                 </div>
            )}

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-slow">
                 <a href="#announcements" aria-label="Scroll down">
                    <svg className="w-8 h-8 text-white opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </a>
            </div>
        </section>
    );
};

export default HeroSection;