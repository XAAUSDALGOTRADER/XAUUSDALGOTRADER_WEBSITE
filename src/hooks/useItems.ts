import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

// If you want to fetch users (admin functionality)
export const useUsers = (params?: { status?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => api.getUsers(params),
    enabled: true, // Only enable if user is admin
  });
};

// If you want to fetch subscription plans
export const useSubscriptionPlans = () => {
  return useQuery({
    queryKey: ['subscription-plans'],
    queryFn: () => api.getSubscriptionPlans(),
  });
};

// If you want to fetch user subscriptions
export const useUserSubscriptions = () => {
  return useQuery({
    queryKey: ['user-subscriptions'],
    queryFn: () => api.getSubscriptions(),
    enabled: true, // Only enable if user is authenticated
  });
};

// If you want to fetch pending users (admin only)
export const usePendingUsers = () => {
  return useQuery({
    queryKey: ['pending-users'],
    queryFn: () => api.getPendingUsers(),
    enabled: true, // Only enable if user is admin
  });
};

// Example mutation for creating a subscription
export const useCreateSubscription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { planId: number; paymentMethod: string }) => 
      api.createSubscription(data.planId, data.paymentMethod),
    onSuccess: () => {
      // Invalidate and refetch subscriptions after successful creation
      queryClient.invalidateQueries({ queryKey: ['user-subscriptions'] });
    },
  });
};

// Example mutation for approving a user (admin only)
export const useApproveUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { userId: number; reason?: string }) => 
      api.approveUser(data.userId, data.reason),
    onSuccess: () => {
      // Invalidate and refetch users after approval
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['pending-users'] });
    },
  });
};

// Example mutation for rejecting a user (admin only)
export const useRejectUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { userId: number; reason?: string }) => 
      api.rejectUser(data.userId, data.reason),
    onSuccess: () => {
      // Invalidate and refetch users after rejection
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['pending-users'] });
    },
  });
};