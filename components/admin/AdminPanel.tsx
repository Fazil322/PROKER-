import React, { useState } from 'react';
// FIX: Add .tsx extension to file import.
import { useData } from '../../context/DataContext.tsx';
// FIX: Add .tsx extension to file import.
import Dashboard from './Dashboard.tsx';
// FIX: Add .tsx extension to file import.
import ManageSection from './ManageSection.tsx';
// FIX: Add .tsx extension to file import.
import Settings from './Settings.tsx';
// FIX: Add .tsx extension to file import.
import ContentAppearance from './ContentAppearance.tsx';
// FIX: Add .ts extension to file import.
import { AdminSection } from '../../types.ts';

const sectionMap: Record<string, React.FC | null> = {
    dashboard: Dashboard,
    announcements: () => <ManageSection section="announcements" />,
    events: () => <ManageSection section="events" />,
    articles: () => <ManageSection section="articles" />,
    achievements: () => <ManageSection section="achievements" />,
    gallery: () => <ManageSection section="gallery" />,
    testimonials: () => <ManageSection section="testimonials" />,
    osisTeam: () => <ManageSection section="osisTeam" />,
    stats: () => <ManageSection section="stats" />,
    saran: () => <ManageSection section="saran" />,
    content: ContentAppearance,
    settings: Settings,
};

const AdminPanel: React.FC = () => {
    const { activeAdminSection, setActiveAdminSection, logout } = useData();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems: { id: AdminSection; label: string; }[] = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'announcements', label: 'Pengumuman' },
        { id: 'events', label: 'Agenda' },
        { id: 'articles', label: 'Artikel' },
        { id: 'achievements', label: 'Prestasi' },
        { id: 'gallery', label: 'Galeri' },
        { id: 'testimonials', label: 'Testimoni' },
        { id: 'osisTeam', label: 'Tim OSIS' },
        { id: 'stats', label: 'Statistik' },
        { id: 'saran', label: 'Kotak Saran' },
        { id: 'content', label: 'Konten & Tampilan' },
        { id: 'settings', label: 'Pengaturan' },
    ];
    
    const ActiveComponent = sectionMap[activeAdminSection as AdminSection];
    
    const handleMenuClick = (section: AdminSection) => {
        setActiveAdminSection(section);
        if (window.innerWidth < 1024) { // lg breakpoint
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-100 z-[140] flex h-screen">
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
            {/* Sidebar */}
            <aside className={`w-64 bg-gray-800 text-white flex flex-col fixed lg:relative inset-y-0 left-0 z-20 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <div className="p-6 text-xl font-bold border-b border-gray-700 flex-shrink-0">Admin Panel</div>
                <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => handleMenuClick(item.id)}
                            className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                activeAdminSection === item.id ? 'bg-brand-blue-700' : 'hover:bg-gray-700'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-700 flex-shrink-0">
                    <button onClick={logout} className="w-full text-left px-4 py-2 rounded-md text-sm font-medium hover:bg-red-500 transition-colors">
                        Logout
                    </button>
                </div>
            </aside>
            {/* Main Content */}
            <div className="flex-1 flex flex-col w-full lg:w-auto">
                 {/* Mobile Header */}
                <header className="lg:hidden bg-white shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-lg font-bold text-gray-800">{menuItems.find(i => i.id === activeAdminSection)?.label}</h1>
                    <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                </header>
                <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
                    {ActiveComponent ? <ActiveComponent /> : <div>Pilih menu untuk memulai.</div>}
                </main>
            </div>
        </div>
    );
};

export default AdminPanel;