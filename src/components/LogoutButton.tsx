
import { signOut } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useState } from 'react';

interface LogoutButtonProps {
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

const LogoutButton = ({ 
  className,
  variant = 'outline' 
}: LogoutButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Button 
      onClick={handleLogout} 
      disabled={isLoading}
      className={className}
      variant={variant}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
          <span>Signing out...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <LogOut size={18} />
          <span>Sign out</span>
        </div>
      )}
    </Button>
  );
};

export default LogoutButton;
