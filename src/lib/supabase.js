import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const mockClient = {
  from: () => ({
    insert: () => Promise.resolve({ data: null, error: null }),
    select: () => Promise.resolve({ data: [], error: null }),
  }),
};

export const supabase =
  supabaseUrl && supabaseKey && !supabaseUrl.includes('xxxx')
    ? createClient(supabaseUrl, supabaseKey)
    : mockClient;