import React from 'react';

interface TradeInputRowProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function TradeInputRow({ label, className = '', ...props }: TradeInputRowProps) {
  return (
    <div className={className}>
      {label && <label className='block text-sm font-medium text-gray-400 mb-1.5'>{label}</label>}
      <input
        {...props}
        className='w-full bg-gray-800/50 text-gray-200 rounded-lg px-4 py-2.5 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors placeholder-gray-500'
      />
    </div>
  );
}
