import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Eye, Lock, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold gold-text mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground text-lg">
              Your privacy and data protection are our top priorities
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: January 2025
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Personal Information</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Name, email address, and contact information</li>
                    <li>Trading experience and financial information</li>
                    <li>Account preferences and settings</li>
                    <li>Communication records and support interactions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Technical Information</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>IP address, browser type, and device information</li>
                    <li>Usage patterns and platform interactions</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide and maintain our trading platform and services</li>
                  <li>Process transactions and manage your account</li>
                  <li>Send important notifications about your account and services</li>
                  <li>Improve our platform and develop new features</li>
                  <li>Comply with legal and regulatory requirements</li>
                  <li>Detect and prevent fraud and security threats</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-primary" />
                  Information Sharing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations or court orders</li>
                  <li>With trusted service providers who assist in platform operations</li>
                  <li>To protect our rights, privacy, safety, or property</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We implement industry-standard security measures including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure. We continuously work to protect your information but cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Access and review your personal information</li>
                  <li>Request corrections to inaccurate data</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request data portability</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Email:</strong> xauusdalgotrader@gmail.com</p>
                  <p><strong>Address:</strong> Bhubaneswar, Odisha - 751003, India</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;