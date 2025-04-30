import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase';

/**
 * useUserProfileSync
 * Syncs the current Clerk user with the Supabase user_profiles table.
 * Upserts clerk_id, email, username, role, and timestamps.
 * Usage: Call inside a component to ensure user profile exists in Supabase.
 */
export function useUserProfileSync() {
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    console.log('[useUserProfileSync]', { isLoaded, isSignedIn, user });
    if (!isLoaded || !isSignedIn || !user) return;
    console.log('Syncing Clerk user to Supabase user_profiles table:', user?.id);
    const now = new Date().toISOString();

    supabase
      .from('user_profiles')
      .upsert(
        [
          {
            clerk_id: user.id,
            email: user.primaryEmailAddress?.emailAddress || null,
            username: user.username || null,
            role: 'user', // or derive from Clerk metadata/roles if needed
            created_at: now,
            updated_at: now,
          },
        ],
        { onConflict: ['clerk_id'], returning: 'representation' }
      )
      .then(({ data, error }) => {
        console.log('[useUserProfileSync] upsert result:', data, error);
        if (error) console.error('[useUserProfileSync] Supabase upsert error:', error);
      });

  }, [isLoaded, isSignedIn, user]);
}
