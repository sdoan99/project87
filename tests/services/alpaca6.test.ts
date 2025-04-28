import * as dotenv from 'dotenv';
dotenv.config();

const keyId = process.env.VITE_ALPACA_KEY_ID;
const secretKey = process.env.VITE_ALPACA_SECRET_KEY;

if (!keyId || !secretKey) {
  throw new Error('Set VITE_ALPACA_KEY_ID and VITE_ALPACA_SECRET_KEY in your .env file.');
}

console.log('Connecting to Alpaca Crypto WebSocket for BTC/USD, ETH/USD trades...');

(async () => {
  const { createAlpaca4Stream } = await import('../../src/services/alpaca4.stream');

  const disconnect = await createAlpaca4Stream({
    symbols: [
      'BTC/USD',
      'ETH/USD',
      'SOL/USD',
      'DOGE/USD',
      'AVAX/USD',
      'MATIC/USD',
      'XRP/USD',
      'BCH/USD',
      'LTC/USD',
      'ADA/USD',
    ],
    subscriptions: ['trades'],
    keyId,
    secretKey,
    onMessage: (msg: unknown) => {
      console.log('Received:', JSON.stringify(msg));
    },
    onError: (err: unknown) => {
      console.error('WebSocket error:', err);
    },
  });

  timeoutExit(20000, disconnect);
})();

function timeoutExit(ms: number, disconnect: () => void) {
  setTimeout(() => {
    disconnect();
    console.log('Disconnected. Exiting.');
    process.exit(0);
  }, ms);
}
