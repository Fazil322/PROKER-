export interface NavLink {
  id: number;
  name: string;
  href: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  cta1: string;
  cta2: string;
}

export interface Announcement {
  id: number;
  title: string;
  date: string;
  category: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  image: string;
  description: string;
}

export interface Article {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  image: string;
}

export interface Achievement {
  id: number;
  student: string;
  competition: string;
  level: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface Stat {
    id: number; // Add ID for keying
    label: string;
    value: number;
    suffix?: string;
}

export interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  quote: string;
}

export interface SiteSettings {
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  contactEmail: string;
}

export interface SiteContent {
  siteName: string;
  heroBackgroundImage: string;
  headerNavLinks: NavLink[];
  aboutOsisTitle: string;
  aboutOsisDescription: string;
  ideaGeneratorTitle: string;
  ideaGeneratorDescription: string;
  footerAboutText: string;
  footerNavLinks: NavLink[];
  contactAddress: string;
  googleMapsUrl: string;
  footerCopyrightText: string;
  footerCreditText: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export type AdminSection = 'dashboard' | 'hero' | 'announcements' | 'events' | 'articles' | 'achievements' | 'gallery' | 'testimonials' | 'stats' | 'about-osis' | 'settings' | 'content-appearance';