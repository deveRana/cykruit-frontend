"use client";

import React, { useState } from "react";
import { useMessageModal } from "@/components/micro-interactions/modal/MessageModal";
import { useEmployer } from "@/features/employer/hooks/useEmployer";

interface KycFormProps {
    onSuccess?: (nextUrl: string) => void;
}

export default function KycForm({ onSuccess }: KycFormProps) {
    const messageModal = useMessageModal();
    const { kycMutation } = useEmployer();
    const [loading, setLoading] = useState(false);

    // State to hold files
    const [panCard, setPanCard] = useState<File | null>(null);
    const [incorporationCert, setIncorporationCert] = useState<File | null>(null);
    const [gstCert, setGstCert] = useState<File | null>(null);
    const [otherDocs, setOtherDocs] = useState<File[]>([]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!panCard && !incorporationCert && !gstCert && otherDocs.length === 0) {
            messageModal.showMessage("error", "Please upload at least one document.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            if (panCard) formData.append("panCard", panCard);
            if (incorporationCert) formData.append("incorporationCert", incorporationCert);
            if (gstCert) formData.append("gstCert", gstCert);
            otherDocs.forEach((file, i) => formData.append("otherDocs", file));

            const res = await kycMutation.mutateAsync(formData);

            messageModal.showMessage("success", res.message, () => {
                if (onSuccess && res.nextUrl) onSuccess(res.nextUrl);
            });
        } catch (errors: any) {
            messageModal.showMessage("error", errors?.[0]?.message || "KYC submission failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-6 w-full max-w-md" onSubmit={onSubmit}>
            <div>
                <label className="block mb-1 font-medium">PAN Card</label>
                <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => setPanCard(e.target.files?.[0] || null)}
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Incorporation Certificate</label>
                <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => setIncorporationCert(e.target.files?.[0] || null)}
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">GST Certificate</label>
                <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => setGstCert(e.target.files?.[0] || null)}
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Other Documents</label>
                <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    multiple
                    onChange={(e) => setOtherDocs(Array.from(e.target.files || []))}
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition-all shadow-md ${!loading ? "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)]" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
            >
                {loading ? "Submitting..." : "Submit KYC"}
            </button>
        </form>
    );
}
