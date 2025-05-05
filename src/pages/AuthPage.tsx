
import GitHubLoginButton from '@/components/GitHubLoginButton';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

const AuthPage = () => {
  return (
    <ProtectedRoute redirectTo="/dashboard" requireAuth={false}>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Welcome</CardTitle>
            <CardDescription className="text-center">
              Sign in to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <GitHubLoginButton className="w-full" redirectTo="/dashboard" />
            </div>
          </CardContent>
          <CardFooter className="justify-center text-sm text-gray-500">
            Secure authentication powered by Supabase
          </CardFooter>
        </Card>
      </div>
    </ProtectedRoute>
  );
};

export default AuthPage;
