import React from 'react';
import { useData } from '../context/DataContext.tsx';

const InstagramIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2.315a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM12 6a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 6zm0 3a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 9zm0 3a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 12zm0 3a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM12 18a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM8.625 2.315a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM8.625 6a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM8.625 9a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM8.625 12a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM8.625 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM8.625 18a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM15.375 2.315a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM15.375 6a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM15.375 9a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM15.375 12a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM15.375 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM15.375 18a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
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
    const { siteContent, siteSettings } = useData();

    const socialLinks = [
        { href: siteSettings.instagramUrl, label: 'Instagram', icon: <InstagramIcon /> },
        { href: siteSettings.facebookUrl, label: 'Facebook', icon: <FacebookIcon /> },
        { href: siteSettings.youtubeUrl, label: 'YouTube', icon: <YouTubeIcon /> },
    ];

    return (
        <footer id="footer" className="bg-brand-blue-950 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* About */}
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-bold mb-4">{siteContent.siteName}</h3>
                        <p className="text-brand-blue-200 text-sm leading-relaxed">{siteContent.footerAboutText}</p>
                    </div>
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
                        <ul className="space-y-2">
                            {siteContent.footerNavLinks.map(link => (
                                <li key={link.id}>
                                    <a href={link.href} className="text-brand-blue-200 hover:text-white text-sm transition-colors">{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
                        <p className="text-brand-blue-200 text-sm">{siteContent.contactAddress}</p>
                        <p className="text-brand-blue-200 text-sm mt-2">
                            Email: <a href={`mailto:${siteSettings.contactEmail}`} className="hover:text-white">{siteSettings.contactEmail}</a>
                        </p>
                        <div className="flex space-x-4 mt-4">
                            {socialLinks.map(link => (
                                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-brand-blue-200 hover:text-white" title={link.label}>
                                    <span className="sr-only">{link.label}</span>
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-12 text-center text-xs text-brand-blue-300">
                    <p>{siteContent.footerCopyrightText}</p>
                    <p>{siteContent.footerCreditText}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;