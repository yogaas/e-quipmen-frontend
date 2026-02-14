import type { Column } from "../../../../components/common/DataTable";
import type { Role } from "./../../roles.type";
import { TableRowActions } from "../../../../components/common/TableRowActions";

export interface RoleColumnsHandlers {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function getRoleColumns(handlers: RoleColumnsHandlers): Column<Role>[] {
  return [
    {
      key: "role",
      header: "Role",
      sortable: true,
      render: (u) => (
          u.role
      ),
    },
    {
      key: "actions",
      header: "",
      render: (u) => (
        <TableRowActions
          onEdit={() => handlers.onEdit(u.role)}
          onDelete={() => handlers.onDelete(u.role)}
          editLabel="Edit Role"
          deleteLabel="Delete Role"
        />
      ),
    },
  ];
}
