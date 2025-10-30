import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.ts';
import {
  Announcement, Event, Article, Achievement, GalleryImage, Testimonial, TeamMember, Stat, SiteContent, SiteSettings, AdminSection, Toast, Saran,
} from '../types.ts';
import {
  INITIAL_SITE_CONTENT,
  INITIAL_SITE_SETTINGS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EVENTS,
  INITIAL_ARTICLES,
  INITIAL_ACHIEVEMENTS,
  INITIAL_GALLERY,
  INITIAL_TESTIMONIALS,
  INITIAL_OSIS_TEAM,
  INITIAL_STATS
} from '../constants.ts';

const AUTH_STORAGE_KEY = 'osis-website-auth';

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
    const item = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return item ? JSON.parse(item) : { adminPassword: 'admin' };
  } catch (error) {
    console.warn('Error reading auth from localStorage', error);
    return { adminPassword: 'admin' };
  }
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [gallery, setGallery] = useState<GalleryImage[]>(INITIAL_GALLERY);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [osisTeam, setOsisTeam] = useState<TeamMember[]>(INITIAL_OSIS_TEAM);
  const [stats, setStats] = useState<Stat[]>(INITIAL_STATS);
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
  
  const stateSetters = {
    setAnnouncements, setEvents, setArticles, setAchievements, setGallery, setTestimonials, setOsisTeam, setStats, setSaran
  };


  // Fetch data on initial load from Supabase
  useEffect(() => {
    const loadData = async () => {
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
          supabase.from('siteContent').select('*').limit(1).single(),
          supabase.from('siteSettings').select('*').limit(1).single()
        ]);
        
        const checkError = (res: any, name: string) => { if (res.error) throw new Error(`Gagal memuat ${name}: ${res.error.message}`); return res.data; };
        
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
        addToast("Gagal memuat data. Pastikan kredensial Supabase benar.", 'error');
        console.error(err);
      }
      setIsLoading(false);
    };
    loadData();
  }, []);
  
  // Persist auth state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ adminPassword }));
    } catch (error) {
      console.warn('Error writing auth to localStorage', error);
    }
  }, [adminPassword]);

  const getSetter = (tableName: TableName) => {
      const setterName = `set${tableName.charAt(0).toUpperCase() + tableName.slice(1)}`;
      return (stateSetters as any)[setterName];
  }

  // Generic CRUD functions targeting Supabase
  const addItem = async (tableName: TableName, item: any) => {
    const { error } = await supabase.from(tableName).insert([item]).select();
    if (error) { addToast(`Gagal menambahkan item: ${error.message}`, 'error'); throw error; }
    
    const { data: refreshedData } = await supabase.from(tableName).select('*').order(tableName === 'saran' ? 'created_at' : 'id', { ascending: false });
    if(refreshedData) getSetter(tableName)(refreshedData);
  };
  
  const updateItem = async (tableName: TableName, id: number, item: any) => {
    const { error } = await supabase.from(tableName).update(item).eq('id', id).select();
    if (error) { addToast(`Gagal memperbarui item: ${error.message}`, 'error'); throw error; }
    
    const { data: refreshedData } = await supabase.from(tableName).select('*').order('id', { ascending: false });
    if(refreshedData) getSetter(tableName)(refreshedData);
  };
  
  const deleteItem = async (tableName: TableName, id: number) => {
    const { error } = await supabase.from(tableName).delete().eq('id', id);
    if (error) { addToast(`Gagal menghapus item: ${error.message}`, 'error'); throw error; }
    
    const { data: refreshedData } = await supabase.from(tableName).select('*').order(tableName === 'saran' ? 'created_at' : 'id', { ascending: false });
    if(refreshedData) getSetter(tableName)(refreshedData);
  };

  const addSaran = async (newSaran: Omit<Saran, 'id' | 'created_at'>) => {
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
    addToast('Kode akses yang Anda masukkan salah.', 'error');
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