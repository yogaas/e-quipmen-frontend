import { useEffect } from "react";
import { Save, X } from "lucide-react";
import { createSupplierThunk, updateSupplierThunk } from "../suppliersSlice";
import { useAppDispatch } from "../../../app/hooks";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import type { Supplier } from "../suppliers.type";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../../../components/common/ToastContext";
import { FormInput } from "../../../components/ui/FormInput";
import { IMapper } from "../../../app/mapper";
import { handleThunkWithToast } from "../../../utils/thunkToast";

const SupplierSchema = z.object({
  name: z.string().min(3, "Name minimal 3 karakter"),
});
type SupplierFormValues = z.infer<typeof SupplierSchema>;

const mapToFormValues = IMapper<SupplierFormValues>({
  name: (s) => s?.name ?? "",
});

interface FormSupplierProps {
  isModalOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
  SupplierCollection?: Supplier | null;
}

export default function FormSupplier({
  isModalOpen,
  setIsModalOpen,
  SupplierCollection,
}: FormSupplierProps) {
  const { showToast } = useToast();
  const dispatch = useAppDispatch();

  const defaultValues = mapToFormValues(SupplierCollection ?? undefined);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupplierFormValues>({
    resolver: zodResolver(SupplierSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(mapToFormValues(SupplierCollection ?? undefined));
  }, [SupplierCollection, isModalOpen, reset]);

  const onSubmit = async (data: SupplierFormValues) => {
    const closeModal = () => setIsModalOpen(false);

    if (SupplierCollection) {
      await handleThunkWithToast(
        dispatch,
        updateSupplierThunk,
        { id: SupplierCollection.id, data },
        { showToast, onSuccess: closeModal },
      );
    } else {
      await handleThunkWithToast(dispatch, createSupplierThunk, data, {
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
        SupplierCollection ? "Edit Supplier Details" : "Create New Supplier"
      }
      footer=""
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <FormInput<SupplierFormValues>
            label="Display Name"
            type="text"
            name="name"
            placeholder="Tools, Materials, etc"
            register={register}
            error={errors.name}
          />
        </div>

        <div className="mt-5 flex flex-row-reverse gap-3">
          <Button type="submit" className="gap-2">
            <Save size={16} />{" "}
            {SupplierCollection ? "Save Changes" : "Create Supplier"}
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
