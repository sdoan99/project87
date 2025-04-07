import React, { useEffect, useRef, memo } from 'react';

function CryptoScreener() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
    {
      "width": "100%",
      "height": "550",
      "defaultColumn": "overview",
      "screener_type": "crypto_mkt",
      "displayCurrency": "USD",
      "colorTheme": "dark",
      "locale": "en",
      "isTransparent": true
    }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className='tradingview-widget-container' ref={container}>
      <div className='tradingview-widget-container__widget'></div>
    </div>
  );
}

export default memo(CryptoScreener);
