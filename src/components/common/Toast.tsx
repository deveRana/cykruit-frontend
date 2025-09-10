"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    addToast: (message: string, type?: ToastType) => void;
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const addToast = (message: string, type: ToastType = "info") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 4000); // auto-remove after 4s
    };

    const success = (message: string) => addToast(message, "success");
    const error = (message: string) => addToast(message, "error");
    const info = (message: string) => addToast(message, "info");

    return (
        <ToastContext.Provider value={{ addToast, success, error, info }}>
            {children}
            <div className="fixed top-5 right-5 flex flex-col gap-2 z-50">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`flex items-center justify-between px-4 py-2 rounded shadow-md text-white font-medium transition-all
              ${t.type === "success" ? "bg-green-500" : t.type === "error" ? "bg-red-500" : "bg-blue-500"}`}
                    >
                        <span>{t.message}</span>
                        <button onClick={() => removeToast(t.id)}>
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within a ToastProvider");
    return context;
};
