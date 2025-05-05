// src/common/config/menuConfig.ts
import {LucideIcon, Package, User, Users} from 'lucide-react'; // ikonlar

export interface MenuItem {
    label: string;
    to: string;
    roles?: string[];
}

export interface ModuleItem {
    label: string;
    to: string;
    roles?: string[];
    icon: LucideIcon; // yeni!
    children: MenuItem[];
}

export const menuConfig: ModuleItem[] = [
    {
        label: 'Kullanıcı',
        to: '/user',
        // roles: ['admin', 'editor'],
        icon: User,
        children: [
            {label: 'Dashboard', to: '/user/dashboard', roles: ['admin', 'editor']},
            {label: 'Ayarlar', to: '/user/settings', roles: ['admin']},
        ],
    },
    {
        label: 'Ürün',
        to: '/product',
        // roles: ['editor'],
        icon: Package,
        children: [
            {label: 'Dashboard', to: '/product/dashboard', roles: ['editor']},
            {label: 'Stok', to: '/product/inventory', roles: ['editor']},
        ],
    },
    {
        label: 'Kişiler',
        to: '/kisi',
        icon: Users,
        children: [
            {label: 'Dashboard', to: '/kisi/dashboard'},
        ],
    },
];
