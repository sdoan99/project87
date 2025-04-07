import React, { useEffect, useRef, memo } from 'react';

function StockScreener() {
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
      "defaultScreen": "most_capitalized",
      "showToolbar": true,
      "locale": "en",
      "market": "us",
      "colorTheme": "dark"
    }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className='tradingview-widget-container' ref={container}>
      <div className='tradingview-widget-container__widget'></div>
    </div>
  );
}

export default memo(StockScreener);
