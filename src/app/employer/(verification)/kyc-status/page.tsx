'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import KYCProgressSteps from '@/components/kyc/layout/kyc-progress-steps';
import StatusCard from '@/components/kyc/kyc-status/StatusCard';
import SubmittedDetails from '@/components/kyc/kyc-status/SubmittedDetails';
import VerificationTimeline from '@/components/kyc/kyc-status/VerificationTimeline';
import HelpSection from '@/components/kyc/kyc-status/HelpSection';
import ActionButtons from '@/components/kyc/kyc-status/ActionButtons';
import EmployerOnboardingGuard from '@/lib/auth/EmployerOnboardingGuard';
import { useEmployer } from '@/features/employer/hooks/useVeificationHook';
import Loader from '@/components/common/loader';

type KYCStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';

export default function EmployerKycStatusPage() {
    const { status, isLoading, refetchStatus } = useEmployer();

    const handleResubmit = () => refetchStatus();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (!status) {
        return (
            <EmployerOnboardingGuard>
                <div className="min-h-screen flex items-center justify-center text-center">
                    <p className="text-gray-500">No employer data found.</p>
                </div>
            </EmployerOnboardingGuard>
        );
    }

    // Safe defaults
    const kyc = status.kyc ?? { status: 'PENDING' as KYCStatus, attemptNumber: 0 };
    const employer = status.employer ?? {
        companyName: '-',
        website: '-',
        email: '-',
        type: '-',
        location: '-',
        submittedOn: '-',
        documentName: '-',
    };

    // Ensure kyc.status is properly typed
    const statusKey: KYCStatus = (kyc.status as KYCStatus) || 'PENDING';

    // Map API status to UI config
    const statusConfig: Record<KYCStatus, any> = {
        PENDING: {
            Icon: Clock,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200',
            title: 'Verification Pending',
            description: 'Your KYC documents have been submitted successfully and are awaiting review.',
            action: 'Our team will review your documents within 24-48 hours.',
        },
        UNDER_REVIEW: {
            Icon: AlertCircle,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            title: 'Under Review',
            description: 'Our team is currently reviewing your KYC documents.',
            action: 'You will be notified once the verification is complete.',
        },
        APPROVED: {
            Icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            title: 'Verification Approved',
            description: 'Congratulations! Your KYC has been verified successfully.',
            action: 'You can now post jobs and access all employer features.',
        },
        REJECTED: {
            Icon: XCircle,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            title: 'Verification Rejected',
            description: 'Unfortunately, your KYC verification was rejected.',
            action: kyc.rejectionReason || 'Please review the comments and resubmit your documents.',
        },
    };

    const currentStatus = statusConfig[statusKey];

    const timeline = [
        { label: 'Documents Submitted', date: employer.submittedOn || 'Pending', completed: true },
        { label: 'Under Review', date: statusKey !== 'PENDING' ? 'Processed' : 'Pending', completed: statusKey !== 'PENDING' },
        { label: 'Verification Complete', date: statusKey === 'APPROVED' || statusKey === 'REJECTED' ? 'Completed' : 'Pending', completed: statusKey === 'APPROVED' || statusKey === 'REJECTED' },
    ];

    return (
        <EmployerOnboardingGuard>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--background)] to-[var(--accent)]/10 p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-4xl"
                >
                    <KYCProgressSteps step={3} />

                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Dashboard</span>
                    </button>

                    <StatusCard {...currentStatus} />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        <SubmittedDetails data={employer} />
                        <VerificationTimeline timeline={timeline} />
                    </div>

                    <HelpSection />

                    <ActionButtons
                        status={statusKey}
                        onResubmit={statusKey === 'REJECTED' ? handleResubmit : undefined}
                    />
                </motion.div>
            </div>
        </EmployerOnboardingGuard>
    );
}
