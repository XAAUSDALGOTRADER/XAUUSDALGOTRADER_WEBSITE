import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertTriangle, TrendingDown, Shield, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RiskDisclosure = () => {
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
            <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-4xl font-bold gold-text mb-4">Risk Disclosure</h1>
            <p className="text-muted-foreground text-lg">
              Important information about trading risks and our services
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: January 2025
            </p>
          </div>

          <div className="mb-8">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="w-6 h-6" />
                  CRITICAL RISK WARNING
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-destructive font-semibold text-lg">
                  TRADING FOREX, GOLD (XAU/USD), AND OTHER FINANCIAL INSTRUMENTS INVOLVES SUBSTANTIAL RISK OF LOSS AND IS NOT SUITABLE FOR ALL INVESTORS.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-destructive" />
                  High Risk of Financial Loss
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Trading leveraged products such as forex and CFDs carries a high level of risk since leverage can work both to your advantage and disadvantage. As a result, the products offered may not be suitable for all investors because:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>You may lose all of your deposited funds</li>
                  <li>You may be required to make additional payments beyond your initial deposit</li>
                  <li>Market volatility can cause rapid and substantial losses</li>
                  <li>Leverage amplifies both profits and losses</li>
                  <li>Past performance does not guarantee future results</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Our Services Are Educational Only
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 dark:bg-amber-950 dark:border-amber-800">
                  <p className="text-amber-800 dark:text-amber-200 font-semibold mb-2">IMPORTANT DISCLAIMER:</p>
                  <p className="text-amber-700 dark:text-amber-300 text-sm">
                    XAU/USD Algo Trader provides educational tools, indicators, and analysis for informational purposes only. We do not provide investment advice or guarantee trading profits.
                  </p>
                </div>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Our tools and signals are for educational purposes only</li>
                  <li>We do not guarantee the accuracy of our analysis or signals</li>
                  <li>All trading decisions are your sole responsibility</li>
                  <li>We are not registered investment advisors</li>
                  <li>Past performance of our tools does not predict future results</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Risks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Financial markets are subject to various risks including but not limited to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Market Volatility:</strong> Prices can fluctuate rapidly and unpredictably</li>
                  <li><strong>Liquidity Risk:</strong> Markets may become illiquid, affecting your ability to trade</li>
                  <li><strong>Economic Events:</strong> News and economic releases can cause significant price movements</li>
                  <li><strong>Geopolitical Events:</strong> Political instability can impact market conditions</li>
                  <li><strong>Technology Risks:</strong> System failures or connectivity issues may affect trading</li>
                  <li><strong>Counterparty Risk:</strong> Risk of default by your broker or trading platform</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Automated Trading Risks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Using Expert Advisors and automated trading systems involves additional risks:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Technical failures or bugs in the software</li>
                  <li>Unexpected market conditions not accounted for in the algorithm</li>
                  <li>Over-optimization based on historical data</li>
                  <li>Connectivity issues that may prevent proper execution</li>
                  <li>Need for constant monitoring and adjustment</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations for Safe Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Only invest money you can afford to lose completely</li>
                  <li>Use appropriate position sizing and risk management</li>
                  <li>Diversify your trading strategies and instruments</li>
                  <li>Continuously educate yourself about market risks</li>
                  <li>Test strategies on demo accounts before live trading</li>
                  <li>Regularly review and adjust your risk parameters</li>
                  <li>Seek independent financial advice if needed</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regulatory Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  XAU/USD Algo Trader is an educational platform and does not operate as a licensed financial services provider. We do not offer investment advice, portfolio management, or brokerage services. Always ensure your chosen broker is properly regulated in your jurisdiction.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acknowledgment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  By using our platform and services, you acknowledge that you have read, understood, and accepted all the risks outlined in this disclosure. You confirm that you are solely responsible for your trading decisions and any resulting profits or losses.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have questions about these risks or need clarification:
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

export default RiskDisclosure;