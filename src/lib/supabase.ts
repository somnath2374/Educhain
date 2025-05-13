
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Re-export the client for use in the application
export const supabase = supabaseClient;

// Helper function to check if Supabase is configured
export const checkSupabaseConfig = () => {
  return true; // We're using the integrated client which is already configured
};
