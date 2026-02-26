import { useEffect, useMemo } from "react";
import { UserStar } from "lucide-react";

import { DataTableLookup } from "../../../components/common/DataTableLookUp";
import type { Customer } from "../../customers/customers.type";
import { useCustomersListPage } from "../../customers/components/utils/useCustomersListPage";

interface LookupCustomerProps {
  onSelect: (customer: Customer[]) => void;
  onClose: (open: boolean) => void;
  isOpen: boolean;
}

export default function LookupCustomer({
  onSelect,
  onClose,
  isOpen,
}: LookupCustomerProps) {
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
  } = useCustomersListPage();

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: "Customer",
        sortable: true,
        render: (u: Customer) => (
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 overflow-hidden">
              <UserStar size={16} />
            </div>

            <div>
              <p className="font-semibold text-slate-900 dark:text-white leading-tight">
                {u.name}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{u.email}</p>
            </div>
          </div>
        ),
      },
      {
        key: "phone",
        header: "Phone",
        sortable: true,
        render: (u: Customer) => (
          <span className="text-slate-700 dark:text-slate-300">{u.phone}</span>
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
    <DataTableLookup<Customer>
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
      searchPlaceholder="Find Customers..."
      isLoading={loading}
      onRowClick={onSelect}
      isOpenLookup={isOpen}
      onCloseLookup={onClose}
      titleLookup="Select Customer"
      selectionMode="multiple"
      lookupsize="lg"
    />
  );
}
