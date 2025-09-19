"use client";

import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface TextareaFieldProps {
    label: string;
    placeholder?: string;
    error?: FieldError;
    register: UseFormRegisterReturn;
    rows?: number;
}

export default function TextareaField({
    label,
    placeholder,
    error,
    register,
    rows = 4,
}: TextareaFieldProps) {
    return (
        <div className="flex flex-col w-full mb-4">
            {/* Label */}
            <label className="text-sm font-medium text-[var(--foreground)]">
                {label}
            </label>

            {/* Textarea */}
            <textarea
                {...register}
                placeholder={placeholder}
                rows={rows}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--muted)] focus:bg-[var(--background)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/40 outline-none resize-none transition-colors"
            />

            {/* Error */}
            {error && (
                <p className="text-red-500 text-xs mt-1 animate-fadeIn">
                    {error.message}
                </p>
            )}
        </div>
    );
}
