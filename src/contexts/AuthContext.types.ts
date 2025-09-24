import { User, Admin } from '@/lib/api';

export interface AuthContextType {
  user: User | null;
  admin: Admin | null;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  adminLogin: (admin: Admin, token: string) => void;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    country: string;
    mobile: string;
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUserApproved: boolean; 
  refreshUserProfile: () => Promise<void>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}