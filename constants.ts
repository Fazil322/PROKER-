
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
  Saran,
// FIX: Add .ts extension to file import.
} from './types.ts';

// Some mock data for the application. In a real app, this would come from a CMS or API.

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  { id: 1, category: 'Akademik', title: 'Jadwal Ujian Akhir Semester Ganjil 2023/2024', date: '1 Des 2023' },
  { id: 2, category: 'OSIS', title: 'Pendaftaran Calon Ketua OSIS Periode 2024/2025 Dibuka!', date: '28 Nov 2023' },
  { id: 3, category: 'Ekstrakurikuler', title: 'Lomba Cerdas Cermat Antar Kelas', date: '25 Nov 2023' },
];

export const INITIAL_EVENTS: Event[] = [
  { id: 1, title: 'Class Meeting', date: '2023-12-18T08:00', time: '08:00', location: 'Lapangan Sekolah', description: 'Pertandingan Futsal dan Basket antar kelas.' },
  { id: 2, title: 'Peringatan Hari Guru', date: '2023-11-25T07:30', time: '07:30', location: 'Aula Sekolah', description: 'Upacara dan persembahan dari siswa untuk para guru.' },
  { id: 3, title: 'Studi Tur ke Museum Geologi', date: '2024-01-15T07:00', time: '07:00', location: 'Bandung', description: 'Kegiatan belajar di luar sekolah untuk kelas XI.' },
];

export const INITIAL_ARTICLES: Article[] = [
    { id: 1, title: 'Tips Menghadapi Ujian dengan Tenang', author: 'Budi Sanjaya', date: '30 Nov 2023', image: 'https://placehold.co/600x400/01348E/FFFFFF/png?text=Tips+Ujian', excerpt: 'Ujian seringkali menjadi momen yang menegangkan. Berikut adalah beberapa tips untuk tetap tenang dan fokus...' },
    { id: 2, title: 'Mengenal Lebih Dekat Ekstrakurikuler Paskibra', author: 'Siti Aminah', date: '27 Nov 2023', image: 'https://placehold.co/600x400/F2C438/000000/png?text=Paskibra', excerpt: 'Paskibra bukan hanya tentang baris-berbaris, tetapi juga tentang disiplin, kepemimpinan, dan cinta tanah air...' },
    { id: 3, title: 'Karya Siswa: Puisi "Mentari Pagi"', author: 'Kelas X-A', date: '24 Nov 2023', image: 'https://placehold.co/600x400/DB4D21/FFFFFF/png?text=Puisi', excerpt: 'Sebuah puisi indah yang diciptakan oleh siswa-siswi berbakat dari kelas X-A, menangkap semangat pagi di sekolah kita...' },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 1, student: 'Ahmad Zulkarnain', competition: 'Juara 1 Lomba Catur', level: 'Tingkat Kabupaten', image: 'https://i.pravatar.cc/150?u=ach1' },
  { id: 2, student: 'Rina Wulandari', competition: 'Medali Emas Olimpiade Sains', level: 'Tingkat Provinsi', image: 'https://i.pravatar.cc/150?u=ach2' },
  { id: 3, student: 'Tim Futsal', competition: 'Juara 2 Turnamen Futsal', level: 'Antar Sekolah', image: 'https://placehold.co/150x150/01348E/FFFFFF/png?text=Tim' },
];

export const INITIAL_GALLERY: GalleryImage[] = [
    { id: 1, src: 'https://placehold.co/800x600/01348E/FFFFFF/png?text=Galeri+1', alt: 'Kegiatan Sekolah 1' },
    { id: 2, src: 'https://placehold.co/800x600/F2C438/000000/png?text=Galeri+2', alt: 'Kegiatan Sekolah 2' },
    { id: 3, src: 'https://placehold.co/800x600/DB4D21/FFFFFF/png?text=Galeri+3', alt: 'Kegiatan Sekolah 3' },
    { id: 4, src: 'https://placehold.co/800x600/3498db/FFFFFF/png?text=Galeri+4', alt: 'Kegiatan Sekolah 4' },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Bapak H. Sutrisno, S.Pd.', role: 'Kepala Sekolah', quote: 'Sekolah ini tidak hanya fokus pada akademik, tapi juga pembentukan karakter siswa yang berakhlak mulia.', avatar: 'https://i.pravatar.cc/150?u=test1' },
  { id: 2, name: 'Anisa Putri', role: 'Alumni 2022, Mahasiswa UI', quote: 'Ilmu dan pengalaman organisasi yang saya dapatkan di sini sangat membantu saya di jenjang perkuliahan.', avatar: 'https://i.pravatar.cc/150?u=test2' },
  { id: 3, name: 'Ibu Ratna', role: 'Orang Tua Siswa', quote: 'Saya melihat perkembangan positif pada anak saya sejak bersekolah di sini. Guru-gurunya sangat perhatian.', avatar: 'https://i.pravatar.cc/150?u=test3' },
];

export const INITIAL_OSIS_TEAM: TeamMember[] = [
    { id: 1, name: 'Andi Pratama', position: 'Ketua OSIS', image: 'https://i.pravatar.cc/150?u=osis1', quote: "Memimpin dengan hati, melayani dengan aksi." },
    { id: 2, name: 'Citra Kirana', position: 'Wakil Ketua OSIS', image: 'https://i.pravatar.cc/150?u=osis2', quote: "Kolaborasi adalah kunci kesuksesan bersama." },
    { id: 3, name: 'Bagas Sanjaya', position: 'Sekretaris', image: 'https://i.pravatar.cc/150?u=osis3', quote: "Setiap detail penting untuk hasil yang maksimal." },
    { id: 4, name: 'Dewi Lestari', position: 'Bendahara', image: 'https://i.pravatar.cc/150?u=osis4', quote: "Transparansi membangun kepercayaan." },
];

export const INITIAL_STATS: Stat[] = [
    { id: 1, value: 1250, label: 'Siswa Aktif', suffix: '+' },
    { id: 2, value: 75, label: 'Guru & Staf' },
    { id: 3, value: 12, label: 'Ekstrakurikuler' },
    { id: 4, value: 4, label: 'Jurusan' },
];

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

export const INITIAL_SARAN: Saran[] = [
    { id: 1, name: 'Budi', class: 'XI TKJ 1', suggestion: 'Mohon adakan workshop tentang desain grafis.', createdAt: '2023-11-20T10:00:00Z' },
    { id: 2, name: 'Ani', class: 'X AKL 2', suggestion: 'Perbanyak koleksi buku di perpustakaan, terutama novel remaja.', createdAt: '2023-11-21T14:30:00Z' },
];
