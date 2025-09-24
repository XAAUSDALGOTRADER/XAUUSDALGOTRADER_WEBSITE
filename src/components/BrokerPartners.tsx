import { Button } from "@/components/ui/button";
import { ExternalLink, Star } from "lucide-react";

const BrokerPartners = () => {
  const brokers = [
    {
      name: "Vantage Markets",
      rating: 4.8,
      description: "Award-winning multi-asset broker with ultra-fast execution",
      features: ["0.0 pip spreads", "1:1000 leverage", "24/7 support"],
      link: "https://vigco.co/iEz2Az"
    },
    {
      name: "RoboForex",
      rating: 4.7,
      description: "Innovative trading solutions with advanced technology",
      features: ["ECN accounts", "Copy trading", "No commissions"],
      link: "https://my.roboforex.com/en/?a=cszdt"
    },
    {
      name: "Exness",
      rating: 4.9,
      description: "Global leader in online trading with unlimited leverage",
      features: ["Instant withdrawals", "Unlimited leverage", "Premium tools"],
      link: "https://one.exnesstrack.org/a/4regorm696"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gold-text mb-4">
            Our Trusted Broker Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trade with confidence using our carefully selected, regulated broker partners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brokers.map((broker, index) => (
            <div key={index} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 hover:bg-card/70 transition-all duration-300 hover:shadow-glow group">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{broker.name}</h3>
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(broker.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">{broker.rating}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 text-center">{broker.description}</p>
              
              <ul className="space-y-2 mb-8">
                {broker.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full premium-button group-hover:shadow-lg transition-all duration-300" 
                onClick={() => window.open(broker.link, '_blank')}
              >
                Open Account
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrokerPartners;