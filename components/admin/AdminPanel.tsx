
import React from 'react';
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

    return (
        <div className="fixed inset-0 bg-gray-100 z-[140] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-6 text-xl font-bold border-b border-gray-700">Admin Panel</div>
                <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveAdminSection(item.id)}
                            className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                activeAdminSection === item.id ? 'bg-brand-blue-700' : 'hover:bg-gray-700'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button onClick={logout} className="w-full text-left px-4 py-2 rounded-md text-sm font-medium hover:bg-red-500 transition-colors">
                        Logout
                    </button>
                </div>
            </aside>
            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {ActiveComponent ? <ActiveComponent /> : <div>Pilih menu untuk memulai.</div>}
            </main>
        </div>
    );
};

export default AdminPanel;
