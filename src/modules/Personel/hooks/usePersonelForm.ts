// src/modules/Personel/hooks/usePersonelForm.ts

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {personelSchema} from '../schema/personelSchema';

export function usePersonelForm(defaultData: any = {}) {
    const formData = {
        adi: defaultData.adi || '',
        soyadi: defaultData.soyadi || '',
        kk: defaultData.tc_kimlik_no || undefined,
        dogum_tarihi: defaultData.dogum_tarihi ? new Date(defaultData.dogum_tarihi) : undefined,
        cinsiyeti: defaultData.cinsiyeti === 'E' ? 'Erkek' : defaultData.cinsiyeti === 'K' ? 'Kadın' : '',
        birim_id: defaultData.birim_id || undefined,
        gorev_id: defaultData.gorev_id || undefined,
        durum_id: defaultData.durum_id || undefined,
        cep_telefonu: defaultData.cep_telefonu || '',
        eposta: defaultData.eposta || '',
        ev_adresi1: defaultData.ev_adresi1 || '',
        web_parolasi: defaultData.web_parolasi || '',
        siralama_kodu: defaultData.siralama_kodu || undefined,
        medeni_hal_kodu: defaultData.medeni_hal_kodu || undefined,
        kadro_turu: defaultData.kadro_turu || undefined,
        kan_grubu_id: defaultData.kan_grubu_id || undefined,

        ...defaultData
    };

    return useForm({
        resolver: zodResolver(personelSchema),
        defaultValues: formData
    });
}