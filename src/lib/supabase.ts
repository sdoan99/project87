import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oazqceokukrohwvsprme.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9henFjZW9rdWtyb2h3dnNwcm1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyNjE4NDgsImV4cCI6MjA1MDgzNzg0OH0.yhz48T9ju65LpcHOQ9xLUlC6qPwy1-LRLrbDcHbzZVM';

export const supabase = createClient(supabaseUrl, supabaseKey);
