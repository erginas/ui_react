// src/common/components/Layout.tsx
import React, { useState } from 'react';
import { SidebarMenu } from './SidebarMenu';
import { Menu as MenuIcon, X as CloseIcon } from 'lucide-react';

export const Sidebar: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex">
      {/* Burger Butonu */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="md:hidden p-2 m-2 rounded-md bg-gray-100"
      >
        {open ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r p-4 transform transition-transform
          ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex md:w-64`}
      >
        <SidebarMenu />
      </aside>

      {/* Ana İçerik */}
      <div className="flex-1 ml-0 md:ml-64">
        {children}
      </div>
    </div>
  );
};
export const Topbar: React.FC<{ title: string }> = ({ title }) => (
  <header className="h-16 flex items-center px-6 bg-white border-b">
    <h1 className="text-lg font-semibold">{title}</h1>
  </header>
);