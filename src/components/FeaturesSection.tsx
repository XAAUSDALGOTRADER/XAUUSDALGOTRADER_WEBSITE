import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Bot, 
  TrendingUp, 
  Users, 
  Shield, 
  Zap,
  ArrowRight 
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Premium Indicators",
    description: "Advanced technical indicators with real-time analysis and customizable parameters for precise market entry and exit points.",
    highlight: "90%+ Accuracy"
  },
  {
    icon: Bot,
    title: "Expert Advisors (EAs)",
    description: "Automated trading robots that execute trades based on proven strategies, running 24/7 to capture market opportunities.",
    highlight: "24/7 Trading"
  },
  {
    icon: TrendingUp,
    title: "Smart Analytics",
    description: "AI-powered market analysis with predictive insights, risk assessment, and performance optimization tools.",
    highlight: "AI-Powered"
  },
  {
    icon: Users,
    title: "Trading Community",
    description: "Connect with professional traders, share strategies, and learn from market experts in our exclusive community.",
    highlight: "10K+ Members"
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Advanced risk control systems with position sizing, stop-loss automation, and portfolio protection strategies.",
    highlight: "Capital Protection"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Ultra-low latency execution with direct market access and premium server infrastructure for optimal performance.",
    highlight: "< 1ms Latency"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Professional <span className="gold-text">Trading Tools</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to dominate the markets with confidence and precision. 
            Our premium tools are designed by traders, for traders.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="trading-card group hover:shadow-glow transition-all duration-500">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {feature.highlight}
                  </span>
                </div>
                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center p-8 bg-gradient-accent rounded-2xl border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Trading?</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Join thousands of successful traders who trust our platform for consistent profits.
            </p>
            <Button className="premium-button text-lg px-8 py-6" onClick={() => window.location.href = '/register'}>
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;