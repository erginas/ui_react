// src/modules/personell/pages/Dashboard.tsx

import {useNavigate} from "react-router-dom";
import {useDashboard} from "../hooks/useDashboard";
import {Card} from "../../../common/components/ui/Card.tsx";
import CollapsibleSection from "../../../common/components/ui/CollapsibleSection.tsx";
import {useAuth} from "../../../common/hooks/useAuth.tsx";


export default function Dashboard() {
    const {data, isLoading} = useDashboard();
    const navigate = useNavigate();

    const {user} = useAuth();

    if (isLoading || !data) return <div>Yükleniyor...</div>;

    return (
        <div className="p-4 sm:p-6 space-y-6">
            {/* Ana Kartlar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <Card title="Toplam Personel" value={data.toplam_personel} color="bg-blue-100"/>
                <Card title="Aktif Personel" value={data.aktif_personel} color="bg-green-100"
                      onClick={() => navigate("/personell/aktif")}/>
                <Card title="Ayrılan Personel" value={data.ayrilan_personel} color="bg-red-100"
                      onClick={() => navigate("/personell/ayrilan")}/>
            </div>

            {/* Birimlere Göre Dağılım - LocalStorage Desteği */}
            <CollapsibleSection title="📁 Birimlere Göre Dağılım"
                                storageKey="dashboard_birimler"
                                initiallyOpen={false} // Varsayılan kapalı gelsin
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {Object.entries(data.birimler ?? {}).map(([birim, stats]) => (
                        <Card
                            key={birim}
                            title={birim}
                            value={
                                <>
                                    <span className="text-green-600 font-medium">Aktif: {stats.aktif}</span>{" "}
                                    <span className="text-red-500 font-medium">| Ayrılan: {stats.ayrilan}</span>
                                </>
                            }
                            color="bg-white"
                            onClick={() => navigate(`/personell/birim/${birim}`)}
                        />
                    ))}
                </div>
            </CollapsibleSection>

            {/* Doğum Günü Olanlar */}
            <CollapsibleSection
                title="🎂 Bugün Doğanlar"
                initiallyOpen={false}
                actionLabel="Tüm Doğum Günleri"
                storageKey="dashboard_dogum_gunu"
                onAction={() => navigate("/personell/dogum-gunu")}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {Array.isArray(data.dogum_gunu_olanlar) && data.dogum_gunu_olanlar.length > 0 ? (
                        data.dogum_gunu_olanlar.map((p) => (
                            <Card
                                key={p.id}
                                title={`${p.adi} ${p.soyadi}`}
                                value="🎉 İyi ki doğdun!"
                                color="bg-indigo-50"
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 py-4">
                            Bugün doğum günü olan yok.
                        </div>
                    )}
                </div>
            </CollapsibleSection>

            {/* İzinden Dönmesi Gerekenler */}
            <CollapsibleSection
                title="🗓 İzinden Dönmesi Gerekenler"
                actionLabel="Tüm İzin Talepleri"
                storageKey="dashboard_izin_acik"
                initiallyOpen={false}
            >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {["bugun", "yarin", "haftaya"].map((zaman) => (
                        <Card
                            key={zaman}
                            title={
                                zaman === "bugun"
                                    ? "Bugün Dönüyor"
                                    : zaman === "yarin"
                                        ? "Yarın Dönüyor"
                                        : "Hafta İçi Dönüş"
                            }
                            value={data.izinden_donenler?.[zaman]?.length || 0}
                            color="bg-yellow-50"
                            onClick={() => navigate(`/personell/izin?zaman=${zaman}`)}
                        />
                    ))}
                </div>
            </CollapsibleSection>
        </div>
    );
}