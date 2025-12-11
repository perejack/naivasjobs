import { createClient } from '@supabase/supabase-js';

// Hardcoded for production - Supabase project credentials
const supabaseUrl = 'https://enxkwltjewgbygprbzrh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVueGt3bHRqZXdnYnlncHJienJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0NTU3MDcsImV4cCI6MjA4MTAzMTcwN30.WmPNIwoRPVvO9Qmi83_gpQgi4cAtxb9KcVeOey4-ycg';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});

console.log('✅ Supabase client initialized');
