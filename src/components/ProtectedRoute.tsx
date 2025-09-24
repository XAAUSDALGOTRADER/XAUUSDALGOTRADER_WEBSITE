import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireApproval?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false, 
  requireApproval = false 
}) => {
  const { user, admin, isLoading, isAuthenticated, isAdmin, isUserApproved } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (requireApproval && user && user.status !== 'approved') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Account Pending Approval</h2>
          <p className="text-muted-foreground">
            Your account is waiting for admin approval. Please check back later.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Status: {user.status?.charAt(0).toUpperCase() + user.status?.slice(1)}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;