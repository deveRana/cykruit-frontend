"use client";

import React from "react";
import { ChevronLeft, Send } from "lucide-react";

interface ActionButtonsProps {
    onBack: () => void;
    onSubmit: () => void;
    disabled: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onBack, onSubmit, disabled }) => {
    return (
        <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
            <button
                onClick={onBack}
                className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back
            </button>
            <button
                onClick={onSubmit}
                disabled={disabled}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${!disabled ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
            >
                Submit for Verification
                <Send className="w-5 h-5 ml-2" />
            </button>
        </div>
    );
};

export default ActionButtons;