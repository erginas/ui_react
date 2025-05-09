// src/common/components/CollapsibleSection.tsx

import React, {useEffect, useState} from 'react';
import {useAuth} from "../../hooks/useAuth.tsx";

interface CollapsibleSectionProps {
    title: string;
    children: React.ReactNode;
    storageKey: string; // Örnek: "dashboard_birimler"
    initiallyOpen?: boolean; // default false
}

export default function CollapsibleSection({
                                               title,
                                               children,
                                               storageKey,
                                               initiallyOpen = false,
                                           }: CollapsibleSectionProps) {
    const [isOpen, setIsOpen] = useState<boolean>(initiallyOpen);

    // Dinamik userKey oluştur (kullanıcıya özel)
    const {user} = useAuth(); // Auth bilgisi al
    const userKey = `${storageKey}_open_user_${user?.id || 'guest'}`;

    // localStorage’dan durumu yükle
    useEffect(() => {
        const savedState = localStorage.getItem(userKey);
        if (savedState !== null) {
            setIsOpen(savedState === 'true');
        } else {
            setIsOpen(initiallyOpen); // false
        }
    }, [userKey]);

    // isOpen değiştiğinde localStorage’a yaz
    useEffect(() => {
        localStorage.setItem(userKey, String(isOpen));
    }, [isOpen, userKey]);

    return (
        <section className="mb-6">
            <div
                className="flex justify-between items-center mb-3 pb-2 border-b cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(prev => !prev)}
            >
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </div>

            {/* isOpen ise göster */}
            {isOpen && <div>{children}</div>}
        </section>
    );
}