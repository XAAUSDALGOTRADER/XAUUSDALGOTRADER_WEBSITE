import React, { createContext, useState, useEffect } from 'react';
import { AuthContextType, AuthProviderProps } from './AuthContext.types';
import { api } from '@/lib/api'; // Import the API

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [admin, setAdmin] = useState<AuthContextType['admin']>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to refresh user profile from API
  const refreshUserProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await api.getProfile();
      if (response.user) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    } catch (error) {
      console.error('Error refreshing user profile:', error);
      // Don't logout on error, just keep the existing user data
    }
  };

  useEffect(() => {
    // Check if user is logged in on app load
    const initializeAuth = async () => {
      const token = localStorage.getItem('authToken');
      const savedUser = localStorage.getItem('user');
      const savedAdmin = localStorage.getItem('admin');

      if (token && savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          
          // Refresh user data from API to get latest status
          await refreshUserProfile();
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
        }
      }

      if (token && savedAdmin) {
        try {
          setAdmin(JSON.parse(savedAdmin));
        } catch (error) {
          console.error('Error parsing admin data:', error);
          localStorage.removeItem('admin');
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (user: AuthContextType['user'], token: string) => {
    if (!user) return;
    
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setAdmin(null);
  };

  const adminLogin = (admin: AuthContextType['admin'], token: string) => {
    if (!admin) return;
    
    localStorage.setItem('authToken', token);
    localStorage.setItem('admin', JSON.stringify(admin));
    setAdmin(admin);
    setUser(null);
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    country: string;
    mobile: string;
  }) => {
    throw new Error('Register should be called directly from api, not through context');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    setUser(null);
    setAdmin(null);
  };

  const value: AuthContextType = {
    user,
    admin,
    isLoading,
    login,
    adminLogin,
    register,
    logout,
    isAuthenticated: !!user || !!admin,
    isAdmin: !!admin,
    isUserApproved: user?.status === 'approved', // Add this
    refreshUserProfile, // Add this
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the context itself for use in the useAuth hook
export { AuthContext };