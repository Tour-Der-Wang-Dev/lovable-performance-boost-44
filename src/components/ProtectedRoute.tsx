
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { Skeleton } from '@/components/ui/skeleton';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  children, 
  redirectTo = '/' 
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo]);
  
  if (isLoading) {
    return (
      <div className="w-full max-w-md p-6 mx-auto mt-10">
        <Skeleton className="w-full h-12 mb-4" />
        <Skeleton className="w-3/4 h-12 mb-4" />
        <Skeleton className="w-1/2 h-12" />
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
