// src/common/hooks/useMenu.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/axiosConfig';

export interface MenuItem {
  id: number;
  label: string;
  to_path: string;
  module_key?: string;
  parent_id?: number | null;
  icon_name?: string;
  roles?: string;
}

export const useMenu = (role: string) => {
  return useQuery<MenuItem[]>({
    queryKey: ['menu', role],
    queryFn: async () => {
      const res = await apiClient.get('/menu', { params: { role } });
      return res.data;
    },
  });
};
