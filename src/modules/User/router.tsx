// src/modules/User/router.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Dashboard = lazy(() => import('./pages/Dashboard').then(module => ({ default: module.UserDashboard })));
const Settings  = lazy(() => import('./pages/Settings').then(module => ({ default: module.default })));

const UserRoutes: React.FC = () => (
  <Suspense fallback={<div>Yükleniyor…</div>}>
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="settings" element={<Settings />} />
    </Routes>
  </Suspense>
);

export default UserRoutes;