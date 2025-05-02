// src/modules/User/router.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

const UserRouter: React.FC = () => (
  <Suspense fallback={<div>Yükleniyor…</div>}>
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="settings" element={<Settings />} />
    </Routes>
  </Suspense>
);

export default UserRouter;