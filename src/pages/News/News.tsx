import React from 'react';
import TopStoriesWidget from '../../components/tradingview/TopStories';
import EconCalWidget from '../../components/tradingview/EconCal';

export default function News() {
  return (
    <div className='min-h-screen bg-gray-900 pt-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Top Stories Section */}
        <div className='bg-gray-800 rounded-lg p-6 mb-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-white'>Top Stories</h2>
            <p className='text-gray-400 mt-1'>Latest market news and updates</p>
          </div>
          <TopStoriesWidget />
        </div>

        {/* Economic Calendar Section */}
        <div className='bg-gray-800 rounded-lg p-6'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-white'>Economic Calendar</h2>
            <p className='text-gray-400 mt-1'>Global economic events and indicators</p>
          </div>
          <EconCalWidget />
        </div>
      </div>
    </div>
  );
}
