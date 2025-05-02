// src/modules/User/pages/Settings.tsx
import React from 'react';
import { Sidebar, Topbar } from '@/common/components/Layout';
import { Card } from '@/common/components/Card';

export const Settings: React.FC = () => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Topbar title="Kullanıcı Ayarları" />
      <main className="p-6">
        <Card title="Genel Ayarlar">
          {/* Ayar formları burada yer alacak */}
        </Card>
      </main>
    </div>
  </div>
);

export default Settings;
