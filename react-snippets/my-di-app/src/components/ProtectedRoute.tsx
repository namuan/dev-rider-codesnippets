import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from '../hooks/useAuth';

interface ProtectedRouteProps {
    // You can add more props if needed, e.g., roles: string[]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
    const { isAuthenticated, isLoading } = useAuthState();

    if (isLoading) {
        // You might want to show a global loading spinner here
        return <div>Loading authentication status...</div>;
    }

    if (!isAuthenticated) {
        // User not authenticated, redirect to login page
        // You can pass the current location to redirect back after login
        // e.g., <Navigate to="/login" state={{ from: location }} replace />
        return <Navigate to="/login" replace />;
    }

    // User is authenticated, render the child route content
    return <Outlet />;
};

export default ProtectedRoute;