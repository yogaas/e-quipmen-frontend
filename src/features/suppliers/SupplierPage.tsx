import { Plus, RefreshCw, Box } from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import ConfirmModal from "../../components/ui/ConfirmModal";
import FormSupplier from "./components/FormSupplier";
import { Button } from "../../components/ui/Button";
import { useState } from "react";
import { useToast } from "../../components/common/ToastContext";
import type { Supplier } from "./suppliers.type";
import { useSuppliersListPage } from "./components/utils/useSuppliersListPage";
import SupplierTable from "./components/SupplierTable";

export default function SupplierPage() {
  const { showToast } = useToast();

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    id: number | null;
  }>({
    open: false,
    id: null,
  });
  const [formModal, setFormModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  const { onReload, deleteSupplier, fetchSupplierForEdit } =
    useSuppliersListPage();

  const handleConfirmDelete = () => {
    if (deleteModal.id != null && deleteModal.id > 0) {
      deleteSupplier(deleteModal.id);
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
    setEditingSupplier(null);
    setFormModal(true);
  };

  const closeFormModal = () => {
    setFormModal(false);
    setEditingSupplier(null);
  };

  const handleEdit = async (id: number) => {
    const Supplier = await fetchSupplierForEdit(id);
    if (Supplier) {
      setEditingSupplier(Supplier);
      setFormModal(true);
    }
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <PageHeader
          title={
            <>
              <Box className="text-blue-600" /> Suppliers Management
            </>
          }
          description="Manage system Suppliers, roles, and access controls."
          action={
            <>
              <Button
                onClick={openCreateModal}
                className="gap-2 shadow-lg shadow-primary-500/20"
              >
                <Plus size={18} /> New Supplier
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

        <SupplierTable
          handleEdit={handleEdit}
          openDeleteModal={openDeleteModal}
        />
      </div>

      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Hapus Supplier?"
        message="Tindakan ini permanen. Akun pengguna akan dihapus dari sistem."
      />

      <FormSupplier
        isModalOpen={formModal}
        setIsModalOpen={(open) => {
          if (!open) closeFormModal();
        }}
        SupplierCollection={editingSupplier}
      />
    </>
  );
}
