// src/modules/User/AuthLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppLayout } from '../../common/components/ui/AppLayout.tsx';

const AuthLayout: React.FC = () => (
  <AppLayout title="Auth Layout">
    <Outlet />
  </AppLayout>
);

export default AuthLayout;