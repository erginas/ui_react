import {useQuery} from "@tanstack/react-query";
import {apiClient} from "../../../../common/api/axiosConfig.ts";

type DogumGunu = { id: number; adi: string; soyadi: string };
type Hatirlatma = { tur: string; id: number; ad: string; soyad: string };

export interface DashboardData {
    toplam_personel: number;
    aktif_personel: number;
    ayrilan_personel: number;
    birim_personel_sayisi: Record<string, { aktif: number; ayrilan: number }>;
    dogum_gunu_olanlar: DogumGunu[];
    hatirlatmalar: Hatirlatma[];
}

const fetchDashboard = async (): Promise<DashboardData> => {
    const response = await apiClient.get("/dashboard/personel");
    return response.data;
};

export const useDashboard = () =>
    useQuery<DashboardData>({
        queryKey: ["dashboard"],
        queryFn: fetchDashboard,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
