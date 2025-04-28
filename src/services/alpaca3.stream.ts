// Alpaca Market Data WebSocket Stream Utility
// Supports stocks and crypto. Functional, modular, typed.

interface AlpacaStreamOptions {
  assetType: 'stocks' | 'crypto';
  symbols: string[];
  subscriptions: Array<'trades' | 'quotes' | 'bars'>;
  onMessage: (msg: unknown) => void;
  onError?: (err: unknown) => void;
  keyId?: string;
  secretKey?: string;
}

/**
 * Connects to Alpaca Market Data WebSocket and manages subscription.
 * Handles authentication, subscription, reconnection, and event dispatch.
 */
export async function createAlpacaStream({
  assetType,
  symbols,
  subscriptions,
  onMessage,
  onError,
  keyId,
  secretKey,
}: AlpacaStreamOptions) {
  // Env fallback (Vite or Node)
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

  const endpoint =
    assetType === 'stocks'
      ? 'wss://stream.data.alpaca.markets/v2/iex' // Use /v2/iex for free IEX data
      : 'wss://stream.data.alpaca.markets/v1beta1/crypto';

  // Cross-platform WebSocket: use ws in Node.js ESM, native in browser
  // Use 'any' to bridge ws (Node) and WebSocket (browser) types
  let WSImpl: any;
  if (typeof window === 'undefined') {
    // Node.js ESM: use dynamic import, .default is the constructor (ws v8+)
    // @ts-ignore
    WSImpl = (await import('ws')).default;
  } else {
    WSImpl = WebSocket;
  }

  let ws: any = null;

  let reconnectTimeout: NodeJS.Timeout | null = null;

  function connect() {
    if (typeof window === 'undefined') {
      // Node.js: set Origin header for Alpaca
      ws = new WSImpl(endpoint, {
        headers: {
          Origin: 'https://app.alpaca.markets',
        },
      });
    } else {
      ws = new WSImpl(endpoint);
    }

    ws.onopen = () => {
      // Authenticate
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
          // Authenticate: subscribe after auth
          if (
            msg &&
            typeof msg === 'object' &&
            'msg' in msg &&
            (msg as any).msg === 'authenticated'
          ) {
            ws.send(
              JSON.stringify({
                action: 'subscribe',
                ...Object.fromEntries(subscriptions.map(type => [type, symbols])),
              })
            );
            continue;
          }
          // Ignore subscription confirmation
          if (msg && typeof msg === 'object' && 'msg' in msg && (msg as any).msg === 'subscribed') {
            continue;
          }
          // Forward data to user callback
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
      // Attempt reconnect after delay
      reconnectTimeout = setTimeout(connect, 3000);
    };
  }

  connect();

  // Return cleanup/disconnect function
  return () => {
    if (reconnectTimeout) clearTimeout(reconnectTimeout);
    ws?.close();
    ws = null;
  };
}

// Example usage:
// const disconnect = createAlpacaStream({
//   assetType: 'stocks',
//   symbols: ['AAPL', 'TSLA'],
//   subscriptions: ['trades', 'quotes'],
//   onMessage: (msg) => console.log(msg),
//   onError: (err) => console.error(err),
// });
// ...later: disconnect();

/*
{
  "action": "subscribe",
  "trades": ["AAPL"],
  "quotes": ["AMD", "CLDR"],
  "bars": ["*"],
  "updatedBars": [],
  "dailyBars": ["VOO"],
  "statuses": ["*"],
  "lulds": [],
  "corrections": ["AAPL"],
  "cancelErrors": ["AAPL"]
}*/
