
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getSession, setupAuthListener, UserSession } from '@/services/authService';

type UserContextType = {
  user: UserSession['user'];
  session: UserSession['session'];
  isLoading: boolean;
  isAuthenticated: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserSession['user']>(null);
  const [session, setSession] = useState<UserSession['session']>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Fetch the initial session when the component mounts
    const initializeAuth = async () => {
      try {
        const sessionData = await getSession();
        setUser(sessionData.user);
        setSession(sessionData.session);
      } catch (error) {
        console.error('Failed to get initial session', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();
    
    // Set up the auth listener to update the context when auth state changes
    const unsubscribe = setupAuthListener((session) => {
      setUser(session.user);
      setSession(session.session);
      setIsLoading(false);
    });
    
    // Clean up subscription when component unmounts
    return unsubscribe;
  }, []);
  
  const value = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
