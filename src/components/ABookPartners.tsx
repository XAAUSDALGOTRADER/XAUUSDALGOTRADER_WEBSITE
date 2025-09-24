import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, TrendingUp, DollarSign, Shield } from "lucide-react";

const ABookPartners = () => {
  const fundedAccounts = [
    {
      name: "FunderPro",
      description: "Premium funded trading program with up to $200K accounts",
      features: [
        "Up to $200,000 funding",
        "90% profit split",
        "No time limits",
        "Drawdown protection"
      ],
      link: "https://funderpro.cxclick.com/visit/?bta=41733&brand=funderpro",
      highlight: "Most Popular"
    },
    {
      name: "The 5%ers",
      description: "Innovative funding program with flexible trading rules",
      features: [
        "Up to $4M funding",
        "Flexible rules",
        "High leverage",
        "Instant funding"
      ],
      link: "http://www.the5ers.com/?afmc=zy1",
      highlight: "High Leverage"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-full px-6 py-3 mb-6 animate-pulse">
            <span className="text-lg font-bold text-red-400">
              🔥 Grab 10% Discount, Before it Expires! 🔥
            </span>
          </div>
          <h2 className="text-4xl font-bold gold-text mb-4">
            A-Book Funded Account Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trade with funded capital and keep up to 90% of your profits. Get started with our trusted A-Book funding partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {fundedAccounts.map((partner, index) => (
            <Card key={index} className="trading-card relative overflow-hidden group hover:shadow-glow transition-all duration-300">
              {partner.highlight && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  {partner.highlight}
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl mb-2">{partner.name}</CardTitle>
                <p className="text-muted-foreground">{partner.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {partner.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span>A-Book Execution</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Regulated</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full premium-button group-hover:shadow-lg transition-all duration-300" 
                    onClick={() => window.open(partner.link, '_blank')}
                  >
                    <DollarSign className="mr-2 w-4 h-4" />
                    Get Funded Account
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-primary/10 border border-primary/20 rounded-full px-6 py-3">
            <TrendingUp className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm font-medium gold-text">
              Join thousands of funded traders worldwide
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ABookPartners;