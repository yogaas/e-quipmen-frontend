import { Box } from "lucide-react";
import { Badge } from "../../../../components/ui/Badge";
import type { Column } from "../../../../components/common/DataTable";
import type { Item } from "../../items.type";
import { TableRowActions } from "../../../../components/common/TableRowActions";

export interface ItemColumnsHandlers {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

/**
 * Returns table column config for Items list. Reusable and keeps index.tsx clean.
 */
export function getItemColumns(handlers: ItemColumnsHandlers): Column<Item>[] {
  return [
    {
      key: "name",
      header: "Item",
      sortable: true,
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 overflow-hidden">
            <Box size={16} />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white leading-tight">
              {u.name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Satuan Beli : {u.unit_purchase} Satuan Jual : {u.unit_sale}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (u) => (
        <Badge variant={u.active ? "success" : "danger"}>
          {u.active ? "Active" : "Inactive"}
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
          editLabel="Edit Item"
          deleteLabel="Delete Item"
        />
      ),
    },
  ];
}
