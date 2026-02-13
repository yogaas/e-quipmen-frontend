import {  Save, X, } from 'lucide-react';
import {
  createUserThunk,
  updateUserThunk
} from '../../features/users/usersSlice'
import { useAppDispatch } from '../../app/hooks'
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import type { User } from '../../features/users/users.type'
import { z } from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '../../components/common/ToastContext';
import { FormInput } from '../../components/ui/FormInput';
import { useEffect } from 'react';
import { IMapper } from '../../app/mapper';

const userSchema = z.object({
    name: z.string().min(3, 'Name minimal 3 karakter'),
    email: z.string().email('Email tidak valid'),
    password: z.string().min(8, 'Minimal input 8 karakter'),
})
type UserFormValues = z.infer<typeof userSchema>

interface UserCreateProp{
    isModalOpen : boolean
    setIsModalOpen : (status : boolean) => void
    userCollection?: User | null
}

export default function FromUser({isModalOpen, setIsModalOpen, userCollection} : UserCreateProp) {

    const { showToast } = useToast();
    const dispatch = useAppDispatch()

    const mappingForm = IMapper<UserFormValues>({
         name: s => s?.name ?? '',
         email: s => s?.email ?? '',
         password: () => ''
    });
    const defaultValues = mappingForm(userCollection ?? undefined)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues,
      })

    useEffect(() => {
        reset(defaultValues)
    }, [userCollection, reset])

    const onSubmit = async (data: UserFormValues) => {
        if (userCollection) {
            const result = await dispatch(updateUserThunk({ id: userCollection.id, data }))
            if (createUserThunk.rejected.match(result)) {
                showToast("Error:" + result.payload, 'error')
              }else{
                setIsModalOpen(false)
                showToast('Data berhasil didimpan.');
            }
        } else {
            const result = await dispatch(createUserThunk(data))
            
            if (createUserThunk.rejected.match(result)) {
                showToast("Error: " + result.payload, 'error')
            }else{
                setIsModalOpen(false)
                showToast('Data berhasil didimpan.');
            }
        }
    }

    return (
        <>
        <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={userCollection ? 'Edit User Details' : 'Create New User'}
        footer={''}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
       
            <div className="grid grid-cols-1 gap-4">
                <FormInput<UserFormValues>
                    label="Display Name"
                    type="nama"
                    name="name"
                    register={register}
                    error={errors.name}
                    />

                <FormInput<UserFormValues>
                    label="Email Address"
                    type="email"
                    name="email"
                    register={register}
                    error={errors.email}
                    />

                <FormInput<UserFormValues>
                        label="Password"
                        type="password"
                        name="password"
                        register={register}
                        error={errors.password}
                        />
                
            </div>

            <div className='mt-5'>
            <div className="flex flex-row-reverse gap-3">
                <Button type="submit" className="gap-2">
                    <Save size={16} /> {userCollection ? 'Save Changes' : 'Create User'}
                </Button>
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="gap-2">
                    <X size={16} /> Cancel
                </Button>
            </div>
        </div>
        </form>
      </Modal>
      </>
    )
}