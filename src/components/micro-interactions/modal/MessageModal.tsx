"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { X } from "lucide-react";

export type MessageType = "success" | "error" | "warning" | "info";

export interface BackendMessage {
    message?: string[]; // array of messages from backend
    error?: string; // error type
    statusCode?: number;
}

interface Message {
    type: MessageType;
    content: BackendMessage | string; // string or structured backend message
    isVisible: boolean;
    onClose?: () => void; // optional callback when modal closes
}

interface ModalContextType {
    showMessage: (type: MessageType, content: BackendMessage | string, onClose?: () => void) => void;
    hideMessage: () => void;
    currentMessage: Message;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useMessageModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useMessageModal must be used within MessageModalProvider");
    return context;
};

export const MessageModalProvider = ({ children }: { children: ReactNode }) => {
    const [currentMessage, setCurrentMessage] = useState<Message>({
        type: "info",
        content: "",
        isVisible: false,
    });

    // Show message with optional callback
    const showMessage = (type: MessageType, content: BackendMessage | string, onClose?: () => void) => {
        setCurrentMessage({ type, content, isVisible: true, onClose });
    };

    // Hide message and trigger callback if exists
    const hideMessage = () => {
        if (currentMessage.onClose) currentMessage.onClose();
        setCurrentMessage({ ...currentMessage, isVisible: false, onClose: undefined });
    };

    // Unified rendering of string or backend message
    const renderContent = () => {
        if (typeof currentMessage.content === "string") return currentMessage.content;

        const backend = currentMessage.content as BackendMessage;
        const messages: string[] = [];

        if (backend.message) messages.push(...backend.message);
        if (backend.error) messages.push(`Error: ${backend.error}`);
        if (backend.statusCode) messages.push(`Status Code: ${backend.statusCode}`);

        return (
            <div className="space-y-1">
                {messages.map((msg, idx) => (
                    <p key={idx} className="text-gray-700 dark:text-gray-200">
                        {msg}
                    </p>
                ))}
            </div>
        );
    };

    return (
        <ModalContext.Provider value={{ showMessage, hideMessage, currentMessage }}>
            {children}

            {/* Modal UI */}
            {currentMessage.isVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full relative">
                        <button
                            onClick={hideMessage}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
                        >
                            <X />
                        </button>

                        <h3
                            className={`text-lg font-bold mb-2 ${currentMessage.type === "success"
                                    ? "text-green-600"
                                    : currentMessage.type === "error"
                                        ? "text-red-600"
                                        : currentMessage.type === "warning"
                                            ? "text-yellow-600"
                                            : "text-blue-600"
                                }`}
                        >
                            {currentMessage.type.toUpperCase()}
                        </h3>

                        {renderContent()}

                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={hideMessage}
                                className="px-4 py-2 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-lg hover:bg-[var(--accent-hover)] transition"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};
