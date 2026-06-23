import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Estas credenciales son públicas y seguras de incluir en el código de la app:
// la "publishable key" está diseñada para esto, la seguridad real la dan las
// políticas de Row Level Security (RLS) configuradas en la base de datos.
const SUPABASE_URL = 'https://xilswmszgayobkdehdii.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_XW3f-HfczrqoOtL4KC0Jdw_6jmBe9O1';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
