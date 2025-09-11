"use client";

import React from "react";
import Image from "next/image";

interface KycStatusProps {
    status: "PENDING" | "APPROVED" | "REJECTED" | null;
    rejectionReason?: string;
    companyName?: string;
    nextUrl?: string;
    onResubmit?: () => void;
}

export default function KycStatus({
    status,
    rejectionReason,
    companyName,
    nextUrl,
    onResubmit,
}: KycStatusProps) {
    const renderStatusMessage = () => {
        switch (status) {
            case "PENDING":
                return (
                    <p className="text-[var(--muted-foreground)]">
                        Your KYC is currently under review. Please wait while we verify your documents.
                    </p>
                );
            case "APPROVED":
                return (
                    <p className="text-green-600 font-medium">
                        Your KYC has been approved! 🎉 You can now access your dashboard.
                    </p>
                );
            case "REJECTED":
                return (
                    <>
                        <p className="text-red-600 font-medium">Your KYC was rejected. ❌</p>
                        {rejectionReason && <p className="text-sm text-[var(--muted-foreground)] mt-1">{rejectionReason}</p>}
                    </>
                );
            default:
                return <p className="text-[var(--muted-foreground)]">No KYC submitted yet.</p>;
        }
    };

    return (
        <div className="bg-[var(--background)] shadow-md rounded-xl p-8 w-full max-w-lg mx-auto flex flex-col items-center text-center space-y-6">
            <Image src="/assets/logo.svg" alt="Logo" width={50} height={50} />
            <h2 className="text-2xl font-bold text-[var(--foreground)]">{companyName || "Your Company"}</h2>
            <div className="flex flex-col gap-2">
                <span className="text-sm text-[var(--muted-foreground)]">Verification Status:</span>
                <span
                    className={`text-lg font-semibold ${status === "APPROVED"
                        ? "text-green-600"
                        : status === "REJECTED"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                >
                    {status || "NOT SUBMITTED"}
                </span>
            </div>

            <div className="text-left w-full">{renderStatusMessage()}</div>

            {status === "REJECTED" && onResubmit && (
                <button
                    onClick={onResubmit}
                    className="mt-4 w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-foreground)] font-semibold py-2 px-4 rounded-lg transition-all shadow-md"
                >
                    Resubmit KYC
                </button>
            )}

            {status === "APPROVED" && nextUrl && (
                <button
                    onClick={() => (window.location.href = nextUrl)}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-md"
                >
                    Go to Dashboard
                </button>
            )}
        </div>
    );
}
