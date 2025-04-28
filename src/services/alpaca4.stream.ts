// Alpaca Crypto Market Data WebSocket Stream Utility (alpaca4)
// Crypto-only stream for Project87

interface Alpaca4StreamOptions {
  symbols: string[];
  subscriptions: Array<'trades' | 'quotes' | 'bars'>;
  onMessage: (msg: unknown) => void;
  onError?: (err: unknown) => void;
  keyId?: string;
  secretKey?: string;
}

/**
 * Connects to Alpaca Crypto Market Data WebSocket (v1beta3)
 * Handles authentication, subscription, reconnection, and event dispatch.
 * Endpoint: wss://stream.data.alpaca.markets/v1beta3/crypto/us
 */
export async function createAlpaca4Stream({
  symbols,
  subscriptions,
  onMessage,
  onError,
  keyId,
  secretKey,
}: Alpaca4StreamOptions) {
  function resolveEnvVar(key: string): string | undefined {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      // @ts-ignore
      return import.meta.env[key];
    }
    if (typeof process !== 'undefined' && process.env[key]) {
      return process.env[key];
    }
    return undefined;
  }

  const resolvedKeyId = keyId || resolveEnvVar('VITE_ALPACA_KEY_ID');
  const resolvedSecretKey = secretKey || resolveEnvVar('VITE_ALPACA_SECRET_KEY');

  if (!resolvedKeyId || !resolvedSecretKey) {
    throw new Error('Alpaca API credentials are missing.');
  }

  const endpoint = 'wss://stream.data.alpaca.markets/v1beta3/crypto/us';

  let WSImpl: any;
  if (typeof window === 'undefined') {
    WSImpl = (await import('ws')).default;
  } else {
    WSImpl = WebSocket;
  }

  let ws: any = null;
  let reconnectTimeout: NodeJS.Timeout | null = null;

  function connect() {
    if (typeof window === 'undefined') {
      ws = new WSImpl(endpoint, {
        headers: { Origin: 'https://app.alpaca.markets' },
      });
    } else {
      ws = new WSImpl(endpoint);
    }

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          action: 'auth',
          key: resolvedKeyId,
          secret: resolvedSecretKey,
        })
      );
    };

    ws.onmessage = (event: { data: string }) => {
      try {
        const data = JSON.parse(event.data);
        const messages = Array.isArray(data) ? data : [data];
        for (const msg of messages) {
          if (msg && typeof msg === 'object' && 'msg' in msg && (msg as any).msg === 'authenticated') {
            ws.send(
              JSON.stringify({
                action: 'subscribe',
                ...Object.fromEntries(subscriptions.map(type => [type, symbols])),
              })
            );
            continue;
          }
          if (msg && typeof msg === 'object' && 'msg' in msg && (msg as any).msg === 'subscribed') {
            continue;
          }
          onMessage(msg);
        }
      } catch (err) {
        onError?.(err);
      }
    };

    ws.onerror = (event: unknown) => {
      onError?.(event);
    };

    ws.onclose = () => {
      reconnectTimeout = setTimeout(connect, 3000);
    };
  }

  connect();

  return () => {
    if (reconnectTimeout) clearTimeout(reconnectTimeout);
    ws?.close();
    ws = null;
  };
}

// Example usage:
// const disconnect = await createAlpaca4Stream({
//   symbols: ['BTC/USD', 'ETH/USD'],
//   subscriptions: ['trades', 'quotes'],
//   onMessage: (msg) => console.log(msg),
//   onError: (err) => console.error(err),
// });
// ...later: disconnect();
