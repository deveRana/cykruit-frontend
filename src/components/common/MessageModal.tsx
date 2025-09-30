'use client';

import React, { createContext, useContext, useState, ReactNode } from "react";
import Modal from "@/components/common/modern-modal";
import Button from "@/components/common/button-spinner";

// Types
export type MessageType = "success" | "error" | "warning" | "info";

export interface BackendMessage {
    message?: string[];
    error?: string;
    statusCode?: number;
}

interface Message {
    type: MessageType;
    title?: string;
    content: BackendMessage | string;
    size?: "sm" | "md" | "lg";
    isVisible: boolean;
    onClose?: () => void;
    footer?: ReactNode;
}

interface ModalContextType {
    showMessage: (message: Partial<Message>) => void;
    hideMessage: () => void;
    currentMessage: Message;
}

// Context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useMessageModal = () => {
    const context = useContext(ModalContext);
    if (!context)
        throw new Error("useMessageModal must be used within MessageModalProvider");
    return context;
};

// Provider
export const MessageModalProvider = ({ children }: { children: ReactNode }) => {
    const [currentMessage, setCurrentMessage] = useState<Message>({
        type: "info",
        content: "",
        isVisible: false,
        size: "md",
    });

    const showMessage = (message: Partial<Message>) => {
        setCurrentMessage(prev => ({
            ...prev,
            ...message,
            isVisible: true,
        }));
    };

    const hideMessage = () => {
        if (currentMessage.onClose) currentMessage.onClose();
        setCurrentMessage(prev => ({
            ...prev,
            isVisible: false,
            onClose: undefined,
        }));
    };

    const renderContent = () => {
        if (!currentMessage.content) return null;

        if (typeof currentMessage.content === "string") {
            return <p className="text-gray-700">{currentMessage.content}</p>;
        }

        const backend = currentMessage.content as BackendMessage;
        const messages: string[] = [];
        if (backend.message) messages.push(...backend.message);
        if (backend.error) messages.push(`Error: ${backend.error}`);
        if (backend.statusCode) messages.push(`Status Code: ${backend.statusCode}`);

        return (
            <div className="space-y-1">
                {messages.map((msg, idx) => (
                    <p key={idx} className="text-gray-700">
                        {msg}
                    </p>
                ))}
            </div>
        );
    };

    return (
        <ModalContext.Provider value={{ showMessage, hideMessage, currentMessage }}>
            {/* Global keyframes for animations */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {children}

            <Modal
                isOpen={currentMessage.isVisible}
                onClose={hideMessage}
                title={currentMessage.title || currentMessage.type.toUpperCase()}
                type={currentMessage.type}
                size={currentMessage.size}
                footer={
                    currentMessage.footer ?? (
                        <Button onClick={hideMessage} variant="primary">
                            OK
                        </Button>
                    )
                }
            >
                {renderContent()}
            </Modal>
        </ModalContext.Provider>
    );
};