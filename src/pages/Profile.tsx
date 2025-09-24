import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { User, Mail, MapPin, Phone, Save, ArrowLeft, Home } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, refreshUserProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    country: "",
    mobile: ""
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        country: user.country || "",
        mobile: user.mobile || ""
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call the API to update profile
      const response = await api.updateProfile({
        name: profileData.name,
        country: profileData.country,
        mobile: profileData.mobile
      });
      
      // Update local storage and context with new data
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Refresh the user profile from the backend to get the latest data
      await refreshUserProfile?.();
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });

      // Navigate to homepage after successful save
      navigate('/');
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update profile";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Profile Settings</CardTitle>
                  <p className="text-muted-foreground">Manage your account information</p>
                  {user.status && (
                    <div className="mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        user.status === 'approved' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : user.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        Status: {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      disabled
                      className="opacity-70 cursor-not-allowed"
                    />
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Country
                    </Label>
                    <Input
                      id="country"
                      value={profileData.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Mobile Number
                    </Label>
                    <Input
                      id="mobile"
                      value={profileData.mobile}
                      onChange={(e) => handleChange("mobile", e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate(-1)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="premium-button"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;