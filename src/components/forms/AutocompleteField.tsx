"use client";

import React, { useEffect, useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface AutocompleteFieldProps {
    label: string;
    placeholder?: string;
    error?: FieldError;
    register?: UseFormRegisterReturn;
    suggestions: string[];
    onSelect?: (value: string) => void;
    value?: string;
}

export default function AutocompleteField({
    label,
    placeholder,
    error,
    register,
    suggestions,
    onSelect,
    value,
}: AutocompleteFieldProps) {
    const [filtered, setFiltered] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState(value || "");
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setInputValue(value || "");
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);

        register?.onChange(e);

        if (val.trim() === "") {
            setFiltered([]);
            return;
        }

        const matches = suggestions.filter((s) =>
            s.toLowerCase().includes(val.toLowerCase())
        );
        setFiltered(matches);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setTimeout(() => setFiltered([]), 150); // allow click selection
        setIsFocused(false);
        register?.onBlur(e);
    };

    const handleFocus = () => setIsFocused(true);

    const handleSelectInternal = (val: string) => {
        setInputValue(val);
        setFiltered([]);
        onSelect?.(val);
    };

    return (
        <div className="flex flex-col w-full mb-4 relative">
            {/* Label */}
            <label className="text-sm font-medium text-[var(--foreground)] ">
                {label}
            </label>

            {/* Input */}
            <input
                type="text"
                placeholder={placeholder}
                name={register?.name}
                ref={register?.ref}
                value={inputValue}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className={`
          w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] 
          bg-[var(--muted)] focus:bg-[var(--background)] 
          focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/40
          outline-none transition-colors pr-10
          ${error ? "border-red-500" : ""}
        `}
            />

            {/* Suggestions Dropdown */}
            {filtered.length > 0 && (
                <ul className="absolute top-full left-0 mt-1 w-full bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-md max-h-48 overflow-auto z-20">
                    {filtered.map((item) => (
                        <li
                            key={item}
                            onClick={() => handleSelectInternal(item)}
                            className="px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] cursor-pointer transition-colors"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}

            {/* Error Message */}
            {error && (
                <p className="text-red-500 text-xs mt-1 animate-fadeIn">
                    {error.message}
                </p>
            )}
        </div>
    );
}
