import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import React from 'react';

export function RequireAuth({ children }: { children: React.ReactElement }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="text-center p-4">Loading Auth...</div>;
    }

    if (!user) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return children;
}
