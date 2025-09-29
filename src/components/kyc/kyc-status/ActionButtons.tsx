'use client';
import React from 'react';

interface ActionButtonsProps {
    status: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ status }) => {
    if (status === 'rejected') {
        return (
            <div className="mt-6">
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md">
                    Resubmit Documents
                </button>
            </div>
        );
    }
    if (status === 'approved') {
        return (
            <div className="mt-6">
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md">
                    Go to Dashboard
                </button>
            </div>
        );
    }
    return null;
};

export default ActionButtons;