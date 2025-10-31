export interface NavLink {
  id: number;
  name: string;
  href: string;
}

export interface SiteContent {
  // FIX: Add id property to match database schema and fix type errors.
  id: number;
  siteName: string;
  heroBackgroundImage: string;
  headerNavLinks: NavLink[];
  footerNavLinks: NavLink[];
  aboutOsisTitle: string;
  aboutOsisDescription: string;
  ideaGeneratorTitle: string;
  ideaGeneratorDescription: string;
  footerAboutText: string;
  contactAddress: string;
  googleMapsUrl: string;
  footerCopyrightText: string;
  footerCreditText: string;
}

export interface SiteSettings {
  // FIX: Add id property to match database schema and fix type errors.
  id: number;
  contactEmail: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
}

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export type AdminSection =
  | 'dashboard'
  | 'announcements'
  | 'events'
  | 'articles'
  | 'achievements'
  | 'gallery'
  | 'testimonials'
  | 'osisTeam'
  | 'stats'
  | 'content'
  | 'settings'
  | 'saran'
  | 'evoting';


export interface Announcement {
  id: number;
  category: string;
  title: string;
  date: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content: string; // Added for full article content
}

export interface Achievement {
  id: number;
  student: string;
  competition: string;
  level: string;
  image: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  quote: string;
}

export interface Stat {
    id: number;
    value: number;
    label: string;
    suffix?: string;
}

export interface Saran {
  id: number;
  name: string;
  class: string;
  suggestion: string;
  created_at: string;
}

export interface EVotingEvent {
  id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
}

export interface EVotingCandidate {
  id: number;
  event_id: number;
  name: string;
  image_url: string;
  vision: string;
  mission: string;
}

export interface EVotingToken {
  id: number;
  event_id: number;
  token: string;
  is_used: boolean;
  used_at: string | null;
  voted_for_candidate_id: number | null;
}
