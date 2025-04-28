import * as dotenv from 'dotenv';
dotenv.config();

const keyId = process.env.VITE_ALPACA_KEY_ID;
const secretKey = process.env.VITE_ALPACA_SECRET_KEY;

if (!keyId || !secretKey) {
  throw new Error('Set VITE_ALPACA_KEY_ID and VITE_ALPACA_SECRET_KEY in your .env file.');
}

console.log('Connecting to Alpaca WebSocket for NVDA trades...');

(async () => {
  const { createAlpacaStream } = await import('../../src/services/alpaca4.stream');

  const disconnect = await createAlpacaStream({
    assetType: 'stocks',
    symbols: ['NVDA'],
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
