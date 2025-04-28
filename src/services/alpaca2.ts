import 'dotenv/config';
/**
 * Alpaca API service (TypeScript refactor)
 *
 * - Reads API credentials from environment variables
 * - Exports typed functions for bar retrieval
 * - Exports typed functions for last trade retrieval
 * - Exports typed functions for last quote retrieval
 */
import Alpaca from '@alpacahq/alpaca-trade-api';

const keyId = resolveEnvVar('VITE_ALPACA_KEY_ID');
const secretKey = resolveEnvVar('VITE_ALPACA_SECRET_KEY');

if (!keyId || !secretKey) {
  throw new Error('Alpaca API credentials are missing. Check your environment variables.');
}

export const alpaca = new Alpaca({
  keyId,
  secretKey,
  paper: true, // set to false if using live trading
});

// SDK-based getLastTrade for stocks only
export async function getLastTrade(symbol: string) {
  if (symbol.includes('/')) {
    throw new Error(
      'Crypto symbols are not supported by the SDK getLastTrade. Use stock symbols like "AAPL".'
    );
  }
  try {
    return await alpaca.getLastTrade(symbol);
  } catch (error) {
    throw new Error(`Failed to fetch last trade for ${symbol}: ${error}`);
  }
}

// REST-based getLastQuote for stocks only
export async function getLastQuoteREST(symbol: string) {
  if (symbol.includes('/')) {
    throw new Error(
      'Crypto symbols are not supported by getLastQuoteREST. Use stock symbols like "AAPL".'
    );
  }
  const endpoint = `https://data.alpaca.markets/v2/stocks/${symbol}/quotes/latest`;
  const res = await fetch(endpoint, {
    headers: {
      'APCA-API-KEY-ID': keyId,
      'APCA-API-SECRET-KEY': secretKey,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Alpaca REST error (${res.status}): ${text}`);
  }
  return await res.json();
}

// SDK-based getLastQuote for stocks only
export async function getLastQuote(symbol: string) {
  if (symbol.includes('/')) {
    throw new Error(
      'Crypto symbols are not supported by the SDK getLastQuote. Use stock symbols like "AAPL".'
    );
  }
  try {
    return await alpaca.getLastQuote(symbol);
  } catch (error) {
    throw new Error(`Failed to fetch last quote for ${symbol}: ${error}`);
  }
}

// Cross-environment: resolve credentials from Vite or Node env
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

export interface GetBarsOptions {
  timeframe?: string;
  limit?: number;
}

/**
 * Fetch historical bars for a symbol
 * @param symbol Symbol string (e.g., 'AAPL')
 * @param options Optional timeframe/limit
 */
/**
 * Fetch the latest trade for a stock symbol (e.g., 'AAPL').
 * Will throw an error if a crypto symbol (e.g., 'BTC/USD') is used.
 */
export interface LastTradeResponse {
  symbol: string;
  trade: Record<string, unknown>;
}

/**
 * Fetch the latest trade for a symbol (stock or crypto) via Alpaca REST API.
 * @param symbol e.g. 'AAPL' or 'BTC/USD'
 * @param assetType 'stocks' | 'crypto'
 */
export async function getLastTradeREST(
  symbol: string,
  assetType: 'stocks' | 'crypto' = 'stocks'
): Promise<LastTradeResponse | Record<string, unknown>> {
  if (assetType === 'stocks') {
    const endpoint = `https://data.alpaca.markets/v2/stocks/${symbol}/trades/latest`;
    const res = await fetch(endpoint, {
      headers: {
        'APCA-API-KEY-ID': keyId,
        'APCA-API-SECRET-KEY': secretKey,
      },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Alpaca REST error (${res.status}): ${text}`);
    }
    return await res.json();
  } else {
    // crypto: use v1beta1 endpoint
    const endpoint = `https://data.alpaca.markets/v1beta1/crypto/us/trades/latest?symbols=${encodeURIComponent(symbol)}`;
    const res = await fetch(endpoint, {
      headers: {
        'APCA-API-KEY-ID': keyId,
        'APCA-API-SECRET-KEY': secretKey,
      },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Alpaca REST error (${res.status}): ${text}`);
    }
    return await res.json();
  }
}

/**
 * Fetch crypto bars for a symbol list
 * @param symbols Array of crypto pairs (e.g., ['BTC/USD'])
 * @param options Options for timeframe/limit
 */
export async function getCryptoBars(
  symbols: string[],
  options: GetBarsOptions = { timeframe: '1Day', limit: 100 }
) {
  try {
    return await alpaca.getCryptoBars(symbols, options);
  } catch (error) {
    throw new Error(`Failed to fetch crypto bars: ${error}`);
  }
}
