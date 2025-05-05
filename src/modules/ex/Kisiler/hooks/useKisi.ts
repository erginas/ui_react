// src/modules/User/hooks/useKisi.tsx
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { Kisi } from '../types';
import {apiClient} from "../../../../common/api/axiosConfig.ts";


// Fetch fonksiyonu: her koşulda dizi döndürür
const fetchKisiler = async (): Promise<Kisi[]> => {
  try {
    const response = await apiClient.get('/kisiler');
    // API doğrudan dizi döndürüyorsa:
    return Array.isArray(response.data) ? response.data : [];
    // Veya farklı bir property altındaysa (örneğin `items`):
    // return response.data.items || [];
  } catch (err) {
    console.error('Kişi çekme hatası:', err);
    return [];
  }
};

// useKisi Hook
export const useKisi = () =>
  useQuery<Kisi[], AxiosError>({
    queryKey: ['kisiler'],
    queryFn: fetchKisiler,
    staleTime: 1000 * 60 * 5, // 5 dakika
    retry: 1,
  });
