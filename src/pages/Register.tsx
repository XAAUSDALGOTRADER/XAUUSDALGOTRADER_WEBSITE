import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    mobile: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        country: formData.country,
        mobile: formData.mobile
      });

      toast({
        title: "Success",
        description: response.message,
      });

      // Redirect to login page after successful registration
      navigate('/login');
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Registration Failed",
          description: error.message || "An error occurred during registration",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
        
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold gold-text">Create Account</CardTitle>
            <CardDescription>
              Join our trading community and start your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select 
                  onValueChange={(value) => handleChange("country", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="sg">Singapore</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={(e) => handleChange("mobile", e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full premium-button"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;