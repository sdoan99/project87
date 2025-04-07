import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { createUserProfile } from '../services/userService';

interface AuthState {
  user: User | null;
  session: any;
  loading: boolean;
  signIn: (identifier: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setSession: (session: any) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  session: null,
  loading: true,
  signIn: async (identifier: string, password: string) => {
    // First, check if the identifier is an email
    const isEmail = identifier.includes('@');

    if (isEmail) {
      // If it's an email, try direct login
      const { error } = await supabase.auth.signInWithPassword({
        email: identifier,
        password,
      });
      if (error) throw error;
    } else {
      // If it's a username, look up the email from user_profiles
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('email')
        .eq('username', identifier)
        .single();

      if (profileError || !profileData) {
        throw new Error('Username not found');
      }

      // Then sign in with the email
      const { error } = await supabase.auth.signInWithPassword({
        email: profileData.email,
        password,
      });
      if (error) throw error;
    }
  },
  signUp: async (email: string, password: string, username: string) => {
    // Check if username already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('user_profiles')
      .select('username')
      .eq('username', username)
      .single();

    if (existingUser) {
      throw new Error('Username already taken');
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;
    if (!data.user) throw new Error('User creation failed');

    try {
      await createUserProfile(data.user.id, email, username);
    } catch (error: any) {
      // If profile creation fails, clean up by deleting the auth user
      await supabase.auth.admin.deleteUser(data.user.id);
      throw new Error('Failed to create user profile: ' + error.message);
    }
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null, session: null });
  },
  setUser: user => set({ user }),
  setSession: session => set({ session }),
}));
