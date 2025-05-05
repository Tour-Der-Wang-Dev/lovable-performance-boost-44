
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GitHubLoginButton from '@/components/GitHubLoginButton';
import { useUser } from '@/context/UserContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

const AuthPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();
  const [authChecked, setAuthChecked] = useState(false);
  
  useEffect(() => {
    if (!isLoading) {
      setAuthChecked(true);
      if (isAuthenticated) {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome</CardTitle>
          <CardDescription className="text-center">
            Sign in to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {authChecked && !isAuthenticated && (
            <div className="space-y-4">
              <GitHubLoginButton className="w-full" />
            </div>
          )}
          {isLoading && (
            <div className="flex justify-center py-4">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-center text-sm text-gray-500">
          Secure authentication powered by Supabase
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;
