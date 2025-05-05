// src/modules/Auth/router.tsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy-loaded pages
const LoginPage = lazy(() =>
    import('./pages/LoginPage').then(m => ({default: m.LoginPage}))
);

const AuthRoutes: React.FC = () => (
  <Suspense fallback={<div>Yükleniyor…</div>}>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </Suspense>
);

export default AuthRoutes;