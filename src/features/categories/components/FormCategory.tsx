import { useEffect } from "react";
import { Save, X } from "lucide-react";
import { createCategoryThunk, updateCategoryThunk } from "../categoriesSlice";
import { useAppDispatch } from "../../../app/hooks";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import type { Category } from "../categories.type";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../../../components/common/ToastContext";
import { FormInput } from "../../../components/ui/FormInput";
import { IMapper } from "../../../app/mapper";
import { handleThunkWithToast } from "../../../utils/thunkToast";

const CategorySchema = z.object({
  category: z.string().min(3, "Category minimal 3 karakter"),
});
type CategoryFormValues = z.infer<typeof CategorySchema>;

const mapToFormValues = IMapper<CategoryFormValues>({
  category: (s) => s?.category ?? "",
});

interface FormCategoryProps {
  isModalOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
  CategoryCollection?: Category | null;
}

export default function FormCategory({
  isModalOpen,
  setIsModalOpen,
  CategoryCollection,
}: FormCategoryProps) {
  const { showToast } = useToast();
  const dispatch = useAppDispatch();

  const defaultValues = mapToFormValues(CategoryCollection ?? undefined);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(CategorySchema),
    defaultValues,
  });

  useEffect(() => {
    reset(mapToFormValues(CategoryCollection ?? undefined));
  }, [CategoryCollection, isModalOpen, reset]);

  const onSubmit = async (data: CategoryFormValues) => {
    const closeModal = () => setIsModalOpen(false);

    if (CategoryCollection) {
      await handleThunkWithToast(
        dispatch,
        updateCategoryThunk,
        { id: CategoryCollection.id, data },
        { showToast, onSuccess: closeModal },
      );
    } else {
      await handleThunkWithToast(dispatch, createCategoryThunk, data, {
        showToast,
        onSuccess: closeModal,
      });
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={
        CategoryCollection ? "Edit Category Details" : "Create New Category"
      }
      footer=""
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <FormInput<CategoryFormValues>
            label="Category Name"
            type="text"
            name="category"
            placeholder="Tools, Materials, etc"
            register={register}
            error={errors.category}
          />
        </div>

        <div className="mt-5 flex flex-row-reverse gap-3">
          <Button type="submit" className="gap-2">
            <Save size={16} />{" "}
            {CategoryCollection ? "Save Changes" : "Create Category"}
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="gap-2"
          >
            <X size={16} /> Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
