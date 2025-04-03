import React, { useState } from 'react';
import { InfoPanel } from './InfoPanel/infopanel';
import { TVAdvChart } from '../../components/tradingview/TVAdvChart';
import { TradeTable } from './TradeTable/TradeTable';
import { AddTradeButton } from './ui/addtradebutton';
import { NewTrade } from './NewTrade';

export default function Performance() {
  const [showNewTrade, setShowNewTrade] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTradeSubmit = () => {
    setShowNewTrade(false);
    // Increment the refresh trigger to cause a refresh of both components
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 pt-20">
        <div className="flex gap-8">
          {/* Left sidebar with InfoPanel - Pass refreshTrigger */}
          <div className="w-[320px] flex-shrink-0">
            <InfoPanel refreshTrigger={refreshTrigger} />
          </div>
          
          {/* Main content area */}
          <div className="flex-1 space-y-8">
            {/* TradingView Chart */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <TVAdvChart />
            </div>

            {/* Trade Table Section */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Trade Overview</h2>
                <AddTradeButton onClick={() => setShowNewTrade(true)} />
              </div>
              <TradeTable refreshTrigger={refreshTrigger} />
            </div>
          </div>
        </div>
      </div>

      {/* New Trade Modal */}
      {showNewTrade && (
        <NewTrade 
          onClose={() => setShowNewTrade(false)} 
          onSubmitSuccess={handleTradeSubmit}
        />
      )}
    </div>
  );
}