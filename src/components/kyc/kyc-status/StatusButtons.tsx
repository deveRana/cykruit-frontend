'use client';
import React from 'react';

type KYCStatus = 'pending' | 'under_review' | 'approved' | 'rejected';

interface StatusButtonsProps {
    currentStatus: KYCStatus;
    setStatus: (status: KYCStatus) => void;
}

const StatusButtons: React.FC<StatusButtonsProps> = ({ currentStatus, setStatus }) => {
    const statuses: KYCStatus[] = ['pending', 'under_review', 'approved', 'rejected'];

    const colors: Record<KYCStatus, string> = {
        pending: 'yellow',
        under_review: 'blue',
        approved: 'green',
        rejected: 'red',
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <p className="text-sm text-gray-500 mb-3">Preview Different Statuses:</p>
            <div className="flex flex-wrap gap-3">
                {statuses.map((status) => (
                    <button
                        key={status}
                        onClick={() => setStatus(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentStatus === status
                                ? `bg-${colors[status]}-100 text-${colors[status]}-700 border-2 border-${colors[status]}-300`
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {status.replace('_', ' ').toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StatusButtons;
