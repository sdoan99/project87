import React, { useState } from 'react';
import { AlpacaStreamTable } from './AlpacaStreamTable';
import { SymbolPriceTable } from './SymbolPriceTable';
import { useAlpacaStream } from './useAlpacaStream';

const rows = [
  'SPY',
  'QQQ',
  'AAPL',
  'MSFT',
  'NVDA',
  'AMZN',
  'GOOGL',
  'META',
  'TSLA',
  'BRK.A',
  'TSM',
  'JPM',
  'GME',
  'GLD',
];
const columns = ['T', 'S', 'i', 'x', 'p', 's', 'c', 't', 'z'];

// Only show trades for these symbols
const symbols = rows;

export default function Alpaca() {
  const [symbolInput, setSymbolInput] = useState('');
  const keyId = import.meta.env.VITE_ALPACA_KEY_ID;
  const secretKey = import.meta.env.VITE_ALPACA_SECRET_KEY;
  const tableData = useAlpacaStream({
    symbols,
    columns,
    keyId,
    secretKey,
  });
  const symbolData = tableData[symbolInput?.toUpperCase()] ?? {};
  const price = symbolData?.p;

  return (
    <div className='min-h-screen bg-gray-900 pt-24'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-3xl md:text-4xl font-bold text-white text-center mb-8'>
          Alpaca Streaming Market Data
        </h1>
        <AlpacaStreamTable rows={rows} columns={columns} data={tableData} />
        <p className='text-sm text-gray-400 text-center mt-8'>
          (Live data will appear in the table as it streams in.)
        </p>
        <SymbolPriceTable
          symbolInput={symbolInput}
          setSymbolInput={setSymbolInput}
          price={price}
          //symbolData={symbolData}
        />
      </div>
    </div>
  );
}
