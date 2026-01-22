import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cejavecqhngfzhqjkijz.supabase.co';
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlamF2ZWNxaG5nZnpocWpraWp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNzE0MjYsImV4cCI6MjA4NDY0NzQyNn0.kDbs75lieewGQ6a2nPJP3kjxnUd9xM7AKv8n4gg8sRM';

export const supabase = createClient(supabaseUrl, supabaseKey);
