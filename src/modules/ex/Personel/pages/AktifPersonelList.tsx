import {useNavigate} from "react-router-dom";
import React from "react";
import * as XLSX from "xlsx";
import {saveAs} from "file-saver";
import {apiClient} from "../../../../common/api/axiosConfig.ts";
import {DataTable} from "../../../../common/components/ui/DataTable.tsx";

const STORAGE_KEY = "aktif_personel_columns";

export default function AktifPersonelList() {
    const [filters, setFilters] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [showColumnMenu, setShowColumnMenu] = React.useState(false);
    const navigate = useNavigate();

    const defaultColumns = [
        {header: "Ad", accessorKey: "adi", visible: true},
        {header: "Soyad", accessorKey: "soyadi", visible: true},
        {header: "TC Kimlik No", accessorKey: "tc_kimlik_no", visible: true},
        {header: "Birim", accessorKey: "birim_adi", visible: true},
        {header: "Unvan", accessorKey: "unvan_adi", visible: true},
        {
            header: "İşe Başlama",
            accessorKey: "ise_baslama_tarihi",
            visible: true,
            cell: ({getValue}) => new Date(getValue()).toLocaleDateString(),
        },
    ];

    const [columns, setColumns] = React.useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : defaultColumns;
    });

    const updateColumnLayout = (newCols) => {
        setColumns(newCols);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newCols));
    };

    const fetchData = async ({pageIndex, pageSize, globalFilter, filters, sortBy, sortOrder}) => {
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

    const handleExportAll = async () => {
        const response = await apiClient.get("/personel/export", {
            params: {
                durum: "aktif",
                search: globalFilter,
                ...filters,
            },
        });
        const worksheet = XLSX.utils.json_to_sheet(response.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "AktifPersonel");
        const excelBuffer = XLSX.write(workbook, {bookType: "xlsx", type: "array"});
        const file = new Blob([excelBuffer], {type: "application/octet-stream"});
        saveAs(file, "aktif_personel_tumu.xlsx");
    };

    const moveColumn = (index, direction) => {
        const newCols = [...columns];
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newCols.length) return;
        [newCols[index], newCols[targetIndex]] = [newCols[targetIndex], newCols[index]];
        updateColumnLayout(newCols);
    };

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-4 text-gray-700">Aktif Personel Listesi</h1>

            <div className="flex flex-wrap items-end gap-4 bg-gray-50 p-4 rounded-md shadow relative">
                <input
                    type="text"
                    placeholder="Ad, Soyad veya TC Kimlik No..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring focus:border-blue-400"
                />

                <select
                    value={filters.birim_id || ""}
                    className="border border-gray-300 rounded px-3 py-2"
                    onChange={(e) => setFilters(prev => ({...prev, birim_id: e.target.value || undefined}))}
                >
                    <option value="">Tüm Birimler</option>
                    <option value="1">Muhasebe</option>
                    <option value="2">Satın Alma</option>
                </select>

                <select
                    value={filters.unvan_id || ""}
                    className="border border-gray-300 rounded px-3 py-2"
                    onChange={(e) => setFilters(prev => ({...prev, unvan_id: e.target.value || undefined}))}
                >
                    <option value="">Tüm Unvanlar</option>
                    <option value="1">Uzman</option>
                    <option value="2">Şef</option>
                </select>

                <select
                    value={filters.brans_id || ""}
                    className="border border-gray-300 rounded px-3 py-2"
                    onChange={(e) => setFilters(prev => ({...prev, brans_id: e.target.value || undefined}))}
                >
                    <option value="">Tüm Branşlar</option>
                    <option value="1">İK</option>
                    <option value="2">Finans</option>
                </select>

                <button
                    onClick={() => setShowColumnMenu(prev => !prev)}
                    className="ml-auto bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                    🧩 Kolon Ayarları
                </button>

                {showColumnMenu && (
                    <div className="absolute top-full right-0 mt-2 bg-white border rounded shadow p-4 z-10 w-64">
                        <h4 className="font-semibold mb-2 text-gray-700">Kolonları Göster/Gizle</h4>
                        {columns.map((col, index) => (
                            <div key={col.accessorKey} className="flex items-center justify-between py-1">
                                <label className="flex items-center gap-2 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={col.visible !== false}
                                        onChange={() => {
                                            const updated = columns.map(c =>
                                                c.accessorKey === col.accessorKey ? {...c, visible: !c.visible} : c
                                            );
                                            updateColumnLayout(updated);
                                        }}
                                    />
                                    {col.header}
                                </label>
                                <div className="flex gap-1 text-gray-400">
                                    <button onClick={() => moveColumn(index, "up")}><FaArrowUp size={12}/></button>
                                    <button onClick={() => moveColumn(index, "down")}><FaArrowDown size={12}/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <DataTable
                columns={columns.filter(col => col.visible !== false)}
                fetchData={fetchData}
                queryKey="aktifPersonel"
                initialPageSize={20}
                filters={filters}
                globalFilter={globalFilter}
                onColumnChange={updateColumnLayout}
                onExportAll={handleExportAll}
                onRowClick={(row) => navigate(`/personel/${row.original.id}`)}
            />
        </div>
    );
}

