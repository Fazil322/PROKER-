import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { useData } from '../context/DataContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn, logout, setActiveAdminSection } = useData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isLoggedIn ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center space-x-2">
              <span className={`font-bold text-xl ${isScrolled || isLoggedIn ? 'text-gray-800' : 'text-white'}`}>
                SMK LPPMRI 2 KEDUNGREJA
              </span>
            </a>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a key={link.name} href={link.href} className={`text-sm font-semibold transition-colors ${isScrolled || isLoggedIn ? 'text-gray-600 hover:text-brand-blue-700' : 'text-gray-200 hover:text-white'}`}>
                {link.name}
              </a>
            ))}
             {isLoggedIn && (
                <div className="flex items-center space-x-4">
                     <button onClick={() => setActiveAdminSection('dashboard')} className="bg-brand-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-brand-blue-700">
                        Admin Panel
                    </button>
                    <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600">
                        Logout
                    </button>
                </div>
            )}
          </nav>
          <div className="md:hidden flex items-center">
             {isLoggedIn && (
                 <button onClick={logout} className={`p-2 rounded-md mr-2 ${isScrolled || isLoggedIn ? 'text-red-500' : 'text-white'}`}>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0-0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                 </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${isScrolled || isLoggedIn ? 'text-gray-600 hover:text-brand-blue-700' : 'text-gray-200 hover:text-white'} focus:outline-none`}
              aria-label="Main menu"
              aria-expanded="false"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                {link.name}
              </a>
            ))}
             {isLoggedIn && (
                <div className="border-t mt-2 pt-2">
                    <button onClick={() => { setActiveAdminSection('dashboard'); setIsOpen(false); }} className="w-full text-left text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                        Admin Panel
                    </button>
                </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;