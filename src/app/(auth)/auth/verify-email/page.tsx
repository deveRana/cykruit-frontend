"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Loader from "@/components/common/Loader";
import AuthIllustration from "@/components/auth/AuthIllustration";
import Image from "next/image";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { verifyEmail, resendVerificationEmail } = useAuth();

    const token = searchParams.get("token");

    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");
    const [redirectUrl, setRedirectUrl] = useState("/login");
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (!token) {
            setFailed(true);
            setMessageType("error");
            setMessage("Invalid verification link.");
            setIsLoading(false);
            return;
        }

        verifyEmail.mutate(token, {
            onSuccess: () => {
                const url = "/login?role=seeker";
                setRedirectUrl(url);
                setFailed(false);
                setIsLoading(false);
                setMessageType("success");
                setMessage("Email verified successfully!");
            },
            onError: (err: unknown) => {
                setFailed(true);
                setIsLoading(false);
                let errorMessage = "Verification failed. Try again.";
                if (err instanceof Error && err.message) {
                    errorMessage = err.message;
                }
                setMessageType("error");
                setMessage(errorMessage);
            },
        });
    }, [token, verifyEmail]);

    const handleResend = () => {
        setIsLoading(true);
        resendVerificationEmail.mutate(undefined, {
            onSuccess: () => {
                setIsLoading(false);
                setMessageType("success");
                setMessage("Verification email has been resent. Please check your inbox.");
            },
            onError: (err: unknown) => {
                setIsLoading(false);
                let errorMessage = "Failed to resend verification email.";
                if (err instanceof Error && err.message) {
                    errorMessage = err.message;
                }
                setMessageType("error");
                setMessage(errorMessage);
            },
        });
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--background)] text-[var(--foreground)]">
            <AuthIllustration urlPath="/login" className="w-full lg:w-1/2" />

            <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md text-center space-y-6">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Image src="/assets/logo.svg" alt="Logo" width={40} height={40} />
                        <span className="text-2xl font-bold text-[var(--primary)]">Cykruit</span>
                    </div>

                    <h2 className="text-3xl font-bold text-[var(--foreground)]">
                        {isLoading ? "Verifying your email..." : "Verify Your Email"}
                    </h2>

                    {message && (
                        <p
                            className={`text-sm ${messageType === "success"
                                ? "text-green-500"
                                : messageType === "error"
                                    ? "text-red-500"
                                    : "text-gray-500"
                                }`}
                        >
                            {message}
                        </p>
                    )}

                    {isLoading && (
                        <Loader
                            mini
                        />
                    )}

                    {!isLoading && (
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
