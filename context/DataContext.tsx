import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.ts';
import {
  Announcement, Event, Article, Achievement, GalleryImage, Testimonial, TeamMember, Stat, SiteContent, SiteSettings, AdminSection, Toast, Saran,
} from '../types.ts';
import {
  INITIAL_SITE_CONTENT,
  INITIAL_SITE_SETTINGS,
} from '../constants.ts';

const LOCAL_STORAGE_KEY = 'osis-website-auth'; // Only for auth now

// Helper type for table names
export type TableName = 'announcements' | 'events' | 'articles' | 'achievements' | 'gallery' | 'testimonials' | 'osisTeam' | 'stats' | 'saran';


interface DataContextType {
  // Data states
  announcements: Announcement[];
  events: Event[];
  articles: Article[];
  achievements: Achievement[];
  gallery: GalleryImage[];
  testimonials: Testimonial[];
  osisTeam: TeamMember[];
  stats: Stat[];
  siteContent: SiteContent;
  siteSettings: SiteSettings;
  saran: Saran[];
  
  // Loading and error states
  isLoading: boolean;
  error: string | null;

  // CRUD Functions
  addItem: (tableName: TableName, item: Omit<any, 'id' | 'created_at'>) => Promise<void>;
  updateItem: (tableName: TableName, id: number, item: Omit<any, 'id' | 'created_at'>) => Promise<void>;
  deleteItem: (tableName: TableName, id: number) => Promise<void>;
  setSiteContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  addSaran: (newSaran: Omit<Saran, 'id' | 'created_at'>) => Promise<void>;

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

const getInitialAuthState = () => {
  try {
    const item = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return item ? JSON.parse(item) : { adminPassword: 'admin' };
  } catch (error) {
    console.warn('Error reading auth from localStorage', error);
    return { adminPassword: 'admin' };
  }
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [osisTeam, setOsisTeam] = useState<TeamMember[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent>(INITIAL_SITE_CONTENT);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [saran, setSaran] = useState<Saran[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeAdminSection, setActiveAdminSection] = useState<AdminSection>('dashboard');
  const [adminPassword, setAdminPassword] = useState(getInitialAuthState().adminPassword);

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Fetch all data from Supabase on initial load
  useEffect(() => {
    const fetchAllData = async () => {
      if (!isSupabaseConfigured || !supabase) {
        setIsLoading(false);
        // In local dev, use some placeholder data if needed or just leave empty
        // For now, it will use the default empty states which is fine.
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const [
          announcementsRes, eventsRes, articlesRes, achievementsRes, galleryRes, 
          testimonialsRes, osisTeamRes, statsRes, saranRes, siteContentRes, siteSettingsRes
        ] = await Promise.all([
          supabase.from('announcements').select('*').order('id', { ascending: false }),
          supabase.from('events').select('*').order('date', { ascending: true }),
          supabase.from('articles').select('*').order('id', { ascending: false }),
          supabase.from('achievements').select('*').order('id', { ascending: false }),
          supabase.from('gallery').select('*').order('id', { ascending: false }),
          supabase.from('testimonials').select('*').order('id', { ascending: false }),
          supabase.from('osisTeam').select('*').order('id', { ascending: true }),
          supabase.from('stats').select('*').order('id', { ascending: true }),
          supabase.from('saran').select('*').order('created_at', { ascending: false }),
          supabase.from('siteContent').select('*').limit(1).single(), // Assuming single row table
          supabase.from('siteSettings').select('*').limit(1).single() // Assuming single row table
        ]);
        
        // Handle potential errors for each query
        const checkError = (res: any, name: string) => { if (res.error) throw new Error(`Failed to fetch ${name}: ${res.error.message}`); return res.data; };

        setAnnouncements(checkError(announcementsRes, 'announcements'));
        setEvents(checkError(eventsRes, 'events'));
        setArticles(checkError(articlesRes, 'articles'));
        setAchievements(checkError(achievementsRes, 'achievements'));
        setGallery(checkError(galleryRes, 'gallery'));
        setTestimonials(checkError(testimonialsRes, 'testimonials'));
        setOsisTeam(checkError(osisTeamRes, 'osisTeam'));
        setStats(checkError(statsRes, 'stats'));
        setSaran(checkError(saranRes, 'saran'));
        if (siteContentRes.data) setSiteContent(siteContentRes.data);
        if (siteSettingsRes.data) setSiteSettings(siteSettingsRes.data);

      } catch (err: any) {
        setError(err.message);
        addToast("Gagal memuat data dari database.", 'error');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);
  
  // Persist only auth state to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ adminPassword }));
    } catch (error) {
      console.warn('Error writing auth to localStorage', error);
    }
  }, [adminPassword]);

  // Generic CRUD functions
  const addItem = async (tableName: TableName, item: any) => {
    if (!isSupabaseConfigured || !supabase) {
        addToast('Mode pengembangan: Perubahan tidak disimpan.', 'info');
        return;
    }
    const { data, error } = await supabase.from(tableName).insert([item]).select();
    if (error) {
      addToast(`Gagal menambahkan item: ${error.message}`, 'error');
      throw error;
    }
    // Refresh local state
    const { data: refreshedData } = await supabase.from(tableName).select('*').order('id', { ascending: false });
    const setterName = `set${tableName.charAt(0).toUpperCase() + tableName.slice(1)}`;
    const setter = { setAnnouncements, setEvents, setArticles, setAchievements, setGallery, setTestimonials, setOsisTeam, setStats, setSaran }[setterName];
    if (setter && refreshedData) setter(refreshedData as any);
  };
  
  const updateItem = async (tableName: TableName, id: number, item: any) => {
    if (!isSupabaseConfigured || !supabase) {
        addToast('Mode pengembangan: Perubahan tidak disimpan.', 'info');
        return;
    }
    const { data, error } = await supabase.from(tableName).update(item).eq('id', id).select();
    if (error) {
       addToast(`Gagal memperbarui item: ${error.message}`, 'error');
      throw error;
    }
     const { data: refreshedData } = await supabase.from(tableName).select('*').order('id', { ascending: false });
    const setterName = `set${tableName.charAt(0).toUpperCase() + tableName.slice(1)}`;
    const setter = { setAnnouncements, setEvents, setArticles, setAchievements, setGallery, setTestimonials, setOsisTeam, setStats, setSaran }[setterName];
    if (setter && refreshedData) setter(refreshedData as any);
  };
  
  const deleteItem = async (tableName: TableName, id: number) => {
    if (!isSupabaseConfigured || !supabase) {
        addToast('Mode pengembangan: Perubahan tidak disimpan.', 'info');
        return;
    }
     const { error } = await supabase.from(tableName).delete().eq('id', id);
    if (error) {
       addToast(`Gagal menghapus item: ${error.message}`, 'error');
       throw error;
    }
    const { data: refreshedData } = await supabase.from(tableName).select('*').order('id', { ascending: false });
    const setterName = `set${tableName.charAt(0).toUpperCase() + tableName.slice(1)}`;
    const setter = { setAnnouncements, setEvents, setArticles, setAchievements, setGallery, setTestimonials, setOsisTeam, setStats, setSaran }[setterName];
    if (setter && refreshedData) setter(refreshedData as any);
  };

  const addSaran = async (newSaran: Omit<Saran, 'id' | 'created_at'>) => {
    if (!isSupabaseConfigured) {
        addToast('Mode pengembangan: Saran tidak akan terkirim.', 'info');
        return;
    }
    await addItem('saran', newSaran);
    addToast('Saran Anda telah berhasil dikirim. Terima kasih!', 'success');
  };

  const login = (password: string) => {
    if (password === adminPassword) {
      setIsLoggedIn(true);
      setShowLogin(false);
      addToast('Login berhasil! Selamat datang, Admin.', 'success');
      return true;
    }
    return false;
  };
  
  const logout = () => setIsLoggedIn(false);

  const updatePassword = (current: string, newPass: string) => {
    if (current === adminPassword) {
      setAdminPassword(newPass);
      addToast('Kata sandi berhasil diubah.', 'success');
      return true;
    }
    addToast('Kata sandi saat ini salah.', 'error');
    return false;
  };

  const addToast = (message: string, type: Toast['type']) => {
    const newToast: Toast = { id: Date.now(), message, type };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
        setToasts(currentToasts => currentToasts.filter(t => t.id !== newToast.id));
    }, 3000);
  };
  
  const value: DataContextType = {
    announcements, events, articles, achievements, gallery, testimonials, osisTeam, stats, siteContent, siteSettings, saran,
    isLoading, error,
    addItem, updateItem, deleteItem, setSiteContent, setSiteSettings, addSaran,
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
