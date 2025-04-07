import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AuthLayout({
  children,
  title = 'Welcome',
  subtitle = 'Sign in or create a new account',
}: AuthLayoutProps) {
  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center px-4'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <h2 className='text-4xl font-bold text-white'>{title}</h2>
          <p className='mt-2 text-gray-400'>{subtitle}</p>
        </div>
        <div className='mt-8 bg-gray-800 rounded-lg p-8'>{children}</div>
      </div>
    </div>
  );
}
