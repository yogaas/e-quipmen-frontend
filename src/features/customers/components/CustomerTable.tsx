import { DataTable } from "../../../components/common/DataTable";
import type { Customer } from "../customers.type";
import { useCustomersListPage } from "./utils/useCustomersListPage";
import { getCustomerColumns } from "./utils/customersColumns";

interface CustomerTableProp {
  handleEdit: (id: number) => void;
  openDeleteModal: (id: number) => void;
}

export default function CustomerTable({
  handleEdit,
  openDeleteModal,
}: CustomerTableProp) {
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

  const columns = getCustomerColumns({
    onEdit: handleEdit,
    onDelete: openDeleteModal,
  });

  return (
    <DataTable<Customer>
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
    />
  );
}
