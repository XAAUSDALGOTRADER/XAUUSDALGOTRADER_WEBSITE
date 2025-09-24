import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { X, Send } from "lucide-react";

interface PremiumRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
  fileName: string;
}

interface RequestFormData {
  brokerCode: string;
  brokerName: string;
  accountType: string;
  tradingExperience: string;
  specificRequirements: string;
}

const PremiumRequestModal = ({ isOpen, onClose, toolName, fileName }: PremiumRequestModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RequestFormData>({
    brokerCode: '',
    brokerName: '',
    accountType: '',
    tradingExperience: '',
    specificRequirements: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/premium-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolName,
          fileName,
          ...formData,
          requestedAt: new Date().toISOString()
        }),
      });

      if (response.ok) {
        toast({
          title: "Request Sent!",
          description: "We've received your request and will contact you shortly.",
        });
        onClose();
        setFormData({
          brokerCode: '',
          brokerName: '',
          accountType: '',
          tradingExperience: '',
          specificRequirements: ''
        });
      } else {
        throw new Error('Failed to send request');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof RequestFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Request Premium Tool</span>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Please provide details for your {toolName} request. Our team will review and contact you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brokerCode">Broker Code *</Label>
              <Input
                id="brokerCode"
                value={formData.brokerCode}
                onChange={(e) => handleInputChange('brokerCode', e.target.value)}
                required
                placeholder="e.g., XYZ123"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brokerName">Broker Name *</Label>
              <Input
                id="brokerName"
                value={formData.brokerName}
                onChange={(e) => handleInputChange('brokerName', e.target.value)}
                required
                placeholder="e.g., Vantage Markets"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountType">Account Type *</Label>
            <Input
              id="accountType"
              value={formData.accountType}
              onChange={(e) => handleInputChange('accountType', e.target.value)}
              required
              placeholder="e.g., ECN, Standard, VIP"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tradingExperience">Trading Experience *</Label>
            <Input
              id="tradingExperience"
              value={formData.tradingExperience}
              onChange={(e) => handleInputChange('tradingExperience', e.target.value)}
              required
              placeholder="e.g., 2 years, Beginner/Intermediate/Expert"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specificRequirements">Specific Requirements</Label>
            <Textarea
              id="specificRequirements"
              value={formData.specificRequirements}
              onChange={(e) => handleInputChange('specificRequirements', e.target.value)}
              placeholder="Any specific customization or requirements..."
              rows={3}
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 premium-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Request
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumRequestModal;