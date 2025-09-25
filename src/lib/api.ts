// const API_BASE_URL = import.meta.env.MODE === 'development' 
//   ? 'http://localhost:3001/api' 
//   : `https://xauusdalgotrader-website-pwyz.vercel.app/api`;

const API_BASE_URL = `https://xauusdalgotrader-website-pwyz.vercel.app/api`;

console.log('Running in mode:', import.meta.env.MODE);
console.log('API Base URL:', API_BASE_URL);
export interface User {
  id: number;
  name: string;
  email: string;
  country: string;
  mobile: string;
  status: string;
  created_at: string;
  last_login?: string;
}

export interface Admin {
  id: number;
  name: string;
  email: string;
}

export interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  duration: string;
  features: string[];
  is_active: boolean;
}

export interface UserSubscription {
  id: number;
  user_id: number;
  plan_id: number;
  status: string;
  start_date: string;
  end_date: string;
  plan_name: string;
  price: number;
  duration: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface UsersResponse {
  users: User[];
  pagination: Pagination;
}

export interface ApiError {
  error: string;
}

export const api = {
  // Generic fetch function with auth
  async request(endpoint: string, options: RequestInit = {}): Promise<unknown> {
    const token = localStorage.getItem('authToken');
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        headers,
        ...options,
        credentials: 'include', // Include cookies for authentication
      });

      if (!response.ok) {
        // Try to parse error response
        let errorData: ApiError;
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: `HTTP error! status: ${response.status}` };
        }
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  },

  // Auth endpoints
  async register(userData: {
    name: string;
    email: string;
    password: string;
    country: string;
    mobile: string;
  }): Promise<{ message: string; userId: number }> {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async login(email: string, password: string): Promise<{ 
    message: string; 
    token: string; 
    user: User 
  }> {
    const response = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },

  async adminLogin(email: string, password: string): Promise<{ 
    message: string; 
    token: string; 
    admin: Admin 
  }> {
    const response = await this.request('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('admin', JSON.stringify(response.admin));
    }
    
    return response;
  },

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
  },

  // User management
  async getProfile(): Promise<{ user: User }> {
    return this.request('/user/profile');
  },
// Add this to your api object in api.ts
  async updateProfile(profileData: {
    name: string;
    country: string;
    mobile: string;
  }): Promise<{ user: User }> {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  async getSubscriptions(): Promise<{ subscriptions: UserSubscription[] }> {
    return this.request('/user/subscriptions');
  },

  async createSubscription(planId: number, paymentMethod: string): Promise<{ 
    message: string; 
    subscriptionId: number; 
    endDate: string 
  }> {
    return this.request('/subscriptions', {
      method: 'POST',
      body: JSON.stringify({ planId, paymentMethod }),
    });
  },

  async redirectToTradingPlatform(): Promise<{ 
    message: string; 
    redirectUrl: string; 
    authToken: string 
  }> {
    return this.request('/trading-platform');
  },

  // Admin endpoints
  async getPendingUsers(): Promise<{ users: User[] }> {
    return this.request('/admin/pending-users');
  },

  async getUsers(params?: { 
    status?: string; 
    page?: number; 
    limit?: number 
  }): Promise<UsersResponse> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    return this.request(`/admin/users?${queryParams}`);
  },

  async approveUser(userId: number, reason?: string): Promise<{ message: string }> {
    return this.request(`/admin/users/${userId}/approve`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },

  async rejectUser(userId: number, reason?: string): Promise<{ message: string }> {
    return this.request(`/admin/users/${userId}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },

  async suspendUser(userId: number, reason?: string): Promise<{ message: string }> {
    return this.request(`/admin/users/${userId}/suspend`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },

  async getUserHistory(userId: number): Promise<{ history: unknown[] }> {
    return this.request(`/admin/users/${userId}/history`);
  },

  // Public endpoints
  async getSubscriptionPlans(): Promise<{ plans: SubscriptionPlan[] }> {
    return this.request('/subscription-plans');
  },

  async getHealth(): Promise<{ status: string; timestamp: string }> {
    return this.request('/health');
  },

  // Supabase direct integration (optional - for client-side operations)
  async supabaseQuery(table: string, queryParams?: RequestInit): Promise<unknown> {
    // This would be used if you want to call Supabase directly from the client
    // Requires proper RLS (Row Level Security) setup in Supabase
    console.warn('Direct Supabase queries should only be used for public data or with proper RLS');
    
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase environment variables not configured');
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
      ...queryParams,
    });

    if (!response.ok) {
      throw new Error(`Supabase query failed: ${response.status}`);
    }

    return response.json();
  }
};

// Create a custom hook for API calls
export const useApi = () => {
  return api;
};

// Utility function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('authToken');
  if (!token) return false;

  try {
    // Simple check for token expiration (you might want to use a JWT library for proper validation)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

// Utility function to get current user
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Utility function to get current admin
export const getCurrentAdmin = (): Admin | null => {
  const adminStr = localStorage.getItem('admin');
  if (!adminStr) return null;
  
  try {
    return JSON.parse(adminStr);
  } catch {
    return null;
  }
};

// Utility function to check if user is admin
export const isAdmin = (): boolean => {
  return getCurrentAdmin() !== null;
};

// Utility function to check if user is approved
export const isUserApproved = (): boolean => {
  const user = getCurrentUser();
  return user?.status === 'approved';
};

// API error handler utility
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};
