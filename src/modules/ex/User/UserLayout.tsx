// src/modules/User/UserLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, Topbar } from '../../../common/components/ui/Layout';

const UserLayout: React.FC = () => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Topbar title="Kullanıcı Yönetimi" />
      <main className="p-6 flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  </div>
);

export default UserLayout;