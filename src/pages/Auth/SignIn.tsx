import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import FormInput from '../../components/common/FormInput';
import AuthTabs from './AuthTabs';
import { useAuthStore } from '../../store/authStore';

export default function SignIn() {
  const navigate = useNavigate();
  const signIn = useAuthStore(state => state.signIn);
  const [formData, setFormData] = useState({
    identifier: '', // Can be either email or username
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(formData.identifier, formData.password);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout>
      <AuthTabs activeTab='signin' />
      <form onSubmit={handleSubmit} className='space-y-6'>
        {error && (
          <div className='bg-red-500/10 border border-red-500 text-red-500 rounded-md p-3 text-sm'>
            {error}
          </div>
        )}

        <FormInput
          id='identifier'
          name='identifier'
          type='text'
          label='Email or Username'
          value={formData.identifier}
          onChange={e => setFormData({ ...formData, identifier: e.target.value })}
          placeholder='Enter your email or username'
          required
          Icon={Mail}
        />

        <FormInput
          id='password'
          name='password'
          type='password'
          label='Password'
          value={formData.password}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
          placeholder='Enter your password'
          required
          Icon={Lock}
        />

        <button
          type='submit'
          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Sign In
        </button>
      </form>
    </AuthLayout>
  );
}
