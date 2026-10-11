
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: Array<'user' | 'admin'>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="text-xl font-semibold">Loading...</div></div>;
  }

  if (!currentUser) {
    const redirectTo = allowedRoles.includes('admin') ? '/admin/login' : '/login';
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
     const redirectTo = currentUser.role === 'admin' ? '/admin/dashboard' : '/dashboard';
     return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;
