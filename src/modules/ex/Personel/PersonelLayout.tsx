// src/modules/ex/Personel/components/PersonelLayout.tsx

import { Outlet } from 'react-router-dom';

export default function PersonelLayout() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Personel Modülü</h1>
            <Outlet />
        </div>
    );
}