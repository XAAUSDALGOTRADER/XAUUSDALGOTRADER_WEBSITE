import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, AlertTriangle, Users, Gavel } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
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
            <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold gold-text mb-4">Terms of Service</h1>
            <p className="text-muted-foreground text-lg">
              Please read these terms carefully before using our platform
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: January 2025
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  By accessing and using XAU/USD Algo Trader platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  XAU/USD Algo Trader provides:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Expert Advisors and automated trading tools</li>
                  <li>Premium indicators and market analysis</li>
                  <li>Trading education and tutorials</li>
                  <li>Signal services and market insights</li>
                  <li>Community access and support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Trading Risks and Disclaimers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <p className="text-destructive font-semibold mb-2">IMPORTANT RISK WARNING:</p>
                  <p className="text-muted-foreground text-sm">
                    Trading forex, gold, and other financial instruments carries a high level of risk and may not be suitable for all investors. Past performance is not indicative of future results.
                  </p>
                </div>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>You may lose all or part of your investment</li>
                  <li>Our tools and signals are for educational purposes only</li>
                  <li>We do not guarantee profits or trading success</li>
                  <li>You are solely responsible for your trading decisions</li>
                  <li>Always use proper risk management</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">As a user of our platform, you agree to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Use the platform only for lawful purposes</li>
                  <li>Not share or resell our proprietary tools and signals</li>
                  <li>Respect intellectual property rights</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription and Payment Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Subscription fees are charged in advance and are non-refundable</li>
                  <li>Prices may change with 30 days notice</li>
                  <li>You may cancel your subscription at any time</li>
                  <li>Access continues until the end of your billing period</li>
                  <li>Failed payments may result in service suspension</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="w-5 h-5 text-primary" />
                  Limitation of Liability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  XAU/USD Algo Trader shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, including but not limited to trading losses, lost profits, or business interruption.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All content, tools, indicators, and materials provided through our platform are proprietary and protected by intellectual property laws. Users are granted a limited license to use these materials for personal trading purposes only.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Termination</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We reserve the right to terminate or suspend your account and access to our services immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For questions regarding these Terms of Service, please contact us:
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

export default TermsOfService;