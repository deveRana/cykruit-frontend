"use client";

import React, { useState, useEffect } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
    label: string;
    type: string;
    placeholder?: string;
    error?: FieldError;
    register: UseFormRegisterReturn;
    value?: string; // current value for strength calculation
    showStrength?: boolean; // enable strength indicator
}

export default function InputField({
    label,
    type,
    placeholder,
    error,
    register,
    value = "",
    showStrength = false,
}: InputFieldProps) {
    const [show, setShow] = useState(false);
    const isPassword = type === "password";
    const [strength, setStrength] = useState(0);
    const [strengthLabel, setStrengthLabel] = useState("");

    useEffect(() => {
        if (showStrength && isPassword) {
            let score = 0;
            if (value.length >= 6) score += 1;
            if (/[A-Z]/.test(value)) score += 1;
            if (/\d/.test(value)) score += 1;
            if (/[\W_]/.test(value)) score += 1;

            setStrength(score);

            if (score <= 1) setStrengthLabel("Weak");
            else if (score === 2) setStrengthLabel("Medium");
            else if (score >= 3) setStrengthLabel("Strong");
            else setStrengthLabel("");
        }
    }, [value, isPassword, showStrength]);

    const getStrengthColor = () => {
        if (strength <= 1) return "bg-red-500";
        if (strength === 2) return "bg-yellow-400";
        if (strength >= 3) return "bg-green-500";
        return "";
    };

    return (
        <div className="flex flex-col w-full mb-4">
            {/* Label */}
            <label className="text-sm font-medium text-[var(--foreground)]">{label}</label>

            {/* Input */}
            <div className="relative">
                <input
                    type={isPassword && show ? "text" : type}
                    placeholder={placeholder}
                    {...register}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--muted)] focus:bg-[var(--background)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/40 outline-none pr-10 transition-colors"
                />

                {/* Show/Hide password */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShow((prev) => !prev)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--primary)] active:scale-90 transition-all cursor-pointer"
                    >
                        {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>

            {/* Password Strength Indicator */}
            {showStrength && value && (
                <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className={`flex-1 h-2 rounded-full transition-all duration-300 ${i <= strength ? getStrengthColor() : "bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                    <span
                        className={`text-xs font-medium ${strength <= 1 ? "text-red-500" : strength === 2 ? "text-yellow-400" : "text-green-500"
                            }`}
                    >
                        {strengthLabel}
                    </span>
                </div>
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
