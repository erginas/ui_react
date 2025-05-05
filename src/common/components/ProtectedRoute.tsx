// src/common/components/ProtectedRoute.tsx
import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {isAuthenticated, loading} = useAuth();

    if (loading) return <div className="p-6">Yükleniyor...</div>;
    if (!isAuthenticated) return <Navigate to="/login" replace/>;

    return <>{children}</>;
};
