'use client';
import React from 'react';
import { FileText } from 'lucide-react';

interface SubmittedDetailsProps {
    data: {
        companyName: string;
        website?: string;
        email?: string;
        type?: string;
        location?: string;
        submittedOn?: string;
        documentName?: string;
    };
}

// 👇 helper to format datetime
const formatDate = (isoString?: string) => {
    if (!isoString) return '-';
    const date = new Date(isoString);

    const day = date.getDate();
    const suffix =
        day % 10 === 1 && day !== 11 ? 'st' :
            day % 10 === 2 && day !== 12 ? 'nd' :
                day % 10 === 3 && day !== 13 ? 'rd' : 'th';

    const month = date.toLocaleString('en-US', { month: 'short' }); // Oct
    const year = date.getFullYear();

    const time = date
        .toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

    return `${day}${suffix} ${month} ${year} ${time}`;
};

const SubmittedDetails: React.FC<SubmittedDetailsProps> = ({ data }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Submitted Details</h3>
        <div className="space-y-4">
            {Object.entries(data).map(([key, value]) => {
                let displayValue = value || '-';

                if (key === 'submittedOn') {
                    displayValue = formatDate(value as string);
                }

                return (
                    <div key={key}>
                        <p className="text-sm text-gray-500 mb-1 capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}
                        </p>
                        {key === 'documentName' ? (
                            <div className="flex items-center space-x-2 mt-2">
                                <FileText className="w-5 h-5 text-blue-600" />
                                <span className="font-medium text-gray-900">
                                    {displayValue}
                                </span>
                            </div>
                        ) : (
                            <p className="font-medium text-gray-900">{displayValue}</p>
                        )}
                    </div>
                );
            })}
        </div>
    </div>
);

export default SubmittedDetails;
