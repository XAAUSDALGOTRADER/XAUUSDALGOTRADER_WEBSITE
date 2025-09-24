import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    TradingView: any;
  }
}

const TradingViewWidget = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: "FOREXCOM:SPXUSD",
          title: "S&P 500"
        },
        {
          proName: "FOREXCOM:NSXUSD", 
          title: "US 100"
        },
        {
          proName: "FOREXCOM:DJI",
          title: "Dow 30"
        },
        {
          proName: "INDEX:NKY",
          title: "Nikkei 225"
        },
        {
          proName: "INDEX:DEU40",
          title: "DAX Index"
        },
        {
          proName: "FOREXCOM:EURUSD",
          title: "EUR/USD"
        },
        {
          proName: "FOREXCOM:GBPUSD",
          title: "GBP/USD"
        },
        {
          proName: "FOREXCOM:USDJPY",
          title: "USD/JPY"
        },
        {
          proName: "FOREXCOM:USDCHF",
          title: "USD/CHF"
        },
        {
          proName: "FOREXCOM:AUDUSD",
          title: "AUD/USD"
        },
        {
          proName: "FOREXCOM:USDCAD",
          title: "USD/CAD"
        },
        {
          proName: "TVC:GOLD",
          title: "Gold"
        },
        {
          proName: "TVC:SILVER",
          title: "Silver"
        },
        {
          proName: "NYMEX:CL1!",
          title: "Oil"
        },
        {
          proName: "BITSTAMP:BTCUSD",
          title: "Bitcoin"
        },
        {
          proName: "BITSTAMP:ETHUSD",
          title: "Ethereum"
        }
      ],
      showSymbolLogo: true,
      colorTheme: "dark",
      isTransparent: true,
      displayMode: "adaptive",
      locale: "en"
    });
    
    if (container.current) {
      container.current.appendChild(script);
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="bg-card/30 backdrop-blur-sm border-y border-border/50 min-h-[60px]">
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
        <div className="tradingview-widget-copyright">
          <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
            <span className="blue-text">Track all markets on TradingView</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TradingViewWidget;