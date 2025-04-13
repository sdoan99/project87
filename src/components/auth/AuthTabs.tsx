import React from 'react';
import { Link } from 'react-router-dom';

interface AuthTabsProps {
  activeTab: 'signin' | 'register';
}

export default function AuthTabs({ activeTab }: AuthTabsProps) {
  return (
    <div className='flex border-b border-gray-700 mb-6'>
      <Link
        to='/signin'
        className={`pb-2 px-4 ${
          activeTab === 'signin' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'
        }`}
      >
        Sign In
      </Link>
      <Link
        to='/register'
        className={`pb-2 px-4 ${
          activeTab === 'register' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'
        }`}
      >
        Create Account
      </Link>
    </div>
  );
}
