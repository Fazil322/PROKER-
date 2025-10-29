import React, { createContext, useState, useContext, ReactNode } from 'react';
import { 
  HERO_DATA,
  ANNOUNCEMENTS,
  EVENTS,
  ARTICLES,
  ACHIEVEMENTS,
  GALLERY_IMAGES,
  TESTIMONIALS,
  STATS
} from '../constants';
import * as T from '../types';

interface DataContextType {
  isLoggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;
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
  galleryImages: string[];
  setGalleryImages: React.Dispatch<React.SetStateAction<string[]>>;
  testimonials: T.Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<T.Testimonial[]>>;
  stats: T.Stat[];
  setStats: React.Dispatch<React.SetStateAction<T.Stat[]>>;

  toasts: T.Toast[];
  addToast: (message: string, type: T.Toast['type']) => void;

  activeAdminSection: T.AdminSection;
  setActiveAdminSection: React.Dispatch<React.SetStateAction<T.AdminSection>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeAdminSection, setActiveAdminSection] = useState<T.AdminSection>('dashboard');

  // Content States
  const [heroData, setHeroData] = useState<T.HeroData>(HERO_DATA);
  const [announcements, setAnnouncements] = useState<T.Announcement[]>(ANNOUNCEMENTS);
  const [events, setEvents] = useState<T.Event[]>(EVENTS);
  const [articles, setArticles] = useState<T.Article[]>(ARTICLES);
  const [achievements, setAchievements] = useState<T.Achievement[]>(ACHIEVEMENTS);
  const [galleryImages, setGalleryImages] = useState<string[]>(GALLERY_IMAGES);
  const [testimonials, setTestimonials] = useState<T.Testimonial[]>(TESTIMONIALS);
  const [stats, setStats] = useState<T.Stat[]>(STATS);

  // Toast State
  const [toasts, setToasts] = useState<T.Toast[]>([]);

  const addToast = (message: string, type: T.Toast['type']) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const login = (password: string): boolean => {
    if (password === "OSISSMAKDA") {
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
  
  const value = {
    isLoggedIn,
    login,
    logout,
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