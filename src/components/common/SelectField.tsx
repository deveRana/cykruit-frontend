import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectFieldProps {
    // Required props
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];

    // Optional props
    label?: string;
    icon?: React.ReactNode;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    id?: string;
    className?: string;
    selectClassName?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
    value,
    onChange,
    options,
    label,
    icon,
    placeholder = 'Select an option',
    required = false,
    disabled = false,
    error,
    id,
    className = '',
    selectClassName = '',
}) => {
    return (
        <div className={className}>
            {label && (
                <label
                    htmlFor={id}
                    className="flex items-center text-sm font-semibold text-gray-700 mb-2"
                >
                    {icon && <span className="mr-2 text-blue-600">{icon}</span>}
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                <select
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all h-[50px] appearance-none bg-white ${
                        error ? 'border-red-300' : 'border-gray-300'
                    } ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'cursor-pointer'} ${selectClassName}`}
                    required={required}
                    disabled={disabled}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${id}-error` : undefined}
                >
                    <option value="">{placeholder}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown 
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none transition-colors ${
                        disabled ? 'text-gray-400' : 'text-gray-500'
                    }`} 
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600" id={`${id}-error`}>
                    {error}
                </p>
            )}
        </div>
    );
};

export default SelectField;