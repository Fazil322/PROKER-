
import React, { useState, useEffect } from 'react';
// FIX: Add .tsx extension to file import.
import { useData } from '../context/DataContext.tsx';

const Header: React.FC = () => {
    const { siteContent, setShowLogin } = useData();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header id="home" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-gray-900/80 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <a href="#home" className="text-xl font-bold text-gray-900 dark:text-white">{siteContent.siteName}</a>
                    </div>
                    <nav className="hidden md:block">
                        <ul className="flex items-center space-x-8">
                            {siteContent.headerNavLinks.map(link => (
                                <li key={link.id}>
                                    <a href={link.href} className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-brand-blue-600 dark:hover:text-brand-blue-400 transition-colors">{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="flex items-center">
                        <button onClick={() => setShowLogin(true)} className="hidden md:block bg-brand-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-blue-800 transition-colors">
                            Admin Login
                        </button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-800 dark:text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 py-4">
                     <ul className="flex flex-col items-center space-y-4">
                        {siteContent.headerNavLinks.map(link => (
                            <li key={link.id}>
                                <a href={link.href} onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-brand-blue-600 dark:hover:text-brand-blue-400 transition-colors">{link.name}</a>
                            </li>
                        ))}
                        <li>
                            <button onClick={() => { setShowLogin(true); setIsMenuOpen(false); }} className="bg-brand-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-blue-800 transition-colors">
                                Admin Login
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
