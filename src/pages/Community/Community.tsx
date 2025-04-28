import React, { useState } from 'react';
import { SymbolPriceTable } from '../Alpaca/SymbolPriceTable';
import { useAlpacaStream } from '../Alpaca/useAlpacaStream';

export default function Community() {
  const [symbolInput, setSymbolInput] = useState('');
  const defaultSymbols = [
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
  const symbols = React.useMemo(() => {
    const input = symbolInput.trim().toUpperCase();
    return input && !defaultSymbols.includes(input) ? [...defaultSymbols, input] : defaultSymbols;
  }, [symbolInput]);
  const columns = ['T', 'S', 'i', 'x', 'p', 's', 'c', 't', 'z'];
  const keyId = import.meta.env.VITE_ALPACA_KEY_ID;
  const secretKey = import.meta.env.VITE_ALPACA_SECRET_KEY;
  const tableData = useAlpacaStream({ symbols, columns, keyId, secretKey });

  const symbolData = tableData[symbolInput?.toUpperCase()] ?? {};
  const price = symbolData?.p;

  return (
    <div className='min-h-screen bg-gray-900 pt-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-4xl md:text-5xl font-bold text-white text-center mb-4'>
          Financial <span className='text-blue-400'>Wellness</span> Coming Soon
        </h1>

        <h1 className='text-4xl md:text-5xl font-bold text-white text-center mb-4'>
          Cash Us If You Can:
        </h1>
        <p className='text-x2 text-gray-400 text-center mb-16'>
          We're still balancing our books—and our lives. Launching soon to stop your budget from
          ghosting you. Thanks for bearing with US.
        </p>
        {/* Embed SymbolPriceTable at the bottom */}
        <SymbolPriceTable
          symbolInput={symbolInput}
          setSymbolInput={setSymbolInput}
          price={price}
        />
      </div>
    </div>
  );
}
