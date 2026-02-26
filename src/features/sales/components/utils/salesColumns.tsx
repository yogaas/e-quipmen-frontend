import { Landmark, UserStar } from "lucide-react";
import { Badge } from "../../../../components/ui/Badge";
import type { Column } from "../../../../components/common/DataTable";
import type { Sale } from "../../sales.type";
import { TableRowActions } from "../../../../components/common/TableRowActions";
import { formatNumberID } from "../../../../utils/helpers";

export interface SaleColumnsHandlers {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * Returns table column config for Sales list. Reusable and keeps index.tsx clean.
 */
export function getSaleColumns(handlers: SaleColumnsHandlers): Column<Sale>[] {
  return [
    {
      key: "name",
      header: "Code & Date",
      sortable: true,
      render: (u) => (
        <div className="flex items-center gap-3">
          <div>
            <p className="font-semibold text-slate-900 dark:text-white leading-tight">
              {u.unique_code}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{u.time_created}</p>
          </div>
        </div>
      ),
    },
    {
      key: "section_id",
      header: "Section",
      sortable: true,
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 overflow-hidden">
            <Landmark size={16} />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white leading-tight">
              {u.section?.name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{u.section?.tag}</p>
          </div>
        </div>
      ),
    },
    {
      key: "customer_id",
      header: "Customer",
      sortable: true,
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 overflow-hidden">
            <UserStar size={16} />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white leading-tight">
              {u.customer?.name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{u.customer?.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "total_price",
      header: "Total Price",
      sortable: true,
      render: (u) => (
        <span className="font-medium text-right w-full block">
          Rp. {formatNumberID(u.total_price)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (u) => (
        <Badge variant={u.status_cancel == 1 ? "success" : "danger"}>
          {u.status_cancel == 1 ? "Paid" : "Unpaid"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (u) => (
        <TableRowActions
          onEdit={() => handlers.onEdit(u.unique_code)}
          onDelete={() => handlers.onDelete(u.unique_code)}
          editLabel="Edit Sale"
          deleteLabel="Delete Sale"
        />
      ),
    },
  ];
}
