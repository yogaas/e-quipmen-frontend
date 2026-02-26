import { useEffect, useMemo } from "react";
import { UserStar } from "lucide-react";

import { DataTableLookup } from "../../../components/common/DataTableLookUp";
import { useItemsListPage } from "../../items/components/utils/useItemsListPage";
import type { Item } from "../../items/items.type";
import { formatNumberID } from "../../../utils/helpers";

interface LookupItemProps {
  onSelect: (Item: Item[]) => void;
  onClose: (open: boolean) => void;
  isOpen: boolean;
}

export default function LookupItem({
  onSelect,
  onClose,
  isOpen,
}: LookupItemProps) {
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
  } = useItemsListPage();

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: "Item",
        sortable: true,
        render: (u: Item) => (
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 overflow-hidden">
              <UserStar size={16} />
            </div>

            <div>
              <p className="font-semibold text-slate-900 dark:text-white leading-tight">
                {u.name}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{u.unit_sale}</p>
            </div>
          </div>
        ),
      },
      {
        key: "price_sale",
        header: "Price",
        sortable: true,
        render: (u: Item) => (
          <span className="text-slate-700 dark:text-slate-300">
            Rp. {formatNumberID(u.price_sale)}
          </span>
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
    <DataTableLookup<Item>
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
      searchPlaceholder="Find Items..."
      isLoading={loading}
      onRowClick={onSelect}
      isOpenLookup={isOpen}
      onCloseLookup={onClose}
      titleLookup="Select Item"
      selectionMode="multiple"
      lookupsize="2xl"
    />
  );
}
