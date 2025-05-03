// src/common/components/Layout.tsx
import React, { ReactNode, useState } from 'react';
import { Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
import { SidebarMenu } from './SidebarMenu';
import { useTheme } from '../../../theme';

interface LayoutProps {
  title: string;
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { colors } = useTheme();

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Topbar - Tam genişlikte, kesinlikle sabit */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="Logo" className="h-8" />
          <span className="text-sm text-gray-600">
            {import.meta.env.VITE_COMPANY_NAME || 'Tıpsan Tıbbı Aletler A.Ş.'}
          </span>
        </div>
      </header>

      {/* Ana İçerik Alanı - Topbar'ın altından başlayacak */}
      <div className="flex flex-1 overflow-hidden mt-16"> {/* mt-16 = h-16 (topbar yüksekliği) */}
        {/* Sidebar */}
        <aside
          className={`bg-white border-r transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'w-64' : 'w-0'
          } overflow-y-auto`}
          style={{ backgroundColor: colors.surface }}
        >
          {sidebarOpen && <SidebarMenu />}
        </aside>

        {/* Main Content */}
        <main
          className="flex-1 overflow-auto p-6 bg-gray-50"
          style={{ backgroundColor: colors.background }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};