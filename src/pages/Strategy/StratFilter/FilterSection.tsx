import React from 'react';
import { Link } from 'react-router-dom';
import { FilterButton } from './FilterButton';

const primaryFilters = [
  'All Strategies',
  'Stocks & Options',
  'Cryptocurrency',
  'Commodities',
  'ETF',
  'Sports',
  'Gainers',
  'Losers',
  'Venture Capital',
  'Private Equity',
  'Large-cap',
  'Small-cap',
  'Most traded',
  'Most addresses with balance',
  'Most daily active addresses',
  'Most transactions',
  'Highest transaction volume',
  'Lowest supply',
  'Highest supply',
  'Most expensive',
  'Most volatile',
  'Development activity',
  'All-time high',
  'All-time low',
  '52-week high',
  '52-week low'
];

export function FilterSection() {
  const [activeFilter, setActiveFilter] = React.useState('All Strats');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {primaryFilters.map((filter) => (
          <FilterButton
            key={filter}
            label={filter}
            active={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          />
        ))}
      </div>

      <Link 
        to="/create" 
        className="mt-4 text-red-400 hover:text-blue-500 transition-colors text-sm font-bold flex items-center gap-2"
      >
        Create and Share Strategies →
      </Link>
    </div>
  );
}