import { UserIcon } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import type { Column } from '../../components/common/DataTable'
import type { User } from './users.type'
import { formatDate } from '../../utils/helpers'
import { TableRowActions } from '../../components/common/TableRowActions'

export interface UserColumnsHandlers {
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

/**
 * Returns table column config for Users list. Reusable and keeps index.tsx clean.
 */
export function getUserColumns(handlers: UserColumnsHandlers): Column<User>[] {
  return [
    {
      key: 'name',
      header: 'User',
      sortable: true,
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 overflow-hidden">
            <UserIcon size={16} />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white leading-tight">{u.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (u) => <Badge variant="default">{u.name}</Badge>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (u) => <Badge variant="danger">{u.name}</Badge>,
    },
    {
      key: 'created_at',
      header: 'Joined',
      sortable: true,
      render: (u) => (
        <span className="text-slate-500 text-xs">{formatDate(u.created_at)}</span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (u) => (
        <TableRowActions
          onEdit={() => handlers.onEdit(u.id)}
          onDelete={() => handlers.onDelete(u.id)}
          editLabel="Edit user"
          deleteLabel="Delete user"
        />
      ),
    },
  ]
}
