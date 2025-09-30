'use client';
import React, { useState } from 'react';
import { Clock, AlertCircle, CheckCircle, XCircle, ArrowLeft, LucideIcon } from 'lucide-react';
import KYCProgressSteps from '@/components/kyc/layout/kyc-progress-steps';
import StatusCard from '@/components/kyc/kyc-status/StatusCard';
import StatusButtons from '@/components/kyc/kyc-status/StatusButtons';
import SubmittedDetails from '@/components/kyc/kyc-status/SubmittedDetails';
import VerificationTimeline from '@/components/kyc/kyc-status/VerificationTimeline';
import HelpSection from '@/components/kyc/kyc-status/HelpSection';
import ActionButtons from '@/components/kyc/kyc-status/ActionButtons';

type KYCStatus = 'pending' | 'under_review' | 'approved' | 'rejected';

export default function KYCVerificationStatus() {
    const [status, setStatus] = useState<KYCStatus>('pending');

    interface StatusConfigItem {
        Icon: LucideIcon;
        color: string;
        bgColor: string;
        borderColor: string;
        title: string;
        description: string;
        action: string;
    }

    const statusConfig: Record<KYCStatus, StatusConfigItem> = {
        pending: {
            Icon: Clock,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200',
            title: 'Verification Pending',
            description: 'Your KYC documents have been submitted successfully and are awaiting review.',
            action: 'Our team will review your documents within 24-48 hours.'
        },
        under_review: {
            Icon: AlertCircle,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            title: 'Under Review',
            description: 'Our team is currently reviewing your KYC documents.',
            action: 'You will be notified once the verification is complete.'
        },
        approved: {
            Icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            title: 'Verification Approved',
            description: 'Congratulations! Your KYC has been verified successfully.',
            action: 'You can now post jobs and access all employer features.'
        },
        rejected: {
            Icon: XCircle,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            title: 'Verification Rejected',
            description: 'Unfortunately, your KYC verification was rejected.',
            action: 'Please review the comments below and resubmit your documents.'
        }
    };
    const submittedData = {
        companyName: 'CyberTech Solutions',
        website: 'www.cybertech.com',
        email: 'hr@cybertech.com',
        type: 'Startup',
        location: 'Bangalore, India',
        submittedOn: '28 Sep 2025, 10:30 AM',
        documentName: 'Business_Registration.pdf'
    };

    const timeline = [
        { label: 'Documents Submitted', date: '28 Sep 2025, 10:30 AM', completed: true },
        { label: 'Under Review', date: status !== 'pending' ? '28 Sep 2025, 2:15 PM' : 'Pending', completed: status !== 'pending' },
        { label: 'Verification Complete', date: status === 'approved' || status === 'rejected' ? '29 Sep 2025, 9:00 AM' : 'Pending', completed: status === 'approved' || status === 'rejected' }
    ];

    const currentStatus = statusConfig[status];

    return (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <KYCProgressSteps step={3} />

            <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Dashboard</span>
            </button>

            <StatusCard {...currentStatus} />

            <StatusButtons currentStatus={status} setStatus={setStatus} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SubmittedDetails data={submittedData} />
                <VerificationTimeline timeline={timeline} />
            </div>

            <HelpSection />
            <ActionButtons status={status} />
        </main>
    );
}