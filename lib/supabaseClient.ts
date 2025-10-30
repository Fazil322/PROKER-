import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Klien Supabase hanya diinisialisasi jika kredensial tersedia.
// Jika tidak, nilainya null. Logika aplikasi harus memeriksa `isSupabaseConfigured` sebelum menggunakan klien.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase environment variables not set. The app will run in local-only mode. ' +
    'Database features will be disabled. This is expected for local development.'
  );
}
