// src/common/components/AppLayout.tsx
import React, { ReactNode, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
import { SidebarMenu } from './SidebarMenu';
import { Footer } from './Footer';
import {useTheme} from "../../../theme.ts";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(true);
  const { colors } = useTheme();
  const { pathname } = useLocation();

  // hangi modül altındayız?
  const section = pathname.split('/')[1] || '';
  const titles: Record<string,string> = {
    user:     'Kullanıcı Yönetimi',
    product:  'Ürün Yönetimi',
  };
  const title = titles[section] || 'Ana Sayfa';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setOpen(o => !o)} className="p-1 rounded hover:bg-gray-100">
            {open ? <CloseIcon size={20}/> : <MenuIcon size={20}/>}
          </button>
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-8"/>
          <span className="text-sm text-gray-600">{import.meta.env.VITE_COMPANY_NAME}</span>
        </div>
      </header>

      <div className="flex flex-1 mt-16 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r transition-all duration-300 ease-in-out ${open?'w-64':'w-0'} overflow-auto`}
          style={{ backgroundColor: colors.surface }}
        >
          {open && <SidebarMenu />}
        </aside>

        {/* Main + Footer */}
        <div className="flex flex-col flex-1 overflow-auto">
          <main className="flex-1 p-6 bg-background" style={{ backgroundColor: colors.background }}>
            {children}
          </main>
          <Footer/>
        </div>
      </div>
    </div>
  );
};
