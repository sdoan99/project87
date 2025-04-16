import React from 'react';
import { Plus } from 'lucide-react';

interface AddTradeButtonProps {
  onClick: () => void;
}

export function AddTradeButton({ onClick }: AddTradeButtonProps) {
  return (
    <button
      onClick={onClick}
      data-testid="add-trade-btn"
      className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors'
    >
      <Plus className='w-4 h-4' />
      <span>Add Trade</span>
    </button>
  );
}
