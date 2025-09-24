import { useToast } from './use-toast';

export const useApi = () => {
  const { toast } = useToast();

  const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const API_BASE_URL = import.meta.env.MODE === 'development' 
      ? '/api' 
      : `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'}`;

    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };

  const handleApiError = (error: unknown, defaultMessage = 'An error occurred') => {
    const message = error instanceof Error ? error.message : defaultMessage;
    toast({
      title: 'Error',
      description: message,
      variant: 'destructive',
    });
  };

  const handleApiSuccess = (message: string) => {
    toast({
      title: 'Success',
      description: message,
    });
  };

  return {
    request,
    handleApiError,
    handleApiSuccess,
  };
};