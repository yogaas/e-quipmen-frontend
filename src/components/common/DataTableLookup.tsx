import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Package,
  X,
  ListTodo,
} from "lucide-react";
import { Button } from "../ui/Button";
import getPaginationPages from "../../utils/helpers";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  footer?: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  children: React.ReactNode;
}

/* ===========================
   MODAL COMPONENT
=========================== */
function ModalDataTable({
  isOpen,
  onClose,
  title,
  maxWidth = "md",
  children,
}: ModalProps) {
  if (!isOpen) return null;

  const widthClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="min-h-screen flex justify-center px-4 py-10">
        <div
          className={`h-fit bg-white dark:bg-slate-900 w-full ${widthClasses[maxWidth]} rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200`}
        >
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

/* ===========================
   MAIN COMPONENT
=========================== */

interface DataTableLookupProps<T> {
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

  onRowClick?: (item: T[]) => void;

  searchPlaceholder?: string;
  isLoading?: boolean;

  isOpenLookup: boolean;
  onCloseLookup: (open: boolean) => void;
  titleLookup: string;

  selectionMode?: "single" | "multiple";
  lookupsize: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export function DataTableLookup<T extends { id: string | number }>({
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
  isOpenLookup,
  onCloseLookup,
  titleLookup,
  selectionMode = "multiple",
  lookupsize = "md",
}: DataTableLookupProps<T>) {
  const [keywordSearch, setKeywordSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<T[]>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [numberPages, setNumberPages] = useState(0);

  const currentPage = pageIndex + 1;
  const totalPages = Math.ceil(totalCount / pageSize);

  /* ===========================
     DERIVED SELECTED ITEMS
  =========================== */
  // const selectedItems = useMemo(
  //   () => data.filter((d) => selectedIds.includes(d)),
  //   [data, selectedIds],
  // );

  /* ===========================
     HANDLERS
  =========================== */

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSort(field, order);
  };

  const handleSearch = (value: string) => {
    setKeywordSearch(value);
    setSearch(value);
  };

  const handleSelect = (item: T) => {
    if (selectionMode === "single") {
      setSelectedIds((prev) => (prev.includes(item) ? [] : [item]));
      return;
    }

    setSelectedIds((prev) =>
      prev.includes(item) ? prev.filter((id) => id !== item) : [...prev, item],
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map((d) => d));
    }
  };

  /* ===========================
     RENDER
  =========================== */

  return (
    <ModalDataTable
      isOpen={isOpenLookup}
      onClose={() => onCloseLookup(false)}
      title={titleLookup}
      maxWidth={lookupsize}
    >
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden">
        {/* SEARCH */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="relative w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500 dark:text-slate-200 transition-all"
              value={keywordSearch}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <th className="px-6 py-3 text-xs">
                  {
                    selectionMode === "multiple" && ""
                    // <input
                    //   type="checkbox"
                    //   onChange={handleSelectAll}
                    //   checked={checkAll}
                    //   className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    // />
                  }
                </th>

                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer select-none"
                    onClick={() => col.sortable && handleSort(String(col.key))}
                  >
                    <div className="flex items-center gap-1">
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
                          <div className="h-4 bg-slate-200 rounded w-full" />
                        </td>
                      ))}
                    </tr>
                  ))
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="py-12 text-center"
                  >
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <Package size={40} />
                      <p>No data available.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr
                    key={`${item.id}-${index}`}
                    className={`transition-all cursor-pointer ${
                      selectedIds.includes(item)
                        ? "bg-blue-100 dark:bg-blue-900/40"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    }`}
                    onClick={() => handleSelect(item)}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item)}
                        onChange={() => handleSelect(item)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>

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
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-center items-center">
          <div className="flex items-center gap-2">
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
                <span key={i} className="px-2">
                  ...
                </span>
              ) : (
                <button
                  key={i}
                  onClick={() => onPageChange(p - 1)}
                  className={`w-8 h-8 text-xs rounded transition ${
                    currentPage === p
                      ? "bg-primary-600 text-white"
                      : "hover:bg-slate-100"
                  }`}
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

      {/* FOOTER BUTTON */}
      <div className="w-full p-4 flex justify-end">
        <Button
          type="button"
          className="gap-2"
          onClick={() => onRowClick?.(selectedIds)}
          disabled={selectedIds.length === 0}
        >
          <ListTodo size={16} />
          {selectedIds.length > 0 && <i>( {selectedIds.length} items )</i>}
          Selected
        </Button>
      </div>
    </ModalDataTable>
  );
}
