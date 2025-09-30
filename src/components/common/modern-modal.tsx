'use client';
import React, { MouseEvent } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';
type ModalType = 'default' | 'success' | 'error' | 'warning' | 'info';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: ModalSize;
    type?: ModalType;
    showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'sm',
    type = 'default',
    showCloseButton = true,
}) => {
    if (!isOpen) return null;

    const sizeClasses: Record<ModalSize, string> = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    const typeIcons: Record<ModalType, JSX.Element | null> = {
        default: null,
        success: <CheckCircle className="w-6 h-6 text-green-500" />,
        error: <AlertCircle className="w-6 h-6 text-red-500" />,
        warning: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
        info: <Info className="w-6 h-6" style={{ color: '#0062FF' }} />,
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                style={{ animation: 'fadeIn 0.2s ease-out' }}
                onClick={onClose}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
                <div
                    className={`bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]}`}
                    style={{ animation: 'slideUp 0.3s ease-out' }}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                >
                    {(title || showCloseButton) && (
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                {typeIcons[type]}
                                {title && (
                                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                                )}
                            </div>
                            {showCloseButton && (
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 rounded flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    )}

                    <div className="px-4 py-3">{children}</div>

                    {footer && (
                        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Modal;