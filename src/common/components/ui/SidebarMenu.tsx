import React, {useMemo, useState} from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {Disclosure} from '@headlessui/react';
import {ChevronUp} from 'lucide-react';
import {menuConfig} from '../../config/menuConfig';
import {useAuth} from '../../hooks/useAuth';

export const SidebarMenu: React.FC = () => {
    const location = useLocation();
    const [query, setQuery] = useState('');
    const {user} = useAuth();

    const filtered = useMemo(() => {
        const role = user?.role || 'guest';

        const visibleModules = menuConfig
            .filter(mod => !mod.roles || mod.roles.includes(role))
            .map(mod => ({
                ...mod,
                children: mod.children.filter(
                    c => !c.roles || c.roles.includes(role)
                ),
            }))
            .filter(mod => mod.children.length > 0);

        if (!query) return visibleModules;

        const q = query.toLowerCase();
        return visibleModules
            .map(mod => ({
                ...mod,
                children: mod.children.filter(c => c.label.toLowerCase().includes(q)),
            }))
            .filter(mod => mod.label.toLowerCase().includes(q) || mod.children.length);
    }, [query, user]);

    return (
        <div className="space-y-4 p-4">
            <input
                type="text"
                placeholder="Menü ara..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full px-3 py-2 border border-muted rounded-md focus:outline-none"
            />

            {filtered.map(mod => (
                <Disclosure key={mod.to} defaultOpen={location.pathname.startsWith(mod.to)}>
                    {({open}) => (
                        <div>
                            <Disclosure.Button
                                className={`flex justify-between items-center w-full px-4 py-2 font-medium rounded-md ${
                                    open ? 'bg-primary text-white' : 'text-text hover:bg-muted'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <mod.icon size={18}/>
                                    {mod.label}
                                </div>
                                <ChevronUp className={`${open ? 'rotate-180' : ''} transition-transform`}/>
                            </Disclosure.Button>

                            <Disclosure.Panel className="pl-6 pt-2 space-y-1">
                                {mod.children.map(child => (
                                    <NavLink
                                        key={child.to}
                                        to={child.to}
                                        className={({isActive}) =>
                                            `block px-2 py-1 rounded-md ${
                                                isActive ? 'bg-secondary text-white' : 'text-text hover:bg-muted'
                                            }`
                                        }
                                    >
                                        {child.label}
                                    </NavLink>
                                ))}
                            </Disclosure.Panel>
                        </div>
                    )}
                </Disclosure>
            ))}
        </div>
    );
};
