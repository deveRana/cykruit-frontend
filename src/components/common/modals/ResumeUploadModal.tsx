"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface ResumeUploadModalProps {
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    resumeName: string;
    setResumeName: React.Dispatch<React.SetStateAction<string>>;
    onClose: () => void;
    onSubmit: () => void;
}

const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({
    file,
    setFile,
    resumeName,
    setResumeName,
    onClose,
    onSubmit,
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg flex flex-col gap-4">
                <h2 className="text-lg font-bold text-[#0F123F] mb-2">Upload Resume</h2>

                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                />

                <input
                    type="text"
                    placeholder="Resume Display Name (e.g., DevOps Resume.pdf)"
                    value={resumeName}
                    onChange={(e) => setResumeName(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                />

                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button className="bg-[#0F123F] text-white" onClick={onSubmit} disabled={!file}>
                        Upload
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ResumeUploadModal;
