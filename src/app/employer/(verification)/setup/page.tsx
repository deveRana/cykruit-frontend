"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import SetupForm from "./SetupForm";
import AuthIllustration from "@/components/auth/AuthIllustration";
import { useRouter } from "next/navigation";
import { useEmployer } from "@/features/employer/hooks/useEmployer";
import Loader from "@/components/micro-interactions/loaders/Loader";

export default function EmployerSetupPage() {
    const router = useRouter();
    const { redirectData, isRedirectLoading } = useEmployer();
    console.log(redirectData, isRedirectLoading);

    useEffect(() => {
        if (
            !isRedirectLoading &&
            redirectData?.redirectUrl &&
            redirectData.redirectUrl !== "/employer/verification/setup"
        ) {
            // 🚀 If API says to go somewhere else, redirect
            router.replace(redirectData.redirectUrl);
        }
    }, [redirectData, isRedirectLoading, router]);

    if (isRedirectLoading || !redirectData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--background)] text-[var(--foreground)]">
            {/* Left Illustration */}
            <AuthIllustration urlPath="/login" className="w-1/2" />

            {/* Right Form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-4">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Image src="/assets/logo.svg" alt="Logo" width={40} height={40} />
                        <span className="text-2xl font-bold text-[var(--primary)]">Cykruit</span>
                    </div>

                    {/* Title */}
                    <div className="text-left space-y-2">
                        <h2 className="text-3xl font-bold text-[var(--foreground)]">Employer Setup</h2>
                        <p className="text-sm text-[var(--muted-foreground)]">
                            Complete your company profile to proceed with KYC verification.
                        </p>
                    </div>

                    {/* Setup Form */}
                    <SetupForm onSuccess={(nextUrl) => router.push(nextUrl)} />
                </div>
            </div>
        </div>
    );
}
