import React from 'react';

export const Sidebar: React.FC = ({ children }) => (
  <aside className="w-64 bg-white border-r p-4">{children}</aside>
);

export const Topbar: React.FC<{ title: string }> = ({ title }) => (
  <header className="h-16 flex items-center px-6 bg-white border-b">
    <h1 className="text-lg font-semibold">{title}</h1>
  </header>
);
