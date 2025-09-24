import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import tradingHeroBg from "@/assets/trading-hero-bg.jpg";
import cyborgBg from "@/assets/cyborg-trader-bg.jpg";
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Scrolling Cyborg Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-pulse" style={{
      backgroundImage: `url(${cyborgBg})`,
      filter: 'brightness(0.4)',
      backgroundAttachment: 'scroll'
    }} />
      
      {/* Original Background Image as overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30" style={{
      backgroundImage: `url(${tradingHeroBg})`,
      filter: 'brightness(0.3)'
    }} />
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/80 animate-pulse" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-4xl">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-5xl font-display mb-6 leading-tight md:text-5xl text-center font-bold">
              Trade Like a <span className="gold-text">PRO</span>
              <br />
              Grow Like a <span className="gold-text">Bull</span>
            </h1>
            
            {/* Subtitle */}
            <div className="text-xl md:text-2xl text-accent mb-8 max-w-3xl">
              Unlock the power of cutting-edge forex & gold trading tools, 
              premium indicators, and Expert Advisors (EAs).
            </div>
            
            <div className="text-lg text-muted-foreground mb-12 max-w-2xl">
              Join our community of traders and transform your journey 
              with clarity, precision, and consistency
            </div>
          </div>

          {/* CTA Section */}
          <div className="mb-12">
            <div className="inline-flex items-center bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6">
              <TrendingUp className="w-5 h-5 text-primary mr-2" />
              <span className="text-sm font-medium gold-text">
                Free & premium tools designed for real profits
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="premium-button text-lg px-8 py-6" onClick={() => window.location.href = '/register'}>
                Learn More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold gold-text mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Active Traders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gold-text mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gold-text mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gold-text mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Trading Tools</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;