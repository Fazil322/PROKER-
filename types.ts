
export interface NavLink {
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

export type AdminSection = 'dashboard' | 'hero' | 'announcements' | 'events' | 'articles' | 'achievements' | 'gallery' | 'testimonials' | 'stats';
