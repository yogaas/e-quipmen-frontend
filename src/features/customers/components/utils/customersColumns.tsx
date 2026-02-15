import { UserStar } from "lucide-react";
import type { Column } from "../../../../components/common/DataTable";
import type { Customer } from "../../customers.type";
import { TableRowActions } from "../../../../components/common/TableRowActions";

export interface CustomerColumnsHandlers {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

/**
 * Returns table column config for Customers list. Reusable and keeps index.tsx clean.
 */
export function getCustomerColumns(
  handlers: CustomerColumnsHandlers,
): Column<Customer>[] {
  return [
    {
      key: "name",
      header: "Customer",
      sortable: true,
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 overflow-hidden">
            <UserStar size={16} />
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
      key: "address",
      header: "Address",
      sortable: true,
      render: (u) => u.address,
    },
    {
      key: "actions",
      header: "",
      render: (u) => (
        <TableRowActions
          onEdit={() => handlers.onEdit(u.id)}
          onDelete={() => handlers.onDelete(u.id)}
          editLabel="Edit Customer"
          deleteLabel="Delete Customer"
        />
      ),
    },
  ];
}
