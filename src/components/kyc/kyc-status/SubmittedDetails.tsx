'use client';
import React from 'react';
import { FileText } from 'lucide-react';

interface SubmittedDetailsProps {
    data: {
        companyName: string;
        website: string;
        email: string;
        type: string;
        location: string;
        submittedOn: string;
        documentName: string;
    };
}

const SubmittedDetails: React.FC<SubmittedDetailsProps> = ({ data }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Submitted Details</h3>
        <div className="space-y-4">
            {Object.entries(data).map(([key, value]) => (
                <div key={key}>
                    <p className="text-sm text-gray-500 mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
                    {key === 'documentName' ? (
                        <div className="flex items-center space-x-2 mt-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <span className="font-medium text-gray-900">{value}</span>
                        </div>
                    ) : (
                        <p className="font-medium text-gray-900">{value}</p>
                    )}
                </div>
            ))}
        </div>
    </div>
);

export default SubmittedDetails;