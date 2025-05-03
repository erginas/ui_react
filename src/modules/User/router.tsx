// src/modules/User/router.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Dashboard = lazy(() => import('./pages/Dashboard.tsx'));
const Settings  = lazy(() => import('./pages/Settings.tsx'));

const UserRoutes: React.FC = () => (
  <Suspense fallback={<div>Yükleniyor…</div>}>
    <Routes>
      <Route path="/user" element={<Navigate to="dashboard" replace />} />
      <Route path="/user/dashboard" element={<Dashboard />} />
      <Route path="/user/settings" element={<Settings />} />
    </Routes>
  </Suspense>
);

export default UserRoutes;