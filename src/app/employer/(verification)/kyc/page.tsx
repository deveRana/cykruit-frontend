"use client";

import React from "react";
import Image from "next/image";
import AuthIllustration from "@/components/auth/AuthIllustration";
import Loader from "@/components/common/Loader";
import KycForm from "./KycForm";
import KycStatus from "../kyc-status/KycStatus";
import { useEmployer } from "@/features/employer/hooks/useEmployer";
import EmployerOnboardingGuard from "@/lib/auth/EmployerOnboardingGuard";

export default function EmployerKycPage() {
    const { status, isStatusLoading, refetchStatus } = useEmployer();

    const handleKycSuccess = (nextUrl: string) => window.location.href = nextUrl;
    const handleResubmit = () => refetchStatus();

    if (isStatusLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <EmployerOnboardingGuard>
            <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--background)] text-[var(--foreground)]">
                {/* Left Illustration */}
                <AuthIllustration urlPath="/login" className="w-1/2" />

                {/* Right Content */}
                <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12">
                    <div className="w-full max-w-md space-y-4">
                        {/* Logo */}
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Image src="/assets/logo.svg" alt="Logo" width={40} height={40} />
                            <span className="text-2xl font-bold text-[var(--primary)]">Cykruit</span>
                        </div>

                        {/* Title */}
                        <div className="text-left space-y-2">
                            <h2 className="text-3xl font-bold text-[var(--foreground)]">KYC Verification</h2>
                            <p className="text-sm text-[var(--muted-foreground)]">
                                Submit your documents for verification to access the employer dashboard.
                            </p>
                        </div>

                        {/* Show form or status */}
                        {status?.kyc ? (
                            <KycStatus
                                status={status.kyc.status}
                                remarks={status.kyc.remarks}
                                rejectionReason={status.kyc.rejectionReason}
                                onResubmit={handleResubmit}
                            />
                        ) : (
                            <KycForm onSuccess={handleKycSuccess} />
                        )}
                    </div>
                </div>
            </div>
        </EmployerOnboardingGuard>
    );
}
