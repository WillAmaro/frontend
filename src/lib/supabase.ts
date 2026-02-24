// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log('SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseLPS = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'LPS_ERP_LATAM',
  },
});