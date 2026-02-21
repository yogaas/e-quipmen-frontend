import { DataTable } from "../../../components/common/DataTable";
import type { Section } from "../sections.type";
import { useSectionsListPage } from "./utils/useSectionsListPage";
import { getSectionColumns } from "./utils/sectionsColumns";

interface SectionTableProp {
  handleEdit: (id: number) => void;
  openDeleteModal: (id: number) => void;
}

export default function SectionTable({
  handleEdit,
  openDeleteModal,
}: SectionTableProp) {
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

  const columns = getSectionColumns({
    onEdit: handleEdit,
    onDelete: openDeleteModal,
  });

  return (
    <DataTable<Section>
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
    />
  );
}
