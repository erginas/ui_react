import React from 'react';
import { useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import * as Icons from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useMenu } from '../../hooks/useMenu';

export const SidebarMenu: React.FC = () => {
  const { user } = useAuth();
  const { data: menuItems, isLoading } = useMenu(user?.role || 'guest');
  const location = useLocation();

  if (isLoading) return <div className="p-4 text-muted">Menü yükleniyor...</div>;
  if (!menuItems) return <div className="p-4 text-red-500">Menü alınamadı</div>;

  // Menüleri üst-alt olarak gruplandır
  const modules = menuItems
    .filter(m => m.parent_id === null)
    .map(mod => ({
      ...mod,
      children: menuItems.filter(child => child.parent_id === mod.id),
    }));

  return (
    <div className="space-y-4 p-4">
      {modules.map(mod => {
        const Icon = Icons[mod.icon_name as keyof typeof Icons] || Icons.Circle;

        return (
          <Disclosure key={mod.id} defaultOpen={location.pathname.startsWith(mod.to_path)}>
            {({ open }) => (
              <div>
                <Disclosure.Button
                  className={`flex items-center justify-between w-full px-4 py-2 font-medium rounded-md ${
                    open ? 'bg-primary text-white' : 'text-text hover:bg-muted'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={18} />
                    {mod.label}
                  </span>
                  <Icons.ChevronUp className={`${open ? 'rotate-180' : ''} transition-transform`} />
                </Disclosure.Button>

                <Disclosure.Panel className="pl-6 pt-2 space-y-1">
                  {mod.children.map(child => (
                    <a
                      key={child.id}
                      href={child.to_path}
                      className={`block px-2 py-1 rounded-md ${
                        location.pathname === child.to_path
                          ? 'bg-secondary text-white'
                          : 'text-text hover:bg-muted'
                      }`}
                    >
                      {child.label}
                    </a>
                  ))}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        );
      })}
    </div>
  );
};
