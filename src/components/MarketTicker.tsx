import { TrendingUp, TrendingDown } from "lucide-react";

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const marketData: MarketData[] = [
  { symbol: "EURUSD", name: "Euro / US Dollar", price: 1.0856, change: 0.0023, changePercent: 0.21 },
  { symbol: "GBPUSD", name: "British Pound / US Dollar", price: 1.2744, change: -0.0056, changePercent: -0.44 },
  { symbol: "XAUUSD", name: "Gold Spot / US Dollar", price: 2018.45, change: 12.30, changePercent: 0.61 },
  { symbol: "BTCUSD", name: "Bitcoin / US Dollar", price: 43250.00, change: -890.50, changePercent: -2.02 },
  { symbol: "USDJPY", name: "US Dollar / Japanese Yen", price: 149.82, change: 0.95, changePercent: 0.64 },
  { symbol: "AUDUSD", name: "Australian Dollar / US Dollar", price: 0.6621, change: 0.0031, changePercent: 0.47 },
];

const MarketTicker = () => {
  return (
    <div className="bg-card/30 backdrop-blur-sm border-y border-border/50 py-4">
      <div className="container mx-auto px-6">
        <div className="flex items-center mb-3">
          <h3 className="text-sm font-semibold gold-text">Live Market Data</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {marketData.map((item) => (
            <div
              key={item.symbol}
              className="trading-card p-4 hover:shadow-glow transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold text-primary text-sm">{item.symbol}</div>
                  <div className="text-xs text-muted-foreground truncate">{item.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-foreground">{item.price.toFixed(4)}</div>
                  <div className={`flex items-center text-xs ${
                    item.change >= 0 ? 'text-chart-gain' : 'text-chart-loss'
                  }`}>
                    {item.change >= 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                {item.change >= 0 ? '+' : ''}{item.change.toFixed(4)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketTicker;