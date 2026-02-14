import { DataTable } from "../../../components/common/DataTable";
import type { User } from "../users.type";
import { useUsersListPage } from "../useUsersListPage";
import { getUserColumns } from "../usersColumns";

interface UserTableProp {
  handleEdit : (id : number) => void
  openDeleteModal : (id : number) => void
}

export default function UserTable({handleEdit, openDeleteModal} : UserTableProp) {

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
  } = useUsersListPage();

  const columns = getUserColumns({
    onEdit: handleEdit,
    onDelete: openDeleteModal,
  });

  return (
        <DataTable<User>
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
          searchPlaceholder="Find users..."
          isLoading={loading}
        />
  );
}
