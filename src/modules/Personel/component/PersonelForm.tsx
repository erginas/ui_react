// src/modules/Personel/components/PersonelForm.tsx

import {useState} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {PersonelFormData} from '../types/personel';
import {Input} from '../../../common/components/ui/InputQwen';
import {Select} from '../../../common/components/ui/Select';
import {DatePicker} from "../../../common/components/ui/DatePickerQwen.tsx";

interface Props {
    form: UseFormReturn<PersonelFormData>;
    onSubmit: (data: PersonelFormData) => void;
    isEditing?: boolean;
}

export function PersonelForm({form, onSubmit, isEditing = false}: Props) {
    const {handleSubmit, control, register, formState: {errors}, watch} = form;

    const [activeTab, setActiveTab] = useState('genel');

    const tabs = [
        {id: 'genel', label: 'Genel Bilgiler'},
        {id: 'iletisim', label: 'İletişim'},
        {id: 'kimlik', label: 'Kimlik'},
        {id: 'izin', label: 'İzinler'},
        {id: 'gorev', label: 'Görev & Durum'},
        {id: 'banka', label: 'Banka & Maaş'},
        {id: 'egitim', label: 'Eğitim & Belge'},
        {id: 'ekstra', label: 'Ekstra Bilgiler'},
    ];

    const cinsiyetOptions = [
        {value: '', label: 'Seçiniz...'},
        {value: 'Erkek', label: 'Erkek'},
        {value: 'Kadın', label: 'Kadın'},
    ];

    const birimOptions = [
        {value: '', label: 'Birim Seçin...'},
        {value: 1, label: 'Muhasebe'},
        {value: 2, label: 'İK'},
        {value: 3, label: 'Finans'},
    ];

    const durumOptions = [
        {value: '', label: 'Durum Seçin...'},
        {value: 1, label: 'Aktif'},
        {value: 2, label: 'Ayrılmış'},
        {value: 3, label: 'İzinli'},
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-5xl mx-auto">
            {/* Sekme Menüsü */}
            <div className="flex flex-wrap gap-4 border-b pb-2 mb-6 overflow-x-auto">
                {tabs.map(tab => (
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
                            {...register('kk', {valueAsNumber: true})}
                            error={errors.kk?.message}
                            type="number"
                            readOnly={true}
                        />
                        <DatePicker label="Doğum Tarihi" name="dogum_tarihi" control={control} readOnly={!isEditing}/>
                        <Select
                            label="Cinsiyet"
                            name="cinsiyeti"
                            register={register}
                            error={errors.cinsiyeti?.message}
                            options={cinsiyetOptions}
                            defaultValue={watch('cinsiyeti') || ''}
                        />
                        <Input label="Baba Adı" {...register('baba_adi')} readOnly={!isEditing}/>
                        <Input label="Anne Adı" {...register('ana_adi')} readOnly={!isEditing}/>
                        <Input label="Sicil No" {...register('sicil_no')} readOnly={!isEditing}/>
                        <Input label="Sıralama Kodu" {...register('siralama_kodu', {valueAsNumber: true})} type="number"
                               readOnly={!isEditing}/>
                        <Input label="Medeni Hali" {...register('medeni_hal_kodu', {valueAsNumber: true})} type="number"
                               readOnly={!isEditing}/>
                        <Input label="Kadro Türü" {...register('kadro_turu', {valueAsNumber: true})} type="number"
                               readOnly={!isEditing}/>
                        <Input label="Kan Grubu ID" {...register('kan_grubu_id', {valueAsNumber: true})} type="number"
                               readOnly={!isEditing}/>
                    </div>
                </div>
            )}

            {/* İletişim Sekmesi */}
            {activeTab === 'iletisim' && (
                <div className="bg-white p-6 rounded shadow-md space-y-4">
                    <h2 className="text-xl font-semibold mb-4">İletişim Bilgileri</h2>
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
                    </div>
                </div>
            )}

            {/* Kimlik Sekmesi */}
            {activeTab === 'kimlik' && (
                <div className="bg-white p-6 rounded shadow-md space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Kimlik Bilgileri</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Kimlik Seri" {...register('kimlik_kart_seri')} readOnly={!isEditing}/>
                        <Input label="Kimlik Kart No" {...register('kimlik_kart_no')} readOnly={!isEditing}/>
                        <Input label="Verildiği Yer" {...register('kimlik_verildigi_yer')} readOnly={!isEditing}/>
                        <DatePicker label="Veriliş Tarihi" name="kimlik_verilis_tarihi" control={control}
                                    readOnly={!isEditing}/>
                        <Input label="Mahalle" {...register('kimlik_mahalle')} readOnly={!isEditing}/>
                        <Input label="İl ID" {...register('kimlik_il_id', {valueAsNumber: true})} type="number"
                               readOnly={!isEditing}/>
                        <Input label="İlçe ID" {...register('kimlik_ilce_id', {valueAsNumber: true})} type="number"
                               readOnly={!isEditing}/>
                        <Input label="Kimlik İlçe" {...register('kimlik_ilce')} readOnly={!isEditing}/>
                        <Input label="Cilt No" {...register('kimlik_cilt_no')} readOnly={!isEditing}/>
                        <Input label="Aile Sıra No" {...register('kimlik_aile_sira_no')} readOnly={!isEditing}/>
                        <Input label="Sıra No" {...register('kimlik_sira_no')} readOnly={!isEditing}/>
                        <Input label="Kayıt No" {...register('kimlik_kayit_no')} readOnly={!isEditing}/>
                    </div>
                </div>
            )}

            {/* İzinler Sekmesi */}
            {activeTab === 'izin' && (
                <div className="bg-white p-6 rounded shadow-md space-y-4">
                    <h2 className="text-xl font-semibold mb-4">İzin ve Ayrılma</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DatePicker label="Part Time Tarihi" name="part_time_tarihi" control={control}
                                    readOnly={!isEditing}/>
                        <DatePicker label="Çıkış Tarihi" name="cikis_tarihi" control={control} readOnly={!isEditing}/>
                        <Input label="Part Time" {...register('part_time', {valueAsNumber: true})} type="number"
                               readOnly={!isEditing}/>
                        <Input label="Çıkış Türü ID" {...register('cikis_turu_id', {valueAsNumber: true})} type="number"
                               readOnly={!isEditing}/>
                        <Input label="Çıkış Açıklaması" {...register('cikis_aciklama')} readOnly={!isEditing}/>
                        <Input label="Çıkış Atama Yeri" {...register('cikis_atama_yeri')} readOnly={!isEditing}/>
                    </div>
                </div>
            )}

            {/* Görev & Durum Sekmesi */}
            {activeTab === 'gorev' && (
                <div className="bg-white p-6 rounded shadow-md space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Görev & Kurumsal</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                            label="Birim"
                            name="birim_id"
                            register={register}
                            error={errors.birim_id?.message}
                            options={birimOptions}
                            disabled={!isEditing}
                        />
                        <Select
                            label="Durum"
                            name="durum_id"
                            register={register}
                            error={errors.durum_id?.message}
                            options={durumOptions}
                            disabled={!isEditing}
                        />
                        <Input label="Ünvan ID" {...register('unvan_id', {valueAsNumber: true})} type="number"
                               readOnly={!isEditing}/>
                        <Input label="Görev ID" {...register('gorev_id', {valueAsNumber: true})} type="number"
                               readOnly={!isEditing}/>
                        <DatePicker label="İşe Başlama Tarihi" name="ise_baslama_tarihi" control={control}
                                    readOnly={!isEditing}/>
                        <DatePicker label="Emekli Girişi" name="memuriyete_giris_tarihi" control={control}
                                    readOnly={!isEditing}/>
                        <DatePicker label="Son Terfi Tarihi" name="terfi_tarihi" control={control}
                                    readOnly={!isEditing}/>
                        <DatePicker label="Devlet Hizmet Yükümlülüğü" name="devlet_hizmet_yukumluluk_kodu"
                                    control={control} readOnly={!isEditing}/>
                    </div>
                </div>
            )}

            {/* Banka & Maaş Sekmesi */}
            {activeTab === 'banka' && (
                <div className="bg-white p-6 rounded shadow-md space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Banka & Maaş</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Banka ID" {...register('banka_id', {valueAsNumber: true})} type="number"
                               readOnly={!isEditing}/>
                        <Input label="Banka Hesap No" {...register('banka_hesap_no')} readOnly={!isEditing}/>
                        <Input label="IBAN No" {...register('iban_no')} readOnly={!isEditing}/>
                        <Input label="Ek IBAN No" {...register('iban_no2')} readOnly={!isEditing}/>
                        <Input label="Banka Şubesi" {...register('banka_sube_no')} readOnly={!isEditing}/>
                        <Input label="Ek Banka Şube" {...register('banka_sube_no2')} readOnly={!isEditing}/>
                        <Input label="Ek Banka ID" {...register('ek_banka_id', {valueAsNumber: true})} type="number"
                               readOnly={!isEditing}/>
                        <Input label="Ek Hesap No" {...register('ek_banka_hesap_no')} readOnly={!isEditing}/>
                    </div>
                </div>
            )}

            {/* Eğitim & Belge Sekmesi */}
            {activeTab === 'egitim' && (
                <div className="bg-white p-6 rounded shadow-md space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Eğitim & Sertifikalar</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Mezun Olduğu Okul" {...register('mezun_oldugu_okul')} readOnly={!isEditing}/>
                        <Input label="Diploma No" {...register('diploma_no')} readOnly={!isEditing}/>
                        <DatePicker label="Diploma Teslim Tarihi" name="diploma_tescil_tarihi" control={control}
                                    readOnly={!isEditing}/>
                        <Input label="Öğrenim Durumu" {...register('ogrenim_durumu_id', {valueAsNumber: true})}
                               type="number" readOnly={!isEditing}/>
                        <Input label="Bildiği Diller" {...register('bildigi_diller')} readOnly={!isEditing}/>
                    </div>
                </div>
            )}

            {/* Ekstra Bilgiler Sekmesi */}
            {activeTab === 'ekstra' && (
                <div className="bg-white p-6 rounded shadow-md space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Ekstra Bilgiler</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Dis Kurum ID" {...register('dis_kurum_id', {valueAsNumber: true})} type="number"
                               readOnly={!isEditing}/>
                        <Input label="Sendika ID" {...register('sendika_id', {valueAsNumber: true})} type="number"
                               readOnly={!isEditing}/>
                        <DatePicker label="Sendika Giriş Tarihi" name="sendika_giris_tarihi" control={control}
                                    readOnly={!isEditing}/>
                        <DatePicker label="Sendika Çıkış Tarihi" name="sendika_cikis_tarihi" control={control}
                                    readOnly={!isEditing}/>
                        <Input label="Çocuk Sayısı" {...register('cocuk_sayisi', {valueAsNumber: true})} type="number"
                               readOnly={!isEditing}/>
                        <Input label="Lisans Verilmiş mi?" {...register('nvi_onayli', {valueAsNumber: true})}
                               type="number" readOnly={!isEditing}/>
                        <Input label="ARSIV NO" {...register('arsiv_no', {valueAsNumber: true})} type="number"
                               readOnly={!isEditing}/>
                        <Input label="Mazeret Durumu" {...register('mazeret_durum_id', {valueAsNumber: true})}
                               type="number" readOnly={!isEditing}/>
                        <Input label="Engelli Kişilik" {...register('engelli_kisi', {valueAsNumber: true})}
                               type="number" readOnly={!isEditing}/>
                        <Input label="Özür Oranı" {...register('ozur_orani', {valueAsNumber: true})} type="number"
                               readOnly={!isEditing}/>
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