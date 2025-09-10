"use client";

import React from "react";
import Loader from "@/components/common/Loader";
import { useEmployer } from "@/features/employer/hooks/useEmployer";
import KycStatus from "../kyc-status/KycStatus";
import EmployerOnboardingGuard from "@/lib/auth/EmployerOnboardingGuard";

export default function EmployerKycStatusPage() {
    const { status, isStatusLoading, refetchStatus } = useEmployer();

    const handleResubmit = () => {
        refetchStatus();
    };

    if (isStatusLoading) {
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
                    <p>No employer data found.</p>
                </div>
            </EmployerOnboardingGuard>
        );
    }

    return (
        <EmployerOnboardingGuard>
            <div className="min-h-screen flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-lg">
                    <KycStatus
                        status={
                            status.kyc?.status ??
                            (status.employer?.onboardingStep === "KYC_PENDING"
                                ? "PENDING"
                                : status.employer?.isVerified
                                    ? "APPROVED"
                                    : "REJECTED")
                        }
                        companyName={status.employer?.companyName}
                        isVerified={status.employer?.isVerified}
                        nextUrl={status.nextUrl}
                        remarks={status.kyc?.remarks}
                        rejectionReason={status.kyc?.rejectionReason}
                        onResubmit={handleResubmit}
                    />
                </div>
            </div>
        </EmployerOnboardingGuard>
    );
}
