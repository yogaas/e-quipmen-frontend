import { Plus, RefreshCw, Box } from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import ConfirmModal from "../../components/ui/ConfirmModal";
import FormCategory from "./components/FormCategory";
import { Button } from "../../components/ui/Button";
import { useState } from "react";
import { useToast } from "../../components/common/ToastContext";
import type { Category } from "./categories.type";
import { useCategorysListPage } from "./components/utils/useCategoriesListPage";
import CategoryTable from "./components/CategoryTable";

export default function CategoryPage() {
  const { showToast } = useToast();

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    id: number | null;
  }>({
    open: false,
    id: null,
  });
  const [formModal, setFormModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const { onReload, deleteCategory, fetchCategoryForEdit } =
    useCategorysListPage();

  const handleConfirmDelete = () => {
    if (deleteModal.id != null && deleteModal.id > 0) {
      deleteCategory(deleteModal.id);
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
    setEditingCategory(null);
    setFormModal(true);
  };

  const closeFormModal = () => {
    setFormModal(false);
    setEditingCategory(null);
  };

  const handleEdit = async (id: number) => {
    const Category = await fetchCategoryForEdit(id);
    if (Category) {
      setEditingCategory(Category);
      setFormModal(true);
    }
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <PageHeader
          title={
            <>
              <Box className="text-blue-600" /> Category Item
            </>
          }
          description="Manage categories create, update and delete."
          action={
            <>
              <Button
                onClick={openCreateModal}
                className="gap-2 shadow-lg shadow-primary-500/20"
              >
                <Plus size={18} /> New Category
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

        <CategoryTable
          handleEdit={handleEdit}
          openDeleteModal={openDeleteModal}
        />
      </div>

      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Hapus Category?"
        message="Tindakan ini permanen. Akun pengguna akan dihapus dari sistem."
      />

      <FormCategory
        isModalOpen={formModal}
        setIsModalOpen={(open) => {
          if (!open) closeFormModal();
        }}
        CategoryCollection={editingCategory}
      />
    </>
  );
}
