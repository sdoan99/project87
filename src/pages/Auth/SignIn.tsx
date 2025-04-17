import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { Input } from '@/components/ui/input';
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

        <div>
          <label htmlFor='identifier' className='block text-sm font-medium text-gray-400'>
            Email or Username
          </label>
          <div className='mt-1 relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Mail className='h-5 w-5 text-gray-500' />
            </div>
            <Input
              id='identifier'
              name='identifier'
              type='text'
              required
              className='bg-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Enter your email or username'
              value={formData.identifier}
              onChange={e => setFormData({ ...formData, identifier: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-400'>
            Password
          </label>
          <div className='mt-1 relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Lock className='h-5 w-5 text-gray-500' />
            </div>
            <Input
              id='password'
              name='password'
              type='password'
              required
              className='bg-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Enter your password'
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </div>

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
