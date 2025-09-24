import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, FileText, Download, Lock, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Education = () => {
  const [isLoggedIn] = useState(false); // This will be connected to actual auth later

  const educationContent = [
    {
      title: "Trading Fundamentals",
      type: "video",
      duration: "2h 30m",
      description: "Complete guide to forex and gold trading basics",
      premium: false,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      title: "Advanced Price Action",
      type: "video", 
      duration: "3h 15m",
      description: "Master price action and smart money concepts",
      premium: true,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      title: "Risk Management Guide",
      type: "pdf",
      duration: "45 pages",
      description: "Essential risk management strategies for traders",
      premium: false,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      title: "EA Development Course",
      type: "video",
      duration: "5h 20m", 
      description: "Learn to create your own Expert Advisors",
      premium: true,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      title: "Market Psychology",
      type: "pdf",
      duration: "32 pages",
      description: "Understanding market sentiment and psychology",
      premium: true,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      title: "Technical Analysis Masterclass",
      type: "video",
      duration: "4h 45m",
      description: "Complete technical analysis from beginner to advanced",
      premium: false,
      thumbnail: "/api/placeholder/300/200"
    }
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl gold-text">Education Center</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Access our comprehensive trading education library with courses, tutorials, and guides.
            </p>
            <div className="flex gap-2">
              <Button className="premium-button flex-1" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gold-text mb-4">Trading Education</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the markets with our comprehensive education library featuring video tutorials, guides, and courses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {educationContent.map((content, index) => (
            <Card key={index} className="trading-card overflow-hidden">
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  {content.type === 'video' ? (
                    <Play className="w-12 h-12 text-primary" />
                  ) : (
                    <FileText className="w-12 h-12 text-primary" />
                  )}
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="text-xs">
                    {content.type.toUpperCase()}
                  </Badge>
                </div>
                {content.premium && (
                  <div className="absolute top-3 right-3">
                    <Badge className="text-xs bg-yellow-600">Premium</Badge>
                  </div>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg">{content.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {content.duration}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{content.description}</p>
                <div className="flex gap-2">
                  {content.type === 'video' ? (
                    <Button className="premium-button flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      Watch
                    </Button>
                  ) : (
                    <Button className="premium-button flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;