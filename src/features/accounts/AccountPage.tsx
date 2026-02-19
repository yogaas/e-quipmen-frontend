import { Plus, RefreshCw, BookCopy } from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import ConfirmModal from "../../components/ui/ConfirmModal";
import FormAccount from "./components/FormAccount";
import { Button } from "../../components/ui/Button";
import { useState } from "react";
import { useToast } from "../../components/common/ToastContext";
import type { Account } from "./accounts.type";
import { useAccountsListPage } from "./components/utils/useAccountsListPage";
import AccountTable from "./components/AccountTable";

export default function AccountPage() {
  const { showToast } = useToast();

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    id: number | null;
  }>({
    open: false,
    id: null,
  });
  const [formModal, setFormModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [isHeader, setIsHeader] = useState<Account | null>(null);

  const { onReload, deleteAccount, fetchAccountForEdit } =
    useAccountsListPage();

  const handleConfirmDelete = () => {
    if (deleteModal.id != null && deleteModal.id > 0) {
      deleteAccount(deleteModal.id);
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
    setIsHeader(null);
    setEditingAccount(null);
    setFormModal(true);
  };

  const closeFormModal = () => {
    setFormModal(false);
    setEditingAccount(null);
  };

  const handleAddChild = async (id: number) => {
    const Account = await fetchAccountForEdit(id);
    if (Account) {
      setIsHeader(Account);
      setEditingAccount(null);
      setFormModal(true);
    }
  };

  const handleEdit = async (id: number) => {
    const Account = await fetchAccountForEdit(id);
    if (Account) {
      setEditingAccount(Account);
      setFormModal(true);
    }
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <PageHeader
          title={
            <>
              <BookCopy className="text-blue-600" /> Accounts Management
            </>
          }
          description="Manage system Accounts, roles, and access controls."
          action={
            <>
              <Button
                onClick={openCreateModal}
                className="gap-2 shadow-lg shadow-primary-500/20"
              >
                <Plus size={18} /> New Account
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

        <AccountTable
          handleEdit={handleEdit}
          openDeleteModal={openDeleteModal}
          handleAddChild={handleAddChild}
        />
      </div>

      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Hapus Account?"
        message="Tindakan ini permanen. Akun pengguna akan dihapus dari sistem."
      />

      <FormAccount
        isModalOpen={formModal}
        setIsModalOpen={(open) => {
          if (!open) closeFormModal();
        }}
        AccountCollection={editingAccount}
        headerAcount={isHeader}
      />
    </>
  );
}
