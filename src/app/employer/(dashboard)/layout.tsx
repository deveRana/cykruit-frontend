"use client";

import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import ProtectedRoute from "@/lib/auth/ProtectedRoute";
import EmployerOnboardingGuard from "@/lib/auth/EmployerOnboardingGuard";
import Loader from "@/components/common/Loader";

// ✅ Lazy load EmployerShell
const EmployerShell = dynamic(() => import("./EmployerShell"), {
    ssr: false, // disables server-side rendering for this component
    loading: () => <Loader />, // fallback UI
});

interface EmployerLayoutProps {
    children: ReactNode;
}

export default function EmployerLayout({ children }: EmployerLayoutProps) {
    return (
        <ProtectedRoute roles={["EMPLOYER"]}>
            <EmployerOnboardingGuard>
                <EmployerShell>{children}</EmployerShell>
            </EmployerOnboardingGuard>
        </ProtectedRoute>
    );
}
