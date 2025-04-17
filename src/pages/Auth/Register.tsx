import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import FormInput from '../../components/common/FormInput';
import AuthTabs from './AuthTabs';
import { useAuthStore } from '../../store/authStore';

export default function Register() {
  const navigate = useNavigate();
  const signUp = useAuthStore(state => state.signUp);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      await signUp(formData.email, formData.password, formData.username);
      setSuccess('Account created successfully! Thanks for joining us!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout>
      <AuthTabs activeTab='register' />
      <form onSubmit={handleSubmit} className='space-y-6'>
        {error && (
          <div className='bg-red-500/10 border border-red-500 text-red-500 rounded-md p-3 text-sm'>
            {error}
          </div>
        )}
        {success && (
          <div className='bg-green-500/10 border border-green-500 text-green-500 rounded-md p-3 text-sm'>
            {success}
          </div>
        )}

        <FormInput
          id='username'
          name='username'
          type='text'
          label='Username'
          value={formData.username}
          onChange={e => setFormData({ ...formData, username: e.target.value })}
          placeholder='Choose a username'
          required
          Icon={User}
        />

        <FormInput
          id='email'
          name='email'
          type='email'
          label='Email'
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          placeholder='Enter your email'
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
          placeholder='Create a password'
          required
          Icon={Lock}
        />

        <FormInput
          id='confirmPassword'
          name='confirmPassword'
          type='password'
          label='Confirm Password'
          value={formData.confirmPassword}
          onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
          placeholder='Confirm your password'
          required
          Icon={Lock}
        />

        <button
          type='submit'
          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Create Account
        </button>
      </form>
    </AuthLayout>
  );
}
