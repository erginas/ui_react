// src/common/components/BaseLayout.tsx
import React, {ReactNode, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Menu as MenuIcon, X as CloseIcon} from 'lucide-react';
import {SidebarMenu} from './ui/SidebarMenu';
import {Footer} from './ui/Footer';
import {useTheme} from '../../theme';
import {UserDropdown} from './ui/UserDropdown';

interface BaseLayoutProps {
    children: ReactNode;
    withFooter?: boolean;
    customTitle?: string;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({children, withFooter = true, customTitle}) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const {colors} = useTheme();
    const {pathname} = useLocation();

    // route'a göre başlık
    const section = pathname.split('/')[1] || '';
    const titles: Record<string, string> = {
        user: 'Kullanıcı Yönetimi',
        product: 'Ürün Yönetimi',
        kisi: 'Kişi Yönetimi',
    };
    const title = customTitle || titles[section] || 'Ana Sayfa';

    return (
        <div className="flex flex-col min-h-screen">
            {/* Topbar */}
            <header
                className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b flex items-center justify-between px-6">
                {/* Sol: Menü butonu ve başlık */}
                <div className="flex items-center gap-3">
                    <button onClick={() => setSidebarOpen(o => !o)} className="p-1 rounded hover:bg-gray-100">
                        {sidebarOpen ? <CloseIcon size={20}/> : <MenuIcon size={20}/>}
                    </button>
                    <h1 className="text-xl font-semibold">{title}</h1>
                </div>

                {/* Sağ: Kullanıcı menüsü */}
                <div className="flex items-center gap-3">
                    <UserDropdown/>
                </div>
            </header>

            {/* Sidebar + İçerik */}
            <div className="flex flex-1 mt-16 overflow-hidden">
                {/* Sidebar */}
                <aside
                    className={`bg-white border-r transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-0'} overflow-auto`}
                    style={{backgroundColor: colors.surface}}
                >
                    {sidebarOpen && <SidebarMenu/>}
                </aside>

                {/* Ana içerik */}
                <div className="flex flex-col flex-1 overflow-auto">
                    <main className="flex-1 p-6" style={{backgroundColor: colors.background}}>
                        {children}
                    </main>
                    {withFooter && <Footer/>}
                </div>
            </div>
        </div>
    );
};
