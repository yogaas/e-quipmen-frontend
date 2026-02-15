import { DataTable } from "../../../components/common/DataTable";
import type { Supplier } from "../suppliers.type";
import { useSuppliersListPage } from "./utils/useSuppliersListPage";
import { getSupplierColumns } from "./utils/suppliersColumns";

interface SupplierTableProp {
  handleEdit: (id: number) => void;
  openDeleteModal: (id: number) => void;
}

export default function SupplierTable({
  handleEdit,
  openDeleteModal,
}: SupplierTableProp) {
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
  } = useSuppliersListPage();

  const columns = getSupplierColumns({
    onEdit: handleEdit,
    onDelete: openDeleteModal,
  });

  return (
    <DataTable<Supplier>
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
      searchPlaceholder="Find Suppliers..."
      isLoading={loading}
    />
  );
}
