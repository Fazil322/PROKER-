import { NavLink, Announcement, Event, Article, Achievement, Testimonial, Stat, HeroData } from './types';

export const HERO_DATA: HeroData = {
  title: 'Membangun Generasi Emas',
  subtitle: 'Menjadi Wadah Aspirasi, Kreativitas, dan Prestasi Siswa SMK LPPMRI 2 Kedungreja.',
  cta1: 'Ikuti Acara Terbaru',
  cta2: 'Tentang Kami',
};

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'Tentang OSIS', href: '#about' },
  { name: 'Berita', href: '#articles' },
  { name: 'Agenda', href: '#events' },
  { name: 'Prestasi', href: '#achievements' },
  { name: 'Galeri', href: '#gallery' },
  { name: 'Kontak', href: '#contact' },
];

export const ANNOUNCEMENTS: Announcement[] = [
  { id: 1, title: 'Jadwal Ujian Akhir Semester Ganjil Telah Dirilis', date: '25 Nov 2023', category: 'Akademik' },
  { id: 2, title: 'Pendaftaran Ekstrakurikuler Baru Dibuka Hingga Akhir Bulan', date: '22 Nov 2023', category: 'Kesiswaan' },
  { id: 3, title: 'Pemilihan Ketua OSIS Periode 2024/2025 Akan Segera Dimulai', date: '20 Nov 2023', category: 'OSIS' },
];

export const EVENTS: Event[] = [
  { id: 1, title: 'Class Meeting: Turnamen Futsal Antar Jurusan', date: '2023-12-15T08:00:00', image: 'https://picsum.photos/seed/futsal/600/400', description: 'Tunjukkan kekompakan jurusanmu di lapangan!' },
  { id: 2, title: 'Pentas Seni & Bazar Kewirausahaan Akhir Tahun', date: '2023-12-22T10:00:00', image: 'https://picsum.photos/seed/pensi/600/400', description: 'Saksikan kreativitas siswa dan nikmati kuliner lezat.' },
  { id: 3, title: 'LDKS (Latihan Dasar Kepemimpinan Siswa) 2024', date: '2024-01-10T07:00:00', image: 'https://picsum.photos/seed/ldks/600/400', description: 'Membentuk jiwa pemimpin yang tangguh dan berkarakter.' },
];

export const ARTICLES: Article[] = [
  { id: 1, title: 'Tips Jitu Menghadapi Ujian Akhir Semester', category: 'Pendidikan', excerpt: 'Persiapan matang adalah kunci sukses. Simak beberapa tips efektif untuk...', image: 'https://picsum.photos/seed/studytips/600/400' },
  { id: 2, title: 'Tim Robotik SMK LPPMRI 2 Raih Juara di Kompetisi Nasional', category: 'Prestasi', excerpt: 'Sebuah pencapaian membanggakan kembali diukir oleh siswa-siswi terbaik...', image: 'https://picsum.photos/seed/robotic/600/400' },
  { id: 3, title: 'Liputan Lengkap Peringatan Hari Kemerdekaan di Sekolah', category: 'Event', excerpt: 'Semarak dan khidmat, begitulah suasana perayaan HUT RI ke-78 yang...', image: 'https://picsum.photos/seed/independenceday/600/400' },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 1, student: 'Ahmad Fauzi', competition: 'Juara 1 LKS Otomotif', level: 'Kabupaten', image: 'https://picsum.photos/seed/otomotif/500/500' },
  { id: 2, student: 'Siti Nurhaliza', competition: 'Juara 2 Cerdas Cermat Akuntansi', level: 'Provinsi', image: 'https://picsum.photos/seed/akuntansi/500/500' },
  { id: 3, student: 'Tim Basket Putra', competition: 'Juara 1 DBL Series', level: 'Regional', image: 'https://picsum.photos/seed/basket/500/500' },
];

export const GALLERY_IMAGES: string[] = [
  'https://picsum.photos/seed/gallery1/600/600',
  'https://picsum.photos/seed/gallery2/600/600',
  'https://picsum.photos/seed/gallery3/600/600',
  'https://picsum.photos/seed/gallery4/600/600',
  'https://picsum.photos/seed/gallery5/600/600',
  'https://picsum.photos/seed/gallery6/600/600',
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Budi Santoso', role: 'Siswa Kelas XII TKJ', quote: 'OSIS di sini sangat aktif! Banyak kegiatan seru yang membuat masa-masa sekolah jadi lebih berwarna dan bermanfaat. Bangga jadi bagian dari sekolah ini.', avatar: 'https://picsum.photos/seed/student1/100/100' },
  { id: 2, name: 'Ibu Rina Kartika, S.Pd.', role: 'Guru Bahasa Indonesia', quote: 'Program kerja OSIS sangat membantu dalam pengembangan soft skill siswa. Mereka belajar berorganisasi, berkomunikasi, dan memecahkan masalah. Sangat mendukung!', avatar: 'https://picsum.photos/seed/teacher1/100/100' },
  { id: 3, name: 'Andi Pratama', role: 'Alumni Angkatan 2020', quote: 'Website OSIS yang baru ini keren banget! Jauh lebih modern dan informatif. Jadi lebih mudah untuk tetap terhubung dan melihat perkembangan sekolah.', avatar: 'https://picsum.photos/seed/alumni1/100/100' },
];

export const STATS: Stat[] = [
    { id: 1, label: 'Siswa Aktif', value: 1250 },
    { id: 2, label: 'Jurusan', value: 5 },
    { id: 3, label: 'Ekstrakurikuler', value: 15 },
    { id: 4, label: 'Prestasi 2023', value: 42, suffix: '+' }
];