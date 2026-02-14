import { useEffect } from "react";
import { Save, X } from "lucide-react";
import { createItemThunk, updateItemThunk } from "../itemsSlice";
import { useAppDispatch } from "../../../app/hooks";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import type { Item } from "../items.type";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../../../components/common/ToastContext";
import { FormInput } from "../../../components/ui/FormInput";
import { IMapper } from "../../../app/mapper";
import { handleThunkWithToast } from "../../../utils/thunkToast";
import { FormSelectSearch } from "../../../components/ui/FormSelectSearch";

const ItemSchema = z.object({
  name: z.string().min(3, "Name minimal 3 karakter"),
});
type ItemFormValues = z.infer<typeof ItemSchema>;

const mapToFormValues = IMapper<ItemFormValues>({
  name: (s) => s?.name ?? "",
});

interface FormItemProps {
  isModalOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
  ItemCollection?: Item | null;
}

export default function FormItem({
  isModalOpen,
  setIsModalOpen,
  ItemCollection,
}: FormItemProps) {
  const { showToast } = useToast();
  const dispatch = useAppDispatch();

  const defaultValues = mapToFormValues(ItemCollection ?? undefined);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemFormValues>({
    resolver: zodResolver(ItemSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(mapToFormValues(ItemCollection ?? undefined));
  }, [ItemCollection, isModalOpen, reset]);

  const onSubmit = async (data: ItemFormValues) => {
    const closeModal = () => setIsModalOpen(false);

    if (ItemCollection) {
      await handleThunkWithToast(
        dispatch,
        updateItemThunk,
        { id: ItemCollection.id, data },
        { showToast, onSuccess: closeModal },
      );
    } else {
      await handleThunkWithToast(dispatch, createItemThunk, data, {
        showToast,
        onSuccess: closeModal,
      });
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={ItemCollection ? "Edit Item Details" : "Create New Item"}
      footer=""
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <FormInput<ItemFormValues>
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
            <Save size={16} /> {ItemCollection ? "Save Changes" : "Create Item"}
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
