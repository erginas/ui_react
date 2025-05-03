// src/router.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
const UserLayout = lazy(() => import('../src/modules/User/UserLayout'));
const ProductLayout = lazy(() => import('../src/modules/ex/Product/ProductLayout'));

// Pages for nested routes
const UserDashboard = lazy(() => import('../src/modules/User/pages/Dashboard'));
const UserSettings  = lazy(() => import('../src/modules/User/pages/Settings'));
const ProductDashboard = lazy(() => import('../src/modules/ex/Product/pages/Dashboard'));
const ProductInventory = lazy(() => import('../src/modules/ex/Product/pages/Inventory'));

export const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Yükleniyor…</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/user" replace />} />

        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>

        <Route path="/product" element={<ProductLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ProductDashboard />} />
          <Route path="inventory" element={<ProductInventory />} />
        </Route>

        <Route path="*" element={<Navigate to="/user" replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);