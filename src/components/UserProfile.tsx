
import { useUser } from '@/context/UserContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import LogoutButton from '@/components/LogoutButton';
import { Skeleton } from '@/components/ui/skeleton';

const UserProfile = () => {
  const { user, isLoading } = useUser();
  
  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div>
          <Skeleton className="w-32 h-4 mb-2" />
          <Skeleton className="w-24 h-3" />
        </div>
      </div>
    );
  }
  
  if (!user) {
    return null;
  }
  
  const fullName = user.user_metadata.full_name || user.user_metadata.user_name || 'User';
  const avatarUrl = user.user_metadata.avatar_url;
  const email = user.email || '';
  const initials = fullName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
  
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <Avatar>
          {avatarUrl ? <AvatarImage src={avatarUrl} alt={fullName} /> : null}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{fullName}</h3>
          {email && <p className="text-sm text-gray-500">{email}</p>}
        </div>
      </div>
      <LogoutButton className="w-full mt-2" />
    </div>
  );
};

export default UserProfile;
