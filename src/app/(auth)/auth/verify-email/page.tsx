"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useMessageModal } from "@/components/micro-interactions/modal/MessageModal";
import Loader from "@/components/micro-interactions/loaders/Loader";
import AuthIllustration from "@/components/auth/AuthIllustration";
import Image from "next/image";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const { verifyEmail } = useAuth();
    const messageModal = useMessageModal();
    const router = useRouter();
    const [redirectUrl, setRedirectUrl] = useState("/login"); // default

    useEffect(() => {
        if (!token) {
            messageModal.showMessage("error", "Invalid verification link.");
            return;
        }

        verifyEmail.mutate(token, {
            onSuccess: (res: any) => {
                const url = res?.data?.redirectUrl || "/login";
                setRedirectUrl(url);

                messageModal.showMessage("success", "Email verified successfully!");
            },
            onError: (err: any) => {
                let message = "Verification failed. Try again.";
                if (err?.message) message = err.message;
                messageModal.showMessage("error", message);
            },
        });
    }, [token]);

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--background)] text-[var(--foreground)]">
            {/* Left Illustration */}
            <AuthIllustration urlPath="/login" className="w-full lg:w-1/2" />

            {/* Right Content */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md text-center space-y-6">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Image src="/assets/logo.svg" alt="Logo" width={40} height={40} />
                        <span className="text-2xl font-bold text-[var(--primary)]">Cykruit</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-[var(--foreground)]">
                        Verify Your Email
                    </h2>
                    <p className="text-sm text-[var(--muted-foreground)]">
                        {verifyEmail.isPending
                            ? "Verifying your email..."
                            : verifyEmail.isSuccess
                                ? "Email verified! You can continue."
                                : "Please wait while we verify your email."}
                    </p>

                    {/* Loader */}
                    {verifyEmail.isPending && <Loader />}

                    {/* Redirect Button */}
                    {!verifyEmail.isPending && (
                        <button
                            onClick={() => router.push(redirectUrl)}
                            className="mt-4 w-full px-4 py-2 rounded-lg font-semibold bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] transition-all shadow-md"
                        >
                            {verifyEmail.isSuccess ? "Continue" : "Go to Login"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
