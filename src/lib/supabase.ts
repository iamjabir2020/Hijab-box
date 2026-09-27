import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Configuration keys
const STORAGE_KEY_URL = 'hb_supabase_url';
const STORAGE_KEY_KEY = 'hb_supabase_anon_key';

// Read from env vars or localStorage override
const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const storedUrl = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_URL) : null;
const storedKey = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_KEY) : null;

export const supabaseUrl = (storedUrl || envUrl || '').trim();
export const supabaseAnonKey = (storedKey || envKey || '').trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id') &&
  supabaseUrl.startsWith('https://')
);

// Fallback placeholder URL for non-crashing initialization when not yet connected
const defaultPlaceholderUrl = 'https://placeholder-hijab-box.supabase.co';
const defaultPlaceholderKey = 'placeholder-anon-key';

export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured ? supabaseUrl : defaultPlaceholderUrl,
  isSupabaseConfigured ? supabaseAnonKey : defaultPlaceholderKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

/**
 * Test connectivity to the Supabase project
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  message: string;
  latencyMs?: number;
}> {
  if (!isSupabaseConfigured) {
    return {
      connected: false,
      message: 'Supabase credentials not set. Running in local graceful fallback mode.',
    };
  }

  const startTime = Date.now();
  try {
    const { error } = await supabase.from('products').select('id').limit(1);
    const latencyMs = Date.now() - startTime;

    if (error) {
      // If table doesn't exist yet, but server responded, connection is valid
      if (error.code === '42P01') {
        return {
          connected: true,
          message: 'Connected to Supabase! (Database tables need to be created with schema.sql)',
          latencyMs,
        };
      }
      return {
        connected: false,
        message: `Connection error: ${error.message}`,
        latencyMs,
      };
    }

    return {
      connected: true,
      message: 'Connected successfully to Supabase database & auth!',
      latencyMs,
    };
  } catch (err: any) {
    return {
      connected: false,
      message: err?.message || 'Network error reaching Supabase',
    };
  }
}

/**
 * Save custom credentials to browser local storage and reload
 */
export function saveCustomSupabaseConfig(url: string, key: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_URL, url.trim());
    localStorage.setItem(STORAGE_KEY_KEY, key.trim());
    window.location.reload();
  }
}

/**
 * Clear custom credentials
 */
export function clearCustomSupabaseConfig() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_URL);
    localStorage.removeItem(STORAGE_KEY_KEY);
    window.location.reload();
  }
}
