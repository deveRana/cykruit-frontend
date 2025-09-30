'use client';
import React from 'react';

type ButtonSpinnerVariant = 'primary' | 'secondary' | 'danger';

interface ButtonSpinnerProps {
    children: React.ReactNode;
    onClick?: () => void;  // Make optional
    type?: 'button' | 'submit' | 'reset';  // Add this
    variant?: ButtonSpinnerVariant;
    disabled?: boolean;
    loading?: boolean;
    classes?: string;
}
const ButtonSpinner: React.FC<ButtonSpinnerProps> = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled = false,
    loading = false,
    classes = '',
}) => {
    const defaultClasses: Record<ButtonSpinnerVariant, string> = {
        primary:
            'px-6 py-3 rounded-lg font-semibold text-sm text-white shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        secondary:
            'px-6 py-3 rounded-lg font-semibold text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        danger:
            'px-6 py-3 rounded-lg font-semibold text-sm bg-red-500 text-white shadow-lg hover:shadow-xl hover:bg-red-600 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
    };

    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled || loading}
            className={`${defaultClasses[variant]} ${classes}`}
            style={variant === 'primary' ? { backgroundColor: '#0062FF' } : {}}
        >
            {loading && (
                <div
                    className={`w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin`}
                />
            )}
            <span className={loading ? 'ml-2' : ''}>{children}</span>
        </button>
    );
};

export default ButtonSpinner;
