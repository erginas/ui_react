// src/modules/Personel/pages/PersonelDetail.tsx

import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {PersonelFormData} from "../types/personel.ts";
import {apiClient} from "../../../common/api/axiosConfig.ts";
import {usePersonelForm} from "../hooks/usePersonelForm.ts";
import {PersonelForm} from "../component/PersonelForm.tsx";


export default function PersonelDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [personel, setPersonel] = useState<PersonelFormData | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Personel verisini çek
    useEffect(() => {
        if (id) {
            apiClient.get(`/personel/${id}`).then(res => {
                setPersonel(res.data);
            });
        }
    }, [id]);

    const form = usePersonelForm(personel || {});

    const handleSave = (data: PersonelFormData) => {
        apiClient.put(`/personel/${id}`, data).then(() => {
            alert("Başarıyla güncellendi!");
            navigate("/personel");
        }).catch(err => {
            console.error('Kayıt sırasında hata:', err);
            alert('Güncelleme hatası');
        });
    };

    if (!personel) return <div>Yükleniyor...</div>;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-700">Personel Detay - ID: {id}</h1>
            <div className="flex justify-between mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Geri
                </button>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Düzenle
                    </button>
                )}
            </div>

            <PersonelForm form={form} onSubmit={handleSave} isEditing={isEditing} />
        </div>
    );
}