import { useState } from 'react'
import { Plus, RefreshCw } from 'lucide-react'
import { DataTable } from '../../components/common/DataTable'
import type { User } from '../../features/users/users.type'
import { useUsersListPage } from '../../features/users/useUsersListPage'
import { getUserColumns } from '../../features/users/usersColumns'
import { PageHeader } from '../../components/common/PageHeader'
import { Button } from '../../components/ui/Button'
import ConfirmModal from '../../components/ui/ConfirmModal'
import { useToast } from '../../components/common/ToastContext'
import FormUser from './create'

export default function UserPage() {
  const { showToast } = useToast()

  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: number | null }>({
    open: false,
    id: null,
  })
  const [formModal, setFormModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const {
    list,
    loading,
    pageIndex,
    pageSize,
    totalCount,
    orderByFieldName,
    sortOrder,
    onSearch,
    onSort,
    onPageChange,
    onPageSizeChange,
    onReload,
    fetchUserForEdit,
    deleteUser,
  } = useUsersListPage()

  const openDeleteModal = (id: number) => {
    setDeleteModal({ open: true, id })
  }

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, id: null })
  }

  const handleConfirmDelete = () => {
    if (deleteModal.id != null && deleteModal.id > 0) {
      deleteUser(deleteModal.id)
      closeDeleteModal()
      showToast('Pengguna telah dihapus dari sistem', 'success')
    }
  }

  const handleEdit = async (id: number) => {
    const user = await fetchUserForEdit(id)
    if (user) {
      setEditingUser(user)
      setFormModal(true)
    }
  }

  const openCreateModal = () => {
    setEditingUser(null)
    setFormModal(true)
  }

  const closeFormModal = () => {
    setFormModal(false)
    setEditingUser(null)
  }

  const columns = getUserColumns({
    onEdit: handleEdit,
    onDelete: openDeleteModal,
  })

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <PageHeader
          title="Users"
          description="Manage system users, roles, and access controls."
          action={
            <>
              <Button
                onClick={openCreateModal}
                className="gap-2 shadow-lg shadow-primary-500/20"
              >
                <Plus size={18} /> New User
              </Button>
              <Button
                variant="outline"
                onClick={onReload}
                className="gap-2 shadow-lg shadow-default-500/20"
              >
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
          setSearch={onSearch}
          setSort={onSort}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          sortOrder={sortOrder}
          sortField={orderByFieldName}
          searchPlaceholder="Find users..."
          isLoading={loading}
        />
      </div>

      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Hapus User?"
        message="Tindakan ini permanen. Akun pengguna akan dihapus dari sistem."
      />

      <FormUser
        isModalOpen={formModal}
        setIsModalOpen={(open) => {
          if (!open) closeFormModal()
        }}
        userCollection={editingUser}
      />
    </>
  )
}
