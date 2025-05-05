// src/common/components/ui/UserDropdown.tsx
import React from 'react';
import {Menu} from '@headlessui/react';
import {ChevronDown, LogOut} from 'lucide-react';
import {useAuth} from '../../hooks/useAuth';
import {useNavigate} from 'react-router-dom';

export const UserDropdown: React.FC = () => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition">
                <span className="font-medium text-sm">{user?.name || 'Kullanıcı'}</span>
                <ChevronDown size={16}/>
            </Menu.Button>

            <Menu.Items
                className="absolute right-0 z-50 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none">
                {/* Profil (isteğe bağlı) */}
                {/* <Menu.Item>
          {({ active }) => (
            <a
              href="/profile"
              className={`block px-4 py-2 text-sm ${active ? 'bg-muted' : ''}`}
            >
              Profil
            </a>
          )}
        </Menu.Item> */}

                {/* Logout */}
                <Menu.Item>
                    {({active}) => (
                        <button
                            onClick={handleLogout}
                            className={`w-full text-left px-4 py-2 text-sm text-red-600 ${active ? 'bg-muted' : ''}`}
                        >
                            <LogOut size={16} className="inline-block mr-2"/>
                            Çıkış Yap
                        </button>
                    )}
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
};
