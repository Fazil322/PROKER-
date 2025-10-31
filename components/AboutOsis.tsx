
import React from 'react';
import { useData } from '../context/DataContext.tsx';

const AboutOsis: React.FC = () => {
  const { osisTeam, siteContent } = useData();

  return (
    <section id="about-osis" className="bg-white dark:bg-gray-800/50 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{siteContent.aboutOsisTitle}</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {siteContent.aboutOsisDescription}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {osisTeam.map((member) => (
            <div key={member.id} className="flip-card h-64 w-full">
              <div className="flip-card-inner rounded-lg shadow-lg">
                {/* Front Side */}
                <div className="flip-card-front bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center p-4 border dark:border-gray-700">
                  <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-700" 
                  />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-4">{member.name}</h3>
                  <p className="text-brand-blue-600 dark:text-brand-blue-400 font-semibold">{member.position}</p>
                </div>
                {/* Back Side */}
                <div className="flip-card-back bg-brand-blue-700 dark:bg-brand-blue-900 rounded-lg flex flex-col items-center justify-center p-6 text-white">
                    <p className="text-lg italic">"{member.quote}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutOsis;
