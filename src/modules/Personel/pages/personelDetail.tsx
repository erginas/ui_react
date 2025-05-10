import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {apiClient} from "../../../common/api/axiosConfig";
import {usePersonelForm} from "../hooks/usePersonelForm";
import {PersonelForm} from "../component/PersonelForm.tsx";

export default function PersonelDetail() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [personel, setPersonel] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const form = usePersonelForm();

    useEffect(() => {
        if (id) {
            apiClient.get(`/personel/${id}`).then((res) => {
                setPersonel(res.data);
                form.reset(res.data);
            }).catch((err) => {
                console.error('Veri çekme hatası:', err);
            });
        }
    }, [id]);

    const handleSave = (data) => {
        apiClient.put(`/personel/${id}`, data).then(() => {
            alert('Başarıyla güncellendi!');
            navigate('/personell/aktif');
        }).catch((err) => {
            console.error('Kayıt hatası:', err);
            alert('Güncelleme başarısız oldu.');
        });
    };

    if (!personel) return <div className="p-4">Yükleniyor...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-gray-700"> {personel.adi} {personel.soyadi} ne ait bilgiler</h1>
            <PersonelForm form={form} onSubmit={handleSave} isEditing={isEditing}/>
            <div className="flex justify-end gap-3 mt-6">
                {!isEditing && (
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                        onClick={() => setIsEditing(true)}
                    >
                        Düzenle
                    </button>
                )}
                {isEditing && (
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                        onClick={() => setIsEditing(false)}
                    >
                        İptal
                    </button>
                )}
            </div>
        </div>
    );
}
