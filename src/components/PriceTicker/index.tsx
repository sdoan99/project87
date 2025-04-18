import { useState, useCallback } from 'react';
import { useFinnhubRealtime } from '../../hooks/useFinnhubRealtime';

interface PriceTickerProps {
  symbol: string;
}

export function PriceTicker({ symbol }: PriceTickerProps) {
  const [price, setPrice] = useState<number | null>(null);

  useFinnhubRealtime(
    symbol,
    useCallback((p: number) => {
      console.log('[PriceTicker] Received price:', p);
      setPrice(p);
    }, []),
  );

  try {
    return (
      <div className="flex items-center space-x-2">
        <span className="font-bold">{symbol}</span>
        <span className="text-green-600">{typeof price === 'number' && !isNaN(price) ? price.toFixed(2) : '...'}</span>
      </div>
    );
  } catch (err) {
    console.error('[PriceTicker] Render error:', err);
    return <div className="text-red-500">Error displaying price.</div>;
  }
}
