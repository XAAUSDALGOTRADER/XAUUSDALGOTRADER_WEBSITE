import { createClient } from '@supabase/supabase-js';

export const createServiceRoleClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing Supabase environment variables:');
    console.error('SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
    console.error('SUPABASE_SERVICE_ROLE_KEY:', serviceRoleKey ? 'Set' : 'Missing');
    throw new Error('Missing Supabase environment variables');
  }
  
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};