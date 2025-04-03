import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface SortableHeaderProps {
  label: string;
  sortKey: string;
  currentSort: string | null;
  sortDirection: 'asc' | 'desc' | null;
  onSort: () => void;
}

export function SortableHeader({ 
  label, 
  sortKey, 
  currentSort, 
  sortDirection, 
  onSort 
}: SortableHeaderProps) {
  return (
    <th 
      className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-700/50"
      onClick={onSort}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <div className="flex flex-col">
          <ChevronUp 
            className={`h-3 w-3 ${
              sortKey === currentSort && sortDirection === 'asc' 
                ? 'text-blue-400' 
                : 'text-gray-600'
            }`} 
          />
          <ChevronDown 
            className={`h-3 w-3 ${
              sortKey === currentSort && sortDirection === 'desc' 
                ? 'text-blue-400' 
                : 'text-gray-600'
            }`} 
          />
        </div>
      </div>
    </th>
  );
}