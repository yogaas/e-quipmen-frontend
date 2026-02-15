import { Plus, RefreshCw, Box } from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import ConfirmModal from "../../components/ui/ConfirmModal";
import FormSection from "./components/FormCustomer";
import { Button } from "../../components/ui/Button";
import { useState } from "react";
import { useToast } from "../../components/common/ToastContext";
import type { Section } from "./sections.type";
import { useSectionsListPage } from "./components/utils/useSectionsListPage";
import SectionTable from "./components/SectionTable";

export default function SectionPage() {
  const { showToast } = useToast();

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    id: number | null;
  }>({
    open: false,
    id: null,
  });
  const [formModal, setFormModal] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);

  const { onReload, deleteSection, fetchSectionForEdit } =
    useSectionsListPage();

  const handleConfirmDelete = () => {
    if (deleteModal.id != null && deleteModal.id > 0) {
      deleteSection(deleteModal.id);
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
    setEditingSection(null);
    setFormModal(true);
  };

  const closeFormModal = () => {
    setFormModal(false);
    setEditingSection(null);
  };

  const handleEdit = async (id: number) => {
    const Section = await fetchSectionForEdit(id);
    if (Section) {
      setEditingSection(Section);
      setFormModal(true);
    }
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <PageHeader
          title={
            <>
              <Box className="text-blue-600" /> Sections Management
            </>
          }
          description="Manage system Sections, roles, and access controls."
          action={
            <>
              <Button
                onClick={openCreateModal}
                className="gap-2 shadow-lg shadow-primary-500/20"
              >
                <Plus size={18} /> New Section
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

        <SectionTable
          handleEdit={handleEdit}
          openDeleteModal={openDeleteModal}
        />
      </div>

      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Hapus Section?"
        message="Tindakan ini permanen. Akun pengguna akan dihapus dari sistem."
      />

      <FormSection
        isModalOpen={formModal}
        setIsModalOpen={(open) => {
          if (!open) closeFormModal();
        }}
        SectionCollection={editingSection}
      />
    </>
  );
}
