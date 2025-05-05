// src/common/components/ui/DropdownMenu.tsx
import React, { Fragment, ReactNode } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

interface DropdownMenuProps {
  children: ReactNode;
}

interface DropdownMenuTriggerProps {
  children: ReactNode;
}

interface DropdownMenuContentProps {
  children: ReactNode;
}

interface DropdownMenuItemProps {
  children: ReactNode;
  onSelect?: () => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => (
  <Menu as="div" className="relative inline-block text-left">
    {children}
  </Menu>
);

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps & { asChild?: boolean }> = ({ children, asChild = false }) => (
  <Menu.Button
    as={asChild ? Fragment : 'button'}
    className="inline-flex items-center px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition"
  >
    {children}
    <ChevronDown className="ml-1 h-4 w-4" />
  </Menu.Button>
);

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ children }) => (
  <Transition
    as={Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg focus:outline-none">
      {children}
    </Menu.Items>
  </Transition>
);

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ children, onSelect }) => (
  <Menu.Item>
    {({ active }) => (
      <button
        onClick={onSelect}
        className={`${
          active ? 'bg-gray-100' : ''
        } block w-full text-left px-4 py-2 text-sm"`}
      >
        {children}
      </button>
    )}
  </Menu.Item>
);