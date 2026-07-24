import { createClient, SupabaseClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

function isValidHttpUrl(stringUrl: string): boolean {
  if (!stringUrl) return false;
  try {
    const url = new URL(stringUrl);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export const isSupabaseConfigured = Boolean(
  rawUrl &&
  rawKey &&
  isValidHttpUrl(rawUrl) &&
  !rawUrl.includes('your-supabase-project') &&
  !rawKey.includes('your-supabase-anon-key')
);

const initSupabase = (): SupabaseClient => {
  if (isSupabaseConfigured) {
    try {
      return createClient(rawUrl, rawKey);
    } catch (e) {
      console.warn('Invalid Supabase configuration provided in environment variables:', e);
    }
  }
  return createClient('https://placeholder.supabase.co', 'placeholder-key');
};

export const supabase = initSupabase();

