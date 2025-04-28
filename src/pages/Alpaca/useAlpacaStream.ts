import { useEffect, useRef, useState } from 'react';

export interface AlpacaStreamOptions {
  symbols: string[];
  columns: string[];
  assetType?: 'stocks' | 'crypto';
  subscriptions?: ('trades' | 'quotes' | 'bars')[];
  keyId?: string;
  secretKey?: string;
}

export function useAlpacaStream({
  symbols,
  columns,
  assetType = 'stocks',
  subscriptions = ['trades'],
  keyId,
  secretKey,
}: AlpacaStreamOptions) {
  const [tableData, setTableData] = useState<Record<string, Record<string, string | number | undefined>>>({});
  const disconnectRef = useRef<null | (() => void)>(null);

  useEffect(() => {
    async function connect() {
      const { createAlpacaStream } = await import('../../services/alpaca3.stream');
      disconnectRef.current = await createAlpacaStream({
        assetType,
        symbols,
        subscriptions,
        keyId,
        secretKey,
        onMessage: (msg: any) => {
          if (msg && typeof msg === 'object' && msg.T && symbols.includes(msg.S)) {
            setTableData(prev => ({
              ...prev,
              [msg.S]: {
                ...prev[msg.S],
                ...columns.reduce((acc, col) => {
                  acc[col] = msg[col] ?? prev[msg.S]?.[col];
                  return acc;
                }, {} as Record<string, string | number | undefined>),
              },
            }));
          }
        },
        onError: (err: unknown) => {
          // eslint-disable-next-line no-console
          console.error('Alpaca stream error:', err);
        },
      });
    }
    connect();
    return () => {
      disconnectRef.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbols.join(','), columns.join(','), assetType, keyId, secretKey, subscriptions.join(',')]);

  return tableData;
}
