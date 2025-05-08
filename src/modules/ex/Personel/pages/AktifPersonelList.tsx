import React from "react";
import {apiClient} from "../../../../common/api/axiosConfig.ts";
import {DataTable} from "../../../../common/components/ui/DataTable.tsx";


export default function AktifPersonelList() {
    const [filters, setFilters] = React.useState({});

    const columns = [
        { header: "Ad", accessorKey: "adi" },
        { header: "Soyad", accessorKey: "soyadi" },
        { header: "TC Kimlik No", accessorKey: "tc_kimlik_no" },
        { header: "Birim", accessorKey: "birim_adi" },
        { header: "Unvan", accessorKey: "unvan_adi" },
        {
            header: "İşe Başlama",
            accessorKey: "ise_baslama_tarihi",
            cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
        },
    ];

    const fetchData = async ({ pageIndex, pageSize, globalFilter, filters, sortBy, sortOrder }) => {
        const response = await apiClient.get("/personel", {
            params: {
                durum: "aktif",
                page: pageIndex,
                size: pageSize,
                search: globalFilter,
                sortBy,
                sortOrder,
                ...filters,
            },
        });

        return {
            data: response.data.items,
            total: response.data.total,
        };
    };

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-4 text-gray-700">Aktif Personel Listesi</h1>

            {/* Filtre Barı */}
            <div className="flex gap-4">
                <select
                    className="border rounded px-2 py-1"
                    onChange={(e) => setFilters(prev => ({ ...prev, birim_id: e.target.value || undefined }))}
                >
                    <option value="">Tüm Birimler</option>
                    <option value="1">Muhasebe</option>
                    <option value="2">Satın Alma</option>
                </select>

                <select
                    className="border rounded px-2 py-1"
                    onChange={(e) => setFilters(prev => ({ ...prev, unvan_id: e.target.value || undefined }))}
                >
                    <option value="">Tüm Unvanlar</option>
                    <option value="1">Uzman</option>
                    <option value="2">Şef</option>
                </select>

                <select
                    className="border rounded px-2 py-1"
                    onChange={(e) => setFilters(prev => ({ ...prev, brans_id: e.target.value || undefined }))}
                >
                    <option value="">Tüm Branşlar</option>
                    <option value="1">İK</option>
                    <option value="2">Finans</option>
                </select>
            </div>

            <DataTable
                columns={columns}
                fetchData={fetchData}
                queryKey="aktifPersonel"
                initialPageSize={20}
                filters={filters}
            />
        </div>
    );
}
