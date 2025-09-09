"use client";

import React from "react";

interface KycStatusProps {
    status: "PENDING" | "APPROVED" | "REJECTED";
    remarks?: string;
    rejectionReason?: string;
    onResubmit?: () => void;
}

export default function KycStatus({ status, remarks, rejectionReason, onResubmit }: KycStatusProps) {
    return (
        <div className="w-full max-w-md p-6 bg-[var(--background)] rounded-lg shadow-md space-y-4 text-[var(--foreground)]">
            <h2 className="text-2xl font-bold">KYC Status</h2>
            <p>Status: <span className="font-semibold">{status}</span></p>
            {status === "REJECTED" && rejectionReason && (
                <p className="text-red-500">Reason: {rejectionReason}</p>
            )}
            {status === "APPROVED" && remarks && (
                <p className="text-green-500">Remarks: {remarks}</p>
            )}
            {status === "REJECTED" && onResubmit && (
                <button
                    onClick={onResubmit}
                    className="px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] font-semibold"
                >
                    Resubmit KYC
                </button>
            )}
        </div>
    );
}
