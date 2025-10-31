import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.ts';
import {
  Announcement, Event, Article, Achievement, GalleryImage, Testimonial, TeamMember, Stat, SiteContent, SiteSettings, AdminSection, Toast, Saran,
  EVotingEvent, EVotingCandidate, EVotingToken, Document, FinancialRecord, EventRegistration
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
  INITIAL_STATS,
  INITIAL_DOCUMENTS,
  INITIAL_FINANCIALS
} from '../constants.ts';

const AUTH_STORAGE_KEY = 'osis-website-auth';

// Helper type for table names
export type TableName = 'announcements' | 'events' | 'articles' | 'achievements' | 'gallery' | 'testimonials' | 'osisTeam' | 'stats' | 'saran' | 'siteContent' | 'siteSettings' | 'evoting_events' | 'evoting_candidates' | 'evoting_tokens' | 'documents' | 'financials' | 'event_registrations';

const tableSortConfig: Record<string, { column: string; ascending: boolean }> = {
    events: { column: 'date', ascending: true },
    osisTeam: { column: 'id', ascending: true },
    stats: { column: 'id', ascending: true },
    saran: { column: 'created_at', ascending: false },
};

interface ActiveEVotingEvent extends EVotingEvent {
  candidates: EVotingCandidate[];
}

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
  documents: Document[];
  financials: FinancialRecord[];
  siteContent: SiteContent;
  siteSettings: SiteSettings;
  saran: Saran[];
  activeEVotingEvent: ActiveEVotingEvent | null;
  
  // Loading and error states
  isLoading: boolean;
  error: string | null;

  // CRUD Functions
  addItem: (tableName: TableName, item: Omit<any, 'id' | 'created_at'>) => Promise<any>;
  updateItem: (tableName: TableName, id: number, item: Omit<any, 'id' | 'created_at'>) => Promise<void>;
  deleteItem: (tableName: TableName, id: number) => Promise<void>;
  updateSiteContent: (newContent: SiteContent) => Promise<void>;
  updateSiteSettings: (newSettings: SiteSettings) => Promise<void>;
  addSaran: (newSaran: Omit<Saran, 'id' | 'created_at'>) => Promise<void>;
  registerForEvent: (registration: Omit<EventRegistration, 'id' | 'registered_at'>) => Promise<void>;
  getRegistrationsForEvent: (eventId: number) => Promise<EventRegistration[]>;

  // E-Voting Functions
  castVote: (token: string, candidateId: number, eventId: number) => Promise<{success: boolean, message: string}>;
  fetchEVotingEvents: () => Promise<EVotingEvent[]>;
  fetchCandidatesForEvent: (eventId: number) => Promise<EVotingCandidate[]>;
  generateTokens: (eventId: number, count: number) => Promise<string[]>;
  getVoteResults: (eventId: number) => Promise<Array<{candidate_id: number; vote_count: number; name: string;}>>;


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

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

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
  const [documents, setDocuments] = useState<Document[]>(INITIAL_DOCUMENTS);
  const [financials, setFinancials] = useState<FinancialRecord[]>(INITIAL_FINANCIALS);
  const [siteContent, _setSiteContent] = useState<SiteContent>(INITIAL_SITE_CONTENT);
  const [siteSettings, _setSiteSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [saran, setSaran] = useState<Saran[]>([]);
  const [activeEVotingEvent, setActiveEVotingEvent] = useState<ActiveEVotingEvent | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeAdminSection, setActiveAdminSection] = useState<AdminSection>('dashboard');
  const [adminPassword, setAdminPassword] = useState(getInitialAuthState().adminPassword);

  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const stateSetters = {
    setAnnouncements, setEvents, setArticles, setAchievements, setGallery, setTestimonials, setOsisTeam, setStats, setSaran, setDocuments, setFinancials
  };

  useEffect(() => {
    const loadData = async () => {
        setIsLoading(true);
        setError(null);
        
        const tableConfigs = [
            { name: 'announcements', setter: setAnnouncements, order: { column: 'id', ascending: false } },
            { name: 'events', setter: setEvents, order: { column: 'date', ascending: true } },
            { name: 'articles', setter: setArticles, order: { column: 'id', ascending: false } },
            { name: 'achievements', setter: setAchievements, order: { column: 'id', ascending: false } },
            { name: 'gallery', setter: setGallery, order: { column: 'id', ascending: false } },
            { name: 'testimonials', setter: setTestimonials, order: { column: 'id', ascending: false } },
            { name: 'osisTeam', setter: setOsisTeam, order: { column: 'id', ascending: true } },
            { name: 'stats', setter: setStats, order: { column: 'id', ascending: true } },
            { name: 'saran', setter: setSaran, order: { column: 'created_at', ascending: false } },
            { name: 'documents', setter: setDocuments, order: { column: 'id', ascending: false } },
            { name: 'financials', setter: setFinancials, order: { column: 'id', ascending: false } },
        ];
        
        const dataPromises = tableConfigs.map(config => 
            supabase.from(config.name).select('*').order(config.order.column, { ascending: config.order.ascending })
        );
        const singleDataPromises = [
            supabase.from('siteContent').select('*').limit(1).single(),
            supabase.from('siteSettings').select('*').limit(1).single()
        ];
        
        const allPromises = [...dataPromises, ...singleDataPromises];
        const results = await Promise.allSettled(allPromises);

        // Process results for array data
        results.slice(0, tableConfigs.length).forEach((result, index) => {
            const config = tableConfigs[index];
            if (result.status === 'fulfilled') {
                const { data, error } = result.value as { data: any[] | null, error: any | null };
                if (error && error.code !== 'PGRST116') { // PGRST116: "The result contains 0 rows"
                    console.error(`Error loading ${config.name}:`, error.message);
                } else {
                    config.setter(data || []);
                }
            } else {
                console.warn(`[Robustness] Gagal memuat tabel '${config.name}'. Fitur terkait mungkin tidak akan tampil. Pesan:`, result.reason.message);
                config.setter([]); // Set empty array on failure
            }
        });
        
        // Process results for single objects
        const siteContentResult = results[tableConfigs.length];
        if (siteContentResult.status === 'fulfilled') {
            const { data, error } = siteContentResult.value as { data: SiteContent | null, error: any | null };
            if (data && !error) _setSiteContent(data);
            else console.warn("Failed to fetch siteContent, using initial data.");
        } else console.warn("Promise for siteContent rejected:", siteContentResult.reason.message);
        
        const siteSettingsResult = results[tableConfigs.length + 1];
        if (siteSettingsResult.status === 'fulfilled') {
            const { data, error } = siteSettingsResult.value as { data: SiteSettings | null, error: any | null };
            if (data && !error) _setSiteSettings(data);
            else console.warn("Failed to fetch siteSettings, using initial data.");
        } else console.warn("Promise for siteSettings rejected:", siteSettingsResult.reason.message);

        // Gracefully fetch e-voting data
        try {
            const { data: activeEventData, error: activeEventError } = await supabase
                .from('evoting_events')
                .select('*')
                .eq('is_active', true)
                .limit(1)
                .single();

            if (activeEventError && activeEventError.code !== 'PGRST116') {
                throw activeEventError;
            }

            if (activeEventData) {
                const { data: candidates, error: candidatesError } = await supabase.from('evoting_candidates').select('*').eq('event_id', activeEventData.id);
                if (candidatesError) throw candidatesError;
                setActiveEVotingEvent({ ...activeEventData, candidates: candidates || [] });
            } else {
                setActiveEVotingEvent(null);
            }
        } catch (evotingErr: any) {
            console.warn(`[Robustness] Gagal memuat fitur E-Voting. Pastikan tabel 'evoting_events' dan 'evoting_candidates' ada. Pesan:`, evotingErr.message);
            setActiveEVotingEvent(null);
        }

        setIsLoading(false);
    };
    loadData();
  }, []);
  
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

  const refreshData = async (tableName: TableName) => {
      if (tableName.startsWith('evoting') || tableName === 'event_registrations') return;

      const sortConfig = tableSortConfig[tableName] || { column: 'id', ascending: false };

      try {
        const { data, error } = await supabase
            .from(tableName)
            .select('*')
            .order(sortConfig.column, { ascending: sortConfig.ascending });

        if (error) throw error;

        if (tableName === 'siteContent') {
            _setSiteContent(data[0] || INITIAL_SITE_CONTENT);
        } else if (tableName === 'siteSettings') {
            _setSiteSettings(data[0] || INITIAL_SITE_SETTINGS);
        } else {
            const setter = getSetter(tableName);
            if(setter) setter(data);
        }

      } catch (error: any) {
          console.error(`Error refreshing ${tableName}:`, error);
          addToast(`Gagal menyegarkan data ${tableName}.`, 'error');
      }
  };

  const addItem = async (tableName: TableName, item: Omit<any, 'id'| 'created_at' | 'registered_at'>) => {
      try {
          const { data, error } = await supabase.from(tableName).insert([item]).select();
          if (error) throw error;
          refreshData(tableName);
          return data;
      } catch (error: any) {
          console.error(`Error adding item to ${tableName}:`, error);
          addToast(`Gagal menambahkan item baru: ${error.message}`, 'error');
          throw error;
      }
  };

  const updateItem = async (tableName: TableName, id: number, item: Omit<any, 'id'| 'created_at' | 'registered_at'>) => {
      try {
          const { error } = await supabase.from(tableName).update(item).eq('id', id);
          if (error) throw error;
          refreshData(tableName);
      } catch (error: any) {
          console.error(`Error updating item in ${tableName}:`, error);
          addToast(`Gagal memperbarui item: ${error.message}`, 'error');
          throw error;
      }
  };

  const deleteItem = async (tableName: TableName, id: number) => {
      try {
          const { error } = await supabase.from(tableName).delete().eq('id', id);
          if (error) throw error;
          refreshData(tableName);
      } catch (error: any) {
          console.error(`Error deleting item from ${tableName}:`, error);
          addToast(`Gagal menghapus item: ${error.message}`, 'error');
          throw error;
      }
  };
  
  const updateSiteContent = async (newContent: SiteContent) => {
      try {
          const { id, ...contentWithoutId } = newContent;
          const { error } = await supabase.from('siteContent').update(contentWithoutId).eq('id', id);
          if (error) throw error;
          _setSiteContent(newContent);
      } catch (error: any) {
          console.error(`Error updating site content:`, error);
          addToast(`Gagal menyimpan konten: ${error.message}`, 'error');
          throw error;
      }
  };
  
  const updateSiteSettings = async (newSettings: SiteSettings) => {
      try {
           const { id, ...settingsWithoutId } = newSettings;
          const { error } = await supabase.from('siteSettings').update(settingsWithoutId).eq('id', id);
          if (error) throw error;
          _setSiteSettings(newSettings);
      } catch (error: any) {
          console.error(`Error updating site settings:`, error);
          addToast(`Gagal menyimpan pengaturan: ${error.message}`, 'error');
          throw error;
      }
  };

  const addSaran = async (newSaran: Omit<Saran, 'id' | 'created_at'>) => {
    try {
        await addItem('saran', newSaran);
        addToast('Saran Anda berhasil dikirim. Terima kasih!', 'success');
    } catch (error) {
        console.error("Failed to submit suggestion:", error);
    }
  };
  
  const registerForEvent = async (registration: Omit<EventRegistration, 'id' | 'registered_at'>) => {
    try {
        await addItem('event_registrations', registration);
        addToast('Anda berhasil terdaftar!', 'success');
    } catch (error) {
        console.error("Failed to register for event:", error);
    }
  };

  const getRegistrationsForEvent = async (eventId: number): Promise<EventRegistration[]> => {
      try {
          const { data, error } = await supabase
              .from('event_registrations')
              .select('*')
              .eq('event_id', eventId)
              .order('registered_at', { ascending: false });
          if (error) throw error;
          return data;
      } catch (error: any) {
          console.error('Failed to fetch registrations:', error);
          addToast(`Gagal memuat pendaftar: ${error.message}`, 'error');
          return [];
      }
  };

  const addToast = (message: string, type: Toast['type']) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const login = (password: string) => {
    if (password === adminPassword) {
      setIsLoggedIn(true);
      setShowLogin(false);
      addToast('Login berhasil!', 'success');
      return true;
    }
    addToast('Kode akses salah!', 'error');
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    addToast('Anda telah logout.', 'info');
  };
  
  const updatePassword = (current: string, newPass: string) => {
      if (current === adminPassword) {
          setAdminPassword(newPass);
          addToast('Kata sandi berhasil diubah!', 'success');
          return true;
      }
      addToast('Kata sandi saat ini salah!', 'error');
      return false;
  };

  // E-VOTING RPC FUNCTIONS
  const castVote = async (token: string, candidateId: number, eventId: number) => {
      const { data, error } = await supabase.rpc('cast_vote', {
          token_text: token,
          candidate_id_vote: candidateId,
          event_id_vote: eventId
      });
      if (error) {
          console.error("Error casting vote:", error);
          return { success: false, message: 'Terjadi kesalahan internal.' };
      }
      return data[0] || { success: false, message: 'Respons tidak valid dari server.' };
  };

  const fetchEVotingEvents = async (): Promise<EVotingEvent[]> => {
      const { data, error } = await supabase.from('evoting_events').select('*').order('id', { ascending: false });
      if (error) {
          addToast('Gagal memuat acara e-voting', 'error');
          console.error(error);
          return [];
      }
      return data;
  };

  const fetchCandidatesForEvent = async (eventId: number): Promise<EVotingCandidate[]> => {
      const { data, error } = await supabase.from('evoting_candidates').select('*').eq('event_id', eventId).order('id');
      if (error) {
          addToast('Gagal memuat kandidat', 'error');
          console.error(error);
          return [];
      }
      return data;
  };

  const generateTokens = async (eventId: number, count: number): Promise<string[]> => {
      const newTokens = [];
      for (let i = 0; i < count; i++) {
          const token = Math.random().toString(36).substring(2, 8).toUpperCase();
          newTokens.push({ event_id: eventId, token });
      }
      
      const { data, error } = await supabase.from('evoting_tokens').insert(newTokens).select('token');
      
      if (error) {
          addToast(`Gagal membuat token: ${error.message}`, 'error');
          console.error(error);
          return [];
      }
      
      addToast(`${data.length} token berhasil dibuat!`, 'success');
      return data.map(t => t.token);
  };
  
  const getVoteResults = async(eventId: number) => {
      const { data, error } = await supabase.rpc('get_vote_results', { event_id_input: eventId });
       if (error) {
          addToast('Gagal mengambil hasil voting', 'error');
          console.error(error);
          return [];
      }
      return data;
  };

  const value = {
    announcements, events, articles, achievements, gallery, testimonials, osisTeam, stats, documents, financials, siteContent, siteSettings, saran, activeEVotingEvent,
    isLoading, error,
    addItem, updateItem, deleteItem, updateSiteContent, updateSiteSettings, addSaran, registerForEvent, getRegistrationsForEvent,
    castVote, fetchEVotingEvents, fetchCandidatesForEvent, generateTokens, getVoteResults,
    isLoggedIn, login, logout, showLogin, setShowLogin, activeAdminSection, setActiveAdminSection, updatePassword,
    toasts, addToast,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};