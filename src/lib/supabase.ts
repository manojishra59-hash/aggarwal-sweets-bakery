import { createClient, SupabaseClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

function formatSupabaseUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.includes('.supabase.co')) {
    return `https://${url}`;
  }
  return `https://${url}.supabase.co`;
}

export const supabaseUrl = formatSupabaseUrl(rawUrl);

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
  supabaseUrl &&
  rawKey &&
  isValidHttpUrl(supabaseUrl) &&
  !supabaseUrl.includes('your-supabase-project') &&
  !rawKey.includes('your-supabase-anon-key')
);

const initSupabase = (): SupabaseClient => {
  if (isSupabaseConfigured) {
    try {
      return createClient(supabaseUrl, rawKey);
    } catch (e) {
      console.warn('Invalid Supabase configuration provided in environment variables:', e);
    }
  }
  return createClient('https://placeholder.supabase.co', 'placeholder-key');
};

export const supabase = initSupabase();

