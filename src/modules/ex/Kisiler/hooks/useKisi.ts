// src/modules/User/hooks/useUsers.tsx
import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import type {Kisi} from '../types';
import {apiClient} from "../../../../common/api/axiosConfig.ts";

// FastAPI yanıtını ({ data: User[]; count: number }) tipini bildiriyoruz
interface KisiResponse {
    data: Kisi[];
    count: number;
}

const fetchKisiler = async (): Promise<Kisi[]> => {
    const response = await apiClient.get<KisiResponse>('/kisiler');
    console.log("kisiler", response.data.data)
    return response.data.data;
};

export const useKisi = () => {
    return useQuery<Kisi[], AxiosError>({
        queryKey: ['kisiler'],
        queryFn: fetchKisiler,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
    console.log()
};
