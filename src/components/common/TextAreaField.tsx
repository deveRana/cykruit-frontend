import React from 'react';

interface TextAreaFieldProps {
    label?: string;
    icon?: React.ReactNode;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    id?: string;
    className?: string;
    rows?: number;
    helperText?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
    label,
    icon,
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
    error,
    id,
    className = '',
    rows = 8,
    helperText,
}) => {
    return (
        <div className={className}>
            {label && (
                <label
                    htmlFor={id}
                    className="flex items-center text-sm font-semibold text-gray-700 mb-2"
                >
                    {icon && <span className="mr-2 text-blue-600">{icon}</span>}
                    {label} {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <textarea
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all resize-none ${error
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-300'
                    } ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${id}-error` : undefined}
            />
            {error && (
                <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
            {helperText && !error && (
                <p className="mt-2 text-sm text-gray-500">{helperText}</p>
            )}
        </div>
    );
};

export default TextAreaField;