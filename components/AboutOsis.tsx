import React, { useState } from 'react';
import { useData } from '../context/DataContext.tsx';
import Modal from './ui/Modal.tsx';
import OrganizationChartModal from './ui/OrganizationChartModal.tsx';
import { TeamMember } from '../types.ts';

const AboutOsis: React.FC = () => {
  const { osisTeam, siteContent } = useData();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isChartOpen, setIsChartOpen] = useState(false);

  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <>
      <section id="about-osis" className="bg-white dark:bg-gray-800/50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{siteContent.aboutOsisTitle}</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              {siteContent.aboutOsisDescription}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {osisTeam.map((member, index) => (
              <div 
                key={member.id} 
                className="card-lift-glow bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg flex flex-col items-center justify-center p-4 border dark:border-gray-700 cursor-pointer"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                onClick={() => openModal(member)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openModal(member)}
              >
                <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-700" 
                />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-4 text-center">{member.name}</h3>
                <p className="text-brand-blue-600 dark:text-brand-blue-400 font-semibold text-center">{member.position}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12" data-aos="fade-up">
            <button
                onClick={() => setIsChartOpen(true)}
                className="btn-animated bg-gray-100 dark:bg-gray-700 text-brand-blue-700 dark:text-brand-blue-300 font-bold py-3 px-8 rounded-full ring-2 ring-brand-blue-700 dark:ring-brand-blue-300 transition-all duration-300 transform hover:scale-105"
            >
                Lihat Struktur Organisasi
            </button>
           </div>
        </div>
      </section>
      
      {selectedMember && (
        <Modal isOpen={!!selectedMember} onClose={closeModal} title={selectedMember.position}>
            <div className="flex flex-col items-center text-center p-4">
                <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-40 h-40 rounded-full object-cover shadow-xl border-8 border-gray-100 dark:border-gray-700 mb-6"
                />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedMember.name}</h3>
                <blockquote className="mt-4 text-lg italic text-gray-600 dark:text-gray-300 max-w-md">
                    &ldquo;{selectedMember.quote}&rdquo;
                </blockquote>
                <div className="flex space-x-4 mt-6 border-t dark:border-gray-700 pt-4">
                  <a href="#" className="text-gray-400 hover:text-brand-blue-500 transition-colors" title="Instagram"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.664-4.771 4.919-4.919C8.355 2.175 8.741 2.163 12 2.163m0-2.163C8.74.001 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.74 24 12 24s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.26 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zM12 16c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg></a>
                  <a href="#" className="text-gray-400 hover:text-brand-blue-500 transition-colors" title="Facebook"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg></a>
                </div>
            </div>
        </Modal>
      )}
      <OrganizationChartModal isOpen={isChartOpen} onClose={() => setIsChartOpen(false)} team={osisTeam} />
    </>
  );
};

export default AboutOsis;