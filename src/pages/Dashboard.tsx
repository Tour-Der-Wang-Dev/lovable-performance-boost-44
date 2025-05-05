
import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import UserProfile from '@/components/UserProfile';

const Dashboard = () => {
  const { user } = useUser();
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting('Good morning');
    } else if (hours < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);
  
  return (
    <ProtectedRoute>
      <div className="container mx-auto p-6 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">
            {greeting}, {user?.user_metadata?.full_name || user?.user_metadata?.user_name || 'User'}!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <UserProfile />
          </div>
          <div className="col-span-1 md:col-span-2">
            <div className="border rounded-lg p-6 h-full">
              <h2 className="text-xl font-semibold mb-4">Welcome to your dashboard</h2>
              <p className="text-gray-600 mb-4">
                You've successfully signed in with GitHub OAuth via Supabase.
              </p>
              <p className="text-gray-600">
                This is a protected page that only authenticated users can access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
