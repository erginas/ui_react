// src/App.tsx
import React from 'react';
import { ThemeContext, tokens } from './theme';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../src/common/components/ui/AppLayout';
import { lazy, Suspense } from 'react';
import {AuthProvider} from "./common/hooks/useAuth.tsx";


// Page components
const UserDashboard = lazy(() => import('./modules/User/pages/Dashboard'));
const UserSettings  = lazy(() => import('./modules/User/pages/Settings'));
const ProductDashboard  = lazy(() => import('../src/modules/ex/Product/pages/Dashboard'));
const ProductInventory  = lazy(() => import('../src/modules/ex/Product/pages/Inventory'));

const App: React.FC = () => (
  <ThemeContext.Provider value={tokens}>
      <AuthProvider>
    <BrowserRouter>
      <AppLayout title="Uygulama Başlığı">
        <Suspense fallback={<div>Yükleniyor…</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/user/dashboard" replace />} />

            <Route path="user">
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="settings" element={<UserSettings />} />
            </Route>

            <Route path="product">
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<ProductDashboard />} />
              <Route path="inventory" element={<ProductInventory />} />
            </Route>

            <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
          </AuthProvider>
  </ThemeContext.Provider>
);

export default App;