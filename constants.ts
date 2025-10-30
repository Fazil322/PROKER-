import { Announcement, Event, Article, Achievement, Testimonial, Stat, HeroData, TeamMember, SiteSettings, SiteContent, GalleryImage } from './types';

export const HERO_DATA: HeroData = {
  title: 'Membangun Generasi Emas',
  subtitle: 'Menjadi Wadah Aspirasi, Kreativitas, dan Prestasi Siswa SMK LPPMRI 2 Kedungreja.',
  cta1: 'Ikuti Acara Terbaru',
  cta2: 'Tentang Kami',
};

export const SITE_CONTENT: SiteContent = {
  siteName: "SMK LPPMRI 2 KEDUNGREJA",
  heroBackgroundImage: "https://picsum.photos/seed/school/1920/1080",
  headerNavLinks: [
    { id: 1, name: 'Home', href: '#home' },
    { id: 2, name: 'Tentang OSIS', href: '#about-osis' },
    { id: 3, name: 'Berita', href: '#articles' },
    { id: 4, name: 'Agenda', href: '#events' },
    { id: 5, name: 'Generator Ide', href: '#idea-generator' },
    { id: 6, name: 'Prestasi', href: '#achievements' },
    { id: 7, name: 'Galeri', href: '#gallery' },
    { id: 8, name: 'Kontak', href: '#contact' },
  ],
  aboutOsisTitle: "Tentang OSIS",
  aboutOsisDescription: "Kami adalah perwakilan siswa yang berdedikasi untuk menciptakan lingkungan sekolah yang positif, inspiratif, dan penuh dengan kesempatan berkembang bagi semua siswa SMK LPPMRI 2 Kedungreja.",
  ideaGeneratorTitle: "Butuh Ide Acara?",
  ideaGeneratorDescription: "Gunakan kekuatan AI untuk mendapatkan inspirasi program kerja atau acara sekolah yang kreatif. Cukup masukkan tema, dan biarkan kami bantu!",
  footerAboutText: "Platform digital untuk informasi, aspirasi, dan kolaborasi siswa. Membangun generasi yang aktif, kreatif, dan berprestasi.",
  footerNavLinks: [
    { id: 1, name: "Tentang Kami", href: "#about-osis" },
    { id: 2, name: "Program & Divisi", href: "#events" },
    { id: 3, name: "Database Prestasi", href: "#achievements" },
    { id: 4, name: "Kotak Saran Digital", href: "#contact" },
  ],
  contactAddress: "Jl. Raya Kedungreja No.1, Kedungreja, Cilacap, Jawa Tengah 53263",
  googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.57685608684!2d108.8313360147764!3d-7.512015294580665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e656c1d1aaaaaab%3A0xe54e1b80c102a0a2!2sSMK%20LPPMRI%202%20KEDUNGREJA!5e0!3m2!1sen!2sid!4v1672580000000",
  footerCopyrightText: "OSIS SMK LPPMRI 2 Kedungreja. All rights reserved.",
  footerCreditText: "Didesain dan dikembangkan dengan ❤️ oleh Tim OSIS."
};


export const OSIS_TEAM: TeamMember[] = [
  { id: 1, name: 'Adi Saputra', position: 'Ketua OSIS', image: 'https://picsum.photos/seed/ketua/500/500', quote: 'Memimpin dengan integritas untuk OSIS yang lebih baik.' },
  { id: 2, name: 'Bella Candra', position: 'Wakil Ketua OSIS', image: 'https://picsum.photos/seed/wakil/500/500', quote: 'Kolaborasi adalah kunci kesuksesan setiap program kerja.' },
  { id: 3, name: 'Rian Hidayat', position: 'Sekretaris', image: 'https://picsum.photos/seed/sekretaris/500/500', quote: 'Administrasi yang rapi adalah fondasi organisasi yang kuat.' },
  { id: 4, name: 'Dina Lestari', position: 'Bendahara', image: 'https://picsum.photos/seed/bendahara/500/500', quote: 'Transparansi anggaran untuk kepercayaan anggota.' },
];

export const ANNOUNCEMENTS: Announcement[] = [
  { id: 1, title: 'Jadwal Ujian Akhir Semester Ganjil Telah Dirilis', date: '25 Nov 2023', category: 'Akademik' },
  { id: 2, title: 'Pendaftaran Ekstrakurikuler Baru Dibuka Hingga Akhir Bulan', date: '22 Nov 2023', category: 'Kesiswaan' },
  { id: 3, title: 'Pemilihan Ketua OSIS Periode 2024/2025 Akan Segera Dimulai', date: '20 Nov 2023', category: 'OSIS' },
];

export const EVENTS: Event[] = [
  { id: 1, title: 'Class Meeting: Turnamen Futsal Antar Jurusan', date: '2023-12-15T08:00', image: 'https://picsum.photos/seed/futsal/600/400', description: 'Tunjukkan kekompakan jurusanmu di lapangan!' },
  { id: 2, title: 'Pentas Seni & Bazar Kewirausahaan Akhir Tahun', date: '2023-12-22T10:00', image: 'https://picsum.photos/seed/pensi/600/400', description: 'Saksikan kreativitas siswa dan nikmati kuliner lezat.' },
  { id: 3, title: 'LDKS (Latihan Dasar Kepemimpinan Siswa) 2024', date: '2024-01-10T07:00', image: 'https://picsum.photos/seed/ldks/600/400', description: 'Membentuk jiwa pemimpin yang tangguh dan berkarakter.' },
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

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, src: 'https://picsum.photos/seed/gallery1/600/600', alt: 'Kegiatan 1' },
  { id: 2, src: 'https://picsum.photos/seed/gallery2/600/600', alt: 'Kegiatan 2' },
  { id: 3, src: 'https://picsum.photos/seed/gallery3/600/600', alt: 'Kegiatan 3' },
  { id: 4, src: 'https://picsum.photos/seed/gallery4/600/600', alt: 'Kegiatan 4' },
  { id: 5, src: 'https://picsum.photos/seed/gallery5/600/600', alt: 'Kegiatan 5' },
  { id: 6, src: 'https://picsum.photos/seed/gallery6/600/600', alt: 'Kegiatan 6' },
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

export const SITE_SETTINGS: SiteSettings = {
  instagramUrl: 'https://instagram.com',
  facebookUrl: 'https://facebook.com',
  youtubeUrl: 'https://youtube.com',
  contactEmail: 'osis@smklppri2.sch.id'
};