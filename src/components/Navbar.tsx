import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  User, 
  LogOut,  
  UserCheck,
  ChevronDown,
  Shield
} from "lucide-react";
import tradingLogo from "@/assets/trading-logo.png";
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const { user, admin, isAuthenticated, isAdmin, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={tradingLogo} alt="MS Trading Tools" className="w-12 h-12 rounded-full shadow-glow" />
            <div>
              <h1 className="text-xl font-bold gold-text">XAU/USD</h1>
              <p className="text-yellow-400 text-sm font-bold">ALGO TRADER</p>
            </div>
          </div>

          {/* Navigation Links - Always visible */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/tools" className="nav-link">Tools</Link>
            <Link to="/tools" className="nav-link">Indicators</Link>
            <a href="https://t.me/goldtraderindia" target="_blank" rel="noopener noreferrer" className="nav-link">
              Community
            </a>
            <Link to="/premium-signals" className="nav-link whitespace-nowrap">
              Premium Signals
            </Link>
            <Link to="/social-trading" className="nav-link whitespace-nowrap">
              Social Trading
            </Link>
            
            {/* Admin Panel Link - Only visible to admins */}
            {isAdmin && (
              <Link to="/admin" className="nav-link text-destructive flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Admin Panel
              </Link>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              /* User Profile Dropdown - Replaces login/register when authenticated */
              <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">
                      {user?.name || admin?.name || 'User'}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.name || admin?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email || admin?.email}
                      </p>
                      {user && (
                        <p className="text-xs">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            user.status === 'approved' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : user.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {user.status === 'approved' && <UserCheck className="w-3 h-3 mr-1" />}
                            {user.status?.charAt(0).toUpperCase() + user.status?.slice(1)}
                          </span>
                        </p>
                      )}
                      {isAdmin && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          <Shield className="w-3 h-3 mr-1" />
                          Administrator
                        </span>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer" onClick={() => setIsDropdownOpen(false)}>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Login/Register Buttons - Shown when not authenticated */
              <>
                <Button variant="ghost" className="hidden md:inline-flex" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
                <Button className="premium-button" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;