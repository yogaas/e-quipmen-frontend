import { KeyRound, Plus, RefreshCw } from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import ConfirmModal from "../../components/ui/ConfirmModal";
import FormRole from "./components/FormRole";
import { Button } from "../../components/ui/Button";
import { useState } from "react";
import { useToast } from "../../components/common/ToastContext";
import type { Role } from "./roles.type";
import RoleTable from "./components/RoleTable";
import { useRolesListPage } from "./components/utils/useUsersListPage";

export default function RolePage() {
  const { showToast } = useToast();

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    id: string | null;
  }>({
    open: false,
    id: null,
  });
  const [formModal, setFormModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const { onReload, deleteRole, fetchRoleForEdit } = useRolesListPage();

  const handleConfirmDelete = () => {
    if (deleteModal.id != null && deleteModal.id.trim() !== "") {
      deleteRole(deleteModal.id);
      closeDeleteModal();
      showToast("Role telah dihapus dari sistem", "success");
    }
  };

  const openDeleteModal = (id: string) => {
    setDeleteModal({ open: true, id });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, id: null });
  };

  const openCreateModal = () => {
    setEditingRole(null);
    setFormModal(true);
  };

  const closeFormModal = () => {
    setFormModal(false);
    setEditingRole(null);
  };

  const handleEdit = async (id: string) => {
    const Role = await fetchRoleForEdit(id);
    if (Role) {
      setEditingRole(Role);
      setFormModal(true);
    }
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <PageHeader
          title={
            <>
              <KeyRound className="text-blue-600" /> Roles Management
            </>
          }
          description="Manage system Roles, roles, and access controls."
          action={
            <>
              <Button
                onClick={openCreateModal}
                className="gap-2 shadow-lg shadow-primary-500/20"
              >
                <Plus size={18} /> New Role
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

        <RoleTable handleEdit={handleEdit} openDeleteModal={openDeleteModal} />
      </div>

      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Hapus Role?"
        message="Tindakan ini permanen. Akun pengguna akan dihapus dari sistem."
      />

      <FormRole
        isModalOpen={formModal}
        setIsModalOpen={(open) => {
          if (!open) closeFormModal();
        }}
        RoleCollection={editingRole}
      />
    </>
  );
}
