import React from 'react';
import { useData } from '../../context/DataContext';
import { AdminSection } from '../../types';

interface Props {
  section: AdminSection;
}

const AdminEditButton: React.FC<Props> = ({ section }) => {
  const { setActiveAdminSection } = useData();
  
  const handleClick = () => {
      setActiveAdminSection(section);
  };

  return (
    <div className="absolute top-4 right-4 z-40">
      <button 
        onClick={handleClick}
        className="bg-brand-blue-700 text-white rounded-full shadow-lg px-4 py-2 text-sm font-semibold
                   flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   hover:bg-brand-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500"
        title={`Manage ${section} section`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
        </svg>
        <span>Kelola</span>
      </button>
    </div>
  );
};

export default AdminEditButton;