import React from 'react';
import TradingViewWidget from '../../components/tradingview/MarketOverview';
import StockScreener from '../../components/tradingview/ScreenerStocks';
import CryptoScreener from '../../components/tradingview/ScreenerCrypto';

export default function Markets() {
  return (
    <div className='min-h-screen bg-gray-900 pt-16'>
      {/* Market Overview */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='bg-gray-800 rounded-lg p-6'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-white'>Market Overview</h2>
            <p className='text-gray-400 mt-1'>Real-time market data and analysis</p>
          </div>
          <div className='h-[800px]'>
            <TradingViewWidget />
          </div>
        </div>

        {/* Stock Screener */}
        <div className='bg-gray-800 rounded-lg p-6 mt-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-white'>Stock Screener</h2>
            <p className='text-gray-400 mt-1'>Advanced stock market screening tools</p>
          </div>
          <div className='h-[550px]'>
            <StockScreener />
          </div>
        </div>

        {/* Crypto Screener */}
        <div className='bg-gray-800 rounded-lg p-6 mt-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-white'>Crypto Screener</h2>
            <p className='text-gray-400 mt-1'>Comprehensive cryptocurrency market scanner</p>
          </div>
          <div className='h-[550px]'>
            <CryptoScreener />
          </div>
        </div>
      </div>
    </div>
  );
}
