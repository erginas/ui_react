// src/modules/User/pages/Dashboard.tsx
import React from 'react';
import {useKisi} from '../hooks/useKisi';
import {KisiProfileCard} from '../components/KisiProfileCard';

export const KisiDashboard: React.FC = () => {
    const {data: kisiler, isLoading, error} = useKisi();

    if (isLoading) return <div>Yükleniyor…</div>;
    if (error) return <div>Hata oluştu</div>;
    console.log("kisiler", kisiler)
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kisiler && kisiler.length > 0 ? (
                kisiler.map(kisi => <KisiProfileCard key={kisi.kimlik_no} kisi={kisi}/>)
            ) : (
                <div>Veri bulunamadı</div>
            )}
        </div>

    );
};

export default KisiDashboard