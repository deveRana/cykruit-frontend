import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

interface AutocompleteFieldProps {
    label?: string;
    icon?: React.ReactNode;
    value: string;
    onChange: (value: string) => void;
    suggestions: string[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    id?: string;
    className?: string;
    onFocus?: () => void;
    onBlur?: () => void;
}

const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
    label,
    icon,
    value,
    onChange,
    suggestions,
    placeholder,
    required = false,
    disabled = false,
    error,
    id,
    className = '',
    onFocus,
    onBlur,
}) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`} ref={wrapperRef}>
            {label && (
                <label
                    htmlFor={id}
                    className="flex items-center text-sm font-semibold text-gray-700 mb-2"
                >
                    {icon && <span className="mr-2 text-blue-600">{icon}</span>}
                    {label} {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                type="text"
                id={id}
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                    setShowSuggestions(true);
                }}
                onFocus={() => {
                    setShowSuggestions(true);
                    onFocus?.();
                }}
                onBlur={() => {
                    setTimeout(() => setShowSuggestions(false), 200);
                    onBlur?.();
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${error
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-300'
                    } ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                autoComplete="off"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${id}-error` : undefined}
            />
            {error && (
                <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
            {showSuggestions && suggestions.length > 0 && !disabled && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            type="button"
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 text-sm transition-colors"
                            onClick={() => {
                                onChange(suggestion);
                                setShowSuggestions(false);
                            }}
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AutocompleteField;