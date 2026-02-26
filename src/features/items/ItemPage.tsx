import { Plus, RefreshCw, Box } from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import ConfirmModal from "../../components/ui/ConfirmModal";
import FormItem from "./components/FormItem";
import { Button } from "../../components/ui/Button";
import { useState } from "react";
import { useToast } from "../../components/common/ToastContext";
import type { Item } from "./items.type";
import { useItemsListPage } from "./components/utils/useItemsListPage";
import ItemTable from "./components/ItemTable";

export default function ItemPage() {
  const { showToast } = useToast();

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    id: number | null;
  }>({
    open: false,
    id: null,
  });
  const [formModal, setFormModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const { onReload, deleteItem, fetchItemForEdit } = useItemsListPage();

  const handleConfirmDelete = () => {
    if (deleteModal.id != null && deleteModal.id > 0) {
      deleteItem(deleteModal.id);
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
    setEditingItem(null);
    setFormModal(true);
  };

  const closeFormModal = () => {
    setFormModal(false);
    setEditingItem(null);
  };

  const handleEdit = async (id: number) => {
    const Item = await fetchItemForEdit(id);
    if (Item) {
      setEditingItem(Item);
      setFormModal(true);
    }
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <PageHeader
          title={
            <>
              <Box className="text-blue-600" /> Items Management
            </>
          }
          description="Manage items create, update and delete."
          action={
            <>
              <Button
                onClick={openCreateModal}
                className="gap-2 shadow-lg shadow-primary-500/20"
              >
                <Plus size={18} /> New Item
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

        <ItemTable handleEdit={handleEdit} openDeleteModal={openDeleteModal} />
      </div>

      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Hapus Item?"
        message="Tindakan ini permanen. Akun pengguna akan dihapus dari sistem."
      />

      <FormItem
        isModalOpen={formModal}
        setIsModalOpen={(open) => {
          if (!open) closeFormModal();
        }}
        ItemCollection={editingItem}
      />
    </>
  );
}
