import React from 'react';
import { ChevronDown } from 'lucide-react';

interface MarketSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarketSelect({ value, onChange }: MarketSelectProps) {
  return (
    <div className='relative'>
      <label className='block text-sm font-medium text-gray-400 mb-1.5'>Market</label>
      <div className='relative'>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className='w-full bg-gray-800/50 text-gray-200 rounded-lg px-4 py-2.5 appearance-none pr-10 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors'
        >
          <option value='STOCK'>STOCK</option>
          <option value='OPTIONS'>OPTIONS</option>
          <option value='FOREX'>FOREX</option>
          <option value='CRYPTO'>CRYPTO</option>
          <option value='SPORTS'>SPORTS</option>
          <option value='ALTERNATIVE'>ALTERNATIVE</option>
        </select>
        <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
      </div>
    </div>
  );
}
