import { useEffect, useRef } from 'react';

const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY as string;

export function useFinnhubRealtime(
  symbol: string,
  onPrice: (price: number) => void,
) {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!FINNHUB_API_KEY) return;

    ws.current = new WebSocket(
      `wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`,
    );

    ws.current.onopen = () => {
      ws.current?.send(JSON.stringify({ type: 'subscribe', symbol }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'trade' && data.data?.length) {
        const price = data.data[0]?.p;
        if (typeof price === 'number' && !isNaN(price)) {
          onPrice(price);
        } else {
          console.error('[useFinnhubRealtime] Invalid price payload:', data);
        }
      } else {
        // Log unexpected structure for debugging
        console.warn('[useFinnhubRealtime] Unexpected message:', data);
      }
    };

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({ type: 'unsubscribe', symbol }));
      }
      ws.current?.close();
    };
  }, [symbol, onPrice]);
}
