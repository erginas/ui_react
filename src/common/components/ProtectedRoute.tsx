// src/common/components/ProtectedRoute.tsx
import React, {JSX} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {useAuth} from "../hooks/useAuth.tsx";

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Giriş yoksa login sayfasına, geri geliş için state ile
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
