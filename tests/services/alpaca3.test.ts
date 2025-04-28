import * as dotenv from 'dotenv';
dotenv.config();

const keyId = process.env.VITE_ALPACA_KEY_ID;
const secretKey = process.env.VITE_ALPACA_SECRET_KEY;

if (!keyId || !secretKey) {
  throw new Error('Set VITE_ALPACA_KEY_ID and VITE_ALPACA_SECRET_KEY in your .env file.');
}

console.log('Connecting to Alpaca WebSocket for AAPL trades...');

const { createAlpacaStream } = await import('../../src/services/alpaca3.stream.js');

const disconnect = await createAlpacaStream({
  assetType: 'stocks',
  symbols: ['AAPL'],
  subscriptions: ['trades'],
  keyId,
  secretKey,
  onMessage: msg => {
    console.log('Received:', JSON.stringify(msg));
  },
  onError: err => {
    console.error('WebSocket error:', err);
  },
});

// Optional: Close after 20 seconds
timeoutExit(20000);

function timeoutExit(ms: number) {
  setTimeout(() => {
    disconnect();
    console.log('Disconnected. Exiting.');
    process.exit(0);
  }, ms);
}
