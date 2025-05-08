import React, { useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

interface DataTableProps<T extends object> {
    columns: any[];
    queryKey: string;
    fetchData: (params: {
        pageIndex: number;
        pageSize: number;
        filters: Record<string, any>;
        globalFilter: string;
        sortBy: string;
        sortOrder: "asc" | "desc";
    }) => Promise<{ data: T[]; total: number }>;
    initialPageSize?: number;
}

export function DataTable<T extends object>({ columns, queryKey, fetchData, initialPageSize = 10 }: DataTableProps<T>) {
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(initialPageSize);
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [filters, setFilters] = React.useState<Record<string, any>>({});
    const [sortBy, setSortBy] = React.useState("");
    const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

    const { data, isLoading } = useQuery({
        queryKey: [queryKey, pageIndex, pageSize, filters, globalFilter, sortBy, sortOrder],
        queryFn: () =>
            fetchData({
                pageIndex,
                pageSize,
                filters,
                globalFilter,
                sortBy,
                sortOrder,
            }),
        keepPreviousData: true,
    });

    const table = useReactTable({
        data: data?.data || [],
        columns,
        pageCount: Math.ceil((data?.total || 0) / pageSize),
        state: {
            pagination: { pageIndex, pageSize },
        },
        manualPagination: true,
        manualSorting: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: (updater) => {
            const newState = typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater;
            setPageIndex(newState.pageIndex);
            setPageSize(newState.pageSize);
        },
    });

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(data?.data || []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const file = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(file, "table_data.xlsx");
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Ara..."
                    className="border rounded px-2 py-1"
                />
                <button onClick={handleExport} className="bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700">
                    Excel'e Aktar
                </button>
            </div>

            <table className="min-w-full border border-gray-200">
                <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id} className="border px-4 py-2 text-left">
                                {header.isPlaceholder ? null : (
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => {
                                            const newOrder = sortBy === header.column.id && sortOrder === "asc" ? "desc" : "asc";
                                            setSortBy(header.column.id);
                                            setSortOrder(newOrder);
                                        }}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {sortBy === header.column.id && (sortOrder === "asc" ? " ▲" : " ▼")}
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {isLoading ? (
                    <tr><td colSpan={columns.length} className="text-center py-4">Yükleniyor...</td></tr>
                ) : table.getRowModel().rows.length === 0 ? (
                    <tr><td colSpan={columns.length} className="text-center py-4">Kayıt bulunamadı.</td></tr>
                ) : (
                    table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="even:bg-gray-50">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="border px-4 py-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))
                )}
                </tbody>
            </table>

            <div className="flex items-center justify-between pt-2">
                <div className="space-x-2">
                    <button onClick={() => setPageIndex(0)} disabled={pageIndex === 0} className="border px-2 py-1 rounded">
                        İlk
                    </button>
                    <button onClick={() => setPageIndex(old => Math.max(old - 1, 0))} disabled={pageIndex === 0} className="border px-2 py-1 rounded">
                        Geri
                    </button>
                    <button onClick={() => setPageIndex(old => old + 1)} className="border px-2 py-1 rounded">
                        İleri
                    </button>
                </div>
                <div>
                    Sayfa Boyutu:
                    <select
                        className="ml-2 border rounded px-2 py-1"
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setPageIndex(0);
                        }}
                    >
                        {[10, 20, 50, 100].map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
