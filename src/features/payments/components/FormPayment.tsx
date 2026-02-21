import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import { createPaymentThunk, updatePaymentThunk } from "../paymentsSlice";
import { useAppDispatch } from "../../../app/hooks";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import type { Payment } from "../payments.type";
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

const PaymentSchema = z.object({
  account_id: z.string().min(1, "Account is required"),
  type_transaction: z.string().min(3, "Type transaction minimal 3 karakter"),
  paymen: z.string().min(3, "Tag minimal 3 karakter"),
});
type PaymentFormValues = z.infer<typeof PaymentSchema>;

const mapToFormValues = IMapper<PaymentFormValues>({
  paymen: (s) => s?.paymen ?? "",
  type_transaction: (s) => s?.type_transaction ?? "",
  account_id: (s) => s?.account_id?.toString() ?? "",
});

interface FormPaymentProps {
  isModalOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
  PaymentCollection?: Payment | null;
}

export default function FormPayment({
  isModalOpen,
  setIsModalOpen,
  PaymentCollection,
}: FormPaymentProps) {
  const { showToast } = useToast();
  const dispatch = useAppDispatch();
  const [isAccountsLoaded, setIsAccountsLoaded] = useState<Option[]>([]);

  const defaultValues = mapToFormValues(PaymentCollection ?? undefined);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(PaymentSchema),
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
    reset(mapToFormValues(PaymentCollection ?? undefined));
  }, [PaymentCollection, isModalOpen, reset]);

  const onSubmit = async (data: PaymentFormValues) => {
    const closeModal = () => setIsModalOpen(false);

    if (PaymentCollection) {
      await handleThunkWithToast(
        dispatch,
        updatePaymentThunk,
        { id: PaymentCollection.id, data },
        { showToast, onSuccess: closeModal },
      );
    } else {
      await handleThunkWithToast(dispatch, createPaymentThunk, data, {
        showToast,
        onSuccess: closeModal,
      });
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={PaymentCollection ? "Edit Payment Details" : "Create New Payment"}
      footer=""
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <FormInput<PaymentFormValues>
            label="Payment Name"
            type="text"
            name="paymen"
            placeholder="Cash, Credit Card, etc."
            register={register}
            error={errors.paymen}
          />

          <FormSelectSearch
            name="type_transaction"
            control={control}
            label="Type Transaction"
            rules={{ required: "Type transaction is required" }}
            options={[
              { label: "SALES", value: "SALES" },
              { label: "PURCHASING", value: "PURCHASING" },
            ]}
          />

          <FormSelectSearch
            name="account_id"
            control={control}
            label="Account"
            rules={{ required: "Account is required" }}
            options={isAccountsLoaded}
          />
        </div>

        <div className="mt-5 flex flex-row-reverse gap-3">
          <Button type="submit" className="gap-2">
            <Save size={16} />{" "}
            {PaymentCollection ? "Save Changes" : "Create Payment"}
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
