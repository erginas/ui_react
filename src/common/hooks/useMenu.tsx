// hooks/useMenu.tsx
import {useQuery} from '@tanstack/react-query';
import {apiClient} from '../api/axiosConfig';

export const useMenu = (role: string) => {
    return useQuery({
        queryKey: ['menu', role],
        queryFn: async () => {
            const res = await apiClient.get('/menu', {
                params: {role}
            });
            return res.data;
        },
        enabled: !!role,
        staleTime: 1000 * 60 * 5, // 5 dakika cache
    });
};
