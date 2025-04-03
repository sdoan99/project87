import React from 'react';
import { Header } from './StratFilter/Header';
import { SubHeader } from './StratFilter/SubHeader';
import { FilterSection } from './StratFilter/FilterSection';
import { StrategyTable } from './StratTable/StrategyTable';

export default function Strategy() {
  return (
    <div className="min-h-screen bg-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        <div className="mt-12">
          <FilterSection />
        </div>
        <div className="mt-12">
          <SubHeader />
          </div>
        <div className="mt-8">
          <StrategyTable />
        </div>
      </div>
    </div>
  );
}