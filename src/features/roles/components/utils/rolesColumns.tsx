import type { Column } from "../../../../components/common/DataTable";
import type { Role } from "./../../roles.type";
import { TableRowActions } from "../../../../components/common/TableRowActions";
import { KeyRound } from "lucide-react";

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
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 overflow-hidden">
            <KeyRound size={16} />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white leading-tight">
              {u.role}
            </p>
          </div>
        </div>
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
