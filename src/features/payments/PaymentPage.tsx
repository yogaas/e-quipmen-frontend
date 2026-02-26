import { Plus, RefreshCw, CreditCard } from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import ConfirmModal from "../../components/ui/ConfirmModal";
import FormPayment from "./components/FormPayment";
import { Button } from "../../components/ui/Button";
import { useState } from "react";
import { useToast } from "../../components/common/ToastContext";
import type { Payment } from "./payments.type";
import { usePaymentsListPage } from "./components/utils/usePaymentsListPage";
import PaymentTable from "./components/PaymentTable";

export default function PaymentPage() {
  const { showToast } = useToast();

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    id: number | null;
  }>({
    open: false,
    id: null,
  });
  const [formModal, setFormModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);

  const { onReload, deletePayment, fetchPaymentForEdit } =
    usePaymentsListPage();

  const handleConfirmDelete = () => {
    if (deleteModal.id != null && deleteModal.id > 0) {
      deletePayment(deleteModal.id);
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
    setEditingPayment(null);
    setFormModal(true);
  };

  const closeFormModal = () => {
    setFormModal(false);
    setEditingPayment(null);
  };

  const handleEdit = async (id: number) => {
    const Payment = await fetchPaymentForEdit(id);
    if (Payment) {
      setEditingPayment(Payment);
      setFormModal(true);
    }
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <PageHeader
          title={
            <>
              <CreditCard className="text-blue-600" /> Type Payments
            </>
          }
          description="Manage type payments create, update and delete."
          action={
            <>
              <Button
                onClick={openCreateModal}
                className="gap-2 shadow-lg shadow-primary-500/20"
              >
                <Plus size={18} /> New Payment
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

        <PaymentTable
          handleEdit={handleEdit}
          openDeleteModal={openDeleteModal}
        />
      </div>

      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Hapus Payment?"
        message="Tindakan ini permanen. Akun pengguna akan dihapus dari sistem."
      />

      <FormPayment
        isModalOpen={formModal}
        setIsModalOpen={(open) => {
          if (!open) closeFormModal();
        }}
        PaymentCollection={editingPayment}
      />
    </>
  );
}
