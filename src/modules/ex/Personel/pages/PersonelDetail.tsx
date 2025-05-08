import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {apiClient} from "../../../../common/api/axiosConfig";

export default function PersonelDetail() {
    const {id} = useParams();
    const [personel, setPersonel] = useState(null);
    const [expanded, setExpanded] = useState(true);
    const [activeTab, setActiveTab] = useState("iletisim");
    const [izinler, setIzinler] = useState([]);
    const [yeniIzin, setYeniIzin] = useState({baslangic: "", bitis: "", tur: "Yıllık"});

    useEffect(() => {
        if (id) {
            apiClient.get(`/personel/${id}`).then((res) => {
                setPersonel(res.data);
            });
            apiClient.get(`/personel/${id}/izinler`).then((res) => {
                setIzinler(res.data);
            });
        }
    }, [id]);

    const handleYeniIzinDegis = (e) => {
        const {name, value} = e.target;
        setYeniIzin(prev => ({...prev, [name]: value}));
    };

    const handleYeniIzinKaydet = () => {
        if (!yeniIzin.baslangic || !yeniIzin.bitis) return;
        const yeni = {
            baslangic_tarihi: yeniIzin.baslangic,
            bitis_tarihi: yeniIzin.bitis,
            izin_turu: yeniIzin.tur,
            durum: "Bekliyor"
        };
        setIzinler(prev => [...prev, yeni]);
        setYeniIzin({baslangic: "", bitis: "", tur: "Yıllık"});
    };

    const tabs = [
        {key: "ozluk", label: "Özlük"},
        {key: "iletisim", label: "İletişim"},
        {key: "egitim", label: "Eğitim"},
        {key: "gorev", label: "Görev"},
        {key: "izin", label: "İzinler"},
    ];

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Personel Detay - ID: {id}</h1>

            <div className="flex gap-4">
                {/* Sol Panel: Kişi Kartı */}
                {expanded && (
                    <div
                        className="w-1/3 max-h-[calc(100vh-180px)] overflow-y-auto bg-white shadow rounded p-4 space-y-3">
                        <div className="flex justify-between items-center sticky top-0 bg-white z-10 pb-2">
                            <h2 className="text-lg font-semibold text-gray-700">Kişisel Bilgiler</h2>
                            <button
                                onClick={() => setExpanded(false)}
                                className="text-xs text-blue-600 hover:underline"
                            >
                                Gizle
                            </button>
                        </div>
                        {personel ? (
                            <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                                <div><strong>Ad:</strong> {personel.adi}</div>
                                <div><strong>Soyad:</strong> {personel.soyadi}</div>
                                <div><strong>TC No:</strong> {personel.tc_kimlik_no}</div>
                                <div><strong>Doğum Tarihi:</strong> {personel.dogum_tarihi}</div>
                                <div><strong>Birimi:</strong> {personel.birim_adi || "-"}</div>
                                <div><strong>Unvan:</strong> {personel.unvan_adi || "-"}</div>
                            </div>
                        ) : (
                            <div className="text-gray-500">Yükleniyor...</div>
                        )}
                        <div
                            className="mt-4 w-full h-40 bg-gray-100 border rounded flex items-center justify-center text-gray-500">
                            Fotoğraf
                        </div>
                    </div>
                )}

                {/* Sağ Panel: Sekmeli İçerik */}
                <div className="flex-1 bg-white shadow rounded p-4">
                    {!expanded && (
                        <button
                            onClick={() => setExpanded(true)}
                            className="text-xs text-blue-600 hover:underline mb-2"
                        >
                            Kişisel Bilgileri Göster
                        </button>
                    )}

                    <div className="flex gap-4 border-b pb-2 mb-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                                    activeTab === tab.key
                                        ? "text-blue-600 border-blue-600"
                                        : "text-gray-500 border-transparent hover:text-blue-600"
                                }`}
                                onClick={() => setActiveTab(tab.key)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 min-h-[150px]">
                        {activeTab === "iletisim" &&
                            <div className="col-span-2">İletişim bilgileri formu buraya gelecek.</div>}
                        {activeTab === "egitim" && <>
                            <div>Eğitim 1</div>
                            <div>Eğitim 2</div>
                        </>}
                        {activeTab === "gorev" && <>
                            <div>Görev 1</div>
                            <div>Görev 2</div>
                        </>}
                        {activeTab === "izin" && (
                            <div className="col-span-2 space-y-4">
                                <div className="bg-gray-50 p-4 border rounded">
                                    <h3 className="font-medium mb-2">Yeni İzin Talebi</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-600">Başlangıç Tarihi</label>
                                            <input type="date" name="baslangic" value={yeniIzin.baslangic}
                                                   onChange={handleYeniIzinDegis}
                                                   className="w-full border px-2 py-1 rounded"/>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Bitiş Tarihi</label>
                                            <input type="date" name="bitis" value={yeniIzin.bitis}
                                                   onChange={handleYeniIzinDegis}
                                                   className="w-full border px-2 py-1 rounded"/>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">İzin Türü</label>
                                            <select name="tur" value={yeniIzin.tur} onChange={handleYeniIzinDegis}
                                                    className="w-full border px-2 py-1 rounded">
                                                <option>Yıllık</option>
                                                <option>Hastalık</option>
                                                <option>Doğum</option>
                                                <option>Mazeret</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button onClick={handleYeniIzinKaydet}
                                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                        Kaydet
                                    </button>
                                </div>

                                <table className="min-w-full border text-sm">
                                    <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border px-2 py-1 text-left">Başlangıç</th>
                                        <th className="border px-2 py-1 text-left">Bitiş</th>
                                        <th className="border px-2 py-1 text-left">Tür</th>
                                        <th className="border px-2 py-1 text-left">Durum</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {izinler.map((izin, i) => (
                                        <tr key={i}>
                                            <td className="border px-2 py-1">{izin.baslangic_tarihi}</td>
                                            <td className="border px-2 py-1">{izin.bitis_tarihi}</td>
                                            <td className="border px-2 py-1">{izin.izin_turu}</td>
                                            <td className="border px-2 py-1">{izin.durum}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/*// Sekme içeriği içine yeni blok ekleniyor*/}
                        {activeTab === "ozluk" && (
                            <div className="col-span-2 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">T.C. Kimlik
                                            No</label>
                                        <input type="text" value={personel?.tc_kimlik_no || ""}
                                               className="w-full border rounded px-3 py-1" readOnly/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Ad</label>
                                        <input type="text" value={personel?.adi || ""}
                                               className="w-full border rounded px-3 py-1" readOnly/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Soyad</label>
                                        <input type="text" value={personel?.soyadi || ""}
                                               className="w-full border rounded px-3 py-1" readOnly/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Cinsiyet</label>
                                        <input type="text" value={personel?.cinsiyeti || ""}
                                               className="w-full border rounded px-3 py-1" readOnly/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Doğum Tarihi</label>
                                        <input type="text" value={personel?.dogum_tarihi || ""}
                                               className="w-full border rounded px-3 py-1" readOnly/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Sicil No</label>
                                        <input type="text" value={personel?.sicil_no || ""}
                                               className="w-full border rounded px-3 py-1" readOnly/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">İşe Başlama</label>
                                        <input type="text" value={personel?.ise_baslama_tarihi || ""}
                                               className="w-full border rounded px-3 py-1" readOnly/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Çıkış Tarihi</label>
                                        <input type="text" value={personel?.cikis_tarihi || ""}
                                               className="w-full border rounded px-3 py-1" readOnly/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Birim</label>
                                        <input type="text" value={personel?.birim_adi || ""}
                                               className="w-full border rounded px-3 py-1" readOnly/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Unvan</label>
                                        <input type="text" value={personel?.unvan_adi || ""}
                                               className="w-full border rounded px-3 py-1" readOnly/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Görev</label>
                                        <input type="text" value={personel?.gorev_adi || ""}
                                               className="w-full border rounded px-3 py-1" readOnly/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Durum</label>
                                        <input type="text" value={personel?.durum_adi || ""}
                                               className="w-full border rounded px-3 py-1" readOnly/>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
