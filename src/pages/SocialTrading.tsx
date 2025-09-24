import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Shield, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SocialTrading = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6">
              <Clock className="w-5 h-5 text-primary mr-2" />
              <span className="text-sm font-medium gold-text">
                Coming Soon - Revolutionary Trading Experience
              </span>
            </div>
            
            <h1 className="text-5xl font-bold gold-text mb-6">
              Social Trading Platform
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join a community of successful traders, copy strategies from top performers, 
              and share your own trading expertise with fellow traders worldwide.
            </p>

            <div className="text-center mb-12">
              <Button className="premium-button text-lg px-8 py-6" onClick={() => window.location.href = '/login'}>
                Get Early Access
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="trading-card text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Copy Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Automatically copy trades from successful traders with proven track records.
                </p>
              </CardContent>
            </Card>

            <Card className="trading-card text-center">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Strategy Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Share your trading strategies and earn from followers who copy your trades.
                </p>
              </CardContent>
            </Card>

            <Card className="trading-card text-center">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Risk Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced risk controls and portfolio management tools to protect your capital.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Login Requirement Notice */}
          <div className="max-w-2xl mx-auto">
            <Card className="trading-card border-primary/20">
              <CardContent className="text-center py-8">
                <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Exclusive Access Required</h3>
                <p className="text-muted-foreground mb-6">
                  Social Trading features are available exclusively to registered users. 
                  Join our community to get early access when we launch.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="premium-button" onClick={() => window.location.href = '/register'}>
                    Create Account
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = '/login'}>
                    Already a Member? Login
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SocialTrading;