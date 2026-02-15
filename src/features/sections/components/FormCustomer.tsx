import { useEffect } from "react";
import { Save, X } from "lucide-react";
import { createSectionThunk, updateSectionThunk } from "../sectionsSlice";
import { useAppDispatch } from "../../../app/hooks";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import type { Section } from "../sections.type";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../../../components/common/ToastContext";
import { FormInput } from "../../../components/ui/FormInput";
import { IMapper } from "../../../app/mapper";
import { handleThunkWithToast } from "../../../utils/thunkToast";

const SectionSchema = z.object({
  name: z.string().min(3, "Name minimal 3 karakter"),
});
type SectionFormValues = z.infer<typeof SectionSchema>;

const mapToFormValues = IMapper<SectionFormValues>({
  name: (s) => s?.name ?? "",
});

interface FormSectionProps {
  isModalOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
  SectionCollection?: Section | null;
}

export default function FormSection({
  isModalOpen,
  setIsModalOpen,
  SectionCollection,
}: FormSectionProps) {
  const { showToast } = useToast();
  const dispatch = useAppDispatch();

  const defaultValues = mapToFormValues(SectionCollection ?? undefined);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SectionFormValues>({
    resolver: zodResolver(SectionSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(mapToFormValues(SectionCollection ?? undefined));
  }, [SectionCollection, isModalOpen, reset]);

  const onSubmit = async (data: SectionFormValues) => {
    const closeModal = () => setIsModalOpen(false);

    if (SectionCollection) {
      await handleThunkWithToast(
        dispatch,
        updateSectionThunk,
        { id: SectionCollection.id, data },
        { showToast, onSuccess: closeModal },
      );
    } else {
      await handleThunkWithToast(dispatch, createSectionThunk, data, {
        showToast,
        onSuccess: closeModal,
      });
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={SectionCollection ? "Edit Section Details" : "Create New Section"}
      footer=""
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <FormInput<SectionFormValues>
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
            {SectionCollection ? "Save Changes" : "Create Section"}
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
