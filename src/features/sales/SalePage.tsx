import { Plus, RefreshCw, Box } from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { Button } from "../../components/ui/Button";
import { useState } from "react";
import { useToast } from "../../components/common/ToastContext";
import type { Sale } from "./sales.type";
import { useSalesListPage } from "./components/utils/useSalesListPage";
import SaleTable from "./components/SaleTable";
import { useNavigate } from "react-router-dom";

export default function SalePage() {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    id: string | null;
  }>({
    open: false,
    id: null,
  });
  const [formModal, setFormModal] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);

  const { onReload, deleteSale, fetchSaleForEdit } = useSalesListPage();

  const handleConfirmDelete = () => {
    if (deleteModal.id != null && deleteModal.id.length > 0) {
      deleteSale(deleteModal.id);
      closeDeleteModal();
      showToast("Pengguna telah dihapus dari sistem", "success");
    }
  };

  const openDeleteModal = (id: string) => {
    setDeleteModal({ open: true, id });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, id: null });
  };

  const openCreateModal = () => {
    setEditingSale(null);
    setFormModal(true);
  };

  const closeFormModal = () => {
    setFormModal(false);
    setEditingSale(null);
  };

  const handleEdit = async (id: string) => {
    const Sale = await fetchSaleForEdit(id);
    if (Sale) {
      setEditingSale(Sale);
      setFormModal(true);
    }
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <PageHeader
          title={
            <>
              <Box className="text-blue-600" /> Sales Management
            </>
          }
          description="Manage system Sales, roles, and access controls."
          action={
            <>
              <Button
                onClick={() => navigate("/sales/add")}
                className="gap-2 shadow-lg shadow-primary-500/20"
              >
                <Plus size={18} /> New Sale
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

        <SaleTable handleEdit={handleEdit} openDeleteModal={openDeleteModal} />
      </div>

      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Hapus Sale?"
        message="Tindakan ini permanen. Akun pengguna akan dihapus dari sistem."
      />
    </>
  );
}
