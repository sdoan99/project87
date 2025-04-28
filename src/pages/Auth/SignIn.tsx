import { SignIn } from '@clerk/clerk-react';
import AuthLayout from './AuthLayout';
import AuthTabs from './AuthTabs';

export default function SignInPage() {
  return (
    <AuthLayout title='Welcome Back' subtitle='Sign in to your account'>
      <AuthTabs activeTab='signin' />
      <div className='flex justify-center'>
        <SignIn routing='path' path='/signin' />
      </div>
    </AuthLayout>
  );
}
