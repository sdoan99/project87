'use strict';
// Get the symbol from command line arguments, default to 'IBM' if not provided
const symbol = process.argv[2] || 'IBM';
const apiKey = 'Y16LNIU92WOKVMB6'; // Replace with your actual API key

const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

fetch(url, { headers: { 'User-Agent': 'node-fetch' } })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Error:', err));
