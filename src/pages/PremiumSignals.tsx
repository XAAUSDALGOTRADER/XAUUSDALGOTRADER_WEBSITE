import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Crown, TrendingUp, Zap, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PremiumSignals = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This should be connected to your auth system
  const navigate = useNavigate();

  const plans = [
    {
      id: "monthly",
      name: "Monthly VIP",
      price: 49,
      duration: "1 Month",
      popular: false,
      features: [
        "Real-time XAU/USD signals",
        "Entry & exit points",
        "Risk management guidance",
        "Telegram group access",
        "Basic market analysis",
        "Email support"
      ]
    },
    {
      id: "sixmonth", 
      name: "6-Month VIP",
      price: 249,
      duration: "6 Months",
      popular: true,
      savings: "Save $45",
      features: [
        "All Monthly VIP features",
        "Advanced technical analysis", 
        "Weekly market outlook",
        "1-on-1 consultation (monthly)",
        "Custom indicator access",
        "Priority support",
        "Performance tracking"
      ]
    },
    {
      id: "yearly",
      name: "Annual VIP", 
      price: 449,
      duration: "12 Months",
      popular: false,
      savings: "Save $139",
      features: [
        "All 6-Month VIP features",
        "Exclusive EA access",
        "Personal trading mentor",
        "Advanced risk calculator", 
        "VIP webinar access",
        "Custom strategy development",
        "Lifetime community access"
      ]
    }
  ];

  const handleSubscribe = (planId: string) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    // Handle subscription logic here
    console.log(`Subscribing to plan: ${planId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-16 h-16 text-primary" />
              <TrendingUp className="w-12 h-12 text-gold" />
            </div>
            <h1 className="text-4xl font-bold gold-text mb-4">Premium Signal Services</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get exclusive VIP access to our professional XAU/USD trading signals, 
              advanced analysis, and expert guidance to maximize your trading success.
            </p>
            <Badge variant="secondary" className="mt-4 bg-gradient-to-r from-gold/20 to-primary/20 text-primary border-primary/30">
              <Star className="w-4 h-4 mr-1" />
              VIP Members Only
            </Badge>
          </div>

          {!isLoggedIn && (
            <div className="mb-8">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Zap className="w-5 h-5" />
                    Authentication Required
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Please log in or register to access our premium signal services and subscription options.
                  </p>
                  <div className="flex gap-4">
                    <Button asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/register">Register</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative ${
                  plan.popular 
                    ? 'border-primary/50 bg-gradient-to-b from-primary/5 to-background' 
                    : 'border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="premium-button">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl gold-text">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/{plan.duration.toLowerCase()}</span>
                    </div>
                    {plan.savings && (
                      <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                        {plan.savings}
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${plan.popular ? 'premium-button' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={!isLoggedIn}
                  >
                    {!isLoggedIn ? 'Login Required' : 'Subscribe Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  What You Get
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• High-probability XAU/USD trade setups</li>
                  <li>• Clear entry, stop-loss, and take-profit levels</li>
                  <li>• Real-time market analysis and updates</li>
                  <li>• Risk management guidelines for each signal</li>
                  <li>• 24/7 Telegram group access with experts</li>
                  <li>• Performance tracking and statistics</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Why Choose Our Signals?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Proven track record with consistent results</li>
                  <li>• Signals from experienced professional traders</li>
                  <li>• Advanced algorithmic analysis combined with human expertise</li>
                  <li>• Comprehensive risk management approach</li>
                  <li>• Transparent performance reporting</li>
                  <li>• Dedicated support team available</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Zap className="w-5 h-5" />
                Risk Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Trading signals are for educational purposes only. Past performance does not guarantee future results. 
                Trading forex and gold involves substantial risk of loss and is not suitable for all investors. 
                Please read our full <Link to="/risk-disclosure" className="text-primary hover:underline">Risk Disclosure</Link> before subscribing.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PremiumSignals;