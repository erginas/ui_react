import {Personel} from "../types/types.ts";
import {useQuery} from '@tanstack/react-query';
import type {AxiosError} from 'axios';
import {apiClient} from "../../../../common/api/axiosConfig.ts";
//
// export default function usePersonel() {
//   const [veri, setVeri] = useState<Personel[]>([]);
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => {
//     fetch("http://localhost:8000/personel")
//       .then((res) => res.json())
//       .then((data) => {
//         setVeri(data);
//         setLoading(false);
//       });
//   }, []);
//
//   return { veri, loading };
// }
// src/modules/User/hooks/useKisi.tsx


// Fetch fonksiyonu: her koşulda dizi döndürür
const fetchPersonel = async (): Promise<Personel[]> => {
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
    useQuery<Personel[], AxiosError>({
        queryKey: ['personel'],
        queryFn: fetchPersonel,
        staleTime: 1000 * 60 * 5, // 5 dakika
        retry: 1,
    });
