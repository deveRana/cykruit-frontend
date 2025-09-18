"use client";

import React from "react";
import { motion } from "framer-motion";
import Loader from "@/components/common/Loader";
import { useEmployer } from "@/features/employer/hooks/useEmployer";
import KycStatus from "../kyc-status/KycStatus";
import EmployerOnboardingGuard from "@/lib/auth/EmployerOnboardingGuard";

export default function EmployerKycStatusPage() {
    const { status, isStatusLoading, refetchStatus } = useEmployer();

    const handleResubmit = () => refetchStatus();

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
                    <p className="text-gray-500">No employer data found.</p>
                </div>
            </EmployerOnboardingGuard>
        );
    }

    return (
        <EmployerOnboardingGuard>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--background)] to-[var(--accent)]/10 p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-xl"
                >
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
                        nextUrl={status.nextUrl}
                        rejectionReason={status.kyc?.rejectionReason}
                        onResubmit={handleResubmit}
                    />
                </motion.div>
            </div>
        </EmployerOnboardingGuard>
    );
}
