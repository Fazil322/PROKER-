
import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext.tsx';

const SunIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);

const MoonIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);


const Header: React.FC = () => {
    const { siteContent, setShowLogin } = useData();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <header id="home" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 shadow-xl backdrop-blur-md' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <a href="#home" className="text-xl font-bold text-gray-900 dark:text-white hover:text-brand-blue-600 dark:hover:text-brand-blue-400 transition-all duration-300 transform hover:scale-105">{siteContent.siteName}</a>
                    </div>
                    <nav className="hidden md:block">
                        <ul className="flex items-center space-x-8">
                            {siteContent.headerNavLinks.map(link => (
                                <li key={link.id}>
                                    <a href={link.href} className="relative text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-brand-blue-600 dark:hover:text-brand-blue-400 transition-colors group">
                                        {link.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue-600 transition-all duration-300 group-hover:w-full"></span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={toggleTheme} 
                            className="text-gray-600 dark:text-gray-300 hover:text-brand-blue-600 dark:hover:text-brand-blue-400 transition-all duration-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transform hover:rotate-180"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                        </button>
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            className="md:hidden text-gray-800 dark:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md py-4 shadow-xl animate-slide-in-left">
                     <ul className="flex flex-col items-center space-y-4">
                        {siteContent.headerNavLinks.map(link => (
                            <li key={link.id}>
                                <a href={link.href} onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-brand-blue-600 dark:hover:text-brand-blue-400 transition-colors">{link.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
