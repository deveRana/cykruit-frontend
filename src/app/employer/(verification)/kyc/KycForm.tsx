"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, Plus } from "lucide-react";
import { useMessageModal } from "@/components/common/MessageModal";
import { useEmployer } from "@/features/employer/hooks/useVeificationHook";
import Loader from "@/components/common/Loader";

interface KycFormProps {
    onSuccess?: (nextUrl: string) => void;
}

type DocType = "PAN Card" | "Incorporation Certificate" | "GST Certificate" | "Other";

export default function KycForm({ onSuccess }: KycFormProps) {
    const messageModal = useMessageModal();
    const { submitKyc, isLoading, loader } = useEmployer();

    const [docs, setDocs] = useState<{ type: DocType; file: File | null }[]>([]);
    const [selectedType, setSelectedType] = useState<DocType>("PAN Card");

    const addDocField = () => {
        setDocs(prev => [...prev, { type: selectedType, file: null }]);
    };

    const handleFileChange = (index: number, file: File | null) => {
        setDocs(prev => prev.map((doc, i) => (i === index ? { ...doc, file } : doc)));
    };

    const removeDoc = (index: number) => {
        setDocs(prev => prev.filter((_, i) => i !== index));
    };

    const fieldMap: Record<DocType, string> = {
        "PAN Card": "panCard",
        "Incorporation Certificate": "incorporationCert",
        "GST Certificate": "gstCert",
        "Other": "otherDocs",
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (docs.length === 0 || docs.every(d => !d.file)) {
            messageModal.showMessage("error", "Please upload at least one document.");
            return;
        }

        try {
            const formData = new FormData();
            docs.forEach(doc => {
                if (doc.file) formData.append(fieldMap[doc.type], doc.file);
            });

            const res = await submitKyc(formData);

            messageModal.showMessage("success", res?.message || "KYC submitted successfully!", () => {
                if (onSuccess && res?.nextUrl) onSuccess(res.nextUrl);
            });
        } catch (err: unknown) {
            let message = "KYC submission failed.";
            if (Array.isArray(err) && err[0]?.message) message = err[0].message;
            else if (err instanceof Error && err.message) message = err.message;
            messageModal.showMessage("error", message);
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={onSubmit}
            className="space-y-6 w-full"
        >
            {loader}

            {/* Dropdown */}
            <div className="flex items-center gap-3">
                <select
                    value={selectedType}
                    onChange={e => setSelectedType(e.target.value as DocType)}
                    className="border rounded-lg px-3 py-2 flex-1"
                >
                    <option>PAN Card</option>
                    <option>Incorporation Certificate</option>
                    <option>GST Certificate</option>
                    <option>Other</option>
                </select>
                <button
                    type="button"
                    onClick={addDocField}
                    className="flex items-center gap-1 px-3 py-2 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-lg shadow hover:bg-[var(--accent-hover)] transition"
                >
                    <Plus className="w-4 h-4" /> Add
                </button>
            </div>

            {/* Dynamic Docs */}
            <div className="space-y-4">
                {docs.map((doc, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">{doc.type}</label>
                            <button
                                type="button"
                                onClick={() => removeDoc(i)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 transition">
                            <Upload className="w-6 h-6 text-gray-400 mb-1" />
                            <span className="text-xs text-gray-500">Click or drag & drop</span>
                            <input
                                type="file"
                                accept=".pdf,.jpg,.png"
                                className="hidden"
                                onChange={e => handleFileChange(i, e.target.files?.[0] || null)}
                            />
                        </label>

                        {doc.file && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center justify-between bg-gray-100 px-3 py-1 rounded-lg text-sm"
                            >
                                <span className="truncate">{doc.file.name}</span>
                                <button
                                    type="button"
                                    onClick={() => handleFileChange(i, null)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all shadow-md bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] disabled:opacity-60"
            >
                {isLoading ? (
                    <>
                        Submitting...
                    </>
                ) : (
                    "Submit KYC"
                )}
            </button>
        </motion.form>
    );
}
