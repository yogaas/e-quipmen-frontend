import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Package,
} from "lucide-react";
import { Button } from "../ui/Button";
import getPaginationPages from "../../utils/helpers";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];

  pageIndex: number;
  pageSize: number;
  totalCount: number;
  setSearch: (value: string) => void;
  setSort: (value: string, order: "asc" | "desc") => void;
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange: (pageSize: number) => void;

  sortField?: string;
  sortOrder?: "asc" | "desc";

  onRowClick?: (item: T) => void;

  searchPlaceholder?: string;
  searchKey?: keyof T;
  isLoading?: boolean;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,

  pageIndex,
  pageSize,
  totalCount,
  setSearch,
  setSort,
  onPageChange,
  onPageSizeChange,

  sortField,
  sortOrder,

  searchPlaceholder = "Search...",
  isLoading,
  onRowClick,
}: DataTableProps<T>) {
  const [keywordSearch, setKeywordSearch] = useState("");
  const currentPage = pageIndex + 1;
  const totalPages = Math.ceil(totalCount / pageSize);

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSort(field, order);
  };

  const hanldeSearch = (value: string) => {
    setKeywordSearch(value);
    setSearch(value);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500 dark:text-slate-200 transition-all"
            value={keywordSearch}
            onChange={(e) => hanldeSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="bg-slate-50 dark:bg-slate-800 border-none rounded-md px-2 py-1 focus:ring-1 focus:ring-primary-500"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/30">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`px-6 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer select-none`}
                  onClick={() => col.sortable && handleSort(String(col.key))}
                >
                  <div className="flex items-center gap-1.5">
                    {col.header}
                    {col.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp
                          size={12}
                          className={
                            sortField === col.key && sortOrder === "asc"
                              ? "text-primary-500"
                              : "text-slate-300"
                          }
                        />
                        <ChevronDown
                          size={12}
                          className={
                            sortField === col.key && sortOrder === "desc"
                              ? "text-primary-500"
                              : "text-slate-300"
                          }
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {isLoading ? (
              Array(3)
                .fill(0)
                .map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {columns.map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-full"></div>
                      </td>
                    ))}
                  </tr>
                ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-400"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Package size={40} className="text-gray-300" />
                    <p>No data available.</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={`${item.id}-${index}`}
                  className={`group transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40 ${onRowClick ? "cursor-pointer" : ""}`}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300"
                    >
                      {col.render
                        ? col.render(item)
                        : String(item[col.key as keyof T])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-medium text-slate-900 dark:text-white">
            {(currentPage - 1) * pageSize + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium text-slate-900 dark:text-white">
            {Math.min(currentPage * pageSize, totalCount)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-slate-900 dark:text-white">
            {totalCount}
          </span>{" "}
          results
        </p>

        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            <ChevronLeft size={16} />
          </Button>

          {getPaginationPages(currentPage, totalPages).map((p, i) =>
            p === "..." ? (
              <span key={`ellipsis-${i}`} className="px-2">
                ...
              </span>
            ) : (
              <button
                key={`page-${i}-${p}`}
                onClick={() => onPageChange(p - 1)}
                className={`w-8 h-8 text-xs rounded ${currentPage === p ? "bg-primary-600 text-white" : ""}`}
              >
                {p}
              </button>
            ),
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
