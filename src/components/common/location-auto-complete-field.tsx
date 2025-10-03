'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { useLocationSearch } from '@/features/common/hooks/useLocationSearch';
import { LocationSuggestion } from '@/features/common/types/location';

interface LocationAutocompleteFieldProps {
    // Required props
    value: string;
    onChange: (location: LocationSuggestion | null) => void;

    // Optional props
    label?: string;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    id?: string;
    showIcon?: boolean;
    emptyMessage?: string;
    minChars?: number;
}

const LocationAutocompleteField: React.FC<LocationAutocompleteFieldProps> = ({
    value,
    onChange,
    label = 'Location',
    placeholder = 'Search for a city...',
    className = '',
    inputClassName = '',
    required = false,
    disabled = false,
    error,
    id,
    showIcon = true,
    emptyMessage = 'No locations found',
    minChars = 2,
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [hasSelected, setHasSelected] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const { suggestions, isSearchLoading, setSearchQuery } = useLocationSearch();

    // Update input value when prop changes
    useEffect(() => {
        setInputValue(value);
    }, [value]);

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
        setInputValue(newValue);
        setHasSelected(false); // User is typing, so they haven't selected yet

        // Clear the selected location when user starts typing again
        onChange(null);

        if (newValue.trim().length >= minChars) {
            setSearchQuery(newValue);
            setShowSuggestions(true);
        } else {
            setSearchQuery('');
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion: LocationSuggestion) => {
        setInputValue(suggestion.fullAddress);
        onChange(suggestion);
        setShowSuggestions(false);
        setHasSelected(true); // Mark that user has selected a location
        setSearchQuery(''); // Clear search to prevent showing "No location found"
    };

    const handleFocus = () => {
        // Only show suggestions if user is actively typing (hasn't selected yet)
        if (!hasSelected && inputValue.trim().length >= minChars) {
            setShowSuggestions(true);
        }
    };

    return (
        <div className={`relative ${className}`} ref={wrapperRef}>
            {label && (
                <label
                    htmlFor={id}
                    className="flex items-center text-sm font-semibold text-gray-700 mb-2"
                >
                    {showIcon && <MapPin className="w-4 h-4 mr-2 text-blue-600" />}
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="relative">
                <input
                    type="text"
                    id={id}
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${error
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-300'
                        } ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'} ${inputClassName}`}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    autoComplete="off"
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${id}-error` : undefined}
                />

                {/* Loading Spinner */}
                {isSearchLoading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                    </div>
                )}
            </div>

            {error && (
                <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}

            {/* Suggestions Dropdown */}
            {showSuggestions && !disabled && inputValue.trim().length >= minChars && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
                    {isSearchLoading ? (
                        <div className="px-4 py-3 text-sm text-gray-500 flex items-center justify-center">
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Searching...
                        </div>
                    ) : suggestions.length > 0 ? (
                        suggestions.map((suggestion) => (
                            <button
                                key={suggestion.id}
                                type="button"
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                <div className="flex items-start">
                                    <MapPin className="w-4 h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {suggestion.city}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {[suggestion.state, suggestion.country]
                                                .filter(Boolean)
                                                .join(', ')}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="px-4 py-3 text-sm text-gray-500 text-center">
                            {emptyMessage}
                        </div>
                    )}
                </div>
            )}

            {/* Helper Text */}
            {!error && inputValue.trim().length > 0 && inputValue.trim().length < minChars && (
                <p className="mt-1 text-xs text-gray-500">
                    Type at least {minChars} characters to search
                </p>
            )}
        </div>
    );
};

export default LocationAutocompleteField;