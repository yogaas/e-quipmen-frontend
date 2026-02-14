import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Search, Check, X } from 'lucide-react'
import {
  Controller,
  type Control,
  type FieldValues,
  type RegisterOptions,
  type Path,
} from 'react-hook-form'

interface Option {
  value: string;
  label: string;
}

interface FormSelectSearchProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  options: Option[]
  placeholder?: string
  label?: string
  rules?: RegisterOptions<T, Path<T>>
}

export function FormSelectSearch<T extends FieldValues>({
  name,
  control,
  options,
  placeholder = 'Select an option...',
  label,
  rules
}: FormSelectSearchProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const filteredOptions = options.filter(option =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const selectedOption = options.find(opt => opt.value === field.value.toString());

        return (
          <div>
            {label && (
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {label}
              </label>
            )}

            <div className="w-full relative" ref={wrapperRef}>
              <div
                className={`w-full bg-slate-50 border rounded-xl text-sm px-4 py-2.5 flex items-center justify-between cursor-pointer ${
                  fieldState.error ? 'border-red-500' : 'border-slate-200'
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
                  {selectedOption ? selectedOption.label : placeholder}
                </span>

                <div className="flex items-center gap-2">
                  {selectedOption && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        field.onChange('');
                      }}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <X size={14} />
                    </div>
                  )}
                  <ChevronDown size={16} className={`${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {fieldState.error && (
                <p className="mt-1 text-sm text-red-500">
                  {fieldState.error.message}
                </p>
              )}

              {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 flex flex-col">
                  <div className="p-2 border-b sticky top-0 bg-white">
                    <div className="relative">
                      <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                      <input
                        type="text"
                        className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-50 border rounded-md"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>

                  <div className="overflow-y-auto flex-1">
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option) => (
                        <div
                          key={option.value}
                          className={`px-4 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-blue-50 ${
                            field.value === option.value
                              ? 'bg-blue-50 text-blue-600 font-medium'
                              : ''
                          }`}
                          onClick={() => {
                            field.onChange(option.value);
                            setIsOpen(false);
                            setSearchTerm('');
                          }}
                        >
                          {option.label}
                          {field.value === option.value && <Check size={14} />}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500 text-center">
                        No options found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }}
    />
  );
}
