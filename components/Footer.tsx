
import React from 'react';
// FIX: Add .tsx extension to file import.
import { useData } from '../context/DataContext.tsx';

const Footer: React.FC = () => {
    const { siteContent, siteSettings } = useData();

    const socialLinks = [
        { href: siteSettings.instagramUrl, label: 'Instagram' },
        { href: siteSettings.facebookUrl, label: 'Facebook' },
        { href: siteSettings.youtubeUrl, label: 'YouTube' },
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
                                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-brand-blue-200 hover:text-white">
                                    <span className="sr-only">{link.label}</span>
                                    {/* SVG icons would go here */}
                                    <div className="w-6 h-6 border rounded-full flex items-center justify-center text-xs">{link.label.substring(0,1)}</div>
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
