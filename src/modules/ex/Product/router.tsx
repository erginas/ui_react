// src/modules/Product/router.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Inventory = lazy(() => import('./pages/Inventory'));

const ProductRoutes: React.FC = () => (
  <Suspense fallback={<div>Yükleniyor…</div>}>
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="inventory" element={<Inventory />} />
    </Routes>
  </Suspense>
);

export default ProductRoutes;