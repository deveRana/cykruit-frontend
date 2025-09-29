'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface AutocompleteInputProps {
    // Required props
    value: string;
    onChange: (value: string) => void;

    // Optional props
    label?: string;
    placeholder?: string;
    suggestions?: string[];
    onSelect?: (value: string) => void;
    className?: string;
    inputClassName?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    id?: string;
    maxSuggestions?: number;
    showCloseIcon?: boolean;
    emptyMessage?: string;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
    value,
    onChange,
    label,
    placeholder = '',
    suggestions = [],
    onSelect,
    className = '',
    inputClassName = '',
    required = false,
    disabled = false,
    error,
    id,
    maxSuggestions = 10,
    showCloseIcon = false,
    emptyMessage = 'No suggestions found',
}) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Filter suggestions based on input value
    useEffect(() => {
        if (value && value.trim().length > 0) {
            const filtered = suggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered.slice(0, maxSuggestions));
        } else {
            setFilteredSuggestions(suggestions.slice(0, maxSuggestions));
        }
    }, [value, suggestions, maxSuggestions]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion: string) => {
        onChange(suggestion);
        if (onSelect) {
            onSelect(suggestion);
        }
        setShowSuggestions(false);
    };

    return (
        <div className={`relative ${className}`} ref={wrapperRef}>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <input
                type="text"
                id={id}
                value={value}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
                className={`w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${error
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300'
                    } ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'} ${inputClassName}`}
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

            {showSuggestions && !disabled && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                    {filteredSuggestions.length > 0 ? (
                        filteredSuggestions.map((item, index) => (
                            <button
                                key={index}
                                type="button"
                                className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm flex justify-between items-center transition-colors"
                                onClick={() => handleSuggestionClick(item)}
                            >
                                <span>{item}</span>
                                {showCloseIcon && (
                                    <X className="w-3 h-3 text-gray-400" />
                                )}
                            </button>
                        ))
                    ) : value.trim().length > 0 ? (
                        <div className="px-3 py-2 text-sm text-gray-500">
                            {emptyMessage}
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default AutocompleteInput;