import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

/**
 * React hook to fetch and provide the current user's profile (username).
 * Returns username, loading, and error states. Safe for use with Zustand auth store.
 */
export interface UseUserProfileResult {
  username: string | null;
  loading: boolean;
  error: string | null;
}

export function useUserProfile(): UseUserProfileResult {
  const user = useAuthStore(state => state.user);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('username')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setUsername(data?.username || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [user?.id]);

  return { username, loading, error };
}
