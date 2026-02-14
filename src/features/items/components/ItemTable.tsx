import { DataTable } from "../../../components/common/DataTable";
import type { Item } from "../items.type";
import { useItemsListPage } from "./utils/useItemsListPage";
import { getItemColumns } from "./utils/itemsColumns";

interface ItemTableProp {
  handleEdit: (id: number) => void;
  openDeleteModal: (id: number) => void;
}

export default function ItemTable({
  handleEdit,
  openDeleteModal,
}: ItemTableProp) {
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

  const columns = getItemColumns({
    onEdit: handleEdit,
    onDelete: openDeleteModal,
  });

  return (
    <DataTable<Item>
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
    />
  );
}
