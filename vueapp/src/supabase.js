import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const useMockData = import.meta.env.VITE_USE_MOCK_DATA;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
