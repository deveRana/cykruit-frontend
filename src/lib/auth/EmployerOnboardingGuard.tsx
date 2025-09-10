"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEmployer } from "@/features/employer/hooks/useEmployer";

interface EmployerOnboardingGuardProps {
    children: ReactNode;
}

export default function EmployerOnboardingGuard({ children }: EmployerOnboardingGuardProps) {
    const router = useRouter();
    const { redirectData, isRedirectLoading } = useEmployer();

    useEffect(() => {
        if (!isRedirectLoading && redirectData?.redirectUrl) {
            // If backend says redirect somewhere else, send them there
            router.replace(redirectData.redirectUrl);
        }
    }, [redirectData, isRedirectLoading, router]);

    // Show loader while API is loading or no redirectData yet
    if (isRedirectLoading || !redirectData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    // If redirectUrl points to current page (i.e., allowed), render children
    return <>{children}</>;
}
