// src/modules/User/pages/Dashboard.tsx
import React from 'react';
import { UserProfileCard } from '../components/UserProfileCard.tsx';
import { User } from '../types.ts';

const mockUser: User = { id: '1', name: 'Örnek Kullanıcı', email: 'user@example.com' };

// Yalnızca içerik render edilir, Layout içindeki <Sidebar> ve <Topbar> kaldırıldı.
const UserDashboard: React.FC = () => (
  <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
    <UserProfileCard user={mockUser} />
  </div>
);

export default UserDashboard;