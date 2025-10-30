
import React from 'react';
import { useData } from '../context/DataContext.tsx';

const AboutOsis: React.FC = () => {
  const { osisTeam, siteContent } = useData();

  return (
    <section id="about-osis" className="bg-white dark:bg-gray-800/50 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{siteContent.aboutOsisTitle}</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {siteContent.aboutOsisDescription}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {osisTeam.map((member) => (
            <div key={member.id} className="text-center group">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4">
                <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full rounded-full object-cover shadow-lg transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-brand-blue-500 transition-colors"></div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-brand-blue-600 dark:text-brand-blue-400 font-semibold">{member.position}</p>
              {member.quote && <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">"{member.quote}"</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutOsis;
