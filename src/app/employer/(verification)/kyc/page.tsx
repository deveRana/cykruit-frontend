"use client";

import { useMessageModal } from "@/components/common/MessageModal";
import ActionButtons from "@/components/kyc/kyc-documents/action-buttons";
import ErrorBox from "@/components/kyc/kyc-documents/error-box";
import FilePreview from "@/components/kyc/kyc-documents/file-preview";
import FileUploadArea from "@/components/kyc/kyc-documents/file-upload-area";
import InfoBox from "@/components/kyc/kyc-documents/info-box";
import KYCProgressSteps from "@/components/kyc/layout/kyc-progress-steps";
import { useEmployer } from "@/features/employer/hooks/useVeificationHook";
import React, { useState } from "react";

interface KYCDocumentsProps {
    onSuccess?: (nextUrl: string) => void;
}

interface KycDoc {
    type: string;
    file: File | null;
}

const KYCDocuments = ({ onSuccess }: KYCDocumentsProps) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [error, setError] = useState<string>("");

    // For handling multiple document types if needed
    const [docs, setDocs] = useState<KycDoc[]>([{ type: "document", file: null }]);
    const fieldMap: Record<string, string> = { document: "document" }; // map types to API keys

    const messageModal = useMessageModal();
    const { submitKyc, isLoading } = useEmployer();

    const handleFileChange = (file: File) => {
        if (file.size > 10 * 1024 * 1024) {
            setError("File size must be less than 10MB");
            return;
        }
        const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
        if (!allowedTypes.includes(file.type)) {
            setError("Only PDF, JPG, and PNG files are allowed");
            return;
        }
        setError("");
        setUploadedFile(file);

        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => setFilePreview(e.target?.result as string);
            reader.readAsDataURL(file);
        } else {
            setFilePreview(null);
        }

        // Update docs state for submission
        setDocs([{ type: "document", file }]);
    };

    const removeFile = () => {
        setUploadedFile(null);
        setFilePreview(null);
        setError("");
        setDocs([{ type: "document", file: null }]);
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (docs.length === 0 || docs.every(d => !d.file)) {
            messageModal.showMessage({ type: 'error', title: "Error", content: "Please upload at least one document." });
            return;
        }

        try {
            const formData = new FormData();
            docs.forEach(doc => {
                if (doc.file) formData.append("otherDocs", doc.file);
            });

            const res = await submitKyc(formData);

            messageModal.showMessage({ type: 'success', title: "KYC submitted successfully!", content: res?.message, onClose: () => { onSuccess && onSuccess(res?.nextUrl || '/') } })

        } catch (err: unknown) {
            let message = "KYC submission failed.";
            if (Array.isArray(err) && err[0]?.message) message = err[0].message;
            else if (err instanceof Error && err.message) message = err.message;
            messageModal.showMessage({ type: 'error', title: "Error", content: message });
        }
    };

    const handleBack = () => {
        alert("Going back to basic details...");
    };

    return (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <KYCProgressSteps step={2} />
            <div className="bg-white rounded-xl shadow-sm border p-8">
                {!uploadedFile ? (
                    <FileUploadArea onFileSelect={handleFileChange} />
                ) : (
                    <FilePreview
                        file={uploadedFile}
                        preview={filePreview}
                        onRemove={removeFile}
                        onReplace={handleFileChange}
                    />
                )}
                {error && <ErrorBox message={error} />}
                <ActionButtons
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                    disabled={!uploadedFile || isLoading}
                />
            </div>
            <InfoBox />
        </main>
    );
};

export default KYCDocuments;
