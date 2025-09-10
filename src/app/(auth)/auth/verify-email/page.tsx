"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useMessageModal } from "@/components/common/MessageModal";
import Loader from "@/components/common/Loader";
import AuthIllustration from "@/components/auth/AuthIllustration";
import Image from "next/image";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const { verifyEmail, resendVerificationEmail } = useAuth(); // added resend
    const messageModal = useMessageModal();
    const router = useRouter();
    const [redirectUrl, setRedirectUrl] = useState("/login"); // default
    const [failed, setFailed] = useState(false); // track failure state

    useEffect(() => {
        if (!token) {
            setFailed(true);
            messageModal.showMessage("error", "Invalid verification link.");
            return;
        }

        verifyEmail.mutate(token, {
            onSuccess: (res: any) => {
                const url = "/login?role=seeker";

                setRedirectUrl(url);
                setFailed(false);

                messageModal.showMessage("success", "Email verified successfully!");
            },
            onError: (err: any) => {
                setFailed(true);
                let message = "Verification failed. Try again.";
                if (err?.message) message = err.message;
                messageModal.showMessage("error", message);
            },
        });
    }, [token]);

    const handleResend = () => {
        resendVerificationEmail.mutate(undefined, {
            onSuccess: () => {
                messageModal.showMessage(
                    "success",
                    "Verification email has been resent. Please check your inbox."
                );
            },
            onError: (err: any) => {
                messageModal.showMessage(
                    "error",
                    err?.message || "Failed to resend verification email."
                );
            },
        });
    };

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
                        <span className="text-2xl font-bold text-[var(--primary)]">
                            Cykruit
                        </span>
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
                                : failed
                                    ? "Verification failed. You can resend the verification email."
                                    : "Please wait while we verify your email."}
                    </p>

                    {/* Loader */}
                    {verifyEmail.isPending && <Loader />}

                    {/* Redirect or Resend */}
                    {!verifyEmail.isPending && (
                        <>
                            {verifyEmail.isSuccess ? (
                                <button
                                    onClick={() => router.push(redirectUrl)}
                                    className="mt-4 w-full px-4 py-2 rounded-lg font-semibold bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] transition-all shadow-md"
                                >
                                    Continue
                                </button>
                            ) : failed ? (
                                <button
                                    onClick={handleResend}
                                    disabled={resendVerificationEmail.isPending}
                                    className="mt-4 w-full px-4 py-2 rounded-lg font-semibold bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] transition-all shadow-md disabled:opacity-50"
                                >
                                    {resendVerificationEmail.isPending
                                        ? "Resending..."
                                        : "Resend Verification Email"}
                                </button>
                            ) : (
                                <button
                                    onClick={() => router.push("/login")}
                                    className="mt-4 w-full px-4 py-2 rounded-lg font-semibold bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] transition-all shadow-md"
                                >
                                    Go to Login
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
