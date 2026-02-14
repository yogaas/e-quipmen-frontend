import { useEffect } from "react";
import { Save, X } from "lucide-react";
import {
  createUserThunk,
  updateUserThunk,
} from "../usersSlice";
import { useAppDispatch } from "../../../app/hooks";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import type { User } from "../users.type";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../../../components/common/ToastContext";
import { FormInput } from "../../../components/ui/FormInput";
import { IMapper } from "../../../app/mapper";
import { handleThunkWithToast } from "../../../utils/thunkToast";
import { FormSelectSearch } from "../../../components/ui/FormSelectSearch";

const userSchema = z.object({
  name: z.string().min(3, "Name minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Minimal input 8 karakter"),
  role: z.string().min(1, "Role is required"),
  active: z.string().optional(),
});
type UserFormValues = z.infer<typeof userSchema>;

const mapToFormValues = IMapper<UserFormValues>({
  name: (s) => s?.name ?? "",
  email: (s) => s?.email ?? "",
  password: () => "",
  role: (s) => s?.role ?? "",
  active: (s) => s?.active ?? "",
});

interface FormUserProps {
  isModalOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
  userCollection?: User | null;
}

export default function FormUser({
  isModalOpen,
  setIsModalOpen,
  userCollection,
}: FormUserProps) {
  const { showToast } = useToast();
  const dispatch = useAppDispatch();

  const defaultValues = mapToFormValues(userCollection ?? undefined);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(mapToFormValues(userCollection ?? undefined));
  }, [userCollection, isModalOpen, reset]);

  const onSubmit = async (data: UserFormValues) => {
    const closeModal = () => setIsModalOpen(false);

    if (userCollection) {
      await handleThunkWithToast(
        dispatch,
        updateUserThunk,
        { id: userCollection.id, data },
        { showToast, onSuccess: closeModal },
      );
    } else {
      await handleThunkWithToast(dispatch, createUserThunk, data, {
        showToast,
        onSuccess: closeModal,
      });
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={userCollection ? "Edit User Details" : "Create New User"}
      footer=""
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <FormInput<UserFormValues>
            label="Display Name"
            type="text"
            name="name"
            placeholder="e.g. John Doe"
            register={register}
            error={errors.name}
          />
          <FormInput<UserFormValues>
            label="Email Address"
            type="email"
            name="email"
            placeholder="john@example.com"
            register={register}
            error={errors.email}
          />

          <FormSelectSearch
            name="role"
            control={control}
            label="Role"
            rules={{ required: "Role is required" }}
            options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" }
            ]}
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

          <FormInput<UserFormValues>
            label="Password"
            type="password"
            name="password"
            placeholder="Min. 8 karakter"
            register={register}
            error={errors.password}
          />
        </div>

        <div className="mt-5 flex flex-row-reverse gap-3">
          <Button type="submit" className="gap-2">
            <Save size={16} /> {userCollection ? "Save Changes" : "Create User"}
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
