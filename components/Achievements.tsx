
import React from 'react';
// FIX: Add .tsx extension to file import.
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
    <section id="achievements" className="bg-brand-blue-900 dark:bg-gray-950 text-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <TrophyIcon className="w-12 h-12 mx-auto text-brand-yellow-400 mb-4" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Prestasi Terbaru</h2>
          <p className="mt-4 text-lg text-brand-blue-200 dark:text-brand-blue-300">Apresiasi untuk para siswa yang mengharumkan nama sekolah.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((ach) => (
            <div key={ach.id} className="text-center">
              <img src={ach.image} alt={ach.student} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-brand-yellow-400 object-cover" />
              <h3 className="text-xl font-semibold text-white">{ach.student}</h3>
              <p className="text-brand-yellow-400 font-medium">{ach.competition}</p>
              <span className="inline-block bg-white/10 text-white text-xs font-semibold mt-2 px-2.5 py-0.5 rounded-full">{ach.level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
