// src/common/components/AppLayout.tsx
import React, {ReactNode, useState} from 'react';
import {Menu as MenuIcon, X as CloseIcon} from 'lucide-react';
import {SidebarMenu} from './SidebarMenu';
import {useTheme} from '../../../theme';
import {Footer} from './Footer';
import {useLocation} from "react-router-dom";

interface AppLayoutProps {
    title?: string;
    children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({children}) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const {colors} = useTheme();
    const location = useLocation();

    // Dinamik başlık belirleme
    const path = location.pathname.split('/')[1];
    const titleMap: Record<string, string> = {
        user: 'Kullanıcı Yönetimi',
        product: 'Ürün Yönetimi',
    };
    const title = titleMap[path] || 'Ana Sayfa';

    return (
        <div className="flex flex-col min-h-screen">
            {/* Topbar - Tam genişlikte ve sabit */}
            <header
                className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                    >
                        {sidebarOpen ? <CloseIcon size={20}/> : <MenuIcon size={20}/>}
                    </button>
                    <h1 className="text-xl font-semibold">{title}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Logo" className="h-8"/>
                    <span className="text-sm text-gray-600">
            {import.meta.env.VITE_COMPANY_NAME || 'Şirket Adı'}
          </span>
                </div>
            </header>

            {/* Ana İçerik Alanı */}
            <div className="flex flex-1 mt-16 overflow-hidden">
                {/* Sidebar - Topbar'ın altında başlar */}
                <aside
                    className={`bg-white border-r transition-all duration-300 ease-in-out ${
                        sidebarOpen ? 'w-64' : 'w-0'
                    } overflow-y-auto`}
                    style={{backgroundColor: colors.surface}}
                >
                    {sidebarOpen && <SidebarMenu/>}
                </aside>

                {/* Main Content */}
                <div className="flex flex-col flex-1 overflow-auto">
                    <main
                        className="flex-1 p-6 bg-background"
                        style={{backgroundColor: colors.background}}
                    >
                        {children}
                    </main>
                    <Footer/>
                </div>
            </div>
        </div>
    );
};