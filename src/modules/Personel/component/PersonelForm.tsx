import {UseFormReturn} from 'react-hook-form';
import {PersonelFormData} from '../types/personel';
import {Input} from '../../../common/components/ui/InputQwen';
import {Select} from '../../../common/components/ui/Select';
import {DatePicker} from '../../../common/components/ui/DatePickerQwen';

interface Props {
    form: UseFormReturn<PersonelFormData>;
    onSubmit: (data: PersonelFormData) => void;
    isEditing?: boolean;
}

export function PersonelForm({form, onSubmit, isEditing = false}: Props) {
    const {handleSubmit, control, register, formState: {errors}, watch} = form;

    const cinsiyetOptions = [
        {value: '', label: 'Seçiniz...'},
        {value: 'Erkek', label: 'Erkek'},
        {value: 'Kadın', label: 'Kadın'},
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="max-w-7xl mx-auto px-4 py-6 bg-white rounded-lg shadow-md space-y-8">
            {/* Üst Panel: Sol inputlar / Sağ fotoğraf-durum */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sol: Form alanları */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        ['Ad', 'adi'],
                        ['Soyad', 'soyadi'],
                        ['TC Kimlik No', 'kk', 'number'],
                        ['Birim', 'birim_adi'],
                        ['Ünvan', 'unvan_adi'],
                        ['Sicil No', 'sicil_no'],
                        ['Baba Adı', 'baba_adi'],
                        ['Anne Adı', 'ana_adi'],
                        ['Medeni Hal', 'medeni_hal'],
                        ['Kan Grubu', 'kan_grubu'],
                        ['Telefon', 'cep_telefonu'],
                        ['E-Posta', 'eposta'],
                        ['Web Parolası', 'web_parolasi'],
                    ].map(([label, name, type]) => (
                        <div className="flex items-center gap-2" key={name}>
                            <label className="w-28 text-sm text-gray-700">{label}</label>
                            <Input {...register(name)} type={type || 'text'} readOnly={!isEditing}
                                   className="text-sm h-9 flex-1"/>
                        </div>
                    ))}
                    <div className="flex items-center gap-2">
                        <label className="w-28 text-sm text-gray-700">Doğum Tarihi</label>
                        <DatePicker name="dogum_tarihi" control={control} readOnly={!isEditing}/>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="w-28 text-sm text-gray-700">Cinsiyet</label>
                        <Select name="cinsiyeti" register={register} options={cinsiyetOptions}
                                defaultValue={watch('cinsiyeti') || ''} disabled={!isEditing}/>
                    </div>
                </div>

                {/* Sağ: Fotoğraf ve Durum */}
                <div className="w-full md:w-64 flex flex-col items-center gap-6">
                    <div
                        className="w-28 h-28 bg-gray-100 rounded-full border flex items-center justify-center text-gray-500 text-xs">
                        Fotoğraf
                    </div>
                    <div className="w-full border p-3 rounded-md text-sm">
                        <label className="block mb-1 font-medium text-gray-700">Durum</label>
                        <div className="space-y-1">
                            <label className="flex items-center gap-2">
                                <input type="radio" value="aktif" {...register('durum')} disabled={!isEditing}/> Aktif
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" value="pasif" {...register('durum')} disabled={!isEditing}/> Pasif
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alt Panel */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Side Menu */}
                <aside className="border rounded-md p-4 bg-gray-50 text-sm">
                    <ul className="space-y-2">
                        <li><a href="#" className="text-blue-600 hover:underline">Kimlik Bilgileri</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">İletişim</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Eğitim</a></li>
                    </ul>
                </aside>

                {/* Content Panel */}
                <div className="md:col-span-3 space-y-4">
                    {/* Menü Bar */}
                    <div className="bg-gray-100 p-3 rounded-md flex justify-between items-center">
                        <span className="font-semibold text-sm text-gray-700">İşlemler</span>
                        <div className="space-x-2">
                            <button type="button"
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs hover:bg-blue-200">Ekle
                            </button>
                            <button type="button"
                                    className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs hover:bg-yellow-200">Düzenle
                            </button>
                            <button type="button"
                                    className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-xs hover:bg-red-200">Sil
                            </button>
                        </div>
                    </div>

                    {/* İçerik Alanı */}
                    <div className="border rounded-md p-4 bg-white text-sm text-gray-600">
                        Personel ile ilgili detaylı içerik alanı buraya gelecek.
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                    {isEditing ? 'Kaydet' : 'Oluştur'}
                </button>
            </div>
        </form>
    );
}
