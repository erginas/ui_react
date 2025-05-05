// src/modules/Kisiler/router.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Dashboard = lazy(() => import('./pages/Dashboard').then(module => ({ default: module.KisiDashboard })));

const KisiRoutes: React.FC = () => (
  <Suspense fallback={<div>Yükleniyor…</div>}>
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  </Suspense>
);

export default KisiRoutes;