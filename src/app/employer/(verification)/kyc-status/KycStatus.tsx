"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
                    <div className="bg-yellow-50 text-yellow-700 p-3 rounded-lg border border-yellow-200">
                        Your KYC is currently under review. Please wait while we verify your
                        documents.
                    </div>
                );
            case "APPROVED":
                return (
                    <div className="bg-green-50 text-green-700 p-3 rounded-lg border border-green-200">
                        ✅ Your KYC has been approved! You can now access your dashboard.
                    </div>
                );
            case "REJECTED":
                return (
                    <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200 space-y-1">
                        <p>❌ Your KYC was rejected.</p>
                        {rejectionReason && (
                            <p className="text-sm text-red-600">{rejectionReason}</p>
                        )}
                    </div>
                );
            default:
                return (
                    <div className="bg-gray-50 text-gray-600 p-3 rounded-lg border border-gray-200">
                        No KYC submitted yet.
                    </div>
                );
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case "APPROVED":
                return "bg-green-100 text-green-700";
            case "REJECTED":
                return "bg-red-100 text-red-700";
            case "PENDING":
                return "bg-yellow-100 text-yellow-700";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-[var(--background)] shadow-lg rounded-2xl p-8 flex flex-col items-center text-center space-y-6"
        >
            {/* Logo */}
            <Image src="/assets/logo.svg" alt="Logo" width={60} height={60} />

            {/* Company Name */}
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
                {companyName || "Your Company"}
            </h2>

            {/* Status Badge */}
            <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
            >
                {status || "NOT SUBMITTED"}
            </span>

            {/* Message */}
            <div className="w-full text-left">{renderStatusMessage()}</div>

            {/* Actions */}
            {status === "REJECTED" && onResubmit && (
                <button
                    onClick={onResubmit}
                    className="mt-2 w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-foreground)] font-semibold py-2 px-4 rounded-lg transition-all shadow-md"
                >
                    Resubmit KYC
                </button>
            )}

            {status === "APPROVED" && nextUrl && (
                <button
                    onClick={() => (window.location.href = nextUrl!)}
                    className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-md"
                >
                    Go to Dashboard
                </button>
            )}
        </motion.div>
    );
}
