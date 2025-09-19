"use client";

import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface SelectFieldProps {
    label: string;
    options: { value: string; label: string }[];
    placeholder?: string;
    error?: FieldError;
    register: UseFormRegisterReturn;
}

export default function SelectField({
    label,
    options,
    placeholder,
    error,
    register,
}: SelectFieldProps) {
    return (
        <div className="flex flex-col w-full mb-4">
            {/* Label */}
            <label className="text-sm font-medium text-[var(--foreground)]">
                {label}
            </label>

            {/* Select */}
            <select
                {...register}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--muted)] focus:bg-[var(--background)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/40 outline-none transition-colors"
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            {/* Error */}
            {error && (
                <p className="text-red-500 text-xs mt-1 animate-fadeIn">
                    {error.message}
                </p>
            )}
        </div>
    );
}
