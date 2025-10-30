import React from 'react';
import { useData } from '../context/DataContext.tsx';

const TrophyIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 011.05-4.319l.1-.198a.5.5 0 00-.342-.888H3.623a.5.5 0 00-.412.82L3 15m18 0l-1.06-2.12a.5.5 0 00-.82-.278L16.5 13.5M21 15h-3.377a.5.5 0 00-.412.82l.223.444a9.75 9.75 0 01-1.05 4.319h9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 1.5v4.5m0 0l-3.235 2.022a.5.5 0 00-.265.42V12m.265-.42a.5.5 0 01.265.42v3.528a.5.5 0 00.265.42L12 18m0-4.5l3.235 2.022a.5.5 0 00.265-.42V8.452a.5.5 0 00-.265-.42L12 6m-3.235 2.022a.5.5 0 00-.265.42V12m6.47-3.528a.5.5 0 00.265.42V12" />
  </svg>
);


const Achievements: React.FC = () => {
  const { achievements } = useData();
  return (
    <section id="achievements" className="relative bg-gradient-to-br from-brand-blue-900 via-brand-blue-800 to-brand-blue-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-brand-yellow-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-purple rounded-full blur-3xl animate-float animation-delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
            <TrophyIcon className="w-16 h-16 mx-auto text-brand-yellow-400 mb-4 animate-float" />
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            <span className="bg-gradient-to-r from-brand-yellow-300 to-brand-yellow-500 bg-clip-text text-transparent">Prestasi</span> Terbaru
          </h2>
          <p className="mt-4 text-lg text-brand-blue-200 dark:text-brand-blue-300">Apresiasi untuk para siswa yang mengharumkan nama sekolah.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((ach, index) => (
            <div 
              key={ach.id} 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center group transition-all duration-300 hover:bg-white/15 hover:shadow-2xl hover:shadow-brand-yellow-400/30 hover-lift border border-white/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative inline-block mb-4">
                <img src={ach.image} alt={ach.student} className="w-32 h-32 rounded-full mx-auto border-4 border-brand-yellow-400 object-cover transition-transform duration-300 group-hover:scale-110 group-hover:border-brand-yellow-300" />
                <div className="absolute -top-2 -right-2 bg-brand-yellow-400 rounded-full p-2 shadow-lg">
                  <TrophyIcon className="w-5 h-5 text-brand-blue-900" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">{ach.student}</h3>
              <p className="text-brand-yellow-300 font-medium">{ach.competition}</p>
              <span className="inline-block bg-brand-yellow-400/20 text-brand-yellow-300 text-sm font-semibold mt-3 px-4 py-1.5 rounded-full border border-brand-yellow-400/30">{ach.level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;