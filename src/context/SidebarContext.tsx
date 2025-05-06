// src/context/SidebarContext.tsx
import {createContext, useContext, useState} from 'react';

const SidebarContext = createContext({
    isOpen: true,
    toggle: () => {
    },
});

export const SidebarProvider = ({children}: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <SidebarContext.Provider value={{isOpen, toggle}}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
