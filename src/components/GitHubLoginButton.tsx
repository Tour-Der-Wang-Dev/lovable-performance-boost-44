
import { signInWithGitHub } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface GitHubLoginButtonProps {
  redirectTo?: string;
  className?: string;
}

const GitHubLoginButton = ({ 
  redirectTo,
  className 
}: GitHubLoginButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithGitHub(redirectTo);
      // Toast won't show immediately as the page will redirect
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: 'Login Failed',
        description: error instanceof Error ? error.message : 'Failed to login with GitHub',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };
  
  return (
    <Button 
      onClick={handleLogin} 
      disabled={isLoading}
      className={className}
      variant="outline"
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
          <span>Connecting...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Github size={18} />
          <span>Sign in with GitHub</span>
        </div>
      )}
    </Button>
  );
};

export default GitHubLoginButton;
