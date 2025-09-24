import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TradingViewWidget from "@/components/TradingViewWidget";
import FeaturesSection from "@/components/FeaturesSection";
import ABookPartners from "@/components/ABookPartners";
import BrokerPartners from "@/components/BrokerPartners";
import Footer from "@/components/Footer";
import AurumChatbot from "@/components/AurumChatbot";
import ExampleApiComponent from '@/components/ExampleApiComponent';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TradingViewWidget />
      
      {/* Social Trading Coming Soon Banner */}
      <section className="py-12 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-primary/20">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center bg-primary/20 border border-primary/30 rounded-full px-8 py-4 mb-4">
            <span className="text-lg font-bold gold-text">
              🚀 Social Trading Platform - Coming Soon! 🚀
            </span>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Copy trades from successful traders, share your strategies, and build your trading network. 
            Join our community for early access!
          </p>
          <ExampleApiComponent />
        </div>
      </section>
      
      <FeaturesSection />
      <ABookPartners />
      <BrokerPartners />
      <Footer />
      <AurumChatbot />
    </div>
  );
};

export default Index;
