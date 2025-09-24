import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Bot, Phone, Clock, HelpCircle } from "lucide-react";

const SupportCenter = () => {
  const supportOptions = [
    {
      title: "Email Support",
      description: "Get detailed help via email. Response within 24 hours.",
      icon: Mail,
      action: "Send Email",
      link: "mailto:xauusdalgotrader@gmail.com",
      availability: "24/7"
    },
    {
      title: "Telegram Admin",
      description: "Direct chat with our admin team for urgent issues.",
      icon: MessageCircle,
      action: "Chat Now",
      link: "https://t.me/XAUUSDROBO",
      availability: "9 AM - 6 PM IST"
    },
    {
      title: "AI Chatbot - AURUM",
      description: "Get instant answers to common questions.",
      icon: Bot,
      action: "Start Chat",
      link: "#",
      availability: "24/7 Instant"
    }
  ];

  const faqItems = [
    {
      question: "How do I download trading tools?",
      answer: "After logging in, navigate to the Tools section and click download on any available resource."
    },
    {
      question: "What's included in premium membership?",
      answer: "Premium members get access to exclusive EAs, indicators, priority support, and advanced education content."
    },
    {
      question: "How do I install Expert Advisors?",
      answer: "Copy the EA files to your MT4/MT5 'Experts' folder, restart the platform, and drag the EA onto your chart."
    },
    {
      question: "Can I get a refund?",
      answer: "We offer a 30-day money-back guarantee for all premium services. Contact support for refund requests."
    }
  ];

  const handleAurumChat = () => {
    // This would trigger the AURUM chatbot
    const chatButton = document.querySelector('[data-aurum-chat]') as HTMLElement;
    if (chatButton) {
      chatButton.click();
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gold-text mb-4">Support Center</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get help when you need it. Choose from multiple support channels for the fastest assistance.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {supportOptions.map((option, index) => (
            <Card key={index} className="trading-card text-center hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <option.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{option.title}</CardTitle>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {option.availability}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{option.description}</p>
                <Button 
                  className="premium-button w-full"
                  onClick={option.title === "AI Chatbot - AURUM" ? handleAurumChat : undefined}
                  asChild={option.title !== "AI Chatbot - AURUM"}
                >
                  {option.title === "AI Chatbot - AURUM" ? (
                    <>
                      <Bot className="w-4 h-4 mr-2" />
                      {option.action}
                    </>
                  ) : (
                    <a href={option.link} target="_blank" rel="noopener noreferrer">
                      <option.icon className="w-4 h-4 mr-2" />
                      {option.action}
                    </a>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card className="trading-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-primary" />
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {faqItems.map((faq, index) => (
                <div key={index} className="border-b border-border/50 pb-4 last:border-b-0">
                  <h3 className="font-semibold text-lg mb-2 gold-text">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <Card className="trading-card max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl">Still Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our team is here to help you succeed. Reach out through any of the channels above.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>xauusdalgotrader@gmail.com</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupportCenter;