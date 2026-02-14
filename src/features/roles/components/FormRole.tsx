import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import { createRoleThunk, updateRoleThunk, fetchAllMenu } from "../rolesSlice";
import { useAppDispatch } from "../../../app/hooks";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import type { Menus, Role } from "../roles.type";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../../../components/common/ToastContext";
import { FormInput } from "../../../components/ui/FormInput";
import { handleThunkWithToast } from "../../../utils/thunkToast";
import type { ApiListResponse } from "../../../types/api";

const RoleSchema = z.object({
  role: z.string().min(1, "Role is required"),
  menus: z.array(
    z.object({
      menus: z.string(),
      view: z.boolean(),
      create: z.boolean(),
      update: z.boolean(),
      delete: z.boolean(),
    }),
  ),
});

type RoleFormValues = z.infer<typeof RoleSchema>;

interface FormRoleProps {
  isModalOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
  RoleCollection?: Role | null;
}

export default function FormRole({
  isModalOpen,
  setIsModalOpen,
  RoleCollection,
}: FormRoleProps) {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const [isMenus, setMenus] = useState<Menus[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoleFormValues>({
    resolver: zodResolver(RoleSchema),
  });

  const init = async () => {
    const menusResult = await dispatch(fetchAllMenu());
    const payload = menusResult.payload as ApiListResponse<Menus[]>;
    const allMenus = payload.data;

    setMenus(allMenus);

    const mappedMenus = allMenus.map((menu) => {
      const existing = RoleCollection?.menus?.find(
        (m) => m.menus === menu.menus,
      );

      return {
        menus: menu.menus,
        view: existing?.view === 1,
        create: existing?.create === 1,
        update: existing?.update === 1,
        delete: existing?.delete === 1,
      };
    });

    reset({
      role: RoleCollection?.role ?? "",
      menus: mappedMenus,
    });
  };

  useEffect(() => {
    if (isModalOpen) {
      init();
    }
  }, [RoleCollection, isModalOpen, reset]);

  const onSubmit = async (data: RoleFormValues) => {
    const formatted = {
      ...data,
      menus: data.menus.map((m) => ({
        ...m,
        view: m.view ? 1 : 0,
        create: m.create ? 1 : 0,
        update: m.update ? 1 : 0,
        delete: m.delete ? 1 : 0,
      })),
    };

    const closeModal = () => setIsModalOpen(false);

    if (RoleCollection) {
      await handleThunkWithToast(
        dispatch,
        updateRoleThunk,
        { id: RoleCollection.role, data: formatted },
        { showToast, onSuccess: closeModal },
      );
    } else {
      await handleThunkWithToast(dispatch, createRoleThunk, formatted, {
        showToast,
        onSuccess: closeModal,
      });
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={RoleCollection ? "Edit Role Details" : "Create New Role"}
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <FormInput<RoleFormValues>
            label="Role Name"
            type="text"
            name="role"
            placeholder="Administrator"
            register={register}
            error={errors.role}
          />

          {isMenus.length > 0 && (
            <table className="w-full table-auto text-sm border border-collapse">
              <thead>
                <tr className="border">
                  <th className="px-6 py-3.5">Menu</th>
                  <th className="px-6 py-3.5">View</th>
                  <th className="px-6 py-3.5">Create</th>
                  <th className="px-6 py-3.5">Update</th>
                  <th className="px-6 py-3.5">Delete</th>
                </tr>
              </thead>
              <tbody>
                {isMenus.map((row, index) => (
                  <tr key={row.menus} className="border">
                    <td className="px-6 py-3.5 text-left">
                      {row.menus}
                      <input
                        type="hidden"
                        {...register(`menus.${index}.menus`)}
                      />
                    </td>

                    <td className="px-6 py-3.5 text-center">
                      <input
                        type="checkbox"
                        {...register(`menus.${index}.view`)}
                      />
                    </td>

                    <td className="px-6 py-3.5 text-center">
                      <input
                        type="checkbox"
                        {...register(`menus.${index}.create`)}
                      />
                    </td>

                    <td className="px-6 py-3.5 text-center">
                      <input
                        type="checkbox"
                        {...register(`menus.${index}.update`)}
                      />
                    </td>

                    <td className="px-6 py-3.5 text-center">
                      <input
                        type="checkbox"
                        {...register(`menus.${index}.delete`)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-5 flex flex-row-reverse gap-3">
          <Button type="submit" className="gap-2">
            <Save size={16} /> {RoleCollection ? "Save Changes" : "Create Role"}
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
