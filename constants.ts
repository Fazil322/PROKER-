
import {
  SiteContent,
  SiteSettings,
// FIX: Add .ts extension to file import.
} from './types.ts';

// Default site content and settings.
// This data will be used on first load and can be updated from the admin panel.

export const INITIAL_SITE_CONTENT: SiteContent = {
  siteName: 'OSIS SMK LPPMRI 2 KDR',
  heroBackgroundImage: 'https://placehold.co/1920x1080/01348E/FFFFFF/png?text=SMK+LPPMRI+2+KEDUNGREJA',
  headerNavLinks: [
    { id: 1, name: 'Beranda', href: '#home' },
    { id: 2, name: 'Pengumuman', href: '#announcements' },
    { id: 3, name: 'Agenda', href: '#events' },
    { id: 4, name: 'Prestasi', href: '#achievements' },
    { id: 5, name: 'Tentang OSIS', href: '#about-osis' },
  ],
  footerNavLinks: [
    { id: 1, name: 'Beranda', href: '#home' },
    { id: 2, name: 'Artikel', href: '#news' },
    { id: 3, name: 'Galeri', href: '#gallery' },
    { id: 4, name: 'Kontak', href: '#footer' },
  ],
  aboutOsisTitle: 'Mengenal Pengurus OSIS Kami',
  aboutOsisDescription: 'Kami adalah tim yang berdedikasi untuk memajukan kegiatan siswa dan menjadi jembatan antara siswa dan sekolah. Kenali para penggerak di balik layar.',
  ideaGeneratorTitle: 'Butuh Ide Program Kerja?',
  ideaGeneratorDescription: 'Gunakan generator ide berbasis AI kami untuk mendapatkan inspirasi program kerja OSIS yang kreatif dan bermanfaat. Cukup masukkan tema, dan biarkan AI membantu Anda!',
  footerAboutText: 'Website ini adalah platform resmi OSIS SMK LPPMRI 2 Kedungreja untuk berbagi informasi, agenda, dan prestasi kepada seluruh warga sekolah.',
  contactAddress: 'Jl. Raya Tambaksari No.1, Kedungreja, Cilacap, Jawa Tengah 53263',
  googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.908585818464!2d108.8576793147761!3d-7.475143994607798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e650c82a0e28325%3A0x740e53a52642594a!2sSMK%20LPPMRI%202%20KEDUNGREJA!5e0!3m2!1sen!2sid!4v1672895427815!5m2!1sen!2sid',
  footerCopyrightText: '© 2023 OSIS SMK LPPMRI 2 Kedungreja. All Rights Reserved.',
  footerCreditText: 'Designed & Developed with ❤️',
};

export const INITIAL_SITE_SETTINGS: SiteSettings = {
    contactEmail: 'osis@smklppmri2kdr.sch.id',
    instagramUrl: 'https://instagram.com',
    facebookUrl: 'https://facebook.com',
    youtubeUrl: 'https://youtube.com',
};
