import { createClient } from '@supabase/supabase-js';

// --- PENTING! ---
// Ganti nilai di bawah ini dengan URL dan Kunci Anon (Public) dari proyek Supabase Anda.
// Anda bisa mendapatkannya dari dashboard Supabase di bagian Settings > API.
// Aplikasi TIDAK akan berfungsi dengan benar tanpa kredensial yang valid.
const supabaseUrl = 'https://MASUKKAN_URL_SUPABASE_ANDA.supabase.co';
const supabaseAnonKey = 'MASUKKAN_KUNCI_ANON_SUPABASE_ANDA';

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
