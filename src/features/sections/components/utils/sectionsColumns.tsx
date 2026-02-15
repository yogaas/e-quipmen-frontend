import { Box, Landmark } from "lucide-react";
import { Badge } from "../../../../components/ui/Badge";
import type { Column } from "../../../../components/common/DataTable";
import type { Section } from "../../sections.type";
import { TableRowActions } from "../../../../components/common/TableRowActions";

export interface SectionColumnsHandlers {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

/**
 * Returns table column config for Sections list. Reusable and keeps index.tsx clean.
 */
export function getSectionColumns(
  handlers: SectionColumnsHandlers,
): Column<Section>[] {
  return [
    {
      key: "name",
      header: "Section",
      sortable: true,
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 overflow-hidden">
            <Landmark size={16} />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white leading-tight">
              {u.name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{u.tag}</p>
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
          editLabel="Edit Section"
          deleteLabel="Delete Section"
        />
      ),
    },
  ];
}
