import { createClient } from '@supabase/supabase-js';

// --- PENTING! ---
// Ganti nilai di bawah ini dengan URL dan Kunci Anon (Public) dari proyek Supabase Anda.
// Anda bisa mendapatkannya dari dashboard Supabase di bagian Settings > API.
// Aplikasi TIDAK akan berfungsi dengan benar tanpa kredensial yang valid.
const supabaseUrl = 'https://ccohomxjwngjeqtfrvas.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjb2hvbXhqd25namVxdGZydmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MDk0NDQsImV4cCI6MjA3NzM4NTQ0NH0.fS-rAGs9M66_XoQ830vVGkm5KigZx0KA9TQVk7irtQU';

// Memberikan peringatan yang jelas kepada developer jika kredensial belum diisi.
if (supabaseUrl.includes('MASUKKAN_URL') || supabaseAnonKey.includes('MASUKKAN_KUNCI')) {
  // Menggunakan alert agar developer tidak mungkin melewatkan pesan ini.
  alert(
    'PENTING: Konfigurasi Supabase belum diatur.\n\n' +
    'Silakan buka file `lib/supabaseClient.ts`, lalu masukkan URL dan Kunci Anon Supabase Anda ' +
    'agar aplikasi dapat terhubung ke database.'
  );
}

// Inisialisasi klien Supabase secara langsung.
// Aplikasi sekarang akan selalu mencoba terhubung ke Supabase.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
