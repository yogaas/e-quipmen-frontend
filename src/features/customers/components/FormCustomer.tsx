import { useEffect } from "react";
import { Save, X } from "lucide-react";
import { createCustomerThunk, updateCustomerThunk } from "../customersSlice";
import { useAppDispatch } from "../../../app/hooks";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import type { Customer } from "../customers.type";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../../../components/common/ToastContext";
import { FormInput } from "../../../components/ui/FormInput";
import { IMapper } from "../../../app/mapper";
import { handleThunkWithToast } from "../../../utils/thunkToast";

const CustomerSchema = z.object({
  name: z.string().min(3, "Name minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(10, "Phone minimal 10 karakter"),
  address: z.string().min(5, "Address minimal 5 karakter"),
});
type CustomerFormValues = z.infer<typeof CustomerSchema>;

const mapToFormValues = IMapper<CustomerFormValues>({
  name: (s) => s?.name ?? "",
  email: (s) => s?.email ?? "",
  phone: (s) => s?.phone ?? "",
  address: (s) => s?.address ?? "",
});

interface FormCustomerProps {
  isModalOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
  CustomerCollection?: Customer | null;
}

export default function FormCustomer({
  isModalOpen,
  setIsModalOpen,
  CustomerCollection,
}: FormCustomerProps) {
  const { showToast } = useToast();
  const dispatch = useAppDispatch();

  const defaultValues = mapToFormValues(CustomerCollection ?? undefined);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(CustomerSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(mapToFormValues(CustomerCollection ?? undefined));
  }, [CustomerCollection, isModalOpen, reset]);

  const onSubmit = async (data: CustomerFormValues) => {
    const closeModal = () => setIsModalOpen(false);

    if (CustomerCollection) {
      await handleThunkWithToast(
        dispatch,
        updateCustomerThunk,
        { id: CustomerCollection.id, data },
        { showToast, onSuccess: closeModal },
      );
    } else {
      await handleThunkWithToast(dispatch, createCustomerThunk, data, {
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
        CustomerCollection ? "Edit Customer Details" : "Create New Customer"
      }
      footer=""
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <FormInput<CustomerFormValues>
            label="Customer Name"
            type="text"
            name="name"
            placeholder="John Doe"
            register={register}
            error={errors.name}
          />

          <FormInput<CustomerFormValues>
            label="Email"
            type="text"
            name="email"
            placeholder="customer@example.com"
            register={register}
            error={errors.email}
          />

          <FormInput<CustomerFormValues>
            label="Phone"
            type="text"
            name="phone"
            placeholder="081234567890"
            register={register}
            error={errors.phone}
          />

          <FormInput<CustomerFormValues>
            label="Address"
            type="text"
            name="address"
            placeholder="Jl. Jenderal Sudirman No. 123"
            register={register}
            error={errors.address}
          />
        </div>

        <div className="mt-5 flex flex-row-reverse gap-3">
          <Button type="submit" className="gap-2">
            <Save size={16} />{" "}
            {CustomerCollection ? "Save Changes" : "Create Customer"}
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
