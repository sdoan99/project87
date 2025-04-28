/* 
cmd 
npx tsx tests/services/alpaca2a.test.ts
npx tsx tests/services/alpaca2b.test.ts
*/

import 'dotenv/config';
import { getLastQuoteREST } from '../../src/services/alpaca2';

(async () => {
  try {
    const stockQuote = await getLastQuoteREST('NVDA');
    console.log('Stock (NVDA) last quote:', stockQuote);
    process.exit(0);
  } catch (error) {
    console.error('Connection failed:', error);
    process.exit(1);
  }
})();
