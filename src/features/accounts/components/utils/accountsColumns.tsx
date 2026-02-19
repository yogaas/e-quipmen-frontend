import { BookCopy } from "lucide-react";
import { Badge } from "../../../../components/ui/Badge";
import type { Column } from "../../../../components/common/DataTable";
import type { Account } from "../../accounts.type";
import { TableRowActions } from "../../../../components/common/TableRowActions";

export interface AccountColumnsHandlers {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

/**
 * Returns table column config for Accounts list. Reusable and keeps index.tsx clean.
 */
export function getAccountColumns(
  handlers: AccountColumnsHandlers,
): Column<Account>[] {
  return [
    {
      key: "name_account",
      header: "Account",
      sortable: true,
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 overflow-hidden">
            <BookCopy size={16} />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white leading-tight">
              {u.name_account}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{u.code_account}</p>
          </div>
        </div>
      ),
    },
    {
      key: "level",
      header: "Level",
      sortable: true,
      render: (u) => (
        <Badge variant={u.level ? "info" : "default"}>{u.level}</Badge>
      ),
    },
    {
      key: "normal_pos",
      header: "Normal Pos",
      sortable: true,
      render: (u) => (
        <Badge variant={u.normal_pos == "D" ? "success" : "danger"}>
          {u.normal_pos == "D" ? "DEBET" : "KREDIT"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (u) => (
        <TableRowActions
          onEdit={() => handlers.onEdit(u.id)}
          onDelete={() => handlers.onDelete(u.id)}
          editLabel="Edit Account"
          deleteLabel="Delete Account"
        />
      ),
    },
  ];
}
