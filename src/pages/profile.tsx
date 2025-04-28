import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';

export default function Profile() {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();

  if (!isLoaded || !isUserLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>You must be signed in to view this page.</div>;
  }

  return (
    <div>
      <h1>Profile Data</h1>
      <pre>
        <code>{JSON.stringify({ userId, user }, null, 2)}</code>
      </pre>
    </div>
  );
}
