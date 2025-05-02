// src/common/components/SidebarMenu.tsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../../theme';

interface MenuItem { label: string; to: string; }
interface ModuleItem { label: string; to: string; children: MenuItem[]; }

const modules: ModuleItem[] = [
  {
    label: 'Kullanıcı',
    to: '/user',
    children: [
      { label: 'Dashboard', to: '/user/dashboard' },
      { label: 'Ayarlar', to: '/user/settings' },
    ],
  },
  {
    label: 'Ürün',
    to: '/product',
    children: [
      { label: 'Dashboard', to: '/product/dashboard' },
      { label: 'Stok',     to: '/product/inventory' },
    ],
  },
];

export const SidebarMenu: React.FC = () => {
  const { colors } = useTheme();
  const location = useLocation();
  const current = modules.find(m => location.pathname.startsWith(m.to)) || modules[0];

  return (
    <nav className="flex flex-col space-y-2">
      {modules.map(m => (
        <NavLink
          key={m.to}
          to={m.to}
          end
          className={({ isActive }) =>
            `px-4 py-2 rounded-md block ${isActive ? 'bg-primary text-white' : 'text-text hover:bg-muted'}`
          }
        >
          {m.label}
        </NavLink>
      ))}
      <div className="mt-4 border-t pt-2">
        {current.children.map(child => (
          <NavLink
            key={child.to}
            to={child.to}
            className={({ isActive }) =>
              `px-6 py-1 block rounded-md ${isActive ? 'bg-secondary text-white' : 'text-text hover:bg-muted'}`
            }
          >
            {child.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};