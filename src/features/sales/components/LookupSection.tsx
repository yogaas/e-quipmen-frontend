import { useEffect, useMemo } from "react";
import { UserStar } from "lucide-react";

import { DataTableLookup } from "../../../components/common/DataTableLookUp";
import { useSectionsListPage } from "../../sections/components/utils/useSectionsListPage";
import type { Section } from "../../sections/sections.type";
import { Badge } from "../../../components/ui/Badge";

interface LookupSectionProps {
  onSelect: (section: Section[]) => void;
  onClose: (open: boolean) => void;
  isOpen: boolean;
}

export default function LookupSection({
  onSelect,
  onClose,
  isOpen,
}: LookupSectionProps) {
  const {
    list,
    loading,
    pageIndex,
    pageSize,
    totalCount,
    orderByFieldName,
    sortOrder,
    onSearch,
    onSort,
    onPageChange,
    onPageSizeChange,
  } = useSectionsListPage();

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: "Section",
        sortable: true,
        render: (u: Section) => (
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 overflow-hidden">
              <UserStar size={16} />
            </div>

            <div>
              <p className="font-semibold text-slate-900 dark:text-white leading-tight">
                {u.name}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{u.tag}</p>
            </div>
          </div>
        ),
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
        render: (u) => (
          <Badge variant={u.active ? "success" : "danger"}>
            {u.active ? "Active" : "Inactive"}
          </Badge>
        ),
      },
    ],
    [],
  );

  useEffect(() => {
    if (isOpen && pageSize !== 5) {
      onPageSizeChange(5);
    }
  }, [isOpen, onPageSizeChange]);

  return (
    <DataTableLookup<Section>
      data={list}
      columns={columns}
      pageIndex={pageIndex}
      pageSize={pageSize}
      totalCount={totalCount}
      setSearch={onSearch}
      setSort={onSort}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sortOrder={sortOrder}
      sortField={orderByFieldName}
      searchPlaceholder="Find Sections..."
      isLoading={loading}
      onRowClick={onSelect}
      isOpenLookup={isOpen}
      onCloseLookup={onClose}
      titleLookup="Select Section"
      selectionMode="single"
      lookupsize="lg"
    />
  );
}
