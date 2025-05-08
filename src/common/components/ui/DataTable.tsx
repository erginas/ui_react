import React from "react";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {useQuery} from "@tanstack/react-query";
import * as XLSX from "xlsx";
import {saveAs} from "file-saver";

export function DataTable({
                              columns,
                              fetchData,
                              queryKey,
                              initialPageSize = 10,
                              filters = {},
                              globalFilter = "",
                              onColumnChange,
                              onExportAll,
                              onRowClick,
                              columnMenuState,
                              setGlobalFilter,
                              setFilters,
                          }) {
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(initialPageSize);
    const [sortBy, setSortBy] = React.useState("");
    const [sortOrder, setSortOrder] = React.useState("asc");

    const {data, isLoading} = useQuery({
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
            pagination: {pageIndex, pageSize},
        },
        manualPagination: true,
        manualSorting: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: (updater) => {
            const newState = typeof updater === "function" ? updater({pageIndex, pageSize}) : updater;
            setPageIndex(newState.pageIndex);
            setPageSize(newState.pageSize);
        },
    });

    const handleExportVisible = () => {
        const worksheet = XLSX.utils.json_to_sheet(table.getRowModel().rows.map(row => row.original));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        const excelBuffer = XLSX.write(workbook, {bookType: "xlsx", type: "array"});
        const file = new Blob([excelBuffer], {type: "application/octet-stream"});
        saveAs(file, "visible_data.xlsx");
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <input
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter?.(e.target.value)}
                    placeholder="Ara..."
                    className="border rounded px-2 py-1 w-64"
                />
                <div className="flex gap-2">
                    <button onClick={handleExportVisible} className="bg-gray-100 px-3 py-1 rounded">📄 Görüneni Aktar
                    </button>
                    <button onClick={onExportAll}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">📥 Tümünü Aktar
                    </button>
                </div>
            </div>

            <table className="min-w-full border border-gray-300 text-sm">
                <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="bg-gray-100">
                        {headerGroup.headers.map((header) => (
                            <th key={header.id} className="border px-3 py-2 text-left cursor-pointer" onClick={() => {
                                const newOrder = sortBy === header.column.id && sortOrder === "asc" ? "desc" : "asc";
                                setSortBy(header.column.id);
                                setSortOrder(newOrder);
                            }}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {sortBy === header.column.id && (sortOrder === "asc" ? " ▲" : " ▼")}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {isLoading ? (
                    <tr>
                        <td colSpan={columns.length} className="text-center py-4">Yükleniyor...</td>
                    </tr>
                ) : table.getRowModel().rows.length === 0 ? (
                    <tr>
                        <td colSpan={columns.length} className="text-center py-4">Kayıt bulunamadı.</td>
                    </tr>
                ) : (
                    table.getRowModel().rows.map(row => (
                        <tr
                            key={row.id}
                            className="even:bg-gray-50 hover:bg-yellow-50 cursor-pointer"
                            onClick={() => onRowClick?.(row)}
                        >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="border px-3 py-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))
                )}
                </tbody>
            </table>

            <div className="flex justify-between items-center pt-2">
                <div className="space-x-2">
                    <button onClick={() => setPageIndex(0)} disabled={pageIndex === 0}
                            className="border px-2 py-1 rounded">İlk
                    </button>
                    <button onClick={() => setPageIndex(old => Math.max(old - 1, 0))} disabled={pageIndex === 0}
                            className="border px-2 py-1 rounded">Geri
                    </button>
                    <button onClick={() => setPageIndex(old => old + 1)} className="border px-2 py-1 rounded">İleri
                    </button>
                </div>
                <select
                    className="border rounded px-2 py-1"
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
    );
}