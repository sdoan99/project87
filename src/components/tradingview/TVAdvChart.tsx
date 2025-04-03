import React, { useEffect, useRef } from 'react';
import { useSymbol } from '../../context/SymbolContext';

export function TVAdvChart() {
  const container = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);
  const { activeSymbol } = useSymbol();

  useEffect(() => {
    if (!container.current) return;

    // Only create the widget once
    if (!widgetRef.current) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: "600",
        symbol: activeSymbol,
        interval: "D",
        timezone: "America/New_York",
        theme: "dark",
        style: "1",
        locale: "en",
        backgroundColor: "rgba(0, 0, 0, 1)",
        withdateranges: true,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        calendar: false,
        show_popup_button: true,
        popup_width: "1000",
        popup_height: "650",
        support_host: "https://www.tradingview.com"
      });

      container.current.appendChild(script);
      widgetRef.current = true;
    } else {
      // Update the existing widget's symbol
      const widget = container.current.querySelector('iframe');
      if (widget) {
        // Use TradingView's postMessage API to change the symbol
        widget.contentWindow?.postMessage({
          name: 'set-symbol',
          data: {
            symbol: activeSymbol
          }
        }, '*');
      }
    }
  }, [activeSymbol]);

  return (
    <div className="tradingview-widget-container h-full" ref={container}>
      <div className="tradingview-widget-container__widget h-full"></div>
    </div>
  );
}