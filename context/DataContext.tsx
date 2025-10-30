
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {
  Announcement,
  Event,
  Article,
  Achievement,
  GalleryImage,
  Testimonial,
  TeamMember,
  Stat,
  SiteContent,
  SiteSettings,
  AdminSection,
  Toast,
  Saran,
// FIX: Add .ts extension to file import.
} from '../types.ts';
import {
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EVENTS,
  INITIAL_ARTICLES,
  INITIAL_ACHIEVEMENTS,
  INITIAL_GALLERY,
  INITIAL_TESTIMONIALS,
  INITIAL_OSIS_TEAM,
  INITIAL_STATS,
  INITIAL_SITE_CONTENT,
  INITIAL_SITE_SETTINGS,
  INITIAL_SARAN,
// FIX: Add .ts extension to file import.
} from '../constants.ts';

const LOCAL_STORAGE_KEY = 'osis-website-data';

interface DataContextType {
  announcements: Announcement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  achievements: Achievement[];
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>;
  gallery: GalleryImage[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  osisTeam: TeamMember[];
  setOsisTeam: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  stats: Stat[];
  setStats: React.Dispatch<React.SetStateAction<Stat[]>>;
  siteContent: SiteContent;
  setSiteContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  saran: Saran[];
  setSaran: React.Dispatch<React.SetStateAction<Saran[]>>;
  addSaran: (newSaran: Omit<Saran, 'id' | 'createdAt'>) => void;

  // Admin state
  isLoggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  activeAdminSection: AdminSection;
  setActiveAdminSection: React.Dispatch<React.SetStateAction<AdminSection>>;
  updatePassword: (current: string, newPass: string) => boolean;
  
  // Toast notifications
  toasts: Toast[];
  addToast: (message: string, type: Toast['type']) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const getInitialState = () => {
  try {
    const item = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (item) {
      const parsed = JSON.parse(item);
      // Ensure all keys from initial state are present to avoid crashes after updates
      return {
          ...{ // Provide defaults for any potentially missing keys
              announcements: INITIAL_ANNOUNCEMENTS,
              events: INITIAL_EVENTS,
              articles: INITIAL_ARTICLES,
              achievements: INITIAL_ACHIEVEMENTS,
              gallery: INITIAL_GALLERY,
              testimonials: INITIAL_TESTIMONIALS,
              osisTeam: INITIAL_OSIS_TEAM,
              stats: INITIAL_STATS,
              siteContent: INITIAL_SITE_CONTENT,
              siteSettings: INITIAL_SITE_SETTINGS,
              saran: INITIAL_SARAN,
              adminPassword: 'admin',
          },
          ...parsed
      };
    }
  } catch (error) {
    console.warn('Error reading from localStorage', error);
  }

  return {
    announcements: INITIAL_ANNOUNCEMENTS,
    events: INITIAL_EVENTS,
    articles: INITIAL_ARTICLES,
    achievements: INITIAL_ACHIEVEMENTS,
    gallery: INITIAL_GALLERY,
    testimonials: INITIAL_TESTIMONIALS,
    osisTeam: INITIAL_OSIS_TEAM,
    stats: INITIAL_STATS,
    siteContent: INITIAL_SITE_CONTENT,
    siteSettings: INITIAL_SITE_SETTINGS,
    saran: INITIAL_SARAN,
    adminPassword: 'admin', // Default password
  };
};


export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [initialState] = useState(getInitialState);
  
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialState.announcements);
  const [events, setEvents] = useState<Event[]>(initialState.events);
  const [articles, setArticles] = useState<Article[]>(initialState.articles);
  const [achievements, setAchievements] = useState<Achievement[]>(initialState.achievements);
  const [gallery, setGallery] = useState<GalleryImage[]>(initialState.gallery);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialState.testimonials);
  const [osisTeam, setOsisTeam] = useState<TeamMember[]>(initialState.osisTeam);
  const [stats, setStats] = useState<Stat[]>(initialState.stats);
  const [siteContent, setSiteContent] = useState<SiteContent>(initialState.siteContent);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialState.siteSettings);
  const [saran, setSaran] = useState<Saran[]>(initialState.saran);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeAdminSection, setActiveAdminSection] = useState<AdminSection>('dashboard');
  const [adminPassword, setAdminPassword] = useState(initialState.adminPassword);

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Persist state to localStorage
  useEffect(() => {
    try {
      const stateToSave = {
        announcements,
        events,
        articles,
        achievements,
        gallery,
        testimonials,
        osisTeam,
        stats,
        siteContent,
        siteSettings,
        saran,
        adminPassword,
      };
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.warn('Error writing to localStorage', error);
    }
  }, [
    announcements, events, articles, achievements, gallery, testimonials,
    osisTeam, stats, siteContent, siteSettings, saran, adminPassword
  ]);

  const login = (password: string) => {
    if (password === adminPassword) {
      setIsLoggedIn(true);
      setShowLogin(false);
      addToast('Login berhasil! Selamat datang, Admin.', 'success');
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    addToast('Anda telah berhasil logout.', 'info');
  };

  const updatePassword = (current: string, newPass: string) => {
    if(current === adminPassword) {
        setAdminPassword(newPass);
        addToast('Kata sandi berhasil diubah.', 'success');
        return true;
    }
    addToast('Kata sandi saat ini salah.', 'error');
    return false;
  }

  const addToast = (message: string, type: Toast['type']) => {
    const newToast: Toast = { id: Date.now(), message, type };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
        setToasts(currentToasts => currentToasts.filter(t => t.id !== newToast.id));
    }, 3000);
  };

  const addSaran = (newSaran: Omit<Saran, 'id' | 'createdAt'>) => {
    const saranToAdd: Saran = {
      ...newSaran,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setSaran(prev => [saranToAdd, ...prev]);
    addToast('Saran Anda telah berhasil dikirim. Terima kasih!', 'success');
  };
  
  const value = {
    announcements, setAnnouncements,
    events, setEvents,
    articles, setArticles,
    achievements, setAchievements,
    gallery, setGallery,
    testimonials, setTestimonials,
    osisTeam, setOsisTeam,
    stats, setStats,
    siteContent, setSiteContent,
    siteSettings, setSiteSettings,
    saran, setSaran,
    addSaran,
    isLoggedIn, login, logout,
    showLogin, setShowLogin,
    activeAdminSection, setActiveAdminSection,
    updatePassword,
    toasts, addToast,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
