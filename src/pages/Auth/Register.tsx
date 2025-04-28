import { SignUp } from '@clerk/clerk-react';
import AuthLayout from './AuthLayout';
import AuthTabs from './AuthTabs';

export default function RegisterPage() {
  return (
    <AuthLayout title='Create Account' subtitle='Sign up for Project87'>
      <AuthTabs activeTab='register' />
      <div className='flex justify-center'>
        <SignUp routing='path' path='/register' />
      </div>
    </AuthLayout>
  );
}
