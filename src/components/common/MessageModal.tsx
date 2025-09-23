"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { X } from "lucide-react";

// Types
export type MessageType = "success" | "error" | "warning" | "info";

export interface BackendMessage {
    message?: string[];
    error?: string;
    statusCode?: number;
}

interface Message {
    type: MessageType;
    content: BackendMessage | string;
    isVisible: boolean;
    onClose?: () => void;
}

interface ModalContextType {
    showMessage: (type: MessageType, content: BackendMessage | string, onClose?: () => void) => void;
    hideMessage: () => void;
    currentMessage: Message;
}

// Context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useMessageModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useMessageModal must be used within MessageModalProvider");
    return context;
};

// Provider
export const MessageModalProvider = ({ children }: { children: ReactNode }) => {
    const [currentMessage, setCurrentMessage] = useState<Message>({
        type: "info",
        content: "",
        isVisible: false,
    });

    const showMessage = (type: MessageType, content: BackendMessage | string, onClose?: () => void) => {
        setCurrentMessage({ type, content, isVisible: true, onClose });
    };

    const hideMessage = () => {
        if (currentMessage.onClose) currentMessage.onClose();
        setCurrentMessage({ ...currentMessage, isVisible: false, onClose: undefined });
    };

    const renderContent = () => {
        if (typeof currentMessage.content === "string") return <p className="text-gray-700">{currentMessage.content}</p>;

        const backend = currentMessage.content as BackendMessage;
        const messages: string[] = [];
        if (backend.message) messages.push(...backend.message);
        if (backend.error) messages.push(`Error: ${backend.error}`);
        if (backend.statusCode) messages.push(`Status Code: ${backend.statusCode}`);

        return (
            <div className="space-y-1">
                {messages.map((msg, idx) => (
                    <p key={idx} className="text-gray-700">{msg}</p>
                ))}
            </div>
        );
    };

    return (
        <ModalContext.Provider value={{ showMessage, hideMessage, currentMessage }}>
            {children}

            {currentMessage.isVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
                        <button
                            onClick={hideMessage}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
                        >
                            <X size={20} />
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
                                className="px-4 py-2 bg-[#0062FF] text-white rounded-md hover:bg-[#0050cc] transition"
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
