import { Edit, Eye, Printer, Trash2 } from "lucide-react";

interface TableRowActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  onShow?: () => void;
  onPrint?: () => void;
  editLabel?: string;
  deleteLabel?: string;
  showLabel?: string | null;
  printLabel?: string | null;
}

/**
 * Reusable Edit + Delete action buttons for CRUD table rows.
 */
export function TableRowActions({
  onEdit,
  onDelete,
  editLabel = "Edit",
  deleteLabel = "Delete",
  onShow = () => {},
  showLabel = null,
  onPrint = () => {},
  printLabel = null,
}: TableRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      {printLabel && (
        <button
          type="button"
          onClick={onPrint}
          aria-label={printLabel}
          className="p-2 hover:bg-blue-50 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
        >
          <Printer size={16} />
        </button>
      )}

      {showLabel && (
        <button
          type="button"
          onClick={onShow}
          aria-label={showLabel}
          className="p-2 hover:bg-blue-50 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
        >
          <Eye size={16} />
        </button>
      )}

      <button
        type="button"
        onClick={onEdit}
        aria-label={editLabel}
        className="p-2 hover:bg-green-50 hover:text-green-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
      >
        <Edit size={16} />
      </button>
      <button
        type="button"
        onClick={onDelete}
        aria-label={deleteLabel}
        className="p-2 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20 rounded-lg text-slate-400 transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
