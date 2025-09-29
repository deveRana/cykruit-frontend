"use client";

import KYCNavbar from "@/components/kyc/layout/kyc-navbar";
import EmployerOnboardingGuard from "@/lib/auth/EmployerOnboardingGuard";
import ProtectedRoute from "@/lib/auth/ProtectedRoute";
import React, { ReactNode } from "react";

export default function EmployerVerificationLayout({ children }: { children: ReactNode }) {
    return (
        <ProtectedRoute roles={["EMPLOYER"]}>
            <EmployerOnboardingGuard>
                <div className="min-h-screen bg-gray-50">
                    <KYCNavbar />
                    {children}
                </div>
            </EmployerOnboardingGuard>
        </ProtectedRoute>
    );
}
