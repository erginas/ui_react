// src/modules/Product/hooks/useProducts.tsx
import {useQuery} from '@tanstack/react-query';
import type {Product} from '../types';
import {apiClient} from "../../../../common/api/axiosConfig.ts";
import {AxiosError} from "axios";

const fetchProducts = async (): Promise<Product[]> => {
    const {data} = await apiClient.get<Product[]>('/products');
    return data;
};

export const useProducts = () => {
    return useQuery<Product[], AxiosError>({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
};