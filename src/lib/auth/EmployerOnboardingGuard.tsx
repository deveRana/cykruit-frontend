"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEmployer } from "@/features/employer/hooks/useEmployer";
import Loader from "@/components/common/Loader";

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
            <Loader />
        );
    }

    // If redirectUrl points to current page (i.e., allowed), render children
    return <>{children}</>;
}
