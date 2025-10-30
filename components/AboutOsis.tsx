import React from 'react';
import { useData } from '../context/DataContext';
import type { TeamMember } from '../types';

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
    <div className="text-center group">
        <div className="relative inline-block">
            <img 
                src={member.image} 
                alt={member.name} 
                className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-gray-200 object-cover transition-all duration-300 group-hover:border-brand-blue-500" 
            />
            <div className="absolute inset-0 bg-brand-blue-800 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center p-4">
                <p className="text-white text-sm italic">"{member.quote}"</p>
            </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
        <p className="text-brand-blue-600 font-medium">{member.position}</p>
    </div>
);

const AboutOsis: React.FC = () => {
  const { osisTeam, siteContent } = useData();

  return (
    <section id="about-osis" className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{siteContent.aboutOsisTitle}</h2>
          <p className="mt-4 text-lg text-gray-600">
            {siteContent.aboutOsisDescription}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {osisTeam.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutOsis;