import { UserSearch } from "lucide-react";
import type { Column } from "../../../../components/common/DataTable";
import type { Supplier } from "../../suppliers.type";
import { TableRowActions } from "../../../../components/common/TableRowActions";

export interface SupplierColumnsHandlers {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

/**
 * Returns table column config for Suppliers list. Reusable and keeps index.tsx clean.
 */
export function getSupplierColumns(
  handlers: SupplierColumnsHandlers,
): Column<Supplier>[] {
  return [
    {
      key: "name",
      header: "Supplier",
      sortable: true,
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 overflow-hidden">
            <UserSearch size={16} />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white leading-tight">
              {u.name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      sortable: true,
      render: (u) => u.phone,
    },
    {
      key: "company",
      header: "Company",
      sortable: true,
      render: (u) => u.company,
    },
    {
      key: "actions",
      header: "",
      render: (u) => (
        <TableRowActions
          onEdit={() => handlers.onEdit(u.id)}
          onDelete={() => handlers.onDelete(u.id)}
          editLabel="Edit Supplier"
          deleteLabel="Delete Supplier"
        />
      ),
    },
  ];
}
