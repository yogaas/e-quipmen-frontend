import { DataTable } from "../../../components/common/DataTable";
import type { Category } from "../categories.type";
import { useCategorysListPage } from "./utils/useCategoriesListPage";
import { getCategoryColumns } from "./utils/categoriesColumns";

interface CategoryTableProp {
  handleEdit: (id: number) => void;
  openDeleteModal: (id: number) => void;
}

export default function CategoryTable({
  handleEdit,
  openDeleteModal,
}: CategoryTableProp) {
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
  } = useCategorysListPage();

  const columns = getCategoryColumns({
    onEdit: handleEdit,
    onDelete: openDeleteModal,
  });

  return (
    <DataTable<Category>
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
      searchPlaceholder="Find Categorys..."
      isLoading={loading}
    />
  );
}
