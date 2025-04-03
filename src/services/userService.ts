import { supabase } from '../lib/supabase';

export async function createUserProfile(userId: string, email: string, username: string) {
  const { error } = await supabase
    .from('user_profiles')
    .insert([
      {
        id: userId,
        email,
        username,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]);

  if (error) throw error;
}