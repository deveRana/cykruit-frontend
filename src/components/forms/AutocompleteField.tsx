"use client";

import React, { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface AutocompleteFieldProps {
    label: string;
    placeholder?: string;
    error?: FieldError;
    register: UseFormRegisterReturn;
    suggestions: string[];
    onSelect?: (value: string) => void;
}

export default function AutocompleteField({
    label,
    placeholder,
    error,
    register,
    suggestions,
    onSelect,
}: AutocompleteFieldProps) {
    const [filtered, setFiltered] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.trim() === "") {
            setFiltered([]);
            return;
        }

        const matches = suggestions.filter((s) =>
            s.toLowerCase().includes(value.toLowerCase())
        );
        setFiltered(matches);
    };

    const handleSelect = (value: string) => {
        setInputValue(value);
        setFiltered([]);
        onSelect?.(value);
    };

    return (
        <div className="flex flex-col w-full mb-4 relative">
            {/* Label */}
            <label className="text-sm font-medium text-[var(--foreground)]">
                {label}
            </label>

            {/* Input */}
            <input
                type="text"
                placeholder={placeholder}
                {...register}
                value={inputValue}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--muted)] focus:bg-[var(--background)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/40 outline-none transition-colors"
            />

            {/* Suggestions */}
            {filtered.length > 0 && (
                <ul className="absolute top-full mt-1 w-full bg-white border border-[var(--border)] rounded-lg shadow-md max-h-40 overflow-auto z-20">
                    {filtered.map((item) => (
                        <li
                            key={item}
                            onClick={() => handleSelect(item)}
                            className="px-4 py-2 text-sm hover:bg-[var(--muted)] cursor-pointer transition-colors"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}

            {/* Error */}
            {error && (
                <p className="text-red-500 text-xs mt-1 animate-fadeIn">
                    {error.message}
                </p>
            )}
        </div>
    );
}
