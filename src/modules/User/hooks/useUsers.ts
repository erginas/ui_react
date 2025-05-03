// src/modules/User/hooks/useUsers.tsx
import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import type {User} from '../types';
import {apiClient} from "../../../common/api/axiosConfig.ts";

// FastAPI yanıtını ({ data: User[]; count: number }) tipini bildiriyoruz
interface UsersResponse {
    data: User[];
    count: number;
}

const fetchUsers = async (): Promise<User[]> => {
    const response = await apiClient.get<UsersResponse>('/users');
    return response.data.data;
};

export const useUsers = () => {
    return useQuery<User[], AxiosError>({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
};
