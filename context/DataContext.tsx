import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { 
  HERO_DATA,
  ANNOUNCEMENTS,
  EVENTS,
  ARTICLES,
  ACHIEVEMENTS,
  GALLERY_IMAGES,
  TESTIMONIALS,
  STATS,
  OSIS_TEAM,
  SITE_SETTINGS,
  SITE_CONTENT
} from '../constants';
import * as T from '../types';

interface DataContextType {
  isLoggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  updatePassword: (oldPass: string, newPass: string) => boolean;
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  
  heroData: T.HeroData;
  setHeroData: React.Dispatch<React.SetStateAction<T.HeroData>>;
  announcements: T.Announcement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<T.Announcement[]>>;
  events: T.Event[];
  setEvents: React.Dispatch<React.SetStateAction<T.Event[]>>;
  articles: T.Article[];
  setArticles: React.Dispatch<React.SetStateAction<T.Article[]>>;
  achievements: T.Achievement[];
  setAchievements: React.Dispatch<React.SetStateAction<T.Achievement[]>>;
  galleryImages: T.GalleryImage[];
  setGalleryImages: React.Dispatch<React.SetStateAction<T.GalleryImage[]>>;
  testimonials: T.Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<T.Testimonial[]>>;
  stats: T.Stat[];
  setStats: React.Dispatch<React.SetStateAction<T.Stat[]>>;
  osisTeam: T.TeamMember[];
  setOsisTeam: React.Dispatch<React.SetStateAction<T.TeamMember[]>>;
  siteSettings: T.SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<T.SiteSettings>>;
  siteContent: T.SiteContent;
  setSiteContent: React.Dispatch<React.SetStateAction<T.SiteContent>>;


  toasts: T.Toast[];
  addToast: (message: string, type: T.Toast['type']) => void;

  activeAdminSection: T.AdminSection;
  setActiveAdminSection: React.Dispatch<React.SetStateAction<T.AdminSection>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const getInitialState = () => {
  try {
    const savedData = localStorage.getItem('osisCmsData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      // Basic validation to ensure we don't load corrupted data
      if (parsed.siteContent && parsed.siteContent.siteName) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Could not load data from localStorage", error);
  }
  return {
    heroData: HERO_DATA,
    announcements: ANNOUNCEMENTS,
    events: EVENTS,
    articles: ARTICLES,
    achievements: ACHIEVEMENTS,
    galleryImages: GALLERY_IMAGES,
    testimonials: TESTIMONIALS,
    stats: STATS,
    osisTeam: OSIS_TEAM,
    siteSettings: SITE_SETTINGS,
    siteContent: SITE_CONTENT,
    adminPassword: "OSISSMAKDA",
  };
};


export const DataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeAdminSection, setActiveAdminSection] = useState<T.AdminSection>('dashboard');
  
  const [initialState] = useState(getInitialState);

  // Content States
  const [heroData, setHeroData] = useState<T.HeroData>(initialState.heroData);
  const [announcements, setAnnouncements] = useState<T.Announcement[]>(initialState.announcements);
  const [events, setEvents] = useState<T.Event[]>(initialState.events);
  const [articles, setArticles] = useState<T.Article[]>(initialState.articles);
  const [achievements, setAchievements] = useState<T.Achievement[]>(initialState.achievements);
  const [galleryImages, setGalleryImages] = useState<T.GalleryImage[]>(initialState.galleryImages);
  const [testimonials, setTestimonials] = useState<T.Testimonial[]>(initialState.testimonials);
  const [stats, setStats] = useState<T.Stat[]>(initialState.stats);
  const [osisTeam, setOsisTeam] = useState<T.TeamMember[]>(initialState.osisTeam);
  const [siteSettings, setSiteSettings] = useState<T.SiteSettings>(initialState.siteSettings);
  const [siteContent, setSiteContent] = useState<T.SiteContent>(initialState.siteContent);
  const [adminPassword, setAdminPassword] = useState(initialState.adminPassword);

  // Toast State
  const [toasts, setToasts] = useState<T.Toast[]>([]);
  
  useEffect(() => {
    const dataToSave = {
      heroData, announcements, events, articles, achievements, galleryImages,
      testimonials, stats, osisTeam, siteSettings, siteContent, adminPassword
    };
    localStorage.setItem('osisCmsData', JSON.stringify(dataToSave));
  }, [
    heroData, announcements, events, articles, achievements, galleryImages,
    testimonials, stats, osisTeam, siteSettings, siteContent, adminPassword
  ]);

  const addToast = (message: string, type: T.Toast['type']) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const login = (password: string): boolean => {
    if (password === adminPassword) {
      setIsLoggedIn(true);
      setShowLogin(false);
      setActiveAdminSection('dashboard');
      addToast('Login berhasil! Selamat datang, Admin.', 'success');
      return true;
    } else {
      return false; // The Login component will handle the error message UI
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setShowLogin(false);
    addToast('Anda telah logout.', 'info');
  };

  const updatePassword = (oldPass: string, newPass: string) => {
    if (oldPass === adminPassword) {
        setAdminPassword(newPass);
        addToast('Kata sandi berhasil diperbarui!', 'success');
        return true;
    }
    addToast('Kata sandi lama salah!', 'error');
    return false;
  }
  
  const value = {
    isLoggedIn,
    login,
    logout,
    updatePassword,
    showLogin,
    setShowLogin,
    heroData, setHeroData,
    announcements, setAnnouncements,
    events, setEvents,
    articles, setArticles,
    achievements, setAchievements,
    galleryImages, setGalleryImages,
    testimonials, setTestimonials,
    stats, setStats,
    osisTeam, setOsisTeam,
    siteSettings, setSiteSettings,
    siteContent, setSiteContent,
    toasts, addToast,
    activeAdminSection, setActiveAdminSection
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};