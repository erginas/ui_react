import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personelSchema } from '../schema/personelSchema';
import {PersonelFormData} from "../types/personel.ts";

export function usePersonelForm(defaultValues?: Partial<PersonelFormData>) {
    return useForm<PersonelFormData>({
        resolver: zodResolver(personelSchema),
        defaultValues: {
            adi: '',
            soyadi: '',
            kk: undefined,
            kts: new Date(), // Varsayılan olarak bugünün tarihi
            ...defaultValues,
        },
    });
}