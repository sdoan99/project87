import { useAuth } from '@clerk/clerk-react';

export function DisplayUserId() {
  const { isLoaded, isSignedIn, userId } = useAuth();

  if (!isLoaded) return <div className='text-gray-400'>Loading user info...</div>;
  if (!isSignedIn) return <div className='text-red-400'>Not signed in</div>;

  return (
    <div className='mb-4 p-2 rounded bg-blue-900 text-blue-200 text-center'>
      Your userId: <span className='font-mono'>{userId}</span>
    </div>
  );
}
