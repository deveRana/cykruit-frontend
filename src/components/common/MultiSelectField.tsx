import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface MultiSelectFieldProps {
    label?: string;
    icon?: React.ReactNode;
    selectedItems: string[];
    onChange: (items: string[]) => void;
    availableItems: string[];
    placeholder?: string;
    searchPlaceholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    id?: string;
    className?: string;
    emptyMessage?: string;
    selectedLabel?: string;
    tagColorClass?: string;
    maxItems?: number;
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
    label,
    icon,
    selectedItems,
    onChange,
    availableItems,
    placeholder = 'Search and add items...',
    searchPlaceholder = 'Search...',
    required = false,
    disabled = false,
    error,
    id,
    className = '',
    emptyMessage = 'No items found',
    selectedLabel = 'Selected',
    tagColorClass = 'bg-blue-50 text-blue-700 border-blue-200',
    maxItems,
}) => {
    const [searchValue, setSearchValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredItems, setFilteredItems] = useState<string[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (searchValue) {
            const filtered = availableItems.filter(
                (item) =>
                    item.toLowerCase().includes(searchValue.toLowerCase()) &&
                    !selectedItems.includes(item)
            );
            setFilteredItems(filtered.slice(0, 5));
        } else {
            setFilteredItems([]);
        }
    }, [searchValue, selectedItems, availableItems]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const addItem = (item: string) => {
        if (maxItems && selectedItems.length >= maxItems) {
            return; // Don't add if max limit reached
        }
        if (!selectedItems.includes(item)) {
            onChange([...selectedItems, item]);
        }
        setSearchValue('');
        setShowSuggestions(false);
    };

    const removeItem = (item: string) => {
        onChange(selectedItems.filter((i) => i !== item));
    };

    return (
        <div className={className} ref={wrapperRef}>
            {label && (
                <div className="mb-6">
                    <div className="flex items-center mb-2">
                        {icon && <span className="text-blue-600 mr-2">{icon}</span>}
                        <h2 className="text-xl font-bold text-gray-900">
                            {label} {required && <span className="text-red-500">*</span>}
                        </h2>
                    </div>
                </div>
            )}

            <div className="relative mb-6">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    {searchPlaceholder}
                </label>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        id={id}
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 300)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${error
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-300'
                            } ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                        placeholder={placeholder}
                        disabled={disabled}
                        autoComplete="off"
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error ? `${id}-error` : undefined}
                    />
                </div>
                {error && (
                    <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
                        {error}
                    </p>
                )}
                {showSuggestions && filteredItems.length > 0 && !disabled && (
                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
                        {filteredItems.map((item, index) => (
                            <button
                                key={index}
                                type="button"
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 text-sm transition-colors"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    addItem(item);
                                }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}
                {showSuggestions && searchValue && filteredItems.length === 0 && !disabled && (
                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
                        <div className="px-4 py-3 text-sm text-gray-500 text-center">
                            {emptyMessage}
                        </div>
                    </div>
                )}
            </div>

            {selectedItems.length > 0 && (
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        {selectedLabel} ({selectedItems.length}{maxItems ? `/${maxItems}` : ''})
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {selectedItems.map((item, index) => (
                            <span
                                key={index}
                                className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium border ${tagColorClass}`}
                            >
                                {item}
                                <button
                                    type="button"
                                    onClick={() => removeItem(item)}
                                    className="ml-2 hover:opacity-75 transition-opacity"
                                    disabled={disabled}
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                    {maxItems && selectedItems.length >= maxItems && (
                        <p className="mt-2 text-sm text-amber-600">
                            Maximum limit of {maxItems} items reached
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MultiSelectField;