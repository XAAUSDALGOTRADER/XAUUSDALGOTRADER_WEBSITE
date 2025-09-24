import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Lock, User, Settings, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from '@/hooks/useAuth'; // Fixed import path
import PremiumRequestModal from '@/components/PremiumRequestModal';
import { useToast } from "@/components/ui/use-toast";

interface ToolFile {
  name: string;
  type: string;
  size: string;
  premium: boolean;
  filename: string;
}

interface ToolCategory {
  title: string;
  description: string;
  icon: LucideIcon; // Proper type for Lucide icons
  files: ToolFile[];
}

const Tools = () => {
  const { isAuthenticated, isUserApproved } = useAuth();
  const { toast } = useToast();
  const [selectedTool, setSelectedTool] = useState<{name: string; filename: string} | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toolCategories: ToolCategory[] = [
    {
      title: "Expert Advisors",
      description: "Automated trading robots for MT4/MT5",
      icon: Settings,
      files: [
        { name: "Gold Scalper EA v2.1", type: "mq4", size: "2.3 MB", premium: true, filename: "Gold-Scalper-EA.mq4" },
        { name: "Trend Master EA", type: "ex4", size: "1.8 MB", premium: false, filename: "Trend-Master-EA.ex4" },
      ]
    },
    {
      title: "Premium Indicators", 
      description: "Advanced technical analysis tools",
      icon: FileText,
      files: [
        { name: "Smart Money Concepts", type: "mq4", size: "890 KB", premium: true, filename: "Smart-Money-Concepts.mq4" },
        { name: "Volume Profile Pro", type: "ex4", size: "1.2 MB", premium: true, filename: "Volume-Profile-Pro.ex4" },
      ]
    },
    {
      title: "Trading Tools",
      description: "Calculators, scanners, and utilities",
      icon: User,
      files: [
        { name: "Risk Calculator", type: "xlsx", size: "245 KB", premium: false, filename: "Risk-Calculator.xlsx" },
        { name: "Position Size Calculator", type: "pdf", size: "156 KB", premium: false, filename: "Position-Size-Calculator.pdf" },
      ]
    }
  ];

  const handleDownload = (file: ToolFile) => {
    if (file.premium) {
      // Show premium request modal
      setSelectedTool({ name: file.name, filename: file.filename });
      setIsModalOpen(true);
    } else {
      // Direct download for free files
      const filePath = `/downloads/free/${file.filename}`;
      
      // Create a temporary anchor tag for download
      const link = document.createElement('a');
      link.href = filePath;
      link.download = file.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download Started",
        description: `Downloading ${file.name}`,
      });
    }
  };

  const handlePremiumRequestClose = () => {
    setIsModalOpen(false);
    setSelectedTool(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl gold-text">Access Restricted</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Please log in to access our premium trading tools and resources.
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

  if (!isUserApproved) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <div className="mx-auto mb-4 p-3 bg-yellow-500/10 rounded-full w-fit">
              <Lock className="w-8 h-8 text-yellow-500" />
            </div>
            <CardTitle className="text-2xl gold-text">Approval Required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Your account is pending admin approval. You'll gain access to all tools once approved.
            </p>
            <Button variant="outline" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gold-text mb-4">Trading Tools</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access our comprehensive collection of trading tools, expert advisors, and premium indicators.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {toolCategories.map((category, index) => (
            <Card key={index} className="trading-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.files.map((file, fileIndex) => (
                  <div key={fileIndex} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-primary" />
                      <div>
                        <div className="font-medium">{file.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {file.type.toUpperCase()} • {file.size}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {file.premium && (
                        <Badge variant="secondary" className="text-xs">Premium</Badge>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownload(file)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Premium Request Modal */}
        <PremiumRequestModal
          isOpen={isModalOpen}
          onClose={handlePremiumRequestClose}
          toolName={selectedTool?.name || ''}
          fileName={selectedTool?.filename || ''}
        />
      </div>
    </div>
  );
};

export default Tools;