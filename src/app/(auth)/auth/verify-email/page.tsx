"use client";

import React, { useEffect, useState } from "react";
import { Mail, CheckCircle, XCircle, RefreshCw, Shield } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { verifyEmail, resendVerificationEmail } = useAuth();

    const token = searchParams.get("token");

    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("info");
    const [redirectUrl, setRedirectUrl] = useState("/login");
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (!token) {
            setFailed(true);
            setMessageType("error");
            setMessage("Invalid verification link. Please check your email for the correct link.");
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
                setMessage("Email verified successfully! You can now access your account.");
            },
            onError: (err: unknown) => {
                setFailed(true);
                setIsLoading(false);
                let errorMessage = "Verification failed. The link may have expired or is invalid.";
                if (err instanceof Error && err.message) {
                    errorMessage = err.message;
                }
                setMessageType("error");
                setMessage(errorMessage);
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleResend = () => {
        setIsLoading(true);
        setMessage("Resending verification email...");
        resendVerificationEmail.mutate(undefined, {
            onSuccess: () => {
                setIsLoading(false);
                setMessageType("success");
                setMessage("Verification email has been resent. Please check your inbox.");
                setFailed(false);
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

    const handleContinue = () => {
        window.location.href = redirectUrl;
    };

    const getIcon = () => {
        if (isLoading) return <Mail className="w-20 h-20 text-blue-500 animate-pulse" />;
        if (messageType === "success") return <CheckCircle className="w-20 h-20 text-green-500" />;
        if (messageType === "error") return <XCircle className="w-20 h-20 text-red-500" />;
        return <Mail className="w-20 h-20 text-gray-400" />;
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Navigation Bar */}
            <nav className="w-full bg-white border-b border-gray-200 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href={"/"}>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#0062FF] rounded-xl flex items-center justify-center shadow-md">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold" style={{ color: '#0062FF' }}>Cykruit</span>
                        </div>
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-white">
                <div className="w-full max-w-xl">
                    {/* Content Card */}
                    <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100 text-center">
                        {/* Icon */}
                        <div className="flex justify-center mb-8">
                            {getIcon()}
                        </div>

                        {/* Title */}
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            {isLoading ? "Verifying Your Email" : messageType === "success" ? "Email Verified!" : "Verification Failed"}
                        </h2>

                        {/* Message */}
                        {message && (
                            <p className={`text-base mb-10 leading-relaxed ${messageType === "success" ? "text-green-600" :
                                messageType === "error" ? "text-red-600" :
                                    "text-gray-600"
                                }`}>
                                {message}
                            </p>
                        )}

                        {/* Loader */}
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center gap-4 mb-8">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-transparent animate-spin"
                                        style={{ borderTopColor: '#0062FF' }}
                                    />
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full animate-pulse"
                                        style={{ backgroundColor: '#0062FF' }}
                                    />
                                </div>
                                <p className="text-gray-500 text-sm font-medium">Please wait while we verify your email address</p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        {!isLoading && (
                            <div>
                                {verifyEmail.isSuccess ? (
                                    <button
                                        onClick={handleContinue}
                                        className="w-full text-white py-3.5 rounded-lg font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 text-base"
                                        style={{ backgroundColor: '#0062FF' }}
                                    >
                                        <span>Continue to Your Account</span>
                                        <Mail className="w-5 h-5" />
                                    </button>
                                ) : failed ? (
                                    <button
                                        onClick={handleResend}
                                        disabled={resendVerificationEmail.isPending}
                                        className="w-full text-white py-3.5 rounded-lg font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                                        style={{ backgroundColor: '#0062FF' }}
                                    >
                                        <RefreshCw className="w-5 h-5" />
                                        <span>
                                            {resendVerificationEmail.isPending ? "Resending..." : "Resend Verification Email"}
                                        </span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => router.push("/login")}
                                        className="w-full text-white py-3.5 rounded-lg font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-base"
                                        style={{ backgroundColor: '#0062FF' }}
                                    >
                                        Go to Login
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Help Text */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <p className="text-gray-600 text-sm">
                                Having trouble verifying your email?{' '}
                                <a href="/support" className="font-semibold hover:underline transition-colors" style={{ color: '#0062FF' }}>
                                    Contact our support team
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-500 text-xs leading-relaxed">
                            This verification link is valid for 24 hours. For security reasons, please complete verification promptly.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}