import React from 'react';

interface FilterButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function FilterButton({ label, active = false, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm transition-all
        ${active 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
    >
      {label}
    </button>
  );
}