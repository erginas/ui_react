// src/modules/Personel/pages/PersonelCreatePage.tsx

import { useNavigate } from 'react-router-dom';
import {usePersonelForm} from "../hooks/usePersonelForm.ts";
import {PersonelFormData} from "../types/personel.ts";
import {apiClient} from "../../../common/api/axiosConfig.ts";
import {PersonelForm} from "../component/PersonelForm.tsx";

export default function PersonelCreatePage() {
    const navigate = useNavigate();

    const form = usePersonelForm({});

    const handleSave = (data: PersonelFormData) => {
        apiClient.post('/personel', data).then(() => {
            alert("Yeni personel başarıyla oluşturuldu!");
            navigate("/personel");
        }).catch(err => {
            console.error('Kayıt sırasında hata:', err);
            alert('Oluşturma başarısız oldu.');
        });
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Yeni Personel Oluştur</h1>
            <PersonelForm form={form} onSubmit={handleSave} isEditing={true} />
        </div>
    );
}