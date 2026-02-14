import { Box } from "lucide-react";
import { Badge } from "../../../../components/ui/Badge";
import type { Column } from "../../../../components/common/DataTable";
import type { Category } from "../../categories.type";
import { formatDate } from "../../../../utils/helpers";
import { TableRowActions } from "../../../../components/common/TableRowActions";

export interface CategoryColumnsHandlers {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

/**
 * Returns table column config for Categorys list. Reusable and keeps index.tsx clean.
 */
export function getCategoryColumns(
  handlers: CategoryColumnsHandlers,
): Column<Category>[] {
  return [
    {
      key: "name",
      header: "Category",
      sortable: true,
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 overflow-hidden">
            <Box size={16} />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white leading-tight">
              {u.category}
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
          onEdit={() => handlers.onEdit(u.id)}
          onDelete={() => handlers.onDelete(u.id)}
          editLabel="Edit Category"
          deleteLabel="Delete Category"
        />
      ),
    },
  ];
}
