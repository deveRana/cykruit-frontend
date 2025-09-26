"use client";

import React, { useEffect, useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface AutocompleteFieldProps {
    label: string;
    placeholder?: string;
    error?: FieldError;
    register?: UseFormRegisterReturn; // make optional
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

    useEffect(() => {
        setInputValue(value || "");
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);

        // 🔹 call react-hook-form's onChange if provided
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
        register?.onBlur(e); // 🔹 forward blur event
    };

    const handleSelectInternal = (val: string) => {
        setInputValue(val);
        setFiltered([]);
        onSelect?.(val);
    };

    return (
        <div className="flex flex-col w-full relative">
            <label className="text-sm font-medium ">
                {label}
            </label>
            <input
                type="text"
                placeholder={placeholder}
                name={register?.name}
                ref={register?.ref}
                value={inputValue}
                onChange={handleChange}
                onBlur={handleBlur}

                className={`
          w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] 
          bg-[var(--muted)] focus:bg-[var(--background)] 
          focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/40
          outline-none transition-colors pr-10`
                }
            />

            {
                filtered.length > 0 && (
                    <ul className="absolute top-full mt-1 w-full bg-white border border-[var(--border)] rounded-lg shadow-md max-h-40 overflow-auto z-20">
                        {filtered.map((item) => (
                            <li
                                key={item}
                                onClick={() => handleSelectInternal(item)}
                                className="px-4 py-2 text-sm hover:bg-[var(--muted)] cursor-pointer transition-colors"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )
            }

            {error && (
                <p className="text-red-500 text-xs mt-1 animate-fadeIn">
                    {error.message}
                </p>
            )}
        </div>
    );
}
