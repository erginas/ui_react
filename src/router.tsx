// src/router.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './common/components/ProtectedRoute';
import {LoginPage} from './modules/auth/pages/LoginPage';
import {NotFound} from './common/pages/NotFound';

const UserRoutes    = lazy(() => import('./modules/User/router'));
const ProductRoutes = lazy(() => import('./modules/ex/Product/router'));
const KisiRoutes    = lazy(() => import('./modules/ex/Kisiler/router'));

const AppRouter: React.FC = () => (
  // <BrowserRouter>
    <Suspense fallback={<div>Yükleniyor…</div>}>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Root: korumalı, giriş yoksa login */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/user/dashboard" replace />
            </ProtectedRoute>
          }
        />

        {/* Modül rotaları */}
        <Route
          path="/user/*"
          element={
            <ProtectedRoute>
              <UserRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/*"
          element={
            <ProtectedRoute>
              <ProductRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kisi/*"
          element={
            <ProtectedRoute>
              <KisiRoutes />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  // </BrowserRouter>
);

export default AppRouter;