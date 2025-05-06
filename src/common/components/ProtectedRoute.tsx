// src/common/components/ProtectedRoute.tsx
import {Navigate, useLocation} from 'react-router-dom';
import {ReactNode} from 'react';
import {useAuth} from "../hooks/useAuth.tsx";

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: string[];
}

export const ProtectedRoute = ({children, allowedRoles}: ProtectedRouteProps) => {
    const {user} = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace/>;
    }

    return <>{children}</>;
};
