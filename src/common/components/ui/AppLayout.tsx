// src/common/components/AppLayout.tsx
import React, { ReactNode, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X as CloseIcon, ChevronUp } from 'lucide-react';
import { Disclosure } from '@headlessui/react';
import { SidebarMenu } from './SidebarMenu';
import { useTheme } from '../../../theme';

interface AppLayoutProps {
  title: string;
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  const { colors } = useTheme();

  return (
    <div className="flex h-screen">
      {/* Sidebar + Burger */}
      <div className="flex flex-col">
        <button
          onClick={() => setOpen(prev => !prev)}
          className="md:hidden p-2 m-2 rounded-md bg-gray-100"
        >
          {open ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
        <aside
          className={`fixed top-0 left-0 h-full bg-white border-r p-4 transform transition-transform
            ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex md:w-64`}
          style={{ backgroundColor: colors.surface }}
        >
          <SidebarMenu />
        </aside>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Topbar */}
        <header className="h-16 flex items-center px-6 bg-white border-b">
          <h1 className="text-lg font-semibold">{title}</h1>
        </header>

        {/* Content Area */}
        <main className="p-6 overflow-auto flex-1 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};