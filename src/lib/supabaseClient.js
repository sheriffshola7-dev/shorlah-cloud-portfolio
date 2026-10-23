import { createClient } from '@supabase/supabase-js';

// These are public client values only. The publishable key is designed to be
// used in a browser; never replace it with a service-role or secret key.
const url = import.meta.env.VITE_SUPABASE_URL || 'https://cwhfmiegabiblndeecgu.supabase.co';
const key = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_gKb-VOcYPc-iQQMG1bSoog_cwpU3Qi0';

export const isSupabaseConfigured = Boolean(url && key);
export const supabase = isSupabaseConfigured ? createClient(url, key) : null;
