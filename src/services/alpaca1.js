import Alpaca from '@alpacahq/alpaca-trade-api';

// Alpaca() requires the API key and sectret to be set, even for crypto
const alpaca = new Alpaca({
  keyId: 'YOUR_API_KEY',
  secretKey: 'YOUR_API_SECRET',
});

// Fetch historical bars for a symbol
export async function getBars(symbol, timeframe = '1Day') {
  return alpaca.getBarsV2(symbol, {
    timeframe,
    limit: 100,
  });
}

(async () => {
  const bars = await alpaca.getCryptoBars(['BTC/USD'], options);

  console.table(bars.get('BTC/USD'));
})();
