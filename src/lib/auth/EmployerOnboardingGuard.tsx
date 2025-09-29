"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useEmployer } from "@/features/employer/hooks/useVeificationHook";
import Loader from "@/components/common/loader";

interface EmployerOnboardingGuardProps {
    children: ReactNode;
}

export default function EmployerOnboardingGuard({ children }: EmployerOnboardingGuardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { redirectData, isLoading, loader } = useEmployer();

    useEffect(() => {
        if (!isLoading && redirectData?.redirectUrl) {
            // ✅ Only redirect if user is not already at that URL
            if (pathname !== redirectData.redirectUrl) {
                router.replace(redirectData.redirectUrl);
            }
        }
    }, [redirectData, isLoading, pathname, router]);

    if (isLoading) {
        return loader || <Loader />;
    }

    // ✅ Block rendering while redirect is in progress
    if (redirectData?.redirectUrl && pathname !== redirectData.redirectUrl) {
        return loader || <Loader />;
    }

    // ✅ Otherwise safe to show children
    return <>{children}</>;
}
