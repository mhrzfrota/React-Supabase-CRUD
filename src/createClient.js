import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vgrzqwszsuppqkwegguv.supabase.co'; // Substitua com a URL do seu projeto Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZncnpxd3N6c3VwcHFrd2VnZ3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQzNjM5OTgsImV4cCI6MTk5OTkzOTk5OH0.J30VlGflIes7nkjRmjWGtu0-z5t_lls7nUObO1WxSBA'; // Substitua com a chave de acesso do seu projeto Supabase

export const supabase = createClient(supabaseUrl, supabaseKey);
