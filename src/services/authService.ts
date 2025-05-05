
import { supabase } from '@/integrations/supabase/client';
import { Provider } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

// Constants
const GITHUB_PROVIDER = 'github' as Provider;

// Types
export interface AuthError {
  message: string;
  status?: number;
}

export interface UserSession {
  user: {
    id: string;
    email?: string;
    user_metadata: {
      avatar_url?: string;
      full_name?: string;
      user_name?: string;
    };
  } | null;
  session: any | null;
}

/**
 * Initiates GitHub OAuth login flow
 * @param redirectTo URL to redirect after successful authentication
 */
export const signInWithGitHub = async (redirectTo: string = window.location.origin): Promise<void> => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: GITHUB_PROVIDER,
      options: {
        redirectTo,
        scopes: 'read:user user:email',
      }
    });
    
    if (error) throw error;
  } catch (error: any) {
    console.error('GitHub login error:', error);
    toast({
      title: 'Authentication Error',
      description: error.message || 'Failed to login with GitHub',
      variant: 'destructive',
    });
    throw error;
  }
};

/**
 * Signs out the current user
 */
export const signOut = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    toast({
      title: 'Signed out',
      description: 'You have been successfully signed out',
    });
  } catch (error: any) {
    console.error('Sign out error:', error);
    toast({
      title: 'Sign Out Error',
      description: error.message || 'Failed to sign out',
      variant: 'destructive',
    });
    throw error;
  }
};

/**
 * Gets the current session
 */
export const getSession = async (): Promise<UserSession> => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    
    return {
      user: data.session?.user ?? null,
      session: data.session
    };
  } catch (error: any) {
    console.error('Get session error:', error);
    return { user: null, session: null };
  }
};

/**
 * Sets up auth state change listener
 */
export const setupAuthListener = (callback: (session: UserSession) => void): (() => void) => {
  const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
    callback({
      user: session?.user ?? null,
      session
    });
  });
  
  // Return unsubscribe function
  return () => {
    data.subscription.unsubscribe();
  };
};
