// src/modules/User/pages/Dashboard.tsx
import React from 'react';
import { Sidebar, Topbar } from '@/common/components/Layout';
import { UserProfileCard } from '../components/UserProfileCard';

const mockUser = { id: '1', name: 'Ergin As', email: 'ergin@example.com' };

export const Dashboard: React.FC = () => (
  <div className="flex h-screen">
    <Sidebar>
      {/* Buraya modül menü öğeleri gelecek */}
    </Sidebar>
    <div className="flex-1 flex flex-col">
      <Topbar title="Kullanıcı Yönetimi" />
      <main className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2">
        <UserProfileCard user={mockUser} />
        {/* İleride buraya başka Cards ekleyebiliriz */}
      </main>
    </div>
  </div>
);

export default Dashboard;
