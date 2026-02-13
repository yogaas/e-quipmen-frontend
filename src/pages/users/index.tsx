import {  useEffect, useState } from 'react';
import { Edit, Plus, RefreshCw, Trash2, UserIcon, } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { DataTable } from '../../components/common/DataTable';
import type { Column } from '../../components/common/DataTable';
import type { User } from '../../features/users/users.type';
import {
  setSort,
  setSearch,
  fetchUsers,
  setPagination,
  deleteUserThunk,
  readUserThunk,
} from '../../features/users/usersSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import ConfirmModal from '../../components/ui/ConfirmModal';
import { useToast } from '../../components/common/ToastContext';
import FromUser from './create';

export default function UserPage(){
  const dispatch = useAppDispatch()
  const [isModalDelete, setModalDelete] = useState(false);
  const [isIdModalDelete, setIdModalDelete] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { showToast } = useToast();

  const { list, loading, pageIndex, pageSize, totalCount, sortOrder, orderByFieldName } = useAppSelector(
    (state) => state.users
  )

  const openModalDelete = (id : number) => {
    setIdModalDelete(id)
    setModalDelete(true);
  }

  const handleDelete = () => {
    if(isIdModalDelete != 0 || isIdModalDelete != null){
      dispatch(deleteUserThunk(isIdModalDelete))
      dispatch(fetchUsers({ pageIndex, pageSize }))
      setModalDelete(false);
      showToast('Pengguna telah dihapus dari sistem', 'success');
    }
  }

  const handleUpdate = async (id : number) => {
    const result = await dispatch(readUserThunk({ id }))
          
    const ReadUser = result.payload as User
    setEditingUser(ReadUser); 
    setIsModalOpen(true);
  }

  useEffect(() => {
    dispatch(fetchUsers({ pageIndex, pageSize }))
  }, [dispatch, pageIndex, pageSize])

  const onSearching = (value : string) => {
    dispatch(setSearch(value))
    dispatch(fetchUsers({ pageIndex, pageSize, search : value }))
  }

  const onSort = (field: string, order: 'asc' | 'desc' ) => {
    dispatch(setSort({ field, order }))
    dispatch(fetchUsers({ pageIndex, pageSize, orderByFieldName : field, sortOrder : order }))
  }

  const onPagingnation = (page: number) => {
    dispatch(setPagination({ pageIndex: page, pageSize }))
    dispatch(fetchUsers({ pageIndex: page, pageSize }))
  }

  const onPageSizeChange = (page: number) => {
    dispatch(fetchUsers({ pageIndex: 0, pageSize : page ?? 10 }))
  }

  const onReload = () => {
    dispatch(fetchUsers({ pageIndex: 0, pageSize : 10 }))
  }

  const columns: Column<User>[] = [
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
      )
    },
    { 
      key: 'role', 
      header: 'Role', 
      sortable: true,
      render: (u) => (
        <Badge variant={'default'}>{u.name}</Badge>
      )
    },
    { 
      key: 'status', 
      header: 'Status', 
      sortable: true,
      render: (u) => (
        <Badge variant={'danger'}>
          {u.name}
        </Badge>
      )
    },
    { 
      key: 'createdAt', 
      header: 'Joined', 
      sortable: true,
      render: (u) => <span className="text-slate-500 text-xs">{new Date(u.created_at).toLocaleDateString()}</span>
    },
    { 
      key: 'actions', 
      header: '', 
      render: (u) => (
        <div className="flex items-center justify-end gap-1">
          <button 
            onClick={() => { handleUpdate(u.id) }}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={() => openModalDelete(u.id) }
            className="p-2 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20 rounded-lg text-slate-400 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ];

  const safeSortOrder: 'asc' | 'desc' | undefined =
    sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : undefined;

  return (
    <>
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader 
        title="Users" 
        description="Manage system users, roles, and access controls."
        action={
          <>
          <Button onClick={() => { setEditingUser(null); setIsModalOpen(true); }} className="gap-2 shadow-lg shadow-primary-500/20">
            <Plus size={18} /> New User
          </Button>
          <Button variant="outline" onClick={() => { onReload(); }} className="gap-2 shadow-lg shadow-default-500/20">
            <RefreshCw size={18} />
          </Button>
          </>
        }
      />

    <DataTable<User>
        data={list}
        columns={columns}

        pageIndex={pageIndex}
        pageSize={pageSize}
        totalCount={totalCount}

        setSearch={onSearching}
        setSort={onSort}
        onPageChange={onPagingnation}
        onPageSizeChange={onPageSizeChange}

        sortOrder={safeSortOrder}
        sortField={orderByFieldName}
        searchPlaceholder="Find users..."
        isLoading={loading}
      />

    </div>

    <ConfirmModal 
        isOpen={!!isModalDelete} 
        onClose={() => setModalDelete(false)} 
        onConfirm={handleDelete} 
        title="Hapus User?" 
        message="Tindakan ini permanen. Akun pengguna akan dihapus dari sistem." 
      />

    <FromUser isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} userCollection={editingUser}  />
    </>
  );
}