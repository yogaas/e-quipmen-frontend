import { CreditCard } from "lucide-react";
import { Badge } from "../../../../components/ui/Badge";
import type { Column } from "../../../../components/common/DataTable";
import type { Payment } from "../../payments.type";
import { TableRowActions } from "../../../../components/common/TableRowActions";

export interface PaymentColumnsHandlers {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

/**
 * Returns table column config for Payments list. Reusable and keeps index.tsx clean.
 */
export function getPaymentColumns(
  handlers: PaymentColumnsHandlers,
): Column<Payment>[] {
  return [
    {
      key: "name",
      header: "Payment",
      sortable: true,
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 overflow-hidden">
            <CreditCard size={16} />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white leading-tight">
              {u.paymen}
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
        <Badge variant={u.type_transaction == "SALES" ? "success" : "danger"}>
          {u.type_transaction == "SALES" ? "SALES" : "PURCHASE"}
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
          editLabel="Edit Payment"
          deleteLabel="Delete Payment"
        />
      ),
    },
  ];
}
