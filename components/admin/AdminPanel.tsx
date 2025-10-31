import React, { useState } from 'react';
import { useData } from '../../context/DataContext.tsx';
import Dashboard from './Dashboard.tsx';
import ManageSection from './ManageSection.tsx';
import Settings from './Settings.tsx';
import ContentAppearance from './ContentAppearance.tsx';
import { AdminSection } from '../../types.ts';
import ManageEVoting from './ManageEVoting.tsx';

// Icon Components
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const AnnounceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.5" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ArticleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 1V4a2 2 0 00-2-2h-7a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2z" /></svg>;
const TrophyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg>;
const GalleryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const TestimonialIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const TeamIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const StatsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const SaranIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const EVotingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const DocumentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const FinanceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 21.945V11C13 7.13 16.13 4 20 4v.055A9.008 9.008 0 0013 21.945z" /></svg>;
const ContentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;


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
    documents: () => <ManageSection section="documents" />,
    financials: () => <ManageSection section="financials" />,
    saran: () => <ManageSection section="saran" />,
    evoting: ManageEVoting,
    content: ContentAppearance,
    settings: Settings,
};

const AdminPanel: React.FC = () => {
    const { activeAdminSection, setActiveAdminSection, logout } = useData();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems: { id: AdminSection; label: string; icon: React.ReactNode }[] = [
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
        { id: 'announcements', label: 'Pengumuman', icon: <AnnounceIcon /> },
        { id: 'events', label: 'Agenda', icon: <CalendarIcon /> },
        { id: 'articles', label: 'Artikel', icon: <ArticleIcon /> },
        { id: 'achievements', label: 'Prestasi', icon: <TrophyIcon /> },
        { id: 'gallery', label: 'Galeri', icon: <GalleryIcon /> },
        { id: 'testimonials', label: 'Testimoni', icon: <TestimonialIcon /> },
        { id: 'osisTeam', label: 'Tim OSIS', icon: <TeamIcon /> },
        { id: 'stats', label: 'Statistik', icon: <StatsIcon /> },
        { id: 'documents', label: 'Dokumen Publik', icon: <DocumentIcon /> },
        { id: 'financials', label: 'Keuangan', icon: <FinanceIcon /> },
        { id: 'saran', label: 'Kotak Saran', icon: <SaranIcon /> },
        { id: 'evoting', label: 'E-Voting', icon: <EVotingIcon /> },
        { id: 'content', label: 'Konten & Tampilan', icon: <ContentIcon /> },
        { id: 'settings', label: 'Pengaturan', icon: <SettingsIcon /> },
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
                <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => handleMenuClick(item.id)}
                            className={`w-full flex items-center text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                                activeAdminSection === item.id ? 'bg-brand-blue-700' : 'hover:bg-gray-700'
                            }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-700 flex-shrink-0">
                    <button onClick={logout} className="w-full flex items-center text-left px-4 py-2.5 rounded-md text-sm font-medium hover:bg-red-500 transition-colors">
                        <LogoutIcon />
                        <span>Logout</span>
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