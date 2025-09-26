'use client';

import {

    CheckCircle2,
    XCircle,
    Clock,
    Star,
} from 'lucide-react';


// Types based on your backend response
interface Applicant {
    id: string;
    fullName: string;
    email: string;
    skills: any[];
    resumes: Array<{
        url: string;
        fileName: string;
    }>;
    appliedAt: string;
    status: 'APPLIED' | 'SHORTLISTED' | 'REJECTED' | 'HIRED';
}

const StatusBadge = ({ status }: { status: Applicant['status'] }) => {
    const statusConfig = {
        APPLIED: {
            bg: 'bg-blue-100',
            text: 'text-blue-800',
            icon: Clock,
            label: 'Applied'
        },
        SHORTLISTED: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800',
            icon: Star,
            label: 'Shortlisted'
        },
        REJECTED: {
            bg: 'bg-red-100',
            text: 'text-red-800',
            icon: XCircle,
            label: 'Rejected'
        },
        HIRED: {
            bg: 'bg-green-100',
            text: 'text-green-800',
            icon: CheckCircle2,
            label: 'Hired'
        }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
            <Icon className="w-3.5 h-3.5" />
            {config.label}
        </span>
    );
};

export default StatusBadge