// src/common/components/BaseLayout.tsx
import React from 'react';
import {useSidebar} from '../../context/SidebarContext';
import {Menu as MenuIcon, X as CloseIcon} from 'lucide-react';
import {UserDropdown} from "./ui/UserDropdown.tsx";
import {SidebarMenu} from "./ui/SidebarMenu.tsx";
import {Footer} from "./ui/Footer.tsx";

interface BaseLayoutProps {
    children: React.ReactNode;
    withFooter?: boolean;
    customTitle?: string;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({
                                                          children,
                                                          withFooter = true,
                                                          customTitle,
                                                      }) => {
    const {isOpen, toggle} = useSidebar();
    const title = customTitle ?? 'MGP Uygulaması';

    return (
        <div className="flex flex-col min-h-screen">
            {/* Topbar */}
            <header
                className="fixed top-0 left-0 right-0 z-50 h-16 bg-white dark:bg-gray-900 border-b flex items-center justify-between px-6 shadow-sm">
                <div className="flex items-center gap-3">
                    <button onClick={toggle} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        {isOpen ? <CloseIcon size={20}/> : <MenuIcon size={20}/>}
                    </button>
                    <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h1>
                </div>

                <div className="flex items-center gap-3">
                    <UserDropdown/>
                </div>
            </header>

            <div className="flex flex-1 mt-16 overflow-hidden">
                {/* Sidebar */}
                <aside
                    className={`bg-white dark:bg-gray-900 shadow-md border-r transition-all duration-300 ease-in-out 
          ${isOpen ? 'w-64' : 'w-0'} overflow-hidden rounded-r-2xl`}
                >
                    {isOpen && <SidebarMenu/>}
                </aside>

                {/* Main content */}
                <div className="flex flex-col flex-1 overflow-auto bg-gray-50 dark:bg-gray-800">
                    <main className="flex-1 p-4">{children}</main>
                    {withFooter && <Footer/>}
                </div>
            </div>
        </div>
    );
};