// src/modules/Personel/pages/PersonelDetail.tsx

import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {apiClient} from "../../../common/api/axiosConfig.ts";
import {Input} from "../../../common/components/ui/InputQwen.tsx";
import {DatePicker} from "../../../common/components/ui/DatePickerQwen.tsx";
import {usePersonelForm} from "../hooks/usePersonelForm.ts";
import {Select} from "../../../common/components/ui/Select.tsx";


interface PersonelFormData {
    adi: string;
    soyadi: string;
    tc_kimlik_no: number | undefined;
    dogum_tarihi: Date | string | undefined;
    cinsiyet_adi: string;
    birim_adi: string;
    unvan_adi: string;
    gorev_adi: string;
    durum_adi: string;
}

export default function PersonelDetail() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [personel, setPersonel] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Personel verisi çek
    useEffect(() => {
        const controller = new AbortController();

        if (id) {
            const fetchData = async () => {
                try {
                    const res = await apiClient.get(`/personel/${id}`, {
                        signal: controller.signal
                    });
                    setPersonel(res.data);
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.error('Veri çekilemedi:', err);
                    }
                }
            };

            fetchData();

            return () => controller.abort(); // Temizleme fonksiyonu
        }
    }, [id]);

    const form = usePersonelForm();
    useEffect(() => {
        if (personel) {
            form.reset(personel);
        }
    }, [personel]);
    const {handleSubmit, control, register, watch, setValue, formState: {errors}} = form;

    const handleSave = (data) => {
        apiClient.put(`/personel/${id}`, data).then(() => {
            alert("Başarıyla güncellendi!");
            navigate("/personel");
        }).catch(err => {
            console.error("Kayıt sırasında hata:", err);
            alert("Güncelleme başarısız oldu.");
        });
    };

    // Sekmeler
    const tabs = [
        {key: 'genel', label: 'Genel Bilgiler'},
        {key: 'iletisim', label: 'İletişim'},
        {key: 'kimlik', label: 'Kimlik'},
        {key: 'izin', label: 'İzinler'},
        {key: 'gorev', label: 'Görev & Durum'},
        {key: 'banka', label: 'Banka & Maaş'},
        {key: 'egitim', label: 'Eğitim & Belge'},
        {key: 'ekstra', label: 'Ekstra Bilgiler'},
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].key);

    if (!personel) return <div>Yükleniyor...</div>;
    return (
        <div className="p-6 space-y-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Personel Detay - {watch('adi')} {watch('soyadi')}</h1>

            {/* Sekmeler */}
            <div className="bg-white p-4 shadow rounded-md">
                <div className="flex flex-wrap gap-2 border-b pb-2 mb-4 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            className={`py-1 px-3 font-medium transition-colors ${
                                activeTab === tab.key
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Form İçeriği */}
            <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
                {/* Genel Bilgiler Sekmesi */}
                {activeTab === 'genel' && (
                    <div className="bg-white p-6 rounded shadow-md space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Genel Bilgiler</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Ad"
                                {...register('adi')}
                                error={errors.adi?.message}
                                readOnly={!isEditing}
                            />
                            <Input
                                label="Soyad"
                                {...register('soyadi')}
                                error={errors.soyadi?.message}
                                readOnly={!isEditing}
                            />
                            <Input
                                label="TC Kimlik No"
                                {...register('tc_kimlik_no', {valueAsNumber: true})}
                                error={errors.tc_kimlik_no?.message}
                                type="number"
                                readOnly={true}
                            />
                            <DatePicker
                                label="Doğum Tarihi"
                                name="dogum_tarihi"
                                control={control}
                                readOnly={!isEditing}
                            />
                            <Select
                                label="Cinsiyet"
                                name="cinsiyeti"
                                register={register}
                                error={errors.cinsiyeti?.message}
                                options={[
                                    {value: '', label: 'Seçiniz...'},
                                    {value: 'Erkek', label: 'Erkek'},
                                    {value: 'Kadın', label: 'Kadın'}
                                ]}
                                disabled={!isEditing}
                            />
                            <Input label="Baba Adı" {...register('baba_adi')} readOnly={!isEditing}/>
                            <Input label="Anne Adı" {...register('ana_adi')} readOnly={!isEditing}/>
                            <Input label="Sicil No" {...register('sicil_no')} readOnly={!isEditing}/>
                        </div>
                    </div>
                )}
                {/* İletişim Sekmesi */}
                {activeTab === 'iletisim' && (
                    <div className="bg-white p-4 sm:p-6 rounded shadow-md space-y-4">
                        <h2 className="text-lg font-semibold mb-4">İletişim Bilgileri</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Ev Adresi 1" {...register('ev_adresi1')} readOnly={!isEditing}/>
                            <Input label="Ev Adresi 2" {...register('ev_adresi2')} readOnly={!isEditing}/>
                            <Input label="Ev Telefonu" {...register('ev_telefonu')} readOnly={!isEditing}/>
                            <Input label="Cep Telefonu" {...register('cep_telefonu')} readOnly={!isEditing}/>
                            <Input label="E-Posta" {...register('eposta')} readOnly={!isEditing}/>
                            <Input label="Acil Ulaşılacak Kişi" {...register('acil_ulasilacak_kisi')}
                                   readOnly={!isEditing}/>
                            <Input label="Acil Telefon" {...register('acil_ulasilacak_tel')} readOnly={!isEditing}/>
                            <Input label="Vergi Dairesi" {...register('vergi_dairesi')} readOnly={!isEditing}/>
                            <Input label="Vergi Numarası" {...register('vergi_no')} readOnly={!isEditing}/>
                            <Input label="Web Parolası" {...register('web_parolasi')} readOnly={!isEditing}/>
                            <Input label="Web'de Göster" {...register('webde_goster', {valueAsNumber: true})}
                                   type="number" readOnly={!isEditing}/>
                        </div>
                    </div>
                )}

                {/* Kimlik Sekmesi */}
                {activeTab === 'kimlik' && (
                    <div className="bg-white p-4 sm:p-6 rounded shadow-md space-y-4">
                        <h2 className="text-lg font-semibold mb-4">Kimlik Bilgileri</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Kimlik Seri" {...register('kimlik_kart_seri')} readOnly={!isEditing}/>
                            <Input label="Kimlik Kart No" {...register('kimlik_kart_no')} readOnly={!isEditing}/>
                            <Input label="Verildiği Yer" {...register('kimlik_verildigi_yer')}
                                   readOnly={!isEditing}/>
                            <DatePicker label="Veriliş Tarihi" name="kimlik_verilis_tarihi" control={control}
                                        readOnly={!isEditing}/>
                            <Input label="Mahalle" {...register('kimlik_mahalle')} readOnly={!isEditing}/>
                            <Input label="İl ID" {...register('kimlik_il_id', {valueAsNumber: true})} type="number"
                                   readOnly={!isEditing}/>
                            <Input label="İlçe ID" {...register('kimlik_ilce_id', {valueAsNumber: true})}
                                   type="number" readOnly={!isEditing}/>
                            <Input label="Kimlik İlçe" {...register('kimlik_ilce')} readOnly={!isEditing}/>
                            <Input label="Cilt No" {...register('kimlik_cilt_no')} readOnly={!isEditing}/>
                            <Input label="Aile Sıra No" {...register('kimlik_aile_sira_no')} readOnly={!isEditing}/>
                            <Input label="Sıra No" {...register('kimlik_sira_no')} readOnly={!isEditing}/>
                            <Input label="Kayıt No" {...register('kimlik_kayit_no')} readOnly={!isEditing}/>
                        </div>
                    </div>
                )}

                {/* Görev & Durum Sekmesi */}
                {activeTab === 'gorev' && (
                    <div className="bg-white p-4 sm:p-6 rounded shadow-md space-y-4">
                        <h2 className="text-lg font-semibold mb-4">Görev & Kurumsal</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Birim" {...register('birim_adi')} readOnly={!isEditing}/>
                            <Input label="Ünvan" {...register('unvan_adi')} readOnly={!isEditing}/>
                            <Input label="Görev" {...register('gorev_adi')} readOnly={!isEditing}/>
                            <Input label="Durum" {...register('durum_adi')} readOnly={!isEditing}/>
                            <DatePicker label="İşe Başlama Tarihi" name="ise_baslama_tarihi" control={control}
                                        readOnly={!isEditing}/>
                            <DatePicker label="Emekli Girişi" name="memuriyete_giris_tarihi" control={control}
                                        readOnly={!isEditing}/>
                            <DatePicker label="Son Terfi Tarihi" name="terfi_tarihi" control={control}
                                        readOnly={!isEditing}/>
                            <DatePicker label="Emekli Terfi Tarihi" name="emekli_terfi_tarihi" control={control}
                                        readOnly={!isEditing}/>
                        </div>
                    </div>
                )}

                {/* İzin Sekmesi */}
                {activeTab === 'izin' && (
                    <div className="bg-white p-4 sm:p-6 rounded shadow-md space-y-4">
                        <h2 className="text-lg font-semibold mb-4">İzin Bilgileri</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DatePicker label="Part Time Tarihi" name="part_time_tarihi" control={control}
                                        readOnly={!isEditing}/>
                            <DatePicker label="Çıkış Tarihi" name="cikis_tarihi" control={control}
                                        readOnly={!isEditing}/>
                            <Input label="Part Time" {...register('part_time', {valueAsNumber: true})} type="number"
                                   readOnly={!isEditing}/>
                            <Input label="Çıkış Türü ID" {...register('cikis_turu_id', {valueAsNumber: true})}
                                   type="number" readOnly={!isEditing}/>
                            <Input label="Çıkış Açıklaması" {...register('cikis_aciklama')} readOnly={!isEditing}/>
                            <Input label="Çıkış Atama Yeri" {...register('cikis_atama_yeri')}
                                   readOnly={!isEditing}/>
                        </div>
                    </div>
                )}

                {/* Banka Sekmesi */}
                {activeTab === 'banka' && (
                    <div className="bg-white p-4 sm:p-6 rounded shadow-md space-y-4">
                        <h2 className="text-lg font-semibold mb-4">Banka & Maaş</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Banka ID" {...register('banka_id', {valueAsNumber: true})} type="number"
                                   readOnly={!isEditing}/>
                            <Input label="Banka Hesap No" {...register('banka_hesap_no')} readOnly={!isEditing}/>
                            <Input label="IBAN No" {...register('iban_no')} readOnly={!isEditing}/>
                            <Input label="Ek IBAN No" {...register('iban_no2')} readOnly={!isEditing}/>
                            <Input label="Banka Şubesi" {...register('banka_sube_no')} readOnly={!isEditing}/>
                            <Input label="Ek Banka Şube" {...register('banka_sube_no2')} readOnly={!isEditing}/>
                            <Input label="Ek Banka ID" {...register('ek_banka_id', {valueAsNumber: true})}
                                   type="number" readOnly={!isEditing}/>
                            <Input label="Ek Hesap No" {...register('ek_banka_hesap_no')} readOnly={!isEditing}/>
                        </div>
                    </div>
                )}

                {/* Eğitim Sekmesi */}
                {activeTab === 'egitim' && (
                    <div className="bg-white p-4 sm:p-6 rounded shadow-md space-y-4">
                        <h2 className="text-lg font-semibold mb-4">Eğitim & Sertifikalar</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Mezun Olduğu Okul" {...register('mezun_oldugu_okul')}
                                   readOnly={!isEditing}/>
                            <Input label="Diploma No" {...register('diploma_no')} readOnly={!isEditing}/>
                            <DatePicker label="Diploma Teslim Tarihi" name="diploma_tescil_tarihi" control={control}
                                        readOnly={!isEditing}/>
                            <DatePicker label="Uzmanlık Tarihi" name="uzmanlik_tarihi" control={control}
                                        readOnly={!isEditing}/>
                            <DatePicker label="Profesör Tarihi" name="profesor_tarihi" control={control}
                                        readOnly={!isEditing}/>
                            <Input label="Öğrenim Durumu" {...register('ogrenim_durumu_id', {valueAsNumber: true})}
                                   type="number" readOnly={!isEditing}/>
                            <Input label="Bildiği Diller" {...register('bildigi_diller')} readOnly={!isEditing}/>
                        </div>
                    </div>
                )}

                {/* Ekstra Bilgiler Sekmesi */}
                {activeTab === 'ekstra' && (
                    <div className="bg-white p-4 sm:p-6 rounded shadow-md space-y-4">
                        <h2 className="text-lg font-semibold mb-4">Ekstra Bilgiler</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Dis Kurum ID" {...register('dis_kurum_id', {valueAsNumber: true})}
                                   type="number" readOnly={!isEditing}/>
                            <Input label="Sendika ID" {...register('sendika_id', {valueAsNumber: true})}
                                   type="number" readOnly={!isEditing}/>
                            <DatePicker label="Sendika Giriş" name="sendika_giris_tarihi" control={control}
                                        readOnly={!isEditing}/>
                            <DatePicker label="Sendika Çıkış" name="sendika_cikis_tarihi" control={control}
                                        readOnly={!isEditing}/>
                            <Input label="Çocuk Sayısı" {...register('cocuk_sayisi', {valueAsNumber: true})}
                                   type="number" readOnly={!isEditing}/>
                            <Input label="Lisans Verilmiş mi?" {...register('nvi_onayli', {valueAsNumber: true})}
                                   type="number" readOnly={!isEditing}/>
                            <Input label="ARSIV NO" {...register('arsiv_no', {valueAsNumber: true})} type="number"
                                   readOnly={!isEditing}/>
                            <Input label="Mazeret Durumu" {...register('mazeret_durum_id', {valueAsNumber: true})}
                                   type="number" readOnly={!isEditing}/>
                            <Input label="Engelli Kişilik" {...register('engelli_kisi', {valueAsNumber: true})}
                                   type="number" readOnly={!isEditing}/>
                            <Input label="Özür Oranı" {...register('ozur_orani', {valueAsNumber: true})}
                                   type="number" readOnly={!isEditing}/>
                            <Input label="Kütük No" {...register('kutuk_no')} readOnly={!isEditing}/>
                            <Input
                                label="Kurum dışı ödeme" {...register('kurumdisi_ekodeme', {valueAsNumber: true})}
                                type="number" readOnly={!isEditing}/>
                        </div>
                    </div>
                )}

                {/* Kaydet / Düzenle Butonları */}
                <div className="flex justify-end gap-2 mt-6">
                    {!isEditing && (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Düzenle
                        </button>
                    )}
                    {isEditing && (
                        <>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                            >
                                İptal
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Kaydet
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}