import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/api";
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: ""
  });

  const [adminFormData, setAdminFormData] = useState({
    email: "",
    password: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("user");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, adminLogin } = useAuth();

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.login(userFormData.email, userFormData.password);
      
      toast({
        title: "Success",
        description: response.message,
      });

      // Update auth context
      login(response.user, response.token);
      
      // Redirect to home page
      navigate('/');
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Invalid email or password";
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

const handleAdminSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await api.adminLogin(adminFormData.email, adminFormData.password);
    
    toast({
      title: "Success",
      description: response.message,
    });

    // Update auth context
    adminLogin(response.admin, response.token);
    
    // Redirect to admin dashboard
    navigate('/admin');
    
  } catch (error: unknown) {
    let errorMessage = "Invalid admin credentials";
    
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Check for specific error types
      if (error.message.includes('Network error')) {
        errorMessage = "Cannot connect to server. Please check if the server is running.";
      } else if (error.message.includes('401')) {
        errorMessage = "Invalid email or password. Please check your credentials.";
      } else if (error.message.includes('500')) {
        errorMessage = "Server error. Please try again later.";
      }
    }
    
    toast({
      title: "Admin Login Failed",
      description: errorMessage,
      variant: "destructive",
    });
    
    // Log the full error for debugging
    console.error('Admin login error:', error);
  } finally {
    setIsLoading(false);
  }
};

  const handleUserChange = (field: string, value: string) => {
    setUserFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAdminChange = (field: string, value: string) => {
    setAdminFormData(prev => ({ ...prev, [field]: value }));
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
            <CardTitle className="text-2xl font-bold gold-text">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="user" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="user" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  User Login
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Admin Login
                </TabsTrigger>
              </TabsList>

              <TabsContent value="user">
                <form onSubmit={handleUserSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email Address</Label>
                    <Input
                      id="user-email"
                      type="email"
                      placeholder="Enter your email"
                      value={userFormData.email}
                      onChange={(e) => handleUserChange("email", e.target.value)}
                      required
                      disabled={isLoading && activeTab === 'user'}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="user-password">Password</Label>
                    <Input
                      id="user-password"
                      type="password"
                      placeholder="Enter your password"
                      value={userFormData.password}
                      onChange={(e) => handleUserChange("password", e.target.value)}
                      required
                      disabled={isLoading && activeTab === 'user'}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full premium-button"
                    disabled={isLoading && activeTab === 'user'}
                  >
                    {isLoading && activeTab === 'user' ? "Signing In..." : "Sign In as User"}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary hover:text-primary/80 font-medium">
                      Sign up
                    </Link>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="admin">
                <form onSubmit={handleAdminSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="Enter admin email"
                      value={adminFormData.email}
                      onChange={(e) => handleAdminChange("email", e.target.value)}
                      required
                      disabled={isLoading && activeTab === 'admin'}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="Enter admin password"
                      value={adminFormData.password}
                      onChange={(e) => handleAdminChange("password", e.target.value)}
                      required
                      disabled={isLoading && activeTab === 'admin'}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    disabled={isLoading && activeTab === 'admin'}
                  >
                    {isLoading && activeTab === 'admin' ? "Signing In..." : "Sign In as Admin"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;