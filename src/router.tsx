// src/router.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const UserRoutes = lazy(() => import('@/modules/ex/User/router'));
const ProductRoutes = lazy(() => import('@/modules/ex/Product/router'));

export const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Yükleniyor…</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/user" replace />} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/product/*" element={<ProductRoutes />} />
        {/* Diğer modüller */}
      </Routes>
    </Suspense>
  </BrowserRouter>
);
