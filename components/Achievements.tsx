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
    <section id="achievements" className="bg-brand-blue-900 dark:bg-gray-950 text-white py-16 sm:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
            <TrophyIcon className="w-12 h-12 mx-auto text-brand-yellow-400 mb-4" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Prestasi Terbaru</h2>
          <p className="mt-4 text-lg text-brand-blue-200 dark:text-brand-blue-300">Apresiasi untuk para siswa yang mengharumkan nama sekolah.</p>
        </div>
        <div 
          className="flex lg:grid lg:grid-cols-3 gap-8 overflow-x-auto lg:overflow-x-visible pb-4 horizontal-scrollbar"
          data-aos="fade-up" 
          data-aos-delay="100"
        >
          {achievements.map((ach) => (
            <div 
              key={ach.id} 
              className="relative bg-white/5 rounded-lg p-6 pt-12 text-center group transition-all duration-300 hover:bg-white/10 hover:shadow-2xl hover:shadow-brand-yellow-400/20 hover:-translate-y-2 overflow-hidden flex-shrink-0 w-64 sm:w-72 lg:w-auto"
            >
              <div className="absolute -top-1 -right-1 w-24 h-24">
                  <div className="absolute transform rotate-45 bg-brand-yellow-400 text-center text-white font-semibold py-1 right-[-45px] top-[32px] w-[170px]">
                    {/* Ribbon Text or Icon can go here */}
                  </div>
              </div>
              <img src={ach.image} alt={ach.student} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-brand-yellow-400 object-cover transition-transform duration-300 group-hover:scale-105" />
              <h3 className="text-xl font-semibold text-white">{ach.student}</h3>
              <p className="text-brand-yellow-400 font-medium mt-1">{ach.competition}</p>
              <span className="inline-block bg-brand-yellow-400/10 text-brand-yellow-300 text-xs font-semibold mt-3 px-2.5 py-0.5 rounded-full">{ach.level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;