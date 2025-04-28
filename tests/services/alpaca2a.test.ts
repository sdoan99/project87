/* 
cmd 
npx tsx tests/services/alpaca2a.test.ts
npx tsx tests/services/alpaca2b.test.ts
*/

import 'dotenv/config';
import { getLastTradeREST } from '../../src/services/alpaca2';

(async () => {
  try {
    const stockTrade = await getLastTradeREST('amzn', 'stocks');
    console.log('Stock (amzn) last trade:', stockTrade);
    process.exit(0);
  } catch (error) {
    console.error('Connection failed:', error);
    process.exit(1);
  }
})();
