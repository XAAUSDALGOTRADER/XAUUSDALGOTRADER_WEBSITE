import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const AURUM_RESPONSES = {
  greeting: [
    "Hello! I'm AURUM, your AI trading assistant. How can I help you today?",
    "Welcome to our trading platform! I'm AURUM, here to assist you with any questions.",
    "Hi there! I'm AURUM, your personal trading guide. What would you like to know?"
  ],
  brokers: "We partner with top-rated brokers: Vantage Markets, Roboforex, and Exness. Each offers competitive spreads, reliable execution, and comprehensive trading tools. Would you like specific information about any of these brokers?",
  trading: "Our platform provides real-time market data powered by TradingView, advanced charting tools, and professional trading insights. You can access live charts, market analysis, and trading signals to make informed decisions.",
  registration: "Getting started is easy! Click 'Get Started' to register with your name, email, password, country, and mobile number. After registration, admin approval is required for account activation.",
  login: "We have separate login portals for users and administrators. Once your account is approved, you can access your personalized trading dashboard with all the tools you need.",
  features: "Our platform offers: ✓ Real-time TradingView charts ✓ Partner broker integration ✓ Professional trading tools ✓ Market analysis ✓ Secure account management ✓ Customer support",
  contact: "You can reach us through our contact form in the footer, or connect with us on Telegram: https://t.me/goldtraderindia or YouTube: https://www.youtube.com/@XAUUSDAlgoTrader",
  gold: "As specialists in gold trading (XAUUSD), we provide expert analysis, signals, and insights for precious metals trading. Our algorithms are specifically optimized for gold market movements.",
  default: "I'm here to help with trading, brokers, registration, platform features, and more. Could you please be more specific about what you'd like to know?"
};

export default function AurumChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = AURUM_RESPONSES.greeting[Math.floor(Math.random() * AURUM_RESPONSES.greeting.length)];
      addBotMessage(greeting);
    }
  }, [isOpen]);

  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getAurumResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return AURUM_RESPONSES.greeting[Math.floor(Math.random() * AURUM_RESPONSES.greeting.length)];
    }
    if (message.includes('broker') || message.includes('vantage') || message.includes('roboforex') || message.includes('exness')) {
      return AURUM_RESPONSES.brokers;
    }
    if (message.includes('trading') || message.includes('chart') || message.includes('market')) {
      return AURUM_RESPONSES.trading;
    }
    if (message.includes('register') || message.includes('signup') || message.includes('account') || message.includes('sign up')) {
      return AURUM_RESPONSES.registration;
    }
    if (message.includes('login') || message.includes('sign in') || message.includes('log in')) {
      return AURUM_RESPONSES.login;
    }
    if (message.includes('feature') || message.includes('platform') || message.includes('service')) {
      return AURUM_RESPONSES.features;
    }
    if (message.includes('contact') || message.includes('support') || message.includes('help') || message.includes('telegram') || message.includes('youtube')) {
      return AURUM_RESPONSES.contact;
    }
    if (message.includes('gold') || message.includes('xauusd') || message.includes('precious')) {
      return AURUM_RESPONSES.gold;
    }
    
    return AURUM_RESPONSES.default;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    const response = getAurumResponse(inputValue);
    
    setTimeout(() => {
      addBotMessage(response);
    }, 1000);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-glow z-50",
          "bg-gradient-gold hover:scale-110 transition-all duration-300",
          isOpen && "rotate-180"
        )}
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Interface */}
      {isOpen && (
        <Card className={cn(
          "fixed bottom-24 right-6 w-96 h-[500px] z-40",
          "trading-card animate-in slide-in-from-bottom-2",
          "flex flex-col overflow-hidden"
        )}>
          {/* Header */}
          <div className="bg-gradient-gold p-4 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary-foreground/10 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-foreground">AURUM</h3>
              <p className="text-xs text-primary-foreground/80">AI Trading Assistant</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.isBot ? "justify-start" : "justify-end"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 text-sm",
                    message.isBot
                      ? "bg-muted text-muted-foreground"
                      : "bg-gradient-gold text-primary-foreground"
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask AURUM anything..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="bg-gradient-gold hover:scale-105 transition-transform"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}