import { useEffect, useState } from 'react';
import { getBars } from '../services/alpaca2';

interface UseAlpacaConnectionState {
  isLoading: boolean;
  hasError: boolean;
  data: unknown | null;
  error: string | null;
}

/**
 * useAlpacaConnection
 * Attempts to fetch a small amount of data from Alpaca to test API connectivity.
 * Returns loading, error, and data state.
 */
export function useAlpacaConnection(symbol: string = 'BTC/USD') {
  const [state, setState] = useState<UseAlpacaConnectionState>({
    isLoading: true,
    hasError: false,
    data: null,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    setState({ isLoading: true, hasError: false, data: null, error: null });
    getBars(symbol)
      .then(bars => {
        if (isMounted) setState({ isLoading: false, hasError: false, data: bars, error: null });
      })
      .catch(err => {
        if (isMounted)
          setState({
            isLoading: false,
            hasError: true,
            data: null,
            error: err instanceof Error ? err.message : String(err),
          });
      });
    return () => {
      isMounted = false;
    };
  }, [symbol]);

  return state;
}
