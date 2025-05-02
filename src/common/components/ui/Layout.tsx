// src/common/components/Layout.tsx
import React from 'react';
import { SidebarMenu } from './SidebarMenu';

export const Sidebar: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <aside className="w-64 bg-white border-r p-4 flex flex-col">
    <SidebarMenu />
    <div className="mt-4 flex-1 overflow-auto">
      {children}
    </div>
  </aside>
);

export const Topbar: React.FC<{ title: string }> = ({ title }) => (
  <header className="h-16 flex items-center px-6 bg-white border-b">
    <h1 className="text-lg font-semibold">{title}</h1>
  </header>
);