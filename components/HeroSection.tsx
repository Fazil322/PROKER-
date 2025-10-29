import React from 'react';
import { useData } from '../context/DataContext';

const HeroSection: React.FC = () => {
  const { heroData } = useData();

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center text-white">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
      <img
        src="https://picsum.photos/seed/school/1920/1080"
        alt="Kegiatan Siswa"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          {heroData.title}
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          {heroData.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#events"
            className="w-full sm:w-auto bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            {heroData.cta1}
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto bg-white/20 backdrop-blur-sm border border-white/50 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
          >
            {heroData.cta2}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;