import { useEffect, useState } from "react";
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
import {
  FormSelectSearch,
  type Option,
} from "../../../components/ui/FormSelectSearch";
import { fetchAccounts } from "../../accounts/accountsSlice";
import type { Account } from "../../accounts/accounts.type";

const SectionSchema = z.object({
  account_id: z.string().min(1, "Account is required"),
  name: z.string().min(3, "Name minimal 3 karakter"),
  tag: z.string().min(3, "Name minimal 3 karakter"),
  active: z.string().min(1, "Active status is required"),
});
type SectionFormValues = z.infer<typeof SectionSchema>;

const mapToFormValues = IMapper<SectionFormValues>({
  name: (s) => s?.name ?? "",
  tag: (s) => s?.tag ?? "",
  active: (s) => s?.active,
  account_id: (s) => s?.account_id?.toString() ?? "",
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
  const [isAccountsLoaded, setIsAccountsLoaded] = useState<Option[]>([]);

  const defaultValues = mapToFormValues(SectionCollection ?? undefined);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SectionFormValues>({
    resolver: zodResolver(SectionSchema),
    defaultValues,
  });

  // Fetch accounts on mount if needed
  const initAccounts = () => {
    dispatch(fetchAccounts({ pageIndex: 0, pageSize: 1000 })).then((res) => {
      if (fetchAccounts.fulfilled.match(res)) {
        const options: Option[] = res.payload.data.map((account: Account) => ({
          label: account.name_account,
          value: account.id.toString(),
        }));
        setIsAccountsLoaded(options);
      }
    });
  };

  useEffect(() => {
    initAccounts();
  }, [isModalOpen]);

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
            label="Section Name"
            type="text"
            name="name"
            placeholder="Lobby 1, Meeting Room A, etc"
            register={register}
            error={errors.name}
          />

          <FormInput<SectionFormValues>
            label="Tag Name"
            type="text"
            name="tag"
            placeholder="meeting-room-a, etc"
            register={register}
            error={errors.tag}
          />

          <FormSelectSearch
            name="account_id"
            control={control}
            label="Account"
            rules={{ required: "Account is required" }}
            options={isAccountsLoaded}
          />

          <FormSelectSearch
            name="active"
            control={control}
            label="Status"
            rules={{ required: "Status is required" }}
            options={[
              { label: "Active", value: "1" },
              { label: "Inactive", value: "0" },
            ]}
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
