import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext.tsx';
import { NavLink } from '../types.ts';

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
    const { siteContent } = useData();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [activeSection, setActiveSection] = useState('home');

    const mainNavLinks = siteContent.headerNavLinks.filter(l => !['#achievements', '#gallery', '#documents', '#about-osis'].includes(l.href));
    const dropdownLinks = siteContent.headerNavLinks.filter(l => ['#achievements', '#gallery', '#documents', '#about-osis'].includes(l.href));

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);

            const sections = siteContent.headerNavLinks.map(link => document.getElementById(link.href.substring(1)));
            let currentSection = 'home';

            sections.forEach(section => {
                if (section) {
                    const sectionTop = section.offsetTop - 80;
                    if (window.scrollY >= sectionTop) {
                        currentSection = section.id;
                    }
                }
            });

            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                 const lastSectionId = 'footer';
                 if(document.getElementById(lastSectionId)) {
                     const isFooterVisible = Array.from(document.querySelectorAll('footer a')).some(
                         link => siteContent.headerNavLinks.map(l => l.href).includes(link.getAttribute('href') || '')
                     );
                     if(isFooterVisible) setActiveSection(lastSectionId);
                     return;
                 }
            }
            
            setActiveSection(currentSection);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [siteContent.headerNavLinks]);

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

    const NavItem: React.FC<{link: NavLink}> = ({link}) => (
        <a 
          href={link.href} 
          className={`nav-link text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-brand-blue-600 dark:hover:text-brand-blue-400 transition-colors ${activeSection === link.href.substring(1) ? 'active font-bold text-brand-blue-700 dark:text-brand-blue-400' : ''}`}
        >
          {link.name}
        </a>
    );

    return (
        <header id="home" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-gray-900/80 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <a href="#home" className="flex items-center" aria-label="Beranda">
                           {siteContent.siteLogoUrl ? (
                                <img src={siteContent.siteLogoUrl} alt={siteContent.siteName} className="h-10 w-auto" />
                           ) : (
                                <span className="text-xl font-bold text-gray-900 dark:text-white">{siteContent.siteName}</span>
                           )}
                        </a>
                    </div>
                    <nav className="hidden md:block">
                        <ul className="flex items-center space-x-8">
                            {mainNavLinks.map(link => (
                                <li key={link.id}><NavItem link={link} /></li>
                            ))}
                            {dropdownLinks.length > 0 && (
                                <li className="relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                                    <button className="nav-link text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-brand-blue-600 dark:hover:text-brand-blue-400 transition-colors flex items-center">
                                        Profil & Info
                                        <svg className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                    {isDropdownOpen && (
                                        <ul className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 animate-fade-in-down">
                                            {dropdownLinks.map(link => (
                                                <li key={link.id}>
                                                    <a href={link.href} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">{link.name}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            )}
                        </ul>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <button onClick={toggleTheme} className="icon-hover-effect text-gray-600 dark:text-gray-300 hover:text-brand-blue-600 dark:hover:text-brand-blue-400 transition-colors p-2 rounded-full">
                            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
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
                                <a 
                                  href={link.href} 
                                  onClick={() => setIsMenuOpen(false)} 
                                  className={`nav-link text-base font-semibold text-gray-600 dark:text-gray-300`}
                                >
                                  {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;