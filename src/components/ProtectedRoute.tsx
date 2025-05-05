
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  redirectTo = '/',
  requireAuth = true
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);
  
  useEffect(() => {
    if (!isLoading) {
      // If authentication is required and user is not authenticated
      if (requireAuth && !isAuthenticated) {
        setRedirecting(true);
        toast({
          title: 'Authentication Required',
          description: 'Please sign in to access this page',
          variant: 'default',
        });
        
        // Short delay to show the toast before redirecting
        const timeout = setTimeout(() => {
          navigate(redirectTo);
        }, 1500);
        
        return () => clearTimeout(timeout);
      }
      
      // If authentication is NOT required and user IS authenticated (e.g. login page)
      if (!requireAuth && isAuthenticated) {
        navigate(redirectTo);
      }
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo, requireAuth]);
  
  if (isLoading || redirecting) {
    return (
      <div className="w-full max-w-md p-6 mx-auto mt-10">
        <div className="text-center mb-4">
          {redirecting ? 'Redirecting...' : 'Checking authentication...'}
        </div>
        <Skeleton className="w-full h-12 mb-4" />
        <Skeleton className="w-3/4 h-12 mb-4" />
        <Skeleton className="w-1/2 h-12" />
      </div>
    );
  }
  
  // Only render children if authentication requirement is met
  if (requireAuth) {
    return isAuthenticated ? <>{children}</> : null;
  } else {
    return !isAuthenticated ? <>{children}</> : null;
  }
};

export default ProtectedRoute;
