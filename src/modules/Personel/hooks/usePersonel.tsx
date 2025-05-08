import {useQuery} from '@tanstack/react-query';
import type {AxiosError} from 'axios';
import {apiClient} from "../../../common/api/axiosConfig.ts";

import { PersonelFormData } from "../types/personel.ts"

const fetchPersonel = async (): Promise<PersonelFormData[]> => {
    try {
        const response = await apiClient.get('/personel');
        // API doğrudan dizi döndürüyorsa:
        return Array.isArray(response.data) ? response.data : [];
        // Veya farklı bir property altındaysa (örneğin `items`):
        // return response.data.items || [];
    } catch (err) {
        console.error('Personel çekme hatası:', err);
        return [];
    }
};

// useKisi Hook
export const usePersonel = () =>
    useQuery<PersonelFormData[], AxiosError>({
        queryKey: ['personel'],
        queryFn: fetchPersonel,
        staleTime: 1000 * 60 * 5, // 5 dakika
        retry: 1,
    });
