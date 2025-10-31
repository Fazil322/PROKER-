import {
  SiteContent,
  SiteSettings,
  Announcement,
  Event,
  Article,
  Achievement,
  GalleryImage,
  Testimonial,
  TeamMember,
  Stat,
  Document,
  FinancialRecord,
} from './types.ts';

// Default site content and settings.
// This data will be used on first load and can be updated from the admin panel.

export const INITIAL_SITE_CONTENT: SiteContent = {
  // FIX: Add id to conform to the updated SiteContent type.
  id: 1,
  siteName: 'OSIS SMK LPPMRI 2 KDR',
  siteLogoUrl: 'https://placehold.co/200x60/0252BF/FFFFFF/png?text=OSIS+SMK',
  heroBackgroundImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
  headerNavLinks: [
    { id: 1, name: 'Beranda', href: '#home' },
    { id: 2, name: 'Pengumuman', href: '#announcements' },
    { id: 3, name: 'Agenda', href: '#events' },
    { id: 4, name: 'Prestasi', href: '#achievements' },
    { id: 5, name: 'Galeri', href: '#gallery' },
    { id: 6, name: 'Dokumen', href: '#documents' },
    { id: 7, name: 'Tentang OSIS', href: '#about-osis' },
  ],
  footerNavLinks: [
    { id: 1, name: 'Beranda', href: '#home' },
    { id: 2, name: 'Artikel', href: '#news' },
    { id: 3, name: 'Dokumen', href: '#documents' },
    { id: 4, name: 'Kontak', href: '#footer' },
  ],
  aboutOsisTitle: 'Mengenal Pengurus OSIS Kami',
  aboutOsisDescription: 'Kami adalah tim yang berdedikasi untuk memajukan kegiatan siswa dan menjadi jembatan antara siswa dan sekolah. Kenali para penggerak di balik layar.',
  ideaGeneratorTitle: 'Butuh Ide Untuk Program OSIS?',
  ideaGeneratorDescription: 'Gunakan kekuatan AI untuk mendapatkan inspirasi. Cukup masukkan tema, dan biarkan kami memberikan ide-ide program kerja yang kreatif dan inovatif untuk Anda.',
  footerAboutText: 'Website ini adalah platform resmi OSIS SMK LPPMRI 2 Kedungreja untuk berbagi informasi, agenda, dan prestasi kepada seluruh warga sekolah.',
  contactAddress: 'Jl. Raya Tambaksari No.1, Kedungreja, Cilacap, Jawa Tengah 53263',
  googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.908585818464!2d108.8576793147761!3d-7.475143994607798!2m3!1f0!2f0!3f0!3m2!i1024!i768!4f13.1!3m3!1m2!1s0x2e650c82a0e28325%3A0x740e53a52642594a!2sSMK%20LPPMRI%202%20KEDUNGREJA!5e0!3m2!1sen!2sid!4v1672895427815!5m2!1sen!2sid',
  footerCopyrightText: '© 2023 OSIS SMK LPPMRI 2 Kedungreja. All Rights Reserved.',
  footerCreditText: 'Designed & Developed with ❤️',
};

export const INITIAL_SITE_SETTINGS: SiteSettings = {
    // FIX: Add id to conform to the updated SiteSettings type.
    id: 1,
    contactEmail: 'osis@smklppmri2kdr.sch.id',
    instagramUrl: 'https://instagram.com',
    facebookUrl: 'https://facebook.com',
    youtubeUrl: 'https://youtube.com',
};

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  { id: 1, category: 'Akademik', title: 'Jadwal Ujian Akhir Semester (UAS) Ganjil Telah Dirilis', date: '20 Desember 2023' },
  { id: 2, category: 'Kegiatan OSIS', title: 'Pendaftaran Lomba Class Meeting Dibuka!', date: '18 Desember 2023' },
  { id: 3, category: 'Umum', title: 'Libur Semester Ganjil Dimulai Tanggal 25 Desember 2023', date: '15 Desember 2023' },
];

export const INITIAL_EVENTS: Event[] = [
  { id: 1, title: 'Lomba Cerdas Cermat Antar Kelas', date: '2024-08-17T09:00:00', time: '09:00 - 12:00', location: 'Aula Sekolah', description: 'Adu wawasan dan pengetahuan umum dalam LCC tahunan.', is_registration_open: true },
  { id: 2, title: 'Bakti Sosial Panti Asuhan', date: '2024-09-10T08:00:00', time: '08:00 - Selesai', location: 'Panti Asuhan Kasih Bunda', description: 'Berbagi kebahagiaan dan keceriaan bersama adik-adik panti.', is_registration_open: false },
  { id: 3, title: 'Live: Pengumuman Pemenang E-Voting', date: '2024-09-15T10:00:00', time: '10:00 - 11:00', location: 'YouTube Channel', description: 'Saksikan pengumuman ketua OSIS baru secara langsung!', is_live: true, live_stream_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
];

export const INITIAL_ARTICLES: Article[] = [
  { id: 1, title: 'Tips Jitu Menghadapi Ujian Akhir Semester', author: 'Andi Pratama', date: '18 Desember 2023', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', excerpt: 'UAS sudah di depan mata. Jangan panik! Simak beberapa tips efektif untuk mempersiapkan diri agar hasil maksimal.', content: '## Persiapan Adalah Kunci\n\nMenghadapi Ujian Akhir Semester (UAS) seringkali menjadi momen yang menegangkan. Namun, dengan persiapan yang matang, Anda bisa melaluinya dengan lebih tenang dan percaya diri.\n\n### 1. Buat Jadwal Belajar\n   - Alokasikan waktu untuk setiap mata pelajaran.\n   - Jangan belajar terlalu lama dalam satu sesi. Istirahat sejenak sangat penting.\n\n### 2. Pahami Konsep, Bukan Menghafal\n   - Cobalah untuk memahami inti dari setiap materi.\n   - Buat rangkuman atau *mind map* untuk membantu visualisasi.\n\n### 3. Jaga Kesehatan\n   - Pastikan tidur cukup.\n   - Konsumsi makanan bergizi dan jangan lupakan sarapan.\n\nSemoga berhasil!' },
  { id: 2, title: 'Pentingnya Kegiatan Ekstrakurikuler bagi Siswa', author: 'Siti Aminah', date: '15 Desember 2023', image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', excerpt: 'Ekstrakurikuler bukan hanya ajang bersenang-senang, tapi juga wadah penting untuk mengembangkan soft skill.', content: '## Lebih dari Sekedar Hobi\n\nKegiatan ekstrakurikuler memberikan banyak manfaat yang tidak didapatkan di dalam kelas. Ini adalah kesempatan emas untuk mengembangkan diri.\n\n- **Kerja Tim:** Belajar bekerja sama dalam sebuah tim untuk mencapai tujuan bersama.\n- **Kepemimpinan:** Mengambil peran dan tanggung jawab dalam sebuah organisasi.\n- **Manajemen Waktu:** Menyeimbangkan antara kewajiban akademik dan kegiatan non-akademik.\n\nJadi, jangan ragu untuk bergabung dengan ekstrakurikuler yang kamu minati!' },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 1, student: 'Tim Robotik', competition: 'Juara 1 Lomba Robotik Nasional', level: 'Nasional', image: 'https://images.unsplash.com/photo-1618303030238-2d3c35b46e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80' },
  { id: 2, student: 'Anisa Putri', competition: 'Medali Emas Olimpiade Sains', level: 'Provinsi', image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80' },
  { id: 3, student: 'Budi Hartono', competition: 'Juara 2 Lomba Pidato Bahasa Inggris', level: 'Kabupaten', image: 'https://images.unsplash.com/photo-1627993202684-27925a363f70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80' },
];

export const INITIAL_GALLERY: GalleryImage[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', alt: 'Suasana belajar di kelas' },
  { id: 2, src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', alt: 'Diskusi kelompok siswa' },
  { id: 3, src: 'https://images.unsplash.com/photo-1594312918235-a72922616943?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', alt: 'Kegiatan olahraga di lapangan sekolah' },
  { id: 4, src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', alt: 'Presentasi program kerja OSIS' },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Bpk. Drs. Subroto', role: 'Kepala Sekolah', quote: 'Website OSIS ini adalah langkah maju yang luar biasa untuk transparansi dan komunikasi di lingkungan sekolah kita.', avatar: 'https://placehold.co/100x100/EFEFEF/333333/png?text=KS' },
  { id: 2, name: 'Rina Wijayanti', role: 'Alumni 2022', quote: 'Senang melihat OSIS semakin modern dan informatif. Ini sangat membantu adik-adik kelas untuk tetap update.', avatar: 'https://placehold.co/100x100/EFEFEF/333333/png?text=AL' },
  { id: 3, name: 'Ibu Endang S.', role: 'Orang Tua Siswa', quote: 'Sebagai orang tua, saya merasa lebih mudah memantau kegiatan anak di sekolah melalui website ini. Terima kasih!', avatar: 'https://placehold.co/100x100/EFEFEF/333333/png?text=OT' },
];

export const INITIAL_OSIS_TEAM: TeamMember[] = [
  { id: 1, name: 'Ahmad Zulkifli', position: 'Ketua OSIS', image: 'https://placehold.co/200x200/DFF0FF/0252BF/png?text=AZ', quote: 'Bersama kita bisa.' },
  { id: 2, name: 'Citra Lestari', position: 'Wakil Ketua OSIS', image: 'https://placehold.co/200x200/DFF0FF/0252BF/png?text=CL', quote: 'Inovasi tiada henti.' },
  { id: 3, name: 'Bayu Nugroho', position: 'Sekretaris', image: 'https://placehold.co/200x200/DFF0FF/0252BF/png?text=BN', quote: 'Administrasi rapi.' },
  { id: 4, name: 'Diana Puspita', position: 'Bendahara', image: 'https://placehold.co/200x200/DFF0FF/0252BF/png?text=DP', quote: 'Keuangan transparan.' },
];

export const INITIAL_STATS: Stat[] = [
    { id: 1, value: 15, label: 'Program Kerja', suffix: '+', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM10.5 16.5h3.75" /></svg>' },
    { id: 2, value: 500, label: 'Siswa Terlibat', suffix: '+', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962A3.75 3.75 0 0115 9.75c0 1.036-.394 2.006-1.057 2.762A3.75 3.75 0 019.75 9.75c0-1.036.394-2.006 1.057-2.762A3.75 3.75 0 0112 3.75c1.036 0 2.006.394 2.762 1.057m-2.962 7.5a3.75 3.75 0 01-2.762 1.057 3.75 3.75 0 01-2.762-1.057A3.75 3.75 0 016 12c0-1.036.394-2.006 1.057-2.762A3.75 3.75 0 019.75 9.75c1.036 0 2.006.394 2.762 1.057m-7.5 0A3.75 3.75 0 016 12c0-1.036.394-2.006 1.057-2.762a3.75 3.75 0 015.524 0A3.75 3.75 0 0115 12c0 1.036-.394 2.006-1.057 2.762m-1.057-2.762a3.75 3.75 0 00-2.762-1.057 3.75 3.75 0 00-2.762 1.057A3.75 3.75 0 003 12c0 1.036.394 2.006 1.057 2.762A3.75 3.75 0 006.75 15c1.036 0 2.006-.394 2.762-1.057m-2.962-7.5a3.75 3.75 0 00-2.762-1.057A3.75 3.75 0 003 9.75c0 1.036.394 2.006 1.057 2.762a3.75 3.75 0 005.524 0A3.75 3.75 0 0012 9.75c-1.036 0-2.006-.394-2.762-1.057z" /></svg>' },
    { id: 3, value: 10, label: 'Ekstrakurikuler', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a17.96 17.96 0 01-1.262 3.02M12 21a9 9 0 110-18 9 9 0 010 18z" /></svg>' },
    { id: 4, value: 5, label: 'Prestasi Terbaru', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 011.05-4.319l.1-.198a.5.5 0 00-.342-.888H3.623a.5.5 0 00-.412.82L3 15m18 0l-1.06-2.12a.5.5 0 00-.82-.278L16.5 13.5M21 15h-3.377a.5.5 0 00-.412.82l.223.444a9.75 9.75 0 01-1.05 4.319h9M12 1.5v4.5m0 0l-3.235 2.022a.5.5 0 00-.265.42V12m.265-.42a.5.5 0 01.265.42v3.528a.5.5 0 00.265.42L12 18m0-4.5l3.235 2.022a.5.5 0 00.265-.42V8.452a.5.5 0 00-.265-.42L12 6m-3.235 2.022a.5.5 0 00-.265.42V12m6.47-3.528a.5.5 0 00.265.42V12" /></svg>' },
];

export const INITIAL_DOCUMENTS: Document[] = [
    { id: 1, title: 'Program Kerja OSIS 2023/2024', description: 'Rencana kerja tahunan OSIS periode 2023/2024.', file_url: '#', category: 'Program Kerja' },
    { id: 2, title: 'Laporan Pertanggungjawaban 2022/2023', description: 'Laporan akhir kegiatan OSIS periode sebelumnya.', file_url: '#', category: 'Laporan' },
    { id: 3, title: 'AD/ART OSIS', description: 'Anggaran Dasar dan Anggaran Rumah Tangga OSIS.', file_url: '#', category: 'Aturan' },
];

export const INITIAL_FINANCIALS: FinancialRecord[] = [
    { id: 1, category: 'Kegiatan Siswa', amount: 4500000, type: 'expense', period: '2023/2024' },
    { id: 2, category: 'Administrasi', amount: 1500000, type: 'expense', period: '2023/2024' },
    { id: 3, category: 'Pengembangan Diri', amount: 2500000, type: 'expense', period: '2023/2024' },
    { id: 4, category: 'Lain-lain', amount: 500000, type: 'expense', period: '2023/2024' },
    { id: 5, category: 'Dana Sekolah', amount: 9000000, type: 'income', period: '2023/2024' },
];