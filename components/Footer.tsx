
import React from 'react';
import { useData } from '../context/DataContext.tsx';

const InstagramIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.664-4.771 4.919-4.919C8.355 2.175 8.741 2.163 12 2.163m0-2.163C8.74.001 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.74 24 12 24s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.26 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zM12 16c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/>
    </svg>
);
const FacebookIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);
const YouTubeIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.78 22 12 22 12s0 3.22-.42 4.814a2.506 2.506 0 0 1-1.768 1.768c-1.594.42-7.812.42-7.812.42s-6.218 0-7.812-.42a2.506 2.506 0 0 1-1.768-1.768C2 15.22 2 12 2 12s0-3.22.42-4.814a2.506 2.506 0 0 1 1.768-1.768C5.782 5 12 5 12 5s6.218 0 7.812.418zM9.5 15.5V8.5l6 3.5-6 3.5z" clipRule="evenodd" />
    </svg>
);


const Footer: React.FC = () => {
    const { siteContent, siteSettings, setShowLogin } = useData();

    const socialLinks = [
        { href: siteSettings.instagramUrl, label: 'Instagram', icon: <InstagramIcon /> },
        { href: siteSettings.facebookUrl, label: 'Facebook', icon: <FacebookIcon /> },
        { href: siteSettings.youtubeUrl, label: 'YouTube', icon: <YouTubeIcon /> },
    ];

    const copyrightText = siteContent.footerCopyrightText;
    const yearMatch = copyrightText.match(/\b\d{4}\b/);

    let copyrightElement;
    if (yearMatch) {
        const year = yearMatch[0];
        const parts = copyrightText.split(year);
        copyrightElement = (
            <p>
                {parts[0]}
                <span
                    onClick={() => setShowLogin(true)}
                    className="cursor-pointer font-semibold hover:text-brand-yellow-400 transition-colors"
                    title="Akses Panel Admin"
                >
                    {year}
                </span>
                {parts[1]}
            </p>
        );
    } else {
        copyrightElement = <p>{copyrightText}</p>;
    }

    return (
        <footer id="footer" className="relative bg-gradient-to-br from-brand-blue-950 via-brand-blue-900 to-brand-blue-950 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-purple rounded-full blur-3xl"></div>
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-brand-blue-200 bg-clip-text text-transparent">{siteContent.siteName}</h3>
                        <p className="text-brand-blue-200 text-sm leading-relaxed">{siteContent.footerAboutText}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            Tautan Cepat
                        </h3>
                        <ul className="space-y-2">
                            {siteContent.footerNavLinks.map(link => (
                                <li key={link.id}>
                                    <a href={link.href} className="text-brand-blue-200 hover:text-white text-sm transition-all hover:translate-x-1 inline-block">
                                        → {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Hubungi Kami
                        </h3>
                        <p className="text-brand-blue-200 text-sm mb-3">{siteContent.contactAddress}</p>
                        <p className="text-brand-blue-200 text-sm">
                            Email: <a href={`mailto:${siteSettings.contactEmail}`} className="hover:text-white transition-colors underline">{siteSettings.contactEmail}</a>
                        </p>
                        <div className="flex space-x-4 mt-6">
                            {socialLinks.map(link => (
                                <a 
                                    key={link.label} 
                                    href={link.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-brand-blue-200 hover:text-white transition-all transform hover:scale-110 hover:-translate-y-1" 
                                    title={link.label}
                                    aria-label={link.label}
                                >
                                    <span className="sr-only">{link.label}</span>
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-brand-blue-800/50 text-center text-xs text-brand-blue-300">
                    {copyrightElement}
                    <p className="mt-1">{siteContent.footerCreditText}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
