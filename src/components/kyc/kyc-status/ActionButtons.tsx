'use client';
import React from 'react';

type KYCStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';

interface ActionButtonsProps {
    status: KYCStatus;
    onResubmit?: () => void;
    onGoToDashboard?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ status, onResubmit, onGoToDashboard }) => {
    if (status === 'REJECTED') {
        return (
            <div className="mt-6">
                <button
                    onClick={onResubmit}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
                >
                    Resubmit Documents
                </button>
            </div>
        );
    }

    if (status === 'APPROVED') {
        return (
            <div className="mt-6">
                <button
                    onClick={onGoToDashboard}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
                >
                    Go to Dashboard
                </button>
            </div>
        );
    }

    return null;
};

export default ActionButtons;
