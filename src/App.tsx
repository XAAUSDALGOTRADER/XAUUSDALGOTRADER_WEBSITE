import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Tools from "./pages/Tools";
import Education from "./pages/Education";
import SupportCenter from "./pages/SupportCenter";
import SocialTrading from "./pages/SocialTrading";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RiskDisclosure from "./pages/RiskDisclosure";
import PremiumSignals from "./pages/PremiumSignals";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";


// Create a client with production settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});


const App = () => (
  <ErrorBoundary>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route 
          path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tools" 
              element={
                <ProtectedRoute requireApproval>
                  <Tools />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/education" 
              element={
                <ProtectedRoute requireApproval>
                  <Education />
                </ProtectedRoute>
              } 
            />
            <Route path="/support" element={<SupportCenter />} />
            <Route path="/social-trading" element={<SocialTrading />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/risk-disclosure" element={<RiskDisclosure />} />
            <Route 
              path="/premium-signals" 
              element={
                <ProtectedRoute requireApproval>
                  <PremiumSignals />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
