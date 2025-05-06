// src/common/components/SidebarMenu.tsx
import {useMemo} from 'react';
import {useAuth} from '../../hooks/useAuth';
import {useMenu} from '../../hooks/useMenu';
import {SidebarSection} from './SidebarSection';

export const SidebarMenu = () => {
    const {user} = useAuth();
    const role = user?.role?.toLowerCase() || 'guest';
    const {data: menuItems, isLoading, isError} = useMenu(role);

    const filteredMenu = useMemo(() => {
        if (!Array.isArray(menuItems)) return [];

        return menuItems
            .filter(item => item.parent_id === null)
            .map(parent => ({
                ...parent,
                children: menuItems.filter(child => child.parent_id === parent.id),
            }));
    }, [menuItems]);

    if (isLoading) return <div className="p-4 text-sm text-gray-500">Yükleniyor...</div>;
    if (isError) return <div className="p-4 text-sm text-red-500">Menü yüklenemedi.</div>;
    if (filteredMenu.length === 0) return <div className="p-4 text-sm text-gray-400">Menü bulunamadı.</div>;

    return (
        <nav className="flex flex-col gap-2 p-4 text-sm">
            {filteredMenu.map(mod => (
                <SidebarSection key={mod.id} item={mod}/>
            ))}
        </nav>
    );
};
