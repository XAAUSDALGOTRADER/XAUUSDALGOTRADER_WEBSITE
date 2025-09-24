import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, Youtube, TrendingUp, MessageCircle, Send } from "lucide-react";
import tradingLogo from "@/assets/trading-logo.png";
import { useForm } from "react-hook-form";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const Footer = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          type: 'website_contact'
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll get back to you soon.",
        });
        reset();
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get error message
  const getErrorMessage = (error: unknown): string | null => {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof (error as { message?: unknown }).message === "string"
    ) {
      return (error as { message: string }).message;
    }
    return null;
  };

  const nameError = getErrorMessage(errors.name);
  const emailError = getErrorMessage(errors.email);
  const messageError = getErrorMessage(errors.message);

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src={tradingLogo} alt="MS Trading Tools" className="w-12 h-12 rounded-full shadow-glow" />
              <div>
                <h3 className="text-xl font-bold gold-text">XAU/USD</h3>
                <p className="text-sm font-bold text-yellow-400">ALGO TRADER</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Professional trading tools and expert advisors designed to help traders 
              achieve consistent profitability in forex and gold markets.
            </p>
          </div>

          {/* Trading Tools */}
          <div>
            <h4 className="text-lg font-semibold mb-6 gold-text">Trading Tools</h4>
            <ul className="space-y-3">
              <li><a href="/tools" className="nav-link">Expert Advisors</a></li>
              <li><a href="/tools" className="nav-link">Premium Indicators</a></li>
              <li><a href="/premium-signals" className="nav-link">Signal Services</a></li>
              <li><a href="/tools" className="nav-link">Risk Management</a></li>
              <li><a href="https://www.forexfactory.com/trades" target="_blank" className="nav-link">Market Analysis</a></li>
              <li><a href="/tools" className="nav-link">Trading Strategies</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6 gold-text">Resources</h4>
            <ul className="space-y-3">
              <li><a href="/education" className="nav-link">Trading Education</a></li>
              <li><a href="/education" className="nav-link">Video Tutorials</a></li>
              <li><a href="https://t.me/goldtraderindia" target="_blank" className="nav-link">Community Forum</a></li>
              <li><a href="https://www.forexfactory.com/news" target="_blank" className="nav-link">Market News</a></li>
              <li><a href="/support" className="nav-link">Support Center</a></li>
            </ul>
          </div>

          {/* Customer Query Form */}
          <div>
            <h4 className="text-lg font-semibold mb-6 gold-text">Contact Us</h4>
            <p className="text-muted-foreground mb-6">
              Have questions? Get in touch with our trading experts.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                <Input 
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Your full name"
                  className="bg-card border-border focus:border-primary"
                  disabled={isLoading}
                />
                {nameError && (
                  <p className="text-sm text-red-500">{nameError}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                <Input 
                  id="email"
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="your.email@example.com"
                  className="bg-card border-border focus:border-primary"
                  disabled={isLoading}
                />
                {emailError && (
                  <p className="text-sm text-red-500">{emailError}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Contact Number</Label>
                <Input 
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="+91 1234567890"
                  className="bg-card border-border focus:border-primary"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">Message *</Label>
                <Textarea
                  id="message"
                  {...register("message", { required: "Message is required" })}
                  placeholder="Describe your query or question..."
                  rows={4}
                  className="bg-card border-border focus:border-primary resize-none"
                  disabled={isLoading}
                />
                {messageError && (
                  <p className="text-sm text-red-500">{messageError}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full premium-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="text-center py-8 border-t border-border">
          <h4 className="text-lg font-semibold mb-6 gold-text">Follow Us</h4>
          <div className="flex justify-center space-x-6">
            <Button variant="ghost" size="lg" className="hover:bg-primary/10 hover:text-primary p-4" asChild>
              <a href="https://www.youtube.com/@XAUUSDAlgoTrader" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Youtube className="w-8 h-8 text-red-600" />
                <span className="font-semibold">YouTube</span>
              </a>
            </Button>
            <Button variant="ghost" size="lg" className="hover:bg-primary/10 hover:text-primary p-4" asChild>
              <a href="https://t.me/goldtraderindia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageCircle className="w-8 h-8 text-blue-500" />
                <span className="font-semibold">Telegram</span>
              </a>
            </Button>
            <Button variant="ghost" size="lg" className="hover:bg-primary/10 hover:text-primary p-4" asChild>
              <a href="https://www.instagram.com/xauusdalgotrader_/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span className="font-semibold">Instagram</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-border">
          <div className="flex items-center space-x-3 text-muted-foreground">
            <Mail className="w-5 h-5 text-primary" />
            <span>xauusdalgotrader@gmail.com</span>
          </div>
          <div className="flex items-center space-x-3 text-muted-foreground">
            <Phone className="w-5 h-5 text-primary" />
            <span>+91-XXXXXXXXXX</span>
          </div>
          <div className="flex items-center space-x-3 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-center">Bhubaneswar, Odisha - 751003, India</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
          <div className="flex items-center space-x-2 text-muted-foreground mb-4 md:mb-0">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span>© 2025 XAUUSD Algo Trader. All rights reserved.</span>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="/privacy-policy" className="nav-link">Privacy Policy</a>
            <a href="/terms-of-service" className="nav-link">Terms of Service</a>
            <a href="/risk-disclosure" className="nav-link">Risk Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;