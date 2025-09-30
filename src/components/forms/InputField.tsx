'use client';

import React, { useState, useEffect } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
    label: string;
    type: string;
    placeholder?: string;
    error?: FieldError;
    register: UseFormRegisterReturn;
    value?: string;
    showStrength?: boolean;
    icon?: React.ReactNode; // left icon only
    autoComplete?: string;
}

export function InputField({
    label,
    type,
    placeholder,
    error,
    register,
    value = "",
    showStrength = false,
    icon,
    autoComplete = "off",
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
        <div className="w-full mb-3.5">
            {/* Label */}
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                {label}
            </label>

            {/* Input */}
            <div className="relative">
                {icon && (
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {icon}
                    </span>
                )}
                <input
                    type={isPassword && show ? "text" : type}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    {...register}
                    className={`w-full ${icon ? "pl-9" : "pl-3"} ${isPassword ? "pr-9" : "pr-3"} py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all text-gray-900 text-sm`}
                    style={{ "--tw-ring-color": "#0062FF" } as React.CSSProperties}
                />

                {/* Password Show/Hide */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShow(prev => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                )}
            </div>

            {/* Password Strength */}
            {showStrength && value && isPassword && (
                <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className={`flex-1 h-2 rounded-full transition-all duration-300 ${i <= strength ? getStrengthColor() : "bg-gray-300"}`}
                            />
                        ))}
                    </div>
                    <span className={`text-xs font-medium ${strength <= 1 ? "text-red-500" : strength === 2 ? "text-yellow-400" : "text-green-500"}`}>
                        {/* {strengthLabel} */}
                    </span>
                </div>
            )}

            {/* Error */}
            {error && (
                <p className="text-xs text-red-500 mt-1">{error.message}</p>
            )}
        </div>
    );
}
