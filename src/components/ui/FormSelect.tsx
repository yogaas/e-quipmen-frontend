import type { FieldError, UseFormRegister } from 'react-hook-form'

interface Option {
  label: string
  value: string | number
}

interface FormSelectProps<T extends Record<string, any>> {
  label: string
  name: keyof T
  options: Option[]
  register: UseFormRegister<T>
  error?: FieldError
  className?: string
}

export function FormSelect<T extends Record<string, any>>({
  label,
  name,
  options,
  register,
  error,
  className = '',
}: FormSelectProps<T>) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
        {label}
      </label>

      <select
        {...register(name as any)}
        className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 
        border rounded-xl text-sm focus:ring-2 
        focus:ring-primary-500 dark:text-white outline-none
        ${error 
          ? 'border-red-500 focus:ring-red-500' 
          : 'border-slate-200 dark:border-slate-700'}
        ${className}`}
      >
        <option value="">-- Select --</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-red-500 text-xs mt-1">
          {error.message}
        </p>
      )}
    </div>
  )
}
