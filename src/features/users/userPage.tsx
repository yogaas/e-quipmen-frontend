import { Plus, RefreshCw, Users } from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import ConfirmModal from "../../components/ui/ConfirmModal";
import FormUser from "./components/FormUser";
import { Button } from "../../components/ui/Button";
import { useState } from "react";
import { useToast } from "../../components/common/ToastContext";
import type { User } from "./users.type";
import { useUsersListPage } from "./components/utils/useUsersListPage";
import UserTable from "./components/UserTable";

export default function UserPage() {
  const { showToast } = useToast();

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    id: number | null;
  }>({
    open: false,
    id: null,
  });
  const [formModal, setFormModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { onReload, deleteUser, fetchUserForEdit } = useUsersListPage();

  const handleConfirmDelete = () => {
    if (deleteModal.id != null && deleteModal.id > 0) {
      deleteUser(deleteModal.id);
      closeDeleteModal();
      showToast("Pengguna telah dihapus dari sistem", "success");
    }
  };

  const openDeleteModal = (id: number) => {
    setDeleteModal({ open: true, id });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, id: null });
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setFormModal(true);
  };

  const closeFormModal = () => {
    setFormModal(false);
    setEditingUser(null);
  };

  const handleEdit = async (id: number) => {
    const user = await fetchUserForEdit(id);
    if (user) {
      setEditingUser(user);
      setFormModal(true);
    }
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <PageHeader
          title={
            <>
              <Users className="text-blue-600" /> Users Management
            </>
          }
          description="Manage users create, update and delete."
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

        <UserTable handleEdit={handleEdit} openDeleteModal={openDeleteModal} />
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
          if (!open) closeFormModal();
        }}
        userCollection={editingUser}
      />
    </>
  );
}
