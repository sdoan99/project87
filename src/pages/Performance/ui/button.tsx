import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'link';
  icon?: LucideIcon;
  children?: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'default',
  icon: Icon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const variants = {
    default: 'bg-gray-800 hover:bg-gray-700 text-gray-200',
    link: 'hover:bg-gray-800/50 text-gray-400 hover:text-gray-300',
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className='w-4 h-4' />}
      {children}
    </button>
  );
}
