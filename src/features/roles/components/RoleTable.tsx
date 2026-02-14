import { DataTable } from "../../../components/common/DataTable";
import type { Role } from "../roles.type";
import { useRolesListPage } from "./utils/useUsersListPage";
import { getRoleColumns } from "./utils/rolesColumns";

interface RoleTableProp {
  handleEdit : (id : string) => void
  openDeleteModal : (id : string) => void
}

export default function RoleTable({handleEdit, openDeleteModal} : RoleTableProp) {

  const listPage = useRolesListPage();

  const columns = getRoleColumns({
    onEdit: handleEdit,
    onDelete: openDeleteModal,
  });

  return (
    <DataTable<Role>
      data={listPage.list}
      columns={columns}
      pageIndex={listPage.pageIndex}
      pageSize={listPage.pageSize}
      totalCount={listPage.totalCount}
      setSearch={listPage.onSearch}
      setSort={listPage.onSort}
      onPageChange={listPage.onPageChange}
      onPageSizeChange={listPage.onPageSizeChange}
      sortOrder={listPage.sortOrder}
      sortField={listPage.orderByFieldName}
      searchPlaceholder="Find Roles..."
      isLoading={listPage.loading}
    />
  );
}
