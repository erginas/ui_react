// src/common/components/SidebarMenu.tsx
import React, { useState, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { ChevronUp } from 'lucide-react';
import { useTheme } from '../../../theme';

interface MenuItem { label: string; to: string; }
interface ModuleItem { label: string; to: string; children: MenuItem[]; }

const modules: ModuleItem[] = [
  {
    label: 'Kullanıcı',
    to: '/user',
    children: [
      { label: 'Dashboard', to: '/user/dashboard' },
      { label: 'Ayarlar', to: '/user/settings' },
    ],
  },
  {
    label: 'Ürün',
    to: '/product',
    children: [
      { label: 'Dashboard', to: '/product/dashboard' },
      { label: 'Stok', to: '/product/inventory' },
    ],
  },
  // ... diğer modüller
];

export const SidebarMenu: React.FC = () => {
  const location = useLocation();
  const { colors } = useTheme();
  const [query, setQuery] = useState('');

  // Arama filtreleme
  const filtered = useMemo(() => {
    if (!query) return modules;
    const q = query.toLowerCase();
    return modules
      .map(mod => ({
        ...mod,
        children: mod.children.filter(c => c.label.toLowerCase().includes(q)),
      }))
      .filter(mod => mod.label.toLowerCase().includes(q) || mod.children.length);
  }, [query]);

  return (
    <div className="space-y-4">
      {/* Arama Kutusu */}
      <input
        type="text"
        placeholder="Menü ara..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none"
        style={{ borderColor: colors.muted }}
      />

      {/* Accordion Bölümler */}
      {filtered.map(mod => (
        <Disclosure key={mod.to} defaultOpen={location.pathname.startsWith(mod.to)}>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between items-center w-full px-4 py-2 font-medium rounded-md \$
                  ${open ? 'bg-primary text-white' : 'text-text hover:bg-muted'}`}
              >
                {mod.label}
                <ChevronUp className={`${open ? 'rotate-180' : ''} transition-transform`} />
              </Disclosure.Button>

              <Disclosure.Panel className="pl-6 pt-2 space-y-1">
                {mod.children.map(child => (
                  <NavLink
                    key={child.to}
                    to={child.to}
                    className={({ isActive }) =>
                      `block px-2 py-1 rounded-md \$
                        ${isActive ? 'bg-secondary text-white' : 'text-text hover:bg-muted'}`
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