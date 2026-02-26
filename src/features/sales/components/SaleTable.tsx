import { DataTable } from "../../../components/common/DataTable";
import type { Sale } from "../sales.type";
import { useSalesListPage } from "./utils/useSalesListPage";
import { getSaleColumns } from "./utils/salesColumns";

interface SaleTableProp {
  handleEdit: (id: string) => void;
  openDeleteModal: (id: string) => void;
}

export default function SaleTable({
  handleEdit,
  openDeleteModal,
}: SaleTableProp) {
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
  } = useSalesListPage();

  const columns = getSaleColumns({
    onEdit: handleEdit,
    onDelete: openDeleteModal,
  });

  return (
    <DataTable<Sale>
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
      searchPlaceholder="Find Sales..."
      isLoading={loading}
    />
  );
}
