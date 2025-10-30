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
// FIX: Add .ts extension to file import.
} from './types.ts';

// Default site content and settings.
// This data will be used on first load and can be updated from the admin panel.

export const INITIAL_SITE_CONTENT: SiteContent = {
  siteName: 'OSIS SMK LPPMRI 2 KDR',
  heroBackgroundImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
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

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  { id: 1, category: 'Akademik', title: 'Jadwal Ujian Akhir Semester (UAS) Ganjil Telah Dirilis', date: '20 Desember 2023' },
  { id: 2, category: 'Kegiatan OSIS', title: 'Pendaftaran Lomba Class Meeting Dibuka!', date: '18 Desember 2023' },
  { id: 3, category: 'Umum', title: 'Libur Semester Ganjil Dimulai Tanggal 25 Desember 2023', date: '15 Desember 2023' },
];

export const INITIAL_EVENTS: Event[] = [
  { id: 1, title: 'Lomba Cerdas Cermat Antar Kelas', date: '2023-12-20T09:00:00', time: '09:00 - 12:00', location: 'Aula Sekolah', description: 'Adu wawasan dan pengetahuan umum dalam LCC tahunan.' },
  { id: 2, title: 'Bakti Sosial Panti Asuhan', date: '2023-12-22T08:00:00', time: '08:00 - Selesai', location: 'Panti Asuhan Kasih Bunda', description: 'Berbagi kebahagiaan dan keceriaan bersama adik-adik panti.' },
  { id: 3, title: 'Final Lomba E-Sport', date: '2023-12-23T10:00:00', time: '10:00 - 15:00', location: 'Laboratorium Komputer', description: 'Saksikan pertandingan sengit tim e-sport terbaik sekolah.' },
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
    { id: 1, value: 15, label: 'Program Kerja', suffix: '+' },
    { id: 2, value: 500, label: 'Siswa Terlibat', suffix: '+' },
    { id: 3, value: 10, label: 'Ekstrakurikuler' },
    { id: 4, value: 5, label: 'Prestasi Terbaru' },
];
