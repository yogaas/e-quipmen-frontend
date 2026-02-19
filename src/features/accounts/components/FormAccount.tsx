import { useEffect } from "react";
import { Save, X } from "lucide-react";
import { createAccountThunk, updateAccountThunk } from "../accountsSlice";
import { useAppDispatch } from "../../../app/hooks";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import type { Account } from "../accounts.type";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../../../components/common/ToastContext";
import { FormInput } from "../../../components/ui/FormInput";
import { IMapper } from "../../../app/mapper";
import { handleThunkWithToast } from "../../../utils/thunkToast";
import { FormSelectSearch } from "../../../components/ui/FormSelectSearch";

const AccountSchema = z.object({
  code_account: z.string().min(3, "Code minimal 3 karakter"),
  name_account: z.string().min(3, "Name minimal 3 karakter"),
  normal_pos: z.string().min(1, "Normal position is required"),
});
type AccountFormValues = z.infer<typeof AccountSchema>;

const mapToFormValues = IMapper<AccountFormValues>({
  code_account: (s) => s?.code_account ?? "",
  name_account: (s) => s?.name_account ?? "",
  normal_pos: (s) => s?.normal_pos ?? "",
});

interface FormAccountProps {
  isModalOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
  AccountCollection?: Account | null;
  headerAcount: Account | null;
}

export default function FormAccount({
  isModalOpen,
  setIsModalOpen,
  AccountCollection,
  headerAcount,
}: FormAccountProps) {
  const { showToast } = useToast();
  const dispatch = useAppDispatch();

  const defaultValues = mapToFormValues(AccountCollection ?? undefined);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(AccountSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(mapToFormValues(AccountCollection ?? undefined));
  }, [AccountCollection, isModalOpen, reset]);

  const onSubmit = async (data: AccountFormValues) => {
    const closeModal = () => setIsModalOpen(false);

    const payload = {
      code_account: data.code_account,
      name_account: data.name_account,
      level: "1",
      normal_pos: data.normal_pos,
      id_parent: 0,
      header: 1,
      grouper: 0,
    };

    if (AccountCollection) {
      payload.id_parent = AccountCollection.id_parent;
      payload.grouper = AccountCollection.grouper;
      payload.level = AccountCollection.level.toString();
      payload.header = AccountCollection.header;

      await handleThunkWithToast(
        dispatch,
        updateAccountThunk,
        { id: AccountCollection.id, data: payload },
        { showToast, onSuccess: closeModal },
      );
    } else {
      if (headerAcount) {
        payload.id_parent = headerAcount.id;
        payload.grouper = headerAcount.grouper;
        payload.level = "2";
        payload.header = 0;
      }

      await handleThunkWithToast(dispatch, createAccountThunk, payload, {
        showToast,
        onSuccess: closeModal,
      });
    }
  };

  useEffect(() => {
    if (!errors || Object.keys(errors).length === 0) return;
    showToast(
      "Please fix the errors in the form." + JSON.stringify(errors),
      "error",
    );
  }, [errors]);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={AccountCollection ? "Edit Account Details" : "Create New Account"}
      footer=""
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <FormInput<AccountFormValues>
            label="Code Account"
            type="text"
            name="code_account"
            placeholder="e.g. 1001"
            register={register}
            error={errors.code_account}
          />

          <FormInput<AccountFormValues>
            label="Name Account"
            type="text"
            name="name_account"
            placeholder="e.g. Kas"
            register={register}
            error={errors.name_account}
          />

          <FormSelectSearch
            name="normal_pos"
            control={control}
            label="Normal Pos"
            rules={{ required: "Normal position is required" }}
            options={[
              { label: "Debit", value: "D" },
              { label: "Credit", value: "K" },
            ]}
          />
        </div>

        <div className="mt-5 flex flex-row-reverse gap-3">
          <Button type="submit" className="gap-2">
            <Save size={16} />{" "}
            {AccountCollection ? "Save Changes" : "Create Account"}
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
