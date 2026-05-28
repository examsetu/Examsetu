import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hpcqckqvlqbkogdglcpm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwY3Fja3F2bHFia29nZGdsY3BtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4Njk4MTMsImV4cCI6MjA5NTQ0NTgxM30.Ub-x5jYgiVU5HR4x-x1QET0FHHVeVXta9uLjqXphxd4';

export const supabase = createClient(supabaseUrl, supabaseKey);