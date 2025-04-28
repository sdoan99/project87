import { useState, useCallback } from 'react';
import { InfoPanel } from './InfoPanel/infopanel';
import { useStrategyProfile } from '../../hooks/useStrategyProfile';

import { useParams } from 'react-router-dom';
import { useTradeRefreshStore } from '../../store/tradeRefreshStore';
import { TVAdvChart } from '../../components/tradingview/TVAdvChart';
import { TradeTable } from './TradeTable/TradeTable';
import { AddTradeButton } from './ui/addtradebutton';
import { NewTrade } from './NewTrade';

export default function Performance() {
  const [showNewTrade, setShowNewTrade] = useState<boolean>(false);
  const { strategyName } = useParams<{ strategyName: string }>();
  const { profile, loading, error, refetch } = useStrategyProfile(strategyName);
  const triggerRefresh = useTradeRefreshStore(s => s.triggerRefresh);

  const handleTradeSubmit = useCallback(async () => {
    await refetch(); // Directly fetch latest metrics after trade submit
    setShowNewTrade(false);
  }, [refetch, setShowNewTrade]);

  const handleOpenNewTrade = useCallback(() => {
    setShowNewTrade(true);
  }, [setShowNewTrade]);

  const handleCloseNewTrade = useCallback(() => {
    setShowNewTrade(false);
  }, [setShowNewTrade]);

  return (
    <div className='bg-gray-900 min-h-screen'>
      <div className='container mx-auto px-4 pt-20'>
        <div className='flex gap-8'>
          {/* Left sidebar with InfoPanel - Pass profile, loading, error, refetch */}
          <div className='w-[320px] flex-shrink-0'>
            <InfoPanel profile={profile} loading={loading} error={error} refetch={refetch} />
          </div>

          {/* Main content area */}
          <div className='flex-1 space-y-8'>
            {/* TradingView Chart */}
            <div className='bg-gray-800 rounded-lg p-4 border border-gray-700'>
              <TVAdvChart />
            </div>

            {/* Trade Table Section */}
            <div className='bg-gray-800 rounded-lg p-4 border border-gray-700'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-semibold text-white'>Trade Overview</h2>
                <AddTradeButton onClick={handleOpenNewTrade} />
              </div>
              <TradeTable />
            </div>
          </div>
        </div>
      </div>

      {/* New Trade Modal */}
      {showNewTrade && (
        <NewTrade onClose={handleCloseNewTrade} onSubmitSuccess={handleTradeSubmit} />
      )}
    </div>
  );
}
