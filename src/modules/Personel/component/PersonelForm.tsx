// src/modules/Personel/components/PersonelForm.tsx

import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { PersonelFormData } from '../types/personel';
import { Input } from '../../../common/components/ui/Input';
import { DatePicker } from '../../../common/components/ui/DatePicker';

interface Props {
    form: UseFormReturn<PersonelFormData>;
    onSubmit: (data: PersonelFormData) => void;
    isEditing?: boolean;
}

export function PersonelForm({ form, onSubmit, isEditing = false }: Props) {
    const { handleSubmit, control, register, formState: { errors }, watch } = form;

    const [activeTab, setActiveTab] = useState('genel');

    const tabs = [
        { id: 'genel', label: 'Genel Bilgiler' },
        { id: 'iletisim', label: 'İletişim' },
        { id: 'kimlik', label: 'Kimlik' },
        { id: 'izin', label: 'İzinler' },
        { id: 'gorev', label: 'Görev & Durum' },
        { id: 'banka', label: 'Banka & Maaş' },
        { id: 'egitim', label: 'Eğitim & Belge' },
        { id: 'ekstra', label: 'Ekstra Bilgiler' },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-5xl mx-auto">
            {/* Sekme Menüsü */}
            <div className="flex flex-wrap gap-4 border-b pb-2 mb-6 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-2 px-4 font-medium transition-colors whitespace-nowrap ${
                            activeTab === tab.id
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-600 hover:text-blue-600'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* 1. Genel Bilgiler */}
            {activeTab === 'genel' && (
                <div className="bg-white p-6 rounded shadow-md space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Genel Bilgiler</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Ad"
                            register={register}
                            name="adi"
                            error={errors.adi?.message}
                            readOnly={isEditing}
                        />
                        <Input
                            label="Soyad"
                            register={register}
                            name="soyadi"
                            error={errors.soyadi?.message}
                            readOnly={isEditing}
                        />
                        <Input
                            label="TC Kimlik No"
                            register={register}
                            name="kk"
                            error={errors.kk?.message}
                            type="number"
                            readOnly={isEditing}
                        />
                        <DatePicker
                            label="Doğum Tarihi"
                            name="dogum_tarihi"
                            control={control}
                            readOnly={isEditing}
                        />
                        <Input label="Cinsiyet" register={register} name="cinsiyeti" />
                        <Input label="Baba Adı" register={register} name="baba_adi" />
                        <Input label="Anne Adı" register={register} name="ana_adi" />
                        <Input label="Sicil No" register={register} name="sicil_no" />
                        <Input label="Sıralama Kodu" register={register} name="siralama_kodu" type="number" />
                        <Input label="Medeni Hali" register={register} name="medeni_hal_kodu" type="number" />
                        <Input label="Kadro Türü" register={register} name="kadro_turu" type="number" />
                        <Input label="Kan Grubu ID" register={register} name="kan_grubu_id" type="number" />
                    </div>
                </div>
            )}

            {/* 2. İletişim Bilgileri */}
            {activeTab === 'iletisim' && (
                <div className="bg-white p-6 rounded shadow-md space-y-4">
                    <h2 className="text-xl font-semibold mb-4">İletişim Bilgileri</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Ev Adresi 1" register={register} name="ev_adresi1" />
                        <Input label="Ev Adresi 2" register={register} name="ev_adresi2" />
                        <Input label="Ev Posta Kodu" register={register} name="ev_posta_kodu" />
                        <Input label="Ev Telefonu" register={register} name="ev_telefonu" />
                        <Input label="Cep Telefonu" register={register} name="cep_telefonu" />
                        <Input label="E-Posta" register={register} name="eposta" />
                        <Input label="Acil Ulaşılacak Kişi" register={register} name="acil_ulasilacak_kisi" />
                        <Input label="Acil Telefon" register={register} name="acil_ulasilacak_tel" />
                        <Input label="Vergi Dairesi" register={register} name="vergi_dairesi" />
                        <Input label="Vergi Numarası" register={register} name="vergi_no" />
                        <Input label="Web Parolası" register={register} name="web_parolasi" />
                        <Input label="Web'de Göster" register={register} name="webde_goster" type="number" />
                    </div>
                </div>
            )}

            {/* 3. Kimlik Bilgileri */}
            {activeTab === 'kimlik' && (
                <div className="bg-white p-6 rounded shadow-md space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Kimlik Bilgileri</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Kimlik Seri" register={register} name="kimlik_kart_seri" />
                        <Input label="Kimlik Kart No" register={register} name="kimlik_kart_no" />
                        <Input label="Verildiği Yer" register={register} name="kimlik_verildigi_yer" />
                        <DatePicker label="Veriliş Tarihi" name="kimlik_verilis_tarihi" control={control} />
                        <Input label="Mahalle" register={register} name="kimlik_mahalle" />
                        <Input label="İl ID" register={register} name="kimlik_il_id" type="number" />
                        <Input label="İlçe ID" register={register} name="kimlik_ilce_id" type="number" />
                        <Input label="Kimlik İlçe" register={register} name="kimlik_ilce" />
                        <Input label="Kimlik İlçesi" register={register} name="kimlik_cilt_no" />
                        <Input label="Aile Sıra No" register={register} name="kimlik_aile_sira_no" />
                        <Input label="Sıra No" register={register} name="kimlik_sira_no" />
                        <Input label="Kayıt No" register={register} name="kimlik_kayit_no" />
                    </div>
                </div>
            )}

            {/* 4. İzinler */}
            {activeTab === 'izin' && (
                <div className="bg-white p-6 rounded shadow-md space-y-4">
                    <h2 className="text-xl font-semibold mb-4">İzin ve Ayrılma</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DatePicker label="Part Time Tarihi" name="part_time_tarihi" control={control} />
                        <DatePicker label="Çıkış Tarihi" name="cikis_tarihi" control={control} />
                        <Input label="Part Time" register={register} name="part_time" type="number" />
                        <Input label="Çıkış Türü ID" register={register} name="cikis_turu_id" type="number" />
                        <Input label="Çıkış Açıklaması" register={register} name="cikis_aciklama" />
                        <Input label="Çıkış Atama Yeri" register={register} name="cikis_atama_yeri" />
                    </div>
                </div>
            )}

            {/* 5. Görev & Kurumsal */}
            {activeTab === 'gorev' && (
                <div className="bg-white p-6 rounded shadow-md space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Görev & Kurumsal</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Birim ID" register={register} name="birim_id" type="number" />
                        <Input label="Ünvan ID" register={register} name="unvan_id" type="number" />
                        <Input label="Görev ID" register={register} name="gorev_id" type="number" />
                        <Input label="Durum ID" register={register} name="durum_id" type="number" />
                        <DatePicker label="İşe Başlama Tarihi" name="ise_baslama_tarihi" control={control} />
                        <DatePicker label="Emekli Girişi" name="memuriyete_giris_tarihi" control={control} />
                        <DatePicker label="Asıl Memuriyet Tarihi" name="asıl_memuriyet_tarihi" control={control} />
                        <DatePicker label="Son Terfi Tarihi" name="terfi_tarihi" control={control} />
                        <DatePicker label="Emekli Terfi Tarihi" name="emekli_terfi_tarihi" control={control} />
                        <DatePicker label="Devlet Hizmet Yükümlülüğü" name="devlet_hizmet_yukumluluk_kodu" control={control} />
                    </div>
                </div>
            )}

            {/* 6. Banka & Maaş */}
            {activeTab === 'banka' && (
                <div className="bg-white p-6 rounded shadow-md space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Banka & Maaş</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Banka ID" register={register} name="banka_id" type="number" />
                        <Input label="Banka Hesap No" register={register} name="banka_hesap_no" />
                        <Input label="IBAN No" register={register} name="iban_no" />
                        <Input label="Ek IBAN No" register={register} name="iban_no2" />
                        <Input label="Banka Şubesi" register={register} name="banka_sube_no" />
                        <Input label="Ek Banka Şube" register={register} name="banka_sube_no2" />
                        <Input label="Ek Banka ID" register={register} name="ek_banka_id" type="number" />
                        <Input label="Ek Hesap No" register={register} name="ek_banka_hesap_no" />
                        <Input label="Banka Ekno" register={register} name="banka_ekno" type="number" />
                        <Input label="Banka Ekno 2" register={register} name="banka_ekno2" type="number" />
                    </div>
                </div>
            )}

            {/* 7. Eğitim & Sertifikalar */}
            {activeTab === 'egitim' && (
                <div className="bg-white p-6 rounded shadow-md space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Eğitim & Sertifikalar</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Mezun Olduğu Okul" register={register} name="mezun_oldugu_okul" />
                        <Input label="Diploma No" register={register} name="diploma_no" />
                        <Input label="Diploma Teslim Tarihi" register={register} name="diploma_tescil_tarihi" />
                        <Input label="Doktora Alanı" register={register} name="doktorluk_tarihi" />
                        <Input label="Uzmanlık Alanı" register={register} name="uzmanlik_tarihi" />
                        <Input label="Profesör Tarihi" register={register} name="profesor_tarihi" />
                        <Input label="Öğrenim Durumu" register={register} name="ogrenim_durumu_id" type="number" />
                        <Input label="Bildiği Diller" register={register} name="bildigi_diller" />
                    </div>
                </div>
            )}

            {/* 8. Ekstra Bilgiler */}
            {activeTab === 'ekstra' && (
                <div className="bg-white p-6 rounded shadow-md space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Ekstra Bilgiler</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Dis Kurum ID" register={register} name="dis_kurum_id" type="number" />
                        <Input label="Sendika ID" register={register} name="sendika_id" type="number" />
                        <DatePicker label="Sendika Giriş" name="sendika_giris_tarihi" control={control} />
                        <DatePicker label="Sendika Çıkış" name="sendika_cikis_tarihi" control={control} />
                        <Input label="Cocuk Sayısı" register={register} name="cocuk_sayisi" type="number" />
                        <Input label="Lisans Verilmiş mi?" register={register} name="nvi_onayli" type="number" />
                        <Input label="ARSIV NO" register={register} name="arsiv_no" type="number" />
                        <Input label="Mazeret Durumu" register={register} name="mazeret_durum_id" type="number" />
                        <Input label="Engelli Kişilik" register={register} name="engelli_kisi" type="number" />
                        <Input label="Engelli Oranı" register={register} name="ozur_orani" type="number" />
                        <Input label="Kütük No" register={register} name="kutuk_no" />
                        <Input label="Kurum dışı ödeme" register={register} name="kurumdisi_ekodeme" type="number" />
                    </div>
                </div>
            )}

            {/* Navigasyon Butonları */}
            <div className="flex justify-between mt-6">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                    Geri
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {isEditing ? 'Kaydet' : 'Oluştur'}
                </button>
            </div>
        </form>
    );
}